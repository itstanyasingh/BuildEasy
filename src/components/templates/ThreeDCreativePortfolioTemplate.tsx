import React, { useState, useEffect, useRef, useMemo } from 'react';
import { PortfolioData, LayoutConfiguration, ProjectItem, ExperienceItem, SkillItem } from '../../types';
import { 
  Github, Linkedin, Twitter, Mail, ExternalLink, ArrowRight, 
  Send, Code2, Globe, Menu, X, CheckCircle2, MapPin, Sparkles,
  Layers, ChevronRight, Terminal
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import * as THREE from 'three';

interface ThreeDCreativePortfolioTemplateProps {
  data: PortfolioData;
  config?: LayoutConfiguration;
}

// ----------------------------------------------------------------------
// 1. THREE.JS BACKGROUND STARS CANVAS (Particle Field in Dark Midnight Space)
// ----------------------------------------------------------------------
const BackgroundStarsCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create 1,500 random star particles in 3D sphere
    const count = 1500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 1.5 + 0.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Mix violet (#915eff) and white/blue stars
      const isViolet = Math.random() > 0.6;
      colors[i * 3] = isViolet ? 0.57 : 1.0;
      colors[i * 3 + 1] = isViolet ? 0.37 : 1.0;
      colors[i * 3 + 2] = isViolet ? 1.0 : 1.0;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.006,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });

    const starField = new THREE.Points(geometry, material);
    scene.add(starField);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      starField.rotation.y += 0.0004;
      starField.rotation.x += 0.0002;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden" />;
};

// ----------------------------------------------------------------------
// 2. HERO 3D CANVAS (Interactive Floating Mesh & Holographic Cyber Object)
// ----------------------------------------------------------------------
const Hero3DComputerCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x915eff, 3, 10);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    const blueLight = new THREE.PointLight(0x00cea8, 2, 10);
    blueLight.position.set(-3, -2, 2);
    scene.add(blueLight);

    // Main 3D Object Group (Complex Geometric Cyber Core)
    const mainGroup = new THREE.Group();

    // 1. Core Icosahedron Wireframe/Solid
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x151030,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // 2. Outer Holographic Wireframe Shell
    const outerGeo = new THREE.IcosahedronGeometry(1.4, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x915eff,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    mainGroup.add(outerMesh);

    // 3. Orbiting Rings
    const ringGeo = new THREE.TorusGeometry(1.8, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00cea8, transparent: true, opacity: 0.7 });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.rotation.y = Math.PI / 4;
    mainGroup.add(ring2);

    scene.add(mainGroup);

    // Mouse interactive tilt
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      targetX = (x / rect.width) * 0.8;
      targetY = (y / rect.height) * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth lerp mouse rotation
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      mainGroup.rotation.y = elapsedTime * 0.3 + mouseX;
      mainGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.2 + mouseY;

      ring1.rotation.z = elapsedTime * 0.4;
      ring2.rotation.z = -elapsedTime * 0.3;

      // Floating y motion
      mainGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      coreGeo.dispose();
      coreMat.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full min-h-[340px] md:min-h-[460px] cursor-grab active:cursor-grabbing" />;
};

