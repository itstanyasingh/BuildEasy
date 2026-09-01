import React, { useState, useMemo } from 'react';
import { PortfolioData, LayoutConfiguration, ArticleItem } from '../../types';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  MapPin, 
  ArrowUpRight, 
  ExternalLink, 
  Code, 
  Layers, 
  Check, 
  Copy, 
  Send, 
  Sparkles, 
  Terminal, 
  Laptop, 
  Smartphone, 
  Database, 
  Globe, 
  CheckCircle2, 
  ChevronUp, 
  Briefcase, 
  GraduationCap,
  Calendar,
  Phone,
  User,
  Sun,
  Moon,
  ArrowRight,
  BookOpen,
  Layout,
  Cpu,
  Zap,
  Palette,
  Eye,
  X,
  Clock,
  Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ModernCreativeDeveloperPortfolioTemplateProps {
  data: PortfolioData;
  config?: LayoutConfiguration;
}

export const ModernCreativeDeveloperPortfolioTemplate: React.FC<ModernCreativeDeveloperPortfolioTemplateProps> = ({ 
  data, 
  config 
}) => {
  // Local Dark/Light mode state (isolated to this template only)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [activeProjectFilter, setActiveProjectFilter] = useState<string>('All');
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);

  // Safe fallback dynamic data bindings
  const profile = data?.profile || {
    name: 'Chetan Verma',
    title: 'Creative Developer & Frontend Architect',
    bio: 'I build high-impact digital experiences, accessible web applications, and scalable design systems with React, Next.js, and TypeScript. Focused on aesthetics, performance, and craftsmanship.',
    location: 'San Francisco, CA · Available Worldwide',
    email: 'chetan.verma@example.com',
    phone: '+1 (555) 234-5678',
    website: 'https://chetanverma.com',
    profilePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80'
  };

  const about = data?.about || {
    aboutText: 'I am a creative technologist and full-stack frontend engineer passionate about the intersection of design, code, and user delight. With over 6 years of experience building applications for fast-growing startups and digital studios, I specialize in crafting fluid, performant, and accessible interfaces that leave a lasting impression.',
    interests: ['Creative Coding', 'Design Systems', 'Micro-Interactions', 'Web Performance', 'Open Source', 'User Experience'],
    services: [
      'Web Application Development',
      'Frontend Architecture & React',
      'UI/UX Design Systems',
      'API & Cloud Integration',
      'Performance Optimization & Core Web Vitals',
      'Creative Interactions & Motion'
    ]
  };

  const servicesList = useMemo(() => {
    return [
      {
        number: '01',
        title: 'Web Application Development',
        icon: Laptop,
        description: 'End-to-end full stack development using modern frameworks like React, Next.js, TypeScript, and Node.js. Clean architecture built for speed and reliability.',
        deliverables: ['Custom Web Apps', 'Single Page Applications (SPA)', 'REST & GraphQL APIs', 'Responsive Layouts']
      },
      {
        number: '02',
        title: 'Frontend Architecture & React',
        icon: Code,
        description: 'Architecting scalable, modular, and maintainable frontend codebases with robust state management, type safety, and testing suites.',
        deliverables: ['Modular Components', 'Zustand / Redux State', 'TypeScript Integration', 'Testing & CI/CD']
      },
      {
        number: '03',
        title: 'UI/UX & Design Systems',
        icon: Palette,
        description: 'Translating Figma & design concepts into living token-based component libraries with strict accessibility standards (WCAG AA).',
        deliverables: ['Tailwind UI Kits', 'Accessible Tokens', 'Theme Engines', 'Figma to Code']
      },
      {
        number: '04',
        title: 'API & Cloud Integration',
        icon: Database,
        description: 'Seamlessly connecting client applications to backend databases, serverless functions, authentication providers, and third-party APIs.',
        deliverables: ['PostgreSQL & Supabase', 'Firebase Auth & Cloud', 'Stripe Payments', 'Webhook Pipelines']
      },
      {
        number: '05',
        title: 'Performance & Core Web Vitals',
        icon: Zap,
        description: 'Profiling and optimizing client bundle size, rendering pipelines, image delivery, and edge caching for 95+ Lighthouse performance scores.',
        deliverables: ['Lighthouse 95+ Audit', 'Bundle Splitting', 'Edge Caching & CDN', 'SEO Architecture']
      },
      {
        number: '06',
        title: 'Motion & Micro-Interactions',
        icon: Sparkles,
        description: 'Bringing interfaces to life with purposeful, physics-based motion, scroll triggers, and delightful micro-interactions that engage users.',
        deliverables: ['Framer Motion / Motion', 'Scroll Transitions', 'Interactive States', 'Fluid Gestures']
      }
    ];
  }, []);

  const projects = useMemo(() => {
    if (data?.projects && data.projects.length > 0) {
      return data.projects;
    }
    return [
      {
        id: 'p-1',
        name: 'Hyperion Design System & Component Studio',
        description: 'A comprehensive multi-brand component library and documentation workbench featuring accessible React primitives and dynamic theming.',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Storybook', 'Figma'],
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=900&auto=format&fit=crop&q=80',
        githubUrl: 'https://github.com',
        liveUrl: 'https://hyperion.example.com',
        featured: true,
        year: '2024',
        category: 'Frontend'
      },
      {
        id: 'p-2',
        name: 'ApexFlow Collaborative Project Hub',
        description: 'Real-time workflow and task orchestrator with multiplayer canvas, live markdown notes, automated notifications, and Kanban boards.',
        technologies: ['Next.js', 'React', 'Zustand', 'Node.js', 'PostgreSQL'],
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=80',
        githubUrl: 'https://github.com',
        liveUrl: 'https://apexflow.example.com',
        featured: true,
        year: '2024',
        category: 'Full Stack'
      },
      {
        id: 'p-3',
        name: 'Synthetix AI Audio & Sound Engine',
        description: 'Interactive browser-based audio synthesizer and spatial soundscape generator featuring real-time Web Audio API visualization.',
        technologies: ['React', 'Web Audio API', 'TypeScript', 'Canvas', 'Tailwind'],
        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=900&auto=format&fit=crop&q=80',
        githubUrl: 'https://github.com',
        liveUrl: 'https://synthetix.example.com',
        featured: false,
        year: '2023',
        category: 'Creative'
      },
      {
        id: 'p-4',
        name: 'Lumina DeFi Portfolio & Analytics Monitor',
        description: 'Cryptocurrency portfolio dashboard with real-time price feeds, gas tracker, yield simulator, and tax export reports.',
        technologies: ['React', 'Recharts', 'Tailwind CSS', 'REST APIs'],
        image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=900&auto=format&fit=crop&q=80',
        githubUrl: 'https://github.com',
        liveUrl: 'https://lumina.example.com',
        featured: false,
        year: '2023',
        category: 'Frontend'
      }
    ];
  }, [data?.projects]);

  const skills = useMemo(() => {
    if (data?.skills && data.skills.length > 0) {
      return data.skills;
    }
    return [
      { id: 's-1', name: 'React / Next.js', category: 'Frontend', proficiency: 96 },
      { id: 's-2', name: 'TypeScript', category: 'Frontend', proficiency: 94 },
      { id: 's-3', name: 'JavaScript (ESNext)', category: 'Frontend', proficiency: 95 },
      { id: 's-4', name: 'Tailwind CSS', category: 'Frontend', proficiency: 98 },
      { id: 's-5', name: 'Node.js & Express', category: 'Backend', proficiency: 88 },
      { id: 's-6', name: 'GraphQL & REST APIs', category: 'Backend', proficiency: 90 },
      { id: 's-7', name: 'PostgreSQL & Supabase', category: 'Database', proficiency: 86 },
      { id: 's-8', name: 'Motion / Framer Motion', category: 'Design', proficiency: 92 },
      { id: 's-9', name: 'Figma to Code', category: 'Design', proficiency: 94 },
      { id: 's-10', name: 'Git & GitHub Actions', category: 'Tools', proficiency: 90 },
      { id: 's-11', name: 'Vite & Webpack', category: 'Tools', proficiency: 88 },
      { id: 's-12', name: 'Jest / Testing Library', category: 'Tools', proficiency: 84 }
    ];
  }, [data?.skills]);

  const experiences = useMemo(() => {
    if (data?.experience && data.experience.length > 0) {
      return data.experience;
    }
    return [
      {
        id: 'exp-1',
        company: 'Vanguard Digital Lab',
        role: 'Lead Frontend Engineer',
        duration: '2022 — Present',
        description: 'Leading the core web client architecture, authoring internal design systems, and driving performance optimization for next-generation web products.',
        current: true,
        technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GraphQL'],
        achievements: [
          'Engineered a scalable design system reducing frontend development cycle times by 40%',
          'Migrated legacy Single Page Application to Next.js resulting in a 65% faster First Contentful Paint',
          'Mentored a team of 7 frontend engineers through weekly code architecture reviews'
        ]
      },
      {
        id: 'exp-2',
        company: 'Starlight Studio',
        role: 'Senior UI/UX Developer',
        duration: '2020 — 2022',
        description: 'Designed and built interactive web experiences, marketing platforms, and client dashboards for high-growth tech startups.',
        current: false,
        technologies: ['React', 'TypeScript', 'Motion', 'Node.js', 'PostgreSQL'],
        achievements: [
          'Delivered 14 bespoke client web platforms with 100% on-time milestone delivery',
          'Integrated automated end-to-end testing with Playwright and Jest'
        ]
      },
      {
        id: 'exp-3',
        company: 'PixelWave Creative',
        role: 'Frontend Developer',
        duration: '2018 — 2020',
        description: 'Developed responsive, mobile-first web applications and interactive landing pages for digital agency clients.',
        current: false,
        technologies: ['JavaScript', 'React', 'HTML5/SCSS', 'REST APIs'],
        achievements: [
          'Implemented responsive component libraries and optimized asset delivery pipelines'
        ]
      }
    ];
  }, [data?.experience]);

  const articles = useMemo(() => {
    if (data?.articles && data.articles.length > 0) {
      return data.articles;
    }
    return [
      {
        id: 'art-1',
        title: 'Architecting Scalable Design Systems in React & Tailwind CSS',
        excerpt: 'A deep dive into token-driven component architecture, accessible composition patterns, and maintaining visual consistency across large engineering teams.',
        date: 'Oct 14, 2024',
        readingTime: '6 min read',
        category: 'Architecture',
        tags: ['React', 'Tailwind', 'Design Systems'],
        content: `Building a design system is far more than bundling buttons and inputs into a component library. It is about establishing a shared vocabulary between designers and engineers. In this article, we explore how token-based architectures in Tailwind CSS combined with polymorphic React components create robust, future-proof interfaces.`
      },
      {
        id: 'art-2',
        title: 'Modern State Management: Zustand vs Redux Toolkit in 2025',
        excerpt: 'Comparing minimalist state stores against opinionated enterprise frameworks. When to use atomic slices and when to keep state co-located.',
        date: 'Sep 28, 2024',
        readingTime: '5 min read',
        category: 'State Management',
        tags: ['React', 'Zustand', 'TypeScript'],
        content: `State management in React has matured tremendously. While Redux Toolkit remains a reliable titan for large enterprise graphs, Zustand has emerged as the go-to choice for fast, boilerplate-free state synchronization. Here is an architectural comparison.`
      },
      {
        id: 'art-3',
        title: 'Mastering Core Web Vitals & Next.js Performance Optimization',
        excerpt: 'Actionable techniques to eliminate layout shifts (CLS), accelerate Largest Contentful Paint (LCP), and achieve flawless 99+ Lighthouse performance scores.',
        date: 'Aug 19, 2024',
        readingTime: '8 min read',
        category: 'Performance',
        tags: ['Next.js', 'Performance', 'Web Vitals'],
        content: `Performance is an essential pillar of user experience and SEO. In this breakdown, we examine font optimization strategies, dynamic imports with ssr: false for heavy client modules, image priority preloading, and edge caching.`
      }
    ];
  }, [data?.articles]);

  const categories = ['All', 'Frontend', 'Full Stack', 'Creative'];

  const filteredProjects = useMemo(() => {
    if (activeProjectFilter === 'All') return projects;
    return projects.filter(p => {
      const matchCat = (p as any).category === activeProjectFilter;
      const matchTech = p.technologies?.some(t => t.toLowerCase().includes(activeProjectFilter.toLowerCase()));
      return matchCat || matchTech;
    });
  }, [projects, activeProjectFilter]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setContactForm({ name: '', email: '', subject: '', message: '' });
      setFormSubmitted(false);
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'work', label: 'Work' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div 
      className={`min-h-screen transition-colors duration-300 font-sans selection:bg-neutral-800 selection:text-white ${
        isDarkMode 
          ? 'bg-[#121212] text-neutral-100' 
          : 'bg-[#ffffff] text-neutral-900'
      }`}
    >
      
      {/* ========================================================================= */}
      {/* 1. TOP NAVIGATION                                                         */}
      {/* ========================================================================= */}
      <header 
        className={`sticky top-0 z-40 px-4 sm:px-8 py-5 transition-colors duration-300 backdrop-blur-md border-b ${
          isDarkMode 
            ? 'bg-[#121212]/85 border-neutral-800/80 text-white' 
            : 'bg-white/85 border-neutral-200/80 text-neutral-900'
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo */}
          <a 
            href="#home" 
            className="text-xl sm:text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity flex items-center gap-1"
          >
            <span>{profile.name.split(' ')[0]}</span>
            <span className="opacity-40">{profile.name.split(' ')[1] || 'Verma'}.</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`transition-colors py-1 relative group ${
                  isDarkMode 
                    ? 'text-neutral-400 hover:text-white' 
                    : 'text-neutral-600 hover:text-neutral-950'
                }`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                  isDarkMode ? 'bg-white' : 'bg-neutral-900'
                }`} />
              </a>
            ))}
          </nav>

          {/* Right Action: Local Theme Switcher & Hire Button */}
          <div className="flex items-center gap-3">
            
            {/* Theme Toggle Button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2.5 rounded-full transition-all cursor-pointer ${
                isDarkMode 
                  ? 'bg-neutral-800 text-amber-300 hover:bg-neutral-700' 
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
              aria-label="Toggle theme"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <a
              href="#contact"
              className={`hidden sm:inline-flex px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                isDarkMode
                  ? 'bg-white text-neutral-950 hover:bg-neutral-200'
                  : 'bg-neutral-900 text-white hover:bg-neutral-800'
              }`}
            >
              Connect
            </a>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isDarkMode ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-900'
              }`}
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`h-0.5 bg-current transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`h-0.5 bg-current transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`h-0.5 bg-current transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>

          </div>

        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden pt-4 pb-2 border-t mt-3 space-y-1 flex flex-col ${
                isDarkMode ? 'border-neutral-800' : 'border-neutral-200'
              }`}
            >
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isDarkMode ? 'text-neutral-300 hover:bg-neutral-800' : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`mt-2 text-center px-4 py-2.5 rounded-full text-xs font-semibold ${
                  isDarkMode ? 'bg-white text-neutral-950' : 'bg-neutral-900 text-white'
                }`}
              >
                Connect
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-20 space-y-28 sm:space-y-36">

        {/* ========================================================================= */}
        {/* 2. HERO SECTION                                                           */}
        {/* ========================================================================= */}
        <section id="home" className="pt-4 sm:pt-10 space-y-8">
          
          <div className="space-y-4 max-w-4xl">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className={isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}>
                Available for freelance &amp; full-time opportunities
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Building digital products, brands, and experiences.
            </h1>

            <p className={`text-lg sm:text-xl font-normal leading-relaxed max-w-2xl ${
              isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
            }`}>
              Hi, I'm <strong className={isDarkMode ? 'text-white font-semibold' : 'text-neutral-950 font-semibold'}>{profile.name}</strong> — {profile.bio}
            </p>

          </div>

          {/* Actions & Socials */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#work"
              className={`px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all shadow-sm flex items-center gap-2 group ${
                isDarkMode
                  ? 'bg-white text-neutral-950 hover:bg-neutral-200'
                  : 'bg-neutral-900 text-white hover:bg-neutral-800'
              }`}
            >
              <span>Explore My Work</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#contact"
              className={`px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all border ${
                isDarkMode
                  ? 'border-neutral-700 text-white hover:bg-neutral-800'
                  : 'border-neutral-300 text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              Schedule a Call
            </a>

            {/* Social Links Dock */}
            <div className="flex items-center gap-2 sm:ml-4">
              {data?.socialLinks?.github && (
                <a
                  href={data.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className={`p-3 rounded-full border transition-all ${
                    isDarkMode 
                      ? 'border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600' 
                      : 'border-neutral-200 text-neutral-600 hover:text-neutral-950 hover:border-neutral-400'
                  }`}
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {data?.socialLinks?.linkedin && (
                <a
                  href={data.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className={`p-3 rounded-full border transition-all ${
                    isDarkMode 
                      ? 'border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600' 
                      : 'border-neutral-200 text-neutral-600 hover:text-neutral-950 hover:border-neutral-400'
                  }`}
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {data?.socialLinks?.twitter && (
                <a
                  href={data.socialLinks.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className={`p-3 rounded-full border transition-all ${
                    isDarkMode 
                      ? 'border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600' 
                      : 'border-neutral-200 text-neutral-600 hover:text-neutral-950 hover:border-neutral-400'
                  }`}
                  aria-label="Twitter Profile"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              <a
                href={`mailto:${profile.email}`}
                className={`p-3 rounded-full border transition-all ${
                  isDarkMode 
                    ? 'border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600' 
                    : 'border-neutral-200 text-neutral-600 hover:text-neutral-950 hover:border-neutral-400'
                }`}
                aria-label="Email Contact"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

          </div>

        </section>

        {/* ========================================================================= */}
        {/* 3. WORK / PROJECTS SECTION                                                */}
        {/* ========================================================================= */}
        <section id="work" className="space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-6 ${isDarkMode ? 'border-neutral-800' : 'border-neutral-200'}">
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Work.
              </h2>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                A curated selection of digital applications, UI design systems, and creative web tools.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className={`flex items-center gap-1.5 p-1 rounded-full border self-start sm:self-auto ${
              isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-100 border-neutral-200'
            }`}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveProjectFilter(cat)}
                  className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all ${
                    activeProjectFilter === cat
                      ? isDarkMode
                        ? 'bg-white text-neutral-950 shadow-sm'
                        : 'bg-neutral-900 text-white shadow-sm'
                      : isDarkMode
                        ? 'text-neutral-400 hover:text-white'
                        : 'text-neutral-600 hover:text-neutral-950'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between group ${
                  isDarkMode
                    ? 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-600'
                    : 'bg-neutral-50/70 border-neutral-200 hover:border-neutral-400'
                }`}
              >
                
                {/* Visual Cover Banner */}
                <div className="h-64 sm:h-72 w-full overflow-hidden relative bg-neutral-800">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                      <Laptop className="w-12 h-12 opacity-40 mb-2" />
                      <span className="text-xs font-medium opacity-60">{project.name}</span>
                    </div>
                  )}

                  {/* Year Tag Badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border ${
                    isDarkMode
                      ? 'bg-neutral-950/80 border-neutral-700 text-white'
                      : 'bg-white/80 border-neutral-200 text-neutral-900'
                  }`}>
                    {project.year || '2024'}
                  </div>
                </div>

                {/* Content Block */}
                <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                        {project.name}
                      </h3>
                    </div>

                    <p className={`text-sm leading-relaxed ${
                      isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                    }`}>
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack & Actions */}
                  <div className="space-y-5 pt-4">
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${
                              isDarkMode
                                ? 'bg-neutral-800/80 border-neutral-700/80 text-neutral-300'
                                : 'bg-neutral-200/70 border-neutral-300 text-neutral-700'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action Links */}
                    <div className={`flex items-center gap-3 pt-4 border-t ${
                      isDarkMode ? 'border-neutral-800' : 'border-neutral-200'
                    }`}>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                            isDarkMode
                              ? 'bg-white text-neutral-950 hover:bg-neutral-200'
                              : 'bg-neutral-900 text-white hover:bg-neutral-800'
                          }`}
                        >
                          <span>Live Demo</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={`px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all border flex items-center gap-1.5 ${
                            isDarkMode
                              ? 'border-neutral-700 text-neutral-300 hover:text-white hover:bg-neutral-800'
                              : 'border-neutral-300 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100'
                          }`}
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Source</span>
                        </a>
                      )}
                    </div>
                  </div>

                </div>

              </motion.div>
            ))}
          </div>

        </section>

        {/* ========================================================================= */}
        {/* 4. SERVICES SECTION                                                       */}
        {/* ========================================================================= */}
        <section id="services" className="space-y-10">
          
          <div className="space-y-2 border-b pb-6 ${isDarkMode ? 'border-neutral-800' : 'border-neutral-200'}">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Services.
            </h2>
            <p className={`text-sm sm:text-base ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
              End-to-end design &amp; engineering capabilities tailored for startups, agencies, and enterprise products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesList.map((service, idx) => {
              const IconComp = service.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                  className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between space-y-6 ${
                    isDarkMode
                      ? 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-600 hover:bg-neutral-900/70'
                      : 'bg-neutral-50/60 border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-2xl border ${
                        isDarkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-neutral-200 text-neutral-900'
                      }`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className={`text-xl font-mono font-bold ${
                        isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                      }`}>
                        {service.number}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold tracking-tight">
                      {service.title}
                    </h3>

                    <p className={`text-xs sm:text-sm leading-relaxed ${
                      isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                    }`}>
                      {service.description}
                    </p>
                  </div>

                  {/* Deliverables tags */}
                  <div className={`pt-4 border-t space-y-2 ${
                    isDarkMode ? 'border-neutral-800' : 'border-neutral-200'
                  }`}>
                    <div className="text-[11px] font-semibold tracking-wider uppercase opacity-60">
                      Key Deliverables
                    </div>
                    <ul className="space-y-1.5 text-xs">
                      {service.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-center gap-2">
                          <Check className={`w-3.5 h-3.5 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`} />
                          <span className={isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </section>

        {/* ========================================================================= */}
        {/* 5. ABOUT SECTION                                                          */}
        {/* ========================================================================= */}
        <section id="about" className="space-y-10">
          
          <div className="space-y-2 border-b pb-6 ${isDarkMode ? 'border-neutral-800' : 'border-neutral-200'}">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              About.
            </h2>
            <p className={`text-sm sm:text-base ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
              The mindset, journey, and technical philosophy behind my work.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Photo / Visual card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className={`relative rounded-3xl p-3 border w-full max-w-sm ${
                isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-100 border-neutral-200'
              }`}>
                <div className="w-full h-80 rounded-2xl overflow-hidden bg-neutral-800">
                  {profile.profilePhoto ? (
                    <img
                      src={profile.profilePhoto}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-center p-6">
                      <User className="w-16 h-16 opacity-40 mb-2" />
                      <span className="text-xs opacity-60">{profile.name}</span>
                    </div>
                  )}
                </div>

                <div className={`p-4 mt-3 rounded-2xl border text-center space-y-1 ${
                  isDarkMode ? 'bg-neutral-950 border-neutral-800' : 'bg-white border-neutral-200'
                }`}>
                  <div className="text-sm font-bold">{profile.name}</div>
                  <div className={`text-xs ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    {profile.title}
                  </div>
                  <div className="text-[11px] font-mono opacity-70 flex items-center justify-center gap-1 pt-1">
                    <MapPin className="w-3 h-3" />
                    <span>{profile.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Bio Narrative & Highlights */}
            <div className="lg:col-span-7 space-y-6">
              
              <h3 className="text-2xl font-bold tracking-tight">
                Crafting thoughtful user interfaces that bridge the gap between design and engineering.
              </h3>

              <p className={`text-base leading-relaxed ${
                isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
              }`}>
                {about.aboutText}
              </p>

              {/* Core Interests & Philosophy Chips */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-semibold uppercase tracking-wider opacity-70">
                  Engineering Principles &amp; Focus
                </div>
                <div className="flex flex-wrap gap-2">
                  {about.interests && about.interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium border ${
                        isDarkMode
                          ? 'bg-neutral-900 border-neutral-800 text-neutral-300'
                          : 'bg-neutral-100 border-neutral-300 text-neutral-800'
                      }`}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick metrics */}
              <div className={`grid grid-cols-3 gap-4 pt-4 border-t ${
                isDarkMode ? 'border-neutral-800' : 'border-neutral-200'
              }`}>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold">6+</div>
                  <div className={`text-xs ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>Years Coding</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold">25+</div>
                  <div className={`text-xs ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>Projects Shipped</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold">100%</div>
                  <div className={`text-xs ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>Client Delight</div>
                </div>
              </div>

            </div>

          </div>

        </section>

        {/* ========================================================================= */}
        {/* 6. TECHNICAL SKILLS SECTION                                               */}
        {/* ========================================================================= */}
        <section id="skills" className="space-y-10">
          
          <div className="space-y-2 border-b pb-6 ${isDarkMode ? 'border-neutral-800' : 'border-neutral-200'}">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Skills.
            </h2>
            <p className={`text-sm sm:text-base ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
              Technologies, toolchains, and methodologies I leverage daily.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className={`p-5 rounded-2xl border transition-all duration-200 space-y-2 ${
                  isDarkMode
                    ? 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-700'
                    : 'bg-neutral-50/60 border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">{skill.name}</span>
                  <span className={`text-xs font-mono font-medium ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                  }`}>
                    {skill.proficiency}%
                  </span>
                </div>

                <div className={`w-full h-1.5 rounded-full overflow-hidden ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className={`h-full rounded-full ${
                      isDarkMode ? 'bg-white' : 'bg-neutral-900'
                    }`}
                  />
                </div>

                <div className={`text-[11px] font-mono ${
                  isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
                }`}>
                  {skill.category || 'Engineering'}
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* ========================================================================= */}
        {/* 7. EXPERIENCE SECTION                                                     */}
        {/* ========================================================================= */}
        <section id="experience" className="space-y-10">
          
          <div className="space-y-2 border-b pb-6 ${isDarkMode ? 'border-neutral-800' : 'border-neutral-200'}">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Experience.
            </h2>
            <p className={`text-sm sm:text-base ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
              My professional timeline and impactful engineering milestones.
            </p>
          </div>

          <div className="space-y-6">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.id || idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.1 }}
                className={`p-6 sm:p-8 rounded-3xl border transition-all ${
                  isDarkMode
                    ? 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-700'
                    : 'bg-neutral-50/60 border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-4 mb-4 ${isDarkMode ? 'border-neutral-800' : 'border-neutral-200'}">
                  <div>
                    <h3 className="text-xl font-bold">{exp.role}</h3>
                    <div className={`text-sm font-medium ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                      {exp.company}
                    </div>
                  </div>
                  <div className={`text-xs font-mono px-3 py-1 rounded-full border self-start sm:self-auto ${
                    isDarkMode ? 'bg-neutral-950 border-neutral-800 text-neutral-300' : 'bg-white border-neutral-200 text-neutral-700'
                  }`}>
                    {exp.duration}
                  </div>
                </div>

                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  {exp.description}
                </p>

                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="space-y-2 text-xs pt-3">
                    {exp.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2">
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                          isDarkMode ? 'text-white' : 'text-neutral-900'
                        }`} />
                        <span className={isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}>{ach}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="pt-4 flex flex-wrap gap-1.5">
                    {exp.technologies.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className={`text-[11px] font-mono px-2.5 py-0.5 rounded-md border ${
                          isDarkMode
                            ? 'bg-neutral-800/60 border-neutral-700 text-neutral-300'
                            : 'bg-neutral-200/60 border-neutral-300 text-neutral-700'
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

              </motion.div>
            ))}
          </div>

        </section>

        {/* ========================================================================= */}
        {/* 8. BLOG / CONTENT SECTION                                                 */}
        {/* ========================================================================= */}
        <section id="blog" className="space-y-10">
          
          <div className="space-y-2 border-b pb-6 ${isDarkMode ? 'border-neutral-800' : 'border-neutral-200'}">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Blog &amp; Insights.
            </h2>
            <p className={`text-sm sm:text-base ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
              Articles, architectural deep dives, and thoughts on frontend development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article, idx) => (
              <motion.div
                key={article.id || idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.1 }}
                className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between space-y-4 group ${
                  isDarkMode
                    ? 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-600 hover:bg-neutral-900/70'
                    : 'bg-neutral-50/60 border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className={`px-2.5 py-0.5 rounded-full border ${
                      isDarkMode ? 'bg-neutral-800 border-neutral-700 text-neutral-300' : 'bg-neutral-200 border-neutral-300 text-neutral-700'
                    }`}>
                      {article.category || 'Tech'}
                    </span>
                    <span className={isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}>
                      {article.date}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold tracking-tight group-hover:underline underline-offset-4">
                    {article.title}
                  </h3>

                  <p className={`text-xs sm:text-sm leading-relaxed line-clamp-3 ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                  }`}>
                    {article.excerpt}
                  </p>
                </div>

                <div className={`pt-4 border-t flex items-center justify-between text-xs ${
                  isDarkMode ? 'border-neutral-800' : 'border-neutral-200'
                }`}>
                  <span className={`flex items-center gap-1 font-mono ${
                    isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
                  }`}>
                    <Clock className="w-3 h-3" />
                    <span>{article.readingTime || '5 min read'}</span>
                  </span>

                  <button
                    onClick={() => setSelectedArticle(article)}
                    className={`font-semibold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer ${
                      isDarkMode ? 'text-white' : 'text-neutral-950'
                    }`}
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </motion.div>
            ))}
          </div>

        </section>

        {/* ========================================================================= */}
        {/* 9. CONTACT SECTION                                                        */}
        {/* ========================================================================= */}
        <section id="contact" className="space-y-10">
          
          <div className="space-y-2 border-b pb-6 ${isDarkMode ? 'border-neutral-800' : 'border-neutral-200'}">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Let's Connect.
            </h2>
            <p className={`text-sm sm:text-base ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
              Have a project in mind or interested in collaborating? Let's talk.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Info Panel */}
            <div className={`lg:col-span-5 p-6 sm:p-8 rounded-3xl border space-y-6 ${
              isDarkMode ? 'bg-neutral-900/60 border-neutral-800' : 'bg-neutral-50/70 border-neutral-200'
            }`}>
              <h3 className="text-2xl font-bold tracking-tight">
                Let's build something extraordinary together.
              </h3>

              <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                I am currently open for full-time senior engineering roles, high-impact freelance contracts, and technical consulting.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-2xl border ${
                    isDarkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-neutral-200 text-neutral-900'
                  }`}>
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`text-xs ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>Direct Email</div>
                    <div className="text-sm font-semibold font-mono">{profile.email}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-2xl border ${
                    isDarkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-neutral-200 text-neutral-900'
                  }`}>
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`text-xs ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>Location</div>
                    <div className="text-sm font-semibold">{profile.location}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-2xl border ${
                    isDarkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-neutral-200 text-neutral-900'
                  }`}>
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`text-xs ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>Availability</div>
                    <div className="text-sm font-semibold text-emerald-500">Immediate / Remote</div>
                  </div>
                </div>
              </div>

              <div className={`pt-4 border-t ${isDarkMode ? 'border-neutral-800' : 'border-neutral-200'}`}>
                <button
                  onClick={handleCopyEmail}
                  className={`w-full py-3 rounded-full text-xs font-semibold tracking-wide transition-all border flex items-center justify-center gap-2 cursor-pointer ${
                    isDarkMode
                      ? 'border-neutral-700 text-white hover:bg-neutral-800'
                      : 'border-neutral-300 text-neutral-900 hover:bg-neutral-100'
                  }`}
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedEmail ? 'Email Copied to Clipboard!' : 'Copy Email Address'}</span>
                </button>
              </div>
            </div>

            {/* Right Interactive Form */}
            <div className={`lg:col-span-7 p-6 sm:p-8 rounded-3xl border ${
              isDarkMode ? 'bg-neutral-900/60 border-neutral-800' : 'bg-neutral-50/70 border-neutral-200'
            }`}>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className={`text-xs font-semibold ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Smith"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className={`w-full px-4 py-3 rounded-2xl border text-xs focus:outline-none transition-colors ${
                        isDarkMode
                          ? 'bg-neutral-950 border-neutral-800 text-white focus:border-neutral-500 placeholder:text-neutral-600'
                          : 'bg-white border-neutral-200 text-neutral-900 focus:border-neutral-500 placeholder:text-neutral-400'
                      }`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className={`text-xs font-semibold ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className={`w-full px-4 py-3 rounded-2xl border text-xs focus:outline-none transition-colors ${
                        isDarkMode
                          ? 'bg-neutral-950 border-neutral-800 text-white focus:border-neutral-500 placeholder:text-neutral-600'
                          : 'bg-white border-neutral-200 text-neutral-900 focus:border-neutral-500 placeholder:text-neutral-400'
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className={`text-xs font-semibold ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                    Subject / Project Goal
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E-Commerce Redesign / Senior React Role"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className={`w-full px-4 py-3 rounded-2xl border text-xs focus:outline-none transition-colors ${
                      isDarkMode
                        ? 'bg-neutral-950 border-neutral-800 text-white focus:border-neutral-500 placeholder:text-neutral-600'
                        : 'bg-white border-neutral-200 text-neutral-900 focus:border-neutral-500 placeholder:text-neutral-400'
                    }`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className={`text-xs font-semibold ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Hi Chetan, I would love to discuss a project..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className={`w-full px-4 py-3 rounded-2xl border text-xs focus:outline-none transition-colors resize-none ${
                      isDarkMode
                        ? 'bg-neutral-950 border-neutral-800 text-white focus:border-neutral-500 placeholder:text-neutral-600'
                        : 'bg-white border-neutral-200 text-neutral-900 focus:border-neutral-500 placeholder:text-neutral-400'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full py-3.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer ${
                    isDarkMode
                      ? 'bg-white text-neutral-950 hover:bg-neutral-200'
                      : 'bg-neutral-900 text-white hover:bg-neutral-800'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>

                {formSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-2xl bg-emerald-900/50 border border-emerald-600/50 text-emerald-300 text-xs text-center font-medium"
                  >
                    Thank you! Your message has been received. I will reply shortly.
                  </motion.div>
                )}

              </form>
            </div>

          </div>

        </section>

      </main>

      {/* ========================================================================= */}
      {/* 10. ARTICLE READER MODAL                                                  */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border shadow-2xl space-y-6 ${
                isDarkMode ? 'bg-[#18181b] border-neutral-700 text-white' : 'bg-white border-neutral-200 text-neutral-900'
              }`}
            >
              <div className="flex items-center justify-between border-b pb-4 ${isDarkMode ? 'border-neutral-700' : 'border-neutral-200'}">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className={`px-2.5 py-0.5 rounded-full border ${
                    isDarkMode ? 'bg-neutral-800 border-neutral-700 text-neutral-300' : 'bg-neutral-100 border-neutral-300 text-neutral-700'
                  }`}>
                    {selectedArticle.category}
                  </span>
                  <span className={isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}>
                    {selectedArticle.date}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedArticle(null)}
                  className={`p-2 rounded-full transition-colors cursor-pointer ${
                    isDarkMode ? 'hover:bg-neutral-800 text-neutral-400' : 'hover:bg-neutral-100 text-neutral-600'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold tracking-tight">
                  {selectedArticle.title}
                </h3>
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  {selectedArticle.content || selectedArticle.excerpt}
                </p>
              </div>

              <div className={`pt-4 border-t flex justify-end ${isDarkMode ? 'border-neutral-700' : 'border-neutral-200'}`}>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className={`px-5 py-2 rounded-full text-xs font-semibold ${
                    isDarkMode ? 'bg-white text-neutral-950' : 'bg-neutral-900 text-white'
                  }`}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 11. FOOTER                                                                */}
      {/* ========================================================================= */}
      <footer className={`border-t py-12 text-xs transition-colors duration-300 ${
        isDarkMode ? 'bg-neutral-950 border-neutral-800 text-neutral-400' : 'bg-neutral-50 border-neutral-200 text-neutral-500'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            Designed &amp; Developed with craftsmanship by <strong className={isDarkMode ? 'text-white' : 'text-neutral-950'}>{profile.name}</strong>.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                isDarkMode ? 'border-neutral-800 bg-neutral-900 text-white hover:bg-neutral-800' : 'border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-100'
              }`}
              aria-label="Back to top"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
};
