import { PortfolioData, ProjectItem, ExperienceItem, SkillItem, EducationItem, TestimonialItem } from '../types';

export interface NixPortfolioData {
  profile: {
    name: string;
    role: string;
    bio: string;
    location: string;
    avatar: string;
    email: string;
    resumeUrl: string;
    tagline: string;
  };
  projects: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    githubUrl: string;
    liveUrl: string;
    year: string;
    featured: boolean;
  }>;
  experience: Array<{
    id: string;
    company: string;
    role: string;
    duration: string;
    description: string;
    current: boolean;
    achievements: string[];
    technologies: string[];
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    duration: string;
    grade?: string;
  }>;
  skills: Array<{
    id: string;
    name: string;
    category: string;
    proficiency: number;
  }>;
  services: string[];
  testimonials: Array<{
    id: string;
    name: string;
    role: string;
    company: string;
    content: string;
    avatar: string;
  }>;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    website: string;
    email: string;
    youtube?: string;
  };
  contact: {
    email: string;
    phone: string;
    location: string;
  };
}

/**
 * NixPortfolioAdapter
 * Maps the standard BuildEasy PortfolioData structure into NixPortfolioData
 */
export const NixPortfolioAdapter = (data: PortfolioData): NixPortfolioData => {
  // Safe projects conversion
  const projects = (data.projects || []).map((p: ProjectItem) => ({
    id: p.id || Math.random().toString(),
    title: p.name || 'Creative Project',
    description: p.description || '',
    image: p.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    technologies: p.technologies || [],
    githubUrl: p.githubUrl || '',
    liveUrl: p.liveUrl || '',
    year: p.year || '2026',
    featured: p.featured ?? true,
  }));

  // Experience mapping
  const experience = (data.experience || []).map((e: ExperienceItem) => ({
    id: e.id || Math.random().toString(),
    company: e.company || 'Tech Company',
    role: e.role || 'Software Engineer',
    duration: e.duration || '2023 — Present',
    description: e.description || '',
    current: e.current || false,
    achievements: e.achievements || [],
    technologies: e.technologies || [],
  }));

  // Education mapping
  const education = (data.education || []).map((edu: EducationItem) => ({
    id: edu.id || Math.random().toString(),
    institution: edu.institution || 'University',
    degree: edu.degree || 'Degree',
    duration: edu.duration || '',
    grade: edu.grade || '',
  }));

  // Skills mapping
  const skills = (data.skills || []).map((s: SkillItem) => ({
    id: s.id || Math.random().toString(),
    name: s.name || '',
    category: s.category || 'General',
    proficiency: s.proficiency || 80,
  }));

  // Services mapping
  const services = data.services || data.about?.services || [
    'System Architecture',
    'Full-Stack Development',
    'AI & LLM Orchestration',
    'UI/UX Prototyping',
  ];

  // Testimonials mapping
  const testimonials = (data.testimonials || []).map((t: TestimonialItem) => ({
    id: t.id || Math.random().toString(),
    name: t.name || 'John Doe',
    role: t.role || 'Product Manager',
    company: t.company || 'Tech Corp',
    content: t.content || '',
    avatar: t.avatar || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
  }));

  return {
    profile: {
      name: data.profile?.name || 'Alex Morgan',
      role: data.profile?.title || 'Senior Systems Architect',
      bio: data.profile?.bio || 'Building modern, high-performance distributed web architectures.',
      location: data.profile?.location || 'San Francisco, CA',
      avatar: data.profile?.profilePhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
      email: data.profile?.email || 'alex.morgan@example.com',
      resumeUrl: '#',
      tagline: data.profile?.title || 'Creative Developer & Architect',
    },
    projects,
    experience,
    education,
    skills,
    services,
    testimonials,
    socialLinks: {
      github: data.socialLinks?.github || '',
      linkedin: data.socialLinks?.linkedin || '',
      twitter: data.socialLinks?.twitter || '',
      website: data.profile?.website || '',
      email: data.profile?.email || data.contact?.email || '',
      youtube: data.socialLinks?.youtube || '',
    },
    contact: {
      email: data.contact?.email || data.profile?.email || '',
      phone: data.contact?.phone || data.profile?.phone || '',
      location: data.contact?.location || data.profile?.location || '',
    },
  };
};
