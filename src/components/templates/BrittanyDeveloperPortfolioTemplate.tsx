import React, { useState, useMemo } from 'react';
import { PortfolioData, LayoutConfiguration } from '../../types';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  ExternalLink, 
  Folder, 
  Menu, 
  X, 
  Check, 
  Copy, 
  ArrowUpRight,
  Globe,
  Instagram,
  Codepen,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BrittanyDeveloperPortfolioTemplateProps {
  data: PortfolioData;
  config?: LayoutConfiguration;
}

export const BrittanyDeveloperPortfolioTemplate: React.FC<BrittanyDeveloperPortfolioTemplateProps> = ({ 
  data, 
  config 
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  // Safe fallback dynamic data bindings from BuildEasy PortfolioData
  const profile = data?.profile || {
    name: 'Brittany Chiang',
    title: 'I build things for the web.',
    bio: "I'm a software engineer specializing in building (and occasionally designing) exceptional digital experiences. Currently, I'm focused on building accessible, human-centered products.",
    location: 'Boston, MA',
    email: 'brittany.chiang@example.com',
    website: 'https://brittanychiang.com',
    profilePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=700&auto=format&fit=crop&q=80'
  };

  const about = data?.about || {
    aboutText: "Hello! My name is Brittany and I enjoy creating things that live on the internet. My interest in web development started back in 2012 when I decided to try editing custom Tumblr themes — turns out hacking together a custom HTML/CSS reblog button taught me a lot about HTML & CSS!\n\nFast-forward to today, and I've had the privilege of working at an advertising agency, a start-up, a huge corporation, and a student-led design studio. My main focus these days is building accessible, inclusive products and digital experiences for a variety of clients.",
    interests: ['JavaScript (ES6+)', 'TypeScript', 'React', 'Eleventy', 'Node.js', 'WordPress'],
    services: [
      'Accessible Frontend Development',
      'Full-Stack Web Engineering',
      'Modern UI/UX Design Systems',
      'Performance & SEO Optimization'
    ]
  };

  const projects = useMemo(() => {
    if (data?.projects && data.projects.length > 0) {
      return data.projects;
    }
    return [
      {
        id: 'p-1',
        name: 'Halcyon Theme',
        description: 'A minimal, dark blue theme for VS Code, Sublime Text, Atom, iTerm, and more. Available on Visual Studio Marketplace, Package Control, and npm.',
        technologies: ['VS Code', 'Sublime Text', 'Atom', 'iTerm2', 'Hyper'],
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&auto=format&fit=crop&q=80',
        githubUrl: 'https://github.com',
        liveUrl: 'https://marketplace.visualstudio.com',
        featured: true,
        year: '2024'
      },
      {
        id: 'p-2',
        name: 'Spotify Profile Visualizer',
        description: 'A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio analysis of each track. Create playlists and more.',
        technologies: ['React', 'Spotify API', 'Styled Components', 'Express', 'Node.js'],
        image: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=900&auto=format&fit=crop&q=80',
        githubUrl: 'https://github.com',
        liveUrl: 'https://spotify-profile.dev',
        featured: true,
        year: '2023'
      },
      {
        id: 'p-3',
        name: 'OctoProfile',
        description: 'A nicer look at your GitHub profile and repo stats. Includes data visualizations of your top languages, starred repos, sortable repos by size/stars/forks, and user info.',
        technologies: ['Next.js', 'Chart.js', 'GitHub API', 'Tailwind CSS'],
        image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=900&auto=format&fit=crop&q=80',
        githubUrl: 'https://github.com',
        liveUrl: 'https://octoprofile.dev',
        featured: true,
        year: '2023'
      },
      {
        id: 'p-4',
        name: 'Apple Music Web Player',
        description: 'A web application built using Apple Music API and MusicKit JS allowing users to browse their iCloud library, listen to 30-second previews and play full tracks with an active subscription.',
        technologies: ['React', 'MusicKit JS', 'TypeScript', 'Node.js'],
        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=900&auto=format&fit=crop&q=80',
        githubUrl: 'https://github.com',
        liveUrl: 'https://apple-music-web.dev',
        featured: false,
        year: '2022'
      }
    ];
  }, [data?.projects]);

  const featuredProjects = useMemo(() => {
    const featured = projects.filter(p => p.featured);
    return featured.length > 0 ? featured : projects.slice(0, 3);
  }, [projects]);

  const otherProjects = useMemo(() => {
    const others = projects.filter(p => !p.featured);
    if (others.length > 0) return others;
    return [
      {
        id: 'op-1',
        name: 'Time to Have More Fun',
        description: 'A single page web app to help users discover events and activities in Boston with interactive map integration.',
        technologies: ['Next.js', 'Tailwind CSS', 'Mapbox API'],
        githubUrl: 'https://github.com',
        liveUrl: 'https://boston-fun.dev'
      },
      {
        id: 'op-2',
        name: 'Integrating Algolia Search with WordPress Multisite',
        description: 'Building a custom WordPress plugin to search multiple WordPress sites with Algolia Search API and real-time indexing.',
        technologies: ['PHP', 'WordPress', 'Algolia', 'JavaScript'],
        githubUrl: 'https://github.com',
        liveUrl: 'https://algolia.com'
      },
      {
        id: 'op-3',
        name: 'Google Keep Clone',
        description: 'A simple Google Keep clone built with Vue.js, Vuex and Firebase Firestore for note-taking with color coding and tags.',
        technologies: ['Vue.js', 'Firebase', 'CSS3'],
        githubUrl: 'https://github.com',
        liveUrl: 'https://keep-clone.dev'
      },
      {
        id: 'op-4',
        name: 'Apple Music Notification Bar',
        description: 'A lightweight macOS menu bar application built with Electron to show the currently playing Apple Music track with album artwork.',
        technologies: ['Electron', 'React', 'Node.js'],
        githubUrl: 'https://github.com',
        liveUrl: 'https://electronjs.org'
      },
      {
        id: 'op-5',
        name: 'Personal Website v1',
        description: 'First iteration of my personal website built with Jekyll and hosted on GitHub Pages with responsive grid layouts.',
        technologies: ['Jekyll', 'SCSS', 'HTML5', 'GitHub Pages'],
        githubUrl: 'https://github.com',
        liveUrl: 'https://github.com'
      },
      {
        id: 'op-6',
        name: 'Northeastern University Sandbox',
        description: 'Design and front-end development for Sandbox, a student organization that develops software solutions for researchers.',
        technologies: ['React', 'Gatsby', 'Styled Components'],
        githubUrl: 'https://github.com',
        liveUrl: 'https://sandboxnu.com'
      }
    ];
  }, [projects]);

  const experiences = useMemo(() => {
    if (data?.experience && data.experience.length > 0) {
      return data.experience;
    }
    return [
      {
        id: 'exp-1',
        company: 'Upstatement',
        role: 'Lead Engineer',
        duration: 'May 2018 — Present',
        description: 'Deliver high-quality, robust production code for a diverse array of clients including Harvard Business School, Everytown for Gun Safety, Pratt Institute, and more.',
        current: true,
        technologies: ['React', 'TypeScript', 'Next.js', 'Node.js', 'WordPress', 'GraphQL'],
        achievements: [
          'Deliver high-quality, robust production code for a diverse array of clients including Harvard Business School, Everytown for Gun Safety, and Pratt Institute',
          'Work alongside creative directors to lead the research, development, and architecture of technical solutions to fulfill business requirements',
          'Collaborate with designers, project managers, and other engineers to transform creative concepts into production realities',
          'Provide leadership within engineering department through close collaboration, knowledge shares, and spearheading internal tool development'
        ]
      },
      {
        id: 'exp-2',
        company: 'Apple',
        role: 'UI Engineer Co-op',
        duration: 'July — Dec 2017',
        description: 'Developed and styled interactive web applications and internal tools for Apple Music and iTunes using modern web technologies.',
        current: false,
        technologies: ['JavaScript', 'HTML5', 'SCSS', 'MusicKit JS', 'Ember'],
        achievements: [
          'Developed and styled interactive web applications for Apple Music including the embeddable web player widget',
          'Built internal tooling to streamline local development workflows and automated UI regression testing',
          'Architected and implemented front-end interface components adhering strictly to Apple design standards'
        ]
      },
      {
        id: 'exp-3',
        company: 'Scout',
        role: 'Studio Developer',
        duration: 'Jan — June 2017',
        description: 'Collaborated with other student designers and engineers on pro-bono digital products for local Boston non-profits and university initiatives.',
        current: false,
        technologies: ['React', 'SCSS', 'JavaScript', 'Node.js'],
        achievements: [
          'Collaborated with student designers to build custom websites and web applications for Boston non-profits',
          'Interfaced directly with clients weekly to review deliverables and refine user requirements'
        ]
      },
      {
        id: 'exp-4',
        company: 'Starry',
        role: 'Software Engineer Co-op',
        duration: 'July — Dec 2016',
        description: 'Engineered customer-facing web portals and internal telemetries for high-speed wireless internet services.',
        current: false,
        technologies: ['React', 'Redux', 'Node.js', 'CSS3'],
        achievements: [
          'Engineered and maintained major features of Starry customer-facing web application using React and ES6',
          'Proposed and implemented new responsive design patterns across account management dashboards'
        ]
      },
      {
        id: 'exp-5',
        company: 'MullenLowe',
        role: 'Creative Technologist',
        duration: 'July — Dec 2015',
        description: 'Developed interactive marketing campaigns and web applications for major national brands.',
        current: false,
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'jQuery'],
        achievements: [
          'Built interactive marketing websites and rich media advertisements for JetBlue, Lovesac, and U.S. Cellular',
          'Created animated interactive components with optimized 60fps canvas and CSS3 transitions'
        ]
      }
    ];
  }, [data?.experience]);

  const skillsList = useMemo(() => {
    if (data?.skills && data.skills.length > 0) {
      return data.skills.map(s => s.name);
    }
    return [
      'JavaScript (ES6+)',
      'TypeScript',
      'React',
      'Eleventy',
      'Node.js',
      'WordPress',
      'Next.js',
      'HTML & (S)CSS',
      'GraphQL',
      'Tailwind CSS'
    ];
  }, [data?.skills]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const navLinks = [
    { num: '01.', name: 'About', href: '#about' },
    { num: '02.', name: 'Experience', href: '#experience' },
    { num: '03.', name: 'Work', href: '#work' },
    { num: '04.', name: 'Contact', href: '#contact' }
  ];

  // Initial monogram for the hexagonal logo
  const initialLetter = (profile.name || 'B').trim().charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-[#0a192f] text-[#8892b0] font-sans selection:bg-[#233554] selection:text-[#64ffda] relative overflow-x-hidden">

      {/* ========================================================================= */}
      {/* 1. FIXED LEFT SIDE SOCIAL DOCK                                             */}
      {/* ========================================================================= */}
      <div className="fixed bottom-0 left-6 xl:left-12 hidden md:flex flex-col items-center gap-6 z-40">
        <div className="flex flex-col items-center gap-6">
          {data?.socialLinks?.github && (
            <a
              href={data.socialLinks.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="text-[#a8b2d1] hover:text-[#64ffda] hover:-translate-y-1 transition-all duration-200"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {data?.socialLinks?.instagram ? (
            <a
              href={data.socialLinks.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram Profile"
              className="text-[#a8b2d1] hover:text-[#64ffda] hover:-translate-y-1 transition-all duration-200"
            >
              <Instagram className="w-5 h-5" />
            </a>
          ) : (
            <a
              href={data?.socialLinks?.github || 'https://github.com'}
              target="_blank"
              rel="noreferrer"
              aria-label="CodePen Profile"
              className="text-[#a8b2d1] hover:text-[#64ffda] hover:-translate-y-1 transition-all duration-200"
            >
              <Codepen className="w-5 h-5" />
            </a>
          )}
          {data?.socialLinks?.twitter && (
            <a
              href={data.socialLinks.twitter}
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter Profile"
              className="text-[#a8b2d1] hover:text-[#64ffda] hover:-translate-y-1 transition-all duration-200"
            >
              <Twitter className="w-5 h-5" />
            </a>
          )}
          {data?.socialLinks?.linkedin && (
            <a
              href={data.socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className="text-[#a8b2d1] hover:text-[#64ffda] hover:-translate-y-1 transition-all duration-200"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          )}
          {!data?.socialLinks?.github && !data?.socialLinks?.linkedin && (
            <>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="text-[#a8b2d1] hover:text-[#64ffda] hover:-translate-y-1 transition-all duration-200"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://codepen.io"
                target="_blank"
                rel="noreferrer"
                aria-label="CodePen"
                className="text-[#a8b2d1] hover:text-[#64ffda] hover:-translate-y-1 transition-all duration-200"
              >
                <Codepen className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="text-[#a8b2d1] hover:text-[#64ffda] hover:-translate-y-1 transition-all duration-200"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </>
          )}
        </div>
        {/* Vertical Rule Line */}
        <div className="w-[1px] h-24 bg-[#a8b2d1]/40" />
      </div>

      {/* ========================================================================= */}
      {/* 2. FIXED RIGHT SIDE EMAIL DOCK                                             */}
      {/* ========================================================================= */}
      <div className="fixed bottom-0 right-6 xl:right-12 hidden md:flex flex-col items-center gap-6 z-40">
        <a
          href={`mailto:${profile.email}`}
          className="text-xs font-mono text-[#a8b2d1] hover:text-[#64ffda] hover:-translate-y-1 transition-all duration-200 tracking-widest [writing-mode:vertical-rl]"
        >
          {profile.email}
        </a>
        {/* Vertical Rule Line */}
        <div className="w-[1px] h-24 bg-[#a8b2d1]/40" />
      </div>

      {/* ========================================================================= */}
      {/* 3. MINIMAL NAVBAR & BRAND LOGO                                            */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 px-6 sm:px-12 py-5 bg-[#0a192f]/85 backdrop-blur-md transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Hexagonal Logo with Monogram */}
          <a 
            href="#hero" 
            className="group relative flex items-center justify-center w-11 h-11 text-[#64ffda] transition-transform duration-200 hover:-translate-y-0.5"
            aria-label="Home"
          >
            <svg 
              viewBox="0 0 84 96" 
              className="w-full h-full stroke-current fill-none stroke-[5] transition-all duration-300 group-hover:stroke-[#64ffda] group-hover:scale-105"
            >
              <polygon points="42 3, 81 25.5, 81 70.5, 42 93, 3 70.5, 3 25.5" />
            </svg>
            <span className="absolute font-mono font-bold text-lg text-[#64ffda]">
              {initialLetter}
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[#ccd6f6] hover:text-[#64ffda] transition-colors flex items-center py-1 group"
              >
                <span className="text-[#64ffda] mr-1.5 font-normal">{link.num}</span>
                <span className="font-sans text-[13px] text-[#ccd6f6] group-hover:text-[#64ffda] transition-colors">
                  {link.name}
                </span>
              </a>
            ))}

            {/* Resume Button */}
            <a
              href={`mailto:${profile.email}?subject=Resume%20Request`}
              className="px-4 py-2.5 rounded border border-[#64ffda] text-[#64ffda] hover:bg-[#64ffda]/10 transition-colors font-mono text-xs font-medium tracking-wide"
            >
              Resume
            </a>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 text-[#64ffda] focus:outline-none cursor-pointer"
            aria-label="Open mobile navigation menu"
          >
            <Menu className="w-7 h-7" />
          </button>

        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-[#0a192f]/70 backdrop-blur-sm z-50 md:hidden"
              />

              {/* Slide-out Menu Panel */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 bottom-0 w-[min(75vw,400px)] bg-[#112240] shadow-2xl z-50 p-8 flex flex-col justify-center items-center md:hidden"
              >
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="absolute top-6 right-6 p-2 text-[#64ffda] cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-7 h-7" />
                </button>

                <div className="flex flex-col items-center gap-7 text-center w-full">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex flex-col items-center gap-1 group py-1"
                    >
                      <span className="text-[#64ffda] font-mono text-sm">{link.num}</span>
                      <span className="text-[#ccd6f6] group-hover:text-[#64ffda] text-base font-sans font-medium transition-colors">
                        {link.name}
                      </span>
                    </a>
                  ))}

                  <a
                    href={`mailto:${profile.email}?subject=Resume%20Request`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="mt-4 px-9 py-3.5 rounded border border-[#64ffda] text-[#64ffda] hover:bg-[#64ffda]/10 transition-colors font-mono text-sm font-medium tracking-wide w-48 text-center"
                  >
                    Resume
                  </a>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Body */}
      <main className="max-w-5xl mx-auto px-6 sm:px-12 md:px-20 lg:px-24 py-12 sm:py-20 space-y-28 sm:space-y-36">

        {/* ========================================================================= */}
        {/* 4. HERO SECTION                                                           */}
        {/* ========================================================================= */}
        <section id="hero" className="min-h-[75vh] flex flex-col justify-center pt-8 sm:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-5 max-w-3xl"
          >
            {/* Small Greeting Subtitle */}
            <h1 className="text-[#64ffda] font-mono text-sm sm:text-base font-normal tracking-wide">
              Hi, my name is
            </h1>

            {/* Big Name Heading */}
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold text-[#ccd6f6] tracking-tight leading-none">
              {profile.name}.
            </h2>

            {/* Sub-headline / Title */}
            <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#8892b0] tracking-tight leading-tight">
              {profile.title}
            </h3>

            {/* Concise Bio */}
            <p className="text-[#8892b0] text-base sm:text-lg max-w-xl leading-relaxed pt-2">
              {profile.bio}
            </p>

            {/* Primary Action Button */}
            <div className="pt-8">
              <a
                href="#work"
                className="inline-block px-7 py-4 rounded border border-[#64ffda] text-[#64ffda] hover:bg-[#64ffda]/10 transition-colors font-mono text-sm font-medium tracking-wide"
              >
                Check out my work!
              </a>
            </div>
          </motion.div>
        </section>

        {/* ========================================================================= */}
        {/* 5. 01. ABOUT ME SECTION                                                   */}
        {/* ========================================================================= */}
        <section id="about" className="scroll-mt-24 space-y-8">
          
          {/* Section Numbered Heading */}
          <div className="flex items-center gap-4">
            <h2 className="flex items-center text-2xl sm:text-3xl font-bold text-[#ccd6f6] whitespace-nowrap">
              <span className="text-[#64ffda] font-mono text-lg sm:text-xl font-normal mr-2">01.</span>
              About Me
            </h2>
            <div className="h-[1px] bg-[#233554] w-full max-w-xs sm:max-w-sm md:max-w-md" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            
            {/* Left Narrative Text */}
            <div className="md:col-span-7 space-y-4 text-[#8892b0] text-base leading-relaxed">
              {about.aboutText.split('\n\n').map((paragraph, pIdx) => (
                <p key={pIdx}>
                  {paragraph}
                </p>
              ))}

              <p className="pt-2 text-sm text-[#ccd6f6]">
                Here are a few technologies I've been working with recently:
              </p>

              {/* 2-Column Skills List with Teal Triangle Bullets */}
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2 font-mono text-xs text-[#8892b0]">
                {skillsList.slice(0, 8).map((skill, sIdx) => (
                  <li key={sIdx} className="flex items-center gap-2">
                    <span className="text-[#64ffda] text-[10px]">▹</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Profile Photo with Classic Styled Teal Border Frame */}
            <div className="md:col-span-5 flex justify-center md:justify-end">
              <div className="relative group max-w-[280px] w-full">
                
                {/* Offset Teal Border Frame behind */}
                <div className="absolute top-4 left-4 w-full h-full rounded border-2 border-[#64ffda] transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />

                {/* Profile Image Container (Kept in full colorful vibrancy) */}
                <div className="relative w-full h-72 sm:h-80 rounded overflow-hidden bg-[#112240] shadow-xl z-10 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1">
                  {profile.profilePhoto ? (
                    <img
                      src={profile.profilePhoto}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-[#64ffda]">
                      <span className="text-4xl font-mono mb-2">{initialLetter}</span>
                      <span className="text-xs font-mono">{profile.name}</span>
                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>

        </section>

        {/* ========================================================================= */}
        {/* 6. 02. WHERE I'VE WORKED (EXPERIENCE TABS)                                 */}
        {/* ========================================================================= */}
        <section id="experience" className="scroll-mt-24 space-y-8 max-w-3xl">
          
          {/* Section Numbered Heading */}
          <div className="flex items-center gap-4">
            <h2 className="flex items-center text-2xl sm:text-3xl font-bold text-[#ccd6f6] whitespace-nowrap">
              <span className="text-[#64ffda] font-mono text-lg sm:text-xl font-normal mr-2">02.</span>
              Where I've Worked
            </h2>
            <div className="h-[1px] bg-[#233554] w-full max-w-xs sm:max-w-sm" />
          </div>

          <div className="flex flex-col md:flex-row gap-6 pt-2">
            
            {/* Vertical Company Tab Buttons */}
            <div className="flex md:flex-col overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-l-2 border-[#233554] shrink-0 scrollbar-none">
              {experiences.map((exp, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={exp.id || idx}
                    onClick={() => setActiveTab(idx)}
                    className={`px-5 py-3 text-left font-mono text-xs whitespace-nowrap transition-all duration-200 cursor-pointer relative ${
                      isActive 
                        ? 'text-[#64ffda] bg-[#112240]/60 font-semibold' 
                        : 'text-[#8892b0] hover:text-[#64ffda] hover:bg-[#112240]/30'
                    }`}
                  >
                    {/* Active Left Indicator Bar (desktop) or Bottom Indicator Bar (mobile) */}
                    {isActive && (
                      <span className="hidden md:block absolute left-[-2px] top-0 bottom-0 w-[2px] bg-[#64ffda]" />
                    )}
                    {isActive && (
                      <span className="md:hidden absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#64ffda]" />
                    )}
                    {exp.company}
                  </button>
                );
              })}
            </div>

            {/* Tab Content Panel */}
            <div className="flex-1 min-h-[280px]">
              {experiences[activeTab] && (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-[#ccd6f6] flex flex-wrap items-center gap-1.5">
                      <span>{experiences[activeTab].role}</span>
                      <span className="text-[#64ffda]">@ {experiences[activeTab].company}</span>
                    </h3>
                    <p className="font-mono text-xs text-[#a8b2d1] mt-1">
                      {experiences[activeTab].duration}
                    </p>
                  </div>

                  {/* Bullet Points */}
                  <ul className="space-y-3 pt-2 text-[#8892b0] text-sm sm:text-base leading-relaxed">
                    {experiences[activeTab].achievements && experiences[activeTab].achievements.length > 0 ? (
                      experiences[activeTab].achievements.map((item, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-3">
                          <span className="text-[#64ffda] text-xs mt-1 shrink-0">▹</span>
                          <span>{item}</span>
                        </li>
                      ))
                    ) : (
                      <li className="flex items-start gap-3">
                        <span className="text-[#64ffda] text-xs mt-1 shrink-0">▹</span>
                        <span>{experiences[activeTab].description}</span>
                      </li>
                    )}
                  </ul>

                  {/* Tech stack used in this role */}
                  {experiences[activeTab].technologies && experiences[activeTab].technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-3 font-mono text-xs text-[#a8b2d1]">
                      {experiences[activeTab].technologies.map((t, tIdx) => (
                        <span key={tIdx} className="px-2.5 py-1 rounded bg-[#112240] text-[#64ffda] border border-[#233554]/60">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </div>

          </div>

        </section>

        {/* ========================================================================= */}
        {/* 7. 03. SOME THINGS I'VE BUILT (FEATURED PROJECTS)                         */}
        {/* ========================================================================= */}
        <section id="work" className="scroll-mt-24 space-y-16">
          
          {/* Section Numbered Heading */}
          <div className="flex items-center gap-4">
            <h2 className="flex items-center text-2xl sm:text-3xl font-bold text-[#ccd6f6] whitespace-nowrap">
              <span className="text-[#64ffda] font-mono text-lg sm:text-xl font-normal mr-2">03.</span>
              Some Things I've Built
            </h2>
            <div className="h-[1px] bg-[#233554] w-full max-w-xs sm:max-w-sm md:max-w-md" />
          </div>

          {/* Featured Projects Overlapping Layout List */}
          <div className="space-y-24 sm:space-y-32">
            {featuredProjects.map((project, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div 
                  key={project.id || idx}
                  className="relative grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                >
                  
                  {/* Project Image Box (Always in Full Color, Never Grayscale) */}
                  <div 
                    className={`md:col-span-7 relative rounded overflow-hidden bg-[#112240] shadow-2xl group ${
                      isEven ? 'md:col-start-1' : 'md:col-start-6'
                    }`}
                  >
                    <a
                      href={project.liveUrl || project.githubUrl || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="block relative w-full h-64 sm:h-80 lg:h-96 overflow-hidden"
                    >
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-[#64ffda] bg-[#112240]">
                          <Folder className="w-16 h-16 text-[#64ffda] opacity-40 mb-2" />
                          <span className="font-mono text-sm">{project.name}</span>
                        </div>
                      )}
                    </a>
                  </div>

                  {/* Overlapping Content Box */}
                  <div 
                    className={`md:col-span-7 z-20 flex flex-col justify-center space-y-3 ${
                      isEven 
                        ? 'md:col-start-6 md:items-end md:text-right' 
                        : 'md:col-start-1 md:items-start md:text-left'
                    } mt-4 md:mt-0`}
                  >
                    <div className="font-mono text-xs text-[#64ffda]">
                      Featured Project
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-[#ccd6f6] hover:text-[#64ffda] transition-colors">
                      <a 
                        href={project.liveUrl || project.githubUrl || '#'} 
                        target="_blank" 
                        rel="noreferrer"
                      >
                        {project.name}
                      </a>
                    </h3>

                    {/* Floating Description Card in #112240 */}
                    <div className="p-5 sm:p-6 rounded bg-[#112240] shadow-2xl text-sm sm:text-base text-[#a8b2d1] leading-relaxed max-w-lg border border-[#233554]/40">
                      {project.description}
                    </div>

                    {/* Tech Stack List */}
                    {project.technologies && project.technologies.length > 0 && (
                      <ul className={`flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-[#a8b2d1] pt-1 ${
                        isEven ? 'md:justify-end' : 'md:justify-start'
                      }`}>
                        {project.technologies.map((tech, tIdx) => (
                          <li key={tIdx}>{tech}</li>
                        ))}
                      </ul>
                    )}

                    {/* Project Links (GitHub & Live) */}
                    <div className={`flex items-center gap-4 pt-2 text-[#ccd6f6] ${
                      isEven ? 'md:justify-end' : 'md:justify-start'
                    }`}>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="GitHub Repository"
                          className="hover:text-[#64ffda] hover:-translate-y-0.5 transition-all p-1"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Live Demo"
                          className="hover:text-[#64ffda] hover:-translate-y-0.5 transition-all p-1"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>

                  </div>

                </div>
              );
            })}
          </div>

          {/* ========================================================================= */}
          {/* 8. OTHER NOTEWORTHY PROJECTS (CARD ARCHIVE GRID)                           */}
          {/* ========================================================================= */}
          <div className="space-y-8 pt-16">
            
            <div className="text-center space-y-2">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#ccd6f6]">
                Other Noteworthy Projects
              </h3>
              <a
                href={data?.socialLinks?.github || 'https://github.com'}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-[#64ffda] hover:underline inline-block"
              >
                view the archive
              </a>
            </div>

            {/* 3-Column Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherProjects.map((proj, idx) => (
                <div
                  key={proj.id || idx}
                  className="p-7 rounded bg-[#112240] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between space-y-6 group shadow-lg border border-transparent hover:border-[#64ffda]/30"
                >
                  
                  {/* Top Bar with Folder and Action Links */}
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <Folder className="w-10 h-10 text-[#64ffda] stroke-[1.5]" />
                      
                      <div className="flex items-center gap-3 text-[#ccd6f6]">
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub Repository"
                            className="hover:text-[#64ffda] transition-colors"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Live Project"
                            className="hover:text-[#64ffda] transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    <h4 className="text-lg font-bold text-[#ccd6f6] group-hover:text-[#64ffda] transition-colors">
                      <a href={proj.liveUrl || proj.githubUrl || '#'} target="_blank" rel="noreferrer">
                        {proj.name}
                      </a>
                    </h4>

                    <p className="text-xs sm:text-sm text-[#8892b0] leading-relaxed line-clamp-4">
                      {proj.description}
                    </p>
                  </div>

                  {/* Footer Tech Tags */}
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-[#8892b0] pt-2">
                      {proj.technologies.map((tech, tIdx) => (
                        <span key={tIdx}>{tech}</span>
                      ))}
                    </div>
                  )}

                </div>
              ))}
            </div>

          </div>

        </section>

        {/* ========================================================================= */}
        {/* 9. 04. WHAT'S NEXT? / GET IN TOUCH (CONTACT)                              */}
        {/* ========================================================================= */}
        <section id="contact" className="scroll-mt-24 py-16 text-center space-y-6 max-w-xl mx-auto">
          
          <div className="font-mono text-[#64ffda] text-sm sm:text-base font-normal">
            04. What's Next?
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-[#ccd6f6] tracking-tight">
            Get In Touch
          </h2>

          <p className="text-[#8892b0] text-base sm:text-lg leading-relaxed">
            Although I'm not currently looking for any new opportunities, my inbox is always open. 
            Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="px-8 py-4 rounded border border-[#64ffda] text-[#64ffda] hover:bg-[#64ffda]/10 transition-colors font-mono text-sm font-medium tracking-wide inline-block"
            >
              Say Hello
            </a>

            <button
              onClick={handleCopyEmail}
              className="px-5 py-4 rounded bg-[#112240] hover:bg-[#233554] text-[#a8b2d1] hover:text-[#64ffda] transition-colors font-mono text-xs flex items-center gap-2 cursor-pointer border border-[#233554]"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#64ffda]" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Email</span>
                </>
              )}
            </button>
          </div>

        </section>

      </main>

      {/* ========================================================================= */}
      {/* 10. UNDERSTATED FOOTER                                                    */}
      {/* ========================================================================= */}
      <footer className="py-8 px-6 text-center space-y-4">
        
        {/* Mobile Socials Dock (Visible on Mobile only) */}
        <div className="flex md:hidden items-center justify-center gap-6 text-[#a8b2d1]">
          {data?.socialLinks?.github && (
            <a href={data.socialLinks.github} target="_blank" rel="noreferrer" className="hover:text-[#64ffda]">
              <Github className="w-5 h-5" />
            </a>
          )}
          {data?.socialLinks?.instagram ? (
            <a href={data.socialLinks.instagram} target="_blank" rel="noreferrer" className="hover:text-[#64ffda]">
              <Instagram className="w-5 h-5" />
            </a>
          ) : (
            <a href="https://codepen.io" target="_blank" rel="noreferrer" className="hover:text-[#64ffda]">
              <Codepen className="w-5 h-5" />
            </a>
          )}
          {data?.socialLinks?.twitter && (
            <a href={data.socialLinks.twitter} target="_blank" rel="noreferrer" className="hover:text-[#64ffda]">
              <Twitter className="w-5 h-5" />
            </a>
          )}
          {data?.socialLinks?.linkedin && (
            <a href={data.socialLinks.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#64ffda]">
              <Linkedin className="w-5 h-5" />
            </a>
          )}
          {!data?.socialLinks?.github && !data?.socialLinks?.linkedin && (
            <>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[#64ffda]">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#64ffda]">
                <Linkedin className="w-5 h-5" />
              </a>
            </>
          )}
        </div>

        <div className="font-mono text-xs text-[#8892b0] hover:text-[#64ffda] transition-colors">
          <a
            href="https://github.com/bchiang7/v4"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            Designed &amp; Built by {profile.name}
          </a>
        </div>

        <div className="flex items-center justify-center gap-4 text-[11px] font-mono text-[#8892b0]">
          <span>★ 7.2k</span>
          <span>·</span>
          <span>⑂ 3.8k</span>
        </div>

      </footer>

    </div>
  );
};
