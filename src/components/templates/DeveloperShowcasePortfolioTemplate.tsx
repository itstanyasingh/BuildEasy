import React, { useState, useMemo } from 'react';
import { PortfolioData, LayoutConfiguration, ProjectItem, ExperienceItem, SkillItem } from '../../types';
import { 
  Github, Linkedin, Twitter, Mail, ExternalLink, ArrowRight, 
  Send, Code, User, Briefcase, GraduationCap, MapPin, CheckCircle2,
  Terminal, Server, Globe, Cpu, Award, Download, Menu, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DeveloperShowcasePortfolioTemplateProps {
  data: PortfolioData;
  config?: LayoutConfiguration;
}

// ----------------------------------------------------------------------
// ANIMATED CODING SVG ILLUSTRATION (1hanzla100 Developer Vector Illustration)
// ----------------------------------------------------------------------
const CodingDeveloperIllustration: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[280px] sm:min-h-[360px] flex items-center justify-center relative select-none">
      <svg 
        viewBox="0 0 500 400" 
        className="w-full h-full max-w-[480px] drop-shadow-xl" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Desk & Monitor Background */}
        <rect x="50" y="280" width="400" height="12" rx="6" fill="#001C55" />
        <rect x="230" y="240" width="40" height="40" fill="#003B73" />
        <rect x="200" y="275" width="100" height="8" rx="4" fill="#001C55" />
        
        {/* Monitor Screen Frame */}
        <rect x="90" y="80" width="320" height="170" rx="12" fill="#0A192F" stroke="#0077B6" strokeWidth="6" />
        <rect x="100" y="90" width="300" height="135" rx="6" fill="#030C1E" />
        
        {/* Code Line Windows / Syntax Highlighting */}
        <rect x="110" y="100" width="80" height="8" rx="4" fill="#5BC0BE" />
        <rect x="200" y="100" width="40" height="8" rx="4" fill="#F15BB5" />
        <rect x="120" y="115" width="120" height="6" rx="3" fill="#00BBF9" />
        <rect x="120" y="127" width="90" height="6" rx="3" fill="#FEE440" />
        <rect x="135" y="139" width="140" height="6" rx="3" fill="#00F5D4" />
        <rect x="135" y="151" width="70" height="6" rx="3" fill="#5BC0BE" />
        <rect x="120" y="163" width="110" height="6" rx="3" fill="#F15BB5" />
        <rect x="110" y="175" width="60" height="8" rx="4" fill="#00BBF9" />

        {/* Animated Floating Tech Badges */}
        <motion.g 
          animate={{ y: [0, -8, 0] }} 
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx="70" cy="100" r="24" fill="#0077B6" />
          <text x="70" y="105" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold" fontFamily="monospace">&lt;/&gt;</text>
        </motion.g>

        <motion.g 
          animate={{ y: [0, 10, 0] }} 
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <circle cx="430" cy="120" r="22" fill="#5BC0BE" />
          <text x="430" y="125" textAnchor="middle" fill="#030C1E" fontSize="12" fontWeight="bold">JS</text>
        </motion.g>

        <motion.g 
          animate={{ y: [0, -10, 0] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <circle cx="410" cy="240" r="26" fill="#F15BB5" />
          <text x="410" y="245" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">React</text>
        </motion.g>

        {/* Developer Character Silhouette at Desk */}
        <circle cx="250" cy="200" r="28" fill="#5BC0BE" />
        <path d="M210 280 C210 230, 290 230, 290 280 Z" fill="#0077B6" />
      </svg>
    </div>
  );
};

