import { PortfolioData, ProjectItem, ExperienceItem, SkillItem } from '../types';

export interface HamishPortfolioData {
  profile: {
    name: string;
    role: string;
    bio: string;
    location: string;
    avatar: string;
    email: string;
  };
  projects: Array<{
    title: string;
    description: string;
    image: string;
    technologies: string[];
    githubUrl: string;
    liveUrl: string;
    year: string;
  }>;
  experience: Array<{
    company: string;
    role: string;
    duration: string;
    description: string;
    achievements: string[];
  }>;
  skills: Array<{
    name: string;
    proficiency: number;
  }>;
}

/**
 * HamishPortfolioAdapter
 * Maps the standard BuildEasy PortfolioData schema to the specialized Hamish portfolio format.
 */
export const HamishPortfolioAdapter = (data: PortfolioData): HamishPortfolioData => {
  return {
    profile: {
      name: data.profile?.name || 'Anonymous Developer',
      role: data.profile?.title || 'Creative Developer & Product Architect',
      bio: data.profile?.bio || 'Designing and engineering high-fidelity, interactive systems.',
      location: data.profile?.location || '',
      avatar: data.profile?.profilePhoto || '',
      email: data.profile?.email || '',
    },
    projects: (data.projects || []).map((p: ProjectItem) => ({
      title: p.name || 'Interactive System',
      description: p.description || '',
      image: p.image || '',
      technologies: p.technologies || [],
      githubUrl: p.githubUrl || '',
      liveUrl: p.liveUrl || '',
      year: p.year || '2026',
    })),
    experience: (data.experience || []).map((e: ExperienceItem) => ({
      company: e.company || '',
      role: e.role || '',
      duration: e.duration || '',
      description: e.description || '',
      achievements: e.achievements || [],
    })),
    skills: (data.skills || []).map((s: SkillItem) => ({
      name: s.name || '',
      proficiency: s.proficiency || 80,
    })),
  };
};
