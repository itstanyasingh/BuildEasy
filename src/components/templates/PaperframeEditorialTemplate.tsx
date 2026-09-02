import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioData, LayoutConfiguration } from '../../types';
import { 
  ArrowUpRight, 
  ArrowLeft, 
  BookOpen, 
  Compass, 
  Workflow, 
  User, 
  Mail, 
  ExternalLink,
  Feather,
  Menu,
  X
} from 'lucide-react';

interface PaperframeEditorialTemplateProps {
  data: PortfolioData;
  config?: LayoutConfiguration;
}

interface EditorialProject {
  id: string;
  title: string;
  year: string;
  category: string;
  role: string;
  description: string;
  challenge: string;
  approach: string;
  outcome: string;
  technologies: string[];
  image: string;
}

interface EditorialArticle {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
  readTime: string;
}

const PROJECTS_DATA: EditorialProject[] = [
  {
    id: 'pf-1',
    title: 'Field Notes',
    year: '2026',
    category: 'Digital Product',
    role: 'Lead Interaction Designer',
    description: 'A minimalist archiving platform built for local botanists to catalogue flora migrations across Northern Europe.',
    challenge: 'Local field cataloguing often happens offline, under unstable atmospheric conditions, requiring an interface with extremely low visual strain and flawless persistent offline-first state syncing.',
    approach: 'We developed an ultra-lightweight client database combined with high-contrast, mathematically constrained typesetting. Grids reflect traditional field notebook structures.',
    outcome: 'Successful deployment to 15 Scandinavian regional parks. Reduced field-logging error rates by over 34% while maintaining minimal battery drain on handheld devices.',
    technologies: ['React', 'IndexedDB', 'Tailwind CSS', 'TypeScript'],
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'pf-2',
    title: 'Northline',
    year: '2025',
    category: 'Brand Architecture',
    role: 'Frontend Developer & Co-Designer',
    description: 'A custom, geometry-driven digital identity and design system built for a modular architectural collective.',
    challenge: 'The collective required an online presentation that treated digital pixels with the same tactile weight, precision, and structural grid rules as physical steel and concrete structural frames.',
    approach: 'We established a custom 12-column sub-pixel raster grid. Navigational layouts map directly to structural floorplan proportions, paired with absolute positioning rules and thin line separators.',
    outcome: 'A highly lauded publication-like identity featured on multiple design indices, leading to a 200% increase in prospective premium client interactions for the collective.',
    technologies: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'CSS Variables'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'pf-3',
    title: 'Common Ground',
    year: '2025',
    category: 'Interactive Installation',
    role: 'Creative Technologist',
    description: 'An interactive audio-visual mapping of urban community gardens using real-time atmospheric telemetry sensors.',
    challenge: 'Translating noisy, chaotic environmental sensors (humidity, temperature, light, wind) into logical, tranquil generative digital visuals that do not overwhelm urban participants.',
    approach: 'Connected WebSockets to low-power edge sensory nodes. Implemented clean bezier vector paths that deform dynamically based on wind speed, paired with soft monochromatic color fades.',
    outcome: 'Exhibited for three months in Munich, welcoming over 12,000 active participants. Highlighted the physical impact of subtle daily changes in communal gardens.',
    technologies: ['React', 'D3.js', 'WebSockets', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'pf-4',
    title: 'Signal Archive',
    year: '2024',
    category: 'Archival Software',
    role: 'Solo Designer & Developer',
    description: 'A quiet database interface built to preserve and index forgotten radio broadcasts and sub-cultural auditory histories.',
    challenge: 'Most digital radio directories force frantic layouts, audio visualizer noise, and advertisement grids upon users. Signal Archive required an experience that felt like entering a quiet university basement archive.',
    approach: 'Used a restricted monochrome palette, paired with spacious sans typography and raw audio tables. Avoided auto-playback and visual noise in favor of deep structural search matrices.',
    outcome: 'Archived and indexed over 2,400 hours of independent sub-cultural broadcasts. Highly endorsed by ethnomusicologists and independent radio historians worldwide.',
    technologies: ['Node.js', 'React', 'Tailwind CSS', 'SQLite'],
    image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=1200'
  }
];

const ARTICLES_DATA: EditorialArticle[] = [
  {
    id: 'art-1',
    title: 'Designing for attention',
    date: 'August 14, 2026',
    category: 'Design Philosophy',
    readTime: '6 min read',
    excerpt: 'How quiet digital spaces allow users to engage deeply without being forced into aggressive scrolling cycles and click triggers.',
    content: `We live in an era of intense digital sensory saturation. Every interface, notification, and modal competes aggressively for individual cognitive resources. As designers, we have historically operated as agents of engagement, optimizing layouts to capture and retain attention. But what if we shifted our goal toward facilitating attention instead of extracting it?

Designing for attention means embracing quiet digital spaces. It requires us to trust that if we provide clean typography, logical visual hierarchy, and generous negative space, the user will find genuine value in the content. It means resisting the urge to slide in popups, flash promotional indicators, or force infinite loops. 

By scaling back interactive noise, we respect the user's intelligence and time. We create software that behaves like a well-printed textbook—reliable, beautifully bound, and waiting for the user to turn the page at their own natural pace.`
  },
  {
    id: 'art-2',
    title: 'Why simple interfaces take longer',
    date: 'June 22, 2026',
    category: 'Development',
    readTime: '8 min read',
    excerpt: 'Refined systems require removing layers of unnecessary code and interactions. A retrospective on the labor of editing.',
    content: `The easiest interface to build is a complex one. When an edge case arises, we simply add a new button. When a user is confused, we append a tooltip. When a database contains a variety of data types, we output a maze of filter menus and tags. Over time, the interface grows to resemble a cockpit—overwhelming, dense, and fragile.

The labor of simplicity is primarily an exercise in subtraction. It is the process of studying the system's core utility and slowly, deliberately, pruning everything that does not support that goal. This process takes time because it forces us to solve structural problems at their roots, rather than patching them with secondary interface elements.

To build a simple interface, we must negotiate with our dependencies, refine our underlying data structures, and establish absolute clarity regarding what the user actually wants to accomplish. Subtracting code is always more demanding than writing it, but the resulting durability is always worth the effort.`
  },
  {
    id: 'art-3',
    title: 'Building a calmer digital workspace',
    date: 'April 09, 2026',
    category: 'Productivity',
    readTime: '5 min read',
    excerpt: 'A practical framework for organizing layouts, separating tools, and eliminating visual clutter from production systems.',
    content: `Visual noise in workspace software creates subtle, ongoing cognitive friction. When a developer or designer opens their primary workspace, they should feel a sense of clarity and focus, not a frantic overload of unread notifications, colorful badges, and multi-colored menus.

We can establish calmer workspaces by implementing three clean principles:
1. Contextual Disclosure: Hide complex tools and configurations until the user explicitly requests them. Keep the primary interface clean.
2. Restricted Palettes: Avoid using a rainbow of colors for tasks, priorities, or tags. Rely on monochrome grays, paired with one single accent tone.
3. Quiet Rhythms: Group relevant data tightly with thin structural separators, ensuring the distance between distinct workspaces remains spacious and balanced.

When our tools feel calm, our thinking becomes orderly.`
  },
  {
    id: 'art-4',
    title: 'Notes from shipping small products',
    date: 'January 18, 2026',
    category: 'Product',
    readTime: '7 min read',
    excerpt: 'Observations on maintaining a disciplined, independent workflow, executing small projects, and avoiding software bloat.',
    content: `Shipping small, independent digital products teaches us the importance of scope discipline. When you operate as an independent designer and developer, you cannot afford to build features speculatively. Every line of code, database query, and CSS utility must carry its weight.

The danger of software development is the illusion that more features equal a better product. We call this product bloat. In reality, a small product that executes one single task with absolute perfection, visual elegance, and reliability is vastly superior to a multi-featured suite that performs poorly across all modules.

Keep your database schemas simple, restrict your technology stack, and ensure that every transition, typography block, and button has a clear reason for existing.`
  }
];

export const PaperframeEditorialTemplate: React.FC<PaperframeEditorialTemplateProps> = ({ data, config }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'work' | 'writing' | 'about'>('home');
  const [selectedProject, setSelectedProject] = useState<EditorialProject | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<EditorialArticle | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIsMobileMenuOpen(false);
  }, [activeTab, selectedProject, selectedArticle]);

  const handleProjectSelect = (project: EditorialProject) => {
    setSelectedProject(project);
    setSelectedArticle(null);
  };

  const handleArticleSelect = (article: EditorialArticle) => {
    setSelectedArticle(article);
    setSelectedProject(null);
  };

  const handleBackToHome = () => {
    setSelectedProject(null);
    setSelectedArticle(null);
  };

  return (
    <div className="w-full min-h-screen bg-[#faf9f6] text-[#1c1c1a] font-sans antialiased selection:bg-[#1c1c1a] selection:text-[#faf9f6] relative flex flex-col justify-between pb-12">
      
      {/* ========================================== */}
      {/* MINIMAL EDITORIAL HEADER                   */}
      {/* ========================================== */}
      <header className="w-full border-b border-[#e1dfda] py-6 px-6 md:px-12 bg-[#faf9f6]/90 backdrop-blur-sm sticky top-0 z-[100] transition-colors duration-300">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Logo / Brand */}
          <div 
            onClick={() => {
              setActiveTab('home');
              handleBackToHome();
            }}
            className="group cursor-pointer flex flex-col"
          >
            <span className="text-sm font-serif tracking-[0.1em] font-bold uppercase">AMELIA ROWAN</span>
            <span className="text-[10px] tracking-[0.15em] text-[#7c7a74] uppercase font-light">INDEPENDENT DESIGN & DEV</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.2em] uppercase font-semibold">
            <button 
              onClick={() => { setActiveTab('home'); handleBackToHome(); }}
              className={`hover:text-[#7c7a74] transition-colors ${activeTab === 'home' && !selectedProject && !selectedArticle ? 'text-[#1c1c1a] border-b border-[#1c1c1a] pb-1' : 'text-[#7c7a74]'}`}
            >
              HOME
            </button>
            <button 
              onClick={() => { setActiveTab('work'); setSelectedProject(null); setSelectedArticle(null); }}
              className={`hover:text-[#7c7a74] transition-colors ${activeTab === 'work' || selectedProject ? 'text-[#1c1c1a] border-b border-[#1c1c1a] pb-1' : 'text-[#7c7a74]'}`}
            >
              WORK
            </button>
            <button 
              onClick={() => { setActiveTab('writing'); setSelectedArticle(null); setSelectedProject(null); }}
              className={`hover:text-[#7c7a74] transition-colors ${activeTab === 'writing' || selectedArticle ? 'text-[#1c1c1a] border-b border-[#1c1c1a] pb-1' : 'text-[#7c7a74]'}`}
            >
              WRITING
            </button>
            <button 
              onClick={() => { setActiveTab('about'); handleBackToHome(); }}
              className={`hover:text-[#7c7a74] transition-colors ${activeTab === 'about' ? 'text-[#1c1c1a] border-b border-[#1c1c1a] pb-1' : 'text-[#7c7a74]'}`}
            >
              ABOUT
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 hover:text-[#7c7a74] transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden fixed top-[69px] left-0 right-0 bg-[#faf9f6] border-b border-[#e1dfda] z-50 px-6 py-6 flex flex-col gap-5 text-sm tracking-widest font-semibold text-center uppercase"
          >
            <button 
              onClick={() => { setActiveTab('home'); handleBackToHome(); }}
              className={`py-2 ${activeTab === 'home' && !selectedProject && !selectedArticle ? 'text-[#1c1c1a]' : 'text-[#7c7a74]'}`}
            >
              HOME
            </button>
            <button 
              onClick={() => { setActiveTab('work'); setSelectedProject(null); setSelectedArticle(null); }}
              className={`py-2 ${activeTab === 'work' || selectedProject ? 'text-[#1c1c1a]' : 'text-[#7c7a74]'}`}
            >
              WORK
            </button>
            <button 
              onClick={() => { setActiveTab('writing'); setSelectedArticle(null); setSelectedProject(null); }}
              className={`py-2 ${activeTab === 'writing' || selectedArticle ? 'text-[#1c1c1a]' : 'text-[#7c7a74]'}`}
            >
              WRITING
            </button>
            <button 
              onClick={() => { setActiveTab('about'); handleBackToHome(); }}
              className={`py-2 ${activeTab === 'about' ? 'text-[#1c1c1a]' : 'text-[#7c7a74]'}`}
            >
              ABOUT
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================== */}
      {/* MAIN LAYOUT CANVAS                         */}
      {/* ========================================== */}
      <main className="flex-grow w-full max-w-6xl mx-auto px-6 md:px-12 pt-12">
        <AnimatePresence mode="wait">
          
          {/* ========================================== */}
          {/* PROJECT DETAIL CASE STUDY                  */}
          {/* ========================================== */}
          {selectedProject && (
            <motion.div
              key="project-detail"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-12"
            >
              {/* Back to Work Nav */}
              <button 
                onClick={handleBackToHome}
                className="flex items-center gap-2 text-xs tracking-widest uppercase font-semibold text-[#7c7a74] hover:text-[#1c1c1a] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>BACK TO PROJECTS</span>
              </button>

              {/* Title & Headline */}
              <div className="space-y-4 border-b border-[#e1dfda] pb-8">
                <span className="text-[10px] tracking-[0.2em] font-mono text-[#7c7a74] uppercase block">{selectedProject.category}</span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight leading-none uppercase">
                  {selectedProject.title}
                </h1>
                <p className="text-lg leading-relaxed font-light text-[#4a4a46] max-w-2xl font-serif italic">
                  {selectedProject.description}
                </p>
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-b border-[#e1dfda] text-xs font-mono uppercase">
                <div>
                  <span className="text-[#7c7a74] block">ROLE</span>
                  <span className="font-bold text-[#1c1c1a]">{selectedProject.role}</span>
                </div>
                <div>
                  <span className="text-[#7c7a74] block">YEAR</span>
                  <span className="font-bold text-[#1c1c1a]">{selectedProject.year}</span>
                </div>
                <div>
                  <span className="text-[#7c7a74] block">TYPE</span>
                  <span className="font-bold text-[#1c1c1a]">{selectedProject.category}</span>
                </div>
                <div>
                  <span className="text-[#7c7a74] block">CORE TECHNOLOGIES</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedProject.technologies.map(t => (
                      <span key={t} className="bg-[#e1dfda] text-[#1c1c1a] px-2 py-0.5 rounded-sm text-[10px]">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Editorial Large Hero Image */}
              <div className="w-full h-[300px] sm:h-[450px] border border-[#e1dfda] overflow-hidden">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* In-depth Narrative */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
                <div className="lg:col-span-4 space-y-4">
                  <h3 className="text-sm tracking-[0.2em] uppercase font-bold text-[#1c1c1a]">CASE STUDY SPECS</h3>
                  <div className="h-px bg-[#e1dfda] w-12" />
                </div>
                <div className="lg:col-span-8 space-y-8 text-sm md:text-base leading-relaxed text-[#4a4a46] font-light font-serif">
                  <div className="space-y-2">
                    <h4 className="text-xs tracking-widest uppercase font-mono text-[#1c1c1a] font-black">THE CHALLENGE</h4>
                    <p>{selectedProject.challenge}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs tracking-widest uppercase font-mono text-[#1c1c1a] font-black">OUR APPROACH</h4>
                    <p>{selectedProject.approach}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs tracking-widest uppercase font-mono text-[#1c1c1a] font-black">THE OUTCOME</h4>
                    <p>{selectedProject.outcome}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================== */}
          {/* ARTICLE CONTENT READER                     */}
          {/* ========================================== */}
          {selectedArticle && (
            <motion.div
              key="article-detail"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-12 max-w-3xl mx-auto"
            >
              {/* Back button */}
              <button 
                onClick={handleBackToHome}
                className="flex items-center gap-2 text-xs tracking-widest uppercase font-semibold text-[#7c7a74] hover:text-[#1c1c1a] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>BACK TO PUBLICATIONS</span>
              </button>

              {/* Article Typography Layout */}
              <article className="space-y-8">
                <div className="space-y-3 border-b border-[#e1dfda] pb-6">
                  <div className="flex items-center gap-4 text-xs font-mono text-[#7c7a74] uppercase">
                    <span>{selectedArticle.category}</span>
                    <span>•</span>
                    <span>{selectedArticle.date}</span>
                    <span>•</span>
                    <span>{selectedArticle.readTime}</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight uppercase text-[#1c1c1a]">
                    {selectedArticle.title}
                  </h1>
                </div>

                {/* Body Content with Refined Line Height and Letter spacing */}
                <div className="text-base sm:text-lg leading-relaxed text-[#2a2a28] font-serif font-light whitespace-pre-line space-y-6">
                  {selectedArticle.content}
                </div>
              </article>
            </motion.div>
          )}

          {/* ========================================== */}
          {/* HOMEPAGE VIEW                              */}
          {/* ========================================== */}
          {activeTab === 'home' && !selectedProject && !selectedArticle && (
            <motion.div
              key="home-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-20"
            >
              {/* Quiet Editorial Hero */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-[#e1dfda] pb-16">
                <div className="lg:col-span-8 space-y-6">
                  <span className="text-[10px] tracking-[0.4em] font-bold text-[#7c7a74] uppercase block">INDEPENDENT PUBLICATION / EDITORIAL SPACE</span>
                  <h1 className="text-4xl sm:text-6xl font-serif font-black tracking-tight leading-none uppercase">
                    AMELIA ROWAN
                  </h1>
                  <p className="text-lg sm:text-xl leading-relaxed text-[#4a4a46] font-serif font-light max-w-2xl italic">
                    Crafting lightweight products, quiet digital interfaces, and spatial design architectures. Operating at the boundary of mathematical precision and analog layout traditions.
                  </p>
                </div>
                <div className="lg:col-span-4 lg:text-right text-[#7c7a74] font-mono text-xs uppercase space-y-2">
                  <div>[ BASED IN LONDON, UK ]</div>
                  <div>[ COMMISSION ACTIVE: 2026 ]</div>
                  <div>[ FOCUS: REDUCTIVE INTERFACES ]</div>
                </div>
              </section>

              {/* Fictional Editorial Case Studies */}
              <section className="space-y-12">
                <div className="flex items-center justify-between border-b border-[#e1dfda] pb-4">
                  <h2 className="text-xs tracking-[0.3em] uppercase font-black">01 — FEATURED CASE STUDIES</h2>
                  <span className="text-xs font-mono text-[#7c7a74]">[S/S SERIES]</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                  {PROJECTS_DATA.map((project, idx) => {
                    return (
                      <div 
                        key={project.id}
                        onClick={() => handleProjectSelect(project)}
                        className="group cursor-pointer space-y-4"
                      >
                        {/* Elegant Flat Thumbnail */}
                        <div className="w-full h-[250px] border border-[#e1dfda] overflow-hidden relative">
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1200ms] ease-out group-hover:scale-105"
                          />
                        </div>
                        <div className="flex items-center justify-between text-xs font-mono text-[#7c7a74]">
                          <span>0{idx + 1} // {project.category}</span>
                          <span>{project.year}</span>
                        </div>
                        <h3 className="text-2xl font-serif font-black uppercase tracking-tight group-hover:underline flex items-center justify-between">
                          <span>{project.title}</span>
                          <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h3>
                        <p className="text-sm font-sans font-light text-[#4a4a46] leading-relaxed line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Writing Column (Actual Journal/Articles) */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-[#e1dfda] pt-16">
                <div className="lg:col-span-4 space-y-4">
                  <span className="text-[10px] tracking-[0.3em] font-black text-[#7c7a74] block uppercase">02 — JOURNAL / WRITING</span>
                  <h2 className="text-2xl font-serif font-black uppercase">THE CALMER INTERFACE</h2>
                  <p className="text-sm text-[#4a4a46] font-sans font-light leading-relaxed">
                    Personal retrospective pieces documenting structural subtitle shifts, subtracted code, interface psychology, and design philosophy.
                  </p>
                </div>

                <div className="lg:col-span-8 space-y-8 divide-y divide-[#e1dfda]/50">
                  {ARTICLES_DATA.map(article => (
                    <div 
                      key={article.id}
                      onClick={() => handleArticleSelect(article)}
                      className="group cursor-pointer pt-6 first:pt-0 space-y-3"
                    >
                      <div className="flex items-center gap-4 text-xs font-mono text-[#7c7a74] uppercase">
                        <span>{article.category}</span>
                        <span>•</span>
                        <span>{article.date}</span>
                      </div>
                      <h3 className="text-xl font-serif font-black uppercase group-hover:underline flex items-center justify-between text-[#1c1c1a]">
                        <span>{article.title}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#7c7a74]" />
                      </h3>
                      <p className="text-sm text-[#4a4a46] leading-relaxed font-light font-sans">
                        {article.excerpt}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Editorial Fictional Services */}
              <section className="border-t border-[#e1dfda] pt-16 space-y-8">
                <h2 className="text-xs tracking-[0.3em] uppercase font-black">03 — STRUCTURED SERVICES</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="border border-[#e1dfda] p-6 space-y-3">
                    <span className="text-xs font-mono text-[#7c7a74] block">01 /</span>
                    <h3 className="text-lg font-serif font-black uppercase">PRODUCT DESIGN</h3>
                    <p className="text-xs text-[#4a4a46] leading-relaxed font-light">
                      Constructing lightweight systems, complex desktop grids, and dynamic, cohesive components tailored to content.
                    </p>
                  </div>
                  <div className="border border-[#e1dfda] p-6 space-y-3">
                    <span className="text-xs font-mono text-[#7c7a74] block">02 /</span>
                    <h3 className="text-lg font-serif font-black uppercase">CREATIVE DEV</h3>
                    <p className="text-xs text-[#4a4a46] leading-relaxed font-light">
                      Developing resilient type-safe architectures, fluid page transitions, and structured database systems.
                    </p>
                  </div>
                  <div className="border border-[#e1dfda] p-6 space-y-3">
                    <span className="text-xs font-mono text-[#7c7a74] block">03 /</span>
                    <h3 className="text-lg font-serif font-black uppercase">INTERACTION</h3>
                    <p className="text-xs text-[#4a4a46] leading-relaxed font-light">
                      Refining interactive mechanics, user experience metrics, and optimizing animation scales for zero friction.
                    </p>
                  </div>
                  <div className="border border-[#e1dfda] p-6 space-y-3">
                    <span className="text-xs font-mono text-[#7c7a74] block">04 /</span>
                    <h3 className="text-lg font-serif font-black uppercase">DIGITAL STRATEGY</h3>
                    <p className="text-xs text-[#4a4a46] leading-relaxed font-light">
                      Subtly auditing visual clutter, structuring brand architectures, and advising on sustainable production goals.
                    </p>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* ========================================== */}
          {/* WORK TAB                                   */}
          {/* ========================================== */}
          {activeTab === 'work' && !selectedProject && !selectedArticle && (
            <motion.div
              key="work-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              <div className="border-b border-[#e1dfda] pb-6 space-y-2">
                <span className="text-xs font-mono text-[#7c7a74] uppercase">[ 2024 — 2026 ARCHIVE ]</span>
                <h1 className="text-4xl font-serif font-black uppercase">SELECTED CASE STUDIES</h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {PROJECTS_DATA.map((project, idx) => {
                  return (
                    <div 
                      key={project.id}
                      onClick={() => handleProjectSelect(project)}
                      className="group cursor-pointer space-y-4"
                    >
                      <div className="w-full h-[280px] border border-[#e1dfda] overflow-hidden relative">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1200ms] ease-out group-hover:scale-105"
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs font-mono text-[#7c7a74]">
                        <span>0{idx + 1} // {project.category}</span>
                        <span>{project.year}</span>
                      </div>
                      <h3 className="text-2xl font-serif font-black uppercase tracking-tight group-hover:underline flex items-center justify-between">
                        <span>{project.title}</span>
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <p className="text-sm font-sans font-light text-[#4a4a46] leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ========================================== */}
          {/* WRITING TAB                                */}
          {/* ========================================== */}
          {activeTab === 'writing' && !selectedProject && !selectedArticle && (
            <motion.div
              key="writing-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12 max-w-3xl mx-auto"
            >
              <div className="border-b border-[#e1dfda] pb-6 space-y-2">
                <span className="text-xs font-mono text-[#7c7a74] uppercase">[ REFLECTIONS ON REDUCTION ]</span>
                <h1 className="text-4xl font-serif font-black uppercase">THE CALMER INTERFACE JOURNAL</h1>
              </div>

              <div className="space-y-10 divide-y divide-[#e1dfda]">
                {ARTICLES_DATA.map(article => (
                  <div 
                    key={article.id}
                    onClick={() => handleArticleSelect(article)}
                    className="group cursor-pointer pt-8 first:pt-0 space-y-3"
                  >
                    <div className="flex items-center gap-4 text-xs font-mono text-[#7c7a74] uppercase">
                      <span>{article.category}</span>
                      <span>•</span>
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="text-2xl font-serif font-black uppercase group-hover:underline flex items-center justify-between text-[#1c1c1a]">
                      <span>{article.title}</span>
                      <ArrowUpRight className="w-4 h-4 text-[#7c7a74]" />
                    </h3>
                    <p className="text-sm sm:text-base text-[#4a4a46] leading-relaxed font-light font-sans">
                      {article.excerpt}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ========================================== */}
          {/* ABOUT TAB                                  */}
          {/* ========================================== */}
          {activeTab === 'about' && !selectedProject && !selectedArticle && (
            <motion.div
              key="about-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              <div className="border-b border-[#e1dfda] pb-6 space-y-2">
                <span className="text-xs font-mono text-[#7c7a74] uppercase">[ THE EDITORIAL SPEC ]</span>
                <h1 className="text-4xl font-serif font-black uppercase">ABOUT AMELIA ROWAN</h1>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-5 border border-[#e1dfda] overflow-hidden aspect-[4/5]">
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800" 
                    alt="Amelia Rowan" 
                    className="w-full h-full object-cover grayscale"
                  />
                </div>

                <div className="lg:col-span-7 space-y-6 text-sm md:text-base leading-relaxed text-[#4a4a46] font-light font-serif">
                  <p className="font-sans font-bold text-[#1c1c1a]">
                    Amelia Rowan is an independent designer, technologist, and digital publisher based in London, UK. She construct quiet systems, mathematical grid systems, and structural layouts.
                  </p>
                  <p>
                    Operating at the intersection of print layout traditions and modern React compilation layers, her work challenges the frantic nature of modern software design. She works with a highly restricted color palette, robust sans/serif hierarchy, and a strict subtraction strategy to create interfaces that feel calm, durable, and highly readable.
                  </p>
                  <p>
                    Throughout her independent career, she has shipped lightweight database interfaces, collaborated on interactive installations in major museums, and built custom static engines that host publications worldwide.
                  </p>
                  <div className="h-px bg-[#e1dfda] w-full pt-4" />
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono uppercase">
                    <div>
                      <span className="text-[#7c7a74] block">CURRENT INTERESTS</span>
                      <ul className="list-disc pl-4 text-[#1c1c1a] font-bold space-y-1 mt-1">
                        <li>Archival Mathematics</li>
                        <li>Analog Linocutting</li>
                        <li>Atmospheric Sounds</li>
                        <li>Minimal Typography</li>
                      </ul>
                    </div>
                    <div>
                      <span className="text-[#7c7a74] block">FOCUS REGIME</span>
                      <ul className="list-disc pl-4 text-[#1c1c1a] font-bold space-y-1 mt-1">
                        <li>Subtracted Interfaces</li>
                        <li>Quiet Publication Engines</li>
                        <li>Clean Data Archiving</li>
                        <li>High Contrast Print Specs</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* ========================================== */}
      {/* EDITORIAL FOOTER & CONTACT TRANSMITTER     */}
      {/* ========================================== */}
      <footer className="w-full border-t border-[#e1dfda] pt-12 mt-16 px-6 md:px-12 bg-[#faf9f6]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-xs font-mono uppercase">
          
          <div className="space-y-4">
            <span className="text-[#7c7a74] block">01 / SECURE CORRESPONDENCE</span>
            <p className="text-[#4a4a46] font-sans font-light tracking-wide leading-relaxed lowercase">
              For inquiry on collaborative visual systems, product architectures, or commission-based design:
            </p>
            <a 
              href="mailto:amelia@rowan-independent.com"
              className="text-[#1c1c1a] font-bold underline hover:opacity-75 block flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4" />
              <span>amelia@rowan-independent.com</span>
            </a>
          </div>

          <div className="space-y-4">
            <span className="text-[#7c7a74] block">02 / OUTBOUND SIGNALS</span>
            <div className="space-y-2">
              <a 
                href="https://github.com/amelia-rowan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#1c1c1a] font-bold block hover:underline flex items-center gap-1"
              >
                <span>GITHUB</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a 
                href="https://twitter.com/amelia_rowan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#1c1c1a] font-bold block hover:underline flex items-center gap-1"
              >
                <span>TWITTER</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a 
                href="https://linkedin.com/in/amelia-rowan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#1c1c1a] font-bold block hover:underline flex items-center gap-1"
              >
                <span>LINKEDIN</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <span className="text-[#7c7a74] block">03 / PRINT SPECIFICATION</span>
            <p className="text-[#4a4a46] font-sans font-light tracking-wide leading-relaxed lowercase">
              typeset in custom structural sans-serif and refined editorial serif. compiled on node servers. licensed under the mit open source protocol.
            </p>
            <span className="text-[#7c7a74] block mt-4">© 2026 AMELIA ROWAN. ALL CHANNELS ACTIVE.</span>
          </div>

        </div>
      </footer>

    </div>
  );
};