// ----------------------------------------------------------------------
// 3. SKILL 3D BALL CANVAS (Interactive Rotating Tech Sphere)
// ----------------------------------------------------------------------
const Skill3DBallCanvas: React.FC<{ name: string; color?: string }> = ({ name, color = '#915eff' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 10);
    camera.position.z = 2.4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(2, 3, 2);
    scene.add(dirLight);

    // 3D Polyhedron Ball
    const geometry = new THREE.IcosahedronGeometry(0.85, 1);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
      metalness: 0.2,
      flatShading: true,
    });
    const ballMesh = new THREE.Mesh(geometry, material);
    scene.add(ballMesh);

    // Wireframe overlay in brand accent
    const wireGeo = new THREE.IcosahedronGeometry(0.87, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wireMesh);

    let isHovered = false;
    const handleMouseEnter = () => { isHovered = true; };
    const handleMouseLeave = () => { isHovered = false; };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      const speed = isHovered ? 1.5 : 0.4;
      ballMesh.rotation.y += 0.01 * speed;
      ballMesh.rotation.x += 0.005 * speed;
      wireMesh.rotation.y += 0.01 * speed;
      wireMesh.rotation.x += 0.005 * speed;

      ballMesh.position.y = Math.sin(elapsed * 2) * 0.04;
      wireMesh.position.y = Math.sin(elapsed * 2) * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      renderer.dispose();
    };
  }, [name, color]);

  return (
    <div className="flex flex-col items-center group cursor-pointer">
      <div ref={mountRef} className="w-24 h-24 sm:w-28 sm:h-28" />
      <span className="mt-1 text-xs font-mono font-medium text-[#dfd9ff] group-hover:text-[#915eff] transition-colors">
        {name}
      </span>
    </div>
  );
};

