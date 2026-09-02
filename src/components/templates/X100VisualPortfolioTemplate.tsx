import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioData, LayoutConfiguration } from '../../types';
import { 
  Sun, 
  Moon, 
  ArrowRight, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Camera, 
  MapPin, 
  Layers, 
  Compass, 
  Instagram, 
  Mail,
  ExternalLink
} from 'lucide-react';

interface X100VisualPortfolioTemplateProps {
  data: PortfolioData;
  config?: LayoutConfiguration;
}

interface PhotoItem {
  id: string;
  url: string;
  title: string;
  location: string;
  aperture: string;
  shutter: string;
  iso: string;
  aspect: 'portrait' | 'landscape' | 'square';
}

const COLLECTIONS_DATA: Record<string, PhotoItem[]> = {
  '01 — URBAN NIGHTS': [
    {
      id: 'un-1',
      url: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&q=80&w=1200',
      title: 'Neon Drift',
      location: 'Shinjuku, Tokyo',
      aperture: 'f/1.8',
      shutter: '1/80s',
      iso: '1600',
      aspect: 'portrait'
    },
    {
      id: 'un-2',
      url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200',
      title: 'Solitude in Blue',
      location: 'Manhattan, New York',
      aperture: 'f/2.0',
      shutter: '1/60s',
      iso: '1200',
      aspect: 'landscape'
    },
    {
      id: 'un-3',
      url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=1200',
      title: 'Chasing Sparks',
      location: 'Chongqing, China',
      aperture: 'f/1.4',
      shutter: '1/125s',
      iso: '3200',
      aspect: 'portrait'
    },
    {
      id: 'un-4',
      url: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80&w=1200',
      title: 'Golden Divide',
      location: 'London Bridge, UK',
      aperture: 'f/2.8',
      shutter: '1/50s',
      iso: '800',
      aspect: 'landscape'
    }
  ],
  '02 — TOKYO': [
    {
      id: 'tk-1',
      url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=1200',
      title: 'Tower Beacon',
      location: 'Minato, Tokyo',
      aperture: 'f/2.0',
      shutter: '1/200s',
      iso: '400',
      aspect: 'portrait'
    },
    {
      id: 'tk-2',
      url: 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&q=80&w=1200',
      title: 'Shibuya Crossing Wave',
      location: 'Shibuya, Tokyo',
      aperture: 'f/4.0',
      shutter: '1/125s',
      iso: '200',
      aspect: 'landscape'
    },
    {
      id: 'tk-3',
      url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1200',
      title: 'Yasaka Pagoda',
      location: 'Kyoto, Japan',
      aperture: 'f/5.6',
      shutter: '1/160s',
      iso: '100',
      aspect: 'portrait'
    },
    {
      id: 'tk-4',
      url: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&q=80&w=1200',
      title: 'Cherry Petal Fall',
      location: 'Meguro River, Tokyo',
      aperture: 'f/1.8',
      shutter: '1/500s',
      iso: '100',
      aspect: 'square'
    }
  ],
  '03 — ICELAND': [
    {
      id: 'ic-1',
      url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1200',
      title: 'Seljalandsfoss Flow',
      location: 'Seljalandsfoss, Iceland',
      aperture: 'f/8.0',
      shutter: '1/4s',
      iso: '50',
      aspect: 'portrait'
    },
    {
      id: 'ic-2',
      url: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=1200',
      title: 'Aurora Dance',
      location: 'Vik, Iceland',
      aperture: 'f/1.4',
      shutter: '15s',
      iso: '3200',
      aspect: 'landscape'
    },
    {
      id: 'ic-3',
      url: 'https://images.unsplash.com/photo-1504893524553-ac55fce698be?auto=format&fit=crop&q=80&w=1200',
      title: 'Basalt Sentinels',
      location: 'Reynisfjara Beach, Iceland',
      aperture: 'f/4.0',
      shutter: '1/250s',
      iso: '200',
      aspect: 'portrait'
    },
    {
      id: 'ic-4',
      url: 'https://images.unsplash.com/photo-1529963183134-61a90db47eaf?auto=format&fit=crop&q=80&w=1200',
      title: 'Vatnajökull Vault',
      location: 'Vatnajökull Glacier, Iceland',
      aperture: 'f/2.8',
      shutter: '1/160s',
      iso: '400',
      aspect: 'landscape'
    }
  ],
  '04 — MOROCCO': [
    {
      id: 'mo-1',
      url: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&q=80&w=1200',
      title: 'Ochre Courtyard',
      location: 'Marrakech, Morocco',
      aperture: 'f/4.0',
      shutter: '1/320s',
      iso: '100',
      aspect: 'portrait'
    },
    {
      id: 'mo-2',
      url: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&q=80&w=1200',
      title: 'Bazaar Weaves',
      location: 'Medina of Fez, Morocco',
      aperture: 'f/2.0',
      shutter: '1/100s',
      iso: '800',
      aspect: 'landscape'
    },
    {
      id: 'mo-3',
      url: 'https://images.unsplash.com/photo-1505993597083-3bd19f7c1f27?auto=format&fit=crop&q=80&w=1200',
      title: 'Blue Shallows',
      location: 'Chefchaouen, Morocco',
      aperture: 'f/2.8',
      shutter: '1/160s',
      iso: '200',
      aspect: 'portrait'
    },
    {
      id: 'mo-4',
      url: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=1200',
      title: 'Sahara Ridge',
      location: 'Merzouga, Morocco',
      aperture: 'f/5.6',
      shutter: '1/400s',
      iso: '100',
      aspect: 'landscape'
    }
  ],
  '05 — NEW ZEALAND': [
    {
      id: 'nz-1',
      url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1200',
      title: 'Southern Peak Glow',
      location: 'Mount Cook, New Zealand',
      aperture: 'f/8.0',
      shutter: '1/250s',
      iso: '100',
      aspect: 'portrait'
    },
    {
      id: 'nz-2',
      url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=1200',
      title: 'Canopy Pathway',
      location: 'Fiordland National Park',
      aperture: 'f/2.8',
      shutter: '1/125s',
      iso: '400',
      aspect: 'landscape'
    },
    {
      id: 'nz-3',
      url: 'https://images.unsplash.com/photo-1472214222541-d510753a8707?auto=format&fit=crop&q=80&w=1200',
      title: 'Valley Reverie',
      location: 'Wanaka, New Zealand',
      aperture: 'f/4.0',
      shutter: '1/320s',
      iso: '100',
      aspect: 'portrait'
    },
    {
      id: 'nz-4',
      url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1200',
      title: 'Milford Spires',
      location: 'Milford Sound, New Zealand',
      aperture: 'f/5.6',
      shutter: '1/200s',
      iso: '100',
      aspect: 'landscape'
    }
  ],
  '06 — QUIET PLACES': [
    {
      id: 'qp-1',
      url: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=1200',
      title: 'Solitary Beam',
      location: 'Yosemite, USA',
      aperture: 'f/2.8',
      shutter: '1/160s',
      iso: '200',
      aspect: 'portrait'
    },
    {
      id: 'qp-2',
      url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200',
      title: 'Mist Pathway',
      location: 'Redwoods National Park, USA',
      aperture: 'f/4.0',
      shutter: '1/80s',
      iso: '400',
      aspect: 'landscape'
    },
    {
      id: 'qp-3',
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200',
      title: 'Sands of Dawn',
      location: 'Kona, Hawaii',
      aperture: 'f/5.6',
      shutter: '1/500s',
      iso: '100',
      aspect: 'portrait'
    },
    {
      id: 'qp-4',
      url: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=1200',
      title: 'Pine Silence',
      location: 'Black Forest, Germany',
      aperture: 'f/4.0',
      shutter: '1/125s',
      iso: '200',
      aspect: 'landscape'
    }
  ]
};

