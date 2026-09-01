import React, { useState, useEffect, useMemo, useRef } from 'react';
import { PortfolioData, LayoutConfiguration, SkillItem } from '../../types';
import { 
  Terminal, 
  Code, 
  Sparkles, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  FileText, 
  MapPin, 
  ArrowUpRight, 
  GitFork, 
  Star, 
  Award, 
  Briefcase, 
  GraduationCap, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  Clock, 
  Boxes, 
  ChevronRight, 
  Flame,
  Send,
  FolderGit2,
  GitBranch,
  Eye,
  Copy,
  Check,
  Globe,
  Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InteractiveDeveloperPortfolioTemplateProps {
  data: PortfolioData;
  config?: LayoutConfiguration;
}

export const InteractiveDeveloperPortfolioTemplate: React.FC<InteractiveDeveloperPortfolioTemplateProps> = ({ 
  data, 
  config 
}) => {
  const [activeSection, setActiveSection] = useState<'home' | 'about' | 'experience' | 'projects' | 'opensource' | 'skills' | 'education' | 'contact'>('home');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [osFilter, setOsFilter] = useState<string>('ALL');
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHoveredInteractive, setIsHoveredInteractive] = useState(false);

  // Safe normalized portfolio data
  const profile = data?.profile || {
    name: 'Sudhanva Nadiger',
    title: 'Full-Stack & Systems Developer',
    bio: 'Software engineer building performant distributed systems, reactive frontends, and developer tooling. Exploring interaction design, ML engineering, and open source ecosystems.',
    location: 'Bangalore, India (UTC+5:30)',
    email: 'sudhanva.nadiger@gmail.com',
    phone: '+91 98765 43210',
    website: 'https://sudhanva.dev',
    profilePhoto: ''
  };

  const about = data?.about || {
    aboutText: 'Passionate about engineering clean architectures that balance speed, reliability, and human ergonomics. Specialized in full-stack cloud ecosystems, interactive graphics, and open-source infrastructure.',
    interests: ['Distributed Systems', 'Interactive Graphics', 'Compiler Architecture', 'AI & RAG Workflows', 'Performance Optimization'],
    services: ['Full-Stack Development', 'System Architecture', 'API Development', 'Open Source Tooling']
  };

  const experiences = useMemo(() => {
    if (data?.experience && data.experience.length > 0) {
      return data.experience;
    }
    return [
      {
        id: 'exp-1',
        company: 'HyperFlow Cloud',
        role: 'Software Development Engineer',
        duration: '2023 — Present',
        description: 'Engineered high-throughput cloud streaming APIs and microservices handling 1.8M real-time queries per hour with sub-10ms response thresholds.',
        current: true,
        technologies: ['TypeScript', 'Go', 'Kubernetes', 'Redis', 'PostgreSQL', 'Docker'],
        achievements: [
          'Reduced API latency bottlenecks by 38% through pipelined Redis caching and connection pooling',
          'Architected real-time WebSocket telemetry engine for active microservice fleet tracking',
          'Spearheaded transition to Kubernetes-native CI/CD automation pipelines'
        ]
      },
      {
        id: 'exp-2',
        company: 'Vortex Interactive Labs',
        role: 'Full-Stack Developer Intern',
        duration: '2022 — 2023',
        description: 'Built interactive web applications, real-time audio/visual canvases, and reusable modular UI system components.',
        current: false,
        technologies: ['React', 'Next.js', 'Tailwind CSS', 'Node.js', 'WebGL', 'Three.js'],
        achievements: [
          'Developed 60FPS fluid WebGL canvas visualizations with zero memory leaks',
          'Authored accessible UI design component library used across 8 internal web apps'
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
        name: 'Aura Distributed Cache Engine',
        description: 'High-speed in-memory key-value cache engine with custom memory allocator, LRU eviction policies, and concurrent lock-free data structures.',
        technologies: ['Go', 'Raft Consensus', 'gRPC', 'Docker', 'Benchmarking'],
        image: '',
        githubUrl: 'https://github.com',
        liveUrl: 'https://demo.dev',
        featured: true,
        year: '2025',
        status: 'PRODUCTION'
      },
      {
        id: 'proj-2',
        name: 'Chronos Real-Time Canvas',
        description: 'Collaborative real-time canvas and whiteboard interface with conflict-free replicated data types (CRDT) and sub-15ms multi-cursor sync.',
        technologies: ['React', 'TypeScript', 'WebSockets', 'WebRTC', 'Tailwind'],
        image: '',
        githubUrl: 'https://github.com',
        liveUrl: 'https://demo.dev',
        featured: true,
        year: '2024',
        status: 'LIVE'
      },
      {
        id: 'proj-3',
        name: 'VectorPulse RAG Assistant',
        description: 'Intelligent semantic search and code retrieval engine indexing AST graph embeddings for large-scale enterprise repositories.',
        technologies: ['Python', 'FastAPI', 'Qdrant Vector DB', 'LangChain', 'React'],
        image: '',
        githubUrl: 'https://github.com',
        liveUrl: 'https://demo.dev',
        featured: false,
        year: '2024',
        status: 'ACTIVE'
      },
      {
        id: 'proj-4',
        name: 'Synapse WebGL Audio Synthesizer',
        description: 'Modular browser synthesizer featuring interactive polyphonic oscillators, visual spectral oscilloscope, and MIDI hardware interface.',
        technologies: ['Web Audio API', 'WebGL', 'TypeScript', 'Tailwind CSS'],
        image: '',
        githubUrl: 'https://github.com',
        liveUrl: 'https://demo.dev',
        featured: false,
        year: '2023',
        status: 'EXPERIMENT'
      }
    ];
  }, [data?.projects]);

  const openSourceContributions = useMemo(() => {
    return [
      {
        id: 'os-1',
        name: 'kubernetes/kubernetes',
        org: 'Cloud Native Computing Foundation',
        role: 'Contributor',
        description: 'Enhanced kubelet container probe reliability under network partition edge cases and updated runtime documentation.',
        technologies: ['Go', 'Kubernetes', 'gRPC'],
        status: 'MERGED',
        stars: '109k+',
        githubUrl: 'https://github.com/kubernetes/kubernetes'
      },
      {
        id: 'os-2',
        name: 'facebook/react',
        org: 'Meta Open Source',
        role: 'Contributor',
        description: 'Fixed server-side rendering hydration warning mismatches in concurrent mode boundary transitions.',
        technologies: ['TypeScript', 'JavaScript', 'React'],
        status: 'MERGED',
        stars: '230k+',
        githubUrl: 'https://github.com/facebook/react'
      },
      {
        id: 'os-3',
        name: 'sudhanva/nexus-cli',
        org: 'Personal Project',
        role: 'Author & Maintainer',
        description: 'Lightweight developer toolchain for multi-tenant microservice scaffolding and automated environment configuration.',
        technologies: ['Rust', 'Clap', 'Tokio'],
        status: 'ACTIVE',
        stars: '840+',
        githubUrl: 'https://github.com'
      },
      {
        id: 'os-4',
        name: 'vercel/next.js',
        org: 'Vercel',
        role: 'Contributor',
        description: 'Contributed performance improvements to edge route streaming handler resolution buffers.',
        technologies: ['Rust', 'Turbopack', 'TypeScript'],
        status: 'MERGED',
        stars: '124k+',
        githubUrl: 'https://github.com/vercel/next.js'
      }
    ];
  }, []);

  const education = useMemo(() => {
    if (data?.education && data.education.length > 0) {
      return data.education;
    }
    return [
      {
        id: 'edu-1',
        institution: 'National Institute of Technology',
        degree: 'Bachelor of Technology in Computer Science & Engineering',
        duration: '2019 — 2023',
        grade: 'GPA: 3.9/4.0 · Magna Cum Laude'
      }
    ];
  }, [data?.education]);

  const skills = useMemo(() => {
    if (data?.skills && data.skills.length > 0) {
      return data.skills;
    }
    return [
      { id: 's1', name: 'React', category: 'FRONTEND', proficiency: 96 },
      { id: 's2', name: 'TypeScript', category: 'FRONTEND', proficiency: 95 },
      { id: 's3', name: 'Next.js', category: 'FRONTEND', proficiency: 94 },
      { id: 's4', name: 'Tailwind CSS', category: 'FRONTEND', proficiency: 92 },
      { id: 's5', name: 'Three.js / WebGL', category: 'FRONTEND', proficiency: 86 },
      { id: 's6', name: 'Go (Golang)', category: 'BACKEND', proficiency: 90 },
      { id: 's7', name: 'Node.js / Express', category: 'BACKEND', proficiency: 92 },
      { id: 's8', name: 'Rust', category: 'BACKEND', proficiency: 82 },
      { id: 's9', name: 'Python', category: 'BACKEND', proficiency: 88 },
      { id: 's10', name: 'PostgreSQL', category: 'DATABASES', proficiency: 90 },
      { id: 's11', name: 'Redis', category: 'DATABASES', proficiency: 92 },
      { id: 's12', name: 'Vector DBs (Qdrant/Pinecone)', category: 'AI / ML', proficiency: 85 },
      { id: 's13', name: 'LangChain & RAG Workflows', category: 'AI / ML', proficiency: 87 },
      { id: 's14', name: 'Docker & Containers', category: 'CLOUD', proficiency: 92 },
      { id: 's15', name: 'Kubernetes', category: 'CLOUD', proficiency: 84 },
      { id: 's16', name: 'AWS & Cloudflare', category: 'CLOUD', proficiency: 88 },
      { id: 's17', name: 'Git & GitHub Actions', category: 'TOOLS', proficiency: 95 },
      { id: 's18', name: 'Linux System Architecture', category: 'TOOLS', proficiency: 90 }
    ];
  }, [data?.skills]);

  const skillsByCategory = useMemo(() => {
    const grouped: Record<string, SkillItem[]> = {};
    skills.forEach((skill) => {
      const cat = (skill.category || 'TECHNICAL').toUpperCase();
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(skill as SkillItem);
    });
    return grouped;
  }, [skills]);

  // Track cursor position for subtle magnetic glow
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

  const marqueeKeywords = [
    'REACT',
    'TYPESCRIPT',
    'NEXT.JS',
    'NODE.JS',
    'GO',
    'RUST',
    'PYTHON',
    'THREE.JS',
    'KUBERNETES',
    'AI / RAG',
    'DISTRIBUTED SYSTEMS',
    'OPEN SOURCE',
    'POSTGRESQL',
    'REDIS',
    'DOCKER'
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 relative overflow-x-hidden">
      
      {/* Subtle interactive cursor spotlight */}
      <div 
        className="fixed w-[420px] h-[420px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none -z-10 transition-transform duration-75 ease-out hidden md:block"
        style={{
          transform: `translate(${mousePosition.x - 210}px, ${mousePosition.y - 210}px)`
        }}
      />

      {/* Cybernetic ambient grid overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-15 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Top Floating Glass Navigation */}
      <header className="sticky top-0 z-40 bg-[#07090e]/85 backdrop-blur-lg border-b border-indigo-900/30 px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Developer Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold font-mono text-sm shadow-[0_0_15px_rgba(99,102,241,0.4)]">
              {profile.name.charAt(0)}
            </div>
            <div className="leading-none">
              <span className="font-bold text-sm text-white tracking-tight block">{profile.name}</span>
              <span className="text-[10px] text-indigo-400 font-mono">DEVELOPER &amp; BUILDER</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-medium text-slate-300">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'experience', label: 'Experience' },
              { id: 'projects', label: 'Projects' },
              { id: 'opensource', label: 'Open Source' },
              { id: 'skills', label: 'Skills' },
              { id: 'education', label: 'Education' },
              { id: 'contact', label: 'Contact' }
            ].map((tab) => {
              const isActive = activeSection === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveSection(tab.id as any);
                    const el = document.getElementById(tab.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-950/90 border border-indigo-500/50 text-indigo-300 font-semibold shadow-[0_0_12px_rgba(99,102,241,0.25)]'
                      : 'hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Quick Action Button */}
          <div className="flex items-center gap-2.5">
            <a
              href={`mailto:${profile.email}`}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-[0_0_15px_rgba(99,102,241,0.35)] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 relative z-10 space-y-20 sm:space-y-32">

        {/* ========================================================================= */}
        {/* 1. HERO SECTION (Dynamic Interactive Developer Showcase)                  */}
        {/* ========================================================================= */}
        <section id="home" className="pt-4 sm:pt-8 space-y-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Live status badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>OPEN FOR NEW CHALLENGES &amp; ROLES</span>
              </div>

              {/* High-impact headline */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
                  Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">{profile.name}</span>
                </h1>
                <p className="text-xl sm:text-2xl font-semibold text-slate-300">
                  {profile.title}
                </p>
              </div>

              <p className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
                {profile.bio || about.aboutText}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={() => {
                    const el = document.getElementById('projects');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-[0_0_25px_rgba(99,102,241,0.4)] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Projects</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('opensource');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-3 rounded-xl bg-slate-900/90 border border-indigo-900/60 hover:border-indigo-500 text-slate-200 hover:text-white font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <GitBranch className="w-4 h-4 text-indigo-400" />
                  <span>Open Source</span>
                </button>

                <button
                  onClick={handleCopyEmail}
                  className="px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 text-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedEmail ? 'Email Copied!' : 'Copy Email'}</span>
                </button>
              </div>

              {/* Social links row */}
              <div className="flex items-center gap-4 pt-2 text-slate-400">
                {data?.socialLinks?.github && (
                  <a href={data.socialLinks.github} target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {data?.socialLinks?.linkedin && (
                  <a href={data.socialLinks.linkedin} target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {data?.socialLinks?.twitter && (
                  <a href={data.socialLinks.twitter} target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                <a href={`mailto:${profile.email}`} className="hover:text-indigo-400 transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>

            </div>

            {/* Right Interactive Tech Card & Code Terminal */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-indigo-900/60 bg-gradient-to-b from-slate-900/90 to-[#0c101a] p-5 sm:p-6 space-y-5 shadow-2xl backdrop-blur-md relative overflow-hidden group">
                
                {/* Top Terminal Bar */}
                <div className="flex items-center justify-between border-b border-indigo-900/40 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                    </div>
                    <span className="text-xs font-mono text-slate-400 ml-1">developer.config.ts</span>
                  </div>
                  <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-500/30">
                    INTERACTIVE_V3
                  </span>
                </div>

                {/* Code syntax presentation */}
                <div className="font-mono text-xs space-y-2 text-slate-300 leading-relaxed bg-[#05070c] p-4 rounded-xl border border-indigo-950">
                  <div>
                    <span className="text-purple-400">export const</span> <span className="text-blue-400">developer</span> = &#123;
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">name:</span> <span className="text-emerald-300">"{profile.name}"</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">role:</span> <span className="text-emerald-300">"{profile.title}"</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">location:</span> <span className="text-emerald-300">"{profile.location}"</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">coreStack:</span> [
                    <span className="text-yellow-300">"React"</span>, 
                    <span className="text-yellow-300">"TypeScript"</span>, 
                    <span className="text-yellow-300">"Go"</span>, 
                    <span className="text-yellow-300">"PostgreSQL"</span>
                    ],
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">status:</span> <span className="text-cyan-300">"READY_TO_BUILD"</span>
                  </div>
                  <div>&#125;;</div>
                </div>

                {/* Quick Telemetry Indicators */}
                <div className="grid grid-cols-3 gap-2 text-center pt-1 font-mono">
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-indigo-950">
                    <div className="text-lg font-bold text-white">4+</div>
                    <div className="text-[9px] text-slate-400 uppercase">Yrs Experience</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-indigo-950">
                    <div className="text-lg font-bold text-indigo-400">30+</div>
                    <div className="text-[9px] text-slate-400 uppercase">Projects</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-indigo-950">
                    <div className="text-lg font-bold text-emerald-400">200k+</div>
                    <div className="text-[9px] text-slate-400 uppercase">OS Stars Reach</div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </section>

        {/* ========================================================================= */}
        {/* 2. CONTINUOUS ANIMATED MARQUEE / KEYWORD STRIP                            */}
        {/* ========================================================================= */}
        <section className="py-4 border-y border-indigo-900/30 overflow-hidden bg-indigo-950/10">
          <div className="flex w-full whitespace-nowrap overflow-hidden select-none">
            <div className="flex items-center gap-8 text-xs font-mono font-bold tracking-widest text-indigo-400/80 animate-marquee">
              {[...marqueeKeywords, ...marqueeKeywords].map((word, idx) => (
                <span key={idx} className="flex items-center gap-8">
                  <span>{word}</span>
                  <span className="text-indigo-600">✦</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. TL;DR SNAPSHOT (Quick facts for recruiters & tech leads)               */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
            <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold">
              // 01 · TL;DR SNAPSHOT
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl border border-indigo-900/40 bg-slate-900/60 space-y-1.5 hover:border-indigo-500/50 transition-colors">
              <div className="text-xs font-mono text-slate-400">YEARS ACTIVE</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">4+ Years</div>
              <p className="text-xs text-indigo-400">Professional Engineering</p>
            </div>
            <div className="p-5 rounded-xl border border-indigo-900/40 bg-slate-900/60 space-y-1.5 hover:border-indigo-500/50 transition-colors">
              <div className="text-xs font-mono text-slate-400">PROJECTS SHIPPED</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">25+ Apps</div>
              <p className="text-xs text-emerald-400">Cloud &amp; Microservices</p>
            </div>
            <div className="p-5 rounded-xl border border-indigo-900/40 bg-slate-900/60 space-y-1.5 hover:border-indigo-500/50 transition-colors">
              <div className="text-xs font-mono text-slate-400">OPEN SOURCE PRs</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">60+ Merged</div>
              <p className="text-xs text-purple-400">Major Ecosystems</p>
            </div>
            <div className="p-5 rounded-xl border border-indigo-900/40 bg-slate-900/60 space-y-1.5 hover:border-indigo-500/50 transition-colors">
              <div className="text-xs font-mono text-slate-400">CURRENT FOCUS</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">Distributed</div>
              <p className="text-xs text-amber-400">High-Throughput Systems</p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. ABOUT SECTION                                                          */}
        {/* ========================================================================= */}
        <section id="about" className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
            <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold">
              // 02 · ABOUT &amp; PHILOSOPHY
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-4 text-slate-300 text-base leading-relaxed">
              <p>{about.aboutText}</p>
              <p>
                Whether designing distributed microservices with Go and Redis, or crafting seamless interactive user interfaces with React, Next.js, and TypeScript, I emphasize clean code, robust observability, and predictable performance.
              </p>

              {/* Research tags */}
              <div className="pt-3 space-y-2">
                <span className="text-xs font-mono text-slate-400 block">// PRIMARY TECHNICAL INTERESTS:</span>
                <div className="flex flex-wrap gap-2">
                  {about.interests.map((item, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 rounded-md bg-indigo-950/60 border border-indigo-900/60 text-xs font-mono text-indigo-300 flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3 h-3 text-indigo-400" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick stats & location card */}
            <div className="lg:col-span-4 rounded-xl border border-indigo-900/40 bg-slate-900/80 p-5 space-y-4 font-mono text-xs">
              <div className="text-indigo-300 font-bold border-b border-slate-800 pb-2 flex items-center justify-between">
                <span>SYSTEM_STATUS</span>
                <span className="text-emerald-400">HEALTHY</span>
              </div>
              <div className="space-y-2 text-slate-400">
                <div className="flex justify-between">
                  <span>LOCATION:</span>
                  <span className="text-slate-200">{profile.location}</span>
                </div>
                <div className="flex justify-between">
                  <span>TIMEZONE:</span>
                  <span className="text-slate-200">UTC+5:30</span>
                </div>
                <div className="flex justify-between">
                  <span>WORK MODEL:</span>
                  <span className="text-emerald-400">Remote / Hybrid</span>
                </div>
                <div className="flex justify-between">
                  <span>REPOSITORIES:</span>
                  <span className="text-indigo-300">45+ Public</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. EXPERIENCE SECTION (Interactive Timeline Layout)                       */}
        {/* ========================================================================= */}
        <section id="experience" className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
              <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold">
                // 03 · WORK EXPERIENCE
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500">SORT: CHRONOLOGICAL</span>
          </div>

          <div className="space-y-6 relative border-l-2 border-indigo-950 ml-3 sm:ml-4 pl-6 sm:pl-8">
            {experiences.map((exp, idx) => (
              <div 
                key={exp.id || idx}
                className="relative rounded-xl border border-indigo-900/40 bg-slate-900/70 p-6 space-y-4 hover:border-indigo-500/60 transition-all group"
              >
                {/* Timeline node icon */}
                <div className="absolute -left-[35px] sm:-left-[43px] top-6 w-5 h-5 rounded-full bg-indigo-600 border-4 border-[#07090e] shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="text-sm text-indigo-400 font-medium">
                      @{exp.company}
                    </div>
                  </div>
                  <div className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800 self-start sm:self-auto">
                    {exp.duration}
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {exp.description}
                </p>

                {/* Achievements */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-xs font-mono text-slate-400 block uppercase tracking-wider">
                      KEY DELIVERABLES:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {exp.achievements.map((item, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-2">
                          <span className="text-indigo-400 mt-0.5">✦</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech stack */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-1.5 font-mono text-xs">
                    {exp.technologies.map((tech, tIdx) => (
                      <span 
                        key={tIdx}
                        className="px-2.5 py-0.5 rounded bg-indigo-950/60 border border-indigo-900/50 text-indigo-300 text-[11px]"
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
        {/* 6. PROJECTS SECTION (Interactive Developer Case Cards)                    */}
        {/* ========================================================================= */}
        <section id="projects" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
              <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold">
                // 04 · FEATURED PROJECTS
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500">{projects.length} REPOSITORIES SHIPPED</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <div 
                key={project.id || idx}
                className="rounded-2xl border border-indigo-900/40 bg-gradient-to-b from-slate-900/90 to-[#0a0e17] p-6 space-y-5 flex flex-col justify-between hover:border-indigo-500/60 transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.12)] group"
              >
                <div className="space-y-3.5">
                  
                  {/* Top Project Bar */}
                  <div className="flex items-center justify-between font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <FolderGit2 className="w-4 h-4 text-indigo-400" />
                      <span className="text-slate-400">PROJECT_0{idx + 1}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-indigo-950 border border-indigo-500/30 text-indigo-300 text-[10px] font-bold">
                      {project.status || 'LIVE'}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {project.name}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="pt-1 flex flex-wrap gap-1.5 font-mono text-xs">
                      {project.technologies.map((tech, tIdx) => (
                        <span 
                          key={tIdx}
                          className="px-2.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300 text-[11px]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom links */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between font-mono text-xs">
                  <div className="text-slate-500">
                    YEAR: <span className="text-slate-400">{project.year || '2025'}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. OPEN SOURCE SECTION                                                    */}
        {/* ========================================================================= */}
        <section id="opensource" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
              <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold">
                // 05 · OPEN SOURCE CONTRIBUTIONS
              </h2>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 font-mono text-xs">
              {['ALL', 'MERGED', 'ACTIVE'].map((status) => (
                <button
                  key={status}
                  onClick={() => setOsFilter(status)}
                  className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                    osFilter === status 
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'text-slate-400 hover:text-slate-200 bg-slate-900/60'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {openSourceContributions
              .filter(item => osFilter === 'ALL' || item.status === osFilter)
              .map((item) => (
                <div 
                  key={item.id}
                  className="rounded-xl border border-indigo-900/40 bg-slate-900/60 p-5 space-y-3.5 hover:border-indigo-500/50 transition-all group"
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <GitFork className="w-4 h-4 text-purple-400" />
                      <span className="font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {item.name}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold">
                      {item.status}
                    </span>
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 font-mono text-xs">
                    <span className="text-slate-400 text-[11px]">Org: {item.org}</span>
                    <a
                      href={item.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Inspect PR</span>
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. SKILLS SECTION (Interactive Category Matrix)                           */}
        {/* ========================================================================= */}
        <section id="skills" className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
              <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold">
                // 06 · TECHNICAL SKILLS &amp; STACK
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500">{skills.length} TECHNOLOGIES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(Object.entries(skillsByCategory) as [string, SkillItem[]][]).map(([categoryName, items]) => (
              <div 
                key={categoryName}
                className="rounded-2xl border border-indigo-900/40 bg-slate-900/70 p-5 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-indigo-300 font-mono font-bold text-xs">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-indigo-400" />
                    <span>{categoryName}</span>
                  </div>
                  <span className="text-slate-500 text-[11px]">({items.length})</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <div 
                      key={skill.id}
                      className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-indigo-500/50 hover:bg-indigo-950/40 text-slate-200 hover:text-white text-xs font-mono transition-all flex items-center justify-between gap-2"
                    >
                      <span>{skill.name}</span>
                      <span className="text-[10px] text-indigo-400">{skill.proficiency}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9. EDUCATION SECTION                                                      */}
        {/* ========================================================================= */}
        <section id="education" className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
            <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold">
              // 07 · EDUCATION &amp; ACADEMICS
            </h2>
          </div>

          <div className="space-y-4">
            {education.map((edu, idx) => (
              <div 
                key={edu.id || idx}
                className="rounded-xl border border-indigo-900/40 bg-slate-900/60 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-indigo-500/50 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-lg font-bold text-white">{edu.institution}</h3>
                  </div>
                  <p className="text-sm text-slate-300">{edu.degree}</p>
                  {edu.grade && (
                    <p className="text-xs font-mono text-emerald-400">{edu.grade}</p>
                  )}
                </div>

                <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded border border-slate-800 self-start sm:self-auto">
                  {edu.duration}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 10. CONTACT SECTION                                                       */}
        {/* ========================================================================= */}
        <section id="contact" className="rounded-3xl border border-indigo-900/60 bg-gradient-to-b from-indigo-950/40 via-slate-900/80 to-[#07090e] p-8 sm:p-12 space-y-8 relative overflow-hidden">
          
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
            <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold">
              // 08 · LET'S BUILD TOGETHER
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Have an ambitious system or creative project in mind?
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
                I'm always open to discussing new opportunities, open-source initiatives, system architecture challenges, and engineering leadership.
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send an Email</span>
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="px-5 py-3.5 rounded-xl bg-slate-950 border border-indigo-900/60 hover:border-indigo-500 text-slate-200 transition-colors flex items-center gap-2 cursor-pointer text-sm"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedEmail ? 'Email Copied!' : 'Copy Address'}</span>
                </button>
              </div>
            </div>

            {/* Social gateway links */}
            <div className="lg:col-span-4 rounded-2xl border border-indigo-900/50 bg-slate-950/80 p-5 space-y-3 font-mono text-xs">
              <span className="text-slate-400 block text-[11px] uppercase tracking-wider">// SOCIAL PROTOCOLS:</span>
              
              <div className="space-y-2">
                {data?.socialLinks?.github && (
                  <a
                    href={data.socialLinks.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-indigo-500/50 text-slate-300 hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Github className="w-4 h-4 text-indigo-400" />
                      <span>GitHub</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                )}

                {data?.socialLinks?.linkedin && (
                  <a
                    href={data.socialLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-indigo-500/50 text-slate-300 hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-indigo-400" />
                      <span>LinkedIn</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                )}

                {data?.socialLinks?.twitter && (
                  <a
                    href={data.socialLinks.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-indigo-500/50 text-slate-300 hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Twitter className="w-4 h-4 text-indigo-400" />
                      <span>Twitter / X</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                )}
              </div>

              <div className="pt-2 text-[10px] text-slate-500 text-center">
                STATUS: DIRECT MESSAGING ACTIVE
              </div>
            </div>

          </div>

        </section>

      </main>

      {/* Global Footer */}
      <footer className="border-t border-indigo-900/30 bg-[#05070c] py-8 text-center font-mono text-xs text-slate-500 space-y-2">
        <div className="flex items-center justify-center gap-3 text-slate-400">
          <span>{profile.name}</span>
          <span>·</span>
          <span>Interactive Developer Portfolio</span>
          <span>·</span>
          <span className="text-indigo-400">2026</span>
        </div>
        <div className="text-[10px] text-slate-600">
          Crafted for high performance with React, TypeScript &amp; Motion
        </div>
      </footer>

    </div>
  );
};
