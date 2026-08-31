import React, { useState, useMemo, useEffect } from 'react';
import { PortfolioData, LayoutConfiguration, ProjectItem, ProfileData, SocialLinks, ContactData, AboutData } from '../../types';
import { 
  ChevronDown, Menu, X, ExternalLink, ArrowUpRight, Phone, MapPin 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface KalvinMountainPortfolioTemplateProps {
  data: PortfolioData;
  config?: LayoutConfiguration;
}

// -------------------------------------------------------------
// KALVIN MOUNTAIN CREATIVE PORTFOLIO #012 DATA ADAPTER
// -------------------------------------------------------------
const useKalvinAdapter = (data: PortfolioData) => {
  return useMemo(() => {
    const rawProfile = (data.profile || {}) as Partial<ProfileData>;
    const rawSocial = (data.socialLinks || {}) as Partial<SocialLinks>;
    const rawContact = (data.contact || {}) as Partial<ContactData>;
    const rawAbout = (data.about || {}) as Partial<AboutData>;

    const heroImage = rawProfile.profilePhoto || 
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80';

    const name = rawProfile.name || 'Kalvin';
    const title = rawProfile.title || 'Creative Designer & Developer';
    const location = rawProfile.location || 'New York.';
    const specialization = (data as any).specialization || 'Creating Webs';

    const profile = {
      name,
      title,
      location,
      specialization,
      bio: rawProfile.bio || rawAbout.aboutText || 
        'I am a passionate creative designer and engineer dedicated to building digital products with bold typography, spacious grids, and memorable visual rhythm.',
      email: rawContact.email || rawProfile.email || 'hello@kalvin.design',
      phone: rawContact.phone || '+1 212 555 0192',
      heroImage,
    };

    const socialLinks = {
      instagram: (rawSocial as Record<string, any>).instagram || '#',
      linkedin: rawSocial.linkedin || '#',
      twitter: rawSocial.twitter || '#',
      github: rawSocial.github || '#',
    };

    const projects = (data.projects || []).map((p: ProjectItem, idx: number) => {
      let stack: string[] = [];
      if (Array.isArray(p.technologies) && p.technologies.length > 0) {
        stack = p.technologies;
      } else if (typeof p.technologies === 'string') {
        stack = (p.technologies as string).split(',').map(s => s.trim());
      } else {
        stack = ['UI/UX', 'Web Design', 'Development'];
      }

      return {
        id: p.id || `project-${idx}`,
        title: p.name || `Creative Work ${idx + 1}`,
        category: stack[0] || 'Web Design',
        description: p.description || 'Custom interactive web project crafted with emphasis on bold aesthetic, grid precision, and fluid performance.',
        stack,
        githubUrl: p.githubUrl || '',
        liveUrl: p.liveUrl || '',
        image: p.image || `https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80`,
        year: p.year || '2024',
      };
    });

    const servicesList = (data.services && data.services.length > 0)
      ? data.services
      : (rawAbout.services && rawAbout.services.length > 0)
        ? rawAbout.services
        : [
            'UI/UX DESIGN',
            'WEB DEVELOPMENT',
            'BRANDING & DIRECTION',
            'DIGITAL PRODUCTS'
          ];

    const services = servicesList.map((srv, idx) => {
      if (typeof srv === 'string') {
        return {
          id: `srv-${idx}`,
          num: `0${idx + 1}`,
          title: srv,
          description: 'Delivering end-to-end design solutions, interactive web experiences, and scalable visual identities.'
        };
      }
      return {
        id: (srv as any).id || `srv-${idx}`,
        num: `0${idx + 1}`,
        title: (srv as any).title || `Service ${idx + 1}`,
        description: (srv as any).description || 'Crafting distinctive brand experiences and functional digital interfaces.'
      };
    });

    const blogPosts = (data as any).blog || [
      {
        id: 'blog-1',
        title: 'The Art of Minimalist Typography in Modern Web Design',
        date: 'AUG 2026',
        category: 'DESIGN THOUGHTS',
        link: '#'
      },
      {
        id: 'blog-2',
        title: 'Building High-Performance Cinematic Landscapes with WebGL',
        date: 'JUN 2026',
        category: 'ENGINEERING',
        link: '#'
      }
    ];

    return {
      profile,
      socialLinks,
      projects,
      services,
      blogPosts,
    };
  }, [data]);
};

export const KalvinMountainPortfolioTemplate: React.FC<KalvinMountainPortfolioTemplateProps> = ({ data, config }) => {
  const { profile, projects, services, blogPosts } = useKalvinAdapter(data);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'works', 'blog', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'HOME', id: 'home' },
    { label: 'ABOUT', id: 'about' },
    { label: 'SERVICES', id: 'services' },
    { label: 'WORKS', id: 'works' },
    { label: 'BLOG', id: 'blog' },
    { label: 'CONTACT', id: 'contact' },
  ];

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#111111] font-sans selection:bg-[#111111] selection:text-[#ffffff] relative border-2 border-[#111111] overflow-x-hidden">

      {/* ------------------------------------------------------------- */}
      {/* FULLSCREEN HERO SECTION                                      */}
      {/* ------------------------------------------------------------- */}
      <section 
        id="home"
        className="relative min-h-screen h-screen w-full flex flex-col justify-between bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url('${profile.heroImage}')`,
          backgroundPosition: 'center center',
        }}
      >
        {/* Subtle Dark Image Overlay */}
        <div className="absolute inset-0 bg-black/30 z-10" />

        {/* ------------------------------------------------------------- */}
        {/* HEADER / NAVIGATION                                          */}
        {/* ------------------------------------------------------------- */}
        <header className="relative z-30 w-full max-w-7xl mx-auto px-6 lg:px-16 pt-12 flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollToSection('home')}
            className="text-2xl sm:text-3xl font-extrabold uppercase tracking-widest text-white border-none bg-transparent cursor-pointer hover:opacity-80 transition-opacity"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {profile.name}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-xs sm:text-sm font-medium tracking-widest text-white/90">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="relative py-1 border-none bg-transparent cursor-pointer text-white/90 hover:text-white transition-colors"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <span>{item.label}</span>
                {activeSection === item.id && (
                  <motion.span 
                    layoutId="activeUnderline"
                    className="absolute left-0 bottom-0 w-full h-[2px] bg-white rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Hamburger Trigger */}
          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 text-white hover:text-white/80 focus:outline-none cursor-pointer"
          >
            <Menu size={28} />
          </button>
        </header>

        {/* ------------------------------------------------------------- */}
        {/* HERO CONTENT (Left-Aligned)                                  */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-16 my-auto">
          <div className="max-w-4xl text-left">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-4xl sm:text-7xl md:text-8xl lg:text-[100px] font-extrabold text-white tracking-tight leading-[0.95] mb-6"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Hi! I'm {profile.name}.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="text-lg sm:text-2xl md:text-3xl text-white font-normal leading-snug tracking-wide"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {profile.title} located in {profile.location} <br className="hidden sm:inline" />
              Specialized in <strong className="font-extrabold text-white underline decoration-2 underline-offset-4">{profile.specialization}</strong>
            </motion.p>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* DOWN ARROW INDICATOR & BOTTOM SHAPE                          */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-16 pb-20 flex items-center justify-between">
          <button
            type="button"
            aria-label="Scroll to about"
            onClick={() => scrollToSection('about')}
            className="text-white hover:translate-y-1.5 transition-transform duration-300 p-2 border-none bg-transparent cursor-pointer focus:outline-none"
          >
            <ChevronDown size={36} strokeWidth={2.5} />
          </button>
        </div>

        {/* Distinctive Organic Curved / Diagonal White Bottom Shape */}
        <div className="absolute bottom-0 inset-x-0 z-20 pointer-events-none overflow-hidden leading-none">
          <svg 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none" 
            className="relative block w-full h-16 sm:h-24 md:h-32 text-white fill-current"
          >
            <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,80 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION: ABOUT                                                */}
      {/* ------------------------------------------------------------- */}
      <section id="about" className="py-24 sm:py-32 bg-white text-[#111111] scroll-mt-0 relative">
        <div className="max-w-6xl mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 
              className="text-3xl sm:text-6xl font-extrabold uppercase tracking-tight mb-8"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              ABOUT ME
            </h2>

            <p 
              className="text-lg sm:text-2xl text-[#333333] font-normal leading-relaxed max-w-4xl"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {profile.bio}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION: SERVICES                                             */}
      {/* ------------------------------------------------------------- */}
      {services.length > 0 && (
        <section id="services" className="py-24 sm:py-32 bg-[#fafafa] border-t border-b border-black/5 scroll-mt-0">
          <div className="max-w-6xl mx-auto px-6 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 
                className="text-3xl sm:text-6xl font-extrabold uppercase tracking-tight"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                SERVICES
              </h2>
            </motion.div>

            <div className="divide-y divide-black/10">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:pl-2 transition-all duration-300"
                >
                  <div className="flex items-center space-x-8">
                    <span 
                      className="text-xl sm:text-2xl font-bold text-black/40 group-hover:text-black transition-colors"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {service.num}
                    </span>
                    <h3 
                      className="text-2xl sm:text-4xl font-extrabold tracking-tight uppercase"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {service.title}
                    </h3>
                  </div>

                  <p 
                    className="text-sm sm:text-base text-black/60 max-w-md font-normal leading-relaxed"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SECTION: WORKS / PROJECTS                                     */}
      {/* ------------------------------------------------------------- */}
      {projects.length > 0 && (
        <section id="works" className="py-24 sm:py-32 bg-white text-[#111111] scroll-mt-0">
          <div className="max-w-6xl mx-auto px-6 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 
                className="text-3xl sm:text-6xl font-extrabold uppercase tracking-tight"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                SELECTED WORKS
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group flex flex-col justify-between"
                >
                  <div>
                    {project.image && (
                      <div className="overflow-hidden mb-6 aspect-[4/3] bg-black/5 relative">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-2">
                      <span 
                        className="text-xs font-bold uppercase tracking-widest text-black/50"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {project.category}
                      </span>
                      {project.year && (
                        <span className="text-xs text-black/40 font-mono">
                          {project.year}
                        </span>
                      )}
                    </div>

                    <h3 
                      className="text-2xl sm:text-3xl font-extrabold mb-3 group-hover:text-black/80 transition-colors"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {project.title}
                    </h3>

                    <p 
                      className="text-sm sm:text-base text-black/70 mb-6 font-normal leading-relaxed"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-center space-x-6 pt-4 border-t border-black/10">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-black hover:underline"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        <span>View Project</span>
                        <ArrowUpRight size={16} />
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-black/60 hover:text-black"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        <span>Source Code</span>
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SECTION: BLOG                                                 */}
      {/* ------------------------------------------------------------- */}
      {blogPosts.length > 0 && (
        <section id="blog" className="py-24 sm:py-32 bg-[#fafafa] border-t border-b border-black/5 scroll-mt-0">
          <div className="max-w-6xl mx-auto px-6 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 
                className="text-3xl sm:text-6xl font-extrabold uppercase tracking-tight"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                LATEST ARTICLES
              </h2>
            </motion.div>

            <div className="divide-y divide-black/10">
              {blogPosts.map((post: any, index: number) => (
                <motion.a
                  key={post.id || index}
                  href={post.link || '#'}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 group block text-decoration-none"
                >
                  <div>
                    <span 
                      className="text-xs font-bold uppercase tracking-widest text-black/40 mb-2 block"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {post.category} — {post.date}
                    </span>
                    <h3 
                      className="text-xl sm:text-3xl font-extrabold text-[#111111] group-hover:underline"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {post.title}
                    </h3>
                  </div>
                  <ArrowUpRight size={24} className="text-black/40 group-hover:text-black transition-colors self-start md:self-auto" />
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SECTION: CONTACT                                              */}
      {/* ------------------------------------------------------------- */}
      <section id="contact" className="py-24 sm:py-36 bg-white text-[#111111] scroll-mt-0">
        <div className="max-w-6xl mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 
              className="text-4xl sm:text-7xl lg:text-8xl font-extrabold uppercase tracking-tight mb-8"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              LET'S WORK TOGETHER.
            </h2>

            <a
              href={`mailto:${profile.email}`}
              className="text-2xl sm:text-5xl font-extrabold tracking-tight text-[#111111] underline hover:opacity-80 transition-opacity block mb-6"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {profile.email}
            </a>

            <div className="flex flex-wrap gap-8 pt-6 text-sm font-medium text-black/70">
              {profile.phone && (
                <div className="flex items-center space-x-2">
                  <Phone size={18} />
                  <span>{profile.phone}</span>
                </div>
              )}
              {profile.location && (
                <div className="flex items-center space-x-2">
                  <MapPin size={18} />
                  <span>{profile.location}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* MOBILE NAVIGATION OVERLAY                                     */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#111111] text-white flex flex-col justify-center items-center px-8"
          >
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-8 right-8 text-white hover:text-white/70 transition-colors p-2 cursor-pointer focus:outline-none"
            >
              <X size={36} />
            </button>

            <nav className="flex flex-col space-y-8 text-center max-w-md w-full">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="text-3xl sm:text-5xl font-extrabold tracking-widest text-white hover:opacity-70 transition-opacity uppercase border-none bg-transparent cursor-pointer focus:outline-none"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
