import React, { useState, useEffect, useMemo } from 'react';
import { PortfolioData, LayoutConfiguration, SkillItem } from '../../types';
import { 
  Sparkles, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  FileText, 
  MapPin, 
  ArrowUpRight, 
  ArrowRight,
  Briefcase, 
  GraduationCap, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  FolderGit2,
  Code2,
  Eye,
  Copy,
  Check,
  Send,
  Terminal,
  Compass,
  Palette,
  Server,
  Database,
  Cloud,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NikhilInteractivePortfolioTemplateProps {
  data: PortfolioData;
  config?: LayoutConfiguration;
}

export const NikhilInteractivePortfolioTemplate: React.FC<NikhilInteractivePortfolioTemplateProps> = ({ 
  data, 
  config 
}) => {
  const [activeSection, setActiveSection] = useState<'home' | 'about' | 'skills' | 'experience' | 'projects' | 'education' | 'contact'>('home');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [projectCategory, setProjectCategory] = useState<string>('ALL');
  const [skillCategory, setSkillCategory] = useState<string>('ALL');
  const [mousePosition, setMousePosition] = useState({ x: -200, y: -200 });

  // Safe normalized portfolio data
  const profile = data?.profile || {
    name: 'Nikhil Rajput',
    title: 'Full-Stack Developer & UI/UX Enthusiast',
    bio: 'I build modern, performant, and accessible digital experiences. Passionate about full-stack web engineering, intuitive micro-interactions, and creative frontend design.',
    location: 'Bangalore, India · UTC+5:30',
    email: 'nikhilrajput.dev@gmail.com',
    phone: '+91 98765 43210',
    website: 'https://nixrajput.dev',
    profilePhoto: ''
  };

  const about = data?.about || {
    aboutText: 'Hello! I am a passionate software engineer specializing in building full-stack applications with exceptional user experiences. I enjoy turning complex system problems into simple, beautiful, and intuitive interfaces with modern engineering practices.',
    interests: ['Full-Stack Architecture', 'Reactive Web Interfaces', 'Cloud & Serverless APIs', 'Interactive WebGL & 3D', 'Performance Optimization'],
    services: ['Web Application Development', 'Frontend Architecture', 'REST & GraphQL APIs', 'UI/UX Interactive Prototyping']
  };

  const experiences = useMemo(() => {
    if (data?.experience && data.experience.length > 0) {
      return data.experience;
    }
    return [
      {
        id: 'exp-1',
        company: 'Nova Interactive Labs',
        role: 'Senior Full-Stack Engineer',
        duration: '2023 — Present',
        description: 'Leading the core web development team in architecting cloud-native web applications, responsive component design systems, and resilient microservices.',
        current: true,
        technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL', 'AWS'],
        achievements: [
          'Spearheaded the redesign of flagship cloud dashboard, boosting customer retention by 32%',
          'Engineered real-time collaboration canvas with sub-12ms operational latency',
          'Automated CI/CD deployment pipelines using GitHub Actions and Docker'
        ]
      },
      {
        id: 'exp-2',
        company: 'Synthetix Media',
        role: 'Frontend Software Developer',
        duration: '2021 — 2023',
        description: 'Engineered high-performance marketing platforms, interactive user onboarding workflows, and accessible component libraries.',
        current: false,
        technologies: ['TypeScript', 'React', 'Tailwind CSS', 'GraphQL', 'Framer Motion'],
        achievements: [
          'Achieved 99+ Lighthouse performance scores across all production web applications',
          'Authored a modular design system component library adopted across 6 client enterprise products'
        ]
      },
      {
        id: 'exp-3',
        company: 'PixelCraft Studio',
        role: 'Junior Web Developer',
        duration: '2020 — 2021',
        description: 'Built responsive client web applications, headless CMS integrations, and smooth landing page micro-interactions.',
        current: false,
        technologies: ['JavaScript', 'React', 'CSS3', 'REST APIs', 'Git'],
        achievements: [
          'Delivered 14 bespoke commercial client web projects on time and within scope'
        ]
      }
    ];
  }, [data?.experience]);

  const projects = useMemo(() => {
    if (data?.projects && data.projects.length > 0) {
      return data.projects;
    }
    return [
      {
        id: 'proj-1',
        name: 'Nexus Cloud Management Platform',
        description: 'Comprehensive multi-tenant cloud orchestration dashboard featuring live server metrics, automated deployments, and team permission controls.',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Docker'],
        image: '',
        githubUrl: 'https://github.com',
        liveUrl: 'https://demo.dev',
        featured: true,
        year: '2025',
        category: 'Full-Stack'
      },
      {
        id: 'proj-2',
        name: 'Aether Collaborative Design Space',
        description: 'Real-time interactive canvas with multiplayer cursor presence, vector drawing primitives, layer hierarchy, and instant cloud persistence.',
        technologies: ['React', 'TypeScript', 'WebSockets', 'Canvas API', 'Tailwind CSS'],
        image: '',
        githubUrl: 'https://github.com',
        liveUrl: 'https://demo.dev',
        featured: true,
        year: '2024',
        category: 'Frontend'
      },
      {
        id: 'proj-3',
        name: 'Spectra AI Code Intelligence',
        description: 'Developer IDE companion for AST semantic code search, automatic documentation generation, and syntax graph visualization.',
        technologies: ['Python', 'FastAPI', 'React', 'OpenAI API', 'Tailwind CSS'],
        image: '',
        githubUrl: 'https://github.com',
        liveUrl: 'https://demo.dev',
        featured: false,
        year: '2024',
        category: 'AI / Full-Stack'
      },
      {
        id: 'proj-4',
        name: 'Velocity Headless E-Commerce Suite',
        description: 'Ultra-fast headless commerce storefront with optimistic cart operations, dynamic internationalization, and Stripe checkout.',
        technologies: ['Next.js', 'Shopify Storefront API', 'Tailwind CSS', 'Stripe'],
        image: '',
        githubUrl: 'https://github.com',
        liveUrl: 'https://demo.dev',
        featured: false,
        year: '2023',
        category: 'Full-Stack'
      }
    ];
  }, [data?.projects]);

  const skills = useMemo(() => {
    if (data?.skills && data.skills.length > 0) {
      return data.skills;
    }
    return [
      { id: 's1', name: 'React', category: 'Frontend', proficiency: 96 },
      { id: 's2', name: 'Next.js', category: 'Frontend', proficiency: 95 },
      { id: 's3', name: 'TypeScript', category: 'Frontend', proficiency: 94 },
      { id: 's4', name: 'JavaScript (ES6+)', category: 'Frontend', proficiency: 96 },
      { id: 's5', name: 'Tailwind CSS', category: 'Frontend', proficiency: 95 },
      { id: 's6', name: 'HTML5 & CSS3', category: 'Frontend', proficiency: 98 },
      { id: 's7', name: 'Node.js', category: 'Backend', proficiency: 90 },
      { id: 's8', name: 'Express.js', category: 'Backend', proficiency: 92 },
      { id: 's9', name: 'Go (Golang)', category: 'Backend', proficiency: 80 },
      { id: 's10', name: 'Python', category: 'Backend', proficiency: 84 },
      { id: 's11', name: 'REST & GraphQL', category: 'Backend', proficiency: 92 },
      { id: 's12', name: 'PostgreSQL', category: 'Database & Cloud', proficiency: 88 },
      { id: 's13', name: 'MongoDB', category: 'Database & Cloud', proficiency: 90 },
      { id: 's14', name: 'Redis', category: 'Database & Cloud', proficiency: 85 },
      { id: 's15', name: 'Docker & Containers', category: 'Database & Cloud', proficiency: 86 },
      { id: 's16', name: 'AWS & Cloudflare', category: 'Database & Cloud', proficiency: 82 },
      { id: 's17', name: 'Git & GitHub Actions', category: 'Tools', proficiency: 94 },
      { id: 's18', name: 'Figma & UI Design', category: 'Tools', proficiency: 88 }
    ];
  }, [data?.skills]);

  const education = useMemo(() => {
    if (data?.education && data.education.length > 0) {
      return data.education;
    }
    return [
      {
        id: 'edu-1',
        institution: 'University of Technology & Engineering',
        degree: 'Bachelor of Technology in Computer Science',
        duration: '2017 — 2021',
        grade: 'First Class with Distinction'
      }
    ];
  }, [data?.education]);

  // Skill categories list
  const skillCategories = useMemo(() => {
    const set = new Set<string>();
    skills.forEach(s => {
      if (s.category) set.add(s.category);
    });
    return ['ALL', ...Array.from(set)];
  }, [skills]);

  // Filtered skills
  const filteredSkills = useMemo(() => {
    if (skillCategory === 'ALL') return skills;
    return skills.filter(s => (s.category || '').toLowerCase() === skillCategory.toLowerCase());
  }, [skills, skillCategory]);

  // Mouse tracking for subtle atmospheric spotlight
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-[#050814] text-slate-100 font-sans selection:bg-sky-500/30 selection:text-sky-200 relative overflow-x-hidden">
      
      {/* Interactive cursor spotlight flare */}
      <div 
        className="fixed w-[460px] h-[460px] rounded-full bg-gradient-to-tr from-sky-500/10 via-indigo-500/10 to-purple-500/5 blur-[140px] pointer-events-none -z-10 transition-transform duration-100 ease-out hidden md:block"
        style={{
          transform: `translate(${mousePosition.x - 230}px, ${mousePosition.y - 230}px)`
        }}
      />

      {/* Atmospheric radial background aura */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-sky-600/10 via-indigo-600/5 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Modern Glass Header */}
      <header className="sticky top-0 z-50 bg-[#050814]/80 backdrop-blur-xl border-b border-sky-950/60 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-purple-600 p-[1px] shadow-[0_0_20px_rgba(56,189,248,0.25)]">
              <div className="w-full h-full bg-[#070b1a] rounded-[11px] flex items-center justify-center font-bold text-sky-400 text-base">
                {profile.name ? profile.name.charAt(0) : 'N'}
              </div>
            </div>
            <div className="leading-tight">
              <span className="font-bold text-sm text-white tracking-tight block">{profile.name}</span>
              <span className="text-[11px] text-sky-400 font-medium">Software Engineer</span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-slate-900/80 border border-slate-800/80 text-xs font-medium text-slate-300">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id as any);
                    const el = document.getElementById(item.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold shadow-md shadow-sky-500/20'
                      : 'hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-sky-500/25 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Sections */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-24 sm:space-y-36 relative z-10">

        {/* ========================================================================= */}
        {/* 1. HERO SECTION                                                           */}
        {/* ========================================================================= */}
        <section id="home" className="pt-6 sm:pt-12 space-y-8">
          
          {/* Status badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-sky-950/50 border border-sky-500/30 text-sky-300 text-xs font-medium backdrop-blur-md shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Available for freelance projects &amp; full-time roles</span>
          </div>

          {/* Hero Main Typography */}
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
              Crafting scalable web systems &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400">interactive experiences</span>.
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
              I'm <strong className="text-white font-semibold">{profile.name}</strong>, a {profile.title}. {profile.bio}
            </p>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => {
                const el = document.getElementById('projects');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:opacity-95 text-white font-semibold text-sm shadow-xl shadow-sky-500/25 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Featured Work</span>
              <ArrowDownRightIcon />
            </button>

            <button
              onClick={handleCopyEmail}
              className="px-5 py-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white font-medium text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedEmail ? 'Email Copied!' : 'Copy Email'}</span>
            </button>

            {data?.socialLinks?.github && (
              <a
                href={data.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-sky-500/50 text-slate-400 hover:text-white transition-all cursor-pointer"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
            )}

            {data?.socialLinks?.linkedin && (
              <a
                href={data.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-sky-500/50 text-slate-400 hover:text-white transition-all cursor-pointer"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}

            {data?.socialLinks?.twitter && (
              <a
                href={data.socialLinks.twitter}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-sky-500/50 text-slate-400 hover:text-white transition-all cursor-pointer"
                aria-label="Twitter Profile"
              >
                <Twitter className="w-5 h-5" />
              </a>
            )}
          </div>

          {/* Quick Technical Highlights Metric Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">4+ Years</div>
              <div className="text-xs text-slate-400 mt-1">Professional Experience</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="text-2xl sm:text-3xl font-extrabold text-sky-400">20+ Projects</div>
              <div className="text-xs text-slate-400 mt-1">Shipped &amp; Deployed</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400">100% Code</div>
              <div className="text-xs text-slate-400 mt-1">Responsive &amp; Accessible</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">Bangalore</div>
              <div className="text-xs text-slate-400 mt-1">Location · UTC+5:30</div>
            </div>
          </div>

        </section>

        {/* ========================================================================= */}
        {/* 2. ABOUT SECTION                                                          */}
        {/* ========================================================================= */}
        <section id="about" className="space-y-8">
          
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500 shadow-sm shadow-sky-400"></span>
            <h2 className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold">
              ABOUT ME &amp; ENGINEERING PRINCIPLES
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-7 space-y-5 text-slate-300 text-base leading-relaxed">
              <p>{about.aboutText}</p>
              <p>
                My expertise spans full-stack JavaScript &amp; TypeScript ecosystems, modern frontend architecture with Next.js, and scalable backend infrastructure. I prioritize writing clean, maintainable, and type-safe code that delivers high performance and smooth user experiences.
              </p>

              {/* Core focus pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
                    <Palette className="w-4 h-4" />
                    <span>Frontend &amp; UX</span>
                  </div>
                  <p className="text-xs text-slate-400">Modern reactive interfaces with smooth animations and responsive design systems.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
                    <Server className="w-4 h-4" />
                    <span>Backend &amp; APIs</span>
                  </div>
                  <p className="text-xs text-slate-400">Robust REST &amp; GraphQL architectures with high throughput and low latency.</p>
                </div>
              </div>
            </div>

            {/* Quick Overview Sidebar */}
            <div className="lg:col-span-5 rounded-2xl border border-sky-900/40 bg-gradient-to-b from-slate-900/80 to-[#070c18] p-6 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center justify-between border-b border-slate-800 pb-3">
                <span>TECHNICAL SNAPSHOT</span>
                <span className="text-xs text-sky-400 font-mono">v2.0</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Primary Focus:</span>
                  <span className="font-semibold text-slate-200">Full-Stack Development</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Core Stack:</span>
                  <span className="font-semibold text-sky-300">Next.js, TypeScript, Node.js</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Location:</span>
                  <span className="font-semibold text-slate-200">{profile.location}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Availability:</span>
                  <span className="font-semibold text-emerald-400">Open for Work</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Email:</span>
                  <span className="font-semibold text-slate-200 truncate max-w-[180px]">{profile.email}</span>
                </div>
              </div>
            </div>

          </div>

        </section>

        {/* ========================================================================= */}
        {/* 3. SKILLS MATRIX SECTION                                                  */}
        {/* ========================================================================= */}
        <section id="skills" className="space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500 shadow-sm shadow-sky-400"></span>
              <h2 className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold">
                SKILLS &amp; TECHNOLOGIES
              </h2>
            </div>

            {/* Category filter tabs */}
            <div className="flex flex-wrap gap-1.5 text-xs">
              {skillCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSkillCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                    skillCategory === cat
                      ? 'bg-sky-600 text-white font-semibold shadow-sm'
                      : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredSkills.map((skill) => (
              <div 
                key={skill.id}
                className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/60 hover:border-sky-500/50 hover:bg-slate-900 transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-slate-200 group-hover:text-white transition-colors">
                    {skill.name}
                  </span>
                  {skill.proficiency && (
                    <span className="text-[11px] font-mono text-sky-400 font-medium">
                      {skill.proficiency}%
                    </span>
                  )}
                </div>
                {skill.proficiency && (
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                )}
                {skill.category && (
                  <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider block">
                    {skill.category}
                  </span>
                )}
              </div>
            ))}
          </div>

        </section>

        {/* ========================================================================= */}
        {/* 4. WORK EXPERIENCE TIMELINE                                               */}
        {/* ========================================================================= */}
        <section id="experience" className="space-y-8">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500 shadow-sm shadow-sky-400"></span>
              <h2 className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold">
                EXPERIENCE &amp; CAREER PATH
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500">CHRONOLOGICAL</span>
          </div>

          <div className="space-y-6 relative border-l-2 border-slate-800 ml-3 sm:ml-4 pl-6 sm:pl-8">
            {experiences.map((exp, idx) => (
              <div 
                key={exp.id || idx}
                className="relative rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 space-y-4 hover:border-sky-500/50 transition-all group"
              >
                {/* Timeline node */}
                <div className="absolute -left-[35px] sm:-left-[43px] top-6 w-5 h-5 rounded-full bg-sky-500 border-4 border-[#050814] shadow-sm shadow-sky-400"></div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold text-sky-400">
                      @{exp.company}
                    </div>
                  </div>
                  <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800 self-start sm:self-auto">
                    {exp.duration}
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {exp.description}
                </p>

                {/* Achievements list */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-xs font-mono text-slate-400 block uppercase tracking-wider">
                      Key Highlights:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {exp.achievements.map((item, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-2">
                          <span className="text-sky-400 mt-0.5">✦</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech tags */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech, tIdx) => (
                      <span 
                        key={tIdx}
                        className="px-2.5 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

        </section>

        {/* ========================================================================= */}
        {/* 5. FEATURED PROJECTS SHOWCASE                                             */}
        {/* ========================================================================= */}
        <section id="projects" className="space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500 shadow-sm shadow-sky-400"></span>
              <h2 className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold">
                FEATURED PROJECTS
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500">{projects.length} CASE STUDIES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <div 
                key={project.id || idx}
                className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-[#070d1a] p-6 space-y-5 flex flex-col justify-between hover:border-sky-500/50 transition-all hover:shadow-xl hover:shadow-sky-500/5 group"
              >
                <div className="space-y-3.5">
                  
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="px-2.5 py-0.5 rounded-md bg-sky-950 border border-sky-500/30 text-sky-300 font-medium">
                      {project.category || 'PROJECT'}
                    </span>
                    {project.year && (
                      <span className="text-slate-500">{project.year}</span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                    {project.name}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech stack badges */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {project.technologies.map((tech, tIdx) => (
                        <span 
                          key={tIdx}
                          className="px-2.5 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Project Links Footer */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors font-medium"
                      >
                        <Github className="w-4 h-4" />
                        <span>Source</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sky-400 hover:text-sky-300 flex items-center gap-1.5 font-semibold transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>

                  <span className="text-slate-600 font-mono text-[11px]">
                    0{idx + 1}
                  </span>
                </div>

              </div>
            ))}
          </div>

        </section>

        {/* ========================================================================= */}
        {/* 6. EDUCATION SECTION                                                      */}
        {/* ========================================================================= */}
        <section id="education" className="space-y-6">
          
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500 shadow-sm shadow-sky-400"></span>
            <h2 className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold">
              EDUCATION &amp; QUALIFICATIONS
            </h2>
          </div>

          <div className="space-y-4">
            {education.map((edu, idx) => (
              <div 
                key={edu.id || idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-sky-400" />
                    <h3 className="text-lg font-bold text-white">{edu.institution}</h3>
                  </div>
                  <p className="text-sm text-slate-300">{edu.degree}</p>
                  {edu.grade && (
                    <p className="text-xs font-mono text-emerald-400">{edu.grade}</p>
                  )}
                </div>

                <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-full border border-slate-800 self-start sm:self-auto">
                  {edu.duration}
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* ========================================================================= */}
        {/* 7. CONTACT & GET IN TOUCH                                                 */}
        {/* ========================================================================= */}
        <section id="contact" className="rounded-3xl border border-sky-900/50 bg-gradient-to-b from-slate-900/90 via-[#070b18] to-[#04060d] p-8 sm:p-12 space-y-8 relative overflow-hidden">
          
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500 shadow-sm shadow-sky-400"></span>
            <h2 className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold">
              LET'S BUILD SOMETHING GREAT
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Interested in working together or discussing a new project?
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
                Feel free to reach out directly via email or connect through social channels. I'm always open to discussing new opportunities, creative ideas, and engineering roles.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-sky-500/25 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send an Email</span>
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="px-5 py-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 transition-colors flex items-center gap-2 cursor-pointer text-sm"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedEmail ? 'Email Copied!' : 'Copy Address'}</span>
                </button>
              </div>
            </div>

            {/* Social Gateway Card */}
            <div className="lg:col-span-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-5 space-y-3 text-xs">
              <span className="text-slate-400 block font-mono text-[11px] uppercase tracking-wider">
                DIRECT CHANNELS
              </span>
              
              <div className="space-y-2">
                {data?.socialLinks?.github && (
                  <a
                    href={data.socialLinks.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-sky-500/50 text-slate-200 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Github className="w-4 h-4 text-sky-400" />
                      <span>GitHub</span>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                )}
                {data?.socialLinks?.linkedin && (
                  <a
                    href={data.socialLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-sky-500/50 text-slate-200 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-sky-400" />
                      <span>LinkedIn</span>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                )}
                {data?.socialLinks?.twitter && (
                  <a
                    href={data.socialLinks.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-sky-500/50 text-slate-200 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Twitter className="w-4 h-4 text-sky-400" />
                      <span>Twitter / X</span>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                )}
              </div>
            </div>

          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-[#030610] py-8 text-center text-xs text-slate-500 relative z-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Built with React &amp; Tailwind CSS</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

// Helper internal arrow icon
function ArrowDownRightIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="7" x2="17" y2="17"></line>
      <polyline points="17 7 17 17 7 17"></polyline>
    </svg>
  );
}
