import React from 'react';

// ============================================================================
// REALISTIC PORTFOLIO WEBSITE PREVIEWS
// Rendered directly inside the card preview area without browser-window mockups,
// no Mac chrome dots, no fake address bars, no gradients, no green indicators.
// Pure BuildEasy visual language: clean white/neutral surfaces, dark text,
// refined typography, and realistic portfolio content.
// ============================================================================

export interface MiniPortfolioWebsiteProps {
  id: string;
  category?: string;
  name?: string;
}

export const MiniPortfolioPreview: React.FC<MiniPortfolioWebsiteProps> = ({ id, category, name }) => {
  const normalizedId = (id || '').toLowerCase();

  // 1. Minimal Developer (Magic UI / Cleanfolio)
  if (
    normalizedId === 'minimal' ||
    normalizedId === 'minimal-developer' ||
    normalizedId === 'github-magicui-005' ||
    normalizedId === 'github-cleanfolio-010'
  ) {
    return (
      <div className="w-full h-full bg-white text-zinc-900 p-4 sm:p-5 flex flex-col justify-between font-sans select-none overflow-hidden text-[11px] leading-snug">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
          <span className="font-bold text-xs tracking-tight text-zinc-900">Alex Morgan</span>
          <div className="flex items-center gap-3 text-[10px] text-zinc-500 font-medium">
            <span className="text-zinc-900 font-semibold">Work</span>
            <span>About</span>
            <span>Experience</span>
            <span>Contact</span>
          </div>
        </div>

        {/* Intro */}
        <div className="space-y-1 py-1">
          <div className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">Minimal Developer</div>
          <h4 className="font-serif text-sm sm:text-[15px] font-bold text-zinc-900 leading-tight">
            Building reliable web applications and thoughtful digital products.
          </h4>
          <p className="text-[10px] text-zinc-600 line-clamp-1">
            Software engineer focused on simplicity, performance, and clean interface systems.
          </p>
        </div>

        {/* Selected Projects */}
        <div className="space-y-1.5 py-0.5">
          <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 uppercase tracking-wider">
            <span>Selected Projects</span>
            <span>2024 — 2026</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded bg-zinc-50 border border-zinc-200 space-y-0.5">
              <div className="font-bold text-[10px] text-zinc-900">Atlas Component Engine</div>
              <p className="text-[9px] text-zinc-600 line-clamp-1">Accessible UI system & token runtime.</p>
              <div className="text-[8px] font-mono text-zinc-500 pt-0.5">React · TypeScript · Tailwind</div>
            </div>
            <div className="p-2 rounded bg-zinc-50 border border-zinc-200 space-y-0.5">
              <div className="font-bold text-[10px] text-zinc-900">Pulse Health Monitor</div>
              <p className="text-[9px] text-zinc-600 line-clamp-1">Server telemetry with real-time alerts.</p>
              <div className="text-[8px] font-mono text-zinc-500 pt-0.5">Next.js · Node · PostgreSQL</div>
            </div>
          </div>
        </div>

        {/* Skills & Contact */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-200 text-[9px] text-zinc-600 font-mono">
          <span>React · TypeScript · Node.js · PostgreSQL</span>
          <span className="text-zinc-900 font-semibold">alex@morgan.dev</span>
        </div>
      </div>
    );
  }

  // 2. Editorial Developer
  if (
    normalizedId === 'editorial' ||
    normalizedId === 'editorial-developer' ||
    normalizedId === 'github-alex-013' ||
    normalizedId === 'github-folio-003'
  ) {
    return (
      <div className="w-full h-full bg-[#FAF9F6] text-zinc-900 p-4 sm:p-5 flex flex-col justify-between font-sans select-none overflow-hidden text-[11px] leading-snug">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
          <span className="font-serif italic font-bold text-xs text-zinc-900">Julian Vance</span>
          <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Selected Works · 2026</div>
        </div>

        {/* Intro */}
        <div className="space-y-1 py-1">
          <div className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">Editorial Developer</div>
          <h4 className="font-serif text-sm sm:text-[15px] font-normal text-zinc-900 leading-tight">
            Writing software at the intersection of typography, editorial systems, and web speed.
          </h4>
          <p className="text-[10px] text-zinc-600 line-clamp-1 font-serif italic">
            Specializing in publication systems, digital archives, and refined interactive reading experiences.
          </p>
        </div>

        {/* Projects */}
        <div className="space-y-1.5 py-0.5">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded bg-white border border-zinc-200 space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-[10px] text-zinc-900">Monograph Reader</span>
                <span className="text-[8px] font-mono text-zinc-400">Archive</span>
              </div>
              <p className="text-[9px] text-zinc-600 line-clamp-1">Fluid typography publication engine.</p>
              <div className="text-[8px] font-mono text-zinc-500 pt-0.5">TypeScript · Next.js · Typography</div>
            </div>
            <div className="p-2 rounded bg-white border border-zinc-200 space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-[10px] text-zinc-900">Archival Index</span>
                <span className="text-[8px] font-mono text-zinc-400">Library</span>
              </div>
              <p className="text-[9px] text-zinc-600 line-clamp-1">Curated architectural photography gallery.</p>
              <div className="text-[8px] font-mono text-zinc-500 pt-0.5">GraphQL · React · CSS Grid</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-200 text-[9px] text-zinc-600">
          <span>Lead Frontend Engineer @ Monocle</span>
          <span className="font-mono text-zinc-900 font-medium">julian@vance.studio</span>
        </div>
      </div>
    );
  }

  // 3. Creative Developer / Interactive
  if (
    normalizedId === 'creative' ||
    normalizedId === 'creative-developer' ||
    normalizedId === 'github-hamish-004' ||
    normalizedId === 'github-adrian-002'
  ) {
    return (
      <div className="w-full h-full bg-white text-zinc-900 p-4 sm:p-5 flex flex-col justify-between font-sans select-none overflow-hidden text-[11px] leading-snug">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-zinc-900"></span>
            <span className="font-bold text-xs text-zinc-900">Maya Lin</span>
          </div>
          <div className="flex items-center gap-2 text-[9px] font-mono text-zinc-500">
            <span>[Interactive]</span>
            <span>[Visuals]</span>
            <span>[Code]</span>
          </div>
        </div>

        {/* Intro */}
        <div className="space-y-1 py-1">
          <div className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">Creative Developer</div>
          <h4 className="font-serif text-sm sm:text-[15px] font-bold text-zinc-900 leading-tight">
            Crafting tactile web experiences, interactive graphics, and generative systems.
          </h4>
          <p className="text-[10px] text-zinc-600 line-clamp-1">
            Bridging creative coding with robust full-stack engineering.
          </p>
        </div>

        {/* Projects */}
        <div className="space-y-1.5 py-0.5">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded bg-zinc-900 text-white space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[10px] text-white">SoundStage 3D</span>
                <span className="text-[8px] font-mono text-zinc-400">Audio API</span>
              </div>
              <p className="text-[9px] text-zinc-300 line-clamp-1">Generative spatial acoustics engine.</p>
              <div className="text-[8px] font-mono text-zinc-400 pt-0.5">WebGL · Three.js · GLSL</div>
            </div>
            <div className="p-2 rounded bg-zinc-100 text-zinc-900 border border-zinc-200 space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[10px] text-zinc-900">Form & Motion</span>
                <span className="text-[8px] font-mono text-zinc-500">Physics</span>
              </div>
              <p className="text-[9px] text-zinc-600 line-clamp-1">Kinetic fluid typography canvas.</p>
              <div className="text-[8px] font-mono text-zinc-600 pt-0.5">Canvas API · React · TypeScript</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-200 text-[9px] text-zinc-600 font-mono">
          <span>WebGL · Three.js · React · Shaders</span>
          <span className="text-zinc-900 font-semibold">maya@lin.design</span>
        </div>
      </div>
    );
  }

  // 4. Product Designer / Visual
  if (
    normalizedId === 'designer' ||
    normalizedId === 'product-designer' ||
    normalizedId === 'github-daniel-011' ||
    normalizedId === 'github-kalvin-012'
  ) {
    return (
      <div className="w-full h-full bg-white text-zinc-900 p-4 sm:p-5 flex flex-col justify-between font-sans select-none overflow-hidden text-[11px] leading-snug">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
          <span className="font-serif font-bold text-xs text-zinc-900">Elena Rostova</span>
          <div className="flex items-center gap-3 text-[10px] text-zinc-500 font-medium">
            <span className="text-zinc-900 font-semibold">Case Studies</span>
            <span>Systems</span>
            <span>About</span>
            <span>Contact</span>
          </div>
        </div>

        {/* Intro */}
        <div className="space-y-1 py-1">
          <div className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">Product Designer</div>
          <h4 className="font-serif text-sm sm:text-[15px] font-normal text-zinc-900 leading-tight">
            Designing clear, scalable digital products and design systems for enterprise software.
          </h4>
          <p className="text-[10px] text-zinc-600 line-clamp-1">
            Over 7 years designing complex workflows, design tokens, and accessible component libraries.
          </p>
        </div>

        {/* Projects */}
        <div className="space-y-1.5 py-0.5">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded bg-zinc-50 border border-zinc-200 space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-[10px] text-zinc-900">Fintech Pro System</span>
                <span className="text-[8px] font-mono text-zinc-500">20+ Teams</span>
              </div>
              <p className="text-[9px] text-zinc-600 line-clamp-1">Unified token framework & component library.</p>
              <div className="text-[8px] font-mono text-zinc-500 pt-0.5">Tokens · Figma · Accessibility</div>
            </div>
            <div className="p-2 rounded bg-zinc-50 border border-zinc-200 space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-[10px] text-zinc-900">ClinicFlow Triage</span>
                <span className="text-[8px] font-mono text-zinc-500">Healthcare</span>
              </div>
              <p className="text-[9px] text-zinc-600 line-clamp-1">Clinician workflow reducing intake time by 35%.</p>
              <div className="text-[8px] font-mono text-zinc-500 pt-0.5">Research · Prototyping · Mobile</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-200 text-[9px] text-zinc-600">
          <span>Staff Product Designer @ Figma</span>
          <span className="font-mono text-zinc-900 font-medium">elena@rostova.com</span>
        </div>
      </div>
    );
  }

  // 5. VS Code / Terminal Developer
  if (normalizedId === 'github-vscode-008') {
    return (
      <div className="w-full h-full bg-[#18181b] text-zinc-200 p-4 sm:p-5 flex flex-col justify-between font-mono select-none overflow-hidden text-[10px] leading-snug">
        {/* Editor Tab Bar */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2 text-[10px]">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[#27272a] text-zinc-200 rounded text-[9px]">experience.tsx</span>
            <span className="text-zinc-500 text-[9px]">projects.json</span>
          </div>
          <span className="text-[9px] text-zinc-500">VS Code Environment</span>
        </div>

        {/* Terminal / Code Bio */}
        <div className="space-y-1.5 py-1">
          <div className="text-zinc-500 text-[9px]">// Nitin Ranganath — Systems & Full-Stack</div>
          <div className="text-zinc-100 font-bold text-xs">
            const developer = {'{'} role: "Full-Stack Engineer", focus: "Architecture" {'}'};
          </div>
          <p className="text-zinc-400 text-[10px] leading-relaxed">
            Building high-throughput API gateways, cloud infra, and low-latency client systems.
          </p>
        </div>

        {/* Projects in code structure */}
        <div className="grid grid-cols-2 gap-2 py-0.5">
          <div className="p-2 rounded bg-[#27272a] border border-zinc-700/50 space-y-0.5">
            <div className="text-zinc-200 font-bold text-[9px]">01_k8s_scheduler.go</div>
            <div className="text-zinc-400 text-[8px]">Distributed worker pool engine</div>
          </div>
          <div className="p-2 rounded bg-[#27272a] border border-zinc-700/50 space-y-0.5">
            <div className="text-zinc-200 font-bold text-[9px]">02_redis_cluster.rs</div>
            <div className="text-zinc-400 text-[8px]">In-memory caching pipeline</div>
          </div>
        </div>

        {/* Terminal Status Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-[9px] text-zinc-500">
          <span>Ready · UTF-8 · TypeScript</span>
          <span className="text-zinc-300">nitin@ranganath.dev</span>
        </div>
      </div>
    );
  }

  // 6. Student / Studio / Clean
  if (
    normalizedId === 'student' ||
    normalizedId === 'studio' ||
    normalizedId === 'student-developer' ||
    normalizedId === 'github-nixrajput-007'
  ) {
    return (
      <div className="w-full h-full bg-white text-zinc-900 p-4 sm:p-5 flex flex-col justify-between font-sans select-none overflow-hidden text-[11px] leading-snug">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
          <span className="font-bold text-xs tracking-tight text-zinc-900">Sam Rivera</span>
          <div className="flex items-center gap-3 text-[10px] text-zinc-500 font-medium">
            <span className="text-zinc-900 font-semibold">Projects</span>
            <span>Education</span>
            <span>Skills</span>
            <span>Contact</span>
          </div>
        </div>

        {/* Intro */}
        <div className="space-y-1 py-1">
          <div className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">Studio & Coursework</div>
          <h4 className="font-serif text-sm sm:text-[15px] font-bold text-zinc-900 leading-tight">
            Software engineer passionate about modern web technologies, algorithms, and open source.
          </h4>
          <p className="text-[10px] text-zinc-600 line-clamp-1">
            B.S. Computer Science (2025). Seeking full-time frontend or full-stack software roles.
          </p>
        </div>

        {/* Projects & Education */}
        <div className="space-y-1.5 py-0.5">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded bg-zinc-50 border border-zinc-200 space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[10px] text-zinc-900">StudyGroup Sync</span>
                <span className="text-[8px] font-mono text-zinc-500">Hackathon</span>
              </div>
              <p className="text-[9px] text-zinc-600 line-clamp-1">Real-time peer whiteboard app.</p>
              <div className="text-[8px] font-mono text-zinc-500 pt-0.5">React · Node.js · WebSockets</div>
            </div>
            <div className="p-2 rounded bg-zinc-50 border border-zinc-200 space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[10px] text-zinc-900">Campus Eats Tracker</span>
                <span className="text-[8px] font-mono text-zinc-500">Full-Stack</span>
              </div>
              <p className="text-[9px] text-zinc-600 line-clamp-1">Dining hall nutrition and meal planner.</p>
              <div className="text-[8px] font-mono text-zinc-500 pt-0.5">TypeScript · Next.js · SQLite</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-200 text-[9px] text-zinc-600 font-mono">
          <span>B.S. Computer Science (GPA 3.85)</span>
          <span className="text-zinc-900 font-semibold">sam.rivera@berkeley.edu</span>
        </div>
      </div>
    );
  }

  // 7. Full-Stack Developer (Default / CodeBucks / Yuji)
  return (
    <div className="w-full h-full bg-white text-zinc-900 p-4 sm:p-5 flex flex-col justify-between font-sans select-none overflow-hidden text-[11px] leading-snug">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
        <span className="font-bold text-xs tracking-tight text-zinc-900">David Chen</span>
        <div className="flex items-center gap-3 text-[10px] text-zinc-500 font-medium">
          <span className="text-zinc-900 font-semibold">Projects</span>
          <span>Architecture</span>
          <span>Experience</span>
          <span>Contact</span>
        </div>
      </div>

      {/* Intro */}
      <div className="space-y-1 py-1">
        <div className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">Full-Stack Developer</div>
        <h4 className="font-serif text-sm sm:text-[15px] font-bold text-zinc-900 leading-tight">
          Designing and scaling high-availability backend services and responsive web applications.
        </h4>
        <p className="text-[10px] text-zinc-600 line-clamp-1">
          Deep experience in distributed systems, SQL optimization, and performant React frontends.
        </p>
      </div>

      {/* Projects */}
      <div className="space-y-1.5 py-0.5">
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 rounded bg-zinc-50 border border-zinc-200 space-y-0.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[10px] text-zinc-900">RaftKV Engine</span>
              <span className="text-[8px] font-mono text-zinc-500">&lt;5ms p99</span>
            </div>
            <p className="text-[9px] text-zinc-600 line-clamp-1">Distributed LSM storage with consensus.</p>
            <div className="text-[8px] font-mono text-zinc-500 pt-0.5">Go · Rust · Raft · Docker</div>
          </div>
          <div className="p-2 rounded bg-zinc-50 border border-zinc-200 space-y-0.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[10px] text-zinc-900">CloudDeploy</span>
              <span className="text-[8px] font-mono text-zinc-500">CLI / UI</span>
            </div>
            <p className="text-[9px] text-zinc-600 line-clamp-1">Deployment automation for microservices.</p>
            <div className="text-[8px] font-mono text-zinc-500 pt-0.5">TypeScript · React · Kubernetes</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-zinc-200 text-[9px] text-zinc-600 font-mono">
        <span>Go · Rust · TypeScript · React · PostgreSQL</span>
        <span className="text-zinc-900 font-semibold">david@chen.dev</span>
      </div>
    </div>
  );
};
