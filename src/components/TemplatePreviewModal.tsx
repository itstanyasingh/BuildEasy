import React, { useState } from 'react';
import { TemplateDefinition, PortfolioData } from '../types';
import { TemplateRenderer } from './templates/TemplateRenderer';
import { X, Smartphone, Monitor, ArrowRight, Sparkles, ExternalLink, Globe } from 'lucide-react';

interface TemplatePreviewModalProps {
  template: TemplateDefinition;
  portfolioData: PortfolioData;
  onClose: () => void;
  onUseTemplate: (templateId: string) => void;
}

export const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({
  template,
  portfolioData,
  onClose,
  onUseTemplate
}) => {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
      <div className="bg-white w-full max-w-7xl rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[94vh] border border-zinc-200">
        
        {/* Top Control Bar */}
        <div className="px-3.5 py-3 sm:px-6 border-b border-zinc-200 flex flex-wrap items-center justify-between gap-2.5 sm:gap-4 bg-zinc-50/90">
          
          {/* Left: Template info */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="text-[11px] font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-zinc-200/80 text-zinc-800 font-mono shrink-0">
              {template.category}
            </span>
            <div className="h-4 w-px bg-zinc-300 hidden sm:block"></div>
            <h2 className="text-base sm:text-xl font-serif font-bold text-zinc-900 truncate">
              <span>{template.name}</span>
            </h2>
            {template.animationLevel && (
              <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 bg-white px-2.5 py-0.5 rounded-full border border-zinc-200">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500"></span>
                Motion: {template.animationLevel}
              </span>
            )}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Viewport Mode Switcher */}
            <div className="flex items-center bg-zinc-200/70 p-1 rounded-xl">
              <button
                onClick={() => setDeviceMode('desktop')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  deviceMode === 'desktop' 
                    ? 'bg-white text-zinc-900 shadow-2xs font-semibold' 
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
                title="Desktop View"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Desktop</span>
              </button>
              <button
                onClick={() => setDeviceMode('mobile')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  deviceMode === 'mobile' 
                    ? 'bg-white text-zinc-900 shadow-2xs font-semibold' 
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
                title="Mobile View (390px)"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mobile (390px)</span>
              </button>
            </div>

            {/* Apply Template Button */}
            <button
              onClick={() => {
                onUseTemplate(template.id);
                onClose();
              }}
              className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-zinc-900 text-white font-medium text-xs flex items-center gap-1.5 sm:gap-2 hover:bg-zinc-800 transition-all shadow-sm cursor-pointer"
            >
              <span>Use Template</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Close Modal */}
            <button 
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-xl text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200/60 transition-colors cursor-pointer"
              title="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Live Interactive Preview */}
        <div className="flex-1 bg-zinc-100 p-2 sm:p-6 overflow-hidden flex items-center justify-center relative">
          <div className={`transition-all duration-300 bg-white overflow-hidden shadow-2xl flex flex-col ${
            deviceMode === 'mobile' 
              ? 'w-full max-w-[390px] h-[780px] max-h-[85vh] rounded-2xl sm:rounded-[44px] border-4 sm:border-[10px] border-zinc-900 ring-1 ring-zinc-700/50' 
              : 'w-full h-full rounded-xl border border-zinc-200'
          }`}>
            {/* Dynamic Template Content */}
            <div className="w-full h-full overflow-y-auto overflow-x-hidden">
              <TemplateRenderer 
                data={portfolioData} 
                config={template.defaultConfig} 
                rendererType={template.rendererType} 
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
