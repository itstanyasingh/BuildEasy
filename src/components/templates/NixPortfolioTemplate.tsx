import React, { useState, useEffect, useMemo, useRef } from 'react';
import { PortfolioData, LayoutConfiguration } from '../../types';
import { NixPortfolioAdapter } from '../../lib/NixPortfolioAdapter';
import { 
  Github, Linkedin, Twitter, Mail, ExternalLink, Menu, X, 
  Sun, Moon, Sparkles, Briefcase, GraduationCap, Code2, 
  Award, CheckCircle, ChevronDown, Star, HelpCircle, 
  Phone, MapPin, Send, Globe, ChevronRight, Layers, Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NixPortfolioTemplateProps {
  data: PortfolioData;
  config?: LayoutConfiguration;
}

// Brand palette configurations
interface PaletteConfig {
  id: string;
  name: string;
  colorClass: string;
  accent: string;
  primary: string;
  gradient: string;
  glow: string;
}

const PALETTES: PaletteConfig[] = [
  {
    id: 'iris',
    name: 'Iris',
    colorClass: 'bg-indigo-600',
    accent: '#6366f1',
    primary: '#4f46e5',
    gradient: 'from-indigo-500 to-purple-600',
    glow: 'rgba(99, 102, 241, 0.25)',
  },
  {
    id: 'ocean',
    name: 'Ocean',
    colorClass: 'bg-cyan-500',
    accent: '#06b6d4',
    primary: '#0891b2',
    gradient: 'from-cyan-400 to-blue-600',
    glow: 'rgba(6, 182, 212, 0.25)',
  },
  {
    id: 'emerald',
    name: 'Emerald',
    colorClass: 'bg-emerald-500',
    accent: '#10b981',
    primary: '#059669',
    gradient: 'from-emerald-400 to-teal-600',
    glow: 'rgba(16, 185, 129, 0.25)',
  },
  {
    id: 'rose',
    name: 'Rose',
    colorClass: 'bg-rose-500',
    accent: '#f43f5e',
    primary: '#e11d48',
    gradient: 'from-rose-400 to-pink-600',
    glow: 'rgba(244, 63, 94, 0.25)',
  },
  {
    id: 'amber',
    name: 'Amber',
    colorClass: 'bg-amber-500',
    accent: '#f59e0b',
    primary: '#d97706',
    gradient: 'from-amber-400 to-orange-600',
    glow: 'rgba(245, 158, 11, 0.25)',
  },
];

/**
 * Animated Sparkles and Starry Particles Canvas
 */
const SparklesBackground: React.FC<{ accentColor: string; isDarkMode: boolean }> = ({ accentColor, isDarkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Create particles
    const particleCount = 40;
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      alpha: number;
      decay: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.5 + 0.1,
        decay: Math.random() * 0.002 + 0.001,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Radial background light (Gradient Orb)
      const glowGrad = ctx.createRadialGradient(
        width / 2,
        height / 3,
        10,
        width / 2,
        height / 3,
        Math.max(width, height) / 2
      );

      if (isDarkMode) {
        glowGrad.addColorStop(0, 'rgba(15, 15, 25, 0.3)');
        glowGrad.addColorStop(1, 'rgba(9, 9, 11, 0)');
      } else {
        glowGrad.addColorStop(0, 'rgba(245, 245, 250, 0.4)');
        glowGrad.addColorStop(1, 'rgba(250, 250, 250, 0)');
      }
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw and update particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Bounce/Wrap edges
        if (p.x < 0 || p.x > width) p.speedX *= -1;
        if (p.y < 0 || p.y > height) p.speedY *= -1;

        // Subtle alpha pulse
        p.alpha += p.decay;
        if (p.alpha <= 0.1 || p.alpha >= 0.7) {
          p.decay *= -1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = isDarkMode 
          ? `rgba(255, 255, 255, ${p.alpha})` 
          : `rgba(9, 9, 11, ${p.alpha * 0.4})`;
        ctx.shadowBlur = isDarkMode ? 6 : 0;
        ctx.shadowColor = accentColor;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [accentColor, isDarkMode]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

/**
 * Aceternity UI inspired MovingBorder Button wrapper
 */
const MovingBorderButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  accentColor: string;
  className?: string;
}> = ({ children, onClick, accentColor, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`relative p-[1.5px] overflow-hidden rounded-xl bg-transparent transition-all duration-300 hover:scale-[1.02] cursor-pointer group ${className}`}
    >
      {/* Animated gradient border track */}
      <span 
        className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e2e8f0_0%,#3b82f6_25%,#e2e8f0_50%,#3b82f6_75%,#e2e8f0_100%)] group-hover:animate-[spin_2s_linear_infinite]"
        style={{
          backgroundImage: `conic-gradient(from_90deg_at_50%_50%, transparent 0%, ${accentColor} 50%, transparent 100%)`
        }}
      />
      
      {/* Inner container */}
      <span className="relative block px-6 py-2.5 rounded-[11px] bg-zinc-900 text-zinc-100 dark:bg-zinc-900 dark:text-zinc-100 group-hover:bg-zinc-850 transition-all font-medium text-sm">
        {children}
      </span>
    </button>
  );
};

export const NixPortfolioTemplate: React.FC<NixPortfolioTemplateProps> = ({ data, config }) => {
  // Map BuildEasy portfolio structure using NixPortfolioAdapter
  const portfolio = useMemo(() => NixPortfolioAdapter(data), [data]);

  // Active theme settings
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [activePalette, setActivePalette] = useState<PaletteConfig>(PALETTES[0]);

  // Navigation states
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Interactive testimonial state
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState<number>(0);

  // Expanded FAQ state
  const [faqOpenIdx, setFaqOpenIdx] = useState<number | null>(null);

  // Form states
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  // Synchronize configuration changes
  useEffect(() => {
    if (config?.bgStyle) {
      setIsDarkMode(config.bgStyle === 'dark' || config.bgStyle === 'slate' || config.bgStyle === 'zinc');
    }
    if (config?.accentColor) {
      const match = PALETTES.find(p => p.accent.toLowerCase() === config.accentColor.toLowerCase());
      if (match) setActivePalette(match);
    }
  }, [config]);

  // Scroll Spy for floating nav highlights
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'services', 'projects', 'experience', 'skills', 'testimonials', 'faqs', 'contact'];
      const scrollPos = window.scrollY + 180;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetHeight = el.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1200);
  };

  const currentThemeClasses = useMemo(() => {
    return {
      bg: isDarkMode ? 'bg-[#09090b] text-[#f4f4f5]' : 'bg-[#fafafa] text-[#18181b]',
      cardBg: isDarkMode ? 'bg-[#18181b] border-[#27272a]' : 'bg-[#ffffff] border-[#e4e4e7]',
      textMuted: isDarkMode ? 'text-[#a1a1aa]' : 'text-[#52525b]',
      border: isDarkMode ? 'border-[#27272a]' : 'border-[#e4e4e7]',
      accentText: `text-[${activePalette.accent}]`,
    };
  }, [isDarkMode, activePalette]);

  // Filter skills by category
  const skillsByCategory = useMemo(() => {
    const grouped: Record<string, typeof portfolio.skills> = {};
    portfolio.skills.forEach((skill) => {
      const cat = skill.category || 'Core';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(skill);
    });
    return grouped;
  }, [portfolio.skills]);

  // Static FAQ dataset mapped beautifully
  const faqs = useMemo(() => [
    {
      q: 'What is your typical project development workflow?',
      a: 'My workflow follows an agile approach: starting with deep research & scoping, drafting structural system diagrams, rapid iterative prototyping, comprehensive testing with Vitest/Playwright, and seamless deployment using CI/CD pipelines.'
    },
    {
      q: 'Which technologies are standard in your architecture?',
      a: 'I specialize in full-stack TypeScript architectures, utilizing React/Next.js for immersive, modular user interfaces, Tailwind CSS for scalable layouts, and Node.js/Go/Express paired with Postgres or Redis on the server.'
    },
    {
      q: 'Do you design and build custom API routes or systems?',
      a: 'Yes, I engineer durable RESTful endpoints, performant GraphQL schemas, secure OAuth gateways, and real-time WebSocket connection tunnels tailored to robust system demands.'
    },
    {
      q: 'Are you available to work with remote global teams?',
      a: 'Absolutely. I communicate actively and asynchronously across diverse team environments, leveraging modern collaborative tooling to ensure complete project alignment.'
    }
  ], []);

  const smoothScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div 
      id="nix-root"
      className={`min-h-screen relative font-sans transition-colors duration-500 overflow-x-hidden ${currentThemeClasses.bg}`}
      style={{
        fontFamily: "'Geist', sans-serif"
      }}
    >
      {/* Sparkles / Dynamic Starry Canvas Backdrop */}
      <div className="absolute inset-0 h-full w-full overflow-hidden z-0">
        <SparklesBackground accentColor={activePalette.accent} isDarkMode={isDarkMode} />
      </div>

      {/* Decorative radial lighting (Gradient Orbs) in background */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full opacity-15 pointer-events-none filter blur-[120px] transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${activePalette.accent} 0%, transparent 70%)`
        }}
      />
      <div 
        className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full opacity-10 pointer-events-none filter blur-[150px] transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${activePalette.accent} 0%, transparent 70%)`
        }}
      />

      {/* Header / Navigation bar */}
      <header className={`sticky top-0 z-40 w-full transition-all duration-300 border-b backdrop-blur-md ${isDarkMode ? 'bg-[#09090b]/80 border-zinc-800' : 'bg-[#fafafa]/85 border-zinc-200'}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo / Brand Name */}
          <button 
            onClick={() => smoothScrollTo('hero')}
            className="flex items-center space-x-2.5 font-bold text-lg tracking-tight group cursor-pointer"
          >
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm relative overflow-hidden transition-transform group-hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${activePalette.accent}, ${activePalette.primary})`
              }}
            >
              <span>{portfolio.profile.name.charAt(0)}</span>
              {/* Pulsing glow inside logo */}
              <span className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-900 dark:from-white dark:via-zinc-200 dark:to-zinc-400 font-extrabold">
              {portfolio.profile.name}
            </span>
          </button>

          {/* Desktop Navigation links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {[
              { id: 'hero', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'services', label: 'Services' },
              { id: 'projects', label: 'Projects' },
              { id: 'experience', label: 'Experience' },
              { id: 'skills', label: 'Skills' },
              { id: 'testimonials', label: 'Reviews' },
              { id: 'contact', label: 'Contact' }
            ].map((link) => {
              const active = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => smoothScrollTo(link.id)}
                  className={`relative py-1.5 transition-colors cursor-pointer ${
                    active 
                      ? isDarkMode ? 'text-white' : 'text-zinc-950 font-semibold'
                      : currentThemeClasses.textMuted + ' hover:text-zinc-950 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.span 
                      layoutId="activeNavLine"
                      className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                      style={{ backgroundColor: activePalette.accent }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Dynamic Theme & Color Palette Controller Panel */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Theme switcher */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isDarkMode 
                  ? 'bg-zinc-900 border-zinc-800 text-amber-400 hover:bg-zinc-850' 
                  : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50'
              }`}
              title="Toggle theme"
            >
              {isDarkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Circular active color palette selector buttons */}
            <div className="flex items-center space-x-1.5 border px-2.5 py-1.5 rounded-xl bg-white/5 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800">
              {PALETTES.map((pal) => (
                <button
                  key={pal.id}
                  onClick={() => setActivePalette(pal)}
                  className={`w-4 h-4 rounded-full transition-transform hover:scale-125 cursor-pointer ${pal.colorClass} ${
                    activePalette.id === pal.id ? 'ring-2 ring-offset-2 ring-zinc-400 dark:ring-offset-zinc-950 scale-110' : 'opacity-80'
                  }`}
                  title={pal.name}
                />
              ))}
            </div>
          </div>

          {/* Mobile menu trigger button */}
          <div className="flex md:hidden items-center space-x-3">
            {/* Quick mobile theme toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-1.5 rounded-lg border text-sm ${isDarkMode ? 'border-zinc-800 text-amber-400' : 'border-zinc-200 text-zinc-600'}`}
            >
              {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl border ${isDarkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-800'}`}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`absolute top-16 left-0 right-0 z-30 md:hidden border-b py-6 px-6 shadow-xl ${
              isDarkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-[#fafafa] border-zinc-200 text-zinc-900'
            }`}
          >
            <div className="flex flex-col space-y-4 mb-5">
              {[
                { id: 'hero', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'services', label: 'Services' },
                { id: 'projects', label: 'Projects' },
                { id: 'experience', label: 'Experience' },
                { id: 'skills', label: 'Skills' },
                { id: 'testimonials', label: 'Reviews' },
                { id: 'contact', label: 'Contact' }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => smoothScrollTo(link.id)}
                  className="text-left py-2 font-medium text-base hover:opacity-85"
                >
                  {link.label}
                </button>
              ))}
            </div>
            {/* Mobile palette controls */}
            <div className="border-t pt-4 flex items-center justify-between">
              <span className="text-sm font-semibold opacity-70">Brand Theme:</span>
              <div className="flex space-x-2">
                {PALETTES.map((pal) => (
                  <button
                    key={pal.id}
                    onClick={() => setActivePalette(pal)}
                    className={`w-5 h-5 rounded-full ${pal.colorClass} ${
                      activePalette.id === pal.id ? 'ring-2 ring-offset-2 ring-zinc-400' : 'opacity-85'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-24 space-y-24 md:space-y-40">
        
        {/* 1. HERO SECTION */}
        <section id="hero" className="min-h-[70vh] flex flex-col justify-center items-center text-center pt-8 md:pt-16 pb-12">
          
          {/* Tagline / Subtitle Pill with subtle gradient and spark icon */}
          <div className="mb-6 inline-flex items-center space-x-2.5 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/5 backdrop-blur-sm shadow-sm">
            <Sparkles size={14} className="text-amber-500 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-zinc-500 to-zinc-900 dark:from-zinc-400 dark:to-zinc-100">
              Welcome to my portfolio
            </span>
          </div>

          {/* Main Title Heading with beautiful tracking */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl leading-tight">
            Design, Build & Scale <br />
            <span 
              className="bg-clip-text text-transparent bg-gradient-to-r transition-all duration-700"
              style={{
                backgroundImage: `linear-gradient(to right, ${activePalette.accent}, #c084fc, ${activePalette.primary})`
              }}
            >
              Systemic Solutions
            </span>
          </h1>

          {/* Marquee Role Badge list */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8 max-w-2xl text-center">
            <span className="text-base font-medium opacity-85">{portfolio.profile.role}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 hidden sm:inline" />
            <span className="text-base font-medium opacity-85 flex items-center">
              <MapPin size={15} className="mr-1.5 opacity-70" /> {portfolio.profile.location}
            </span>
          </div>

          {/* Description Bio text block */}
          <p className={`text-base sm:text-lg md:text-xl max-w-2xl mb-12 font-medium leading-relaxed ${currentThemeClasses.textMuted}`}>
            {portfolio.profile.bio}
          </p>

          {/* Action buttons (Aceternity styling) */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            
            {/* Moving Border Button */}
            <MovingBorderButton
              onClick={() => smoothScrollTo('projects')}
              accentColor={activePalette.accent}
            >
              Explore Projects
            </MovingBorderButton>

            {/* Flat Border Link button */}
            <button
              onClick={() => smoothScrollTo('contact')}
              className={`px-6 py-2.5 rounded-xl font-medium text-sm border hover:opacity-90 transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                isDarkMode 
                  ? 'bg-transparent border-zinc-800 text-white hover:bg-zinc-900/50' 
                  : 'bg-white border-zinc-200 text-zinc-900 hover:bg-zinc-50'
              }`}
            >
              <span>Get in touch</span>
              <ChevronRight size={15} />
            </button>
          </div>

          {/* Grid row of quick social link buttons */}
          <div className="mt-16 flex justify-center items-center space-x-6">
            {portfolio.socialLinks.github && (
              <a 
                href={portfolio.socialLinks.github} 
                target="_blank" 
                rel="noreferrer"
                className="hover:scale-110 transition-transform hover:opacity-100 opacity-60"
                title="GitHub"
              >
                <Github size={20} />
              </a>
            )}
            {portfolio.socialLinks.linkedin && (
              <a 
                href={portfolio.socialLinks.linkedin} 
                target="_blank" 
                rel="noreferrer"
                className="hover:scale-110 transition-transform hover:opacity-100 opacity-60"
                title="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            )}
            {portfolio.socialLinks.twitter && (
              <a 
                href={portfolio.socialLinks.twitter} 
                target="_blank" 
                rel="noreferrer"
                className="hover:scale-110 transition-transform hover:opacity-100 opacity-60"
                title="Twitter"
              >
                <Twitter size={20} />
              </a>
            )}
            {portfolio.socialLinks.email && (
              <a 
                href={`mailto:${portfolio.socialLinks.email}`}
                className="hover:scale-110 transition-transform hover:opacity-100 opacity-60"
                title="Email"
              >
                <Mail size={20} />
              </a>
            )}
          </div>

        </section>

        {/* 2. ABOUT ME SECTION */}
        <section id="about" className="scroll-mt-24 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-center">
            
            {/* Visual Profile Avatar frame */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 group">
                {/* Glowing neon ring backdrop */}
                <div 
                  className="absolute inset-0 rounded-2xl filter blur-xl opacity-30 group-hover:opacity-45 transition-all duration-500 scale-95"
                  style={{
                    backgroundColor: activePalette.accent
                  }}
                />
                
                {/* Image frame layout */}
                <div className={`relative w-full h-full rounded-2xl overflow-hidden border-2 z-10 transition-transform duration-500 group-hover:scale-[1.01] ${currentThemeClasses.border}`}>
                  <img
                    src={portfolio.profile.avatar}
                    alt={portfolio.profile.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle dark tint gradient on image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/20 to-transparent pointer-events-none" />
                </div>

                {/* Accent accentuation border layout */}
                <div 
                  className="absolute inset-1 border-2 border-dashed rounded-2xl pointer-events-none z-20 animate-[spin_20s_linear_infinite]"
                  style={{
                    borderColor: `${activePalette.accent}33`
                  }}
                />
              </div>
            </div>

            {/* About text panel */}
            <div className="md:col-span-7 space-y-6">
              <div className="flex items-center space-x-3">
                <span className="h-0.5 w-8 rounded-full" style={{ backgroundColor: activePalette.accent }} />
                <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">About Me</h2>
              </div>
              
              <h3 className="text-3xl font-extrabold leading-tight">
                Architecting durable user products and web interfaces.
              </h3>

              <p className={`text-base leading-relaxed ${currentThemeClasses.textMuted}`}>
                {data.about?.aboutText || portfolio.profile.bio}
              </p>

              {/* Achievements stats cards row */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className={`p-4 rounded-xl border ${currentThemeClasses.cardBg}`}>
                  <div className="flex items-center space-x-2 text-zinc-800 dark:text-zinc-100 font-bold mb-1">
                    <CheckCircle size={16} style={{ color: activePalette.accent }} />
                    <span className="text-sm">High Quality</span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Precompiled with TypeScript and tested thoroughly.
                  </p>
                </div>
                <div className={`p-4 rounded-xl border ${currentThemeClasses.cardBg}`}>
                  <div className="flex items-center space-x-2 text-zinc-800 dark:text-zinc-100 font-bold mb-1">
                    <Layers size={16} style={{ color: activePalette.accent }} />
                    <span className="text-sm">Scalable Node</span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Modular setups designed for growth.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 3. SERVICES SECTION */}
        <section id="services" className="scroll-mt-24 space-y-12">
          
          <div className="text-center space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">What I Do</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold">Professional Services</h3>
            <p className={`max-w-xl mx-auto text-sm ${currentThemeClasses.textMuted}`}>
              Developing reliable digital solutions focusing on robust design, architecture, and deployment.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolio.services.map((service, idx) => {
              // Custom mapper for standard service titles to descriptive lists
              const getServiceDetails = (title: string) => {
                const lower = title.toLowerCase();
                if (lower.includes('development') || lower.includes('full-stack') || lower.includes('software')) {
                  return {
                    desc: 'Engineering high-fidelity full stack TypeScript web apps using React, Next.js, and Node.',
                    icon: <Code2 size={24} />
                  };
                }
                if (lower.includes('architecture') || lower.includes('system')) {
                  return {
                    desc: 'Designing durable backends, database query schemas, and low-latency cache integrations.',
                    icon: <Layers size={24} />
                  };
                }
                if (lower.includes('ai') || lower.includes('machine') || lower.includes('llm')) {
                  return {
                    desc: 'Deploying secure LLM orchestration scripts, prompt setups, and vector indices.',
                    icon: <Sparkles size={24} />
                  };
                }
                return {
                  desc: 'Comprehensive visual analysis, prototyping, and code auditing services.',
                  icon: <Award size={24} />
                };
              };

              const details = getServiceDetails(service);

              return (
                <div 
                  key={idx}
                  className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg relative group ${currentThemeClasses.cardBg}`}
                >
                  {/* Subtle top indicator hover line */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl transition-all duration-300 transform scale-x-0 group-hover:scale-x-100"
                    style={{ backgroundColor: activePalette.accent }}
                  />

                  <div 
                    className="w-12 h-12 rounded-xl mb-6 flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${activePalette.accent}, ${activePalette.primary})`
                    }}
                  >
                    {details.icon}
                  </div>

                  <h4 className="text-base font-bold mb-3">{service}</h4>
                  <p className={`text-xs leading-relaxed ${currentThemeClasses.textMuted}`}>
                    {details.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </section>

        {/* 4. PROJECTS SECTION */}
        <section id="projects" className="scroll-mt-24 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">My Work</h2>
              <h3 className="text-3xl md:text-4xl font-extrabold">Creative Engineering</h3>
            </div>
            <p className={`max-w-md text-sm ${currentThemeClasses.textMuted}`}>
              Curated repositories of live web solutions, developer widgets, and complete production layouts.
            </p>
          </div>

          {/* Projects layout grid with overlay hover options */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.projects.map((proj) => (
              <div 
                key={proj.id}
                className={`group rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:scale-[1.01] ${currentThemeClasses.cardBg}`}
              >
                {/* Media Image wrap */}
                <div className="relative aspect-video overflow-hidden bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  {/* Sliding hover backdrop container */}
                  <div className="absolute inset-0 bg-zinc-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4 z-10 backdrop-blur-[2px]">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 bg-zinc-900 rounded-full text-white hover:scale-110 transition-transform flex items-center justify-center border border-zinc-800"
                        title="GitHub Code"
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 bg-white rounded-full text-zinc-950 hover:scale-110 transition-transform flex items-center justify-center border border-zinc-200"
                        title="Live Preview"
                      >
                        <Globe size={18} />
                      </a>
                    )}
                  </div>

                  {/* Year Tag label badge */}
                  <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-1 rounded bg-zinc-950/85 text-zinc-100 backdrop-blur-sm z-10">
                    {proj.year}
                  </span>
                </div>

                {/* Content description wrapper */}
                <div className="p-6 space-y-4">
                  <div>
                    <h4 className="font-extrabold text-base mb-2 group-hover:opacity-90">{proj.title}</h4>
                    <p className={`text-xs line-clamp-2 leading-relaxed ${currentThemeClasses.textMuted}`}>
                      {proj.description}
                    </p>
                  </div>

                  {/* Skill/Tech tag list */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.slice(0, 4).map((tech) => (
                      <span 
                        key={tech}
                        className="text-[10px] font-medium px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-800/50"
                      >
                        {tech}
                      </span>
                    ))}
                    {proj.technologies.length > 4 && (
                      <span className="text-[10px] font-medium px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-400">
                        +{proj.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </section>

        {/* 5. EXPERIENCE & TIMELINE SECTION */}
        <section id="experience" className="scroll-mt-24 space-y-12 max-w-4xl mx-auto">
          
          <div className="text-center space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">My Path</h2>
            <h3 className="text-3xl font-extrabold">Professional Experience</h3>
            <p className={`max-w-md mx-auto text-sm ${currentThemeClasses.textMuted}`}>
              Timeline of my professional engagements, engineering roles, and system designs.
            </p>
          </div>

          {/* Timeline representation block */}
          <div className="relative border-l pl-6 md:pl-8 space-y-12" style={{ borderColor: isDarkMode ? '#27272a' : '#e4e4e7' }}>
            
            {portfolio.experience.map((exp, idx) => (
              <div key={exp.id} className="relative group">
                
                {/* Glowing Bullet Dot indicators */}
                <span 
                  className="absolute left-[-31px] md:[-33px] top-1.5 w-4 h-4 rounded-full border-2 bg-zinc-950 transition-colors duration-300"
                  style={{
                    borderColor: activePalette.accent,
                    backgroundColor: exp.current ? activePalette.accent : '#09090b',
                    boxShadow: exp.current ? `0 0 10px ${activePalette.accent}` : 'none'
                  }}
                />

                {/* Info Card blocks */}
                <div className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-md ${currentThemeClasses.cardBg}`}>
                  
                  {/* Time / Role row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h4 className="font-extrabold text-base">{exp.role}</h4>
                      <p className="text-xs font-bold opacity-85 mt-0.5" style={{ color: activePalette.accent }}>
                        {exp.company}
                      </p>
                    </div>
                    
                    <span className="text-[11px] font-bold px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-800/50 self-start sm:self-auto">
                      {exp.duration}
                    </span>
                  </div>

                  <p className={`text-xs leading-relaxed mb-4 ${currentThemeClasses.textMuted}`}>
                    {exp.description}
                  </p>

                  {/* Dynamic Experience achievements list */}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="space-y-2 mb-4">
                      {exp.achievements.map((ach, i) => (
                        <li key={i} className="text-xs flex items-start space-x-2.5">
                          <CheckCircle size={12} className="mt-0.5 flex-shrink-0" style={{ color: activePalette.accent }} />
                          <span className={currentThemeClasses.textMuted}>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Skill tagging in roles */}
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1.5">
                      {exp.technologies.map((tech) => (
                        <span 
                          key={tech}
                          className="text-[9px] font-semibold tracking-wider px-2 py-0.5 rounded uppercase bg-zinc-500/10 text-zinc-600 dark:text-zinc-300"
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

        {/* 6. SKILLS GRID SECTION */}
        <section id="skills" className="scroll-mt-24 space-y-12">
          
          <div className="text-center space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Technical Stack</h2>
            <h3 className="text-3xl font-extrabold">Expertise & Proficiencies</h3>
            <p className={`max-w-md mx-auto text-sm ${currentThemeClasses.textMuted}`}>
              My proficiency indices across core backend engines, framework wrappers, and developer workflows.
            </p>
          </div>

          {/* Grouped Skills grid system */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.keys(skillsByCategory).map((category) => (
              <div 
                key={category}
                className={`p-6 rounded-2xl border ${currentThemeClasses.cardBg}`}
              >
                <div className="flex items-center space-x-2.5 mb-6 border-b pb-4 border-zinc-200/65 dark:border-zinc-800/65">
                  <Code2 size={18} style={{ color: activePalette.accent }} />
                  <h4 className="font-bold text-sm tracking-wide uppercase text-zinc-800 dark:text-zinc-100">{category}</h4>
                </div>

                <div className="space-y-5">
                  {skillsByCategory[category].map((skill) => (
                    <div key={skill.id} className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-zinc-800 dark:text-zinc-200">{skill.name}</span>
                        <span className="opacity-80">{skill.proficiency}%</span>
                      </div>
                      
                      {/* Skill Index tracking bars */}
                      <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(to right, ${activePalette.accent}, ${activePalette.primary})`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* 7. EDUCATION & CERTIFICATIONS (REVIEWS & TESTIMONIALS AT THE ORIGINAL'S BOTTOM) */}
        <section id="testimonials" className="scroll-mt-24 space-y-12 max-w-4xl mx-auto">
          
          <div className="text-center space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Recommendations</h2>
            <h3 className="text-3xl font-extrabold">Client Feedback</h3>
            <p className={`max-w-md mx-auto text-sm ${currentThemeClasses.textMuted}`}>
              What engineering leaders and product developers say about my web architecture solutions.
            </p>
          </div>

          {portfolio.testimonials.length > 0 ? (
            <div className="relative">
              
              {/* Active Slide container card with quote design */}
              <div className={`p-8 md:p-12 rounded-2xl border relative ${currentThemeClasses.cardBg}`}>
                
                {/* Visual quote accent indicator */}
                <span className="absolute top-6 left-6 text-6xl text-zinc-200 dark:text-zinc-800/40 select-none font-serif leading-none">
                  “
                </span>

                <div className="space-y-6 relative z-10">
                  <p className="text-base sm:text-lg italic leading-relaxed text-zinc-700 dark:text-zinc-200">
                    {portfolio.testimonials[activeTestimonialIdx].content}
                  </p>

                  <div className="flex items-center space-x-4 border-t pt-6 border-zinc-200/50 dark:border-zinc-800/50">
                    <img
                      src={portfolio.testimonials[activeTestimonialIdx].avatar}
                      alt={portfolio.testimonials[activeTestimonialIdx].name}
                      className="w-12 h-12 rounded-full object-cover border border-zinc-300 dark:border-zinc-700"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-extrabold text-sm">{portfolio.testimonials[activeTestimonialIdx].name}</h4>
                      <p className="text-xs text-zinc-400">
                        {portfolio.testimonials[activeTestimonialIdx].role} at <span className="font-semibold" style={{ color: activePalette.accent }}>{portfolio.testimonials[activeTestimonialIdx].company}</span>
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Slider dots indicator row */}
              <div className="mt-6 flex justify-center items-center space-x-2">
                {portfolio.testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonialIdx(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                      activeTestimonialIdx === idx 
                        ? 'scale-110' 
                        : 'opacity-40 hover:opacity-75'
                    }`}
                    style={{
                      backgroundColor: activeTestimonialIdx === idx ? activePalette.accent : '#52525b'
                    }}
                  />
                ))}
              </div>

            </div>
          ) : (
            <div className={`p-8 text-center rounded-2xl border ${currentThemeClasses.cardBg}`}>
              <p className={currentThemeClasses.textMuted}>No recommendations saved yet.</p>
            </div>
          )}

        </section>

        {/* 8. FAQS SECTION */}
        <section id="faqs" className="scroll-mt-24 space-y-12 max-w-3xl mx-auto">
          
          <div className="text-center space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Got Questions?</h2>
            <h3 className="text-3xl font-extrabold">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = faqOpenIdx === idx;
              return (
                <div 
                  key={idx}
                  className={`rounded-xl border overflow-hidden transition-colors ${
                    isOpen 
                      ? isDarkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200'
                      : currentThemeClasses.cardBg
                  }`}
                >
                  <button
                    onClick={() => setFaqOpenIdx(isOpen ? null : idx)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left text-sm font-bold tracking-wide cursor-pointer"
                  >
                    <span className="text-zinc-800 dark:text-zinc-100">{faq.q}</span>
                    <ChevronDown 
                      size={16} 
                      className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      style={{ color: activePalette.accent }}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="border-t border-zinc-200/40 dark:border-zinc-800/40"
                      >
                        <p className={`px-6 py-4 text-xs leading-relaxed ${currentThemeClasses.textMuted}`}>
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </section>

        {/* 9. CONTACT SECTION */}
        <section id="contact" className="scroll-mt-24 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            
            {/* Quick Contact Info lists */}
            <div className="md:col-span-5 space-y-8">
              <div className="space-y-3">
                <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Connect</h2>
                <h3 className="text-3xl font-extrabold">Let&apos;s Create Something Great</h3>
                <p className={`text-sm ${currentThemeClasses.textMuted}`}>
                  Are you planning a project, seeking consulting, or looking to build a high-performance web interface? Let me know!
                </p>
              </div>

              <div className="space-y-4 pt-4">
                
                {/* Email row */}
                {portfolio.contact.email && (
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 border dark:border-zinc-850">
                      <Mail size={16} style={{ color: activePalette.accent }} />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-zinc-400 uppercase">Email</h4>
                      <a href={`mailto:${portfolio.contact.email}`} className="text-sm font-bold hover:underline">
                        {portfolio.contact.email}
                      </a>
                    </div>
                  </div>
                )}

                {/* Phone row */}
                {portfolio.contact.phone && (
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 border dark:border-zinc-850">
                      <Phone size={16} style={{ color: activePalette.accent }} />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-zinc-400 uppercase">Phone</h4>
                      <span className="text-sm font-bold">
                        {portfolio.contact.phone}
                      </span>
                    </div>
                  </div>
                )}

                {/* Location row */}
                {portfolio.contact.location && (
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 border dark:border-zinc-850">
                      <MapPin size={16} style={{ color: activePalette.accent }} />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-zinc-400 uppercase">Location</h4>
                      <span className="text-sm font-bold">
                        {portfolio.contact.location}
                      </span>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Live Interactive Contact Form */}
            <div className="md:col-span-7">
              <div className={`p-6 sm:p-8 rounded-2xl border ${currentThemeClasses.cardBg}`}>
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase text-zinc-400">Your Name</label>
                      <input
                        type="text"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        required
                        className={`w-full px-4 py-2.5 rounded-xl border bg-transparent text-sm transition-all focus:outline-none`}
                        style={{
                          borderColor: isDarkMode ? '#27272a' : '#e4e4e7',
                        }}
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase text-zinc-400">Your Email</label>
                      <input
                        type="email"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        required
                        className={`w-full px-4 py-2.5 rounded-xl border bg-transparent text-sm transition-all focus:outline-none`}
                        style={{
                          borderColor: isDarkMode ? '#27272a' : '#e4e4e7',
                        }}
                      />
                    </div>

                  </div>

                  {/* Message body */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-zinc-400">Your Message</label>
                    <textarea
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      required
                      rows={5}
                      className={`w-full px-4 py-2.5 rounded-xl border bg-transparent text-sm transition-all focus:outline-none`}
                      style={{
                        borderColor: isDarkMode ? '#27272a' : '#e4e4e7',
                      }}
                    />
                  </div>

                  {/* Submit state validation handler */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full relative py-3 rounded-xl font-bold text-sm text-white cursor-pointer hover:opacity-95 transition-opacity flex items-center justify-center space-x-2"
                      style={{
                        background: `linear-gradient(135deg, ${activePalette.accent}, ${activePalette.primary})`
                      }}
                    >
                      {isSubmitting ? (
                        <span>Sending message...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send size={15} />
                        </>
                      )}
                    </button>
                  </div>

                  {submitSuccess && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs text-center font-bold"
                    >
                      Thank you! Your message was sent successfully.
                    </motion.div>
                  )}

                </form>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* Footer block */}
      <footer className={`border-t py-12 relative z-10 ${isDarkMode ? 'bg-zinc-950/40 border-zinc-800' : 'bg-white border-zinc-200'}`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              © {new Date().getFullYear()} {portfolio.profile.name}. All rights reserved.
            </span>
          </div>

          <div className="flex items-center space-x-1.5 text-xs font-bold text-zinc-400">
            <span>Built with</span>
            <Heart size={10} className="text-rose-500 fill-rose-500" />
            <span>&</span>
            <span className="font-extrabold hover:underline cursor-pointer" style={{ color: activePalette.accent }} onClick={() => smoothScrollTo('hero')}>
              BuildEasy Panel
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
