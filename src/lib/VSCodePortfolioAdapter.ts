import { PortfolioData, ProjectItem, ExperienceItem, SkillItem, EducationItem } from '../types';

export interface VSCodePortfolioData {
  profile: {
    name: string;
    role: string;
    bio: string;
    location: string;
    email: string;
    phone: string;
    website: string;
    avatar: string;
  };
  about: {
    aboutText: string;
    interests: string[];
    services: string[];
  };
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    image: string;
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
  skills: Array<{
    id: string;
    name: string;
    category: string;
    proficiency: number;
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    duration: string;
    grade?: string;
  }>;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    dribbble: string;
    behance: string;
    youtube: string;
    website: string;
    email: string;
  };
  contact: {
    email: string;
    phone: string;
    location: string;
    messagePrompt: string;
  };
  githubUsername: string;
}

/**
 * VSCodePortfolioAdapter
 * Maps the standard BuildEasy PortfolioData structure into VSCodePortfolioData safely.
 */
export const VSCodePortfolioAdapter = (data: PortfolioData): VSCodePortfolioData => {
  const profile = {
    name: data.profile?.name || 'Nitin Ranganath',
    role: data.profile?.title || 'Full Stack Developer',
    bio: data.profile?.bio || 'Building custom software and polished web applications.',
    location: data.profile?.location || 'Bengaluru, India',
    email: data.profile?.email || 'nitin@example.com',
    phone: data.profile?.phone || '',
    website: data.profile?.website || 'https://nitinranganath.com',
    avatar: data.profile?.profilePhoto || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  };

  const about = {
    aboutText: data.about?.aboutText || 'I am a passionate software developer specializing in TypeScript, React, and Node.js. I love building highly functional tools, elegant interfaces, and developer-focused utilities.',
    interests: data.about?.interests || ['Coding', 'Open Source', 'UI/UX Design', 'Technical Writing'],
    services: data.about?.services || data.services || ['Web Development', 'Mobile Apps', 'API Architecture', 'Database Design'],
  };

  const projects = (data.projects || []).map((p: ProjectItem) => ({
    id: p.id || Math.random().toString(),
    name: p.name || 'Untitled Project',
    description: p.description || 'A developer project built using modern web standards.',
    technologies: p.technologies || [],
    image: p.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    githubUrl: p.githubUrl || '',
    liveUrl: p.liveUrl || '',
    year: p.year || new Date().getFullYear().toString(),
    featured: !!p.featured,
  }));

  const experience = (data.experience || []).map((e: ExperienceItem) => ({
    id: e.id || Math.random().toString(),
    company: e.company || 'Tech Company',
    role: e.role || 'Software Engineer',
    duration: e.duration || '2023 — Present',
    description: e.description || '',
    current: !!e.current,
    achievements: e.achievements || [],
    technologies: e.technologies || [],
  }));

  const skills = (data.skills || []).map((s: SkillItem) => ({
    id: s.id || Math.random().toString(),
    name: s.name || 'JavaScript',
    category: s.category || 'Languages',
    proficiency: s.proficiency || 80,
  }));

  const education = (data.education || []).map((edu: EducationItem) => ({
    id: edu.id || Math.random().toString(),
    institution: edu.institution || 'University',
    degree: edu.degree || 'Bachelor of Science in Computer Science',
    duration: edu.duration || '2019 — 2023',
    grade: edu.grade || '',
  }));

  // Infer GitHub username from social links or default
  let githubUser = data.githubUsername || '';
  if (!githubUser && data.socialLinks?.github) {
    try {
      const parts = data.socialLinks.github.replace(/\/$/, '').split('/');
      githubUser = parts[parts.length - 1] || '';
    } catch (e) {
      githubUser = '';
    }
  }
  if (!githubUser) {
    githubUser = 'itsnitinr';
  }

  return {
    profile,
    about,
    projects,
    experience,
    skills,
    education,
    socialLinks: {
      github: data.socialLinks?.github || 'https://github.com/itsnitinr',
      linkedin: data.socialLinks?.linkedin || 'https://linkedin.com',
      twitter: data.socialLinks?.twitter || 'https://twitter.com',
      dribbble: data.socialLinks?.dribbble || '',
      behance: data.socialLinks?.behance || '',
      youtube: data.socialLinks?.youtube || '',
      website: data.socialLinks?.website || data.profile?.website || 'https://nitinranganath.com',
      email: data.profile?.email || data.contact?.email || 'nitin@example.com',
    },
    contact: {
      email: data.contact?.email || profile.email,
      phone: data.contact?.phone || profile.phone,
      location: data.contact?.location || profile.location,
      messagePrompt: data.contact?.messagePrompt || 'Submit the form below or email me directly at:',
    },
    githubUsername: githubUser,
  };
};
