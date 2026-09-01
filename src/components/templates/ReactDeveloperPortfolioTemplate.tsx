import React, { useState, useMemo } from 'react';
import { PortfolioData, LayoutConfiguration } from '../../types';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  FileText, 
  MapPin, 
  ArrowUpRight, 
  ExternalLink, 
  Code, 
  Layers, 
  Check, 
  Copy, 
  Send, 
  Sparkles, 
  Download, 
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
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ReactDeveloperPortfolioTemplateProps {
  data: PortfolioData;
  config?: LayoutConfiguration;
}

export const ReactDeveloperPortfolioTemplate: React.FC<ReactDeveloperPortfolioTemplateProps> = ({ 
  data, 
  config 
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Safe fallback dynamic data bindings
  const profile = data?.profile || {
    name: 'Yuji Sato',
    title: 'Frontend React Developer & UI Engineer',
    bio: 'I specialize in building high-performance, responsive web applications with React.js, Next.js, and modern TypeScript. Passionate about clean code, component architecture, and intuitive user experiences.',
    location: 'Tokyo, Japan · Available Worldwide',
    email: 'yuji.sato.dev@gmail.com',
    phone: '+81 90 1234 5678',
    website: 'https://yujisato.dev',
    profilePhoto: ''
  };

  const about = data?.about || {
    aboutText: 'I am a frontend software engineer with a strong focus on the React ecosystem. Over the years, I have built dozens of modern web applications ranging from SaaS dashboards to interactive e-commerce platforms. I take pride in crafting pixel-perfect, accessible, and fast web experiences.',
    interests: ['React Architecture', 'State Management', 'Design Systems', 'Performance Optimization', 'Full-Stack Integration'],
    services: ['Single Page Applications (SPA)', 'Component Design Systems', 'REST & GraphQL API Integration', 'Responsive UI/UX Development']
  };

  const skills = useMemo(() => {
    if (data?.skills && data.skills.length > 0) {
      return data.skills;
    }
    return [
      { id: 'sk-1', name: 'React.js', category: 'Frontend', proficiency: 96 },
      { id: 'sk-2', name: 'Next.js', category: 'Frontend', proficiency: 92 },
      { id: 'sk-3', name: 'TypeScript', category: 'Frontend', proficiency: 90 },
      { id: 'sk-4', name: 'JavaScript (ES6+)', category: 'Frontend', proficiency: 95 },
      { id: 'sk-5', name: 'Redux Toolkit / Zustand', category: 'Frontend', proficiency: 88 },
      { id: 'sk-6', name: 'Tailwind CSS', category: 'Frontend', proficiency: 94 },
      { id: 'sk-7', name: 'HTML5 & CSS3 / SCSS', category: 'Frontend', proficiency: 95 },
      { id: 'sk-8', name: 'Node.js & Express', category: 'Backend', proficiency: 84 },
      { id: 'sk-9', name: 'REST APIs & GraphQL', category: 'Backend', proficiency: 88 },
      { id: 'sk-10', name: 'Firebase & Supabase', category: 'Backend', proficiency: 82 },
      { id: 'sk-11', name: 'PostgreSQL & MongoDB', category: 'Databases', proficiency: 80 },
      { id: 'sk-12', name: 'Git & GitHub', category: 'Tools', proficiency: 92 },
      { id: 'sk-13', name: 'Jest & React Testing', category: 'Tools', proficiency: 82 },
      { id: 'sk-14', name: 'Vite & Webpack', category: 'Tools', proficiency: 86 },
      { id: 'sk-15', name: 'Figma to Code', category: 'Design', proficiency: 90 }
    ];
  }, [data?.skills]);

  const experiences = useMemo(() => {
    if (data?.experience && data.experience.length > 0) {
      return data.experience;
    }
    return [
      {
        id: 'exp-1',
        company: 'Nexus Creative Studio',
        role: 'Senior React Developer',
        duration: '2022 — Present',
        description: 'Lead frontend architect for client web applications. Designing scalable React component systems, driving state architecture, and mentoring engineers.',
        current: true,
        technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GraphQL'],
        achievements: [
          'Engineered custom design system used across 8 flagship client applications',
          'Boosted Lighthouse performance scores from 68 to 98 through code-splitting and asset optimization',
          'Built complex state management pipelines using Redux Toolkit and React Query'
        ]
      },
      {
        id: 'exp-2',
        company: 'Apex Digital Labs',
        role: 'Frontend Web Developer',
        duration: '2020 — 2022',
        description: 'Developed responsive client portals, analytics dashboards, and interactive marketing websites using React and modern JavaScript.',
        current: false,
        technologies: ['React', 'JavaScript', 'Redux', 'REST APIs', 'SCSS'],
        achievements: [
          'Implemented real-time chart visualizers with D3 and Recharts for enterprise dashboard',
          'Collaborated with UX designers to translate Figma mockups into reusable UI components'
        ]
      },
      {
        id: 'exp-3',
        company: 'PixelCraft Agency',
        role: 'Junior Web Developer',
        duration: '2018 — 2020',
        description: 'Built cross-browser compatible landing pages, integrated third-party forms, and maintained e-commerce storefronts.',
        current: false,
        technologies: ['JavaScript', 'HTML5', 'CSS3', 'Git', 'Bootstrap'],
        achievements: [
          'Delivered 20+ responsive client websites on tight agency deadlines'
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
        id: 'p-1',
        name: 'OmniCommerce React Platform',
        description: 'A full-featured modern e-commerce storefront with dynamic cart, Stripe payment gateway, real-time product filters, and responsive checkout.',
        technologies: ['React', 'Redux Toolkit', 'Stripe API', 'Tailwind CSS', 'Node.js'],
        image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format&fit=crop&q=80',
        githubUrl: 'https://github.com',
        liveUrl: 'https://demo-ecommerce.example.com',
        featured: true,
        year: '2024',
        category: 'React'
      },
      {
        id: 'p-2',
        name: 'DevPulse SaaS Analytics Dashboard',
        description: 'Interactive developer metric dashboard with real-time WebSocket telemetry, interactive charting, light/dark themes, and team management.',
        technologies: ['React', 'TypeScript', 'Recharts', 'Tailwind CSS', 'Supabase'],
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
        githubUrl: 'https://github.com',
        liveUrl: 'https://demo-analytics.example.com',
        featured: true,
        year: '2024',
        category: 'Full Stack'
      },
      {
        id: 'p-3',
        name: 'TaskFlow Agile Kanban Board',
        description: 'Drag-and-drop workflow productivity application with custom column organization, tag filtering, activity logs, and local cache sync.',
        technologies: ['React', 'DnD Kit', 'Zustand', 'Tailwind CSS'],
        image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&auto=format&fit=crop&q=80',
        githubUrl: 'https://github.com',
        liveUrl: 'https://demo-taskflow.example.com',
        featured: false,
        year: '2023',
        category: 'React'
      },
      {
        id: 'p-4',
        name: 'CryptoTrack Real-Time Explorer',
        description: 'Cryptocurrency market monitor consuming CoinGecko API with price alerts, historic Candlestick charts, and portfolio balance simulator.',
        technologies: ['React', 'Axios', 'Chart.js', 'Tailwind CSS'],
        image: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?w=800&auto=format&fit=crop&q=80',
        githubUrl: 'https://github.com',
        liveUrl: 'https://demo-crypto.example.com',
        featured: false,
        year: '2023',
        category: 'React'
      }
    ];
  }, [data?.projects]);

  const education = useMemo(() => {
    if (data?.education && data.education.length > 0) {
      return data.education;
    }
    return [
      {
        id: 'edu-1',
        institution: 'Tokyo Institute of Technology',
        degree: 'Bachelor of Science in Information & Computer Science',
        duration: '2014 — 2018',
        grade: 'Dean\'s Honors List'
      }
    ];
  }, [data?.education]);

  // Project categories
  const categories = ['All', 'React', 'Full Stack'];

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter(p => {
      const matchCat = (p as any).category === activeFilter;
      const matchTech = p.technologies?.some(t => t.toLowerCase().includes(activeFilter.toLowerCase()));
      return matchCat || matchTech;
    });
  }, [projects, activeFilter]);

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
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-[#1f242d] text-slate-100 font-sans selection:bg-[#0ef] selection:text-[#1f242d] relative overflow-x-hidden">
      
      {/* Subtle ambient lighting flares */}
      <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-[#0ef]/5 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* ========================================================================= */}
      {/* 1. STICKY NAVBAR                                                          */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 bg-[#1f242d]/90 backdrop-blur-md border-b border-[#323946] px-4 sm:px-8 py-4 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo */}
          <a href="#home" className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-1.5 group">
            <span className="text-[#0ef] group-hover:rotate-12 transition-transform duration-300 font-mono">&lt;</span>
            <span className="group-hover:text-[#0ef] transition-colors">{profile.name}</span>
            <span className="text-[#0ef] group-hover:-rotate-12 transition-transform duration-300 font-mono">/&gt;</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-300">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="hover:text-[#0ef] transition-colors tracking-wide relative group py-1"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0ef] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action: Contact CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#contact"
              className="px-5 py-2 rounded-full bg-[#0ef] hover:bg-[#0ef]/90 text-[#1f242d] font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(0,238,255,0.4)] hover:shadow-[0_0_25px_rgba(0,238,255,0.6)] hover:scale-105"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-[#323946] text-[#0ef] hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`h-0.5 bg-current transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`h-0.5 bg-current transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 bg-current transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>

        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pt-4 pb-2 border-t border-[#323946] mt-3 space-y-2 flex flex-col"
            >
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-semibold text-slate-300 hover:text-[#0ef] hover:bg-[#323946]/50 rounded-lg transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 text-center px-4 py-2.5 rounded-full bg-[#0ef] text-[#1f242d] font-bold text-xs uppercase"
              >
                Hire Me
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
        <section id="home" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-2 sm:pt-6">
          
          {/* Left Column: Greeting, Role & Action */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-2">
              <span className="text-base sm:text-lg font-semibold text-slate-300 tracking-wide block">
                Hello, It's Me
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                {profile.name}
              </h1>
              <div className="text-xl sm:text-2xl font-bold text-slate-200 flex items-center gap-2 flex-wrap">
                <span>And I'm a</span>
                <span className="text-[#0ef] font-extrabold tracking-wide drop-shadow-[0_0_10px_rgba(0,238,255,0.4)]">
                  {profile.title.split('&')[0] || 'Frontend React Developer'}
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              {profile.bio}
            </p>

            {/* Social Links Dock */}
            <div className="flex items-center gap-3.5 pt-2">
              {data?.socialLinks?.github && (
                <a
                  href={data.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border-2 border-[#0ef] text-[#0ef] hover:bg-[#0ef] hover:text-[#1f242d] flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,238,255,0.6)] hover:-translate-y-1"
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
                  className="w-10 h-10 rounded-full border-2 border-[#0ef] text-[#0ef] hover:bg-[#0ef] hover:text-[#1f242d] flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,238,255,0.6)] hover:-translate-y-1"
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
                  className="w-10 h-10 rounded-full border-2 border-[#0ef] text-[#0ef] hover:bg-[#0ef] hover:text-[#1f242d] flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,238,255,0.6)] hover:-translate-y-1"
                  aria-label="Twitter Profile"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              <a
                href={`mailto:${profile.email}`}
                className="w-10 h-10 rounded-full border-2 border-[#0ef] text-[#0ef] hover:bg-[#0ef] hover:text-[#1f242d] flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,238,255,0.6)] hover:-translate-y-1"
                aria-label="Email Contact"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <a
                href="#projects"
                className="px-7 py-3 rounded-full bg-[#0ef] hover:bg-[#0ef]/90 text-[#1f242d] font-bold text-sm tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(0,238,255,0.4)] hover:shadow-[0_0_25px_rgba(0,238,255,0.7)] hover:scale-105 flex items-center gap-2 cursor-pointer"
              >
                <span>View My Work</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="px-7 py-3 rounded-full bg-transparent hover:bg-[#323946] border-2 border-[#0ef] text-[#0ef] hover:text-white font-bold text-sm tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Me</span>
              </a>
            </div>

          </div>

          {/* Right Column: Stylized Glowing Avatar Showcase */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            
            {/* Glowing background ring */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border-4 border-[#0ef] p-3 shadow-[0_0_30px_rgba(0,238,255,0.5)] flex items-center justify-center bg-gradient-to-b from-[#323946] to-[#1f242d]">
              
              {/* Profile Avatar / Photo */}
              <div className="w-full h-full rounded-full overflow-hidden bg-[#242b38] flex items-center justify-center relative border-2 border-slate-700">
                {profile.profilePhoto ? (
                  <img
                    src={profile.profilePhoto}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-4">
                    <User className="w-24 h-24 text-[#0ef]/80 stroke-[1.5]" />
                    <span className="text-xs font-mono text-slate-400 mt-2">React Engineer</span>
                  </div>
                )}
              </div>

              {/* Floating Tech Badges */}
              <motion.div 
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-3 -right-3 px-3 py-1.5 rounded-xl bg-[#323946] border border-[#0ef]/60 shadow-[0_0_12px_rgba(0,238,255,0.3)] text-xs font-mono font-bold text-[#0ef] flex items-center gap-1.5"
              >
                <Code className="w-3.5 h-3.5" />
                <span>React.js</span>
              </motion.div>

              <motion.div 
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-2 -left-3 px-3 py-1.5 rounded-xl bg-[#323946] border border-[#0ef]/60 shadow-[0_0_12px_rgba(0,238,255,0.3)] text-xs font-mono font-bold text-white flex items-center gap-1.5"
              >
                <Terminal className="w-3.5 h-3.5 text-[#0ef]" />
                <span>TypeScript</span>
              </motion.div>

              <motion.div 
                animate={{ x: [-4, 4, -4] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1/2 -left-6 px-2.5 py-1 rounded-lg bg-[#323946] border border-slate-700 text-[11px] font-mono text-emerald-400 flex items-center gap-1"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Open for Work</span>
              </motion.div>

            </div>

          </div>

        </section>

        {/* ========================================================================= */}
        {/* 3. ABOUT SECTION                                                          */}
        {/* ========================================================================= */}
        <section id="about" className="space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-[#0ef] uppercase tracking-widest font-bold">
              Introduction
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              About <span className="text-[#0ef]">Me</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Quick Stats Card */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-[#323946] border border-slate-700/80 text-center space-y-2 hover:border-[#0ef]/50 transition-all hover:shadow-[0_0_20px_rgba(0,238,255,0.1)]">
                <div className="text-3xl font-extrabold text-[#0ef]">5+</div>
                <div className="text-xs font-semibold text-slate-300">Years Experience</div>
              </div>
              <div className="p-6 rounded-2xl bg-[#323946] border border-slate-700/80 text-center space-y-2 hover:border-[#0ef]/50 transition-all hover:shadow-[0_0_20px_rgba(0,238,255,0.1)]">
                <div className="text-3xl font-extrabold text-[#0ef]">30+</div>
                <div className="text-xs font-semibold text-slate-300">Projects Built</div>
              </div>
              <div className="p-6 rounded-2xl bg-[#323946] border border-slate-700/80 text-center space-y-2 hover:border-[#0ef]/50 transition-all hover:shadow-[0_0_20px_rgba(0,238,255,0.1)]">
                <div className="text-3xl font-extrabold text-[#0ef]">100%</div>
                <div className="text-xs font-semibold text-slate-300">Client Satisfaction</div>
              </div>
              <div className="p-6 rounded-2xl bg-[#323946] border border-slate-700/80 text-center space-y-2 hover:border-[#0ef]/50 transition-all hover:shadow-[0_0_20px_rgba(0,238,255,0.1)]">
                <div className="text-3xl font-extrabold text-[#0ef]">24/7</div>
                <div className="text-xs font-semibold text-slate-300">Support &amp; Delivery</div>
              </div>
            </div>

            {/* Right Column: Detailed Narrative */}
            <div className="lg:col-span-7 space-y-5 rounded-2xl bg-[#282f3c] p-6 sm:p-8 border border-slate-700/70">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#0ef]" />
                <span>Frontend Engineer &amp; React Specialist</span>
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {about.aboutText}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <span className="text-[#0ef] font-bold">●</span>
                  <span>Location: {profile.location}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <span className="text-[#0ef] font-bold">●</span>
                  <span>Status: Open for Opportunities</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <span className="text-[#0ef] font-bold">●</span>
                  <span>Email: {profile.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <span className="text-[#0ef] font-bold">●</span>
                  <span>Specialty: React, TypeScript &amp; Next.js</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <a
                  href="#contact"
                  className="px-6 py-2.5 rounded-full bg-[#0ef] hover:bg-[#0ef]/90 text-[#1f242d] font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_12px_rgba(0,238,255,0.3)]"
                >
                  Read More
                </a>
              </div>

            </div>

          </div>

        </section>

        {/* ========================================================================= */}
        {/* 4. TECHNICAL SKILLS SECTION                                               */}
        {/* ========================================================================= */}
        <section id="skills" className="space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-[#0ef] uppercase tracking-widest font-bold">
              Technical Stack
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              My <span className="text-[#0ef]">Skills</span>
            </h2>
          </div>

          {/* Skill Cards Grid with Proficiency Progress Bars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {skills.map((skill) => (
              <div 
                key={skill.id}
                className="p-5 rounded-2xl bg-[#323946] border border-slate-700/80 hover:border-[#0ef]/60 transition-all duration-300 space-y-3 group hover:shadow-[0_0_15px_rgba(0,238,255,0.15)]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#1f242d] border border-slate-700 flex items-center justify-center text-[#0ef] group-hover:scale-110 transition-transform">
                      <Code className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-sm text-white group-hover:text-[#0ef] transition-colors">
                      {skill.name}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#0ef] font-semibold">
                    {skill.proficiency}%
                  </span>
                </div>

                <div className="w-full h-2.5 bg-[#1f242d] rounded-full overflow-hidden p-0.5 border border-slate-700">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-[#0ef] to-blue-500 rounded-full shadow-[0_0_8px_rgba(0,238,255,0.5)]"
                  />
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                  <span>{skill.category || 'Development'}</span>
                  <span>Verified Competency</span>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* ========================================================================= */}
        {/* 5. PROJECTS SECTION                                                       */}
        {/* ========================================================================= */}
        <section id="projects" className="space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#0ef] uppercase tracking-widest font-bold">
                Portfolio Showcase
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Latest <span className="text-[#0ef]">Projects</span>
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 bg-[#323946] p-1 rounded-full border border-slate-700 self-start sm:self-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activeFilter === cat 
                      ? 'bg-[#0ef] text-[#1f242d] shadow-[0_0_10px_rgba(0,238,255,0.4)]' 
                      : 'text-slate-300 hover:text-white'
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
              <div 
                key={project.id || idx}
                className="rounded-2xl bg-[#323946] border border-slate-700/80 overflow-hidden hover:border-[#0ef]/60 transition-all duration-300 flex flex-col justify-between group hover:shadow-[0_0_25px_rgba(0,238,255,0.2)]"
              >
                
                {/* Project Image Banner */}
                <div className="h-52 w-full overflow-hidden relative bg-[#242b38]">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#242b38] to-[#1f242d] p-6 text-center">
                      <Laptop className="w-12 h-12 text-[#0ef]/70 mb-2" />
                      <span className="text-xs font-mono text-slate-400">{project.name}</span>
                    </div>
                  )}
                  
                  {/* Subtle top banner overlay with year */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-[#1f242d]/80 backdrop-blur-sm border border-slate-700 text-[11px] font-mono text-[#0ef]">
                    {project.year || '2024'}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#0ef] transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack badges */}
                  <div className="pt-2 space-y-4">
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech, tIdx) => (
                          <span 
                            key={tIdx}
                            className="px-2.5 py-1 rounded-md bg-[#1f242d] border border-slate-700 text-[#0ef] text-xs font-mono font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action Links */}
                    <div className="flex items-center gap-3 pt-3 border-t border-slate-700">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 rounded-full bg-[#0ef] text-[#1f242d] hover:bg-[#0ef]/90 text-xs font-bold transition-all shadow-[0_0_10px_rgba(0,238,255,0.3)] flex items-center gap-1.5"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Demo</span>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 rounded-full bg-[#1f242d] hover:bg-[#242b38] border border-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Code</span>
                        </a>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>

        </section>

        {/* ========================================================================= */}
        {/* 6. WORK EXPERIENCE & EDUCATION                                            */}
        {/* ========================================================================= */}
        <section id="experience" className="space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-[#0ef] uppercase tracking-widest font-bold">
              Career Path
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Work <span className="text-[#0ef]">Experience</span>
            </h2>
          </div>

          {/* Timeline Stack */}
          <div className="space-y-6 max-w-4xl mx-auto">
            {experiences.map((exp, idx) => (
              <div 
                key={exp.id || idx}
                className="relative pl-6 sm:pl-8 border-l-2 border-[#0ef]/40 space-y-3 group pb-6 last:pb-0"
              >
                {/* Glowing Node */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#1f242d] border-2 border-[#0ef] shadow-[0_0_10px_rgba(0,238,255,0.7)] group-hover:scale-125 transition-transform" />

                <div className="p-6 rounded-2xl bg-[#323946] border border-slate-700/80 group-hover:border-[#0ef]/50 transition-all space-y-3 shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/80 pb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#0ef] transition-colors">
                        {exp.role}
                      </h3>
                      <div className="text-sm font-semibold text-[#0ef] flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>{exp.company}</span>
                      </div>
                    </div>
                    <div className="text-xs font-mono text-slate-300 bg-[#1f242d] px-3 py-1 rounded-full border border-slate-700 self-start sm:self-auto font-medium">
                      {exp.duration}
                    </div>
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {exp.description}
                  </p>

                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="space-y-1.5 text-xs text-slate-300 pt-1">
                      {exp.achievements.map((ach, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0ef] shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {exp.technologies.map((t, tIdx) => (
                        <span key={tIdx} className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#1f242d] text-slate-300 border border-slate-700">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Education Mini Block */}
          {education && education.length > 0 && (
            <div className="max-w-4xl mx-auto pt-6">
              <div className="p-6 rounded-2xl bg-[#282f3c] border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0ef]/10 border border-[#0ef]/30 flex items-center justify-center text-[#0ef]">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">{education[0].institution}</h4>
                    <p className="text-xs text-slate-300">{education[0].degree}</p>
                    {education[0].grade && (
                      <p className="text-[11px] font-mono text-[#0ef]">{education[0].grade}</p>
                    )}
                  </div>
                </div>
                <div className="text-xs font-mono text-slate-400 bg-[#1f242d] px-3.5 py-1.5 rounded-full border border-slate-700 self-start sm:self-auto">
                  {education[0].duration}
                </div>
              </div>
            </div>
          )}

        </section>

        {/* ========================================================================= */}
        {/* 7. CONTACT SECTION                                                        */}
        {/* ========================================================================= */}
        <section id="contact" className="space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-[#0ef] uppercase tracking-widest font-bold">
              Let's Connect
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Contact <span className="text-[#0ef]">Me!</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Info Panel */}
            <div className="lg:col-span-5 space-y-6 rounded-2xl bg-[#323946] p-6 sm:p-8 border border-slate-700/80">
              <h3 className="text-xl font-bold text-white">Have a Project in Mind?</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                I'm always excited to discuss new web projects, creative ideas, or opportunities to be part of your vision.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#1f242d] border border-slate-700 flex items-center justify-center text-[#0ef]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Email Me</div>
                    <div className="text-sm font-semibold text-white font-mono">{profile.email}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#1f242d] border border-slate-700 flex items-center justify-center text-[#0ef]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Location</div>
                    <div className="text-sm font-semibold text-white">{profile.location}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#1f242d] border border-slate-700 flex items-center justify-center text-[#0ef]">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Availability</div>
                    <div className="text-sm font-semibold text-emerald-400">Full-Time &amp; Freelance</div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-700 flex items-center gap-3">
                <button
                  onClick={handleCopyEmail}
                  className="w-full py-2.5 rounded-xl bg-[#1f242d] hover:bg-[#242b38] border border-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#0ef]" />}
                  <span>{copiedEmail ? 'Email Copied!' : 'Copy Email Address'}</span>
                </button>
              </div>
            </div>

            {/* Right Interactive Form */}
            <div className="lg:col-span-7 rounded-2xl bg-[#323946] p-6 sm:p-8 border border-slate-700/80">
              <form onSubmit={handleFormSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#1f242d] border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#0ef] transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#1f242d] border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#0ef] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="Project Inquiry / Opportunity"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1f242d] border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#0ef] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Hi Yuji, I would like to discuss..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1f242d] border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#0ef] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#0ef] hover:bg-[#0ef]/90 text-[#1f242d] font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,238,255,0.4)] hover:shadow-[0_0_25px_rgba(0,238,255,0.6)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>

                {formSubmitted && (
                  <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs text-center font-medium">
                    Thank you! Your message has been sent successfully.
                  </div>
                )}

              </form>
            </div>

          </div>

        </section>

      </main>

      {/* ========================================================================= */}
      {/* 8. FOOTER                                                                 */}
      {/* ========================================================================= */}
      <footer className="border-t border-[#323946] bg-[#1a1e27] py-8 text-xs text-slate-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            Copyright &copy; {new Date().getFullYear()} by <span className="text-[#0ef] font-semibold">{profile.name}</span> | All Rights Reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-full bg-[#0ef] text-[#1f242d] flex items-center justify-center hover:scale-110 shadow-[0_0_10px_rgba(0,238,255,0.4)] transition-all cursor-pointer"
            aria-label="Back to top"
          >
            <ChevronUp className="w-5 h-5 font-bold" />
          </button>
        </div>
      </footer>

    </div>
  );
};
