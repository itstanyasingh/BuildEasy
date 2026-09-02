import React from 'react';
import { UserPortfolio, TemplateDefinition } from '../types';
import { TemplateRenderer } from './templates/TemplateRenderer';
import { ArrowLeft, Globe } from 'lucide-react';

interface PublishedViewProps {
  portfolio: UserPortfolio;
  template: TemplateDefinition;
  onBackToBuilder: () => void;
}

export const PublishedView: React.FC<PublishedViewProps> = ({
  portfolio,
  template,
  onBackToBuilder
}) => {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col">
      {/* Top Bar for previewing published status */}
      <div className="bg-zinc-900 text-white px-6 py-3 flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-zinc-400" />
          <span>Published Portfolio: <strong className="font-mono text-zinc-200">{window.location.origin}/p/{portfolio.username || 'portfolio'}</strong></span>
        </div>
        <button
          onClick={onBackToBuilder}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Editor
        </button>
      </div>

      <div className="flex-1">
        <TemplateRenderer 
          data={portfolio.publishedData || portfolio.data} 
          config={portfolio.publishedCustomizer || portfolio.customizer} 
          rendererType={template.rendererType} 
        />
      </div>
    </div>
  );
};
