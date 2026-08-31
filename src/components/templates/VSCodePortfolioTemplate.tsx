import React, { useState, useEffect, useMemo, useRef } from 'react';
import { PortfolioData, LayoutConfiguration } from '../../types';
import { VSCodePortfolioAdapter, VSCodePortfolioData } from '../../lib/VSCodePortfolioAdapter';
import { 
  Terminal as TerminalIcon, Folder, FileCode, Check, Send, AlertCircle, Info, 
  Settings, Code, FileText, ChevronRight, ChevronDown, Layers, Menu, X, 
  Command, GitBranch, Bell, RefreshCw, Search, Eye, Cpu, Mail, Globe, 
  Github, Linkedin, Twitter, ExternalLink, HelpCircle, User, Package, Circle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VSCodePortfolioTemplateProps {
  data: PortfolioData;
  config?: LayoutConfiguration;
}

// Themes variables configuration mapping
interface EditorTheme {
  name: string;
  id: string;
  bgEditor: string;
  bgSidebar: string;
  bgActivity: string;
  bgTabs: string;
  bgTabActive: string;
  textForeground: string;
  textComment: string;
  textKeyword: string;
  textString: string;
  textFn: string;
  textVar: string;
  borderAccent: string;
  primaryAccent: string;
  textMuted: string;
  statusBarBg: string;
}

const THEMES: Record<string, EditorTheme> = {
  'github-dark': {
    name: 'GitHub Dark',
    id: 'github-dark',
    bgEditor: 'bg-[#0d1117]',
    bgSidebar: 'bg-[#161b22]',
    bgActivity: 'bg-[#21262d]',
    bgTabs: 'bg-[#161b22]',
    bgTabActive: 'bg-[#0d1117]',
    textForeground: 'text-[#c9d1d9]',
    textComment: 'text-[#8b949e]',
    textKeyword: 'text-[#ff7b72]',
    textString: 'text-[#a5d6ff]',
    textFn: 'text-[#d2a8ff]',
    textVar: 'text-[#79c0ff]',
    borderAccent: 'border-[#1f6feb]',
    primaryAccent: '#1f6feb',
    textMuted: 'text-[#8b949e]',
    statusBarBg: 'bg-[#21262d]',
  },
  'one-dark-pro': {
    name: 'One Dark Pro',
    id: 'one-dark-pro',
    bgEditor: 'bg-[#282c34]',
    bgSidebar: 'bg-[#21252b]',
    bgActivity: 'bg-[#1e1e24]',
    bgTabs: 'bg-[#21252b]',
    bgTabActive: 'bg-[#282c34]',
    textForeground: 'text-[#abb2bf]',
    textComment: 'text-[#5c6370]',
    textKeyword: 'text-[#c678dd]',
    textString: 'text-[#98c379]',
    textFn: 'text-[#61afef]',
    textVar: 'text-[#e06c75]',
    borderAccent: 'border-[#61afef]',
    primaryAccent: '#61afef',
    textMuted: 'text-[#5c6370]',
    statusBarBg: 'bg-[#21252b]',
  },
  'dracula': {
    name: 'Dracula',
    id: 'dracula',
    bgEditor: 'bg-[#282a36]',
    bgSidebar: 'bg-[#1e1f29]',
    bgActivity: 'bg-[#191a21]',
    bgTabs: 'bg-[#1e1f29]',
    bgTabActive: 'bg-[#282a36]',
    textForeground: 'text-[#f8f8f2]',
    textComment: 'text-[#6272a4]',
    textKeyword: 'text-[#ff79c6]',
    textString: 'text-[#f1fa8c]',
    textFn: 'text-[#50fa7b]',
    textVar: 'text-[#8be9fd]',
    borderAccent: 'border-[#bd93f9]',
    primaryAccent: '#bd93f9',
    textMuted: 'text-[#6272a4]',
    statusBarBg: 'bg-[#191a21]',
  },
  'ayu-dark': {
    name: 'Ayu Dark',
    id: 'ayu-dark',
    bgEditor: 'bg-[#0f1419]',
    bgSidebar: 'bg-[#14191f]',
    bgActivity: 'bg-[#191e24]',
    bgTabs: 'bg-[#14191f]',
    bgTabActive: 'bg-[#0f1419]',
    textForeground: 'text-[#e6b450]',
    textComment: 'text-[#5c6773]',
    textKeyword: 'text-[#ff7733]',
    textString: 'text-[#c2d94c]',
    textFn: 'text-[#f29718]',
    textVar: 'text-[#39bae6]',
    borderAccent: 'border-[#ffb454]',
    primaryAccent: '#ffb454',
    textMuted: 'text-[#5c6773]',
    statusBarBg: 'bg-[#14191f]',
  },
  'nord': {
    name: 'Nord',
    id: 'nord',
    bgEditor: 'bg-[#2e3440]',
    bgSidebar: 'bg-[#242933]',
    bgActivity: 'bg-[#1e222a]',
    bgTabs: 'bg-[#242933]',
    bgTabActive: 'bg-[#2e3440]',
    textForeground: 'text-[#d8dee9]',
    textComment: 'text-[#4c566a]',
    textKeyword: 'text-[#81a1c1]',
    textString: 'text-[#a3be8c]',
    textFn: 'text-[#8fbcbb]',
    textVar: 'text-[#88c0d0]',
    borderAccent: 'border-[#88c0d0]',
    primaryAccent: '#88c0d0',
    textMuted: 'text-[#4c566a]',
    statusBarBg: 'bg-[#1e222a]',
  }
};

type VSCodeSidebarView = 'explorer' | 'search' | 'git' | 'extensions' | 'none';

interface TabFile {
  name: string;
  icon: string;
  color: string;
  type: 'tsx' | 'html' | 'js' | 'json' | 'css' | 'md';
}

const FILES: Record<string, TabFile> = {
  'home.tsx': { name: 'home.tsx', icon: 'FileCode', color: 'text-blue-400', type: 'tsx' },
  'about.html': { name: 'about.html', icon: 'FileCode', color: 'text-orange-400', type: 'html' },
  'projects.js': { name: 'projects.js', icon: 'FileCode', color: 'text-yellow-400', type: 'js' },
  'experience.json': { name: 'experience.json', icon: 'FileText', color: 'text-green-400', type: 'json' },
  'skills.json': { name: 'skills.json', icon: 'FileText', color: 'text-cyan-400', type: 'json' },
  'contact.css': { name: 'contact.css', icon: 'FileCode', color: 'text-purple-400', type: 'css' },
  'github.md': { name: 'github.md', icon: 'FileCode', color: 'text-emerald-400', type: 'md' },
  'settings.json': { name: 'settings.json', icon: 'Settings', color: 'text-pink-400', type: 'json' },
};

export const VSCodePortfolioTemplate: React.FC<VSCodePortfolioTemplateProps> = ({ data, config }) => {
  // Map standard data to local model
  const portfolio = useMemo(() => VSCodePortfolioAdapter(data), [data]);

  // States
  const [selectedThemeId, setSelectedThemeId] = useState<string>('github-dark');
  const [activeFile, setActiveFile] = useState<string>('home.tsx');
  const [openTabs, setOpenTabs] = useState<string[]>(['home.tsx', 'about.html', 'projects.js']);
  const [sidebarView, setSidebarView] = useState<VSCodeSidebarView>('explorer');
  const [terminalOpen, setTerminalOpen] = useState<boolean>(true);
  
  // Sidebar Search and extension features
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [installedExtensions, setInstalledExtensions] = useState<string[]>([]);
  const [extensionsSearch, setExtensionsSearch] = useState<string>('');

  // Terminal history
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; result: string }>>([
    { cmd: 'system_info', result: `OS: BuildEasy WebContainer v1.4.2\nCPU: Virtual CPU x86_64\nMemory: 8192 MB\nRunning developer environment... Type help for commands.` }
  ]);
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [contactSubject, setContactSubject] = useState<string>('');
  const [contactMessage, setContactMessage] = useState<string>('');
  const [contactSender, setContactSender] = useState<string>('');
  const [isCompilingContact, setIsCompilingContact] = useState<boolean>(false);
  const [contactSuccessMessage, setContactSuccessMessage] = useState<string>('');

  const [projectFilter, setProjectFilter] = useState<string>('All');
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  const activeTheme = THEMES[selectedThemeId] || THEMES['github-dark'];

  // Project unique technologies
  const allTechnologies = useMemo(() => {
    const list = new Set<string>();
    portfolio.projects.forEach(p => {
      p.technologies?.forEach(tech => list.add(tech));
    });
    return ['All', ...Array.from(list)];
  }, [portfolio.projects]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (projectFilter === 'All') return portfolio.projects;
    return portfolio.projects.filter(p => p.technologies?.includes(projectFilter));
  }, [portfolio.projects, projectFilter]);

  // Open file in tabs
  const handleOpenFile = (filename: string) => {
    if (!openTabs.includes(filename)) {
      setOpenTabs([...openTabs, filename]);
    }
    setActiveFile(filename);
  };

  // Close file tab
  const handleCloseTab = (e: React.MouseEvent, filename: string) => {
    e.stopPropagation();
    const newTabs = openTabs.filter(t => t !== filename);
    setOpenTabs(newTabs);
    if (activeFile === filename) {
      if (newTabs.length > 0) {
        setActiveFile(newTabs[newTabs.length - 1]);
      } else {
        setActiveFile('');
      }
    }
  };

  // Toggles explorer or other sidebar panels
  const handleActivityClick = (view: VSCodeSidebarView) => {
    if (sidebarView === view) {
      setSidebarView('none'); // Collapse
    } else {
      setSidebarView(view);
    }
  };

  // Execute mock Terminal Commands
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = terminalInput.trim().toLowerCase();
    if (!input) return;

    let result = '';
    if (input === 'help') {
      result = `Available commands:\n  help          - Show list of commands\n  clear         - Clear terminal console\n  about         - Execute a node query on biography\n  projects      - Fetch all developer projects\n  skills        - Query proficiencies\n  contact       - Dispatch direct messages\n  git status    - Show current workspace status\n  theme list    - Show available VSCode themes`;
    } else if (input === 'clear') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    } else if (input === 'about') {
      result = `Running query on developer bio...\n"${portfolio.about.aboutText}"\nInterests: ${portfolio.about.interests.join(', ')}`;
    } else if (input === 'projects') {
      result = `Found ${portfolio.projects.length} workspace projects:\n` + portfolio.projects.map(p => ` - ${p.name} (${p.year}): ${p.description}`).join('\n');
    } else if (input === 'skills') {
      result = `Querying skills schema:\n` + portfolio.skills.map(s => ` - ${s.name}: ${s.proficiency}% (${s.category})`).join('\n');
    } else if (input === 'git status') {
      result = `On branch main\nYour branch is up to date with 'origin/main'.\n\nChanges not staged for commit:\n  modified:   src/data/profile.json\n  modified:   src/components/About.tsx\n\nno changes added to commit (use "git add" and/or "git commit")`;
    } else if (input === 'theme list') {
      result = `Available themes:\n` + Object.values(THEMES).map(t => `  • ${t.name} (ID: ${t.id})`).join('\n') + `\nRun settings.json to change configuration.`;
    } else if (input.startsWith('theme ')) {
      const themeId = input.replace('theme ', '').trim();
      if (THEMES[themeId]) {
        setSelectedThemeId(themeId);
        result = `Switched editor theme to ${THEMES[themeId].name}!`;
      } else {
        result = `Theme "${themeId}" not found. Type "theme list" to view available options.`;
      }
    } else {
      result = `sh: command not found: ${input}. Type 'help' for available actions.`;
    }

    setTerminalHistory([...terminalHistory, { cmd: terminalInput, result }]);
    setTerminalInput('');
  };

  // Auto scroll terminal to bottom
  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory]);

  // Quick Command triggers from welcome screen
  const runCommandShortcut = (cmd: string) => {
    setTerminalOpen(true);
    let result = '';
    if (cmd === 'node bio.js') {
      result = `Running node query on biography...\n"${portfolio.about.aboutText}"`;
    } else if (cmd === 'git log') {
      result = `commit f7808bf6d8f8e08d6d817 (HEAD -> main)\nAuthor: ${portfolio.profile.name} <${portfolio.profile.email}>\nDate:   ${new Date().toLocaleDateString()} 12:44:21\n\n    Add fully functional VSCode Portfolio experience #008`;
    }
    setTerminalHistory([...terminalHistory, { cmd, result }]);
  };

  // Process contact form compilation
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactSender || !contactMessage) {
      alert('Please fill out your Email and Message lines before submitting.');
      return;
    }

    setIsCompilingContact(true);
    setTerminalOpen(true);
    setTerminalHistory(prev => [...prev, {
      cmd: 'npm run deploy:contact',
      result: `[1/3] Packing contact payload...\n[2/3] Resolving SMTP secure relay connection to ${portfolio.profile.email}...\n[3/3] Sending transmission request...`
    }]);

    setTimeout(() => {
      setIsCompilingContact(false);
      setContactSuccessMessage('Your message compiled and transmitted successfully!');
      setTerminalHistory(prev => [...prev, {
        cmd: 'SUCCESS',
        result: `Transmission dispatched! Response 200 OK from SMTP relay.\nThank you for getting in touch, ${contactSender}! I will reply shortly.`
      }]);
      // Clear inputs
      setContactSender('');
      setContactSubject('');
      setContactMessage('');
    }, 2000);
  };

  // Helper to render proper icon
  const getFileIcon = (iconName: string, customClass: string) => {
    switch (iconName) {
      case 'Settings':
        return <Settings className={`${customClass}`} size={16} />;
      case 'FileCode':
        return <FileCode className={`${customClass}`} size={16} />;
      case 'FileText':
        return <FileText className={`${customClass}`} size={16} />;
      default:
        return <FileCode className={`${customClass}`} size={16} />;
    }
  };

  return (
    <div className={`w-full h-screen flex flex-col font-mono text-[14px] leading-relaxed overflow-hidden select-none transition-colors duration-200 ${activeTheme.bgEditor} ${activeTheme.textForeground}`}>
      
      {/* 1. TOP WINDOW TITLE BAR */}
      <div className={`h-[35px] w-full flex items-center justify-between px-3 shrink-0 border-b border-white/5 select-none ${activeTheme.bgSidebar}`}>
        {/* Window controls circles */}
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500 opacity-80 hover:opacity-100 transition-opacity" />
          <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80 hover:opacity-100 transition-opacity" />
          <div className="w-3 h-3 rounded-full bg-green-500 opacity-80 hover:opacity-100 transition-opacity" />
          <span className="ml-3 text-xs opacity-50 flex items-center gap-1.5 font-sans">
            <Cpu size={12} /> {portfolio.profile.name} — IDE Portfolio
          </span>
        </div>

        {/* Global search title bar style */}
        <div className="hidden md:flex items-center justify-center bg-white/5 border border-white/5 rounded-md px-12 py-1 text-xs text-white/40 max-w-sm w-full font-sans cursor-pointer hover:bg-white/10 transition-colors">
          <Search size={12} className="mr-2" />
          {portfolio.profile.name.toLowerCase().replace(/\s+/g, '-')}-portfolio
        </div>

        <div className="text-xs text-white/30 font-sans">
          v1.8.0-prod
        </div>
      </div>

      {/* 2. MAIN CORE LAYOUT FRAME */}
      <div className="flex w-full flex-1 overflow-hidden min-h-0">
        
        {/* 2A. LEFT ACTIVITY BAR (THEME SWITCHABLE ACTIONS) */}
        <div className={`w-[50px] shrink-0 flex flex-col justify-between items-center py-4 border-r border-white/5 select-none ${activeTheme.bgActivity}`}>
          {/* Main sections selectors */}
          <div className="flex flex-col space-y-5 w-full items-center">
            
            {/* Explorer view switcher */}
            <button 
              onClick={() => handleActivityClick('explorer')}
              title="Explorer"
              className={`relative p-2 rounded-lg transition-all focus:outline-none ${sidebarView === 'explorer' ? 'text-white opacity-100' : 'text-white/40 hover:text-white/80'}`}
              id="vscode-activity-explorer"
            >
              {sidebarView === 'explorer' && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[20px] rounded-r bg-blue-500" />
              )}
              <Layers size={22} />
            </button>

            {/* Global custom command palette search tab */}
            <button 
              onClick={() => handleActivityClick('search')}
              title="Search Portfolio"
              className={`relative p-2 rounded-lg transition-all focus:outline-none ${sidebarView === 'search' ? 'text-white opacity-100' : 'text-white/40 hover:text-white/80'}`}
              id="vscode-activity-search"
            >
              {sidebarView === 'search' && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[20px] rounded-r bg-blue-500" />
              )}
              <Search size={22} />
            </button>

            {/* Git Source Control Panel */}
            <button 
              onClick={() => handleActivityClick('git')}
              title="Git Source Control (1 Pending Change)"
              className={`relative p-2 rounded-lg transition-all focus:outline-none ${sidebarView === 'git' ? 'text-white opacity-100' : 'text-white/40 hover:text-white/80'}`}
              id="vscode-activity-git"
            >
              {sidebarView === 'git' && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[20px] rounded-r bg-blue-500" />
              )}
              <div className="relative">
                <GitBranch size={22} />
                <span className="absolute -top-1.5 -right-1.5 bg-blue-500 text-white text-[9px] px-1 rounded-full font-sans font-bold leading-none py-0.5">
                  1
                </span>
              </div>
            </button>

            {/* Portfolio Extensions tab */}
            <button 
              onClick={() => handleActivityClick('extensions')}
              title="Extensions Market"
              className={`relative p-2 rounded-lg transition-all focus:outline-none ${sidebarView === 'extensions' ? 'text-white opacity-100' : 'text-white/40 hover:text-white/80'}`}
              id="vscode-activity-extensions"
            >
              {sidebarView === 'extensions' && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[20px] rounded-r bg-blue-500" />
              )}
              <Package size={22} />
            </button>
          </div>

          {/* Lower utility buttons */}
          <div className="flex flex-col space-y-4 w-full items-center text-white/40">
            {/* Account dropdown indicator */}
            <button 
              onClick={() => handleOpenFile('github.md')}
              title={`GitHub Profile: ${portfolio.githubUsername}`}
              className="p-1 hover:text-white/80 transition-colors focus:outline-none"
              id="vscode-activity-github"
            >
              <Github size={20} />
            </button>
            
            {/* Settings Quick Theme trigger */}
            <button 
              onClick={() => handleOpenFile('settings.json')}
              title="Settings — Edit Color Theme"
              className="p-1 hover:text-white/80 transition-colors focus:outline-none"
              id="vscode-activity-settings"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>

        {/* 2B. FOLDER/FILE EXPLORER OR ACTION SIDE PANEL */}
        <AnimatePresence initial={false}>
          {sidebarView !== 'none' && (
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 240, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className={`h-full shrink-0 flex flex-col border-r border-white/5 select-none overflow-hidden ${activeTheme.bgSidebar}`}
              id="vscode-sidebar"
            >
              
              {/* SIDEBAR TITLE HEADER */}
              <div className="h-[40px] px-4 flex items-center justify-between border-b border-white/5 shrink-0">
                <span className="text-xs uppercase font-bold tracking-wider text-white/50">
                  {sidebarView === 'explorer' && 'Explorer'}
                  {sidebarView === 'search' && 'Search Files'}
                  {sidebarView === 'git' && 'Source Control'}
                  {sidebarView === 'extensions' && 'Extensions'}
                </span>
                <button 
                  onClick={() => setSidebarView('none')} 
                  className="p-1 hover:bg-white/10 rounded text-white/50 hover:text-white"
                >
                  <X size={14} />
                </button>
              </div>

              {/* VIEW CONTENTS */}
              <div className="flex-1 overflow-y-auto min-h-0 text-xs">
                
                {/* EXPLORER PANEL VIEW */}
                {sidebarView === 'explorer' && (
                  <div className="py-2">
                    {/* Collapsible PORTFOLIO parent folder block */}
                    <div className="flex items-center px-4 py-1 text-white/70 font-bold hover:bg-white/5 cursor-pointer">
                      <ChevronDown size={14} className="mr-1" />
                      <Folder size={14} className="mr-2 text-yellow-500 fill-yellow-500/10" />
                      <span className="tracking-wide">PORTFOLIO</span>
                    </div>

                    {/* Interactive Virtual File Trees */}
                    <div className="pl-4">
                      {Object.entries(FILES).map(([filename, item]) => {
                        const isActive = activeFile === filename;
                        return (
                          <div 
                            key={filename}
                            onClick={() => handleOpenFile(filename)}
                            className={`flex items-center pl-6 pr-4 py-1.5 cursor-pointer border-l-2 transition-all ${
                              isActive 
                                ? `${activeTheme.borderAccent} bg-white/5 text-white font-medium` 
                                : 'border-transparent text-white/50 hover:bg-white/5 hover:text-white/80'
                            }`}
                            id={`vscode-file-${filename.replace('.', '-')}`}
                          >
                            {getFileIcon(item.icon, `mr-2 ${item.color}`)}
                            <span>{item.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* SEARCH PANEL VIEW */}
                {sidebarView === 'search' && (
                  <div className="p-3 space-y-3">
                    <div className="relative">
                      <input 
                        type="text"
                        placeholder="Search text in workspace..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-black/30 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white/80 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    {searchQuery ? (
                      <div className="space-y-1.5 py-1">
                        <span className="text-white/40 block text-[11px]">RESULTS IN WORKSPACE:</span>
                        {/* Interactive live filter linking to actual files matching results */}
                        {Object.entries(FILES).filter(([name]) => name.includes(searchQuery.toLowerCase())).map(([name]) => (
                          <div 
                            key={name}
                            onClick={() => handleOpenFile(name)}
                            className="p-2 rounded bg-white/5 hover:bg-white/10 cursor-pointer border border-white/5 text-white/70 flex items-center justify-between"
                          >
                            <span>{name}</span>
                            <span className="text-[10px] opacity-40 px-1 bg-white/5 rounded">File Match</span>
                          </div>
                        ))}
                        {Object.entries(FILES).filter(([name]) => name.includes(searchQuery.toLowerCase())).length === 0 && (
                          <div className="text-white/30 text-xs py-2 italic text-center">No structural file matches found</div>
                        )}
                      </div>
                    ) : (
                      <div className="text-white/30 text-[11px] leading-relaxed">
                        Type file keywords or sections to query search indexing. Try searching "json" or "css".
                      </div>
                    )}
                  </div>
                )}

                {/* SOURCE CONTROL PANEL VIEW */}
                {sidebarView === 'git' && (
                  <div className="p-3 space-y-3">
                    <span className="text-white/40 text-[10px] uppercase font-semibold">Workspace Changes</span>
                    <div className="bg-white/5 p-2.5 rounded border border-white/5">
                      <div className="flex items-center justify-between text-white/80 mb-2">
                        <span className="font-bold">Modified Files</span>
                        <span className="text-xs bg-blue-500 text-white px-1.5 rounded-full">1</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-white/60 pl-2">
                        <div className="flex items-center">
                          <FileCode size={12} className="mr-1.5 text-yellow-500" />
                          <span>contact.css</span>
                        </div>
                        <span className="text-amber-400 font-bold">M</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => runCommandShortcut('git commit -am "Update portfolio"')}
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-1.5 px-3 rounded text-center cursor-pointer transition-colors"
                    >
                      Commit to main branch
                    </button>
                  </div>
                )}

                {/* EXTENSIONS MARKET VIEW */}
                {sidebarView === 'extensions' && (
                  <div className="p-3 space-y-3">
                    <input 
                      type="text"
                      placeholder="Search extensions..."
                      value={extensionsSearch}
                      onChange={(e) => setExtensionsSearch(e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded px-2 py-1 text-xs text-white/80 focus:outline-none focus:border-blue-500"
                    />
                    <div className="space-y-2 py-1">
                      {[
                        { id: 'react-dev', name: 'React Developer Pro', desc: 'React 19 debugging tooling.', author: 'Meta' },
                        { id: 'prettier', name: 'Prettier Formatter', desc: 'Auto formatting styles.', author: 'Prettier' },
                        { id: 'tailwind', name: 'Tailwind CSS IntelliSense', desc: 'Tailwind suggestions.', author: 'Tailwind' },
                      ].filter(ext => ext.name.toLowerCase().includes(extensionsSearch.toLowerCase())).map(ext => {
                        const isInst = installedExtensions.includes(ext.id);
                        return (
                          <div key={ext.id} className="p-2 bg-white/5 border border-white/5 rounded flex flex-col space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-white/80">{ext.name}</span>
                              <button 
                                onClick={() => {
                                  if (!isInst) {
                                    setInstalledExtensions([...installedExtensions, ext.id]);
                                    setTerminalHistory(prev => [...prev, { cmd: `ext install ${ext.id}`, result: `Installed package ${ext.name} successfully.` }]);
                                  }
                                }}
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${isInst ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
                              >
                                {isInst ? 'Installed' : 'Install'}
                              </button>
                            </div>
                            <span className="text-[10px] text-white/50">{ext.desc}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2C. PRIMARY CENTRAL EDITOR & TERMINAL FRAME */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0 bg-transparent">
          
          {/* EDITOR HEADERS TABS BAR */}
          <div className={`h-[40px] w-full flex items-center overflow-x-auto overflow-y-hidden border-b border-white/5 shrink-0 select-none ${activeTheme.bgTabs}`} id="vscode-tabsbar">
            {openTabs.map(tab => {
              const fileItem = FILES[tab];
              const isActive = activeFile === tab;
              if (!fileItem) return null;
              
              return (
                <div 
                  key={tab}
                  onClick={() => setActiveFile(tab)}
                  className={`h-full flex items-center px-4 py-2 border-r border-white/5 cursor-pointer relative shrink-0 text-xs transition-colors ${
                    isActive 
                      ? `${activeTheme.bgTabActive} text-white border-t-2 ${activeTheme.borderAccent}` 
                      : 'bg-black/10 text-white/40 hover:text-white/70 hover:bg-black/5'
                  }`}
                  id={`vscode-tab-${tab.replace('.', '-')}`}
                >
                  {getFileIcon(fileItem.icon, `mr-2 ${fileItem.color}`)}
                  <span>{fileItem.name}</span>
                  <button 
                    onClick={(e) => handleCloseTab(e, tab)}
                    className="ml-3 p-0.5 rounded-full hover:bg-white/10 text-white/30 hover:text-white transition-all focus:outline-none"
                  >
                    <X size={10} />
                  </button>
                </div>
              );
            })}

            {/* Empty space filler */}
            {openTabs.length === 0 && (
              <div className="px-4 py-2 text-xs text-white/30 italic">No editors open</div>
            )}
          </div>

          {/* ACTIVE FILE EDITOR CANVAS SCREEN */}
          <div className={`flex-1 overflow-y-auto relative ${activeTheme.bgEditor} text-white`} id="vscode-editor">
            
            {openTabs.length > 0 && activeFile ? (
              <div className="flex min-h-full">
                
                {/* Line number rail */}
                <div className={`w-[45px] shrink-0 text-right pr-3 pl-1 py-4 select-none border-r border-white/5 font-sans text-xs ${activeTheme.textMuted} opacity-40`}>
                  {Array.from({ length: 45 }).map((_, i) => (
                    <div key={i} className="leading-6 h-[24px] pr-1">{i + 1}</div>
                  ))}
                </div>

                {/* File source codes and custom interactive UI overlays */}
                <div className="flex-1 py-4 px-5 overflow-x-auto font-mono text-[14px]">
                  
                  {/* HOME.TSX EDITOR PAGE */}
                  {activeFile === 'home.tsx' && (
                    <div className="space-y-6">
                      {/* Code imports header */}
                      <div className="space-y-1">
                        <div><span className={activeTheme.textKeyword}>import</span> React <span className={activeTheme.textKeyword}>from</span> <span className={activeTheme.textString}>'react'</span>;</div>
                        <div><span className={activeTheme.textKeyword}>import</span> &#123; Developer, Terminal &#125; <span className={activeTheme.textKeyword}>from</span> <span className={activeTheme.textString}>'./developer'</span>;</div>
                      </div>

                      {/* Code main function wrapper */}
                      <div className="space-y-1.5">
                        <div><span className={activeTheme.textKeyword}>export default function</span> <span className={activeTheme.textFn}>Home</span>() &#123;</div>
                        <div className="pl-4"><span className={activeTheme.textKeyword}>return</span> (</div>
                        <div className="pl-8 text-blue-300">&lt;<span className="text-teal-400">Developer</span></div>
                        <div className="pl-12">name=<span className={activeTheme.textString}>"{portfolio.profile.name}"</span></div>
                        <div className="pl-12">role=<span className={activeTheme.textString}>"{portfolio.profile.role}"</span></div>
                        <div className="pl-12">location=<span className={activeTheme.textString}>"{portfolio.profile.location}"</span></div>
                        <div className="pl-8 text-blue-300">/&gt;</div>
                        <div className="pl-4">);</div>
                        <div>&#125;</div>
                      </div>

                      {/* VISUAL WELCOME PREVIEW WIDGET (Faithful layout of home) */}
                      <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden max-w-2xl font-sans">
                        {/* Background glowing ring accent */}
                        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
                        
                        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
                          {/* Profile photo fallback if missing */}
                          <div className="relative">
                            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md animate-pulse" />
                            <img 
                              src={portfolio.profile.avatar} 
                              alt={portfolio.profile.name} 
                              referrerPolicy="no-referrer"
                              className="w-24 h-24 rounded-full border-2 border-white/20 object-cover relative z-10"
                            />
                          </div>

                          <div className="flex-1 text-center sm:text-left">
                            <span className="text-xs bg-blue-500/10 text-blue-400 font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-blue-500/20">
                              Active Workspace
                            </span>
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2.5">
                              {portfolio.profile.name}
                            </h1>
                            <p className="text-sm text-white/70 mt-1 flex items-center justify-center sm:justify-start gap-1">
                              <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-ping" />
                              {portfolio.profile.role}
                            </p>
                            <p className="text-xs text-white/50 mt-1">{portfolio.profile.location}</p>
                          </div>
                        </div>

                        {/* Scrolling / typing welcome line */}
                        <div className="mt-6 border-t border-white/5 pt-5 text-white/80">
                          <p className="text-sm italic leading-relaxed text-white/90">
                            &ldquo;{portfolio.profile.bio}&rdquo;
                          </p>
                        </div>

                        {/* Interactive welcome shortcuts */}
                        <div className="mt-6 flex flex-wrap gap-2.5">
                          <button 
                            onClick={() => handleOpenFile('projects.js')}
                            className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs py-2 px-4 rounded transition-colors"
                          >
                            open projects.js
                          </button>
                          <button 
                            onClick={() => handleOpenFile('contact.css')}
                            className="bg-white/10 hover:bg-white/20 text-white font-medium text-xs py-2 px-4 rounded transition-colors border border-white/5"
                          >
                            view contact.css
                          </button>
                          <button 
                            onClick={() => runCommandShortcut('node bio.js')}
                            className="bg-black/30 hover:bg-black/50 text-white/80 text-xs py-2 px-3 rounded font-mono border border-white/5 transition-colors"
                          >
                            run node bio.js
                          </button>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* ABOUT.HTML EDITOR PAGE */}
                  {activeFile === 'about.html' && (
                    <div className="space-y-6">
                      {/* Code simulated html structure */}
                      <div className="space-y-1">
                        <div>&lt;<span className="text-teal-400">section</span> <span className="text-red-400">class</span>=<span className={activeTheme.textString}>"biography"</span>&gt;</div>
                        <div className="pl-4">&lt;<span className="text-teal-400">h1</span>&gt;About Me&lt;/<span className="text-teal-400">h1</span>&gt;</div>
                        <div className="pl-4">&lt;<span className="text-teal-400">p</span>&gt;{portfolio.about.aboutText}&lt;/<span className="text-teal-400">p</span>&gt;</div>
                        <div>&lt;/<span className="text-teal-400">section</span>&gt;</div>
                      </div>

                      {/* Interactive About Me Card Layout */}
                      <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-6 max-w-2xl font-sans space-y-6">
                        
                        {/* Summary */}
                        <div className="space-y-2">
                          <h2 className="text-lg font-bold text-white border-b border-white/5 pb-2 flex items-center">
                            <Info size={18} className="mr-2 text-blue-400" /> Biography
                          </h2>
                          <p className="text-sm text-white/70 leading-relaxed font-sans">
                            {portfolio.about.aboutText}
                          </p>
                        </div>

                        {/* Services block */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider">Services I Offer</h3>
                            <ul className="space-y-1.5 text-xs text-white/80">
                              {portfolio.about.services.map((srv, i) => (
                                <li key={srv || i} className="flex items-center">
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2" />
                                  {srv}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Interests block */}
                          <div className="space-y-2">
                            <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider">Interests & Hobbies</h3>
                            <ul className="space-y-1.5 text-xs text-white/80">
                              {portfolio.about.interests.map((int, i) => (
                                <li key={int || i} className="flex items-center">
                                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mr-2" />
                                  {int}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                  {/* PROJECTS.JS EDITOR PAGE */}
                  {activeFile === 'projects.js' && (
                    <div className="space-y-6">
                      {/* Code imports header */}
                      <div className="space-y-1">
                        <div><span className={activeTheme.textKeyword}>const</span> projects = [</div>
                        <div className="pl-4 text-white/50">&#123;/* Compiled database list */&#125;</div>
                        <div>];</div>
                      </div>

                      {/* Dynamic Technologies Filter Tab Row */}
                      <div className="flex flex-wrap items-center gap-1.5 border-b border-white/5 pb-4">
                        <span className="text-xs text-white/40 uppercase tracking-wider mr-2 font-sans font-semibold">Filter:</span>
                        {allTechnologies.map(tech => (
                          <button 
                            key={tech}
                            onClick={() => setProjectFilter(tech)}
                            className={`px-3 py-1 rounded text-xs transition-colors font-sans focus:outline-none ${
                              projectFilter === tech 
                                ? 'bg-blue-600 text-white font-semibold shadow' 
                                : 'bg-white/5 text-white/60 hover:bg-white/10'
                            }`}
                          >
                            {tech}
                          </button>
                        ))}
                      </div>

                      {/* Real responsive Project cards inside editor */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
                        {filteredProjects.map(proj => (
                          <div key={proj.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all group font-sans">
                            {/* Project Image fallback if missing */}
                            <div className="relative h-40 overflow-hidden bg-black/40">
                              <img 
                                src={proj.image} 
                                alt={proj.name} 
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                              <span className="absolute bottom-3 right-3 text-[10px] bg-black/60 text-white/80 px-2 py-0.5 rounded-full">
                                {proj.year}
                              </span>
                            </div>

                            <div className="p-4 space-y-3">
                              <div className="flex items-center justify-between">
                                <h3 className="font-bold text-white text-base">{proj.name}</h3>
                              </div>

                              <p className="text-xs text-white/70 line-clamp-2 leading-relaxed">
                                {proj.description}
                              </p>

                              {/* Tech Stack pills */}
                              <div className="flex flex-wrap gap-1">
                                {proj.technologies?.map(t => (
                                  <span key={t} className="text-[10px] bg-white/5 text-white/60 px-2 py-0.5 rounded border border-white/5">
                                    {t}
                                  </span>
                                ))}
                              </div>

                              {/* Action link buttons */}
                              <div className="flex items-center space-x-2 pt-2 border-t border-white/5">
                                {proj.githubUrl && (
                                  <a 
                                    href={proj.githubUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center text-xs text-blue-400 hover:text-blue-300 font-semibold"
                                  >
                                    <Github size={12} className="mr-1.5" /> Source
                                  </a>
                                )}
                                {proj.liveUrl && (
                                  <a 
                                    href={proj.liveUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
                                  >
                                    <ExternalLink size={12} className="mr-1.5" /> Live Demo
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}

                        {filteredProjects.length === 0 && (
                          <div className="col-span-2 text-center py-10 bg-white/5 rounded-xl border border-white/10 text-white/40 italic">
                            No projects found matching the filter "{projectFilter}"
                          </div>
                        )}
                      </div>

                    </div>
                  )}

                  {/* EXPERIENCE.JSON EDITOR PAGE */}
                  {activeFile === 'experience.json' && (
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <div>&#123;</div>
                        <div className="pl-4"><span className={activeTheme.textKeyword}>"workHistory"</span>: [</div>
                      </div>

                      {/* Interactive list styled as visual nodes inside the editor */}
                      <div className="pl-4 max-w-2xl font-sans py-2 space-y-6 relative border-l-2 border-white/10">
                        {portfolio.experience.map((exp, index) => (
                          <div key={exp.id || index} className="relative pl-6 space-y-2">
                            {/* Glowing connector dot */}
                            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-4 border-[#0d1117] bg-blue-500 shadow" />
                            
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                              <div>
                                <h3 className="font-bold text-white text-base">{exp.role}</h3>
                                <span className="text-xs text-blue-400 font-bold block sm:inline">{exp.company}</span>
                              </div>
                              <span className="text-xs text-white/50 bg-white/5 border border-white/5 px-2.5 py-0.5 rounded-full self-start sm:self-center">
                                {exp.duration}
                              </span>
                            </div>

                            <p className="text-xs text-white/70 leading-relaxed font-sans pt-1">
                              {exp.description}
                            </p>

                            {/* Achievements bullet list */}
                            {exp.achievements && exp.achievements.length > 0 && (
                              <ul className="list-disc pl-4 text-xs text-white/60 space-y-1 pt-1 font-sans">
                                {exp.achievements.map((ach, ai) => (
                                  <li key={ai}>{ach}</li>
                                ))}
                              </ul>
                            )}

                            {/* Tech Stack for job */}
                            {exp.technologies && exp.technologies.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                {exp.technologies.map(t => (
                                  <span key={t} className="text-[10px] bg-blue-500/10 text-blue-300 border border-blue-500/20 px-2 py-0.5 rounded">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}

                        {portfolio.experience.length === 0 && (
                          <div className="text-center py-6 text-white/40 italic font-sans border border-white/5 rounded-lg">
                            No work history experience declared yet
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="pl-4">]</div>
                        <div>&#125;</div>
                      </div>
                    </div>
                  )}

                  {/* SKILLS.JSON EDITOR PAGE */}
                  {activeFile === 'skills.json' && (
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <div>&#123;</div>
                        <div className="pl-4"><span className={activeTheme.textKeyword}>"proficiencies"</span>: &#123;</div>
                      </div>

                      {/* Visual rendering of categorized skill progress bars */}
                      <div className="pl-4 max-w-2xl space-y-6 font-sans">
                        {['Languages', 'Frontend', 'Backend', 'Tools', 'Other'].map(cat => {
                          const catSkills = portfolio.skills.filter(s => s.category.toLowerCase().includes(cat.toLowerCase()) || (cat === 'Other' && !['languages', 'frontend', 'backend', 'tools'].includes(s.category.toLowerCase())));
                          if (catSkills.length === 0) return null;
                          return (
                            <div key={cat} className="space-y-3">
                              <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider border-b border-white/5 pb-1">
                                {cat}
                              </h3>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {catSkills.map(skill => (
                                  <div key={skill.id} className="space-y-1 bg-white/5 border border-white/5 p-3 rounded">
                                    <div className="flex justify-between items-center text-xs">
                                      <span className="font-bold text-white/80">{skill.name}</span>
                                      <span className="opacity-50">{skill.proficiency}%</span>
                                    </div>
                                    <div className="w-full bg-black/40 h-2 rounded overflow-hidden">
                                      <div 
                                        className="h-full rounded transition-all duration-1000 bg-blue-500"
                                        style={{ width: `${skill.proficiency}%`, backgroundColor: activeTheme.primaryAccent }}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="space-y-1">
                        <div className="pl-4">&#125;</div>
                        <div>&#125;</div>
                      </div>
                    </div>
                  )}

                  {/* CONTACT.CSS EDITOR PAGE */}
                  {activeFile === 'contact.css' && (
                    <div className="space-y-6">
                      {/* Code simulated CSS schema layout */}
                      <div className="space-y-1">
                        <div><span className="text-red-400">.contact-form</span> &#123;</div>
                        <div className="pl-4"><span className="text-teal-400">email-destination</span>: <span className={activeTheme.textString}>"{portfolio.contact.email}"</span>;</div>
                        <div className="pl-4"><span className="text-teal-400">phone</span>: <span className={activeTheme.textString}>"{portfolio.contact.phone}"</span>;</div>
                        <div className="pl-4"><span className="text-teal-400">compiler-relay</span>: <span className={activeTheme.textString}>"SMTP Direct"</span>;</div>
                        <div>&#125;</div>
                      </div>

                      {/* Interactive CSS Form Box */}
                      <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-6 max-w-lg font-sans space-y-4">
                        <div className="space-y-1">
                          <h2 className="text-base font-bold text-white">Send Message Connection</h2>
                          <p className="text-xs text-white/50">{portfolio.contact.messagePrompt}</p>
                        </div>

                        {contactSuccessMessage ? (
                          <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg text-xs space-y-2 flex flex-col items-center text-center">
                            <Check className="text-green-500" size={24} />
                            <span>{contactSuccessMessage}</span>
                            <button 
                              onClick={() => setContactSuccessMessage('')}
                              className="mt-2 bg-green-600 hover:bg-green-500 text-white font-semibold text-[10px] px-3 py-1 rounded transition-colors"
                            >
                              Reset Form
                            </button>
                          </div>
                        ) : (
                          <form onSubmit={handleContactSubmit} className="space-y-3 text-xs">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold uppercase text-white/40">Sender Email</label>
                              <input 
                                type="email"
                                required
                                value={contactSender}
                                onChange={(e) => setContactSender(e.target.value)}
                                placeholder="your.email@example.com"
                                className="w-full bg-black/30 border border-white/10 rounded px-3 py-2 text-white/80 focus:outline-none focus:border-blue-500"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold uppercase text-white/40">Subject</label>
                              <input 
                                type="text"
                                value={contactSubject}
                                onChange={(e) => setContactSubject(e.target.value)}
                                placeholder="Collab proposal / Hello!"
                                className="w-full bg-black/30 border border-white/10 rounded px-3 py-2 text-white/80 focus:outline-none focus:border-blue-500"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold uppercase text-white/40">Message</label>
                              <textarea 
                                required
                                rows={4}
                                value={contactMessage}
                                onChange={(e) => setContactMessage(e.target.value)}
                                placeholder="Hi, let's connect..."
                                className="w-full bg-black/30 border border-white/10 rounded px-3 py-2 text-white/80 focus:outline-none focus:border-blue-500 resize-none"
                              />
                            </div>

                            <button 
                              type="submit"
                              disabled={isCompilingContact}
                              className={`w-full text-white font-semibold py-2 px-4 rounded text-center cursor-pointer transition-colors flex items-center justify-center space-x-1.5 ${
                                isCompilingContact ? 'bg-blue-600/50 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'
                              }`}
                            >
                              <Send size={12} />
                              <span>{isCompilingContact ? 'Compiling stylesheet...' : 'Compile & Dispatch Contact'}</span>
                            </button>
                          </form>
                        )}
                      </div>
                    </div>
                  )}

                  {/* GITHUB.MD EDITOR PAGE */}
                  {activeFile === 'github.md' && (
                    <div className="space-y-6">
                      {/* Markdown mock headings */}
                      <div className="space-y-1">
                        <div className="text-blue-400"># GitHub Developer Profile</div>
                        <div className="text-white/40">&gt; Live parsed statistics for username: @{portfolio.githubUsername}</div>
                      </div>

                      {/* Interactive Markdown rendered layout */}
                      <div className="mt-4 bg-white/5 border border-white/10 rounded-xl p-6 max-w-2xl font-sans space-y-6">
                        
                        {/* Summary panel */}
                        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-white/5 pb-4 gap-4">
                          <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
                            <div className="bg-white/10 p-3.5 rounded-full border border-white/15">
                              <Github size={32} className="text-white" />
                            </div>
                            <div>
                              <h3 className="font-extrabold text-white text-lg">@{portfolio.githubUsername}</h3>
                              <p className="text-xs text-white/50">{portfolio.profile.name} — Verified Developer</p>
                            </div>
                          </div>
                          
                          {/* Live counters */}
                          <div className="flex items-center space-x-4">
                            <div className="text-center bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                              <span className="block text-lg font-bold text-white">{portfolio.projects.length}</span>
                              <span className="text-[10px] text-white/50 uppercase">Repositories</span>
                            </div>
                            <div className="text-center bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                              <span className="block text-lg font-bold text-white">421</span>
                              <span className="text-[10px] text-white/50 uppercase">Contributions</span>
                            </div>
                          </div>
                        </div>

                        {/* Pinned Repos block */}
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold text-white/50 uppercase tracking-wider">Pinned Repositories</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {portfolio.projects.slice(0, 4).map(repo => (
                              <div key={repo.id} className="p-4 bg-white/5 rounded-lg border border-white/5 hover:border-white/10 transition-colors flex flex-col justify-between">
                                <div className="space-y-1">
                                  <div className="flex items-center space-x-1.5 text-blue-400 hover:underline cursor-pointer">
                                    <Folder size={12} />
                                    <span className="font-bold text-sm">{repo.name.toLowerCase().replace(/\s+/g, '-')}</span>
                                  </div>
                                  <p className="text-xs text-white/60 line-clamp-2">{repo.description}</p>
                                </div>
                                <div className="flex items-center space-x-3 pt-3 mt-2 border-t border-white/5 text-[10px] text-white/40">
                                  <div className="flex items-center">
                                    <span className="w-2 h-2 rounded-full bg-yellow-500 mr-1.5" />
                                    <span>{repo.technologies?.[0] || 'JavaScript'}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Check size={10} className="mr-1 text-green-500" />
                                    <span>Verified</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                  {/* SETTINGS.JSON EDITOR PAGE */}
                  {activeFile === 'settings.json' && (
                    <div className="space-y-6">
                      {/* JSON editor layout */}
                      <div className="space-y-1">
                        <div>&#123;</div>
                        <div className="pl-4"><span className={activeTheme.textKeyword}>"workbench.colorTheme"</span>: <span className={activeTheme.textString}>"{activeTheme.name}"</span>,</div>
                        <div className="pl-4"><span className={activeTheme.textKeyword}>"editor.fontSize"</span>: <span className="text-teal-400">14</span>,</div>
                        <div className="pl-4"><span className={activeTheme.textKeyword}>"editor.fontFamily"</span>: <span className={activeTheme.textString}>"Fira Code, monospace"</span></div>
                        <div>&#125;</div>
                      </div>

                      {/* Theme selection panel */}
                      <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-6 max-w-lg font-sans space-y-4">
                        <div className="space-y-1">
                          <h2 className="text-base font-bold text-white flex items-center">
                            <Settings size={18} className="mr-2 text-pink-500" /> Theme Palette Configurator
                          </h2>
                          <p className="text-xs text-white/50">Switch IDE theme settings and color palettes immediately:</p>
                        </div>

                        <div className="grid grid-cols-2 gap-2.5">
                          {Object.values(THEMES).map(t => (
                            <button 
                              key={t.id}
                              onClick={() => setSelectedThemeId(t.id)}
                              className={`p-3 rounded-lg border text-xs font-semibold text-left transition-all focus:outline-none flex flex-col space-y-1.5 ${
                                selectedThemeId === t.id 
                                  ? 'border-blue-500 bg-blue-500/10 text-white' 
                                  : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                              }`}
                            >
                              <div className="flex items-center justify-between w-full">
                                <span>{t.name}</span>
                                {selectedThemeId === t.id && (
                                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                                )}
                              </div>
                              {/* Color swatch previews */}
                              <div className="flex items-center space-x-1">
                                <div className={`w-3.5 h-3.5 rounded-full border border-white/10 ${t.bgEditor}`} />
                                <div className={`w-3.5 h-3.5 rounded-full border border-white/10 ${t.bgSidebar}`} />
                                <div className={`w-3.5 h-3.5 rounded-full border border-white/10 ${t.bgActivity}`} />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            ) : (
              /* If no editors are open, display welcome fallback */
              <div className="h-full flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto space-y-4 font-sans select-none">
                <div className="bg-white/5 p-4 rounded-full border border-white/5">
                  <TerminalIcon size={44} className="text-white/40" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-extrabold text-white text-base">Workspace Loaded Successfully</h3>
                  <p className="text-xs text-white/50 leading-relaxed">
                    Select a virtual file inside the Explorer Sidebar to examine my experience, read achievements, query codebases, or submit communication relays.
                  </p>
                </div>
                <button 
                  onClick={() => handleOpenFile('home.tsx')}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2 px-5 rounded transition-all focus:outline-none shadow-md"
                >
                  Restore Workspace Home
                </button>
              </div>
            )}

          </div>

          {/* 2D. INTERACTIVE BOTTOM TERMINAL WORKSPACE */}
          <div className="shrink-0 flex flex-col border-t border-white/5 select-none bg-[#090b0f] relative z-20">
            {/* Terminal Header Tab */}
            <div className="h-[35px] w-full flex items-center justify-between px-4 bg-black/40 border-b border-white/5 text-xs text-white/50">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setTerminalOpen(!terminalOpen)}
                  className={`flex items-center space-x-1.5 py-1 px-2.5 rounded font-bold cursor-pointer transition-colors focus:outline-none ${
                    terminalOpen ? 'text-white bg-white/5' : 'text-white/40 hover:text-white/70'
                  }`}
                  id="vscode-terminal-tab"
                >
                  <TerminalIcon size={13} />
                  <span>Terminal</span>
                </button>
                <div className="text-[11px] opacity-40 hidden sm:inline">bash (interactive query engine)</div>
              </div>

              {/* Utility toggle icons */}
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => {
                    setTerminalHistory([
                      { cmd: 'clear', result: 'Console cleared. Type help to start.' }
                    ]);
                  }}
                  title="Clear Console"
                  className="hover:text-white transition-colors focus:outline-none p-1"
                >
                  <RefreshCw size={13} />
                </button>
                <button 
                  onClick={() => setTerminalOpen(!terminalOpen)}
                  title="Minimize Terminal"
                  className="hover:text-white transition-colors focus:outline-none p-1"
                >
                  <ChevronDown size={14} className={terminalOpen ? '' : 'rotate-180'} />
                </button>
              </div>
            </div>

            {/* Terminal Content body */}
            <AnimatePresence initial={false}>
              {terminalOpen && (
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: 160 }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.12, ease: 'easeOut' }}
                  className="p-3 overflow-y-auto font-mono text-[13px] bg-[#07090d] text-emerald-400 space-y-1 select-text scrollbar-thin flex flex-col min-h-0"
                >
                  {/* Console History rows */}
                  <div className="space-y-1 flex-1">
                    {terminalHistory.map((row, index) => (
                      <div key={index} className="space-y-1 border-b border-white/5 pb-1">
                        <div className="flex items-center space-x-1 text-white/40">
                          <span>$</span>
                          <span className="text-white font-semibold">{row.cmd}</span>
                        </div>
                        <pre className="whitespace-pre-wrap leading-relaxed text-emerald-300 pl-4 font-mono text-[12px] opacity-90">{row.result}</pre>
                      </div>
                    ))}
                    <div ref={terminalBottomRef} />
                  </div>

                  {/* Active Prompt input line */}
                  <form onSubmit={handleTerminalSubmit} className="flex items-center space-x-1.5 shrink-0 select-none">
                    <span className="text-blue-400 font-bold">$</span>
                    <input 
                      type="text"
                      placeholder='Type a command... (e.g. "help", "projects", "skills")'
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      className="flex-1 bg-transparent border-none text-white focus:outline-none font-mono text-[13px] selection:bg-blue-500/30"
                    />
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* 3. BOTTOM FOOTER STATUS BAR */}
      <div className={`h-[24px] w-full shrink-0 flex items-center justify-between px-3 text-xs select-none ${activeTheme.statusBarBg} border-t border-white/5 text-white/50 relative z-30`} id="vscode-statusbar">
        <div className="flex items-center space-x-3.5">
          {/* Active branch */}
          <div className="flex items-center space-x-1 hover:text-white/80 cursor-pointer">
            <GitBranch size={12} />
            <span className="text-[11px] font-sans">main</span>
          </div>
          
          {/* Synchronized status */}
          <div className="flex items-center space-x-1 hover:text-white/80 cursor-pointer">
            <RefreshCw size={11} className="animate-spin duration-3000" />
            <span className="text-[11px] font-sans">Synchronized</span>
          </div>

          <div className="hidden sm:flex items-center space-x-1 text-white/30 text-[11px]">
            <span>|</span>
            <span className="text-green-500 font-bold">●</span>
            <span className="font-sans">No Problems Detected</span>
          </div>
        </div>

        {/* Selected language block and meta info */}
        <div className="flex items-center space-x-3.5">
          <div className="hidden md:block text-[11px] font-sans">
            UTF-8
          </div>
          <div className="text-[11px] uppercase font-sans">
            {activeFile ? FILES[activeFile]?.type || 'typescript' : 'typescript'}
          </div>
          <div className="flex items-center space-x-1 hover:text-white/80 cursor-pointer text-blue-400 font-bold">
            <Check size={12} />
            <span className="text-[11px] font-sans">Prettier</span>
          </div>
        </div>
      </div>

    </div>
  );
};