export const X100VisualPortfolioTemplate: React.FC<X100VisualPortfolioTemplateProps> = ({ data, config }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeCollection, setActiveCollection] = useState<string>('01 — URBAN NIGHTS');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  
  // Custom cursor position state
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHoveredOverInteractive, setIsHoveredOverInteractive] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // References for sections
  const workRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Check if touch device
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
  }, []);

  // Sync cursor positioning
  useEffect(() => {
    if (isTouchDevice) return;
    const updateMouse = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMouse);
    return () => window.removeEventListener('mousemove', updateMouse);
  }, [isTouchDevice]);

  // Scroll to section helper
  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activePhotos = COLLECTIONS_DATA[activeCollection] || [];

  // Toggle theme
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') setSelectedPhotoIndex(null);
      if (e.key === 'ArrowRight') {
        setSelectedPhotoIndex(prev => (prev !== null && prev < activePhotos.length - 1) ? prev + 1 : 0);
      }
      if (e.key === 'ArrowLeft') {
        setSelectedPhotoIndex(prev => (prev !== null && prev > 0) ? prev - 1 : activePhotos.length - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, activePhotos]);

  // Custom theme colors matching X100 aesthetic
  const themeClasses = theme === 'dark' 
    ? 'bg-[#0b0c0e] text-[#f4f5f6]' 
    : 'bg-[#fafaf9] text-[#1c1d1f]';

  const secondaryTextClass = theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500';
  const borderClass = theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200';
  const cardBgClass = theme === 'dark' ? 'bg-[#15171a]' : 'bg-white';

  return (
    <div className={`w-full min-h-screen ${themeClasses} font-sans selection:bg-zinc-500 selection:text-white transition-colors duration-500 relative pb-24`}>
      
      {/* ========================================== */}
      {/* CUSTOM PERFORMANT CURSOR                   */}
      {/* ========================================== */}
      {!isTouchDevice && (
        <div 
          className={`fixed pointer-events-none z-[9999] transition-transform duration-150 ease-out -translate-x-1/2 -translate-y-1/2 rounded-full border border-current mix-blend-difference ${
            isHoveredOverInteractive 
              ? 'w-10 h-10 bg-white border-white scale-110' 
              : 'w-4 h-4 bg-transparent'
          }`}
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`
          }}
        />
      )}

      {/* ========================================== */}
      {/* EDITORIAL NAVIGATION BAR                   */}
      {/* ========================================== */}
      <header className={`w-full py-6 px-6 sm:px-12 flex items-center justify-between border-b ${borderClass} sticky top-0 backdrop-blur-md bg-opacity-70 z-50 transition-colors`}>
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          onMouseEnter={() => setIsHoveredOverInteractive(true)}
          onMouseLeave={() => setIsHoveredOverInteractive(false)}
          className="text-lg tracking-[0.15em] font-serif font-black uppercase cursor-pointer"
        >
          ELARA MONROE
        </div>

        <nav className="flex items-center gap-6 sm:gap-10 text-xs tracking-[0.2em] font-bold uppercase">
          <button 
            onClick={() => scrollTo(workRef)}
            onMouseEnter={() => setIsHoveredOverInteractive(true)}
            onMouseLeave={() => setIsHoveredOverInteractive(false)}
            className="hover:opacity-70 transition-opacity"
          >
            WORK
          </button>
          <button 
            onClick={() => scrollTo(aboutRef)}
            onMouseEnter={() => setIsHoveredOverInteractive(true)}
            onMouseLeave={() => setIsHoveredOverInteractive(false)}
            className="hover:opacity-70 transition-opacity"
          >
            ABOUT
          </button>
          <button 
            onClick={() => scrollTo(contactRef)}
            onMouseEnter={() => setIsHoveredOverInteractive(true)}
            onMouseLeave={() => setIsHoveredOverInteractive(false)}
            className="hover:opacity-70 transition-opacity"
          >
            CONTACT
          </button>

          <button 
            onClick={toggleTheme}
            onMouseEnter={() => setIsHoveredOverInteractive(true)}
            onMouseLeave={() => setIsHoveredOverInteractive(false)}
            className={`p-2 rounded-full border ${borderClass} hover:bg-current hover:text-black/10 transition-all cursor-pointer`}
            title={theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </nav>
      </header>

      {/* ========================================== */}
      {/* EDITORIAL HERO SECTION                    */}
      {/* ========================================== */}
      <section className="px-6 sm:px-12 pt-12 pb-20 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-7xl mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <span className="text-[10px] tracking-[0.3em] font-black uppercase text-zinc-500 block">VISUAL STORYTELLER / PHOTOGRAPHER</span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black tracking-tight leading-none uppercase">
            ELARA<br />MONROE
          </h1>
          <p className="text-sm md:text-base leading-relaxed max-w-md font-sans font-light">
            An editorial photographer mapping the poetic stillness of human space. Documenting cities, wild terrains, and silent atmospheres in rich, high-fidelity color spectrums.
          </p>
          <div className="pt-4 flex items-center gap-4">
            <button 
              onClick={() => scrollTo(workRef)}
              onMouseEnter={() => setIsHoveredOverInteractive(true)}
              onMouseLeave={() => setIsHoveredOverInteractive(false)}
              className="px-6 py-3 border-2 border-current hover:bg-current hover:text-black/10 text-xs tracking-widest font-black uppercase transition-all flex items-center gap-2"
            >
              <span>EXPLORE WORK</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Big high contrast hero photograph (Original Rich Colors) */}
        <div className="lg:col-span-7 w-full h-[350px] sm:h-[500px] border border-current shadow-lg overflow-hidden relative group">
          <img 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1600" 
            alt="Hero Visual Direction" 
            className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none" />
          <div className="absolute bottom-4 left-4 text-white text-xs tracking-widest uppercase font-mono bg-black/40 px-3 py-1.5 backdrop-blur-sm">
            00 — VISUAL ENTRANCE / ICELANDIC PEAKS
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* COLLECTION DIRECTORY SWITCHER (X100 SOUL)  */}
      {/* ========================================== */}
      <section ref={workRef} className={`w-full py-16 border-t border-b ${borderClass} px-6 sm:px-12`}>
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 border-zinc-700/20">
            <h2 className="text-xl tracking-[0.2em] font-serif font-black uppercase">VISUAL SERIES INDEX</h2>
            <p className="text-xs tracking-widest uppercase text-zinc-500 font-bold">SELECT TELEMETRY INDEX PROTOCOL</p>
          </div>

          <div className="flex flex-wrap gap-3 sm:gap-4 justify-start">
            {Object.keys(COLLECTIONS_DATA).map(collectionName => {
              const isActive = activeCollection === collectionName;
              return (
                <button
                  key={collectionName}
                  onClick={() => {
                    setActiveCollection(collectionName);
                    setSelectedPhotoIndex(null);
                  }}
                  onMouseEnter={() => setIsHoveredOverInteractive(true)}
                  onMouseLeave={() => setIsHoveredOverInteractive(false)}
                  className={`px-5 py-3 text-xs tracking-[0.15em] font-black uppercase transition-all duration-300 relative border ${
                    isActive 
                      ? 'border-current bg-current text-black/10 scale-105 shadow-md' 
                      : `border-transparent hover:border-zinc-500 ${theme === 'dark' ? 'hover:bg-zinc-900' : 'hover:bg-zinc-100'}`
                  }`}
                >
                  {collectionName}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* MASONRY GALLERY (ACTUAL MASONRY COLUMNS)   */}
      {/* ========================================== */}
      <section className="px-6 sm:px-12 py-16 max-w-7xl mx-auto space-y-12">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] tracking-widest uppercase text-zinc-500 font-black">CURRENT DISPLAY PORTFOLIO</span>
            <h3 className="text-2xl font-serif font-black tracking-tight uppercase">{activeCollection}</h3>
          </div>
          <span className="text-xs font-mono tracking-widest text-zinc-400">
            [{activePhotos.length} EXPOSURES DISPATCHED]
          </span>
        </div>

        {/* Real responsive masonry columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {activePhotos.map((photo, index) => {
            return (
              <div 
                key={photo.id}
                onClick={() => setSelectedPhotoIndex(index)}
                onMouseEnter={() => setIsHoveredOverInteractive(true)}
                onMouseLeave={() => setIsHoveredOverInteractive(false)}
                className="break-inside-avoid relative overflow-hidden group cursor-pointer border border-current shadow-sm hover:shadow-xl transition-all duration-500 mb-6 block"
              >
                {/* Photo Element */}
                <div className="w-full h-auto overflow-hidden bg-zinc-900">
                  <img 
                    src={photo.url} 
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Info Overlay Panel */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <div className="space-y-1.5 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-[9px] tracking-widest uppercase font-mono flex items-center gap-1 text-zinc-400">
                      <MapPin className="w-3 h-3 text-red-400" />
                      {photo.location}
                    </span>
                    <h4 className="text-sm font-serif font-bold uppercase tracking-wider">{photo.title}</h4>
                    <div className="h-px bg-white/20 w-full pt-1" />
                    <div className="flex items-center gap-3 text-[9px] font-mono text-zinc-300">
                      <span>{photo.aperture}</span>
                      <span>{photo.shutter}</span>
                      <span>ISO {photo.iso}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================== */}
      {/* EDITORIAL ABOUT / PHILOSOPHY              */}
      {/* ========================================== */}
      <section ref={aboutRef} className={`py-20 border-t ${borderClass} px-6 sm:px-12`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[10px] tracking-[0.3em] font-black uppercase text-zinc-500 block">PHILOSOPHY & VISION</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black uppercase tracking-tight leading-none">
              THE ART OF<br />STILLNESS
            </h2>
            <div className="h-1 w-16 bg-current mt-4" />
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm md:text-base leading-relaxed font-light">
            <p className="font-sans text-zinc-700 dark:text-zinc-300">
              For Elara Monroe, photography is not about capturing swift action, but discovering the structural silent moments that define a landscape or city. Every image operates as an editorial chapter, focusing on typographic geometry, natural color calibration, and spacious compositions.
            </p>
            <p className="font-sans text-zinc-700 dark:text-zinc-300">
              By working with medium-format cameras and strictly original high-fidelity color profiles, her collections document places and societies as they are: vibrant, quiet, and timeless. From the neon-lit alleyways of Shinjuku to the glacial ice tunnels of Vatnajökull.
            </p>
          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* EDITORIAL CONTACT AND CHANNELS             */}
      {/* ========================================== */}
      <section ref={contactRef} className={`py-20 border-t border-b ${borderClass} px-6 sm:px-12 bg-opacity-30`}>
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <span className="text-[10px] tracking-[0.4em] font-black uppercase text-zinc-500 block">SECURE TELEMETRY CHANNELS</span>
          <h2 className="text-4xl sm:text-6xl font-serif font-black uppercase tracking-tight">INBOUND TRANSMISSION</h2>
          <p className="text-sm font-sans font-light max-w-xl mx-auto leading-relaxed">
            Have an upcoming editorial commission, commercial visual-direction assignment, or want to collaborate on a physical exhibition? Dispatch a communication below.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <a 
              href="mailto:hello@elaramonroe.com"
              onMouseEnter={() => setIsHoveredOverInteractive(true)}
              onMouseLeave={() => setIsHoveredOverInteractive(false)}
              className="px-8 py-3.5 bg-current text-black/10 hover:opacity-85 text-xs tracking-widest font-black uppercase flex items-center gap-2.5 shadow-md"
            >
              <Mail className="w-4 h-4" />
              <span>EMAIL TRANSMISSION</span>
            </a>
            
            <a 
              href="https://instagram.com/elara.monroe.visuals"
              target="_blank" 
              rel="noopener noreferrer"
              onMouseEnter={() => setIsHoveredOverInteractive(true)}
              onMouseLeave={() => setIsHoveredOverInteractive(false)}
              className="px-8 py-3.5 border border-current hover:bg-current hover:text-black/10 text-xs tracking-widest font-black uppercase flex items-center gap-2.5"
            >
              <Instagram className="w-4 h-4" />
              <span>INSTAGRAM</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* IMAGE DETAIL VIEW / LIGHTBOX               */}
      {/* ========================================== */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#000]/98 z-[10000] flex flex-col items-center justify-between p-4 sm:p-8 select-none"
          >
            {/* Lightbox Header Controls */}
            <div className="w-full flex items-center justify-between text-white/75 text-xs font-mono tracking-widest uppercase">
              <span>EXPOSURE {selectedPhotoIndex + 1} OF {activePhotos.length}</span>
              <button 
                onClick={() => setSelectedPhotoIndex(null)}
                onMouseEnter={() => setIsHoveredOverInteractive(true)}
                onMouseLeave={() => setIsHoveredOverInteractive(false)}
                className="p-2 border border-white/20 hover:border-white hover:text-white transition-all cursor-pointer rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Lightbox Frame with navigation buttons */}
            <div className="flex-1 w-full flex items-center justify-between gap-4 max-w-6xl relative my-4">
              
              {/* Prev Trigger */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPhotoIndex(prev => (prev !== null && prev > 0) ? prev - 1 : activePhotos.length - 1);
                }}
                onMouseEnter={() => setIsHoveredOverInteractive(true)}
                onMouseLeave={() => setIsHoveredOverInteractive(false)}
                className="p-3 border border-white/10 hover:border-white hover:bg-white/10 text-white transition-all cursor-pointer rounded-full"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Main Image View */}
              <div className="flex-1 h-full max-h-[70vh] flex items-center justify-center relative overflow-hidden">
                <motion.img 
                  key={selectedPhotoIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  src={activePhotos[selectedPhotoIndex].url} 
                  alt={activePhotos[selectedPhotoIndex].title}
                  className="max-w-full max-h-full object-contain border border-white/10"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Next Trigger */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPhotoIndex(prev => (prev !== null && prev < activePhotos.length - 1) ? prev + 1 : 0);
                }}
                onMouseEnter={() => setIsHoveredOverInteractive(true)}
                onMouseLeave={() => setIsHoveredOverInteractive(false)}
                className="p-3 border border-white/10 hover:border-white hover:bg-white/10 text-white transition-all cursor-pointer rounded-full"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

            </div>

            {/* Lightbox Footer specifications */}
            <div className="w-full max-w-4xl text-center sm:text-left grid grid-cols-1 sm:grid-cols-12 gap-4 items-center justify-between text-white/90 pb-2">
              <div className="sm:col-span-8 space-y-1">
                <span className="text-[10px] tracking-widest uppercase text-zinc-500 font-bold block flex items-center justify-center sm:justify-start gap-1">
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  {activePhotos[selectedPhotoIndex].location}
                </span>
                <h4 className="text-xl font-serif font-black uppercase tracking-wider">
                  {activePhotos[selectedPhotoIndex].title}
                </h4>
              </div>

              <div className="sm:col-span-4 flex items-center justify-center sm:justify-end gap-6 text-xs font-mono text-zinc-400">
                <div className="flex flex-col items-center sm:items-end">
                  <span className="text-[8px] tracking-widest text-zinc-600 block uppercase font-bold">APERTURE</span>
                  <span>{activePhotos[selectedPhotoIndex].aperture}</span>
                </div>
                <div className="flex flex-col items-center sm:items-end">
                  <span className="text-[8px] tracking-widest text-zinc-600 block uppercase font-bold">SHUTTER</span>
                  <span>{activePhotos[selectedPhotoIndex].shutter}</span>
                </div>
                <div className="flex flex-col items-center sm:items-end">
                  <span className="text-[8px] tracking-widest text-zinc-600 block uppercase font-bold">ISO</span>
                  <span>{activePhotos[selectedPhotoIndex].iso}</span>
                </div>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