// ----------------------------------------------------------------------
// MAIN TEMPLATE: DEVELOPER SHOWCASE (1hanzla100/developer-portfolio)
// ----------------------------------------------------------------------
export const DeveloperShowcasePortfolioTemplate: React.FC<DeveloperShowcasePortfolioTemplateProps> = ({ data }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Safe data extraction matching 1hanzla100 structure
  const profile = useMemo(() => ({
    name: data.profile?.name || 'Hanzla Tauqeer',
    title: data.profile?.title || 'Full Stack Software Engineer',
    bio: data.profile?.bio || 'A passionate Full Stack Software Developer having an experience of building Web and Mobile applications with JavaScript / Reactjs / Nodejs / Python and some other cool libraries and frameworks.',
    location: data.profile?.location || 'Pakistan',
    about: data.about?.aboutText || data.profile?.bio || 'I enjoy building robust web systems, learning new cloud infrastructure stacks, and open-source contributions.',
    avatar: data.profile?.profilePhoto || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
    resumeUrl: data.profile?.resumeUrl || '#',
  }), [data]);

  const projects = useMemo(() => (data.projects || []).map((p: ProjectItem) => ({
    title: p.name || 'Developer Web App',
    description: p.description || 'Full-stack software application engineered with modern frontend frameworks and backend cloud APIs.',
    image: p.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    tags: p.technologies || ['React', 'Node.js', 'Express', 'MongoDB'],
    githubUrl: p.githubUrl || '',
    liveUrl: p.liveUrl || '',
  })), [data.projects]);

  const experience = useMemo(() => (data.experience || []).map((e: ExperienceItem) => ({
    company: e.company || 'Tech Software Solutions',
    role: e.role || 'Software Engineer',
    duration: e.duration || '2022 - Present',
    description: e.description || 'Developing full-stack scalable web products, implementing RESTful APIs, and optimizing database performance.',
    achievements: e.achievements || [],
  })), [data.experience]);

  const education = useMemo(() => data.education || [
    { degree: 'Bachelor of Science in Computer Science', institution: 'University of Engineering and Technology', year: '2019 - 2023' }
  ], [data.education]);

  const skills = useMemo(() => {
    const defaultSkills = [
      { name: 'JavaScript', icon: '⚡' },
      { name: 'TypeScript', icon: '🔷' },
      { name: 'React', icon: '⚛️' },
      { name: 'Next.js', icon: '▲' },
      { name: 'Node.js', icon: '🟢' },
      { name: 'Python', icon: '🐍' },
      { name: 'HTML5', icon: '🌐' },
      { name: 'CSS3 / Tailwind', icon: '🎨' },
      { name: 'Git & GitHub', icon: '🐙' },
      { name: 'MongoDB', icon: '🍃' },
      { name: 'PostgreSQL', icon: '🐘' },
      { name: 'Docker', icon: '🐳' },
    ];

    if (!data.skills || data.skills.length === 0) return defaultSkills;

    return data.skills.map((s: SkillItem) => ({
      name: s.name,
      icon: '⚡',
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
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormSubmitted(false), 5000);
    }, 1000);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(`developer-showcase-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#001C55] text-white font-sans antialiased selection:bg-[#0077B6] selection:text-white">
      
      {/* 1. NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#001C55]/90 backdrop-blur-md border-b border-[#003B73]/60">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-4 flex items-center justify-between">
          {/* Logo Name */}
          <button 
            onClick={() => scrollToSection('hero')} 
            className="text-xl sm:text-2xl font-extrabold tracking-wider font-mono text-white hover:text-[#5BC0BE] transition-colors cursor-pointer"
          >
            &lt;{profile.name.split(' ')[0]} /&gt;
          </button>

          {/* Desktop Nav Items */}
          <ul className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#A2D2FF]">
            {['Skills', 'Work', 'Experience', 'Education', 'Contact'].map((item) => (
              <li key={item}>
                <button
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#A2D2FF] hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#001C55] border-b border-[#003B73] px-6 py-4 space-y-3"
            >
              {['Skills', 'Work', 'Experience', 'Education', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left py-2 text-sm font-medium text-[#A2D2FF] hover:text-white"
                >
                  {item}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* MAIN CONTAINER */}
      <div className="pt-20">

        {/* ===================================================================
            2. HERO SECTION
            =================================================================== */}
        <section id="developer-showcase-hero" className="max-w-7xl mx-auto px-6 sm:px-12 py-16 sm:py-24 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
              Hi all, I'm <span className="text-[#5BC0BE]">{profile.name}</span> 👋
            </h1>

            <p className="text-lg sm:text-xl text-[#A2D2FF] leading-relaxed max-w-2xl font-normal">
              {profile.bio}
            </p>

            {/* Social Link Badges */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-[#003B73] hover:bg-[#0077B6] text-white flex items-center justify-center transition-colors shadow-md"
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
                  className="w-11 h-11 rounded-full bg-[#003B73] hover:bg-[#0077B6] text-white flex items-center justify-center transition-colors shadow-md"
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
                  className="w-11 h-11 rounded-full bg-[#003B73] hover:bg-[#0077B6] text-white flex items-center justify-center transition-colors shadow-md"
                  title="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {socialLinks.email && (
                <a
                  href={`mailto:${socialLinks.email}`}
                  className="w-11 h-11 rounded-full bg-[#003B73] hover:bg-[#0077B6] text-white flex items-center justify-center transition-colors shadow-md"
                  title="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3.5 rounded-xl bg-[#0077B6] hover:bg-[#023E8A] text-white font-bold text-sm transition-all shadow-lg cursor-pointer flex items-center gap-2"
              >
                <span>Contact Me</span>
                <Send className="w-4 h-4" />
              </button>
              {profile.resumeUrl && profile.resumeUrl !== '#' && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 rounded-xl bg-[#003B73] hover:bg-[#00529B] border border-[#0077B6]/40 text-white font-bold text-sm transition-all cursor-pointer flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>See My Resume</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Hero Vector Coding Illustration */}
          <div className="md:col-span-5">
            <CodingDeveloperIllustration />
          </div>
        </section>

        {/* ===================================================================
            3. WHAT I DO / SKILLS SECTION
            =================================================================== */}
        <section id="developer-showcase-skills" className="max-w-7xl mx-auto px-6 sm:px-12 py-20 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">What I Do?</h2>
            <p className="text-[#A2D2FF] text-base max-w-xl mx-auto font-medium">
              CRAZY FULL STACK DEVELOPER WHO WANTS TO EXPLORE EVERY TECH STACK
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 pt-4">
            {skills.map((s, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6, scale: 1.03 }}
                transition={{ duration: 0.2 }}
                className="p-5 rounded-2xl bg-[#002855] border border-[#003B73] hover:border-[#0077B6] flex flex-col items-center justify-center text-center space-y-2 shadow-lg group cursor-default"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">{s.icon}</span>
                <span className="font-bold text-sm text-white">{s.name}</span>
              </motion.div>
            ))}
          </div>

          {/* Feature Highlight Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="p-6 rounded-2xl bg-[#002855] border border-[#003B73] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#0077B6]/20 text-[#5BC0BE] flex items-center justify-center">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Full Stack Web Development</h3>
              <p className="text-xs text-[#A2D2FF] leading-relaxed">
                Building responsive web frontends in React / Next.js and robust backend services in Node.js, Python, or Go.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#002855] border border-[#003B73] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#0077B6]/20 text-[#5BC0BE] flex items-center justify-center">
                <Server className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Cloud Infrastructure</h3>
              <p className="text-xs text-[#A2D2FF] leading-relaxed">
                Deploying serverless functions, containerizing with Docker, and setting up CI/CD deployment pipelines.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#002855] border border-[#003B73] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#0077B6]/20 text-[#5BC0BE] flex items-center justify-center">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">UI/UX & Performance</h3>
              <p className="text-xs text-[#A2D2FF] leading-relaxed">
                Designing intuitive component interfaces and optimizing application load speeds for seamless user interaction.
              </p>
            </div>
          </div>
        </section>

        {/* ===================================================================
            4. PROJECTS SECTION (FULL COLOR PRESERVED)
            =================================================================== */}
        {projects.length > 0 && (
          <section id="developer-showcase-work" className="max-w-7xl mx-auto px-6 sm:px-12 py-20 space-y-12">
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Open Source & Projects.</h2>
              <p className="text-[#A2D2FF] text-base max-w-2xl font-medium">
                SOME OF MY RECENT WORK AND SOFTWARE CONTRIBUTIONS
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
              {projects.map((proj, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl bg-[#002855] border border-[#003B73] hover:border-[#0077B6] overflow-hidden flex flex-col justify-between shadow-xl transition-all"
                >
                  <div className="space-y-4">
                    {/* FULL COLOR SCREENSHOT - NO GRAYSCALE */}
                    <div className="relative h-52 w-full overflow-hidden bg-[#001233]">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>

                    <div className="p-6 space-y-3">
                      <h3 className="font-bold text-xl text-white">{proj.title}</h3>
                      <p className="text-xs text-[#A2D2FF] leading-relaxed line-clamp-3">
                        {proj.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {proj.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-xs px-2.5 py-1 rounded-md bg-[#001C55] text-[#5BC0BE] font-mono border border-[#003B73]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Links */}
                  <div className="p-6 pt-0 flex items-center gap-4 mt-2">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-[#003B73] hover:bg-[#0077B6] text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
                      >
                        <Github className="w-4 h-4" />
                        <span>Source Code</span>
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-[#0077B6] hover:bg-[#023E8A] text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* ===================================================================
            5. WORK EXPERIENCE TIMELINE
            =================================================================== */}
        {experience.length > 0 && (
          <section id="developer-showcase-experience" className="max-w-7xl mx-auto px-6 sm:px-12 py-20 space-y-12">
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Work Experience.</h2>
            </div>

            <div className="space-y-6">
              {experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-2xl bg-[#002855] border border-[#003B73] space-y-4 shadow-lg"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-xl text-white">{exp.role}</h3>
                      <p className="text-sm font-semibold text-[#5BC0BE]">{exp.company}</p>
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#001C55] text-[#A2D2FF] font-semibold w-fit border border-[#003B73]">
                      {exp.duration}
                    </span>
                  </div>

                  <p className="text-sm text-[#A2D2FF] leading-relaxed">
                    {exp.description}
                  </p>

                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-xs text-[#A2D2FF]/80 pt-1">
                      {exp.achievements.map((ach, aIdx) => (
                        <li key={aIdx}>{ach}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ===================================================================
            6. EDUCATION SECTION
            =================================================================== */}
        {education.length > 0 && (
          <section id="developer-showcase-education" className="max-w-7xl mx-auto px-6 sm:px-12 py-20 space-y-12">
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Education.</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#002855] border border-[#003B73] space-y-3 flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0077B6]/20 text-[#5BC0BE] flex items-center justify-center shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg text-white">{edu.degree}</h3>
                    <p className="text-sm text-[#5BC0BE] font-medium">{edu.institution}</p>
                    <span className="inline-block text-xs font-mono text-[#A2D2FF] pt-1">{edu.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ===================================================================
            7. CONTACT SECTION
            =================================================================== */}
        <section id="developer-showcase-contact" className="max-w-7xl mx-auto px-6 sm:px-12 py-20 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            
            {/* Contact Details Column */}
            <div className="md:col-span-6 space-y-6">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Reach Out To Me!</h2>
              <p className="text-[#A2D2FF] text-base leading-relaxed">
                DISCUSS A PROJECT OR JUST WANT TO SAY HI? MY INBOX IS OPEN FOR ALL.
              </p>

              <div className="space-y-4 text-sm pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#003B73] text-[#5BC0BE] flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-[#A2D2FF]">Email Address</span>
                    <a href={`mailto:${socialLinks.email}`} className="font-semibold text-white hover:text-[#5BC0BE]">
                      {socialLinks.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#003B73] text-[#5BC0BE] flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-[#A2D2FF]">Location</span>
                    <span className="font-semibold text-white">{profile.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Email Form */}
            <div className="md:col-span-6 bg-[#002855] p-8 rounded-2xl border border-[#003B73] space-y-5 shadow-xl">
              {formSubmitted ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-medium flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                  <span>Your message has been sent successfully!</span>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#A2D2FF]">Your Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#001C55] border border-[#003B73] text-white text-sm focus:outline-none focus:border-[#0077B6]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#A2D2FF]">Your Email</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#001C55] border border-[#003B73] text-white text-sm focus:outline-none focus:border-[#0077B6]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#A2D2FF]">Your Message</label>
                    <textarea
                      rows={4}
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#001C55] border border-[#003B73] text-white text-sm focus:outline-none focus:border-[#0077B6] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-[#0077B6] hover:bg-[#023E8A] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
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
        </section>

        {/* ===================================================================
            8. FOOTER
            =================================================================== */}
        <footer className="border-t border-[#003B73]/60 py-8 px-6 text-center text-xs font-mono text-[#A2D2FF]">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>Made with ❤️ by {profile.name}</p>
            <p>© {new Date().getFullYear()} All rights reserved.</p>
          </div>
        </footer>

      </div>
    </div>
  );
};
