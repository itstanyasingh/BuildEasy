import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  Github, 
  Linkedin, 
  Twitter, 
  Globe, 
  Mail, 
  MapPin, 
  ArrowRight, 
  Menu, 
  X, 
  Sparkles, 
  ExternalLink,
  Code2,
  Cpu,
  Layers,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { PortfolioData, LayoutConfiguration, SkillItem } from '../../types';

interface CinematicSarangPortfolioTemplateProps {
  data: PortfolioData;
  config?: LayoutConfiguration;
}

export const CinematicSarangPortfolioTemplate: React.FC<CinematicSarangPortfolioTemplateProps> = ({
  data,
  config
}) => {
  const { profile, about, projects, experience, skills, testimonials, articles } = data;
  
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const portraitContainerRef = useRef<HTMLDivElement>(null);

  // Mouse tilt tracking for cinematic 3D portrait card
  const handlePortraitMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!portraitContainerRef.current) return;
    const rect = portraitContainerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Max 10 degrees tilt
    const rX = (mouseY / (height / 2)) * -10;
    const rY = (mouseX / (width / 2)) * 10;
    setTilt({ x: rX, y: rY });
  };

  const handlePortraitMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Group skills by category for customized editorial layout
  const groupedSkills = skills?.reduce((acc: Record<string, SkillItem[]>, skill) => {
    const cat = skill.category || 'General';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {} as Record<string, SkillItem[]>) || {};

  const activeProject = projects?.[activeProjectIndex] || projects?.[0];

  return (
    <div id="cinematic-sarang-portfolio" className="min-h-screen bg-[#060608] text-zinc-100 font-sans selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden">
      
      {/* Cinematic Ambient Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-amber-500/5 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[40%] right-[-10%] w-[60%] h-[60%] rounded-full bg-amber-600/5 blur-[150px] animate-pulse" style={{ animationDuration: '12s' }} />
        <div className="absolute bottom-[10%] left-[20%] w-[45%] h-[45%] rounded-full bg-zinc-800/20 blur-[100px]" />
      </div>

      {/* Header / Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#060608]/70 border-b border-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-mono text-sm tracking-[0.25em] text-zinc-400 uppercase">
              {profile.name || 'Sienna Vale'}
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {['Home', 'Projects', 'Timeline', 'Capabilities', 'About', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-xs font-mono tracking-widest text-zinc-400 hover:text-amber-400 transition-colors duration-300 uppercase"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Contact Trigger */}
          <div className="hidden md:block">
            <a 
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/50 hover:bg-zinc-900 text-xs font-mono tracking-widest text-zinc-300 hover:text-amber-400 rounded-full transition-all duration-300 uppercase"
            >
              <span>Get in touch</span>
              <ArrowRight className="h-3 w-3" />
            </a>
          </div>

          {/* Mobile Menu Btn */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-amber-400 transition-colors"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[73px] bottom-0 z-40 bg-[#060608]/95 backdrop-blur-lg flex flex-col justify-between p-8 md:hidden border-t border-zinc-900"
          >
            <div className="flex flex-col gap-8 mt-4">
              {['Home', 'Projects', 'Timeline', 'Capabilities', 'About', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-serif tracking-wide text-zinc-300 hover:text-amber-400 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
            <div className="border-t border-zinc-800 pt-8 pb-4 flex flex-col gap-4">
              <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">Say Hello</span>
              <a href={`mailto:${profile.email}`} className="text-lg font-serif text-amber-400">{profile.email}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative min-h-[90vh] flex items-center justify-center py-20 px-6 z-10">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Hero Typography & Text Content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8 order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full w-fit"
            >
              <Sparkles className="h-3 w-3 text-amber-400" />
              <span className="text-[10px] font-mono tracking-[0.2em] text-amber-300 uppercase">
                {profile.title || 'Creative Technologist'}
              </span>
            </motion.div>

            <div className="space-y-4">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="block text-zinc-500 font-mono text-sm tracking-widest uppercase"
              >
                SAY HELLO TO
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl xl:text-8xl font-serif font-bold tracking-tight text-white leading-[1.05]"
              >
                {profile.name || 'Sienna Vale'}
              </motion.h1>
            </div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-xl font-light"
            >
              {profile.bio || 'Crafting immersive digital experiences through the intersection of code, cinematography, and 3D design systems.'}
            </motion.p>

            {/* Quick Stats / Info Row */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-8 pt-4 text-xs font-mono text-zinc-500 uppercase tracking-widest"
            >
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-amber-500/60" />
                <span>{profile.location || 'San Francisco, CA'}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                <span>Available for Projects</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-6 pt-4"
            >
              <a 
                href="#projects" 
                className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-mono tracking-widest font-bold uppercase rounded-md transition-all duration-300 shadow-lg shadow-amber-500/10 flex items-center gap-3"
              >
                <span>View Works</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a 
                href="#contact" 
                className="px-8 py-4 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 text-xs font-mono tracking-widest font-bold uppercase rounded-md transition-all duration-300 flex items-center gap-2"
              >
                <span>Let's Talk</span>
              </a>
            </motion.div>
          </div>

          {/* Immersive 3D Tilt Portrait Frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              ref={portraitContainerRef}
              onMouseMove={handlePortraitMouseMove}
              onMouseLeave={handlePortraitMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.1s ease-out'
              }}
              className="relative w-full max-w-[340px] md:max-w-[380px] aspect-[3/4] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl group cursor-pointer"
            >
              {/* Outer Cinematic Letterbox Overlays */}
              <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none" />
              
              {/* Profile Image - Simple editable img element */}
              <img 
                src={profile.profilePhoto || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800'} 
                alt={profile.name}
                className="w-full h-full object-cover grayscale contrast-[1.1] brightness-[0.85] hover:grayscale-0 transition-all duration-700 ease-out scale-105 group-hover:scale-100"
              />

              {/* Cinematic HUD indicators */}
              <div className="absolute inset-4 border border-zinc-500/20 pointer-events-none rounded-lg flex flex-col justify-between p-3">
                <div className="flex justify-between text-[8px] font-mono text-zinc-500 tracking-widest">
                  <span>REC [●]</span>
                  <span>TC 00:42:15</span>
                </div>
                <div className="flex justify-between items-end">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] font-mono text-amber-400 tracking-widest uppercase font-bold">{profile.name}</span>
                    <span className="text-[7px] font-mono text-zinc-400 tracking-widest uppercase">STILLS // CORE_PORTFOLIO</span>
                  </div>
                  <span className="text-[8px] font-mono text-zinc-500">ISO 400</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* About & Philosophy Section */}
      <section id="about" className="py-24 border-t border-zinc-900/40 bg-[#09090c]/50 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Side: Meta label */}
            <div className="lg:col-span-4 space-y-4">
              <span className="text-xs font-mono tracking-[0.25em] text-amber-500 uppercase">01 / PHILOSOPHY</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">The Vision & Creative Focus</h2>
            </div>

            {/* Right Side: Rich Narrative Paragraphs */}
            <div className="lg:col-span-8 space-y-8">
              <p className="text-xl md:text-2xl text-zinc-300 font-serif font-light leading-relaxed">
                {about.aboutText || "I approach the digital landscape as an interactive medium. By utilizing high-end animation systems, spatial computing elements, and structured typography, I seek to build interfaces that are not only highly usable but leave a lasting impression."}
              </p>

              {/* Dynamic Categories list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-zinc-900">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Code2 className="h-5 w-5 text-amber-400" />
                    <span className="text-sm font-mono tracking-wider uppercase text-zinc-200">Creative Engineering</span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Bridging design intuition with programmatic execution. Striving for perfect performance, pixel precision, and complex state flows.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Cpu className="h-5 w-5 text-amber-400" />
                    <span className="text-sm font-mono tracking-wider uppercase text-zinc-200">Interactive Storytelling</span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Framing projects as narrative events. Integrating subtle parallax, scroll transitions, and custom asset layouts to contextualize work.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Selected Projects Showcase */}
      <section id="projects" className="py-28 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4">
              <span className="text-xs font-mono tracking-[0.25em] text-amber-500 uppercase">02 / WORKS</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">Selected Exhibitions</h2>
            </div>
            
            {/* Horizontal Projects Carousel Indicators */}
            {projects && projects.length > 0 && (
              <div className="flex items-center gap-2">
                {projects.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveProjectIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${activeProjectIndex === idx ? 'w-10 bg-amber-500' : 'w-2 bg-zinc-800 hover:bg-zinc-700'}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Active project card with widescreen image, rich layout */}
          {activeProject && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-center bg-[#09090c] border border-zinc-900 rounded-3xl p-6 md:p-8 xl:p-12 overflow-hidden shadow-2xl">
              
              {/* Project widescreen preview container */}
              <div className="lg:col-span-7 relative aspect-[16/10] bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800/80 group">
                <img 
                  src={activeProject.image || 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=1200'}
                  alt={activeProject.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                />
                
                {/* Visual HUD grid layout helper */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded border border-zinc-800/50">
                  <span className="text-[10px] font-mono tracking-widest text-zinc-400">PROJECT {activeProjectIndex + 1}</span>
                </div>
              </div>

              {/* Project Meta Details */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-amber-500 tracking-widest uppercase">{activeProject.year || '2026'}</span>
                    {activeProject.status && (
                      <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-[9px] font-mono tracking-wider text-zinc-400">{activeProject.status}</span>
                    )}
                  </div>

                  <h3 className="text-3xl xl:text-4xl font-serif font-bold text-white tracking-tight">
                    {activeProject.name}
                  </h3>

                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                    {activeProject.description}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-zinc-900">
                  {/* Technologies tags row */}
                  <div>
                    <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">Stack / Infrastructure</span>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.technologies?.map((tech) => (
                        <span key={tech} className="px-2.5 py-1 bg-zinc-950 border border-zinc-900 rounded text-xs text-zinc-300 font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex items-center gap-4 pt-4">
                    {activeProject.liveUrl && (
                      <a 
                        href={activeProject.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono text-xs tracking-wider uppercase font-bold rounded-md transition-colors"
                      >
                        <span>Live Preview</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {activeProject.githubUrl && (
                      <a 
                        href={activeProject.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:border-zinc-700 font-mono text-xs tracking-wider uppercase rounded-md transition-all"
                      >
                        <Github className="h-3.5 w-3.5" />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* Secondary mini grid to pick items instantly */}
          {projects && projects.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {projects.map((proj, idx) => (
                <div 
                  key={proj.id}
                  onClick={() => setActiveProjectIndex(idx)}
                  className={`p-6 rounded-2xl cursor-pointer border transition-all duration-300 ${activeProjectIndex === idx ? 'bg-[#09090c] border-amber-500/30 shadow-lg shadow-amber-500/5' : 'bg-transparent border-zinc-900 hover:border-zinc-800'}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono text-zinc-500">EXHIBITION 0{idx + 1}</span>
                    <span className="text-xs font-mono text-amber-500/80">{proj.year || '2026'}</span>
                  </div>
                  <h4 className="text-lg font-serif font-bold text-white mb-2">{proj.name}</h4>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Experience / Chronological Timeline */}
      <section id="timeline" className="py-24 border-t border-zinc-900/40 bg-[#09090c]/30 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            <div className="lg:col-span-4 space-y-4">
              <span className="text-xs font-mono tracking-[0.25em] text-amber-500 uppercase">03 / TIMELINE</span>
              <h2 className="text-4xl font-serif font-bold text-white tracking-tight">Professional Journey</h2>
              <p className="text-sm text-zinc-400 leading-relaxed font-light max-w-sm">
                Chronological timeline tracking highlights, team collaborations, and structural products built.
              </p>
            </div>

            <div className="lg:col-span-8 space-y-12">
              {experience?.map((exp, index) => (
                <div key={exp.id || index} className="relative pl-8 border-l border-zinc-800/80 pb-2 last:pb-0 group">
                  {/* Timeline dot */}
                  <div className="absolute left-[-5px] top-1.5 h-2 w-2 rounded-full bg-zinc-800 group-hover:bg-amber-500 transition-colors border border-black scale-125" />
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono text-amber-500/80 tracking-widest">{exp.duration}</span>
                    {exp.current && (
                      <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded text-[8px] font-mono text-amber-300 w-fit">ACTIVE ROLE</span>
                    )}
                  </div>

                  <h3 className="text-xl font-serif font-bold text-white mb-1">{exp.role}</h3>
                  <h4 className="text-sm font-mono tracking-wider text-zinc-400 mb-4">{exp.company}</h4>

                  <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl">
                    {exp.description}
                  </p>

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-4">
                      {exp.technologies.map((t) => (
                        <span key={t} className="text-[10px] font-mono text-zinc-500 uppercase px-2 py-0.5 bg-zinc-950 border border-zinc-900 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Skills & Capabilities Overview */}
      <section id="capabilities" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4">
              <span className="text-xs font-mono tracking-[0.25em] text-amber-500 uppercase">04 / CAPABILITIES</span>
              <h2 className="text-4xl font-serif font-bold text-white tracking-tight">Structured Expertise</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.keys(groupedSkills).map((category, catIdx) => {
              const items = groupedSkills[category];
              return (
                <div key={category} className="bg-[#09090c] border border-zinc-900 rounded-2xl p-8 hover:border-zinc-800 transition-all duration-300 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-zinc-900">
                      <span className="text-sm font-mono tracking-widest text-zinc-400 uppercase">{category}</span>
                      <span className="text-xs font-mono text-zinc-600">0{catIdx + 1}</span>
                    </div>

                    <ul className="space-y-4">
                      {items.map((skill) => (
                        <li key={skill.id} className="group">
                          <div className="flex justify-between items-center text-sm mb-2">
                            <span className="text-zinc-300 group-hover:text-amber-400 transition-colors">{skill.name}</span>
                            <span className="text-xs font-mono text-zinc-500">{skill.proficiency}%</span>
                          </div>
                          {/* Custom visual progress track */}
                          <div className="h-1 bg-zinc-950 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-1000"
                              style={{ width: `${skill.proficiency}%` }}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Testimonials / Review Carousel */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-24 border-t border-zinc-900/40 bg-[#09090c]/10 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              <div className="lg:col-span-4 space-y-4">
                <span className="text-xs font-mono tracking-[0.25em] text-amber-500 uppercase">05 / VERDICTS</span>
                <h2 className="text-4xl font-serif font-bold text-white tracking-tight">Client Testimonials</h2>
                <p className="text-sm text-zinc-400 leading-relaxed font-light">
                  Feedback from design studios, product leaders, and collaborators who have experienced Sienna's technical executions.
                </p>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.slice(0, 2).map((item) => (
                  <div key={item.id} className="bg-[#09090c] border border-zinc-900 rounded-2xl p-8 space-y-6 hover:border-zinc-800 transition-all">
                    <MessageSquare className="h-6 w-6 text-amber-500/60" />
                    <p className="text-zinc-300 text-sm italic leading-relaxed font-serif">
                      "{item.content}"
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-zinc-900">
                      {item.avatar && (
                        <img 
                          src={item.avatar} 
                          alt={item.name} 
                          className="h-9 w-9 rounded-full object-cover border border-zinc-800"
                        />
                      )}
                      <div>
                        <span className="block text-xs font-mono text-zinc-200 uppercase tracking-wider">{item.name}</span>
                        <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{item.role} @ {item.company}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>
      )}

      {/* Journal / Writing Section */}
      {articles && articles.length > 0 && (
        <section id="writing" className="py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="flex items-end justify-between mb-16">
              <div className="space-y-4">
                <span className="text-xs font-mono tracking-[0.25em] text-amber-500 uppercase">06 / THOUGHTS</span>
                <h2 className="text-4xl font-serif font-bold text-white tracking-tight">Editorial Writing</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.slice(0, 3).map((art) => (
                <div key={art.id} className="bg-[#09090c] border border-zinc-900 hover:border-zinc-800 rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                      <span>{art.date}</span>
                      {art.category && (
                        <span className="text-amber-500/80 uppercase tracking-widest">{art.category}</span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-serif font-bold text-white group-hover:text-amber-400 transition-colors">
                      {art.title}
                    </h3>
                    
                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3 font-light">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-400 hover:text-amber-400 uppercase tracking-widest pt-6 mt-6 border-t border-zinc-900 w-fit transition-colors">
                    <span>Read Article</span>
                    <ChevronRight className="h-3 w-3" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* Cinematic Final CTA & Social Channels */}
      <section id="contact" className="py-28 border-t border-zinc-950 bg-[#040406] relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-8 space-y-6">
              <span className="text-xs font-mono tracking-[0.25em] text-amber-500 uppercase">07 / OUTBOUND</span>
              <h2 className="text-4xl md:text-6xl xl:text-7xl font-serif font-bold text-white leading-tight tracking-tight">
                Let's build something<br />worth remembering.
              </h2>
              <p className="text-zinc-400 text-base md:text-lg max-w-xl font-light">
                Available for immersive design partnerships, technical consulting, and creative development roles.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-6">
              {profile.email && (
                <a 
                  href={`mailto:${profile.email}`}
                  className="p-8 bg-zinc-950 border border-zinc-900 rounded-2xl flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300"
                >
                  <Mail className="h-8 w-8 text-amber-500/80 mb-6" />
                  <div>
                    <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Direct Correspondence</span>
                    <span className="block text-lg font-serif text-white tracking-wide truncate">{profile.email}</span>
                  </div>
                </a>
              )}

              {/* Social links block */}
              <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-8 flex justify-around">
                {data.socialLinks?.github && (
                  <a 
                    href={data.socialLinks.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-3 text-zinc-400 hover:text-amber-400 hover:bg-zinc-900 rounded-full transition-all duration-300"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                )}
                {data.socialLinks?.linkedin && (
                  <a 
                    href={data.socialLinks.linkedin} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-3 text-zinc-400 hover:text-amber-400 hover:bg-zinc-900 rounded-full transition-all duration-300"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                {data.socialLinks?.twitter && (
                  <a 
                    href={data.socialLinks.twitter} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-3 text-zinc-400 hover:text-amber-400 hover:bg-zinc-900 rounded-full transition-all duration-300"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
                {profile.website && (
                  <a 
                    href={profile.website} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-3 text-zinc-400 hover:text-amber-400 hover:bg-zinc-900 rounded-full transition-all duration-300"
                  >
                    <Globe className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>

          </div>

          <div className="border-t border-zinc-900/50 mt-20 pt-8 flex flex-col md:flex-row items-center justify-between text-[10px] font-mono text-zinc-500 tracking-wider gap-4">
            <span>© {new Date().getFullYear()} {profile.name || 'Sienna Vale'}. ALL RIGHTS RESERVED.</span>
            <div className="flex gap-6">
              <span className="uppercase text-zinc-600">CINEMATIC EDITORIAL V1.0</span>
              <span className="uppercase text-zinc-600">MIT LICENSE REFERENCE</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
