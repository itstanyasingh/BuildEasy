import React, { useState, useEffect, useRef } from 'react';
import { PortfolioData, LayoutConfiguration } from '../../types';
import { 
  X, 
  Minus, 
  Maximize2, 
  Minimize2, 
  Mail, 
  Github, 
  Linkedin, 
  Twitter, 
  Send, 
  Check, 
  ArrowUpRight, 
  FileText, 
  Settings, 
  Clock, 
  Briefcase, 
  Code, 
  User, 
  Cpu, 
  Globe,
  Folder,
  Terminal,
  HelpCircle,
  ChevronRight
} from 'lucide-react';

interface WindowedPortfolioTemplateProps {
  data: PortfolioData;
  config?: LayoutConfiguration;
}

interface WindowState {
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  x: number;
  y: number;
  zIndex: number;
}

type WindowId = 'bio' | 'projects' | 'skills' | 'contact';

export const WindowedPortfolioTemplate: React.FC<WindowedPortfolioTemplateProps> = ({ data, config }) => {
  const profile = data.profile || {};
  const socialLinks = data.socialLinks || {};
  const experienceList = data.experience || [];
  const skillsList = data.skills || [];
  const projectsList = data.projects || [];

  // Desktop Date and Time State
  const [timeStr, setTimeStr] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');

  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  // Active Project Selection inside Projects Window
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');

  // Initial window state and positions (tiled nicely on desktop)
  const [windows, setWindows] = useState<Record<WindowId, WindowState>>({
    bio: { isOpen: true, isMinimized: false, isMaximized: false, x: 50, y: 50, zIndex: 10 },
    projects: { isOpen: true, isMinimized: false, isMaximized: false, x: 120, y: 120, zIndex: 20 },
    skills: { isOpen: false, isMinimized: false, isMaximized: false, x: 200, y: 80, zIndex: 5 },
    contact: { isOpen: false, isMinimized: false, isMaximized: false, x: 280, y: 160, zIndex: 5 },
  });

  const [activeWindow, setActiveWindow] = useState<WindowId>('projects');
  const [maxZ, setMaxZ] = useState<number>(20);

  // Dragging states
  const [dragState, setDragState] = useState<{
    id: WindowId;
    startX: number;
    startY: number;
    windowStartX: number;
    windowStartY: number;
  } | null>(null);

  // Set initial selected project
  useEffect(() => {
    if (projectsList.length > 0) {
      setSelectedProjectId(projectsList[0].id || '0');
    }
  }, [projectsList]);

  // System time ticker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDateStr(now.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Helper to focus a window (bring to front)
  const focusWindow = (id: WindowId) => {
    if (activeWindow === id) return;
    const nextZ = maxZ + 1;
    setMaxZ(nextZ);
    setWindows(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: true,
        isMinimized: false,
        zIndex: nextZ
      }
    }));
    setActiveWindow(id);
  };

  // Helper to open or restore a window
  const openWindow = (id: WindowId) => {
    const nextZ = maxZ + 1;
    setMaxZ(nextZ);
    setWindows(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: true,
        isMinimized: false,
        zIndex: nextZ
      }
    }));
    setActiveWindow(id);
  };

  // Helper to minimize
  const minimizeWindow = (id: WindowId, e: React.MouseEvent) => {
    e.stopPropagation();
    setWindows(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMinimized: true
      }
    }));
  };

  // Helper to toggle maximize
  const toggleMaximize = (id: WindowId, e: React.MouseEvent) => {
    e.stopPropagation();
    setWindows(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMaximized: !prev[id].isMaximized
      }
    }));
    focusWindow(id);
  };

  // Helper to close
  const closeWindow = (id: WindowId, e: React.MouseEvent) => {
    e.stopPropagation();
    setWindows(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: false
      }
    }));
  };

  // Contact Form Submission Handler
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSendSuccess(true);
      setContactForm({ name: '', email: '', message: '' });
      setTimeout(() => setSendSuccess(false), 5000);
    }, 1500);
  };

  // Mouse drag handlers on window headers
  const handleHeaderMouseDown = (id: WindowId, e: React.MouseEvent) => {
    if (windows[id].isMaximized) return;
    focusWindow(id);
    setDragState({
      id,
      startX: e.clientX,
      startY: e.clientY,
      windowStartX: windows[id].x,
      windowStartY: windows[id].y
    });
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragState) return;
      const dx = e.clientX - dragState.startX;
      const dy = e.clientY - dragState.startY;
      setWindows(prev => ({
        ...prev,
        [dragState.id]: {
          ...prev[dragState.id],
          x: Math.max(10, Math.min(1000, dragState.windowStartX + dx)),
          y: Math.max(10, Math.min(800, dragState.windowStartY + dy))
        }
      }));
    };

    const handleMouseUp = () => {
      if (dragState) {
        setDragState(null);
      }
    };

    if (dragState) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragState]);

  return (
    <div className="w-full h-full min-h-[700px] flex flex-col bg-[#818cf8] text-black font-mono select-none relative overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      
      {/* Grid Pattern overlay for true retro cyber aesthetic */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{
        backgroundImage: `radial-gradient(#000 20%, transparent 20%), radial-gradient(#000 20%, transparent 20%)`,
        backgroundPosition: '0 0, 10px 10px',
        backgroundSize: '20px 20px'
      }} />

      {/* ========================================== */}
      {/* DESKTOP CONTENT AREA                      */}
      {/* ========================================== */}
      <div className="flex-1 w-full relative p-4 pb-16 flex flex-col items-start gap-6">
        
        {/* Retro Desktop Shortcuts */}
        <div className="flex flex-col items-center gap-6 z-0">
          
          {/* Bio shortcut */}
          <button 
            onClick={() => openWindow('bio')}
            className="flex flex-col items-center gap-1 group cursor-pointer focus:outline-none"
          >
            <div className="w-14 h-14 bg-[#fed7aa] border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
              <User className="w-8 h-8 text-black" />
            </div>
            <span className="text-[11px] font-bold bg-white px-1.5 py-0.5 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mt-1">
              profile.txt
            </span>
          </button>

          {/* Projects shortcut */}
          <button 
            onClick={() => openWindow('projects')}
            className="flex flex-col items-center gap-1 group cursor-pointer focus:outline-none"
          >
            <div className="w-14 h-14 bg-[#a7f3d0] border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
              <Briefcase className="w-8 h-8 text-black" />
            </div>
            <span className="text-[11px] font-bold bg-white px-1.5 py-0.5 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mt-1">
              projects.exe
            </span>
          </button>

          {/* Skills shortcut */}
          <button 
            onClick={() => openWindow('skills')}
            className="flex flex-col items-center gap-1 group cursor-pointer focus:outline-none"
          >
            <div className="w-14 h-14 bg-[#fef08a] border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
              <Code className="w-8 h-8 text-black" />
            </div>
            <span className="text-[11px] font-bold bg-white px-1.5 py-0.5 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mt-1">
              skills.cfg
            </span>
          </button>

          {/* Contact shortcut */}
          <button 
            onClick={() => openWindow('contact')}
            className="flex flex-col items-center gap-1 group cursor-pointer focus:outline-none"
          >
            <div className="w-14 h-14 bg-[#fecdd3] border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
              <Mail className="w-8 h-8 text-black" />
            </div>
            <span className="text-[11px] font-bold bg-white px-1.5 py-0.5 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mt-1">
              contact.sh
            </span>
          </button>
        </div>


        {/* ========================================== */}
        {/* WINDOW 1: BIO / PROFILE WINDOW             */}
        {/* ========================================== */}
        {windows.bio.isOpen && !windows.bio.isMinimized && (
          <div 
            onClick={() => focusWindow('bio')}
            style={{
              position: windows.bio.isMaximized ? 'absolute' : 'absolute',
              top: windows.bio.isMaximized ? '0' : `${windows.bio.y}px`,
              left: windows.bio.isMaximized ? '0' : `${windows.bio.x}px`,
              width: windows.bio.isMaximized ? '100%' : 'min(94vw, 550px)',
              height: windows.bio.isMaximized ? 'calc(100% - 4px)' : 'auto',
              zIndex: windows.bio.zIndex,
            }}
            className={`flex flex-col bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-transform duration-75 ${
              activeWindow === 'bio' ? 'ring-2 ring-black/10' : ''
            }`}
          >
            {/* Header / Title bar */}
            <div 
              onMouseDown={(e) => handleHeaderMouseDown('bio', e)}
              className={`px-3 py-2 flex items-center justify-between border-b-4 border-black select-none cursor-move ${
                activeWindow === 'bio' ? 'bg-[#fed7aa]' : 'bg-[#e4e4e7]'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                <User className="w-4 h-4" />
                <span>zara_beaumont_profile.sys</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button onClick={(e) => minimizeWindow('bio', e)} className="p-1 border-2 border-black bg-white hover:bg-zinc-200 cursor-pointer text-xs"><Minus className="w-3 h-3" /></button>
                <button onClick={(e) => toggleMaximize('bio', e)} className="p-1 border-2 border-black bg-white hover:bg-zinc-200 cursor-pointer text-xs"><Maximize2 className="w-3 h-3" /></button>
                <button onClick={(e) => closeWindow('bio', e)} className="p-1 border-2 border-black bg-[#ff6b6b] hover:bg-red-400 cursor-pointer text-xs text-white"><X className="w-3 h-3" /></button>
              </div>
            </div>

            {/* Content area */}
            <div className="p-5 flex flex-col md:flex-row gap-6 overflow-y-auto max-h-[350px]">
              <div className="flex flex-col items-center md:items-start gap-4">
                <div className="w-28 h-28 border-4 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative flex-shrink-0">
                  <img 
                    src={profile.profilePhoto || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000"} 
                    alt={profile.name || "Zara Beaumont"} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-1 text-center md:text-left">
                  <h3 className="font-bold text-base uppercase tracking-tight">{profile.name || "Zara Beaumont"}</h3>
                  <p className="text-xs bg-[#fed7aa] px-2 py-0.5 border border-black font-bold inline-block uppercase text-zinc-900">
                    {profile.title || "Product Engineer"}
                  </p>
                </div>
              </div>

              <div className="space-y-4 flex-1">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">&gt;_ INTRO_MANIFEST</span>
                  <p className="text-xs font-mono text-zinc-800 leading-relaxed">
                    {profile.bio || "Designing high-fidelity user interfaces and resilient interactive systems. Bridging the gap between creative execution and clean, mathematical software architecture."}
                  </p>
                </div>

                <div className="h-px bg-zinc-300 w-full" />

                <div className="grid grid-cols-2 gap-3 text-[11px] font-bold uppercase tracking-tight">
                  <div className="space-y-1">
                    <span className="text-zinc-500 text-[9px] tracking-widest block">LOC_COORD</span>
                    <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> {profile.location || "London, UK"}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-zinc-500 text-[9px] tracking-widest block">AVAIL_CODE</span>
                    <span className="text-[#10b981]">[ACTIVE_CONTRACT]</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* ========================================== */}
        {/* WINDOW 2: PROJECTS WINDOW                  */}
        {/* ========================================== */}
        {windows.projects.isOpen && !windows.projects.isMinimized && (
          <div 
            onClick={() => focusWindow('projects')}
            style={{
              position: windows.projects.isMaximized ? 'absolute' : 'absolute',
              top: windows.projects.isMaximized ? '0' : `${windows.projects.y}px`,
              left: windows.projects.isMaximized ? '0' : `${windows.projects.x}px`,
              width: windows.projects.isMaximized ? '100%' : 'min(94vw, 680px)',
              height: windows.projects.isMaximized ? 'calc(100% - 4px)' : 'auto',
              zIndex: windows.projects.zIndex,
            }}
            className={`flex flex-col bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-transform duration-75 ${
              activeWindow === 'projects' ? 'ring-2 ring-black/10' : ''
            }`}
          >
            {/* Header / Title bar */}
            <div 
              onMouseDown={(e) => handleHeaderMouseDown('projects', e)}
              className={`px-3 py-2 flex items-center justify-between border-b-4 border-black select-none cursor-move ${
                activeWindow === 'projects' ? 'bg-[#a7f3d0]' : 'bg-[#e4e4e7]'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                <Briefcase className="w-4 h-4" />
                <span>engineered_systems.exe</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button onClick={(e) => minimizeWindow('projects', e)} className="p-1 border-2 border-black bg-white hover:bg-zinc-200 cursor-pointer text-xs"><Minus className="w-3 h-3" /></button>
                <button onClick={(e) => toggleMaximize('projects', e)} className="p-1 border-2 border-black bg-white hover:bg-zinc-200 cursor-pointer text-xs"><Maximize2 className="w-3 h-3" /></button>
                <button onClick={(e) => closeWindow('projects', e)} className="p-1 border-2 border-black bg-[#ff6b6b] hover:bg-red-400 cursor-pointer text-xs text-white"><X className="w-3 h-3" /></button>
              </div>
            </div>

            {/* Split layout: sidebar directories and file view */}
            <div className="flex flex-col md:flex-row divide-y-4 md:divide-y-0 md:divide-x-4 divide-black">
              
              {/* Left sidebar: directory list of projects */}
              <div className="w-full md:w-52 bg-[#f4f4f5] p-3 flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible md:overflow-y-auto max-h-[140px] md:max-h-[380px]">
                {projectsList.map((p, idx) => {
                  const num = String(idx + 1).padStart(2, '0');
                  const isProjSelected = selectedProjectId === p.id;
                  return (
                    <button
                      key={p.id || idx}
                      onClick={() => setSelectedProjectId(p.id || '')}
                      className={`w-full text-left p-2 border-2 border-black font-bold text-[11px] uppercase tracking-tight flex items-center justify-between gap-1 transition-all cursor-pointer select-none whitespace-nowrap md:whitespace-normal ${
                        isProjSelected 
                          ? 'bg-black text-[#a7f3d0] translate-x-[2px] translate-y-[2px]' 
                          : 'bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                      }`}
                    >
                      <span className="truncate">{num} — {p.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 hidden md:block" />
                    </button>
                  );
                })}
              </div>

              {/* Right panel: Active project preview detail */}
              <div className="flex-1 p-5 space-y-4 max-h-[380px] overflow-y-auto">
                {(() => {
                  const selectedProj = projectsList.find(p => p.id === selectedProjectId) || projectsList[0];
                  if (!selectedProj) {
                    return <div className="text-xs text-zinc-500 font-mono">Select a system core payload to query detailed diagnostics.</div>;
                  }
                  return (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <div className="space-y-1.5 border-b border-zinc-200 pb-3">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <h4 className="text-lg font-black uppercase tracking-tight text-black">{selectedProj.name}</h4>
                          <span className="text-[10px] font-mono uppercase bg-zinc-100 border border-black font-bold px-2 py-0.5 rounded-sm">
                            {selectedProj.year || '2026'} / {selectedProj.status || 'STABLE'}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 font-bold uppercase">{selectedProj.role || 'Product Lead'}</p>
                      </div>

                      {selectedProj.image && (
                        <div className="w-full h-36 border-2 border-black overflow-hidden relative shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                          <img 
                            src={selectedProj.image} 
                            alt={selectedProj.name} 
                            className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-300"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}

                      <div className="space-y-2">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 font-bold block">SPEC_DESCR</span>
                        <p className="text-xs text-zinc-800 leading-relaxed font-mono">
                          {selectedProj.description}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 font-bold block">SYSTEM_COMPILER_STACK</span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedProj.technologies?.map(tech => (
                            <span key={tech} className="text-[9px] font-mono bg-zinc-100 border border-zinc-300 px-1.5 py-0.5 font-bold uppercase text-zinc-700">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 pt-2">
                        {selectedProj.liveUrl && (
                          <a 
                            href={selectedProj.liveUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 border-2 border-black bg-black text-[#a7f3d0] font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 hover:bg-[#a7f3d0] hover:text-black transition-colors"
                          >
                            <span>DEPLOY SYSTEM</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {selectedProj.githubUrl && (
                          <a 
                            href={selectedProj.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[10px] font-bold uppercase tracking-wider text-zinc-600 hover:text-black transition-colors"
                          >
                            [VIEW_SRC]
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>

            </div>
          </div>
        )}


        {/* ========================================== */}
        {/* WINDOW 3: SKILLS WINDOW                    */}
        {/* ========================================== */}
        {windows.skills.isOpen && !windows.skills.isMinimized && (
          <div 
            onClick={() => focusWindow('skills')}
            style={{
              position: windows.skills.isMaximized ? 'absolute' : 'absolute',
              top: windows.skills.isMaximized ? '0' : `${windows.skills.y}px`,
              left: windows.skills.isMaximized ? '0' : `${windows.skills.x}px`,
              width: windows.skills.isMaximized ? '100%' : 'min(94vw, 500px)',
              height: windows.skills.isMaximized ? 'calc(100% - 4px)' : 'auto',
              zIndex: windows.skills.zIndex,
            }}
            className={`flex flex-col bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-transform duration-75 ${
              activeWindow === 'skills' ? 'ring-2 ring-black/10' : ''
            }`}
          >
            {/* Header / Title bar */}
            <div 
              onMouseDown={(e) => handleHeaderMouseDown('skills', e)}
              className={`px-3 py-2 flex items-center justify-between border-b-4 border-black select-none cursor-move ${
                activeWindow === 'skills' ? 'bg-[#fef08a]' : 'bg-[#e4e4e7]'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                <Code className="w-4 h-4" />
                <span>core_competencies.cfg</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button onClick={(e) => minimizeWindow('skills', e)} className="p-1 border-2 border-black bg-white hover:bg-zinc-200 cursor-pointer text-xs"><Minus className="w-3 h-3" /></button>
                <button onClick={(e) => toggleMaximize('skills', e)} className="p-1 border-2 border-black bg-white hover:bg-zinc-200 cursor-pointer text-xs"><Maximize2 className="w-3 h-3" /></button>
                <button onClick={(e) => closeWindow('skills', e)} className="p-1 border-2 border-black bg-[#ff6b6b] hover:bg-red-400 cursor-pointer text-xs text-white"><X className="w-3 h-3" /></button>
              </div>
            </div>

            {/* Content area */}
            <div className="p-5 space-y-6 overflow-y-auto max-h-[350px]">
              <div className="space-y-1">
                <h4 className="text-sm font-bold uppercase tracking-wider text-black">TECHNICAL CORE COMPILERS</h4>
                <p className="text-[11px] text-zinc-500 font-bold uppercase">System telemetry index reporting verified competencies</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skillsList.map((skill, idx) => (
                  <div 
                    key={skill.id || idx}
                    className="p-3 border-2 border-black bg-[#fafafa] flex flex-col justify-between shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold text-xs uppercase tracking-tight text-black truncate">{skill.name}</span>
                      <span className="text-[9px] font-mono text-zinc-400 font-bold uppercase">{skill.category || 'CORE'}</span>
                    </div>
                    {/* Retro Grid Blocks representation instead of generic percentages */}
                    <div className="flex items-center gap-1 pt-2 font-mono text-[10px]">
                      <span className="text-zinc-400">[</span>
                      <div className="flex-1 flex gap-0.5 overflow-hidden">
                        {Array.from({ length: 10 }).map((_, stepIdx) => {
                          const isActive = stepIdx < Math.round((skill.proficiency || 90) / 10);
                          return (
                            <span 
                              key={stepIdx} 
                              className={`h-2 flex-1 border border-black ${
                                isActive ? 'bg-[#fef08a]' : 'bg-transparent'
                              }`} 
                            />
                          );
                        })}
                      </div>
                      <span className="text-zinc-400">]</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}


        {/* ========================================== */}
        {/* WINDOW 4: CONTACT WINDOW                   */}
        {/* ========================================== */}
        {windows.contact.isOpen && !windows.contact.isMinimized && (
          <div 
            onClick={() => focusWindow('contact')}
            style={{
              position: windows.contact.isMaximized ? 'absolute' : 'absolute',
              top: windows.contact.isMaximized ? '0' : `${windows.contact.y}px`,
              left: windows.contact.isMaximized ? '0' : `${windows.contact.x}px`,
              width: windows.contact.isMaximized ? '100%' : 'min(94vw, 520px)',
              height: windows.contact.isMaximized ? 'calc(100% - 4px)' : 'auto',
              zIndex: windows.contact.zIndex,
            }}
            className={`flex flex-col bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-transform duration-75 ${
              activeWindow === 'contact' ? 'ring-2 ring-black/10' : ''
            }`}
          >
            {/* Header / Title bar */}
            <div 
              onMouseDown={(e) => handleHeaderMouseDown('contact', e)}
              className={`px-3 py-2 flex items-center justify-between border-b-4 border-black select-none cursor-move ${
                activeWindow === 'contact' ? 'bg-[#fecdd3]' : 'bg-[#e4e4e7]'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                <Mail className="w-4 h-4" />
                <span>secure_transmission.mail</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button onClick={(e) => minimizeWindow('contact', e)} className="p-1 border-2 border-black bg-white hover:bg-zinc-200 cursor-pointer text-xs"><Minus className="w-3 h-3" /></button>
                <button onClick={(e) => toggleMaximize('contact', e)} className="p-1 border-2 border-black bg-white hover:bg-zinc-200 cursor-pointer text-xs"><Maximize2 className="w-3 h-3" /></button>
                <button onClick={(e) => closeWindow('contact', e)} className="p-1 border-2 border-black bg-[#ff6b6b] hover:bg-red-400 cursor-pointer text-xs text-white"><X className="w-3 h-3" /></button>
              </div>
            </div>

            {/* Content area */}
            <div className="p-5 space-y-6 overflow-y-auto max-h-[360px]">
              {sendSuccess ? (
                <div className="border-4 border-black bg-[#a7f3d0] p-6 text-center space-y-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="w-10 h-10 border-2 border-black bg-white flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6 text-emerald-500" />
                  </div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-black">TRANSMISSION COMPLETELY SECURED</h4>
                  <p className="text-[11px] font-mono text-zinc-800 leading-relaxed">
                    Payload package was bound and dispatched. Responding telemetric protocols will return shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block">SENDER_NAME [TXT]</label>
                      <input 
                        type="text" 
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="Zara Beaumont"
                        className="w-full p-2.5 bg-white border-2 border-black text-xs font-mono focus:outline-none focus:bg-zinc-50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block">SENDER_MAIL [TXT]</label>
                      <input 
                        type="email" 
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="zara@beaumont.sh"
                        className="w-full p-2.5 bg-white border-2 border-black text-xs font-mono focus:outline-none focus:bg-zinc-50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block">PAYLOAD_STREAM [TXT]</label>
                    <textarea 
                      required
                      rows={3}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Write communication transmission detail..."
                      className="w-full p-2.5 bg-white border-2 border-black text-xs font-mono focus:outline-none focus:bg-zinc-50 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full py-2.5 border-4 border-black bg-black text-[#fecdd3] hover:bg-[#fecdd3] hover:text-black font-black uppercase text-xs tracking-wider transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50"
                  >
                    {isSending ? 'DISPATCHING PAYLOAD...' : 'TRANSMIT COMMUNICATION'}
                  </button>
                </form>
              )}

              <div className="h-px bg-zinc-300 w-full" />

              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block">SECURE_CHANNELS</span>
                <div className="grid grid-cols-2 gap-3 text-xs uppercase font-bold tracking-tight">
                  {socialLinks.github && (
                    <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-2 border-2 border-black bg-white hover:bg-zinc-50 flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <Github className="w-4 h-4" />
                      <span>GITHUB</span>
                    </a>
                  )}
                  {socialLinks.linkedin && (
                    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 border-2 border-black bg-white hover:bg-zinc-50 flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <Linkedin className="w-4 h-4" />
                      <span>LINKEDIN</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ========================================== */}
      {/* WINDOW TASKBAR / OS DOCK (STABLE BOTTOM)   */}
      {/* ========================================== */}
      <div className="w-full bg-[#f4f4f5] border-t-4 border-black py-2.5 px-4 flex items-center justify-between gap-4 z-40 relative select-none">
        
        {/* Left taskbar: Start menu with identity specs */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 border-2 border-black bg-black text-[#a7f3d0] font-black text-xs tracking-wider uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5">
            <Cpu className="w-4 h-4 animate-spin-slow" />
            <span>START_OS</span>
          </div>

          <div className="h-6 w-px bg-zinc-400 hidden sm:block" />

          {/* Quick window shortcuts on dock */}
          <div className="hidden sm:flex items-center gap-2">
            {(['bio', 'projects', 'skills', 'contact'] as WindowId[]).map(id => {
              const win = windows[id];
              const isActive = activeWindow === id && win.isOpen && !win.isMinimized;
              const nameMap = { bio: 'profile', projects: 'projects', skills: 'skills', contact: 'contact' };
              return (
                <button
                  key={id}
                  onClick={() => {
                    if (!win.isOpen) {
                      openWindow(id);
                    } else if (win.isMinimized) {
                      setWindows(prev => ({ ...prev, [id]: { ...prev[id], isMinimized: false } }));
                      focusWindow(id);
                    } else if (activeWindow === id) {
                      setWindows(prev => ({ ...prev, [id]: { ...prev[id], isMinimized: true } }));
                    } else {
                      focusWindow(id);
                    }
                  }}
                  className={`px-3 py-1.5 border-2 border-black font-bold text-[11px] uppercase tracking-tight flex items-center gap-1.5 cursor-pointer transition-all ${
                    isActive 
                      ? 'bg-black text-white translate-x-[1px] translate-y-[1px]' 
                      : win.isOpen && !win.isMinimized
                        ? 'bg-zinc-200 text-black border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                        : 'bg-white text-zinc-500 border-zinc-400 hover:bg-zinc-100 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${win.isOpen && !win.isMinimized ? 'bg-[#10b981]' : 'bg-zinc-400'}`} />
                  <span>{nameMap[id]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right taskbar: System clock & credentials */}
        <div className="flex items-center gap-3 font-bold text-[11px] uppercase tracking-wider text-black">
          <div className="hidden md:flex items-center gap-1 bg-[#fed7aa] border border-black px-2 py-0.5 rounded-sm">
            <span>USER: ZARA_BEAUMONT</span>
          </div>
          <div className="flex items-center gap-1 bg-white border-2 border-black px-2.5 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-[10px]">
            <Clock className="w-3.5 h-3.5" />
            <span>{timeStr || '12:00 PM'}</span>
          </div>
        </div>

      </div>

    </div>
  );
};
