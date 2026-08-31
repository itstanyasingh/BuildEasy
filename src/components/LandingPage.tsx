import React, { useState } from 'react';
import { 
  ArrowRight, 
  Code2, 
  Layers, 
  Eye, 
  Share2, 
  Sliders, 
  Sparkles, 
  Check, 
  User, 
  FolderKanban, 
  Briefcase, 
  Award, 
  Mail, 
  BookOpen, 
  Copy, 
  Globe, 
  FileText,
  Lightbulb,
  Compass,
  Laptop,
  Github,
  Linkedin,
  FileCode,
  Layout,
  ExternalLink,
  GripVertical,
  ChevronDown,
  ChevronUp,
  Plus,
  Monitor
} from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { PortfolioTemplateCard, portfolioPresets } from './PortfolioTemplateCard';
import { MiniPortfolioPreview } from './MiniPortfolioPreviews';

interface LandingPageProps {
  onExploreTemplates: () => void;
  onOpenBuilder: () => void;
  onOpenImport: () => void;
  onSelectTemplate?: (templateId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onExploreTemplates,
  onOpenBuilder,
  onOpenImport,
  onSelectTemplate
}) => {
  const [activePresetIndex, setActivePresetIndex] = useState(0);

  const currentPreset = portfolioPresets[activePresetIndex] || portfolioPresets[0];

  const handleUseActiveTemplate = () => {
    if (onSelectTemplate) {
      onSelectTemplate(currentPreset.id);
    } else {
      onOpenBuilder();
    }
  };

  // 6 Curated Portfolio Website Templates strictly matching BuildEasy format
  const portfolioWebsiteTemplates = [
    {
      id: 'minimal',
      previewKey: 'minimal',
      name: 'Minimal Developer',
      category: 'Minimalist',
      description: 'Clean, text-first portfolio for software developers with structured project cards, tech stack breakdown, and direct contact.'
    },
    {
      id: 'creative',
      previewKey: 'creative',
      name: 'Creative Developer',
      category: 'Interactive',
      description: 'A more expressive layout for developers with strong visual projects, spatial design, and generative systems.'
    },
    {
      id: 'editorial',
      previewKey: 'editorial',
      name: 'Editorial',
      category: 'Editorial',
      description: 'Typography-focused portfolio for designers, writers, and developers featuring publication systems and curated works.'
    },
    {
      id: 'designer',
      previewKey: 'designer',
      name: 'Product Designer',
      category: 'Product Design',
      description: 'Case-study focused portfolio showcasing product workflows, design token systems, and user impact.'
    },
    {
      id: 'fullstack',
      previewKey: 'fullstack',
      name: 'Full-Stack Developer',
      category: 'Systems & Web',
      description: 'Balanced engineering portfolio highlighting distributed systems, backend architectures, and live web apps.'
    },
    {
      id: 'student',
      previewKey: 'student',
      name: 'Studio',
      category: 'Studio & Teams',
      description: 'Structured portfolio for product builders and creative teams to highlight coursework, projects, and fundamentals.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-zinc-900 font-sans selection:bg-zinc-200 selection:text-zinc-900">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (EXACT BUILDEASY COMPOSITION & TYPOGRAPHY)               */}
      {/* ========================================================================= */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-16 text-center overflow-x-clip">
        
        {/* Headline Container with Left Editorial Illustration & Right Animation */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Left Hero Lottie Animation */}
          <div className="hidden lg:flex absolute -left-12 xl:-left-20 top-1/2 -translate-y-1/2 pointer-events-none select-none items-center justify-center w-44 h-44 xl:w-56 xl:h-56">
            <DotLottieReact
              src="https://lottie.host/44eb2d76-c911-4d64-9775-e186d2bdec7b/XhDwOZ3IOO.lottie"
              loop
              autoplay
            />
          </div>

          {/* Right Hero Lottie Animation */}
          <div className="hidden lg:flex absolute -right-12 xl:-right-20 top-1/2 -translate-y-1/2 pointer-events-none select-none items-center justify-center w-44 h-44 xl:w-56 xl:h-56">
            <DotLottieReact
              src="https://lottie.host/4e648a1c-c0b3-4ae5-b9cc-053acc71df58/6PDwf2X432.lottie"
              loop
              autoplay
            />
          </div>

          {/* Centered Main Headline */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal tracking-tight leading-[1.08] text-zinc-900">
            Your experience.<br />
            Beautifully presented.
          </h1>
        </div>

        {/* Hero Description Paragraph */}
        <p className="mt-6 sm:mt-8 text-lg sm:text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed font-sans font-normal">
          Craft a portfolio that reflects your professional caliber. High-end editorial design meets intuitive building, ensuring your career history stands out with clarity and confidence.
        </p>

        {/* CTA Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <button
            onClick={onOpenBuilder}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-medium text-white bg-zinc-900 hover:bg-zinc-800 shadow-sm transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            <span>Go to Builder</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onExploreTemplates}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-medium text-zinc-800 bg-white border border-zinc-200 hover:bg-zinc-50 transition-all text-sm cursor-pointer shadow-2xs"
          >
            <span>Explore Templates</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* HERO PREVIEW COMPOSITION (CLEAN EDITORIAL PORTFOLIO PREVIEW)             */}
        {/* ========================================================================= */}
        <div className="pt-14 sm:pt-16 max-w-5xl mx-auto relative space-y-6">
          
          {/* Template Switcher Tabs */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
            {portfolioPresets.map((preset, idx) => (
              <button
                key={preset.id}
                onClick={() => setActivePresetIndex(idx)}
                className={`px-3.5 py-1.5 rounded-xl text-xs transition-all cursor-pointer ${
                  activePresetIndex === idx
                    ? 'bg-zinc-900 text-white font-semibold shadow-xs'
                    : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100/70'
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>

          {/* Clean Static Editorial Showcase Card */}
          <div className="relative pt-4 pb-4 flex items-center justify-center">
            <div className="w-full max-w-2xl transition-all duration-300">
              <PortfolioTemplateCard 
                preset={currentPreset} 
                isMain={true} 
                onUse={handleUseActiveTemplate} 
              />
            </div>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 2. TEMPLATES SECTION (EXACT EDITORIAL 3-COL GRID & CLEAN CARDS)           */}
      {/* ========================================================================= */}
      <section id="templates" className="py-24 sm:py-32 border-t border-zinc-200 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
                FEATURED TEMPLATES
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-zinc-900 leading-tight">
                Templates for every tech<br className="hidden sm:inline" /> career.
              </h2>
              <p className="text-zinc-600 text-base sm:text-lg leading-relaxed">
                Choose a professionally designed portfolio layout and make it your own. Switch anytime without losing your content.
              </p>
            </div>
            
            <button
              onClick={onExploreTemplates}
              className="px-6 py-3 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-sm font-medium text-zinc-900 flex items-center gap-2 self-start md:self-auto cursor-pointer shadow-2xs transition-colors shrink-0"
            >
              <span>Explore All Templates</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Clean 3-Column Template Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {portfolioWebsiteTemplates.map((template) => (
              <div 
                key={template.id}
                className="rounded-2xl border border-zinc-200 bg-white p-6 space-y-5 hover:border-zinc-300 transition-all flex flex-col justify-between hover:shadow-md group"
              >
                <div className="space-y-4">
                  {/* 1. Large Portfolio Preview */}
                  <div 
                    onClick={() => {
                      if (onSelectTemplate) {
                        onSelectTemplate(template.id);
                      } else {
                        onOpenBuilder();
                      }
                    }}
                    className="h-64 sm:h-72 rounded-xl border border-zinc-200 bg-[#FAF9F6] overflow-hidden relative shadow-2xs cursor-pointer"
                  >
                    <MiniPortfolioPreview id={template.previewKey} />
                  </div>

                  {/* 2. Template Name & 4. Subtle Category Label */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-serif text-xl sm:text-2xl font-normal text-zinc-900 tracking-tight">
                        {template.name}
                      </h3>
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-zinc-100 text-zinc-600 shrink-0">
                        {template.category}
                      </span>
                    </div>

                    {/* 3. One Short Description (1-2 lines) */}
                    <p className="text-zinc-600 text-sm leading-relaxed line-clamp-2">
                      {template.description}
                    </p>
                  </div>
                </div>

                {/* 5. Full-Width Black Button */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      if (onSelectTemplate) {
                        onSelectTemplate(template.id);
                      } else {
                        onOpenBuilder();
                      }
                    }}
                    className="w-full py-3 rounded-xl bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <span>Use Template</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. HOW IT WORKS SECTION (EXACT EDITORIAL STEP-BY-STEP LAYOUT)            */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="py-24 border-t border-zinc-200 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">HOW IT WORKS</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-normal text-zinc-900 leading-tight">
              How to build your portfolio in a few simple steps.
            </h2>
          </div>

          <div className="space-y-24 sm:space-y-32">
            
            {/* ==================== STEP 01: CHOOSE A TEMPLATE ==================== */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="font-mono text-sm font-bold text-zinc-400 tracking-wider">01</span>
                <h3 className="font-serif text-3xl sm:text-4xl font-normal text-zinc-900 leading-snug">
                  Choose a portfolio template
                </h3>
                <p className="text-zinc-600 text-base leading-relaxed">
                  Start with a professionally designed portfolio layout that fits your work, personality, and career.
                </p>
              </div>
              
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-200 text-xs">
                    <span className="font-mono font-semibold text-zinc-500 uppercase tracking-wider">SELECT TEMPLATE</span>
                    <span className="font-semibold text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">6 Curated Styles</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {[
                      { name: 'Minimal', author: 'Alex Morgan', active: true },
                      { name: 'Developer', author: 'David Chen', active: false },
                      { name: 'Creative', author: 'Maya Lin', active: false },
                      { name: 'Editorial', author: 'Julian Vance', active: false },
                      { name: 'Designer', author: 'Elena Rostova', active: false },
                      { name: 'Studio', author: 'Sam Rivera', active: false },
                    ].map((tpl, i) => (
                      <div 
                        key={i} 
                        className={`p-3 rounded-xl border space-y-1.5 transition-all text-left ${
                          tpl.active 
                            ? 'bg-zinc-900 text-white border-zinc-900 shadow-xs' 
                            : 'bg-zinc-50 border-zinc-200 text-zinc-900 hover:border-zinc-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-mono uppercase tracking-wider ${tpl.active ? 'text-zinc-300' : 'text-zinc-400'}`}>
                            {tpl.name}
                          </span>
                          {tpl.active && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <div className="font-serif font-bold text-xs leading-tight">
                          {tpl.author}
                        </div>
                        <div className={`text-[9px] truncate ${tpl.active ? 'text-zinc-300' : 'text-zinc-500'}`}>
                          Portfolio Layout
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs text-zinc-500">
                    <span>Switch templates anytime without losing data</span>
                    <button 
                      onClick={onOpenBuilder}
                      className="px-3.5 py-1.5 rounded-lg bg-zinc-900 text-white font-medium text-xs flex items-center gap-1.5 hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                      <span>Choose Template</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ==================== STEP 02: BUILD YOUR PORTFOLIO ==================== */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-7 order-2 lg:order-1">
                <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-200 text-xs">
                    <span className="font-mono font-semibold text-zinc-500 uppercase tracking-wider">CONTENT</span>
                    <span className="text-zinc-500 font-mono">7 Sections</span>
                  </div>

                  <div className="space-y-2">
                    {[
                      { title: 'Personal Information', status: 'Complete', count: '', icon: User, active: false },
                      { title: 'About', status: '1 section', count: '', icon: FileText, active: false },
                      { title: 'Projects', status: '6 projects', count: '', icon: FolderKanban, active: true },
                      { title: 'Experience', status: '2 roles', count: '', icon: Briefcase, active: false },
                      { title: 'Skills', status: '12 skills', count: '', icon: Code2, active: false },
                      { title: 'Education', status: '1 entry', count: '', icon: Award, active: false },
                      { title: 'Contact', status: 'Complete', count: '', icon: Mail, active: false },
                    ].map((sec, idx) => (
                      <div 
                        key={idx}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl border text-xs transition-all ${
                          sec.active 
                            ? 'bg-zinc-50 border-zinc-900 shadow-2xs' 
                            : 'bg-white border-zinc-200 hover:border-zinc-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <GripVertical className="w-3.5 h-3.5 text-zinc-400" />
                          <sec.icon className="w-3.5 h-3.5 text-zinc-600" />
                          <span className="font-medium text-zinc-900">{sec.title}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                            sec.status === 'Complete' 
                              ? 'bg-zinc-100 text-zinc-800 font-semibold' 
                              : 'text-zinc-500 bg-zinc-50'
                          }`}>
                            {sec.status}
                          </span>
                          <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 order-1 lg:order-2 space-y-4">
                <span className="font-mono text-sm font-bold text-zinc-400 tracking-wider">02</span>
                <h3 className="font-serif text-3xl sm:text-4xl font-normal text-zinc-900 leading-snug">
                  Build your portfolio
                </h3>
                <p className="text-zinc-600 text-base leading-relaxed">
                  Add your projects, experience, skills, about section, and contact details from one focused workspace.
                </p>
              </div>
            </div>

            {/* ==================== STEP 03: CUSTOMIZE & PREVIEW ==================== */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="font-mono text-sm font-bold text-zinc-400 tracking-wider">03</span>
                <h3 className="font-serif text-3xl sm:text-4xl font-normal text-zinc-900 leading-snug">
                  Customize and preview
                </h3>
                <p className="text-zinc-600 text-base leading-relaxed">
                  Adjust your portfolio's layout, typography, colors, and sections while seeing the changes instantly.
                </p>
              </div>
              
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-200 text-xs">
                    <span className="font-mono font-semibold text-zinc-500 uppercase tracking-wider">DESIGN & LAYOUT</span>
                    <span className="font-mono text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200 font-semibold">LIVE PREVIEW</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                    {/* Controls */}
                    <div className="sm:col-span-6 space-y-3 bg-zinc-50 p-3.5 rounded-xl border border-zinc-200 text-xs">
                      {/* Typography */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-zinc-400 font-semibold uppercase">TYPOGRAPHY</label>
                        <div className="grid grid-cols-2 gap-1.5">
                          <button className="py-1 px-2 rounded bg-zinc-900 text-white font-medium text-[11px]">Serif</button>
                          <button className="py-1 px-2 rounded bg-white text-zinc-700 border border-zinc-200 font-medium text-[11px]">Sans Serif</button>
                        </div>
                      </div>

                      {/* Layout */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-zinc-400 font-semibold uppercase">LAYOUT</label>
                        <div className="grid grid-cols-3 gap-1">
                          <button className="py-1 rounded bg-white border border-zinc-200 text-zinc-600 text-[10px]">Single Column</button>
                          <button className="py-1 rounded bg-zinc-900 text-white font-medium text-[10px]">Split Layout</button>
                          <button className="py-1 rounded bg-white border border-zinc-200 text-zinc-600 text-[10px]">Editorial</button>
                        </div>
                      </div>

                      {/* Accent */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-zinc-400 font-semibold uppercase">ACCENT</label>
                        <div className="grid grid-cols-3 gap-1">
                          <button className="py-1 rounded bg-zinc-900 text-white font-medium text-[10px]">Neutral</button>
                          <button className="py-1 rounded bg-white border border-zinc-200 text-zinc-600 text-[10px]">Blue</button>
                          <button className="py-1 rounded bg-white border border-zinc-200 text-zinc-600 text-[10px]">Custom</button>
                        </div>
                      </div>

                      {/* Navigation */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-zinc-400 font-semibold uppercase">NAVIGATION</label>
                        <div className="grid grid-cols-2 gap-1">
                          <button className="py-1 rounded bg-zinc-900 text-white font-medium text-[10px]">Minimal</button>
                          <button className="py-1 rounded bg-white border border-zinc-200 text-zinc-600 text-[10px]">Full</button>
                        </div>
                      </div>
                    </div>

                    {/* Realistic Preview */}
                    <div className="sm:col-span-6 bg-white p-3.5 rounded-xl border border-zinc-200 space-y-2 flex flex-col justify-between text-left">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between border-b border-zinc-100 pb-1.5">
                          <span className="font-serif font-bold text-xs text-zinc-900">Alex Morgan</span>
                          <span className="text-[9px] font-mono text-zinc-400">Work · About</span>
                        </div>
                        <div className="font-serif text-sm font-bold text-zinc-900 leading-tight">
                          Full-Stack Developer
                        </div>
                        <p className="text-[10px] text-zinc-600 leading-snug">
                          Building reliable web applications and thoughtful digital products.
                        </p>
                        <div className="p-2 rounded bg-zinc-50 border border-zinc-200 space-y-0.5">
                          <div className="font-bold text-[10px] text-zinc-900">Atlas Component Engine</div>
                          <div className="text-[9px] font-mono text-zinc-500">React · TypeScript · Node.js</div>
                        </div>
                      </div>
                      <div className="pt-1.5 border-t border-zinc-100 text-[9px] font-mono text-zinc-400 flex items-center justify-between">
                        <span>PREVIEW</span>
                        <span>build-easy.site</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ==================== STEP 04: PUBLISH YOUR PORTFOLIO ==================== */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-7 order-2 lg:order-1">
                <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm space-y-4 text-left">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-200 text-xs">
                    <span className="font-mono font-semibold text-zinc-500 uppercase tracking-wider">PORTFOLIO</span>
                    <span className="font-semibold text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">Ready to Publish</span>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-serif font-bold text-base text-zinc-900">My Portfolio</div>
                        <span className="text-[10px] font-mono font-semibold bg-zinc-200 text-zinc-800 px-2 py-0.5 rounded">
                          Configured
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 bg-white px-3 py-2 rounded-lg border border-zinc-200">
                        <Globe className="w-3.5 h-3.5 text-zinc-400" />
                        <span>build-easy.site/tanya</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <button 
                        onClick={onOpenBuilder}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-zinc-900 text-white font-medium text-xs flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer"
                      >
                        <span>Publish Portfolio</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={onOpenBuilder}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white border border-zinc-200 text-zinc-800 font-medium text-xs flex items-center justify-center gap-2 hover:bg-zinc-50 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-zinc-500" />
                        <span>Preview Portfolio</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 order-1 lg:order-2 space-y-4">
                <span className="font-mono text-sm font-bold text-zinc-400 tracking-wider">04</span>
                <h3 className="font-serif text-3xl sm:text-4xl font-normal text-zinc-900 leading-snug">
                  Publish your portfolio
                </h3>
                <p className="text-zinc-600 text-base leading-relaxed">
                  Preview your portfolio, make your final changes, and publish it when you're ready.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FEATURE SECTION ("Everything you need. Nothing you don't.")            */}
      {/* ========================================================================= */}
      <section id="features" className="py-24 border-t border-zinc-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">FEATURES</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-normal text-zinc-900 leading-tight">
              Everything you need.<br />
              Nothing you don't.
            </h2>
            <p className="text-zinc-600 text-base">
              Build, refine, and publish your portfolio from one focused workspace.
            </p>
          </div>

          <div className="space-y-16">
            
            {/* Feature Block 01 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-8 sm:p-10 rounded-2xl bg-[#FAF9F6] border border-zinc-200">
              <div className="lg:col-span-5 space-y-3">
                <span className="text-xs font-mono font-bold text-zinc-400">01</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900">
                  Build without the clutter
                </h3>
                <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                  Keep every portfolio section in one compact workspace and expand only what you're editing.
                </p>
              </div>
              <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-zinc-200 shadow-2xs space-y-2">
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider pb-1 border-b border-zinc-100">
                  PORTFOLIO SECTIONS
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {['Personal Information', 'About', 'Projects', 'Experience', 'Skills', 'Education', 'Contact'].map((item, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-800 font-medium flex items-center justify-between">
                      <span className="text-[11px]">{item}</span>
                      <Check className="w-3 h-3 text-zinc-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Feature Block 02 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-8 sm:p-10 rounded-2xl bg-[#FAF9F6] border border-zinc-200">
              <div className="lg:col-span-5 space-y-3">
                <span className="text-xs font-mono font-bold text-zinc-400">02</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900">
                  Put your work first
                </h3>
                <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                  Organize your projects into a clear story that helps people understand what you built and why it matters.
                </p>
              </div>
              <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-zinc-200 shadow-2xs space-y-2.5">
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider pb-1 border-b border-zinc-100">
                  PROJECTS
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-zinc-900 text-xs">01 · AI Coding Behaviour Analyzer</span>
                      <span className="text-[9px] font-mono text-zinc-500">Full-Stack</span>
                    </div>
                    <p className="text-[11px] text-zinc-600">Visualized developer patterns and syntax transitions across multi-session logs.</p>
                    <div className="text-[9px] font-mono text-zinc-500 pt-0.5">Tech: React · TypeScript · Node.js</div>
                  </div>

                  <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-zinc-900 text-xs">02 · Video RAG Assistant</span>
                      <span className="text-[9px] font-mono text-zinc-500">AI / ML</span>
                    </div>
                    <p className="text-[11px] text-zinc-600">Multimodal document indexing and contextual video retrieval pipeline.</p>
                    <div className="text-[9px] font-mono text-zinc-500 pt-0.5">Tech: Python · RAG · NVIDIA NIM</div>
                  </div>

                  <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-zinc-900 text-xs">03 · BuildEasy</span>
                      <span className="text-[9px] font-mono text-zinc-500">Design System</span>
                    </div>
                    <p className="text-[11px] text-zinc-600">Distraction-free portfolio generation engine with typography-first system.</p>
                    <div className="text-[9px] font-mono text-zinc-500 pt-0.5">Tech: React · TypeScript</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Block 03 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-8 sm:p-10 rounded-2xl bg-[#FAF9F6] border border-zinc-200">
              <div className="lg:col-span-5 space-y-3">
                <span className="text-xs font-mono font-bold text-zinc-400">03</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900">
                  See it as you build
                </h3>
                <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                  Your portfolio updates alongside your edits, so you always know exactly what visitors will see.
                </p>
              </div>
              <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-zinc-200 shadow-2xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 space-y-2">
                    <div className="text-[10px] font-mono text-zinc-400 uppercase font-semibold">DESIGN CONTROLS</div>
                    <div className="space-y-1">
                      <div className="text-[11px] font-medium text-zinc-800">Typography: Editorial Serif</div>
                      <div className="text-[11px] font-medium text-zinc-800">Spacing: Balanced</div>
                      <div className="text-[11px] font-medium text-zinc-800">Palette: Monochrome Neutral</div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 space-y-1.5">
                    <div className="text-[10px] font-mono text-zinc-400 uppercase font-semibold">LIVE OUTPUT</div>
                    <div className="font-serif font-bold text-zinc-900 text-xs">Alex Morgan</div>
                    <p className="text-[10px] text-zinc-600 line-clamp-2">Building reliable web applications and thoughtful digital products.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Block 04 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-8 sm:p-10 rounded-2xl bg-[#FAF9F6] border border-zinc-200">
              <div className="lg:col-span-5 space-y-3">
                <span className="text-xs font-mono font-bold text-zinc-400">04</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900">
                  Publish when you're ready
                </h3>
                <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                  Turn your finished portfolio into a polished personal website with a simple publish flow.
                </p>
              </div>
              <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-zinc-200 shadow-2xs space-y-3">
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider pb-1 border-b border-zinc-100">
                  PORTFOLIO READY
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 border border-zinc-200">
                  <div>
                    <div className="font-serif font-bold text-zinc-900 text-xs">My Portfolio</div>
                    <div className="text-[10px] font-mono text-zinc-500">tanya.build-easy.site</div>
                  </div>
                  <button 
                    onClick={onOpenBuilder}
                    className="px-3.5 py-1.5 rounded-lg bg-zinc-900 text-white font-medium text-xs flex items-center gap-1 hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    <span>Publish</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. PORTFOLIO TIPS SECTION                                                */}
      {/* ========================================================================= */}
      <section id="portfolio-tips" className="py-24 border-t border-zinc-200 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">PORTFOLIO TIPS</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-normal text-zinc-900 leading-tight">
              Best practices for a memorable portfolio.
            </h2>
            <p className="text-zinc-600 text-base">
              Key strategies from hiring managers and senior leaders on what makes a technical portfolio convert.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-8 rounded-2xl bg-white border border-zinc-200 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="text-xs font-mono font-bold text-zinc-400">TIP 01</div>
                <h3 className="font-serif text-xl font-bold text-zinc-900">Lead with outcome, not just code</h3>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  Highlight the exact problem your projects solved and the impact they created. Mention scale, latency improvements, or business outcomes.
                </p>
              </div>
              <div className="pt-4 border-t border-zinc-200 text-xs font-semibold text-zinc-900 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-zinc-700" />
                <span>Impact-Driven Storytelling</span>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-zinc-200 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="text-xs font-mono font-bold text-zinc-400">TIP 02</div>
                <h3 className="font-serif text-xl font-bold text-zinc-900">Curate 3–5 flagship works</h3>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  Quality beats quantity every time. Recruiters and hiring managers spend an average of 45 seconds reviewing candidates. Make your best work unmissable.
                </p>
              </div>
              <div className="pt-4 border-t border-zinc-200 text-xs font-semibold text-zinc-900 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-zinc-700" />
                <span>Focused Portfolio Scope</span>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-zinc-200 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="text-xs font-mono font-bold text-zinc-400">TIP 03</div>
                <h3 className="font-serif text-xl font-bold text-zinc-900">Ensure instant responsiveness</h3>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  More than 50% of recruiters review portfolios on mobile devices. BuildEasy templates guarantee fast loading and clean layout at any viewport size.
                </p>
              </div>
              <div className="pt-4 border-t border-zinc-200 text-xs font-semibold text-zinc-900 flex items-center gap-1.5">
                <Laptop className="w-4 h-4 text-zinc-700" />
                <span>Flawless Mobile Layout</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CALL TO ACTION BANNER (EXACT REFERENCE DESIGN & LOTTIE ANIMATION)     */}
      {/* ========================================================================= */}
      <section className="py-24 sm:py-32 border-t border-zinc-200 bg-[#FAF9F6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          
          {/* Exact Small Lottie Animation Above Headline */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto flex items-center justify-center pointer-events-none select-none">
            <DotLottieReact
              src="https://lottie.host/b1347271-4a89-4c5c-af78-db09b1c75f7d/qJZ4TbKIlH.lottie"
              loop
              autoplay
            />
          </div>

          {/* Large Elegant Serif Headline */}
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-zinc-900 leading-[1.12]">
            Ready to present your experience?
          </h2>

          {/* Short Centered Supporting Text */}
          <p className="text-zinc-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-sans">
            Craft a clean, distraction-free portfolio that highlights your best engineering and design work with confidence.
          </p>

          {/* Centered Black Rounded CTA Button with Arrow */}
          <div className="pt-2 flex justify-center">
            <button
              onClick={onOpenBuilder}
              className="px-8 py-3.5 rounded-xl font-medium text-white bg-zinc-900 hover:bg-zinc-800 shadow-sm transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <span>Go to Builder</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FOOTER (EDITORIAL HUMAN-DESIGNED REFERENCE MATCH)                     */}
      {/* ========================================================================= */}
      <footer className="border-t border-zinc-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          
          {/* Main Footer Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12">
            
            {/* Left Brand and Description Column */}
            <div className="md:col-span-5 lg:col-span-6 space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-sans font-bold text-xl tracking-tight text-zinc-900 leading-none">
                  BuildEasy
                </span>
                <span className="text-xs text-zinc-400 font-mono">Portfolio Builder</span>
              </div>
              <p className="text-zinc-500 text-sm max-w-sm leading-relaxed">
                A typography-first portfolio builder crafted for software engineers, product designers, and technical creators.
              </p>
            </div>

            {/* Right Navigation Columns */}
            <div className="md:col-span-7 lg:col-span-6 grid grid-cols-3 gap-8 text-xs">
              
              {/* Column 1: Templates */}
              <div className="space-y-3">
                <div className="font-mono font-semibold uppercase tracking-wider text-zinc-400 text-[11px]">
                  Templates
                </div>
                <ul className="space-y-2 text-zinc-600">
                  <li>
                    <button 
                      onClick={() => {
                        if (onSelectTemplate) onSelectTemplate('minimal');
                        else onOpenBuilder();
                      }}
                      className="hover:text-zinc-900 transition-colors cursor-pointer"
                    >
                      Minimal
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => {
                        if (onSelectTemplate) onSelectTemplate('creative');
                        else onOpenBuilder();
                      }}
                      className="hover:text-zinc-900 transition-colors cursor-pointer"
                    >
                      Creative
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => {
                        if (onSelectTemplate) onSelectTemplate('editorial');
                        else onOpenBuilder();
                      }}
                      className="hover:text-zinc-900 transition-colors cursor-pointer"
                    >
                      Editorial
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => {
                        if (onSelectTemplate) onSelectTemplate('designer');
                        else onOpenBuilder();
                      }}
                      className="hover:text-zinc-900 transition-colors cursor-pointer"
                    >
                      Designer
                    </button>
                  </li>
                </ul>
              </div>

              {/* Column 2: Product */}
              <div className="space-y-3">
                <div className="font-mono font-semibold uppercase tracking-wider text-zinc-400 text-[11px]">
                  Product
                </div>
                <ul className="space-y-2 text-zinc-600">
                  <li>
                    <button onClick={onOpenBuilder} className="hover:text-zinc-900 transition-colors cursor-pointer">
                      Portfolio Builder
                    </button>
                  </li>
                  <li>
                    <button onClick={onExploreTemplates} className="hover:text-zinc-900 transition-colors cursor-pointer">
                      Explore All
                    </button>
                  </li>
                  <li>
                    <button onClick={onOpenImport} className="hover:text-zinc-900 transition-colors cursor-pointer">
                      Import Data
                    </button>
                  </li>
                  <li>
                    <button onClick={onOpenBuilder} className="hover:text-zinc-900 transition-colors cursor-pointer">
                      Live Preview
                    </button>
                  </li>
                </ul>
              </div>

              {/* Column 3: Resources */}
              <div className="space-y-3">
                <div className="font-mono font-semibold uppercase tracking-wider text-zinc-400 text-[11px]">
                  Resources
                </div>
                <ul className="space-y-2 text-zinc-600">
                  <li>
                    <a href="#portfolio-tips" className="hover:text-zinc-900 transition-colors">
                      Portfolio Tips
                    </a>
                  </li>
                  <li>
                    <a href="#how-it-works" className="hover:text-zinc-900 transition-colors">
                      How It Works
                    </a>
                  </li>
                  <li>
                    <a href="#features" className="hover:text-zinc-900 transition-colors">
                      Features
                    </a>
                  </li>
                </ul>
              </div>

            </div>

          </div>

          {/* Thin Divider and Bottom Copyright Row */}
          <div className="border-t border-zinc-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 font-mono">
            <div>
              © {new Date().getFullYear()} BuildEasy. All rights reserved.
            </div>
            <div className="text-zinc-400 text-[11px]">
              Designed for clarity, focus, and speed.
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};
