import React, { useState } from 'react';
import { UserPortfolio, TemplateDefinition } from '../types';
import { TemplateRenderer } from './templates/TemplateRenderer';
import { ArrowLeft, Globe, Copy, Check, ExternalLink } from 'lucide-react';

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
  const [copied, setCopied] = useState(false);
  const slug = portfolio.username || 'portfolio';
  const publicUrl = portfolio.publicUrl || `https://buildeasy.com/p/${slug}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenLive = () => {
    window.open(`/p/${slug}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col">
      {/* Top Bar for previewing published status */}
      <div className="bg-zinc-900 text-white px-4 sm:px-6 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm shrink-0 border-b border-zinc-800">
        <div className="flex items-center gap-2 min-w-0 max-w-[75%] sm:max-w-none">
          <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="truncate text-zinc-300">
            Live URL: <strong className="font-mono text-white font-medium">{publicUrl}</strong>
          </span>
          <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            Verified Live
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
            title="Copy Public Link"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy Link'}</span>
          </button>

          <button
            onClick={handleOpenLive}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
            title="Open Live Portfolio"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Open Live</span>
          </button>

          <button
            onClick={onBackToBuilder}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold transition-colors cursor-pointer text-white"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Editor</span>
          </button>
        </div>
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
