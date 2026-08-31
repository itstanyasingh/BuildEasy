import { PortfolioData, LayoutConfiguration } from '../types';

export const defaultPortfolioData: PortfolioData = {
  profile: {
    name: "Alex Morgan",
    title: "Senior Full-Stack & AI Systems Architect",
    profilePhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
    location: "San Francisco, CA",
    bio: "Building high-performance distributed web applications and production-grade LLM orchestration pipelines. Passionate about clean code, ergonomic developer tooling, and robust software architecture.",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 234-5678",
    website: "https://alexmorgan.dev"
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
  education: [
    {
      id: "edu-1",
      institution: "Stanford University",
      degree: "M.S. in Computer Science (Artificial Intelligence)",
      duration: "2017 — 2019",
      grade: "GPA: 3.94 / 4.0"
    },
    {
      id: "edu-2",
      institution: "UC Berkeley",
      degree: "B.S. in Electrical Engineering & Computer Sciences",
      duration: "2013 — 2017",
      grade: "Summa Cum Laude"
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
      status: "LIVE",
      role: "Lead Architect & Full-Stack Engineer",
      problem: "Traditional web database GUIs suffer from sluggish latency and heavy server-side roundtrips for schema introspection.",
      solution: "Engineered client-side WebAssembly SQL parsers coupled with streaming connection pooling to deliver instantaneous query execution.",
      results: "Adopted by 15,000+ developers with sub-10ms UI interaction latency."
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
      status: "LIVE",
      role: "AI Systems Engineer",
      problem: "Keyword-only enterprise search missed contextual synonyms across unstructured PDF repositories.",
      solution: "Designed a hybrid BM25 + dense vector embedding pipeline with cross-encoder re-ranking.",
      results: "Boosted search relevancy recall by 42% and reduced query retrieval times to under 120ms."
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
      status: "LIVE",
      role: "Creator & Maintainer",
      problem: "Existing chart libraries degrade frame rates when streaming 100k data points in real time.",
      solution: "Implemented an OffscreenCanvas double-buffer rendering loop with zero garbage collector churn.",
      results: "Sustains 60 FPS under continuous 120Hz sensor updates."
    }
  ],
  articles: [
    {
      id: "art-1",
      title: "Architecting Zero-Latency Streaming Pipelines with WebSockets and Redis Streams",
      excerpt: "A deep dive into distributed event brokers, memory-efficient data serialization with FlatBuffers, and client-side reactive reconciling.",
      date: "Oct 24, 2025",
      readingTime: "6 min read",
      category: "Distributed Systems",
      tags: ["TypeScript", "Redis", "WebSockets", "Performance"],
      slug: "architecting-zero-latency-streaming-pipelines",
      content: `Distributed web applications frequently struggle with the delicate balance between real-time data push latency and server compute overhead. 

When building telemetry and collaborative canvases, naive polling or uncompressed JSON over WebSockets creates severe performance bottlenecks once client concurrency scales past 10,000 active nodes.

### 1. The Bottleneck: Unbounded Buffer Allocation
Standard JSON serialization forces the V8 engine to allocate and garbage-collect millions of intermediate string objects per second. By moving to structured binary schemas using FlatBuffers or Protocol Buffers, we eliminated 70% of GC pauses.

### 2. Redis Streams as Backpressure Governors
Using Redis Consumer Groups with PEL (Pending Entry Lists), we decoupled fast event producers from heterogeneous client consumption rates. This ensures slow network clients never cause server memory bloat.

### 3. Client-Side Virtual Reconciling
On the browser thread, incoming frame deltas are merged into an OffscreenCanvas buffer using \`requestAnimationFrame\` scheduling, avoiding UI thread stutter and guaranteeing solid 60 FPS renders even under heavy load.`
    },
    {
      id: "art-2",
      title: "Rethinking Modern Frontend: From Monolithic Bundles to Fine-Grained Primitives",
      excerpt: "Why modern web engineering is pivoting from heavy client runtimes toward compile-time signals, edge-rendered islands, and minimal JavaScript footprints.",
      date: "Jul 12, 2025",
      readingTime: "8 min read",
      category: "Frontend Architecture",
      tags: ["React", "Architecture", "Web Standards", "Signals"],
      slug: "rethinking-modern-frontend-primitives",
      content: `The modern web has reached a pivotal juncture. For a decade, the industry prioritized developer experience by shipping increasingly large client runtimes to user devices. Today, we are seeing the resurgence of content-first, performance-centric architectures.

### The Problem with Runtime Virtual DOM Overhead
Virtual DOM diffing was a breakthrough in 2013, but modern browsers have grown extraordinarily fast at fine-grained DOM updates when driven by reactive signal primitives or compile-time optimizations.

### Content-First Design as an Architectural Discipline
When building knowledge platforms and developer tools, content must be first-class. Code, typography, hierarchy, and keyboard ergonomics should take precedence over unnecessary visual gimmicks.

\`\`\`typescript
// Example fine-grained reactive subscriber
export function createSignal<T>(initialValue: T): [() => T, (next: T) => void] {
  let value = initialValue;
  const subscribers = new Set<() => void>();
  
  const read = () => {
    if (activeEffect) subscribers.add(activeEffect);
    return value;
  };
  
  const write = (next: T) => {
    value = next;
    subscribers.forEach(fn => fn());
  };
  
  return [read, write];
}
\`\`\`

### Key Takeaways
1. Keep the main thread idle by default.
2. Treat typography and content hierarchy as the primary interface.
3. Optimize for fast initial paint and instantaneous navigation.`
    },
    {
      id: "art-3",
      title: "Building Production-Grade Multi-Agent LLM Orchestration in TypeScript",
      excerpt: "Designing resilient tool-use pipelines, deterministic schema enforcement, and structured state machines with modern AI SDKs.",
      date: "Mar 05, 2025",
      readingTime: "5 min read",
      category: "AI Engineering",
      tags: ["LLM", "TypeScript", "Tool Use", "AI Systems"],
      slug: "building-multi-agent-orchestration-in-typescript",
      content: `Integrating Large Language Models into mission-critical production workflows requires moving beyond basic single-prompt completions toward deterministic, verifiable multi-agent state machines.

### 1. Strict Schema Enforcement
Using Zod and Function Calling schemas, every model step produces strictly typed JSON outputs validated at runtime before executing database or API mutations.

### 2. State Machine Coordination
By representing agent conversations as directed acyclic graphs (DAGs), each node performs targeted reasoning with dedicated system prompts and restricted tool access.

\`\`\`typescript
interface AgentNode {
  id: string;
  systemPrompt: string;
  tools: ToolDefinition[];
  transitionCondition: (output: AgentOutput) => string | null;
}
\`\`\`

### 3. Observability and Fallback Strategies
Every agent step records token counts, tool execution latency, and error states to ensure full auditability across production workflows.`
    }
  ],
  achievements: [
    {
      id: "ach-1",
      title: "ACM Distinguished Speaker",
      date: "2025",
      description: "Invited speaker on scalable transformer architectures at international developer conferences."
    },
    {
      id: "ach-2",
      title: "Open Source Contributor of the Year",
      date: "2023",
      description: "Recognized for foundational contributions to high-performance client-side rendering engines."
    }
  ],
  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Solutions Architect Professional",
      issuer: "Amazon Web Services",
      date: "2024",
      url: "https://aws.amazon.com/certification"
    },
    {
      id: "cert-2",
      name: "Google Cloud Professional Data Engineer",
      issuer: "Google Cloud",
      date: "2023",
      url: "https://cloud.google.com/certification"
    }
  ],
  testimonials: [
    {
      id: "test-1",
      name: "Sarah Jenkins",
      role: "VP of Engineering",
      company: "Vortex AI",
      content: "Alex is an absolute powerhouse of engineering execution. Their ability to simplify complex distributed systems is unmatched.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
    },
    {
      id: "test-2",
      name: "David Chen",
      role: "Principal Scientist",
      company: "DeepCore Labs",
      content: "Working with Alex on our LLM indexing pipeline was a masterclass in clean architecture and rigorous performance optimization.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
    }
  ],
  publications: [
    {
      id: "pub-1",
      title: "Scaling Low-Latency LLM Inference across Distributed Edges",
      publisher: "Journal of Systems Software Engineering",
      date: "2024",
      url: "https://doi.org/example"
    }
  ],
  socialLinks: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    dribbble: "https://dribbble.com",
    behance: "https://behance.net",
    youtube: "https://youtube.com",
    website: "https://alexmorgan.dev"
  },
  contact: {
    email: "alex.morgan@example.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    messagePrompt: "Let's build something exceptional together. Drop me a line below."
  },
  services: [
    "High-Performance System Architecture",
    "Full-Stack Web & Realtime Engineering",
    "LLM Fine-Tuning & Multi-Agent Orchestration",
    "Technical Consulting & Code Audits"
  ],
  githubUsername: "alexmorgan",
  activity: {
    currentlyBuilding: "Real-time distributed edge event router & schema compiler",
    currentlyLearning: "Distributed consensus algorithms & WASM SIMD optimization",
    availableFor: "Architectural consulting & high-impact engineering leadership",
    latestProject: "NexusDB Studio",
    statusNote: "Available for Q3/Q4 engineering contracts & advisory"
  }
};

export const defaultConfig: LayoutConfiguration = {
  typography: 'sans',
  accentColor: '#2563eb', // blue-600
  bgStyle: 'light',
  spacing: 'normal',
  headerStyle: 'sticky',
  cardStyle: 'border',
  sectionOrder: [
    'profile',
    'about',
    'projects',
    'articles',
    'experience',
    'skills',
    'education',
    'achievements',
    'certifications',
    'testimonials',
    'publications',
    'contact'
  ],
  hiddenSections: []
};
