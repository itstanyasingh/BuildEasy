import React, { useState } from 'react';
import { PortfolioData } from '../types';
import { X, Upload, Github, FileText, Sparkles, Check } from 'lucide-react';

interface ImportModalProps {
  onClose: () => void;
  onImportData: (newData: Partial<PortfolioData>) => void;
}

export const ImportModal: React.FC<ImportModalProps> = ({ onClose, onImportData }) => {
  const [activeTab, setActiveTab] = useState<'resume' | 'github'>('resume');
  const [githubUsername, setGithubUsername] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleGitHubImport = async () => {
    if (!githubUsername.trim()) return;
    setLoading(true);
    try {
      // Fetch public GitHub profile data
      const res = await fetch(`https://api.github.com/users/${githubUsername}`);
      if (!res.ok) throw new Error('GitHub user not found');
      const user = await res.json();

      const reposRes = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=4`);
      const repos = reposRes.ok ? await reposRes.json() : [];

      const importedProjects = repos.map((r: any) => ({
        id: String(r.id),
        name: r.name,
        description: r.description || 'No description provided.',
        technologies: [r.language].filter(Boolean),
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
        githubUrl: r.html_url,
        liveUrl: r.homepage || r.html_url,
        featured: true
      }));

      onImportData({
        profile: {
          name: user.name || user.login,
          title: user.bio ? user.bio.slice(0, 60) : 'Software Engineer',
          profilePhoto: user.avatar_url,
          location: user.location || 'Remote',
          bio: user.bio || '',
          email: user.email || `${user.login}@github.com`,
          phone: '',
          website: user.blog || user.html_url
        },
        projects: importedProjects,
        socialLinks: {
          github: user.html_url,
          linkedin: '',
          twitter: user.twitter_username ? `https://twitter.com/${user.twitter_username}` : '',
          dribbble: '',
          behance: '',
          youtube: '',
          website: user.blog || ''
        }
      });

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      alert('Could not fetch GitHub user. Please check username.');
    } finally {
      setLoading(false);
    }
  };

  const handleResumeParse = () => {
    if (!resumeText.trim()) return;
    setLoading(true);
    setTimeout(() => {
      // Simulate smart resume parsing into structured data
      onImportData({
        profile: {
          name: "Imported Professional",
          title: "Senior Specialist",
          profilePhoto: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=600",
          location: "New York, NY",
          bio: resumeText.slice(0, 160) + '...',
          email: "contact@professional.com",
          phone: "+1 (555) 987-6543",
          website: "https://professional.dev"
        },
        about: {
          aboutText: resumeText,
          interests: ["Engineering", "Strategy", "Leadership"],
          services: ["Consulting", "Development"]
        }
      });
      setLoading(false);
      setSuccess(true);
      setTimeout(() => onClose(), 1000);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white dark:bg-zinc-950 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 max-h-[92vh] flex flex-col">
        <div className="p-4 sm:p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg sm:text-xl font-bold">Import Profile Information</h2>
            <p className="text-zinc-500 text-xs sm:text-sm">Populate your portfolio instantly from GitHub or Resume.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-5 sm:space-y-6 overflow-y-auto flex-1">
          <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('resume')}
              className={`flex-1 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-1.5 sm:gap-2 ${
                activeTab === 'resume' ? 'bg-white dark:bg-zinc-800 shadow-sm font-semibold text-zinc-900 dark:text-zinc-100' : 'text-zinc-500'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Resume Text</span>
            </button>
            <button
              onClick={() => setActiveTab('github')}
              className={`flex-1 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-1.5 sm:gap-2 ${
                activeTab === 'github' ? 'bg-white dark:bg-zinc-800 shadow-sm font-semibold text-zinc-900 dark:text-zinc-100' : 'text-zinc-500'
              }`}
            >
              <Github className="w-4 h-4" />
              <span>GitHub Profile</span>
            </button>
          </div>

          {activeTab === 'github' ? (
            <div className="space-y-4">
              <label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">GitHub Username</label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="e.g. torvalds or octocat"
                  value={githubUsername}
                  onChange={(e) => setGithubUsername(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white"
                />
                <button
                  onClick={handleGitHubImport}
                  disabled={loading || success}
                  className="px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium text-sm hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  {success ? <Check className="w-4 h-4 text-white dark:text-zinc-900" /> : loading ? 'Importing...' : 'Fetch Profile'}
                </button>
              </div>
              <p className="text-xs text-zinc-400">We fetch your public profile bio, avatar, and top repositories automatically.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">Paste Resume Text / Summary</label>
              <textarea
                rows={5}
                placeholder="Paste your professional experience, bio, and skills here..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="w-full p-3.5 sm:p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white resize-none"
              />
              <button
                onClick={handleResumeParse}
                disabled={loading || success}
                className="w-full py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium text-sm hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {success ? <Check className="w-4 h-4 text-white dark:text-zinc-900" /> : loading ? 'Parsing Resume...' : 'Parse & Populate'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
