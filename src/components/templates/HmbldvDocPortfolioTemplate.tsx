import React, { useState } from 'react';
import { PortfolioData, LayoutConfiguration } from '../../types';
import { 
  Terminal, 
  BookOpen, 
  Code, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  GitBranch, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Mail, 
  Search, 
  CheckCircle2, 
  FileText, 
  Command, 
  ChevronRight,
  Hash,
  Activity,
  Box,
  Copy,
  Check
} from 'lucide-react';

interface HmbldvDocPortfolioTemplateProps {
  data: PortfolioData;
  config: LayoutConfiguration;
}

export const HmbldvDocPortfolioTemplate: React.FC<HmbldvDocPortfolioTemplateProps> = ({
  data,
  config
}) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [terminalLogs, setTerminalLogs] = useState<Array<{ text: string; type: 'info' | 'success' | 'cmd' }>>([
    { text: 'SYSTEM_BOOT: Initialized Erik Lindqvist Doc Engine v2.8.0-stable', type: 'info' },
    { text: 'Type "help" or "contact <msg>" to send a message to Erik.', type: 'info' }
  ]);

  const profile = data.profile || {
    name: "Erik Lindqvist",
    title: "Staff Systems Architect & Infrastructure Engineer",
    location: "Stockholm, Sweden",
    bio: "Specializing in distributed systems, high-throughput cloud architectures, zero-trust network protocols, and rust compiler tooling.",
    email: "erik.lindqvist@sys-kernel.io",
    profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600"
  };

  const name = profile.name || "Erik Lindqvist";
  const title = profile.title || "Staff Systems Architect & Infrastructure Engineer";
  const location = profile.location || "Stockholm, Sweden";
  const bio = profile.bio || "Specializing in distributed systems, zero-trust cloud architectures, and Rust compiler tooling.";

  const skills = (data.skills && data.skills.length > 0)
    ? data.skills
    : [
        { name: "Distributed Systems & Raft Consensus", category: "Core Architecture", level: 98 },
        { name: "Rust / C++ / Go System Kernels", category: "Languages", level: 95 },
        { name: "Kubernetes & eBPF Observability", category: "Infrastructure", level: 92 },
        { name: "gRPC, Protobuf & Zero-Copy IPC", category: "Networking", level: 94 },
        { name: "PostgreSQL, RocksDB & Redis", category: "Databases", level: 90 },
        { name: "AWS / GCP / Cloud-Native Security", category: "Cloud Security", level: 93 }
      ];

  const rawProjects = (data.projects && data.projects.length > 0)
    ? data.projects
    : [
        {
          title: "HyperMesh Distributed Router",
          description: "A zero-copy gRPC mesh router engine handling 1.2M RPS with sub-millisecond tail latency and automated eBPF failover routes.",
          tags: ["Rust", "eBPF", "gRPC", "Kubernetes", "Linux Kernel"],
          githubUrl: "https://github.com/hmbldv/portfolio-template",
          liveUrl: "https://hypermesh-docs.io",
          category: "Infrastructure RFC"
        },
        {
          title: "ZeroTrust Mesh Gateway",
          description: "eBPF-driven microservice proxy delivering mutual TLS authentication and kernel-level packet inspection without CPU overhead.",
          tags: ["Go", "eBPF", "mTLS", "Envoy", "Security"],
          githubUrl: "https://github.com/hmbldv/portfolio-template",
          liveUrl: "https://zerotrust-gateway.io",
          category: "Security Spec"
        },
        {
          title: "DocEngine Static Wiki Compiler",
          description: "High-performance MDX documentation generator with JetBrains Mono syntax highlighting, AST indexing, and instant client-side search.",
          tags: ["TypeScript", "MDX", "AST", "WebAssembly", "Tailwind"],
          githubUrl: "https://github.com/hmbldv/portfolio-template",
          liveUrl: "https://docengine.dev",
          category: "Tooling RFC"
        }
      ];

  const projects = rawProjects.map(p => ({
    ...p,
    category: (p as any).category || 'Infrastructure RFC',
    tags: Array.isArray(p.tags) ? p.tags : []
  }));

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim();
    const newLogs = [...terminalLogs, { text: `$ ${cmd}`, type: 'cmd' as const }];

    if (cmd.toLowerCase() === 'help') {
      newLogs.push({ text: 'Available commands: help, status, stack, contact <msg>, clear', type: 'info' });
    } else if (cmd.toLowerCase() === 'status') {
      newLogs.push({ text: 'STATUS: 100% Operational | Latency: 1.2ms | Node: stockholm-eu-west-1', type: 'success' });
    } else if (cmd.toLowerCase() === 'stack') {
      newLogs.push({ text: 'STACK: Rust, Go, TypeScript, eBPF, Kubernetes, gRPC, PostgreSQL', type: 'info' });
    } else if (cmd.toLowerCase().startsWith('contact ')) {
      const msg = cmd.substring(8);
      newLogs.push({ text: `SUCCESS: Message delivered to ${name} ("${msg}")`, type: 'success' });
    } else if (cmd.toLowerCase() === 'clear') {
      setTerminalLogs([]);
      setTerminalInput('');
      return;
    } else {
      newLogs.push({ text: `Command not recognized: "${cmd}". Type "help" for instructions.`, type: 'info' });
    }

    setTerminalLogs(newLogs);
    setTerminalInput('');
  };

  const codeSnippet = `// System Architecture Spec v2.8
import { SystemsArchitect } from '@kernel/core';

export const engineer = new SystemsArchitect({
  name: "${name}",
  role: "${title}",
  location: "${location}",
  status: "ACTIVE_CONTRIBUTOR",
  throughput: "1.2M_RPS",
  uptime: "99.999%"
});`;

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-mono selection:bg-[#1f6feb] selection:text-white flex flex-col">
      {/* TOP HEADER & BREADCRUMB BAR */}
      <header className="sticky top-0 z-40 bg-[#161b22]/95 backdrop-blur-md border-b border-[#30363d] px-4 py-2.5 flex items-center justify-between text-xs">
        {/* Left Breadcrumb Trail */}
        <div className="flex items-center gap-2 overflow-x-auto text-[#8b949e]">
          <BookOpen className="w-4 h-4 text-[#58a6ff] shrink-0" />
          <span className="hover:text-[#c9d1d9] transition-colors cursor-pointer">docs</span>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <span className="hover:text-[#c9d1d9] transition-colors cursor-pointer">engineers</span>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <span className="text-[#58a6ff] font-semibold">{name.toLowerCase().replace(/\s+/g, '-')}</span>
          <span className="px-2 py-0.5 rounded-full bg-[#1f6feb]/20 border border-[#1f6feb]/40 text-[#58a6ff] text-[10px] font-bold">
            v2.8.0-stable
          </span>
        </div>

        {/* Right Status & Quick Commands */}
        <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#8b949e]">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0d1117] border border-[#30363d]">
            <span className="w-2 h-2 rounded-full bg-[#3fb950] animate-pulse"></span>
            <span className="text-[#3fb950] font-medium">SYSTEM_ONLINE</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0d1117] border border-[#30363d] text-[#8b949e]">
            <Command className="w-3 h-3" />
            <span>Ctrl + K</span>
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT: SIDEBAR + CONTENT CANVAS */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col lg:flex-row">
        
        {/* LEFT STICKY NAVIGATION SIDEBAR */}
        <aside className="w-full lg:w-72 bg-[#161b22] border-r border-[#30363d] p-4 lg:p-6 shrink-0 flex flex-col gap-6">
          {/* Developer Profile Badge */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-[#0d1117] border border-[#30363d]">
            <img 
              src={profile.profilePhoto} 
              alt={name}
              className="w-11 h-11 rounded-lg object-cover border border-[#30363d] shrink-0" 
            />
            <div className="min-w-0">
              <h2 className="text-sm font-bold text-white truncate">{name}</h2>
              <p className="text-[11px] text-[#8b949e] truncate">{title}</p>
            </div>
          </div>

          {/* Doc Table of Contents Menu */}
          <div className="space-y-4">
            <div>
              <div className="text-[10px] font-bold text-[#8b949e] uppercase tracking-wider mb-2 px-2 flex items-center gap-1.5">
                <FileText className="w-3 h-3 text-[#58a6ff]" />
                <span>DOCUMENTATION INDEX</span>
              </div>
              <nav className="space-y-1 text-xs">
                {[
                  { id: 'overview', label: '01. System Overview', icon: BookOpen },
                  { id: 'stack', label: '02. Technical Specifications', icon: Cpu },
                  { id: 'projects', label: '03. Architecture RFCs & Projects', icon: Layers },
                  { id: 'certifications', label: '04. Credentials & Badges', icon: ShieldCheck },
                  { id: 'changelog', label: '05. System Changelog', icon: GitBranch },
                  { id: 'terminal', label: '06. Contact Console', icon: Terminal },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        const el = document.getElementById(item.id);
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between transition-colors cursor-pointer ${
                        isActive 
                          ? 'bg-[#1f6feb]/20 text-[#58a6ff] border border-[#1f6feb]/40 font-semibold' 
                          : 'text-[#c9d1d9] hover:bg-[#0d1117] hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#58a6ff]' : 'text-[#8b949e]'}`} />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {isActive && <ChevronRight className="w-3 h-3 text-[#58a6ff] shrink-0" />}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quick Metrics */}
            <div className="pt-2 border-t border-[#30363d] space-y-2 text-[11px] text-[#8b949e]">
              <div className="flex justify-between items-center">
                <span>Location:</span>
                <span className="text-white font-medium">{location}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Core Language:</span>
                <span className="text-[#3fb950] font-bold">Rust / C++</span>
              </div>
              <div className="flex justify-between items-center">
                <span>License:</span>
                <span className="text-white">MIT License</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-auto pt-4 border-t border-[#30363d] flex items-center gap-2">
            <a 
              href="https://github.com/hmbldv/portfolio-template" 
              target="_blank" 
              rel="noreferrer"
              className="p-2 rounded-md bg-[#0d1117] border border-[#30363d] text-[#8b949e] hover:text-white hover:border-[#58a6ff] transition-colors"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer"
              className="p-2 rounded-md bg-[#0d1117] border border-[#30363d] text-[#8b949e] hover:text-white hover:border-[#58a6ff] transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a 
              href={`mailto:${profile.email}`} 
              className="p-2 rounded-md bg-[#0d1117] border border-[#30363d] text-[#8b949e] hover:text-white hover:border-[#58a6ff] transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </aside>

        {/* MAIN DOCUMENTATION CONTENT */}
        <main className="flex-1 p-4 sm:p-8 space-y-12 min-w-0 bg-[#0d1117]">
          
          {/* SECTION 1: OVERVIEW / README.md */}
          <section id="overview" className="space-y-6 scroll-mt-20">
            {/* README Header */}
            <div className="border-b border-[#30363d] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-[#8b949e]">
                  <Hash className="w-3.5 h-3.5 text-[#58a6ff]" />
                  <span>README.md</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {name}
                </h1>
                <p className="text-sm text-[#58a6ff]">{title}</p>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 text-[10px]">
                <span className="px-2.5 py-1 rounded bg-[#238636]/20 border border-[#238636] text-[#3fb950] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> build: passing
                </span>
                <span className="px-2.5 py-1 rounded bg-[#1f6feb]/20 border border-[#1f6feb] text-[#58a6ff] font-bold">
                  coverage: 98.4%
                </span>
                <span className="px-2.5 py-1 rounded bg-[#30363d] border border-[#8b949e]/40 text-[#c9d1d9]">
                  {location}
                </span>
              </div>
            </div>

            {/* Bio Paragraph */}
            <div className="p-4 rounded-lg bg-[#161b22] border border-[#30363d] space-y-3 text-xs leading-relaxed text-[#c9d1d9]">
              <div className="text-[11px] font-bold text-[#8b949e] flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#3fb950]" />
                <span>EXECUTIVE TECHNICAL SUMMARY</span>
              </div>
              <p>{bio}</p>
            </div>

            {/* Code Specification Box */}
            <div className="rounded-lg border border-[#30363d] bg-[#161b22] overflow-hidden">
              <div className="px-4 py-2 bg-[#0d1117] border-b border-[#30363d] flex items-center justify-between text-xs text-[#8b949e]">
                <span className="flex items-center gap-2 font-mono">
                  <Code className="w-3.5 h-3.5 text-[#58a6ff]" />
                  architect.ts
                </span>
                <button
                  onClick={() => handleCopyCode(codeSnippet)}
                  className="flex items-center gap-1.5 text-[11px] hover:text-white transition-colors cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-[#3fb950]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-[#e6edf3] overflow-x-auto leading-relaxed">
                <code>{codeSnippet}</code>
              </pre>
            </div>
          </section>

          {/* SECTION 2: TECHNICAL SPECIFICATIONS (SKILLS MATRIX) */}
          <section id="stack" className="space-y-6 scroll-mt-20 border-t border-[#30363d] pt-8">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#58a6ff]" />
              <h2 className="text-xl font-bold text-white">02. Technical Specifications</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skill, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-lg bg-[#161b22] border border-[#30363d] space-y-2 hover:border-[#58a6ff]/50 transition-colors"
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">{skill.name}</span>
                    <span className="text-[#3fb950] font-mono text-[11px]">{skill.level}% proficiency</span>
                  </div>
                  <div className="w-full bg-[#0d1117] rounded-full h-2 overflow-hidden border border-[#30363d]">
                    <div 
                      className="bg-gradient-to-r from-[#1f6feb] to-[#3fb950] h-full rounded-full transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <div className="text-[10px] text-[#8b949e] flex justify-between">
                    <span>Category: {skill.category}</span>
                    <span>Status: OPERATIONAL</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3: ARCHITECTURE RFCS & PROJECTS */}
          <section id="projects" className="space-y-6 scroll-mt-20 border-t border-[#30363d] pt-8">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#58a6ff]" />
              <h2 className="text-xl font-bold text-white">03. Architecture RFCs & Systems</h2>
            </div>

            <div className="space-y-6">
              {projects.map((proj, idx) => (
                <div 
                  key={idx}
                  className="p-5 rounded-lg bg-[#161b22] border border-[#30363d] space-y-4 hover:border-[#58a6ff] transition-all group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#30363d] pb-3">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-[#58a6ff] tracking-wider">
                        RFC-{101 + idx}: {proj.category}
                      </span>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#58a6ff] transition-colors">
                        {proj.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      {proj.githubUrl && (
                        <a 
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 rounded bg-[#0d1117] border border-[#30363d] hover:border-[#58a6ff] text-[#c9d1d9] flex items-center gap-1.5 transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Repo</span>
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a 
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 rounded bg-[#1f6feb]/20 border border-[#1f6feb] text-[#58a6ff] hover:bg-[#1f6feb]/30 flex items-center gap-1.5 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Docs</span>
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-[#c9d1d9] leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.tags.map((tag, tIdx) => (
                      <span 
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-[#0d1117] border border-[#30363d] text-[10px] text-[#8b949e] font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 4: CREDENTIALS & BADGES */}
          <section id="certifications" className="space-y-6 scroll-mt-20 border-t border-[#30363d] pt-8">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#3fb950]" />
              <h2 className="text-xl font-bold text-white">04. Credentials & Security Verification</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "AWS Solutions Architect Pro", hash: "AWS-SAP-8F92A1", status: "VERIFIED" },
                { title: "CKS Security Specialist", hash: "K8S-CKS-4B219C", status: "VERIFIED" },
                { title: "Certified Rust Kernel Dev", hash: "RUST-KRNL-A9D0F1", status: "VERIFIED" }
              ].map((cert, cIdx) => (
                <div key={cIdx} className="p-4 rounded-lg bg-[#161b22] border border-[#30363d] space-y-2">
                  <div className="flex justify-between items-start">
                    <ShieldCheck className="w-5 h-5 text-[#3fb950]" />
                    <span className="px-2 py-0.5 rounded bg-[#238636]/20 border border-[#238636] text-[#3fb950] text-[9px] font-bold">
                      {cert.status}
                    </span>
                  </div>
                  <div className="font-bold text-xs text-white">{cert.title}</div>
                  <div className="text-[10px] text-[#8b949e] font-mono">Hash: {cert.hash}</div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 5: CHANGELOG */}
          <section id="changelog" className="space-y-6 scroll-mt-20 border-t border-[#30363d] pt-8">
            <div className="flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-[#58a6ff]" />
              <h2 className="text-xl font-bold text-white">05. System History & Changelog</h2>
            </div>

            <div className="space-y-4 border-l-2 border-[#30363d] pl-4 ml-2">
              {[
                { version: "v2024.1.0", role: "Staff Systems Architect", company: "Distributed Systems Lab", period: "2023 - Present", desc: "Promoted to Staff Engineer. Architected high-scale mesh router with eBPF failover routing." },
                { version: "v2021.3.0", role: "Principal Cloud Engineer", company: "Klarna / Stockholm", period: "2020 - 2023", desc: "Led zero-trust microservice gateway migration across 400+ production nodes." },
                { version: "v2018.2.0", role: "Systems Engineer", company: "Spotify Engineering", period: "2017 - 2020", desc: "Engineered audio telemetry streaming pipelines in C++ and Rust." }
              ].map((item, idx) => (
                <div key={idx} className="relative space-y-1">
                  <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-[#1f6feb] border-2 border-[#0d1117]"></div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-[#58a6ff]">{item.version}</span>
                    <span className="text-[#8b949e]">•</span>
                    <span className="font-semibold text-white">{item.role} @ {item.company}</span>
                    <span className="text-[10px] text-[#8b949e] font-mono ml-auto">{item.period}</span>
                  </div>
                  <p className="text-xs text-[#c9d1d9]">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 6: CONTACT TERMINAL CONSOLE */}
          <section id="terminal" className="space-y-6 scroll-mt-20 border-t border-[#30363d] pt-8 pb-12">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-[#3fb950]" />
              <h2 className="text-xl font-bold text-white">06. Interactive Contact Console</h2>
            </div>

            <div className="rounded-lg border border-[#30363d] bg-[#0d1117] overflow-hidden">
              <div className="px-4 py-2 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between text-xs text-[#8b949e]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></span>
                  <span className="font-mono text-white text-[11px] ml-2">bash -- erik-contact-terminal</span>
                </div>
                <span>TTY / dev / pts / 1</span>
              </div>

              {/* Terminal Output */}
              <div className="p-4 space-y-2 text-xs font-mono max-h-60 overflow-y-auto">
                {terminalLogs.map((log, lIdx) => (
                  <div 
                    key={lIdx} 
                    className={
                      log.type === 'cmd' 
                        ? 'text-[#58a6ff] font-bold' 
                        : log.type === 'success' 
                          ? 'text-[#3fb950]' 
                          : 'text-[#8b949e]'
                    }
                  >
                    {log.text}
                  </div>
                ))}
              </div>

              {/* Terminal Form Input */}
              <form onSubmit={handleTerminalSubmit} className="border-t border-[#30363d] p-3 bg-[#161b22] flex items-center gap-2">
                <span className="text-[#3fb950] font-bold text-xs">$</span>
                <input 
                  type="text" 
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="Type 'help' or 'contact <your message>'..."
                  className="flex-1 bg-transparent text-xs text-white focus:outline-none font-mono"
                />
                <button 
                  type="submit"
                  className="px-3 py-1 rounded bg-[#1f6feb] text-white text-xs font-semibold hover:bg-[#388bfd] transition-colors cursor-pointer"
                >
                  Exec
                </button>
              </form>
            </div>
          </section>

        </main>
      </div>

      {/* FOOTER BAR */}
      <footer className="border-t border-[#30363d] bg-[#161b22] px-4 py-4 text-center text-xs text-[#8b949e]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            Documentation Template • Inspired by <a href="https://github.com/hmbldv/portfolio-template" target="_blank" rel="noreferrer" className="text-[#58a6ff] hover:underline">hmbldv/portfolio-template</a>
          </div>
          <div>
            Built for {name} • MIT License
          </div>
        </div>
      </footer>
    </div>
  );
};
