import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioData, LayoutConfiguration } from '../../types';
import { 
  ArrowUpRight, 
  ArrowLeft, 
  Sparkles, 
  Layers, 
  Monitor, 
  MapPin, 
  Mail, 
  ExternalLink,
  ChevronDown,
  Globe,
  Radio
} from 'lucide-react';

interface RustfolioBrutalistTemplateProps {
  data: PortfolioData;
  config?: LayoutConfiguration;
}

interface BrutalistProject {
  id: string;
  num: string;
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

const PROJECTS_DATA: BrutalistProject[] = [
  {
    id: 'rf-1',
    num: '01',
    title: 'VOID / SPACE',
    year: '2026',
    category: 'Interactive Installation',
    role: 'Creative Technologist',
    description: 'A responsive visual space deforming dynamically to auditory and atmospheric environmental inputs.',
    challenge: 'Translating live, high-frequency kinetic sensors into absolute, rigid visual feedback without dropping frame rates below the crucial 60fps thresholds.',
    approach: 'We developed custom shaders coupled with sub-grid arithmetic processing to coordinate sensor relays over WebSockets, outputting heavy canvas deformations.',
    outcome: 'Deployed at the Amsterdam Kinetic Museum. Experienced by over 40,000 visitors with zero latency dropouts and absolute structural precision.',
    technologies: ['Three.js', 'WebGL', 'GLSL Shaders', 'WebSockets'],
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'rf-2',
    num: '02',
    title: 'AFTERIMAGE',
    year: '2025',
    category: 'Visual Identity',
    role: 'Digital Art Director',
    description: 'An experimental brand architecture featuring responsive typography and fluid sub-pixel layouts.',
    challenge: 'A standard identity relies on fixed vector assets, which fail to adapt to modern fluid viewport environments. We needed a dynamic identity that lives, breathes, and reflows organically.',
    approach: 'Created an algorithmic generator that translates user interaction coordinates into custom variable-font weights, scaling, and offset shadow directions.',
    outcome: 'Lauded by modern design index systems, resulting in an immediate 150% rise in prospective digital client conversations.',
    technologies: ['Variable Fonts', 'CSS Variables', 'Next.js', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'rf-3',
    num: '03',
    title: 'SIGNAL / 09',
    year: '2025',
    category: 'Immersive Web',
    role: 'Creative Developer',
    description: 'A persistent, low-latency browser experience integrating audio processing and visual distortion patterns.',
    challenge: 'Syncing complex multi-track audio nodes with real-time SVG grid deformations in the browser without causing excessive CPU overhead or thermal throttling on mobile devices.',
    approach: 'Leveraged Web Audio API analyzer nodes coupled with offscreen canvas rendering, keeping layout modifications off the main thread.',
    outcome: 'Successfully shipped. Featured as Site of the Day across three major design awards, with an average session duration of 4.5 minutes.',
    technologies: ['Web Audio API', 'React', 'Offscreen Canvas', 'Framer Motion'],
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'rf-4',
    num: '04',
    title: 'MONUMENT',
    year: '2024',
    category: 'Digital Art Direction',
    role: 'Solo Director',
    description: 'An architectural layout translation of physical monolithic structures into interactive editorial grids.',
    challenge: 'Physical concrete slabs have absolute density and weight. Web pages are often lightweight and transient. We needed a way to translate monolithic structural weight to digital frames.',
    approach: 'Used highly contrasting typography scales, absolute 1px black outline dividers, solid offset shadows, and asynchronous scroll layers to mimic physical layers.',
    outcome: 'Exhibited virtually for the structural design collective, generating global coverage across architecture journals and design archives.',
    technologies: ['React', 'CSS Grids', 'Sub-pixel Alignment', 'Framer Motion'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200'
  }
];

export const RustfolioBrutalistTemplate: React.FC<RustfolioBrutalistTemplateProps> = ({ data, config }) => {
  const [activeTab, setActiveTab] = useState<'index' | 'work' | 'about' | 'contact'>('index');
  const [selectedProject, setSelectedProject] = useState<BrutalistProject | null>(null);

  // References for navigation
  const workRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab, selectedProject]);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>, tabName: 'index' | 'work' | 'about' | 'contact') => {
    setSelectedProject(null);
    setActiveTab(tabName);
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleProjectSelect = (project: BrutalistProject) => {
    setSelectedProject(project);
  };

  return (
    <div className="w-full min-h-screen bg-[#f3f3f3] text-[#000] font-mono selection:bg-[#000] selection:text-[#f3f3f3] transition-colors duration-300 pb-24">
      
      {/* ========================================== */}
      {/* BRUTALIST MASTER NAV BAR                   */}
      {/* ========================================== */}
      <header className="w-full border-b-4 border-black py-5 px-6 md:px-12 sticky top-0 bg-[#f3f3f3]/95 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          <div 
            onClick={() => {
              setSelectedProject(null);
              setActiveTab('index');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="cursor-pointer"
          >
            <div className="text-xl font-black tracking-tight flex items-center gap-2">
              <span className="bg-black text-[#f3f3f3] px-2 py-0.5">ARDEN VALE</span>
              <span className="text-xs hidden sm:inline">[ CREATIVE TECHNOLOGIST ]</span>
            </div>
          </div>

          <nav className="flex items-center gap-6 sm:gap-10 text-xs font-black uppercase tracking-wider">
            <button 
              onClick={() => { setSelectedProject(null); setActiveTab('index'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`hover:bg-black hover:text-[#f3f3f3] px-3 py-1.5 border-2 border-black transition-all ${activeTab === 'index' && !selectedProject ? 'bg-black text-[#f3f3f3]' : ''}`}
            >
              INDEX
            </button>
            <button 
              onClick={() => { setSelectedProject(null); setActiveTab('work'); }}
              className={`hover:bg-black hover:text-[#f3f3f3] px-3 py-1.5 border-2 border-black transition-all ${activeTab === 'work' || selectedProject ? 'bg-black text-[#f3f3f3]' : ''}`}
            >
              WORK
            </button>
            <button 
              onClick={() => { setSelectedProject(null); setActiveTab('about'); }}
              className={`hover:bg-black hover:text-[#f3f3f3] px-3 py-1.5 border-2 border-black transition-all ${activeTab === 'about' ? 'bg-black text-[#f3f3f3]' : ''}`}
            >
              ABOUT
            </button>
            <button 
              onClick={() => { setSelectedProject(null); setActiveTab('contact'); }}
              className={`hover:bg-black hover:text-[#f3f3f3] px-3 py-1.5 border-2 border-black transition-all ${activeTab === 'contact' ? 'bg-black text-[#f3f3f3]' : ''}`}
            >
              CONTACT
            </button>
          </nav>

        </div>
      </header>

      {/* ========================================== */}
      {/* CANVAS SECTION                             */}
      {/* ========================================== */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-12">
        <AnimatePresence mode="wait">
          
          {/* ========================================== */}
          {/* CASE STUDY PRESENTATION                    */}
          {/* ========================================== */}
          {selectedProject ? (
            <motion.div
              key="case-study"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {/* Back Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="flex items-center gap-2 text-xs font-black uppercase border-2 border-black px-4 py-2 hover:bg-black hover:text-[#f3f3f3] transition-all self-start"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>BACK TO SELECTION</span>
              </button>

              {/* Title Header */}
              <div className="border-4 border-black p-6 sm:p-10 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-4">
                <div className="flex items-center justify-between text-xs font-black">
                  <span className="bg-black text-white px-2 py-1">{selectedProject.num} // {selectedProject.category}</span>
                  <span>RELEASE_YEAR: {selectedProject.year}</span>
                </div>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none">
                  {selectedProject.title}
                </h1>
                <p className="text-base sm:text-lg leading-relaxed font-bold border-t-2 border-black pt-4">
                  {selectedProject.description}
                </p>
              </div>

              {/* Overview Meta Data Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 border-4 border-black p-6 bg-[#f3f3f3] uppercase text-xs font-black">
                <div>
                  <span className="text-[#666] block text-[10px]">ROLE SPEC</span>
                  <span className="text-sm font-bold text-black mt-1 block">{selectedProject.role}</span>
                </div>
                <div>
                  <span className="text-[#666] block text-[10px]">TIMEFRAME</span>
                  <span className="text-sm font-bold text-black mt-1 block">{selectedProject.year}</span>
                </div>
                <div>
                  <span className="text-[#666] block text-[10px]">CATEGORY</span>
                  <span className="text-sm font-bold text-black mt-1 block">{selectedProject.category}</span>
                </div>
                <div>
                  <span className="text-[#666] block text-[10px]">BUILD_STACK</span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {selectedProject.technologies.map(tech => (
                      <span key={tech} className="bg-black text-white px-2 py-0.5 text-[10px] tracking-wider">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Big brutal image frame */}
              <div className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-[280px] sm:h-[450px] overflow-hidden bg-black relative">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Deep Case Narrative */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
                <div className="lg:col-span-4 border-4 border-black p-6 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-black" />
                    <span>SYSTEM_REPORT</span>
                  </h3>
                  <div className="h-1 bg-black w-16 mt-2" />
                </div>
                <div className="lg:col-span-8 space-y-8 text-xs sm:text-sm leading-relaxed text-black font-semibold uppercase">
                  <div className="border-4 border-black p-6 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-2">
                    <h4 className="font-black text-xs text-[#000] border-b-2 border-black pb-1">01 / CHALLENGE</h4>
                    <p className="font-medium text-[#444]">{selectedProject.challenge}</p>
                  </div>
                  <div className="border-4 border-black p-6 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-2">
                    <h4 className="font-black text-xs text-[#000] border-b-2 border-black pb-1">02 / APPROACH</h4>
                    <p className="font-medium text-[#444]">{selectedProject.approach}</p>
                  </div>
                  <div className="border-4 border-black p-6 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-2">
                    <h4 className="font-black text-xs text-[#000] border-b-2 border-black pb-1">03 / OUTCOME</h4>
                    <p className="font-medium text-[#444]">{selectedProject.outcome}</p>
                  </div>
                </div>
              </div>

              {/* Next Project Fast Navigation */}
              <div className="border-4 border-black p-6 bg-black text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase text-[#888] font-bold">WANT TO CONTINUE SELECTION?</span>
                  <h4 className="text-lg font-black uppercase tracking-wider">INDEX DIRECTORY REMAINS OPEN</h4>
                </div>
                <button 
                  onClick={() => {
                    const currIndex = PROJECTS_DATA.findIndex(p => p.id === selectedProject.id);
                    const nextProj = PROJECTS_DATA[(currIndex + 1) % PROJECTS_DATA.length];
                    setSelectedProject(nextProj);
                  }}
                  className="bg-white text-black border-2 border-white px-6 py-3 text-xs font-black uppercase hover:bg-black hover:text-white transition-all"
                >
                  NEXT PROJECT →
                </button>
              </div>

            </motion.div>
          ) : (
            <div className="space-y-20">
              
              {/* ========================================== */}
              {/* INDEX VIEW HERO STATEMENT                  */}
              {/* ========================================== */}
              {activeTab === 'index' && (
                <motion.div
                  key="index-hero"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-16"
                >
                  <section className="border-4 border-black p-6 sm:p-12 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
                    <span className="bg-black text-white px-2 py-1 text-xs font-black tracking-widest inline-block uppercase">ARDEN VALE // AMSTERDAM / REMOTE</span>
                    <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-none border-b-4 border-black pb-6">
                      CREATIVE<br />TECHNOLOGIST
                    </h1>
                    <p className="text-sm sm:text-base leading-relaxed text-[#222] uppercase font-bold max-w-3xl">
                      I build high-contrast digital experiences where technology becomes part of the narrative. Bridging experimental art direction with robust interactive system engineering.
                    </p>
                  </section>

                  {/* Experimental Asymmetric Grid Projects */}
                  <section className="space-y-10">
                    <div className="border-b-4 border-black pb-4 flex items-center justify-between">
                      <h2 className="text-sm font-black uppercase tracking-wider">01 — FEATURED EXPOSURES</h2>
                      <span className="text-xs font-black uppercase tracking-widest bg-black text-[#f3f3f3] px-2 py-0.5">S/S CATALOGUE</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      {PROJECTS_DATA.map((project, index) => {
                        const isEven = index % 2 === 0;
                        const colSpan = isEven ? 'lg:col-span-7' : 'lg:col-span-5';
                        return (
                          <div 
                            key={project.id}
                            onClick={() => handleProjectSelect(project)}
                            className={`${colSpan} border-4 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1.5 hover:-translate-y-1.5 transition-all cursor-pointer space-y-4`}
                          >
                            <div className="flex items-center justify-between text-xs font-black">
                              <span className="bg-black text-white px-2 py-0.5">{project.num} // {project.category}</span>
                              <span>{project.year}</span>
                            </div>
                            
                            <div className="w-full h-[220px] border-4 border-black overflow-hidden bg-[#fafafa]">
                              <img 
                                src={project.image} 
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                              />
                            </div>

                            <h3 className="text-2xl font-black uppercase flex items-center justify-between">
                              <span>{project.title}</span>
                              <ArrowUpRight className="w-5 h-5" />
                            </h3>
                            <p className="text-xs text-[#333] font-bold uppercase leading-relaxed line-clamp-2">
                              {project.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  {/* Capabilities Section */}
                  <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t-4 border-black pt-16">
                    <div className="lg:col-span-4 border-4 border-black p-6 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <span className="text-[10px] text-[#666] font-black uppercase block">CAPABILITY METRICS</span>
                      <h2 className="text-2xl font-black uppercase mt-1">SYSTEM CONTROLS</h2>
                    </div>

                    <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="border-4 border-black p-5 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-2">
                        <span className="font-bold text-xs bg-black text-white px-2 py-0.5 inline-block">01 / CREATIVE DEVELOPMENT</span>
                        <p className="text-[11px] text-[#222] font-semibold uppercase leading-relaxed">
                          Building complex, low-latency, canvas-based shaders and performant computational layouts in the browser.
                        </p>
                      </div>
                      <div className="border-4 border-black p-5 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-2">
                        <span className="font-bold text-xs bg-black text-white px-2 py-0.5 inline-block">02 / INTERACTION DESIGN</span>
                        <p className="text-[11px] text-[#222] font-semibold uppercase leading-relaxed">
                          Refining sub-pixel animation curves, physical scroll kinematics, and interactive layout boundaries.
                        </p>
                      </div>
                      <div className="border-4 border-black p-5 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-2">
                        <span className="font-bold text-xs bg-black text-white px-2 py-0.5 inline-block">03 / DIGITAL ART DIRECTION</span>
                        <p className="text-[11px] text-[#222] font-semibold uppercase leading-relaxed">
                          Establishing high-contrast variable visual architectures, typography scales, and modular frameworks.
                        </p>
                      </div>
                      <div className="border-4 border-black p-5 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-2">
                        <span className="font-bold text-xs bg-black text-white px-2 py-0.5 inline-block">04 / EXPERIMENTAL WEB</span>
                        <p className="text-[11px] text-[#222] font-semibold uppercase leading-relaxed">
                          Coordinating audio streams, reactive canvases, variable font interfaces, and WebAudio processors.
                        </p>
                      </div>
                    </div>
                  </section>
                </motion.div>
              )}

              {/* ========================================== */}
              {/* PROJECTS ARCHIVE VIEW                      */}
              {/* ========================================== */}
              {activeTab === 'work' && (
                <motion.div
                  key="work-archive"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-10"
                >
                  <div className="border-b-4 border-black pb-4 flex items-center justify-between">
                    <h2 className="text-sm font-black uppercase tracking-wider">PROJECT INDEX ARCHIVE</h2>
                    <span className="text-xs font-black uppercase tracking-widest bg-black text-[#f3f3f3] px-2 py-0.5">FULL CATALOGUE</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {PROJECTS_DATA.map((project, index) => {
                      return (
                        <div 
                          key={project.id}
                          onClick={() => handleProjectSelect(project)}
                          className="border-4 border-black p-5 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1.5 hover:-translate-y-1.5 transition-all cursor-pointer space-y-4"
                        >
                          <div className="flex items-center justify-between text-xs font-black">
                            <span className="bg-black text-white px-2 py-0.5">{project.num} // {project.category}</span>
                            <span>{project.year}</span>
                          </div>
                          
                          <div className="w-full h-[240px] border-4 border-black overflow-hidden bg-[#fafafa]">
                            <img 
                              src={project.image} 
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            />
                          </div>

                          <h3 className="text-2xl font-black uppercase flex items-center justify-between">
                            <span>{project.title}</span>
                            <ArrowUpRight className="w-5 h-5" />
                          </h3>
                          <p className="text-xs text-[#333] font-bold uppercase leading-relaxed">
                            {project.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* ========================================== */}
              {/* ABOUT BIOGRAPHY VIEW                       */}
              {/* ========================================== */}
              {activeTab === 'about' && (
                <motion.div
                  key="about-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-10"
                >
                  <div className="border-b-4 border-black pb-4 flex items-center justify-between">
                    <h2 className="text-sm font-black uppercase tracking-wider">BIOGRAPHIC INTERFACE</h2>
                    <span className="text-xs font-black uppercase tracking-widest bg-black text-[#f3f3f3] px-2 py-0.5">ARDEN VALE SPECS</span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-5 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden aspect-[4/5] bg-black">
                      <img 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" 
                        alt="Arden Vale Portrait" 
                        className="w-full h-full object-cover filter contrast-125 brightness-95"
                      />
                    </div>

                    <div className="lg:col-span-7 border-4 border-black p-6 sm:p-8 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6 text-xs sm:text-sm leading-relaxed text-black font-semibold uppercase">
                      <p className="text-[#000] font-black border-b-2 border-black pb-2 text-sm sm:text-base">
                        ARDEN VALE IS AN INDEPENDENT CREATIVE TECHNOLOGIST BASED IN AMSTERDAM.
                      </p>
                      <p className="text-[#333]">
                        I build dynamic digital installations, variable-typography brand structures, and high-fidelity low-latency web environments. Operating at the boundary of mathematical system logic and physical tactile layout aesthetics.
                      </p>
                      <p className="text-[#333]">
                        By combining WebGL/Three.js render pipelines with offscreen threading, WebAudio API processing, and precise 12-column grid structures, my work attempts to transform software layouts from cold transient frameworks into living, breathing, high-contrast visual systems.
                      </p>
                      
                      <div className="border-t-4 border-black pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-black">
                        <div>
                          <span className="text-[#666] block text-[10px]">CURRENT EXPERIMENTAL FOCUS</span>
                          <ul className="list-disc pl-4 space-y-1 mt-1">
                            <li>KINETIC WEB SHADERS</li>
                            <li>SUB-PIXEL COMPILER ARITHMETIC</li>
                            <li>REAL-TIME AUDITORY REVERB</li>
                            <li>VARIABLE OUTLINE SYSTEMS</li>
                          </ul>
                        </div>
                        <div>
                          <span className="text-[#666] block text-[10px]">CURRENT LOCATION SPEC</span>
                          <ul className="list-disc pl-4 space-y-1 mt-1">
                            <li>AMSTERDAM, HOLLAND</li>
                            <li>GLOBAL COMMISSION DISPATCH</li>
                            <li>REMOTE SECURE WEB RELAYS</li>
                            <li>GMT +1 TIMEZONE</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ========================================== */}
              {/* CONTACT & TRANSMISSION VIEW                */}
              {/* ========================================== */}
              {activeTab === 'contact' && (
                <motion.div
                  key="contact-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-10"
                >
                  <div className="border-b-4 border-black pb-4 flex items-center justify-between">
                    <h2 className="text-sm font-black uppercase tracking-wider">SECURE TELEMETRY OUTPOST</h2>
                    <span className="text-xs font-black uppercase tracking-widest bg-black text-[#f3f3f3] px-2 py-0.5">CONTACT CHANNELS</span>
                  </div>

                  <div className="border-4 border-black p-8 sm:p-12 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center space-y-8">
                    <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
                      HAVE SOMETHING<br />WORTH BUILDING?
                    </h2>
                    <p className="text-xs sm:text-sm font-bold uppercase text-[#444] max-w-xl mx-auto leading-relaxed">
                      WANT TO COMMISSION A GENERATIVE ART DIRECTION SCHEME, WebGL EXPERIMENT, OR DISCUSS A SUSTAINABLE FREELANCE FRAMEWORK? DISPATCH A PACKET DIRECTLY TO THE TERMINAL BELOW.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                      <a 
                        href="mailto:hello@ardenvale.sh"
                        className="bg-black text-white hover:bg-[#eaeaea] hover:text-black border-2 border-black px-8 py-4 text-xs font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(100,100,100,0.5)] transition-all flex items-center gap-2"
                      >
                        <Mail className="w-4 h-4" />
                        <span>DISPATCH EMAIL</span>
                      </a>
                      <a 
                        href="https://github.com/ardenvale-fictional"
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-white text-black hover:bg-black hover:text-white border-2 border-black px-8 py-4 text-xs font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>OPEN GITHUB INDEX</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}

            </div>
          )}

        </AnimatePresence>
      </main>

      {/* ========================================== */}
      {/* BRUTALIST GRID FOOTER                      */}
      {/* ========================================== */}
      <footer className="w-full border-t-4 border-black mt-20 pt-10 px-6 md:px-12 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 uppercase text-[10px] font-black tracking-widest text-[#222]">
          
          <div className="space-y-3 border-r-0 md:border-r-2 border-black pb-6 md:pb-0 pr-0 md:pr-6">
            <span>[ SYSTEM TRANSMISSION_01 ]</span>
            <p className="leading-relaxed font-bold">
              TYPESET IN VARIABLE HIGH-CONTRAST MONOSPACED MATRICES. COMPILED ON STANDALONE DEV SERVERS.
            </p>
          </div>

          <div className="space-y-3 border-r-0 md:border-r-2 border-black pb-6 md:pb-0 pr-0 md:pr-6">
            <span>[ SYSTEM OUTBOUND_02 ]</span>
            <div className="space-y-2 font-black">
              <a href="https://github.com/ardenvale-fictional" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">GITHUB // ARDENVALE-FICTIONAL <ArrowUpRight className="w-3 h-3" /></a>
              <a href="https://linkedin.com/in/ardenvale-fictional" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">LINKEDIN // ARDENVALE-FICTIONAL <ArrowUpRight className="w-3 h-3" /></a>
              <a href="https://twitter.com/ardenvale" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">TWITTER // ARDENVALE <ArrowUpRight className="w-3 h-3" /></a>
            </div>
          </div>

          <div className="space-y-3">
            <span>[ SYSTEM LICENSING_03 ]</span>
            <p className="leading-relaxed font-bold text-zinc-500">
              LICENSED UNDER THE MIT OPEN SOURCE SCHEME. ALL DEMO ASSETS PROTECTED. COPYRIGHT 2026 ARDEN VALE.
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
};
