import React, { useState, useEffect, useRef, useMemo } from 'react';
import { PortfolioData, LayoutConfiguration, ProjectItem, ExperienceItem, SkillItem } from '../../types';
import { 
  Github, Linkedin, Twitter, Mail, ExternalLink, ArrowRight, 
  Send, CheckCircle2, AlertCircle, Compass, Code, Briefcase, 
  MapPin, Calendar, Sparkles, ChevronUp, Layers, Check, Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface FolioTemplateProps {
  data: PortfolioData;
  config?: LayoutConfiguration;
}

// -------------------------------------------------------------
// DATA ADAPTER / TRANSFORMER (MANDATORY RULE)
// Translates PortfolioData safely into template structure
// -------------------------------------------------------------
const useFolioAdapter = (data: PortfolioData) => {
  return useMemo(() => {
    const profile = {
      name: data.profile?.name || 'Ayush Singh',
      role: data.profile?.title || 'UI Engineer & Frontend Architect',
      bio: data.profile?.bio || 'Connecting development and design to craft gorgeous, accessible digital experiences.',
      location: data.profile?.location || 'Bangalore, India',
      email: data.profile?.email || 'hello@ayushsingh.co.in',
      avatar: data.profile?.profilePhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    };

    const aboutText = data.about?.aboutText || 
      "I am a software engineer focused on building highly visual, performant web applications. Drawing inspiration from editorial design and interactive graphics, I specialize in design systems, creative coding, and modern frontend architecture.";

    const services = data.about?.services || data.services || [
      'Frontend Development',
      'UI/UX Engineering',
      'Interactive Web Experiences',
      'Design Systems Architecture',
      'Performance Optimization'
    ];

    const projects = (data.projects || []).map((p, index) => ({
      ...p,
      year: p.year || new Date().getFullYear().toString(),
      image: p.image || [
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80'
      ][index % 4],
    }));

    const experience = (data.experience || []).map(exp => ({
      ...exp,
      technologies: exp.technologies || [],
      achievements: exp.achievements || []
    }));

    // Group skills by category for elegant structural display
    const skillsByCategory = (data.skills || []).reduce<{ [key: string]: SkillItem[] }>((acc, skill) => {
      const cat = skill.category || 'Expertise';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(skill);
      return acc;
    }, {});

    const socialLinks = {
      github: data.socialLinks?.github || 'https://github.com',
      linkedin: data.socialLinks?.linkedin || 'https://linkedin.com',
      twitter: data.socialLinks?.twitter || 'https://twitter.com',
      email: data.profile?.email || data.contact?.email || 'hello@ayushsingh.co.in'
    };

    const contact = {
      email: data.contact?.email || profile.email,
      location: data.contact?.location || profile.location,
      phone: data.contact?.phone || '',
      messagePrompt: data.contact?.messagePrompt || "Let's create something extraordinary together."
    };

    return {
      profile,
      aboutText,
      services,
      projects,
      experience,
      skillsByCategory,
      socialLinks,
      contact
    };
  }, [data]);
};

export const FolioTemplate: React.FC<FolioTemplateProps> = ({ data, config }) => {
  const folioData = useFolioAdapter(data);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Custom cursor states for that high-end Awwwards portfolio feel
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorHovered, setCursorHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  // Success state for demo form
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Timeline Scroll Line Progress Ref
  const timelineSectionRef = useRef<HTMLDivElement>(null);
  const [timelineProgress, setTimelineProgress] = useState(0);

  // Active navigation section tracking
  const [activeSection, setActiveSection] = useState('home');

  // Handle mobile detection and custom mouse cursors
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth >= 768) {
        setCursorPos({ x: e.clientX, y: e.clientY });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Track scroll position in the Experience section to draw the SVG timeline path
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineSectionRef.current) return;
      const rect = timelineSectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll progress exclusively inside the experience timeline container
      const elementHeight = rect.height;
      const relativeTop = rect.top;
      
      // Timeline starts drawing when its top crosses the 75% height of viewport
      // and completes when its bottom reaches 25% height of viewport
      const startPoint = viewportHeight * 0.75;
      const endPoint = viewportHeight * 0.25;
      
      const totalScrollableDistance = elementHeight + (startPoint - endPoint);
      const currentPassedDistance = startPoint - relativeTop;
      
      const progress = Math.max(0, Math.min(1, currentPassedDistance / totalScrollableDistance));
      setTimelineProgress(progress);

      // Simple active section tracking based on viewport
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const sRect = el.getBoundingClientRect();
          if (sRect.top <= 150 && sRect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Scroll-triggered fade reveals for premium, coordinated layouts
  useEffect(() => {
    if (isMobile) return;

    // Fade reveal on scroll for editorial sections
    const fadeElements = document.querySelectorAll('.gsap-fade-in');
    fadeElements.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    // Reveal skills progress bars beautifully
    const progressBars = document.querySelectorAll('.gsap-progress-bar');
    progressBars.forEach((bar) => {
      const targetWidth = bar.getAttribute('data-width') || '100%';
      gsap.fromTo(bar,
        { width: '0%' },
        {
          width: targetWidth,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 90%',
          }
        }
      );
    });

    // Clean up GSAP instances when components re-render or unmount (Critical rule)
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile, folioData]);

  // Handle form Submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormError(true);
      setTimeout(() => setFormError(false), 3000);
      return;
    }
    setFormSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-[#08080c] text-white overflow-hidden selection:bg-indigo-500 selection:text-white"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Subtle premium cybernetic grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e1b4b_1px,transparent_1px)] [background-size:32px_32px] opacity-25 pointer-events-none" />
      
      {/* Background ambient light orbs */}
      <div className="absolute top-[20%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-950/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[50vw] h-[50vw] bg-violet-950/20 rounded-full blur-[120px] pointer-events-none" />

      {/* CUSTOM CURSOR (Awwwards design hallmark - only on Desktop) */}
      {!isMobile && (
        <div 
          className="fixed top-0 left-0 w-8 h-8 rounded-full border border-neutral-400 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-100 ease-out"
          style={{
            transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0) scale(${cursorHovered ? 2.5 : 1})`,
            backgroundColor: cursorHovered ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
            borderColor: cursorHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.4)',
            mixBlendMode: cursorHovered ? 'difference' : 'normal',
          }}
        >
          {cursorHovered && cursorText && (
            <span className="text-[6px] font-bold tracking-widest text-white uppercase whitespace-nowrap">
              {cursorText}
            </span>
          )}
        </div>
      )}

      {/* -------------------------------------------------------------
          HEADER & INTERACTIVE STATUS INDICATOR
          ------------------------------------------------------------- */}
      <header className="fixed top-0 left-0 w-full z-40 bg-[#08080c]/80 backdrop-blur-md border-b border-neutral-900/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo / Name */}
          <button 
            onClick={() => scrollToSection('home')}
            className="text-lg font-bold tracking-tight text-white hover:opacity-80 transition-opacity flex items-center gap-2 cursor-pointer group"
          >
            <span className="font-serif italic text-2xl bg-gradient-to-r from-white via-neutral-200 to-indigo-400 bg-clip-text text-transparent group-hover:to-white transition-all duration-300">
              {folioData.profile.name.split(' ')[0]}
            </span>
            <span className="text-xs text-neutral-500 font-mono tracking-widest hidden sm:inline-block">
              / PORTFOLIO
            </span>
          </button>

          {/* Active status indicator badge */}
          <div className="hidden lg:flex items-center gap-3 px-4 py-1.5 rounded-full bg-neutral-900/60 border border-neutral-800/80">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neutral-300"></span>
            </span>
            <span className="text-xs text-neutral-300 font-mono tracking-wider">
              Available for work • {folioData.profile.location}
            </span>
          </div>

          {/* Navigation Menu Links */}
          <nav className="flex items-center gap-6 sm:gap-8">
            {['about', 'skills', 'experience', 'projects', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                onMouseEnter={() => {
                  setCursorHovered(true);
                  setCursorText('Go');
                }}
                onMouseLeave={() => {
                  setCursorHovered(false);
                  setCursorText('');
                }}
                className={`text-xs sm:text-sm font-medium uppercase tracking-widest cursor-pointer transition-all duration-300 ${
                  activeSection === item 
                    ? 'text-white' 
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* -------------------------------------------------------------
          HERO SECTION (Sophisticated, typography-first, high contrast)
          ------------------------------------------------------------- */}
      <section 
        id="home" 
        className="relative min-h-screen pt-28 flex flex-col justify-center items-center px-6 text-center"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Animated small subtitle eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-505/10 border border-indigo-500/20 text-indigo-400 mb-8 animate-fade-in">
            <Sparkles size={12} className="animate-spin-slow" />
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest">
              Interactive Folio Template
            </span>
          </div>

          {/* Massive Display Editorial Name Header */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white mb-6">
            <span className="block font-sans select-none tracking-tighter hover:scale-102 transition-transform duration-500">
              {folioData.profile.name}
            </span>
            <span className="block font-serif italic text-4xl sm:text-6xl md:text-7xl text-neutral-400 mt-2">
              {folioData.profile.role}
            </span>
          </h1>

          {/* Short elegant bio copy constraint */}
          <p className="text-base sm:text-lg md:text-xl text-neutral-400 leading-relaxed max-w-2xl mb-12 select-none">
            {folioData.profile.bio}
          </p>

          {/* Call-to-action custom triggers */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
            <button
              onClick={() => scrollToSection('projects')}
              onMouseEnter={() => {
                setCursorHovered(true);
                setCursorText('View');
              }}
              onMouseLeave={() => {
                setCursorHovered(false);
                setCursorText('');
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition-colors duration-300 flex items-center justify-center gap-2 group cursor-pointer"
            >
              Explore My Projects
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              onMouseEnter={() => {
                setCursorHovered(true);
                setCursorText('Talk');
              }}
              onMouseLeave={() => {
                setCursorHovered(false);
                setCursorText('');
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-850 transition-colors duration-300 font-semibold flex items-center justify-center gap-2 cursor-pointer text-white"
            >
              Get In Touch
            </button>
          </div>
        </div>

        {/* Scrolling helper line indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 select-none">
          <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase">
            Scroll to discover
          </span>
          <div className="w-[1px] h-12 bg-neutral-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-indigo-500 animate-scroll-down" />
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          ABOUT ME SECTION (Split layout, tilt graphic, highlighted text)
          ------------------------------------------------------------- */}
      <section 
        id="about" 
        className="py-32 border-t border-neutral-900/60 bg-[#060609]"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Column: Image wrapper with custom 3D tilt effect */}
            <div className="lg:col-span-5 flex justify-center">
              <TiltWrapper>
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl group cursor-none">
                  {/* Glowing background halo */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  {/* Portrait photo image */}
                  <img 
                    src={folioData.profile.avatar} 
                    alt={folioData.profile.name}
                    className="w-full h-full object-cover grayscale brightness-90 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Geometric border overlay details to look techy/designed */}
                  <div className="absolute top-4 left-4 text-[10px] font-mono text-neutral-500">
                    LAT. 12.9716° N
                  </div>
                  <div className="absolute bottom-4 right-4 text-[10px] font-mono text-neutral-500">
                    LONG. 77.5946° E
                  </div>
                </div>
              </TiltWrapper>
            </div>

            {/* Right Column: Editorial bio copy constraints */}
            <div className="lg:col-span-7 gsap-fade-in">
              <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-400 mb-4">
                01 / Biography
              </h2>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-white mb-8">
                About Me
              </h3>
              
              <div className="space-y-6 text-neutral-400 text-base sm:text-lg leading-relaxed">
                <p className="first-letter:text-5xl first-letter:font-serif first-letter:mr-2 first-letter:float-left first-letter:text-indigo-400 select-none">
                  {folioData.aboutText}
                </p>
                <p className="select-none">
                  Throughout my career, I have collaborated with diverse engineering and design teams to build cohesive design systems that scale. I prioritize accessibility, performance, and semantic clean code, aiming to build websites that are beautiful both inside and out.
                </p>
              </div>

              {/* services/expertises lists with clean hover dots */}
              <div className="mt-12">
                <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4">
                  Areas of Expertise
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {folioData.services.map((service, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center gap-3 text-neutral-300 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover:scale-150 transition-transform duration-300" />
                      <span className="text-sm font-medium tracking-wide group-hover:text-white transition-colors duration-300 select-none">
                        {service}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          SKILLS SECTION (Interactive, non-card styled tags list)
          ------------------------------------------------------------- */}
      <section 
        id="skills" 
        className="py-32 bg-[#08080c] border-t border-neutral-900/60"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-400 mb-4">
              02 / Capabilities
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-white mb-6">
              Skills & Tech Stack
            </h3>
            <p className="text-neutral-400 leading-relaxed text-base sm:text-lg">
              Here is my technical environment. Hover over the expertise pills to inspect my proficiency level. I focus heavily on writing semantic, performant code using the latest ecosystem structures.
            </p>
          </div>

          {/* Grouped skills layout */}
          <div className="space-y-12">
            {Object.keys(folioData.skillsByCategory).map((category, catIdx) => (
              <div 
                key={category} 
                className="border-b border-neutral-900/60 pb-8 gsap-fade-in"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  {/* Category Title Left */}
                  <div className="md:col-span-3">
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block md:mt-2">
                      {category}
                    </span>
                  </div>

                  {/* Skills List Right */}
                  <div className="md:col-span-9 flex flex-wrap gap-3">
                    {folioData.skillsByCategory[category].map((skill) => (
                      <SkillPill key={skill.id} skill={skill} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          EXPERIENCE TIMELINE SECTION WITH SCROLL-DRAWN PATH
          ------------------------------------------------------------- */}
      <section 
        id="experience" 
        ref={timelineSectionRef}
        className="py-32 bg-[#060609] border-t border-neutral-900/60 relative"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-24">
            <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-400 mb-4">
              03 / Chronology
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-white mb-6">
              Professional Experience
            </h3>
            <p className="text-neutral-400 leading-relaxed text-base sm:text-lg">
              My professional milestones. The glowing blue timeline path draws itself downwards in real-time as you scroll through my journey.
            </p>
          </div>

          <div className="relative pl-8 sm:pl-16">
            {/* THE SIGNATURE SCROLL-DRAWN VERTICAL LINE (FOLIO's crowning jewel) */}
            <div className="absolute left-2.5 sm:left-[3.25rem] top-0 bottom-0 w-[2px] bg-neutral-900 rounded pointer-events-none">
              {/* Glowing animated line matching timeline progress */}
              <div 
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-indigo-500 via-violet-500 to-sky-400 transition-all duration-300 ease-out"
                style={{ 
                  height: `${timelineProgress * 100}%`,
                  boxShadow: '0 0 10px rgba(99, 102, 241, 0.5)'
                }}
              />
            </div>

            {/* List of experience items */}
            <div className="space-y-20">
              {folioData.experience.map((exp, idx) => {
                // Determine if this milestone has been reached based on scroll progress
                const itemThreshold = (idx + 0.5) / folioData.experience.length;
                const isReached = timelineProgress >= itemThreshold;

                return (
                  <div 
                    key={exp.id} 
                    className="relative gsap-fade-in select-none group"
                  >
                    {/* Timeline milestone node indicator */}
                    <div 
                      className={`absolute -left-[2.25rem] sm:-left-[4.5rem] top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 pointer-events-none ${
                        isReached 
                          ? 'border-indigo-400 bg-black text-indigo-400 scale-110 shadow-[0_0_12px_rgba(99,102,241,0.4)]' 
                          : 'border-neutral-800 bg-[#060609] text-neutral-700'
                      }`}
                    >
                      <Briefcase size={10} className="stroke-[2.5]" />
                    </div>

                    {/* Content Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
                      {/* Company, Role, and duration */}
                      <div className="lg:col-span-4">
                        <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest block mb-2 font-semibold">
                          {exp.duration}
                        </span>
                        <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-indigo-300 transition-colors duration-300">
                          {exp.role}
                        </h4>
                        <div className="text-sm text-neutral-400 font-mono mt-1 uppercase tracking-wider">
                          {exp.company}
                        </div>
                      </div>

                      {/* Description, achievements, and tech stack */}
                      <div className="lg:col-span-8 text-neutral-400 text-sm sm:text-base leading-relaxed">
                        <p className="mb-4">
                          {exp.description}
                        </p>

                        {/* Accomplishments if available */}
                        {exp.achievements && exp.achievements.length > 0 && (
                          <ul className="space-y-2 mb-6">
                            {exp.achievements.map((ach, aIdx) => (
                              <li key={aIdx} className="flex gap-2 text-xs sm:text-sm text-neutral-300 select-none">
                                <Check size={14} className="text-indigo-400 shrink-0 mt-0.5" />
                                <span>{ach}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Milestones technologies utilized */}
                        {exp.technologies && exp.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-4 select-none">
                            {exp.technologies.map((tech) => (
                              <span 
                                key={tech} 
                                className="text-[10px] font-mono tracking-wider px-2.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-850 text-neutral-400 uppercase hover:text-indigo-300 hover:border-indigo-500/30 transition-colors duration-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          PROJECTS SECTION (3D Tilt-ready elegant display grid)
          ------------------------------------------------------------- */}
      <section 
        id="projects" 
        className="py-32 bg-[#08080c] border-t border-neutral-900/60"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-24">
            <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-400 mb-4">
              04 / Portfolio
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-white mb-6">
              Selected Projects
            </h3>
            <p className="text-neutral-400 leading-relaxed text-base sm:text-lg">
              A curated archive of projects I have designed and engineered. Move your mouse cursor over each project card to interact with the responsive 3D tilt and image parallax.
            </p>
          </div>

          {/* Grid Layout of Project Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {folioData.projects.map((project, idx) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={idx}
                onHoverState={(hovered, text) => {
                  setCursorHovered(hovered);
                  setCursorText(text);
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          CONTACT SECTION (High contrast layout, feedback form)
          ------------------------------------------------------------- */}
      <section 
        id="contact" 
        className="py-32 bg-[#060609] border-t border-neutral-900/60 relative"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Column: Direct contact info & socials */}
            <div className="lg:col-span-5 gsap-fade-in flex flex-col justify-between">
              <div>
                <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-400 mb-4">
                  05 / Connection
                </h2>
                <h3 className="text-4xl sm:text-5xl md:text-6xl font-serif italic text-white mb-8">
                  Let&apos;s talk
                </h3>
                <p className="text-neutral-400 text-base sm:text-lg leading-relaxed mb-12 max-w-md select-none">
                  Have an outstanding idea, an open vacancy, or want to discuss frontend performance? I am always open to collaborating with creative teams.
                </p>

                {/* Info blocks */}
                <div className="space-y-6 select-none">
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 group-hover:text-white group-hover:border-indigo-500/40 transition-colors duration-300">
                      <Mail size={16} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
                        Direct Email
                      </span>
                      <a 
                        href={`mailto:${folioData.contact.email}`}
                        className="text-sm font-semibold tracking-wide text-neutral-300 hover:text-indigo-400 transition-colors duration-300"
                      >
                        {folioData.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
                        Location
                      </span>
                      <span className="text-sm font-semibold tracking-wide text-neutral-300">
                        {folioData.contact.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social grids bottom */}
              <div className="mt-16 lg:mt-0 select-none">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-4">
                  Follow my work
                </span>
                <div className="flex items-center gap-4">
                  <a 
                    href={folioData.socialLinks.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-indigo-500/50 hover:-translate-y-1 transition-all duration-300"
                  >
                    <Github size={18} />
                  </a>
                  <a 
                    href={folioData.socialLinks.linkedin} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-indigo-500/50 hover:-translate-y-1 transition-all duration-300"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a 
                    href={folioData.socialLinks.twitter} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-indigo-500/50 hover:-translate-y-1 transition-all duration-300"
                  >
                    <Twitter size={18} />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Premium floating fields Contact Form */}
            <div className="lg:col-span-7 gsap-fade-in">
              <div className="bg-[#08080c] border border-neutral-900 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
                
                {/* Form feedback statuses */}
                <AnimatePresence mode="wait">
                  {formSubmitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute inset-0 bg-[#08080c] z-10 flex flex-col justify-center items-center text-center p-6"
                    >
                      <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6">
                        <CheckCircle2 size={32} className="animate-bounce" />
                      </div>
                      <h4 className="text-2xl font-bold tracking-tight text-white mb-2">
                        Message Transmitted!
                      </h4>
                      <p className="text-neutral-400 leading-relaxed max-w-sm mb-6 text-sm">
                        Thank you for reaching out. In this template adapter mode, your message is parsed successfully. I will respond to you shortly!
                      </p>
                      <button 
                        onClick={() => setFormSubmitted(false)}
                        className="px-6 py-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-semibold text-white hover:bg-neutral-850 transition-colors duration-300 cursor-pointer"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                <form onSubmit={handleFormSubmit} className="space-y-8">
                  {/* Floating input layout */}
                  <div className="space-y-6">
                    <div className="relative">
                      <input 
                        type="text" 
                        name="name"
                        id="form-name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-transparent border-b border-neutral-850 py-3 text-sm focus:border-indigo-500 outline-none transition-colors duration-300 text-white placeholder-neutral-600"
                        placeholder="Your full name"
                      />
                    </div>

                    <div className="relative">
                      <input 
                        type="email" 
                        name="email"
                        id="form-email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-transparent border-b border-neutral-850 py-3 text-sm focus:border-indigo-500 outline-none transition-colors duration-300 text-white placeholder-neutral-600"
                        placeholder="Your email address"
                      />
                    </div>

                    <div className="relative">
                      <textarea 
                        name="message"
                        id="form-message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-transparent border-b border-neutral-850 py-3 text-sm focus:border-indigo-500 outline-none transition-colors duration-300 text-white placeholder-neutral-600 resize-none"
                        placeholder="Brief project details or inquiry"
                      />
                    </div>
                  </div>

                  {/* Error messages if failed */}
                  {formError && (
                    <div className="flex items-center gap-2 text-xs text-rose-400 font-mono animate-pulse">
                      <AlertCircle size={14} />
                      <span>Please complete all fields prior to sending.</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    onMouseEnter={() => {
                      setCursorHovered(true);
                      setCursorText('Send');
                    }}
                    onMouseLeave={() => {
                      setCursorHovered(false);
                      setCursorText('');
                    }}
                    className="w-full px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition-colors duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Transmit Message</span>
                    <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          FOOTER WITH COPYRIGHT ATTRIBUTION
          ------------------------------------------------------------- */}
      <footer className="py-12 bg-[#050507] border-t border-neutral-950 px-6 select-none text-neutral-500 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <p>© {new Date().getFullYear()} {folioData.profile.name}. All rights reserved.</p>
            <p className="mt-1 text-neutral-600 text-[10px]">
              Faithfully crafted with React, GSAP &amp; Tailwind. Replicating the Ayush Singh Folio experience.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-1.5 hover:text-white transition-colors duration-300 cursor-pointer"
            >
              <span>Back to Top</span>
              <ChevronUp size={12} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

// -------------------------------------------------------------
// AUXILIARY COMPONENT: 3D MOUSE-FOLLOWING TILT CONTAINER WRAPPER
// Replicates Tilt.js cleanly using standard mouse interactions
// -------------------------------------------------------------
const TiltWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const tiltRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltRef.current) return;
    const box = tiltRef.current;
    const rect = box.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative coordinates of pointer inside element (0 to 1)
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert to rotation angles (-10 to +10 degrees)
    const maxTilt = 10;
    const tiltY = ((x / width) - 0.5) * maxTilt * 2;
    const tiltX = ((y / height) - 0.5) * -maxTilt * 2;
    
    setRotX(tiltX);
    setRotY(tiltY);
  };

  return (
    <div
      ref={tiltRef}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setRotX(0);
        setRotY(0);
      }}
      style={{
        transform: hovered 
          ? `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
        transition: hovered ? 'none' : 'transform 0.5s ease',
      }}
      className="inline-block transition-transform duration-500 ease-out"
    >
      {children}
    </div>
  );
};

// -------------------------------------------------------------
// AUXILIARY COMPONENT: TILT-READY INDIVIDUAL PROJECT DISPLAY CARD
// Replicates the responsive, premium hover effect of FOLIO
// -------------------------------------------------------------
interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  onHoverState: (hovered: boolean, text: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onHoverState }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const maxTilt = 8;
    const tY = ((x / rect.width) - 0.5) * maxTilt * 2;
    const tX = ((y / rect.height) - 0.5) * -maxTilt * 2;
    
    setRotX(tX);
    setRotY(tY);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setRotX(0);
    setRotY(0);
    onHoverState(false, '');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setHovered(true);
        onHoverState(true, 'View');
      }}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: hovered 
          ? `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        transition: hovered ? 'none' : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
      }}
      className="relative rounded-3xl bg-[#060609] border border-neutral-900/80 p-5 sm:p-7 flex flex-col gap-6 select-none group cursor-none overflow-hidden hover:border-neutral-800 transition-all duration-300"
    >
      {/* Background glow shadow indicator */}
      <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Parallax Image Frame Container */}
      <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-900/60">
        <img 
          src={project.image} 
          alt={project.name}
          style={{
            // Dynamic subtle parallax translation matching pointer
            transform: hovered 
              ? `scale(1.08) translate3d(${-rotY * 0.8}px, ${rotX * 0.8}px, 0)`
              : 'scale(1) translate3d(0, 0, 0)',
            transition: hovered ? 'none' : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
          className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
          referrerPolicy="no-referrer"
        />

        {/* Project Year overlay tag badge */}
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3.5 py-1 rounded-full border border-neutral-800 text-[10px] font-mono tracking-widest uppercase">
          {project.year}
        </div>
      </div>

      {/* Project content metadata details */}
      <div className="flex flex-col flex-grow justify-between gap-4">
        <div>
          <div className="flex justify-between items-start gap-4">
            <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-indigo-400 transition-colors duration-300">
              {project.name}
            </h4>
            
            {/* Launch links visual handles */}
            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <a 
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-neutral-850 hover:text-white transition-colors duration-300 flex items-center justify-center text-neutral-400 border border-neutral-850"
                  title="View Source on GitHub"
                >
                  <Github size={14} />
                </a>
              )}
              {project.liveUrl && (
                <a 
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-neutral-850 hover:text-white transition-colors duration-300 flex items-center justify-center text-neutral-400 border border-neutral-850"
                  title="View Live Site"
                >
                  <Globe size={14} />
                </a>
              )}
            </div>
          </div>
          
          <p className="text-sm text-neutral-400 mt-2.5 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech stack pills used */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span 
              key={tech} 
              className="text-[9px] font-mono tracking-wider text-neutral-500 uppercase bg-neutral-900 border border-neutral-850/50 px-2.5 py-0.5 rounded-full"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-[9px] font-mono text-neutral-600 px-2.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-850/30">
              +{project.technologies.length - 4} More
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// AUXILIARY COMPONENT: CUSTOM SKILL TAG WITH PROGRESS SLIDER
// Revealed dynamically when hovered
// -------------------------------------------------------------
const SkillPill: React.FC<{ skill: SkillItem }> = ({ skill }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative px-5 py-2.5 rounded-full bg-neutral-900/60 border border-neutral-850/80 hover:border-indigo-500/40 hover:bg-neutral-900 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-center min-w-[120px] select-none group"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs sm:text-sm font-semibold tracking-wide text-neutral-300 group-hover:text-white transition-colors duration-300">
          {skill.name}
        </span>
        
        {/* Dynamic percentage toggle */}
        <span className="text-[10px] font-mono text-neutral-500 group-hover:text-indigo-400 transition-colors duration-300 font-bold">
          {skill.proficiency}%
        </span>
      </div>

      {/* Smooth expanding line height overlay */}
      <div className="w-full h-[1.5px] bg-neutral-950 mt-1.5 rounded-full overflow-hidden relative">
        <div 
          className="absolute top-0 left-0 h-full bg-indigo-500 rounded-full transition-all duration-500 ease-out opacity-25 group-hover:opacity-100"
          style={{ width: hovered ? `${skill.proficiency}%` : '15%' }}
        />
      </div>
    </div>
  );
};
