import React, { useState, useEffect, useRef } from 'react';
import { PortfolioData, LayoutConfiguration } from '../../types';
import * as THREE from 'three';
import gsap from 'gsap';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  ExternalLink, 
  ChevronRight, 
  Sparkles, 
  Command, 
  Cpu, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Globe, 
  ArrowUpRight, 
  Check, 
  Copy, 
  Sun, 
  Moon, 
  Maximize2, 
  X,
  Laptop,
  Terminal,
  Smartphone
} from 'lucide-react';

interface AppleStylePortfolioTemplateProps {
  data: PortfolioData;
  config: LayoutConfiguration;
}

export const AppleStylePortfolioTemplate: React.FC<AppleStylePortfolioTemplateProps> = ({ data, config }) => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroTextRef = useRef<HTMLDivElement | null>(null);

  const profile = data.profile || {};
  const socialLinks = data.socialLinks || {};
  const about = data.about || {};
  const experienceList = data.experience || [];
  const skillsList = data.skills || [];
  const projectsList = data.projects || [];

  const isDark = themeMode === 'dark';

  // 1. THREE.JS 3D CANVAS INTERACTIVE BACKGROUND & HERO OBJECT
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create a glossy 3D metallic glass Icosahedron / Gem object
    const geometry = new THREE.IcosahedronGeometry(1.8, 1);
    const material = new THREE.MeshPhysicalMaterial({
      color: isDark ? 0x0071e3 : 0x0066cc,
      metalness: 0.8,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transmission: 0.3,
      thickness: 1.2,
      wireframe: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Add sleek wireframe outer shell
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x60a5fa : 0x2563eb,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const wireframeMesh = new THREE.Mesh(geometry, wireframeMat);
    wireframeMesh.scale.set(1.08, 1.08, 1.08);
    scene.add(wireframeMesh);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 1.5 : 2.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x0071e3, 4, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xa855f7, 3, 100);
    pointLight2.position.set(-5, -5, -2);
    scene.add(pointLight2);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      mesh.rotation.y += 0.006;
      mesh.rotation.x += 0.003;
      mesh.rotation.x = targetY * 0.5;
      mesh.rotation.y = targetX * 0.8;

      wireframeMesh.rotation.y -= 0.004;
      wireframeMesh.rotation.x -= 0.002;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Handle Window Resize
    const handleResize = () => {
      if (!canvas) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      material.dispose();
      wireframeMat.dispose();
      renderer.dispose();
    };
  }, [isDark]);

  // 2. GSAP ENTRANCE ANIMATION
  useEffect(() => {
    if (heroTextRef.current) {
      gsap.fromTo(
        heroTextRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out' }
      );
    }
  }, []);

  // 3. SCROLL SPY FOR NAVIGATION ACTIVE SECTION
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'experience', 'projects', 'tech', 'contact'];
      const scrollPos = window.scrollY + 250;

      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(s);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyEmail = (emailStr: string) => {
    navigator.clipboard.writeText(emailStr);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const navItems = [
    { id: 'hero', label: 'Overview' },
    { id: 'about', label: 'Philosophy' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'tech', label: 'Specs' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 selection:bg-blue-500/30 selection:text-blue-300 ${
      isDark ? 'bg-[#000000] text-[#f5f5f7]' : 'bg-[#f5f5f7] text-[#1d1d1f]'
    }`}>
      {/* APPLE FLOATING FROSTED DOCK NAVIGATION */}
      <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav className={`pointer-events-auto flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-full border shadow-2xl backdrop-blur-2xl transition-all duration-300 ${
          isDark 
            ? 'bg-[#161617]/80 border-white/10 text-neutral-300 shadow-black/80' 
            : 'bg-white/80 border-black/10 text-neutral-800 shadow-neutral-300/60'
        }`}>
          {/* Apple Logo Icon */}
          <a 
            href="#hero" 
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center mr-1"
            title="Apple Style Portfolio"
          >
            <Command className="w-4 h-4 text-blue-500" />
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? isDark 
                        ? 'bg-white text-black font-semibold shadow-sm' 
                        : 'bg-black text-white font-semibold shadow-sm'
                      : isDark
                        ? 'hover:text-white hover:bg-white/10 text-neutral-400'
                        : 'hover:text-black hover:bg-black/5 text-neutral-600'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          <div className="h-4 w-px bg-neutral-700/50 mx-1 hidden sm:block" />

          {/* Action & Theme Toggle */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setThemeMode(isDark ? 'light' : 'dark')}
              className={`p-1.5 rounded-full transition-colors ${
                isDark ? 'hover:bg-white/10 text-amber-400' : 'hover:bg-black/5 text-indigo-600'
              }`}
              title="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <a
              href="#contact"
              className="px-3.5 py-1.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-medium transition-all shadow-md flex items-center gap-1"
            >
              <span>Get in Touch</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-28 pb-16 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* LEFT TYPOGRAPHY & INTRO */}
          <div ref={heroTextRef} className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Designed with Precision &middot; Built for Scale</span>
            </div>

            <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] ${
              isDark ? 'text-white' : 'text-neutral-900'
            }`}>
              {profile.name || 'Julian Vance'}
            </h1>

            <p className="text-xl sm:text-2xl font-medium text-blue-500 tracking-tight">
              {profile.title || 'Principal Creative Technologist & Product Architect'}
            </p>

            <p className="text-base sm:text-lg text-neutral-400 max-w-xl leading-relaxed mx-auto lg:mx-0">
              {profile.bio || 'Pioneering seamless digital experiences where human intuition meets high-performance engineering. Crafted with Apple-inspired minimalism.'}
            </p>

            {/* CTA BUTTON GROUP */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href="#projects"
                className="px-6 py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-sm transition-all shadow-lg hover:shadow-blue-500/25 flex items-center gap-2"
              >
                <span>Explore Work</span>
                <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="#about"
                className={`px-6 py-3 rounded-full border text-sm font-medium transition-all ${
                  isDark 
                    ? 'border-white/20 hover:border-white/40 text-white bg-white/5 hover:bg-white/10' 
                    : 'border-black/20 hover:border-black/40 text-black bg-black/5 hover:bg-black/10'
                }`}
              >
                Read Philosophy
              </a>
              <button
                onClick={() => copyEmail(profile.email || 'julian.vance@apple-design.dev')}
                className={`p-3 rounded-full border transition-all ${
                  isDark 
                    ? 'border-white/10 hover:border-white/30 text-neutral-300 bg-white/5' 
                    : 'border-black/10 hover:border-black/30 text-neutral-700 bg-black/5'
                }`}
                title="Copy Email Address"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* QUICK STATS PILLS */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              <div>
                <div className={`text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>12+</div>
                <div className="text-xs text-neutral-500 font-medium mt-0.5">Years Experience</div>
              </div>
              <div>
                <div className={`text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>40+</div>
                <div className="text-xs text-neutral-500 font-medium mt-0.5">Products Shipped</div>
              </div>
              <div>
                <div className={`text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>14</div>
                <div className="text-xs text-neutral-500 font-medium mt-0.5">Design Patents</div>
              </div>
            </div>
          </div>

          {/* RIGHT THREE.JS 3D CANVAS */}
          <div className="lg:col-span-5 flex items-center justify-center relative min-h-[380px] lg:min-h-[480px]">
            <canvas 
              ref={canvasRef} 
              className="w-full h-full max-w-[420px] max-h-[420px] rounded-3xl cursor-grab active:cursor-grabbing"
            />
            <div className="absolute bottom-2 inset-x-0 text-center text-[11px] text-neutral-500 tracking-wider uppercase font-mono">
              [ Interactive 3D Geometry &middot; Drag mouse ]
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: PHILOSOPHY & APPLE BENTO SPECS */}
      <section id="about" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto space-y-16">
          
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-500">
              Design Philosophy
            </h2>
            <h3 className={`text-3xl sm:text-5xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              Simplicity is the ultimate sophistication.
            </h3>
            <p className="text-base text-neutral-400 leading-relaxed">
              {about.aboutText || 'Every interface detail, pixel boundary, and animation curve is meticulously considered to eliminate noise and deliver joyful human experiences.'}
            </p>
          </div>

          {/* APPLE SPECS BENTO GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-8 rounded-3xl border transition-all duration-300 ${
              isDark ? 'bg-[#161617]/70 border-white/10 hover:border-blue-500/50' : 'bg-white border-black/10 shadow-lg hover:shadow-xl'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Ultra Performance
              </h4>
              <p className="text-sm text-neutral-400 leading-relaxed">
                60 FPS silky smooth interactions, sub-50ms latency response times, and optimized WebGL GPU rendering pipelines.
              </p>
            </div>

            <div className={`p-8 rounded-3xl border transition-all duration-300 ${
              isDark ? 'bg-[#161617]/70 border-white/10 hover:border-purple-500/50' : 'bg-white border-black/10 shadow-lg hover:shadow-xl'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <h4 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Clean Architecture
              </h4>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Modular design system tokens, type-safe state hydration, and zero-redundancy engineering frameworks.
              </p>
            </div>

            <div className={`p-8 rounded-3xl border transition-all duration-300 ${
              isDark ? 'bg-[#161617]/70 border-white/10 hover:border-emerald-500/50' : 'bg-white border-black/10 shadow-lg hover:shadow-xl'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Human Precision
              </h4>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Accessible WCAG AAA compliance, intuitive gesture navigation, and optical typography scaling.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: EXPERIENCE TIMELINE */}
      <section id="experience" className="py-24 px-6 border-t border-white/10 relative">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-500">
              Career Trajectory
            </h2>
            <h3 className={`text-3xl sm:text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              Experience & Innovation
            </h3>
          </div>

          {/* TIMELINE CARDS */}
          <div className="space-y-6">
            {experienceList.map((exp, idx) => (
              <div
                key={exp.id || idx}
                className={`p-6 sm:p-8 rounded-3xl border transition-all ${
                  isDark ? 'bg-[#161617]/60 border-white/10 hover:border-white/20' : 'bg-white border-black/10 shadow-md'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h4 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                      {exp.role}
                    </h4>
                    <p className="text-sm font-semibold text-blue-500">
                      @ {exp.company}
                    </p>
                  </div>

                  <div className="text-xs font-mono text-neutral-400 px-3 py-1 rounded-full border border-white/10 bg-white/5 w-fit">
                    {exp.duration}
                  </div>
                </div>

                <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                  {exp.description}
                </p>

                {/* ACHIEVEMENTS / HIGHLIGHTS */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="space-y-2 mb-4 text-xs text-neutral-400">
                    {exp.achievements.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-500 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* TECH TAGS */}
                {exp.technologies && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                    {exp.technologies.map(t => (
                      <span key={t} className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 4: PROJECTS SHOWCASE */}
      <section id="projects" className="py-24 px-6 border-t border-white/10 relative">
        <div className="max-w-6xl mx-auto space-y-16">
          
          <div className="text-center space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-500">
              Selected Works
            </h2>
            <h3 className={`text-3xl sm:text-5xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              Featured Innovations
            </h3>
          </div>

          {/* LARGE CINEMATIC PROJECT CARDS */}
          <div className="grid grid-cols-1 gap-12">
            {projectsList.map((project, idx) => (
              <div
                key={project.id || idx}
                className={`group rounded-3xl border overflow-hidden transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                  isDark ? 'bg-[#161617]/80 border-white/10 hover:border-blue-500/40' : 'bg-white border-black/10 shadow-xl'
                }`}
              >
                {/* PROJECT IMAGE */}
                <div className="lg:col-span-7 overflow-hidden relative min-h-[300px] sm:min-h-[360px] bg-neutral-950">
                  <img
                    src={project.image || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000'}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/90 text-white text-xs font-medium backdrop-blur-md border border-white/20 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Expand View</span>
                  </button>
                </div>

                {/* PROJECT DETAILS */}
                <div className="lg:col-span-5 p-8 space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">
                      {project.status || 'SHIPPED PRODUCT'} &middot; {project.year || '2026'}
                    </span>
                    <h4 className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                      {project.name}
                    </h4>
                  </div>

                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map(t => (
                      <span key={t} className="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5 text-neutral-300">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-medium transition-all shadow-md flex items-center gap-2"
                      >
                        <span>Live Experience</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2.5 rounded-full border transition-colors ${
                          isDark ? 'border-white/20 hover:border-white/40 text-neutral-300' : 'border-black/20 hover:border-black/40 text-neutral-700'
                        }`}
                        title="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 5: TECH SPECS GRID */}
      <section id="tech" className="py-24 px-6 border-t border-white/10 relative">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-500">
              Technical Specifications
            </h2>
            <h3 className={`text-3xl sm:text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              Stack & Capabilities
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {skillsList.map((skill, i) => (
              <div
                key={skill.id || i}
                className={`p-5 rounded-2xl border text-center space-y-2 transition-all hover:scale-105 ${
                  isDark ? 'bg-[#161617]/70 border-white/10 hover:border-blue-500/40' : 'bg-white border-black/10 shadow-sm'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mx-auto mb-3">
                  <Cpu className="w-5 h-5" />
                </div>
                <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  {skill.name}
                </div>
                <div className="text-xs text-neutral-400 font-mono">
                  {skill.category || 'Core Tech'}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 6: CONTACT */}
      <section id="contact" className="py-24 px-6 border-t border-white/10 relative">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          
          <div className="space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-500">
              Get in Touch
            </h2>
            <h3 className={`text-4xl sm:text-6xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              Let's create something extraordinary.
            </h3>
            <p className="text-base text-neutral-400 max-w-lg mx-auto">
              Available for principal design architecture, technical consulting, and groundbreaking digital products.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${profile.email || 'julian.vance@apple-design.dev'}`}
              className="px-8 py-4 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-base font-semibold transition-all shadow-xl hover:shadow-blue-500/30 flex items-center gap-3"
            >
              <Mail className="w-5 h-5" />
              <span>Start Conversation</span>
            </a>

            <button
              onClick={() => copyEmail(profile.email || 'julian.vance@apple-design.dev')}
              className={`px-6 py-4 rounded-full border text-sm font-mono transition-all flex items-center gap-2 ${
                isDark ? 'border-white/20 hover:border-white/40 text-neutral-300 bg-white/5' : 'border-black/20 hover:border-black/40 text-neutral-700 bg-black/5'
              }`}
            >
              {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedEmail ? 'Email Copied!' : profile.email || 'julian.vance@apple-design.dev'}</span>
            </button>
          </div>

          <div className="pt-8 flex justify-center gap-6">
            {socialLinks.github && (
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full border border-white/10 hover:border-white/30 text-neutral-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
            )}
            {socialLinks.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full border border-white/10 hover:border-white/30 text-neutral-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {socialLinks.twitter && (
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full border border-white/10 hover:border-white/30 text-neutral-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            )}
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 border-t border-white/10 text-center text-xs text-neutral-500 font-sans space-y-2">
        <div>
          Designed by Apple Portfolio Aesthetics &middot; Copyright &copy; {new Date().getFullYear()} {profile.name || 'Julian Vance'}
        </div>
        <div className="text-[11px] text-neutral-600">
          Built with React, Three.js, GSAP & Tailwind CSS &middot; MIT License
        </div>
      </footer>

      {/* MODAL LIGHTBOX FOR PROJECT DETAILS */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className={`w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl border shadow-2xl space-y-6 ${
            isDark ? 'bg-[#161617] border-white/10 text-white' : 'bg-white border-black/10 text-black'
          }`}>
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">{selectedProject.status || 'SHIPPED'} &middot; {selectedProject.year || '2026'}</span>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold">
              {selectedProject.name}
            </h3>

            <div className="rounded-2xl overflow-hidden border border-white/10 max-h-80 bg-neutral-950">
              <img src={selectedProject.image} alt={selectedProject.name} className="w-full h-full object-cover" />
            </div>

            <p className="text-sm text-neutral-300 leading-relaxed">
              {selectedProject.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {selectedProject.technologies?.map((t: string) => (
                <span key={t} className="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5 text-blue-400">
                  {t}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
              {selectedProject.liveUrl && (
                <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-full bg-[#0071e3] text-white text-xs font-medium flex items-center gap-1.5">
                  <span>Visit Product</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 rounded-full border border-white/20 text-xs font-medium"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
