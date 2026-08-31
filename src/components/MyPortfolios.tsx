import React from 'react';
import { UserPortfolio, TemplateDefinition } from '../types';
import { Plus, Globe, Edit3, Copy, Trash2, ExternalLink, Calendar } from 'lucide-react';

interface MyPortfoliosProps {
  portfolios: UserPortfolio[];
  templates: TemplateDefinition[];
  onEditPortfolio: (id: string) => void;
  onDuplicatePortfolio: (id: string) => void;
  onDeletePortfolio: (id: string) => void;
  onCreateNew: () => void;
  onOpenPublish: (portfolio: UserPortfolio) => void;
}

export const MyPortfolios: React.FC<MyPortfoliosProps> = ({
  portfolios,
  templates,
  onEditPortfolio,
  onDuplicatePortfolio,
  onDeletePortfolio,
  onCreateNew,
  onOpenPublish
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">Dashboard</span>
          <h1 className="text-3xl font-bold tracking-tight">My Portfolios</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Manage, customize, and publish your professional portfolio websites.</p>
        </div>
        <button
          onClick={onCreateNew}
          className="px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold text-sm hover:opacity-90 flex items-center gap-2 shadow-sm w-fit"
        >
          <Plus className="w-4 h-4" />
          Create New Portfolio
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolios.map((portfolio) => {
          const template = templates.find(t => t.id === portfolio.templateId);
          return (
            <div 
              key={portfolio.id}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    portfolio.published ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                  }`}>
                    {portfolio.published ? 'Live' : 'Draft'}
                  </span>
                  <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {portfolio.updatedAt}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold tracking-tight">{portfolio.name}</h3>
                  <p className="text-sm font-medium text-zinc-500">{template?.name || 'Custom Template'}</p>
                </div>

                <div className="text-xs text-zinc-500 font-mono bg-zinc-50 dark:bg-zinc-800/50 p-2 rounded-lg truncate">
                  buildeasy.app/p/{portfolio.username || 'portfolio'}
                </div>
              </div>

              <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onEditPortfolio(portfolio.id)}
                    className="p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                    title="Edit Builder"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onOpenPublish(portfolio)}
                    className="p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                    title="Publish settings"
                  >
                    <Globe className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDuplicatePortfolio(portfolio.id)}
                    className="p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                    title="Duplicate"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => onDeletePortfolio(portfolio.id)}
                  className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                  title="Delete Portfolio"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
