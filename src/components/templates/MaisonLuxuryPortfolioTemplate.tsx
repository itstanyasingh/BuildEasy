import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioData, LayoutConfiguration } from '../../types';
import { 
  ArrowUpRight, 
  ArrowLeft, 
  Mail, 
  ExternalLink,
  MapPin,
  Sparkles,
  Award,
  Circle
} from 'lucide-react';

interface MaisonLuxuryPortfolioTemplateProps {
  data: PortfolioData;
  config?: LayoutConfiguration;
}

interface LuxuryProject {
  id: string;
  num: string;
  title: string;
  year: string;
  category: string;
  role: string;
  description: string;
  challenge: string;
  direction: string;
  process: string;
  result: string;
  image: string;
}

const PROJECTS_DATA: LuxuryProject[] = [
  {
    id: 'ml-1',
    num: '01',
    title: 'AURELIA',
    year: '2026',
    category: 'Luxury Fashion Identity',
    role: 'Creative Director',
    description: 'A complete typographic re-imagining and visual campaign direction for a high-jewelry house based in Paris.',
    challenge: 'Aurelia sought to bridge its legacy of physical handcraft with modern interactive layouts, requiring a design system that values precision, high-contrast typography, and generous, cinematic space.',
    direction: 'We developed a clean visual language centered around customized high-contrast serifs, coupled with dynamic editorial layouts that scale from landscape spreads to digital viewports.',
    process: 'Collaborated with archival goldsmiths and Parisian typographers to create a bespoke variable font. Designed and animated high-contrast digital galleries that replicate the feel of a premium catalog.',
    result: 'A widely recognized digital campaign praised across design reviews. Yielded a 180% increase in digital collection appointments and solidified Aurelia’s modern online footprint.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'ml-2',
    num: '02',
    title: 'NOCTURNE',
    year: '2025',
    category: 'Architectural Experience',
    role: 'Digital Designer',
    description: 'An immersive digital presentation for a modular monolithic villa collection along the Mediterranean coast.',
    challenge: 'Translating the physical density, raw textures, and silent shadow plays of premium concrete architectures into a dynamic, screen-bound virtual canvas.',
    direction: 'Established a 16-column layout with extreme whitespace, asymmetrical content placement, and subtle fade transitions to represent physical monolithic concrete layouts.',
    process: 'Drafted real-time coordinate trackers that respond to scroll velocity, initiating smooth layout expansions and parallax image reveals mimicking structural floorplans.',
    result: 'Successfully presented to high-net-worth architectural patrons, securing immediate pre-sales for all five coastal villa projects.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'ml-3',
    num: '03',
    title: 'ÉLAN',
    year: '2025',
    category: 'Editorial Campaign',
    role: 'Art Director',
    description: 'A visual-first web exhibition highlighting avant-garde apparel designs through interactive typography.',
    challenge: 'Capturing the raw energy, delicate material weaves, and fluid contours of haute couture inside rigid digital grids.',
    direction: 'Created fluid overlay canvas compositions paired with spacious layouts and elegant interactive typographic displays.',
    process: 'Constructed custom kinetic text grids that animate on swipe, allowing visual-first navigation without disrupting the collection spreads.',
    result: 'Nominated for multiple awards on international digital design indices, leading to high engagement rates among premium art buyers.',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'ml-4',
    num: '04',
    title: 'MONUMENT',
    year: '2024',
    category: 'Cultural Institution Identity',
    role: 'Lead Digital Designer',
    description: 'A comprehensive branding and interactive catalog archiving contemporary sculptures and modern art works.',
    challenge: 'A standard digital archive layout often feels sterile and clinical. Monument required a digital layout that feels like visiting a private modern sculpture park.',
    direction: 'Utilized elegant warm-stone backgrounds, high-contrast display serif typography, and custom vector separators.',
    process: 'Designed and deployed structured layout grids that prioritize large visual crops, accompanied by minimal uppercase metadata tags and clean index navigation matrices.',
    result: 'Featured widely across global art-direction publications. Adopted as the primary digital archiving standard for three contemporary European museums.',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=1200'
  }
];

