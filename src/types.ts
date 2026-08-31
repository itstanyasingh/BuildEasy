export interface ProfileData {
  name: string;
  title: string;
  profilePhoto: string;
  location: string;
  bio: string;
  email: string;
  phone: string;
  website: string;
}

export interface AboutData {
  aboutText: string;
  interests: string[];
  services: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
  current: boolean;
  technologies?: string[];
  achievements?: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  duration: string;
  grade?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  proficiency: number; // 1-100
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  year?: string;
  status?: 'LIVE' | 'IN DEVELOPMENT' | 'ARCHIVED' | string;
  role?: string;
  problem?: string;
  solution?: string;
  results?: string;
}

export interface LiveActivityData {
  currentlyBuilding?: string;
  currentlyLearning?: string;
  availableFor?: string;
  latestProject?: string;
  statusNote?: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime?: string;
  category?: string;
  tags?: string[];
  content?: string;
  slug?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  date: string;
  description: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export interface PublicationItem {
  id: string;
  title: string;
  publisher: string;
  date: string;
  url: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  dribbble: string;
  behance: string;
  youtube: string;
  website: string;
}

export interface ContactData {
  email: string;
  phone: string;
  location: string;
  messagePrompt: string;
}

export interface PortfolioData {
  profile: ProfileData;
  about: AboutData;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  articles?: ArticleItem[];
  achievements: AchievementItem[];
  certifications: CertificationItem[];
  testimonials: TestimonialItem[];
  publications: PublicationItem[];
  socialLinks: SocialLinks;
  contact: ContactData;
  services?: string[];
  githubUsername?: string;
  activity?: LiveActivityData;
}

export type SectionKey = 
  | 'profile' 
  | 'about' 
  | 'experience' 
  | 'education' 
  | 'skills' 
  | 'projects' 
  | 'articles'
  | 'achievements' 
  | 'certifications' 
  | 'testimonials' 
  | 'publications' 
  | 'services'
  | 'github'
  | 'contact';

export interface LayoutConfiguration {
  typography: 'sans' | 'mono' | 'serif' | 'grotesk' | 'editorial';
  accentColor: string; // hex e.g. '#2563eb'
  bgStyle: 'light' | 'dark' | 'paper' | 'slate' | 'zinc';
  spacing: 'compact' | 'normal' | 'relaxed';
  headerStyle: 'sticky' | 'floating' | 'minimal' | 'sidebar';
  cardStyle: 'flat' | 'border' | 'shadow' | 'glass';
  sectionOrder: SectionKey[];
  hiddenSections: SectionKey[];
}

export interface TemplateDefinition {
  id: string;
  name: string;
  category: string;
  interactionModel?: string;
  description: string;
  bestFor: string;
  tags: string[];
  previewGradient: string;
  supportedSections: SectionKey[];
  defaultConfig: LayoutConfiguration;
  rendererType: string;
  animationLevel?: 'None' | 'Subtle' | 'Moderate' | 'High' | 'Very High';
  layout?: string;
  responsive?: boolean;
  status?: string;
  sourceReference?: string;
  licenseReference?: string;
}

export interface UserPortfolio {
  id: string;
  name: string;
  templateId: string;
  data: PortfolioData;
  customizer: LayoutConfiguration;
  updatedAt: string;
  published: boolean;
  username: string;
}
