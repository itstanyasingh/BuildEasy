import React, { useState, useEffect, useRef } from 'react';
import { PortfolioData, LayoutConfiguration, ProjectItem, ExperienceItem, ArticleItem } from '../../types';
import { 
  Github, Linkedin, Twitter, Mail, ExternalLink, Download, 
  Moon, Sun, Heart, Sparkles, ArrowUpRight, Check, Copy,
  Menu, X, Briefcase, GraduationCap, Code, Layers, FileText
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue } from 'motion/react';

interface CodeBucksPortfolioProps {
  data: PortfolioData;
  config?: LayoutConfiguration;
}

// Custom AnimatedText component matching CodeBucks Framer Motion implementation
const quoteVariant = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.2,
      staggerChildren: 0.08,
    },
  },
};

const singleWordVariant = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  },
};

const AnimatedText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  return (
    <div className="w-full mx-auto py-2 flex items-center justify-center text-center overflow-hidden">
      <motion.h1
        className={`inline-block w-full text-dark font-bold capitalize text-4xl sm:text-6xl lg:text-7xl dark:text-light tracking-tight ${className}`}
        variants={quoteVariant}
        initial="initial"
        animate="animate"
      >
        {text.split(' ').map((word, index) => (
          <motion.span
            key={word + '-' + index}
            className="inline-block mr-2 last:mr-0"
            variants={singleWordVariant}
          >
            {word}
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
};

// Custom LiIcon component matching CodeBucks vertical timeline scroll marker
const LiIcon: React.FC<{ reference: React.RefObject<any> }> = ({ reference }) => {
  const { scrollYProgress } = useScroll({
    target: reference,
    offset: ['center end', 'center center'],
  });

  return (
    <figure className="absolute left-0 stroke-dark dark:stroke-light -translate-x-[2px] sm:-translate-x-1/2">
      <svg className="-rotate-90" width="60" height="60" viewBox="0 0 100 100">
        <circle
          cx="75"
          cy="50"
          r="20"
          className="stroke-[#b63e96] dark:stroke-[#58e6d9] stroke-1 fill-none"
        />
        <motion.circle
          cx="75"
          cy="50"
          r="20"
          className="stroke-[5px] fill-light dark:fill-dark"
          style={{
            pathLength: scrollYProgress,
          }}
        />
        <circle
          cx="75"
          cy="50"
          r="10"
          className="animate-pulse stroke-1 fill-[#b63e96] dark:fill-[#58e6d9]"
        />
      </svg>
    </figure>
  );
};

// Orbital skill item matching CodeBucks radial skills web
const SkillOrb: React.FC<{ name: string; x: string; y: string }> = ({ name, x, y }) => {
  return (
    <motion.div
      className="flex items-center justify-center rounded-full font-semibold bg-dark text-light py-2.5 px-5 shadow-dark cursor-pointer absolute dark:text-dark dark:bg-light text-xs sm:text-sm lg:text-base border border-transparent hover:border-dark dark:hover:border-light transition-colors select-none"
      whileHover={{ scale: 1.08 }}
      initial={{ x: 0, y: 0, opacity: 0 }}
      whileInView={{ x: x, y: y, opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      {name}
    </motion.div>
  );
};

// Animated Article Row with hover thumbnail preview
const ArticleRow: React.FC<{ article: ArticleItem }> = ({ article }) => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left + 20);
    mouseY.set(e.clientY - rect.top - 80);
  };

  return (
    <motion.a
      href={article.url || '#'}
      target={article.url ? '_blank' : '_self'}
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      initial={{ y: 80, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } }}
      viewport={{ once: true }}
      className="relative w-full p-4 sm:p-5 my-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between bg-light dark:bg-dark text-dark dark:text-light first:mt-0 border border-solid border-dark dark:border-light border-r-4 border-b-4 group cursor-pointer"
    >
      <span className="font-semibold text-base sm:text-lg group-hover:underline transition-all">
        {article.title}
      </span>
      <span className="text-[#b63e96] dark:text-[#58e6d9] font-semibold text-xs sm:text-sm font-mono mt-1 sm:mt-0">
        {article.readTime || '5 min read'} • {article.date || '2025'}
      </span>

      {/* Floating preview image on hover */}
      {isHovered && article.coverImage && (
        <motion.div
          style={{ x: mouseX, y: mouseY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute z-20 pointer-events-none hidden md:block w-48 h-32 rounded-lg overflow-hidden border-2 border-dark dark:border-light shadow-2xl bg-dark"
        >
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}
    </motion.a>
  );
};

export const CodeBucksDeveloperPortfolioTemplate: React.FC<CodeBucksPortfolioProps> = ({ data, config }) => {
  const { profile, about, experience, education, skills, projects, articles, socialLinks, contact } = data;

  // Active page tab: 'home' | 'about' | 'projects' | 'articles'
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'projects' | 'articles'>('home');
  
  // Theme state: dark mode toggle matching CodeBucks dark/light styles
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (config?.bgStyle === 'dark') return true;
    return false;
  });

  // Mobile menu open state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Transition Curtain effect state
  const [isTransitioning, setIsTransitioning] = useState(false);

  const switchTab = (tab: 'home' | 'about' | 'projects' | 'articles') => {
    if (tab === activeTab) return;
    setIsTransitioning(true);
    setIsMenuOpen(false);
    setTimeout(() => {
      setActiveTab(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }, 400);
  };

  // Safe data extractions
  const name = profile?.name || 'Developer';
  const role = profile?.title || 'Full Stack Developer & Software Architect';
  const bio = profile?.bio || about?.aboutText || 'As a skilled full-stack developer, I am dedicated to turning ideas into innovative web applications. Explore my latest projects and articles, showcasing my expertise in React.js, Next.js and modern web development.';
  const email = profile?.email || contact?.email;
  const avatar = profile?.profilePhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800';

  // Experience timeline ref
  const expRef = useRef<HTMLDivElement>(null);
  const eduRef = useRef<HTMLDivElement>(null);

  // Experience calculations
  const safeExperience = experience || [];
  const safeEducation = education || [];
  const safeProjects = projects || [];
  const safeSkills = skills || [];
  const safeArticles = articles || [];

  // Estimated stats for About page metrics (CodeBucks signature 3 counter stats)
  const yearsExp = Math.max(safeExperience.length * 2, 4);
  const projectsCount = Math.max(safeProjects.length * 8, 30);
  const satisfiedClients = Math.max(safeProjects.length * 6, 25);

  // Radial skills coordinates map for CodeBucks circular web layout
  const radialCoords = [
    { x: '0vw', y: '0vw' },
    { x: '-20vw', y: '-2vw' },
    { x: '-5vw', y: '-10vw' },
    { x: '20vw', y: '6vw' },
    { x: '0vw', y: '12vw' },
    { x: '-20vw', y: '-15vw' },
    { x: '15vw', y: '-12vw' },
    { x: '32vw', y: '-5vw' },
    { x: '0vw', y: '-20vw' },
    { x: '-25vw', y: '18vw' },
    { x: '18vw', y: '18vw' },
    { x: '-12vw', y: '8vw' },
    { x: '28vw', y: '12vw' },
    { x: '-32vw', y: '4vw' },
  ];

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#1b1b1b] text-[#1b1b1b] dark:text-[#f5f5f5] font-sans antialiased transition-colors duration-300 relative selection:bg-[#1b1b1b] selection:text-[#f5f5f5] dark:selection:bg-[#f5f5f5] dark:selection:text-[#1b1b1b]">
        
        {/* CODEBUCKS SCREEN TRANSITION CURTAINS */}
        <AnimatePresence>
          {isTransitioning && (
            <>
              <motion.div
                className="fixed top-0 bottom-0 right-full w-screen h-screen z-50 bg-[#b63e96] dark:bg-[#58e6d9]"
                initial={{ x: '100%', width: '100%' }}
                animate={{ x: '0%', width: '0%' }}
                exit={{ x: ['0%', '100%'], width: ['0%', '100%'] }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />
              <motion.div
                className="fixed top-0 bottom-0 right-full w-screen h-screen z-40 bg-[#f5f5f5] dark:bg-[#1b1b1b]"
                initial={{ x: '100%', width: '100%' }}
                animate={{ x: '0%', width: '0%' }}
                transition={{ delay: 0.15, duration: 0.6, ease: 'easeInOut' }}
              />
              <motion.div
                className="fixed top-0 bottom-0 right-full w-screen h-screen z-30 bg-[#1b1b1b] dark:bg-[#252525]"
                initial={{ x: '100%', width: '100%' }}
                animate={{ x: '0%', width: '0%' }}
                transition={{ delay: 0.3, duration: 0.6, ease: 'easeInOut' }}
              />
            </>
          )}
        </AnimatePresence>

        {/* 1. HEADER / NAVIGATION */}
        <header className="w-full px-6 sm:px-12 lg:px-24 py-8 font-medium flex items-center justify-between relative z-10">
          
          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col justify-center items-center lg:hidden z-50 w-8 h-8 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-7 h-7 text-dark dark:text-light" />
            ) : (
              <div className="space-y-1.5 w-6">
                <span className="block h-0.5 w-6 bg-dark dark:bg-light transition-all"></span>
                <span className="block h-0.5 w-6 bg-dark dark:bg-light transition-all"></span>
                <span className="block h-0.5 w-6 bg-dark dark:bg-light transition-all"></span>
              </div>
            )}
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-base font-semibold">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'projects', label: 'Projects' },
              { id: 'articles', label: 'Articles' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => switchTab(tab.id as any)}
                className={`relative group py-1 cursor-pointer transition-colors ${
                  activeTab === tab.id
                    ? 'text-dark dark:text-light font-bold'
                    : 'text-dark/75 dark:text-light/75 hover:text-dark dark:hover:text-light'
                }`}
              >
                {tab.label}
                <span
                  className={`h-[2px] inline-block bg-dark dark:bg-light absolute left-0 -bottom-0.5 transition-[width] ease duration-300 ${
                    activeTab === tab.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            ))}
          </nav>

          {/* Central Animated CodeBucks Logo Pill */}
          <div className="absolute left-[50%] top-4 translate-x-[-50%]">
            <motion.button
              onClick={() => switchTab('home')}
              className="w-16 h-16 bg-dark text-light dark:border-light border border-solid border-transparent dark:border-white rounded-full flex items-center justify-center text-xl font-bold shadow-xl cursor-pointer"
              whileHover={{
                backgroundColor: [
                  '#121212',
                  'rgba(131,58,180,1)',
                  'rgba(253,29,29,1)',
                  'rgba(252,176,69,1)',
                  'rgba(131,58,180,1)',
                  '#121212',
                ],
                transition: { duration: 1.5, repeat: Infinity },
              }}
            >
              {name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase() || 'CB'}
            </motion.button>
          </div>

          {/* Social Icons & Theme Switcher */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            {socialLinks?.github && (
              <motion.a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="w-6 h-6 text-dark dark:text-light hover:opacity-80 transition-opacity"
                title="GitHub"
              >
                <Github className="w-6 h-6" />
              </motion.a>
            )}

            {socialLinks?.linkedin && (
              <motion.a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="w-6 h-6 text-dark dark:text-light hover:opacity-80 transition-opacity"
                title="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </motion.a>
            )}

            {socialLinks?.twitter && (
              <motion.a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="w-6 h-6 text-dark dark:text-light hover:opacity-80 transition-opacity"
                title="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </motion.a>
            )}

            {email && (
              <motion.a
                href={`mailto:${email}`}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="w-6 h-6 text-dark dark:text-light hover:opacity-80 transition-opacity"
                title="Email"
              >
                <Mail className="w-6 h-6" />
              </motion.a>
            )}

            {/* Dark/Light Mode Switcher */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="w-8 h-8 rounded-full bg-dark text-light dark:bg-light dark:text-dark flex items-center justify-center p-1 cursor-pointer transition-transform hover:scale-110 shadow-md"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-500 fill-amber-500" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-900 fill-zinc-900" />
              )}
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer Modal */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0, x: '-50%', y: '-50%' }}
              animate={{ scale: 1, opacity: 1, x: '-50%', y: '-50%' }}
              exit={{ scale: 0, opacity: 0, x: '-50%', y: '-50%' }}
              transition={{ duration: 0.3 }}
              className="min-w-[70vw] flex flex-col justify-between items-center fixed top-1/2 left-1/2 z-50 bg-dark/90 dark:bg-light/90 rounded-2xl backdrop-blur-md py-12 px-8 text-light dark:text-dark border border-light/20 dark:border-dark/20 shadow-2xl"
            >
              <nav className="flex flex-col items-center justify-center space-y-5 text-lg font-semibold">
                {[
                  { id: 'home', label: 'Home' },
                  { id: 'about', label: 'About' },
                  { id: 'projects', label: 'Projects' },
                  { id: 'articles', label: 'Articles' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => switchTab(tab.id as any)}
                    className="relative group py-1 cursor-pointer text-xl"
                  >
                    {tab.label}
                    <span
                      className={`h-[2px] inline-block bg-light dark:bg-dark absolute left-0 -bottom-0.5 transition-[width] ease duration-300 ${
                        activeTab === tab.id ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </button>
                ))}
              </nav>

              <div className="flex items-center space-x-6 mt-8">
                {socialLinks?.github && (
                  <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-6 h-6 hover:scale-110 transition-transform" />
                  </a>
                )}
                {socialLinks?.linkedin && (
                  <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-6 h-6 hover:scale-110 transition-transform" />
                  </a>
                )}
                {email && (
                  <a href={`mailto:${email}`}>
                    <Mail className="w-6 h-6 hover:scale-110 transition-transform" />
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. MAIN VIEW SWITCHER */}
        <main className="w-full min-h-[calc(100vh-160px)] px-6 sm:px-12 lg:px-24 pb-20">
          
          {/* ============================================================ */}
          {/* TAB 1: HOME PAGE (Hero + Animated Text + Hire Me + Buttons) */}
          {/* ============================================================ */}
          {activeTab === 'home' && (
            <div className="flex items-center justify-between w-full min-h-[80vh] flex-col-reverse lg:flex-row py-8 gap-12">
              
              {/* Left Profile Avatar Image with Signature CodeBucks Offset Shadow */}
              <div className="w-full lg:w-1/2 flex items-center justify-center">
                <div className="relative w-full max-w-md aspect-square rounded-2xl border-2 border-solid border-dark dark:border-light bg-light dark:bg-dark p-4 shadow-2xl">
                  {/* Offset Shadow Box */}
                  <div className="absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark dark:bg-light" />
                  <img
                    src={avatar}
                    alt={name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>

              {/* Right Hero Copy */}
              <div className="w-full lg:w-1/2 flex flex-col items-start justify-center space-y-6">
                <AnimatedText
                  text="Turning Vision Into Reality With Code And Design."
                  className="!text-left !text-4xl sm:!text-5xl lg:!text-6xl"
                />

                <p className="my-2 text-base sm:text-lg font-medium text-dark/80 dark:text-light/80 leading-relaxed">
                  {bio}
                </p>

                <div className="flex items-center gap-4 pt-2">
                  {/* Resume Action */}
                  <a
                    href={email ? `mailto:${email}?subject=Resume%20Request` : '#'}
                    className="flex items-center bg-dark text-light dark:bg-light dark:text-dark px-6 py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-light hover:text-dark dark:hover:bg-dark dark:hover:text-light border-2 border-solid border-transparent hover:border-dark dark:hover:border-light transition-all shadow-md group cursor-pointer"
                  >
                    <span>Resume</span>
                    <Download className="w-5 h-5 ml-2 group-hover:translate-y-0.5 transition-transform" />
                  </a>

                  {/* Contact Underline Link */}
                  {email && (
                    <a
                      href={`mailto:${email}`}
                      className="text-base sm:text-lg font-medium capitalize text-dark dark:text-light underline underline-offset-4 hover:opacity-75 transition-opacity px-2 py-3"
                    >
                      Contact
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 2: ABOUT PAGE (Bio + Counters + Skills Web + Timelines) */}
          {/* ============================================================ */}
          {activeTab === 'about' && (
            <div className="w-full flex flex-col items-center justify-center pt-8 space-y-24">
              
              {/* Header Title */}
              <AnimatedText text="Passion Fuels Purpose!" className="mb-8" />

              {/* Top 3-Column Info (Bio, Profile Card, Metric Counters) */}
              <div className="grid w-full grid-cols-1 md:grid-cols-12 gap-12 items-center">
                
                {/* Biography */}
                <div className="md:col-span-5 flex flex-col items-start justify-start space-y-4">
                  <h2 className="mb-2 text-lg font-bold uppercase text-dark/75 dark:text-light/75 tracking-wider">
                    Biography
                  </h2>
                  <p className="font-medium text-dark/80 dark:text-light/80 leading-relaxed text-sm sm:text-base">
                    Hi, I'm <strong className="text-dark dark:text-light font-bold">{name}</strong>, a {role} with a passion for creating beautiful, functional, and user-centered digital experiences.
                  </p>
                  <p className="font-medium text-dark/80 dark:text-light/80 leading-relaxed text-sm sm:text-base">
                    I believe that design is about more than just making things look pretty – it's about solving problems and creating intuitive, enjoyable experiences for users.
                  </p>
                  <p className="font-medium text-dark/80 dark:text-light/80 leading-relaxed text-sm sm:text-base">
                    Whether I'm working on a web app, a mobile solution, or digital product, I bring my commitment to design excellence and user-centered thinking to every project I work on.
                  </p>
                </div>

                {/* Center Image with Offset Frame */}
                <div className="md:col-span-4 relative h-max rounded-2xl border-2 border-solid border-dark dark:border-light bg-light dark:bg-dark p-6 shadow-2xl">
                  <div className="absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark dark:bg-light" />
                  <img
                    src={avatar}
                    alt={name}
                    className="w-full h-auto rounded-2xl object-cover max-h-[380px]"
                  />
                </div>

                {/* Counters / Stats Column */}
                <div className="md:col-span-3 flex flex-col items-end justify-between space-y-8">
                  <div className="flex flex-col items-end justify-center">
                    <span className="inline-block text-5xl sm:text-6xl font-bold font-mono">
                      {satisfiedClients}+
                    </span>
                    <h3 className="text-sm font-medium capitalize text-dark/75 dark:text-light/75 text-right mt-1">
                      Satisfied Clients
                    </h3>
                  </div>

                  <div className="flex flex-col items-end justify-center">
                    <span className="inline-block text-5xl sm:text-6xl font-bold font-mono">
                      {projectsCount}+
                    </span>
                    <h3 className="text-sm font-medium capitalize text-dark/75 dark:text-light/75 text-right mt-1">
                      Projects Completed
                    </h3>
                  </div>

                  <div className="flex flex-col items-end justify-center">
                    <span className="inline-block text-5xl sm:text-6xl font-bold font-mono">
                      {yearsExp}+
                    </span>
                    <h3 className="text-sm font-medium capitalize text-dark/75 dark:text-light/75 text-right mt-1">
                      Years of Experience
                    </h3>
                  </div>
                </div>
              </div>

              {/* RADIAL SKILLS WEB SECTION */}
              <div className="w-full space-y-12">
                <h2 className="font-bold text-5xl sm:text-7xl w-full text-center tracking-tight">
                  Skills
                </h2>

                <div className="w-full h-[60vh] sm:h-[80vh] relative flex items-center justify-center rounded-full bg-[radial-gradient(rgba(0,0,0,0.4)_2px,#f5f5f5_2px)] dark:bg-[radial-gradient(rgba(255,255,255,0.4)_2px,#1b1b1b_2px)] bg-[size:24px_24px] overflow-hidden border border-dark/10 dark:border-light/10">
                  {/* Central Hub */}
                  <motion.div
                    className="flex items-center justify-center rounded-full font-bold bg-dark text-light p-6 sm:p-8 shadow-dark cursor-pointer dark:text-dark dark:bg-light z-10 text-sm sm:text-base select-none"
                    whileHover={{ scale: 1.1 }}
                  >
                    WEB
                  </motion.div>

                  {/* Orbital Skill Nodes */}
                  {safeSkills.map((skill, idx) => {
                    const coord = radialCoords[(idx + 1) % radialCoords.length];
                    return (
                      <SkillOrb
                        key={skill.id || idx}
                        name={skill.name}
                        x={coord.x}
                        y={coord.y}
                      />
                    );
                  })}
                </div>
              </div>

              {/* EXPERIENCE TIMELINE SECTION */}
              {safeExperience.length > 0 && (
                <div className="w-full space-y-16">
                  <h2 className="font-bold text-5xl sm:text-7xl w-full text-center tracking-tight">
                    Experience
                  </h2>

                  <div ref={expRef} className="w-full sm:w-[85%] lg:w-[75%] mx-auto relative">
                    {/* Vertical Connecting Line */}
                    <div className="absolute left-4 sm:left-9 top-0 w-[4px] h-full bg-dark dark:bg-light origin-top" />

                    <div className="space-y-16 pl-10 sm:pl-20">
                      {safeExperience.map((exp, idx) => (
                        <div key={exp.id || idx} className="relative my-8 first:mt-0 last:mb-0">
                          <LiIcon reference={expRef} />
                          
                          <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, type: 'spring' }}
                            viewport={{ once: true }}
                            className="space-y-2"
                          >
                            <h3 className="capitalize font-bold text-xl sm:text-2xl">
                              {exp.role}&nbsp;
                              <span className="text-[#b63e96] dark:text-[#58e6d9] capitalize">
                                @{exp.company}
                              </span>
                            </h3>

                            <span className="capitalize font-medium text-dark/75 dark:text-light/75 text-sm sm:text-base font-mono">
                              {exp.duration} | {exp.location || 'Remote'}
                            </span>

                            <p className="font-medium w-full text-sm sm:text-base leading-relaxed text-dark/90 dark:text-light/90">
                              {exp.description}
                            </p>

                            {exp.achievements && exp.achievements.length > 0 && (
                              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-dark/80 dark:text-light/80 pt-1">
                                {exp.achievements.map((ach, i) => (
                                  <li key={i}>{ach}</li>
                                ))}
                              </ul>
                            )}
                          </motion.div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* EDUCATION TIMELINE SECTION */}
              {safeEducation.length > 0 && (
                <div className="w-full space-y-16">
                  <h2 className="font-bold text-5xl sm:text-7xl w-full text-center tracking-tight">
                    Education
                  </h2>

                  <div ref={eduRef} className="w-full sm:w-[85%] lg:w-[75%] mx-auto relative">
                    <div className="absolute left-4 sm:left-9 top-0 w-[4px] h-full bg-dark dark:bg-light origin-top" />

                    <div className="space-y-16 pl-10 sm:pl-20">
                      {safeEducation.map((edu, idx) => (
                        <div key={edu.id || idx} className="relative my-8 first:mt-0 last:mb-0">
                          <LiIcon reference={eduRef} />

                          <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, type: 'spring' }}
                            viewport={{ once: true }}
                            className="space-y-2"
                          >
                            <h3 className="capitalize font-bold text-xl sm:text-2xl">
                              {edu.degree}&nbsp;
                              <span className="text-[#b63e96] dark:text-[#58e6d9] capitalize">
                                @{edu.institution}
                              </span>
                            </h3>

                            <span className="capitalize font-medium text-dark/75 dark:text-light/75 text-sm sm:text-base font-mono">
                              {edu.duration}
                            </span>

                            {edu.description && (
                              <p className="font-medium w-full text-sm sm:text-base leading-relaxed text-dark/90 dark:text-light/90">
                                {edu.description}
                              </p>
                            )}
                          </motion.div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 3: PROJECTS PAGE (Featured Project + Project Grid)      */}
          {/* ============================================================ */}
          {activeTab === 'projects' && (
            <div className="w-full flex flex-col items-center justify-center pt-8 space-y-16">
              
              <AnimatedText text="Imagination Trumps Knowledge!" className="mb-8" />

              <div className="grid grid-cols-12 gap-y-16 sm:gap-x-12 sm:gap-y-24 w-full">
                
                {safeProjects.map((project, index) => {
                  const isFeatured = index % 3 === 0;

                  if (isFeatured) {
                    return (
                      <div key={project.id || index} className="col-span-12">
                        <article className="w-full flex flex-col lg:flex-row items-center justify-between relative rounded-3xl rounded-br-2xl border-2 border-solid border-dark dark:border-light bg-light dark:bg-dark p-6 sm:p-10 shadow-2xl">
                          {/* CodeBucks signature offset shadow box */}
                          <div className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2.5rem] rounded-br-[2rem] bg-dark dark:bg-light" />

                          {/* Image */}
                          <div className="w-full lg:w-1/2 cursor-pointer overflow-hidden rounded-2xl border border-dark/20 dark:border-light/20">
                            {project.image ? (
                              <motion.img
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                src={project.image}
                                alt={project.name}
                                className="w-full h-64 sm:h-80 object-cover"
                              />
                            ) : (
                              <div className="w-full h-64 sm:h-80 bg-zinc-800 flex items-center justify-center text-zinc-400">
                                <Code className="w-12 h-12" />
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="w-full lg:w-1/2 flex flex-col items-start justify-between pl-0 lg:pl-8 pt-6 lg:pt-0 space-y-4">
                            <span className="text-[#b63e96] dark:text-[#58e6d9] font-bold text-sm sm:text-base font-mono uppercase tracking-wider">
                              Featured Project
                            </span>

                            <h2 className="text-2xl sm:text-4xl font-bold text-dark dark:text-light hover:underline cursor-pointer">
                              {project.name}
                            </h2>

                            <p className="font-medium text-dark/80 dark:text-light/80 text-sm sm:text-base leading-relaxed">
                              {project.description}
                            </p>

                            {project.technologies && project.technologies.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {project.technologies.map((t, i) => (
                                  <span key={i} className="text-xs font-mono px-2 py-0.5 rounded bg-dark/10 dark:bg-light/10 text-dark dark:text-light">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            )}

                            <div className="flex items-center gap-6 pt-2">
                              {project.githubUrl && (
                                <a
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-10 h-10 text-dark dark:text-light hover:scale-110 transition-transform"
                                  title="Source Code"
                                >
                                  <Github className="w-9 h-9" />
                                </a>
                              )}

                              {project.liveUrl && (
                                <a
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="rounded-lg bg-dark text-light dark:bg-light dark:text-dark px-6 py-2.5 text-base font-semibold hover:bg-light hover:text-dark dark:hover:bg-dark dark:hover:text-light border-2 border-solid border-transparent hover:border-dark dark:hover:border-light transition-all flex items-center gap-2"
                                >
                                  <span>Visit Project</span>
                                  <ArrowUpRight className="w-4 h-4" />
                                </a>
                              )}
                            </div>
                          </div>
                        </article>
                      </div>
                    );
                  }

                  // Regular 2-column project card
                  return (
                    <div key={project.id || index} className="col-span-12 md:col-span-6">
                      <article className="w-full flex flex-col items-center justify-center rounded-2xl border-2 border-solid border-dark dark:border-light bg-light dark:bg-dark p-6 relative shadow-2xl h-full">
                        <div className="absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark dark:bg-light" />

                        {/* Image */}
                        <div className="w-full cursor-pointer overflow-hidden rounded-xl border border-dark/20 dark:border-light/20 mb-4">
                          {project.image ? (
                            <motion.img
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.3 }}
                              src={project.image}
                              alt={project.name}
                              className="w-full h-48 sm:h-56 object-cover"
                            />
                          ) : (
                            <div className="w-full h-48 sm:h-56 bg-zinc-800 flex items-center justify-center text-zinc-400">
                              <Code className="w-10 h-10" />
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="w-full flex flex-col items-start justify-between space-y-3 flex-1">
                          <span className="text-[#b63e96] dark:text-[#58e6d9] font-bold text-xs sm:text-sm font-mono uppercase tracking-wider">
                            Project
                          </span>

                          <h2 className="text-xl sm:text-2xl font-bold text-dark dark:text-light hover:underline cursor-pointer">
                            {project.name}
                          </h2>

                          <p className="font-medium text-dark/80 dark:text-light/80 text-xs sm:text-sm leading-relaxed line-clamp-3">
                            {project.description}
                          </p>

                          <div className="w-full flex items-center justify-between pt-3 border-t border-dark/10 dark:border-light/10">
                            {project.liveUrl ? (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-semibold underline underline-offset-2 hover:opacity-80"
                              >
                                Visit
                              </a>
                            ) : <span />}

                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 text-dark dark:text-light hover:scale-110 transition-transform"
                              >
                                <Github className="w-7 h-7" />
                              </a>
                            )}
                          </div>
                        </div>
                      </article>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 4: ARTICLES PAGE (Featured Articles + Dynamic Row List)  */}
          {/* ============================================================ */}
          {activeTab === 'articles' && (
            <div className="w-full flex flex-col items-center justify-center pt-8 space-y-16">
              
              <AnimatedText text="Words Can Change The World!" className="mb-8" />

              {/* Featured Articles Grid (if articles exist) */}
              {safeArticles.length > 0 ? (
                <div className="w-full space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    {safeArticles.slice(0, 2).map((art, idx) => (
                      <article
                        key={art.id || idx}
                        className="col-span-1 w-full p-6 bg-light dark:bg-dark border-2 border-solid border-dark dark:border-light rounded-2xl relative shadow-2xl space-y-4"
                      >
                        <div className="absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark dark:bg-light" />

                        {art.coverImage && (
                          <div className="w-full h-52 rounded-xl overflow-hidden border border-dark/20 dark:border-light/20">
                            <motion.img
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.3 }}
                              src={art.coverImage}
                              alt={art.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        <span className="text-[#b63e96] dark:text-[#58e6d9] font-bold text-xs font-mono uppercase tracking-wider block">
                          {art.readTime || '5 min read'}
                        </span>

                        <h2 className="text-xl sm:text-2xl font-bold hover:underline cursor-pointer">
                          {art.title}
                        </h2>

                        <p className="text-sm font-medium text-dark/80 dark:text-light/80 line-clamp-3 leading-relaxed">
                          {art.excerpt}
                        </p>
                      </article>
                    ))}
                  </div>

                  {/* Regular Articles Interactive List */}
                  <div className="w-full space-y-4 pt-6">
                    <h2 className="font-bold text-4xl text-center my-8">
                      All Articles & Publications
                    </h2>

                    {safeArticles.map((article, idx) => (
                      <ArticleRow key={article.id || idx} article={article} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center border-2 border-dashed border-dark/30 dark:border-light/30 rounded-2xl space-y-3">
                  <FileText className="w-10 h-10 mx-auto text-dark/50 dark:text-light/50" />
                  <h3 className="text-lg font-bold">No Articles Published Yet</h3>
                  <p className="text-sm text-dark/70 dark:text-light/70 max-w-md mx-auto">
                    Articles written or shared in your BuildEasy portfolio will be featured here automatically with interactive preview popovers.
                  </p>
                </div>
              )}
            </div>
          )}
        </main>

        {/* 3. SIGNATURE CODEBUCKS FLOATING "HIRE ME" CIRCULAR BADGE */}
        <div className="fixed left-4 bottom-4 flex items-center justify-center overflow-hidden md:right-8 md:left-auto md:top-auto md:bottom-8 z-20">
          <div className="w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center relative">
            {/* Spinning Circular Text SVG */}
            <svg
              className="w-full h-full animate-spin [animation-duration:12s] fill-dark dark:fill-light"
              viewBox="0 0 300 300"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 150, 150 m -100, 0 a 100,100 0 1,1 200,0 a 100,100 0 1,1 -200,0"
                />
              </defs>
              <text fontSize="22" fontWeight="bold" letterSpacing="3">
                <textPath xlinkHref="#circlePath" className="uppercase font-mono">
                  Web Developer • Creative Developer •
                </textPath>
              </text>
            </svg>

            {/* Central "Hire Me" Button */}
            <a
              href={email ? `mailto:${email}` : '#'}
              className="flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark text-light shadow-md border border-solid border-dark w-16 h-16 sm:w-20 sm:h-20 rounded-full font-semibold hover:bg-light hover:text-dark dark:bg-light dark:text-dark dark:hover:bg-dark dark:hover:text-light dark:border-light transition-all text-xs sm:text-sm text-center select-none"
            >
              Hire Me
            </a>
          </div>
        </div>

        {/* 4. FOOTER */}
        <footer className="w-full border-t-2 border-solid border-dark dark:border-light font-medium text-base sm:text-lg py-8 px-6 sm:px-12 lg:px-24 flex flex-col sm:flex-row items-center justify-between text-dark dark:text-light gap-4">
          <span>{new Date().getFullYear()} &copy; All Rights Reserved.</span>

          <div className="flex items-center">
            <span>Built With&nbsp;</span>
            <span className="text-[#b63e96] dark:text-[#58e6d9] text-2xl px-1">
              &#9825;
            </span>
            <span>&nbsp;by&nbsp;</span>
            <span className="underline underline-offset-2 font-bold font-mono">
              {name}
            </span>
          </div>

          {email && (
            <a
              href={`mailto:${email}`}
              className="underline underline-offset-2 hover:opacity-80 transition-opacity"
            >
              Say hello
            </a>
          )}
        </footer>
      </div>
    </div>
  );
};
