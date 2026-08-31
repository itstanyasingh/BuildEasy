import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';

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
    <div className="w-full bg-white rounded-2xl border border-zinc-200 shadow-sm p-6 sm:p-8 text-left space-y-5 select-none relative transition-all">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 pb-3 text-xs font-mono text-zinc-400">
        <span className="font-serif font-bold text-zinc-900 text-sm tracking-tight">{preset.author}</span>
        <div className="flex items-center gap-3 text-zinc-500 font-sans">
          <span className="font-semibold text-zinc-900">Work</span>
          <span>About</span>
          <span>Experience</span>
          <span>Contact</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold">{preset.category}</span>
        <h2 className="font-serif text-2xl sm:text-3xl font-normal text-zinc-900 tracking-tight leading-tight">
          {preset.role}
        </h2>
        <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed font-sans max-w-xl">
          {preset.summary}
        </p>
      </div>

      {/* Selected Projects */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 border-b border-zinc-100 pb-1 uppercase tracking-wider">
          <span>SELECTED WORK</span>
          <span>2024 — 2026</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {preset.projects.map((p, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1.5 hover:border-zinc-300 transition-all">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-serif font-bold text-zinc-900">{p.title}</h4>
                {p.metric && <span className="text-[9px] font-mono text-zinc-500">{p.metric}</span>}
              </div>
              <p className="text-[11px] text-zinc-600 leading-snug">{p.desc}</p>
              <div className="flex items-center gap-1.5 pt-1">
                {p.tags.map((t, idx) => (
                  <span key={idx} className="text-[9px] font-mono text-zinc-700 bg-white px-1.5 py-0.5 rounded border border-zinc-200">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills & Experience */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 text-xs border-t border-zinc-200">
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Skills</span>
          <div className="text-[11px] text-zinc-700 font-sans leading-relaxed">
            {preset.skills.join(' · ')}
          </div>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Current Role</span>
          <div className="text-[11px] font-medium text-zinc-900">
            {preset.experience.role}
          </div>
          <div className="text-[10px] text-zinc-500">{preset.experience.company} ({preset.experience.period})</div>
        </div>
      </div>

      {/* Footer Contact */}
      <div className="pt-3 border-t border-zinc-200 flex items-center justify-between text-xs text-zinc-500">
        <span className="font-mono text-[11px] text-zinc-700">{preset.contact}</span>
        {isMain && onUse && (
          <button
            onClick={onUse}
            className="px-4 py-2 rounded-xl bg-zinc-900 text-white font-medium text-xs flex items-center gap-1.5 hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer"
          >
            <span>Use Template</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
