import React, { useState, useMemo } from 'react';
import { PortfolioData, LayoutConfiguration } from '../../types';
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
  Briefcase, 
  GraduationCap,
  Calendar,
  Phone,
  User,
  ArrowRight,
  GitBranch,
  Star,
  GitFork,
  Cpu,
  Zap,
  Activity,
  Shield,
  Box,
  Radio,
  FileCode2,
  FolderGit2,
  Flame,
  TerminalSquare,
  HelpCircle,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GitFolioCyberPortfolioTemplateProps {
  data: PortfolioData;
  config?: LayoutConfiguration;
}

export const GitFolioCyberPortfolioTemplate: React.FC<GitFolioCyberPortfolioTemplateProps> = ({ 
  data, 
  config 
}) => {
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [activeProjectFilter, setActiveProjectFilter] = useState<string>('ALL');
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; output: string }>>([
    { cmd: 'gitfolio --version', output: 'GitFolio Cyber v3.4.0 [PROTOCOL: CYBER_NET_SSH]' },
    { cmd: 'status', output: 'All subsystems operational. 0 vulnerabilities found.' }
  ]);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scanlinesActive, setScanlinesActive] = useState<boolean>(true);

  // Safe fallback dynamic data bindings from BuildEasy PortfolioData
  const profile = data?.profile || {
    name: 'Alex Vance',
    title: 'Senior Cyberpunk & Full-Stack Systems Architect',
    bio: 'Architecting high-throughput distributed systems, modern React frontends, and retro-futuristic web applications. Driven by terminal speed, clean code, and cyberpunk aesthetics.',
    location: 'Neo-Tokyo // San Francisco, CA',
    email: 'alex.vance@gitfolio.dev',
    phone: '+1 (555) 839-2041',
    website: 'https://gitfolio.dev',
    profilePhoto: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=600&auto=format&fit=crop&q=80'
  };

  const about = data?.about || {
    aboutText: 'I build resilient distributed web architectures, high-performance frontend interfaces, and developer toolchains. Specializing in TypeScript, React, Next.js, Rust, and cloud infrastructure, I blend retro-futuristic developer aesthetics with production-grade engineering precision.',
    interests: ['Distributed Systems', 'Kernel & WebAssembly', 'Cyberpunk Interfaces', 'Terminal Tooling', 'Open Source', 'Micro-Frontends'],
    services: [
      'High-Performance Frontend Systems',
      'Distributed Backend & API Gateways',
      'Cyberpunk UI/UX & Design Systems',
      'Cloud Native Infrastructure (Docker/K8s)',
      'Security & Performance Hardening',
      'Open Source Toolchain Development'
    ]
  };

  const projects = useMemo(() => {
    if (data?.projects && data.projects.length > 0) {
      return data.projects;
    }
    return [
      {
        id: 'p-1',
        name: 'quantum-mesh-orchestrator',
        description: 'Ultra-low latency microservices mesh visualizer with real-time WebSocket telemetry, topology graphs, and automated canary deployment controls.',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'WebSockets', 'Go'],
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=900&auto=format&fit=crop&q=80',
        githubUrl: 'https://github.com',
        liveUrl: 'https://quantum-mesh.dev',
        featured: true,
        year: '2024',
        category: 'FULLSTACK'
      },
      {
        id: 'p-2',
        name: 'neon-synth-audio-engine',
        description: 'Interactive browser-based modular synthesizer powered by Web Audio API and WebAssembly for generative synthwave soundscapes.',
        technologies: ['Next.js', 'WebAudio', 'TypeScript', 'WebAssembly', 'Canvas'],
        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=900&auto=format&fit=crop&q=80',
        githubUrl: 'https://github.com',
        liveUrl: 'https://neon-synth.dev',
        featured: true,
        year: '2024',
        category: 'FRONTEND'
      },
      {
        id: 'p-3',
        name: 'cyber-vault-security-cli',
        description: 'Hardware-encrypted secret manager and cross-cloud credentials rotator with zero-knowledge cryptographic authentication.',
        technologies: ['Rust', 'Node.js', 'PostgreSQL', 'Docker', 'OpenSSL'],
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=900&auto=format&fit=crop&q=80',
        githubUrl: 'https://github.com',
        liveUrl: 'https://cyber-vault.dev',
        featured: false,
        year: '2023',
        category: 'BACKEND'
      },
      {
        id: 'p-4',
        name: 'glitch-term-hud-components',
        description: 'An open-source React component toolkit implementing retro-futuristic HUD displays, terminal interfaces, and scanline shaders.',
        technologies: ['React', 'TypeScript', 'Storybook', 'Tailwind CSS'],
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&auto=format&fit=crop&q=80',
        githubUrl: 'https://github.com',
        liveUrl: 'https://glitch-term.dev',
        featured: false,
        year: '2023',
        category: 'FRONTEND'
      }
    ];
  }, [data?.projects]);

  const skills = useMemo(() => {
    if (data?.skills && data.skills.length > 0) {
      return data.skills;
    }
    return [
      { id: 's-1', name: 'React / Next.js', category: 'FRONTEND', proficiency: 98 },
      { id: 's-2', name: 'TypeScript', category: 'FRONTEND', proficiency: 96 },
      { id: 's-3', name: 'Tailwind CSS', category: 'FRONTEND', proficiency: 95 },
      { id: 's-4', name: 'Node.js / Express', category: 'BACKEND', proficiency: 92 },
      { id: 's-5', name: 'Python / FastAPI', category: 'BACKEND', proficiency: 88 },
      { id: 's-6', name: 'Go / Microservices', category: 'BACKEND', proficiency: 85 },
      { id: 's-7', name: 'PostgreSQL & Supabase', category: 'DATABASE', proficiency: 92 },
      { id: 's-8', name: 'Redis & MongoDB', category: 'DATABASE', proficiency: 88 },
      { id: 's-9', name: 'Docker & Kubernetes', category: 'DEVOPS', proficiency: 90 },
      { id: 's-10', name: 'AWS & Cloud Architecture', category: 'DEVOPS', proficiency: 87 },
      { id: 's-11', name: 'Git & GitHub CI/CD', category: 'TOOLS', proficiency: 96 },
      { id: 's-12', name: 'Linux / Bash Scripting', category: 'TOOLS', proficiency: 94 }
    ];
  }, [data?.skills]);

  const experiences = useMemo(() => {
    if (data?.experience && data.experience.length > 0) {
      return data.experience;
    }
    return [
      {
        id: 'exp-1',
        company: 'NEURAL_CORP LABS',
        role: 'Lead Systems Architect & Full-Stack Engineer',
        duration: '2022 — PRESENT',
        description: 'Architecting high-concurrency cloud microservices, authoring internal cyber HUD design systems, and scaling edge delivery pipelines.',
        current: true,
        technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
        achievements: [
          'Reduced 99th percentile API latency from 420ms to 65ms across 12M daily requests',
          'Architected zero-downtime blue/green deployment orchestration system',
          'Led a squad of 8 senior distributed systems engineers'
        ]
      },
      {
        id: 'exp-2',
        company: 'CYBERDYNE SYSTEMS',
        role: 'Senior Frontend Developer',
        duration: '2020 — 2022',
        description: 'Developed mission-critical telemetry consoles, real-time interactive dashboards, and developer toolkits.',
        current: false,
        technologies: ['React', 'TypeScript', 'WebSockets', 'Tailwind CSS', 'GraphQL'],
        achievements: [
          'Built real-time telemetry console processing 50k events per second',
          'Created modular UI kit adopted across 6 cross-functional engineering teams'
        ]
      },
      {
        id: 'exp-3',
        company: 'BYTEWAVE NETWORKS',
        role: 'Full-Stack Software Developer',
        duration: '2018 — 2020',
        description: 'Built customer-facing web applications, REST APIs, and automated continuous integration pipelines.',
        current: false,
        technologies: ['JavaScript', 'Node.js', 'Express', 'MongoDB', 'Docker'],
        achievements: [
          'Engineered resilient payment gateway integrations and authentication layers'
        ]
      }
    ];
  }, [data?.experience]);

  // Open Source Repositories Mock Structure
  const openSourceRepos = useMemo(() => {
    return [
      {
        name: 'gitfolio-cyber-core',
        stars: 342,
        forks: 89,
        language: 'TypeScript',
        langColor: '#3178c6',
        desc: 'Personal retro-futuristic portfolio generator & terminal HUD for developers on GitHub.',
        updated: '2 days ago'
      },
      {
        name: 'quantum-state-engine',
        stars: 521,
        forks: 114,
        language: 'Rust',
        langColor: '#dea584',
        desc: 'Zero-overhead concurrent state machine with deterministic replay for web applications.',
        updated: '1 week ago'
      },
      {
        name: 'scanline-glitch-shaders',
        stars: 218,
        forks: 43,
        language: 'GLSL',
        langColor: '#568975',
        desc: 'Collection of retro CRT scanline and chromatic aberration post-processing shaders.',
        updated: '3 weeks ago'
      }
    ];
  }, []);

  const categories = ['ALL', 'FEATURED', 'FRONTEND', 'BACKEND', 'FULLSTACK'];

  const filteredProjects = useMemo(() => {
    if (activeProjectFilter === 'ALL') return projects;
    if (activeProjectFilter === 'FEATURED') return projects.filter(p => p.featured);
    return projects.filter(p => {
      const matchCat = (p as any).category?.toUpperCase() === activeProjectFilter;
      const matchTech = p.technologies?.some(t => t.toUpperCase().includes(activeProjectFilter));
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

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim().toLowerCase();
    let output = '';

    if (cmd === 'help') {
      output = 'Available commands: help, whoami, skills, projects, contact, clear, stats, ping';
    } else if (cmd === 'whoami') {
      output = `${profile.name} - ${profile.title}. Location: ${profile.location}`;
    } else if (cmd === 'skills') {
      output = skills.map(s => s.name).join(' · ');
    } else if (cmd === 'projects') {
      output = projects.map(p => p.name).join(', ');
    } else if (cmd === 'contact') {
      output = `Email: ${profile.email} | GitHub: ${data?.socialLinks?.github || 'https://github.com'}`;
    } else if (cmd === 'clear') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    } else if (cmd === 'stats') {
      output = 'CPU: 99.8% IDLE | RAM: 1.2GB/16GB | REPOS: 42 | COMMITS_THIS_YEAR: 1,842';
    } else if (cmd === 'ping') {
      output = 'PONG 64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.042 ms';
    } else {
      output = `Command not recognized: "${cmd}". Type "help" for a list of available commands.`;
    }

    setTerminalHistory(prev => [...prev.slice(-6), { cmd: terminalInput, output }]);
    setTerminalInput('');
  };

  const navItems = [
    { id: 'home', label: '// 01. HOME' },
    { id: 'about', label: '// 02. ABOUT' },
    { id: 'repositories', label: '// 03. REPOSITORIES' },
    { id: 'skills', label: '// 04. SKILLS' },
    { id: 'experience', label: '// 05. EXPERIENCE' },
    { id: 'opensource', label: '// 06. OPEN_SOURCE' },
    { id: 'contact', label: '// 07. TRANSMIT' }
  ];

  // Language color mapper for GitHub repository cards
  const getLanguageColor = (lang: string) => {
    const l = lang.toLowerCase();
    if (l.includes('type') || l.includes('ts')) return '#3178c6';
    if (l.includes('java') || l.includes('js')) return '#f1e05a';
    if (l.includes('react') || l.includes('next')) return '#00f0ff';
    if (l.includes('python')) return '#3572A5';
    if (l.includes('rust')) return '#dea584';
    if (l.includes('go')) return '#00ADD8';
    if (l.includes('html') || l.includes('css')) return '#e34c26';
    return '#39d353';
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-[#d1d5db] font-mono selection:bg-[#00f0ff] selection:text-[#07090e] relative overflow-x-hidden">
      
      {/* Background Cyber Grid & Glow Effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #00f0ff15 1px, transparent 1px),
            linear-gradient(to bottom, #00f0ff15 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Optional CRT Scanline Overlay */}
      {scanlinesActive && (
        <div 
          className="fixed inset-0 pointer-events-none z-50 opacity-[0.04]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, #000, #000 1px, transparent 1px, transparent 2px)',
            backgroundSize: '100% 2px'
          }}
        />
      )}

      {/* Top HUD Telemetry Bar */}
      <div className="bg-[#0b0f19] border-b border-[#00f0ff]/30 text-[11px] text-[#00f0ff]/80 px-4 py-1.5 flex items-center justify-between z-40 relative tracking-wider">
        <div className="flex items-center gap-4 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="flex items-center gap-1.5 font-bold text-[#00ff66]">
            <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse inline-block" />
            [SYS_ONLINE]
          </span>
          <span className="hidden sm:inline text-neutral-400">|</span>
          <span className="hidden sm:inline">HOST: gitfolio.node.01</span>
          <span className="hidden md:inline text-neutral-400">|</span>
          <span className="hidden md:inline">BRANCH: <span className="text-[#ff007f]">main*</span></span>
          <span className="hidden lg:inline text-neutral-400">|</span>
          <span className="hidden lg:inline">UPTIME: 99.98%</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setScanlinesActive(!scanlinesActive)}
            className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors cursor-pointer ${
              scanlinesActive 
                ? 'bg-[#00f0ff]/20 border-[#00f0ff] text-[#00f0ff]' 
                : 'bg-transparent border-neutral-700 text-neutral-500 hover:text-neutral-300'
            }`}
            title="Toggle CRT Scanline HUD effect"
          >
            CRT: {scanlinesActive ? 'ON' : 'OFF'}
          </button>
          <span className="text-[#ff007f] font-bold text-xs animate-pulse">● LIVE</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. CYBERPUNK HEADER & TERMINAL NAVIGATION                                 */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 px-4 sm:px-8 py-3.5 bg-[#07090e]/90 backdrop-blur-md border-b border-[#00f0ff]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo / Prompt */}
          <a 
            href="#home" 
            className="flex items-center gap-2 text-white font-bold text-base sm:text-lg tracking-wider group"
          >
            <span className="text-[#00f0ff] group-hover:text-[#ff007f] transition-colors">&gt;</span>
            <span className="text-white font-extrabold">{profile.name.toUpperCase().replace(/\s+/g, '_')}</span>
            <span className="text-[#ff007f] font-mono text-xs hidden sm:inline">[v3.4]</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold tracking-wider">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-neutral-400 hover:text-[#00f0ff] transition-all relative py-1 hover:translate-x-0.5"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Quick Action Button */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="px-4 py-1.5 rounded bg-[#00f0ff]/10 hover:bg-[#00f0ff]/25 text-[#00f0ff] border border-[#00f0ff]/50 hover:border-[#00f0ff] text-xs font-bold tracking-wider transition-all duration-200 shadow-[0_0_12px_rgba(0,240,255,0.15)] flex items-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>TRANSMIT</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded border border-[#00f0ff]/40 text-[#00f0ff] bg-[#0b0f19]"
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

        {/* Mobile Nav Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden pt-4 pb-2 border-t border-[#00f0ff]/20 mt-3 space-y-1 bg-[#0b0f19] p-3 rounded"
            >
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-xs font-semibold text-neutral-300 hover:text-[#00f0ff] hover:bg-[#00f0ff]/10 rounded border-l-2 border-transparent hover:border-[#00f0ff]"
                >
                  {item.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-24 sm:space-y-32 relative z-10">

        {/* ========================================================================= */}
        {/* 2. CYBER HERO SECTION                                                     */}
        {/* ========================================================================= */}
        <section id="home" className="space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Cyber Identity & Commands */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0b0f19] border border-[#00f0ff]/40 text-xs text-[#00f0ff] font-mono shadow-[0_0_10px_rgba(0,240,255,0.1)]">
                <span className="text-[#ff007f] font-bold">&gt;&gt;</span>
                <span>SYSTEM_ROLE: // FULLSTACK_CYBER_ARCHITECT</span>
              </div>

              <div className="space-y-3">
                <div className="text-xs text-neutral-400 font-mono tracking-widest uppercase">
                  INITIALIZING PROFILE INTERFACE_
                </div>
                <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00f0ff] to-[#ff007f]">
                    {profile.name}
                  </span>
                </h1>
                <div className="text-lg sm:text-xl font-bold text-[#00f0ff] flex items-center gap-2">
                  <span className="text-[#39d353]">&gt;</span>
                  <span>{profile.title}</span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl bg-[#0b0f19]/60 p-4 rounded border-l-2 border-[#00f0ff] font-sans">
                {profile.bio}
              </p>

              {/* Coordinates / Meta info */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400">
                <div className="flex items-center gap-1.5 bg-[#0b0f19] px-3 py-1.5 rounded border border-neutral-800">
                  <MapPin className="w-3.5 h-3.5 text-[#ff007f]" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#0b0f19] px-3 py-1.5 rounded border border-neutral-800">
                  <Globe className="w-3.5 h-3.5 text-[#00f0ff]" />
                  <span>{profile.website}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#0b0f19] px-3 py-1.5 rounded border border-neutral-800">
                  <Mail className="w-3.5 h-3.5 text-[#39d353]" />
                  <span>{profile.email}</span>
                </div>
              </div>

              {/* Action Buttons & Socials */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#repositories"
                  className="px-6 py-3 rounded bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-[#07090e] font-black text-xs tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center gap-2 group"
                >
                  <FolderGit2 className="w-4 h-4" />
                  <span>$ git clone repos</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="#contact"
                  className="px-6 py-3 rounded bg-[#0b0f19] hover:bg-[#111625] text-white border border-[#ff007f]/60 hover:border-[#ff007f] font-bold text-xs tracking-wider transition-all duration-200 shadow-[0_0_15px_rgba(255,0,127,0.15)] flex items-center gap-2"
                >
                  <Terminal className="w-4 h-4 text-[#ff007f]" />
                  <span>$ ssh contact.sh</span>
                </a>

                {/* Social Dock */}
                <div className="flex items-center gap-2">
                  {data?.socialLinks?.github && (
                    <a
                      href={data.socialLinks.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded bg-[#0b0f19] border border-neutral-800 hover:border-[#00f0ff] text-neutral-400 hover:text-[#00f0ff] transition-all"
                      aria-label="GitHub Profile"
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {data?.socialLinks?.linkedin && (
                    <a
                      href={data.socialLinks.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded bg-[#0b0f19] border border-neutral-800 hover:border-[#00f0ff] text-neutral-400 hover:text-[#00f0ff] transition-all"
                      aria-label="LinkedIn Profile"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {data?.socialLinks?.twitter && (
                    <a
                      href={data.socialLinks.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded bg-[#0b0f19] border border-neutral-800 hover:border-[#00f0ff] text-neutral-400 hover:text-[#00f0ff] transition-all"
                      aria-label="Twitter Profile"
                      title="Twitter"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

            </div>

            {/* Right Column: Cyber Avatar Frame & Telemetry HUD */}
            <div className="lg:col-span-5 space-y-4">
              
              <div className="relative p-3 rounded-xl bg-[#0b0f19] border border-[#00f0ff]/40 shadow-[0_0_25px_rgba(0,240,255,0.15)] overflow-hidden group">
                
                {/* Tech Bracket Corners */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#00f0ff]" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#00f0ff]" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#00f0ff]" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#00f0ff]" />

                {/* Avatar Display */}
                <div className="w-full h-72 sm:h-80 rounded-lg overflow-hidden relative bg-[#07090e] border border-neutral-800">
                  {profile.profilePhoto ? (
                    <img
                      src={profile.profilePhoto}
                      alt={profile.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                      <User className="w-16 h-16 text-[#00f0ff] opacity-40 mb-2" />
                      <span className="text-xs font-mono text-[#00f0ff]">{profile.name}</span>
                    </div>
                  )}

                  {/* Status Overlay Badge */}
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded bg-[#07090e]/90 border border-[#00ff66]/60 backdrop-blur-md flex items-center gap-2 text-[11px] font-mono text-[#00ff66]">
                    <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse" />
                    <span>NODE_ACTIVE // READY</span>
                  </div>

                  {/* GitFolio Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded bg-[#ff007f]/80 text-white font-mono text-[10px] font-bold">
                    GITFOLIO_CYBER
                  </div>
                </div>

                {/* Quick Telemetry Grid */}
                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-neutral-800 text-center font-mono">
                  <div className="bg-[#07090e] p-2 rounded border border-neutral-800">
                    <div className="text-xs text-neutral-400">REPOS</div>
                    <div className="text-sm font-extrabold text-[#00f0ff]">38+</div>
                  </div>
                  <div className="bg-[#07090e] p-2 rounded border border-neutral-800">
                    <div className="text-xs text-neutral-400">STARS</div>
                    <div className="text-sm font-extrabold text-[#ff007f]">1.2k</div>
                  </div>
                  <div className="bg-[#07090e] p-2 rounded border border-neutral-800">
                    <div className="text-xs text-neutral-400">COMMITS</div>
                    <div className="text-sm font-extrabold text-[#39d353]">2.4k+</div>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Interactive Cyber Terminal Console Emulator */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#0b0f19] border border-[#00f0ff]/30 shadow-[0_0_20px_rgba(0,240,255,0.08)] space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2 text-[11px] text-neutral-400">
              <div className="flex items-center gap-2">
                <TerminalSquare className="w-4 h-4 text-[#00f0ff]" />
                <span className="text-white font-bold">CYBER_TERMINAL_SHELL</span>
                <span className="text-[#ff007f]">[INTERACTIVE]</span>
              </div>
              <div className="hidden sm:flex items-center gap-3 text-neutral-500">
                <span>Type <strong className="text-[#00f0ff]">"help"</strong> for commands</span>
                <span>|</span>
                <span>ESC to clear</span>
              </div>
            </div>

            {/* Terminal Output Stream */}
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {terminalHistory.map((item, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="flex items-center gap-2 text-[#00f0ff]">
                    <span className="text-[#ff007f]">guest@gitfolio:~$</span>
                    <span className="text-white font-semibold">{item.cmd}</span>
                  </div>
                  <div className="text-neutral-300 pl-4 border-l border-neutral-700">
                    {item.output}
                  </div>
                </div>
              ))}
            </div>

            {/* Terminal Input Line */}
            <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 pt-1 border-t border-neutral-800/80">
              <span className="text-[#39d353] font-bold">&gt;</span>
              <span className="text-[#ff007f] text-xs">guest@gitfolio:~$</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="type command (e.g. whoami, skills, projects, contact)..."
                className="flex-1 bg-transparent border-none outline-none text-white text-xs placeholder:text-neutral-600 font-mono"
              />
              <button
                type="submit"
                className="px-3 py-1 rounded bg-[#00f0ff]/20 hover:bg-[#00f0ff]/40 text-[#00f0ff] border border-[#00f0ff]/40 text-[11px] font-bold transition-colors cursor-pointer"
              >
                EXEC
              </button>
            </form>
          </div>

        </section>

        {/* ========================================================================= */}
        {/* 3. ABOUT & SPECIFICATIONS SECTION                                         */}
        {/* ========================================================================= */}
        <section id="about" className="space-y-8">
          
          <div className="border-b border-[#00f0ff]/30 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="text-xs text-[#00f0ff] font-mono">// 02. SYSTEM_SPECIFICATIONS</div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
                <span>ABOUT_THE_OPERATOR</span>
                <span className="text-[#ff007f] text-sm">/SPEC_LOG</span>
              </h2>
            </div>
            <div className="text-xs text-neutral-400 font-mono">
              STATUS: VERIFIED_ENGINEER
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="p-6 rounded-xl bg-[#0b0f19] border border-neutral-800 space-y-4">
                <div className="flex items-center gap-2 text-xs text-[#00f0ff] font-bold">
                  <Cpu className="w-4 h-4 text-[#ff007f]" />
                  <span>CORE_DIRECTIVE &amp; PHILOSOPHY</span>
                </div>
                
                <p className="text-neutral-300 leading-relaxed font-sans text-sm sm:text-base">
                  {about.aboutText}
                </p>
              </div>

              {/* Specialty Chips */}
              <div className="p-6 rounded-xl bg-[#0b0f19] border border-neutral-800 space-y-3">
                <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  // FOCUS_AREAS &amp; ARCHITECTURAL_INTERESTS
                </div>
                <div className="flex flex-wrap gap-2">
                  {about.interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded bg-[#07090e] border border-[#00f0ff]/30 text-[#00f0ff] text-xs font-mono flex items-center gap-1.5"
                    >
                      <Zap className="w-3 h-3 text-[#ff007f]" />
                      <span>{interest}</span>
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Right System Specs Table */}
            <div className="lg:col-span-5 space-y-4">
              
              <div className="p-6 rounded-xl bg-[#0b0f19] border border-[#00f0ff]/30 space-y-4">
                <div className="text-xs font-bold text-[#39d353] flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>HARDWARE &amp; RUNTIME_SPECIFICATIONS</span>
                </div>

                <div className="space-y-3 text-xs font-mono">
                  <div className="flex justify-between py-1.5 border-b border-neutral-800">
                    <span className="text-neutral-400">PRIMARY_RUNTIME</span>
                    <span className="text-[#00f0ff] font-bold">Node.js 20.x / Bun 1.1</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-neutral-800">
                    <span className="text-neutral-400">FRONTEND_FRAMEWORK</span>
                    <span className="text-[#ff007f] font-bold">React 18 / Next.js 14</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-neutral-800">
                    <span className="text-neutral-400">TYPE_SAFETY</span>
                    <span className="text-[#39d353] font-bold">TypeScript Strict: true</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-neutral-800">
                    <span className="text-neutral-400">CONTAINERIZATION</span>
                    <span className="text-[#00f0ff] font-bold">Docker / Podman / K8s</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-neutral-800">
                    <span className="text-neutral-400">DATABASE_ENGINES</span>
                    <span className="text-white font-bold">PostgreSQL / Supabase / Redis</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-neutral-400">ENCRYPTION</span>
                    <span className="text-[#39d353] font-bold">AES-256-GCM / TLS 1.3</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </section>

        {/* ========================================================================= */}
        {/* 4. REPOSITORIES & PROJECTS SHOWCASE (GITFOLIO CORE IDENTITY)             */}
        {/* ========================================================================= */}
        <section id="repositories" className="space-y-8">
          
          <div className="border-b border-[#00f0ff]/30 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs text-[#00f0ff] font-mono">// 03. REPOSITORIES &amp; PROJECTS</div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
                <span>FEATURED_BUILDS</span>
                <span className="text-[#ff007f] text-sm">[{filteredProjects.length}_REPOS]</span>
              </h2>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded bg-[#0b0f19] border border-neutral-800">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveProjectFilter(cat)}
                  className={`px-3 py-1 rounded text-xs font-bold font-mono transition-all ${
                    activeProjectFilter === cat
                      ? 'bg-[#00f0ff] text-[#07090e] shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Project Repositories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="rounded-xl bg-[#0b0f19] border border-neutral-800 hover:border-[#00f0ff]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
              >
                
                {/* Visual Cover Banner in Full Color (No Grayscale filter) */}
                <div className="h-56 sm:h-64 w-full overflow-hidden relative bg-[#07090e]">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                      <FolderGit2 className="w-12 h-12 text-[#00f0ff] opacity-40 mb-2" />
                      <span className="text-xs font-mono text-neutral-400">{project.name}</span>
                    </div>
                  )}

                  {/* HUD Corner Accents */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#07090e]/85 backdrop-blur-md border border-[#00f0ff]/40 text-[10px] font-mono text-[#00f0ff] flex items-center gap-1.5">
                    <GitBranch className="w-3 h-3 text-[#ff007f]" />
                    <span>main</span>
                  </div>

                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-[#07090e]/85 backdrop-blur-md border border-neutral-700 text-[10px] font-mono text-neutral-300">
                    {project.year || '2024'}
                  </div>
                </div>

                {/* Repo Metadata Header */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-[#00f0ff] transition-colors flex items-center gap-2">
                        <FolderGit2 className="w-4 h-4 text-[#ff007f] shrink-0" />
                        <span className="truncate">{project.name}</span>
                      </h3>
                      <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-400 font-mono shrink-0">
                        Public
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-neutral-800">
                    
                    {/* Tech Stack Badges */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-0.5 rounded bg-[#07090e] border border-neutral-800 text-[11px] font-mono text-neutral-300 flex items-center gap-1.5"
                          >
                            <span 
                              className="w-2 h-2 rounded-full" 
                              style={{ backgroundColor: getLanguageColor(tech) }}
                            />
                            <span>{tech}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Telemetry Stats & Action Links */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-3 text-xs text-neutral-400 font-mono">
                        <span className="flex items-center gap-1 hover:text-[#ffe600]">
                          <Star className="w-3.5 h-3.5 text-[#ffe600]" />
                          <span>42</span>
                        </span>
                        <span className="flex items-center gap-1 hover:text-[#00f0ff]">
                          <GitFork className="w-3.5 h-3.5 text-[#00f0ff]" />
                          <span>12</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3.5 py-1.5 rounded bg-[#00f0ff]/10 hover:bg-[#00f0ff]/30 text-[#00f0ff] border border-[#00f0ff]/50 text-xs font-bold font-mono transition-all flex items-center gap-1"
                          >
                            <span>LIVE</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded bg-[#07090e] hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 transition-all"
                            title="View Source Code"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                  </div>

                </div>

              </motion.div>
            ))}
          </div>

        </section>

        {/* ========================================================================= */}
        {/* 5. TECHNICAL SKILLS & PROFICIENCY METERS                                  */}
        {/* ========================================================================= */}
        <section id="skills" className="space-y-8">
          
          <div className="border-b border-[#00f0ff]/30 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="text-xs text-[#00f0ff] font-mono">// 04. TECHNICAL_CAPABILITIES</div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
                <span>SKILLS_&amp;_TOOLCHAIN</span>
                <span className="text-[#ff007f] text-sm">/BENCHMARK</span>
              </h2>
            </div>
            <div className="text-xs text-neutral-400 font-mono">
              TOTAL_MODULES: {skills.length}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="p-4 rounded-xl bg-[#0b0f19] border border-neutral-800 hover:border-[#00f0ff]/50 transition-all space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Code className="w-3.5 h-3.5 text-[#00f0ff]" />
                    <span className="font-bold text-white">{skill.name}</span>
                  </div>
                  <span className="font-mono text-[#ff007f] font-bold">{skill.proficiency}%</span>
                </div>

                <div className="w-full h-1.5 bg-[#07090e] rounded-full overflow-hidden border border-neutral-800">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-[#00f0ff] to-[#ff007f] rounded-full"
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono">
                  <span>CATEGORY: {skill.category || 'DEV'}</span>
                  <span>LOAD: OPTIMAL</span>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* ========================================================================= */}
        {/* 6. EXPERIENCE & CHRONO LOGS                                               */}
        {/* ========================================================================= */}
        <section id="experience" className="space-y-8">
          
          <div className="border-b border-[#00f0ff]/30 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="text-xs text-[#00f0ff] font-mono">// 05. CAREER_TIMELINE</div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
                <span>EXPERIENCE_LOGS</span>
                <span className="text-[#ff007f] text-sm">/DECOMMISSIONED_AND_ACTIVE</span>
              </h2>
            </div>
            <div className="text-xs text-neutral-400 font-mono">
              TIMELINE: 2018 — 2025
            </div>
          </div>

          <div className="space-y-4">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.id || idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.1 }}
                className="p-6 rounded-xl bg-[#0b0f19] border border-neutral-800 hover:border-[#00f0ff]/40 transition-all space-y-4 relative"
              >
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#ff007f] font-mono">[LOG #{String(idx + 1).padStart(2, '0')}]</span>
                      <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                    </div>
                    <div className="text-xs text-[#00f0ff] font-mono mt-0.5">
                      @ {exp.company}
                    </div>
                  </div>

                  <div className="px-3 py-1 rounded bg-[#07090e] border border-neutral-700 text-xs font-mono text-neutral-300 self-start sm:self-auto">
                    {exp.duration}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                  {exp.description}
                </p>

                {/* Achievements List */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="space-y-1.5 text-xs text-neutral-300 pt-2">
                    {exp.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#39d353] shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tech Chips */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-neutral-800/80">
                    {exp.technologies.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-[#07090e] border border-neutral-800 text-[10px] font-mono text-neutral-400"
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
        {/* 7. OPEN SOURCE & GITHUB TELEMETRY                                         */}
        {/* ========================================================================= */}
        <section id="opensource" className="space-y-8">
          
          <div className="border-b border-[#00f0ff]/30 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="text-xs text-[#00f0ff] font-mono">// 06. GITHUB_ECOSYSTEM</div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
                <span>OPEN_SOURCE_CONTRIBUTIONS</span>
                <span className="text-[#ff007f] text-sm">/PUBLIC_GRAPH</span>
              </h2>
            </div>
            <div className="text-xs text-neutral-400 font-mono">
              TARGET: GITHUB.COM
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {openSourceRepos.map((repo, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[#0b0f19] border border-neutral-800 hover:border-[#00f0ff]/40 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#00f0ff] font-bold flex items-center gap-1.5">
                      <FolderGit2 className="w-3.5 h-3.5 text-[#ff007f]" />
                      {repo.name}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono">{repo.updated}</span>
                  </div>
                  <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                    {repo.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-neutral-800 text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: repo.langColor }} />
                    <span className="text-neutral-300">{repo.language}</span>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-[#ffe600]" />
                      <span>{repo.stars}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3 h-3 text-[#00f0ff]" />
                      <span>{repo.forks}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* GitHub Commit Activity Simulator Banner */}
          <div className="p-6 rounded-xl bg-[#0b0f19] border border-[#00f0ff]/30 space-y-4 font-mono">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#39d353]" />
                <span className="text-white font-bold">GITHUB_COMMIT_TELEMETRY</span>
              </div>
              <span className="text-neutral-400 text-[11px]">1,842 commits in the last year</span>
            </div>

            {/* Visual Heatmap Grid Simulator */}
            <div className="grid grid-cols-12 sm:grid-cols-24 lg:grid-cols-48 gap-1 pt-2 overflow-x-auto">
              {Array.from({ length: 48 }).map((_, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-1">
                  {Array.from({ length: 7 }).map((_, rowIdx) => {
                    const seed = (colIdx * 7 + rowIdx) % 10;
                    let color = '#111625';
                    if (seed > 7) color = '#39d353';
                    else if (seed > 4) color = '#0e4429';
                    else if (seed > 2) color = '#006d32';
                    return (
                      <div
                        key={rowIdx}
                        className="w-2.5 h-2.5 rounded-[2px]"
                        style={{ backgroundColor: color }}
                        title={`Activity metric at slot ${colIdx}-${rowIdx}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-2 border-t border-neutral-800">
              <span>Less activity</span>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-[2px] bg-[#111625]" />
                <span className="w-2.5 h-2.5 rounded-[2px] bg-[#0e4429]" />
                <span className="w-2.5 h-2.5 rounded-[2px] bg-[#006d32]" />
                <span className="w-2.5 h-2.5 rounded-[2px] bg-[#39d353]" />
              </div>
              <span>More activity</span>
            </div>
          </div>

        </section>

        {/* ========================================================================= */}
        {/* 8. TRANSMIT / CONTACT SECTION                                             */}
        {/* ========================================================================= */}
        <section id="contact" className="space-y-8">
          
          <div className="border-b border-[#00f0ff]/30 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="text-xs text-[#00f0ff] font-mono">// 07. TRANSMIT_MESSAGE</div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
                <span>ESTABLISH_COMMUNICATION</span>
                <span className="text-[#ff007f] text-sm">/SECURE_CHANNEL</span>
              </h2>
            </div>
            <div className="text-xs text-[#39d353] font-mono flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>CHANNEL: OPEN (PORT 443)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Direct Connect Info */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="p-6 rounded-xl bg-[#0b0f19] border border-neutral-800 space-y-4">
                <div className="text-xs font-bold text-neutral-400 font-mono">
                  // OPERATOR_ENDPOINT_DIRECT
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded bg-[#07090e] border border-neutral-800 space-y-1">
                    <div className="text-[11px] text-neutral-500 font-mono">DIRECT_EMAIL</div>
                    <div className="text-sm font-bold text-white font-mono">{profile.email}</div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className="w-full py-2.5 rounded bg-[#00f0ff]/10 hover:bg-[#00f0ff]/25 text-[#00f0ff] border border-[#00f0ff]/40 text-xs font-bold font-mono transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-4 h-4 text-[#39d353]" />
                        <span>[COPIED_TO_CLIPBOARD]</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>$ copy-email --clipboard</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Social Channels */}
              <div className="p-6 rounded-xl bg-[#0b0f19] border border-neutral-800 space-y-3 font-mono text-xs">
                <div className="text-neutral-400 font-bold">// SOCIAL_NETWORKS</div>
                <div className="space-y-2">
                  {data?.socialLinks?.github && (
                    <a
                      href={data.socialLinks.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-2.5 rounded bg-[#07090e] border border-neutral-800 hover:border-[#00f0ff] text-neutral-300 hover:text-[#00f0ff] transition-all"
                    >
                      <span className="flex items-center gap-2">
                        <Github className="w-4 h-4" />
                        <span>GITHUB</span>
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {data?.socialLinks?.linkedin && (
                    <a
                      href={data.socialLinks.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-2.5 rounded bg-[#07090e] border border-neutral-800 hover:border-[#00f0ff] text-neutral-300 hover:text-[#00f0ff] transition-all"
                    >
                      <span className="flex items-center gap-2">
                        <Linkedin className="w-4 h-4" />
                        <span>LINKEDIN</span>
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

            </div>

            {/* Interactive Terminal Message Form */}
            <div className="lg:col-span-7">
              
              <div className="p-6 sm:p-8 rounded-xl bg-[#0b0f19] border border-[#00f0ff]/40 shadow-[0_0_20px_rgba(0,240,255,0.1)] space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3 text-xs font-mono">
                  <div className="flex items-center gap-2 text-[#00f0ff]">
                    <TerminalSquare className="w-4 h-4" />
                    <span className="font-bold">PACKET_TRANSMITTER</span>
                  </div>
                  <span className="text-neutral-500">ENCRYPTION: ENABLED</span>
                </div>

                {formSubmitted ? (
                  <div className="p-6 rounded bg-[#07090e] border border-[#39d353] text-center space-y-2 font-mono">
                    <CheckCircle2 className="w-10 h-10 text-[#39d353] mx-auto animate-bounce" />
                    <div className="text-sm font-bold text-white">[PACKET_TRANSMITTED_SUCCESSFULLY]</div>
                    <div className="text-xs text-neutral-400">Your transmission has been logged. Operator will reply promptly.</div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4 font-mono text-xs">
                    
                    <div className="space-y-1.5">
                      <label className="text-neutral-400 block">$ sender_name:</label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="Ada Lovelace"
                        className="w-full px-4 py-2.5 rounded bg-[#07090e] border border-neutral-800 focus:border-[#00f0ff] outline-none text-white transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-neutral-400 block">$ sender_email:</label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="ada@example.com"
                        className="w-full px-4 py-2.5 rounded bg-[#07090e] border border-neutral-800 focus:border-[#00f0ff] outline-none text-white transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-neutral-400 block">$ payload_message:</label>
                      <textarea
                        required
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Enter your message transmission here..."
                        className="w-full px-4 py-2.5 rounded bg-[#07090e] border border-neutral-800 focus:border-[#00f0ff] outline-none text-white transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-[#07090e] font-black text-xs tracking-wider transition-all duration-200 shadow-[0_0_15px_rgba(0,240,255,0.3)] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>$ transmit-packet --send</span>
                    </button>

                  </form>
                )}

              </div>

            </div>

          </div>

        </section>

      </main>

      {/* ========================================================================= */}
      {/* 9. CYBER FOOTER                                                           */}
      {/* ========================================================================= */}
      <footer className="mt-20 border-t border-[#00f0ff]/20 bg-[#0b0f19] py-8 text-xs font-mono text-neutral-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[#00f0ff]">&lt;/&gt;</span>
            <span>&copy; {new Date().getFullYear()} {profile.name} · GITFOLIO_CYBER</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>NODE_ID: #GF-9042</span>
            <span>|</span>
            <a href="#home" className="text-[#00f0ff] hover:underline">
              TOP_OF_BUFFER [^]
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
};
