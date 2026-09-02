import React, { useState, useEffect, useRef } from 'react';
import { PortfolioData, LayoutConfiguration } from '../../types';
import { 
  Terminal as TerminalIcon, 
  Folder, 
  Code, 
  ArrowUpRight, 
  Copy, 
  Check, 
  Sun, 
  Moon, 
  X, 
  Send, 
  CornerDownLeft, 
  Shield, 
  Cpu, 
  Globe, 
  Mail, 
  Github, 
  Linkedin, 
  Twitter, 
  Activity, 
  Maximize2, 
  Minimize2,
  Terminal,
  Cpu as CpuIcon
} from 'lucide-react';

interface OperatorPortfolioTemplateProps {
  data: PortfolioData;
  config?: LayoutConfiguration;
}

interface TerminalLog {
  text: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system';
}

export const OperatorPortfolioTemplate: React.FC<OperatorPortfolioTemplateProps> = ({ data, config }) => {
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');
  const [activeTab, setActiveTab] = useState<'all' | 'systems' | 'web3' | 'compilers'>('all');
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(true);
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [terminalHistory, setTerminalHistory] = useState<TerminalLog[]>([
    { text: 'OPERATOR SYSTEM v4.19-GENESIS INITIALIZED', type: 'system' },
    { text: 'Type "help" to view list of available operator subroutines.', type: 'output' },
  ]);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [systemTime, setSystemTime] = useState<string>('');
  const [systemLoad, setSystemLoad] = useState<string>('0.24');
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  
  // Simulated message state for contact form
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  const terminalBottomRef = useRef<HTMLDivElement | null>(null);
  const terminalInputRef = useRef<HTMLInputElement | null>(null);

  const profile = data.profile || {};
  const socialLinks = data.socialLinks || {};
  const experienceList = data.experience || [];
  const skillsList = data.skills || [];
  const projectsList = data.projects || [];

  const isDark = themeMode === 'dark';

  // System Time & Simulated Load Generator
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setSystemTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    
    updateTime();
    const timer = setInterval(updateTime, 1000);

    const loadTimer = setInterval(() => {
      setSystemLoad((Math.random() * 0.4 + 0.1).toFixed(2));
    }, 4000);

    return () => {
      clearInterval(timer);
      clearInterval(loadTimer);
    };
  }, []);

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory]);

  const copyEmail = (emailStr: string) => {
    navigator.clipboard.writeText(emailStr);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Process terminal command input
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = terminalInput.trim();
    if (!input) return;

    const cmd = input.toLowerCase().split(' ')[0];
    const newLogs: TerminalLog[] = [
      ...terminalHistory,
      { text: `arden@operator:~$ ${input}`, type: 'input' }
    ];

    switch (cmd) {
      case 'help':
        newLogs.push({
          text: `Available subroutines:
  help      - View this instruction manual
  whoami    - Print personal bio and mission manifest
  projects  - Dump catalog of engineered systems
  skills    - Inspect technical core competencies
  contact   - Query secure direct transmission protocols
  neofetch  - Render system hardware specification report
  system    - Trigger simulated telemetry hardware check
  clear     - Wipe console command logs`,
          type: 'output'
        });
        break;
      case 'whoami':
        newLogs.push({
          text: `IDENTITY: ${profile.name || 'Arden Vale'}
ROLE: ${profile.title || 'System Security Analyst & Full-Stack Compiler Engineer'}
BIO: ${profile.bio || 'Building resilient compilers, custom kernels, and brutalist web architectures. Engineering high-throughput distributed architectures under minimal resource footprints.'}
LOCATION: ${profile.location || 'Cupertino, CA'}`,
          type: 'success'
        });
        break;
      case 'projects':
        newLogs.push({ text: 'RETRIEVING ARTIFACTS...', type: 'system' });
        projectsList.forEach(p => {
          newLogs.push({
            text: `[${p.status || 'STABLE'}] ${p.name} - ${p.description} (${p.technologies?.join(', ')})`,
            type: 'output'
          });
        });
        break;
      case 'skills':
        newLogs.push({ text: 'SCANNING HARDWARE SPECIFICATIONS...', type: 'system' });
        skillsList.forEach(s => {
          newLogs.push({
            text: `  [${s.category || 'CORE'}] ${s.name} : ${'█'.repeat(Math.round((s.proficiency || 90) / 10))}${'░'.repeat(10 - Math.round((s.proficiency || 90) / 10))} ${s.proficiency || 90}%`,
            type: 'output'
          });
        });
        break;
      case 'contact':
        newLogs.push({
          text: `SECURE INBOUND PROTOCOLS:
  Email: ${profile.email || 'arden.vale@operator.sh'}
  Github: ${socialLinks.github || 'https://github.com/LucidAkshay'}
  Linkedin: ${socialLinks.linkedin || '#'}
  Twitter: ${socialLinks.twitter || '#'}`,
          type: 'success'
        });
        break;
      case 'neofetch':
        newLogs.push({
          text: `      .---.       OS: Operator Custom Linux x86_64
     /     \\      KERNEL: 6.1.0-21-brutalist
     | () () |     UPTIME: 12 days, 4 hours, 18 mins
      \\  ^  /      SHELL: bash 5.2.15
       |||||       CPU: Arden-V4 Core Processor (4) @ 3.80GHz
       |||||       MEMORY: 4096MB / 16384MB
                   THEME: Retro Cyber Brutalism`,
          type: 'output'
        });
        break;
      case 'system':
        newLogs.push({ text: 'RUNNING HARDWARE DIAGNOSTIC INTERFACE...', type: 'system' });
        newLogs.push({ text: `  [OK] CORE CHIP TEMPERATURE: 42°C
  [OK] BUFFER KERNEL SHADERS ACTIVE
  [OK] NETWORK THROUGHPUT LATENCY: 12ms
  [OK] MEMORY VOLTAGE REGULATORS CALIBRATED
  [OK] SYSTEM INTEGRITY CHECK SUCCESSFUL`, type: 'success' });
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      default:
        newLogs.push({
          text: `Command not found: "${cmd}". Type "help" to view valid operator subroutines.`,
          type: 'error'
        });
    }

    setTerminalHistory(newLogs);
    setTerminalInput('');
  };

  // Simulated message transmitter
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSendSuccess(true);
      setContactForm({ name: '', email: '', message: '' });
      setTimeout(() => setSendSuccess(false), 4000);
    }, 1500);
  };

  // Filter projects
  const filteredProjects = projectsList.filter(p => {
    if (activeTab === 'all') return true;
    if (activeTab === 'systems') return p.technologies?.some(t => ['Microkernel', 'eBPF', 'Rust', 'C++'].includes(t)) || p.name.toLowerCase().includes('kernel') || p.name.toLowerCase().includes('firewall');
    if (activeTab === 'compilers') return p.technologies?.some(t => ['Astro', 'Compiler', 'Wasm', 'Tailwind'].includes(t)) || p.name.toLowerCase().includes('compiler');
    return true;
  });

  return (
    <div className={`min-h-screen font-mono transition-colors duration-300 selection:bg-black selection:text-white ${
      isDark ? 'bg-[#0A0A0C] text-[#E4E4E7]' : 'bg-[#F4F4F5] text-[#18181B]'
    }`}>
      {/* 1. BRUTALIST GRID GRIDLINE TOP HEADER BANNER */}
      <div className={`border-b-2 flex flex-col md:flex-row items-stretch text-xs overflow-hidden ${
        isDark ? 'border-zinc-800' : 'border-zinc-300'
      }`}>
        <div className={`p-4 md:border-r-2 flex-1 flex items-center justify-between md:justify-start gap-4 ${
          isDark ? 'border-zinc-800' : 'border-zinc-300'
        }`}>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold tracking-wider uppercase">OPERATOR CONSOLE STATUS: ONLINE</span>
          </div>
          <div className="text-[10px] bg-zinc-800/10 dark:bg-white/10 px-2 py-0.5 rounded border border-current font-mono">
            SYS_LOAD: {systemLoad}
          </div>
        </div>

        <div className={`p-4 md:border-r-2 flex items-center justify-between gap-6 font-mono text-[11px] ${
          isDark ? 'border-zinc-800 text-zinc-400' : 'border-zinc-300 text-zinc-600'
        }`}>
          <span>TIME: {systemTime}</span>
        </div>

        <div className="p-4 flex items-center justify-end gap-3">
          <button
            onClick={() => setThemeMode(isDark ? 'light' : 'dark')}
            className={`p-1.5 rounded border flex items-center justify-center transition-colors hover:bg-zinc-800/20 ${
              isDark ? 'border-zinc-800 text-amber-400' : 'border-zinc-300 text-indigo-600'
            }`}
            title="Toggle Operator Visual Mode"
          >
            {isDark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>
          <button
            onClick={() => setIsTerminalOpen(!isTerminalOpen)}
            className={`px-3 py-1.5 rounded border text-[11px] font-bold tracking-tight uppercase flex items-center gap-1.5 transition-colors ${
              isTerminalOpen 
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-black border-transparent' 
                : isDark ? 'border-zinc-800 text-zinc-300 hover:bg-zinc-800' : 'border-zinc-300 text-zinc-800 hover:bg-zinc-200'
            }`}
          >
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>Terminal</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* 2. BRUTALIST MAIN EDITORIAL GRID SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: HERO INFORMATION PANEL (8 columns) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* HERO BLOCK */}
            <div className={`p-6 sm:p-10 border-2 rounded-2xl relative overflow-hidden flex flex-col justify-between min-h-[380px] bg-zinc-500/5 ${
              isDark ? 'border-zinc-800' : 'border-zinc-300 shadow-[6px_6px_0px_0px_rgba(24,24,27,1)]'
            }`}>
              <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-zinc-500 tracking-wider">
                [ SECURE_KERN_V4 ]
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold block">
                    &gt;_ CORE OPERATOR PRINCIPAL
                  </span>
                  <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter uppercase leading-none">
                    {profile.name || 'Arden Vale'}
                  </h1>
                </div>

                <div className={`h-px w-full ${isDark ? 'bg-zinc-800' : 'bg-zinc-300'}`} />

                <h2 className="text-xl sm:text-2xl font-bold text-zinc-500 tracking-tight leading-snug">
                  {profile.title || 'System Security Analyst & Full-Stack Compiler Engineer'}
                </h2>

                <p className="text-sm text-zinc-400 font-mono leading-relaxed max-w-2xl">
                  {profile.bio || 'Building resilient compilers, custom kernels, and brutalist web architectures. Engineering high-throughput distributed architectures under minimal resource footprints.'}
                </p>
              </div>

              <div className="pt-8 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex gap-4">
                  {socialLinks.github && (
                    <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-2 border rounded border-zinc-800 hover:border-white transition-colors" title="Source Core">
                      <Github className="w-4 h-4 text-zinc-400 hover:text-white" />
                    </a>
                  )}
                  {socialLinks.linkedin && (
                    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 border rounded border-zinc-800 hover:border-white transition-colors" title="Signal Core">
                      <Linkedin className="w-4 h-4 text-zinc-400 hover:text-white" />
                    </a>
                  )}
                  {socialLinks.twitter && (
                    <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-2 border rounded border-zinc-800 hover:border-white transition-colors" title="Social Feed">
                      <Twitter className="w-4 h-4 text-zinc-400 hover:text-white" />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => copyEmail(profile.email || 'arden.vale@operator.sh')}
                    className={`px-4 py-2 border rounded text-xs font-bold uppercase tracking-tight flex items-center gap-1.5 transition-colors ${
                      isDark ? 'border-zinc-800 text-zinc-300 hover:bg-zinc-800/40' : 'border-zinc-300 text-zinc-800 hover:bg-zinc-200'
                    }`}
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmail ? 'Copied Link' : 'Copy Email ID'}</span>
                  </button>
                  <a
                    href="#contact-deck"
                    className="px-4 py-2 bg-zinc-900 text-white dark:bg-white dark:text-black hover:bg-zinc-800 transition-colors text-xs font-bold uppercase rounded border border-transparent"
                  >
                    Contact Ops
                  </a>
                </div>
              </div>
            </div>

            {/* EDITORIAL PROJECTS CONTROL & GRID */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-zinc-500" />
                  <span className="text-xs uppercase tracking-widest font-bold">ENGINEERED PROJECTS</span>
                </div>
                <div className="flex gap-2">
                  {(['all', 'systems', 'compilers'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1 rounded border text-[11px] font-bold uppercase tracking-tight transition-colors ${
                        activeTab === tab
                          ? 'bg-zinc-900 text-white dark:bg-white dark:text-black border-transparent'
                          : isDark ? 'border-zinc-800 text-zinc-400 hover:bg-zinc-800' : 'border-zinc-300 text-zinc-600 hover:bg-zinc-200'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* PROJECTS BRUTALIST LIST */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProjects.map((p, idx) => (
                  <div
                    key={p.id || idx}
                    className={`border-2 p-6 rounded-xl space-y-4 flex flex-col justify-between transition-all hover:bg-zinc-500/5 ${
                      isDark ? 'border-zinc-800' : 'border-zinc-300 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold border border-zinc-800 px-2 py-0.5 rounded">
                          {p.status || 'SHIPPED'}
                        </span>
                        <span className="text-xs text-zinc-500 font-mono">
                          {p.year || '2026'}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold uppercase tracking-tight">
                        {p.name}
                      </h3>

                      <p className="text-xs text-zinc-400 font-mono leading-relaxed">
                        {p.description}
                      </p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-zinc-800">
                      <div className="flex flex-wrap gap-1.5">
                        {p.technologies?.map(t => (
                          <span key={t} className="text-[10px] bg-zinc-800/30 dark:bg-zinc-800/50 text-zinc-300 px-2 py-0.5 rounded">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4">
                        {p.liveUrl && (
                          <a
                            href={p.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-bold uppercase tracking-tight flex items-center gap-1 hover:text-white transition-colors"
                          >
                            <span>Initialize</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {p.githubUrl && (
                          <a
                            href={p.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-mono text-zinc-500 hover:text-zinc-300 transition-colors"
                          >
                            [src]
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: TERMINAL & SYSTEM STATUS (4 columns) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* INTERACTIVE TERMINAL CONSOLE */}
            {isTerminalOpen && (
              <div className={`border-2 rounded-xl overflow-hidden flex flex-col transition-all duration-300 ${
                isMaximized ? 'fixed inset-4 z-50 bg-[#0A0A0C] border-zinc-700' : 'h-[440px]'
              } ${
                isDark ? 'border-zinc-800 bg-zinc-950/90 shadow-2xl shadow-black' : 'border-zinc-300 bg-zinc-900 shadow-xl'
              }`}>
                {/* Terminal Header */}
                <div className="bg-zinc-900 px-4 py-2.5 flex items-center justify-between border-b border-zinc-800">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" onClick={() => setIsTerminalOpen(false)}></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 font-bold">OPERATOR TERMINAL</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setIsMaximized(!isMaximized)} className="text-zinc-500 hover:text-white transition-colors">
                      {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                    </button>
                    <button onClick={() => setIsTerminalOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Terminal Log Area */}
                <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-3 scrollbar-thin scrollbar-thumb-zinc-800">
                  {terminalHistory.map((log, index) => (
                    <div 
                      key={index} 
                      className={`whitespace-pre-wrap leading-relaxed ${
                        log.type === 'input' ? 'text-zinc-300' :
                        log.type === 'error' ? 'text-red-400 font-semibold' :
                        log.type === 'success' ? 'text-emerald-400' :
                        log.type === 'system' ? 'text-blue-400 font-bold' : 'text-zinc-400'
                      }`}
                    >
                      {log.text}
                    </div>
                  ))}
                  <div ref={terminalBottomRef} />
                </div>

                {/* Terminal Command Input Form */}
                <form onSubmit={handleTerminalSubmit} className="border-t border-zinc-800 bg-zinc-950 p-2 flex items-center gap-2">
                  <span className="text-xs text-emerald-500 font-mono font-bold pl-2">arden@operator:~$</span>
                  <input
                    ref={terminalInputRef}
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="Type command (e.g. help, whoami, neofetch)..."
                    className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder:text-zinc-700"
                    autoFocus
                  />
                  <button type="submit" className="p-1 text-zinc-500 hover:text-white transition-colors">
                    <CornerDownLeft className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            )}

            {/* TECHNICAL SPECS HARDWARE CARD */}
            <div className={`p-6 border-2 rounded-xl space-y-6 ${
              isDark ? 'border-zinc-800' : 'border-zinc-300 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]'
            }`}>
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <div className="flex items-center gap-2">
                  <CpuIcon className="w-4 h-4 text-zinc-500" />
                  <span className="text-xs uppercase tracking-widest font-bold">SPECS SYSTEM</span>
                </div>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest">v2.10</span>
              </div>

              <div className="space-y-4">
                {skillsList.map((s, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold uppercase tracking-tight">{s.name}</span>
                      <span className="text-[10px] text-zinc-500 font-mono uppercase">{s.category || 'SKILL'}</span>
                    </div>
                    {/* Brutalist ASCII Progress Bar */}
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="text-zinc-500">[</span>
                      <span className="text-zinc-800 dark:text-zinc-300 flex-1 overflow-hidden tracking-tighter">
                        {'#'.repeat(Math.round((s.proficiency || 90) / 10))}
                        {'-'.repeat(10 - Math.round((s.proficiency || 90) / 10))}
                      </span>
                      <span className="text-zinc-500">]</span>
                      <span className="text-[10px] text-zinc-400 font-bold w-8 text-right">{s.proficiency || 90}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* EXPERIENCE TIMELINE GRID */}
            <div className={`p-6 border-2 rounded-xl space-y-6 ${
              isDark ? 'border-zinc-800' : 'border-zinc-300 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]'
            }`}>
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-zinc-500" />
                  <span className="text-xs uppercase tracking-widest font-bold">OPS TIMELINE</span>
                </div>
                <span className="text-[10px] text-zinc-500 uppercase font-mono">RECORD_LOG</span>
              </div>

              <div className="space-y-6">
                {experienceList.map((exp, idx) => (
                  <div key={idx} className="space-y-2 border-l-2 border-zinc-800 pl-4 relative">
                    <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-zinc-950 border-2 border-zinc-800"></div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-xs font-bold uppercase tracking-tight leading-tight">
                        {exp.role}
                      </h4>
                      <span className="text-[9px] font-mono text-zinc-500 bg-zinc-800/10 dark:bg-white/10 px-1.5 py-0.5 rounded">
                        {exp.duration}
                      </span>
                    </div>
                    <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-tight">
                      {exp.company}
                    </p>
                    <p className="text-[11px] text-zinc-400 font-mono leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* 3. BRUTALIST GRID GRIDLINE CONTACT SECURE TRANSMISSION FORM */}
        <div id="contact-deck" className={`border-2 rounded-2xl p-6 sm:p-10 space-y-8 bg-zinc-500/5 ${
          isDark ? 'border-zinc-800' : 'border-zinc-300 shadow-[6px_6px_0px_0px_rgba(24,24,27,1)]'
        }`}>
          <div className="border-b border-zinc-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold block">
                &gt;_ INITIALIZE COMMUNICATIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tighter">
                SECURE OUTBOUND CONNECTION
              </h2>
            </div>
            <div className="text-xs font-mono text-zinc-500">
              CHANNEL_TYPE: DIRECT_SMTP_SSL
            </div>
          </div>

          {sendSuccess ? (
            <div className="border-2 border-emerald-500/40 bg-emerald-500/5 p-6 rounded-xl text-center space-y-2 max-w-xl mx-auto">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                <Check className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400">TRANSMISSION ENCRYPTED & SHIPPED</h3>
              <p className="text-xs text-zinc-400 font-mono">
                Payload was packaged securely. Response telemetry will trigger inside your active inbox channel shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 block">IDENTITY_NAME [TXT]</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="Enter your name..."
                    className={`w-full p-3 border rounded text-xs font-mono focus:outline-none focus:border-white transition-colors bg-transparent ${
                      isDark ? 'border-zinc-800 text-white' : 'border-zinc-300 text-zinc-900'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 block">EMAIL_CHANNEL [TXT]</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="Enter your electronic mail address..."
                    className={`w-full p-3 border rounded text-xs font-mono focus:outline-none focus:border-white transition-colors bg-transparent ${
                      isDark ? 'border-zinc-800 text-white' : 'border-zinc-300 text-zinc-900'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-4 flex flex-col justify-between">
                <div className="space-y-1 flex-1 flex flex-col">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 block">PAYLOAD_MESSAGE [TXT]</label>
                  <textarea
                    required
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Write transmission details..."
                    className={`w-full flex-1 p-3 border rounded text-xs font-mono focus:outline-none focus:border-white transition-colors bg-transparent resize-none ${
                      isDark ? 'border-zinc-800 text-white' : 'border-zinc-300 text-zinc-900'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3 bg-zinc-900 text-white dark:bg-white dark:text-black hover:bg-zinc-800 transition-colors text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded border border-transparent disabled:opacity-50"
                >
                  {isSending ? (
                    <span>ENCRYPTING PAYLOAD...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>DISPATCH COMMUNICATION</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>

      {/* FOOTER */}
      <footer className={`py-8 px-6 border-t border-zinc-800 text-center text-[11px] text-zinc-500 font-mono space-y-2 ${
        isDark ? 'bg-zinc-950/20' : 'bg-zinc-100/30'
      }`}>
        <div>
          CONSOLE ARCHITECTURE &middot; OPERATOR PORTFOLIO SPEC &middot; COPYRIGHT &copy; {new Date().getFullYear()} {profile.name || 'Arden Vale'}
        </div>
        <div className="text-[9px] text-zinc-600 uppercase tracking-widest">
          BUILT UNDER BRUTALIST COMPILER DIRECTIVES &middot; MIT LICENSE
        </div>
      </footer>
    </div>
  );
};
