import { UserPortfolio, PortfolioData, LayoutConfiguration } from '../types';
import { templatesRegistry, getTemplateById } from '../data/templatesRegistry';
import { defaultPortfolioData, defaultConfig } from '../data/defaultData';
import { getDemoDataForTemplate } from '../data/demoDataByTemplate';

export function validateAndCleanPortfolioData(data: any): PortfolioData {
  const fallback = defaultPortfolioData;
  
  if (!data || typeof data !== 'object') {
    return { ...fallback };
  }

  // Handle nested profile safely
  const profile = {
    name: typeof data.profile?.name === 'string' ? data.profile.name : fallback.profile.name,
    title: typeof data.profile?.title === 'string' ? data.profile.title : fallback.profile.title,
    profilePhoto: typeof data.profile?.profilePhoto === 'string' ? data.profile.profilePhoto : fallback.profile.profilePhoto,
    location: typeof data.profile?.location === 'string' ? data.profile.location : fallback.profile.location,
    bio: typeof data.profile?.bio === 'string' ? data.profile.bio : fallback.profile.bio,
    email: typeof data.profile?.email === 'string' ? data.profile.email : fallback.profile.email,
    phone: typeof data.profile?.phone === 'string' ? data.profile.phone : fallback.profile.phone,
    website: typeof data.profile?.website === 'string' ? data.profile.website : fallback.profile.website,
  };

  // Handle nested about safely
  const about = {
    aboutText: typeof data.about?.aboutText === 'string' ? data.about.aboutText : fallback.about.aboutText,
    interests: Array.isArray(data.about?.interests) ? data.about.interests : fallback.about.interests || [],
    services: Array.isArray(data.about?.services) ? data.about.services : fallback.about.services || [],
  };

  // Ensure arrays are verified
  const experience = Array.isArray(data.experience) ? data.experience : fallback.experience || [];
  const education = Array.isArray(data.education) ? data.education : fallback.education || [];
  const skills = Array.isArray(data.skills) ? data.skills : fallback.skills || [];
  const projects = Array.isArray(data.projects) ? data.projects : fallback.projects || [];
  const achievements = Array.isArray(data.achievements) ? data.achievements : fallback.achievements || [];
  const certifications = Array.isArray(data.certifications) ? data.certifications : fallback.certifications || [];
  const testimonials = Array.isArray(data.testimonials) ? data.testimonials : fallback.testimonials || [];
  const publications = Array.isArray(data.publications) ? data.publications : fallback.publications || [];

  // Handle nested social links safely
  const socialLinks = {
    github: typeof data.socialLinks?.github === 'string' ? data.socialLinks.github : fallback.socialLinks.github,
    linkedin: typeof data.socialLinks?.linkedin === 'string' ? data.socialLinks.linkedin : fallback.socialLinks.linkedin,
    twitter: typeof data.socialLinks?.twitter === 'string' ? data.socialLinks.twitter : fallback.socialLinks.twitter,
    dribbble: typeof data.socialLinks?.dribbble === 'string' ? data.socialLinks.dribbble : fallback.socialLinks.dribbble,
    behance: typeof data.socialLinks?.behance === 'string' ? data.socialLinks.behance : fallback.socialLinks.behance,
    youtube: typeof data.socialLinks?.youtube === 'string' ? data.socialLinks.youtube : fallback.socialLinks.youtube,
    website: typeof data.socialLinks?.website === 'string' ? data.socialLinks.website : fallback.socialLinks.website,
  };

  // Handle nested contact details safely
  const contact = {
    email: typeof data.contact?.email === 'string' ? data.contact.email : fallback.contact.email,
    phone: typeof data.contact?.phone === 'string' ? data.contact.phone : fallback.contact.phone,
    location: typeof data.contact?.location === 'string' ? data.contact.location : fallback.contact.location,
    messagePrompt: typeof data.contact?.messagePrompt === 'string' ? data.contact.messagePrompt : fallback.contact.messagePrompt,
  };

  return {
    profile,
    about,
    experience,
    education,
    skills,
    projects,
    achievements,
    certifications,
    testimonials,
    publications,
    socialLinks,
    contact,
    articles: Array.isArray(data.articles) ? data.articles : [],
    services: Array.isArray(data.services) ? data.services : [],
    githubUsername: typeof data.githubUsername === 'string' ? data.githubUsername : '',
    activity: typeof data.activity === 'object' ? data.activity : {},
    imageReplacements: typeof data.imageReplacements === 'object' ? data.imageReplacements : {},
  };
}

export function validateAndCleanLayoutConfig(config: any, fallback: LayoutConfiguration): LayoutConfiguration {
  const defaultCfg = fallback || defaultConfig;
  if (!config || typeof config !== 'object') {
    return { ...defaultCfg };
  }
  return {
    typography: ['sans', 'mono', 'serif', 'grotesk', 'editorial'].includes(config.typography) ? config.typography : defaultCfg.typography,
    accentColor: typeof config.accentColor === 'string' ? config.accentColor : defaultCfg.accentColor,
    bgStyle: ['light', 'dark', 'paper', 'slate', 'zinc'].includes(config.bgStyle) ? config.bgStyle : defaultCfg.bgStyle,
    spacing: ['compact', 'normal', 'relaxed'].includes(config.spacing) ? config.spacing : defaultCfg.spacing,
    headerStyle: ['sticky', 'floating', 'minimal', 'sidebar'].includes(config.headerStyle) ? config.headerStyle : defaultCfg.headerStyle,
    cardStyle: ['flat', 'border', 'shadow', 'glass'].includes(config.cardStyle) ? config.cardStyle : defaultCfg.cardStyle,
    sectionOrder: Array.isArray(config.sectionOrder) ? config.sectionOrder : defaultCfg.sectionOrder || [],
    hiddenSections: Array.isArray(config.hiddenSections) ? config.hiddenSections : defaultCfg.hiddenSections || [],
  };
}

function generateCreatorToken(): string {
  try {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.randomUUID) {
      return window.crypto.randomUUID();
    }
  } catch (e) {}
  return 'ct-' + Math.random().toString(36).substring(2) + '-' + Date.now().toString(36);
}

export function validateAndCleanPortfolio(p: any): UserPortfolio {
  const tDef = getTemplateById(p?.templateId || 'github-codebucks-001');
  const demoData = getDemoDataForTemplate(tDef.id);
  
  return {
    id: typeof p?.id === 'string' ? p.id : `port-${Date.now()}`,
    name: typeof p?.name === 'string' ? p.name : tDef.name,
    templateId: tDef.id,
    data: validateAndCleanPortfolioData(p?.data || demoData),
    customizer: validateAndCleanLayoutConfig(p?.customizer, tDef.defaultConfig),
    updatedAt: typeof p?.updatedAt === 'string' ? p.updatedAt : new Date().toISOString().split('T')[0],
    published: typeof p?.published === 'boolean' ? p.published : false,
    username: typeof p?.username === 'string' ? p.username : `user-${Date.now().toString().slice(-4)}`,
    version: typeof p?.version === 'number' ? p.version : 1,
    publishedData: p?.publishedData ? validateAndCleanPortfolioData(p.publishedData) : undefined,
    publishedCustomizer: p?.publishedCustomizer ? validateAndCleanLayoutConfig(p.publishedCustomizer, tDef.defaultConfig) : undefined,
    creatorToken: typeof p?.creatorToken === 'string' && p.creatorToken.length > 8 ? p.creatorToken : generateCreatorToken(),
  };
}
