import React, { useState, useMemo, useEffect } from 'react';
import { PortfolioData, LayoutConfiguration, ProjectItem, ExperienceItem, SkillItem, ProfileData, SocialLinks, ContactData } from '../../types';
import { 
  Github, Linkedin, Twitter, Mail, ExternalLink, Menu, X, 
  Sun, Moon, ArrowUp, Briefcase, Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CleanfolioPortfolioTemplateProps {
  data: PortfolioData;
  config?: LayoutConfiguration;
}

// -------------------------------------------------------------
// CLEANFOLIO GITHUB PORTFOLIO #010 DATA ADAPTER
// -------------------------------------------------------------
const useCleanfolioAdapter = (data: PortfolioData) => {
  return useMemo(() => {
    const rawProfile = (data.profile || {}) as Partial<ProfileData>;
    const rawSocial = (data.socialLinks || {}) as Partial<SocialLinks>;
    const rawContact = (data.contact || {}) as Partial<ContactData>;

    const profile = {
      name: rawProfile.name || 'Raj Shekhar',
      role: rawProfile.title || 'Front End Engineer',
      bio: rawProfile.bio || 
        'A passionate web developer who loves creating interactive, clean, and user-friendly web applications. Focused on modern web standards, performance, and accessible UI design.',
      location: rawProfile.location || 'San Francisco, CA',
      avatar: rawProfile.profilePhoto || '',
      resumeUrl: (rawProfile as Record<string, any>).resumeUrl || (rawContact as Record<string, any>).resume || rawProfile.website || '',
    };

    // Calculate initial logo initials
    const nameParts = profile.name.trim().split(' ');
    const initials = nameParts.length >= 2
      ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
      : (profile.name.substring(0, 2).toUpperCase() || 'JS');

    const socialLinks = {
      github: rawSocial.github || '',
      linkedin: rawSocial.linkedin || '',
      twitter: rawSocial.twitter || '',
      email: rawContact.email || rawProfile.email || '',
      website: rawSocial.website || rawProfile.website || '',
    };

    const projects = (data.projects || []).map((p: ProjectItem, idx: number) => {
      let stack: string[] = [];
      if (Array.isArray(p.technologies) && p.technologies.length > 0) {
        stack = p.technologies;
      } else if (typeof p.technologies === 'string') {
        stack = (p.technologies as string).split(',').map(s => s.trim());
      } else {
        stack = ['React', 'TypeScript', 'Tailwind CSS'];
      }

      return {
        id: p.id || `project-${idx}`,
        title: p.name || `Project ${idx + 1}`,
        description: p.description || 'A modern web application built with focus on user experience and clean code architecture.',
        stack,
        githubUrl: p.githubUrl || '',
        liveUrl: p.liveUrl || '',
        image: p.image || '',
        year: p.year || '',
      };
    });

    const skills = (data.skills || []).map((skill: SkillItem | string) => {
      if (typeof skill === 'string') return skill;
      return skill.name || '';
    }).filter(Boolean);

    // Default fallback skills matching Cleanfolio source if empty
    const displaySkills = skills.length > 0 ? skills : [
      'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Redux', 
      'SASS', 'Material UI', 'Git', 'CI/CD', 'Jest', 'Node.js'
    ];

    const experience = (data.experience || []).map((exp: ExperienceItem) => ({
      id: exp.id || Math.random().toString(),
      company: exp.company || '',
      role: exp.role || '',
      duration: exp.duration || '',
      description: exp.description || '',
      achievements: exp.achievements || [],
      technologies: exp.technologies || []
    }));

    const contact = {
      email: rawContact.email || rawProfile.email || 'contact@example.com',
      phone: rawContact.phone || '',
      location: rawContact.location || profile.location,
    };

    return {
      profile,
      initials,
      socialLinks,
      projects,
      skills: displaySkills,
      experience,
      contact,
    };
  }, [data]);
};

export const CleanfolioPortfolioTemplate: React.FC<CleanfolioPortfolioTemplateProps> = ({ data, config }) => {
  const adapterData = useCleanfolioAdapter(data);
  const { profile, initials, socialLinks, projects, skills, experience, contact } = adapterData;

  // Local state for Light / Dark Mode toggle (Defaulting to light mode as in Cleanfolio default)
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (config?.bgStyle === 'dark') return true;
    return false;
  });

  // State for mobile nav menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // State for scroll-to-top button visibility
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Theme-dependent colors matching exact Cleanfolio specifications
  // Light: bg #fcfcfc, card bg #ffffff, fg #555555, accent #2978b5, title #222222
  // Dark: bg #23283e, card bg #2a2f4c, fg #bdbddd, accent #90a0d9, title #ffffff
  const accentColor = config?.accentColor || (isDark ? '#90a0d9' : '#2978b5');
  const bgColor = isDark ? '#23283e' : '#fcfcfc';
  const cardBgColor = isDark ? '#2a2f4c' : '#ffffff';
  const textPrimaryColor = isDark ? '#ffffff' : '#222222';
  const textSecondaryColor = isDark ? '#bdbddd' : '#555555';
  const shadowStyle = isDark 
    ? '0px 7px 29px 0px rgba(0, 0, 0, 0.35)' 
    : '0px 7px 29px 0px rgba(100, 100, 111, 0.15)';

  return (
    <div 
      className="min-h-screen font-sans transition-colors duration-300 relative selection:bg-blue-500 selection:text-white"
      style={{ 
        backgroundColor: bgColor, 
        color: textSecondaryColor 
      }}
      id="top"
    >
      {/* ------------------------------------------------------------- */}
      {/* HEADER / NAVIGATION                                          */}
      {/* ------------------------------------------------------------- */}
      <header className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between relative z-40">
        <a 
          href="#top" 
          className="text-2xl font-bold tracking-tight transition-opacity hover:opacity-80"
          style={{ color: accentColor }}
        >
          {initials}.
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold tracking-wide">
          {projects.length > 0 && (
            <a 
              href="#projects" 
              className="transition-colors hover:opacity-100"
              style={{ color: textSecondaryColor }}
              onMouseEnter={(e) => (e.currentTarget.style.color = accentColor)}
              onMouseLeave={(e) => (e.currentTarget.style.color = textSecondaryColor)}
            >
              projects
            </a>
          )}

          {skills.length > 0 && (
            <a 
              href="#skills" 
              className="transition-colors hover:opacity-100"
              style={{ color: textSecondaryColor }}
              onMouseEnter={(e) => (e.currentTarget.style.color = accentColor)}
              onMouseLeave={(e) => (e.currentTarget.style.color = textSecondaryColor)}
            >
              skills
            </a>
          )}

          {experience.length > 0 && (
            <a 
              href="#experience" 
              className="transition-colors hover:opacity-100"
              style={{ color: textSecondaryColor }}
              onMouseEnter={(e) => (e.currentTarget.style.color = accentColor)}
              onMouseLeave={(e) => (e.currentTarget.style.color = textSecondaryColor)}
            >
              experience
            </a>
          )}

          <a 
            href="#contact" 
            className="transition-colors hover:opacity-100"
            style={{ color: textSecondaryColor }}
            onMouseEnter={(e) => (e.currentTarget.style.color = accentColor)}
            onMouseLeave={(e) => (e.currentTarget.style.color = textSecondaryColor)}
          >
            contact
          </a>

          {profile.resumeUrl && (
            <a 
              href={profile.resumeUrl} 
              target="_blank" 
              rel="noreferrer"
              className="transition-colors hover:opacity-100 font-bold"
              style={{ color: accentColor }}
            >
              resume
            </a>
          )}

          <button
            type="button"
            aria-label="toggle theme"
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full transition-transform hover:scale-110 focus:outline-none"
            style={{ color: accentColor }}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>

        {/* Mobile Header Controls */}
        <div className="flex items-center space-x-4 md:hidden">
          <button
            type="button"
            aria-label="toggle theme"
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full transition-transform hover:scale-110 focus:outline-none"
            style={{ color: accentColor }}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            type="button"
            aria-label="toggle menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 focus:outline-none"
            style={{ color: textPrimaryColor }}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-x-0 top-[80px] z-30 shadow-xl border-b border-black/10 dark:border-white/10 px-8 py-6"
            style={{ backgroundColor: cardBgColor }}
          >
            <nav className="flex flex-col space-y-5 text-center text-base font-semibold tracking-wide">
              {projects.length > 0 && (
                <a 
                  href="#projects" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-1"
                  style={{ color: textPrimaryColor }}
                >
                  projects
                </a>
              )}
              {skills.length > 0 && (
                <a 
                  href="#skills" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-1"
                  style={{ color: textPrimaryColor }}
                >
                  skills
                </a>
              )}
              {experience.length > 0 && (
                <a 
                  href="#experience" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-1"
                  style={{ color: textPrimaryColor }}
                >
                  experience
                </a>
              )}
              <a 
                href="#contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-1"
                style={{ color: textPrimaryColor }}
              >
                contact
              </a>
              {profile.resumeUrl && (
                <a 
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-1 font-bold"
                  style={{ color: accentColor }}
                >
                  resume
                </a>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTAINER */}
      <main className="max-w-5xl mx-auto px-6">
        {/* ------------------------------------------------------------- */}
        {/* HERO / ABOUT SECTION                                         */}
        {/* ------------------------------------------------------------- */}
        <section className="py-20 md:py-32 text-center flex flex-col items-center justify-center">
          {profile.avatar && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <img 
                src={profile.avatar} 
                alt={profile.name}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-lg border-2"
                style={{ borderColor: accentColor }}
              />
            </motion.div>
          )}

          <motion.h1 
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4"
            style={{ color: textPrimaryColor }}
          >
            Hi, I am <span style={{ color: accentColor }}>{profile.name}</span>.
          </motion.h1>

          {profile.role && (
            <motion.h2 
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 opacity-90"
              style={{ color: textPrimaryColor }}
            >
              A {profile.role}.
            </motion.h2>
          )}

          {profile.bio && (
            <motion.p 
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl text-base sm:text-lg leading-relaxed mb-10 opacity-80"
            >
              {profile.bio}
            </motion.p>
          )}

          {/* Social Links & Resume Buttons */}
          <motion.div 
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 font-semibold text-xs sm:text-sm uppercase tracking-wider border-2 rounded transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                style={{ 
                  borderColor: accentColor, 
                  color: isDark ? '#ffffff' : '#222222',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = accentColor;
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = isDark ? '#ffffff' : '#222222';
                }}
              >
                <span>Resume</span>
              </a>
            )}

            <div className="flex items-center space-x-4">
              {socialLinks.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="github"
                  className="p-2 transition-transform hover:scale-110"
                  style={{ color: accentColor }}
                >
                  <Github size={22} />
                </a>
              )}

              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="linkedin"
                  className="p-2 transition-transform hover:scale-110"
                  style={{ color: accentColor }}
                >
                  <Linkedin size={22} />
                </a>
              )}

              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="twitter"
                  className="p-2 transition-transform hover:scale-110"
                  style={{ color: accentColor }}
                >
                  <Twitter size={22} />
                </a>
              )}

              {socialLinks.website && (
                <a
                  href={socialLinks.website}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="website"
                  className="p-2 transition-transform hover:scale-110"
                  style={{ color: accentColor }}
                >
                  <Globe size={22} />
                </a>
              )}

              {socialLinks.email && (
                <a
                  href={`mailto:${socialLinks.email}`}
                  aria-label="email"
                  className="p-2 transition-transform hover:scale-110"
                  style={{ color: accentColor }}
                >
                  <Mail size={22} />
                </a>
              )}
            </div>
          </motion.div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* PROJECTS SECTION                                             */}
        {/* ------------------------------------------------------------- */}
        {projects.length > 0 && (
          <section id="projects" className="py-16 scroll-mt-20">
            <h2 
              className="text-2xl md:text-3xl font-extrabold text-center uppercase tracking-wider mb-14 relative after:content-[''] after:block after:w-14 after:h-1 after:mx-auto after:mt-3 after:rounded-full"
              style={{ color: textPrimaryColor }}
            >
              <span className="relative">
                Projects
                <span 
                  className="absolute left-1/2 -bottom-4 transform -translate-x-1/2 w-12 h-1 rounded-full"
                  style={{ backgroundColor: accentColor }}
                />
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="rounded-lg p-7 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
                  style={{
                    backgroundColor: cardBgColor,
                    boxShadow: shadowStyle
                  }}
                >
                  <div>
                    {project.image && (
                      <div className="mb-5 overflow-hidden rounded border border-black/5 dark:border-white/10">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-44 object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    )}

                    <h3 
                      className="text-xl font-bold mb-3 tracking-tight"
                      style={{ color: textPrimaryColor }}
                    >
                      {project.title}
                    </h3>

                    <p className="text-sm leading-relaxed mb-6 opacity-80">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Tech Stack List */}
                    {project.stack.length > 0 && (
                      <ul className="flex flex-wrap gap-2 text-xs font-medium mb-6">
                        {project.stack.map((tech, tIdx) => (
                          <li 
                            key={tIdx}
                            className="px-2.5 py-1 rounded text-xs font-semibold tracking-wide"
                            style={{ 
                              color: accentColor, 
                              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)' 
                            }}
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Action Links */}
                    <div className="flex items-center space-x-4 pt-2 border-t border-black/5 dark:border-white/5">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="source code"
                          className="transition-transform hover:scale-110"
                          style={{ color: textPrimaryColor }}
                        >
                          <Github size={20} />
                        </a>
                      )}

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="live preview"
                          className="transition-transform hover:scale-110"
                          style={{ color: textPrimaryColor }}
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SKILLS SECTION                                               */}
        {/* ------------------------------------------------------------- */}
        {skills.length > 0 && (
          <section id="skills" className="py-16 scroll-mt-20">
            <h2 
              className="text-2xl md:text-3xl font-extrabold text-center uppercase tracking-wider mb-14 relative"
              style={{ color: textPrimaryColor }}
            >
              <span className="relative">
                Skills
                <span 
                  className="absolute left-1/2 -bottom-4 transform -translate-x-1/2 w-12 h-1 rounded-full"
                  style={{ backgroundColor: accentColor }}
                />
              </span>
            </h2>

            <ul className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {skills.map((skill, idx) => (
                <motion.li
                  key={idx}
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.03 }}
                  className="px-5 py-2.5 rounded font-bold text-xs uppercase tracking-wider transition-all duration-200 hover:-translate-y-1 cursor-default border border-black/5 dark:border-white/5"
                  style={{
                    backgroundColor: cardBgColor,
                    color: textPrimaryColor,
                    boxShadow: shadowStyle
                  }}
                >
                  {skill}
                </motion.li>
              ))}
            </ul>
          </section>
        )}

        {/* ------------------------------------------------------------- */}
        {/* EXPERIENCE SECTION (If user has career data)                 */}
        {/* ------------------------------------------------------------- */}
        {experience.length > 0 && (
          <section id="experience" className="py-16 scroll-mt-20">
            <h2 
              className="text-2xl md:text-3xl font-extrabold text-center uppercase tracking-wider mb-14 relative"
              style={{ color: textPrimaryColor }}
            >
              <span className="relative">
                Experience
                <span 
                  className="absolute left-1/2 -bottom-4 transform -translate-x-1/2 w-12 h-1 rounded-full"
                  style={{ backgroundColor: accentColor }}
                />
              </span>
            </h2>

            <div className="max-w-4xl mx-auto space-y-6">
              {experience.map((exp) => (
                <motion.div
                  key={exp.id}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="p-7 rounded-lg transition-all duration-200"
                  style={{
                    backgroundColor: cardBgColor,
                    boxShadow: shadowStyle
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-xl font-bold" style={{ color: textPrimaryColor }}>
                        {exp.role}
                      </h3>
                      <div className="text-sm font-semibold flex items-center space-x-2 mt-1" style={{ color: accentColor }}>
                        <Briefcase size={16} />
                        <span>{exp.company}</span>
                      </div>
                    </div>
                    {exp.duration && (
                      <span className="text-xs font-semibold px-3 py-1 rounded-full self-start sm:self-auto bg-black/5 dark:bg-white/10">
                        {exp.duration}
                      </span>
                    )}
                  </div>

                  {exp.description && (
                    <p className="text-sm leading-relaxed mb-4 opacity-85">
                      {exp.description}
                    </p>
                  )}

                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm mb-4 opacity-80">
                      {exp.achievements.map((ach, aIdx) => (
                        <li key={aIdx}>{ach}</li>
                      ))}
                    </ul>
                  )}

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 text-xs font-medium pt-3 border-t border-black/5 dark:border-white/5">
                      {exp.technologies.map((t, tIdx) => (
                        <span 
                          key={tIdx}
                          className="px-2.5 py-0.5 rounded text-xs"
                          style={{ 
                            color: accentColor, 
                            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)' 
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------- */}
        {/* CONTACT SECTION                                              */}
        {/* ------------------------------------------------------------- */}
        <section id="contact" className="py-20 scroll-mt-20 text-center">
          <h2 
            className="text-2xl md:text-3xl font-extrabold uppercase tracking-wider mb-14 relative"
            style={{ color: textPrimaryColor }}
          >
            <span className="relative">
              Contact
              <span 
                className="absolute left-1/2 -bottom-4 transform -translate-x-1/2 w-12 h-1 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
            </span>
          </h2>

          <p className="max-w-md mx-auto text-base sm:text-lg mb-10 leading-relaxed opacity-80">
            Interested in collaborating or have any questions? Feel free to reach out directly via email!
          </p>

          <a
            href={`mailto:${contact.email}`}
            className="inline-block px-8 py-4 font-bold text-xs sm:text-sm uppercase tracking-wider border-2 rounded transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-1"
            style={{ 
              borderColor: accentColor,
              color: isDark ? '#ffffff' : '#222222',
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = accentColor;
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = isDark ? '#ffffff' : '#222222';
            }}
          >
            Email me
          </a>
        </section>
      </main>

      {/* ------------------------------------------------------------- */}
      {/* FOOTER                                                        */}
      {/* ------------------------------------------------------------- */}
      <footer className="py-12 mt-12 text-center text-xs font-semibold tracking-wider border-t border-black/5 dark:border-white/10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center justify-center space-y-3">
          <a
            href="https://github.com/rjshkhr/cleanfolio"
            target="_blank"
            rel="noreferrer"
            className="transition-opacity hover:opacity-100 uppercase tracking-widest text-xs"
            style={{ color: accentColor }}
          >
            Created By Raj Shekhar (Cleanfolio)
          </a>
          <p className="opacity-50">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
        </div>
      </footer>

      {/* ------------------------------------------------------------- */}
      {/* SCROLL TO TOP FLOATING BUTTON                                 */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            aria-label="scroll to top"
            className="fixed bottom-8 right-8 p-3 rounded-full shadow-lg transition-transform hover:scale-110 focus:outline-none z-50 border border-black/10 dark:border-white/10"
            style={{
              backgroundColor: cardBgColor,
              color: accentColor,
              boxShadow: shadowStyle
            }}
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
