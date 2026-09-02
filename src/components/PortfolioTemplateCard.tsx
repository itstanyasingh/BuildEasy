import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { TemplatePreview } from './TemplatePreview';

export interface PortfolioPreset {
  id: string;
  name: string;
  category: string;
  role: string;
  author: string;
  location: string;
  summary: string;
  projects: Array<{
    title: string;
    desc: string;
    tags: string[];
    metric?: string;
  }>;
  skills: string[];
  experience: {
    role: string;
    company: string;
    period: string;
  };
  contact: string;
}

export const portfolioPresets: PortfolioPreset[] = [
  {
    id: 'minimal',
    name: 'Minimal Developer',
    category: 'Minimalist',
    author: 'Alex Morgan',
    role: 'Full-Stack Developer',
    location: 'San Francisco, CA',
    summary: 'Building reliable web applications and thoughtful digital products with clean systems and precise typography.',
    projects: [
      {
        title: 'Atlas Component Engine',
        desc: 'Multi-brand design system token runtime and component infrastructure.',
        tags: ['React', 'TypeScript', 'Tailwind'],
        metric: 'Design System'
      },
      {
        title: 'Pulse Server Health Monitor',
        desc: 'Real-time telemetry streaming and distributed metric synchronization.',
        tags: ['Next.js', 'Node.js', 'PostgreSQL'],
        metric: 'Live Metrics'
      }
    ],
    skills: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'PostgreSQL', 'Node.js'],
    experience: {
      role: 'Senior Software Engineer',
      company: 'Stripe',
      period: '2022 — Present'
    },
    contact: 'alex@morgan.dev'
  },
  {
    id: 'editorial',
    name: 'Editorial Developer',
    category: 'Editorial',
    author: 'Julian Vance',
    role: 'Lead Frontend Engineer & Creative Technologist',
    location: 'San Francisco, CA',
    summary: 'Writing software at the intersection of typography, publication systems, and high-performance web engineering.',
    projects: [
      {
        title: 'Monograph Reader',
        desc: 'Distraction-free editorial publication platform with dynamic fluid typography.',
        tags: ['Design Systems', 'Next.js', 'Web Typography'],
        metric: 'Archive Edition'
      },
      {
        title: 'Archival Index',
        desc: 'Curated digital library interface for architectural photography collections.',
        tags: ['GraphQL', 'React', 'CSS Architecture'],
        metric: 'Curated Works'
      }
    ],
    skills: ['TypeScript', 'Next.js', 'GraphQL', 'Web Typography', 'CSS Architecture', 'Accessibility'],
    experience: {
      role: 'Lead Frontend Engineer',
      company: 'Monocle Digital',
      period: '2021 — Present'
    },
    contact: 'julian@vance.studio'
  },
  {
    id: 'creative',
    name: 'Creative Developer',
    category: 'Interactive',
    author: 'Maya Lin',
    role: 'Creative Developer & Graphics Engineer',
    location: 'New York, NY',
    summary: 'Crafting tactile web experiences, interactive graphics, and generative systems that provoke thought and emotion.',
    projects: [
      {
        title: 'SoundStage 3D Audio',
        desc: 'Generative 3D acoustics engine and interactive ambient spatial soundstage.',
        tags: ['Three.js', 'Web Audio API', 'GLSL'],
        metric: 'Web Audio'
      },
      {
        title: 'Form & Motion Canvas',
        desc: 'Kinetic fluid typography canvas and physics particle simulation.',
        tags: ['WebGL', 'Canvas API', 'React'],
        metric: 'Interactive'
      }
    ],
    skills: ['WebGL', 'Three.js', 'React', 'TypeScript', 'GLSL', 'Canvas API', 'Motion Systems'],
    experience: {
      role: 'Creative Developer',
      company: 'Studio Kinetic',
      period: '2023 — Present'
    },
    contact: 'maya@lin.design'
  },
  {
    id: 'designer',
    name: 'Product Designer',
    category: 'Product Design',
    author: 'Elena Rostova',
    role: 'Staff Product Designer & Design Systems Lead',
    location: 'London, UK',
    summary: 'Designing clear, scalable digital products and comprehensive design token frameworks for enterprise software.',
    projects: [
      {
        title: 'Fintech Pro Design System',
        desc: 'Unified token framework and accessible component library serving 20+ product teams.',
        tags: ['Design Tokens', 'Figma', 'Accessibility'],
        metric: 'Case Study'
      },
      {
        title: 'ClinicFlow Triage Suite',
        desc: 'Zero-friction hospital patient dashboard reducing diagnostic triage time by 35%.',
        tags: ['User Research', 'Prototyping', 'Mobile UI'],
        metric: 'Healthcare UI'
      }
    ],
    skills: ['Product Strategy', 'Design Systems', 'User Research', 'Figma', 'Prototyping', 'Accessibility'],
    experience: {
      role: 'Staff Product Designer',
      company: 'Figma',
      period: '2022 — Present'
    },
    contact: 'elena@rostova.com'
  },
  {
    id: 'fullstack',
    name: 'Full-Stack Developer',
    category: 'Systems & Web',
    author: 'David Chen',
    role: 'Senior Full-Stack Software Engineer',
    location: 'Seattle, WA',
    summary: 'Designing and scaling high-availability backend services and responsive client web applications.',
    projects: [
      {
        title: 'RaftKV Storage Engine',
        desc: 'Distributed LSM-tree key-value storage engine with raft consensus and sub-5ms latency.',
        tags: ['Go', 'Rust', 'Raft'],
        metric: 'Open Source'
      },
      {
        title: 'CloudDeploy Orchestrator',
        desc: 'Lightweight deployment orchestrator and dashboard for containerized microservices.',
        tags: ['TypeScript', 'React', 'Kubernetes'],
        metric: 'Production'
      }
    ],
    skills: ['Go', 'Rust', 'TypeScript', 'React', 'PostgreSQL', 'Docker', 'Kubernetes'],
    experience: {
      role: 'Senior Full-Stack Engineer',
      company: 'Datadog',
      period: '2020 — Present'
    },
    contact: 'david@chen.dev'
  },
  {
    id: 'student',
    name: 'Student / Entry-Level',
    category: 'Entry-Level',
    author: 'Sam Rivera',
    role: 'Junior Software Engineer',
    location: 'Berkeley, CA',
    summary: 'Aspiring software engineer passionate about modern web technologies, algorithms, and open source development.',
    projects: [
      {
        title: 'StudyGroup Sync',
        desc: 'Real-time peer tutoring and collaborative whiteboard application.',
        tags: ['React', 'Node.js', 'WebSockets'],
        metric: 'Hackathon Winner'
      },
      {
        title: 'Campus Eats Tracker',
        desc: 'Dining hall nutrition tracker and meal planner for university students.',
        tags: ['TypeScript', 'Next.js', 'SQLite'],
        metric: 'Campus Project'
      }
    ],
    skills: ['JavaScript', 'TypeScript', 'Python', 'React', 'Node.js', 'Git', 'SQL'],
    experience: {
      role: 'Software Engineering Intern',
      company: 'Mozilla Foundation',
      period: 'Summer 2025'
    },
    contact: 'sam.rivera@berkeley.edu'
  },
  {
    id: 'terminal',
    name: 'Cyber-Organic Developer',
    category: 'Developer / Terminal',
    author: 'Alex Vance',
    role: 'Senior Systems & Full-Stack Engineer',
    location: 'San Francisco, CA',
    summary: 'Terminal-inspired developer portfolio with a cyber-organic interface, code-driven typography, interactive motion, and technical visual language.',
    projects: [
      {
        title: 'Aether Distributed KV Engine',
        desc: 'LSM-tree key-value store with Raft consensus protocol, WAL snapshotting, and gRPC client bindings.',
        tags: ['Rust', 'Raft', 'gRPC'],
        metric: 'DEPLOYED'
      },
      {
        title: 'Nexus Compiler Toolchain',
        desc: 'AST parser, bytecode optimizer, and JIT execution playground for typed configuration languages.',
        tags: ['TypeScript', 'WebAssembly', 'React'],
        metric: 'ACTIVE'
      }
    ],
    skills: ['Rust', 'TypeScript', 'Go', 'React', 'PostgreSQL', 'Docker', 'Kubernetes', 'Linux'],
    experience: {
      role: 'Staff Infrastructure Engineer',
      company: 'Vanguard Systems',
      period: '2023 — Present'
    },
    contact: 'alex.vance@engineering.dev'
  },
  {
    id: 'interactive',
    name: 'Interactive Developer',
    category: 'Interactive',
    author: 'Sudhanva Nadiger',
    role: 'Full-Stack & Systems Developer',
    location: 'Bangalore, India',
    summary: 'An interaction-focused developer portfolio with motion, dynamic sections, marquee keywords, open-source matrix, and strong technical personality.',
    projects: [
      {
        title: 'Aura Distributed Cache Engine',
        desc: 'High-speed in-memory key-value cache engine with custom memory allocator and Raft consensus.',
        tags: ['Go', 'Raft', 'gRPC'],
        metric: 'PRODUCTION'
      },
      {
        title: 'Chronos Real-Time Canvas',
        desc: 'Collaborative real-time canvas and whiteboard interface with CRDT synchronization.',
        tags: ['React', 'TypeScript', 'WebSockets'],
        metric: 'LIVE'
      }
    ],
    skills: ['React', 'TypeScript', 'Go', 'Next.js', 'Kubernetes', 'PostgreSQL', 'Redis', 'Docker'],
    experience: {
      role: 'Software Development Engineer',
      company: 'HyperFlow Cloud',
      period: '2023 — Present'
    },
    contact: 'sudhanva.nadiger@gmail.com'
  },
  {
    id: 'nikhil',
    name: 'Nikhil — Interactive Developer',
    category: 'Interactive / Creative Developer',
    author: 'Nikhil Rajput',
    role: 'Full-Stack Developer & UI/UX Enthusiast',
    location: 'Bangalore, India',
    summary: 'An immersive developer portfolio with a cursor-reactive hero, expressive motion, project storytelling, and a modern interactive presentation.',
    projects: [
      {
        title: 'Nexus Cloud Management Platform',
        desc: 'Multi-tenant cloud orchestration dashboard featuring live server metrics and automated deployments.',
        tags: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
        metric: 'FEATURED'
      },
      {
        title: 'Aether Collaborative Design Space',
        desc: 'Real-time interactive canvas with multiplayer cursor presence and layer hierarchy.',
        tags: ['React', 'TypeScript', 'WebSockets', 'Canvas API'],
        metric: 'LIVE'
      }
    ],
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    experience: {
      role: 'Senior Full-Stack Engineer',
      company: 'Nova Interactive Labs',
      period: '2023 — Present'
    },
    contact: 'nikhilrajput.dev@gmail.com'
  },
  {
    id: 'modern-software-developer',
    name: 'Modern Software Developer',
    category: 'Developer',
    author: 'Hanzla Tauqeer',
    role: 'Full Stack Software Engineer',
    location: 'Lahore, Pakistan · Remote',
    summary: 'A polished software developer portfolio focused on experience, projects, technical skills, and professional identity.',
    projects: [
      {
        title: 'Developer Portfolio Master',
        desc: 'Open-source, highly customizable modern developer portfolio built with React, Next.js, and Tailwind CSS.',
        tags: ['React', 'Next.js', 'Tailwind CSS'],
        metric: '★ 342'
      },
      {
        title: 'CloudScale Microservices Engine',
        desc: 'Distributed container orchestration dashboard providing real-time telemetry and pod autoscaling.',
        tags: ['Node.js', 'Docker', 'Kubernetes'],
        metric: '★ 184'
      }
    ],
    skills: ['React', 'Node.js', 'TypeScript', 'Python', 'Docker', 'AWS', 'PostgreSQL', 'MongoDB'],
    experience: {
      role: 'Senior Full Stack Developer',
      company: 'CodeFlow Technologies',
      period: '2023 — Present'
    },
    contact: 'hanzla.dev@gmail.com'
  },
  {
    id: 'react-developer',
    name: 'React Developer',
    category: 'Developer',
    author: 'Yuji Sato',
    role: 'Frontend React Developer & UI Engineer',
    location: 'Tokyo, Japan · Available Remote',
    summary: 'A polished React developer portfolio focused on projects, technical skills, experience and a strong personal introduction.',
    projects: [
      {
        title: 'OmniCommerce React Platform',
        desc: 'Modern e-commerce storefront with dynamic cart, Stripe gateway, and responsive UI.',
        tags: ['React', 'Redux Toolkit', 'Tailwind CSS'],
        metric: '★ Live Demo'
      },
      {
        title: 'DevPulse SaaS Dashboard',
        desc: 'Interactive developer metric dashboard with real-time WebSocket telemetry and charts.',
        tags: ['React', 'TypeScript', 'Supabase'],
        metric: '★ Live Demo'
      }
    ],
    skills: ['React', 'TypeScript', 'Next.js', 'Redux', 'Tailwind CSS', 'Node.js', 'REST APIs', 'Git'],
    experience: {
      role: 'Senior React Developer',
      company: 'Nexus Creative Studio',
      period: '2022 — Present'
    },
    contact: 'yuji.sato.dev@gmail.com'
  },
  {
    id: 'modern-creative-developer',
    name: 'Modern Creative Developer',
    category: 'Developer / Creative',
    author: 'Chetan Verma',
    role: 'Creative Technologist & Frontend Architect',
    location: 'San Francisco, CA · Available Worldwide',
    summary: 'A modern animated developer portfolio combining projects, services, experience, about, contact and content in a polished interactive layout.',
    projects: [
      {
        title: 'Hyperion Design System',
        desc: 'Multi-brand component library and documentation workbench with accessible primitives.',
        tags: ['React', 'TypeScript', 'Tailwind CSS'],
        metric: '★ Live Demo'
      },
      {
        title: 'ApexFlow Collaborative Hub',
        desc: 'Real-time workflow orchestrator with multiplayer canvas and Kanban boards.',
        tags: ['Next.js', 'Zustand', 'PostgreSQL'],
        metric: '★ Live Demo'
      }
    ],
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'GraphQL', 'Motion', 'Figma'],
    experience: {
      role: 'Lead Frontend Engineer',
      company: 'Vanguard Digital Lab',
      period: '2022 — Present'
    },
    contact: 'chetan.verma@example.com'
  },
  {
    id: 'gitfolio-cyber',
    name: 'GitFolio Cyber',
    category: 'Cyberpunk / Developer',
    author: 'Alex Vance',
    role: 'Senior Cyberpunk & Full-Stack Systems Architect',
    location: 'Neo-Tokyo // San Francisco, CA',
    summary: 'A retro-futuristic developer portfolio inspired by GitHub\'s GitFolio concept, combining terminal aesthetics, cyberpunk visuals and developer focused content.',
    projects: [
      {
        title: 'quantum-mesh-orchestrator',
        desc: 'Ultra-low latency microservices mesh visualizer with real-time WebSocket telemetry and topology graphs.',
        tags: ['React', 'TypeScript', 'Go'],
        metric: '★ 342 Stars'
      },
      {
        title: 'neon-synth-audio-engine',
        desc: 'Interactive browser-based modular synthesizer powered by Web Audio API and WebAssembly.',
        tags: ['Next.js', 'WebAudio', 'WASM'],
        metric: '★ 521 Stars'
      }
    ],
    skills: ['React', 'TypeScript', 'Node.js', 'Rust', 'Docker', 'PostgreSQL', 'Tailwind CSS', 'Linux'],
    experience: {
      role: 'Lead Systems Architect',
      company: 'NEURAL_CORP LABS',
      period: '2022 — PRESENT'
    },
    contact: 'alex.vance@gitfolio.dev'
  },
  {
    id: 'brittany-developer',
    name: 'Brittany — Developer',
    category: 'Professional Developer',
    author: 'Brittany Chiang',
    role: 'Software Engineer',
    location: 'Boston, MA',
    summary: 'A refined developer portfolio focused on a strong personal introduction, selected work, experience, skills and contact.',
    projects: [
      {
        title: 'Spotify Profile Visualizer',
        desc: 'A web app for visualizing personalized Spotify data including top tracks and audio analysis.',
        tags: ['React', 'Spotify API', 'Express'],
        metric: '★ 1.8k Stars'
      },
      {
        title: 'Halcyon Theme',
        desc: 'A minimal, dark blue theme for VS Code, Sublime Text, Atom, and iTerm.',
        tags: ['VS Code', 'Theme', 'CSS'],
        metric: '400k+ Installs'
      }
    ],
    skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Next.js', 'WordPress', 'GraphQL', 'SCSS'],
    experience: {
      role: 'Lead Engineer',
      company: 'Upstatement',
      period: '2018 — Present'
    },
    contact: 'brittany.chiang@example.com'
  },
  {
    id: 'personal-developer',
    name: 'Personal Developer',
    category: 'Developer / Personal',
    author: 'Eluda Dev',
    role: 'Full-Stack Developer',
    location: 'Seattle, WA',
    summary: 'A polished personal developer portfolio with a strong visual hierarchy, selected work, experience, skills and contact.',
    projects: [
      {
        title: 'UI Buttons & Component Lab',
        desc: 'A comprehensive collection of 100+ modern animated CSS & Tailwind button components.',
        tags: ['React', 'Tailwind CSS', 'TypeScript'],
        metric: '100+ Components'
      },
      {
        title: 'Quant Analytics Dashboard',
        desc: 'Real-time financial telemetry platform visualizing stock metrics and algorithmic models.',
        tags: ['Next.js', 'Python', 'Chart.js'],
        metric: 'Sub-ms Feeds'
      }
    ],
    skills: ['TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'Tailwind CSS', 'PostgreSQL', 'Docker'],
    experience: {
      role: 'Senior Full-Stack Engineer',
      company: 'Vortex Labs',
      period: '2022 — Present'
    },
    contact: 'hello@eluda.dev'
  },
  {
    id: 'cleanfolio',
    name: 'Cleanfolio',
    category: 'Clean Developer',
    author: 'Raj Shekhar',
    role: 'Front End Engineer',
    location: 'San Francisco, CA',
    summary: 'A clean and focused developer portfolio built around a strong introduction, selected projects, skills and professional information.',
    projects: [
      {
        title: 'Component Design System',
        desc: 'Accessible React UI components with responsive typography and theme tokens.',
        tags: ['React', 'TypeScript', 'CSS'],
        metric: 'Design System'
      },
      {
        title: 'Realtime Telemetry Dashboard',
        desc: 'Interactive financial performance telemetry with high-frequency live charts.',
        tags: ['Next.js', 'Tailwind CSS', 'Chart.js'],
        metric: 'Live Metrics'
      }
    ],
    skills: ['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Node.js', 'Git', 'PostgreSQL'],
    experience: {
      role: 'Front End Engineer',
      company: 'Cleanfolio Systems',
      period: '2022 — Present'
    },
    contact: 'raj.shekhar@example.com'
  },
  {
    id: 'magicfolio',
    name: 'Magicfolio',
    category: 'Minimal / Modern Developer',
    author: 'Dillion Verma',
    role: 'Software Engineer',
    location: 'San Francisco, CA',
    summary: 'A polished modern developer portfolio with minimalist typography, interactive project presentation, professional experience and optional blog content.',
    projects: [
      {
        title: 'Magic UI Component Library',
        desc: 'UI library for Design Engineers with animated components and micro-interactions.',
        tags: ['Next.js', 'Tailwind CSS', 'Motion'],
        metric: 'Featured'
      },
      {
        title: 'Automatic Resume Builder',
        desc: 'AI-assisted resume optimizer with real-time export and ATS scoring.',
        tags: ['React', 'TypeScript', 'Node.js'],
        metric: 'Live Demo'
      }
    ],
    skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Tailwind CSS', 'PostgreSQL', 'Docker'],
    experience: {
      role: 'Software Engineer',
      company: 'Magic UI',
      period: '2023 — Present'
    },
    contact: 'dillion@magicui.design'
  },
  {
    id: '3d-creative',
    name: '3D Creative',
    category: 'Creative Developer',
    author: 'Shaquille Deon',
    role: '3D & Web Developer',
    location: 'New York, NY',
    summary: 'A visually expressive developer portfolio combining creative presentation, selected work, skills and professional information.',
    projects: [
      {
        title: '3D Car Configurator',
        desc: 'Real-time WebGL interactive car customization studio built with Three.js.',
        tags: ['React', 'Three.js', 'WebGL', 'Tailwind'],
        metric: 'Featured'
      },
      {
        title: 'Cyberpunk Portfolio Engine',
        desc: 'Interactive 3D particle landscape and responsive web experience.',
        tags: ['TypeScript', 'Three.js', 'React', 'Motion'],
        metric: 'Live Demo'
      }
    ],
    skills: ['React', 'Three.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Node.js', 'HTML5', 'CSS3'],
    experience: {
      role: 'Senior 3D & Frontend Engineer',
      company: 'Tech Innovations',
      period: '2023 — Present'
    },
    contact: 'shaquille@example.com'
  },
  {
    id: 'multipage-developer',
    name: 'MultiPage Developer',
    category: 'Professional / Multi-Page',
    author: 'Payton Jewell',
    role: 'Full-Stack Software Engineer',
    location: 'San Francisco, CA',
    summary: 'A polished multi-page developer portfolio with separate pages for projects, experience, skills, about information and contact.',
    projects: [
      {
        title: 'Cloud Analytics Dashboard',
        desc: 'Full-stack SaaS platform with real-time data visualizers and RBAC access.',
        tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
        metric: 'Featured'
      },
      {
        title: 'Developer Productivity Extension',
        desc: 'VS Code plugin for automated code snippets and API contract testing.',
        tags: ['TypeScript', 'VS Code API', 'React'],
        metric: 'Live Demo'
      }
    ],
    skills: ['React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Tailwind CSS', 'PostgreSQL', 'Docker', 'AWS'],
    experience: {
      role: 'Senior Software Engineer',
      company: 'Tech Solutions Inc.',
      period: '2022 — Present'
    },
    contact: 'payton@example.com'
  },
  {
    id: 'developer-showcase',
    name: 'Developer Showcase',
    category: 'Professional Developer',
    author: 'Hanzla Tauqeer',
    role: 'Full Stack Software Engineer',
    location: 'Pakistan',
    summary: 'A polished developer portfolio focused on personal introduction, skills, projects, experience and professional presence.',
    projects: [
      {
        title: 'Developer Portfolio Engine',
        desc: 'React open-source portfolio showcase template for modern web developers.',
        tags: ['React', 'Node.js', 'JavaScript', 'CSS3'],
        metric: 'Featured'
      },
      {
        title: 'Cloud Service Microservices',
        desc: 'Scalable RESTful API backend architecture with automated deployment pipeline.',
        tags: ['Node.js', 'Express', 'MongoDB', 'Docker'],
        metric: 'Live Demo'
      }
    ],
    skills: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'MongoDB', 'PostgreSQL', 'Docker'],
    experience: {
      role: 'Software Engineer',
      company: 'Tech Software Solutions',
      period: '2022 — Present'
    },
    contact: 'hanzla@example.com'
  }
];

