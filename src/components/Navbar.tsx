import React, { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentView: 'landing' | 'gallery' | 'builder' | 'dash' | 'published';
  onNavigate: (view: 'landing' | 'gallery' | 'builder' | 'dash') => void;
  onOpenImport?: () => void;
  onNewPortfolio?: () => void;
  portfolioCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (currentView === 'published') return null;

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (currentView !== 'landing') {
      onNavigate('landing');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-zinc-200">
      <div className="w-full px-6 sm:px-8 lg:px-10 h-16 flex items-center justify-between relative">
        
        {/* LEFT: Exact BuildEasy Wordmark matching reference */}
        <div className="flex items-center">
          <button 
            onClick={() => {
              onNavigate('landing');
              setMobileMenuOpen(false);
            }}
            className="flex items-center text-left focus:outline-none cursor-pointer group"
          >
            <span className="font-sans font-bold text-2xl sm:text-[25px] tracking-tight text-zinc-900 leading-none select-none">
              BuildEasy
            </span>
          </button>
        </div>

        {/* CENTER: Exact Navigation Links (Centered in Header) */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-8 absolute left-1/2 -translate-x-1/2">
          <button
            onClick={() => onNavigate('builder')}
            className={`text-sm font-medium transition-colors cursor-pointer ${
              currentView === 'builder' 
                ? 'text-zinc-900 font-semibold' 
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Portfolio Builder
          </button>
          
          <button
            onClick={() => onNavigate('gallery')}
            className={`text-sm font-medium transition-colors cursor-pointer ${
              currentView === 'gallery' 
                ? 'text-zinc-900 font-semibold' 
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Templates
          </button>

          <button
            onClick={() => scrollToSection('how-it-works')}
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer"
          >
            How It Works
          </button>

          <button
            onClick={() => scrollToSection('features')}
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer"
          >
            Features
          </button>

          <button
            onClick={() => scrollToSection('portfolio-tips')}
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer"
          >
            Portfolio Tips
          </button>
        </nav>

        {/* RIGHT: Go to Builder Button */}
        <div className="hidden md:flex items-center">
          <button
            onClick={() => onNavigate('builder')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <span>Go to Builder</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => onNavigate('builder')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 text-white hover:bg-zinc-800 transition-all cursor-pointer"
          >
            <span>Builder</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Responsive Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-white px-6 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3">
            <button
              onClick={() => {
                onNavigate('builder');
                setMobileMenuOpen(false);
              }}
              className="text-left text-sm font-medium text-zinc-800 hover:text-zinc-900 py-1.5"
            >
              Portfolio Builder
            </button>
            <button
              onClick={() => {
                onNavigate('gallery');
                setMobileMenuOpen(false);
              }}
              className="text-left text-sm font-medium text-zinc-800 hover:text-zinc-900 py-1.5"
            >
              Templates
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-left text-sm font-medium text-zinc-800 hover:text-zinc-900 py-1.5"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-left text-sm font-medium text-zinc-800 hover:text-zinc-900 py-1.5"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('portfolio-tips')}
              className="text-left text-sm font-medium text-zinc-800 hover:text-zinc-900 py-1.5"
            >
              Portfolio Tips
            </button>
            <div className="pt-2 border-t border-zinc-100">
              <button
                onClick={() => {
                  onNavigate('builder');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 px-4 rounded-lg bg-zinc-900 text-white text-sm font-medium flex items-center justify-center gap-2 hover:bg-zinc-800"
              >
                <span>Go to Builder</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
