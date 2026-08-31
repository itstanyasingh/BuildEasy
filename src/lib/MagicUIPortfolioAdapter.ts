import { PortfolioData, ProjectItem, ExperienceItem, SkillItem, EducationItem, ArticleItem } from '../types';

export interface MagicUIPortfolioData {
  profile: {
    name: string;
    role: string;
    bio: string;
    location: string;
    avatar: string;
    email: string;
    summary: string;
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
    logo?: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    duration: string;
    grade?: string;
    logo?: string;
  }>;
  skills: string[];
  posts: Array<{
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    publishedAt: string;
    tags: string[];
    readingTime: string;
    coverImage?: string;
  }>;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    email: string;
  };
}

/**
 * MagicUIPortfolioAdapter
 * Translates global PortfolioData into structure expected by the Magic UI Minimal Portfolio.
 */
export const MagicUIPortfolioAdapter = (data: PortfolioData): MagicUIPortfolioData => {
  // Convert standard projects
  const projects = (data.projects || []).map((p: ProjectItem) => ({
    title: p.name || 'Creative Project',
    description: p.description || '',
    image: p.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    technologies: p.technologies || [],
    githubUrl: p.githubUrl || '',
    liveUrl: p.liveUrl || '',
    year: p.year || '2026',
  }));

  // Convert standard experience
  const experience = (data.experience || []).map((e: ExperienceItem) => ({
    company: e.company || 'Unknown Company',
    role: e.role || 'Software Engineer',
    duration: e.duration || 'Present',
    description: e.description || '',
    achievements: e.achievements || [],
    logo: '', // Can be extracted or customized
  }));

  // Convert standard education
  const education = (data.education || []).map((edu: EducationItem) => ({
    institution: edu.institution || 'University',
    degree: edu.degree || 'Bachelor\'s Degree',
    duration: edu.duration || '',
    grade: edu.grade || '',
    logo: '',
  }));

  // Convert standard skills to plain array of strings
  const skills = (data.skills || []).map((s: SkillItem) => s.name).filter(Boolean);

  // Convert standard articles/posts
  const posts = (data.articles || []).map((art: ArticleItem) => ({
    title: art.title || 'Untitled Post',
    slug: art.slug || art.id || 'untitled',
    excerpt: art.excerpt || '',
    content: art.content || '',
    publishedAt: art.date || '2026-08-28',
    tags: art.tags || [],
    readingTime: art.readingTime || '2 min read',
    coverImage: '',
  }));

  return {
    profile: {
      name: data.profile?.name || 'Anonymous Developer',
      role: data.profile?.title || 'Creative Developer & Product Architect',
      bio: data.profile?.bio || 'Building high-performance minimalist applications and systems.',
      location: data.profile?.location || 'San Francisco, CA',
      avatar: data.profile?.profilePhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
      email: data.profile?.email || '',
      summary: data.about?.aboutText || data.profile?.bio || '',
    },
    projects,
    experience,
    education,
    skills,
    posts,
    socialLinks: {
      github: data.socialLinks?.github || '',
      linkedin: data.socialLinks?.linkedin || '',
      twitter: data.socialLinks?.twitter || '',
      email: data.profile?.email || data.contact?.email || '',
    },
  };
};
