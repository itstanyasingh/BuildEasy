import React, { useState, useEffect, useMemo } from 'react';
import { PortfolioData, LayoutConfiguration } from '../../types';
import { MagicUIPortfolioAdapter } from '../../lib/MagicUIPortfolioAdapter';
import { 
  Github, Linkedin, Twitter, Mail, ArrowLeft, Home, 
  Briefcase, GraduationCap, Code2, FolderGit2, BookOpen, 
  Sun, Moon, MapPin, ExternalLink, Calendar, MessageSquare, Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MagicUIPortfolioTemplateProps {
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

export const MagicUIPortfolioTemplate: React.FC<MagicUIPortfolioTemplateProps> = ({ data, config }) => {
  // Safe адаптер mapping user data
  const portfolio = useMemo(() => MagicUIPortfolioAdapter(data), [data]);

  // Dark/Light Theme state inside the template
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Expanded work accordions
  const [expandedWork, setExpandedWork] = useState<Record<number, boolean>>({});

  // Active blog post slug (for reading page view)
  const [activePostSlug, setActivePostSlug] = useState<string | null>(null);

  // Active navigation anchor section
  const [activeSection, setActiveSection] = useState<string>('home');

  // Contact form submission state
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Sync theme changes
  useEffect(() => {
    // Read from layout config fallback or default to dark
    if (config?.bgStyle) {
      setIsDarkMode(config.bgStyle === 'dark' || config.bgStyle === 'slate' || config.bgStyle === 'zinc');
    }
  }, [config]);

  // Scroll spy to highlight current active section in bottom dock
  useEffect(() => {
    if (activePostSlug) return; // Ignore on single post view

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const sections = ['home', 'about', 'experience', 'education', 'skills', 'projects', 'blog', 'contact'];
      
      for (const section of sections) {
        const el = document.getElementById(section);
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
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(id);
  };

  return (
    <div id="magicui-portfolio-root" className={`min-h-screen ${isDarkMode ? 'dark bg-black text-zinc-100' : 'bg-white text-zinc-900'} font-sans antialiased selection:bg-zinc-200 dark:selection:bg-zinc-800 transition-colors duration-500 pb-24`}>
      
      {/* 1. Header/Hero & Content Container */}
      <div className="max-w-2xl mx-auto px-6 py-12 md:py-24 space-y-12 md:space-y-20">
        
        <AnimatePresence mode="wait">
          {activePostSlug && activePost ? (
            /* =========================================
               SINGLE BLOG POST VIEW (faithful layout)
               ========================================= */
            <motion.div
              key="blog-post-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <button
                onClick={() => setActivePostSlug(null)}
                className="inline-flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors py-1 group"
              >
                <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
                Back to portfolio
              </button>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span>{activePost.publishedAt}</span>
                  <span>•</span>
                  <span>{activePost.readingTime}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
                  {activePost.title}
                </h1>
                {activePost.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {activePost.tags.map((t, i) => (
                      <span key={i} className="px-2 py-0.5 text-[10px] rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {activePost.coverImage && (
                <img 
                  src={activePost.coverImage} 
                  alt={activePost.title}
                  className="w-full h-64 object-cover rounded-xl border border-zinc-200 dark:border-zinc-800"
                />
              )}

              <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm sm:text-base space-y-6 pt-4">
                {activePost.content.split('\n').map((paragraph, index) => {
                  if (!paragraph.trim()) return null;
                  if (paragraph.startsWith('###')) {
                    return <h3 key={index} className="text-lg font-bold text-zinc-900 dark:text-zinc-50 pt-3">{paragraph.replace('###', '').trim()}</h3>;
                  }
                  if (paragraph.startsWith('##')) {
                    return <h2 key={index} className="text-xl font-bold text-zinc-900 dark:text-zinc-50 pt-4">{paragraph.replace('##', '').trim()}</h2>;
                  }
                  return <p key={index}>{paragraph}</p>;
                })}
              </div>
            </motion.div>
          ) : (
            /* =========================================
               MAIN PORTFOLIO SCROLL VIEW
               ========================================= */
            <div key="main-portfolio-view" className="space-y-12 md:space-y-20">
              
              {/* HERO SECTION */}
              <section id="home" className="scroll-mt-20">
                <div className="flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between gap-6">
                  <div className="space-y-3 text-center sm:text-left flex-1">
                    <BlurFade delay={0.05}>
                      <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-none">
                        Hi, I'm {portfolio.profile.name} 👋
                      </h1>
                    </BlurFade>
                    <BlurFade delay={0.1}>
                      <p className="text-sm sm:text-lg text-zinc-600 dark:text-zinc-400 font-normal max-w-lg leading-relaxed">
                        {portfolio.profile.role}. {portfolio.profile.bio}
                      </p>
                    </BlurFade>
                    {portfolio.profile.location && (
                      <BlurFade delay={0.15}>
                        <div className="inline-flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{portfolio.profile.location}</span>
                        </div>
                      </BlurFade>
                    )}
                  </div>
                  
                  <BlurFade delay={0.15} className="flex-shrink-0">
                    {portfolio.profile.avatar ? (
                      <img 
                        src={portfolio.profile.avatar} 
                        alt={portfolio.profile.name}
                        className="h-24 w-24 sm:h-28 sm:w-28 rounded-full border border-zinc-200 dark:border-zinc-800 object-cover shadow-sm bg-zinc-100"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-400 font-bold text-xl">
                        {portfolio.profile.name.charAt(0)}
                      </div>
                    )}
                  </BlurFade>
                </div>
              </section>

              {/* ABOUT SECTION */}
              {portfolio.profile.summary && (
                <section id="about" className="space-y-3 scroll-mt-20">
                  <BlurFade delay={0.2}>
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      About
                    </h2>
                  </BlurFade>
                  <BlurFade delay={0.25}>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm sm:text-base">
                      {portfolio.profile.summary}
                    </p>
                  </BlurFade>
                </section>
              )}

              {/* WORK EXPERIENCE */}
              {portfolio.experience.length > 0 && (
                <section id="experience" className="space-y-4 scroll-mt-20">
                  <BlurFade delay={0.3}>
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      Work Experience
                    </h2>
                  </BlurFade>
                  
                  <div className="space-y-3">
                    {portfolio.experience.map((exp, idx) => (
                      <BlurFade key={idx} delay={0.32 + idx * 0.05}>
                        <div 
                          onClick={() => toggleWorkAccordion(idx)}
                          className="group flex gap-4 p-3 rounded-lg border border-transparent hover:border-zinc-100 dark:hover:border-zinc-900 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 cursor-pointer transition-all duration-300"
                        >
                          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 flex items-center justify-center p-2 text-zinc-400 dark:text-zinc-500 font-semibold text-xs flex-shrink-0">
                            {exp.company.charAt(0)}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between gap-1">
                              <h3 className="font-semibold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-950 dark:group-hover:text-zinc-50 transition-colors">
                                {exp.company}
                              </h3>
                              <span className="text-xs text-zinc-500 whitespace-nowrap">
                                {exp.duration}
                              </span>
                            </div>
                            
                            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                              {exp.role}
                            </p>

                            <AnimatePresence initial={false}>
                              {(expandedWork[idx] || exp.description) && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="pt-2 text-xs text-zinc-500 dark:text-zinc-400 leading-normal space-y-1">
                                    <p>{exp.description}</p>
                                    {exp.achievements && exp.achievements.length > 0 && (
                                      <ul className="list-disc pl-4 space-y-0.5 mt-1.5">
                                        {exp.achievements.map((ach, i) => (
                                          <li key={i}>{ach}</li>
                                        ))}
                                      </ul>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </BlurFade>
                    ))}
                  </div>
                </section>
              )}

              {/* EDUCATION */}
              {portfolio.education.length > 0 && (
                <section id="education" className="space-y-4 scroll-mt-20">
                  <BlurFade delay={0.4}>
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      Education
                    </h2>
                  </BlurFade>

                  <div className="space-y-3">
                    {portfolio.education.map((edu, idx) => (
                      <BlurFade key={idx} delay={0.42 + idx * 0.05}>
                        <div className="flex gap-4 p-3 rounded-lg">
                          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 flex items-center justify-center p-2 text-zinc-400 dark:text-zinc-500 font-semibold text-xs flex-shrink-0">
                            {edu.institution.charAt(0)}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between gap-1">
                              <h3 className="font-semibold text-sm sm:text-base text-zinc-900 dark:text-zinc-100">
                                {edu.institution}
                              </h3>
                              <span className="text-xs text-zinc-500 whitespace-nowrap">
                                {edu.duration}
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                              {edu.degree}
                            </p>
                            {edu.grade && (
                              <span className="text-[10px] mt-1 inline-block px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                                Grade: {edu.grade}
                              </span>
                            )}
                          </div>
                        </div>
                      </BlurFade>
                    ))}
                  </div>
                </section>
              )}

              {/* SKILLS */}
              {portfolio.skills.length > 0 && (
                <section id="skills" className="space-y-4 scroll-mt-20">
                  <BlurFade delay={0.5}>
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      Skills
                    </h2>
                  </BlurFade>
                  
                  <BlurFade delay={0.55}>
                    <div className="flex flex-wrap gap-1.5">
                      {portfolio.skills.map((skill, idx) => (
                        <div 
                          key={idx} 
                          className="px-2.5 py-1 text-xs bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 rounded-md font-medium transition-transform hover:scale-[1.03] select-none"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </BlurFade>
                </section>
              )}

              {/* PROJECTS GRID */}
              {portfolio.projects.length > 0 && (
                <section id="projects" className="space-y-6 scroll-mt-20">
                  <div className="space-y-2 text-center max-w-md mx-auto">
                    <BlurFade delay={0.6}>
                      <span className="text-xs font-semibold px-2.5 py-0.5 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-full">
                        My Projects
                      </span>
                    </BlurFade>
                    <BlurFade delay={0.62}>
                      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-1">
                        Check out my latest work
                      </h2>
                    </BlurFade>
                    <BlurFade delay={0.64}>
                      <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                        I build responsive, elegant open-source web tools and interactive modules.
                      </p>
                    </BlurFade>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {portfolio.projects.map((proj, idx) => (
                      <BlurFade key={idx} delay={0.66 + idx * 0.05}>
                        <div className="group flex flex-col h-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                          {proj.image && (
                            <div className="relative overflow-hidden h-40">
                              <img 
                                src={proj.image} 
                                alt={proj.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute top-2 right-2 px-2 py-0.5 text-[9px] font-semibold bg-white/90 dark:bg-zinc-950/90 text-zinc-800 dark:text-zinc-200 rounded-md border border-zinc-200 dark:border-zinc-800 shadow-sm">
                                {proj.year}
                              </div>
                            </div>
                          )}

                          <div className="p-4 flex flex-col flex-grow space-y-2.5">
                            <div className="space-y-1">
                              <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-50">
                                {proj.title}
                              </h3>
                              <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-normal">
                                {proj.description}
                              </p>
                            </div>

                            {proj.technologies.length > 0 && (
                              <div className="flex flex-wrap gap-1 pt-1">
                                {proj.technologies.map((t, i) => (
                                  <span key={i} className="px-1.5 py-0.5 text-[9px] bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium rounded">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            )}

                            <div className="flex gap-2 pt-2.5 mt-auto">
                              {proj.githubUrl && (
                                <a 
                                  href={proj.githubUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-[10px] font-semibold bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 px-2 py-1.5 rounded-md hover:opacity-90 transition-opacity"
                                >
                                  <Github className="h-3 w-3" />
                                  Source
                                </a>
                              )}
                              {proj.liveUrl && (
                                <a 
                                  href={proj.liveUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-[10px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-2 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/80 transition-colors"
                                >
                                  <ExternalLink className="h-3 w-3" />
                                  Website
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </BlurFade>
                    ))}
                  </div>
                </section>
              )}

              {/* BLOG / ARTICLES LISTING */}
              {portfolio.posts.length > 0 && (
                <section id="blog" className="space-y-4 scroll-mt-20">
                  <BlurFade delay={0.7}>
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      Blog
                    </h2>
                  </BlurFade>

                  <div className="divide-y divide-zinc-100 dark:divide-zinc-900">
                    {portfolio.posts.map((post, idx) => (
                      <BlurFade key={post.slug} delay={0.72 + idx * 0.05}>
                        <div 
                          onClick={() => setActivePostSlug(post.slug)}
                          className="py-3 flex justify-between items-baseline group cursor-pointer"
                        >
                          <div className="space-y-1 min-w-0 pr-4">
                            <h3 className="font-medium text-sm sm:text-base text-zinc-900 dark:text-zinc-50 group-hover:text-zinc-950 dark:group-hover:text-zinc-100 group-hover:underline transition-all">
                              {post.title}
                            </h3>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                              {post.excerpt}
                            </p>
                          </div>
                          <span className="text-xs text-zinc-400 dark:text-zinc-500 whitespace-nowrap flex-shrink-0">
                            {post.publishedAt}
                          </span>
                        </div>
                      </BlurFade>
                    ))}
                  </div>
                </section>
              )}

              {/* CONTACT SECTION */}
              <section id="contact" className="space-y-6 text-center max-w-md mx-auto scroll-mt-20">
                <div className="space-y-2">
                  <BlurFade delay={0.8}>
                    <span className="text-xs font-semibold px-2.5 py-0.5 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-full">
                      Contact
                    </span>
                  </BlurFade>
                  <BlurFade delay={0.82}>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-1">
                      Get in Touch
                    </h2>
                  </BlurFade>
                  <BlurFade delay={0.84}>
                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-normal">
                      Have a query or want to build something together? Shoot me a message or find me on socials.
                    </p>
                  </BlurFade>
                </div>

                <BlurFade delay={0.86}>
                  <form onSubmit={handleContactSubmit} className="space-y-3.5 text-left bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800 p-5 rounded-xl">
                    <div className="space-y-1">
                      <label htmlFor="contact-name" className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Name</label>
                      <input 
                        type="text" 
                        id="contact-name" 
                        required
                        value={formState.name}
                        onChange={e => setFormState(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="John Doe"
                        className="w-full text-sm bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="contact-email" className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Email Address</label>
                      <input 
                        type="email" 
                        id="contact-email" 
                        required
                        value={formState.email}
                        onChange={e => setFormState(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="john@example.com"
                        className="w-full text-sm bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="contact-message" className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Message</label>
                      <textarea 
                        id="contact-message" 
                        required
                        rows={4}
                        value={formState.message}
                        onChange={e => setFormState(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Tell me about your project or say hello..."
                        className="w-full text-sm bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 resize-none"
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting || submitSuccess}
                      className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Sending...</span>
                      ) : submitSuccess ? (
                        <span>Message Sent!</span>
                      ) : (
                        <>
                          <Send className="h-3 w-3" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </BlurFade>
              </section>

              {/* FOOTER */}
              <footer className="text-center text-[11px] text-zinc-400 dark:text-zinc-600 pt-8 border-t border-zinc-100 dark:divide-zinc-900 dark:border-zinc-900">
                <p>© {new Date().getFullYear()} {portfolio.profile.name}. Handcrafted using Magic UI portfolio.</p>
              </footer>

            </div>
          )}
        </AnimatePresence>

      </div>

      {/* 2. PERSISTENT FLOATING BOTTOM DOCK / NAVIGATION BAR */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-1.5 bg-white/80 dark:bg-zinc-950/85 backdrop-blur-md px-3.5 py-2 border border-zinc-200/60 dark:border-zinc-800/70 rounded-full shadow-lg">
          
          {/* Internal anchors */}
          <button 
            onClick={() => scrollToSection('home')}
            title="Home"
            className={`p-2 rounded-full transition-colors ${activeSection === 'home' && !activePostSlug ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
          >
            <Home className="h-4 w-4" />
          </button>

          {portfolio.experience.length > 0 && (
            <button 
              onClick={() => scrollToSection('experience')}
              title="Experience"
              className={`p-2 rounded-full transition-colors ${activeSection === 'experience' && !activePostSlug ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
            >
              <Briefcase className="h-4 w-4" />
            </button>
          )}

          {portfolio.projects.length > 0 && (
            <button 
              onClick={() => scrollToSection('projects')}
              title="Projects"
              className={`p-2 rounded-full transition-colors ${activeSection === 'projects' && !activePostSlug ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
            >
              <FolderGit2 className="h-4 w-4" />
            </button>
          )}

          {portfolio.posts.length > 0 && (
            <button 
              onClick={() => scrollToSection('blog')}
              title="Blog"
              className={`p-2 rounded-full transition-colors ${activeSection === 'blog' || activePostSlug ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
            >
              <BookOpen className="h-4 w-4" />
            </button>
          )}

          {/* Vertical Separator */}
          <div className="w-[1px] h-4 bg-zinc-200 dark:bg-zinc-800 mx-1" />

          {/* Social icons */}
          {portfolio.socialLinks.github && (
            <a 
              href={portfolio.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              className="p-2 rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              <Github className="h-4 w-4" />
            </a>
          )}

          {portfolio.socialLinks.linkedin && (
            <a 
              href={portfolio.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              className="p-2 rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          )}

          {portfolio.socialLinks.twitter && (
            <a 
              href={portfolio.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              title="Twitter"
              className="p-2 rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              <Twitter className="h-4 w-4" />
            </a>
          )}

          {portfolio.socialLinks.email && (
            <a 
              href={`mailto:${portfolio.socialLinks.email}`}
              title="Email"
              className="p-2 rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              <Mail className="h-4 w-4" />
            </a>
          )}

          {/* Vertical Separator */}
          <div className="w-[1px] h-4 bg-zinc-200 dark:bg-zinc-800 mx-1" />

          {/* Dark / Light Toggle */}
          <button 
            onClick={() => setIsDarkMode(prev => !prev)}
            title={isDarkMode ? "Light Mode" : "Dark Mode"}
            className="p-2 rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

        </div>
      </div>

    </div>
  );
};
