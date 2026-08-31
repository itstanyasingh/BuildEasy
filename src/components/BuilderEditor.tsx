import React, { useState } from 'react';
import { UserPortfolio, TemplateDefinition, PortfolioData } from '../types';
import { TemplateRenderer } from './templates/TemplateRenderer';
import { 
  Monitor, Tablet, Smartphone, Globe, ChevronDown, ChevronUp,
  User, FileText, Briefcase, Star, Code, GraduationCap, Award, 
  MessageSquare, BookOpen, Mail, Palette, Plus, Trash2, ArrowRight
} from 'lucide-react';

interface BuilderEditorProps {
  portfolio: UserPortfolio;
  templates: TemplateDefinition[];
  onUpdatePortfolio: (updated: UserPortfolio) => void;
  onOpenPublish: () => void;
  onOpenTemplateGallery: () => void;
}

export const BuilderEditor: React.FC<BuilderEditorProps> = ({
  portfolio,
  templates,
  onUpdatePortfolio,
  onOpenPublish,
  onOpenTemplateGallery
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>('profile');
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

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

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row overflow-hidden bg-[#FAF9F6] font-sans">
      {/* LEFT SIDEBAR EDITOR (BuildEasy Accordion Style) */}
      <div className="w-full md:w-[480px] bg-white border-r border-zinc-200 flex flex-col h-full shadow-sm">
        {/* Editor Top Bar */}
        <div className="p-3.5 border-b border-zinc-200 space-y-3 bg-[#FAF9F6]">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">ACTIVE TEMPLATE</span>
              <div className="font-serif font-bold text-base text-zinc-900 flex items-center gap-1.5">
                <span>{currentTemplate.name}</span>
                <span className="text-xs font-mono font-normal text-zinc-400">({currentTemplate.category})</span>
              </div>
            </div>
            <button
              onClick={onOpenTemplateGallery}
              className="px-2.5 py-1 rounded-lg border border-zinc-200 bg-white text-[11px] font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
            >
              Gallery →
            </button>
          </div>

          {/* Direct Template Quick Switcher Tabs */}
          <div className="flex items-center gap-1 p-1 bg-zinc-200/60 rounded-xl border border-zinc-200">
            {templates.map((tmpl) => {
              const isActive = tmpl.id === portfolio.templateId;
              return (
                <button
                  key={tmpl.id}
                  onClick={() => {
                    onUpdatePortfolio({
                      ...portfolio,
                      templateId: tmpl.id,
                      customizer: { ...tmpl.defaultConfig },
                      updatedAt: new Date().toISOString().split('T')[0]
                    });
                  }}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all text-center flex items-center justify-center gap-1 ${
                    isActive
                      ? 'bg-white text-zinc-900 shadow-sm font-semibold'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70'
                  }`}
                >
                  <span>{tmpl.name}</span>
                  {isActive && <span className="text-zinc-900 font-bold">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section Accordions Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="flex items-center justify-between px-1 pb-1">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 font-bold">CONTENT & DESIGN</span>
            <span className="text-xs text-zinc-400 font-mono">BuildEasy v2.0</span>
          </div>

          {/* 1. PERSONAL INFO */}
          <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden transition-all">
            <button
              onClick={() => toggleSection('profile')}
              className="w-full p-3.5 flex items-center justify-between text-left hover:bg-zinc-50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4 text-zinc-500" />
                <span className="font-semibold text-sm text-zinc-900">Personal Information</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 font-semibold border border-zinc-200">Complete</span>
                {expandedSection === 'profile' ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
              </div>
            </button>
            {expandedSection === 'profile' && (
              <div className="p-4 border-t border-zinc-100 bg-[#FAF9F6] space-y-3 text-xs">
                <div>
                  <label className="block text-zinc-500 font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    value={data.profile.name}
                    onChange={(e) => updateData(d => ({ ...d, profile: { ...d.profile, name: e.target.value } }))}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-200 bg-white text-zinc-900 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900"
                  />
                </div>
                <div>
                  <label className="block text-zinc-500 font-medium mb-1">Professional Headline / Role</label>
                  <input
                    type="text"
                    value={data.profile.title}
                    onChange={(e) => updateData(d => ({ ...d, profile: { ...d.profile, title: e.target.value } }))}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-200 bg-white text-zinc-900 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900"
                  />
                </div>
                <div>
                  <label className="block text-zinc-500 font-medium mb-1">Location</label>
                  <input
                    type="text"
                    value={data.profile.location}
                    onChange={(e) => updateData(d => ({ ...d, profile: { ...d.profile, location: e.target.value } }))}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-200 bg-white text-zinc-900 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900"
                  />
                </div>
                <div>
                  <label className="block text-zinc-500 font-medium mb-1">Bio Summary</label>
                  <textarea
                    rows={3}
                    value={data.profile.bio}
                    onChange={(e) => updateData(d => ({ ...d, profile: { ...d.profile, bio: e.target.value } }))}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-200 bg-white text-zinc-900 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 resize-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 2. ABOUT & SUMMARY */}
          <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden transition-all">
            <button
              onClick={() => toggleSection('about')}
              className="w-full p-3.5 flex items-center justify-between text-left hover:bg-zinc-50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-zinc-500" />
                <span className="font-semibold text-sm text-zinc-900">About & Core Narrative</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-600">Bio Text</span>
                {expandedSection === 'about' ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
              </div>
            </button>
            {expandedSection === 'about' && (
              <div className="p-4 border-t border-zinc-100 bg-[#FAF9F6] space-y-3 text-xs">
                <div>
                  <label className="block text-zinc-500 font-medium mb-1">Detailed Narrative / About Me</label>
                  <textarea
                    rows={5}
                    value={data.about.aboutText}
                    onChange={(e) => updateData(d => ({ ...d, about: { ...d.about, aboutText: e.target.value } }))}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-200 bg-white text-zinc-900 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 resize-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 3. WORK EXPERIENCE */}
          <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden transition-all">
            <button
              onClick={() => toggleSection('experience')}
              className="w-full p-3.5 flex items-center justify-between text-left hover:bg-zinc-50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4 text-zinc-500" />
                <span className="font-semibold text-sm text-zinc-900">Work Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-600">{data.experience.length} Entries</span>
                {expandedSection === 'experience' ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
              </div>
            </button>
            {expandedSection === 'experience' && (
              <div className="p-4 border-t border-zinc-100 bg-[#FAF9F6] space-y-4 text-xs">
                <button
                  onClick={() => updateData(d => ({
                    ...d,
                    experience: [
                      ...d.experience,
                      { id: String(Date.now()), company: 'New Company', role: 'Role Title', duration: '2024 — Present', description: 'Impact & responsibilities...', current: true }
                    ]
                  }))}
                  className="w-full py-2 rounded-lg border border-dashed border-zinc-300 bg-white text-zinc-700 font-semibold hover:bg-zinc-50 flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Experience Position
                </button>

                {data.experience.map((exp) => (
                  <div key={exp.id} className="p-3.5 rounded-xl bg-white border border-zinc-200 space-y-2.5 shadow-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-zinc-800 text-xs">{exp.role || 'Position'}</span>
                      <button
                        onClick={() => updateData(d => ({ ...d, experience: d.experience.filter(e => e.id !== exp.id) }))}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateData(d => ({ ...d, experience: d.experience.map(item => item.id === exp.id ? { ...item, role: val } : item) }));
                      }}
                      placeholder="Role title"
                      className="w-full px-2.5 py-1.5 rounded border border-zinc-200 text-xs"
                    />
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateData(d => ({ ...d, experience: d.experience.map(item => item.id === exp.id ? { ...item, company: val } : item) }));
                      }}
                      placeholder="Company name"
                      className="w-full px-2.5 py-1.5 rounded border border-zinc-200 text-xs"
                    />
                    <input
                      type="text"
                      value={exp.duration}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateData(d => ({ ...d, experience: d.experience.map(item => item.id === exp.id ? { ...item, duration: val } : item) }));
                      }}
                      placeholder="Duration (e.g. 2022 — Present)"
                      className="w-full px-2.5 py-1.5 rounded border border-zinc-200 text-xs"
                    />
                    <textarea
                      rows={2}
                      value={exp.description}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateData(d => ({ ...d, experience: d.experience.map(item => item.id === exp.id ? { ...item, description: val } : item) }));
                      }}
                      placeholder="Description of achievements"
                      className="w-full px-2.5 py-1.5 rounded border border-zinc-200 text-xs resize-none"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 4. PROJECTS */}
          <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden transition-all">
            <button
              onClick={() => toggleSection('projects')}
              className="w-full p-3.5 flex items-center justify-between text-left hover:bg-zinc-50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Star className="w-4 h-4 text-zinc-500" />
                <span className="font-semibold text-sm text-zinc-900">Featured Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-600">{data.projects.length} Projects</span>
                {expandedSection === 'projects' ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
              </div>
            </button>
            {expandedSection === 'projects' && (
              <div className="p-4 border-t border-zinc-100 bg-[#FAF9F6] space-y-4 text-xs">
                <button
                  onClick={() => updateData(d => ({
                    ...d,
                    projects: [
                      ...d.projects,
                      { id: String(Date.now()), name: 'New Project', description: 'Project overview...', technologies: ['React', 'TypeScript'], image: '', githubUrl: '', liveUrl: '', featured: true }
                    ]
                  }))}
                  className="w-full py-2 rounded-lg border border-dashed border-zinc-300 bg-white text-zinc-700 font-semibold hover:bg-zinc-50 flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Add New Project
                </button>

                {data.projects.map((proj) => (
                  <div key={proj.id} className="p-3.5 rounded-xl bg-white border border-zinc-200 space-y-2.5 shadow-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-zinc-800 text-xs">{proj.name || 'Project'}</span>
                      <button
                        onClick={() => updateData(d => ({ ...d, projects: d.projects.filter(p => p.id !== proj.id) }))}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={proj.name}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateData(d => ({ ...d, projects: d.projects.map(item => item.id === proj.id ? { ...item, name: val } : item) }));
                      }}
                      placeholder="Project name"
                      className="w-full px-2.5 py-1.5 rounded border border-zinc-200 text-xs"
                    />
                    <textarea
                      rows={2}
                      value={proj.description}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateData(d => ({ ...d, projects: d.projects.map(item => item.id === proj.id ? { ...item, description: val } : item) }));
                      }}
                      placeholder="Description"
                      className="w-full px-2.5 py-1.5 rounded border border-zinc-200 text-xs resize-none"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 4.5. WRITING / ARTICLES */}
          <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden transition-all">
            <button
              onClick={() => toggleSection('articles')}
              className="w-full p-3.5 flex items-center justify-between text-left hover:bg-zinc-50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-zinc-500" />
                <span className="font-semibold text-sm text-zinc-900">Articles & Writing</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-600">{(data.articles || []).length} Articles</span>
                {expandedSection === 'articles' ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
              </div>
            </button>
            {expandedSection === 'articles' && (
              <div className="p-4 border-t border-zinc-100 bg-[#FAF9F6] space-y-4 text-xs">
                <button
                  onClick={() => updateData(d => ({
                    ...d,
                    articles: [
                      ...(d.articles || []),
                      { 
                        id: String(Date.now()), 
                        title: 'New Technical Article', 
                        excerpt: 'Summary of concepts, architecture patterns, and benchmarks...', 
                        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                        readingTime: '5 min read',
                        category: 'Software Engineering',
                        tags: ['TypeScript', 'Architecture'],
                        content: 'Write your full article here with headings and technical explanations.'
                      }
                    ]
                  }))}
                  className="w-full py-2 rounded-lg border border-dashed border-zinc-300 bg-white text-zinc-700 font-semibold hover:bg-zinc-50 flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Add New Article / Note
                </button>

                {(data.articles || []).map((art) => (
                  <div key={art.id} className="p-3.5 rounded-xl bg-white border border-zinc-200 space-y-2.5 shadow-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-zinc-800 text-xs">{art.title || 'Article'}</span>
                      <button
                        onClick={() => updateData(d => ({ ...d, articles: (d.articles || []).filter(a => a.id !== art.id) }))}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={art.title}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateData(d => ({ ...d, articles: (d.articles || []).map(a => a.id === art.id ? { ...a, title: val } : a) }));
                      }}
                      placeholder="Article title"
                      className="w-full px-2.5 py-1.5 rounded border border-zinc-200 text-xs"
                    />
                    <input
                      type="text"
                      value={art.category || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateData(d => ({ ...d, articles: (d.articles || []).map(a => a.id === art.id ? { ...a, category: val } : a) }));
                      }}
                      placeholder="Category (e.g. Distributed Systems)"
                      className="w-full px-2.5 py-1.5 rounded border border-zinc-200 text-xs"
                    />
                    <textarea
                      rows={2}
                      value={art.excerpt}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateData(d => ({ ...d, articles: (d.articles || []).map(a => a.id === art.id ? { ...a, excerpt: val } : a) }));
                      }}
                      placeholder="Short summary excerpt"
                      className="w-full px-2.5 py-1.5 rounded border border-zinc-200 text-xs resize-none"
                    />
                    <textarea
                      rows={4}
                      value={art.content || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateData(d => ({ ...d, articles: (d.articles || []).map(a => a.id === art.id ? { ...a, content: val } : a) }));
                      }}
                      placeholder="Full essay or notes content"
                      className="w-full px-2.5 py-1.5 rounded border border-zinc-200 text-xs resize-y"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 5. SKILLS */}
          <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden transition-all">
            <button
              onClick={() => toggleSection('skills')}
              className="w-full p-3.5 flex items-center justify-between text-left hover:bg-zinc-50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Code className="w-4 h-4 text-zinc-500" />
                <span className="font-semibold text-sm text-zinc-900">Skills & Tech Stack</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-600">{data.skills.length} Skills</span>
                {expandedSection === 'skills' ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
              </div>
            </button>
            {expandedSection === 'skills' && (
              <div className="p-4 border-t border-zinc-100 bg-[#FAF9F6] space-y-3 text-xs">
                <div className="flex gap-2">
                  <input
                    id="new-skill-input"
                    type="text"
                    placeholder="Add skill (e.g. Next.js, Python)"
                    className="flex-1 px-3 py-1.5 rounded border border-zinc-200 text-xs"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        const name = e.currentTarget.value.trim();
                        updateData(d => ({ ...d, skills: [...d.skills, { id: String(Date.now()), name, category: 'General', proficiency: 90 }] }));
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {data.skills.map((skill) => (
                    <span key={skill.id} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-zinc-200 text-xs font-medium text-zinc-800">
                      {skill.name}
                      <button
                        onClick={() => updateData(d => ({ ...d, skills: d.skills.filter(s => s.id !== skill.id) }))}
                        className="text-zinc-400 hover:text-red-600"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 6. DESIGN & LAYOUT CUSTOMIZER */}
          <div className="rounded-xl border border-zinc-900 bg-white overflow-hidden transition-all">
            <button
              onClick={() => toggleSection('customizer')}
              className="w-full p-3.5 flex items-center justify-between text-left hover:bg-zinc-50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Palette className="w-4 h-4 text-zinc-900" />
                <span className="font-bold text-sm text-zinc-900">Design & Layout Options</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-white font-semibold">Live Preview</span>
                {expandedSection === 'customizer' ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
              </div>
            </button>
            {expandedSection === 'customizer' && (
              <div className="p-4 border-t border-zinc-100 bg-[#FAF9F6] space-y-4 text-xs">
                <div>
                  <label className="block text-zinc-500 font-medium mb-1.5">Accent Color</label>
                  <div className="flex items-center gap-2">
                    {['#18181b', '#2563eb', '#334155', '#475569', '#7c3aed', '#dc2626'].map(color => (
                      <button
                        key={color}
                        onClick={() => updateConfig(c => ({ ...c, accentColor: color }))}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${config.accentColor === color ? 'scale-110 border-zinc-900' : 'border-transparent'}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-500 font-medium mb-1.5">Typography Family</label>
                  <select
                    value={config.typography}
                    onChange={(e) => updateConfig(c => ({ ...c, typography: e.target.value as any }))}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-200 bg-white text-zinc-900 text-xs"
                  >
                    <option value="sans">Plus Jakarta Sans (Modern Clean)</option>
                    <option value="serif">Playfair Display (Editorial Serif)</option>
                    <option value="mono">JetBrains Mono (Developer Console)</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Action Footer */}
        <div className="p-4 border-t border-zinc-200 bg-[#FAF9F6] flex items-center gap-3">
          <button
            onClick={onOpenPublish}
            className="flex-1 py-3 px-4 rounded-xl bg-zinc-900 text-white font-semibold text-xs hover:bg-zinc-800 transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <span>Publish & Share</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* RIGHT PREVIEW PANEL */}
      <div className="flex-1 flex flex-col h-full bg-[#FAF9F6] overflow-hidden">
        {/* Device Viewport Bar */}
        <div className="px-6 py-3 border-b border-zinc-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span className="font-mono text-zinc-400">PREVIEW:</span>
            <span className="font-semibold text-zinc-800">{currentTemplate.name}</span>
          </div>

          {/* Viewport Modes */}
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

        {/* Live Document Canvas Container */}
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};
