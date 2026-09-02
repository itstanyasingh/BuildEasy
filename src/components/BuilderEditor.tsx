import React, { useState } from 'react';
import { UserPortfolio, TemplateDefinition, PortfolioData } from '../types';
import { TemplateRenderer } from './templates/TemplateRenderer';
import { 
  Monitor, Tablet, Smartphone, 
  FileText, Briefcase, Star, Code, GraduationCap, 
  Layers, Palette, Plus, Trash2, ArrowRight, ArrowUp, ArrowDown,
  ChevronRight, GripVertical, User, Sparkles, FolderGit2, Wrench,
  CheckCircle2, ExternalLink
} from 'lucide-react';

interface BuilderEditorProps {
  portfolio: UserPortfolio;
  templates: TemplateDefinition[];
  onUpdatePortfolio: (updated: UserPortfolio) => void;
  onOpenPublish: () => void;
  onOpenTemplateGallery: () => void;
}

type SectionKey = 'projects' | 'profile' | 'education' | 'experience' | 'skills' | 'certifications';

export const BuilderEditor: React.FC<BuilderEditorProps> = ({
  portfolio,
  templates,
  onUpdatePortfolio,
  onOpenPublish,
  onOpenTemplateGallery
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'design'>('content');
  const [expandedSection, setExpandedSection] = useState<string | null>('projects');
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [sectionOrder, setSectionOrder] = useState<SectionKey[]>([
    'projects',
    'profile',
    'education',
    'experience',
    'skills',
    'certifications'
  ]);

  const currentTemplate = templates.find(t => t.id === portfolio.templateId) || templates[0];
  const data = portfolio.data;
  const config = portfolio.customizer;

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
    const newOrder = [...sectionOrder];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newOrder.length) return;
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;
    setSectionOrder(newOrder);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row overflow-hidden bg-[#FAF9F6] font-sans">
      
      {/* ========================================================================= */}
      {/* LEFT SIDEBAR (EXACT MATCH TO BUILDEASY RESUME BUILDER REFERENCE)           */}
      {/* ========================================================================= */}
      <div className="w-full md:w-[490px] lg:w-[530px] xl:w-[560px] bg-[#FAF9F6] border-r border-zinc-200 flex flex-col h-full shrink-0 relative">
        
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
            /* SECTION CARDS LIST */
            sectionOrder.map((sectionKey, index) => {
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
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={(e) => moveSection(index, 'up', e)}
                          disabled={index === 0}
                          className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          title="Move Up"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => moveSection(index, 'down', e)}
                          disabled={index === sectionOrder.length - 1}
                          className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          title="Move Down"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                        <div className="w-px h-5 bg-zinc-200 mx-1.5" />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSection('projects');
                          }}
                          className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-colors"
                        >
                          <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90 text-zinc-900' : ''}`} />
                        </button>
                      </div>
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
                              <button
                                onClick={() => updateData(d => ({
                                  ...d,
                                  projects: d.projects.filter(p => p.id !== proj.id)
                                }))}
                                className="text-zinc-400 hover:text-red-600 p-1 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="space-y-3 text-xs">
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
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={(e) => moveSection(index, 'up', e)}
                          disabled={index === 0}
                          className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          title="Move Up"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => moveSection(index, 'down', e)}
                          disabled={index === sectionOrder.length - 1}
                          className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          title="Move Down"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                        <div className="w-px h-5 bg-zinc-200 mx-1.5" />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSection('profile');
                          }}
                          className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-colors"
                        >
                          <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90 text-zinc-900' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Expanded Content Fields */}
                    {isExpanded && (
                      <div className="p-6 sm:p-7 border-t border-zinc-100 bg-[#FAF9F6]/60 rounded-b-2xl sm:rounded-b-3xl space-y-4 text-xs">
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
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={(e) => moveSection(index, 'up', e)}
                          disabled={index === 0}
                          className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          title="Move Up"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => moveSection(index, 'down', e)}
                          disabled={index === sectionOrder.length - 1}
                          className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          title="Move Down"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                        <div className="w-px h-5 bg-zinc-200 mx-1.5" />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSection('education');
                          }}
                          className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-colors"
                        >
                          <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90 text-zinc-900' : ''}`} />
                        </button>
                      </div>
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

                        {(data.education || []).map((edu) => (
                          <div key={edu.id} className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-3.5 text-xs">
                            <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                              <span className="font-serif font-bold text-sm text-zinc-900">{edu.institution || 'University'}</span>
                              <button
                                onClick={() => updateData(d => ({
                                  ...d,
                                  education: (d.education || []).filter(e => e.id !== edu.id)
                                }))}
                                className="text-zinc-400 hover:text-red-600 p-1"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
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
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={(e) => moveSection(index, 'up', e)}
                          disabled={index === 0}
                          className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          title="Move Up"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => moveSection(index, 'down', e)}
                          disabled={index === sectionOrder.length - 1}
                          className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          title="Move Down"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                        <div className="w-px h-5 bg-zinc-200 mx-1.5" />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSection('experience');
                          }}
                          className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-colors"
                        >
                          <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90 text-zinc-900' : ''}`} />
                        </button>
                      </div>
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
                              <button
                                onClick={() => updateData(d => ({
                                  ...d,
                                  experience: d.experience.filter(e => e.id !== exp.id)
                                }))}
                                className="text-zinc-400 hover:text-red-600 p-1"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
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
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={(e) => moveSection(index, 'up', e)}
                          disabled={index === 0}
                          className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          title="Move Up"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => moveSection(index, 'down', e)}
                          disabled={index === sectionOrder.length - 1}
                          className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          title="Move Down"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                        <div className="w-px h-5 bg-zinc-200 mx-1.5" />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSection('skills');
                          }}
                          className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-colors"
                        >
                          <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90 text-zinc-900' : ''}`} />
                        </button>
                      </div>
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
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={(e) => moveSection(index, 'up', e)}
                          disabled={index === 0}
                          className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          title="Move Up"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => moveSection(index, 'down', e)}
                          disabled={index === sectionOrder.length - 1}
                          className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          title="Move Down"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                        <div className="w-px h-5 bg-zinc-200 mx-1.5" />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSection('certifications');
                          }}
                          className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-colors"
                        >
                          <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90 text-zinc-900' : ''}`} />
                        </button>
                      </div>
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

                        {(data.articles || []).map((art) => (
                          <div key={art.id} className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-3 text-xs">
                            <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                              <span className="font-serif font-bold text-sm text-zinc-900">{art.title || 'Article'}</span>
                              <button
                                onClick={() => updateData(d => ({
                                  ...d,
                                  articles: (d.articles || []).filter(a => a.id !== art.id)
                                }))}
                                className="text-zinc-400 hover:text-red-600 p-1"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <input
                              type="text"
                              value={art.title}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateData(d => ({
                                  ...d,
                                  articles: (d.articles || []).map(a => a.id === art.id ? { ...a, title: val } : a)
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
                                  articles: (d.articles || []).map(a => a.id === art.id ? { ...a, excerpt: val } : a)
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
            })
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
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 border-t border-zinc-200/90 bg-white/95 backdrop-blur-xs flex items-center gap-3 z-20">
          <button
            onClick={onOpenPublish}
            className="w-full py-3.5 px-6 rounded-xl sm:rounded-2xl bg-zinc-900 text-white font-semibold text-sm hover:bg-zinc-800 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Publish & Share</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* RIGHT PREVIEW PANEL (UNCHANGED FUNCTIONALITY & DISPLAY)                    */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col h-full bg-[#FAF9F6] overflow-hidden">
        {/* Viewport bar */}
        <div className="px-6 py-3.5 border-b border-zinc-200 bg-white flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span className="font-mono text-zinc-400">PREVIEW:</span>
            <span className="font-semibold text-zinc-800">{currentTemplate.name}</span>
          </div>

          {/* Viewport modes */}
          <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-xl border border-zinc-200">
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                deviceMode === 'desktop' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" /> Desktop
            </button>
            <button
              onClick={() => setDeviceMode('tablet')}
              className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                deviceMode === 'tablet' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" /> Tablet
            </button>
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                deviceMode === 'mobile' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" /> Mobile
            </button>
          </div>
        </div>

        {/* Live Document Canvas */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center items-start bg-[#FAF9F6]">
          <div 
            className={`transition-all duration-300 bg-white shadow-xl rounded-2xl border border-zinc-200 overflow-hidden ${
              deviceMode === 'desktop' 
                ? 'w-full max-w-5xl min-h-[750px]' 
                : deviceMode === 'tablet' 
                  ? 'w-[768px] min-h-[700px]' 
                  : 'w-[375px] min-h-[650px]'
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
