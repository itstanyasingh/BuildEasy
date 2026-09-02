import React, { useRef, useState, useEffect } from 'react';
import { getTemplateById } from '../data/templatesRegistry';
import { defaultPortfolioData } from '../data/defaultData';
import { getDemoDataForTemplate } from '../data/demoDataByTemplate';
import { TemplateRenderer } from './templates/TemplateRenderer';
import { TemplateDefinition, PortfolioData } from '../types';

export interface TemplatePreviewProps {
  id?: string;
  template?: TemplateDefinition;
  data?: PortfolioData;
  className?: string;
}

export const TemplatePreview: React.FC<TemplatePreviewProps> = ({
  id,
  template: passedTemplate,
  data,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(0.28);
  const [containerHeight, setContainerHeight] = useState<number>(280);

  // Resolve template definition
  const template = passedTemplate || (id ? getTemplateById(id) : null);

  const targetWidth = 1280; // Standard desktop viewport target width

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateDimensions = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0) {
        const newScale = rect.width / targetWidth;
        setScale(newScale);
        setContainerHeight(rect.height > 0 ? rect.height : 280);
      }
    };

    updateDimensions();

    const observer = new ResizeObserver(() => {
      updateDimensions();
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [targetWidth]);

  if (!template) {
    return (
      <div className={`w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-500 text-xs font-mono ${className}`}>
        Template Preview Unavailable
      </div>
    );
  }

  const portfolioData = data || (template ? getDemoDataForTemplate(template.id) : defaultPortfolioData);
  const config = template.defaultConfig;
  const rendererType = template.rendererType || template.id;

  // Calculate inner container height to match preview container height after scale
  const innerHeight = Math.max(800, scale > 0 ? Math.round(containerHeight / scale) : 900);

  return (
    <div 
      ref={containerRef}
      className={`w-full h-full relative overflow-hidden bg-zinc-950 select-none pointer-events-none ${className}`}
      style={{ isolation: 'isolate' }}
    >
      <div
        style={{
          width: `${targetWidth}px`,
          height: `${innerHeight}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          position: 'absolute',
          top: 0,
          left: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          userSelect: 'none'
        }}
      >
        <TemplateRenderer
          data={portfolioData}
          config={config}
          rendererType={rendererType}
        />
      </div>
    </div>
  );
};