export const MaisonLuxuryPortfolioTemplate: React.FC<MaisonLuxuryPortfolioTemplateProps> = ({ data, config }) => {
  const [activeTab, setActiveTab] = useState<'index' | 'work' | 'about' | 'contact'>('index');
  const [selectedProject, setSelectedProject] = useState<LuxuryProject | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Track cursor movement on desktop for custom cursor experience
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Scroll to top on tab/project change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab, selectedProject]);

  const handleProjectSelect = (project: LuxuryProject) => {
    setSelectedProject(project);
  };

  return (
    <div className="w-full min-h-screen bg-[#faf8f5] text-[#1a1a19] font-sans antialiased selection:bg-[#1a1a19] selection:text-[#faf8f5] relative flex flex-col justify-between pb-16">
      
      {/* ========================================== */}
      {/* CUSTOM CURSOR Experience                   */}
      {/* ========================================== */}
      <div 
        className="hidden md:block fixed pointer-events-none z-[9999] mix-blend-difference transition-transform duration-100 ease-out"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 2.5 : 1})`,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#ffffff'
        }}
      />

      {/* ========================================== */}
      {/* LUXURY EDITORIAL HEADER                    */}
      {/* ========================================== */}
      <header className="w-full border-b border-[#e5dfd5] py-7 px-6 md:px-12 bg-[#faf8f5]/90 backdrop-blur-sm sticky top-0 z-[200]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div 
            onClick={() => {
              setSelectedProject(null);
              setActiveTab('index');
            }}
            className="cursor-pointer flex flex-col items-start"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <span className="text-base font-serif tracking-[0.2em] font-medium">CELESTE LAURENT</span>
            <span className="text-[9px] tracking-[0.25em] text-[#8e877c] uppercase">PARIS // CREATIVE STUDIO</span>
          </div>

          <nav className="flex items-center gap-8 text-[11px] tracking-[0.25em] uppercase font-medium">
            <button 
              onClick={() => { setSelectedProject(null); setActiveTab('index'); }}
              className={`hover:text-[#8e877c] transition-colors ${activeTab === 'index' && !selectedProject ? 'text-[#1a1a19] font-semibold border-b border-[#1a1a19] pb-0.5' : 'text-[#8e877c]'}`}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              INDEX
            </button>
            <button 
              onClick={() => { setSelectedProject(null); setActiveTab('work'); }}
              className={`hover:text-[#8e877c] transition-colors ${activeTab === 'work' || selectedProject ? 'text-[#1a1a19] font-semibold border-b border-[#1a1a19] pb-0.5' : 'text-[#8e877c]'}`}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              WORK
            </button>
            <button 
              onClick={() => { setSelectedProject(null); setActiveTab('about'); }}
              className={`hover:text-[#8e877c] transition-colors ${activeTab === 'about' ? 'text-[#1a1a19] font-semibold border-b border-[#1a1a19] pb-0.5' : 'text-[#8e877c]'}`}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              ABOUT
            </button>
            <button 
              onClick={() => { setSelectedProject(null); setActiveTab('contact'); }}
              className={`hover:text-[#8e877c] transition-colors ${activeTab === 'contact' ? 'text-[#1a1a19] font-semibold border-b border-[#1a1a19] pb-0.5' : 'text-[#8e877c]'}`}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              CONTACT
            </button>
          </nav>

        </div>
      </header>

      {/* ========================================== */}
      {/* MAIN LAYOUT CANVAS                         */}
      {/* ========================================== */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-6 md:px-12 pt-12">
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
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              className="space-y-16"
            >
              {/* Back Nav Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase font-medium text-[#8e877c] hover:text-[#1a1a19] transition-colors"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>BACK TO WORK</span>
              </button>

              {/* Header Title with Cinematic Typography */}
              <div className="space-y-6 border-b border-[#e5dfd5] pb-10">
                <span className="text-[10px] tracking-[0.3em] text-[#8e877c] uppercase block">{selectedProject.category}</span>
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif font-light tracking-tight leading-none text-[#1a1a19] uppercase">
                  {selectedProject.title}
                </h1>
                <p className="text-xl leading-relaxed text-[#5a5449] max-w-3xl font-serif font-light italic">
                  {selectedProject.description}
                </p>
              </div>

              {/* Detailed Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-4 text-[10px] tracking-[0.2em] text-[#8e877c] uppercase border-b border-[#e5dfd5]">
                <div>
                  <span className="block text-[#b2ab9f] mb-1">ROLE INVOLVEMENT</span>
                  <span className="font-semibold text-[#1a1a19] text-xs">{selectedProject.role}</span>
                </div>
                <div>
                  <span className="block text-[#b2ab9f] mb-1">PROJECT YEAR</span>
                  <span className="font-semibold text-[#1a1a19] text-xs">{selectedProject.year}</span>
                </div>
                <div>
                  <span className="block text-[#b2ab9f] mb-1">CATEGORIES</span>
                  <span className="font-semibold text-[#1a1a19] text-xs">{selectedProject.category}</span>
                </div>
                <div>
                  <span className="block text-[#b2ab9f] mb-1">MEDIAS & TECHS</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {['ART DIRECTION', 'DTP', 'DIGITAL'].map(m => (
                      <span key={m} className="bg-[#e5dfd5] text-[#1a1a19] px-2 py-0.5 text-[8px] tracking-widest">{m}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cinematic Full-bleed image */}
              <div className="w-full h-[350px] sm:h-[550px] overflow-hidden border border-[#e5dfd5] relative bg-neutral-900">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                />
              </div>

              {/* Creative Narrative Sections */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
                <div className="lg:col-span-4 space-y-4">
                  <h3 className="text-xs tracking-[0.3em] font-semibold text-[#1a1a19] uppercase">ART-DIRECTION CASE MANUAL</h3>
                  <div className="h-px bg-[#e5dfd5] w-16" />
                </div>
                <div className="lg:col-span-8 space-y-10 text-sm md:text-base leading-relaxed text-[#5a5449] font-serif font-light">
                  <div className="space-y-3">
                    <h4 className="text-[10px] tracking-[0.2em] font-sans font-semibold text-[#1a1a19] uppercase">I / THE PROBLEM SPEC</h4>
                    <p>{selectedProject.challenge}</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-[10px] tracking-[0.2em] font-sans font-semibold text-[#1a1a19] uppercase">II / CREATIVE STRATEGY</h4>
                    <p>{selectedProject.direction}</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-[10px] tracking-[0.2em] font-sans font-semibold text-[#1a1a19] uppercase">III / EXECUTION PROCESS</h4>
                    <p>{selectedProject.process}</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-[10px] tracking-[0.2em] font-sans font-semibold text-[#1a1a19] uppercase">IV / THE IMPACT</h4>
                    <p>{selectedProject.result}</p>
                  </div>
                </div>
              </div>

              {/* Next Luxury Experience Navigation */}
              <div className="border-t border-[#e5dfd5] pt-12 flex items-center justify-between">
                <div>
                  <span className="text-[10px] tracking-[0.25em] text-[#8e877c] uppercase">CONTINUE THE ARCHIVE REVIEW</span>
                  <h4 className="text-xl font-serif font-light text-[#1a1a19] uppercase mt-1">NEXT PORTFOLIO SELECTION</h4>
                </div>
                <button 
                  onClick={() => {
                    const idx = PROJECTS_DATA.findIndex(p => p.id === selectedProject.id);
                    const nextProj = PROJECTS_DATA[(idx + 1) % PROJECTS_DATA.length];
                    setSelectedProject(nextProj);
                  }}
                  className="border border-[#1a1a19] px-6 py-3 text-[10px] tracking-[0.2em] uppercase font-semibold hover:bg-[#1a1a19] hover:text-[#faf8f5] transition-all"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  NEXT COLLECTION →
                </button>
              </div>

            </motion.div>
          )}

          {/* ========================================== */}
          {/* INDEX HOME PAGE LAYOUT                     */}
          {/* ========================================== */}
          {activeTab === 'index' && !selectedProject && (
            <motion.div
              key="index-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-24"
            >
              {/* Luxury Editorial Hero Section */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-b border-[#e5dfd5] pb-20">
                <div className="lg:col-span-8 space-y-8">
                  <span className="text-[10px] tracking-[0.4em] text-[#8e877c] uppercase block">AESTHETIC AGENCY / REFINED LUXURY EXPERIENCES</span>
                  <h1 className="text-6xl sm:text-8xl lg:text-9xl font-serif font-light tracking-tight leading-none uppercase text-[#1a1a19]">
                    CELESTE<br />LAURENT
                  </h1>
                  <p className="text-xl sm:text-2xl leading-relaxed text-[#5a5449] font-serif font-light max-w-3xl italic">
                    Sculpting high-end creative directions, luxurious digital identities, and immersive artistic campaigns. Operating at the boundary of mathematical layout precision and Parisian haute design heritage.
                  </p>
                </div>
                <div className="lg:col-span-4 lg:text-right text-[#8e877c] text-[10px] tracking-[0.2em] uppercase space-y-3">
                  <div>[ PARIS // WORLDWIDE ]</div>
                  <div>[ CAMPAIGN SERIES: 2026 ]</div>
                  <div>[ CURRENT INQUIRIES ACTIVE ]</div>
                </div>
              </section>

              {/* Fictional Collections Showcase */}
              <section className="space-y-12">
                <div className="flex items-center justify-between border-b border-[#e5dfd5] pb-4">
                  <h2 className="text-[10px] tracking-[0.3em] uppercase font-semibold">01 — ARCHIVE EXHIBITION</h2>
                  <span className="text-[9px] tracking-[0.2em] text-[#8e877c] font-medium uppercase">[S/S CAPSULE]</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                  {PROJECTS_DATA.map((project, index) => {
                    return (
                      <div 
                        key={project.id}
                        onClick={() => handleProjectSelect(project)}
                        className="group cursor-pointer space-y-5"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                      >
                        {/* Elegant Landscape Thumbnail with Original Colors */}
                        <div className="w-full h-[300px] border border-[#e5dfd5] overflow-hidden relative bg-[#eae8e4]">
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                          />
                        </div>

                        <div className="flex items-center justify-between text-[10px] tracking-[0.2em] text-[#8e877c] uppercase font-medium">
                          <span>0{index + 1} // {project.category}</span>
                          <span>{project.year}</span>
                        </div>

                        <h3 className="text-3xl font-serif font-light uppercase tracking-tight group-hover:underline flex items-center justify-between text-[#1a1a19]">
                          <span>{project.title}</span>
                          <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h3>

                        <p className="text-sm font-serif font-light text-[#5a5449] leading-relaxed italic line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Premium Services / Expertise Section */}
              <section className="border-t border-[#e5dfd5] pt-20 space-y-12">
                <h2 className="text-[10px] tracking-[0.3em] uppercase font-semibold text-[#1a1a19]">02 — STUDIO CAPABILITIES</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                  <div className="border border-[#e5dfd5] p-6 space-y-4 bg-white hover:shadow-sm transition-shadow">
                    <span className="text-[10px] font-mono text-[#8e877c] block">01 /</span>
                    <h3 className="text-base font-serif font-medium uppercase text-[#1a1a19]">CREATIVE DIRECTION</h3>
                    <p className="text-xs text-[#5a5449] leading-relaxed font-serif font-light italic">
                      Sculpting overarching artistic strategies, visual philosophies, and collection directives for legacy houses.
                    </p>
                  </div>
                  <div className="border border-[#e5dfd5] p-6 space-y-4 bg-white hover:shadow-sm transition-shadow">
                    <span className="text-[10px] font-mono text-[#8e877c] block">02 /</span>
                    <h3 className="text-base font-serif font-medium uppercase text-[#1a1a19]">DIGITAL DESIGN</h3>
                    <p className="text-xs text-[#5a5449] leading-relaxed font-serif font-light italic">
                      Architecting beautiful interface layouts, customized grid systems, and elegant typographic hierarchies.
                    </p>
                  </div>
                  <div className="border border-[#e5dfd5] p-6 space-y-4 bg-white hover:shadow-sm transition-shadow">
                    <span className="text-[10px] font-mono text-[#8e877c] block">03 /</span>
                    <h3 className="text-base font-serif font-medium uppercase text-[#1a1a19]">BRAND IDENTITY</h3>
                    <p className="text-xs text-[#5a5449] leading-relaxed font-serif font-light italic">
                      Crafting bespoke logotypes, tailored typography guidelines, and holistic luxury presentation elements.
                    </p>
                  </div>
                  <div className="border border-[#e5dfd5] p-6 space-y-4 bg-white hover:shadow-sm transition-shadow">
                    <span className="text-[10px] font-mono text-[#8e877c] block">04 /</span>
                    <h3 className="text-base font-serif font-medium uppercase text-[#1a1a19]">INTERACTIONS</h3>
                    <p className="text-xs text-[#5a5449] leading-relaxed font-serif font-light italic">
                      Engineering premium transition animations, custom cursors, and layout kinematics with zero friction.
                    </p>
                  </div>
                  <div className="border border-[#e5dfd5] p-6 space-y-4 bg-white hover:shadow-sm transition-shadow">
                    <span className="text-[10px] font-mono text-[#8e877c] block">05 /</span>
                    <h3 className="text-base font-serif font-medium uppercase text-[#1a1a19]">ART DIRECTION</h3>
                    <p className="text-xs text-[#5a5449] leading-relaxed font-serif font-light italic">
                      Coordinating photo campaigns, luxury fashion editorials, collection lookbooks, and high-jewelry spreads.
                    </p>
                  </div>
                </div>
              </section>

            </motion.div>
          )}

          {/* ========================================== */}
          {/* SELECTED PROJECTS TAB                      */}
          {/* ========================================== */}
          {activeTab === 'work' && !selectedProject && (
            <motion.div
              key="work-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              <div className="border-b border-[#e5dfd5] pb-6 space-y-2">
                <span className="text-[10px] tracking-[0.2em] text-[#8e877c] uppercase">[ LUXURY SERIES ARCHIVE: 2024 — 2026 ]</span>
                <h1 className="text-4xl font-serif font-light uppercase text-[#1a1a19]">SELECTED PORTFOLIOS</h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {PROJECTS_DATA.map((project, index) => {
                  return (
                    <div 
                      key={project.id}
                      onClick={() => handleProjectSelect(project)}
                      className="group cursor-pointer space-y-4"
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      <div className="w-full h-[320px] border border-[#e5dfd5] overflow-hidden relative bg-[#eae8e4]">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-[1000ms] group-hover:scale-105"
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10px] tracking-[0.2em] text-[#8e877c] uppercase">
                        <span>0{index + 1} // {project.category}</span>
                        <span>{project.year}</span>
                      </div>
                      <h3 className="text-2xl font-serif font-light uppercase tracking-tight group-hover:underline flex items-center justify-between text-[#1a1a19]">
                        <span>{project.title}</span>
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <p className="text-sm font-serif font-light text-[#5a5449] leading-relaxed italic">
                        {project.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ========================================== */}
          {/* ARTIST BIOGRAPHY ABOUT TAB                 */}
          {/* ========================================== */}
          {activeTab === 'about' && !selectedProject && (
            <motion.div
              key="about-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              <div className="border-b border-[#e5dfd5] pb-6 space-y-2">
                <span className="text-[10px] tracking-[0.2em] text-[#8e877c] uppercase">[ BIOGRAPHY SPECIFICATIONS ]</span>
                <h1 className="text-4xl font-serif font-light uppercase text-[#1a1a19]">ABOUT CELESTE LAURENT</h1>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-5 border border-[#e5dfd5] overflow-hidden aspect-[4/5] bg-neutral-900">
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800" 
                    alt="Celeste Laurent Portrait" 
                    className="w-full h-full object-cover grayscale"
                  />
                </div>

                <div className="lg:col-span-7 space-y-6 text-sm md:text-base leading-relaxed text-[#5a5449] font-serif font-light">
                  <p className="font-sans font-semibold text-[#1a1a19] text-base leading-relaxed tracking-wide">
                    Celeste Laurent is an independent creative director, digital designer, and art consultant operating out of Paris, France.
                  </p>
                  <p className="italic">
                    Blending classical French printing traditions with modern fluid layout compilation architectures, her studio construct luxury digital identities and custom typography catalogs. She advocates for extreme whitespace, restricted high-end color themes, and subtle cursor motion systems.
                  </p>
                  <p>
                    Throughout her decade-long career, Celeste has collaborated with high-jewelry collections in Paris, directed interactive architecture campaign spreads, and coordinated cultural galleries adoption of modern digital archiving specifications.
                  </p>

                  <div className="border-t border-[#e5dfd5] pt-6 grid grid-cols-2 gap-6 text-[10px] tracking-[0.2em] text-[#8e877c] uppercase">
                    <div>
                      <span className="block text-[#b2ab9f] mb-1">CREATIVE APPROACH</span>
                      <ul className="list-disc pl-4 text-[#1a1a19] font-medium space-y-1 mt-1">
                        <li>EXTREME WHITESPACE</li>
                        <li>HIGH CONTRAST TYPOGRAPHY</li>
                        <li>RESTRICTED NEUTRAL PALETTES</li>
                        <li>CINEMATIC COMPOSITIONS</li>
                      </ul>
                    </div>
                    <div>
                      <span className="block text-[#b2ab9f] mb-1">STUDIO FOCUS</span>
                      <ul className="list-disc pl-4 text-[#1a1a19] font-medium space-y-1 mt-1">
                        <li>LUXURY FASHION BRANDS</li>
                        <li>MODULAR MONOLITHIC DESIGN</li>
                        <li>CONTEMPORARY SCULPTURE</li>
                        <li>KINETIC TEXT SCALES</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================== */}
          {/* CONTACT TAB                                */}
          {/* ========================================== */}
          {activeTab === 'contact' && !selectedProject && (
            <motion.div
              key="contact-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              <div className="border-b border-[#e5dfd5] pb-6 space-y-2">
                <span className="text-[10px] tracking-[0.2em] text-[#8e877c] uppercase">[ CORRESPONDENCE TERMINALS ]</span>
                <h1 className="text-4xl font-serif font-light uppercase text-[#1a1a19]">GET IN TOUCH</h1>
              </div>

              <div className="max-w-3xl mx-auto border border-[#e5dfd5] p-8 sm:p-12 bg-white text-center space-y-8">
                <h2 className="text-3xl sm:text-5xl font-serif font-light uppercase tracking-tight text-[#1a1a19]">
                  HAVE SOMETHING<br />WORTH BUILDING?
                </h2>
                <p className="text-xs sm:text-sm text-[#5a5449] font-serif font-light italic max-w-xl mx-auto leading-relaxed">
                  For collaborative campaigns, premium architectural visualizations, or digital identity commissions, please initiate secure correspondence with Celeste Laurent.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <a 
                    href="mailto:celeste@laurent-luxury.fr"
                    className="bg-[#1a1a19] text-white hover:bg-neutral-800 border border-transparent px-8 py-4 text-[10px] tracking-[0.25em] uppercase font-semibold transition-all flex items-center gap-2"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <Mail className="w-4 h-4" />
                    <span>DISPATCH EMAIL</span>
                  </a>
                  <a 
                    href="https://github.com/celeste-laurent"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white text-[#1a1a19] hover:bg-neutral-50 border border-[#e5dfd5] px-8 py-4 text-[10px] tracking-[0.25em] uppercase font-semibold transition-all flex items-center gap-2"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>OPEN GITHUB PORT</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* ========================================== */}
      {/* PREMIUM EDITORIAL FOOTER                   */}
      {/* ========================================== */}
      <footer className="w-full border-t border-[#e5dfd5] pt-12 mt-20 px-6 md:px-12 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-[10px] tracking-[0.2em] uppercase text-[#8e877c] font-medium">
          
          <div className="space-y-4">
            <span>[ SECTION I // REGISTRY ]</span>
            <p className="text-[#5a5449] leading-relaxed font-serif font-light italic normal-case text-xs">
              This space features luxury portfolios, cinematic digital architectures, and high-contrast typography campaigns.
            </p>
          </div>

          <div className="space-y-4">
            <span>[ SECTION II // NETWORKS ]</span>
            <div className="space-y-2 font-semibold text-[#1a1a19]">
              <a href="https://github.com/celeste-laurent" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">GITHUB // CELESTE-LAURENT <ArrowUpRight className="w-3 h-3" /></a>
              <a href="https://linkedin.com/in/celeste-laurent" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">LINKEDIN // CELESTE-LAURENT <ArrowUpRight className="w-3 h-3" /></a>
              <a href="https://twitter.com/celeste-laurent" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">TWITTER // CELESTE <ArrowUpRight className="w-3 h-3" /></a>
            </div>
          </div>

          <div className="space-y-4">
            <span>[ SECTION III // IMPRINT ]</span>
            <p className="text-[#5a5449] leading-relaxed font-serif font-light italic normal-case text-xs">
              imprint and code under the mit license specifications. all premium photography assets preserved. copyright 2026 celeste laurent.
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
};
