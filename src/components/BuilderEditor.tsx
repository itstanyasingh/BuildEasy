import React, { useState, useEffect, useRef } from 'react';
import { UserPortfolio, TemplateDefinition, PortfolioData, SectionKey } from '../types';
import { TemplateRenderer } from './templates/TemplateRenderer';
import { 
  Monitor, Tablet, Smartphone, 
  FileText, Briefcase, Star, Code, GraduationCap, 
  Layers, Palette, Plus, Trash2, ArrowRight, ArrowUp, ArrowDown,
  ChevronRight, GripVertical, User, Sparkles, FolderGit2, Wrench,
  CheckCircle2, ExternalLink, Undo2, Redo2, EyeOff, Eye
} from 'lucide-react';

interface ImageSelectorProps {
  label: string;
  currentValue: string;
  onChange: (value: string) => void;
  defaultValue: string;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ label, currentValue, onChange, defaultValue }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2 text-xs">
      <label className="block text-zinc-500 font-medium">{label}</label>
      <div className="flex items-center gap-4 p-3 rounded-xl border border-zinc-200 bg-white shadow-2xs">
        {currentValue ? (
          <img
            src={currentValue}
            alt="Preview"
            className="w-12 h-12 rounded-lg object-cover border border-zinc-200 shrink-0"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-12 h-12 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-400 font-medium shrink-0">
            None
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 rounded-lg bg-zinc-950 text-white hover:bg-zinc-800 text-[11px] font-medium transition-colors cursor-pointer"
          >
            Replace
          </button>
          {currentValue && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="px-3 py-1.5 rounded-lg border border-zinc-200 text-zinc-600 hover:text-zinc-900 text-[11px] font-medium transition-colors cursor-pointer"
            >
              Remove
            </button>
          )}
          {currentValue !== defaultValue && (
            <button
              type="button"
              onClick={() => onChange(defaultValue)}
              className="px-3 py-1.5 rounded-lg border border-zinc-200 text-zinc-600 hover:text-zinc-900 text-[11px] font-medium transition-colors cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
};

interface BuilderEditorProps {
  portfolio: UserPortfolio;
  templates: TemplateDefinition[];
  onUpdatePortfolio: (updated: UserPortfolio) => void;
  onOpenPublish: () => void;
  onOpenTemplateGallery: () => void;
  saveStatus?: 'saved' | 'saving' | 'failed' | 'offline';
  onFlushSave?: () => void;
}

const SECTION_DISPLAY_NAMES: Record<string, string> = {
  projects: 'Projects',
  profile: 'Personal Information',
  education: 'Education',
  experience: 'Work Experience',
  skills: 'Skills',
  certifications: 'Certifications'
};

export const BuilderEditor: React.FC<BuilderEditorProps> = ({
  portfolio,
  templates,
  onUpdatePortfolio,
  onOpenPublish,
  onOpenTemplateGallery,
  saveStatus = 'saved',
  onFlushSave
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'design'>('content');
  const [mobileActiveView, setMobileActiveView] = useState<'editor' | 'preview'>('editor');
  const [expandedSection, setExpandedSection] = useState<string | null>('projects');
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Undo/Redo History states
  const [history, setHistory] = useState<UserPortfolio[]>([portfolio]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  useEffect(() => {
    // If we switched to a different portfolio, reset history stack
    if (history.length === 0 || history[0].id !== portfolio.id) {
      setHistory([portfolio]);
      setHistoryIndex(0);
      return;
    }

    // Check if the current prop differs from history state
    const currentItem = history[historyIndex];
    if (currentItem && JSON.stringify(currentItem) === JSON.stringify(portfolio)) {
      return;
    }

    // New edit from the user: append and advance pointer
    const nextHistory = history.slice(0, historyIndex + 1);
    nextHistory.push(portfolio);

    if (nextHistory.length > 50) {
      nextHistory.shift();
    }

    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
  }, [portfolio]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const handleUndo = () => {
    if (!canUndo) return;
    const nextIdx = historyIndex - 1;
    setHistoryIndex(nextIdx);
    onUpdatePortfolio(history[nextIdx]);
  };

  const handleRedo = () => {
    if (!canRedo) return;
    const nextIdx = historyIndex + 1;
    setHistoryIndex(nextIdx);
    onUpdatePortfolio(history[nextIdx]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMod = e.metaKey || e.ctrlKey;
      if (isMod && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      } else if (isMod && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        handleRedo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [history, historyIndex, canUndo, canRedo]);

  const currentTemplate = templates.find(t => t.id === portfolio.templateId) || templates[0];
  const data = portfolio.data;
  const config = portfolio.customizer;

  const sectionOrder = config.sectionOrder || [
    'projects',
    'profile',
    'education',
    'experience',
    'skills',
    'certifications'
  ];

  const hiddenSections = config.hiddenSections || [];
  const visibleSections = sectionOrder.filter(key => !hiddenSections.includes(key));

  const updateData = (updater: (prevData: PortfolioData) => PortfolioData) => {
    onUpdatePortfolio({
      ...portfolio,
      data: updater(data),
      updatedAt: new Date().toISOString().split('T')[0]
    });
  };

  const updateConfig = (updater: (prevConfig: typeof config) => typeof config) => {
    onUpdatePortfolio({
      ...portfolio,
      customizer: updater(config),
      updatedAt: new Date().toISOString().split('T')[0]
    });
  };

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  const jumpToSection = (id: string) => {
    setExpandedSection(id);
    setActiveTab('content');
    setTimeout(() => {
      const el = document.getElementById(`section-${id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const moveSection = (index: number, direction: 'up' | 'down', e: React.MouseEvent) => {
    e.stopPropagation();
    const hiddenSections = config.hiddenSections || [];
    const visibleSections = sectionOrder.filter(key => !hiddenSections.includes(key));
    
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === visibleSections.length - 1) return;
    
    const currentKey = visibleSections[index];
    const siblingKey = visibleSections[direction === 'up' ? index - 1 : index + 1];
    
    // Find their positions in the full sectionOrder
    const currentFullIdx = sectionOrder.indexOf(currentKey);
    const siblingFullIdx = sectionOrder.indexOf(siblingKey);
    
    if (currentFullIdx === -1 || siblingFullIdx === -1) return;
    
    const nextOrder = [...sectionOrder];
    nextOrder[currentFullIdx] = siblingKey;
    nextOrder[siblingFullIdx] = currentKey;
    
    updateConfig(prev => ({
      ...prev,
      sectionOrder: nextOrder
    }));
  };

  const renderRightControls = (key: string, isExpanded: boolean, idx: number, totalVisible: number) => {
    return (
      <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={(e) => moveSection(idx, 'up', e)}
          disabled={idx === 0}
          className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          title="Move Up"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={(e) => moveSection(idx, 'down', e)}
          disabled={idx === totalVisible - 1}
          className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          title="Move Down"
        >
          <ArrowDown className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            updateConfig(prev => ({
              ...prev,
              hiddenSections: [...(prev.hiddenSections || []), key]
            }));
          }}
          className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
          title="Hide Section"
        >
          <EyeOff className="w-4 h-4" />
        </button>
        <div className="w-px h-5 bg-zinc-200 mx-1.5" />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleSection(key);
          }}
          className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
        >
          <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90 text-zinc-900' : ''}`} />
        </button>
      </div>
    );
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row overflow-hidden bg-[#FAF9F6] font-sans">
      
      {/* ========================================================================= */}
      {/* MOBILE SUB-NAV: TOGGLE BETWEEN EDIT FORM & LIVE PREVIEW (VISIBLE < md)    */}
      {/* ========================================================================= */}
      <div className="md:hidden border-b border-zinc-200 bg-white px-3.5 py-2.5 flex items-center justify-between gap-2 shrink-0 shadow-2xs z-30">
        <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setMobileActiveView('editor')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              mobileActiveView === 'editor'
                ? 'bg-white text-zinc-900 shadow-xs'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Editor</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileActiveView('preview');
              setDeviceMode('mobile');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              mobileActiveView === 'preview'
                ? 'bg-white text-zinc-900 shadow-xs'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {mobileActiveView === 'preview' && (
            <div className="flex items-center gap-0.5 bg-zinc-100 p-1 rounded-lg border border-zinc-200">
              <button
                type="button"
                onClick={handleUndo}
                disabled={!canUndo}
                className="w-6 h-6 rounded flex items-center justify-center text-zinc-600 disabled:opacity-30 transition-colors"
                title="Undo"
              >
                <Undo2 className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={handleRedo}
                disabled={!canRedo}
                className="w-6 h-6 rounded flex items-center justify-center text-zinc-600 disabled:opacity-30 transition-colors"
                title="Redo"
              >
                <Redo2 className="w-3 h-3" />
              </button>
            </div>
          )}
          <button
            type="button"
            onClick={onOpenPublish}
            className="px-3 py-1.5 rounded-lg bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 transition-all flex items-center gap-1 shadow-xs cursor-pointer"
          >
            <span>Publish</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LEFT SIDEBAR (EXACT MATCH TO BUILDEASY RESUME BUILDER REFERENCE)           */}
      {/* ========================================================================= */}
      <div className={`${mobileActiveView === 'editor' ? 'flex' : 'hidden'} md:flex w-full md:w-[490px] lg:w-[530px] xl:w-[560px] bg-[#FAF9F6] border-r border-zinc-200 flex-col flex-1 min-h-0 md:h-full shrink-0 relative`}>
        
        {/* TOP BAR: TABS & JUMP TO NAVIGATION */}
        <div className="border-b border-zinc-200/90 bg-white px-5 sm:px-6 pt-4 pb-3 space-y-3 shrink-0 shadow-2xs">
          
          {/* Main Top Switcher: Content / Design & Layout */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('content')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'content'
                  ? 'bg-white text-zinc-900 border border-zinc-200 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-zinc-700" />
              <span>Content</span>
            </button>
            <button
              onClick={() => setActiveTab('design')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'design'
                  ? 'bg-white text-zinc-900 border border-zinc-200 shadow-xs font-semibold'
                  : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-zinc-500" />
              <span>Design & Layout</span>
            </button>
          </div>

          {/* JUMP TO HORIZONTAL QUICK NAVIGATION */}
          {activeTab === 'content' && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 shrink-0">
                JUMP TO:
              </span>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => jumpToSection('projects')}
                  className="px-3 py-1 rounded-lg bg-zinc-100/90 hover:bg-zinc-200/80 text-xs font-medium text-zinc-700 whitespace-nowrap transition-colors cursor-pointer"
                >
                  Projects
                </button>
                <button
                  onClick={() => jumpToSection('profile')}
                  className="px-3 py-1 rounded-lg bg-zinc-100/90 hover:bg-zinc-200/80 text-xs font-medium text-zinc-700 whitespace-nowrap transition-colors cursor-pointer"
                >
                  Personal Information
                </button>
                <button
                  onClick={() => jumpToSection('education')}
                  className="px-3 py-1 rounded-lg bg-zinc-100/90 hover:bg-zinc-200/80 text-xs font-medium text-zinc-700 whitespace-nowrap transition-colors cursor-pointer"
                >
                  Education
                </button>
                <button
                  onClick={() => jumpToSection('experience')}
                  className="px-3 py-1 rounded-lg bg-zinc-100/90 hover:bg-zinc-200/80 text-xs font-medium text-zinc-700 whitespace-nowrap transition-colors cursor-pointer"
                >
                  Work Experience
                </button>
                <button
                  onClick={() => jumpToSection('skills')}
                  className="px-3 py-1 rounded-lg bg-zinc-100/90 hover:bg-zinc-200/80 text-xs font-medium text-zinc-700 whitespace-nowrap transition-colors cursor-pointer"
                >
                  Skills
                </button>
                <button
                  onClick={() => jumpToSection('certifications')}
                  className="px-3 py-1 rounded-lg bg-zinc-100/90 hover:bg-zinc-200/80 text-xs font-medium text-zinc-700 whitespace-nowrap transition-colors cursor-pointer"
                >
                  Certifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* MAIN SCROLLABLE CARDS AREA (SPACIOUS 24PX VERTICAL GAPS)                   */}
        {/* ========================================================================= */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 pb-28 space-y-6">
          
          {activeTab === 'content' ? (
            <>
              {visibleSections.map((sectionKey, index) => {
                const isExpanded = expandedSection === sectionKey;

              /* 1. PROJECTS CARD */
              if (sectionKey === 'projects') {
                return (
                  <div
                    key="projects"
                    id="section-projects"
                    className={`rounded-2xl sm:rounded-3xl border bg-white shadow-2xs transition-all ${
                      isExpanded ? 'border-zinc-400 ring-2 ring-zinc-900/5' : 'border-zinc-200/90 hover:border-zinc-300'
                    }`}
                  >
                    {/* Header Row */}
                    <div
                      onClick={() => toggleSection('projects')}
                      className="p-6 sm:p-7 flex items-center justify-between cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="text-zinc-300 hover:text-zinc-500 cursor-grab shrink-0">
                          <GripVertical className="w-5 h-5" />
                        </div>
                        <div className="w-12 h-12 rounded-2xl border border-zinc-200/90 bg-white flex items-center justify-center text-zinc-800 shadow-2xs shrink-0">
                          <FolderGit2 className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-serif text-lg sm:text-xl font-bold text-zinc-900 tracking-tight leading-snug">
                            Projects
                          </h3>
                          <p className="text-xs sm:text-sm text-zinc-500 font-normal mt-0.5">
                            {data.projects.length} {data.projects.length === 1 ? 'project' : 'projects'}
                          </p>
                        </div>
                      </div>

                       {/* Right Controls */}
                       {renderRightControls('projects', isExpanded, index, visibleSections.length)}
                    </div>

                    {/* Expanded Content Fields */}
                    {isExpanded && (
                      <div className="p-6 sm:p-7 border-t border-zinc-100 bg-[#FAF9F6]/60 rounded-b-2xl sm:rounded-b-3xl space-y-5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                            PROJECT ENTRIES
                          </span>
                          <button
                            onClick={() => updateData(d => ({
                              ...d,
                              projects: [
                                ...d.projects,
                                {
                                  id: String(Date.now()),
                                  name: 'New Project',
                                  description: 'Project overview and technical highlights...',
                                  technologies: ['React', 'TypeScript'],
                                  image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
                                  githubUrl: '',
                                  liveUrl: '',
                                  featured: true
                                }
                              ]
                            }))}
                            className="px-3.5 py-1.5 rounded-xl bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-800 transition-colors flex items-center gap-1.5 shadow-2xs"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Project</span>
                          </button>
                        </div>

                        {data.projects.map((proj, pIndex) => (
                          <div key={proj.id} className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-3.5">
                            <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
                              <span className="font-serif font-bold text-sm text-zinc-900">
                                #{pIndex + 1} {proj.name || 'Untitled Project'}
                              </span>
                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => {
                                    const nextProjects = [...data.projects];
                                    const temp = nextProjects[pIndex];
                                    nextProjects[pIndex] = nextProjects[pIndex - 1];
                                    nextProjects[pIndex - 1] = temp;
                                    updateData(d => ({ ...d, projects: nextProjects }));
                                  }}
                                  disabled={pIndex === 0}
                                  className="p-1 hover:bg-zinc-100 rounded text-zinc-400 hover:text-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                                  title="Move Up"
                                >
                                  <ArrowUp className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const nextProjects = [...data.projects];
                                    const temp = nextProjects[pIndex];
                                    nextProjects[pIndex] = nextProjects[pIndex + 1];
                                    nextProjects[pIndex + 1] = temp;
                                    updateData(d => ({ ...d, projects: nextProjects }));
                                  }}
                                  disabled={pIndex === data.projects.length - 1}
                                  className="p-1 hover:bg-zinc-100 rounded text-zinc-400 hover:text-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                                  title="Move Down"
                                >
                                  <ArrowDown className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newProj = { ...proj, id: String(Date.now() + Math.random()) };
                                    const nextProjects = [...data.projects];
                                    nextProjects.splice(pIndex + 1, 0, newProj);
                                    updateData(d => ({ ...d, projects: nextProjects }));
                                  }}
                                  className="p-1 hover:bg-zinc-100 rounded text-zinc-400 hover:text-zinc-700 cursor-pointer"
                                  title="Duplicate Project"
                                >
                                  <Layers className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => updateData(d => ({
                                    ...d,
                                    projects: d.projects.filter(p => p.id !== proj.id)
                                  }))}
                                  className="p-1 hover:bg-zinc-100 rounded text-zinc-400 hover:text-red-600 cursor-pointer"
                                  title="Delete Project"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            <div className="space-y-3 text-xs">
                              <ImageSelector
                                label="Project Thumbnail"
                                currentValue={proj.image}
                                onChange={(val) => updateData(d => ({
                                  ...d,
                                  projects: d.projects.map(p => p.id === proj.id ? { ...p, image: val } : p)
                                }))}
                                defaultValue="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
                              />

                              <div>
                                <label className="block text-zinc-500 font-medium mb-1">Project Name</label>
                                <input
                                  type="text"
                                  value={proj.name}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    updateData(d => ({
                                      ...d,
                                      projects: d.projects.map(p => p.id === proj.id ? { ...p, name: val } : p)
                                    }));
                                  }}
                                  placeholder="e.g. NexusDB Studio"
                                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900"
                                />
                              </div>

                              <div>
                                <label className="block text-zinc-500 font-medium mb-1">Description & Impact</label>
                                <textarea
                                  rows={2}
                                  value={proj.description}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    updateData(d => ({
                                      ...d,
                                      projects: d.projects.map(p => p.id === proj.id ? { ...p, description: val } : p)
                                    }));
                                  }}
                                  placeholder="What did you build and why does it matter?"
                                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 resize-none"
                                />
                              </div>

                              <div>
                                <label className="block text-zinc-500 font-medium mb-1">Technologies Used (Comma-separated)</label>
                                <input
                                  type="text"
                                  value={Array.isArray(proj.technologies) ? proj.technologies.join(', ') : ''}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    updateData(d => ({
                                      ...d,
                                      projects: d.projects.map(p => p.id === proj.id ? { ...p, technologies: val.split(',').map(s => s.trim()).filter(Boolean) } : p)
                                    }));
                                  }}
                                  placeholder="e.g. React, TypeScript, Tailwind"
                                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 bg-white text-zinc-900 text-xs"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-zinc-500 font-medium mb-1">Live Demo URL</label>
                                  <input
                                    type="text"
                                    value={proj.liveUrl || ''}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      updateData(d => ({
                                        ...d,
                                        projects: d.projects.map(p => p.id === proj.id ? { ...p, liveUrl: val } : p)
                                      }));
                                    }}
                                    placeholder="https://..."
                                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 bg-white text-zinc-900 text-xs"
                                  />
                                </div>
                                <div>
                                  <label className="block text-zinc-500 font-medium mb-1">GitHub / Code URL</label>
                                  <input
                                    type="text"
                                    value={proj.githubUrl || ''}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      updateData(d => ({
                                        ...d,
                                        projects: d.projects.map(p => p.id === proj.id ? { ...p, githubUrl: val } : p)
                                      }));
                                    }}
                                    placeholder="https://github.com/..."
                                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 bg-white text-zinc-900 text-xs"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              /* 2. PERSONAL INFORMATION & SUMMARY CARD */
              if (sectionKey === 'profile') {
                return (
                  <div
                    key="profile"
                    id="section-profile"
                    className={`rounded-2xl sm:rounded-3xl border bg-white shadow-2xs transition-all ${
                      isExpanded ? 'border-zinc-400 ring-2 ring-zinc-900/5' : 'border-zinc-200/90 hover:border-zinc-300'
                    }`}
                  >
                    {/* Header Row */}
                    <div
                      onClick={() => toggleSection('profile')}
                      className="p-6 sm:p-7 flex items-center justify-between cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="text-zinc-300 hover:text-zinc-500 cursor-grab shrink-0">
                          <GripVertical className="w-5 h-5" />
                        </div>
                        <div className="w-12 h-12 rounded-2xl border border-zinc-200/90 bg-white flex items-center justify-center text-zinc-800 shadow-2xs shrink-0">
                          <User className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-serif text-lg sm:text-xl font-bold text-zinc-900 tracking-tight leading-snug">
                            Personal Information & Summary
                          </h3>
                          <p className="text-xs sm:text-sm text-zinc-500 font-normal mt-0.5">
                            Complete
                          </p>
                        </div>
                      </div>

                       {/* Right Controls */}
                       {renderRightControls('profile', isExpanded, index, visibleSections.length)}
                    </div>

                    {/* Expanded Content Fields */}
                    {isExpanded && (
                      <div className="p-6 sm:p-7 border-t border-zinc-100 bg-[#FAF9F6]/60 rounded-b-2xl sm:rounded-b-3xl space-y-4 text-xs">
                        <ImageSelector
                          label="Profile Photo"
                          currentValue={data.profile.profilePhoto}
                          onChange={(val) => updateData(d => ({ ...d, profile: { ...d.profile, profilePhoto: val } }))}
                          defaultValue="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div>
                            <label className="block text-zinc-500 font-medium mb-1">Full Name</label>
                            <input
                              type="text"
                              value={data.profile.name}
                              onChange={(e) => updateData(d => ({ ...d, profile: { ...d.profile, name: e.target.value } }))}
                              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900"
                            />
                          </div>
                          <div>
                            <label className="block text-zinc-500 font-medium mb-1">Headline / Role</label>
                            <input
                              type="text"
                              value={data.profile.title}
                              onChange={(e) => updateData(d => ({ ...d, profile: { ...d.profile, title: e.target.value } }))}
                              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div>
                            <label className="block text-zinc-500 font-medium mb-1">Location</label>
                            <input
                              type="text"
                              value={data.profile.location}
                              onChange={(e) => updateData(d => ({ ...d, profile: { ...d.profile, location: e.target.value } }))}
                              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-zinc-500 font-medium mb-1">Email</label>
                            <input
                              type="email"
                              value={data.profile.email}
                              onChange={(e) => updateData(d => ({ ...d, profile: { ...d.profile, email: e.target.value } }))}
                              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 text-xs"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-zinc-500 font-medium mb-1">Short Executive Bio</label>
                          <textarea
                            rows={3}
                            value={data.profile.bio}
                            onChange={(e) => updateData(d => ({ ...d, profile: { ...d.profile, bio: e.target.value } }))}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-zinc-500 font-medium mb-1">Detailed About & Narrative</label>
                          <textarea
                            rows={4}
                            value={data.about.aboutText}
                            onChange={(e) => updateData(d => ({ ...d, about: { ...d.about, aboutText: e.target.value } }))}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 resize-none"
                          />
                        </div>

                        <div className="pt-2 border-t border-zinc-200">
                          <h4 className="font-serif font-bold text-sm text-zinc-900 mb-2">Social Profiles & Links</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-zinc-500 font-medium mb-1">GitHub URL</label>
                              <input
                                type="text"
                                value={data.socialLinks?.github || ''}
                                onChange={(e) => updateData(d => ({
                                  ...d,
                                  socialLinks: { ...(d.socialLinks || {}), github: e.target.value }
                                }))}
                                placeholder="https://github.com/..."
                                className="w-full px-3 py-2 rounded-xl border border-zinc-200 bg-white text-zinc-900 text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-zinc-500 font-medium mb-1">LinkedIn URL</label>
                              <input
                                type="text"
                                value={data.socialLinks?.linkedin || ''}
                                onChange={(e) => updateData(d => ({
                                  ...d,
                                  socialLinks: { ...(d.socialLinks || {}), linkedin: e.target.value }
                                }))}
                                placeholder="https://linkedin.com/in/..."
                                className="w-full px-3 py-2 rounded-xl border border-zinc-200 bg-white text-zinc-900 text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-zinc-500 font-medium mb-1">Twitter URL</label>
                              <input
                                type="text"
                                value={data.socialLinks?.twitter || ''}
                                onChange={(e) => updateData(d => ({
                                  ...d,
                                  socialLinks: { ...(d.socialLinks || {}), twitter: e.target.value }
                                }))}
                                placeholder="https://twitter.com/..."
                                className="w-full px-3 py-2 rounded-xl border border-zinc-200 bg-white text-zinc-900 text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-zinc-500 font-medium mb-1">Personal Website URL</label>
                              <input
                                type="text"
                                value={data.socialLinks?.website || ''}
                                onChange={(e) => updateData(d => ({
                                  ...d,
                                  socialLinks: { ...(d.socialLinks || {}), website: e.target.value }
                                }))}
                                placeholder="https://..."
                                className="w-full px-3 py-2 rounded-xl border border-zinc-200 bg-white text-zinc-900 text-xs"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              /* 3. EDUCATION CARD */
              if (sectionKey === 'education') {
                return (
                  <div
                    key="education"
                    id="section-education"
                    className={`rounded-2xl sm:rounded-3xl border bg-white shadow-2xs transition-all ${
                      isExpanded ? 'border-zinc-400 ring-2 ring-zinc-900/5' : 'border-zinc-200/90 hover:border-zinc-300'
                    }`}
                  >
                    {/* Header Row */}
                    <div
                      onClick={() => toggleSection('education')}
                      className="p-6 sm:p-7 flex items-center justify-between cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="text-zinc-300 hover:text-zinc-500 cursor-grab shrink-0">
                          <GripVertical className="w-5 h-5" />
                        </div>
                        <div className="w-12 h-12 rounded-2xl border border-zinc-200/90 bg-white flex items-center justify-center text-zinc-800 shadow-2xs shrink-0">
                          <GraduationCap className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-serif text-lg sm:text-xl font-bold text-zinc-900 tracking-tight leading-snug">
                            Education
                          </h3>
                          <p className="text-xs sm:text-sm text-zinc-500 font-normal mt-0.5">
                            {data.education?.length || 1} {(data.education?.length || 1) === 1 ? 'entry' : 'entries'}
                          </p>
                        </div>
                      </div>

                       {/* Right Controls */}
                       {renderRightControls('education', isExpanded, index, visibleSections.length)}
                    </div>

                    {/* Expanded Content Fields */}
                    {isExpanded && (
                      <div className="p-6 sm:p-7 border-t border-zinc-100 bg-[#FAF9F6]/60 rounded-b-2xl sm:rounded-b-3xl space-y-5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                            ACADEMIC HISTORY
                          </span>
                          <button
                            onClick={() => updateData(d => ({
                              ...d,
                              education: [
                                ...(d.education || []),
                                {
                                  id: String(Date.now()),
                                  institution: 'University / Institute',
                                  degree: 'B.S. in Computer Science',
                                  duration: '2020 — 2024',
                                  grade: 'GPA: 3.9'
                                }
                              ]
                            }))}
                            className="px-3.5 py-1.5 rounded-xl bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-800 transition-colors flex items-center gap-1.5 shadow-2xs"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Education</span>
                          </button>
                        </div>

                        {(data.education || []).map((edu, eduIdx) => (
                          <div key={edu.id} className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-3.5 text-xs">
                            <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                              <span className="font-serif font-bold text-sm text-zinc-900">{edu.institution || 'University'}</span>
                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => {
                                    const nextList = [...(data.education || [])];
                                    const temp = nextList[eduIdx];
                                    nextList[eduIdx] = nextList[eduIdx - 1];
                                    nextList[eduIdx - 1] = temp;
                                    updateData(d => ({ ...d, education: nextList }));
                                  }}
                                  disabled={eduIdx === 0}
                                  className="p-1 hover:bg-zinc-100 rounded text-zinc-400 hover:text-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                                  title="Move Up"
                                >
                                  <ArrowUp className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const nextList = [...(data.education || [])];
                                    const temp = nextList[eduIdx];
                                    nextList[eduIdx] = nextList[eduIdx + 1];
                                    nextList[eduIdx + 1] = temp;
                                    updateData(d => ({ ...d, education: nextList }));
                                  }}
                                  disabled={eduIdx === (data.education || []).length - 1}
                                  className="p-1 hover:bg-zinc-100 rounded text-zinc-400 hover:text-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                                  title="Move Down"
                                >
                                  <ArrowDown className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newItem = { ...edu, id: String(Date.now() + Math.random()) };
                                    const nextList = [...(data.education || [])];
                                    nextList.splice(eduIdx + 1, 0, newItem);
                                    updateData(d => ({ ...d, education: nextList }));
                                  }}
                                  className="p-1 hover:bg-zinc-100 rounded text-zinc-400 hover:text-zinc-700 cursor-pointer"
                                  title="Duplicate"
                                >
                                  <Layers className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => updateData(d => ({
                                    ...d,
                                    education: (data.education || []).filter(e => e.id !== edu.id)
                                  }))}
                                  className="p-1 hover:bg-zinc-100 rounded text-zinc-400 hover:text-red-600 cursor-pointer"
                                  title="Delete"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <input
                                type="text"
                                value={edu.institution}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  updateData(d => ({
                                    ...d,
                                    education: (d.education || []).map(item => item.id === edu.id ? { ...item, institution: val } : item)
                                  }));
                                }}
                                placeholder="Institution name"
                                className="w-full px-3 py-2 rounded-xl border border-zinc-200"
                              />
                              <input
                                type="text"
                                value={edu.degree}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  updateData(d => ({
                                    ...d,
                                    education: (d.education || []).map(item => item.id === edu.id ? { ...item, degree: val } : item)
                                  }));
                                }}
                                placeholder="Degree & Major"
                                className="w-full px-3 py-2 rounded-xl border border-zinc-200"
                              />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <input
                                type="text"
                                value={edu.duration}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  updateData(d => ({
                                    ...d,
                                    education: (d.education || []).map(item => item.id === edu.id ? { ...item, duration: val } : item)
                                  }));
                                }}
                                placeholder="Duration (e.g. 2018 — 2022)"
                                className="w-full px-3 py-2 rounded-xl border border-zinc-200"
                              />
                              <input
                                type="text"
                                value={edu.grade || ''}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  updateData(d => ({
                                    ...d,
                                    education: (d.education || []).map(item => item.id === edu.id ? { ...item, grade: val } : item)
                                  }));
                                }}
                                placeholder="Honors / GPA (optional)"
                                className="w-full px-3 py-2 rounded-xl border border-zinc-200"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              /* 4. WORK EXPERIENCE CARD */
              if (sectionKey === 'experience') {
                return (
                  <div
                    key="experience"
                    id="section-experience"
                    className={`rounded-2xl sm:rounded-3xl border bg-white shadow-2xs transition-all ${
                      isExpanded ? 'border-zinc-400 ring-2 ring-zinc-900/5' : 'border-zinc-200/90 hover:border-zinc-300'
                    }`}
                  >
                    {/* Header Row */}
                    <div
                      onClick={() => toggleSection('experience')}
                      className="p-6 sm:p-7 flex items-center justify-between cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="text-zinc-300 hover:text-zinc-500 cursor-grab shrink-0">
                          <GripVertical className="w-5 h-5" />
                        </div>
                        <div className="w-12 h-12 rounded-2xl border border-zinc-200/90 bg-white flex items-center justify-center text-zinc-800 shadow-2xs shrink-0">
                          <Briefcase className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-serif text-lg sm:text-xl font-bold text-zinc-900 tracking-tight leading-snug">
                            Work Experience
                          </h3>
                          <p className="text-xs sm:text-sm text-zinc-500 font-normal mt-0.5">
                            {data.experience.length} {data.experience.length === 1 ? 'role' : 'roles'}
                          </p>
                        </div>
                      </div>

                       {/* Right Controls */}
                       {renderRightControls('experience', isExpanded, index, visibleSections.length)}
                    </div>

                    {/* Expanded Content Fields */}
                    {isExpanded && (
                      <div className="p-6 sm:p-7 border-t border-zinc-100 bg-[#FAF9F6]/60 rounded-b-2xl sm:rounded-b-3xl space-y-5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                            CAREER TIMELINE
                          </span>
                          <button
                            onClick={() => updateData(d => ({
                              ...d,
                              experience: [
                                ...d.experience,
                                {
                                  id: String(Date.now()),
                                  company: 'New Company',
                                  role: 'Software Engineer',
                                  duration: '2024 — Present',
                                  description: 'Leading feature development, performance tuning, and technical design.',
                                  current: true
                                }
                              ]
                            }))}
                            className="px-3.5 py-1.5 rounded-xl bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-800 transition-colors flex items-center gap-1.5 shadow-2xs"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Position</span>
                          </button>
                        </div>

                        {data.experience.map((exp, expIdx) => (
                          <div key={exp.id} className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-3.5 text-xs">
                            <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                              <span className="font-serif font-bold text-sm text-zinc-900">
                                #{expIdx + 1} {exp.role} at {exp.company}
                              </span>
                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => {
                                    const nextList = [...data.experience];
                                    const temp = nextList[expIdx];
                                    nextList[expIdx] = nextList[expIdx - 1];
                                    nextList[expIdx - 1] = temp;
                                    updateData(d => ({ ...d, experience: nextList }));
                                  }}
                                  disabled={expIdx === 0}
                                  className="p-1 hover:bg-zinc-100 rounded text-zinc-400 hover:text-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                                  title="Move Up"
                                >
                                  <ArrowUp className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const nextList = [...data.experience];
                                    const temp = nextList[expIdx];
                                    nextList[expIdx] = nextList[expIdx + 1];
                                    nextList[expIdx + 1] = temp;
                                    updateData(d => ({ ...d, experience: nextList }));
                                  }}
                                  disabled={expIdx === data.experience.length - 1}
                                  className="p-1 hover:bg-zinc-100 rounded text-zinc-400 hover:text-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                                  title="Move Down"
                                >
                                  <ArrowDown className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newItem = { ...exp, id: String(Date.now() + Math.random()) };
                                    const nextList = [...data.experience];
                                    nextList.splice(expIdx + 1, 0, newItem);
                                    updateData(d => ({ ...d, experience: nextList }));
                                  }}
                                  className="p-1 hover:bg-zinc-100 rounded text-zinc-400 hover:text-zinc-700 cursor-pointer"
                                  title="Duplicate"
                                >
                                  <Layers className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => updateData(d => ({
                                    ...d,
                                    experience: d.experience.filter(e => e.id !== exp.id)
                                  }))}
                                  className="p-1 hover:bg-zinc-100 rounded text-zinc-400 hover:text-red-600 cursor-pointer"
                                  title="Delete"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <input
                                type="text"
                                value={exp.role}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  updateData(d => ({
                                    ...d,
                                    experience: d.experience.map(item => item.id === exp.id ? { ...item, role: val } : item)
                                  }));
                                }}
                                placeholder="Role title"
                                className="w-full px-3 py-2 rounded-xl border border-zinc-200"
                              />
                              <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  updateData(d => ({
                                    ...d,
                                    experience: d.experience.map(item => item.id === exp.id ? { ...item, company: val } : item)
                                  }));
                                }}
                                placeholder="Company name"
                                className="w-full px-3 py-2 rounded-xl border border-zinc-200"
                              />
                            </div>
                            <input
                              type="text"
                              value={exp.duration}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateData(d => ({
                                  ...d,
                                  experience: d.experience.map(item => item.id === exp.id ? { ...item, duration: val } : item)
                                }));
                              }}
                              placeholder="Duration (e.g. 2022 — Present)"
                              className="w-full px-3 py-2 rounded-xl border border-zinc-200"
                            />
                            <textarea
                              rows={3}
                              value={exp.description}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateData(d => ({
                                  ...d,
                                  experience: d.experience.map(item => item.id === exp.id ? { ...item, description: val } : item)
                                }));
                              }}
                              placeholder="Key achievements and architectural impact..."
                              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 resize-none"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              /* 5. SKILLS CARD */
              if (sectionKey === 'skills') {
                return (
                  <div
                    key="skills"
                    id="section-skills"
                    className={`rounded-2xl sm:rounded-3xl border bg-white shadow-2xs transition-all ${
                      isExpanded ? 'border-zinc-400 ring-2 ring-zinc-900/5' : 'border-zinc-200/90 hover:border-zinc-300'
                    }`}
                  >
                    {/* Header Row */}
                    <div
                      onClick={() => toggleSection('skills')}
                      className="p-6 sm:p-7 flex items-center justify-between cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="text-zinc-300 hover:text-zinc-500 cursor-grab shrink-0">
                          <GripVertical className="w-5 h-5" />
                        </div>
                        <div className="w-12 h-12 rounded-2xl border border-zinc-200/90 bg-white flex items-center justify-center text-zinc-800 shadow-2xs shrink-0">
                          <Wrench className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-serif text-lg sm:text-xl font-bold text-zinc-900 tracking-tight leading-snug">
                            Skills
                          </h3>
                          <p className="text-xs sm:text-sm text-zinc-500 font-normal mt-0.5">
                            {data.skills.length} skills
                          </p>
                        </div>
                      </div>

                       {/* Right Controls */}
                       {renderRightControls('skills', isExpanded, index, visibleSections.length)}
                    </div>

                    {/* Expanded Content Fields */}
                    {isExpanded && (
                      <div className="p-6 sm:p-7 border-t border-zinc-100 bg-[#FAF9F6]/60 rounded-b-2xl sm:rounded-b-3xl space-y-4 text-xs">
                        <div>
                          <label className="block text-zinc-500 font-medium mb-1.5">Add New Skill</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Type skill & press Enter (e.g. Next.js, Go, PyTorch)..."
                              className="flex-1 px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                                  const name = e.currentTarget.value.trim();
                                  updateData(d => ({
                                    ...d,
                                    skills: [
                                      ...d.skills,
                                      { id: String(Date.now()), name, category: 'Technical', proficiency: 90 }
                                    ]
                                  }));
                                  e.currentTarget.value = '';
                                }
                              }}
                            />
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          {data.skills.map((skill) => (
                            <span
                              key={skill.id}
                              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-zinc-200 text-xs font-medium text-zinc-800 shadow-2xs"
                            >
                              <span>{skill.name}</span>
                              <button
                                onClick={() => updateData(d => ({
                                  ...d,
                                  skills: d.skills.filter(s => s.id !== skill.id)
                                }))}
                                className="text-zinc-400 hover:text-red-600 transition-colors"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              /* 6. CERTIFICATIONS & ADDITIONAL CARD */
              if (sectionKey === 'certifications') {
                return (
                  <div
                    key="certifications"
                    id="section-certifications"
                    className={`rounded-2xl sm:rounded-3xl border bg-white shadow-2xs transition-all ${
                      isExpanded ? 'border-zinc-400 ring-2 ring-zinc-900/5' : 'border-zinc-200/90 hover:border-zinc-300'
                    }`}
                  >
                    {/* Header Row */}
                    <div
                      onClick={() => toggleSection('certifications')}
                      className="p-6 sm:p-7 flex items-center justify-between cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="text-zinc-300 hover:text-zinc-500 cursor-grab shrink-0">
                          <GripVertical className="w-5 h-5" />
                        </div>
                        <div className="w-12 h-12 rounded-2xl border border-zinc-200/90 bg-white flex items-center justify-center text-zinc-800 shadow-2xs shrink-0">
                          <Layers className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-serif text-lg sm:text-xl font-bold text-zinc-900 tracking-tight leading-snug">
                            Certifications & Additional
                          </h3>
                          <p className="text-xs sm:text-sm text-zinc-500 font-normal mt-0.5">
                            {(data.articles?.length || 0) + (data.certifications?.length || 0) || 2} items
                          </p>
                        </div>
                      </div>

                       {/* Right Controls */}
                       {renderRightControls('certifications', isExpanded, index, visibleSections.length)}
                    </div>

                    {/* Expanded Content Fields */}
                    {isExpanded && (
                      <div className="p-6 sm:p-7 border-t border-zinc-100 bg-[#FAF9F6]/60 rounded-b-2xl sm:rounded-b-3xl space-y-5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                            WRITING & CERTIFICATIONS
                          </span>
                          <button
                            onClick={() => updateData(d => ({
                              ...d,
                              articles: [
                                ...(d.articles || []),
                                {
                                  id: String(Date.now()),
                                  title: 'Distributed Systems Patterns',
                                  excerpt: 'A review of consistency models and fault tolerance in modern backend services.',
                                  date: '2025',
                                  category: 'Systems'
                                }
                              ]
                            }))}
                            className="px-3.5 py-1.5 rounded-xl bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-800 transition-colors flex items-center gap-1.5 shadow-2xs"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Article / Note</span>
                          </button>
                        </div>

                        {(data.articles || []).map((art, artIdx) => (
                          <div key={art.id} className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-3 text-xs">
                            <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                              <span className="font-serif font-bold text-sm text-zinc-900">{art.title || 'Article'}</span>
                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => {
                                    const nextList = [...(data.articles || [])];
                                    const temp = nextList[artIdx];
                                    nextList[artIdx] = nextList[artIdx - 1];
                                    nextList[artIdx - 1] = temp;
                                    updateData(d => ({ ...d, articles: nextList }));
                                  }}
                                  disabled={artIdx === 0}
                                  className="p-1 hover:bg-zinc-100 rounded text-zinc-400 hover:text-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                                  title="Move Up"
                                >
                                  <ArrowUp className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const nextList = [...(data.articles || [])];
                                    const temp = nextList[artIdx];
                                    nextList[artIdx] = nextList[artIdx + 1];
                                    nextList[artIdx + 1] = temp;
                                    updateData(d => ({ ...d, articles: nextList }));
                                  }}
                                  disabled={artIdx === (data.articles || []).length - 1}
                                  className="p-1 hover:bg-zinc-100 rounded text-zinc-400 hover:text-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                                  title="Move Down"
                                >
                                  <ArrowDown className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newItem = { ...art, id: String(Date.now() + Math.random()) };
                                    const nextList = [...(data.articles || [])];
                                    nextList.splice(artIdx + 1, 0, newItem);
                                    updateData(d => ({ ...d, articles: nextList }));
                                  }}
                                  className="p-1 hover:bg-zinc-100 rounded text-zinc-400 hover:text-zinc-700 cursor-pointer"
                                  title="Duplicate"
                                >
                                  <Layers className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => updateData(d => ({
                                    ...d,
                                    articles: (data.articles || []).filter(a => a.id !== art.id)
                                  }))}
                                  className="p-1 hover:bg-zinc-100 rounded text-zinc-400 hover:text-red-600 cursor-pointer"
                                  title="Delete"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                            <input
                              type="text"
                              value={art.title}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateData(d => ({
                                  ...d,
                                  articles: (data.articles || []).map(a => a.id === art.id ? { ...a, title: val } : a)
                                }));
                              }}
                              placeholder="Title"
                              className="w-full px-3 py-2 rounded-xl border border-zinc-200"
                            />
                            <textarea
                              rows={2}
                              value={art.excerpt}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateData(d => ({
                                  ...d,
                                  articles: (data.articles || []).map(a => a.id === art.id ? { ...a, excerpt: val } : a)
                                }));
                              }}
                              placeholder="Summary excerpt..."
                              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 resize-none"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

                    return null;
                  })}

                  {hiddenSections.length > 0 && (
                    <div className="rounded-2xl border border-dashed border-zinc-200 bg-white p-6 space-y-4 shadow-2xs">
                      <div className="space-y-1">
                        <h4 className="font-serif font-bold text-base text-zinc-900 flex items-center gap-2">
                          <EyeOff className="w-4 h-4 text-zinc-500" />
                          <span>Hidden Sections ({hiddenSections.length})</span>
                        </h4>
                        <p className="text-xs text-zinc-500 font-normal">Restore hidden sections to include them in your portfolio layout.</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {hiddenSections.map((key) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => updateConfig(prev => ({
                              ...prev,
                              hiddenSections: (prev.hiddenSections || []).filter(k => k !== key)
                            }))}
                            className="px-3 py-1.5 rounded-xl bg-white border border-zinc-200 text-xs font-medium text-zinc-700 hover:border-zinc-400 hover:text-zinc-950 flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>{SECTION_DISPLAY_NAMES[key] || key}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
            /* DESIGN & LAYOUT TAB */
            <div className="space-y-6">
              
              {/* Template Choice Card */}
              <div className="rounded-2xl sm:rounded-3xl border border-zinc-200/90 bg-white p-6 sm:p-7 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">ACTIVE TEMPLATE</span>
                    <h3 className="font-serif text-xl font-bold text-zinc-900">{currentTemplate.name}</h3>
                    <p className="text-xs text-zinc-500">{currentTemplate.category} layout</p>
                  </div>
                  <button
                    onClick={onOpenTemplateGallery}
                    className="px-4 py-2 rounded-xl border border-zinc-200 bg-white text-xs font-medium text-zinc-800 hover:bg-zinc-50 transition-colors shadow-2xs"
                  >
                    Change Template →
                  </button>
                </div>
              </div>

              {/* Accent Color Card */}
              <div className="rounded-2xl sm:rounded-3xl border border-zinc-200/90 bg-white p-6 sm:p-7 shadow-2xs space-y-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-zinc-900">Accent Color</h3>
                  <p className="text-xs text-zinc-500">Pick a primary accent tone for borders, links, and highlights.</p>
                </div>
                <div className="flex items-center gap-3 pt-1">
                  {['#18181b', '#2563eb', '#334155', '#475569', '#7c3aed', '#dc2626'].map(color => (
                    <button
                      key={color}
                      onClick={() => updateConfig(c => ({ ...c, accentColor: color }))}
                      className={`w-9 h-9 rounded-2xl border-2 transition-all cursor-pointer ${
                        config.accentColor === color ? 'scale-110 border-zinc-900 shadow-md ring-2 ring-zinc-900/20' : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Typography Family Card */}
              <div className="rounded-2xl sm:rounded-3xl border border-zinc-200/90 bg-white p-6 sm:p-7 shadow-2xs space-y-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-zinc-900">Typography Pairing</h3>
                  <p className="text-xs text-zinc-500">Select font family system across headings and body copy.</p>
                </div>
                <select
                  value={config.typography}
                  onChange={(e) => updateConfig(c => ({ ...c, typography: e.target.value as any }))}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-zinc-900 text-xs sm:text-sm font-medium shadow-2xs focus:outline-none focus:ring-1 focus:ring-zinc-900"
                >
                  <option value="sans">Plus Jakarta Sans (Modern Clean)</option>
                  <option value="serif">Playfair Display (Editorial Serif)</option>
                  <option value="mono">JetBrains Mono (Developer Console)</option>
                </select>
              </div>

            </div>
          )}

        </div>

        {/* ========================================================================= */}
        {/* STICKY BOTTOM ACTION FOOTER (PUBLISH & SHARE)                              */}
        {/* ========================================================================= */}
        <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-5 border-t border-zinc-200/90 bg-white/95 backdrop-blur-xs flex items-center gap-2 sm:gap-3 z-20">
          <button
            type="button"
            onClick={() => {
              setMobileActiveView('preview');
              setDeviceMode('mobile');
            }}
            className="md:hidden flex-1 py-3 px-3 rounded-xl bg-white border border-zinc-200 text-zinc-800 font-semibold text-xs hover:bg-zinc-50 transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-zinc-600" />
            <span>View Preview</span>
          </button>
          <button
            onClick={onOpenPublish}
            className="flex-1 md:w-full py-3 sm:py-3.5 px-4 sm:px-6 rounded-xl sm:rounded-2xl bg-zinc-900 text-white font-semibold text-xs sm:text-sm hover:bg-zinc-800 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Publish & Share</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* RIGHT PREVIEW PANEL (FULL RESPONSIVE PREVIEW)                              */}
      {/* ========================================================================= */}
      <div className={`${mobileActiveView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 flex-col min-h-0 md:h-full bg-[#FAF9F6] overflow-hidden`}>
        {/* Viewport bar */}
        <div className="px-3 sm:px-6 py-2 sm:py-3.5 border-b border-zinc-200 bg-white flex items-center justify-between gap-2 shadow-2xs shrink-0">
          <div className="flex items-center gap-2 text-xs text-zinc-500 min-w-0">
            {/* Mobile Back to Editor button */}
            <button
              type="button"
              onClick={() => setMobileActiveView('editor')}
              className="md:hidden flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold text-xs transition-colors cursor-pointer shrink-0"
            >
              <FileText className="w-3.5 h-3.5 text-zinc-600" />
              <span>Editor</span>
            </button>
            <span className="font-mono text-zinc-400 hidden sm:inline">PREVIEW:</span>
            <span className="font-semibold text-zinc-800 truncate max-w-[90px] xs:max-w-[140px] sm:max-w-none">{currentTemplate.name}</span>
            <div className="h-3 w-px bg-zinc-200 mx-1 hidden sm:block" />
            <div className="flex items-center gap-1.5 font-medium select-none shrink-0">
              {saveStatus === 'saving' && (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-zinc-500 text-[11px] hidden sm:inline">Saving...</span>
                </>
              )}
              {saveStatus === 'saved' && (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-zinc-600 text-[11px] hidden sm:inline">Saved</span>
                </>
              )}
              {saveStatus === 'failed' && (
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  <span className="text-rose-600 text-[11px] font-semibold">Failed</span>
                  {onFlushSave && (
                    <button
                      type="button"
                      onClick={onFlushSave}
                      className="px-1.5 py-0.5 rounded bg-zinc-950 text-white hover:bg-zinc-800 text-[10px] font-medium transition-colors cursor-pointer"
                    >
                      Retry
                    </button>
                  )}
                </div>
              )}
              {saveStatus === 'offline' && (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                  <span className="text-zinc-500 text-[11px] hidden sm:inline">Offline</span>
                </>
              )}
            </div>
          </div>

          {/* Undo/Redo & Viewport modes */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-1 bg-white p-1 rounded-xl border border-zinc-200">
              <button
                type="button"
                onClick={handleUndo}
                disabled={!canUndo}
                className="w-7 h-7 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-500 hover:text-zinc-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                title="Undo (Ctrl+Z)"
              >
                <Undo2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleRedo}
                disabled={!canRedo}
                className="w-7 h-7 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-500 hover:text-zinc-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                title="Redo (Ctrl+Y / Ctrl+Shift+Z)"
              >
                <Redo2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Viewport modes */}
            <div className="flex items-center gap-0.5 sm:gap-1 bg-zinc-100 p-0.5 sm:p-1 rounded-lg sm:rounded-xl border border-zinc-200">
              <button
                onClick={() => setDeviceMode('desktop')}
                className={`p-1.5 sm:px-3 sm:py-1 rounded-md sm:rounded-lg text-xs font-medium flex items-center gap-1 sm:gap-1.5 transition-all cursor-pointer ${
                  deviceMode === 'desktop' ? 'bg-white text-zinc-900 shadow-xs font-semibold' : 'text-zinc-500 hover:text-zinc-900'
                }`}
                title="Desktop View"
              >
                <Monitor className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Desktop</span>
              </button>
              <button
                onClick={() => setDeviceMode('tablet')}
                className={`p-1.5 sm:px-3 sm:py-1 rounded-md sm:rounded-lg text-xs font-medium flex items-center gap-1 sm:gap-1.5 transition-all cursor-pointer ${
                  deviceMode === 'tablet' ? 'bg-white text-zinc-900 shadow-xs font-semibold' : 'text-zinc-500 hover:text-zinc-900'
                }`}
                title="Tablet View"
              >
                <Tablet className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Tablet</span>
              </button>
              <button
                onClick={() => setDeviceMode('mobile')}
                className={`p-1.5 sm:px-3 sm:py-1 rounded-md sm:rounded-lg text-xs font-medium flex items-center gap-1 sm:gap-1.5 transition-all cursor-pointer ${
                  deviceMode === 'mobile' ? 'bg-white text-zinc-900 shadow-xs font-semibold' : 'text-zinc-500 hover:text-zinc-900'
                }`}
                title="Mobile View"
              >
                <Smartphone className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Mobile</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Document Canvas */}
        <div className="flex-1 min-h-0 overflow-y-auto p-2 sm:p-4 md:p-8 flex justify-center items-start bg-[#FAF9F6] w-full">
          <div 
            className={`transition-all duration-300 bg-white shadow-xl rounded-xl sm:rounded-2xl border border-zinc-200 overflow-hidden w-full ${
              deviceMode === 'desktop' 
                ? 'max-w-5xl min-h-[400px] sm:min-h-[750px]' 
                : deviceMode === 'tablet' 
                  ? 'max-w-[768px] min-h-[400px] sm:min-h-[700px]' 
                  : 'max-w-[390px] min-h-[400px] sm:min-h-[650px]'
            }`}
          >
            <TemplateRenderer 
              data={data} 
              config={config} 
              rendererType={currentTemplate.rendererType}
              isEditable={true}
              onUpdateData={updateData}
            />
          </div>
        </div>
      </div>

    </div>
  );
};
