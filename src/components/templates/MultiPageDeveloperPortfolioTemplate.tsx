import React, { useState, useMemo } from 'react';
import { PortfolioData, LayoutConfiguration, ProjectItem, ExperienceItem, SkillItem } from '../../types';
import { 
  Github, Linkedin, Twitter, Mail, ExternalLink, ArrowRight, 
  Send, Code, User, Briefcase, MessageSquare, Sun, Moon, 
  MapPin, CheckCircle2, GraduationCap, ChevronRight, Menu, X, Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MultiPageDeveloperPortfolioTemplateProps {
  data: PortfolioData;
  config?: LayoutConfiguration;
}

export const MultiPageDeveloperPortfolioTemplate: React.FC<MultiPageDeveloperPortfolioTemplateProps> = ({ data }) => {
  // Page navigation state: 'home' | 'about' | 'projects' | 'experience' | 'contact'
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'projects' | 'experience' | 'contact'>('home');
  // Isolated template-level Dark/Light Mode state
  const [isDarkMode, setIsDarkMode] = useState(true);
  // Mobile drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Contact Form state
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Safe data extraction
  const profile = useMemo(() => ({
    name: data.profile?.name || 'Payton Jewell',
    title: data.profile?.title || 'Full-Stack Software Engineer',
    bio: data.profile?.bio || 'Passionate software engineer building modern, accessible, and high-performance web applications.',
    location: data.profile?.location || 'San Francisco, CA',
    about: data.about?.aboutText || data.profile?.bio || 'I am a full-stack engineer with expertise in React, TypeScript, Node.js, and cloud computing. I enjoy solving complex technical challenges and crafting intuitive user experiences.',
    avatar: data.profile?.profilePhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    education: data.education || [
      { degree: 'B.S. in Computer Science', institution: 'University of California', year: '2020' }
    ]
  }), [data]);

  const projects = useMemo(() => (data.projects || []).map((p: ProjectItem) => ({
    title: p.name || 'Web Application',
    description: p.description || 'Full-stack application built with modern web technologies.',
    image: p.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    tags: p.technologies || ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
    githubUrl: p.githubUrl || '',
    liveUrl: p.liveUrl || '',
  })), [data.projects]);

  const experience = useMemo(() => (data.experience || []).map((e: ExperienceItem) => ({
    company: e.company || 'Tech Solutions Inc.',
    role: e.role || 'Senior Software Engineer',
    duration: e.duration || '2022 - Present',
    description: e.description || 'Architecting scalable cloud microservices, leading frontend performance optimizations, and mentoring junior developers.',
    achievements: e.achievements || [],
  })), [data.experience]);

  const skills = useMemo(() => {
    const defaultSkills = [
      { name: 'JavaScript', category: 'Frontend' },
      { name: 'TypeScript', category: 'Frontend' },
      { name: 'React', category: 'Frontend' },
      { name: 'Next.js', category: 'Frontend' },
      { name: 'Tailwind CSS', category: 'Frontend' },
      { name: 'Node.js', category: 'Backend' },
      { name: 'Python', category: 'Backend' },
      { name: 'PostgreSQL', category: 'Backend' },
      { name: 'MongoDB', category: 'Backend' },
      { name: 'Git & GitHub', category: 'Tools' },
      { name: 'Docker', category: 'Tools' },
      { name: 'AWS / Cloud', category: 'Tools' },
    ];

    if (!data.skills || data.skills.length === 0) return defaultSkills;

    return data.skills.map((s: SkillItem) => ({
      name: s.name,
      category: s.category || 'General',
    })).filter(s => Boolean(s.name));
  }, [data.skills]);

  const socialLinks = useMemo(() => ({
    github: data.socialLinks?.github || 'https://github.com',
    linkedin: data.socialLinks?.linkedin || 'https://linkedin.com',
    twitter: data.socialLinks?.twitter || '',
    email: data.profile?.email || data.contact?.email || 'contact@example.com',
  }), [data]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormSubmitted(false), 5000);
    }, 1000);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: User },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: MessageSquare },
  ] as const;

  return (
    <div 
      className={`min-h-screen transition-colors duration-300 font-sans antialiased flex flex-col justify-between selection:bg-purple-500 selection:text-white ${
        isDarkMode 
          ? 'bg-[#181623] text-zinc-100' 
          : 'bg-[#f4f5f8] text-zinc-800'
      }`}
    >
      {/* HEADER / NAVIGATION BAR */}
      <header className={`sticky top-0 z-50 border-b backdrop-blur-md transition-colors ${
        isDarkMode 
          ? 'bg-[#181623]/85 border-zinc-800' 
          : 'bg-white/85 border-zinc-200 shadow-sm'
      }`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo / Brand */}
          <button 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 group cursor-pointer text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
              {profile.name.charAt(0)}
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight block leading-tight">{profile.name}</span>
              <span className={`text-xs block font-medium ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                {profile.title.split(' ')[0]} Developer
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-opacity-40 p-1.5 rounded-2xl border border-transparent">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer relative ${
                    isActive
                      ? isDarkMode 
                        ? 'bg-purple-600 text-white shadow-md' 
                        : 'bg-purple-600 text-white shadow-md'
                      : isDarkMode
                        ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                        : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Dark / Light Mode Toggle Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                isDarkMode 
                  ? 'bg-[#221f33] border-zinc-700 text-amber-400 hover:bg-zinc-800' 
                  : 'bg-zinc-100 border-zinc-300 text-purple-600 hover:bg-zinc-200'
              }`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl border border-zinc-700 text-zinc-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden border-b px-6 py-4 space-y-2 ${
                isDarkMode ? 'bg-[#1c192b] border-zinc-800' : 'bg-white border-zinc-200'
              }`}
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    activeTab === item.id
                      ? 'bg-purple-600 text-white'
                      : isDarkMode ? 'text-zinc-300 hover:bg-zinc-800' : 'text-zinc-700 hover:bg-zinc-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MAIN CONTENT CANVAS */}
      <main className="max-w-6xl mx-auto px-6 py-12 flex-1 w-full">
        <AnimatePresence mode="wait">
          {/* ===================================================================
              1. HOME PAGE
              =================================================================== */}
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-16"
            >
              {/* Hero Section */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center pt-4">
                <div className="md:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Available for Opportunities</span>
                  </div>

                  <div className="space-y-3">
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-none">
                      Hi, I'm <span className="text-purple-500">{profile.name}</span>
                    </h1>
                    <h2 className={`text-xl sm:text-2xl font-semibold ${isDarkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                      {profile.title}
                    </h2>
                  </div>

                  <p className={`text-base sm:text-lg leading-relaxed max-w-xl ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    {profile.bio}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button
                      onClick={() => setActiveTab('projects')}
                      className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm transition-all shadow-lg hover:shadow-purple-500/25 cursor-pointer flex items-center gap-2"
                    >
                      <span>View Projects</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveTab('contact')}
                      className={`px-6 py-3 rounded-xl border font-semibold text-sm transition-colors cursor-pointer ${
                        isDarkMode
                          ? 'bg-[#221f33] border-zinc-700 text-zinc-200 hover:bg-zinc-800'
                          : 'bg-white border-zinc-300 text-zinc-700 hover:bg-zinc-50'
                      }`}
                    >
                      Get in Touch
                    </button>
                  </div>

                  {/* Social Buttons */}
                  <div className="flex items-center gap-3 pt-4 border-t border-zinc-800/40">
                    {socialLinks.github && (
                      <a
                        href={socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2.5 rounded-xl border transition-colors ${
                          isDarkMode ? 'bg-[#221f33] border-zinc-700 text-zinc-300 hover:text-white hover:border-purple-500' : 'bg-white border-zinc-200 text-zinc-600 hover:text-purple-600'
                        }`}
                        title="GitHub"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {socialLinks.linkedin && (
                      <a
                        href={socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2.5 rounded-xl border transition-colors ${
                          isDarkMode ? 'bg-[#221f33] border-zinc-700 text-zinc-300 hover:text-white hover:border-purple-500' : 'bg-white border-zinc-200 text-zinc-600 hover:text-purple-600'
                        }`}
                        title="LinkedIn"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {socialLinks.twitter && (
                      <a
                        href={socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2.5 rounded-xl border transition-colors ${
                          isDarkMode ? 'bg-[#221f33] border-zinc-700 text-zinc-300 hover:text-white hover:border-purple-500' : 'bg-white border-zinc-200 text-zinc-600 hover:text-purple-600'
                        }`}
                        title="Twitter"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                    {socialLinks.email && (
                      <a
                        href={`mailto:${socialLinks.email}`}
                        className={`p-2.5 rounded-xl border transition-colors ${
                          isDarkMode ? 'bg-[#221f33] border-zinc-700 text-zinc-300 hover:text-white hover:border-purple-500' : 'bg-white border-zinc-200 text-zinc-600 hover:text-purple-600'
                        }`}
                        title="Email"
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Profile Avatar Card */}
                <div className="md:col-span-5 flex justify-center">
                  <div className="relative group">
                    <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-purple-600 to-indigo-500 blur-md opacity-40 group-hover:opacity-75 transition-opacity" />
                    <div className={`relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border-2 shadow-2xl ${
                      isDarkMode ? 'border-zinc-700 bg-[#221f33]' : 'border-white bg-white'
                    }`}>
                      <img
                        src={profile.avatar}
                        alt={profile.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Highlight Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
                <div className={`p-6 rounded-2xl border space-y-2 ${
                  isDarkMode ? 'bg-[#221f33] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
                }`}>
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
                    <Code className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg">Featured Projects</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    {projects.length} application showcasing modern web design & logic.
                  </p>
                </div>

                <div className={`p-6 rounded-2xl border space-y-2 ${
                  isDarkMode ? 'bg-[#221f33] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
                }`}>
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg">Work Experience</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    {experience.length > 0 ? experience[0].company : 'Professional Engineering'}
                  </p>
                </div>

                <div className={`p-6 rounded-2xl border space-y-2 ${
                  isDarkMode ? 'bg-[#221f33] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
                }`}>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg">Technical Skills</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    Proficient in {skills.length} core modern tools & stacks.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ===================================================================
              2. ABOUT PAGE
              =================================================================== */}
          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-purple-500 font-semibold">
                  GET TO KNOW ME
                </span>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">About Me.</h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
                {/* Profile Card */}
                <div className="md:col-span-5">
                  <div className={`p-6 rounded-3xl border space-y-6 ${
                    isDarkMode ? 'bg-[#221f33] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
                  }`}>
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="w-full h-64 object-cover rounded-2xl"
                    />
                    <div className="space-y-2">
                      <h3 className="font-bold text-xl">{profile.name}</h3>
                      <p className="text-sm text-purple-400 font-medium">{profile.title}</p>
                      <div className={`flex items-center gap-2 text-xs pt-1 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                        <MapPin className="w-4 h-4 text-purple-500" />
                        <span>Based in {profile.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Biography Details */}
                <div className="md:col-span-7 space-y-6">
                  <div className={`p-8 rounded-3xl border space-y-4 ${
                    isDarkMode ? 'bg-[#221f33] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
                  }`}>
                    <h3 className="text-xl font-bold">Biography</h3>
                    <p className={`text-base leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                      {profile.about}
                    </p>
                  </div>

                  {/* Education */}
                  {profile.education.length > 0 && (
                    <div className={`p-8 rounded-3xl border space-y-4 ${
                      isDarkMode ? 'bg-[#221f33] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
                    }`}>
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-purple-500" />
                        <h3 className="text-xl font-bold">Education</h3>
                      </div>
                      <div className="space-y-3">
                        {profile.education.map((edu, idx) => (
                          <div key={idx} className="flex justify-between items-start border-b border-zinc-800/40 pb-3 last:border-0 last:pb-0">
                            <div>
                              <h4 className="font-bold text-sm">{edu.degree}</h4>
                              <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>{edu.institution}</p>
                            </div>
                            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 font-semibold">
                              {edu.year}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ===================================================================
              3. PROJECTS PAGE (COLOR IMAGES PRESERVED)
              =================================================================== */}
          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-purple-500 font-semibold">
                  MY RECENT WORK
                </span>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Portfolio Projects.</h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((proj, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.2 }}
                    className={`rounded-3xl border overflow-hidden flex flex-col justify-between transition-all ${
                      isDarkMode ? 'bg-[#221f33] border-zinc-800 hover:border-purple-500/50' : 'bg-white border-zinc-200 shadow-md hover:shadow-xl'
                    }`}
                  >
                    <div className="space-y-4">
                      {/* COLOR SCREENSHOT PRESERVED - STRICT NO GRAYSCALE */}
                      <div className="relative h-56 w-full overflow-hidden bg-zinc-900">
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>

                      <div className="p-6 space-y-3">
                        <h3 className="font-bold text-xl">{proj.title}</h3>
                        <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                          {proj.description}
                        </p>

                        <div className="flex flex-wrap gap-2 pt-2">
                          {proj.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className={`text-xs px-2.5 py-1 rounded-lg font-medium ${
                                isDarkMode ? 'bg-zinc-800 text-purple-300' : 'bg-purple-50 text-purple-700'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className={`p-6 pt-0 flex items-center gap-4 ${isDarkMode ? 'border-t border-zinc-800/40' : 'border-t border-zinc-100'} mt-4`}>
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`px-4 py-2 rounded-xl border font-semibold text-xs transition-colors flex items-center gap-1.5 ${
                            isDarkMode ? 'border-zinc-700 text-zinc-300 hover:text-white' : 'border-zinc-300 text-zinc-700 hover:bg-zinc-100'
                          }`}
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Code</span>
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ===================================================================
              4. EXPERIENCE & SKILLS PAGE
              =================================================================== */}
          {activeTab === 'experience' && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-purple-500 font-semibold">
                  CAREER & CAPABILITIES
                </span>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Experience & Skills.</h1>
              </div>

              {/* Skills Grid */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Technical Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map((s, idx) => (
                    <div
                      key={idx}
                      className={`px-4 py-2.5 rounded-xl border text-sm font-semibold transition-transform hover:scale-105 ${
                        isDarkMode
                          ? 'bg-[#221f33] border-zinc-800 text-purple-300'
                          : 'bg-white border-zinc-200 text-zinc-800 shadow-sm'
                      }`}
                    >
                      {s.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Work History */}
              {experience.length > 0 && (
                <div className="space-y-6 pt-6">
                  <h3 className="text-xl font-bold">Professional Experience</h3>
                  <div className="space-y-6">
                    {experience.map((exp, idx) => (
                      <div
                        key={idx}
                        className={`p-6 sm:p-8 rounded-3xl border space-y-4 ${
                          isDarkMode ? 'bg-[#221f33] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <h4 className="font-bold text-xl">{exp.role}</h4>
                            <p className="text-sm font-semibold text-purple-400">{exp.company}</p>
                          </div>
                          <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 font-semibold w-fit">
                            {exp.duration}
                          </span>
                        </div>
                        <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* ===================================================================
              5. CONTACT PAGE
              =================================================================== */}
          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-purple-500 font-semibold">
                  LET'S CONNECT
                </span>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Contact Me.</h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                {/* Contact Form */}
                <div className="md:col-span-7">
                  <div className={`p-8 rounded-3xl border space-y-6 ${
                    isDarkMode ? 'bg-[#221f33] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
                  }`}>
                    {formSubmitted ? (
                      <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6 shrink-0" />
                        <span>Thank you! Your message has been sent successfully.</span>
                      </div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold block">Your Name</label>
                          <input
                            type="text"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            required
                            className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                              isDarkMode ? 'bg-[#181623] border border-zinc-700 text-white' : 'bg-zinc-50 border border-zinc-300 text-zinc-900'
                            }`}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-semibold block">Your Email</label>
                          <input
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            required
                            className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                              isDarkMode ? 'bg-[#181623] border border-zinc-700 text-white' : 'bg-zinc-50 border border-zinc-300 text-zinc-900'
                            }`}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-semibold block">Message</label>
                          <textarea
                            rows={5}
                            placeholder="Write your message..."
                            value={formData.message}
                            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                            required
                            className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none ${
                              isDarkMode ? 'bg-[#181623] border border-zinc-700 text-white' : 'bg-zinc-50 border border-zinc-300 text-zinc-900'
                            }`}
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {isSubmitting ? <span>Sending...</span> : (
                            <>
                              <span>Send Message</span>
                              <Send className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                </div>

                {/* Direct Connect Options */}
                <div className="md:col-span-5 space-y-6">
                  <div className={`p-8 rounded-3xl border space-y-6 ${
                    isDarkMode ? 'bg-[#221f33] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
                  }`}>
                    <h3 className="text-xl font-bold">Contact Details</h3>
                    <div className="space-y-4 text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div>
                          <span className={`block text-xs ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Email Me</span>
                          <a href={`mailto:${socialLinks.email}`} className="font-semibold hover:text-purple-400">
                            {socialLinks.email}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <span className={`block text-xs ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Location</span>
                          <span className="font-semibold">{profile.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className={`border-t py-8 px-6 text-center text-xs font-medium transition-colors ${
        isDarkMode ? 'bg-[#181623] border-zinc-800 text-zinc-500' : 'bg-white border-zinc-200 text-zinc-500'
      }`}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => setActiveTab('home')} className="hover:text-purple-400">Home</button>
            <button onClick={() => setActiveTab('about')} className="hover:text-purple-400">About</button>
            <button onClick={() => setActiveTab('projects')} className="hover:text-purple-400">Projects</button>
            <button onClick={() => setActiveTab('contact')} className="hover:text-purple-400">Contact</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
