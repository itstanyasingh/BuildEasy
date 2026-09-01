import React, { useState, useMemo } from 'react';
import { PortfolioData, LayoutConfiguration } from '../../types';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  FileText, 
  MapPin, 
  ArrowUpRight, 
  ExternalLink, 
  Code, 
  Terminal, 
  Cpu, 
  Server, 
  Database, 
  Cloud, 
  Layers, 
  Star, 
  GitFork, 
  Sparkles, 
  GraduationCap, 
  Briefcase, 
  Send, 
  Copy, 
  Check, 
  Zap, 
  Globe, 
  BookOpen, 
  CheckCircle2,
  Laptop
} from 'lucide-react';
import { motion } from 'motion/react';

interface ModernSoftwareDeveloperPortfolioTemplateProps {
  data: PortfolioData;
  config?: LayoutConfiguration;
}

export const ModernSoftwareDeveloperPortfolioTemplate: React.FC<ModernSoftwareDeveloperPortfolioTemplateProps> = ({ 
  data, 
  config 
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'fullstack' | 'frontend' | 'backend'>('all');

  // Safe fallback data bindings
  const profile = data?.profile || {
    name: 'Hanzla Tauqeer',
    title: 'Full Stack Software Engineer & Open Source Enthusiast',
    bio: 'A passionate Full Stack Software Developer 🚀 having an experience of building Web and Mobile applications with JavaScript / React.js / Node.js / Python and some other cool libraries and frameworks.',
    location: 'Lahore, Pakistan · Remote Worldwide',
    email: 'hanzla.dev@gmail.com',
    phone: '+92 300 1234567',
    website: 'https://hanzla.dev',
    profilePhoto: ''
  };

  const about = data?.about || {
    aboutText: 'I am a passionate software engineer with extensive experience in architecting scalable web applications, designing microservices, and crafting interactive frontends. I love open source and constantly explore cutting-edge technologies.',
    interests: ['Full Stack Development', 'Cloud Architecture', 'Mobile Apps', 'DevOps & CI/CD', 'Open Source'],
    services: ['Web App Development', 'API Design & Integration', 'Cloud Migration', 'Performance Optimization']
  };

  const skills = useMemo(() => {
    if (data?.skills && data.skills.length > 0) {
      return data.skills;
    }
    return [
      { id: 's1', name: 'React.js', category: 'Frontend', proficiency: 95 },
      { id: 's2', name: 'Next.js', category: 'Frontend', proficiency: 92 },
      { id: 's3', name: 'TypeScript', category: 'Frontend', proficiency: 90 },
      { id: 's4', name: 'JavaScript', category: 'Frontend', proficiency: 95 },
      { id: 's5', name: 'Tailwind CSS', category: 'Frontend', proficiency: 94 },
      { id: 's6', name: 'Node.js', category: 'Backend', proficiency: 90 },
      { id: 's7', name: 'Express.js', category: 'Backend', proficiency: 88 },
      { id: 's8', name: 'Python', category: 'Backend', proficiency: 85 },
      { id: 's9', name: 'Django / FastAPI', category: 'Backend', proficiency: 82 },
      { id: 's10', name: 'PostgreSQL', category: 'Databases', proficiency: 86 },
      { id: 's11', name: 'MongoDB', category: 'Databases', proficiency: 88 },
      { id: 's12', name: 'Redis', category: 'Databases', proficiency: 80 },
      { id: 's13', name: 'Docker', category: 'DevOps & Cloud', proficiency: 84 },
      { id: 's14', name: 'AWS (EC2, S3, Lambda)', category: 'DevOps & Cloud', proficiency: 82 },
      { id: 's15', name: 'Git & GitHub Actions', category: 'Tools', proficiency: 92 },
      { id: 's16', name: 'GraphQL', category: 'Backend', proficiency: 80 }
    ];
  }, [data?.skills]);

  const experiences = useMemo(() => {
    if (data?.experience && data.experience.length > 0) {
      return data.experience;
    }
    return [
      {
        id: 'exp-1',
        company: 'CodeFlow Technologies',
        role: 'Senior Full Stack Developer',
        duration: 'Jan 2023 — Present',
        description: 'Leading full-stack engineering initiatives for enterprise SaaS products, architecting cloud-native microservices and responsive web platforms.',
        current: true,
        technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
        achievements: [
          'Architected and delivered multi-tenant dashboard serving 50k+ daily active users',
          'Reduced API latency by 45% through Redis caching and optimized PostgreSQL queries',
          'Mentored 6 junior and mid-level software engineers across agile sprints'
        ]
      },
      {
        id: 'exp-2',
        company: 'Veloce Digital Systems',
        role: 'Full Stack Web Developer',
        duration: 'Jun 2021 — Dec 2022',
        description: 'Developed scalable client-facing web applications, integrated third-party payment gateways, and modernized legacy codebases.',
        current: false,
        technologies: ['React', 'TypeScript', 'Express.js', 'MongoDB', 'Tailwind CSS'],
        achievements: [
          'Engineered real-time notification engine with WebSockets handling 10k concurrent channels',
          'Implemented end-to-end testing with Jest and Cypress, achieving 88% test coverage'
        ]
      },
      {
        id: 'exp-3',
        company: 'AppCrafters Studio',
        role: 'Frontend Developer Intern',
        duration: 'Jan 2021 — May 2021',
        description: 'Created dynamic UI components, optimized responsive layouts, and integrated RESTful endpoints.',
        current: false,
        technologies: ['JavaScript', 'React', 'CSS3', 'REST APIs', 'Git'],
        achievements: [
          'Built 12+ modular design system components adopted across client web apps'
        ]
      }
    ];
  }, [data?.experience]);

  const projects = useMemo(() => {
    if (data?.projects && data.projects.length > 0) {
      return data.projects;
    }
    return [
      {
        id: 'proj-1',
        name: 'Developer Portfolio Master',
        description: 'An open-source, highly customizable modern developer portfolio built with React, Next.js, Tailwind CSS, and smooth animations.',
        technologies: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
        image: '',
        githubUrl: 'https://github.com',
        liveUrl: 'https://developer-portfolio.demo',
        featured: true,
        year: '2024',
        stars: 342,
        forks: 98
      },
      {
        id: 'proj-2',
        name: 'CloudScale Microservices Engine',
        description: 'Distributed container orchestration dashboard providing real-time telemetry, pod autoscaling metrics, and live log streaming.',
        technologies: ['Node.js', 'Docker', 'Kubernetes', 'React', 'PostgreSQL'],
        image: '',
        githubUrl: 'https://github.com',
        liveUrl: 'https://cloudscale.demo',
        featured: true,
        year: '2024',
        stars: 184,
        forks: 42
      },
      {
        id: 'proj-3',
        name: 'HyperPay FinTech Gateway',
        description: 'Secure, high-throughput payment aggregation API supporting multi-currency checkout, fraud telemetry, and automated recurring billing.',
        technologies: ['Python', 'FastAPI', 'Redis', 'PostgreSQL', 'Stripe'],
        image: '',
        githubUrl: 'https://github.com',
        liveUrl: 'https://hyperpay.demo',
        featured: false,
        year: '2023',
        stars: 95,
        forks: 21
      },
      {
        id: 'proj-4',
        name: 'CollaborateHub Realtime Workspace',
        description: 'Interactive team collaboration suite featuring rich text documents, video rooms, and bidirectional whiteboard canvas.',
        technologies: ['React', 'TypeScript', 'WebSockets', 'WebRTC', 'Tailwind CSS'],
        image: '',
        githubUrl: 'https://github.com',
        liveUrl: 'https://collaboratehub.demo',
        featured: false,
        year: '2023',
        stars: 120,
        forks: 34
      }
    ];
  }, [data?.projects]);

  const education = useMemo(() => {
    if (data?.education && data.education.length > 0) {
      return data.education;
    }
    return [
      {
        id: 'edu-1',
        institution: 'University of Engineering and Technology',
        degree: 'Bachelor of Science in Computer Science',
        duration: '2017 — 2021',
        grade: '3.8 / 4.0 GPA · Magna Cum Laude'
      }
    ];
  }, [data?.education]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const navLinks = [
    { id: 'skills', label: 'Skills' },
    { id: 'proficiency', label: 'Proficiency' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' }
  ];

  // Tech proficiency groups
  const proficiencyBars = [
    { name: 'Frontend Development (React, Next.js, Tailwind)', percent: 92, color: 'from-blue-500 to-cyan-400' },
    { name: 'Backend Architecture (Node.js, Express, Python)', percent: 88, color: 'from-indigo-500 to-purple-500' },
    { name: 'Database & Data Modeling (PostgreSQL, MongoDB, Redis)', percent: 85, color: 'from-emerald-500 to-teal-400' },
    { name: 'Cloud Infrastructure & DevOps (Docker, AWS, CI/CD)', percent: 80, color: 'from-amber-500 to-orange-400' }
  ];

  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white relative overflow-x-hidden">
      
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Modern Developer Navbar */}
      <header className="sticky top-0 z-50 bg-[#0d1117]/85 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          
          {/* Developer Logo */}
          <div className="flex items-center gap-2">
            <span className="text-indigo-400 font-mono text-lg font-bold">&lt;</span>
            <span className="font-extrabold text-base tracking-tight text-white font-mono">{profile.name}</span>
            <span className="text-indigo-400 font-mono text-lg font-bold">/&gt;</span>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="hover:text-indigo-400 transition-colors uppercase tracking-wider text-[11px]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Contact Action */}
          <a
            href="#contact"
            className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30 flex items-center gap-1.5"
          >
            <span>Contact Me</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-24 sm:space-y-32 relative z-10">

        {/* ========================================================================= */}
        {/* 1. HERO SECTION                                                           */}
        {/* ========================================================================= */}
        <section id="hero" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-4 sm:pt-8">
          
          {/* Left Column: Greeting & Intro */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Available for Hire &amp; Collaboration</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                Hi all, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">{profile.name}</span> <span className="inline-block animate-bounce">⚡</span>
              </h1>
              <p className="text-lg sm:text-xl font-medium text-slate-300 leading-relaxed">
                {profile.title}
              </p>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
                {profile.bio}
              </p>
            </div>

            {/* Social Media Button Pills */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {data?.socialLinks?.github && (
                <a
                  href={data.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800/90 hover:bg-[#333] border border-slate-700 text-white flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {data?.socialLinks?.linkedin && (
                <a
                  href={data.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-[#0077b5]/20 hover:bg-[#0077b5] border border-[#0077b5]/40 text-[#0077b5] hover:text-white flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {data?.socialLinks?.twitter && (
                <a
                  href={data.socialLinks.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1da1f2]/20 hover:bg-[#1da1f2] border border-[#1da1f2]/40 text-[#1da1f2] hover:text-white flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                  aria-label="Twitter Profile"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              <a
                href={`mailto:${profile.email}`}
                className="w-10 h-10 rounded-full bg-rose-500/20 hover:bg-rose-600 border border-rose-500/40 text-rose-400 hover:text-white flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <a
                href="#contact"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>CONTACT ME</span>
              </a>

              <a
                href="#projects"
                className="px-6 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <Code className="w-4 h-4 text-indigo-400" />
                <span>EXPLORE WORK</span>
              </a>
            </div>

          </div>

          {/* Right Column: Developer Code Scene & Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-[#121824] p-6 shadow-2xl space-y-4 relative overflow-hidden">
              
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                </div>
                <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                  <span>developer.ts</span>
                </div>
              </div>

              {/* Code Snippet */}
              <div className="font-mono text-xs text-slate-300 space-y-1 leading-relaxed bg-[#0b0e14] p-4 rounded-xl border border-slate-800/80 overflow-x-auto">
                <div><span className="text-purple-400">const</span> <span className="text-cyan-300">developer</span> = &#123;</div>
                <div className="pl-4"><span className="text-slate-400">name:</span> <span className="text-amber-300">"{profile.name}"</span>,</div>
                <div className="pl-4"><span className="text-slate-400">role:</span> <span className="text-amber-300">"Full Stack Engineer"</span>,</div>
                <div className="pl-4"><span className="text-slate-400">skills:</span> [</div>
                <div className="pl-8 text-emerald-300">"React", "Node.js", "TypeScript", "Python", "AWS"</div>
                <div className="pl-4">],</div>
                <div className="pl-4"><span className="text-slate-400">hardWorker:</span> <span className="text-indigo-400">true</span>,</div>
                <div className="pl-4"><span className="text-slate-400">problemSolver:</span> <span className="text-indigo-400">true</span>,</div>
                <div className="pl-4"><span className="text-indigo-400">hireable</span>: <span className="text-purple-400">function</span>() &#123;</div>
                <div className="pl-8"><span className="text-purple-400">return</span> <span className="text-indigo-400">this</span>.hardWorker &amp;&amp; <span className="text-indigo-400">this</span>.problemSolver;</div>
                <div className="pl-4">&#125;</div>
                <div>&#125;;</div>
              </div>

              {/* Live Metric Pills */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800 text-center">
                  <div className="text-lg font-bold text-indigo-400">4+ Years</div>
                  <div className="text-[10px] text-slate-400 font-mono">EXPERIENCE</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800 text-center">
                  <div className="text-lg font-bold text-cyan-400">25+ Projects</div>
                  <div className="text-[10px] text-slate-400 font-mono">COMPLETED</div>
                </div>
              </div>

            </div>
          </div>

        </section>

        {/* ========================================================================= */}
        {/* 2. WHAT I DO (SKILLS & CAPABILITIES)                                      */}
        {/* ========================================================================= */}
        <section id="skills" className="space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              What I Do 🚀
            </h2>
            <p className="text-xs sm:text-sm font-mono text-indigo-400 uppercase tracking-widest font-bold">
              CRAZY FULL STACK DEVELOPER WHO WANTS TO EXPLORE EVERY TECH STACK
            </p>
          </div>

          {/* Tech stack badge matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4">
            {skills.map((skill) => (
              <div 
                key={skill.id}
                className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/60 hover:bg-slate-900 transition-all flex flex-col items-center justify-center text-center space-y-2 group shadow-sm"
              >
                <div className="w-10 h-10 rounded-full bg-indigo-950/70 border border-indigo-800/50 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                  <Code className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-200 block group-hover:text-white transition-colors">
                    {skill.name}
                  </span>
                  {skill.category && (
                    <span className="text-[10px] text-slate-500 font-mono">
                      {skill.category}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Core Capability Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#121826] border border-slate-800 space-y-3 shadow-md">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Laptop className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Full Stack Development</h3>
              <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">⚡</span>
                  <span>Building responsive Single-Page-Apps (SPA) and PWA in React.js / Next.js</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">⚡</span>
                  <span>Developing robust REST &amp; GraphQL APIs using Node.js &amp; Python</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#121826] border border-slate-800 space-y-3 shadow-md">
              <div className="w-12 h-12 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Cloud className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Cloud &amp; DevOps</h3>
              <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">⚡</span>
                  <span>Deploying scalable cloud microservices on AWS, Docker &amp; Kubernetes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">⚡</span>
                  <span>Setting up automated CI/CD pipelines with GitHub Actions</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#121826] border border-slate-800 space-y-3 shadow-md">
              <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Database Architecture</h3>
              <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">⚡</span>
                  <span>Designing normalized SQL schemas in PostgreSQL &amp; MySQL</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">⚡</span>
                  <span>High-speed caching with Redis and document storage with MongoDB</span>
                </li>
              </ul>
            </div>

          </div>

        </section>

        {/* ========================================================================= */}
        {/* 3. PROFICIENCY (PROGRESS BARS)                                            */}
        {/* ========================================================================= */}
        <section id="proficiency" className="space-y-8">
          
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Proficiency 📊
            </h2>
            <p className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
              TECHNICAL COMPETENCY RATINGS &amp; STRENGTHS
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 space-y-6">
            {proficiencyBars.map((bar, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-xs sm:text-sm font-semibold">
                  <span className="text-slate-200">{bar.name}</span>
                  <span className="text-indigo-400 font-mono">{bar.percent}%</span>
                </div>
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${bar.color} transition-all duration-700`}
                    style={{ width: `${bar.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* ========================================================================= */}
        {/* 4. WORK EXPERIENCE                                                        */}
        {/* ========================================================================= */}
        <section id="experience" className="space-y-8">
          
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Work Experience 💼
            </h2>
            <p className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
              CAREER JOURNEY &amp; PROFESSIONAL IMPACT
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {experiences.map((exp, idx) => (
              <div 
                key={exp.id || idx}
                className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-[#101522] p-6 sm:p-8 space-y-5 hover:border-indigo-500/50 transition-all shadow-md group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      <span>{exp.company}</span>
                    </div>
                  </div>
                  <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3.5 py-1.5 rounded-full border border-slate-800 self-start sm:self-auto font-semibold">
                    {exp.duration}
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {exp.description}
                </p>

                {/* Achievements List */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block font-bold">
                      Key Deliverables:
                    </span>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                      {exp.achievements.map((item, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-2">
                    {exp.technologies.map((tech, tIdx) => (
                      <span 
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md bg-indigo-950/60 border border-indigo-800/40 text-indigo-300 text-xs font-mono font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

              </div>
            ))}
          </div>

        </section>

        {/* ========================================================================= */}
        {/* 5. PROJECTS & OPEN SOURCE                                                 */}
        {/* ========================================================================= */}
        <section id="projects" className="space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Open Source &amp; Projects 🛠️
              </h2>
              <p className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
                FEATURED CODEBASES &amp; REPOSITORIES
              </p>
            </div>
            <a
              href={data?.socialLinks?.github || 'https://github.com'}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 self-start sm:self-auto transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>More Projects</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <div 
                key={project.id || idx}
                className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-[#0e1320] p-6 sm:p-7 flex flex-col justify-between hover:border-indigo-500/50 transition-all hover:shadow-xl hover:shadow-indigo-500/5 space-y-6 group"
              >
                <div className="space-y-4">
                  
                  {/* Top metadata */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                      <Code className="w-5 h-5" />
                    </div>
                    
                    {/* Stars and Forks badge simulation */}
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                      <span className="flex items-center gap-1 text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{project.stars || 120 + idx * 45}</span>
                      </span>
                      <span className="text-slate-600">|</span>
                      <span className="flex items-center gap-1 text-slate-300">
                        <GitFork className="w-3.5 h-3.5" />
                        <span>{project.forks || 34 + idx * 12}</span>
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {project.name}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="pt-1 flex flex-wrap gap-1.5">
                      {project.technologies.map((tech, tIdx) => (
                        <span 
                          key={tIdx}
                          className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                </div>

                {/* Project Links Footer */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-white flex items-center gap-1.5 font-semibold transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span>Source Code</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 font-bold transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>

                  <span className="text-slate-600 font-mono text-xs font-bold">
                    0{idx + 1}
                  </span>
                </div>

              </div>
            ))}
          </div>

        </section>

        {/* ========================================================================= */}
        {/* 6. EDUCATION                                                              */}
        {/* ========================================================================= */}
        <section id="education" className="space-y-8">
          
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Education 🎓
            </h2>
            <p className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
              ACADEMIC FOUNDATION &amp; DEGREE
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {education.map((edu, idx) => (
              <div 
                key={edu.id || idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-slate-700 transition-colors shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white">{edu.institution}</h3>
                    <p className="text-sm font-medium text-slate-300">{edu.degree}</p>
                    {edu.grade && (
                      <p className="text-xs font-mono text-emerald-400 font-bold">{edu.grade}</p>
                    )}
                  </div>
                </div>

                <div className="text-xs font-mono text-slate-400 bg-slate-950 px-4 py-2 rounded-full border border-slate-800 self-start sm:self-auto font-semibold">
                  {edu.duration}
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* ========================================================================= */}
        {/* 7. CONTACT & REACH OUT                                                    */}
        {/* ========================================================================= */}
        <section id="contact" className="rounded-3xl border border-indigo-900/50 bg-gradient-to-b from-slate-900 via-[#101524] to-[#0a0d16] p-8 sm:p-12 space-y-8 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-bold">
                <span>📍 {profile.location}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Reach Out to me! 💬
              </h2>
              <p className="text-slate-300 text-base leading-relaxed max-w-xl">
                DISCUSS A PROJECT OR JUST WANT TO SAY HI? MY INBOX IS OPEN FOR ALL.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/25 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>SEND AN EMAIL</span>
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="px-5 py-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 transition-colors flex items-center gap-2 cursor-pointer text-sm font-semibold"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedEmail ? 'Email Copied!' : 'Copy Address'}</span>
                </button>
              </div>
            </div>

            {/* Direct Connect Quick Card */}
            <div className="lg:col-span-4 rounded-2xl border border-slate-800 bg-slate-950/90 p-6 space-y-4 text-xs">
              <span className="text-slate-400 block font-mono uppercase tracking-wider font-bold">
                CONNECT DIRECTLY
              </span>
              
              <div className="space-y-2.5">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Email</span>
                  <span className="font-mono text-indigo-300 font-semibold truncate max-w-[150px]">{profile.email}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Status</span>
                  <span className="font-mono text-emerald-400 font-semibold">Open to Work</span>
                </div>
              </div>
            </div>

          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-[#0a0d14] py-8 text-center text-xs text-slate-500 relative z-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>Made with ❤️ by {profile.name}</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Modern Software Developer Template</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