interface PortfolioTemplateCardProps {
  preset: PortfolioPreset;
  isMain?: boolean;
  onUse?: () => void;
}

export const PortfolioTemplateCard: React.FC<PortfolioTemplateCardProps> = ({
  preset,
  isMain = false,
  onUse
}) => {
  return (
    <div className="w-full bg-white rounded-2xl border border-zinc-200 shadow-sm p-5 sm:p-6 text-left space-y-4 select-none relative transition-all overflow-hidden">
      {/* Real Portfolio Preview */}
      <div className="h-72 sm:h-80 rounded-xl border border-zinc-200 bg-[#FAF9F6] overflow-hidden relative shadow-2xs">
        <TemplatePreview id={preset.id} />
      </div>

      {/* Template Info & Action */}
      <div className="flex items-center justify-between border-t border-zinc-100 pt-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-lg sm:text-xl font-normal text-zinc-900 tracking-tight">{preset.name}</h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 uppercase font-semibold">
              {preset.category}
            </span>
          </div>
          <p className="text-xs text-zinc-500">{preset.role} • {preset.author}</p>
        </div>

        {isMain && onUse && (
          <button
            onClick={onUse}
            className="px-4 py-2 rounded-xl bg-zinc-900 text-white font-medium text-xs flex items-center gap-1.5 hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer shrink-0"
          >
            <span>Use Template</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
