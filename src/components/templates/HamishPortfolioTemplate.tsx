import React, { useState, useRef, useEffect } from 'react';
import { PortfolioData, LayoutConfiguration, ProjectItem, ExperienceItem, SkillItem } from '../../types';
import { DisplacementSphere } from './hamish/DisplacementSphere';
import { DecoderText } from './hamish/DecoderText';
import { Button } from './hamish/Button';
import { FormInput } from './hamish/FormInput';
import { Github, Linkedin, Twitter, Dribbble, ArrowUpRight, Check, Send, Globe, MapPin, Mail, ChevronRight, Menu, X } from 'lucide-react';

interface HamishPortfolioTemplateProps {
  data: PortfolioData;
  config: LayoutConfiguration;
}

export const HamishPortfolioTemplate: React.FC<HamishPortfolioTemplateProps> = ({ data, config }) => {
  const { profile, about, projects, experience, skills, socialLinks, contact } = data;
  const accentColor = config.accentColor || '#00f0ff';
  const hexAccent = accentColor.startsWith('#') ? accentColor : `#${accentColor}`;

  // State management
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  // References for scroll tracking
  const homeRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      if (contactRef.current && scrollPosition >= contactRef.current.offsetTop) {
        setActiveSection('contact');
      } else if (experienceRef.current && scrollPosition >= experienceRef.current.offsetTop) {
        setActiveSection('experience');
      } else if (aboutRef.current && scrollPosition >= aboutRef.current.offsetTop) {
        setActiveSection('about');
      } else if (projectsRef.current && scrollPosition >= projectsRef.current.offsetTop) {
        setActiveSection('projects');
      } else {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLElement | null>, sectionId: string) => {
    setMenuOpen(false);
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-[#030303] text-[#a9b2c3] font-sans overflow-x-hidden selection:bg-[#00f0ff] selection:text-black">
      
      {/* ------------------------------------------------------------
          TECH GRID OVERLAY & AMBIENT BG ORBS
          ------------------------------------------------------------ */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle Horizontal & Vertical Wire Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#141416_1px,transparent_1px),linear-gradient(to_bottom,#141416_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35" />
        
        {/* Continuous Tech Grid Lines Borders */}
        <div className="absolute left-[80px] top-0 bottom-0 w-[1px] bg-[#141416] hidden md:block" />
        <div className="absolute right-[80px] top-0 bottom-0 w-[1px] bg-[#141416] hidden md:block" />
        
        {/* Cyberpunk ambient glowing neon orbs */}
        <div 
          style={{ background: `radial-gradient(circle, ${hexAccent}15 0%, transparent 70%)` }}
          className="absolute -top-[20%] left-[10%] w-[50vw] h-[50vw] blur-[120px]" 
        />
        <div 
          style={{ background: `radial-gradient(circle, ${hexAccent}08 0%, transparent 60%)` }}
          className="absolute bottom-[15%] right-[5%] w-[45vw] h-[45vw] blur-[100px]" 
        />
      </div>

      {/* ------------------------------------------------------------
          FIXED RESPONSIVE SIDE NAVIGATION PANELS
          ------------------------------------------------------------ */}
      {/* Left Social Links Vertical Column */}
      <div className="fixed left-0 bottom-0 w-[80px] top-0 flex-col justify-end items-center pb-12 gap-8 hidden md:flex z-40 mix-blend-difference border-r border-[#101014] border-opacity-50">
        <div className="flex flex-col gap-6 items-center text-xs tracking-widest font-mono uppercase text-[#62626e]">
          {socialLinks?.github && (
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300 transform hover:scale-110">
              <Github size={15} />
            </a>
          )}
          {socialLinks?.linkedin && (
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300 transform hover:scale-110">
              <Linkedin size={15} />
            </a>
          )}
          {socialLinks?.twitter && (
            <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300 transform hover:scale-110">
              <Twitter size={15} />
            </a>
          )}
          {socialLinks?.dribbble && (
            <a href={socialLinks.dribbble} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300 transform hover:scale-110">
              <Dribbble size={15} />
            </a>
          )}
          {/* Vertical Separator Line */}
          <div className="h-20 w-[1px] bg-[#22222a] mt-2" />
        </div>
      </div>

      {/* Right Contact Email Vertical Column */}
      <div className="fixed right-0 bottom-0 w-[80px] top-0 flex-col justify-end items-center pb-12 hidden md:flex z-40 mix-blend-difference border-l border-[#101014] border-opacity-50">
        <div className="flex flex-col gap-6 items-center">
          <a 
            href={`mailto:${profile.email}`} 
            className="font-mono text-[10px] tracking-[0.3em] text-[#62626e] hover:text-white transition-colors duration-300 rotate-90 origin-center whitespace-nowrap mb-24 cursor-pointer"
          >
            {profile.email}
          </a>
          {/* Vertical Separator Line */}
          <div className="h-20 w-[1px] bg-[#22222a]" />
        </div>
      </div>

      {/* ------------------------------------------------------------
          HEADER NAVIGATION
          ------------------------------------------------------------ */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-[#030303] bg-opacity-80 backdrop-blur-md z-50 px-6 md:px-16 border-b border-[#141416] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative font-mono font-black text-white text-base tracking-[0.2em] cursor-pointer" onClick={() => scrollToSection(homeRef, 'home')}>
            {profile.name.split(' ')[0]} <span style={{ color: hexAccent }}>.</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-10">
          <button 
            onClick={() => scrollToSection(projectsRef, 'projects')}
            className={`font-mono text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
              activeSection === 'projects' ? 'text-white font-bold' : 'text-[#62626e] hover:text-white'
            }`}
          >
            <span style={{ color: activeSection === 'projects' ? hexAccent : undefined }}>01.</span> Projects
          </button>
          <button 
            onClick={() => scrollToSection(aboutRef, 'about')}
            className={`font-mono text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
              activeSection === 'about' ? 'text-white font-bold' : 'text-[#62626e] hover:text-white'
            }`}
          >
            <span style={{ color: activeSection === 'about' ? hexAccent : undefined }}>02.</span> Details
          </button>
          {experience && experience.length > 0 && (
            <button 
              onClick={() => scrollToSection(experienceRef, 'experience')}
              className={`font-mono text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                activeSection === 'experience' ? 'text-white font-bold' : 'text-[#62626e] hover:text-white'
              }`}
            >
              <span style={{ color: activeSection === 'experience' ? hexAccent : undefined }}>03.</span> Timeline
            </button>
          )}
          <button 
            onClick={() => scrollToSection(contactRef, 'contact')}
            className={`font-mono text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
              activeSection === 'contact' ? 'text-white font-bold' : 'text-[#62626e] hover:text-white'
            }`}
          >
            <span style={{ color: activeSection === 'contact' ? hexAccent : undefined }}>04.</span> Contact
          </button>
        </nav>

        {/* Mobile menu toggle */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white hover:text-[#00f0ff] transition-colors duration-200 z-50 cursor-pointer"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile Drawer Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-[#030303] z-40 flex flex-col justify-center px-8 gap-8">
          <div className="flex flex-col gap-8">
            <button 
              onClick={() => scrollToSection(projectsRef, 'projects')}
              className="font-mono text-xl uppercase tracking-widest text-left flex items-center gap-3 text-white"
            >
              <span style={{ color: hexAccent }}>01.</span> Projects
            </button>
            <button 
              onClick={() => scrollToSection(aboutRef, 'about')}
              className="font-mono text-xl uppercase tracking-widest text-left flex items-center gap-3 text-white"
            >
              <span style={{ color: hexAccent }}>02.</span> Details
            </button>
            {experience && experience.length > 0 && (
              <button 
                onClick={() => scrollToSection(experienceRef, 'experience')}
                className="font-mono text-xl uppercase tracking-widest text-left flex items-center gap-3 text-white"
              >
                <span style={{ color: hexAccent }}>03.</span> Timeline
              </button>
            )}
            <button 
              onClick={() => scrollToSection(contactRef, 'contact')}
              className="font-mono text-xl uppercase tracking-widest text-left flex items-center gap-3 text-white"
            >
              <span style={{ color: hexAccent }}>04.</span> Contact
            </button>
          </div>
          
          <div className="h-[1px] bg-[#1a1a24] w-full my-4" />
          
          <div className="flex gap-6 text-[#62626e]">
            {socialLinks?.github && <a href={socialLinks.github} target="_blank" rel="noopener noreferrer"><Github size={18} /></a>}
            {socialLinks?.linkedin && <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={18} /></a>}
            {socialLinks?.twitter && <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer"><Twitter size={18} /></a>}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------
          SECTION: HOME (HERO)
          ------------------------------------------------------------ */}
      <section 
        ref={homeRef} 
        id="home"
        className="relative min-h-screen pt-20 flex items-center px-6 md:px-24 z-10"
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 justify-between">
          
          {/* Main Hero Typography */}
          <div className="w-full lg:w-[55%] flex flex-col items-start gap-6 relative z-10">
            {/* Cyberpunk watermarked Katakana lettering floating background */}
            <div className="absolute -top-16 -left-4 text-[120px] font-black tracking-tighter text-[#1a1a24] text-opacity-30 select-none font-mono pointer-events-none hidden md:block uppercase leading-none">
              DESIGNER
            </div>

            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.35em] text-white">
              <span className="inline-block h-[1px] w-8 bg-white" />
              <DecoderText text="System Core Initialized" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-none font-sans select-none">
              Hi. I'm {profile.name}
            </h1>

            {/* Subtitle / Role Decoder effect */}
            <div className="min-h-[40px] text-[#8e8e93] font-mono text-sm sm:text-base tracking-wider uppercase">
              <span style={{ color: hexAccent }} className="mr-2">&gt;</span>
              <DecoderText text={profile.title || 'Product Architect / Creative Developer'} delay={1000} />
            </div>

            <p className="text-sm sm:text-base text-[#8e8e93] font-medium leading-relaxed max-w-xl">
              {profile.bio || "I design and build interactive web experiences that reside at the intersection of aesthetic motion and code physics."}
            </p>

            <div className="flex flex-row flex-wrap gap-4 pt-4 w-full sm:w-auto">
              <Button 
                accentColor={accentColor}
                onClick={() => scrollToSection(projectsRef, 'projects')}
                icon={<ChevronRight size={14} />}
              >
                View Projects
              </Button>
              <Button 
                secondary 
                accentColor={accentColor}
                onClick={() => scrollToSection(contactRef, 'contact')}
              >
                Contact Me
              </Button>
            </div>
          </div>

          {/* Large Interactive Displacement Sphere Canvas Box */}
          <div className="w-full lg:w-[45%] h-[40vh] sm:h-[50vh] lg:h-[60vh] relative flex items-center justify-center">
            {/* Outer wire bounds mimicking standard design */}
            <div className="absolute inset-0 border border-[#141416] border-opacity-40 flex items-center justify-center">
              <div className="absolute top-0 left-0 border-l border-t border-[#62626e] border-opacity-40 h-4 w-4" />
              <div className="absolute top-0 right-0 border-r border-t border-[#62626e] border-opacity-40 h-4 w-4" />
              <div className="absolute bottom-0 left-0 border-l border-b border-[#62626e] border-opacity-40 h-4 w-4" />
              <div className="absolute bottom-0 right-0 border-r border-b border-[#62626e] border-opacity-40 h-4 w-4" />
              
              <div className="absolute top-2 left-2 text-[8px] font-mono opacity-25 tracking-[0.2em] text-[#8e8e93]">
                DISPLACEMENT_SPHERE_3D.EXE
              </div>
            </div>

            {/* Actual Render Component */}
            <div className="w-full h-full relative z-10 max-w-[420px] max-h-[420px]">
              <DisplacementSphere accentColor={accentColor} />
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------
          SECTION: PROJECTS
          ------------------------------------------------------------ */}
      <section 
        ref={projectsRef} 
        id="projects"
        className="relative py-24 px-6 md:px-24 border-t border-[#141416] border-opacity-40 z-10"
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-16">
          
          {/* Section Heading */}
          <div className="flex flex-col gap-2 items-start">
            <span style={{ color: hexAccent }} className="font-mono text-xs tracking-[0.3em] uppercase">01. Works</span>
            <h2 className="text-3xl font-black uppercase text-white tracking-tight">
              Featured Projects
            </h2>
            <div className="h-[1px] w-20 mt-4" style={{ background: hexAccent }} />
          </div>

          {/* Staggered Full-bleed Projects Grid List */}
          <div className="flex flex-col gap-24">
            {projects && projects.length > 0 ? (
              projects.map((project: ProjectItem, index: number) => {
                const formattedIndex = String(index + 1).padStart(2, '0');
                const isEven = index % 2 === 0;

                return (
                  <div 
                    key={project.id || index}
                    className={`flex flex-col lg:flex-row items-center gap-12 justify-between ${
                      isEven ? '' : 'lg:flex-row-reverse'
                    }`}
                  >
                    
                    {/* Visual Project Card with Image Hover Effects */}
                    <div className="w-full lg:w-[50%] group relative overflow-hidden aspect-[16/10] bg-[#0c0c12] border border-[#1a1a24] border-opacity-50 flex items-center justify-center">
                      
                      {/* Wire corner accents */}
                      <span className="absolute top-0 left-0 border-l border-t border-[#2d2d3d] h-2 w-2" />
                      <span className="absolute top-0 right-0 border-r border-t border-[#2d2d3d] h-2 w-2" />
                      <span className="absolute bottom-0 left-0 border-l border-b border-[#2d2d3d] h-2 w-2" />
                      <span className="absolute bottom-0 right-0 border-r border-b border-[#2d2d3d] h-2 w-2" />

                      {/* Floating Index Marker */}
                      <div className="absolute top-4 left-4 font-mono text-sm tracking-wider opacity-60 z-20">
                        N°{formattedIndex}
                      </div>

                      {/* Main Image */}
                      {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.name}
                          className="w-[90%] h-[90%] object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out z-10"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        /* Falling Back Vector if no project image provided */
                        <div className="w-[90%] h-[90%] bg-gradient-to-br from-[#101017] to-[#04040a] flex flex-col items-center justify-center z-10 text-center p-6 gap-2">
                          <Globe size={40} className="opacity-20 text-[#8e8e93]" />
                          <span className="font-mono text-xs tracking-wider opacity-40 uppercase">Interactive System Card</span>
                        </div>
                      )}

                      {/* Holographic matrix layer showing on hover */}
                      <div className="absolute inset-0 bg-[#030303] bg-opacity-90 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20 p-8 flex flex-col justify-end gap-4 border-t border-[#00f0ff] border-opacity-30">
                        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#8e8e93]">
                          <span>SEC_CORE_ID //</span>
                          <span style={{ color: hexAccent }}>N°{formattedIndex}</span>
                        </div>
                        <h4 className="text-xl font-bold uppercase text-white font-mono tracking-wide">{project.name}</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies?.map((tech, i) => (
                            <span key={i} className="font-mono text-[9px] uppercase tracking-wider bg-[#10101a] px-2 py-1 text-[#8e8e93] border border-[#1e1e2c]">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Project Information Details */}
                    <div className="w-full lg:w-[42%] flex flex-col items-start gap-4">
                      <div className="font-mono text-xs tracking-widest text-[#62626e] uppercase">
                        Project Details / {project.year || '2026'}
                      </div>
                      <h3 className="text-2xl font-bold uppercase text-white font-sans tracking-wide">
                        {project.name}
                      </h3>
                      <p className="text-sm text-[#8e8e93] leading-relaxed">
                        {project.description || "Interactive solution constructed with meticulous styling variables and custom scrolling shaders to ensure an unforgettable visual rhythm."}
                      </p>

                      <div className="flex flex-wrap gap-2 py-2">
                        {project.technologies?.map((tech, i) => (
                          <span key={i} className="font-mono text-[10px] uppercase tracking-wider text-[#62626e]">
                            #{tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-4 pt-2">
                        {project.liveUrl && (
                          <Button 
                            accentColor={accentColor}
                            onClick={() => window.open(project.liveUrl, '_blank')}
                            icon={<ArrowUpRight size={14} />}
                          >
                            Live Demo
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button 
                            secondary
                            accentColor={accentColor}
                            onClick={() => window.open(project.githubUrl, '_blank')}
                            icon={<Github size={14} />}
                          >
                            Source
                          </Button>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })
            ) : (
              <div className="text-center p-12 border border-[#1a1a24] rounded">
                <span className="font-mono text-xs uppercase opacity-40">No projects added yet</span>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------
          SECTION: ABOUT ME / DETAILS
          ------------------------------------------------------------ */}
      <section 
        ref={aboutRef} 
        id="about"
        className="relative py-24 px-6 md:px-24 border-t border-[#141416] border-opacity-40 z-10"
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-16">
          
          {/* Section Heading */}
          <div className="flex flex-col gap-2 items-start">
            <span style={{ color: hexAccent }} className="font-mono text-xs tracking-[0.3em] uppercase">02. Profile</span>
            <h2 className="text-3xl font-black uppercase text-white tracking-tight">
              About Details
            </h2>
            <div className="h-[1px] w-20 mt-4" style={{ background: hexAccent }} />
          </div>

          <div className="flex flex-col lg:flex-row gap-16 items-start justify-between">
            {/* Biography & Text Details */}
            <div className="w-full lg:w-[50%] flex flex-col gap-6">
              <h3 className="text-xl font-bold uppercase text-white font-mono tracking-wider">
                System Bio
              </h3>
              <p className="text-sm sm:text-base text-[#8e8e93] leading-relaxed">
                {about.aboutText || "I'm a designer specializing in web applications, with a heavy focus on motion, experience design, and accessibility. Leveraging the exact boundaries of engineering and design values to form high-impact brand identities."}
              </p>

              {profile.location && (
                <div className="flex items-center gap-3 font-mono text-xs text-[#8e8e93] bg-[#0c0c12] border border-[#1e1e2a] px-4 py-3 rounded-sm max-w-xs uppercase tracking-wider">
                  <MapPin size={14} style={{ color: hexAccent }} />
                  <span>Located in: {profile.location}</span>
                </div>
              )}

              {/* Skill Items Horizontal Grid */}
              <div className="flex flex-col gap-4 pt-6">
                <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white">Technical Proficiency</h4>
                <div className="grid grid-cols-2 gap-4">
                  {skills && skills.length > 0 ? (
                    skills.map((skill: SkillItem, i: number) => (
                      <div 
                        key={skill.id || i}
                        className="flex flex-col gap-1 bg-[#07070a] border-l-2 p-3 border-[#1e1e24] hover:border-[#00f0ff] transition-colors duration-300 group"
                      >
                        <span className="font-mono text-xs uppercase text-[#8e8e93] group-hover:text-white transition-colors duration-300">
                          {skill.name}
                        </span>
                        {/* Static Matrix Progress indicator instead of percent figures */}
                        <div className="flex gap-0.5 mt-1.5">
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((block) => (
                            <span 
                              key={block}
                              style={{ 
                                background: block <= Math.round(skill.proficiency / 12) ? hexAccent : '#1a1a24',
                                opacity: block <= Math.round(skill.proficiency / 12) ? 0.8 : 0.2
                              }}
                              className="h-1.5 w-3 transition-all duration-300"
                            />
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    ['React', 'Three.js', 'Framer Motion', 'TypeScript'].map((tech, i) => (
                      <div key={i} className="bg-[#07070a] p-3 border-l-2 border-[#1e1e24] font-mono text-xs uppercase text-[#8e8e93]">
                        {tech}
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>

            {/* Avatar / Brand Image with cyberpunk brackets */}
            <div className="w-full lg:w-[40%] flex justify-center lg:justify-end items-center relative py-8">
              <div className="relative w-full max-w-[320px] aspect-square bg-[#0c0c12] p-4 border border-[#1a1a24]">
                {/* Cyberpunk outer bracket design */}
                <div className="absolute top-0 left-0 h-6 w-6 border-l-2 border-t-2" style={{ borderColor: hexAccent }} />
                <div className="absolute top-0 right-0 h-6 w-6 border-r-2 border-t-2" style={{ borderColor: hexAccent }} />
                <div className="absolute bottom-0 left-0 h-6 w-6 border-l-2 border-b-2" style={{ borderColor: hexAccent }} />
                <div className="absolute bottom-0 right-0 h-6 w-6 border-r-2 border-b-2" style={{ borderColor: hexAccent }} />
                
                {profile.profilePhoto ? (
                  <img 
                    src={profile.profilePhoto} 
                    alt={profile.name}
                    className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-300"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-[#050508] border border-[#14141c]">
                    <div className="h-16 w-16 rounded-full border border-dashed border-[#62626e] border-opacity-30 flex items-center justify-center font-mono text-xs opacity-55">
                      USR_SYS
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-widest opacity-40">System Image Unavailable</span>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------
          SECTION: EXPERIENCE TIMELINE
          ------------------------------------------------------------ */}
      {experience && experience.length > 0 && (
        <section 
          ref={experienceRef} 
          id="experience"
          className="relative py-24 px-6 md:px-24 border-t border-[#141416] border-opacity-40 z-10"
        >
          <div className="w-full max-w-7xl mx-auto flex flex-col gap-16">
            
            {/* Section Heading */}
            <div className="flex flex-col gap-2 items-start">
              <span style={{ color: hexAccent }} className="font-mono text-xs tracking-[0.3em] uppercase">03. History</span>
              <h2 className="text-3xl font-black uppercase text-white tracking-tight">
                Work Experience
              </h2>
              <div className="h-[1px] w-20 mt-4" style={{ background: hexAccent }} />
            </div>

            {/* Custom Cyberpunk chronological timeline layout */}
            <div className="flex flex-col gap-12 relative pl-8 md:pl-12 border-l border-[#1a1a24]">
              {experience.map((item: ExperienceItem, i: number) => (
                <div key={item.id || i} className="relative group">
                  {/* Glowing vertical node anchor */}
                  <div 
                    style={{ background: '#030303', borderColor: hexAccent }}
                    className="absolute -left-[38px] md:-left-[54px] top-1.5 h-4 w-4 rounded-full border-2 transition-all duration-300 group-hover:scale-125 z-10" 
                  />

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold uppercase text-white font-mono tracking-wide">
                        {item.role}
                      </h3>
                      <span className="font-mono text-xs text-[#62626e]">@</span>
                      <span style={{ color: hexAccent }} className="font-mono text-xs uppercase tracking-wider font-bold">
                        {item.company}
                      </span>
                    </div>
                    <div className="font-mono text-xs text-[#62626e] uppercase bg-[#0c0c12] border border-[#1e1e2a] px-3 py-1 rounded-sm">
                      {item.duration}
                    </div>
                  </div>

                  <p className="text-sm text-[#8e8e93] leading-relaxed max-w-4xl">
                    {item.description}
                  </p>

                  {item.achievements && item.achievements.length > 0 && (
                    <ul className="mt-4 flex flex-col gap-2 max-w-3xl pl-4 border-l border-[#1e1e28]">
                      {item.achievements.map((ach, achIdx) => (
                        <li key={achIdx} className="text-xs text-[#62626e] flex items-start gap-2 leading-relaxed">
                          <span style={{ color: hexAccent }}>✦</span>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* ------------------------------------------------------------
          SECTION: CONTACT FORM
          ------------------------------------------------------------ */}
      <section 
        ref={contactRef} 
        id="contact"
        className="relative py-24 px-6 md:px-24 border-t border-[#141416] border-opacity-40 z-10"
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-16">
          
          {/* Section Heading */}
          <div className="flex flex-col gap-2 items-start">
            <span style={{ color: hexAccent }} className="font-mono text-xs tracking-[0.3em] uppercase">04. Message</span>
            <h2 className="text-3xl font-black uppercase text-white tracking-tight">
              Get In Touch
            </h2>
            <div className="h-[1px] w-20 mt-4" style={{ background: hexAccent }} />
          </div>

          <div className="flex flex-col lg:flex-row gap-16 items-start justify-between">
            {/* Information card on the left */}
            <div className="w-full lg:w-[40%] flex flex-col gap-8">
              <h3 className="text-xl font-bold uppercase text-white font-mono tracking-wider">
                System Address
              </h3>
              <p className="text-sm text-[#8e8e93] leading-relaxed">
                {contact?.messagePrompt || "Whether you have an interesting full-stack project or just want to discuss low-latency UI architecture, my portal is always open."}
              </p>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 bg-[#07070a] border border-[#1a1a24] p-4">
                  <Mail size={16} style={{ color: hexAccent }} />
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] uppercase text-[#62626e] tracking-widest">Send mail</span>
                    <a href={`mailto:${profile.email}`} className="text-sm text-white font-mono hover:underline">{profile.email}</a>
                  </div>
                </div>

                {profile.location && (
                  <div className="flex items-center gap-4 bg-[#07070a] border border-[#1a1a24] p-4">
                    <MapPin size={16} style={{ color: hexAccent }} />
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] uppercase text-[#62626e] tracking-widest">Base bounds</span>
                      <span className="text-sm text-white font-mono uppercase">{profile.location}</span>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Cyberpunk Interactive Form on the Right */}
            <div className="w-full lg:w-[50%] bg-[#07070a] border border-[#1a1a24] p-8 relative">
              {/* Corner decor visual markers */}
              <span className="absolute top-0 left-0 h-2 w-2 border-l border-t" style={{ borderColor: hexAccent }} />
              <span className="absolute top-0 right-0 h-2 w-2 border-r border-t" style={{ borderColor: hexAccent }} />
              <span className="absolute bottom-0 left-0 h-2 w-2 border-l border-b" style={{ borderColor: hexAccent }} />
              <span className="absolute bottom-0 right-0 h-2 w-2 border-r border-b" style={{ borderColor: hexAccent }} />

              {formStatus === 'success' ? (
                /* Success Animated Feedback Screen */
                <div className="py-12 flex flex-col items-center justify-center text-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-[#101017] border border-[#00f0ff] flex items-center justify-center text-[#00f0ff]">
                    <Check size={24} />
                  </div>
                  <h4 className="text-xl font-bold uppercase text-white font-mono tracking-wider">
                    <DecoderText text="Payload Transmitted" />
                  </h4>
                  <p className="text-xs text-[#8e8e93] font-mono uppercase tracking-wider max-w-xs leading-relaxed">
                    Message successfully sent to the system core. I will reply to you as soon as my compiler finishes processing.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-8">
                  <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#62626e] border-b border-[#14141c] pb-4">
                    SECURE_PORTAL_ENCRYPTION_ACTIVE.SH
                  </div>

                  <FormInput 
                    id="name"
                    label="Sender Name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    accentColor={accentColor}
                    required
                  />

                  <FormInput 
                    id="email"
                    label="Target Email"
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    accentColor={accentColor}
                    required
                  />

                  <FormInput 
                    id="message"
                    label="Message Content"
                    isTextArea
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    accentColor={accentColor}
                    required
                  />

                  <Button 
                    type="submit" 
                    accentColor={accentColor}
                    disabled={formStatus === 'sending'}
                    icon={formStatus === 'sending' ? <span className="animate-spin inline-block h-3 w-3 border-2 border-white border-t-transparent rounded-full" /> : <Send size={14} />}
                  >
                    {formStatus === 'sending' ? 'Transmitting...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------
          FOOTER / ATTRIBUTION & LICENSE
          ------------------------------------------------------------ */}
      <footer className="py-12 px-6 md:px-24 border-t border-[#141416] bg-[#030303] text-center text-xs text-[#555] font-mono z-10 relative">
        <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="uppercase tracking-widest text-[#555] text-[10px]">
            &copy; {new Date().getFullYear()} {profile.name}. ALL SYSTEM LOGS ACTIVE.
          </div>
          <div className="uppercase tracking-widest text-[#555] text-[10px]">
            Template replication inspired by <a href="https://github.com/HamishMW/portfolio" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 underline">Hamish Williams</a>. Licensed under MIT.
          </div>
        </div>
      </footer>

    </div>
  );
};
