import React, { useState, useEffect, useMemo } from 'react';
import { PortfolioData, LayoutConfiguration, SkillItem } from '../../types';
import { 
  Terminal, 
  Code2, 
  Cpu, 
  Layers, 
  GitBranch, 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles, 
  Send,
  Zap,
  Globe,
  Radio,
  ChevronRight,
  Database,
  Server,
  Workflow
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CyberOrganicDeveloperPortfolioTemplateProps {
  data: PortfolioData;
  config?: LayoutConfiguration;
}

export const CyberOrganicDeveloperPortfolioTemplate: React.FC<CyberOrganicDeveloperPortfolioTemplateProps> = ({ 
  data, 
  config 
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'experience' | 'projects' | 'skills' | 'contact'>('home');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([
    'system.boot() -> OK',
    'loaded_modules: [React, TypeScript, Next.js, Rust, K8s]',
    'status: READY_FOR_INSPECTION'
  ]);
  const [filterProjectCategory, setFilterProjectCategory] = useState<string>('ALL');

  // Extract and normalize portfolio data safely
  const profile = data?.profile || {
    name: 'Alex Vance',
    title: 'Senior Systems & Full-Stack Engineer',
    bio: 'Architecting high-throughput distributed backends, developer infrastructure, and tactile web interfaces.',
    location: 'San Francisco, CA (UTC-8)',
    email: 'alex.vance@engineering.dev',
    phone: '+1 (555) 234-5678',
    website: 'https://vance.dev',
    profilePhoto: ''
  };

  const about = data?.about || {
    aboutText: 'Specializing in resilient distributed architectures, compiler tooling, and high-performance frontend runtimes. Passionate about cyber-organic design systems that bridge raw code with tactile digital aesthetics.',
    interests: ['Distributed Consensus', 'Rust Runtimes', 'WebGL Shaders', 'Database Internals', 'Open Source Tooling'],
    services: ['System Architecture', 'Full-Stack Web Apps', 'Performance Engineering', 'API Design']
  };

  const experiences = useMemo(() => {
    if (data?.experience && data.experience.length > 0) {
      return data.experience;
    }
    return [
      {
        id: 'exp-1',
        company: 'Vanguard Systems',
        role: 'Staff Infrastructure Engineer',
        duration: '2023 — Present',
        description: 'Led architecture of multi-region event ingestion pipeline processing 2.4M ops/sec with <8ms latency.',
        current: true,
        technologies: ['Rust', 'Go', 'Kubernetes', 'Kafka', 'PostgreSQL'],
        achievements: [
          'Reduced p99 database query latency by 42% via custom zero-copy cache layers',
          'Authored internal distributed tracing framework adopted by 65+ microservices',
          'Managed zero-downtime database migration across 4 global cloud regions'
        ]
      },
      {
        id: 'exp-2',
        company: 'Monolith Cloud Labs',
        role: 'Senior Full-Stack Developer',
        duration: '2021 — 2023',
        description: 'Engineered web-based IDE interfaces, code generation workflows, and collaborative real-time state trees.',
        current: false,
        technologies: ['TypeScript', 'React', 'Node.js', 'WebSockets', 'Tailwind'],
        achievements: [
          'Built web-socket collaborative canvas with CRDT conflict-free delta updates',
          'Increased client-side rendering frame rate from 38fps to 60fps locked',
          'Architected developer CLI with over 180,000 monthly downloads'
        ]
      },
      {
        id: 'exp-3',
        company: 'Apex Digital Studio',
        role: 'Frontend Software Engineer',
        duration: '2019 — 2021',
        description: 'Developed high-precision interactive web applications and modular design systems for enterprise clients.',
        current: false,
        technologies: ['React', 'Next.js', 'GraphQL', 'Docker', 'Jest'],
        achievements: [
          'Shipped 14 high-traffic web applications with 99.99% uptime',
          'Created automated design token compilation engine'
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
        name: 'Aether Distributed KV Engine',
        description: 'LSM-tree key-value store with Raft consensus protocol, WAL snapshotting, and gRPC client bindings.',
        technologies: ['Rust', 'Raft', 'gRPC', 'Protobuf', 'Docker'],
        image: '',
        githubUrl: 'https://github.com',
        liveUrl: 'https://demo.dev',
        featured: true,
        year: '2025',
        status: 'DEPLOYED'
      },
      {
        id: 'proj-2',
        name: 'Nexus Compiler Toolchain',
        description: 'AST parser, bytecode optimizer, and JIT execution playground for a typed domain-specific configuration language.',
        technologies: ['TypeScript', 'WebAssembly', 'React', 'Tailwind'],
        image: '',
        githubUrl: 'https://github.com',
        liveUrl: 'https://demo.dev',
        featured: true,
        year: '2024',
        status: 'ACTIVE'
      },
      {
        id: 'proj-3',
        name: 'HyperMesh Visualizer',
        description: 'Real-time telemetry and 3D network topology inspector rendering real-time packet ingress flows via WebGL.',
        technologies: ['React', 'Three.js', 'WebGL', 'WebSockets', 'Go'],
        image: '',
        githubUrl: 'https://github.com',
        liveUrl: 'https://demo.dev',
        featured: false,
        year: '2024',
        status: 'OPEN_SOURCE'
      },
      {
        id: 'proj-4',
        name: 'Synthetix Audio Canvas',
        description: 'Modular browser-based synthesizer with polyphonic voice routing and interactive signal oscilloscope.',
        technologies: ['Web Audio API', 'Canvas API', 'TypeScript', 'Motion'],
        image: '',
        githubUrl: 'https://github.com',
        liveUrl: 'https://demo.dev',
        featured: false,
        year: '2023',
        status: 'EXPERIMENT'
      }
    ];
  }, [data?.projects]);

  const skills = useMemo(() => {
    if (data?.skills && data.skills.length > 0) {
      return data.skills;
    }
    return [
      { id: 's1', name: 'React / Next.js', category: 'FRONTEND', proficiency: 95 },
      { id: 's2', name: 'TypeScript', category: 'FRONTEND', proficiency: 96 },
      { id: 's3', name: 'Tailwind CSS', category: 'FRONTEND', proficiency: 92 },
      { id: 's4', name: 'WebGL / Three.js', category: 'FRONTEND', proficiency: 84 },
      { id: 's5', name: 'Rust', category: 'BACKEND', proficiency: 88 },
      { id: 's6', name: 'Node.js / Express', category: 'BACKEND', proficiency: 94 },
      { id: 's7', name: 'Go (Golang)', category: 'BACKEND', proficiency: 86 },
      { id: 's8', name: 'Python', category: 'BACKEND', proficiency: 85 },
      { id: 's9', name: 'PostgreSQL', category: 'DATABASES', proficiency: 92 },
      { id: 's10', name: 'Redis / Dragonfly', category: 'DATABASES', proficiency: 90 },
      { id: 's11', name: 'ClickHouse', category: 'DATABASES', proficiency: 80 },
      { id: 's12', name: 'Docker / Containers', category: 'DEVOPS', proficiency: 93 },
      { id: 's13', name: 'Kubernetes', category: 'DEVOPS', proficiency: 85 },
      { id: 's14', name: 'AWS & Cloudflare', category: 'DEVOPS', proficiency: 89 },
      { id: 's15', name: 'Git & CI/CD Actions', category: 'TOOLS', proficiency: 96 },
      { id: 's16', name: 'Linux / Shell Scripting', category: 'TOOLS', proficiency: 94 }
    ];
  }, [data?.skills]);

  // Group skills by category
  const skillsByCategory = useMemo(() => {
    const grouped: Record<string, SkillItem[]> = {};
    skills.forEach((skill) => {
      const cat = (skill.category || 'TECHNICAL').toUpperCase();
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(skill as SkillItem);
    });
    return grouped;
  }, [skills]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleRunCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let response = `bash: command not found: ${cmd}`;
    if (cmd === 'help') {
      response = 'Available: home(), about(), work_history(), projects(), skills(), get_in_touch(), clear, contact, bio';
    } else if (cmd === 'home' || cmd === 'home()') {
      setActiveTab('home');
      response = 'Navigated to home()';
    } else if (cmd === 'about' || cmd === 'about()') {
      setActiveTab('about');
      response = 'Navigated to about()';
    } else if (cmd === 'work' || cmd === 'work_history' || cmd === 'work_history()') {
      setActiveTab('experience');
      response = 'Navigated to work_history()';
    } else if (cmd === 'projects' || cmd === 'projects()') {
      setActiveTab('projects');
      response = 'Navigated to projects()';
    } else if (cmd === 'skills' || cmd === 'skills()') {
      setActiveTab('skills');
      response = 'Navigated to skills()';
    } else if (cmd === 'contact' || cmd === 'get_in_touch' || cmd === 'get_in_touch()') {
      setActiveTab('contact');
      response = `Contact email: ${profile.email}`;
    } else if (cmd === 'clear') {
      setCommandHistory([]);
      setTerminalInput('');
      return;
    }

    setCommandHistory(prev => [...prev.slice(-6), `$ ${cmd}`, response]);
    setTerminalInput('');
  };

  return (
    <div className="min-h-screen bg-[#080b11] text-zinc-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-300 relative overflow-x-hidden">
      
      {/* Background Cyber-Organic Grid Pattern */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(16, 185, 129, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(16, 185, 129, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Subtle radial ambient glow */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[450px] bg-emerald-950/20 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[400px] bg-cyan-950/20 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Top Global Terminal Header */}
      <header className="sticky top-0 z-40 bg-[#080b11]/90 backdrop-blur-md border-b border-emerald-900/30 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs">
          
          {/* Brand / Terminal Identity */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
            </div>
            <span className="text-zinc-500">|</span>
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <Terminal className="w-3.5 h-3.5" />
              <span>{profile.name.toLowerCase().replace(/\s+/g, '_')}.sh</span>
            </div>
            <span className="hidden md:inline px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 text-[10px] text-emerald-300">
              ● SYSTEM_ONLINE
            </span>
          </div>

          {/* Code/Function Navigation System */}
          <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none py-1 sm:py-0 text-[11px]">
            {[
              { id: 'home', label: 'home()' },
              { id: 'about', label: 'about()' },
              { id: 'experience', label: 'work_history()' },
              { id: 'projects', label: 'projects()' },
              { id: 'skills', label: 'skills()' },
              { id: 'contact', label: 'get_in_touch()' }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-2.5 py-1 rounded-md transition-all whitespace-nowrap cursor-pointer ${
                    isActive 
                      ? 'bg-emerald-950 border border-emerald-500/60 text-emerald-300 font-bold shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                  }`}
                >
                  <span className="text-emerald-500/60 mr-1">$</span>
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Quick Terminal Telemetry */}
          <div className="hidden lg:flex items-center gap-3 text-[10px] text-zinc-500">
            <span>LATENCY: <strong className="text-emerald-400 font-normal">14ms</strong></span>
            <span>ENV: <strong className="text-cyan-400 font-normal">PROD</strong></span>
            <span>V2.4.0</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 relative z-10 space-y-16 sm:space-y-24">

        {/* ========================================================================= */}
        {/* 1. HERO SECTION (Code-driven terminal intro + editorial serif headline) */}
        {/* ========================================================================= */}
        <section className="space-y-8">
          
          {/* Metadata Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-400 border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">00</span>
              <span className="text-zinc-600">//</span>
              <span className="uppercase tracking-widest text-zinc-300 font-semibold">TERMINAL_RUNTIME</span>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1.5 text-zinc-400">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                {profile.location}
              </span>
              <span className="text-zinc-700">|</span>
              <span className="text-emerald-400">
                const status = <span className="text-amber-300">"OPEN_TO_WORK"</span>;
              </span>
            </div>
          </div>

          {/* Main Hero Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{profile.title}</span>
              </div>

              {/* Serif Headline with Code Syntax Accents */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-white leading-[1.12] tracking-tight">
                Architecting <span className="italic text-emerald-400 font-serif">resilient systems</span> & expressive code interfaces.
              </h1>

              <p className="text-zinc-300 text-base sm:text-lg max-w-2xl leading-relaxed font-sans">
                {profile.bio || about.aboutText}
              </p>

              {/* Action Buttons in Terminal Execution Style */}
              <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
                <button
                  onClick={() => setActiveTab('projects')}
                  className="px-5 py-3 rounded-lg bg-emerald-500 text-zinc-950 font-bold hover:bg-emerald-400 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer"
                >
                  <Code2 className="w-4 h-4 text-zinc-950" />
                  <span>$ view_case_files()</span>
                </button>

                <button
                  onClick={() => setActiveTab('contact')}
                  className="px-5 py-3 rounded-lg bg-zinc-900 border border-zinc-700 hover:border-emerald-500/60 text-zinc-200 hover:text-emerald-300 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>$ execute_contact()</span>
                </button>

                <button
                  onClick={handleCopyEmail}
                  className="px-4 py-3 rounded-lg bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 transition-all flex items-center gap-2 cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">email_copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>copy_email()</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Quick Interactive Terminal Box */}
            <div className="lg:col-span-4 rounded-xl border border-emerald-900/40 bg-zinc-950/90 p-4 font-mono text-xs space-y-3 shadow-xl backdrop-blur-xs">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2 text-[11px] text-zinc-400">
                <div className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                  <span>runtime_shell.rs</span>
                </div>
                <span className="text-emerald-500/80">bash 5.2</span>
              </div>

              {/* Console Output Log */}
              <div className="space-y-1.5 text-[11px] min-h-[110px] text-zinc-300">
                {commandHistory.map((line, idx) => (
                  <div key={idx} className={line.startsWith('$') ? 'text-cyan-300 font-bold' : 'text-zinc-400'}>
                    {line}
                  </div>
                ))}
              </div>

              {/* Console Input Prompt */}
              <form onSubmit={handleRunCommand} className="pt-2 border-t border-zinc-800 flex items-center gap-2">
                <span className="text-emerald-400 font-bold">{'>'}</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="type 'help' or function..."
                  className="w-full bg-transparent text-emerald-300 text-xs focus:outline-none placeholder:text-zinc-600 font-mono"
                />
                <button type="submit" className="text-zinc-500 hover:text-emerald-400 p-1 cursor-pointer">
                  <Send className="w-3 h-3" />
                </button>
              </form>

              <div className="text-[9.5px] text-zinc-600 pt-1">
                Tip: try <code className="text-emerald-500/80">projects()</code>, <code className="text-emerald-500/80">about()</code>, or <code className="text-emerald-500/80">contact</code>
              </div>
            </div>
          </div>

          {/* Quick Technical Telemetry Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 font-mono">
            <div className="p-3.5 rounded-lg bg-zinc-950/70 border border-zinc-800 space-y-1">
              <div className="text-[10px] text-zinc-500 uppercase">EXPERIENCE</div>
              <div className="text-xl font-bold text-white font-serif">6+ Years</div>
              <div className="text-[10px] text-emerald-400">Production Systems</div>
            </div>
            <div className="p-3.5 rounded-lg bg-zinc-950/70 border border-zinc-800 space-y-1">
              <div className="text-[10px] text-zinc-500 uppercase">REPOSITORIES</div>
              <div className="text-xl font-bold text-white font-serif">48+</div>
              <div className="text-[10px] text-cyan-400">Open Source & Enterprise</div>
            </div>
            <div className="p-3.5 rounded-lg bg-zinc-950/70 border border-zinc-800 space-y-1">
              <div className="text-[10px] text-zinc-500 uppercase">DEPLOYMENTS</div>
              <div className="text-xl font-bold text-white font-serif">320+</div>
              <div className="text-[10px] text-amber-400">Continuous Delivery</div>
            </div>
            <div className="p-3.5 rounded-lg bg-zinc-950/70 border border-zinc-800 space-y-1">
              <div className="text-[10px] text-zinc-500 uppercase">SYSTEM UPTIME</div>
              <div className="text-xl font-bold text-white font-serif">99.98%</div>
              <div className="text-[10px] text-emerald-400">SLA Maintained</div>
            </div>
          </div>

        </section>

        {/* ========================================================================= */}
        {/* 2. ABOUT SECTION (Cyber-organic developer bio & philosophy)               */}
        {/* ========================================================================= */}
        <section id="about" className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 border-b border-zinc-800 pb-3">
            <span className="text-emerald-400 font-bold">01</span>
            <span className="text-zinc-600">//</span>
            <span className="uppercase tracking-widest text-zinc-300 font-semibold">ABOUT_DEVELOPER</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
                Software craft rooted in <span className="text-emerald-400 italic">first principles</span>, performance, and clean interfaces.
              </h2>
              <div className="space-y-3 text-zinc-300 text-sm sm:text-base leading-relaxed">
                <p>{about.aboutText}</p>
                <p>
                  I construct reliable software infrastructure from the database layer to the browser interface. 
                  My work balances rigorous system architecture with delightful developer experience and ergonomic typography.
                </p>
              </div>

              {/* Technical Interests Array */}
              <div className="pt-3 space-y-2 font-mono text-xs">
                <span className="text-zinc-400 text-[11px] block">// CORE_AREAS_OF_RESEARCH:</span>
                <div className="flex flex-wrap gap-2">
                  {about.interests.map((item, idx) => (
                    <span 
                      key={idx} 
                      className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs flex items-center gap-1.5"
                    >
                      <span className="text-emerald-400 font-bold">#</span>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Structured Developer Metadata Block */}
            <div className="lg:col-span-5 rounded-xl border border-zinc-800 bg-zinc-950/80 p-5 font-mono text-xs space-y-4">
              <div className="text-emerald-400 text-xs font-bold border-b border-zinc-800 pb-2 flex items-center justify-between">
                <span>struct DeveloperProfile</span>
                <span className="text-zinc-500">v1.0</span>
              </div>

              <div className="space-y-2.5 text-zinc-300 text-[11px] leading-relaxed">
                <div>
                  <span className="text-purple-400">const</span> <span className="text-blue-400">role</span> = <span className="text-amber-300">"{profile.title}"</span>;
                </div>
                <div>
                  <span className="text-purple-400">const</span> <span className="text-blue-400">location</span> = <span className="text-amber-300">"{profile.location}"</span>;
                </div>
                <div>
                  <span className="text-purple-400">const</span> <span className="text-blue-400">philosophy</span> = <span className="text-amber-300">"Simplicity &gt; Cleverness"</span>;
                </div>
                <div>
                  <span className="text-purple-400">const</span> <span className="text-blue-400">primaryLanguages</span> = [
                    <span className="text-emerald-300">"TypeScript"</span>, 
                    <span className="text-emerald-300">"Rust"</span>, 
                    <span className="text-emerald-300">"Go"</span>, 
                    <span className="text-emerald-300">"SQL"</span>
                  ];
                </div>
                <div>
                  <span className="text-purple-400">const</span> <span className="text-blue-400">available</span> = <span className="text-cyan-300">true</span>;
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-[10px] text-zinc-500">
                <span>ENCRYPTION: TLS_1_3</span>
                <span className="text-emerald-400 font-semibold">VERIFIED_DEVELOPER</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. EXPERIENCE SECTION (Technical timeline & system achievements)          */}
        {/* ========================================================================= */}
        <section id="experience" className="space-y-8">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">02</span>
              <span className="text-zinc-600">//</span>
              <span className="uppercase tracking-widest text-zinc-300 font-semibold">WORK_HISTORY()</span>
            </div>
            <span className="text-zinc-500">SORT: CHRONOLOGICAL_DESC</span>
          </div>

          <div className="space-y-6">
            {experiences.map((exp, idx) => (
              <div 
                key={exp.id || idx}
                className="rounded-xl border border-zinc-800/80 bg-zinc-950/70 p-5 sm:p-6 space-y-4 hover:border-emerald-500/40 transition-colors group"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/60 pb-3 font-mono">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                      0{idx + 1}
                    </span>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {exp.role}
                      </h3>
                      <div className="text-xs text-zinc-400 flex items-center gap-2">
                        <span className="text-cyan-400 font-semibold">@{exp.company}</span>
                        {exp.current && (
                          <span className="px-1.5 py-0.2 text-[9px] rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                            CURRENT_POSITION
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-zinc-400 font-mono sm:text-right">
                    {exp.duration}
                  </div>
                </div>

                {/* Description */}
                <p className="text-zinc-300 text-sm leading-relaxed">
                  {exp.description}
                </p>

                {/* Measurable achievements formatted as structured system logs */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-mono text-zinc-500 block uppercase tracking-wider">
                      // MEASURABLE_IMPACT:
                    </span>
                    <ul className="space-y-1 text-xs text-zinc-300">
                      {exp.achievements.map((item, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-2">
                          <span className="text-emerald-400 font-mono mt-0.5">↳</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech stack */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="pt-2 flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
                    <span className="text-zinc-500 text-[10px] mr-1">STACK:</span>
                    {exp.technologies.map((t, tIdx) => (
                      <span 
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 text-[10px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. PROJECTS SECTION (Technical case files & deployment status)             */}
        {/* ========================================================================= */}
        <section id="projects" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-zinc-400 border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">03</span>
              <span className="text-zinc-600">//</span>
              <span className="uppercase tracking-widest text-zinc-300 font-semibold">PROJECT_CASE_FILES()</span>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1 text-[11px]">
              {['ALL', 'DEPLOYED', 'ACTIVE'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilterProjectCategory(f)}
                  className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                    filterProjectCategory === f
                      ? 'bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  [{f}]
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects
              .filter(p => filterProjectCategory === 'ALL' || (p.status || '').toUpperCase().includes(filterProjectCategory))
              .map((project, idx) => (
                <div 
                  key={project.id || idx}
                  className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-4 flex flex-col justify-between hover:border-emerald-500/50 transition-all hover:shadow-[0_0_25px_rgba(16,185,129,0.08)] group"
                >
                  <div className="space-y-3">
                    {/* Top Case File Bar */}
                    <div className="flex items-center justify-between font-mono text-xs border-b border-zinc-800 pb-2.5">
                      <div className="flex items-center gap-2">
                        <FolderGit2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-zinc-400 text-[11px]">FILE_0{idx + 1}.rs</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-[10px] font-bold text-emerald-400">
                        {project.status || 'DEPLOYED'}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl text-white font-normal group-hover:text-emerald-300 transition-colors">
                      {project.name}
                    </h3>

                    <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech stack array */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="pt-2 flex flex-wrap gap-1.5 font-mono text-[10px]">
                        {project.technologies.map((tech, tIdx) => (
                          <span 
                            key={tIdx}
                            className="px-2 py-0.5 rounded bg-zinc-900/90 border border-zinc-800 text-zinc-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions & Links */}
                  <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between font-mono text-xs">
                    <div className="text-[11px] text-zinc-500">
                      YEAR: <span className="text-zinc-400">{project.year || '2025'}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span className="text-[11px]">source()</span>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span className="text-[11px]">demo()</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. SKILLS SECTION (Technical categories & proficiency matrix)             */}
        {/* ========================================================================= */}
        <section id="skills" className="space-y-8">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">04</span>
              <span className="text-zinc-600">//</span>
              <span className="uppercase tracking-widest text-zinc-300 font-semibold">SKILL_SYSTEM()</span>
            </div>
            <span className="text-zinc-500">TOTAL: {skills.length} MODULES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
            {(Object.entries(skillsByCategory) as [string, SkillItem[]][]).map(([categoryName, items]) => (
              <div 
                key={categoryName}
                className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-5 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2 text-emerald-400 font-bold">
                  <div className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-emerald-400" />
                    <span>const {categoryName} = [</span>
                  </div>
                  <span className="text-[10px] text-zinc-500">({items.length})</span>
                </div>

                <div className="space-y-2.5 text-zinc-300 text-xs">
                  {items.map((skill) => (
                    <div key={skill.id} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-200">{skill.name}</span>
                        <span className="text-[10px] text-emerald-400">{skill.proficiency}%</span>
                      </div>
                      <div className="w-full h-1 rounded-full bg-zinc-800 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full" 
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-zinc-500 text-[10px] pt-1">
                  ]; // end_{categoryName.toLowerCase()}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. CONTACT SECTION (Terminal execution & availability dispatch)          */}
        {/* ========================================================================= */}
        <section id="contact" className="rounded-2xl border border-emerald-900/50 bg-gradient-to-b from-zinc-950 to-[#070a10] p-6 sm:p-10 space-y-8 relative overflow-hidden">
          
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 border-b border-zinc-800 pb-3">
            <span className="text-emerald-400 font-bold">05</span>
            <span className="text-zinc-600">//</span>
            <span className="uppercase tracking-widest text-zinc-300 font-semibold">GET_IN_TOUCH()</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
                Ready to execute <span className="italic text-emerald-400 font-serif">new architectures</span> together?
              </h2>
              
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                Currently open for full-time engineering roles, technical advisory, and high-impact contract systems.
              </p>

              {/* Availability bullet points */}
              <div className="space-y-1.5 text-xs font-mono text-zinc-300 pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">●</span>
                  <span>Full-time Senior / Staff Engineering</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400">●</span>
                  <span>Freelance & System Optimization</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-400">●</span>
                  <span>Technical Advisory & Open Source Collaborations</span>
                </div>
              </div>

              {/* Direct email trigger */}
              <div className="pt-4 flex flex-wrap items-center gap-3 font-mono text-xs">
                <a
                  href={`mailto:${profile.email}`}
                  className="px-6 py-3.5 rounded-lg bg-emerald-500 text-zinc-950 font-bold hover:bg-emerald-400 transition-all flex items-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.3)]"
                >
                  <Mail className="w-4 h-4 text-zinc-950" />
                  <span>$ send_transmission({profile.email})</span>
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="px-4 py-3.5 rounded-lg bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-zinc-200 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedEmail ? 'Copied to Clipboard!' : 'Copy Address'}</span>
                </button>
              </div>
            </div>

            {/* Social Network Terminal Card */}
            <div className="lg:col-span-4 rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 font-mono text-xs space-y-3">
              <span className="text-[11px] text-zinc-400 block">// SOCIAL_GATEWAYS:</span>
              
              <div className="space-y-2">
                {data?.socialLinks?.github && (
                  <a
                    href={data.socialLinks.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2.5 rounded bg-zinc-950 border border-zinc-800 hover:border-emerald-500/40 text-zinc-300 hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Github className="w-4 h-4 text-zinc-400" />
                      <span>github.com</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
                  </a>
                )}

                {data?.socialLinks?.linkedin && (
                  <a
                    href={data.socialLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2.5 rounded bg-zinc-950 border border-zinc-800 hover:border-cyan-500/40 text-zinc-300 hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-cyan-400" />
                      <span>linkedin.com</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
                  </a>
                )}

                {data?.socialLinks?.twitter && (
                  <a
                    href={data.socialLinks.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2.5 rounded bg-zinc-950 border border-zinc-800 hover:border-blue-500/40 text-zinc-300 hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Twitter className="w-4 h-4 text-sky-400" />
                      <span>twitter.com</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
                  </a>
                )}
              </div>

              <div className="pt-2 text-[10px] text-zinc-500">
                STATUS: ACCEPTING TRANSMISSIONS
              </div>
            </div>
          </div>

        </section>

      </main>

      {/* Terminal Footer */}
      <footer className="border-t border-zinc-800/80 bg-[#080b11] py-8 text-center font-mono text-xs text-zinc-500 space-y-2">
        <div className="flex items-center justify-center gap-4 text-zinc-400">
          <span>{profile.name}</span>
          <span>·</span>
          <span>Cyber-Organic Terminal</span>
          <span>·</span>
          <span className="text-emerald-400">2026</span>
        </div>
        <div className="text-[10px] text-zinc-600">
          BuildEasy Engine · Powered by TypeScript & Motion
        </div>
      </footer>

    </div>
  );
};
