import { PortfolioData } from '../types';
import { defaultPortfolioData } from './defaultData';

export const demoDataByTemplate: Record<string, PortfolioData> = {
  'github-codebucks-001': {
    ...defaultPortfolioData,
    profile: {
      name: "Alex Morgan",
      title: "Senior Full-Stack & AI Systems Architect",
      location: "San Francisco, CA",
      bio: "Building high-performance distributed web applications and production-grade LLM orchestration pipelines. Passionate about clean code, ergonomic developer tooling, and robust software architecture.",
      email: "alex.morgan@example.com",
      phone: "+1 (555) 234-5678",
      website: "https://alexmorgan.dev",
      profilePhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
    },
    about: {
      aboutText: "With over 8 years of experience designing and scaling web services, I specialize in bridging the gap between cutting-edge artificial intelligence and rock-solid backend engineering. My core philosophy centers on simplicity, performance, and maintainable software design.",
      interests: ["Distributed Systems", "LLM Fine-Tuning", "TypeScript Ecosystem", "Cloud Architecture", "Generative UI"],
      services: ["System Architecture", "Full-Stack Development", "AI Integration", "Code Auditing"]
    },
    experience: [
      {
        id: "exp-1",
        company: "Vortex AI Labs",
        role: "Lead Systems Architect",
        duration: "2022 — Present",
        description: "Spearheaded the development of multi-agent LLM orchestration frameworks processing 5M+ daily requests with sub-100ms latency. Mentored a 12-person engineering team.",
        current: true
      },
      {
        id: "exp-2",
        company: "Stellar Cloud Inc.",
        role: "Senior Full-Stack Engineer",
        duration: "2019 — 2022",
        description: "Architected core real-time collaboration canvas using React, WebSockets, and Redis. Reduced bundle size by 45% and optimized database query execution times.",
        current: false
      }
    ],
    skills: [
      { id: "s-1", name: "TypeScript / JavaScript", category: "Languages", proficiency: 98 },
      { id: "s-2", name: "React / Next.js / Vite", category: "Frontend", proficiency: 95 },
      { id: "s-3", name: "Node.js / Express / Go", category: "Backend", proficiency: 92 },
      { id: "s-4", name: "Python / PyTorch / LangChain", category: "AI / ML", proficiency: 90 },
      { id: "s-5", name: "PostgreSQL / Redis / Firestore", category: "Databases", proficiency: 88 },
      { id: "s-6", name: "Docker / Kubernetes / AWS", category: "DevOps", proficiency: 85 }
    ],
    projects: [
      {
        id: "proj-1",
        name: "NexusDB Studio",
        description: "A lightning-fast web-based database management studio supporting PostgreSQL, SQLite, and MySQL with zero-latency visual query builders.",
        technologies: ["React", "TypeScript", "Tailwind CSS", "Wasm", "Node.js"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/alexmorgan/nexusdb-studio",
        liveUrl: "https://nexusdb.io",
        featured: true,
        year: "2025",
        status: "LIVE"
      },
      {
        id: "proj-2",
        name: "OmniSearch AI",
        description: "Enterprise vector search engine with hybrid semantic retrieval and multi-document synthesis for internal knowledge bases.",
        technologies: ["Python", "FastAPI", "Next.js", "OpenAI API", "Pinecone"],
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/alexmorgan/omnisearch-ai",
        liveUrl: "https://omnisearch.ai",
        featured: true,
        year: "2024",
        status: "LIVE"
      },
      {
        id: "proj-3",
        name: "PulseGraf UI Kit",
        description: "Minimalist, accessible, and high-performance charting library built specifically for real-time telemetry dashboards.",
        technologies: ["TypeScript", "D3.js", "Canvas API", "React"],
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/alexmorgan/pulsegraf",
        liveUrl: "https://pulsegraf.dev",
        featured: false,
        year: "2024",
        status: "LIVE"
      }
    ]
  },

  'github-adrian-002': {
    ...defaultPortfolioData,
    profile: {
      name: "Maya Chen",
      title: "3D Interactive Developer & Game Programmer",
      location: "Tokyo / Remote",
      bio: "Creating immersive 3D WebGL experiences, interactive islands, GLSL shaders, and real-time canvas simulations.",
      email: "maya.chen@example.io",
      phone: "+81 90 1234 5678",
      website: "https://mayachen.3d",
      profilePhoto: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600",
    },
    about: {
      aboutText: "I bridge mathematics, creative coding, and 3D graphics. With 6+ years in WebGL and GPU shaders, I turn complex physics into fluid browser environments.",
      interests: ["WebGL / WebGPU", "Raymarching & Shaders", "Procedural World Generation", "Spatial Audio"],
      services: ["3D Web Experiences", "Shader Development", "Interactive Game Prototyping"]
    },
    experience: [
      {
        id: "exp-adrian-1",
        company: "Polygon Studio Tokyo",
        role: "Lead 3D WebGL Developer",
        duration: "2023 — Present",
        description: "Built interactive 3D product showcases for global automotive brands achieving 60 FPS across desktop and mobile browsers.",
        current: true
      },
      {
        id: "exp-adrian-2",
        company: "Monolith Interactive",
        role: "Creative Coder & Shader Engineer",
        duration: "2020 — 2023",
        description: "Authored custom GLSL fragment shaders, audio-reactive canvas worlds, and particle physics engines.",
        current: false
      }
    ],
    skills: [
      { id: "sad-1", name: "Three.js / R3F", category: "3D Graphics", proficiency: 98 },
      { id: "sad-2", name: "WebGL / GLSL Shaders", category: "Shaders", proficiency: 95 },
      { id: "sad-3", name: "TypeScript / React", category: "Frontend", proficiency: 92 },
      { id: "sad-4", name: "Blender / GLTF Pipelines", category: "3D Modeling", proficiency: 88 },
      { id: "sad-5", name: "WebGPU / Compute Shaders", category: "GPU Compute", proficiency: 85 }
    ],
    projects: [
      {
        id: "pad-1",
        name: "Hyperion 3D Island Canvas",
        description: "A fully interactive 3D island with day/night cycles, water reflection shaders, and physics-driven particle weather.",
        technologies: ["Three.js", "React Three Fiber", "GLSL", "TypeScript"],
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/mayachen/hyperion-3d",
        liveUrl: "https://hyperion-3d.dev",
        featured: true,
        year: "2025"
      },
      {
        id: "pad-2",
        name: "Nebula Audio Shader World",
        description: "Real-time audio-reactive 3D glass sphere simulation powered by WebAudio FFT and custom raymarched GLSL shaders.",
        technologies: ["WebGL", "GLSL", "WebAudio API", "Vite"],
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/mayachen/nebula-audio",
        liveUrl: "https://nebula-audio.io",
        featured: true,
        year: "2024"
      },
      {
        id: "pad-3",
        name: "CyberSphere Physics Playground",
        description: "GPU-accelerated particle collision canvas running 100,000 instanced spheres at 60 FPS on mobile browsers.",
        technologies: ["WebGPU", "TypeScript", "Canvas API"],
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/mayachen/cybersphere",
        liveUrl: "https://cybersphere.net",
        featured: false,
        year: "2024"
      }
    ]
  },

  'github-folio-003': {
    ...defaultPortfolioData,
    profile: {
      name: "Ayush Singh",
      title: "Creative UI Engineer & Web Architect",
      location: "Bengaluru, India",
      bio: "Crafting fluid digital products, motion-driven interfaces, and high-conversion web platforms.",
      email: "ayush.singh@example.com",
      phone: "+91 98765 43210",
      website: "https://ayushsingh.dev",
      profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
    },
    about: {
      aboutText: "I blend visual elegance with high-performance code. Over the past 5 years, I have built design systems and motion components used by thousands of developers worldwide.",
      interests: ["Motion Graphics", "Micro-Interactions", "Design Systems", "Web Performance"],
      services: ["UI/UX Engineering", "Frontend Architecture", "Brand Interactive Sites"]
    },
    experience: [
      {
        id: "exp-fol-1",
        company: "Lumina Labs India",
        role: "Senior UI Engineer",
        duration: "2022 — Present",
        description: "Designed and built enterprise component libraries, boosting brand consistent component adoption by 80%.",
        current: true
      },
      {
        id: "exp-fol-2",
        company: "Crafted Studio",
        role: "Frontend Motion Developer",
        duration: "2020 — 2022",
        description: "Created smooth scroll animations, hero transitions, and responsive landing pages.",
        current: false
      }
    ],
    skills: [
      { id: "sfol-1", name: "React / Next.js", category: "Frontend", proficiency: 98 },
      { id: "sfol-2", name: "Framer Motion", category: "Animation", proficiency: 96 },
      { id: "sfol-3", name: "Tailwind CSS", category: "Styling", proficiency: 98 },
      { id: "sfol-4", name: "TypeScript", category: "Languages", proficiency: 92 },
      { id: "sfol-5", name: "Figma Tokens", category: "Design Tooling", proficiency: 90 }
    ],
    projects: [
      {
        id: "pfol-1",
        name: "Lumina UI Design System",
        description: "A production-grade React & Tailwind UI design system featuring fluid micro-interactions, dark mode, and full accessibility.",
        technologies: ["React", "Tailwind CSS", "Framer Motion", "Storybook"],
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/ayushsingh/lumina-ui",
        liveUrl: "https://luminaui.dev",
        featured: true,
        year: "2025"
      },
      {
        id: "pfol-2",
        name: "Motion Canvas Studio",
        description: "Browser-based interactive timeline editor for generating smooth keyframe CSS & Framer Motion animation snippets.",
        technologies: ["Next.js", "TypeScript", "Canvas", "Zustand"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/ayushsingh/motion-canvas",
        liveUrl: "https://motioncanvas.app",
        featured: true,
        year: "2024"
      }
    ]
  },

  'github-hamish-004': {
    ...defaultPortfolioData,
    profile: {
      name: "Jordan Lee",
      title: "Cyberpunk Creative Technologist & GLSL Engineer",
      location: "Berlin, Germany",
      bio: "Architecting generative audio-visual shaders, cyberpunk matrix canvases, and experimental web experiments.",
      email: "jordan.lee@cyberpunk.berlin",
      phone: "+49 30 1234567",
      website: "https://jordanlee.berlin",
      profilePhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
    },
    about: {
      aboutText: "Exploring the dark aesthetic boundary where code becomes digital neon art. I design GLSL canvas loops, spatial audio visualizers, and cyberpunk user interfaces.",
      interests: ["Generative Art", "GLSL Shaders", "Cyberpunk Design", "WebAudio Synthesizers"],
      services: ["Experimental WebGL", "Generative Audio/Visual", "Interactive Creative Direction"]
    },
    experience: [
      {
        id: "exp-ham-1",
        company: "Matrix Media Berlin",
        role: "Lead Creative Technologist",
        duration: "2021 — Present",
        description: "Engineered neon interactive installations and real-time audio visualizers for international techno festivals.",
        current: true
      }
    ],
    skills: [
      { id: "sham-1", name: "GLSL / WebGL", category: "Shaders", proficiency: 98 },
      { id: "sham-2", name: "Three.js", category: "3D Engine", proficiency: 95 },
      { id: "sham-3", name: "WebAudio Synthesizers", category: "Audio", proficiency: 90 },
      { id: "sham-4", name: "TypeScript / React", category: "Frontend", proficiency: 92 }
    ],
    projects: [
      {
        id: "pham-1",
        name: "NeoTokyo Matrix Engine",
        description: "A cyberpunk rain & glitched terminal background simulator with real-time sound synthesis.",
        technologies: ["GLSL", "Three.js", "WebAudio API", "TypeScript"],
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/jordanlee/neotokyo-matrix",
        liveUrl: "https://neotokyo-matrix.berlin",
        featured: true,
        year: "2025"
      },
      {
        id: "pham-2",
        name: "CyberPulse Synth Visualizer",
        description: "Reactive 3D GLSL plasma wave canvas responding live to microphone input and MIDI frequency bands.",
        technologies: ["WebGL", "GLSL", "React", "WebMIDI"],
        image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/jordanlee/cyberpulse",
        liveUrl: "https://cyberpulse.audio",
        featured: true,
        year: "2024"
      }
    ]
  },

  'github-magicui-005': {
    ...defaultPortfolioData,
    profile: {
      name: "Dillion Verma",
      title: "Minimalist Product Maker & Open Source Contributor",
      location: "New York, NY",
      bio: "Creator of Magic UI components. Focused on typography, micro-interactions, and developer tools.",
      email: "dillion@magicui.design",
      phone: "+1 (212) 555-0199",
      website: "https://magicui.design",
      profilePhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600",
    },
    about: {
      aboutText: "I build open-source UI components and developer tools that empower thousands of creators to launch beautiful products faster.",
      interests: ["UI Design Systems", "Open Source Software", "React 19 Server Components", "Typography"],
      services: ["Open Source UI Libraries", "Frontend Product Design", "Design Engineering"]
    },
    experience: [
      {
        id: "exp-mag-1",
        company: "Magic UI",
        role: "Founder & Lead Engineer",
        duration: "2023 — Present",
        description: "Created and scaled Magic UI to 30,000+ GitHub stars and over 500,000 monthly active component downloads.",
        current: true
      }
    ],
    skills: [
      { id: "smag-1", name: "React 19 / Next.js 15", category: "Core Framework", proficiency: 99 },
      { id: "smag-2", name: "Tailwind CSS v4", category: "Styling", proficiency: 98 },
      { id: "smag-3", name: "Framer Motion", category: "Animations", proficiency: 95 },
      { id: "smag-4", name: "TypeScript", category: "Languages", proficiency: 96 }
    ],
    projects: [
      {
        id: "pmag-1",
        name: "Magic UI Component Library",
        description: "20+ free and open-source animated components built with React, Typescript, Tailwind CSS, and Framer Motion.",
        technologies: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/magicuidesign/magicui",
        liveUrl: "https://magicui.design",
        featured: true,
        year: "2025"
      },
      {
        id: "pmag-2",
        name: "BlurFade Animation Engine",
        description: "Ultra lightweight reveal animation primitives for text, images, and layout cards with zero bundle overhead.",
        technologies: ["TypeScript", "Framer Motion", "React"],
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/magicuidesign/blur-fade",
        liveUrl: "https://blurfade.magicui.design",
        featured: true,
        year: "2024"
      }
    ]
  },

  'github-nixrajput-007': {
    ...defaultPortfolioData,
    profile: {
      name: "Nikhil Rajput",
      title: "Modern Full-Stack Developer & AI Specialist",
      location: "Delhi, India",
      bio: "Architecting cloud-native web applications, Aceternity UI systems, and vector database engines.",
      email: "nikhil.rajput@example.com",
      phone: "+91 99887 76655",
      website: "https://nikhilrajput.dev",
      profilePhoto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600",
    },
    about: {
      aboutText: "Specializing in modern full-stack engineering with focus on sleek dark-mode aesthetics, responsive UI components, and LLM API integrations.",
      interests: ["Full-Stack Next.js", "Aceternity Components", "Vector DBs", "AI Workflows"],
      services: ["Full-Stack Web Apps", "AI Integration", "Modern SaaS Dashboards"]
    },
    experience: [
      {
        id: "exp-nix-1",
        company: "Apex Tech Labs",
        role: "Senior Full-Stack Developer",
        duration: "2022 — Present",
        description: "Built scalable SaaS dashboards and integrated vector search capabilities into enterprise web portals.",
        current: true
      }
    ],
    skills: [
      { id: "snix-1", name: "Next.js / React", category: "Frontend", proficiency: 96 },
      { id: "snix-2", name: "TypeScript / Node.js", category: "Full-Stack", proficiency: 94 },
      { id: "snix-3", name: "Tailwind CSS / Aceternity", category: "Styling", proficiency: 98 },
      { id: "snix-4", name: "Python / FastAPI", category: "Backend & AI", proficiency: 90 }
    ],
    projects: [
      {
        id: "pnix-1",
        name: "Aceternity Canvas UI",
        description: "Glowing card grids, spotlight effects, and animated background beams for modern developer portfolios.",
        technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/nikhilrajput/aceternity-canvas",
        liveUrl: "https://aceternity-canvas.dev",
        featured: true,
        year: "2025"
      }
    ]
  },

  'github-vscode-008': {
    ...defaultPortfolioData,
    profile: {
      name: "David Kim",
      title: "Systems Software Engineer & Kernel Specialist",
      location: "Seattle, WA",
      bio: "Building developer compilers, terminal tooling, and WebAssembly systems inside VS Code environments.",
      email: "david.kim@kerneldev.org",
      phone: "+1 (206) 555-0144",
      website: "https://davidkim.code",
      profilePhoto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600",
    },
    about: {
      aboutText: "Developer tooling enthusiast crafting WebAssembly runtimes, VS Code extensions, and terminal IDE experiences with pixel-perfect IDE themes.",
      interests: ["Compiler Design", "VS Code Extensions", "WebAssembly", "Rust & Linux Kernel"],
      services: ["Custom IDE Extension Development", "Wasm Compiler Engineering", "Developer Tooling"]
    },
    experience: [
      {
        id: "exp-vsc-1",
        company: "CodeCraft Systems",
        role: "Principal Tooling Engineer",
        duration: "2021 — Present",
        description: "Developed browser-based IDE terminals and high-speed syntax highlighter engines.",
        current: true
      }
    ],
    skills: [
      { id: "svsc-1", name: "Rust / C++", category: "Systems", proficiency: 96 },
      { id: "svsc-2", name: "WebAssembly (Wasm)", category: "Runtime", proficiency: 94 },
      { id: "svsc-3", name: "TypeScript / Extension API", category: "VS Code", proficiency: 98 },
      { id: "svsc-4", name: "Linux / Terminal Scripting", category: "OS", proficiency: 92 }
    ],
    projects: [
      {
        id: "pvsc-1",
        name: "WasmTerminal Compiler Engine",
        description: "Run compiled Rust, C++, and Go binaries directly inside the browser using WASI POSIX emulation.",
        technologies: ["WebAssembly", "Rust", "TypeScript", "xterm.js"],
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/davidkim/wasm-terminal",
        liveUrl: "https://wasm-terminal.dev",
        featured: true,
        year: "2025"
      }
    ]
  },

  'github-yuji-009': {
    ...defaultPortfolioData,
    profile: {
      name: "Yuji Sato",
      title: "Senior Frontend Architect & React Specialist",
      location: "Vancouver, Canada",
      bio: "Specializing in React performance optimization, design systems, and enterprise web architecture.",
      email: "yuji.sato@frontend.ca",
      phone: "+1 (604) 555-0188",
      website: "https://yujisato.dev",
      profilePhoto: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=600",
    },
    about: {
      aboutText: "Architecting high-scale frontend systems with zero-compromise bundle sizes and bulletproof unit testing.",
      interests: ["React Architecture", "Micro-Frontends", "Web Vitals", "State Management"],
      services: ["Frontend Architecture Consulting", "Performance Auditing", "Design System Strategy"]
    },
    experience: [
      {
        id: "exp-yuj-1",
        company: "Pacific Web Scale",
        role: "Staff Frontend Architect",
        duration: "2021 — Present",
        description: "Optimized Core Web Vitals across 12 SaaS applications, reducing LCP by 1.8 seconds.",
        current: true
      }
    ],
    skills: [
      { id: "syuj-1", name: "React 19 / Redux Toolkit", category: "Frontend", proficiency: 98 },
      { id: "syuj-2", name: "TypeScript", category: "Languages", proficiency: 96 },
      { id: "syuj-3", name: "Vite / Webpack Build Tooling", category: "Build Tools", proficiency: 94 },
      { id: "syuj-4", name: "Tailwind CSS / Emotion", category: "Styling", proficiency: 92 }
    ],
    projects: [
      {
        id: "pyuj-1",
        name: "React Flow Dashboard Suite",
        description: "Enterprise interactive node editor and analytics dashboard with real-time data streaming.",
        technologies: ["React", "TypeScript", "Tailwind CSS", "Zustand"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/yujisato/react-flow-suite",
        liveUrl: "https://reactflow-suite.dev",
        featured: true,
        year: "2025"
      }
    ]
  },

  'github-cleanfolio-010': {
    ...defaultPortfolioData,
    profile: {
      name: "Elena Rostova",
      title: "Cleanfolio UI Engineer & Frontend Developer",
      location: "London, UK",
      bio: "Focused on ultra-clean developer portfolios, accessible typography, and frictionless user journeys.",
      email: "elena.rostova@cleanfolio.uk",
      phone: "+44 20 7946 0912",
      website: "https://cleanfolio.uk",
      profilePhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600",
    },
    about: {
      aboutText: "Minimalism, speed, and clarity are my design tenets. I build clean, accessible web interfaces that load instantaneously.",
      interests: ["Minimalist Web Design", "Web Accessibility (WCAG 2.1)", "Lightweight CSS", "Performance Optimization"],
      services: ["Accessible Frontend Development", "Clean Portfolio Design", "Speed Optimization"]
    },
    experience: [
      {
        id: "exp-cle-1",
        company: "London Design Minimal",
        role: "Senior UX/UI Engineer",
        duration: "2022 — Present",
        description: "Crafted accessible websites for UK tech startups with perfect 100 Lighthouse performance scores.",
        current: true
      }
    ],
    skills: [
      { id: "scle-1", name: "Semantic HTML5 / CSS3", category: "Fundamentals", proficiency: 99 },
      { id: "scle-2", name: "JavaScript / TypeScript", category: "Scripting", proficiency: 95 },
      { id: "scle-3", name: "React", category: "Frameworks", proficiency: 94 },
      { id: "scle-4", name: "Accessibility (a11y)", category: "Compliance", proficiency: 98 }
    ],
    projects: [
      {
        id: "pcle-1",
        name: "Cleanfolio Minimal Template",
        description: "Ultra-fast, accessible developer portfolio template with light/dark theme toggle and zero dependency bloat.",
        technologies: ["React", "CSS Modules", "TypeScript"],
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/elenarostova/cleanfolio",
        liveUrl: "https://cleanfolio.uk",
        featured: true,
        year: "2025"
      }
    ]
  },

  'github-daniel-011': {
    ...defaultPortfolioData,
    profile: {
      name: "Daniel Morales",
      title: "Cinematic Director & Creative Technologist",
      location: "Los Angeles, CA",
      bio: "Blending cinematic editorial photography, serif typography, and storytelling web experiences.",
      email: "daniel.morales@cinematic.la",
      phone: "+1 (310) 555-0192",
      website: "https://danielmorales.la",
      profilePhoto: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=600",
    },
    about: {
      aboutText: "Storytelling through light, motion, and digital craftsmanship. I design editorial portfolios for visual artists, photographers, and filmmakers.",
      interests: ["Cinematic Web Design", "Editorial Layouts", "Film Direction", "Color Grading"],
      services: ["Creative Direction", "Cinematic Portfolio Websites", "Brand Film Strategy"]
    },
    experience: [
      {
        id: "exp-dan-1",
        company: "Horizon Film & Web Studios LA",
        role: "Creative Director",
        duration: "2020 — Present",
        description: "Directed web launch experiences for award-winning indie films and luxury brand commercials.",
        current: true
      }
    ],
    skills: [
      { id: "sdan-1", name: "Editorial Typography", category: "Design", proficiency: 98 },
      { id: "sdan-2", name: "React / Motion", category: "Frontend", proficiency: 94 },
      { id: "sdan-3", name: "Cinema 4D / WebGL", category: "3D Motion", proficiency: 90 },
      { id: "sdan-4", name: "Color Grading & Video", category: "Media", proficiency: 96 }
    ],
    projects: [
      {
        id: "pdan-1",
        name: "Noir Soundscapes Editorial",
        description: "Cinematic dark editorial showcase combining ambient audio loops, serif typography, and full-screen video background transitions.",
        technologies: ["React", "Framer Motion", "Tailwind CSS", "WebAudio"],
        image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/danielmorales/noir-soundscapes",
        liveUrl: "https://noir-soundscapes.la",
        featured: true,
        year: "2025"
      }
    ]
  },

  'github-kalvin-012': {
    ...defaultPortfolioData,
    profile: {
      name: "Kalvin Rivera",
      title: "Mountain Creative Director & Photographer",
      location: "Denver, CO",
      bio: "Designing mountain photography showcases, outdoor brands, and bold editorial web experiences.",
      email: "kalvin@mountaincraft.co",
      phone: "+1 (303) 555-0133",
      website: "https://mountaincraft.co",
      profilePhoto: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=600",
    },
    about: {
      aboutText: "Capturing the majesty of high altitude landscapes and transforming them into immersive web stories for outdoor apparel and travel brands.",
      interests: ["Landscape Photography", "Outdoor Apparel Web", "Parallax Landscapes", "Geospatial Maps"],
      services: ["Outdoor Brand Design", "High-Resolution Image Galleries", "Full-Stack Web Engineering"]
    },
    experience: [
      {
        id: "exp-kal-1",
        company: "Alpine Creative Denver",
        role: "Principal Creative Director",
        duration: "2021 — Present",
        description: "Designed mountain brand landing pages with interactive elevation maps and full-bleed hero photos.",
        current: true
      }
    ],
    skills: [
      { id: "skal-1", name: "Next.js / React", category: "Frontend", proficiency: 96 },
      { id: "skal-2", name: "Tailwind CSS / Parallax", category: "Styling", proficiency: 98 },
      { id: "skal-3", name: "Mapbox GL API", category: "Geospatial", proficiency: 92 },
      { id: "skal-4", name: "Commercial Photography", category: "Media", proficiency: 95 }
    ],
    projects: [
      {
        id: "pkal-1",
        name: "Summit Alpine Journal",
        description: "Full-bleed outdoor photography platform with interactive 3D elevation maps and trail log journaling.",
        technologies: ["Next.js", "Mapbox GL", "Tailwind CSS", "Framer Motion"],
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/kalvinrivera/summit-journal",
        liveUrl: "https://summitjournal.co",
        featured: true,
        year: "2025"
      }
    ]
  },

  'github-alex-013': {
    ...defaultPortfolioData,
    profile: {
      name: "Sofia Patel",
      title: "Editorial Bento Designer & Product Architect",
      location: "Austin, TX",
      bio: "Crafting structured bento grid layouts, personal timelines, process cards, and product strategies.",
      email: "sofia.patel@bento.design",
      phone: "+1 (512) 555-0177",
      website: "https://sofiapatel.bento",
      profilePhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
    },
    about: {
      aboutText: "I organize complex information into intuitive, aesthetically balanced bento grid systems. From product specs to personal engineering metrics, bento layouts make content digestible.",
      interests: ["Bento Layout Systems", "Information Architecture", "Design Tokens", "React Layout Engines"],
      services: ["Bento UI System Design", "Product Strategy", "Frontend Component Architecture"]
    },
    experience: [
      {
        id: "exp-alx-1",
        company: "GridCraft Austin",
        role: "Lead Product Designer & UI Engineer",
        duration: "2022 — Present",
        description: "Architected modular bento design systems used by 50+ SaaS product teams across North America.",
        current: true
      }
    ],
    skills: [
      { id: "salx-1", name: "Bento Grid Architecture", category: "Layout", proficiency: 99 },
      { id: "salx-2", name: "React / TypeScript", category: "Frontend", proficiency: 95 },
      { id: "salx-3", name: "Tailwind CSS", category: "Styling", proficiency: 98 },
      { id: "salx-4", name: "Figma Component Variables", category: "Design Tooling", proficiency: 96 }
    ],
    projects: [
      {
        id: "palx-1",
        name: "Bento Grid Layout Engine",
        description: "Responsive CSS Grid & Flexbox bento tile component kit with drag-and-drop reordering capabilities.",
        technologies: ["React", "Tailwind CSS", "dnd-kit", "TypeScript"],
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/sofiapatel/bento-grid-engine",
        liveUrl: "https://bentogrid.design",
        featured: true,
        year: "2025"
      }
    ]
  },

  'github-cyber-organic-014': {
    ...defaultPortfolioData,
    profile: {
      name: "Kaelen Vance",
      title: "Cyber-Organic Terminal Engineer",
      location: "Zurich, Switzerland",
      bio: "Developing bio-digital interfaces, terminal shells, code-driven typography, and cyber grid systems.",
      email: "kaelen.vance@terminal.ch",
      phone: "+41 44 123 4567",
      website: "https://kaelenvance.ch",
      profilePhoto: "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&q=80&w=600",
    },
    about: {
      aboutText: "Fusing organic biological visual aesthetics with high-efficiency terminal command shells. My work focuses on low-overhead code editors and cyber telemetry platforms.",
      interests: ["Terminal Interfaces", "Bio-Digital Systems", "Low-Level Rust", "GPGPU Computations"],
      services: ["Terminal UI Engineering", "High-Throughput Systems", "Security Telemetry Platforms"]
    },
    experience: [
      {
        id: "exp-cyb-1",
        company: "BioCyber Labs Zurich",
        role: "Principal Systems Engineer",
        duration: "2022 — Present",
        description: "Engineered real-time bio-sensor telemetry dashboards running on web-based command consoles.",
        current: true
      }
    ],
    skills: [
      { id: "scyb-1", name: "Rust / WebAssembly", category: "Backend & Wasm", proficiency: 97 },
      { id: "scyb-2", name: "TypeScript / React", category: "Frontend", proficiency: 94 },
      { id: "scyb-3", name: "Terminal ANSI / Canvas", category: "CLI UI", proficiency: 98 },
      { id: "scyb-4", name: "WebGL / Compute Shaders", category: "GPU", proficiency: 91 }
    ],
    projects: [
      {
        id: "pcyb-1",
        name: "BioDigital Terminal Shell",
        description: "A web-executable interactive terminal environment with cyber-organic ASCII particle FX and live system diagnostics.",
        technologies: ["Rust", "Wasm", "TypeScript", "xterm.js"],
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/kaelenvance/biodigital-shell",
        liveUrl: "https://biodigital.ch",
        featured: true,
        year: "2025"
      }
    ]
  },

  'github-sudhanva-015': {
    ...defaultPortfolioData,
    profile: {
      name: "Sudhanva Nadiger",
      title: "Interactive Full-Stack Developer",
      location: "Toronto, Canada",
      bio: "Building motion-rich developer canvases, open-source repositories, and continuous marquee showcases.",
      email: "sudhanva@nadiger.dev",
      phone: "+1 (416) 555-0199",
      website: "https://sudhanvanadiger.dev",
      profilePhoto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600",
    },
    about: {
      aboutText: "Full-stack developer with a passion for interactive web tools, continuous infinite marquee showcases, and developer workflow automation.",
      interests: ["Full-Stack Engineering", "Continuous Marquee Systems", "Open Source Libraries", "Node.js Services"],
      services: ["Full-Stack App Development", "Interactive UI Engineering", "API Integration"]
    },
    experience: [
      {
        id: "exp-sud-1",
        company: "Toronto Web Innovation",
        role: "Senior Developer",
        duration: "2022 — Present",
        description: "Lead developer on high-concurrency Node.js web services and interactive client canvases.",
        current: true
      }
    ],
    skills: [
      { id: "ssud-1", name: "Node.js / Express", category: "Backend", proficiency: 95 },
      { id: "ssud-2", name: "React / Next.js", category: "Frontend", proficiency: 96 },
      { id: "ssud-3", name: "MongoDB / PostgreSQL", category: "Database", proficiency: 92 },
      { id: "ssud-4", name: "Tailwind CSS / Motion", category: "Styling", proficiency: 94 }
    ],
    projects: [
      {
        id: "psud-1",
        name: "Infinity Marquee Showcase",
        description: "High-performance CSS/GPU continuous scrolling tech marquee component with auto-pause on hover.",
        technologies: ["React", "TypeScript", "Tailwind CSS"],
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/sudhanvanadiger/infinity-marquee",
        liveUrl: "https://infinity-marquee.dev",
        featured: true,
        year: "2025"
      }
    ]
  },

  'github-nixrajput-016': {
    ...defaultPortfolioData,
    profile: {
      name: "Aarav Mehta",
      title: "Cursor-Reactive UI Engineer",
      location: "Singapore",
      bio: "Engineering cursor-reactive spotlights, ambient glow backdrops, and interactive case study cards.",
      email: "aarav.mehta@glowui.sg",
      phone: "+65 6789 0123",
      website: "https://aaravmehta.sg",
      profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
    },
    about: {
      aboutText: "Specializing in micro-interaction physics, cursor tracking glow spotlights, and dynamic visual card highlights that bring static web layouts to life.",
      interests: ["Cursor Mechanics", "Ambient Lighting FX", "React Custom Hooks", "CSS Hardware Acceleration"],
      services: ["Interactive UI Micro-Interactions", "Cursor FX Plugins", "Frontend Design System Optimization"]
    },
    experience: [
      {
        id: "exp-aar-1",
        company: "GlowUI Labs Singapore",
        role: "Lead Interface Architect",
        duration: "2023 — Present",
        description: "Built cursor-reactive component libraries used by fintech and AI startups across Asia Pacific.",
        current: true
      }
    ],
    skills: [
      { id: "saar-1", name: "React Custom Hooks", category: "Frontend", proficiency: 98 },
      { id: "saar-2", name: "CSS Hardware Acceleration", category: "Performance", proficiency: 96 },
      { id: "saar-3", name: "TypeScript", category: "Languages", proficiency: 95 },
      { id: "saar-4", name: "Tailwind CSS", category: "Styling", proficiency: 97 }
    ],
    projects: [
      {
        id: "paar-1",
        name: "Cursor Spotlight Canvas",
        description: "Zero-lag cursor tracking spotlight component that casts smooth radial gradients across UI card borders.",
        technologies: ["React", "TypeScript", "Tailwind CSS"],
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/aaravmehta/cursor-spotlight",
        liveUrl: "https://cursor-spotlight.sg",
        featured: true,
        year: "2025"
      }
    ]
  },

  'github-hanzla-017': {
    ...defaultPortfolioData,
    profile: {
      name: "Hanzla Tauqeer",
      title: "Full-Stack Software Engineer",
      location: "Lahore, Pakistan",
      bio: "Building cloud architectures, terminal coding scenes, and full-stack enterprise applications.",
      email: "hanzla.tauqeer@dev.pk",
      phone: "+92 300 1234567",
      website: "https://hanzlatauqeer.dev",
      profilePhoto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600",
    },
    about: {
      aboutText: "Full-stack engineer passionate about cloud microservices, Go web services, and responsive developer interfaces.",
      interests: ["Microservices Architecture", "Go & Docker Containers", "React Portals", "Database Sharding"],
      services: ["Full-Stack Application Development", "Backend API Engineering", "DevOps Pipelines"]
    },
    experience: [
      {
        id: "exp-hnz-1",
        company: "CloudScale Systems",
        role: "Senior Full-Stack Engineer",
        duration: "2022 — Present",
        description: "Architected containerized microservices handling high-concurrency payment gateways.",
        current: true
      }
    ],
    skills: [
      { id: "shnz-1", name: "Go (Golang)", category: "Backend", proficiency: 95 },
      { id: "shnz-2", name: "Docker / Kubernetes", category: "DevOps", proficiency: 92 },
      { id: "shnz-3", name: "React / TypeScript", category: "Frontend", proficiency: 94 },
      { id: "shnz-4", name: "PostgreSQL", category: "Database", proficiency: 90 }
    ],
    projects: [
      {
        id: "phnz-1",
        name: "Terminal IDE Web Workstation",
        description: "Full-featured web developer workstation with terminal multiplexer and git integration.",
        technologies: ["React", "Go", "Docker", "WebSockets"],
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/hanzlatauqeer/terminal-workstation",
        liveUrl: "https://workstation.dev",
        featured: true,
        year: "2025"
      }
    ]
  },

  'github-yujisato-018': {
    ...defaultPortfolioData,
    profile: {
      name: "Lucas Fernandez",
      title: "Senior React & TypeScript Developer",
      location: "Madrid, Spain",
      bio: "Creating dark-theme glowing avatar frames, skill meters, project showcases, and React apps.",
      email: "lucas.fernandez@reactdev.es",
      phone: "+34 91 123 4567",
      website: "https://lucasfernandez.es",
      profilePhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
    },
    about: {
      aboutText: "Senior React specialist crafting dark-themed, glowing component libraries and high-scale SPA applications.",
      interests: ["React 19 State Patterns", "Glowing Avatar Systems", "Vite Ecosystem", "TypeScript Utility Types"],
      services: ["React SPA Engineering", "Frontend Consulting", "Component Performance Auditing"]
    },
    experience: [
      {
        id: "exp-luc-1",
        company: "Iberia Tech Madrid",
        role: "Senior React Lead",
        duration: "2021 — Present",
        description: "Led the migration of legacy client platforms to modern Next.js App Router.",
        current: true
      }
    ],
    skills: [
      { id: "sluc-1", name: "React 19 / Vite", category: "Frontend", proficiency: 98 },
      { id: "sluc-2", name: "TypeScript", category: "Languages", proficiency: 96 },
      { id: "sluc-3", name: "Tailwind CSS", category: "Styling", proficiency: 95 },
      { id: "sluc-4", name: "Zustand / Redux", category: "State Management", proficiency: 92 }
    ],
    projects: [
      {
        id: "pluc-1",
        name: "Glowing Meter Dashboard",
        description: "Interactive real-time telemetry dashboard with custom neon glowing circular progress meters.",
        technologies: ["React", "TypeScript", "Tailwind CSS", "SVG"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/lucasfernandez/glowing-meter",
        liveUrl: "https://glowingmeter.es",
        featured: true,
        year: "2025"
      }
    ]
  },

  'github-chetanverma-019': {
    ...defaultPortfolioData,
    profile: {
      name: "Chetan Verma",
      title: "Creative Developer & UX Architect",
      location: "Melbourne, Australia",
      bio: "Combining bold hero typography, interactive service matrices, case studies, and engineering insights.",
      email: "chetan@chetanverma.com",
      phone: "+61 3 9000 1234",
      website: "https://chetanverma.com",
      profilePhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600",
    },
    about: {
      aboutText: "Creative developer bridging UX architecture, micro-animations, and clean digital portfolios.",
      interests: ["UX Architecture", "Case Study Layouts", "Brand Typography", "Interactive Services Matrix"],
      services: ["UX Design Systems", "Creative Frontend Development", "Brand Identity Websites"]
    },
    experience: [
      {
        id: "exp-cht-1",
        company: "Chetan Studio Melbourne",
        role: "Creative Director",
        duration: "2020 — Present",
        description: "Crafted interactive portfolios and digital brand platforms for Australian tech leaders.",
        current: true
      }
    ],
    skills: [
      { id: "scht-1", name: "UX Strategy & Prototyping", category: "UX", proficiency: 98 },
      { id: "scht-2", name: "Next.js / React", category: "Frontend", proficiency: 96 },
      { id: "scht-3", name: "Tailwind CSS / Motion", category: "Styling", proficiency: 97 },
      { id: "scht-4", name: "Brand Systems", category: "Branding", proficiency: 94 }
    ],
    projects: [
      {
        id: "pcht-1",
        name: "Case Study Showcase Studio",
        description: "Interactive case study portfolio framework with expandable project metrics and live prototypes.",
        technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/chetanverma/case-study-studio",
        liveUrl: "https://chetanverma.com",
        featured: true,
        year: "2025"
      }
    ]
  },

  'github-gitfolio-020': {
    ...defaultPortfolioData,
    profile: {
      name: "Nova Sterling",
      title: "Cyberpunk Systems Maintainer & Open-Source Author",
      location: "Stockholm, Sweden",
      bio: "Maintaining telemetry HUDs, command consoles, commit graphs, and cyberpunk web engines.",
      email: "nova.sterling@gitfolio.se",
      phone: "+46 8 123 4567",
      website: "https://novasterling.se",
      profilePhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
    },
    about: {
      aboutText: "Cyberpunk open-source author maintaining Git telemetry dashboards, matrix HUDs, and terminal UI frameworks.",
      interests: ["Cyberpunk HUDs", "Git Telemetry Visualizers", "Rust Systems", "Open Source Tooling"],
      services: ["Open Source Infrastructure", "Cyberpunk Web Applications", "Security Command Consoles"]
    },
    experience: [
      {
        id: "exp-nov-1",
        company: "Nordic Open Source Labs",
        role: "Lead Maintainer",
        duration: "2022 — Present",
        description: "Maintained popular GitHub telemetry tools processing 2M+ repository commits daily.",
        current: true
      }
    ],
    skills: [
      { id: "snov-1", name: "Git Telemetry API", category: "Tooling", proficiency: 98 },
      { id: "snov-2", name: "Rust / WASM", category: "Systems", proficiency: 95 },
      { id: "snov-3", name: "React / Canvas API", category: "Frontend", proficiency: 94 },
      { id: "snov-4", name: "Cyberpunk CSS / Canvas", category: "Styling", proficiency: 97 }
    ],
    projects: [
      {
        id: "pnov-1",
        name: "GitTelemetry Terminal HUD",
        description: "Real-time GitHub activity matrix visualizer with terminal sound effects and commit heatmap HUD.",
        technologies: ["React", "GitHub API", "Canvas API", "TypeScript"],
        image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/novasterling/git-telemetry-hud",
        liveUrl: "https://gittelemetry.se",
        featured: true,
        year: "2025"
      }
    ]
  },

  'github-bchiang7-021': {
    ...defaultPortfolioData,
    profile: {
      name: "Brittany Chiang",
      title: "Software Engineer & Frontend Architect",
      location: "Boston, MA",
      bio: "I build accessible, inclusive products and digital experiences for the web with dark navy & mint aesthetics.",
      email: "brittany.chiang@example.com",
      phone: "+1 (617) 555-0199",
      website: "https://brittanychiang.com",
      profilePhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
    },
    about: {
      aboutText: "Hello! My name is Brittany and I enjoy creating things that live on the internet. My interest in web development started back in 2012 when I decided to try editing custom Tumblr themes. Fast-forward to today, and I've had the privilege of working at an advertising agency, a start-up, a huge corporation, and a student-led design studio.",
      interests: ["JavaScript (ES6+)", "TypeScript", "React", "Eleventy", "Node.js", "WordPress"],
      services: ["Accessible Frontend Development", "Full-Stack Web Engineering", "Modern UI/UX Design Systems"]
    },
    experience: [
      {
        id: "exp-brt-1",
        company: "Upstatement",
        role: "Lead Engineer",
        duration: "2022 — Present",
        description: "Build, maintain, and ship production code for client projects primarily using JavaScript, TypeScript, React, and Next.js.",
        current: true
      },
      {
        id: "exp-brt-2",
        company: "Apple",
        role: "UI Engineer Co-op",
        duration: "2021 — 2022",
        description: "Developed and maintained code within Apple's internal web applications ecosystem.",
        current: false
      }
    ],
    skills: [
      { id: "sbrt-1", name: "JavaScript / TypeScript", category: "Languages", proficiency: 98 },
      { id: "sbrt-2", name: "React / Next.js", category: "Frontend", proficiency: 96 },
      { id: "sbrt-3", name: "Styled Components / Tailwind", category: "Styling", proficiency: 95 },
      { id: "sbrt-4", name: "Node.js / Express", category: "Backend", proficiency: 92 }
    ],
    projects: [
      {
        id: "pbrt-1",
        name: "Halcyon Theme",
        description: "A minimal, dark blue theme for VS Code, Sublime Text, Atom, iTerm, and more.",
        technologies: ["VS Code", "Sublime Text", "Atom", "iTerm2"],
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/bchiang7/halcyon-site",
        liveUrl: "https://halcyon-theme.netlify.app",
        featured: true,
        year: "2024"
      },
      {
        id: "pbrt-2",
        name: "Spotify Profile Visualizer",
        description: "A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio analysis.",
        technologies: ["React", "Spotify API", "Styled Components", "Express"],
        image: "https://images.unsplash.com/photo-1614680376593-902f749f7ffc?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/bchiang7/spotify-profile",
        liveUrl: "https://spotify-profile.dev",
        featured: true,
        year: "2023"
      }
    ]
  },

  'github-eludadev-022': {
    ...defaultPortfolioData,
    profile: {
      name: "Eluda Becker",
      title: "Software Craftsman & UI Specialist",
      location: "Amsterdam, Netherlands",
      bio: "Crafting polished developer portfolios with strong visual hierarchy, skill blocks, and work logs.",
      email: "eluda.becker@craftsman.nl",
      phone: "+31 20 123 4567",
      website: "https://eludadev.nl",
      profilePhoto: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=600",
    },
    about: {
      aboutText: "Software craftsman focused on clean component separation, functional programming patterns, and developer productivity tools.",
      interests: ["Functional Programming", "UI Crafts", "State Machines", "TypeScript Compiler"],
      services: ["Frontend Software Crafts", "UI Architecture", "Technical Auditing"]
    },
    experience: [
      {
        id: "exp-elu-1",
        company: "Amsterdam Dev Works",
        role: "Senior Software Craftsman",
        duration: "2021 — Present",
        description: "Engineered high-reliability web tools and internal documentation platforms.",
        current: true
      }
    ],
    skills: [
      { id: "selu-1", name: "TypeScript / JavaScript", category: "Languages", proficiency: 98 },
      { id: "selu-2", name: "React / Vite", category: "Frontend", proficiency: 96 },
      { id: "selu-3", name: "Tailwind CSS", category: "Styling", proficiency: 95 },
      { id: "selu-4", name: "Jest / Vitest", category: "Testing", proficiency: 92 }
    ],
    projects: [
      {
        id: "pelu-1",
        name: "Minimalist Developer Wiki",
        description: "Markdown-driven developer wiki with instant client-side fuzzy search and dark mode theme.",
        technologies: ["React", "TypeScript", "MDX", "Tailwind CSS"],
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/eludadev/minimalist-wiki",
        liveUrl: "https://eludadev.nl",
        featured: true,
        year: "2025"
      }
    ]
  },

  'github-magicfolio-023': {
    ...defaultPortfolioData,
    profile: {
      name: "Emma Wilson",
      title: "Minimal Product Engineer & Writer",
      location: "Chicago, IL",
      bio: "Focused on minimal product engineering, Framer Motion BlurFade reveals, and technical writing.",
      email: "emma.wilson@magicfolio.io",
      phone: "+1 (312) 555-0182",
      website: "https://emmawilson.io",
      profilePhoto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600",
    },
    about: {
      aboutText: "Minimalist engineer & essayist writing about web performance, minimal UI aesthetics, and building side projects.",
      interests: ["Minimalist Web", "Technical Writing", "Framer Motion", "MDX Essays"],
      services: ["Minimal Product Development", "Technical Writing", "UI Motion Engineering"]
    },
    experience: [
      {
        id: "exp-emm-1",
        company: "Chicago Digital Studio",
        role: "Product Engineer",
        duration: "2022 — Present",
        description: "Shipped minimalist SaaS web applications and published weekly engineering essays.",
        current: true
      }
    ],
    skills: [
      { id: "semm-1", name: "Next.js 15 / React", category: "Frontend", proficiency: 97 },
      { id: "semm-2", name: "Framer Motion", category: "Animation", proficiency: 96 },
      { id: "semm-3", name: "Tailwind CSS", category: "Styling", proficiency: 98 },
      { id: "semm-4", name: "MDX / Contentful", category: "Content", proficiency: 94 }
    ],
    projects: [
      {
        id: "pemm-1",
        name: "Minimal Notes Platform",
        description: "Frictionless writing platform with Markdown preview, local auto-save, and typography focus mode.",
        technologies: ["Next.js", "MDX", "Tailwind CSS"],
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/emmawilson/minimal-notes",
        liveUrl: "https://emmawilson.io",
        featured: true,
        year: "2025"
      }
    ]
  },

  'github-shaqdeff-024': {
    ...defaultPortfolioData,
    profile: {
      name: "Shaquille Deon",
      title: "3D WebGL Developer & Creative Engineer",
      location: "Atlanta, GA",
      bio: "Building 3D particle starfields, WebGL hero objects, interactive skill spheres, and 3D globe contact hubs.",
      email: "shaq.deon@3dcreative.io",
      phone: "+1 (404) 555-0199",
      website: "https://shaqdeon.3d",
      profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
    },
    about: {
      aboutText: "Creating high-impact 3D web experiences with interactive particle starfields, 3D rotating globes, and hardware-accelerated WebGL physics.",
      interests: ["3D WebGL Starfields", "Interactive Skill Spheres", "React Three Fiber", "3D Globe Visualizers"],
      services: ["3D Hero Canvas Development", "WebGL Physics Engine", "Interactive Brand Websites"]
    },
    experience: [
      {
        id: "exp-shq-1",
        company: "Atlanta 3D Interactive",
        role: "Senior 3D Engineer",
        duration: "2021 — Present",
        description: "Designed 3D interactive hero sections for tech clients across the US.",
        current: true
      }
    ],
    skills: [
      { id: "sshq-1", name: "Three.js / React Three Fiber", category: "3D Engine", proficiency: 99 },
      { id: "sshq-2", name: "WebGL / GLSL Shaders", category: "Shaders", proficiency: 96 },
      { id: "sshq-3", name: "TypeScript / React", category: "Frontend", proficiency: 94 },
      { id: "sshq-4", name: "Blender 3D", category: "3D Modeling", proficiency: 90 }
    ],
    projects: [
      {
        id: "pshq-1",
        name: "Particle Starfield World",
        description: "Interactive 3D particle starfield canvas with cursor gravitational pulls and audio spectrum reactivity.",
        technologies: ["Three.js", "WebGL", "React Three Fiber", "GLSL"],
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/shaqdeon/particle-starfield",
        liveUrl: "https://shaqdeon.3d",
        featured: true,
        year: "2025"
      }
    ]
  },

  'github-paytonjewell-025': {
    ...defaultPortfolioData,
    profile: {
      name: "Payton Jewell",
      title: "Multi-Page Full Stack Engineer",
      location: "Nashville, TN",
      bio: "Creating clean multi-page web applications, projects showcases, and dark-mode portfolios.",
      email: "payton@jewell.dev",
      phone: "+1 (615) 555-0144",
      website: "https://paytonjewell.dev",
      profilePhoto: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=600",
    },
    about: {
      aboutText: "Multi-page web application architect with focus on multi-view routing, clean client navigation, and robust REST APIs.",
      interests: ["Multi-Page SPA Architecture", "REST & GraphQL APIs", "PostgreSQL Databases", "Node.js Services"],
      services: ["Multi-Page Web Applications", "Full-Stack SaaS Development", "API Architecture"]
    },
    experience: [
      {
        id: "exp-pay-1",
        company: "Nashville Cloud Tech",
        role: "Senior Full Stack Engineer",
        duration: "2022 — Present",
        description: "Architected multi-page enterprise web portals with secure authentication and multi-tenant data schemas.",
        current: true
      }
    ],
    skills: [
      { id: "spay-1", name: "React Router / React 19", category: "Frontend", proficiency: 97 },
      { id: "spay-2", name: "Node.js / Express", category: "Backend", proficiency: 95 },
      { id: "spay-3", name: "PostgreSQL / Prisma", category: "Database", proficiency: 92 },
      { id: "spay-4", name: "Tailwind CSS", category: "Styling", proficiency: 96 }
    ],
    projects: [
      {
        id: "ppay-1",
        name: "Enterprise Multi-Page Hub",
        description: "Comprehensive multi-view portfolio showcase with separate dedicated routes for Projects, Experience, and Contact.",
        technologies: ["React", "React Router", "Tailwind CSS", "TypeScript"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/paytonjewell/multipage-hub",
        liveUrl: "https://paytonjewell.dev",
        featured: true,
        year: "2025"
      }
    ]
  },

  'github-1hanzla100-026': {
    ...defaultPortfolioData,
    profile: {
      name: "Tariq Mahmood",
      title: "Full Stack Engineer & Cloud Developer",
      location: "Islamabad, Pakistan",
      bio: "Building deep midnight (#001C55) portfolios with coding vector illustrations, skill grids, and open source cards.",
      email: "tariq.mahmood@clouddev.pk",
      phone: "+92 51 123 4567",
      website: "https://tariqmahmood.dev",
      profilePhoto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600",
    },
    about: {
      aboutText: "Deep midnight themed developer portfolio specialist crafting vector coding illustrations, skill grids, and cloud infrastructure pipelines.",
      interests: ["Deep Navy Aesthetics", "Cloud Infrastructure", "Vector Coding Graphics", "Docker & CI/CD"],
      services: ["Cloud Application Architecture", "Full Stack Development", "CI/CD Pipeline Automation"]
    },
    experience: [
      {
        id: "exp-trq-1",
        company: "Islamabad Cloud Systems",
        role: "Lead Cloud Engineer",
        duration: "2021 — Present",
        description: "Managed Kubernetes clusters and microservice deployments for international logistics clients.",
        current: true
      }
    ],
    skills: [
      { id: "strq-1", name: "React / Node.js", category: "Full Stack", proficiency: 96 },
      { id: "strq-2", name: "Docker / Kubernetes", category: "DevOps", proficiency: 95 },
      { id: "strq-3", name: "MongoDB / Express", category: "Backend", proficiency: 92 },
      { id: "strq-4", name: "Tailwind CSS", category: "Styling", proficiency: 94 }
    ],
    projects: [
      {
        id: "ptrq-1",
        name: "Deep Midnight Cloud Portal",
        description: "Full-stack cloud management platform with live resource metrics, container status monitors, and vector UI elements.",
        technologies: ["React", "Node.js", "Docker API", "Tailwind CSS"],
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/1hanzla100/cloud-portal",
        liveUrl: "https://tariqmahmood.dev",
        featured: true,
        year: "2025"
      }
    ]
  },

  'github-hmbldv-027': {
    ...defaultPortfolioData,
    profile: {
      name: "Erik Lindqvist",
      title: "Staff Systems Architect & Infrastructure Engineer",
      location: "Stockholm, Sweden",
      bio: "Specializing in distributed systems, zero-trust cloud architectures, and Rust compiler tooling.",
      email: "erik.lindqvist@hmbldv.se",
      phone: "+46 8 987 6543",
      website: "https://hmbldv.se",
      profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
    },
    about: {
      aboutText: "Technical documentation & infrastructure spec specialist. I design zero-copy IPC systems, eBPF network routers, and JetBrains Mono code docs.",
      interests: ["Distributed Raft Consensus", "eBPF Kernel Filtering", "Rust Compiler Tooling", "Technical RFC Specs"],
      services: ["Infrastructure Architecture", "Low-Latency Networking Specs", "Distributed Systems Auditing"]
    },
    experience: [
      {
        id: "exp-erk-1",
        company: "Nordic Systems Lab Stockholm",
        role: "Staff Systems Architect",
        duration: "2020 — Present",
        description: "Designed zero-trust service mesh routing handling 1.2M requests per second with sub-millisecond tail latency.",
        current: true
      }
    ],
    skills: [
      { id: "serk-1", name: "Rust / C++ / Go", category: "Languages", proficiency: 98 },
      { id: "serk-2", name: "eBPF & Linux Kernel", category: "Systems", proficiency: 95 },
      { id: "serk-3", name: "gRPC & Protobuf", category: "Networking", proficiency: 96 },
      { id: "serk-4", name: "Kubernetes & Raft", category: "Infrastructure", proficiency: 94 }
    ],
    projects: [
      {
        id: "perk-1",
        name: "HyperMesh Distributed Router",
        description: "A zero-copy gRPC mesh router engine handling 1.2M RPS with sub-millisecond tail latency and automated eBPF failover routes.",
        technologies: ["Rust", "eBPF", "gRPC", "Kubernetes", "Linux Kernel"],
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/hmbldv/hypermesh",
        liveUrl: "https://hypermesh-docs.io",
        featured: true,
        year: "2025"
      },
      {
        id: "perk-2",
        name: "ZeroTrust Mesh Gateway",
        description: "eBPF-driven microservice proxy delivering mutual TLS authentication and kernel-level packet inspection without CPU overhead.",
        technologies: ["Go", "eBPF", "mTLS", "Envoy", "Security"],
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/hmbldv/zerotrust-gateway",
        liveUrl: "https://zerotrust-gateway.io",
        featured: true,
        year: "2024"
      }
    ]
  },

  'github-astro-glass-028': {
    ...defaultPortfolioData,
    profile: {
      name: "Mateo Rossi",
      title: "Senior Glassmorphic UI Engineer & WebGL Architect",
      location: "Milan, Italy",
      bio: "Crafting fluid glassmorphic web experiences, hardware-accelerated WebGL interactions, and high-conversion design systems.",
      email: "mateo.rossi@glassmorphism.it",
      phone: "+39 02 1234 5678",
      website: "https://mateorossi.it",
      profilePhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
    },
    about: {
      aboutText: "Glassmorphism & Astro specialist crafting translucent backdrop-blur interfaces, liquid light gradients, and hardware-accelerated WebGL canvases.",
      interests: ["Glassmorphism & Backdrop Blur", "Astro & React Frameworks", "Three.js Shaders", "Fluid Micro-Interactions"],
      services: ["Glassmorphic Design Systems", "Astro Web Architecture", "High-End Visual Engineering"]
    },
    experience: [
      {
        id: "exp-mat-1",
        company: "Lumina Glass Studio Milan",
        role: "Lead Design Engineer",
        duration: "2022 — Present",
        description: "Created glassmorphic design systems and Astro web platforms for luxury fashion and tech clients across Europe.",
        current: true
      }
    ],
    skills: [
      { id: "smat-1", name: "Astro & Next.js", category: "Core Frameworks", proficiency: 98 },
      { id: "smat-2", name: "Glassmorphism & Tailwind CSS", category: "UI/UX Architecture", proficiency: 99 },
      { id: "smat-3", name: "Three.js & GLSL Shaders", category: "Interactive 3D", proficiency: 94 },
      { id: "smat-4", name: "TypeScript & Motion", category: "Languages", proficiency: 95 }
    ],
    projects: [
      {
        id: "pmat-1",
        name: "Lumina Glass UI Design System",
        description: "A production-ready React & Astro glassmorphism design system featuring translucent backdrop blurs, fluid micro-interactions, and Tailwind primitives.",
        technologies: ["Astro", "React", "Tailwind CSS", "Framer Motion"],
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/mateorossi/lumina-glass",
        liveUrl: "https://lumina-glass.dev",
        featured: true,
        year: "2025"
      },
      {
        id: "pmat-2",
        name: "Nexus 3D Shader Canvas",
        description: "Hardware-accelerated Three.js glass sphere particle shader with real-time audio reactivity and cursor-tracking physics.",
        technologies: ["Three.js", "WebGL", "GLSL", "TypeScript"],
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/mateorossi/nexus-shader",
        liveUrl: "https://nexus-shader.io",
        featured: true,
        year: "2024"
      }
    ]
  },

  'kcsujeet-portfolio': {
    ...defaultPortfolioData,
    profile: {
      name: "Sujeet Kumar",
      title: "Systems & Full-Stack Developer",
      location: "San Francisco, CA / Remote",
      bio: "Crafting minimalist technical web applications, developer tools, and zero-dependency open-source software libraries.",
      email: "sujeet.kumar@example.dev",
      phone: "+1 (415) 890-1234",
      website: "https://kcsujeet.dev",
      profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
    },
    socialLinks: {
      ...defaultPortfolioData.socialLinks,
      github: "https://github.com/kcsujeet",
      linkedin: "https://linkedin.com/in/kcsujeet",
      twitter: "https://twitter.com/kcsujeet",
      website: "https://kcsujeet.dev"
    },
    about: {
      aboutText: "I am a full-stack software engineer focused on building clean, modular web architecture. My design philosophy prioritizes performance, typography, and zero client JS overhead.",
      interests: ["Minimalist UI Design", "Astro & WebAssembly", "Developer Tooling", "Distributed Systems", "TypeScript Primitives"],
      services: ["Web Architecture", "Frontend Performance Auditing", "Open Source Design Systems"]
    },
    experience: [
      {
        id: "exp-sujeet-1",
        company: "CoreLabs Infrastructure",
        role: "Senior Full-Stack Architect",
        duration: "2023 — Present",
        description: "Leading the development of high-throughput edge web engines and lightweight design systems for developer platform portals.",
        achievements: [
          "Reduced client JavaScript bundle footprint by 65% across 20+ micro-frontends.",
          "Designed accessible component primitives using zero-dependency Astro and native Web Components.",
          "Mentored 8 core engineers on web performance and TypeScript typings."
        ],
        technologies: ["Astro", "TypeScript", "Tailwind CSS v4", "Bun", "PostgreSQL"],
        current: true
      },
      {
        id: "exp-sujeet-2",
        company: "Veloce UI Tools",
        role: "Systems Engineer & Maintainer",
        duration: "2021 — 2023",
        description: "Maintained popular open-source calendar abstractions and developer utility suites downloaded over 500k times monthly.",
        achievements: [
          "Built Ilamy Calendar, a lightweight zero-dependency Full Calendar alternative for modern web apps.",
          "Implemented automated CI/CD benchmark testing pipeline with Biome and Bun."
        ],
        technologies: ["React", "TypeScript", "Rust", "WebAssembly", "GitHub Actions"],
        current: false
      }
    ],
    skills: [
      { id: "ssujeet-1", name: "Astro & React", category: "Frameworks", proficiency: 98 },
      { id: "ssujeet-2", name: "TypeScript & Rust", category: "Languages", proficiency: 95 },
      { id: "ssujeet-3", name: "Tailwind CSS v4", category: "Styling", proficiency: 96 },
      { id: "ssujeet-4", name: "Bun & Biome", category: "Tooling", proficiency: 92 },
      { id: "ssujeet-5", name: "PostgreSQL & SQLite", category: "Databases", proficiency: 90 }
    ],
    projects: [
      {
        id: "psujeet-1",
        name: "Minimalist Astro Portfolio Template",
        description: "An open-source, zero-JS hydrated portfolio template featuring a side navigation rail, numbered section headings, and Geist Mono typography.",
        technologies: ["Astro", "Tailwind CSS v4", "TypeScript", "Bun"],
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/kcsujeet/portfolio",
        liveUrl: "https://kcsujeet.dev",
        featured: true,
        year: "2026",
        status: "ACTIVE"
      },
      {
        id: "psujeet-2",
        name: "Ilamy Calendar Engine",
        description: "A modern, open-source Full Calendar alternative for React and web applications with sub-10KB bundle size and zero heavy dependencies.",
        technologies: ["React", "TypeScript", "Tailwind CSS", "Astro"],
        image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/kcsujeet/ilamy-calendar",
        liveUrl: "https://ilamy-calendar.dev",
        featured: true,
        year: "2025",
        status: "SHIPPED"
      },
      {
        id: "psujeet-3",
        name: "PulseGrid Telemetry CLI",
        description: "Minimalist terminal utility and web dashboard for monitoring server metrics and container health in real-time.",
        technologies: ["Rust", "TypeScript", "WebSockets", "Tailwind CSS"],
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/kcsujeet/pulsegrid",
        liveUrl: "https://pulsegrid.dev",
        featured: false,
        year: "2025",
        status: "OPEN SOURCE"
      }
    ]
  },

  'apple-style-portfolio': {
    ...defaultPortfolioData,
    profile: {
      name: "Julian Vance",
      title: "Principal Creative Technologist & Product Architect",
      location: "Cupertino, CA / San Francisco",
      bio: "Pioneering seamless digital hardware & software experiences where human intuition meets high-performance engineering. Built with Apple-inspired visual precision.",
      email: "julian.vance@apple-design.dev",
      phone: "+1 (408) 996-1010",
      website: "https://apple-style-portfolio.larryxue.dev",
      profilePhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
    },
    socialLinks: {
      ...defaultPortfolioData.socialLinks,
      github: "https://github.com/larry-xue/apple-style-portfolio",
      linkedin: "https://linkedin.com/in/julianvance",
      twitter: "https://twitter.com/julianvance_dev",
      website: "https://apple-style-portfolio.larryxue.dev"
    },
    about: {
      aboutText: "Simplicity is not just a visual aesthetic—it is an architectural discipline. I design hardware-grade web applications with zero unnecessary noise, liquid smooth 60fps animations, and tactile micro-interactions.",
      interests: ["Apple Aesthetic UI", "Three.js & WebGL", "GSAP Motion Physics", "Hardware & Metal API", "Spatial Computing"],
      services: ["Product Design Systems", "High-Performance WebGL Engineering", "Executive Keynote UI Architecture"]
    },
    experience: [
      {
        id: "exp-julian-1",
        company: "Apex Product Design Labs",
        role: "Principal Creative Technologist",
        duration: "2023 — Present",
        description: "Directing next-generation spatial computing interfaces, WebGL 3D graphics rendering, and fluid gesture physics across flagship applications.",
        achievements: [
          "Architected 60 FPS Three.js particle systems integrated with native browser shaders.",
          "Engineered accessible dark/light Apple-style bento component frameworks used by over 2M active users.",
          "Awarded 4 international design patents for spatial interaction models."
        ],
        technologies: ["Astro", "Three.js", "GSAP", "TypeScript", "Tailwind CSS"],
        current: true
      },
      {
        id: "exp-julian-2",
        company: "Monolith Systems",
        role: "Lead Frontend Engineer",
        duration: "2020 — 2023",
        description: "Led frontend design systems and real-time canvas visualizers for cloud infrastructure platforms.",
        achievements: [
          "Reduced DOM render recalculation bottlenecks by 75% using web worker threads.",
          "Designed and delivered end-to-end dark titanium visual design system."
        ],
        technologies: ["React", "TypeScript", "WebGL", "Rust", "WebAssembly"],
        current: false
      }
    ],
    skills: [
      { id: "sjulian-1", name: "Three.js & WebGL", category: "Graphics 3D", proficiency: 98 },
      { id: "sjulian-2", name: "GSAP & Framer Motion", category: "Animation Physics", proficiency: 96 },
      { id: "sjulian-3", name: "TypeScript & Rust", category: "Core Languages", proficiency: 95 },
      { id: "sjulian-4", name: "Astro & React", category: "Web Frameworks", proficiency: 97 },
      { id: "sjulian-5", name: "Tailwind CSS & Canvas", category: "Styling & Render", proficiency: 99 }
    ],
    projects: [
      {
        id: "pjulian-1",
        name: "Apple-Style Portfolio Framework",
        description: "A cinematic, Apple-inspired portfolio template featuring Three.js 3D canvas interaction, GSAP scroll reveals, and blurred glass dock navigation.",
        technologies: ["Astro", "Tailwind CSS", "GSAP", "Three.js", "TypeScript"],
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000",
        githubUrl: "https://github.com/larry-xue/apple-style-portfolio",
        liveUrl: "https://apple-style-portfolio.larryxue.dev",
        featured: true,
        year: "2026",
        status: "FLAGSHIP RELEASE"
      },
      {
        id: "pjulian-2",
        name: "Spatial Audio Visualizer 3D",
        description: "Interactive real-time audio spectrum analyzer rendering WebGL shaders in harmony with spatial surround sound APIs.",
        technologies: ["Three.js", "Web Audio API", "TypeScript", "Tailwind CSS"],
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000",
        githubUrl: "https://github.com/larry-xue/spatial-audio-3d",
        liveUrl: "https://spatial-audio-3d.dev",
        featured: true,
        year: "2025",
        status: "OPEN SOURCE"
      },
      {
        id: "pjulian-3",
        name: "Titanium UI Design System",
        description: "Apple Store-grade dark mode component library built with zero external CSS footprint and ultra-fast accessibility standards.",
        technologies: ["React", "TypeScript", "Tailwind CSS", "GSAP"],
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000",
        githubUrl: "https://github.com/larry-xue/titanium-ui",
        liveUrl: "https://titanium-ui.dev",
        featured: false,
        year: "2025",
        status: "PRODUCTION"
      }
    ]
  },

  'operator-portfolio': {
    ...defaultPortfolioData,
    profile: {
      name: "Arden Vale",
      title: "System Security Analyst & Full-Stack Compiler Engineer",
      bio: "Building resilient compilers, custom kernels, and brutalist web architectures. Engineering high-throughput distributed architectures under minimal resource footprints.",
      profilePhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000",
      location: "Cupertino, CA",
      email: "arden.vale@operator.sh",
      phone: "+1 (408) 555-0192",
      website: "https://arden.vale.operator.sh"
    },
    socialLinks: {
      github: "https://github.com/LucidAkshay",
      linkedin: "#",
      twitter: "#",
      dribbble: "",
      behance: "",
      youtube: "",
      website: "https://arden.vale.operator.sh"
    },
    experience: [
      {
        id: "earden-1",
        company: "OPERATOR LABS",
        role: "Principal Compiler Engineer",
        duration: "2024 - PRESENT",
        description: "Designing real-time optimized binary code-generators. Reduced cold start performance latency of system edge containers by 48%.",
        current: true
      },
      {
        id: "earden-2",
        company: "CYBERDYNE SYSTEMS",
        role: "Low-Level Kernel Developer",
        duration: "2022 - 2024",
        description: "Refined multi-core task schedulers and secure virtual-memory controllers for high-integrity embedded controller boards.",
        current: false
      },
      {
        id: "earden-3",
        company: "TELEMETRY HQ",
        role: "Systems Security Analyst",
        duration: "2020 - 2022",
        description: "Designed eBPF-powered event log monitors and automated threat detection microservices tracking secure system calls.",
        current: false
      }
    ],
    skills: [
      { id: "sarden-1", name: "Rust & C++20", category: "Languages", proficiency: 98 },
      { id: "sarden-2", name: "eBPF & Linux Kernel", category: "Systems", proficiency: 94 },
      { id: "sarden-3", name: "Wasm & Compilers", category: "Tooling", proficiency: 92 },
      { id: "sarden-4", name: "React & Tailwind CSS v4", category: "Web Frontend", proficiency: 90 },
      { id: "sarden-5", name: "PostgreSQL & SQLite", category: "Databases", proficiency: 88 }
    ],
    projects: [
      {
        id: "parden-1",
        name: "Vesper Core (Microkernel)",
        description: "An ultra-low latency microkernel designed for real-time robotic controls and asynchronous message passing.",
        technologies: ["C++20", "Assembly", "Microkernel", "Rust"],
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/LucidAkshay/vesper",
        liveUrl: "https://vesper-kernel.dev",
        featured: true,
        year: "2026",
        status: "ACTIVE_KERN"
      },
      {
        id: "parden-2",
        name: "Atlas Compiler",
        description: "An optimizing compiler that transforms rust-like grammar to modular web-assembly binaries with sub-microsecond cold start times.",
        technologies: ["Rust", "Wasm", "Astro", "Tailwind CSS"],
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/LucidAkshay/atlas",
        liveUrl: "https://atlas-compiler.dev",
        featured: true,
        year: "2025",
        status: "STABLE"
      },
      {
        id: "parden-3",
        name: "Sentinel Tactical Firewall",
        description: "An eBPF-powered traffic sentinel tracking kernel packet flows and reporting real-time anomalies to browser visualizers.",
        technologies: ["eBPF", "C", "TypeScript", "Tailwind CSS"],
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/LucidAkshay/sentinel",
        liveUrl: "https://sentinel-firewall.dev",
        featured: false,
        year: "2025",
        status: "OPEN_SRC"
      }
    ]
  },
  'windowed-portfolio': {
    ...defaultPortfolioData,
    profile: {
      name: "Zara Beaumont",
      title: "Product Engineer",
      location: "London, UK",
      bio: "Designing high-fidelity user interfaces and resilient interactive systems. Bridging the gap between creative execution and clean, mathematical software architecture.",
      email: "zara@beaumont.sh",
      phone: "+44 20 7946 0192",
      website: "https://beaumont.sh",
      profilePhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800",
    },
    about: {
      aboutText: "I construct durable software systems that balance typographic elegance with rigid, performant geometry. Operating at the boundary of visual design and system engineering, I bring technical focus to human interfaces.",
      interests: ["Retro-Computing", "WebGL & WebGPU", "User Experience Physics", "Type Systems", "Modular Architecture"],
      services: ["Product Engineering", "Frontend Architecture", "Interface Mechanics", "Interactive Tooling"]
    },
    experience: [
      {
        id: "exp-z1",
        company: "Grid Computing Corp",
        role: "Senior Product Engineer",
        duration: "2023 — Present",
        description: "Coordinated the transition of large-scale frontend configurations to modular WebGL canvas systems, improving fluid interface performance by 40%.",
        current: true
      },
      {
        id: "exp-z2",
        company: "Nexus Labs",
        role: "Frontend Engineer",
        duration: "2021 — 2023",
        description: "Engineered responsive dashboard systems, retro command suites, and fully custom component compilers for multi-device deployments.",
        current: false
      }
    ],
    skills: [
      { id: "sz-1", name: "TypeScript", category: "Languages", proficiency: 98 },
      { id: "sz-2", name: "React", category: "Frameworks", proficiency: 95 },
      { id: "sz-3", name: "Next.js", category: "Frameworks", proficiency: 90 },
      { id: "sz-4", name: "Node.js", category: "Backend", proficiency: 90 },
      { id: "sz-5", name: "PostgreSQL", category: "Storage", proficiency: 88 },
      { id: "sz-6", name: "Three.js", category: "Graphics", proficiency: 85 },
      { id: "sz-7", name: "Figma", category: "Design Tooling", proficiency: 92 }
    ],
    projects: [
      {
        id: "pz-1",
        name: "Atlas",
        description: "A modular design token engine that compiles Tailwind CSS utilities to type-safe Figma assets with automated schema checks.",
        technologies: ["TypeScript", "Next.js", "Figma API", "Tailwind CSS"],
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/beaumont/atlas-engine",
        liveUrl: "https://atlas-tokens.dev",
        featured: true,
        year: "2026",
        status: "PRODUCTION"
      },
      {
        id: "pz-2",
        name: "Relay",
        description: "A peer-to-peer real-time event pipeline designed for ultra-low latency collaboration canvases and multiplayer state-sharing.",
        technologies: ["React", "WebRTC", "Rust", "TypeScript"],
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/beaumont/relay-webrtc",
        liveUrl: "https://relay-stream.dev",
        featured: true,
        year: "2025",
        status: "STABLE"
      },
      {
        id: "pz-3",
        name: "Prism",
        description: "A high-fidelity WebGL shader compiler and canvas sandbox for rendering custom mathematical fractals in real-time.",
        technologies: ["Three.js", "GLSL", "Vite", "React"],
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/beaumont/prism-shaders",
        liveUrl: "https://prism-sandbox.dev",
        featured: false,
        year: "2025",
        status: "ACTIVE_CORE"
      },
      {
        id: "pz-4",
        name: "Orbit",
        description: "An autonomous scheduler that maps developer task dependencies across complex agile boards using graph-search algorithms.",
        technologies: ["Node.js", "Graphlib", "Tailwind CSS", "React"],
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
        githubUrl: "https://github.com/beaumont/orbit-scheduler",
        liveUrl: "https://orbit-agile.dev",
        featured: false,
        year: "2024",
        status: "DELEGATED"
      }
    ],
    socialLinks: {
      github: "https://github.com/beaumont-fictional",
      linkedin: "https://linkedin.com/in/beaumont-fictional",
      twitter: "https://twitter.com/beaumont_fictional",
      dribbble: "",
      behance: "",
      youtube: "",
      website: "https://beaumont.sh"
    }
  },
  'x100-visual-portfolio': {
    ...defaultPortfolioData,
    profile: {
      name: "Elara Monroe",
      title: "Visual Storyteller",
      location: "Tokyo, Japan",
      bio: "Editorial photographer mapping the poetic stillness of human space. Documenting cities, wild terrains, and silent atmospheres in rich, high-fidelity color spectrums.",
      email: "hello@elaramonroe.com",
      phone: "+81 3 5555 0192",
      website: "https://elaramonroe.com",
      profilePhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800"
    },
    about: {
      aboutText: "For Elara Monroe, photography is not about capturing swift action, but discovering the structural silent moments that define a landscape or city. Every image operates as an editorial chapter, focusing on typographic geometry, natural color calibration, and spacious compositions.",
      interests: ["Editorial Composition", "Analog Chemistry", "Ambient Soundscapes", "Brutalist Spaces", "Architectural Scale"],
      services: ["Editorial Photography", "Creative Visual Direction", "Color Calibration", "Print Publications"]
    },
    experience: [
      {
        id: "exp-e1",
        company: "Visions Magazine",
        role: "Editorial Photographer",
        duration: "2024 — Present",
        description: "Assigned to document global urban shifts, producing full-spread cover stories for the Tokyo, Iceland, and Morocco features.",
        current: true
      },
      {
        id: "exp-e2",
        company: "Monolith Agency",
        role: "Visual Director",
        duration: "2021 — 2024",
        description: "Orchestrated aesthetic branding structures, photography guidelines, and publication formats for spatial and travel enterprises.",
        current: false
      }
    ],
    skills: [
      { id: "se-1", name: "Medium Format Capture", category: "Camera Systems", proficiency: 98 },
      { id: "se-2", name: "Color Grading & Lab Calibration", category: "Processing", proficiency: 95 },
      { id: "se-3", name: "Natural Light Sculpting", category: "Lighting", proficiency: 92 },
      { id: "se-4", name: "Editorial Page Design", category: "Layout", proficiency: 88 }
    ],
    projects: [
      {
        id: "pe-1",
        name: "Urban Nights Series",
        description: "High-contrast visual study of cyberpunk architectural atmospheres and neon luminescence across Tokyo, Chongqing, and New York.",
        technologies: ["Digital Capture", "Low-Light", "High-Contrast Color Calibration"],
        image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&q=80&w=800",
        githubUrl: "",
        liveUrl: "",
        featured: true,
        year: "2026",
        status: "ACTIVE_CORE"
      },
      {
        id: "pe-2",
        name: "Glacial Silent Lands",
        description: "A panoramic series exploring the blue shadows, active auroras, and black basalt sands of Iceland's south coast.",
        technologies: ["Medium Format Analog", "Long Exposure", "Natural Diffuse Light"],
        image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800",
        githubUrl: "",
        liveUrl: "",
        featured: true,
        year: "2025",
        status: "EXHIBITED"
      }
    ],
    socialLinks: {
      github: "https://github.com/elaramonroe-fictional",
      linkedin: "https://linkedin.com/in/elaramonroe-fictional",
      twitter: "https://twitter.com/elara_monroe",
      website: "https://elaramonroe.com",
      dribbble: "",
      behance: "https://behance.net/elaramonroe",
      youtube: ""
    }
  },
  'paperframe-editorial': {
    ...defaultPortfolioData,
    profile: {
      name: "Amelia Rowan",
      title: "Independent Designer & Developer",
      location: "London, UK",
      bio: "Crafting lightweight products, quiet digital interfaces, and spatial design architectures.",
      email: "amelia@rowan-independent.com",
      phone: "+44 20 7946 0524",
      website: "https://rowan-independent.com",
      profilePhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800"
    },
    about: {
      aboutText: "Operating at the intersection of print layout traditions and modern React compilation layers, my work challenges the frantic nature of modern software design. I work with a highly restricted color palette, robust sans/serif hierarchy, and a strict subtraction strategy to create interfaces that feel calm, durable, and highly readable.",
      interests: ["Archival Mathematics", "Analog Linocutting", "Atmospheric Sounds", "Minimal Typography"],
      services: ["Product Design", "Creative Development", "Interaction Design", "Digital Strategy"]
    },
    experience: [
      {
        id: "exp-p1",
        company: "Rowan Independent Studio",
        role: "Lead Designer & Developer",
        duration: "2023 — Present",
        description: "Shipped custom static engines, lightweight database interfaces, and visual systems for clients across Europe.",
        current: true
      },
      {
        id: "exp-p2",
        company: "Atelier Berlin",
        role: "Interaction Designer",
        duration: "2020 — 2023",
        description: "Orchestrated aesthetic branding structures, design systems, and visual publication formats for physical exhibitions.",
        current: false
      }
    ],
    skills: [
      { id: "sp-1", name: "TypeScript", category: "Languages", proficiency: 96 },
      { id: "sp-2", name: "React / Vite", category: "Frameworks", proficiency: 95 },
      { id: "sp-3", name: "Tailwind CSS", category: "Design", proficiency: 98 },
      { id: "sp-4", name: "D3.js / Graphics", category: "Visuals", proficiency: 90 }
    ],
    projects: [
      {
        id: "pf-1",
        name: "Field Notes",
        description: "A minimalist archiving platform built for local botanists to catalogue flora migrations across Northern Europe.",
        technologies: ["React", "IndexedDB", "Tailwind CSS", "TypeScript"],
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=1200",
        githubUrl: "",
        liveUrl: "",
        featured: true,
        year: "2026",
        status: "PRODUCTION"
      },
      {
        id: "pf-2",
        name: "Northline",
        description: "A custom, geometry-driven digital identity and design system built for a modular architectural collective.",
        technologies: ["Next.js", "Framer Motion", "Tailwind CSS", "CSS Variables"],
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
        githubUrl: "",
        liveUrl: "",
        featured: true,
        year: "2025",
        status: "PRODUCTION"
      },
      {
        id: "pf-3",
        name: "Common Ground",
        description: "An interactive audio-visual mapping of urban community gardens using real-time atmospheric telemetry sensors.",
        technologies: ["React", "D3.js", "WebSockets", "Tailwind CSS"],
        image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=1200",
        githubUrl: "",
        liveUrl: "",
        featured: true,
        year: "2025",
        status: "EXHIBITED"
      },
      {
        id: "pf-4",
        name: "Signal Archive",
        description: "A quiet database interface built to preserve and index forgotten radio broadcasts and sub-cultural auditory histories.",
        technologies: ["Node.js", "React", "Tailwind CSS", "SQLite"],
        image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=1200",
        githubUrl: "",
        liveUrl: "",
        featured: true,
        year: "2024",
        status: "STABLE"
      }
    ],
    socialLinks: {
      github: "https://github.com/amelia-rowan",
      linkedin: "https://linkedin.com/in/amelia-rowan",
      twitter: "https://twitter.com/amelia_rowan",
      website: "https://rowan-independent.com",
      dribbble: "",
      behance: "",
      youtube: ""
    }
  },
  'rustfolio-brutalist': {
    ...defaultPortfolioData,
    profile: {
      name: "Arden Vale",
      title: "Creative Technologist",
      location: "Amsterdam / Remote",
      bio: "I build digital experiences where technology becomes part of the story.",
      email: "hello@ardenvale.sh",
      phone: "+31 20 555 0199",
      website: "https://ardenvale.sh",
      profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"
    },
    about: {
      aboutText: "I build dynamic digital installations, variable-typography brand structures, and high-fidelity low-latency web environments. Operating at the boundary of mathematical system logic and physical tactile layout aesthetics.",
      interests: ["KINETIC WEB SHADERS", "SUB-PIXEL COMPILER ARITHMETIC", "REAL-TIME AUDITORY REVERB", "VARIABLE OUTLINE SYSTEMS"],
      services: ["Creative Development", "Interactive Design", "Digital Art Direction", "Experimental Web", "Motion & Interaction"]
    },
    experience: [
      {
        id: "exp-rf1",
        company: "Arden Vale Laboratories",
        role: "Creative Technologist",
        duration: "2024 — PRESENT",
        description: "Executing sensory hardware mappings, real-time SVG grid deformation programs, and low-overhead audio visualizer modules.",
        current: true
      },
      {
        id: "exp-rf2",
        company: "Kinetic Guild Amsterdam",
        role: "Technical Art Lead",
        duration: "2021 — 2024",
        description: "Built performant WebGL visual streams and canvas engines for interactive gallery exhibitions across Northern Europe.",
        current: false
      }
    ],
    skills: [
      { id: "sk-rf1", name: "Three.js", category: "Graphics", proficiency: 98 },
      { id: "sk-rf2", name: "WebGL / GLSL", category: "Graphics", proficiency: 95 },
      { id: "sk-rf3", name: "Web Audio API", category: "APIs", proficiency: 92 },
      { id: "sk-rf4", name: "React / Vite", category: "Frameworks", proficiency: 96 }
    ],
    projects: [
      {
        id: "rf-1",
        name: "VOID / SPACE",
        description: "A responsive visual space deforming dynamically to auditory and atmospheric environmental inputs.",
        technologies: ["Three.js", "WebGL", "GLSL Shaders", "WebSockets"],
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200",
        githubUrl: "",
        liveUrl: "",
        featured: true,
        year: "2026",
        status: "PRODUCTION"
      },
      {
        id: "rf-2",
        name: "AFTERIMAGE",
        description: "An experimental brand architecture featuring responsive typography and fluid sub-pixel layouts.",
        technologies: ["Variable Fonts", "CSS Variables", "Next.js", "Tailwind CSS"],
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
        githubUrl: "",
        liveUrl: "",
        featured: true,
        year: "2025",
        status: "PRODUCTION"
      },
      {
        id: "rf-3",
        name: "SIGNAL / 09",
        description: "A persistent, low-latency browser experience integrating audio processing and visual distortion patterns.",
        technologies: ["Web Audio API", "React", "Offscreen Canvas", "Framer Motion"],
        image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=1200",
        githubUrl: "",
        liveUrl: "",
        featured: true,
        year: "2025",
        status: "RELEASED"
      },
      {
        id: "rf-4",
        name: "MONUMENT",
        description: "An architectural layout translation of physical monolithic structures into interactive editorial grids.",
        technologies: ["React", "CSS Grids", "Sub-pixel Alignment", "Framer Motion"],
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
        githubUrl: "",
        liveUrl: "",
        featured: true,
        year: "2024",
        status: "EXHIBITED"
      }
    ],
    socialLinks: {
      github: "https://github.com/ardenvale-fictional",
      linkedin: "https://linkedin.com/in/ardenvale-fictional",
      twitter: "https://twitter.com/ardenvale",
      website: "https://ardenvale.sh",
      dribbble: "",
      behance: "",
      youtube: ""
    }
  },
  'maison-luxury-portfolio': {
    ...defaultPortfolioData,
    profile: {
      name: "Celeste Laurent",
      title: "Creative Director & Digital Designer",
      location: "Paris / Worldwide",
      bio: "Sculpting high-end creative directions, luxurious digital identities, and immersive artistic campaigns.",
      email: "celeste@laurent-luxury.fr",
      phone: "+33 1 42 27 78 50",
      website: "https://laurent-luxury.fr",
      profilePhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800"
    },
    about: {
      aboutText: "Celeste Laurent is an independent creative director, digital designer, and art consultant operating out of Paris, France. Blending classical French printing traditions with modern fluid layout compilation architectures.",
      interests: ["EXTREME WHITESPACE", "HIGH CONTRAST TYPOGRAPHY", "RESTRICTED NEUTRAL PALETTES", "CINEMATIC COMPOSITIONS"],
      services: ["Creative Direction", "Digital Design", "Brand Identity", "Interactive Experiences", "Art Direction"]
    },
    experience: [
      {
        id: "exp-ml1",
        company: "Maison Laurent Studio",
        role: "Creative Director",
        duration: "2022 — PRESENT",
        description: "Sculpting visual directives, luxury digital campaigns, and customized typographical guidelines for European fashion and design clients.",
        current: true
      },
      {
        id: "exp-ml2",
        company: "Atelier de Design Paris",
        role: "Lead Interactive Designer",
        duration: "2019 — 2022",
        description: "Coordinated fine digital architecture showcases and high-end editorial portfolios across premium design networks.",
        current: false
      }
    ],
    skills: [
      { id: "sk-ml1", name: "Art Direction", category: "Directives", proficiency: 99 },
      { id: "sk-ml2", name: "Interactive Design", category: "Digital", proficiency: 95 },
      { id: "sk-ml3", name: "Typography Strategy", category: "Print", proficiency: 97 },
      { id: "sk-ml4", name: "Modern Frameworks", category: "Code", proficiency: 90 }
    ],
    projects: [
      {
        id: "ml-1",
        name: "AURELIA",
        description: "A complete typographic re-imagining and visual campaign direction for a high-jewelry house based in Paris.",
        technologies: ["Typography", "Art Direction", "Digital Catalog"],
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200",
        githubUrl: "",
        liveUrl: "",
        featured: true,
        year: "2026",
        status: "PUBLISHED"
      },
      {
        id: "ml-2",
        name: "NOCTURNE",
        description: "An immersive digital presentation for a modular monolithic villa collection along the Mediterranean coast.",
        technologies: ["Architecture", "Digital Design", "Layout Systems"],
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
        githubUrl: "",
        liveUrl: "",
        featured: true,
        year: "2025",
        status: "COMPLETED"
      },
      {
        id: "ml-3",
        name: "ÉLAN",
        description: "A visual-first web exhibition highlighting avant-garde apparel designs through interactive typography.",
        technologies: ["Fashion", "Exhibition Design", "Interactive Campaign"],
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200",
        githubUrl: "",
        liveUrl: "",
        featured: true,
        year: "2025",
        status: "RELEASED"
      },
      {
        id: "ml-4",
        name: "MONUMENT",
        description: "A comprehensive branding and interactive catalog archiving contemporary sculptures and modern art works.",
        technologies: ["Branding", "Cataloguing", "Cultural Identity"],
        image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=1200",
        githubUrl: "",
        liveUrl: "",
        featured: true,
        year: "2024",
        status: "COMMISSIONED"
      }
    ],
    socialLinks: {
      github: "https://github.com/celeste-laurent",
      linkedin: "https://linkedin.com/in/celeste-laurent",
      twitter: "https://twitter.com/celeste-laurent",
      website: "https://laurent-luxury.fr",
      dribbble: "",
      behance: "",
      youtube: ""
    }
  },
  "cinematic-sarang-portfolio": {
    profile: {
      name: "Sienna Vale",
      title: "Creative Technologist",
      profilePhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
      location: "San Francisco, CA",
      bio: "Crafting immersive digital experiences through the intersection of code, cinematography, and 3D design systems.",
      email: "sienna@vale.studio",
      phone: "+1 (415) 555-8901",
      website: "https://vale.studio"
    },
    about: {
      aboutText: "I approach the digital landscape as an interactive medium. By utilizing high-end animation systems, spatial computing elements, and structured typography, I seek to build interfaces that are not only highly usable but leave a lasting impression.",
      interests: ["Spatial Computing", "GLSL Shaders", "Brutalist Architecture", "Cinematography"],
      services: ["Creative Engineering", "Frontend Architecture", "UI Design Systems"]
    },
    experience: [
      {
        id: "exp-ct1",
        company: "Northstar Studio",
        role: "Lead Creative Engineer",
        duration: "2025 — Present",
        description: "Coordinating fine digital architecture showcases, custom shader systems, and high-contrast editorial portfolios across premium design networks.",
        current: true,
        technologies: ["WebGL", "Three.js", "TypeScript"]
      },
      {
        id: "exp-ct2",
        company: "Frameworks Lab",
        role: "Frontend Engineer",
        duration: "2023 — 2025",
        description: "Engineered ultra-high performance design systems, custom physics canvas layouts, and immersive web graphics for tech clients.",
        current: false,
        technologies: ["React", "Framer Motion", "Tailwind CSS"]
      }
    ],
    education: [
      {
        id: "edu-ct1",
        institution: "Stanford University",
        degree: "B.S. Symbolic Systems (Human-Computer Interaction)",
        duration: "2019 — 2023"
      }
    ],
    skills: [
      { id: "sk-ct1", name: "WebGL & Shaders", category: "Creative Development", proficiency: 95 },
      { id: "sk-ct2", name: "Three.js / React Three Fiber", category: "Creative Development", proficiency: 92 },
      { id: "sk-ct3", name: "TypeScript", category: "Core Systems", proficiency: 95 },
      { id: "sk-ct4", name: "Performance Optimization", category: "Core Systems", proficiency: 90 },
      { id: "sk-ct5", name: "Motion & Parallax", category: "UI Mechanics", proficiency: 98 },
      { id: "sk-ct6", name: "Tailwind & Design Tokens", category: "UI Mechanics", proficiency: 94 }
    ],
    projects: [
      {
        id: "prj-ct1",
        name: "AVANT-GARDE MOTION SYSTEM",
        description: "An interactive cinematic canvas archiving dynamic spatial physics simulations and custom audio-reactive shaders.",
        technologies: ["WebGL", "Framer Motion", "GLSL Shaders"],
        image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=1200",
        githubUrl: "https://github.com/sienna-vale/avant-garde-motion",
        liveUrl: "https://vale.studio/exhibitions/motion",
        featured: true,
        year: "2026",
        status: "LIVE"
      },
      {
        id: "prj-ct2",
        name: "MONOLITHIC HOUSING VISUALS",
        description: "Immersive editorial visualizer designed to highlight brutalist villa architecture and modular structure panels across Northern Europe.",
        technologies: ["Next.js", "Three.js", "PostCSS"],
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
        githubUrl: "",
        liveUrl: "",
        featured: true,
        year: "2025",
        status: "COMPLETED"
      },
      {
        id: "prj-ct3",
        name: "SPATIAL INTERACTION LABS",
        description: "Experimental high-contrast 3D projection web systems integrating custom WebGL buffers and physics engine boundary rules.",
        technologies: ["TypeScript", "Ammo.js Physics", "Vite"],
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200",
        githubUrl: "https://github.com/sienna-vale/spatial-interaction",
        liveUrl: "https://vale.studio/labs/spatial",
        featured: true,
        year: "2025",
        status: "RELEASED"
      }
    ],
    testimonials: [
      {
        id: "tst-ct1",
        name: "Marcus Sterling",
        role: "CEO",
        company: "Northstar Studio",
        content: "Sienna possesses a rare blend of design precision and technical performance. The spatial visuals she crafted for our modular monolithic showcases are outstanding.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300"
      },
      {
        id: "tst-ct2",
        name: "Elena Rostova",
        role: "Creative Director",
        company: "Frameworks Lab",
        content: "The motion systems designed by Sienna completely elevated our product storytelling. Highly recommended creative technologist.",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
      }
    ],
    articles: [
      {
        id: "art-ct1",
        title: "The Architecture of Spatial Interfaces",
        excerpt: "Exploring how cinematic lighting principles, camera constraints, and responsive design tokens guide human focus on immersive web screens.",
        date: "May 14, 2026",
        category: "Creative Technology"
      },
      {
        id: "art-ct2",
        title: "Optimizing WebGL Pipelines",
        excerpt: "A practical guide to vertex shader bounds, standard frame caching strategies, and asset compression workflows for real-time portfolio projects.",
        date: "Jan 28, 2026",
        category: "Engineering"
      }
    ],
    achievements: [],
    certifications: [],
    publications: [],
    socialLinks: {
      github: "https://github.com/sienna-vale",
      linkedin: "https://linkedin.com/in/sienna-vale",
      twitter: "https://twitter.com/sienna-vale",
      website: "https://vale.studio",
      dribbble: "",
      behance: "",
      youtube: ""
    },
    contact: {
      email: "sienna@vale.studio",
      phone: "+1 (415) 555-8901",
      location: "San Francisco, CA",
      messagePrompt: "Let's build something worth remembering."
    }
  }
};

export function getDemoDataForTemplate(templateId: string): PortfolioData {
  return demoDataByTemplate[templateId] || demoDataByTemplate['github-codebucks-001'] || defaultPortfolioData;
}
