import { TemplateDefinition } from '../types';
import { defaultConfig } from './defaultData';

export const templatesRegistry: TemplateDefinition[] = [
  {
    id: 'github-codebucks-001',
    name: 'CodeBucks Developer Portfolio',
    category: 'Developer Portfolio',
    interactionModel: 'Framer Motion Screen Transitions & Orbital Skills Web',
    description: 'Faithful reproduction of CodeBucks Next.js Developer Portfolio Starter Code. Features staggered AnimatedText word entrances, multi-layer screen transition curtains, circular rotating "Hire Me" badge, radial orbital skills web, scroll-progress LiIcon milestones in Experience & Education timelines, offset box-shadow project cards, and article preview tooltips.',
    bestFor: 'Full-Stack Developers, Creative Engineers, Frontend Specialists, Tech Writers',
    tags: ['CodeBucks', 'Next.js', 'Framer Motion', 'Developer', 'Dark/Light', 'Animations', 'Interactive'],
    previewGradient: 'from-amber-100 via-rose-100 to-indigo-950',
    supportedSections: ['profile', 'about', 'experience', 'education', 'skills', 'projects', 'articles', 'contact'],
    defaultConfig: {
      ...defaultConfig,
      typography: 'sans',
      bgStyle: 'light',
      cardStyle: 'border',
      accentColor: '#b63e96',
      spacing: 'normal',
      sectionOrder: ['profile', 'about', 'projects', 'articles', 'experience', 'skills', 'education', 'contact']
    },
    rendererType: 'github-codebucks-001',
    animationLevel: 'High',
    layout: 'Multi-Page Tabbed Portfolio with Animated Transitions',
    responsive: true,
    status: 'production',
    sourceReference: 'codebucks27/Next.js-Developer-Portfolio-Starter-Code',
    licenseReference: 'MIT'
  },
  {
    id: 'github-adrian-002',
    name: 'Interactive 3D Developer Portfolio',
    category: '3D / Interactive',
    interactionModel: 'Real-time 3D Island Exploration, Plane Flight & Interactive Character',
    description: 'Faithful reproduction of Adrian Hajdin (JavaScript Mastery) threejs-portfolio. Features a rotating 3D floating island with Japanese pagoda and sakura blossom grove, flying low-poly aircraft with active propeller, orbital low-poly bird, dynamic sky clouds, 4-stage HomeInfo popups, vertical experience timeline, vibrant gradient project backplates with live links, and an interactive 3D Fox that runs when you type in the contact form.',
    bestFor: '3D Creative Developers, Full-Stack Engineers, Game/Graphics Programmers, Interactive Designers',
    tags: ['Three.js', 'React Three Fiber', '3D', 'Interactive', 'Developer'],
    previewGradient: 'from-[#00c6ff] via-[#0072ff] to-[#1e3a8a]',
    supportedSections: ['profile', 'about', 'experience', 'education', 'skills', 'projects', 'contact'],
    defaultConfig: {
      ...defaultConfig,
      typography: 'sans',
      bgStyle: 'light',
      cardStyle: 'border',
      accentColor: '#0072ff',
      spacing: 'normal',
      sectionOrder: ['profile', 'about', 'projects', 'experience', 'skills', 'contact']
    },
    rendererType: 'github-adrian-002',
    animationLevel: 'Very High',
    layout: 'Immersive 3D',
    responsive: true,
    status: 'production',
    sourceReference: 'adrianhajdin/threejs-portfolio',
    licenseReference: 'MIT'
  },
  {
    id: 'github-folio-003',
    name: 'Folio — Interactive Developer Portfolio',
    category: 'Creative Developer',
    interactionModel: 'GSAP Scroll reveals, Interactive timeline lines, and 3D Tilt project cards',
    description: 'Faithful reproduction of Ayush Singh (ayush013) folio. Features elegant high-contrast dark theme, animated custom navigation menus, typographic hero sections, responsive 3D mouse tilt with parallax project backplates, a custom vertical timeline with SVG lines that draw themselves downwards as you scroll, and interactive hover proficiency tags.',
    bestFor: 'UI Engineers, Frontend Architects, Creative Coders, Visual Web Designers',
    tags: ['GSAP', 'Interactive', 'Motion', 'Timeline', 'Next.js', 'React'],
    previewGradient: 'from-slate-950 via-[#0c0c16] to-[#1e1b4b]',
    supportedSections: ['profile', 'about', 'skills', 'experience', 'projects', 'contact'],
    defaultConfig: {
      ...defaultConfig,
      typography: 'sans',
      bgStyle: 'dark',
      cardStyle: 'border',
      accentColor: '#6366f1',
      spacing: 'relaxed',
      sectionOrder: ['profile', 'about', 'skills', 'experience', 'projects', 'contact']
    },
    rendererType: 'github-folio-003',
    animationLevel: 'High',
    layout: 'Interactive editorial portfolio',
    responsive: true,
    status: 'production',
    sourceReference: 'ayush013/folio',
    licenseReference: 'MIT'
  },
  {
    id: 'github-hamish-004',
    name: 'Cyberpunk Interactive Portfolio',
    category: 'Experimental / 3D',
    interactionModel: 'Three.js Shader Vertex Displacement, Cyberpunk Grid overlays, and matrix scramblers',
    description: 'Faithful reproduction of Hamish Williams (HamishMW) personal portfolio website. Features real-time responsive 3D displacement sphere with custom GLSL simplex noise shaders, layout wireframe blueprint lines, horizontal scroll trackers, typewriter style skills layout, custom button cutouts, and interactive decoders.',
    bestFor: 'Creative Coders, Product Architects, Motion Designers, Visual Engineers',
    tags: ['Cyberpunk', 'Three.js', 'Interactive', '3D', 'Experimental', 'Developer'],
    previewGradient: 'from-[#0a0a0c] via-[#050508] to-[#020204]',
    supportedSections: ['profile', 'about', 'skills', 'experience', 'projects', 'contact'],
    defaultConfig: {
      ...defaultConfig,
      typography: 'mono',
      bgStyle: 'dark',
      cardStyle: 'border',
      accentColor: '#00f0ff',
      spacing: 'relaxed',
      sectionOrder: ['profile', 'about', 'projects', 'experience', 'skills', 'contact']
    },
    rendererType: 'github-hamish-004',
    animationLevel: 'Very High',
    layout: 'Experimental immersive portfolio',
    responsive: true,
    status: 'production',
    sourceReference: 'HamishMW/portfolio',
    licenseReference: 'MIT'
  },
  {
    id: 'github-magicui-005',
    name: 'Magic UI Minimal Portfolio',
    category: 'Minimal / Animated / Blog',
    interactionModel: 'Framer Motion BlurFade entrances, Bottom Floating Navigation Dock, work accordion toggles',
    description: 'Faithful reproduction of Dillion Vermas personal Magic UI portfolio. Features BlurFade entrance animations, work experience accordions, circular education logos, a dark tag row, a 2-column project grid with live/source shortcuts, interactive text fields, a single-column blog listing with standalone reading mode, and a bottom floating responsive navigation dock.',
    bestFor: 'Minimalist Developers, Product Makers, Technical Writers, Open Source Contributors',
    tags: ['Minimal', 'Magic UI', 'Framer Motion', 'Next.js', 'Blog', 'Animated', 'Developer'],
    previewGradient: 'from-zinc-50 via-zinc-100 to-zinc-950',
    supportedSections: ['profile', 'about', 'experience', 'education', 'skills', 'projects', 'articles', 'contact'],
    defaultConfig: {
      ...defaultConfig,
      typography: 'sans',
      bgStyle: 'light',
      cardStyle: 'border',
      accentColor: '#18181b',
      spacing: 'compact',
      sectionOrder: ['profile', 'about', 'experience', 'education', 'skills', 'projects', 'articles', 'contact']
    },
    rendererType: 'github-magicui-005',
    animationLevel: 'High',
    layout: 'Minimal content-driven portfolio',
    responsive: true,
    status: 'production',
    sourceReference: 'https://github.com/dillionverma/portfolio',
    licenseReference: 'MIT'
  },
  {
    id: 'github-nixrajput-007',
    name: 'Aceternity Modern Portfolio',
    category: 'Modern / Interactive',
    interactionModel: 'Canvas star particles, light/dark mode, 5 dynamic color brand palettes, conic moving borders, hover-glow grids, and collapsible FAQs',
    description: 'Faithful reproduction of Nikhil Rajputs personal portfolio website. Features real-time theme controls, 5 selectable brand palettes (Iris, Ocean, Emerald, Rose, Amber) managed via active state variables, an interactive canvas background with floating stars and radial gradient orbs, Aceternity-inspired conic moving borders, grouped skill bars, clients testimonial sliders, and a fully functional FAQ accordion block.',
    bestFor: 'Modern Developers, AI Engineers, Design System Specialists, Full-Stack Architects',
    tags: ['Aceternity UI', 'Next.js', 'React', 'Tailwind', 'Sass', 'Motion', 'Modern'],
    previewGradient: 'from-zinc-950 via-slate-900 to-indigo-950',
    supportedSections: ['profile', 'about', 'experience', 'education', 'skills', 'projects', 'testimonials', 'contact'],
    defaultConfig: {
      ...defaultConfig,
      typography: 'sans',
      bgStyle: 'dark',
      cardStyle: 'border',
      accentColor: '#6366f1',
      spacing: 'normal',
      sectionOrder: ['profile', 'about', 'services', 'projects', 'experience', 'skills', 'testimonials', 'contact']
    },
    rendererType: 'github-nixrajput-007',
    animationLevel: 'High',
    layout: 'Modern interactive developer portfolio',
    responsive: true,
    status: 'production',
    sourceReference: 'https://github.com/nixrajput/portfolio-nextjs',
    licenseReference: 'MIT'
  },
  {
    id: 'github-vscode-008',
    name: 'VS Code Developer Portfolio',
    category: 'Experimental / Developer',
    interactionModel: 'IDE simulation: multi-theme switcher (GitHub Dark, Dracula, Ayu, Nord, One Dark Pro), interactive shell bash console, file-explorer sidebar, closeable layout tabs, stylesheet forms, live profile cards, and git trackers',
    description: 'A masterpiece replication of Nitin Ranganaths developer portfolio, transforming the entire page into a fully-functional Visual Studio Code IDE workspace. Features an active collapsible sidebar with Explorer, global Workspace Search, git trackers, and extension markets; authentic tabs behavior with file icons and close functions; fully functional bottom bash shell console with help instructions, node bio parsers, and custom executable scripts; and an interactive contact stylesheet that compiles and sends transmissions directly.',
    bestFor: 'Software Engineers, Technical Writers, Systems Programmers, Hackers, Open Source Authors',
    tags: ['VS Code', 'Developer', 'Code Editor', 'Interactive', 'Unique', 'React', 'Next.js'],
    previewGradient: 'from-slate-900 via-[#1e1e24] to-zinc-950',
    supportedSections: ['profile', 'about', 'experience', 'education', 'skills', 'projects', 'contact'],
    defaultConfig: {
      ...defaultConfig,
      typography: 'mono',
      bgStyle: 'dark',
      cardStyle: 'flat',
      accentColor: '#1f6feb',
      spacing: 'compact',
      sectionOrder: ['profile', 'about', 'projects', 'experience', 'skills', 'contact']
    },
    rendererType: 'github-vscode-008',
    animationLevel: 'Moderate',
    layout: 'IDE / Code Editor',
    responsive: true,
    status: 'production',
    sourceReference: 'https://github.com/itsnitinr/vscode-portfolio',
    licenseReference: 'MIT'
  },
  {
    id: 'github-yuji-009',
    name: 'Classic React Developer Portfolio',
    category: 'Developer Portfolio',
    interactionModel: 'Dynamic Light/Dark toggling, categorised experience trees, responsive tag filtering grids, and direct submission triggers',
    description: 'Faithful reproduction of Yuji Satos personal react-portfolio-template. Features sleek dark and light theme toggles, clean high-contrast layouts, multi-category skill expertise cards with themed domain tags, a chronological vertical timeline of career experience, dynamic project category filtering grids with source links, and contact modules with success response integrations.',
    bestFor: 'Full-Stack Developers, Cloud Consultants, AI Engineers, Software Generalists',
    tags: ['Yuji Sato', 'React', 'TypeScript', 'Sass', 'Tailwind', 'Light/Dark', 'Minimalist'],
    previewGradient: 'from-[#121214] via-[#1e1b4b] to-[#111827]',
    supportedSections: ['profile', 'about', 'skills', 'experience', 'projects', 'contact'],
    defaultConfig: {
      ...defaultConfig,
      typography: 'sans',
      bgStyle: 'dark',
      cardStyle: 'border',
      accentColor: '#6366f1',
      spacing: 'normal',
      sectionOrder: ['profile', 'about', 'skills', 'experience', 'projects', 'contact']
    },
    rendererType: 'github-yuji-009',
    animationLevel: 'Moderate',
    layout: 'Classic Modern Single Page',
    responsive: true,
    status: 'production',
    sourceReference: 'https://github.com/yujisatojr/react-portfolio-template',
    licenseReference: 'MIT'
  },
  {
    id: 'github-cleanfolio-010',
    name: 'Cleanfolio Developer Portfolio',
    category: 'Clean / Professional',
    interactionModel: 'Light and Dark mode toggling, clean minimalism, project link icons, pill-style skill tags, and direct mail action trigger',
    description: 'Faithful reproduction of Raj Shekhars cleanfolio portfolio template. Features ultra-clean layouts, light and dark mode toggles, project cards with tech stack badges and direct repository/preview links, a centered skill cloud, and sleek minimalist typography.',
    bestFor: 'Front-End Engineers, Full-Stack Developers, UI Engineers, Minimalist Software Engineers',
    tags: ['React', 'Clean', 'Minimal', 'Professional', 'Developer', 'Responsive'],
    previewGradient: 'from-[#fcfcfc] via-[#2978b5] to-[#23283e]',
    supportedSections: ['profile', 'about', 'skills', 'experience', 'projects', 'contact'],
    defaultConfig: {
      ...defaultConfig,
      typography: 'sans',
      bgStyle: 'light',
      cardStyle: 'shadow',
      accentColor: '#2978b5',
      spacing: 'normal',
      sectionOrder: ['profile', 'about', 'skills', 'projects', 'experience', 'contact']
    },
    rendererType: 'github-cleanfolio-010',
    animationLevel: 'Subtle',
    layout: 'Clean developer portfolio',
    responsive: true,
    status: 'production',
    sourceReference: 'https://github.com/rjshkhr/cleanfolio',
    licenseReference: 'MIT'
  },
  {
    id: 'github-daniel-011',
    name: 'Daniel — Cinematic Portfolio',
    category: 'Minimal / Creative',
    interactionModel: 'Fullscreen dark hero photography overlay, orange dot pattern decorative accent, serif typography, top-right hamburger drawer navigation, and minimal card layouts',
    description: 'Cinematic editorial portfolio with fullscreen photography, serif display typography, dot grid accents, orange highlights, and clean full-screen overlay navigation.',
    bestFor: 'UI/UX Designers, Creative Directors, Front-End Engineers, Design Engineers, Visual Storytellers',
    tags: ['React', 'Cinematic', 'Minimal', 'Creative', 'Design', 'Editorial', 'Responsive'],
    previewGradient: 'from-[#111111] via-[#ff5428] to-[#181818]',
    supportedSections: ['profile', 'about', 'projects', 'services', 'contact'],
    defaultConfig: {
      ...defaultConfig,
      typography: 'serif',
      bgStyle: 'dark',
      cardStyle: 'border',
      accentColor: '#ff5428',
      spacing: 'relaxed',
      sectionOrder: ['profile', 'about', 'projects', 'services', 'contact']
    },
    rendererType: 'github-daniel-011',
    animationLevel: 'Subtle',
    layout: 'Cinematic editorial portfolio',
    responsive: true,
    status: 'production',
    sourceReference: 'https://github.com/daniel-cinematic',
    licenseReference: 'MIT'
  },
  {
    id: 'github-kalvin-012',
    name: 'Kalvin — Mountain Creative',
    category: 'Creative / Minimal',
    interactionModel: 'Fullscreen cinematic mountain photography, minimal top navigation bar with active underline, left-aligned bold typography, downward scroll arrow, and organic curved bottom transition',
    description: 'Bold full-screen portfolio with cinematic photography, clean navigation, dynamic specialization text, down arrow scroll indicator, organic curved edge shape, and modern sans-serif editorial layout.',
    bestFor: 'Creative Directors, Designers, Photographers, Full-Stack Developers, Freelancers',
    tags: ['React', 'Cinematic', 'Mountain', 'Creative', 'Minimal', 'Editorial', 'Responsive'],
    previewGradient: 'from-[#111111] via-[#ffffff] to-[#fafafa]',
    supportedSections: ['profile', 'about', 'services', 'projects', 'articles', 'contact'],
    defaultConfig: {
      ...defaultConfig,
      typography: 'sans',
      bgStyle: 'light',
      cardStyle: 'flat',
      accentColor: '#111111',
      spacing: 'relaxed',
      sectionOrder: ['profile', 'about', 'services', 'projects', 'articles', 'contact']
    },
    rendererType: 'github-kalvin-012',
    animationLevel: 'Subtle',
    layout: 'Mountain creative portfolio',
    responsive: true,
    status: 'production',
    sourceReference: 'https://github.com/kalvin-mountain',
    licenseReference: 'MIT'
  },
  {
    id: 'github-alex-013',
    name: 'Alex — Editorial Bento',
    category: 'Minimal / Personal',
    interactionModel: 'Clean editorial bento layout with embedded heading profile photo, experience timeline, interactive 5-step process cards, Spotify playlist, reading card, map, and orange accents',
    description: 'Clean editorial portfolio with a premium bento layout, experience timeline, personal interests, reading list, location map, and interactive process steps.',
    bestFor: 'Product Leads, Design Engineers, UX Strategists, Product Designers, Technical Leaders',
    tags: ['React', 'Bento', 'Editorial', 'Minimal', 'Personal', 'Timeline', 'Responsive'],
    previewGradient: 'from-[#f1f1f0] via-[#ffffff] to-[#f47721]',
    supportedSections: ['profile', 'about', 'experience', 'services', 'projects', 'contact'],
    defaultConfig: {
      ...defaultConfig,
      typography: 'sans',
      bgStyle: 'light',
      cardStyle: 'flat',
      accentColor: '#f47721',
      spacing: 'relaxed',
      sectionOrder: ['profile', 'about', 'experience', 'services', 'projects', 'contact']
    },
    rendererType: 'github-alex-013',
    animationLevel: 'Subtle',
    layout: 'Editorial bento portfolio',
    responsive: true,
    status: 'production',
    sourceReference: 'https://github.com/alex-bento',
    licenseReference: 'MIT'
  }
];

