import React, { useState, useEffect, useMemo } from 'react';
import { PortfolioData, LayoutConfiguration } from '../../types';
import { MagicUIPortfolioAdapter } from '../../lib/MagicUIPortfolioAdapter';
import { 
  Github, Linkedin, Twitter, Mail, ArrowLeft, Home, 
  Briefcase, GraduationCap, Code2, FolderGit2, BookOpen, 
  Sun, Moon, MapPin, ExternalLink, Calendar, MessageSquare, Send, Globe, ChevronDown, ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MagicfolioPortfolioTemplateProps {
  data: PortfolioData;
  config?: LayoutConfiguration;
}

/**
 * BlurFade - Minimalist, high-performance animation wrapper using Framer Motion
 */
const BlurFade: React.FC<{
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  blur?: string;
  className?: string;
}> = ({
  children,
  delay = 0,
  duration = 0.4,
  yOffset = 8,
  blur = '6px',
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, filter: `blur(${blur})` }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        delay,
        duration,
        ease: 'easeOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const MagicfolioPortfolioTemplate: React.FC<MagicfolioPortfolioTemplateProps> = ({ data, config }) => {
  // Safe adapter mapping user data
  const portfolio = useMemo(() => MagicUIPortfolioAdapter(data), [data]);

  // Dark/Light Theme state inside template
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Expanded work experience accordions
  const [expandedWork, setExpandedWork] = useState<Record<number, boolean>>({});

  // Active blog post slug (for reading page view)
  const [activePostSlug, setActivePostSlug] = useState<string | null>(null);

  // Active navigation anchor section
  const [activeSection, setActiveSection] = useState<string>('home');

  // Contact form submission state
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Sync theme changes from config if provided
  useEffect(() => {
    if (config?.bgStyle) {
      setIsDarkMode(config.bgStyle === 'dark' || config.bgStyle === 'slate' || config.bgStyle === 'zinc');
    }
  }, [config]);

  // Scroll spy to highlight active section in floating bottom dock
  useEffect(() => {
    if (activePostSlug) return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const sections = ['home', 'about', 'experience', 'education', 'skills', 'projects', 'blog', 'contact'];
      
      for (const section of sections) {
        const el = document.getElementById(`magicfolio-${section}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activePostSlug]);

  const toggleWorkAccordion = (idx: number) => {
    setExpandedWork(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const activePost = useMemo(() => {
    if (!activePostSlug) return null;
    return portfolio.posts.find(p => p.slug === activePostSlug);
  }, [activePostSlug, portfolio.posts]);

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

  const scrollToSection = (id: string) => {
    if (activePostSlug) {
      setActivePostSlug(null);
      setTimeout(() => {
        const el = document.getElementById(`magicfolio-${id}`);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(`magicfolio-${id}`);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(id);
  };

  return (
    <div id="magicfolio-portfolio-root" className={`min-h-screen ${isDarkMode ? 'dark bg-zinc-950 text-zinc-100' : 'bg-white text-zinc-900'} font-sans antialiased selection:bg-zinc-200 dark:selection:bg-zinc-800 transition-colors duration-300 pb-28 relative`}>
      
      {/* Container */}
      <div className="max-w-2xl mx-auto px-6 py-12 md:py-20 space-y-12 md:space-y-16">
        
        <AnimatePresence mode="wait">
          {activePostSlug && activePost ? (
            /* =========================================
               SINGLE BLOG ARTICLE READER VIEW
               ========================================= */
            <motion.div
              key="article-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-8"
            >
              <button
                onClick={() => setActivePostSlug(null)}
                className="inline-flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span>Back to portfolio</span>
              </button>

              <header className="space-y-3 border-b border-zinc-200 dark:border-zinc-800 pb-6">
                <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{activePost.publishedAt}</span>
                  <span>•</span>
                  <span>{activePost.readingTime}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                  {activePost.title}
                </h1>
                {activePost.tags && activePost.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {activePost.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </header>

              <article className="prose dark:prose-invert max-w-none text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                {activePost.content || activePost.excerpt}
              </article>
            </motion.div>
          ) : (
            /* =========================================
               MAIN SINGLE-PAGE PORTFOLIO FLOW
               ========================================= */
            <motion.div key="main-flow" className="space-y-12 md:space-y-16">
              
              {/* 1. HERO SECTION */}
              <section id="magicfolio-home" className="space-y-6 pt-4">
                <BlurFade delay={0.1}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2 max-w-xl">
                      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                        Hi, I'm {portfolio.profile.name.split(' ')[0]} 👋
                      </h1>
                      <p className="text-base text-zinc-600 dark:text-zinc-400 leading-normal">
                        {portfolio.profile.role}
                      </p>
                      {portfolio.profile.location && (
                        <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 pt-1 font-mono">
                          <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                          <span>{portfolio.profile.location}</span>
                        </div>
                      )}
                    </div>
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <img
                        src={portfolio.profile.avatar}
                        alt={portfolio.profile.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-zinc-200 dark:border-zinc-800 shadow-sm"
                      />
                      <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-950" title="Available for work"></span>
                    </div>
                  </div>
                </BlurFade>

                {/* Short intro bio */}
                <BlurFade delay={0.15}>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {portfolio.profile.bio}
                  </p>
                </BlurFade>

                {/* Social Quick Links */}
                <BlurFade delay={0.2}>
                  <div className="flex items-center gap-2 pt-1">
                    {portfolio.socialLinks.github && (
                      <a
                        href={portfolio.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                        title="GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {portfolio.socialLinks.linkedin && (
                      <a
                        href={portfolio.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                        title="LinkedIn"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {portfolio.socialLinks.twitter && (
                      <a
                        href={portfolio.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                        title="Twitter / X"
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                    {portfolio.socialLinks.email && (
                      <a
                        href={`mailto:${portfolio.socialLinks.email}`}
                        className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                        title="Email"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      onClick={() => scrollToSection('contact')}
                      className="ml-auto px-3 py-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer"
                    >
                      Get in Touch
                    </button>
                  </div>
                </BlurFade>
              </section>

              {/* 2. ABOUT SECTION */}
              <section id="magicfolio-about" className="space-y-3">
                <BlurFade delay={0.25}>
                  <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    About
                  </h2>
                </BlurFade>
                <BlurFade delay={0.3}>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-3">
                    <p>{portfolio.profile.summary}</p>
                  </div>
                </BlurFade>
              </section>

              {/* 3. WORK EXPERIENCE SECTION */}
              {portfolio.experience.length > 0 && (
                <section id="magicfolio-experience" className="space-y-4">
                  <BlurFade delay={0.35}>
                    <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                      Work Experience
                    </h2>
                  </BlurFade>
                  <div className="space-y-3">
                    {portfolio.experience.map((exp, idx) => (
                      <BlurFade key={idx} delay={0.35 + idx * 0.05}>
                        <div className="p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-xs space-y-2">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shrink-0 font-bold text-xs text-zinc-700 dark:text-zinc-300">
                                {exp.company.substring(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                  {exp.company}
                                </h3>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                  {exp.role}
                                </p>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500">
                                {exp.duration}
                              </span>
                              {exp.description && (
                                <button
                                  onClick={() => toggleWorkAccordion(idx)}
                                  className="block ml-auto pt-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors cursor-pointer"
                                  title="Toggle details"
                                >
                                  {expandedWork[idx] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Accordion or short details */}
                          {exp.description && (
                            <AnimatePresence>
                              {(expandedWork[idx] || idx === 0) && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="pt-2 text-xs text-zinc-600 dark:text-zinc-400 space-y-1.5 border-t border-zinc-100 dark:border-zinc-800/60 mt-2"
                                >
                                  <p className="leading-relaxed">{exp.description}</p>
                                  {exp.achievements && exp.achievements.length > 0 && (
                                    <ul className="list-disc list-inside space-y-0.5 text-zinc-500 dark:text-zinc-400 pt-1">
                                      {exp.achievements.map((ach, aIdx) => (
                                        <li key={aIdx}>{ach}</li>
                                      ))}
                                    </ul>
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          )}
                        </div>
                      </BlurFade>
                    ))}
                  </div>
                </section>
              )}

              {/* 4. EDUCATION SECTION */}
              {portfolio.education.length > 0 && (
                <section id="magicfolio-education" className="space-y-4">
                  <BlurFade delay={0.4}>
                    <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                      Education
                    </h2>
                  </BlurFade>
                  <div className="space-y-3">
                    {portfolio.education.map((edu, idx) => (
                      <BlurFade key={idx} delay={0.4 + idx * 0.05}>
                        <div className="p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-xs flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shrink-0">
                              <GraduationCap className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                            </div>
                            <div>
                              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                {edu.institution}
                              </h3>
                              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                {edu.degree} {edu.grade ? `• ${edu.grade}` : ''}
                              </p>
                            </div>
                          </div>
                          <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 shrink-0">
                            {edu.duration}
                          </span>
                        </div>
                      </BlurFade>
                    ))}
                  </div>
                </section>
              )}

              {/* 5. SKILLS SECTION */}
              {portfolio.skills.length > 0 && (
                <section id="magicfolio-skills" className="space-y-3">
                  <BlurFade delay={0.45}>
                    <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                      Skills
                    </h2>
                  </BlurFade>
                  <BlurFade delay={0.5}>
                    <div className="flex flex-wrap gap-1.5">
                      {portfolio.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-mono font-medium shadow-2xs hover:scale-105 transition-transform"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </BlurFade>
                </section>
              )}

              {/* 6. PROJECTS SECTION (2-column grid, COLOR IMAGES preserved) */}
              {portfolio.projects.length > 0 && (
                <section id="magicfolio-projects" className="space-y-4">
                  <BlurFade delay={0.55}>
                    <div className="space-y-1">
                      <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                        Check out my latest work
                      </h2>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        A selection of projects I've built or contributed to.
                      </p>
                    </div>
                  </BlurFade>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {portfolio.projects.map((proj, idx) => (
                      <BlurFade key={idx} delay={0.55 + idx * 0.05}>
                        <div className="group rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 overflow-hidden shadow-xs flex flex-col h-full hover:border-zinc-300 dark:hover:border-zinc-700 transition-all">
                          {/* Project Image - FULL COLOR preserved */}
                          {proj.image && (
                            <div className="relative aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                              <img
                                src={proj.image}
                                alt={proj.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}

                          <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                  {proj.title}
                                </h3>
                                {proj.year && (
                                  <span className="text-[10px] font-mono text-zinc-400">
                                    {proj.year}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                                {proj.description}
                              </p>
                            </div>

                            <div className="space-y-3 pt-1">
                              {/* Tech Stack Pills */}
                              {proj.technologies && proj.technologies.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {proj.technologies.map((tech, tIdx) => (
                                    <span
                                      key={tIdx}
                                      className="px-1.5 py-0.5 rounded text-[9.5px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              )}

                              {/* Project Links */}
                              <div className="flex items-center gap-2 pt-1 border-t border-zinc-100 dark:border-zinc-800/80">
                                {proj.liveUrl && (
                                  <a
                                    href={proj.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                                  >
                                    <Globe className="w-3 h-3" />
                                    <span>Website</span>
                                  </a>
                                )}
                                {proj.githubUrl && (
                                  <a
                                    href={proj.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                                  >
                                    <Github className="w-3 h-3" />
                                    <span>Source</span>
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </BlurFade>
                    ))}
                  </div>
                </section>
              )}

              {/* 7. BLOG / WRITING SECTION */}
              {portfolio.posts.length > 0 && (
                <section id="magicfolio-blog" className="space-y-4">
                  <BlurFade delay={0.6}>
                    <div className="space-y-1">
                      <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                        Writing & Thoughts
                      </h2>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Articles, tutorials, and technical notes.
                      </p>
                    </div>
                  </BlurFade>

                  <div className="space-y-2">
                    {portfolio.posts.map((post, idx) => (
                      <BlurFade key={idx} delay={0.6 + idx * 0.05}>
                        <div
                          onClick={() => setActivePostSlug(post.slug)}
                          className="p-3.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-pointer flex items-center justify-between gap-4 group"
                        >
                          <div className="space-y-1">
                            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                              {post.excerpt}
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 block">
                              {post.publishedAt}
                            </span>
                            <span className="text-[10px] text-zinc-400 block pt-0.5">
                              {post.readingTime}
                            </span>
                          </div>
                        </div>
                      </BlurFade>
                    ))}
                  </div>
                </section>
              )}

              {/* 8. CONTACT SECTION */}
              <section id="magicfolio-contact" className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <BlurFade delay={0.65}>
                  <div className="text-center max-w-md mx-auto space-y-2">
                    <span className="px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono text-[11px] font-semibold">
                      Contact
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                      Get in Touch
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Want to chat? Just send me an email or shoot me a DM on Twitter and I'll respond as soon as I can.
                    </p>
                  </div>
                </BlurFade>

                <BlurFade delay={0.7}>
                  <div className="max-w-md mx-auto space-y-3">
                    {submitSuccess ? (
                      <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-center text-xs font-medium">
                        ✓ Message sent successfully! I'll get back to you shortly.
                      </div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Name"
                            value={formState.name}
                            onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                            required
                            className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600"
                          />
                          <input
                            type="email"
                            placeholder="Email"
                            value={formState.email}
                            onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                            required
                            className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600"
                          />
                        </div>
                        <textarea
                          placeholder="Your message..."
                          rows={3}
                          value={formState.message}
                          onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                          required
                          className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 resize-none"
                        ></textarea>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-2.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium text-xs flex items-center justify-center gap-2 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer shadow-xs"
                        >
                          {isSubmitting ? (
                            <span>Sending...</span>
                          ) : (
                            <>
                              <span>Send Message</span>
                              <Send className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      </form>
                    )}

                    <div className="text-center pt-2">
                      {portfolio.socialLinks.email && (
                        <a
                          href={`mailto:${portfolio.socialLinks.email}`}
                          className="text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
                        >
                          {portfolio.socialLinks.email}
                        </a>
                      )}
                    </div>
                  </div>
                </BlurFade>
              </section>

              {/* 9. FOOTER */}
              <footer className="pt-8 text-center text-[11px] font-mono text-zinc-400 dark:text-zinc-600 border-t border-zinc-100 dark:border-zinc-800">
                <p>© {new Date().getFullYear()} {portfolio.profile.name}. All rights reserved.</p>
              </footer>

            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* FLOATING BOTTOM DOCK NAVIGATION (Faithful to Magic UI / Dillion Verma) */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-1 sm:gap-1.5 p-1.5 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800 shadow-lg text-xs">
          <button
            onClick={() => scrollToSection('home')}
            className={`p-2 rounded-full transition-colors ${activeSection === 'home' ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
            title="Home"
          >
            <Home className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => scrollToSection('about')}
            className={`p-2 rounded-full transition-colors ${activeSection === 'about' ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
            title="About"
          >
            <Code2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => scrollToSection('experience')}
            className={`p-2 rounded-full transition-colors ${activeSection === 'experience' ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
            title="Work"
          >
            <Briefcase className="w-4 h-4" />
          </button>

          <button
            onClick={() => scrollToSection('projects')}
            className={`p-2 rounded-full transition-colors ${activeSection === 'projects' ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
            title="Projects"
          >
            <FolderGit2 className="w-4 h-4" />
          </button>

          {portfolio.posts.length > 0 && (
            <button
              onClick={() => scrollToSection('blog')}
              className={`p-2 rounded-full transition-colors ${activeSection === 'blog' ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
              title="Blog"
            >
              <BookOpen className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => scrollToSection('contact')}
            className={`p-2 rounded-full transition-colors ${activeSection === 'contact' ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
            title="Contact"
          >
            <MessageSquare className="w-4 h-4" />
          </button>

          <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800 mx-0.5"></div>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setIsDarkMode(prev => !prev)}
            className="p-2 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
          </button>
        </div>
      </div>
    </div>
  );
};
