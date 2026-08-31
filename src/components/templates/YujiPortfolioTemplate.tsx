import React, { useState, useMemo, useEffect } from 'react';
import { PortfolioData, LayoutConfiguration, ProjectItem, ExperienceItem, SkillItem } from '../../types';
import { 
  Github, Linkedin, Twitter, Mail, ExternalLink, Menu, X, 
  Sun, Moon, MapPin, Briefcase, Code, Sparkles, Server, 
  Database, Brain, Send, CheckCircle2, Phone, Terminal, 
  User, Check, ChevronRight, Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface YujiPortfolioTemplateProps {
  data: PortfolioData;
  config?: LayoutConfiguration;
}

// -------------------------------------------------------------
// YUJI SATO GITHUB PORTFOLIO #009 DATA ADAPTER
// -------------------------------------------------------------
const useYujiAdapter = (data: PortfolioData) => {
  return useMemo(() => {
    const profile = {
      name: data.profile?.name || 'Yuji Sato',
      role: data.profile?.title || 'Technology Consultant & Full Stack Developer',
      bio: data.profile?.bio || 'Passionate about building scalable web applications, automating workflows, and exploring AI-driven solutions.',
      location: data.profile?.location || 'Tokyo, Japan',
      email: data.profile?.email || data.contact?.email || 'yuji@example.com',
      avatar: data.profile?.profilePhoto || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80',
    };

    const aboutText = data.about?.aboutText || 
      "I am a developer who loves building products and solving complex engineering challenges. With background in web engineering and DevOps, I build secure, performant web platforms and highly resilient automation systems.";

    const interests = data.about?.interests || [
      'Artificial Intelligence & NLP',
      'Open Source Software',
      'DevOps & Serverless Architecture',
      'Technical Writing',
      'Indie Game Development'
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

    // Reconstruct expertise groups based on skills category or common fields
    const rawSkills = data.skills || [];
    
    // Group skills into domains as shown in Yuji Sato's portfolio
    const skillDomains = (() => {
      if (rawSkills.length === 0) {
        // Return high-fidelity developer defaults if empty
        return [
          {
            id: 'web-dev',
            title: 'Full Stack Web Development',
            description: 'Building secure, highly performant, and responsive web platforms using modern frameworks and databases.',
            icon: 'web',
            skills: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'SASS', 'Flask', 'Python', 'SQL', 'PostgreSQL']
          },
          {
            id: 'devops',
            title: 'DevOps & Cloud Automation',
            description: 'Designing resilient CI/CD pipelines, container orchestration, cloud infrastructures, and automated systems.',
            icon: 'devops',
            skills: ['Git', 'GitHub Actions', 'Docker', 'AWS', 'Azure', 'Linux', 'Snowflake', 'Pandas', 'Selenium']
          },
          {
            id: 'ai-llm',
            title: 'GenAI & Machine Learning',
            description: 'Integrating Large Language Models, crafting semantic searches, and deploying agents for smart automation.',
            icon: 'ai',
            skills: ['OpenAI', 'Groq', 'LangChain', 'Qdrant', 'Hugging Face', 'LlamaIndex', 'Streamlit']
          }
        ];
      }

      // Group actual skills by category
      const categories: { [key: string]: string[] } = {};
      rawSkills.forEach(skill => {
        const cat = skill.category || 'Other Skills';
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(skill.name);
      });

      const iconMap = (cat: string) => {
        const lower = cat.toLowerCase();
        if (lower.includes('web') || lower.includes('front') || lower.includes('full') || lower.includes('ui')) return 'web';
        if (lower.includes('devops') || lower.includes('cloud') || lower.includes('sys') || lower.includes('tool') || lower.includes('infra')) return 'devops';
        if (lower.includes('ai') || lower.includes('ml') || lower.includes('data') || lower.includes('learn')) return 'ai';
        return 'web';
      };

      return Object.keys(categories).map((cat, idx) => ({
        id: `domain-${idx}`,
        title: cat,
        description: `Hands-on experience developing projects and managing systems with ${cat.toLowerCase()} methodologies and core libraries.`,
        icon: iconMap(cat),
        skills: categories[cat]
      }));
    })();

    const socialLinks = {
      github: data.socialLinks?.github || 'https://github.com/yujisatojr',
      linkedin: data.socialLinks?.linkedin || 'https://linkedin.com',
      twitter: data.socialLinks?.twitter || 'https://twitter.com',
      email: data.profile?.email || data.contact?.email || 'yuji@example.com'
    };

    const contact = {
      email: data.contact?.email || profile.email,
      location: data.contact?.location || profile.location,
      phone: data.contact?.phone || '',
      messagePrompt: data.contact?.messagePrompt || "Have an interesting project or role? Let's connect!"
    };

    return {
      profile,
      aboutText,
      interests,
      projects,
      experience,
      skillDomains,
      socialLinks,
      contact
    };
  }, [data]);
};

export const YujiPortfolioTemplate: React.FC<YujiPortfolioTemplateProps> = ({ data, config }) => {
  const portfolio = useYujiAdapter(data);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Form State
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  // Load custom accent color from config or default to standard elegant Purple-Blue
  const accentColor = config?.accentColor || '#6366f1';

  // Extract all unique project tech tags for categories list
  const projectCategories = useMemo(() => {
    const categories = new Set<string>();
    categories.add('All');
    portfolio.projects.forEach(project => {
      project.technologies.forEach(tech => {
        // Group similar techs or add directly
        const lower = tech.toLowerCase();
        if (lower.includes('react') || lower.includes('vue') || lower.includes('angular') || lower.includes('frontend') || lower.includes('web')) {
          categories.add('Web');
        } else if (lower.includes('python') || lower.includes('flask') || lower.includes('django') || lower.includes('node') || lower.includes('backend') || lower.includes('api')) {
          categories.add('Backend');
        } else if (lower.includes('ai') || lower.includes('openai') || lower.includes('llm') || lower.includes('ml') || lower.includes('gpt') || lower.includes('langchain')) {
          categories.add('AI / Data Science');
        } else if (lower.includes('game') || lower.includes('unity') || lower.includes('c#')) {
          categories.add('Games');
        } else {
          categories.add('Tools');
        }
      });
    });
    return Array.from(categories);
  }, [portfolio.projects]);

  // Filter projects dynamically
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return portfolio.projects;
    return portfolio.projects.filter(project => {
      return project.technologies.some(tech => {
        const lower = tech.toLowerCase();
        if (selectedCategory === 'Web') {
          return lower.includes('react') || lower.includes('vue') || lower.includes('angular') || lower.includes('frontend') || lower.includes('web') || lower.includes('html') || lower.includes('css');
        }
        if (selectedCategory === 'Backend') {
          return lower.includes('python') || lower.includes('flask') || lower.includes('django') || lower.includes('node') || lower.includes('backend') || lower.includes('api') || lower.includes('sql') || lower.includes('db');
        }
        if (selectedCategory === 'AI / Data Science') {
          return lower.includes('ai') || lower.includes('openai') || lower.includes('llm') || lower.includes('ml') || lower.includes('gpt') || lower.includes('langchain') || lower.includes('qdrant') || lower.includes('pandas');
        }
        if (selectedCategory === 'Games') {
          return lower.includes('game') || lower.includes('unity') || lower.includes('c#') || lower.includes('itch');
        }
        return !['react', 'vue', 'angular', 'frontend', 'web', 'python', 'flask', 'django', 'node', 'backend', 'api', 'ai', 'openai', 'llm', 'ml', 'gpt', 'langchain', 'game', 'unity', 'c#'].some(keyword => lower.includes(keyword));
      });
    });
  }, [portfolio.projects, selectedCategory]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolio.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  // Section anchor tags
  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Expertise', href: '#expertise' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <div className={`w-full min-h-screen font-sans transition-colors duration-300 ${theme === 'dark' ? 'dark bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-800'}`}>
      
      {/* -------------------------------------------------------------
          HEADER / NAVIGATION
          ------------------------------------------------------------- */}
      <header className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-all duration-300 border-b ${theme === 'dark' ? 'bg-zinc-950/80 border-zinc-800/80' : 'bg-white/80 border-zinc-200/80'}`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 font-bold text-xl tracking-tight hover:opacity-90">
            <span style={{ color: accentColor }}>&lt;</span>
            <span>{portfolio.profile.name}</span>
            <span style={{ color: accentColor }}> /&gt;</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 hover:opacity-100 ${theme === 'dark' ? 'text-zinc-300 hover:text-white' : 'text-zinc-600 hover:text-zinc-950'}`}
              >
                {link.name}
              </a>
            ))}

            {/* Theme Toggle */}
            <button 
              onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
              className={`p-2 rounded-lg transition-colors border ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-yellow-400 hover:bg-zinc-800' : 'bg-zinc-100 border-zinc-200 text-indigo-600 hover:bg-zinc-200'}`}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Theme Toggle for Mobile */}
            <button 
              onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
              className={`p-2 rounded-lg transition-colors border ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-yellow-400' : 'bg-zinc-100 border-zinc-200 text-indigo-600'}`}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button 
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className={`p-2 rounded-lg border ${theme === 'dark' ? 'border-zinc-800 hover:bg-zinc-900 text-zinc-300' : 'border-zinc-200 hover:bg-zinc-100 text-zinc-600'}`}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`absolute top-16 left-0 w-full border-b md:hidden flex flex-col p-6 gap-4 shadow-xl ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200'}`}
            >
              {navLinks.map(link => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium py-1 transition-colors ${theme === 'dark' ? 'text-zinc-300 hover:text-white' : 'text-zinc-600 hover:text-zinc-950'}`}
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer for Fixed Navbar */}
      <div className="h-16" />

      {/* -------------------------------------------------------------
          HERO / INTRODUCTION
          ------------------------------------------------------------- */}
      <section className="relative overflow-hidden py-16 md:py-24">
        {/* Decorative Grid Background Elements */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl filter" style={{ backgroundColor: accentColor }} />
        </div>

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Avatar Area - Placed on top on mobile, right on desktop */}
          <div className="md:col-span-5 md:order-2 flex justify-center">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              <div 
                className="absolute inset-0 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"
                style={{ backgroundColor: accentColor }}
              />
              <div className={`relative p-2 rounded-2xl border transition-all duration-300 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 group-hover:border-zinc-700' : 'bg-white border-zinc-200 group-hover:border-zinc-300'}`}>
                <img 
                  src={portfolio.profile.avatar} 
                  alt={portfolio.profile.name}
                  referrerPolicy="no-referrer"
                  className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </motion.div>
          </div>

          {/* Intro Information Block */}
          <div className="md:col-span-7 md:order-1 space-y-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full border tracking-wide uppercase"
              style={{ 
                color: theme === 'dark' ? '#f4f4f5' : '#18181b',
                borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)',
                backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)'
              }}
            >
              <span className="w-2 h-2 rounded-full bg-zinc-400" />
              <span>Available for projects</span>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-2"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                Hi, I'm{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(to right, ${accentColor}, #ec4899)` }}>
                  {portfolio.profile.name}
                </span>
              </h1>
              <p className="text-xl md:text-2xl font-bold opacity-90" style={{ color: accentColor }}>
                {portfolio.profile.role}
              </p>
            </motion.div>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={`text-base md:text-lg leading-relaxed ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}
            >
              {portfolio.profile.bio}
            </motion.p>

            {/* Meta Tags (Location etc) */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4 text-sm font-medium"
            >
              <div className="flex items-center gap-1.5 opacity-80">
                <MapPin size={16} />
                <span>{portfolio.profile.location}</span>
              </div>
              <div className="flex items-center gap-1.5 opacity-80">
                <Briefcase size={16} />
                <span>{portfolio.profile.role.split('&')[0].trim()}</span>
              </div>
            </motion.div>

            {/* Social Links & Action Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap items-center gap-5 pt-2"
            >
              <div className="flex items-center gap-4">
                <a 
                  href={portfolio.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-full border transition-transform duration-200 hover:-translate-y-1 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white' : 'bg-white border-zinc-200 hover:border-zinc-300 text-zinc-600 hover:text-zinc-950'}`}
                  aria-label="GitHub Profile"
                >
                  <Github size={20} />
                </a>
                <a 
                  href={portfolio.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-full border transition-transform duration-200 hover:-translate-y-1 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white' : 'bg-white border-zinc-200 hover:border-zinc-300 text-zinc-600 hover:text-zinc-950'}`}
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href={portfolio.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-full border transition-transform duration-200 hover:-translate-y-1 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white' : 'bg-white border-zinc-200 hover:border-zinc-300 text-zinc-600 hover:text-zinc-950'}`}
                  aria-label="Twitter Profile"
                >
                  <Twitter size={20} />
                </a>
                <a 
                  href={`mailto:${portfolio.contact.email}`}
                  className={`p-2.5 rounded-full border transition-transform duration-200 hover:-translate-y-1 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white' : 'bg-white border-zinc-200 hover:border-zinc-300 text-zinc-600 hover:text-zinc-950'}`}
                  aria-label="Send Email"
                >
                  <Mail size={20} />
                </a>
              </div>

              <div className="flex items-center gap-3">
                <a 
                  href="#projects"
                  className="px-5 py-2.5 text-sm font-semibold rounded-lg text-white shadow-md transition-all hover:shadow-lg hover:opacity-95"
                  style={{ backgroundColor: accentColor }}
                >
                  View Projects
                </a>
                <a 
                  href="#contact"
                  className={`px-5 py-2.5 text-sm font-semibold rounded-lg border transition-colors ${theme === 'dark' ? 'border-zinc-800 hover:bg-zinc-900 text-zinc-300 hover:text-white' : 'border-zinc-200 hover:bg-zinc-100 text-zinc-600 hover:text-zinc-950'}`}
                >
                  Get in Touch
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          ABOUT ME SECTION
          ------------------------------------------------------------- */}
      <section id="about" className={`py-20 border-t ${theme === 'dark' ? 'border-zinc-900 bg-zinc-950' : 'border-zinc-200 bg-zinc-100/30'}`}>
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight">About Me</h2>
            <div className="w-12 h-1 mx-auto rounded" style={{ backgroundColor: accentColor }} />
            <p className={`text-base leading-relaxed pt-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Let me share a brief insight into my background and core technical philosophy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            {/* Bio Column */}
            <div className="md:col-span-7 space-y-6">
              <h3 className="text-xl font-bold">My Journey &amp; Mission</h3>
              <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'}`}>
                {portfolio.aboutText}
              </p>
              <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'}`}>
                I believe in writing clean, modular, and maintainable code, optimizing systems for optimal user experience, and automating complex tasks to let teams focus on actual creativity.
              </p>
              <div className="pt-4 flex flex-wrap gap-3">
                <div className={`px-4 py-2 rounded-xl flex items-center gap-2 border text-sm font-semibold ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-zinc-200' : 'bg-white border-zinc-200 text-zinc-700'}`}>
                  <Terminal size={16} style={{ color: accentColor }} />
                  <span>Terminal Fanatic</span>
                </div>
                <div className={`px-4 py-2 rounded-xl flex items-center gap-2 border text-sm font-semibold ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-zinc-200' : 'bg-white border-zinc-200 text-zinc-700'}`}>
                  <Code size={16} style={{ color: accentColor }} />
                  <span>UI Perfectionist</span>
                </div>
                <div className={`px-4 py-2 rounded-xl flex items-center gap-2 border text-sm font-semibold ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-zinc-200' : 'bg-white border-zinc-200 text-zinc-700'}`}>
                  <Server size={16} style={{ color: accentColor }} />
                  <span>Cloud Specialist</span>
                </div>
              </div>
            </div>

            {/* Profile Card & Interests Column */}
            <div className="md:col-span-5 space-y-8">
              <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-zinc-900/60 border-zinc-800/80' : 'bg-white border-zinc-200'}`}>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <User size={18} style={{ color: accentColor }} />
                  <span>Personal Details</span>
                </h3>
                <dl className="space-y-3.5 text-sm">
                  <div className="flex justify-between items-center py-1.5 border-b border-dashed border-zinc-200 dark:border-zinc-800">
                    <dt className="opacity-70 font-medium">Full Name</dt>
                    <dd className="font-semibold">{portfolio.profile.name}</dd>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-dashed border-zinc-200 dark:border-zinc-800">
                    <dt className="opacity-70 font-medium">Location</dt>
                    <dd className="font-semibold">{portfolio.profile.location}</dd>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-dashed border-zinc-200 dark:border-zinc-800">
                    <dt className="opacity-70 font-medium">Email</dt>
                    <dd className="font-semibold">
                      <button onClick={handleCopyEmail} className="hover:opacity-85 text-xs inline-flex items-center gap-1 underline focus:outline-none">
                        <span>{portfolio.contact.email}</span>
                      </button>
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Interests Group */}
              <div className="space-y-3">
                <h3 className="text-base font-bold tracking-wide uppercase opacity-85">Interests &amp; Fields</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm font-medium">
                  {portfolio.interests.map((interest, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check size={14} style={{ color: accentColor }} />
                      <span className={`${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'}`}>{interest}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          EXPERTISE / SKILLS SECTION
          ------------------------------------------------------------- */}
      <section id="expertise" className="py-20 border-t border-zinc-200 dark:border-zinc-900">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight">Areas of Expertise</h2>
            <div className="w-12 h-1 mx-auto rounded" style={{ backgroundColor: accentColor }} />
            <p className={`text-base leading-relaxed pt-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Here are my primary fields of professional expertise and their core toolsets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolio.skillDomains.map((domain, index) => {
              // Icon mapping based on template keywords
              const renderIcon = () => {
                if (domain.icon === 'devops') return <Server size={28} style={{ color: accentColor }} />;
                if (domain.icon === 'ai') return <Brain size={28} style={{ color: accentColor }} />;
                return <Code size={28} style={{ color: accentColor }} />;
              };

              return (
                <div 
                  key={domain.id}
                  className={`p-8 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${theme === 'dark' ? 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/70' : 'bg-white border-zinc-200/80 hover:border-zinc-300 hover:shadow-xl'}`}
                >
                  <div className="space-y-5">
                    {/* Header: Icon & Title */}
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl border ${theme === 'dark' ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-100/60 border-zinc-200'}`}>
                        {renderIcon()}
                      </div>
                      <h3 className="text-lg font-extrabold leading-snug">{domain.title}</h3>
                    </div>

                    {/* Description */}
                    <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      {domain.description}
                    </p>
                  </div>

                  {/* Skills tags list */}
                  <div className="pt-6 border-t border-dashed border-zinc-200 dark:border-zinc-800/80 mt-6">
                    <div className="flex flex-wrap gap-2">
                      {domain.skills.map((skill, sIdx) => (
                        <span 
                          key={sIdx}
                          className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${theme === 'dark' ? 'bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:bg-zinc-800' : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100'}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          WORK EXPERIENCE / CAREER SECTION
          ------------------------------------------------------------- */}
      <section id="experience" className={`py-20 border-t ${theme === 'dark' ? 'border-zinc-900 bg-zinc-950' : 'border-zinc-200 bg-zinc-100/30'}`}>
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight">Career Journey</h2>
            <div className="w-12 h-1 mx-auto rounded" style={{ backgroundColor: accentColor }} />
            <p className={`text-base leading-relaxed pt-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              A chronological history of my professional roles and engineering impact.
            </p>
          </div>

          {portfolio.experience.length === 0 ? (
            <div className="text-center py-12">
              <p className="opacity-70">No career history uploaded yet.</p>
            </div>
          ) : (
            <div className="relative border-l-2 border-dashed border-zinc-200 dark:border-zinc-800 ml-4 md:ml-6 pl-8 md:pl-10 space-y-12">
              {portfolio.experience.map((item, index) => (
                <div key={item.id} className="relative group">
                  
                  {/* Timeline Node Point */}
                  <div 
                    className="absolute -left-[41px] md:-left-[49px] top-1.5 w-6 h-6 rounded-full border-4 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ 
                      borderColor: theme === 'dark' ? '#18181b' : '#f4f4f5',
                      backgroundColor: accentColor
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping opacity-75" />
                  </div>

                  {/* Experience Card */}
                  <div className={`p-6 md:p-8 rounded-2xl border transition-all duration-300 ${theme === 'dark' ? 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/60' : 'bg-white border-zinc-200/80 hover:shadow-xl hover:border-zinc-300'}`}>
                    
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                      <div>
                        <h3 className="text-lg font-extrabold leading-snug">{item.role}</h3>
                        <p className="text-sm font-bold opacity-85" style={{ color: accentColor }}>
                          {item.company}
                        </p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold self-start sm:self-center border ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-zinc-100 border-zinc-200 text-zinc-700'}`}>
                        {item.duration}
                      </div>
                    </div>

                    {/* Description */}
                    <p className={`text-sm leading-relaxed mt-4 ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'}`}>
                      {item.description}
                    </p>

                    {/* Achievements List */}
                    {item.achievements && item.achievements.length > 0 && (
                      <ul className="mt-4 space-y-2 text-sm">
                        {item.achievements.map((ach, aIdx) => (
                          <li key={aIdx} className="flex items-start gap-2.5">
                            <ChevronRight size={16} className="mt-0.5 shrink-0" style={{ color: accentColor }} />
                            <span className={`${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Technologies Badges */}
                    {item.technologies && item.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-6 mt-4 border-t border-dashed border-zinc-200 dark:border-zinc-800">
                        {item.technologies.map((tech, tIdx) => (
                          <span 
                            key={tIdx}
                            className={`px-2.5 py-0.5 text-xs font-semibold rounded-md border ${theme === 'dark' ? 'bg-zinc-900/60 border-zinc-800 text-zinc-300' : 'bg-zinc-50 border-zinc-200 text-zinc-600'}`}
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
          )}
        </div>
      </section>

      {/* -------------------------------------------------------------
          PORTFOLIO PROJECTS SECTION
          ------------------------------------------------------------- */}
      <section id="projects" className="py-20 border-t border-zinc-200 dark:border-zinc-900">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight">Featured Projects</h2>
            <div className="w-12 h-1 mx-auto rounded" style={{ backgroundColor: accentColor }} />
            <p className={`text-base leading-relaxed pt-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Explore some of my featured tools, platforms, and open source libraries.
            </p>
          </div>

          {/* Filtering Navigation Tabs */}
          {projectCategories.length > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {projectCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg border transition-all ${
                    selectedCategory === cat
                      ? 'text-white border-transparent'
                      : theme === 'dark'
                        ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                        : 'bg-white border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:border-zinc-300'
                  }`}
                  style={{ 
                    backgroundColor: selectedCategory === cat ? accentColor : undefined 
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <p className="opacity-70 text-sm">No projects matching your filtered group.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {filteredProjects.map((project, idx) => (
                <div 
                  key={project.id}
                  className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${theme === 'dark' ? 'bg-zinc-900/40 border-zinc-800/85 hover:border-zinc-700/80 hover:bg-zinc-900/60' : 'bg-white border-zinc-200/80 hover:border-zinc-300'}`}
                >
                  {/* Project Graphic Frame */}
                  <div className="relative group overflow-hidden h-48 md:h-56">
                    <img 
                      src={project.image} 
                      alt={project.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60" />
                    
                    {/* Status badge */}
                    {project.status && (
                      <span className="absolute top-4 right-4 px-2.5 py-0.5 text-2xs font-extrabold uppercase rounded-full bg-zinc-950/80 text-zinc-200 border border-zinc-800/50 backdrop-blur-md">
                        {project.status}
                      </span>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                    <div className="space-y-4">
                      <h3 className="text-xl font-extrabold tracking-tight leading-snug">{project.name}</h3>
                      <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        {project.description}
                      </p>

                      {/* Tech badges */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.technologies.map((tech, tIdx) => (
                          <span 
                            key={tIdx}
                            className={`px-2 py-0.5 text-3xs font-extrabold uppercase rounded-md border ${theme === 'dark' ? 'bg-zinc-900/80 border-zinc-800 text-zinc-400' : 'bg-zinc-50 border-zinc-200 text-zinc-600'}`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action buttons footer */}
                    <div className="flex items-center gap-3 pt-6 border-t border-dashed border-zinc-200 dark:border-zinc-800/80 mt-6">
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-colors ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white' : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300 text-zinc-600 hover:text-zinc-950'}`}
                        >
                          <Github size={14} />
                          <span>GitHub</span>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-xs font-bold shadow-sm transition-all hover:opacity-95"
                          style={{ backgroundColor: accentColor }}
                        >
                          <ExternalLink size={14} />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* -------------------------------------------------------------
          CONTACT SECTION
          ------------------------------------------------------------- */}
      <section id="contact" className={`py-20 border-t ${theme === 'dark' ? 'border-zinc-900 bg-zinc-950' : 'border-zinc-200 bg-zinc-100/30'}`}>
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight">Get in Touch</h2>
            <div className="w-12 h-1 mx-auto rounded" style={{ backgroundColor: accentColor }} />
            <p className={`text-base leading-relaxed pt-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Want to request a project consult, schedule a review, or just say hello? Write me a transmission below!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Form Column */}
            <div className="lg:col-span-7">
              <div className={`p-6 md:p-8 rounded-2xl border ${theme === 'dark' ? 'bg-zinc-900/40 border-zinc-800/80' : 'bg-white border-zinc-200'}`}>
                
                {formStatus === 'success' ? (
                  <div className="text-center py-10 space-y-4">
                    <CheckCircle2 size={54} className="mx-auto text-zinc-900 dark:text-zinc-100" />
                    <h3 className="text-xl font-bold">Transmission Dispatched!</h3>
                    <p className={`text-sm max-w-md mx-auto leading-relaxed ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      Thank you for reaching out! I've successfully received your message and will respond to your specified email address as soon as possible.
                    </p>
                    <button 
                      onClick={() => setFormStatus('idle')}
                      className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded border text-sm hover:opacity-90"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label htmlFor="name" className="text-xs font-bold uppercase tracking-wide opacity-80">Full Name</label>
                        <input 
                          type="text" 
                          id="name"
                          required
                          value={formState.name}
                          onChange={e => setFormState(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Your full name"
                          className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-1 transition-all ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800 focus:ring-zinc-700' : 'bg-zinc-50 border-zinc-200 focus:ring-zinc-300'}`}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="email" className="text-xs font-bold uppercase tracking-wide opacity-80">Email Address</label>
                        <input 
                          type="email" 
                          id="email"
                          required
                          value={formState.email}
                          onChange={e => setFormState(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="Your email address"
                          className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-1 transition-all ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800 focus:ring-zinc-700' : 'bg-zinc-50 border-zinc-200 focus:ring-zinc-300'}`}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wide opacity-80">Subject</label>
                      <input 
                        type="text" 
                        id="subject"
                        value={formState.subject}
                        onChange={e => setFormState(prev => ({ ...prev, subject: e.target.value }))}
                        placeholder="Project topic or query subject"
                        className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-1 transition-all ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800 focus:ring-zinc-700' : 'bg-zinc-50 border-zinc-200 focus:ring-zinc-300'}`}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="message" className="text-xs font-bold uppercase tracking-wide opacity-80">Message Body</label>
                      <textarea 
                        id="message"
                        required
                        rows={5}
                        value={formState.message}
                        onChange={e => setFormState(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Write your detailed query or project descriptions..."
                        className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-1 transition-all resize-none ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800 focus:ring-zinc-700' : 'bg-zinc-50 border-zinc-200 focus:ring-zinc-300'}`}
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full py-3 rounded-lg text-white font-semibold flex items-center justify-center gap-2 shadow-md transition-all hover:opacity-95 disabled:opacity-70"
                      style={{ backgroundColor: accentColor }}
                    >
                      <Send size={16} />
                      <span>{formStatus === 'submitting' ? 'Dispatching Transmission...' : 'Send Message'}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Info Cards Column */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Profile Bio Prompt */}
              <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-zinc-900/40 border-zinc-800/80' : 'bg-white border-zinc-200'}`}>
                <h3 className="text-lg font-extrabold mb-2">Connect Directly</h3>
                <p className={`text-sm leading-relaxed mb-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {portfolio.contact.messagePrompt}
                </p>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-400" />
                  <span className="text-xs font-bold opacity-80">Response time within 24 hours</span>
                </div>
              </div>

              {/* Contact Specific Cards */}
              <div className="space-y-3">
                <div className={`p-4 rounded-xl border flex items-center gap-4 ${theme === 'dark' ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                  <div className={`p-2.5 rounded-lg border ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-100 border-zinc-200'}`} style={{ color: accentColor }}>
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase opacity-65">Email Address</h4>
                    <button onClick={handleCopyEmail} className="text-sm font-semibold hover:opacity-85 inline-flex items-center gap-1.5 focus:outline-none">
                      <span>{portfolio.contact.email}</span>
                      {copiedEmail ? (
                        <span className="text-2xs text-zinc-900 dark:text-zinc-100 font-bold border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded uppercase tracking-wide">Copied</span>
                      ) : (
                        <span className="text-3xs text-zinc-400 border border-zinc-200 dark:border-zinc-800 px-1.5 py-0.5 rounded uppercase tracking-wide">Copy</span>
                      )}
                    </button>
                  </div>
                </div>

                {portfolio.contact.phone && (
                  <div className={`p-4 rounded-xl border flex items-center gap-4 ${theme === 'dark' ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                    <div className={`p-2.5 rounded-lg border ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-100 border-zinc-200'}`} style={{ color: accentColor }}>
                      <Phone size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase opacity-65">Phone Contact</h4>
                      <p className="text-sm font-semibold">{portfolio.contact.phone}</p>
                    </div>
                  </div>
                )}

                <div className={`p-4 rounded-xl border flex items-center gap-4 ${theme === 'dark' ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                  <div className={`p-2.5 rounded-lg border ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-100 border-zinc-200'}`} style={{ color: accentColor }}>
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase opacity-65">Office Location</h4>
                    <p className="text-sm font-semibold">{portfolio.contact.location}</p>
                  </div>
                </div>
              </div>

              {/* Micro Social Network Block */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wide opacity-80">Online Profiles</h4>
                <div className="flex gap-2">
                  <a 
                    href={portfolio.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border font-bold text-xs transition-colors ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white' : 'bg-white border-zinc-200 hover:border-zinc-300 text-zinc-600 hover:text-zinc-950'}`}
                  >
                    <Github size={14} />
                    <span>GitHub</span>
                  </a>
                  <a 
                    href={portfolio.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border font-bold text-xs transition-colors ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white' : 'bg-white border-zinc-200 hover:border-zinc-300 text-zinc-600 hover:text-zinc-950'}`}
                  >
                    <Linkedin size={14} />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          FOOTER
          ------------------------------------------------------------- */}
      <footer className={`border-t py-12 ${theme === 'dark' ? 'border-zinc-900 bg-zinc-950 text-zinc-400' : 'border-zinc-200 bg-white text-zinc-600'}`}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-2 font-semibold">
            <span style={{ color: accentColor }}>&lt;</span>
            <span>{portfolio.profile.name}</span>
            <span style={{ color: accentColor }}> /&gt;</span>
          </div>

          <p className="text-sm text-center md:text-right">
            &copy; {new Date().getFullYear()} {portfolio.profile.name}. All rights reserved. 
            <span className="hidden md:inline"> | Built with BuildEasy React Platform.</span>
          </p>

          <div className="flex gap-4">
            <a href={portfolio.socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">
              <Github size={16} />
            </a>
            <a href={portfolio.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">
              <Linkedin size={16} />
            </a>
            <a href={portfolio.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">
              <Twitter size={16} />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
};