// ----------------------------------------------------------------------
// 4. CONTACT 3D EARTH GLOBE CANVAS (Rotating Interactive Earth Sphere)
// ----------------------------------------------------------------------
const Contact3DEarthCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 3.8);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0x915eff, 3);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);

    const blueLight = new THREE.DirectionalLight(0x00cea8, 2);
    blueLight.position.set(-5, -3, -2);
    scene.add(blueLight);

    const earthGroup = new THREE.Group();

    // Earth Sphere Core
    const earthGeo = new THREE.SphereGeometry(1.2, 32, 32);
    const earthMat = new THREE.MeshStandardMaterial({
      color: 0x151030,
      roughness: 0.4,
      metalness: 0.6,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthGroup.add(earthMesh);

    // Wireframe Grid Overlay (Continents / Latitude Grid)
    const gridGeo = new THREE.SphereGeometry(1.22, 24, 24);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x915eff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const gridMesh = new THREE.Mesh(gridGeo, gridMat);
    earthGroup.add(gridMesh);

    // Glowing Atmosphere Ring
    const atmosGeo = new THREE.TorusGeometry(1.4, 0.015, 16, 100);
    const atmosMat = new THREE.MeshBasicMaterial({ color: 0x00cea8, transparent: true, opacity: 0.7 });
    const atmosRing = new THREE.Mesh(atmosGeo, atmosMat);
    atmosRing.rotation.x = Math.PI / 2.5;
    earthGroup.add(atmosRing);

    scene.add(earthGroup);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      earthGroup.rotation.y = elapsed * 0.15;
      gridMesh.rotation.y = elapsed * 0.15;
      atmosRing.rotation.z = elapsed * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      earthGeo.dispose();
      earthMat.dispose();
      gridGeo.dispose();
      gridMat.dispose();
      atmosGeo.dispose();
      atmosMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full min-h-[300px] md:min-h-[480px]" />;
};

// ----------------------------------------------------------------------
// MAIN TEMPLATE COMPONENT: 3D CREATIVE (shaqdeff/Portfolio-Template)
// ----------------------------------------------------------------------
export const ThreeDCreativePortfolioTemplate: React.FC<ThreeDCreativePortfolioTemplateProps> = ({ data }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Safe data extraction
  const profile = useMemo(() => ({
    name: data.profile?.name || 'Shaquille Deon',
    title: data.profile?.title || '3D & Web Developer',
    bio: data.profile?.bio || 'I develop 3D visuals, user interfaces, web applications and interactive digital experiences.',
    location: data.profile?.location || 'New York, NY',
    about: data.about?.aboutText || data.profile?.bio || 'I am a passionate software engineer specializing in interactive 3D web experiences, modern frontend engineering, and robust digital platforms.',
    avatar: data.profile?.profilePhoto || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
  }), [data]);

  const projects = useMemo(() => (data.projects || []).map((p: ProjectItem) => ({
    title: p.name || '3D Project',
    description: p.description || 'Interactive 3D application with real-time WebGL graphics.',
    image: p.image || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    tags: p.technologies || ['React', 'Three.js', 'Tailwind'],
    githubUrl: p.githubUrl || '',
    liveUrl: p.liveUrl || '',
  })), [data.projects]);

  const experience = useMemo(() => (data.experience || []).map((e: ExperienceItem) => ({
    company: e.company || 'Tech Innovations',
    role: e.role || 'Senior 3D & Frontend Engineer',
    duration: e.duration || '2023 - Present',
    description: e.description || 'Developing web applications and interactive 3D platforms using React, Three.js, and TypeScript.',
    achievements: e.achievements || [],
  })), [data.experience]);

  const skills = useMemo(() => {
    const defaultSkills = [
      { name: 'HTML 5', color: '#E34F26' },
      { name: 'CSS 3', color: '#1572B6' },
      { name: 'JavaScript', color: '#F7DF1E' },
      { name: 'TypeScript', color: '#3178C6' },
      { name: 'React JS', color: '#61DAFB' },
      { name: 'Redux Toolkit', color: '#764ABC' },
      { name: 'Tailwind CSS', color: '#06B6D4' },
      { name: 'Node JS', color: '#339933' },
      { name: 'Three JS', color: '#000000' },
      { name: 'git', color: '#F05032' },
      { name: 'figma', color: '#F24E1E' },
      { name: 'docker', color: '#2496ED' },
    ];

    if (!data.skills || data.skills.length === 0) return defaultSkills;

    const customSkills = (data.skills || []).map((s: SkillItem) => ({
      name: s.name,
      color: '#915eff',
    })).filter(s => Boolean(s.name));

    return customSkills.length > 0 ? customSkills : defaultSkills;
  }, [data.skills]);

  const socialLinks = useMemo(() => ({
    github: data.socialLinks?.github || 'https://github.com',
    linkedin: data.socialLinks?.linkedin || 'https://linkedin.com',
    twitter: data.socialLinks?.twitter || '',
    email: data.profile?.email || data.contact?.email || 'contact@example.com',
  }), [data]);

  // Overview service cards matching shaqdeff reference
  const overviewCards = [
    { title: 'Web Developer', icon: Code2, gradient: 'from-[#915eff] to-[#00cea8]' },
    { title: 'React Native Developer', icon: Layers, gradient: 'from-[#00cea8] to-[#ff5252]' },
    { title: 'Backend Engineer', icon: Terminal, gradient: 'from-[#ff5252] to-[#fa709a]' },
    { title: '3D Content Creator', icon: Sparkles, gradient: 'from-[#fa709a] to-[#915eff]' },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormSubmitted(false), 5000);
    }, 1200);
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(`3d-creative-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="3d-creative-portfolio-root" className="min-h-screen bg-[#050816] text-white font-sans antialiased relative overflow-x-hidden selection:bg-[#915eff] selection:text-white">
      
      {/* 1. THREE.JS PARTICLE STARS BACKGROUND */}
      <BackgroundStarsCanvas />

      {/* 2. NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050816]/80 backdrop-blur-md border-b border-zinc-800/50 transition-all">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-4 flex items-center justify-between">
          <div 
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#915eff] to-[#00cea8] p-[2px] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#050816] rounded-full flex items-center justify-center font-bold text-sm text-[#915eff]">
                {profile.name.substring(0, 2).toUpperCase()}
              </div>
            </div>
            <p className="text-white font-bold text-[18px] flex items-center gap-1">
              {profile.name} <span className="sm:inline hidden text-zinc-400 font-normal">| {profile.title.split(' ')[0]} 3D Creative</span>
            </p>
          </div>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-8 text-[15px] font-medium text-[#aaa6c3]">
            {['About', 'Work', 'Skills', 'Experience', 'Contact'].map((section) => {
              const secId = section.toLowerCase();
              const isActive = activeSection === secId;
              return (
                <li key={section}>
                  <button
                    onClick={() => scrollToSection(secId)}
                    className={`hover:text-white transition-colors cursor-pointer relative py-1 ${
                      isActive ? 'text-white font-semibold' : ''
                    }`}
                  >
                    {section}
                    {isActive && (
                      <motion.div 
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#915eff] rounded-full" 
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-300 hover:text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#050816] border-b border-zinc-800 px-6 py-4 space-y-3"
            >
              {['About', 'Work', 'Skills', 'Experience', 'Contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section.toLowerCase())}
                  className="block w-full text-left py-2 text-sm font-medium text-[#aaa6c3] hover:text-white"
                >
                  {section}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* MAIN CONTENT CONTAINER */}
      <div className="relative z-10 pt-20">

        {/* ===================================================================
            3. HERO SECTION (shaqdeff visual composition)
            =================================================================== */}
        <section id="3d-creative-hero" className="relative w-full min-h-screen max-w-7xl mx-auto px-6 sm:px-12 pt-12 md:pt-20 flex flex-col justify-between">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left Hero Text Column with Shaquille Vertical Line Marker */}
            <div className="md:col-span-7 space-y-4 relative pl-8">
              {/* Vertical Violet Marker */}
              <div className="absolute left-0 top-1.5 flex flex-col items-center">
                <div className="w-5 h-5 rounded-full bg-[#915eff]" />
                <div className="w-1 h-40 sm:h-72 bg-gradient-to-b from-[#915eff] to-transparent rounded-full" />
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
                  Hi, I'm <span className="text-[#915eff]">{profile.name.split(' ')[0]}</span> 👋
                </h1>
                <p className="text-[#dfd9ff] font-medium text-lg sm:text-2xl max-w-xl leading-relaxed">
                  {profile.title}. {profile.bio}
                </p>
              </div>

              {/* Social CTA Bar */}
              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={() => scrollToSection('work')}
                  className="px-6 py-3 rounded-xl bg-[#915eff] hover:bg-[#804eee] text-white font-semibold text-sm transition-all shadow-lg hover:shadow-[#915eff]/30 cursor-pointer flex items-center gap-2"
                >
                  <span>Explore Work</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-6 py-3 rounded-xl bg-[#151030] hover:bg-[#1a143b] border border-zinc-700 text-white font-semibold text-sm transition-all cursor-pointer"
                >
                  Contact Me
                </button>
              </div>
            </div>

            {/* Right Interactive 3D Canvas Column */}
            <div className="md:col-span-5 h-[360px] md:h-[500px] relative">
              <Hero3DComputerCanvas />
            </div>
          </div>

          {/* Scroll Down Bouncing Mouse Indicator */}
          <div className="w-full flex justify-center pb-8 pt-4">
            <button
              onClick={() => scrollToSection('about')}
              className="w-[32px] h-[58px] rounded-3xl border-2 border-zinc-400/60 flex justify-center items-start p-2 cursor-pointer hover:border-[#915eff] transition-colors"
              title="Scroll Down"
            >
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
                className="w-2 h-2 rounded-full bg-[#915eff]"
              />
            </button>
          </div>
        </section>

        {/* ===================================================================
            4. ABOUT / OVERVIEW SECTION
            =================================================================== */}
        <section id="3d-creative-about" className="max-w-7xl mx-auto px-6 sm:px-12 py-20 space-y-12">
          <div className="space-y-2">
            <p className="text-[14px] text-[#aaa6c3] uppercase tracking-widest font-mono">
              INTRODUCTION
            </p>
            <h2 className="text-3xl sm:text-5xl font-black text-white">
              Overview.
            </h2>
          </div>

          <p className="text-[#aaa6c3] text-[16px] max-w-3xl leading-relaxed">
            {profile.about}
          </p>

          {/* 4 Overview Service Cards with Gradient Borders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            {overviewCards.map((card, idx) => {
              const IconComp = card.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className={`p-[1px] rounded-[20px] bg-gradient-to-b ${card.gradient} shadow-lg`}
                >
                  <div className="bg-[#151030] rounded-[19px] py-8 px-6 min-h-[240px] flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-[#050816] flex items-center justify-center text-[#915eff]">
                      <IconComp className="w-7 h-7" />
                    </div>
                    <h3 className="text-white font-bold text-[18px]">
                      {card.title}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ===================================================================
            5. WORK EXPERIENCE TIMELINE SECTION
            =================================================================== */}
        {experience.length > 0 && (
          <section id="3d-creative-experience" className="max-w-7xl mx-auto px-6 sm:px-12 py-20 space-y-12">
            <div className="space-y-2">
              <p className="text-[14px] text-[#aaa6c3] uppercase tracking-widest font-mono">
                WHAT I HAVE DONE SO FAR
              </p>
              <h2 className="text-3xl sm:text-5xl font-black text-white">
                Work Experience.
              </h2>
            </div>

            {/* Vertical Timeline */}
            <div className="relative border-l-2 border-[#383E56] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
              {experience.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative space-y-3"
                >
                  {/* Circular Node */}
                  <div className="absolute -left-[43px] sm:-left-[59px] top-1.5 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#383E56] border-2 border-[#915eff] flex items-center justify-center font-bold text-white text-xs sm:text-sm shadow-md">
                    {exp.company.substring(0, 2).toUpperCase()}
                  </div>

                  {/* Card Container */}
                  <div className="bg-[#151030] p-6 rounded-2xl border border-zinc-800 space-y-3 shadow-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <h3 className="text-white font-bold text-xl">{exp.role}</h3>
                        <p className="text-[#aaa6c3] text-sm font-semibold">{exp.company}</p>
                      </div>
                      <span className="text-xs font-mono font-medium text-zinc-400 px-3 py-1 rounded-full bg-[#050816] border border-zinc-800 w-fit">
                        {exp.duration}
                      </span>
                    </div>

                    <p className="text-zinc-300 text-sm leading-relaxed">
                      {exp.description}
                    </p>

                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="list-disc list-inside space-y-1 text-xs text-zinc-400 pt-1">
                        {exp.achievements.map((ach, aIdx) => (
                          <li key={aIdx}>{ach}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* ===================================================================
            6. TECHNOLOGIES / SKILLS SECTION (3D Spheres)
            =================================================================== */}
        <section id="3d-creative-skills" className="max-w-7xl mx-auto px-6 sm:px-12 py-20 space-y-12">
          <div className="space-y-2">
            <p className="text-[14px] text-[#aaa6c3] uppercase tracking-widest font-mono">
              MY SKILLS & TECHNOLOGIES
            </p>
            <h2 className="text-3xl sm:text-5xl font-black text-white">
              Technologies.
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-4">
            {skills.map((skill, idx) => (
              <Skill3DBallCanvas key={idx} name={skill.name} color={skill.color} />
            ))}
          </div>
        </section>

        {/* ===================================================================
            7. PROJECTS SECTION (Color Project Showcase)
            =================================================================== */}
        {projects.length > 0 && (
          <section id="3d-creative-work" className="max-w-7xl mx-auto px-6 sm:px-12 py-20 space-y-12">
            <div className="space-y-2">
              <p className="text-[14px] text-[#aaa6c3] uppercase tracking-widest font-mono">
                MY WORK
              </p>
              <h2 className="text-3xl sm:text-5xl font-black text-white">
                Projects.
              </h2>
              <p className="text-[#aaa6c3] text-[16px] max-w-3xl leading-relaxed pt-2">
                Following projects showcases my skills and experience through real-world examples of my work. Each project is briefly described with links to code repositories and live demos.
              </p>
            </div>

            {/* Project Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
              {projects.map((proj, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#151030] p-5 rounded-2xl border border-zinc-800/80 hover:border-[#915eff]/60 transition-all shadow-xl group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Project Image - FULL COLOR PRESERVED */}
                    <div className="relative w-full h-[220px] rounded-2xl overflow-hidden bg-[#050816]">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Top Right Circle Links */}
                      <div className="absolute top-3 right-3 flex items-center gap-2">
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-black/80 hover:bg-[#915eff] text-white flex items-center justify-center transition-colors cursor-pointer shadow-md"
                            title="Source Code"
                          >
                            <Github className="w-5 h-5" />
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-black/80 hover:bg-[#00cea8] text-white flex items-center justify-center transition-colors cursor-pointer shadow-md"
                            title="Live Demo"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-white font-bold text-xl group-hover:text-[#915eff] transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-[#aaa6c3] text-sm leading-relaxed line-clamp-3">
                        {proj.description}
                      </p>
                    </div>
                  </div>

                  {/* Colored Tag Badges */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-800/60 mt-4">
                    {proj.tags.map((tag, tIdx) => {
                      const colors = ['text-blue-400', 'text-emerald-400', 'text-pink-400', 'text-purple-400'];
                      const colClass = colors[tIdx % colors.length];
                      return (
                        <span key={tIdx} className={`text-xs font-mono font-medium ${colClass}`}>
                          #{tag}
                        </span>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* ===================================================================
            8. CONTACT SECTION (Split Form & 3D Globe Earth Canvas)
            =================================================================== */}
        <section id="3d-creative-contact" className="max-w-7xl mx-auto px-6 sm:px-12 py-20 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Contact Form */}
            <div className="lg:col-span-7 bg-[#100d25] p-8 sm:p-10 rounded-2xl border border-zinc-800 space-y-6 shadow-2xl">
              <div className="space-y-2">
                <p className="text-[14px] text-[#aaa6c3] uppercase tracking-widest font-mono">
                  GET IN TOUCH
                </p>
                <h2 className="text-3xl sm:text-5xl font-black text-white">
                  Contact.
                </h2>
              </div>

              {formSubmitted ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-medium flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                  <span>Thank you! Your message has been sent successfully.</span>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-white font-medium text-sm block">Your Name</label>
                    <input
                      type="text"
                      placeholder="What's your name?"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#151030] border border-zinc-700/80 text-white text-sm focus:outline-none focus:border-[#915eff] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-white font-medium text-sm block">Your Email</label>
                    <input
                      type="email"
                      placeholder="What's your email?"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#151030] border border-zinc-700/80 text-white text-sm focus:outline-none focus:border-[#915eff] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-white font-medium text-sm block">Your Message</label>
                    <textarea
                      rows={5}
                      placeholder="What do you want to say?"
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#151030] border border-zinc-700/80 text-white text-sm focus:outline-none focus:border-[#915eff] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 rounded-xl bg-[#915eff] hover:bg-[#804eee] text-white font-bold text-sm shadow-lg hover:shadow-[#915eff]/30 transition-all cursor-pointer flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right 3D Earth Globe Canvas */}
            <div className="lg:col-span-5 h-[340px] lg:h-[500px] relative">
              <Contact3DEarthCanvas />
            </div>

          </div>
        </section>

        {/* ===================================================================
            9. FOOTER
            =================================================================== */}
        <footer className="border-t border-zinc-800/80 py-8 px-6 text-center text-xs font-mono text-[#aaa6c3]">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
            
            <div className="flex items-center gap-4">
              {socialLinks.github && (
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  GitHub
                </a>
              )}
              {socialLinks.linkedin && (
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  LinkedIn
                </a>
              )}
              {socialLinks.twitter && (
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Twitter
                </a>
              )}
              {socialLinks.email && (
                <a href={`mailto:${socialLinks.email}`} className="hover:text-white transition-colors">
                  Email
                </a>
              )}
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};
