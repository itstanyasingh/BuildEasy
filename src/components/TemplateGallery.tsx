import React, { useState, useMemo } from 'react';
import { TemplateDefinition } from '../types';
import { TemplatePreview } from './TemplatePreview';
import { getDemoDataForTemplate } from '../data/demoDataByTemplate';
import { Search, ArrowRight, Eye, X, Check } from 'lucide-react';
import { TemplateRenderer } from './templates/TemplateRenderer';
import { defaultPortfolioData } from '../data/defaultData';

interface TemplateGalleryProps {
  templates: TemplateDefinition[];
  onSelectTemplate: (templateId: string) => void;
  onPreviewTemplate: (template: TemplateDefinition) => void;
  currentTemplateId: string;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({
  templates,
  onSelectTemplate,
  currentTemplateId
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalPreviewTemplate, setModalPreviewTemplate] = useState<TemplateDefinition | null>(null);

  // Exact subtle category filters
  const categories = [
    'All',
    'Developer',
    'Interactive',
    'Minimal',
    'Creative',
    'Editorial',
    'Designer',
    'Full-Stack',
    'Studio',
    'Terminal'
  ];

  const filteredTemplates = useMemo(() => {
    return templates.filter(t => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        t.name.toLowerCase().includes(q) || 
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        (t.bestFor && t.bestFor.toLowerCase().includes(q)) ||
        t.tags.some(tag => tag.toLowerCase().includes(q));

      if (selectedCategory === 'All') return matchesSearch;

      const catLower = selectedCategory.toLowerCase();
      const matchesCat = 
        t.category.toLowerCase().includes(catLower) || 
        t.name.toLowerCase().includes(catLower) ||
        t.id.toLowerCase().includes(catLower) ||
        t.tags.some(tag => tag.toLowerCase().includes(catLower)) ||
        (t.bestFor && t.bestFor.toLowerCase().includes(catLower));

      return matchesSearch && matchesCat;
    });
  }, [templates, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-zinc-900 font-sans py-12 sm:py-16 selection:bg-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* ========================================================================= */}
        {/* HEADER SECTION (EXACT COPY & EDITORIAL TYPOGRAPHY)                       */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-200 pb-8 sm:pb-12">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
              FEATURED TEMPLATES
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-zinc-900 tracking-tight leading-tight">
              Templates for every tech<br className="hidden sm:inline" /> career.
            </h1>
            <p className="text-zinc-600 text-base sm:text-lg font-normal leading-relaxed">
              Choose a professionally designed portfolio layout and make it your own. Switch anytime without losing your content.
            </p>
          </div>

          {/* Minimal Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 text-zinc-900 shadow-2xs transition-all placeholder:text-zinc-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-zinc-400 hover:text-zinc-700 p-1 cursor-pointer"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CATEGORY FILTERS (BLACK / WHITE ONLY, NO GREEN)                           */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-zinc-900 text-white font-semibold shadow-xs'
                  : 'bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-100/80 shadow-2xs'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Count Bar */}
        <div className="flex items-center justify-between text-xs font-mono text-zinc-500 pt-1">
          <span>
            Showing <strong className="text-zinc-900 font-bold">{filteredTemplates.length}</strong> portfolio {filteredTemplates.length === 1 ? 'template' : 'templates'}
          </span>
          {selectedCategory !== 'All' && (
            <button
              onClick={() => setSelectedCategory('All')}
              className="text-zinc-900 hover:underline cursor-pointer"
            >
              Reset filter
            </button>
          )}
        </div>

        {/* ========================================================================= */}
        {/* TEMPLATE GRID (3-COL DESKTOP / 2-COL TABLET / 1-COL MOBILE)               */}
        {/* ========================================================================= */}
        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {filteredTemplates.map((template) => {
              const isSelected = template.id === currentTemplateId;
              const demoData = getDemoDataForTemplate(template.id);
              const authorName = demoData.profile.name;
              const authorTitle = demoData.profile.title;

              return (
                <div 
                  key={template.id}
                  className={`rounded-2xl border bg-white p-5 space-y-4 hover:border-zinc-400 transition-all flex flex-col justify-between hover:shadow-xl group ${
                    isSelected 
                      ? 'border-zinc-900 ring-2 ring-zinc-900/10 shadow-sm' 
                      : 'border-zinc-200/90 shadow-2xs'
                  }`}
                >
                  <div className="space-y-4">
                    {/* 1. Large Realistic Portfolio Website Preview */}
                    <div 
                      className="h-72 sm:h-80 rounded-xl border border-zinc-200 bg-zinc-950 overflow-hidden relative shadow-inner cursor-pointer group/preview"
                      onClick={() => setModalPreviewTemplate(template)}
                    >
                      <TemplatePreview id={template.id} />

                      {/* Hover Overlay with Preview Trigger */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[1.5px] z-20">
                        <span className="px-4 py-2 rounded-xl bg-white text-zinc-900 font-medium text-xs flex items-center gap-2 shadow-xl transform translate-y-1 group-hover/preview:translate-y-0 transition-transform">
                          <Eye className="w-3.5 h-3.5 text-zinc-900" />
                          <span>Full Screen Preview</span>
                        </span>
                      </div>

                      {isSelected && (
                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-zinc-900 text-white text-[10px] font-mono font-bold tracking-wider shadow z-10 flex items-center gap-1.5 border border-zinc-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          ACTIVE
                        </div>
                      )}
                    </div>

                    {/* 2. Template Info & Demo Identity */}
                    {template.id === 'paperframe-editorial' ? (
                      <div className="space-y-1 pt-1">
                        <h2 className="font-serif text-xl font-normal text-zinc-900 tracking-tight uppercase">
                          PAPERFRAME
                        </h2>
                        <p className="text-xs text-zinc-500 line-clamp-1 font-sans">
                          Editorial Portfolio
                        </p>
                      </div>
                    ) : template.id === 'maison-luxury-portfolio' ? (
                      <div className="space-y-1 pt-1">
                        <h2 className="font-serif text-xl font-normal text-zinc-900 tracking-tight uppercase">
                          MAISON
                        </h2>
                        <p className="text-xs text-zinc-500 line-clamp-1 font-sans">
                          Luxury Creative Portfolio
                        </p>
                      </div>
                    ) : template.id === 'rustfolio-brutalist' ? (
                      <div className="space-y-1 pt-1">
                        <h2 className="font-serif text-xl font-normal text-zinc-900 tracking-tight uppercase">
                          RUSTFOLIO
                        </h2>
                        <p className="text-xs text-zinc-500 line-clamp-1 font-sans">
                          Brutalist Interactive Portfolio
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-1 pt-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                            {template.category}
                          </span>
                          <span className="text-xs text-zinc-500 font-medium">
                            Demo: <strong className="text-zinc-800 font-semibold">{authorName}</strong>
                          </span>
                        </div>

                        <h2 className="font-serif text-xl font-normal text-zinc-900 tracking-tight">
                          {template.name}
                        </h2>

                        <p className="text-xs text-zinc-500 line-clamp-1 font-sans">
                          {authorTitle}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* 3. Full-Width Black CTA Button */}
                  <div className="pt-2">
                    <button
                      onClick={() => onSelectTemplate(template.id)}
                      className="w-full py-3.5 rounded-xl bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer group-hover:bg-black"
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>Active Template</span>
                        </>
                      ) : (
                        <>
                          <span>Use Template</span>
                          <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:translate-x-0.5 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-zinc-200 p-8 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-normal text-zinc-900">No matching portfolio templates found</h3>
            <p className="text-zinc-600 text-sm max-w-md mx-auto">
              We couldn't find any portfolio templates matching "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-5 py-2.5 rounded-xl bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              View All Templates
            </button>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* FULL TEMPLATE PREVIEW MODAL (CLEAN EDITORIAL DIALOG)                       */}
      {/* ========================================================================= */}
      {modalPreviewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between bg-[#FAF9F6]">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2.5">
                  <h3 className="font-serif text-lg sm:text-xl font-normal text-zinc-900">
                    {modalPreviewTemplate.name}
                  </h3>
                  <span className="text-xs font-medium px-2 py-0.5 rounded bg-zinc-200/80 text-zinc-700">
                    {modalPreviewTemplate.category}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 line-clamp-1">
                  {modalPreviewTemplate.description}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const id = modalPreviewTemplate.id;
                    setModalPreviewTemplate(null);
                    onSelectTemplate(id);
                  }}
                  className="px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-800 flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                >
                  <span>Use This Template</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setModalPreviewTemplate(null)}
                  className="p-2 rounded-xl hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Live Preview Body */}
            <div className="flex-1 overflow-y-auto bg-zinc-100 p-4 sm:p-6">
              <div className="max-w-4xl mx-auto bg-white rounded-xl shadow border border-zinc-200 overflow-hidden">
                <TemplateRenderer
                  data={getDemoDataForTemplate(modalPreviewTemplate.id)}
                  config={modalPreviewTemplate.defaultConfig}
                  rendererType={modalPreviewTemplate.rendererType}
                />
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
