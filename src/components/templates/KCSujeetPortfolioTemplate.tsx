import React, { useState, useEffect } from 'react';
import { PortfolioData, LayoutConfiguration } from '../../types';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  ExternalLink, 
  ChevronRight, 
  ChevronDown, 
  Copy, 
  Check, 
  ArrowUpRight, 
  Terminal, 
  Code2, 
  Layers, 
  Sparkles, 
  BookOpen, 
  Briefcase, 
  FolderGit2, 
  Send,
  Sun,
  Moon,
  Clock,
  Circle
} from 'lucide-react';

interface KCSujeetPortfolioTemplateProps {
  data: PortfolioData;
  config: LayoutConfiguration;
}

export const KCSujeetPortfolioTemplate: React.FC<KCSujeetPortfolioTemplateProps> = ({ data, config }) => {
  const [activeSection, setActiveSection] = useState<string>('about');
  const [expandedExperience, setExpandedExperience] = useState<Record<string, boolean>>({ 'exp-sujeet-1': true });
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  const [localTimeStr, setLocalTimeStr] = useState<string>('');

  const profile = data.profile || {};
  const socialLinks = data.socialLinks || {};
  const about = data.about || {};
  const experienceList = data.experience || [];
  const skillsList = data.skills || [];
  const projectsList = data.projects || [];

  // Update real-time clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTimeStr(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle active section tracking on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'experience', 'projects', 'writing', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleExperience = (id: string) => {
    setExpandedExperience(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const navItems = [
    { id: 'about', number: '01', label: 'About', icon: Code2 },
    { id: 'experience', number: '02', label: 'Experience', icon: Briefcase },
    { id: 'projects', number: '03', label: 'Projects', icon: FolderGit2 },
    { id: 'writing', number: '04', label: 'Writing', icon: BookOpen },
    { id: 'contact', number: '05', label: 'Contact', icon: Send },
  ];

  // Articles sample data for KCSujeet writing section
  const articlesList = [
    {
      id: 'art-1',
      title: 'Building Zero-JS Static Web Apps with Astro & Tailwind CSS v4',
      date: 'Feb 18, 2026',
      readTime: '6 min read',
      tags: ['Astro', 'Tailwind CSS', 'Performance', 'Architecture'],
      summary: 'A deep dive into shipping 100 Lighthouse performance scores by eliminating unnecessary client JavaScript runtime hydrated bundles.',
      content: `
When building web applications, shipping zero runtime client JavaScript by default changes everything. 

In this article, we analyze how Astro's island architecture combined with Tailwind CSS v4 design tokens allows you to generate ultra-lightweight static pages with sub-20ms first contentful paint times.

Key takeaways:
1. Pure Astro components execute entirely at build-time.
2. Native browser primitives like <details> and CSS scroll-driven animations replace bulky JS accordion libraries.
3. Micro-scripts under 1KB can be injected inline for interactive state like active nav link highlighting and email copying.
      `
    },
    {
      id: 'art-2',
      title: 'Bulletproof Web Component Patterns for Modern Developers',
      date: 'Jan 10, 2026',
      readTime: '8 min read',
      tags: ['TypeScript', 'Design Systems', 'Architecture', 'Clean Code'],
      summary: 'How structuring feature modules with clear isolation boundaries improves codebase maintainability and team velocity.',
      content: `
Modular software architecture isn't just for backend microservices—it's essential for clean web applications as well.

By isolating features into strictly decoupled directories with explicit public APIs, your codebase remains flexible, testable, and refactorable even as your application scales to dozens of pages.
      `
    },
    {
      id: 'art-3',
      title: 'High-Performance Full Calendar Alternatives in React & TypeScript',
      date: 'Nov 24, 2025',
      readTime: '5 min read',
      tags: ['React', 'TypeScript', 'Open Source', 'UI Components'],
      summary: 'Designing lightweight, accessible calendar grid abstractions without heavy third-party bundle overhead.',
      content: `
Many off-the-shelf calendar libraries bring over 200KB of legacy dependencies. We explore building an open-source, accessible Full Calendar alternative in pure React and Tailwind.
      `
    }
  ];

  const isDark = themeMode === 'dark';

  return (
    <div className={`min-h-screen transition-colors duration-200 font-mono text-sm selection:bg-emerald-500/20 selection:text-emerald-400 ${
      isDark ? 'bg-[#0a0a0c] text-neutral-300' : 'bg-[#fafafa] text-neutral-800'
    }`}>
      {/* Background Subtle Grid Pattern */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? '#ffffff' : '#000000'} 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Main Container Layout: Side Rail + Content Viewport */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row min-h-screen relative">
        
        {/* MOBILE HEADER BAR */}
        <header className={`lg:hidden sticky top-0 z-40 px-5 py-4 flex items-center justify-between border-b backdrop-blur-md ${
          isDark ? 'bg-[#0a0a0c]/90 border-neutral-800/80' : 'bg-white/90 border-neutral-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center font-bold text-emerald-500">
              {profile.name ? profile.name.charAt(0) : 'S'}
            </div>
            <div>
              <div className="font-semibold text-sm leading-none">{profile.name || 'Sujeet Kumar'}</div>
              <div className="text-xs text-neutral-500 mt-0.5">{profile.title || 'Full-Stack Developer'}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setThemeMode(isDark ? 'light' : 'dark')}
              className={`p-2 rounded border transition-colors ${
                isDark ? 'border-neutral-800 hover:bg-neutral-800/50 text-neutral-400' : 'border-neutral-200 hover:bg-neutral-100 text-neutral-600'
              }`}
              title="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className={`p-2 rounded border transition-colors ${
                isDark ? 'border-neutral-800 bg-neutral-900 text-neutral-300' : 'border-neutral-200 bg-neutral-100 text-neutral-700'
              }`}
            >
              {mobileNavOpen ? 'CLOSE' : 'MENU'}
            </button>
          </div>
        </header>

        {/* MOBILE DRAWER NAV */}
        {mobileNavOpen && (
          <div className={`lg:hidden fixed inset-x-0 top-[65px] z-30 p-6 border-b space-y-4 ${
            isDark ? 'bg-[#0d0d10] border-neutral-800 text-neutral-300' : 'bg-white border-neutral-200 text-neutral-800'
          }`}>
            <nav className="flex flex-col gap-2">
              {navItems.map(item => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileNavOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded transition-all ${
                    activeSection === item.id 
                      ? 'bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/30' 
                      : 'hover:bg-neutral-800/30 text-neutral-400'
                  }`}
                >
                  <span className="text-xs text-emerald-500 font-mono">{item.number}.</span>
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>
            <div className="pt-4 border-t border-neutral-800/60 flex items-center justify-between text-xs text-neutral-500">
              <span className="flex items-center gap-1.5">
                <Circle className="w-2 h-2 fill-emerald-500 text-emerald-500 animate-pulse" />
                Available for contracts
              </span>
              <span>{localTimeStr}</span>
            </div>
          </div>
        )}

        {/* DESKTOP FIXED SIDE RAIL */}
        <aside className={`hidden lg:flex flex-col w-72 xl:w-80 h-screen sticky top-0 p-8 border-r justify-between z-20 ${
          isDark ? 'border-neutral-800/80 bg-[#0a0a0c]' : 'border-neutral-200 bg-[#f8f8f8]'
        }`}>
          <div>
            {/* BRAND HEADER */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs">
                <Circle className="w-2 h-2 fill-emerald-400 text-emerald-400 animate-pulse" />
                <span>Available for hire</span>
              </div>

              <div>
                <h1 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  {profile.name || 'Sujeet Kumar'}
                </h1>
                <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                  {profile.title || 'Full-Stack & Systems Engineer'}
                </p>
              </div>

              <p className="text-xs text-neutral-400 leading-normal line-clamp-3">
                {profile.bio || 'Building minimal, high-performance web applications, developer primitives, and open-source tooling.'}
              </p>
            </div>

            {/* NAV NAVIGATION RAIL LINKS */}
            <nav className="mt-10 space-y-1.5">
              <div className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold mb-3 px-2">
                // Navigation
              </div>
              {navItems.map(item => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`group flex items-center justify-between px-3 py-2 rounded-md transition-all border ${
                      isActive
                        ? isDark 
                          ? 'bg-neutral-900/90 text-emerald-400 border-emerald-500/40 shadow-sm' 
                          : 'bg-white text-emerald-600 border-emerald-500/30 shadow-sm font-semibold'
                        : isDark
                          ? 'border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/40'
                          : 'border-transparent text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`text-xs font-mono transition-colors ${isActive ? 'text-emerald-400 font-bold' : 'text-neutral-500 group-hover:text-neutral-400'}`}>
                        {item.number}.
                      </span>
                      <span className="text-xs">{item.label}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'text-emerald-400 translate-x-0.5' : 'text-neutral-600 opacity-0 group-hover:opacity-100'}`} />
                  </a>
                );
              })}
            </nav>
          </div>

          {/* SIDE RAIL FOOTER */}
          <div className="space-y-4 pt-6 border-t border-neutral-800/60">
            {/* SOCIAL LINKS */}
            <div className="flex items-center gap-3">
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className={`p-2 rounded border transition-colors ${
                    isDark ? 'border-neutral-800 hover:border-emerald-500/50 hover:text-emerald-400 text-neutral-400' : 'border-neutral-200 hover:border-emerald-500/50 hover:text-emerald-600 text-neutral-600'
                  }`}
                  title="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
              <a
                href={socialLinks.github || 'https://github.com/kcsujeet'}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded border transition-colors ${
                  isDark ? 'border-neutral-800 hover:border-emerald-500/50 hover:text-emerald-400 text-neutral-400' : 'border-neutral-200 hover:border-emerald-500/50 hover:text-emerald-600 text-neutral-600'
                }`}
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={socialLinks.linkedin || 'https://linkedin.com'}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded border transition-colors ${
                  isDark ? 'border-neutral-800 hover:border-emerald-500/50 hover:text-emerald-400 text-neutral-400' : 'border-neutral-200 hover:border-emerald-500/50 hover:text-emerald-600 text-neutral-600'
                }`}
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <button
                onClick={() => setThemeMode(isDark ? 'light' : 'dark')}
                className={`ml-auto p-2 rounded border transition-colors ${
                  isDark ? 'border-neutral-800 hover:bg-neutral-800 text-amber-400' : 'border-neutral-200 hover:bg-neutral-200 text-indigo-600'
                }`}
                title="Toggle Theme"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>

            {/* SYSTEM STATUS & TIME */}
            <div className="flex items-center justify-between text-[11px] text-neutral-500">
              <span className="flex items-center gap-1.5 font-mono">
                <Clock className="w-3 h-3 text-neutral-400" />
                {localTimeStr || '00:00:00 UTC'}
              </span>
              <span className="font-mono text-[10px] text-emerald-500/80 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                ASTRO v5.0
              </span>
            </div>
          </div>
        </aside>

        {/* MAIN MAIN CONTENT VIEWPORT */}
        <main className="flex-1 p-6 md:p-12 xl:p-16 space-y-20 max-w-4xl">
          
          {/* SECTION 1: ABOUT / HERO */}
          <section id="about" className="scroll-mt-12 space-y-8">
            {/* TECHNICAL HERO BANNER */}
            <div className={`p-6 sm:p-8 rounded-lg border relative overflow-hidden ${
              isDark ? 'bg-neutral-900/50 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'
            }`}>
              <div className="flex items-center justify-between border-b border-neutral-800/40 pb-4 mb-6">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>~/developer/portfolio.ts</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-xs text-emerald-400 font-mono tracking-wider">
                  // HELLO WORLD &middot; MINIMAL TECHNICAL PORTFOLIO
                </div>
                <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight font-sans ${
                  isDark ? 'text-white' : 'text-neutral-900'
                }`}>
                  {profile.name || 'Sujeet Kumar'}
                </h2>
                <p className="text-base text-neutral-400 leading-relaxed max-w-2xl">
                  {about.aboutText || profile.bio || 'Architecting minimalist, high-performance web applications, developer primitives, and open-source software libraries.'}
                </p>

                {/* TECH STACK BADGES */}
                <div className="pt-2 flex flex-wrap gap-2">
                  {['Astro', 'TypeScript', 'React', 'Tailwind CSS', 'Rust', 'Bun', 'PostgreSQL', 'WebAssembly'].map((tech) => (
                    <span 
                      key={tech} 
                      className={`text-xs px-2.5 py-1 rounded border font-mono ${
                        isDark 
                          ? 'bg-neutral-800/80 border-neutral-700/80 text-neutral-300' 
                          : 'bg-neutral-100 border-neutral-200 text-neutral-700'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* ACTION BUTTONS */}
                <div className="pt-4 flex flex-wrap gap-3">
                  <a
                    href="#projects"
                    className="px-4 py-2 rounded bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-semibold text-xs transition-colors flex items-center gap-2"
                  >
                    <span>View Projects</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="#contact"
                    className={`px-4 py-2 rounded border text-xs font-medium transition-colors flex items-center gap-2 ${
                      isDark 
                        ? 'border-neutral-700 hover:border-neutral-500 text-neutral-300 bg-neutral-800/50' 
                        : 'border-neutral-300 hover:border-neutral-400 text-neutral-700 bg-white'
                    }`}
                  >
                    <span>Contact Me</span>
                  </a>
                  <button
                    onClick={() => copyToClipboard(profile.email || 'sujeet@example.com')}
                    className={`px-3 py-2 rounded border text-xs font-mono transition-colors flex items-center gap-2 ${
                      isDark 
                        ? 'border-neutral-800 hover:bg-neutral-800 text-neutral-400' 
                        : 'border-neutral-200 hover:bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmail ? 'Copied Email' : 'Copy Email'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* PHILOSOPHY & STATS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className={`p-4 rounded border ${isDark ? 'bg-neutral-900/30 border-neutral-800' : 'bg-white border-neutral-200'}`}>
                <div className="text-xl font-bold text-emerald-400 font-mono">8+ Years</div>
                <div className="text-xs text-neutral-500 mt-1">Full-Stack Development</div>
              </div>
              <div className={`p-4 rounded border ${isDark ? 'bg-neutral-900/30 border-neutral-800' : 'bg-white border-neutral-200'}`}>
                <div className="text-xl font-bold text-emerald-400 font-mono">15+ Projects</div>
                <div className="text-xs text-neutral-500 mt-1">Shipped & Open Sourced</div>
              </div>
              <div className={`p-4 rounded border ${isDark ? 'bg-neutral-900/30 border-neutral-800' : 'bg-white border-neutral-200'}`}>
                <div className="text-xl font-bold text-emerald-400 font-mono">100 / 100</div>
                <div className="text-xs text-neutral-500 mt-1">Lighthouse Speed Standard</div>
              </div>
            </div>
          </section>

          {/* SECTION 2: EXPERIENCE */}
          <section id="experience" className="scroll-mt-12 space-y-6">
            <div className="flex items-center gap-3 border-b border-neutral-800/60 pb-3">
              <span className="text-emerald-400 font-mono font-bold text-base">02.</span>
              <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Work Experience
              </h3>
              <div className="flex-1 h-px bg-neutral-800/50 ml-2" />
            </div>

            {/* EXPANDABLE ACCORDION LIST */}
            <div className="space-y-3">
              {experienceList.map((exp, index) => {
                const expId = exp.id || `exp-${index}`;
                const isExpanded = !!expandedExperience[expId];
                return (
                  <div
                    key={expId}
                    className={`rounded border transition-all ${
                      isDark 
                        ? 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-700' 
                        : 'bg-white border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    {/* ACCORDION HEADER */}
                    <button
                      onClick={() => toggleExperience(expId)}
                      className="w-full p-4 sm:p-5 flex items-start justify-between text-left gap-4 cursor-pointer"
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`font-bold text-base ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                            {exp.role}
                          </span>
                          <span className="text-emerald-400 font-mono text-sm">@ {exp.company}</span>
                          {exp.current && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">
                              PRESENT
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-neutral-500 font-mono">
                          {exp.duration} &middot; {exp.location || 'Remote'}
                        </div>
                      </div>

                      <div className={`p-1 rounded border transition-colors ${
                        isDark ? 'border-neutral-800 text-neutral-400' : 'border-neutral-200 text-neutral-600'
                      }`}>
                        {isExpanded ? <ChevronDown className="w-4 h-4 text-emerald-400" /> : <ChevronRight className="w-4 h-4" />}
                      </div>
                    </button>

                    {/* EXPANDABLE BODY DETAILS */}
                    {isExpanded && (
                      <div className="px-4 pb-5 sm:px-5 pt-0 border-t border-neutral-800/40 space-y-4">
                        <p className="text-xs text-neutral-300 leading-relaxed mt-3">
                          {exp.description}
                        </p>

                        {/* KEY HIGHLIGHTS / ACHIEVEMENTS */}
                        {((exp.achievements && exp.achievements.length > 0) || (exp.highlights && exp.highlights.length > 0)) && (
                          <ul className="space-y-1.5 text-xs text-neutral-400 list-disc list-inside">
                            {(exp.achievements || exp.highlights)?.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        )}

                        {/* TECH TAGS */}
                        {exp.technologies && (
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {exp.technologies.map(t => (
                              <span
                                key={t}
                                className={`text-[11px] px-2 py-0.5 rounded border font-mono ${
                                  isDark 
                                    ? 'bg-neutral-800/60 border-neutral-700/60 text-neutral-400' 
                                    : 'bg-neutral-100 border-neutral-200 text-neutral-600'
                                }`}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* SECTION 3: PROJECTS */}
          <section id="projects" className="scroll-mt-12 space-y-6">
            <div className="flex items-center gap-3 border-b border-neutral-800/60 pb-3">
              <span className="text-emerald-400 font-mono font-bold text-base">03.</span>
              <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Featured Projects
              </h3>
              <div className="flex-1 h-px bg-neutral-800/50 ml-2" />
            </div>

            {/* PROJECTS GRID */}
            <div className="grid grid-cols-1 gap-6">
              {projectsList.map((project) => (
                <div
                  key={project.id}
                  className={`group rounded-lg border overflow-hidden transition-all duration-200 ${
                    isDark 
                      ? 'bg-neutral-900/40 border-neutral-800 hover:border-emerald-500/40' 
                      : 'bg-white border-neutral-200 hover:border-emerald-500/40 shadow-sm'
                  }`}
                >
                  <div className="p-6 space-y-4">
                    {/* PROJECT HEADER & STATUS */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h4 className={`text-base font-bold group-hover:text-emerald-400 transition-colors ${
                            isDark ? 'text-white' : 'text-neutral-900'
                          }`}>
                            {project.name}
                          </h4>
                          <span className="text-[10px] px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono">
                            {project.status || 'SHIPPED'}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-500 font-mono mt-1">
                          {project.year || '2025'} &middot; Open Source
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-1.5 rounded border transition-colors ${
                              isDark ? 'border-neutral-800 hover:border-neutral-600 text-neutral-400' : 'border-neutral-200 hover:border-neutral-400 text-neutral-600'
                            }`}
                            title="GitHub Source"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                            title="Live Demo"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* DESCRIPTION */}
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {project.description}
                    </p>

                    {/* PROJECT PREVIEW IMAGE IF PRESENT */}
                    {project.image && (
                      <div className="rounded overflow-hidden border border-neutral-800/60 max-h-56 bg-neutral-950">
                        <img 
                          src={project.image} 
                          alt={project.name}
                          className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity"
                          loading="lazy"
                        />
                      </div>
                    )}

                    {/* TECH STACK LIST */}
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-neutral-800/40">
                      {project.technologies?.map((tech) => (
                        <span
                          key={tech}
                          className={`text-[11px] px-2 py-0.5 rounded border font-mono ${
                            isDark 
                              ? 'bg-neutral-800/50 border-neutral-700/50 text-neutral-400' 
                              : 'bg-neutral-100 border-neutral-200 text-neutral-600'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 4: WRITING / BLOG */}
          <section id="writing" className="scroll-mt-12 space-y-6">
            <div className="flex items-center gap-3 border-b border-neutral-800/60 pb-3">
              <span className="text-emerald-400 font-mono font-bold text-base">04.</span>
              <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Technical Writing & Articles
              </h3>
              <div className="flex-1 h-px bg-neutral-800/50 ml-2" />
            </div>

            <div className="space-y-4">
              {articlesList.map(article => (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className={`p-5 rounded-lg border cursor-pointer transition-all ${
                    isDark 
                      ? 'bg-neutral-900/40 border-neutral-800 hover:border-emerald-500/40 hover:bg-neutral-900/70' 
                      : 'bg-white border-neutral-200 hover:border-emerald-500/40 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-xs text-neutral-500 font-mono mb-2">
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h4 className={`text-base font-bold mb-2 group-hover:text-emerald-400 transition-colors ${
                    isDark ? 'text-white' : 'text-neutral-900'
                  }`}>
                    {article.title}
                  </h4>

                  <p className="text-xs text-neutral-400 leading-relaxed mb-3">
                    {article.summary}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-neutral-800/40">
                    <div className="flex flex-wrap gap-1.5">
                      {article.tags.map(t => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono border border-emerald-500/20">
                          #{t}
                        </span>
                      ))}
                    </div>

                    <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono hover:underline">
                      Read <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 5: CONTACT */}
          <section id="contact" className="scroll-mt-12 space-y-6">
            <div className="flex items-center gap-3 border-b border-neutral-800/60 pb-3">
              <span className="text-emerald-400 font-mono font-bold text-base">05.</span>
              <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Get In Touch
              </h3>
              <div className="flex-1 h-px bg-neutral-800/50 ml-2" />
            </div>

            <div className={`p-8 rounded-lg border text-center space-y-6 ${
              isDark ? 'bg-neutral-900/30 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'
            }`}>
              <div className="w-12 h-12 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
                <Send className="w-6 h-6" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h4 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  Let's Work Together
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  I'm currently available for full-stack engineering roles, technical architecture consulting, or open-source software collaborations.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={`mailto:${profile.email || 'sujeet@example.com'}`}
                  className="px-5 py-2.5 rounded bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-bold text-xs transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Email</span>
                </a>
                <button
                  onClick={() => copyToClipboard(profile.email || 'sujeet@example.com')}
                  className={`px-4 py-2.5 rounded border text-xs font-mono transition-colors flex items-center gap-2 ${
                    isDark ? 'border-neutral-700 hover:bg-neutral-800 text-neutral-300' : 'border-neutral-300 hover:bg-neutral-100 text-neutral-700'
                  }`}
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedEmail ? 'Email Copied!' : profile.email || 'sujeet@example.com'}</span>
                </button>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="pt-8 border-t border-neutral-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
            <div>
              Designed & Built by <span className="text-neutral-300">{profile.name || 'Sujeet Kumar'}</span> &middot; MIT License
            </div>
            <div className="flex items-center gap-4">
              <a href="#about" className="hover:text-emerald-400 transition-colors font-mono">Back to top ↑</a>
            </div>
          </footer>
        </main>
      </div>

      {/* ARTICLE READER MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className={`w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 sm:p-8 rounded-lg border shadow-2xl space-y-6 ${
            isDark ? 'bg-[#0d0d10] border-neutral-800 text-neutral-200' : 'bg-white border-neutral-200 text-neutral-800'
          }`}>
            <div className="flex items-center justify-between border-b border-neutral-800/60 pb-4">
              <div className="text-xs text-emerald-400 font-mono">{selectedArticle.date} &middot; {selectedArticle.readTime}</div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-2 py-1 rounded text-xs border border-neutral-700 hover:bg-neutral-800"
              >
                CLOSE [ESC]
              </button>
            </div>

            <h3 className="text-xl font-bold text-emerald-400 font-sans">
              {selectedArticle.title}
            </h3>

            <div className="prose prose-invert max-w-none text-xs leading-relaxed space-y-4 whitespace-pre-line text-neutral-300">
              {selectedArticle.content}
            </div>

            <div className="pt-4 border-t border-neutral-800/60 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {selectedArticle.tags.map((t: string) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">
                    #{t}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 rounded bg-emerald-500 text-neutral-950 text-xs font-bold"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
