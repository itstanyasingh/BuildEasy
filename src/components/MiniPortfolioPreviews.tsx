import React from 'react';

// ============================================================================
// ORIGINAL COLORFUL PORTFOLIO WEBSITE PREVIEWS
// Faithful to their original distinct visual themes, vibrant colors, typography,
// and layout signatures (NO black & white or monochrome filters).
// ============================================================================

export interface MiniPortfolioWebsiteProps {
  id: string;
  category?: string;
  name?: string;
}

export const MiniPortfolioPreview: React.FC<MiniPortfolioWebsiteProps> = ({ id, category, name }) => {
  const normalizedId = (id || '').toLowerCase();

  // --------------------------------------------------------------------------
  // MAGICFOLIO / MINIMAL MODERN DEVELOPER (Minimalist white/zinc canvas, floating dock, clean typography)
  // --------------------------------------------------------------------------
  if (
    normalizedId === 'magicfolio' ||
    normalizedId === 'magicfolio-portfolio' ||
    normalizedId === 'github-magicfolio-023' ||
    normalizedId === 'dillion' ||
    normalizedId === 'dillionverma'
  ) {
    return (
      <div className="w-full h-full bg-white text-zinc-900 p-4 sm:p-5 flex flex-col justify-between font-sans select-none overflow-hidden text-[11px] leading-snug relative">
        {/* Profile Header */}
        <div className="flex items-start justify-between border-b border-zinc-100 pb-2">
          <div className="space-y-0.5">
            <h3 className="font-bold text-sm text-zinc-900 tracking-tight">Hi, I'm Dillion 👋</h3>
            <p className="text-[10px] text-zinc-500">Software Engineer turned Entrepreneur.</p>
          </div>
          <div className="w-7 h-7 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center font-bold text-[10px] text-zinc-700">
            DV
          </div>
        </div>

        {/* About summary */}
        <div className="py-1 space-y-1">
          <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">ABOUT</span>
          <p className="text-[9.5px] text-zinc-600 line-clamp-2 leading-tight">
            I love building products and empowering developers. Currently founding Magic UI.
          </p>
        </div>

        {/* Selected Work Grid */}
        <div className="space-y-1 py-0.5">
          <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 uppercase">
            <span>My Projects</span>
            <span className="text-zinc-600">Selected</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded-lg bg-zinc-50 border border-zinc-200 space-y-0.5">
              <div className="font-bold text-[9.5px] text-zinc-900">Magic UI</div>
              <p className="text-[8.5px] text-zinc-500 line-clamp-1">Component library for design engineers.</p>
              <div className="flex gap-1 pt-0.5">
                <span className="text-[7px] px-1 bg-white border border-zinc-200 rounded text-zinc-700">Next.js</span>
                <span className="text-[7px] px-1 bg-white border border-zinc-200 rounded text-zinc-700">Tailwind</span>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-zinc-50 border border-zinc-200 space-y-0.5">
              <div className="font-bold text-[9.5px] text-zinc-900">Automatic Resume</div>
              <p className="text-[8.5px] text-zinc-500 line-clamp-1">AI-assisted resume builder.</p>
              <div className="flex gap-1 pt-0.5">
                <span className="text-[7px] px-1 bg-white border border-zinc-200 rounded text-zinc-700">React</span>
                <span className="text-[7px] px-1 bg-white border border-zinc-200 rounded text-zinc-700">Node</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mini Floating Bottom Navigation Dock */}
        <div className="pt-1.5 flex justify-center">
          <div className="px-3 py-1 rounded-full bg-zinc-900 text-white flex items-center gap-2 text-[8px] font-mono shadow-md">
            <span className="font-bold">Home</span>
            <span className="opacity-40">|</span>
            <span>Projects</span>
            <span className="opacity-40">|</span>
            <span>Work</span>
            <span className="opacity-40">|</span>
            <span>Contact</span>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 1. MINIMAL DEVELOPER (Clean light theme with vibrant tech colors)
  // --------------------------------------------------------------------------
  if (
    normalizedId === 'minimal' ||
    normalizedId === 'minimal-developer' ||
    normalizedId === 'github-magicui-005'
  ) {
    return (
      <div className="w-full h-full bg-white text-zinc-900 p-4 sm:p-5 flex flex-col justify-between font-sans select-none overflow-hidden text-[11px] leading-snug">
        {/* Header with live status */}
        <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-xs tracking-tight text-zinc-900">Alex Morgan</span>
          </div>
          <div className="flex items-center gap-3 text-[10px] text-zinc-500 font-medium">
            <span className="text-blue-600 font-semibold border-b border-blue-600 pb-0.5">Work</span>
            <span>About</span>
            <span>Stack</span>
            <span>Contact</span>
          </div>
        </div>

        {/* Intro with subtle blue badge */}
        <div className="space-y-1 py-1">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-blue-50 border border-blue-200/60 text-blue-700 font-mono text-[9px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            MINIMAL DEVELOPER
          </div>
          <h4 className="font-serif text-sm sm:text-[15px] font-bold text-zinc-900 leading-tight">
            Building reliable web applications and thoughtful digital products.
          </h4>
          <p className="text-[10px] text-zinc-600 line-clamp-1">
            Software engineer focused on simplicity, performance, and clean interface systems.
          </p>
        </div>

        {/* Selected Projects with authentic colored badges */}
        <div className="space-y-1.5 py-0.5">
          <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 uppercase tracking-wider">
            <span>Selected Projects</span>
            <span className="text-blue-600 font-semibold">2024 — 2026</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-sky-50/70 to-blue-50/40 border border-sky-200/70 space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[10px] text-sky-950">Atlas Component Engine</span>
                <span className="text-[7px] font-bold uppercase px-1 rounded bg-sky-100 text-sky-700">UI KIT</span>
              </div>
              <p className="text-[9px] text-sky-900/80 line-clamp-1">Accessible UI system & token runtime.</p>
              <div className="flex items-center gap-1 pt-0.5">
                <span className="text-[7.5px] px-1 py-0.2 rounded bg-cyan-100 text-cyan-800 font-medium">React</span>
                <span className="text-[7.5px] px-1 py-0.2 rounded bg-blue-100 text-blue-800 font-medium">TypeScript</span>
                <span className="text-[7.5px] px-1 py-0.2 rounded bg-sky-100 text-sky-800 font-medium">Tailwind</span>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-50/70 to-teal-50/40 border border-emerald-200/70 space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[10px] text-emerald-950">Pulse Health Monitor</span>
                <span className="text-[7px] font-bold uppercase px-1 rounded bg-emerald-100 text-emerald-700">LIVE</span>
              </div>
              <p className="text-[9px] text-emerald-900/80 line-clamp-1">Server telemetry with real-time alerts.</p>
              <div className="flex items-center gap-1 pt-0.5">
                <span className="text-[7.5px] px-1 py-0.2 rounded bg-zinc-100 text-zinc-800 font-medium">Next.js</span>
                <span className="text-[7.5px] px-1 py-0.2 rounded bg-emerald-100 text-emerald-800 font-medium">Node</span>
                <span className="text-[7.5px] px-1 py-0.2 rounded bg-indigo-100 text-indigo-800 font-medium">PostgreSQL</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-100 text-[9px] text-zinc-600 font-mono">
          <span className="text-zinc-500">React · TypeScript · Node.js</span>
          <span className="text-blue-600 font-semibold hover:underline">alex@morgan.dev</span>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 2. CREATIVE DEVELOPER (Rich deep space, glowing purple & neon cyan)
  // --------------------------------------------------------------------------
  if (
    normalizedId === 'creative' ||
    normalizedId === 'creative-developer' ||
    normalizedId === 'github-folio-003' ||
    normalizedId === 'github-adrian-002' ||
    normalizedId === 'github-hamish-004'
  ) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#0c081e] via-[#120d2c] to-[#081026] text-white p-4 sm:p-5 flex flex-col justify-between font-sans select-none overflow-hidden text-[11px] leading-snug">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-purple-900/40 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500"></span>
            <span className="font-bold text-xs tracking-tight text-white">Maya Lin</span>
          </div>
          <div className="flex items-center gap-2 text-[9px] font-mono text-purple-300">
            <span className="text-cyan-400">[Interactive]</span>
            <span className="text-fuchsia-400">[3D Shaders]</span>
            <span className="text-purple-300">[Audio]</span>
          </div>
        </div>

        {/* Intro */}
        <div className="space-y-1 py-1">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-purple-950/80 border border-purple-500/40 text-fuchsia-300 font-mono text-[9px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400"></span>
            CREATIVE DEVELOPER
          </div>
          <h4 className="font-serif text-sm sm:text-[15px] font-normal text-white leading-tight">
            Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-300 font-medium">tactile web experiences</span> & interactive graphics.
          </h4>
          <p className="text-[10px] text-purple-200/80 line-clamp-1">
            Bridging creative coding with WebGL, GLSL shaders, and generative sound.
          </p>
        </div>

        {/* Projects */}
        <div className="space-y-1.5 py-0.5">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-900/50 to-purple-950/70 border border-purple-500/40 space-y-1 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[10px] text-cyan-300">SoundStage 3D</span>
                <span className="text-[7px] font-mono px-1 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">AUDIO API</span>
              </div>
              {/* Colorful audio spectrum preview bar */}
              <div className="flex items-end gap-0.5 h-2.5 py-0.5">
                {[40, 80, 60, 100, 75, 45, 90, 60, 100, 70, 50, 85].map((h, i) => (
                  <span 
                    key={i} 
                    style={{ height: `${h}%` }} 
                    className="w-1 rounded-xs bg-gradient-to-t from-cyan-500 to-fuchsia-500"
                  />
                ))}
              </div>
              <div className="flex items-center gap-1 text-[7.5px] text-purple-200 font-mono">
                <span>WebGL</span> · <span>Three.js</span> · <span>GLSL</span>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-gradient-to-br from-rose-950/40 to-amber-950/40 border border-rose-500/40 space-y-1 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[10px] text-amber-300">Form & Motion</span>
                <span className="text-[7px] font-mono px-1 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-500/40">PHYSICS</span>
              </div>
              {/* Colorful particle preview */}
              <div className="flex items-center gap-1 py-0.5">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-500"></span>
                <span className="w-1 h-1 rounded-full bg-cyan-400"></span>
                <span className="text-[8px] text-rose-200/90 font-mono">2.4k particles</span>
              </div>
              <div className="flex items-center gap-1 text-[7.5px] text-rose-200 font-mono">
                <span>Canvas</span> · <span>React</span> · <span>Motion</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-purple-900/40 text-[9px] text-purple-300 font-mono">
          <span>Three.js · GLSL · Canvas API</span>
          <span className="text-cyan-400 font-semibold">maya@lin.design</span>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 3. EDITORIAL DEVELOPER (Warm cream, terracotta orange, refined serif)
  // --------------------------------------------------------------------------
  if (
    normalizedId === 'editorial' ||
    normalizedId === 'editorial-developer' ||
    normalizedId === 'github-alex-013'
  ) {
    return (
      <div className="w-full h-full bg-[#FAF5EE] text-amber-950 p-4 sm:p-5 flex flex-col justify-between font-sans select-none overflow-hidden text-[11px] leading-snug">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-200/70 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="font-serif italic font-bold text-xs text-amber-950">Julian Vance</span>
            <span className="text-[8px] font-mono px-1.5 py-0.2 rounded bg-orange-100 text-orange-800 border border-orange-200 font-semibold">EDITION 04</span>
          </div>
          <div className="text-[9px] font-mono text-amber-800/80 uppercase tracking-wider font-semibold">Selected Works · 2026</div>
        </div>

        {/* Intro */}
        <div className="space-y-1 py-1">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-orange-50 border border-orange-200 text-orange-800 font-mono text-[9px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
            EDITORIAL DEVELOPER
          </div>
          <h4 className="font-serif text-sm sm:text-[15px] font-normal text-amber-950 leading-tight">
            Writing software at the intersection of <span className="italic text-orange-900 font-medium">typography, editorial systems,</span> and web speed.
          </h4>
          <p className="text-[10px] text-amber-900/80 line-clamp-1 font-serif italic">
            Specializing in publication systems, digital archives, and refined reading experiences.
          </p>
        </div>

        {/* Projects */}
        <div className="space-y-1.5 py-0.5">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded-lg bg-white border border-amber-200/90 space-y-0.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-[10px] text-amber-950">Monograph Reader</span>
                <span className="text-[7.5px] font-mono px-1 rounded bg-amber-100 text-amber-800 font-semibold">ARCHIVE</span>
              </div>
              <p className="text-[9px] text-amber-900/80 line-clamp-1">Fluid typography publication engine.</p>
              <div className="flex items-center gap-1 pt-0.5">
                <span className="text-[7.5px] px-1 py-0.2 rounded bg-orange-50 text-orange-800 border border-orange-200/60 font-medium">Next.js</span>
                <span className="text-[7.5px] px-1 py-0.2 rounded bg-amber-50 text-amber-800 border border-amber-200/60 font-medium">Typography</span>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-white border border-amber-200/90 space-y-0.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-[10px] text-amber-950">Archival Index</span>
                <span className="text-[7.5px] font-mono px-1 rounded bg-emerald-100 text-emerald-800 font-semibold">LIBRARY</span>
              </div>
              <p className="text-[9px] text-amber-900/80 line-clamp-1">Curated architectural photography gallery.</p>
              <div className="flex items-center gap-1 pt-0.5">
                <span className="text-[7.5px] px-1 py-0.2 rounded bg-teal-50 text-teal-800 border border-teal-200/60 font-medium">GraphQL</span>
                <span className="text-[7.5px] px-1 py-0.2 rounded bg-amber-50 text-amber-800 border border-amber-200/60 font-medium">CSS Grid</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-amber-200/70 text-[9px] text-amber-900/80">
          <span className="font-serif italic">Lead Frontend Engineer @ Monocle</span>
          <span className="font-mono text-orange-800 font-semibold">julian@vance.studio</span>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 4. PRODUCT DESIGNER (Figma-inspired palette: purple, coral, teal, amber)
  // --------------------------------------------------------------------------
  if (
    normalizedId === 'designer' ||
    normalizedId === 'product-designer' ||
    normalizedId === 'github-daniel-011' ||
    normalizedId === 'github-kalvin-012'
  ) {
    return (
      <div className="w-full h-full bg-white text-zinc-900 p-4 sm:p-5 flex flex-col justify-between font-sans select-none overflow-hidden text-[11px] leading-snug">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="font-serif font-bold text-xs text-zinc-900">Elena Rostova</span>
            <span className="text-[8px] font-mono px-1.5 py-0.2 rounded bg-purple-100 text-purple-700 font-semibold border border-purple-200">FIGMA LEAD</span>
          </div>
          <div className="flex items-center gap-3 text-[10px] text-zinc-500 font-medium">
            <span className="text-purple-600 font-semibold border-b border-purple-600 pb-0.5">Case Studies</span>
            <span>Systems</span>
            <span>About</span>
          </div>
        </div>

        {/* Intro */}
        <div className="space-y-1 py-1">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-purple-50 border border-purple-200 text-purple-700 font-mono text-[9px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
            PRODUCT DESIGNER
          </div>
          <h4 className="font-serif text-sm sm:text-[15px] font-normal text-zinc-900 leading-tight">
            Designing clear, scalable <span className="text-purple-700 font-medium">design systems</span> & digital products for enterprise.
          </h4>
          <p className="text-[10px] text-zinc-600 line-clamp-1">
            Over 7 years designing token frameworks and accessible component libraries.
          </p>
        </div>

        {/* Projects */}
        <div className="space-y-1.5 py-0.5">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-violet-50/80 to-purple-50/50 border border-violet-200/80 space-y-1 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-[10px] text-violet-950">Fintech Pro System</span>
                <span className="text-[7.5px] font-mono px-1 rounded bg-violet-100 text-violet-800 font-semibold">20+ TEAMS</span>
              </div>
              {/* Colorful token preview dots */}
              <div className="flex items-center gap-1 py-0.5">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-500 ring-1 ring-white"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 ring-1 ring-white"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 ring-1 ring-white"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-1 ring-white"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 ring-1 ring-white"></span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[7.5px] px-1 py-0.2 rounded bg-violet-100 text-violet-800 font-medium">Tokens</span>
                <span className="text-[7.5px] px-1 py-0.2 rounded bg-purple-100 text-purple-800 font-medium">Figma</span>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-gradient-to-br from-teal-50/80 to-emerald-50/50 border border-teal-200/80 space-y-1 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-[10px] text-teal-950">ClinicFlow Triage</span>
                <span className="text-[7.5px] font-mono px-1 rounded bg-teal-100 text-teal-800 font-semibold">HEALTHCARE</span>
              </div>
              {/* Metric highlight */}
              <div className="flex items-center gap-1 text-[8.5px] text-teal-800 font-semibold py-0.5">
                <span className="px-1 rounded bg-teal-200/70 text-teal-900">-35%</span>
                <span>intake duration</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[7.5px] px-1 py-0.2 rounded bg-teal-100 text-teal-800 font-medium">Research</span>
                <span className="text-[7.5px] px-1 py-0.2 rounded bg-emerald-100 text-emerald-800 font-medium">Mobile UI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-100 text-[9px] text-zinc-600">
          <span>Staff Product Designer @ Figma</span>
          <span className="font-mono text-purple-700 font-semibold">elena@rostova.com</span>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 5. VS CODE DEVELOPER (Authentic colorful IDE editor tabs & syntax)
  // --------------------------------------------------------------------------
  if (normalizedId === 'github-vscode-008') {
    return (
      <div className="w-full h-full bg-[#1e1e1e] text-zinc-200 p-4 sm:p-5 flex flex-col justify-between font-mono select-none overflow-hidden text-[10px] leading-snug">
        {/* Editor Tab Bar */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2 text-[10px]">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[#2d2d2d] text-blue-400 border-t-2 border-blue-500 rounded-t text-[9px] flex items-center gap-1">
              <span className="text-blue-400 font-bold">TS</span> experience.tsx
            </span>
            <span className="text-yellow-400 text-[9px] flex items-center gap-1">
              <span className="text-yellow-500 font-bold">{'{ }'}</span> projects.json
            </span>
          </div>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-700/50">VS Code IDE</span>
        </div>

        {/* Terminal / Code Bio */}
        <div className="space-y-1 py-1">
          <div className="text-emerald-400 text-[9px] font-semibold">// Nitin Ranganath — Systems & Full-Stack</div>
          <div className="text-zinc-100 text-xs">
            <span className="text-purple-400">const</span> <span className="text-blue-400">engineer</span> = {'{'} <span className="text-sky-300">role</span>: <span className="text-amber-300">"Full-Stack Lead"</span> {'}'};
          </div>
          <p className="text-zinc-400 text-[9.5px] leading-relaxed">
            Building high-throughput API gateways, cloud infra, and low-latency client systems.
          </p>
        </div>

        {/* Projects in code structure */}
        <div className="grid grid-cols-2 gap-2 py-0.5">
          <div className="p-2 rounded bg-[#252526] border border-cyan-900/50 space-y-0.5">
            <div className="text-cyan-400 font-bold text-[9px] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span> 01_k8s_scheduler.go
            </div>
            <div className="text-zinc-400 text-[8px]">Distributed worker pool engine</div>
            <div className="text-[7.5px] text-cyan-300 pt-0.5">Go · Kubernetes · Docker</div>
          </div>
          <div className="p-2 rounded bg-[#252526] border border-orange-900/50 space-y-0.5">
            <div className="text-orange-400 font-bold text-[9px] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span> 02_redis_cluster.rs
            </div>
            <div className="text-zinc-400 text-[8px]">In-memory caching pipeline</div>
            <div className="text-[7.5px] text-orange-300 pt-0.5">Rust · Redis · Raft</div>
          </div>
        </div>

        {/* Terminal Status Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-[9px] bg-[#007acc] text-white -mx-4 -mb-4 sm:-mx-5 sm:-mb-5 px-4 py-1">
          <span className="flex items-center gap-2">
            <span>⑂ main*</span>
            <span>0 errors</span>
            <span>UTF-8</span>
          </span>
          <span className="font-semibold">nitin@ranganath.dev</span>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 6. STUDENT / ENTRY-LEVEL (Berkeley Blue, Golden honor badge, colorful tags)
  // --------------------------------------------------------------------------
  if (
    normalizedId === 'student' ||
    normalizedId === 'studio' ||
    normalizedId === 'student-developer'
  ) {
    return (
      <div className="w-full h-full bg-white text-zinc-900 p-4 sm:p-5 flex flex-col justify-between font-sans select-none overflow-hidden text-[11px] leading-snug">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-blue-100 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-xs tracking-tight text-blue-900">Sam Rivera</span>
            <span className="text-[8px] font-mono px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-semibold border border-amber-200">GPA 3.85</span>
          </div>
          <div className="flex items-center gap-3 text-[10px] text-zinc-500 font-medium">
            <span className="text-blue-700 font-semibold border-b border-blue-700 pb-0.5">Projects</span>
            <span>Coursework</span>
            <span>Skills</span>
          </div>
        </div>

        {/* Intro */}
        <div className="space-y-1 py-1">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-blue-800 font-mono text-[9px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            STUDENT / ENTRY-LEVEL
          </div>
          <h4 className="font-serif text-sm sm:text-[15px] font-bold text-zinc-900 leading-tight">
            Software engineer passionate about <span className="text-blue-700">modern web systems</span> and open source.
          </h4>
          <p className="text-[10px] text-zinc-600 line-clamp-1">
            B.S. Computer Science (2025). Seeking full-time frontend or full-stack software roles.
          </p>
        </div>

        {/* Projects */}
        <div className="space-y-1.5 py-0.5">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 space-y-0.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[10px] text-indigo-950">StudyGroup Sync</span>
                <span className="text-[7.5px] font-mono px-1 rounded bg-purple-100 text-purple-800 font-semibold">HACKATHON 1ST</span>
              </div>
              <p className="text-[9px] text-indigo-900/80 line-clamp-1">Real-time peer whiteboard app.</p>
              <div className="flex items-center gap-1 pt-0.5">
                <span className="text-[7.5px] px-1 py-0.2 rounded bg-blue-100 text-blue-800 font-medium">React</span>
                <span className="text-[7.5px] px-1 py-0.2 rounded bg-emerald-100 text-emerald-800 font-medium">Node.js</span>
                <span className="text-[7.5px] px-1 py-0.2 rounded bg-purple-100 text-purple-800 font-medium">WebSockets</span>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 space-y-0.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[10px] text-amber-950">Campus Eats Tracker</span>
                <span className="text-[7.5px] font-mono px-1 rounded bg-amber-200 text-amber-900 font-semibold">FULL-STACK</span>
              </div>
              <p className="text-[9px] text-amber-900/80 line-clamp-1">Dining hall nutrition and meal planner.</p>
              <div className="flex items-center gap-1 pt-0.5">
                <span className="text-[7.5px] px-1 py-0.2 rounded bg-blue-100 text-blue-800 font-medium">TypeScript</span>
                <span className="text-[7.5px] px-1 py-0.2 rounded bg-zinc-100 text-zinc-800 font-medium">Next.js</span>
                <span className="text-[7.5px] px-1 py-0.2 rounded bg-amber-100 text-amber-800 font-medium">SQLite</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-blue-100 text-[9px] text-blue-950 font-mono">
          <span>UC Berkeley · CS B.S.</span>
          <span className="text-blue-700 font-semibold">sam.rivera@berkeley.edu</span>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 6.5 CLEANFOLIO (Clean Developer, ocean blue #2978b5, elevated cards, clean typography)
  // --------------------------------------------------------------------------
  if (
    normalizedId === 'cleanfolio' ||
    normalizedId === 'clean-developer' ||
    normalizedId === 'cleanfoliodeveloper' ||
    normalizedId === 'clean-developer-portfolio' ||
    normalizedId === 'github-cleanfolio-010' ||
    normalizedId === 'rjshkhr'
  ) {
    return (
      <div className="w-full h-full bg-[#fcfcfc] text-[#555] p-4 sm:p-5 flex flex-col justify-between font-sans select-none overflow-hidden text-[11px] leading-snug">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
          <div className="font-bold text-sm text-[#2978b5] tracking-tight">JS.</div>
          <div className="flex items-center gap-2.5 text-[9.5px] text-[#555] lowercase font-medium">
            <span className="hover:text-[#2978b5]">projects</span>
            <span className="hover:text-[#2978b5]">skills</span>
            <span className="hover:text-[#2978b5]">contact</span>
            <span className="px-2 py-0.5 rounded border border-[#2978b5] text-[#2978b5] font-semibold text-[8.5px]">resume</span>
            <span className="text-amber-500 text-[10px]">☀️</span>
          </div>
        </div>

        {/* Hero */}
        <div className="text-center space-y-1 py-1">
          <h3 className="text-[13px] sm:text-[14px] font-bold text-[#222]">
            Hi, I am <span className="text-[#2978b5]">John Smith</span>.
          </h3>
          <h4 className="text-[11px] font-semibold text-[#555]">A Front End Engineer.</h4>
          <p className="text-[9px] text-[#666] max-w-xs mx-auto line-clamp-1">
            Clean and focused developer portfolio with selected projects and skills.
          </p>
          <div className="flex items-center justify-center gap-2 pt-0.5">
            <span className="px-2.5 py-0.5 rounded border border-[#2978b5] text-[#2978b5] font-semibold text-[8px] uppercase tracking-wide">
              resume
            </span>
            <span className="text-zinc-500 text-[10px]">🐙</span>
            <span className="text-[#2978b5] text-[10px]">in</span>
          </div>
        </div>

        {/* Projects Showcase */}
        <div className="space-y-1">
          <div className="text-center">
            <span className="text-[9px] font-bold text-[#222] uppercase tracking-wider">PROJECTS</span>
            <div className="w-4 h-0.5 bg-[#2978b5] mx-auto mt-0.5 rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded bg-white shadow-sm border border-zinc-100 space-y-0.5 text-left">
              <div className="font-bold text-[9.5px] text-[#222]">Component Library</div>
              <p className="text-[8px] text-[#777] line-clamp-1">Accessible React UI components and tokens.</p>
              <div className="flex items-center gap-1 text-[7px] text-[#888] font-mono pt-0.5">
                <span>React</span>
                <span>•</span>
                <span>TypeScript</span>
                <span>•</span>
                <span>CSS</span>
              </div>
            </div>
            <div className="p-2 rounded bg-white shadow-sm border border-zinc-100 space-y-0.5 text-left">
              <div className="font-bold text-[9.5px] text-[#222]">Telemetry Suite</div>
              <p className="text-[8px] text-[#777] line-clamp-1">Real-time charts and live telemetry metrics.</p>
              <div className="flex items-center gap-1 text-[7px] text-[#888] font-mono pt-0.5">
                <span>Next.js</span>
                <span>•</span>
                <span>Tailwind</span>
                <span>•</span>
                <span>Chart.js</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer / Skills summary */}
        <div className="flex items-center justify-between pt-1.5 border-t border-zinc-100 text-[8.5px] text-[#777]">
          <div className="flex items-center gap-1">
            <span className="px-1.5 py-0.2 rounded bg-white shadow-2xs text-[#444] font-medium text-[7.5px]">React</span>
            <span className="px-1.5 py-0.2 rounded bg-white shadow-2xs text-[#444] font-medium text-[7.5px]">TypeScript</span>
            <span className="px-1.5 py-0.2 rounded bg-white shadow-2xs text-[#444] font-medium text-[7.5px]">Git</span>
          </div>
          <span className="px-2 py-0.5 rounded border border-[#2978b5] text-[#2978b5] font-semibold text-[8px] lowercase">
            email me
          </span>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 7. CYBER-ORGANIC DEVELOPER (Terminal UI, code-driven layout, emerald/cyan)
  // --------------------------------------------------------------------------
  if (
    normalizedId === 'cyberorganic' ||
    normalizedId === 'cyber-organic' ||
    normalizedId === 'cyber-organic-developer' ||
    normalizedId === 'github-cyber-organic-014' ||
    normalizedId === 'terminal'
  ) {
    return (
      <div className="w-full h-full bg-[#080b11] text-zinc-100 p-4 sm:p-5 flex flex-col justify-between font-mono select-none overflow-hidden text-[10.5px] leading-snug">
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between border-b border-emerald-900/40 pb-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            </div>
            <span className="font-bold text-[10px] text-emerald-400">alex_vance.sh</span>
          </div>
          <div className="flex items-center gap-2 text-[9px] text-zinc-400">
            <span className="text-emerald-400">home()</span>
            <span>work()</span>
            <span>projects()</span>
            <span className="px-1 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">ONLINE</span>
          </div>
        </div>

        {/* Intro */}
        <div className="space-y-1 py-1">
          <div className="flex items-center gap-1.5 text-[9px] text-zinc-400">
            <span className="text-emerald-400 font-bold">00 //</span>
            <span className="text-purple-400">const</span> <span className="text-blue-400">role</span> = <span className="text-amber-300">"Systems &amp; Full-Stack"</span>;
          </div>
          <h4 className="font-serif text-sm sm:text-[14px] font-normal text-white leading-tight">
            Architecting <span className="text-emerald-400 italic font-serif">resilient systems</span> &amp; code interfaces.
          </h4>
          <div className="text-[9px] text-zinc-400 line-clamp-1">
            <span className="text-emerald-500/80">$</span> status: OPEN_TO_WORK · latency: 14ms
          </div>
        </div>

        {/* Case Files */}
        <div className="space-y-1.5 py-0.5">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded-lg bg-zinc-950 border border-emerald-900/50 space-y-0.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[9.5px] text-emerald-300">FILE_01.rs</span>
                <span className="text-[7px] font-mono px-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">DEPLOYED</span>
              </div>
              <p className="text-[8.5px] text-zinc-300 line-clamp-1">Aether Distributed KV Engine</p>
              <div className="flex items-center gap-1 pt-0.5 text-[7.5px] text-zinc-400">
                <span className="text-cyan-400">Rust</span> · <span className="text-emerald-400">Raft</span> · <span className="text-blue-400">gRPC</span>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-zinc-950 border border-cyan-900/50 space-y-0.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[9.5px] text-cyan-300">FILE_02.ts</span>
                <span className="text-[7px] font-mono px-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">ACTIVE</span>
              </div>
              <p className="text-[8.5px] text-zinc-300 line-clamp-1">Nexus Compiler Toolchain</p>
              <div className="flex items-center gap-1 pt-0.5 text-[7.5px] text-zinc-400">
                <span className="text-yellow-400">TypeScript</span> · <span className="text-purple-400">Wasm</span>
              </div>
            </div>
          </div>
        </div>

        {/* Terminal Execution Footer */}
        <div className="flex items-center justify-between pt-1.5 border-t border-emerald-900/40 text-[9px] text-zinc-400">
          <span className="text-emerald-400 font-semibold">$ get_in_touch()</span>
          <span className="text-zinc-500">alex@vance.dev</span>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 14. INTERACTIVE DEVELOPER (Sudhanva Nadiger - Dark interactive developer with purple/indigo neon and marquee)
  // --------------------------------------------------------------------------
  if (
    normalizedId === 'interactive' ||
    normalizedId === 'interactive-developer' ||
    normalizedId === 'interactivedeveloper' ||
    normalizedId === 'github-sudhanva-015'
  ) {
    return (
      <div className="w-full h-full bg-[#07090e] text-slate-100 p-4 sm:p-5 flex flex-col justify-between font-sans select-none overflow-hidden text-[11px] leading-snug relative border border-indigo-900/40">
        {/* Subtle glowing ambient gradient */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-600/20 blur-3xl pointer-events-none rounded-full" />
        
        {/* Header with status badge */}
        <div className="flex items-center justify-between border-b border-indigo-900/40 pb-2 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
              S
            </div>
            <span className="font-bold text-xs tracking-tight text-white font-mono">Sudhanva Nadiger</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 font-mono text-[8.5px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            OPEN FOR ROLES
          </div>
        </div>

        {/* Hero headline & terminal preview */}
        <div className="space-y-1.5 py-1 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono text-indigo-400 bg-indigo-950/70 px-1.5 py-0.5 rounded border border-indigo-900">
              INTERACTIVE_DEV
            </span>
            <span className="text-[9px] font-mono text-purple-400">4+ YRS EXP</span>
          </div>
          <h4 className="text-sm sm:text-[14px] font-extrabold text-white leading-tight">
            Building performant distributed systems &amp; reactive frontends.
          </h4>
          <p className="text-[9.5px] text-slate-400 line-clamp-1">
            Software engineer passionate about interactive graphics, cloud architectures, and open-source tooling.
          </p>
        </div>

        {/* Mini Marquee Preview Strip */}
        <div className="py-1 px-2 rounded bg-indigo-950/40 border border-indigo-900/40 font-mono text-[8px] text-indigo-300 font-bold flex items-center justify-between overflow-hidden relative z-10">
          <span>REACT</span>
          <span className="text-indigo-500">✦</span>
          <span>TYPESCRIPT</span>
          <span className="text-indigo-500">✦</span>
          <span>GO</span>
          <span className="text-indigo-500">✦</span>
          <span>KUBERNETES</span>
          <span className="text-indigo-500">✦</span>
          <span>OPEN SOURCE</span>
        </div>

        {/* Project Case Cards & Open Source preview */}
        <div className="space-y-1.5 py-0.5 relative z-10">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded-lg bg-slate-900/90 border border-indigo-800/50 space-y-0.5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[10px] text-indigo-200">Aura KV Engine</span>
                <span className="text-[7.5px] font-mono px-1 rounded bg-indigo-950 text-indigo-300 border border-indigo-600/40">PROD</span>
              </div>
              <p className="text-[8.5px] text-slate-300 line-clamp-1">Distributed memory cache with Raft.</p>
              <div className="flex items-center gap-1 pt-0.5">
                <span className="text-[7.5px] px-1 py-0.2 rounded bg-indigo-900/60 text-indigo-300 font-mono">Go</span>
                <span className="text-[7.5px] px-1 py-0.2 rounded bg-purple-900/60 text-purple-300 font-mono">Raft</span>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-slate-900/90 border border-purple-800/50 space-y-0.5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[10px] text-purple-200">Chronos Canvas</span>
                <span className="text-[7.5px] font-mono px-1 rounded bg-purple-950 text-purple-300 border border-purple-600/40">LIVE</span>
              </div>
              <p className="text-[8.5px] text-slate-300 line-clamp-1">Real-time collaborative whiteboard.</p>
              <div className="flex items-center gap-1 pt-0.5">
                <span className="text-[7.5px] px-1 py-0.2 rounded bg-indigo-900/60 text-indigo-300 font-mono">React</span>
                <span className="text-[7.5px] px-1 py-0.2 rounded bg-pink-900/60 text-pink-300 font-mono">CRDT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1.5 border-t border-indigo-900/40 text-[8.5px] text-slate-400 font-mono relative z-10">
          <span className="text-indigo-400 font-semibold">60+ Merged OS PRs</span>
          <span className="text-purple-400 font-semibold">sudhanva.dev</span>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 15. NIKHIL — INTERACTIVE DEVELOPER (Nikhil Rajput - Dark cosmic canvas with cyan/indigo glow and case study cards)
  // --------------------------------------------------------------------------
  if (
    normalizedId === 'nikhil' ||
    normalizedId === 'nikhil-interactive' ||
    normalizedId === 'nixrajput' ||
    normalizedId === 'github-nixrajput-016' ||
    normalizedId === 'interactive-creative' ||
    normalizedId === 'interactive-creative-developer'
  ) {
    return (
      <div className="w-full h-full bg-[#050814] text-slate-100 p-4 sm:p-5 flex flex-col justify-between font-sans select-none overflow-hidden text-[11px] leading-snug relative border border-sky-900/40">
        {/* Subtle glowing ambient gradient flare */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-sky-500/20 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-indigo-500/15 blur-2xl pointer-events-none rounded-full" />
        
        {/* Header with status badge */}
        <div className="flex items-center justify-between border-b border-sky-950/80 pb-2 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-sky-400 via-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
              N
            </div>
            <div className="leading-none">
              <span className="font-bold text-xs tracking-tight text-white block">Nikhil Rajput</span>
              <span className="text-[8px] text-sky-400 font-mono">Full-Stack &amp; UI/UX</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-sky-950/80 border border-sky-500/40 text-sky-300 font-mono text-[8px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            AVAILABLE FOR HIRE
          </div>
        </div>

        {/* Hero headline & subtext */}
        <div className="space-y-1.5 py-1 relative z-10">
          <div className="inline-flex items-center gap-1 text-[8.5px] font-mono text-sky-300 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-900">
            <span>🚀 SOFTWARE ENGINEER</span>
          </div>
          <h4 className="text-sm sm:text-[13.5px] font-extrabold text-white leading-tight">
            Crafting scalable web systems &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">interactive experiences</span>.
          </h4>
          <p className="text-[9px] text-slate-400 line-clamp-1">
            Passionate full-stack developer engineering reactive interfaces and robust cloud microservices.
          </p>
        </div>

        {/* Metric Badges Strip */}
        <div className="grid grid-cols-3 gap-1.5 py-0.5 relative z-10">
          <div className="px-2 py-1 rounded bg-slate-900/80 border border-slate-800 text-center">
            <div className="text-[10px] font-bold text-white">4+ Yrs</div>
            <div className="text-[7.5px] text-slate-400 font-mono">Experience</div>
          </div>
          <div className="px-2 py-1 rounded bg-slate-900/80 border border-slate-800 text-center">
            <div className="text-[10px] font-bold text-sky-400">20+ Works</div>
            <div className="text-[7.5px] text-slate-400 font-mono">Shipped</div>
          </div>
          <div className="px-2 py-1 rounded bg-slate-900/80 border border-slate-800 text-center">
            <div className="text-[10px] font-bold text-indigo-400">100% Clean</div>
            <div className="text-[7.5px] text-slate-400 font-mono">Accessible</div>
          </div>
        </div>

        {/* Project Case Cards Preview */}
        <div className="space-y-1.5 py-0.5 relative z-10">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded-lg bg-slate-900/90 border border-sky-800/50 space-y-0.5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[9.5px] text-sky-200">Nexus Platform</span>
                <span className="text-[7px] font-mono px-1 rounded bg-sky-950 text-sky-300 border border-sky-600/40">FEATURED</span>
              </div>
              <p className="text-[8px] text-slate-300 line-clamp-1">Cloud dashboard &amp; telemetry system.</p>
              <div className="flex items-center gap-1 pt-0.5">
                <span className="text-[7px] px-1 py-0.2 rounded bg-sky-900/60 text-sky-300 font-mono">Next.js</span>
                <span className="text-[7px] px-1 py-0.2 rounded bg-indigo-900/60 text-indigo-300 font-mono">TS</span>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-slate-900/90 border border-indigo-800/50 space-y-0.5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[9.5px] text-indigo-200">Aether Canvas</span>
                <span className="text-[7px] font-mono px-1 rounded bg-indigo-950 text-indigo-300 border border-indigo-600/40">LIVE</span>
              </div>
              <p className="text-[8px] text-slate-300 line-clamp-1">Multiplayer real-time design tool.</p>
              <div className="flex items-center gap-1 pt-0.5">
                <span className="text-[7px] px-1 py-0.2 rounded bg-indigo-900/60 text-indigo-300 font-mono">React</span>
                <span className="text-[7px] px-1 py-0.2 rounded bg-purple-900/60 text-purple-300 font-mono">Canvas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1.5 border-t border-sky-950/80 text-[8px] text-slate-400 font-mono relative z-10">
          <span className="text-sky-400 font-semibold">Next.js · TypeScript · Node.js</span>
          <span className="text-indigo-400 font-semibold">nikhilrajput.dev</span>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 16. MODERN SOFTWARE DEVELOPER (Hanzla Tauqeer - 1hanzla100/developer-portfolio)
  // --------------------------------------------------------------------------
  if (
    normalizedId === 'hanzla' ||
    normalizedId === 'hanzla-developer' ||
    normalizedId === 'modern-software-developer' ||
    normalizedId === 'modernsoftwaredeveloper' ||
    normalizedId === 'github-hanzla-017'
  ) {
    return (
      <div className="w-full h-full bg-[#0d1117] text-slate-100 p-4 sm:p-5 flex flex-col justify-between font-sans select-none overflow-hidden text-[11px] leading-snug relative border border-indigo-900/50">
        {/* Ambient indigo glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/20 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-0 w-28 h-28 bg-purple-600/15 blur-2xl pointer-events-none rounded-full" />

        {/* Top Navbar Simulation */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 relative z-10">
          <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-white">
            <span className="text-indigo-400">&lt;</span>
            <span>Hanzla Tauqeer</span>
            <span className="text-indigo-400">/&gt;</span>
          </div>
          <div className="flex items-center gap-2 text-[8.5px] font-semibold text-slate-400">
            <span className="text-indigo-400">Skills</span>
            <span>Experience</span>
            <span>Projects</span>
          </div>
        </div>

        {/* Hero Banner with Greeting and Mini Terminal */}
        <div className="space-y-1.5 py-1 relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-[8.5px] font-mono text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded-full border border-indigo-500/40">
              ⚡ FULL STACK DEV
            </span>
            <span className="text-[8px] font-mono text-emerald-400">● AVAILABLE</span>
          </div>
          <h4 className="text-sm sm:text-[13.5px] font-extrabold text-white leading-tight">
            Hi all, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">Hanzla</span> ⚡
          </h4>
          <p className="text-[9px] text-slate-400 line-clamp-1">
            Building modern web &amp; mobile apps with React, Node.js, Python, and cloud microservices.
          </p>
        </div>

        {/* Mini Proficiency Progress Bar Strip */}
        <div className="space-y-1 py-0.5 relative z-10 bg-slate-900/90 p-2 rounded-lg border border-slate-800">
          <div className="flex justify-between text-[8px] font-mono font-bold">
            <span className="text-slate-300">Frontend (React / Next.js)</span>
            <span className="text-indigo-400">92%</span>
          </div>
          <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="w-[92%] h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full" />
          </div>
          <div className="flex justify-between text-[8px] font-mono font-bold pt-0.5">
            <span className="text-slate-300">Backend &amp; Cloud (Node / AWS)</span>
            <span className="text-purple-400">88%</span>
          </div>
          <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="w-[88%] h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" />
          </div>
        </div>

        {/* Project Cards with GitHub Stars badges */}
        <div className="space-y-1.5 py-0.5 relative z-10">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded-lg bg-slate-900/90 border border-indigo-800/50 space-y-0.5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[9.5px] text-indigo-200">Dev Portfolio</span>
                <span className="text-[7.5px] font-mono px-1 rounded bg-slate-950 text-amber-300 border border-slate-800">★ 342</span>
              </div>
              <p className="text-[8px] text-slate-300 line-clamp-1">Open source portfolio master.</p>
              <div className="flex items-center gap-1 pt-0.5">
                <span className="text-[7px] px-1 py-0.2 rounded bg-indigo-950 text-indigo-300 font-mono">React</span>
                <span className="text-[7px] px-1 py-0.2 rounded bg-purple-950 text-purple-300 font-mono">Next.js</span>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-slate-900/90 border border-cyan-800/50 space-y-0.5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[9.5px] text-cyan-200">CloudScale Engine</span>
                <span className="text-[7.5px] font-mono px-1 rounded bg-slate-950 text-amber-300 border border-slate-800">★ 184</span>
              </div>
              <p className="text-[8px] text-slate-300 line-clamp-1">Microservices dashboard.</p>
              <div className="flex items-center gap-1 pt-0.5">
                <span className="text-[7px] px-1 py-0.2 rounded bg-cyan-950 text-cyan-300 font-mono">Node</span>
                <span className="text-[7px] px-1 py-0.2 rounded bg-indigo-950 text-indigo-300 font-mono">Docker</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1.5 border-t border-slate-800 text-[8px] text-slate-400 font-mono relative z-10">
          <span className="text-indigo-400 font-semibold">Made with ❤️ by Hanzla</span>
          <span className="text-cyan-400 font-semibold">github.com/1hanzla100</span>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 17. REACT DEVELOPER (Yuji Sato - yujisatojr/react-portfolio-template)
  // --------------------------------------------------------------------------
  if (
    normalizedId === 'react-developer' ||
    normalizedId === 'reactdeveloper' ||
    normalizedId === 'yuji' ||
    normalizedId === 'yujisato' ||
    normalizedId === 'yujisatojr' ||
    normalizedId === 'github-yujisato-018'
  ) {
    return (
      <div className="w-full h-full bg-[#1f242d] text-slate-100 p-4 sm:p-5 flex flex-col justify-between font-sans select-none overflow-hidden text-[11px] leading-snug relative border border-[#0ef]/30 shadow-[0_0_20px_rgba(0,238,255,0.15)]">
        {/* Glowing cyan background flare */}
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#0ef]/20 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-600/15 blur-3xl pointer-events-none rounded-full" />

        {/* Top Navbar Simulation */}
        <div className="flex items-center justify-between border-b border-[#323946] pb-2 relative z-10">
          <div className="flex items-center gap-1 font-mono text-xs font-extrabold text-white">
            <span className="text-[#0ef]">&lt;</span>
            <span>Yuji Sato</span>
            <span className="text-[#0ef]">/&gt;</span>
          </div>
          <div className="flex items-center gap-2 text-[8.5px] font-semibold text-slate-300">
            <span className="text-[#0ef]">About</span>
            <span>Skills</span>
            <span>Projects</span>
            <span className="px-2 py-0.5 rounded-full bg-[#0ef] text-[#1f242d] font-bold text-[7.5px]">Hire Me</span>
          </div>
        </div>

        {/* Hero Section with Split Avatar and Role */}
        <div className="grid grid-cols-12 gap-2 items-center py-1 relative z-10">
          <div className="col-span-8 space-y-1">
            <div className="text-[8.5px] font-semibold text-slate-300">Hello, It's Me</div>
            <h4 className="text-sm sm:text-base font-black text-white leading-none">
              Yuji Sato
            </h4>
            <div className="text-[9.5px] font-bold text-slate-200">
              And I'm a <span className="text-[#0ef] drop-shadow-[0_0_8px_rgba(0,238,255,0.5)]">React Developer</span>
            </div>
            <p className="text-[8px] text-slate-400 line-clamp-1">
              Building high-performance React &amp; Next.js web applications.
            </p>
            <div className="flex items-center gap-1.5 pt-0.5">
              <span className="px-2 py-0.5 rounded-full bg-[#0ef] text-[#1f242d] font-bold text-[7.5px] shadow-[0_0_8px_rgba(0,238,255,0.4)]">
                View Work
              </span>
              <span className="px-2 py-0.5 rounded-full border border-[#0ef] text-[#0ef] font-semibold text-[7.5px]">
                Contact
              </span>
            </div>
          </div>
          
          {/* Avatar Ring */}
          <div className="col-span-4 flex justify-center">
            <div className="w-14 h-14 rounded-full border-2 border-[#0ef] p-1 shadow-[0_0_15px_rgba(0,238,255,0.5)] bg-[#323946] flex items-center justify-center relative">
              <div className="w-full h-full rounded-full bg-[#242b38] flex items-center justify-center text-[#0ef] font-mono font-bold text-xs">
                YS
              </div>
              <div className="absolute -bottom-1 -right-1 px-1 rounded bg-[#323946] border border-[#0ef] text-[6.5px] font-mono text-[#0ef]">
                React
              </div>
            </div>
          </div>
        </div>

        {/* Showcase Project Cards Grid */}
        <div className="space-y-1.5 py-0.5 relative z-10">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded-xl bg-[#323946] border border-slate-700/80 space-y-1 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[9px] text-white">OmniCommerce</span>
                <span className="text-[7.5px] font-mono text-[#0ef]">React</span>
              </div>
              <p className="text-[7.5px] text-slate-300 line-clamp-1">Modern store with Stripe checkout.</p>
              <div className="flex items-center gap-1 pt-0.5">
                <span className="text-[6.5px] px-1 py-0.2 rounded bg-[#1f242d] text-[#0ef] font-mono">Redux</span>
                <span className="text-[6.5px] px-1 py-0.2 rounded bg-[#1f242d] text-slate-300 font-mono">Tailwind</span>
              </div>
            </div>
            <div className="p-2 rounded-xl bg-[#323946] border border-slate-700/80 space-y-1 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[9px] text-white">DevPulse SaaS</span>
                <span className="text-[7.5px] font-mono text-[#0ef]">Next.js</span>
              </div>
              <p className="text-[7.5px] text-slate-300 line-clamp-1">Real-time developer telemetry metrics.</p>
              <div className="flex items-center gap-1 pt-0.5">
                <span className="text-[6.5px] px-1 py-0.2 rounded bg-[#1f242d] text-[#0ef] font-mono">Supabase</span>
                <span className="text-[6.5px] px-1 py-0.2 rounded bg-[#1f242d] text-slate-300 font-mono">Charts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1 border-t border-[#323946] text-[7.5px] text-slate-400 font-mono relative z-10">
          <span>&copy; Yuji Sato | React Developer</span>
          <span className="text-[#0ef] font-semibold">yujisato.dev</span>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 17. MODERN CREATIVE DEVELOPER (Chetan Verma - Clean dark/light theme, bold typography, services matrix, and project cards)
  // --------------------------------------------------------------------------
  if (
    normalizedId === 'modern-creative-developer' ||
    normalizedId === 'moderncreativedeveloper' ||
    normalizedId === 'chetan' ||
    normalizedId === 'chetanverma' ||
    normalizedId === 'chetanverma16' ||
    normalizedId === 'github-chetanverma-019'
  ) {
    return (
      <div className="w-full h-full bg-[#121212] text-white p-4 sm:p-5 flex flex-col justify-between font-sans select-none overflow-hidden text-[11px] leading-snug border border-neutral-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
          <div className="flex items-center gap-1">
            <span className="font-extrabold text-xs tracking-tight text-white">Chetan</span>
            <span className="text-neutral-500 font-bold text-xs">Verma.</span>
          </div>
          <div className="flex items-center gap-2 text-[9px]">
            <span className="text-neutral-400 hover:text-white font-medium">Work</span>
            <span className="text-neutral-400 hover:text-white font-medium">Services</span>
            <span className="text-neutral-400 hover:text-white font-medium">About</span>
            <span className="px-2 py-0.5 rounded-full bg-white text-black font-semibold text-[8px]">
              Connect
            </span>
          </div>
        </div>

        {/* Hero Area */}
        <div className="space-y-1 py-1">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-[8px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Available for opportunities
          </div>
          <h4 className="text-sm font-extrabold text-white leading-tight">
            Building digital products, brands &amp; experiences.
          </h4>
          <p className="text-[9px] text-neutral-400 line-clamp-1">
            Full-stack frontend architect specializing in React, Next.js &amp; design systems.
          </p>
        </div>

        {/* Services / Project Showcase Mini Grid */}
        <div className="grid grid-cols-2 gap-2 py-0.5">
          <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 space-y-0.5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[9px] text-white">01. Web Apps</span>
              <span className="text-[7px] font-mono text-neutral-400">React/Next</span>
            </div>
            <p className="text-[8px] text-neutral-400 line-clamp-1">Hyperion Design System</p>
            <div className="flex items-center gap-1 pt-0.5 text-[7px] text-neutral-300">
              <span className="px-1 py-0.2 rounded bg-neutral-800">TypeScript</span>
              <span className="px-1 py-0.2 rounded bg-neutral-800">Tailwind</span>
            </div>
          </div>
          <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 space-y-0.5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[9px] text-white">02. Architecture</span>
              <span className="text-[7px] font-mono text-neutral-400">Full-Stack</span>
            </div>
            <p className="text-[8px] text-neutral-400 line-clamp-1">ApexFlow Collab Hub</p>
            <div className="flex items-center gap-1 pt-0.5 text-[7px] text-neutral-300">
              <span className="px-1 py-0.2 rounded bg-neutral-800">Zustand</span>
              <span className="px-1 py-0.2 rounded bg-neutral-800">PostgreSQL</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1.5 border-t border-neutral-800 text-[8px] text-neutral-500 font-mono">
          <span>&copy; Chetan Verma · Modern Creative</span>
          <span className="text-white font-medium">chetanverma.com</span>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // PERSONAL DEVELOPER (Eluda Dev - Deep dark #0b0f17, sky-blue accent, clean cards, skills grid)
  // --------------------------------------------------------------------------
  if (
    normalizedId === 'personal-developer' ||
    normalizedId === 'personaldeveloper' ||
    normalizedId === 'personal' ||
    normalizedId === 'eluda' ||
    normalizedId === 'eludadev' ||
    normalizedId === 'eludadev-portfolio' ||
    normalizedId === 'github-eludadev-022'
  ) {
    return (
      <div className="w-full h-full bg-[#0b0f17] text-[#94a3b8] p-3.5 sm:p-4 flex flex-col justify-between font-sans select-none overflow-hidden text-[10px] leading-snug border border-[#1e293b] shadow-inner">
        {/* Top Navbar */}
        <div className="flex items-center justify-between border-b border-[#1e293b] pb-1.5 text-[8.5px]">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-[#161f30] border border-[#334155] flex items-center justify-center text-[#38bdf8] font-mono font-bold text-[7.5px]">
              E
            </div>
            <span className="text-[#f1f5f9] font-bold text-[9px]">Eluda Dev</span>
          </div>
          <div className="flex items-center gap-2 text-[7.5px] font-medium text-[#94a3b8]">
            <span className="flex items-center gap-1 text-[#38bdf8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
              <span>Available</span>
            </span>
            <span className="px-1.5 py-0.5 rounded bg-[#38bdf8] text-[#0b0f17] font-bold">Contact</span>
          </div>
        </div>

        {/* Hero Area */}
        <div className="space-y-0.5 py-1">
          <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#161f30] border border-[#334155] text-[6.5px] font-mono text-[#38bdf8]">
            <span>✨ Full-Stack Developer</span>
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-[#f8fafc] tracking-tight leading-tight">
            Hi, I'm <span className="text-[#38bdf8]">Eluda</span>.
          </h4>
          <p className="text-[7.5px] text-[#94a3b8] line-clamp-1 leading-normal">
            Building accessible, high-performance web systems &amp; tools.
          </p>
        </div>

        {/* Project Mini Card */}
        <div className="p-2 rounded-lg bg-[#161f30] border border-[#334155] space-y-1 shadow-sm">
          <div className="flex items-center justify-between text-[7px]">
            <span className="text-[#f1f5f9] font-bold text-[8px]">UI Buttons &amp; Component Lab</span>
            <span className="px-1 py-0.2 rounded bg-[#0b0f17] text-[#38bdf8] font-mono text-[6.5px]">2024</span>
          </div>
          <p className="text-[7px] text-[#94a3b8] line-clamp-1">
            Collection of 100+ modern animated CSS &amp; Tailwind components.
          </p>
          <div className="flex items-center justify-between text-[6.5px] font-mono pt-0.5 text-[#64748b]">
            <span className="flex gap-1 text-[#94a3b8]">
              <span className="px-1 py-0.2 rounded bg-[#0b0f17]">React</span>
              <span className="px-1 py-0.2 rounded bg-[#0b0f17]">Tailwind</span>
            </span>
            <span className="text-[#38bdf8] font-semibold">100+ items ↗</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1 border-t border-[#1e293b] text-[7px] font-mono text-[#64748b]">
          <span>Skills: TypeScript · Next.js · Node.js</span>
          <span className="text-[#f1f5f9] font-semibold">eluda.dev</span>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // BRITTANY CHIANG V4 (Dark navy, mint green #64ffda, numbered sections, overlapping cards)
  // --------------------------------------------------------------------------
  if (
    normalizedId === 'brittany-developer' ||
    normalizedId === 'brittanydeveloper' ||
    normalizedId === 'brittany' ||
    normalizedId === 'bchiang7' ||
    normalizedId === 'bchiang7-v4' ||
    normalizedId === 'github-bchiang7-021'
  ) {
    return (
      <div className="w-full h-full bg-[#0a192f] text-[#8892b0] p-3.5 sm:p-4 flex flex-col justify-between font-sans select-none overflow-hidden text-[10px] leading-snug border border-[#233554] shadow-inner">
        {/* Top Navbar */}
        <div className="flex items-center justify-between border-b border-[#233554]/60 pb-1.5 text-[8.5px]">
          {/* Hexagonal Mini Logo */}
          <div className="flex items-center gap-1 text-[#64ffda] font-mono font-bold">
            <span className="w-4 h-4 rounded border border-[#64ffda] flex items-center justify-center text-[8px]">
              B
            </span>
            <span className="text-[#ccd6f6] font-semibold text-[9px]">Brittany</span>
          </div>
          {/* Numbered Nav Links */}
          <div className="flex items-center gap-2 font-mono text-[7.5px] text-[#ccd6f6]">
            <span><strong className="text-[#64ffda] font-normal">01.</strong> About</span>
            <span><strong className="text-[#64ffda] font-normal">02.</strong> Exp</span>
            <span><strong className="text-[#64ffda] font-normal">03.</strong> Work</span>
            <span className="px-1.5 py-0.5 rounded border border-[#64ffda] text-[#64ffda]">Resume</span>
          </div>
        </div>

        {/* Hero Area */}
        <div className="space-y-0.5 py-1">
          <div className="font-mono text-[8px] text-[#64ffda]">Hi, my name is</div>
          <h4 className="text-xs sm:text-sm font-bold text-[#ccd6f6] tracking-tight leading-none">
            Brittany Chiang.
          </h4>
          <div className="text-[9.5px] font-bold text-[#8892b0] leading-tight">
            I build things for the web.
          </div>
          <p className="text-[7.5px] text-[#8892b0] line-clamp-1 leading-normal pt-0.5">
            Software engineer specializing in accessible digital experiences.
          </p>
        </div>

        {/* Overlapping Featured Project Mini Card */}
        <div className="relative p-2 rounded bg-[#112240] border border-[#233554] space-y-1 shadow-md">
          <div className="flex items-center justify-between font-mono text-[7px]">
            <span className="text-[#64ffda]">Featured Project</span>
            <span className="text-[#ccd6f6] font-sans font-bold text-[8px]">Spotify Visualizer</span>
          </div>
          <div className="p-1.5 rounded bg-[#0a192f]/90 border border-[#233554]/60 text-[7px] text-[#a8b2d1] line-clamp-1">
            Data visualizations of top artists, tracks, and audio analysis.
          </div>
          <div className="flex items-center justify-between text-[6.5px] font-mono text-[#8892b0] pt-0.5">
            <span className="flex gap-1.5 text-[#a8b2d1]">
              <span>React</span>
              <span>Spotify API</span>
              <span>Express</span>
            </span>
            <span className="text-[#64ffda]">★ 1.8k</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1 border-t border-[#233554]/60 text-[7px] font-mono text-[#8892b0]">
          <span>04. Contact → Say Hello</span>
          <span className="text-[#64ffda]">Upstatement @ Lead</span>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // GITFOLIO CYBER (Retro-futuristic terminal HUD, neon cyan & magenta, scanlines)
  // --------------------------------------------------------------------------
  if (
    normalizedId === 'gitfolio-cyber' ||
    normalizedId === 'gitfoliocyber' ||
    normalizedId === 'gitfolio' ||
    normalizedId === 'github-gitfolio-020' ||
    normalizedId === 'cyberpunk' ||
    normalizedId === 'cyberpunk-developer'
  ) {
    return (
      <div className="w-full h-full bg-[#07090e] text-[#d1d5db] p-3.5 sm:p-4 flex flex-col justify-between font-mono select-none overflow-hidden text-[10px] leading-snug border border-[#00f0ff]/30 shadow-inner">
        {/* Top HUD Telemetry */}
        <div className="flex items-center justify-between border-b border-[#00f0ff]/30 pb-1.5 text-[8px] text-[#00f0ff]/80">
          <div className="flex items-center gap-1.5 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] animate-pulse"></span>
            <span>[SYS_ONLINE]</span>
            <span className="text-neutral-500">|</span>
            <span>HOST: gitfolio.dev</span>
          </div>
          <div className="flex items-center gap-2 text-[8px]">
            <span className="text-[#ff007f] font-bold">● LIVE</span>
            <span className="px-1 py-0.2 rounded bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30">CRT</span>
          </div>
        </div>

        {/* Hero Area with Cyber Glitch Title & Badges */}
        <div className="space-y-1 py-1">
          <div className="flex items-center gap-1.5 text-[8px] text-[#ff007f]">
            <span>&gt;&gt;</span>
            <span className="text-[#00f0ff] font-bold">SYSTEM_ROLE: // FULLSTACK_CYBER</span>
          </div>
          <h4 className="text-xs sm:text-sm font-black text-white leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00f0ff] to-[#ff007f]">
              Alex Vance
            </span>
            <span className="text-[#00f0ff] text-[10px] ml-1.5 font-normal">[v3.4]</span>
          </h4>
          <p className="text-[8px] text-neutral-300 line-clamp-1 font-sans">
            Architecting distributed web systems, retro-futuristic terminal HUDs &amp; React tools.
          </p>
        </div>

        {/* Repositories Mini Showcase */}
        <div className="grid grid-cols-2 gap-1.5 py-0.5">
          <div className="p-1.5 rounded bg-[#0b0f19] border border-neutral-800 space-y-0.5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[8.5px] text-white truncate">quantum-mesh</span>
              <span className="text-[7px] text-[#ffe600]">★ 342</span>
            </div>
            <p className="text-[7.5px] text-neutral-400 line-clamp-1 font-sans">Low-latency microservices mesh.</p>
            <div className="flex items-center gap-1 pt-0.5 text-[6.5px]">
              <span className="px-1 py-0.2 rounded bg-[#07090e] border border-neutral-800 text-[#00f0ff]">React</span>
              <span className="px-1 py-0.2 rounded bg-[#07090e] border border-neutral-800 text-[#39d353]">Go</span>
            </div>
          </div>
          <div className="p-1.5 rounded bg-[#0b0f19] border border-neutral-800 space-y-0.5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[8.5px] text-white truncate">neon-synth-audio</span>
              <span className="text-[7px] text-[#ffe600]">★ 521</span>
            </div>
            <p className="text-[7.5px] text-neutral-400 line-clamp-1 font-sans">Modular browser synthesizer.</p>
            <div className="flex items-center gap-1 pt-0.5 text-[6.5px]">
              <span className="px-1 py-0.2 rounded bg-[#07090e] border border-neutral-800 text-[#ff007f]">WASM</span>
              <span className="px-1 py-0.2 rounded bg-[#07090e] border border-neutral-800 text-[#00f0ff]">Audio</span>
            </div>
          </div>
        </div>

        {/* Terminal Command Line Footer */}
        <div className="flex items-center justify-between pt-1 border-t border-[#00f0ff]/20 text-[7.5px] text-neutral-400">
          <span className="text-[#00f0ff] truncate">$ git clone gitfolio.dev/profile</span>
          <span className="text-[#39d353] shrink-0 font-bold">[READY]</span>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 8. FULL-STACK DEVELOPER (Deep slate/navy, cyan metrics, colorful badges)
  // --------------------------------------------------------------------------
  return (
    <div className="w-full h-full bg-[#0d1424] text-white p-4 sm:p-5 flex flex-col justify-between font-sans select-none overflow-hidden text-[11px] leading-snug">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span className="font-bold text-xs tracking-tight text-white">David Chen</span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-slate-400 font-medium">
          <span className="text-cyan-400 font-semibold border-b border-cyan-400 pb-0.5">Projects</span>
          <span>Architecture</span>
          <span>Experience</span>
        </div>
      </div>

      {/* Intro */}
      <div className="space-y-1 py-1">
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-[9px] font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
          FULL-STACK DEVELOPER
        </div>
        <h4 className="font-serif text-sm sm:text-[15px] font-normal text-white leading-tight">
          Designing and scaling <span className="text-cyan-300 font-medium">distributed backends</span> & performant React apps.
        </h4>
        <p className="text-[10px] text-slate-300 line-clamp-1">
          Deep experience in SQL optimization, Kubernetes orchestration, and Go microservices.
        </p>
      </div>

      {/* Projects */}
      <div className="space-y-1.5 py-0.5">
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 rounded-lg bg-slate-900/90 border border-cyan-800/60 space-y-0.5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[10px] text-cyan-200">RaftKV Engine</span>
              <span className="text-[7.5px] font-mono px-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-600/40">&lt;5ms p99</span>
            </div>
            <p className="text-[9px] text-slate-300 line-clamp-1">Distributed LSM storage with Raft consensus.</p>
            <div className="flex items-center gap-1 pt-0.5">
              <span className="text-[7.5px] px-1 py-0.2 rounded bg-cyan-900/60 text-cyan-300 font-mono">Go</span>
              <span className="text-[7.5px] px-1 py-0.2 rounded bg-orange-900/60 text-orange-300 font-mono">Rust</span>
              <span className="text-[7.5px] px-1 py-0.2 rounded bg-blue-900/60 text-blue-300 font-mono">Docker</span>
            </div>
          </div>
          <div className="p-2 rounded-lg bg-slate-900/90 border border-emerald-800/60 space-y-0.5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[10px] text-emerald-200">CloudDeploy</span>
              <span className="text-[7.5px] font-mono px-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-600/40">CLI / UI</span>
            </div>
            <p className="text-[9px] text-slate-300 line-clamp-1">Deployment automation for microservices.</p>
            <div className="flex items-center gap-1 pt-0.5">
              <span className="text-[7.5px] px-1 py-0.2 rounded bg-blue-900/60 text-blue-300 font-mono">TypeScript</span>
              <span className="text-[7.5px] px-1 py-0.2 rounded bg-sky-900/60 text-sky-300 font-mono">React</span>
              <span className="text-[7.5px] px-1 py-0.2 rounded bg-indigo-900/60 text-indigo-300 font-mono">K8s</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[9px] text-slate-400 font-mono">
        <span>Go · Rust · TypeScript · React · PostgreSQL</span>
        <span className="text-cyan-400 font-semibold">david@chen.dev</span>
      </div>
    </div>
  );
};
