import React, { useState } from 'react';
import { PortfolioData, LayoutConfiguration } from '../../types';
import { 
  Sparkles, 
  Layers, 
  Code2, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Mail, 
  Send, 
  CheckCircle2, 
  Cpu, 
  Globe, 
  Star, 
  Briefcase, 
  GraduationCap, 
  MapPin, 
  Terminal,
  Filter,
  Check
} from 'lucide-react';

interface AstroGlassPortfolioTemplateProps {
  data: PortfolioData;
  config: LayoutConfiguration;
}

export const AstroGlassPortfolioTemplate: React.FC<AstroGlassPortfolioTemplateProps> = ({
  data,
  config
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const profile = data.profile || {
    name: "Mateo Rossi",
    title: "Senior Glassmorphic UI Engineer & WebGL Architect",
    location: "Milan, Italy",
    bio: "Crafting fluid glassmorphic web experiences, hardware-accelerated WebGL shader interactions, and high-conversion design systems.",
    email: "mateo.rossi@glass-arch.io",
    profilePhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600"
  };

  const name = profile.name || "Mateo Rossi";
  const title = profile.title || "Senior Glassmorphic UI Engineer & WebGL Architect";
  const location = profile.location || "Milan, Italy";
  const bio = profile.bio || "Crafting fluid glassmorphic web experiences, hardware-accelerated WebGL interactions, and high-conversion design systems.";

  const categories = ['All', 'Frontend', 'Full Stack', 'WebGL & AI'];

  const rawProjects = (data.projects && data.projects.length > 0) 
    ? data.projects 
    : [
        {
          title: "Lumina Glass UI Design System",
          description: "A production-ready React & Astro glassmorphism design system featuring translucent backdrop blurs, fluid micro-interactions, and Tailwind CSS primitives.",
          tags: ["Astro", "React", "Tailwind CSS", "Framer Motion"],
          category: "Frontend",
          githubUrl: "https://github.com/Mohammedaljer/astro-portfolio-template",
          liveUrl: "https://lumina-glass.dev",
          stars: 482
        },
        {
          title: "Nexus 3D Shader Canvas",
          description: "Hardware-accelerated Three.js glass sphere particle shader with real-time audio reactivity, cursor-tracking physics, and zero layout shift.",
          tags: ["Three.js", "WebGL", "GLSL", "TypeScript"],
          category: "WebGL & AI",
          githubUrl: "https://github.com/Mohammedaljer/astro-portfolio-template",
          liveUrl: "https://nexus-shader.io",
          stars: 319
        },
        {
          title: "VaporCloud Serverless Proxy",
          description: "High-throughput edge computing engine with real-time analytics dashboards, JWT key rotation, and automated region failover.",
          tags: ["Node.js", "TypeScript", "Redis", "Docker"],
          category: "Full Stack",
          githubUrl: "https://github.com/Mohammedaljer/astro-portfolio-template",
          liveUrl: "https://vaporcloud.net",
          stars: 215
        },
        {
          title: "Aura AI Motion Generator",
          description: "AI-driven CSS keyframe and spring animation synthesizer trained on UI patterns for seamless designer-to-developer handoff.",
          tags: ["Python", "PyTorch", "React", "Vite"],
          category: "WebGL & AI",
          githubUrl: "https://github.com/Mohammedaljer/astro-portfolio-template",
          liveUrl: "https://aura-anim.ai",
          stars: 640
        }
      ];

  const projects = rawProjects.map(p => ({
    ...p,
    category: (p as any).category || 'Frontend',
    tags: Array.isArray(p.tags) ? p.tags : [],
    stars: (p as any).stars || 180
  }));

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const skills = (data.skills && data.skills.length > 0)
    ? data.skills
    : [
        { name: "Astro & Next.js Frameworks", level: 96, category: "Core Frontend" },
        { name: "Glassmorphism & Tailwind CSS", level: 98, category: "UI/UX Architecture" },
        { name: "Three.js & GLSL Shaders", level: 90, category: "Interactive 3D" },
        { name: "TypeScript & State Engines", level: 94, category: "Languages" },
        { name: "Node.js & GraphQL APIs", level: 88, category: "Backend & Systems" },
        { name: "Design Systems & Figma Tokens", level: 92, category: "Design Tooling" }
      ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.trim()) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-hidden">
      
      {/* AMBIENT BACKGROUND GLOW SPOTS (GLASSMORPHIC BACKDROP) */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed top-1/3 right-1/4 w-[28rem] h-[28rem] bg-purple-500/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="fixed bottom-10 left-1/3 w-80 h-80 bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none"></div>

      {/* TOP GLASSMORPHIC NAVIGATION BAR */}
      <header className="sticky top-0 z-50 bg-slate-950/70 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <a href="#hero" className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
              <div className="w-full h-full bg-slate-950/90 rounded-[11px] flex items-center justify-center backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <span className="font-bold text-sm tracking-tight text-white group-hover:text-cyan-300 transition-colors">
              {name}
            </span>
          </a>

          {/* Navigation Items */}
          <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-full backdrop-blur-md text-xs font-medium">
            <a href="#about" className="px-3.5 py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors">
              About
            </a>
            <a href="#skills" className="px-3.5 py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors">
              Skills
            </a>
            <a href="#projects" className="px-3.5 py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors">
              Projects
            </a>
            <a href="#contact" className="px-3.5 py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors">
              Contact
            </a>
          </nav>

          {/* Quick Contact CTA */}
          <a 
            href="#contact"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Get In Touch</span>
          </a>
        </div>
      </header>

      {/* HERO SECTION WITH GLASS CARD */}
      <section id="hero" className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl p-6 sm:p-12 shadow-2xl relative overflow-hidden group">
          
          {/* Subtle Ambient Radial Glow Inside Hero */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
            
            {/* Avatar Profile Frame */}
            <div className="relative shrink-0">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl p-[2px] bg-gradient-to-tr from-cyan-400 via-purple-500 to-emerald-400 shadow-2xl shadow-cyan-500/20">
                <img 
                  src={profile.profilePhoto} 
                  alt={name}
                  className="w-full h-full object-cover rounded-[14px]"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-slate-950/90 border border-white/15 text-[11px] font-mono font-medium text-emerald-400 flex items-center gap-1.5 shadow-lg backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Available for hire</span>
              </div>
            </div>

            {/* Title & Bio Details */}
            <div className="space-y-4 text-center md:text-left flex-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>astro-glass-portfolio v1.0</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Hi, I'm <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 bg-clip-text text-transparent">{name}</span>
              </h1>

              <p className="text-base sm:text-lg text-cyan-200/90 font-medium max-w-2xl">
                {title}
              </p>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                {bio}
              </p>

              {/* Badges & Social Links */}
              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span>{location}</span>
                </div>
                <div className="h-4 w-[1px] bg-white/10 hidden sm:block"></div>
                <div className="flex items-center gap-3">
                  <a 
                    href="https://github.com/Mohammedaljer/astro-portfolio-template" 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-cyan-400/50 hover:bg-white/10 transition-all cursor-pointer"
                    title="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-cyan-400/50 hover:bg-white/10 transition-all cursor-pointer"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a 
                    href={`mailto:${profile.email}`} 
                    className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-cyan-400/50 hover:bg-white/10 transition-all cursor-pointer"
                    title="Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* GLASS METRICS RIBBON */}
          <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="text-xl sm:text-2xl font-bold text-cyan-400 font-mono">7+</div>
              <div className="text-[11px] text-slate-400">Years Experience</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="text-xl sm:text-2xl font-bold text-purple-400 font-mono">45+</div>
              <div className="text-[11px] text-slate-400">Glass UI Projects</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono">1.2K+</div>
              <div className="text-[11px] text-slate-400">GitHub Stars</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="text-xl sm:text-2xl font-bold text-pink-400 font-mono">100%</div>
              <div className="text-[11px] text-slate-400">Client Satisfaction</div>
            </div>
          </div>

        </div>
      </section>

      {/* SKILLS SECTION WITH GLASS TILES */}
      <section id="skills" className="py-12 px-4 sm:px-6 max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Specialized Glass & Web Architecture
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((s, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl space-y-3 hover:border-cyan-500/40 hover:bg-white/10 transition-all group"
            >
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-white group-hover:text-cyan-300 transition-colors">{s.name}</span>
                <span className="text-cyan-400 font-mono text-[11px]">{s.level}%</span>
              </div>
              <div className="w-full bg-slate-900/80 rounded-full h-2 overflow-hidden border border-white/10">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transition-all duration-700"
                  style={{ width: `${s.level}%` }}
                ></div>
              </div>
              <div className="text-[10px] text-slate-400 flex items-center justify-between font-mono">
                <span>{s.category}</span>
                <span className="text-emerald-400 font-medium">Active</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PROJECTS WITH GLASS FILTER TABS */}
      <section id="projects" className="py-12 px-4 sm:px-6 max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>PORTFOLIO SHOWCASE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Featured Glass & WebGL Works
            </h2>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 p-1 rounded-2xl backdrop-blur-md overflow-x-auto text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((p, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl space-y-4 hover:border-cyan-500/50 hover:bg-white/10 transition-all group flex flex-col justify-between shadow-xl relative overflow-hidden"
            >
              {/* Top Accent Stripe */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-400 opacity-60 group-hover:opacity-100 transition-opacity"></div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-[10px]">
                    {p.category}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400 text-[11px] font-mono">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{p.stars}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {p.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {p.description}
                </p>
              </div>

              <div className="space-y-4 pt-2 border-t border-white/10">
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t, tIdx) => (
                    <span key={tIdx} className="px-2.5 py-0.5 rounded-lg bg-slate-900/60 border border-white/10 text-[10px] text-slate-400 font-mono">
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <a 
                    href={p.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source</span>
                  </a>
                  <a 
                    href={p.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION WITH GLASS FORM */}
      <section id="contact" className="py-12 px-4 sm:px-6 max-w-4xl mx-auto space-y-8 pb-20">
        <div className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>LET'S CONNECT</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Start a Glassmorphic Project
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
              Have a web application, design system, or WebGL experience in mind? Send a message directly to {name}.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-6 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto animate-bounce" />
              <h3 className="text-sm font-bold text-white">Message Transmitted!</h3>
              <p className="text-xs text-slate-300">Thank you for reaching out to {name}. Expect a response within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4 max-w-xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors font-sans"
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors font-sans"
                />
              </div>
              <textarea 
                rows={4}
                placeholder="Describe your project, timeline, or inquiry..."
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors font-sans"
              ></textarea>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Glassmorphic Message</span>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            Astro Glassmorphic Portfolio • Based on <a href="https://github.com/Mohammedaljer/astro-portfolio-template" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">Mohammedaljer/astro-portfolio-template</a>
          </div>
          <div>
            Designed for {name} • MIT License
          </div>
        </div>
      </footer>

    </div>
  );
};