export const getTemplateById = (id: string): TemplateDefinition => {
  const match = templatesRegistry.find(t => t.id === id);
  if (match) return match;

  const idLower = (id || '').toLowerCase();
  
  // Specific alias mappings
  if (idLower === 'minimal') return templatesRegistry.find(t => t.id === 'github-magicui-005') || templatesRegistry[0];
  if (idLower === 'creative') return templatesRegistry.find(t => t.id === 'github-folio-003') || templatesRegistry[0];
  if (idLower === 'editorial') return templatesRegistry.find(t => t.id === 'github-alex-013') || templatesRegistry[0];
  if (idLower === 'designer') return templatesRegistry.find(t => t.id === 'github-daniel-011') || templatesRegistry[0];
  if (idLower === 'fullstack') return templatesRegistry.find(t => t.id === 'github-codebucks-001') || templatesRegistry[0];
  if (idLower === 'student' || idLower === 'studio') return templatesRegistry.find(t => t.id === 'github-cleanfolio-010') || templatesRegistry[0];

  const fallback = templatesRegistry.find(t => 
    t.id === idLower || 
    t.rendererType.toLowerCase() === idLower ||
    t.id.startsWith(idLower) ||
    idLower.startsWith(t.id) ||
    t.id.includes(idLower)
  );
  if (fallback) return fallback;

  return templatesRegistry[0];
};
