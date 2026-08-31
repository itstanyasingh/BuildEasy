import React, { useState } from 'react';
import { UserPortfolio } from '../types';
import { X, Globe, Check, Copy, ExternalLink, Share2 } from 'lucide-react';

interface PublishModalProps {
  portfolio: UserPortfolio;
  onClose: () => void;
  onUpdatePublish: (published: boolean, username: string) => void;
  onViewPublished: () => void;
}

export const PublishModal: React.FC<PublishModalProps> = ({
  portfolio,
  onClose,
  onUpdatePublish,
  onViewPublished
}) => {
  const [username, setUsername] = useState(portfolio.username || portfolio.name.toLowerCase().replace(/[^a-z0-9]/g, ''));
  const [copied, setCopied] = useState(false);

  const publishedUrl = `https://buildeasy.app/p/${username || 'portfolio'}`;

  const handlePublishToggle = () => {
    onUpdatePublish(true, username);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(publishedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-950 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-xl font-bold">Publish Portfolio</h2>
            <p className="text-zinc-500 text-sm">Make your portfolio live to the world.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Custom Subdomain</label>
            <div className="flex items-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 overflow-hidden">
              <span className="pl-4 pr-1 text-sm text-zinc-400">buildeasy.app/p/</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                className="flex-1 py-3 pr-4 bg-transparent text-sm font-medium focus:outline-none"
                placeholder="username"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Publication Status</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                portfolio.published ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900' : 'bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
              }`}>
                {portfolio.published ? 'Live' : 'Draft'}
              </span>
            </div>
            <p className="text-xs text-zinc-500">Includes semantic HTML, Open Graph meta tags, and responsive mobile rendering.</p>
          </div>

          {portfolio.published && (
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Your Live Link</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={publishedUrl}
                  className="flex-1 px-3.5 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs font-mono"
                />
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  title="Copy Link"
                >
                  {copied ? <Check className="w-4 h-4 text-zinc-900 dark:text-white" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={onViewPublished}
                  className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  title="View Live"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <button
              onClick={() => {
                handlePublishToggle();
                onViewPublished();
              }}
              className="flex-1 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold text-sm hover:opacity-90 flex items-center justify-center gap-2 shadow-sm"
            >
              <Globe className="w-4 h-4" />
              {portfolio.published ? 'Save & View Live' : 'Publish Portfolio'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
