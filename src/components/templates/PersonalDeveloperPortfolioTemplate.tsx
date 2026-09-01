import React, { useState, useMemo } from 'react';
import { PortfolioData, LayoutConfiguration } from '../../types';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  ExternalLink, 
  ArrowUpRight,
  Code2, 
  Layers, 
  Check, 
  Copy, 
  Sparkles, 
  Download, 
  Terminal, 
  Laptop, 
  Database, 
  Globe, 
  Briefcase, 
  GraduationCap,
  Calendar,
  MapPin,
  Send,
  ChevronRight,
  ChevronUp,
  FolderGit2,
  Cpu,
  Boxes,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PersonalDeveloperPortfolioTemplateProps {
  data: PortfolioData;
  config?: LayoutConfiguration;
}

export const PersonalDeveloperPortfolioTemplate: React.FC<PersonalDeveloperPortfolioTemplateProps> = ({ 
  data, 
  config 
}) => {
  const [activeProjectFilter, setActiveProjectFilter] = useState<string>('All');
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Safe fallback dynamic data bindings from BuildEasy PortfolioData
  const profile = data?.profile || {
    name: 'Eluda Dev',
    title: 'Full-Stack Developer & Software Craftsman',
    bio: 'I build accessible, responsive, and performance-focused web applications with modern architectures. Passionate about clean code, open-source tooling, and intuitive user experiences.',
    location: 'Seattle, WA · Available Worldwide',
    email: 'hello@eluda.dev',
    phone: '+1 (555) 019-2834',
    website: 'https://eluda.dev',
    profilePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=700&auto=format&fit=crop&q=80'
  };

  const about = data?.about || {
    aboutText: "I am a software engineer and technical creator driven by curiosity and craft. Over the years, I've designed and delivered full-stack applications, interactive UI components, developer tools, and scalable APIs.\n\nMy approach combines rigorous software engineering fundamentals with keen attention to visual polish and usability. I love taking complex technical requirements and transforming them into fast, elegant, and accessible software.",
    interests: ['Full-Stack Web', 'TypeScript & React', 'Distributed Systems', 'UI/UX Craft', 'Open Source', 'API Architecture'],
    services: [
      'Frontend Architecture & React/Next.js Systems',
      'Scalable Backend Engineering & REST/GraphQL APIs',
      'Interactive Design Systems & Micro-Interactions',
      'Performance Optimization & Web Accessibility'
    ]
  };

  const projects = useMemo(() => {
    if (data?.projects && data.projects.length > 0) {
      return data.projects;
    }
    return [
      {
        id: 'p-1',
        name: 'UI Buttons & Component Lab',
        description: 'A comprehensive collection of 100+ modern, animated, and accessible CSS & Tailwind button components used by thousands of developers worldwide.',
        technologies: ['React', 'Tailwind CSS', 'TypeScript', 'Framer Motion'],
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&auto=format&fit=crop&q=80',
        githubUrl: 'https://github.com/eludadev/ui-buttons',
        liveUrl: 'https://ui-buttons.dev',
        featured: true,
        year: '2024'
      },
      {
        id: 'p-2',
        name: 'Quant Analytics Dashboard',
        description: 'Real-time financial telemetry platform visualizing stock metrics, algorithmic trading models, and historical market volatility with sub-millisecond chart feeds.',
        technologies: ['Next.js', 'Python', 'FastAPI', 'Chart.js', 'PostgreSQL'],
        image: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?w=900&auto=format&fit=crop&q=80',
        githubUrl: 'https://github.com',
        liveUrl: 'https://quant-analytics.dev',
        featured: true,
        year: '2024'
      },
      {
        id: 'p-3',
        name: 'DevPulse Code Insights',
        description: 'Developer productivity tool tracking code changes, repository health, pull request reviews, and CI/CD pipelines in a unified workspace.',
        technologies: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'Tailwind CSS'],
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80',
        githubUrl: 'https://github.com',
        liveUrl: 'https://devpulse.io',
        featured: true,
        year: '2023'
      },
      {
        id: 'p-4',
        name: 'Synthetix AI Audio Studio',
        description: 'Browser-based generative sound synthesizer and waveform editor leveraging Web Audio API and real-time DSP filters.',
        technologies: ['Web Audio API', 'TypeScript', 'Tailwind CSS', 'Vite'],
        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=900&auto=format&fit=crop&q=80',
        githubUrl: 'https://github.com',
        liveUrl: 'https://synthetix-audio.dev',
        featured: false,
        year: '2023'
      }
    ];
  }, [data?.projects]);

  const experiences = useMemo(() => {
    if (data?.experience && data.experience.length > 0) {
      return data.experience;
    }
    return [
      {
        id: 'exp-1',
        company: 'Vortex Labs',
        role: 'Senior Full-Stack Engineer',
        duration: '2022 — Present',
        description: 'Leading front-end and core API engineering for cloud developer infrastructure and collaborative dashboards.',
        current: true,
        technologies: ['TypeScript', 'React', 'Next.js', 'Node.js', 'GraphQL', 'PostgreSQL'],
        achievements: [
          'Architected responsive, enterprise-grade web applications serving over 250k monthly active users',
          'Reduced web application bundle sizes by 38% and improved Core Web Vitals to 99+ score across all metrics',
          'Spearheaded internal design system and shared component libraries with strict accessibility standards',
          'Mentored 6 junior and mid-level engineers through code reviews, tech talks, and pairing sessions'
        ]
      },
      {
        id: 'exp-2',
        company: 'Pulse Digital',
        role: 'Frontend Software Engineer',
        duration: '2020 — 2022',
        description: 'Engineered high-performance client applications and interactive data visualization systems for fintech clients.',
        current: false,
        technologies: ['React', 'Redux', 'TypeScript', 'Tailwind CSS', 'REST APIs'],
        achievements: [
          'Developed modular React UI components with complete unit and integration test coverage',
          'Collaborated closely with product designers to implement smooth micro-interactions and animations',
          'Optimized real-time WebSocket data rendering pipelines for live telemetry dashboards'
        ]
      },
      {
        id: 'exp-3',
        company: 'Nova Interactive',
        role: 'Web Developer',
        duration: '2018 — 2020',
        description: 'Built custom responsive web platforms, client portals, and e-commerce integrations with modern web tech.',
        current: false,
        technologies: ['JavaScript', 'HTML5', 'CSS3', 'Vue.js', 'Node.js'],
        achievements: [
          'Delivered 20+ production web projects on time and within specifications',
          'Implemented automated CI/CD deployment pipelines on modern cloud hosting'
        ]
      }
    ];
  }, [data?.experience]);

  const educationList = useMemo(() => {
    if (data?.education && data.education.length > 0) {
      return data.education;
    }
    return [
      {
        id: 'edu-1',
        institution: 'University of Washington',
        degree: 'Bachelor of Science in Computer Science',
        duration: '2015 — 2019',
        grade: 'Dean’s Honor List'
      }
    ];
  }, [data?.education]);

  const skillsCategorized = useMemo(() => {
    if (data?.skills && data.skills.length > 0) {
      const cats: Record<string, string[]> = {};
      data.skills.forEach(s => {
        const cat = s.category || 'General';
        if (!cats[cat]) cats[cat] = [];
        cats[cat].push(s.name);
      });
      return Object.entries(cats).map(([name, skills]) => ({ name, skills }));
    }
    return [
      {
        name: 'Languages',
        skills: ['TypeScript', 'JavaScript (ES6+)', 'Python', 'SQL', 'HTML5', 'CSS3/SCSS']
      },
      {
        name: 'Frontend & Frameworks',
        skills: ['React', 'Next.js', 'Vue.js', 'Tailwind CSS', 'Framer Motion', 'Redux Toolkit']
      },
      {
        name: 'Backend & APIs',
        skills: ['Node.js', 'Express', 'FastAPI', 'REST APIs', 'GraphQL', 'WebSockets']
      },
      {
        name: 'Databases & Cloud',
        skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Firebase', 'Docker', 'AWS / Vercel']
      },
      {
        name: 'Tools & Architecture',
        skills: ['Git & GitHub', 'Vite / Webpack', 'Jest / Cypress', 'CI/CD Pipelines', 'Figma', 'Linux / Bash']
      }
    ];
  }, [data?.skills]);

  // Project categories for filter buttons
  const projectCategories = useMemo(() => {
    const cats = ['All'];
    projects.forEach(p => {
      if (p.technologies && p.technologies.length > 0) {
        const mainTech = p.technologies[0];
        if (mainTech && !cats.includes(mainTech) && cats.length < 5) {
          cats.push(mainTech);
        }
      }
    });
    return cats;
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeProjectFilter === 'All') return projects;
    return projects.filter(p => 
      p.technologies && p.technologies.some(t => t.toLowerCase() === activeProjectFilter.toLowerCase())
    );
  }, [projects, activeProjectFilter]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Work', href: '#work' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <div className="min-h-screen bg-[#0b0f17] text-[#94a3b8] font-sans selection:bg-[#38bdf8]/20 selection:text-[#38bdf8] relative overflow-x-hidden">
      
      {/* Background Subtle Grid & Radial Glow */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:32px_32px] -z-10" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#38bdf8]/10 via-[#6366f1]/5 to-transparent blur-[120px] pointer-events-none -z-10" />

      {/* ========================================================================= */}
      {/* 1. TOP NAVBAR                                                             */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 px-6 sm:px-10 py-4 bg-[#0b0f17]/90 backdrop-blur-md border-b border-[#1e293b]/70 transition-all duration-300">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Logo / Personal Brand Monogram */}
          <a 
            href="#hero" 
            className="flex items-center gap-3 group"
            aria-label="Home"
          >
            <div className="w-9 h-9 rounded-lg bg-[#161f30] border border-[#334155] flex items-center justify-center text-[#38bdf8] font-mono font-bold text-sm shadow-sm group-hover:border-[#38bdf8]/50 group-hover:text-white transition-colors">
              {(profile.name || 'E').trim().charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-[#f1f5f9] group-hover:text-[#38bdf8] transition-colors leading-tight">
                {profile.name}
              </span>
              <span className="text-[11px] text-[#64748b] font-mono leading-none">
                portfolio
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[#94a3b8] hover:text-[#38bdf8] transition-colors py-1"
              >
                {link.name}
              </a>
            ))}

            {/* Availability Badge */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#161f30]/80 border border-[#334155]/60 text-[11px] text-[#38bdf8]">
              <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
              <span>Available for work</span>
            </div>

            {/* Resume / Contact CTA */}
            <a
              href="#contact"
              className="px-4 py-2 rounded-lg bg-[#38bdf8] text-[#0b0f17] hover:bg-[#7dd3fc] font-semibold text-xs transition-colors shadow-sm shadow-[#38bdf8]/20"
            >
              Get In Touch
            </a>
          </nav>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#94a3b8] hover:text-white focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pt-4 pb-6 border-t border-[#1e293b] mt-3"
            >
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-lg text-sm text-[#cbd5e1] hover:bg-[#161f30] hover:text-[#38bdf8] transition-colors"
                  >
                    {link.name}
                  </a>
                ))}

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-[#38bdf8]">
                    <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
                    <span>Available for work</span>
                  </div>
                  <a
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2 rounded-lg bg-[#38bdf8] text-[#0b0f17] font-semibold text-xs text-center"
                  >
                    Get In Touch
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 sm:px-10 py-12 sm:py-20 space-y-24 sm:space-y-32">

        {/* ========================================================================= */}
        {/* 2. HERO SECTION                                                           */}
        {/* ========================================================================= */}
        <section id="hero" className="min-h-[70vh] flex flex-col justify-center pt-6 sm:pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-8 space-y-6"
            >
              {/* Status Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161f30] border border-[#334155] text-xs font-mono text-[#38bdf8]">
                <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>Full-Stack Developer &amp; Software Craftsman</span>
              </div>

              {/* Headline Title */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#f8fafc] tracking-tight leading-[1.1]">
                  Hi, I'm <span className="text-[#38bdf8]">{profile.name}</span>.
                </h1>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#94a3b8] tracking-tight">
                  {profile.title}
                </h2>
              </div>

              {/* Bio Description */}
              <p className="text-[#94a3b8] text-base sm:text-lg max-w-2xl leading-relaxed">
                {profile.bio}
              </p>

              {/* Action Buttons & Links */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="#work"
                  className="px-6 py-3 rounded-lg bg-[#38bdf8] text-[#0b0f17] hover:bg-[#7dd3fc] font-semibold text-sm transition-all shadow-md shadow-[#38bdf8]/20 flex items-center gap-2"
                >
                  <span>Explore Selected Work</span>
                  <ChevronRight className="w-4 h-4" />
                </a>

                <a
                  href="#contact"
                  className="px-6 py-3 rounded-lg bg-[#161f30] hover:bg-[#1e293b] border border-[#334155] text-[#f1f5f9] hover:text-[#38bdf8] font-medium text-sm transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact Me</span>
                </a>

                {/* Social Icon Dock */}
                <div className="flex items-center gap-2 pl-2 text-[#94a3b8]">
                  {data?.socialLinks?.github && (
                    <a
                      href={data.socialLinks.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub Profile"
                      className="p-2.5 rounded-lg bg-[#161f30] hover:bg-[#1e293b] border border-[#334155] text-[#cbd5e1] hover:text-[#38bdf8] transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {data?.socialLinks?.linkedin && (
                    <a
                      href={data.socialLinks.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn Profile"
                      className="p-2.5 rounded-lg bg-[#161f30] hover:bg-[#1e293b] border border-[#334155] text-[#cbd5e1] hover:text-[#38bdf8] transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {data?.socialLinks?.twitter && (
                    <a
                      href={data.socialLinks.twitter}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Twitter Profile"
                      className="p-2.5 rounded-lg bg-[#161f30] hover:bg-[#1e293b] border border-[#334155] text-[#cbd5e1] hover:text-[#38bdf8] transition-colors"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {!data?.socialLinks?.github && !data?.socialLinks?.linkedin && (
                    <>
                      <a
                        href="https://github.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub"
                        className="p-2.5 rounded-lg bg-[#161f30] hover:bg-[#1e293b] border border-[#334155] text-[#cbd5e1] hover:text-[#38bdf8] transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn"
                        className="p-2.5 rounded-lg bg-[#161f30] hover:bg-[#1e293b] border border-[#334155] text-[#cbd5e1] hover:text-[#38bdf8] transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </>
                  )}
                </div>
              </div>

              {/* Location Badge */}
              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#64748b]">
                <MapPin className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>{profile.location}</span>
              </div>
            </motion.div>

            {/* Right Profile Photo / Visual Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-4 flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-[320px]">
                {/* Backdrop Soft Glow */}
                <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-tr from-[#38bdf8]/20 to-[#6366f1]/20 blur-lg opacity-75" />
                
                <div className="relative rounded-2xl bg-[#161f30] border border-[#334155] p-5 shadow-2xl space-y-4">
                  {/* Photo Container (kept fully vibrant & colorful) */}
                  <div className="w-full h-64 rounded-xl overflow-hidden bg-[#0b0f17] border border-[#1e293b]">
                    {profile.profilePhoto ? (
                      <img
                        src={profile.profilePhoto}
                        alt={profile.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-[#38bdf8] p-6 text-center">
                        <Code2 className="w-12 h-12 mb-2 opacity-50" />
                        <span className="font-mono text-sm font-semibold">{profile.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Micro Quick Stats */}
                  <div className="grid grid-cols-2 gap-2 pt-1 text-center font-mono text-xs">
                    <div className="p-2.5 rounded-lg bg-[#0b0f17]/60 border border-[#1e293b]">
                      <span className="block text-[#f1f5f9] font-bold text-sm">5+ Yrs</span>
                      <span className="text-[10px] text-[#64748b]">Experience</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#0b0f17]/60 border border-[#1e293b]">
                      <span className="block text-[#38bdf8] font-bold text-sm">30+ Proj</span>
                      <span className="text-[10px] text-[#64748b]">Delivered</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. ABOUT SECTION                                                          */}
        {/* ========================================================================= */}
        <section id="about" className="scroll-mt-24 space-y-10">
          
          {/* Section Header */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#161f30] border border-[#334155] flex items-center justify-center text-[#38bdf8]">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#f1f5f9]">
                About Me
              </h2>
              <p className="text-xs text-[#64748b] font-mono">
                Background &amp; technical philosophy
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Narrative Text */}
            <div className="lg:col-span-7 space-y-4 text-base leading-relaxed text-[#94a3b8]">
              {about.aboutText.split('\n\n').map((para, pIdx) => (
                <p key={pIdx}>
                  {para}
                </p>
              ))}

              <div className="pt-4 space-y-2">
                <h3 className="text-sm font-semibold text-[#f1f5f9] uppercase tracking-wider font-mono">
                  Current Areas of Focus
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {about.interests.map((interest, iIdx) => (
                    <div 
                      key={iIdx}
                      className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#161f30]/60 border border-[#1e293b] text-xs text-[#cbd5e1]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
                      <span>{interest}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Pillars / What I Bring Card */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#161f30] border border-[#334155] space-y-5">
              <h3 className="text-base font-semibold text-[#f1f5f9] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#38bdf8]" />
                <span>What I Deliver</span>
              </h3>

              <div className="space-y-3.5 text-xs text-[#94a3b8]">
                {about.services && about.services.length > 0 ? (
                  about.services.map((service, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{service}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                      <span>End-to-end web application architecture from database schemas to polished frontend UIs</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                      <span>Strict adherence to web accessibility (WCAG), performance benchmarking, and clean SEO</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                      <span>Maintainable, type-safe codebases with automated testing and continuous deployment</span>
                    </div>
                  </>
                )}
              </div>

              <div className="pt-2 border-t border-[#1e293b]">
                <a
                  href={`mailto:${profile.email}`}
                  className="w-full py-2.5 rounded-lg bg-[#0b0f17] hover:bg-[#1e293b] border border-[#334155] text-xs font-semibold text-[#38bdf8] flex items-center justify-center gap-2 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reach Out Directly</span>
                </a>
              </div>
            </div>

          </div>

        </section>

        {/* ========================================================================= */}
        {/* 4. EXPERIENCE SECTION                                                     */}
        {/* ========================================================================= */}
        <section id="experience" className="scroll-mt-24 space-y-10">
          
          {/* Section Header */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#161f30] border border-[#334155] flex items-center justify-center text-[#38bdf8]">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#f1f5f9]">
                Work Experience
              </h2>
              <p className="text-xs text-[#64748b] font-mono">
                Career history &amp; impact
              </p>
            </div>
          </div>

          {/* Experience List Cards */}
          <div className="space-y-6">
            {experiences.map((exp, idx) => (
              <div
                key={exp.id || idx}
                className="p-6 sm:p-7 rounded-2xl bg-[#161f30] border border-[#334155] hover:border-[#38bdf8]/40 transition-colors shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1e293b] pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#f1f5f9]">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold text-[#38bdf8]">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0b0f17] border border-[#1e293b] text-xs font-mono text-[#94a3b8] w-fit">
                    <Calendar className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>{exp.duration}</span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed">
                  {exp.description}
                </p>

                {/* Achievements List */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="space-y-2 pt-1 text-xs sm:text-sm text-[#cbd5e1]">
                    {exp.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2.5">
                        <span className="text-[#38bdf8] text-xs mt-0.5">▸</span>
                        <span className="leading-relaxed">{ach}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Technologies used in this role */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-2">
                    {exp.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md bg-[#0b0f17] text-[#38bdf8] border border-[#1e293b] font-mono text-[11px]"
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
        {/* 5. PROJECTS / WORK SECTION                                                */}
        {/* ========================================================================= */}
        <section id="work" className="scroll-mt-24 space-y-10">
          
          {/* Section Header with Category Filters */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#161f30] border border-[#334155] flex items-center justify-center text-[#38bdf8]">
                <FolderGit2 className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#f1f5f9]">
                  Selected Work
                </h2>
                <p className="text-xs text-[#64748b] font-mono">
                  Production applications &amp; open-source tools
                </p>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {projectCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveProjectFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    activeProjectFilter === cat
                      ? 'bg-[#38bdf8] text-[#0b0f17] font-semibold'
                      : 'bg-[#161f30] text-[#94a3b8] hover:text-white border border-[#334155]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Project Grid (Always in Vibrant Full Color) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id || idx}
                className="group rounded-2xl bg-[#161f30] border border-[#334155] hover:border-[#38bdf8]/50 overflow-hidden shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                
                {/* Project Image Banner */}
                <div className="relative w-full h-56 sm:h-64 bg-[#0b0f17] overflow-hidden border-b border-[#1e293b]">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-[#38bdf8] p-6">
                      <FolderGit2 className="w-12 h-12 mb-2 opacity-50" />
                      <span className="font-mono text-xs">{project.name}</span>
                    </div>
                  )}

                  {/* Year or Featured Badge */}
                  {project.year && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded bg-[#0b0f17]/90 backdrop-blur-md border border-[#334155] text-[11px] font-mono text-[#cbd5e1]">
                      {project.year}
                    </span>
                  )}
                </div>

                {/* Project Details Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-[#f1f5f9] group-hover:text-[#38bdf8] transition-colors">
                        <a href={project.liveUrl || project.githubUrl || '#'} target="_blank" rel="noreferrer">
                          {project.name}
                        </a>
                      </h3>

                      {/* Action Icon Links */}
                      <div className="flex items-center gap-2 text-[#94a3b8]">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub Repository"
                            className="p-1.5 rounded-md hover:text-[#38bdf8] hover:bg-[#0b0f17] transition-colors"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Live Demo"
                            className="p-1.5 rounded-md hover:text-[#38bdf8] hover:bg-[#0b0f17] transition-colors"
                          >
                            <ArrowUpRight className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-[#94a3b8] leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack Pills */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="pt-3 flex flex-wrap gap-1.5 border-t border-[#1e293b]">
                      {project.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded bg-[#0b0f17] text-[#94a3b8] border border-[#1e293b] font-mono text-[11px]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>

        </section>

        {/* ========================================================================= */}
        {/* 6. SKILLS & TECHNOLOGIES SECTION                                          */}
        {/* ========================================================================= */}
        <section id="skills" className="scroll-mt-24 space-y-10">
          
          {/* Section Header */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#161f30] border border-[#334155] flex items-center justify-center text-[#38bdf8]">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#f1f5f9]">
                Skills &amp; Technologies
              </h2>
              <p className="text-xs text-[#64748b] font-mono">
                Technical toolkit &amp; proficiencies
              </p>
            </div>
          </div>

          {/* Categorized Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillsCategorized.map((category, idx) => (
              <div
                key={category.name || idx}
                className="p-6 rounded-2xl bg-[#161f30] border border-[#334155] space-y-4 shadow-sm"
              >
                <h3 className="text-base font-bold text-[#f1f5f9] flex items-center gap-2 border-b border-[#1e293b] pb-3">
                  <Boxes className="w-4 h-4 text-[#38bdf8]" />
                  <span>{category.name}</span>
                </h3>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1.5 rounded-lg bg-[#0b0f17] text-xs font-mono text-[#cbd5e1] border border-[#1e293b] hover:border-[#38bdf8]/50 hover:text-[#38bdf8] transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* ========================================================================= */}
        {/* 7. EDUCATION SECTION                                                      */}
        {/* ========================================================================= */}
        <section id="education" className="scroll-mt-24 space-y-10">
          
          {/* Section Header */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#161f30] border border-[#334155] flex items-center justify-center text-[#38bdf8]">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#f1f5f9]">
                Education &amp; Background
              </h2>
              <p className="text-xs text-[#64748b] font-mono">
                Academic foundation &amp; credentials
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {educationList.map((edu, idx) => (
              <div
                key={edu.id || idx}
                className="p-6 rounded-2xl bg-[#161f30] border border-[#334155] space-y-3 shadow-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded bg-[#0b0f17] text-[#38bdf8] border border-[#1e293b] font-mono text-xs">
                    {edu.duration}
                  </span>
                  {edu.grade && (
                    <span className="text-xs font-mono text-[#64748b]">
                      {edu.grade}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#f1f5f9]">
                    {edu.degree}
                  </h3>
                  <p className="text-sm font-medium text-[#38bdf8] mt-0.5">
                    {edu.institution}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* ========================================================================= */}
        {/* 8. CONTACT SECTION                                                        */}
        {/* ========================================================================= */}
        <section id="contact" className="scroll-mt-24 py-8">
          <div className="rounded-3xl bg-[#161f30] border border-[#334155] p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-6 relative overflow-hidden shadow-2xl">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0b0f17] border border-[#334155] text-xs font-mono text-[#38bdf8]">
              <Mail className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>Get In Touch</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#f1f5f9] tracking-tight">
              Let's Build Something Together
            </h2>

            <p className="text-[#94a3b8] text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              I'm always open to discussing product engineering, freelance opportunities, or full-time roles. Drop me a message and I'll get back to you soon!
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`mailto:${profile.email}`}
                className="px-7 py-3.5 rounded-lg bg-[#38bdf8] text-[#0b0f17] hover:bg-[#7dd3fc] font-semibold text-sm transition-all shadow-md shadow-[#38bdf8]/20 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send An Email</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="px-5 py-3.5 rounded-lg bg-[#0b0f17] hover:bg-[#1e293b] border border-[#334155] text-[#cbd5e1] hover:text-[#38bdf8] font-mono text-xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{profile.email}</span>
                  </>
                )}
              </button>
            </div>

            {/* Social Channels in Contact Card */}
            <div className="pt-6 border-t border-[#1e293b] flex items-center justify-center gap-4 text-[#94a3b8]">
              {data?.socialLinks?.github && (
                <a href={data.socialLinks.github} target="_blank" rel="noreferrer" className="hover:text-[#38bdf8]">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {data?.socialLinks?.linkedin && (
                <a href={data.socialLinks.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#38bdf8]">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {data?.socialLinks?.twitter && (
                <a href={data.socialLinks.twitter} target="_blank" rel="noreferrer" className="hover:text-[#38bdf8]">
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {!data?.socialLinks?.github && !data?.socialLinks?.linkedin && (
                <>
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[#38bdf8]">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#38bdf8]">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </>
              )}
            </div>

          </div>
        </section>

      </main>

      {/* ========================================================================= */}
      {/* 9. UNDERSTATED FOOTER                                                     */}
      {/* ========================================================================= */}
      <footer className="py-10 px-6 border-t border-[#1e293b] bg-[#0b0f17]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748b]">
          
          <div className="flex items-center gap-2">
            <span>Designed &amp; Built with precision by</span>
            <span className="text-[#cbd5e1] font-medium">{profile.name}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#94a3b8] hover:text-[#38bdf8] transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </footer>

    </div>
  );
};
