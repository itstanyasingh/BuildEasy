import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { TemplatePreview } from './TemplatePreview';

export interface ShowcaseTemplate {
  id: string;
  name: string;
}

const defaultShowcaseTemplates: ShowcaseTemplate[] = [
  { id: 'github-codebucks-001', name: 'CodeBucks Developer' },
  { id: 'github-folio-003', name: 'Folio Interactive' },
  { id: 'github-alex-013', name: 'Alex Editorial Bento' },
  { id: 'github-daniel-011', name: 'Daniel Cinematic' },
  { id: 'github-1hanzla100-026', name: 'Developer Showcase' },
  { id: 'github-cleanfolio-010', name: 'Cleanfolio Developer' },
  { id: 'github-bchiang7-021', name: 'Brittany Developer' },
  { id: 'github-magicui-005', name: 'MagicUI Portfolio' }
];

interface ThreePreviewShowcaseProps {
  templates?: ShowcaseTemplate[];
  onSelectTemplate: (templateId: string) => void;
}

export const ThreePreviewShowcase: React.FC<ThreePreviewShowcaseProps> = ({
  templates = defaultShowcaseTemplates,
  onSelectTemplate,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const total = templates.length;
  const leftIndex = (activeIndex - 1 + total) % total;
  const centerIndex = activeIndex;
  const rightIndex = (activeIndex + 1) % total;

  const leftTemplate = templates[leftIndex];
  const centerTemplate = templates[centerIndex];
  const rightTemplate = templates[rightIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 sm:space-y-8 select-none py-2 sm:py-4">
      {/* Minimal Unobtrusive Template Selector Tabs */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap relative z-30 px-4">
        {templates.map((t, idx) => (
          <button
            key={t.id}
            onClick={() => setActiveIndex(idx)}
            className={`px-3.5 py-1.5 rounded-xl text-xs transition-all cursor-pointer ${
              activeIndex === idx
                ? 'bg-zinc-900 text-white font-semibold shadow-xs scale-105'
                : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100/80 shadow-2xs'
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* 3-Preview Composition Container */}
      <div className="relative w-full h-[340px] sm:h-[460px] md:h-[520px] lg:h-[560px] flex items-center justify-center overflow-hidden sm:overflow-visible">
        
        {/* Navigation Arrows for Cycling */}
        <button
          onClick={handlePrev}
          className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-40 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/95 border border-zinc-200 shadow-md text-zinc-700 hover:text-zinc-900 hover:bg-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
          title="Previous Template"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-40 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/95 border border-zinc-200 shadow-md text-zinc-700 hover:text-zinc-900 hover:bg-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
          title="Next Template"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* 1. LEFT PORTFOLIO PREVIEW */}
        <div
          onClick={() => setActiveIndex(leftIndex)}
          className="hidden sm:block absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-[102%] sm:-translate-x-[108%] md:-translate-x-[112%] lg:-translate-x-[115%] w-[210px] sm:w-[310px] md:w-[400px] lg:w-[460px] h-[280px] sm:h-[380px] md:h-[450px] lg:h-[490px] rounded-2xl border border-zinc-200 bg-white shadow-xl overflow-hidden -rotate-6 sm:-rotate-6 hover:-rotate-2 transition-all duration-500 ease-out z-10 cursor-pointer group opacity-95 hover:opacity-100 hover:scale-[0.98] hover:z-30 hover:shadow-2xl"
        >
          {/* Real Live Website Render */}
          <TemplatePreview id={leftTemplate.id} />

          {/* Minimal Unobtrusive Title Tag */}
          <div className="absolute top-3.5 left-3.5 text-[11px] font-serif font-bold text-zinc-900 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-zinc-200/80 shadow-xs z-20 pointer-events-none">
            {leftTemplate.name}
          </div>

          {/* Hover Action Overlay */}
          <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-30 pointer-events-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectTemplate(leftTemplate.id);
              }}
              className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs sm:text-sm flex items-center gap-2 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 cursor-pointer"
            >
              <span>Use Template</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3. RIGHT PORTFOLIO PREVIEW */}
        <div
          onClick={() => setActiveIndex(rightIndex)}
          className="hidden sm:block absolute left-1/2 top-1/2 -translate-y-1/2 translate-x-[2%] sm:translate-x-[8%] md:translate-x-[12%] lg:translate-x-[15%] w-[210px] sm:w-[310px] md:w-[400px] lg:w-[460px] h-[280px] sm:h-[380px] md:h-[450px] lg:h-[490px] rounded-2xl border border-zinc-200 bg-white shadow-xl overflow-hidden rotate-6 sm:rotate-6 hover:rotate-2 transition-all duration-500 ease-out z-10 cursor-pointer group opacity-95 hover:opacity-100 hover:scale-[0.98] hover:z-30 hover:shadow-2xl"
        >
          {/* Real Live Website Render */}
          <TemplatePreview id={rightTemplate.id} />

          {/* Minimal Unobtrusive Title Tag */}
          <div className="absolute top-3.5 right-3.5 text-[11px] font-serif font-bold text-zinc-900 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-zinc-200/80 shadow-xs z-20 pointer-events-none">
            {rightTemplate.name}
          </div>

          {/* Hover Action Overlay */}
          <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-30 pointer-events-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectTemplate(rightTemplate.id);
              }}
              className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs sm:text-sm flex items-center gap-2 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 cursor-pointer"
            >
              <span>Use Template</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. CENTER PORTFOLIO PREVIEW (DOMINANT FRONT) */}
        <div
          onClick={() => onSelectTemplate(centerTemplate.id)}
          className="relative z-20 w-[270px] xs:w-[300px] sm:w-[360px] md:w-[460px] lg:w-[530px] h-[310px] sm:h-[420px] md:h-[490px] lg:h-[530px] rounded-2xl border border-zinc-300 bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:z-30 group cursor-pointer"
        >
          {/* Real Live Website Render */}
          <TemplatePreview id={centerTemplate.id} />

          {/* Minimal Unobtrusive Title Tag */}
          <div className="absolute top-3.5 left-3.5 text-[11px] font-serif font-bold text-zinc-900 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-zinc-200/80 shadow-xs z-20 pointer-events-none">
            {centerTemplate.name}
          </div>

          {/* Hover Action Overlay */}
          <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-30 pointer-events-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectTemplate(centerTemplate.id);
              }}
              className="px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-sm flex items-center gap-2 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 cursor-pointer"
            >
              <span>Use Template</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
