import React, { useState, useMemo } from 'react';
import { PortfolioData, LayoutConfiguration, ProjectItem, ProfileData, SocialLinks, ContactData, AboutData } from '../../types';
import { 
  Facebook, Twitter, Linkedin, Dribbble, Instagram, Github, X, 
  ExternalLink, ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DanielCinematicPortfolioTemplateProps {
  data: PortfolioData;
  config?: LayoutConfiguration;
}

// -------------------------------------------------------------
// DANIEL CINEMATIC PORTFOLIO #011 DATA ADAPTER
// -------------------------------------------------------------
const useDanielAdapter = (data: PortfolioData) => {
  return useMemo(() => {
    const rawProfile = (data.profile || {}) as Partial<ProfileData>;
    const rawSocial = (data.socialLinks || {}) as Partial<SocialLinks>;
    const rawContact = (data.contact || {}) as Partial<ContactData>;
    const rawAbout = (data.about || {}) as Partial<AboutData>;

    // Hero background photo fallback (high quality dark cinematic landscape)
    const heroImage = rawProfile.profilePhoto || 
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80';

    // Formatted name splitting
    const fullName = rawProfile.name || 'Daniel';
    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0] || 'Daniel';
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    const profile = {
      fullName,
      firstName,
      lastName,
      role: rawProfile.title || 'Freelance UI/UX Designer and Developer',
      location: rawProfile.location || 'London, England',
      bio: rawProfile.bio || rawAbout.aboutText || 
        'I create thoughtful digital experiences combining design, technology, and storytelling. Focused on bold editorial typography, cinematic visual rhythm, and clean architecture.',
      email: rawContact.email || rawProfile.email || 'contact@daniel.net',
      phone: rawContact.phone || '+216 21 184 010 32',
      heroImage,
    };

    const socialLinks = {
      facebook: (rawSocial as Record<string, any>).facebook || '#',
      twitter: rawSocial.twitter || '#',
      linkedin: rawSocial.linkedin || '#',
      dribbble: rawSocial.dribbble || '#',
      instagram: (rawSocial as Record<string, any>).instagram || '#',
      github: rawSocial.github || '#',
    };

    const projects = (data.projects || []).map((p: ProjectItem, idx: number) => {
      let stack: string[] = [];
      if (Array.isArray(p.technologies) && p.technologies.length > 0) {
        stack = p.technologies;
      } else if (typeof p.technologies === 'string') {
        stack = (p.technologies as string).split(',').map(s => s.trim());
      } else {
        stack = ['UI/UX', 'Design System', 'React'];
      }

      return {
        id: p.id || `project-${idx}`,
        title: p.name || `Project ${idx + 1}`,
        description: p.description || 'Editorial digital experience designed with cinematic visual direction and clean performance.',
        stack,
        githubUrl: p.githubUrl || '',
        liveUrl: p.liveUrl || '',
        image: p.image || `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80`,
        year: p.year || '2024',
      };
    });

    const servicesList = (data.services && data.services.length > 0)
      ? data.services
      : (rawAbout.services && rawAbout.services.length > 0)
        ? rawAbout.services
        : [
            'UI/UX & Product Design',
            'Frontend Development & Architecture',
            'Creative Direction & Visual Identity',
            'Motion & Interactive Design'
          ];

    const services = servicesList.map((srv, idx) => {
      if (typeof srv === 'string') {
        return {
          id: `srv-${idx}`,
          title: srv,
          number: `0${idx + 1}`,
          description: 'Crafting high-end web applications with meticulous attention to typography, spatial grid systems, and intuitive user journeys.'
        };
      }
      return srv;
    });

    return {
      profile,
      socialLinks,
      projects,
      services,
    };
  }, [data]);
};

export const DanielCinematicPortfolioTemplate: React.FC<DanielCinematicPortfolioTemplateProps> = ({ data, config }) => {
  const { profile, socialLinks, projects, services } = useDanielAdapter(data);
  const [menuOpen, setMenuOpen] = useState(false);

  // Accent Orange Color as specified in template: #ff5428
  const accentOrange = config?.accentColor || '#ff5428';

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white font-sans selection:bg-[#ff5428] selection:text-white relative overflow-x-hidden border-2 border-[#111111]">

      {/* ------------------------------------------------------------- */}
      {/* HERO SECTION                                                 */}
      {/* ------------------------------------------------------------- */}
      <section 
        id="home"
        className="relative min-h-screen h-screen w-full flex items-center justify-center bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url('${profile.heroImage}')`,
        }}
      >
        {/* Dark Cinematic Photographic Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* Decorative Orange Dot Pattern (Top-Left) */}
        <div 
          className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 grid grid-cols-6 gap-3 w-28 sm:w-32 opacity-90 pointer-events-none"
          aria-hidden="true"
        >
          {Array.from({ length: 42 }).map((_, i) => (
            <span
              key={i}
              className="w-1 h-1 rounded-full transition-opacity duration-300"
              style={{ backgroundColor: accentOrange }}
            />
          ))}
        </div>

        {/* Hamburger Menu Button (Top-Right) */}
        <button
          type="button"
          aria-label="Open navigation"
          onClick={() => setMenuOpen(true)}
          className="absolute top-6 right-6 sm:top-10 sm:right-10 z-30 w-14 h-14 sm:w-16 sm:h-16 bg-[#1e1e1e]/80 hover:bg-[#111111]/95 transition-all duration-300 flex flex-col items-center justify-center gap-1.5 cursor-pointer shadow-lg hover:-translate-y-0.5 border border-white/5 focus:outline-none"
        >
          <span className="w-7 h-[2px] bg-white transition-transform" />
          <span className="w-7 h-[2px] bg-white transition-transform" />
          <span className="w-7 h-[2px] bg-white transition-transform" />
        </button>

        {/* Main Hero Content */}
        <div className="relative z-20 text-center max-w-5xl mx-auto px-6 -mt-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-4xl sm:text-7xl md:text-8xl lg:text-[100px] font-serif font-medium tracking-tight leading-[0.98] mb-6 text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Hi ! I’m{' '}
            <span style={{ color: accentOrange }}>
              {profile.fullName}.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="font-mono text-xs sm:text-base md:text-lg text-white/90 max-w-3xl mx-auto tracking-wider leading-relaxed mb-10"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            I'm a {profile.role} based in {profile.location}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          >
            <button
              type="button"
              onClick={() => scrollTo('about')}
              className="w-56 sm:w-64 h-14 sm:h-16 font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl cursor-pointer border-none"
              style={{ 
                backgroundColor: accentOrange,
                fontFamily: "'Space Mono', monospace"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e94720')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = accentOrange)}
            >
              MORE ABOUT ME
            </button>
          </motion.div>
        </div>

        {/* Bottom-Left Contact Area */}
        <div 
          className="absolute bottom-6 left-6 sm:bottom-10 sm:left-12 z-20 flex flex-col space-y-1 font-mono text-xs sm:text-sm tracking-wide"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          <span className="text-white/80">Let's work together</span>
          <a
            href={`mailto:${profile.email}`}
            className="transition-colors hover:underline"
            style={{ color: accentOrange }}
          >
            {profile.email}
          </a>
          <a
            href={`tel:${profile.phone.replace(/\s/g, '')}`}
            className="text-white hover:underline transition-colors"
          >
            {profile.phone}
          </a>
        </div>

        {/* Bottom-Right Social Icons */}
        <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-12 z-20 flex items-center space-x-5 text-white/90">
          {socialLinks.github && socialLinks.github !== '#' && (
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="transition-all hover:opacity-60 hover:-translate-y-0.5"
            >
              <Github size={19} />
            </a>
          )}
          {socialLinks.linkedin && socialLinks.linkedin !== '#' && (
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="transition-all hover:opacity-60 hover:-translate-y-0.5"
            >
              <Linkedin size={19} />
            </a>
          )}
          {socialLinks.twitter && socialLinks.twitter !== '#' && (
            <a
              href={socialLinks.twitter}
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="transition-all hover:opacity-60 hover:-translate-y-0.5"
            >
              <Twitter size={19} />
            </a>
          )}
          {socialLinks.dribbble && socialLinks.dribbble !== '#' && (
            <a
              href={socialLinks.dribbble}
              target="_blank"
              rel="noreferrer"
              aria-label="Dribbble"
              className="transition-all hover:opacity-60 hover:-translate-y-0.5"
            >
              <Dribbble size={19} />
            </a>
          )}
          {socialLinks.instagram && socialLinks.instagram !== '#' && (
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="transition-all hover:opacity-60 hover:-translate-y-0.5"
            >
              <Instagram size={19} />
            </a>
          )}
          {socialLinks.facebook && socialLinks.facebook !== '#' && (
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="transition-all hover:opacity-60 hover:-translate-y-0.5"
            >
              <Facebook size={19} />
            </a>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 01: ABOUT                                            */}
      {/* ------------------------------------------------------------- */}
      <section id="about" className="py-24 sm:py-32 bg-[#111111] border-t border-white/5 scroll-mt-0">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span 
              className="font-mono text-sm uppercase tracking-widest block mb-4"
              style={{ color: accentOrange, fontFamily: "'Space Mono', monospace" }}
            >
              01
            </span>

            <h2 
              className="text-4xl sm:text-7xl lg:text-8xl font-serif font-medium tracking-tight mb-8 leading-[0.95]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              About Me
            </h2>

            <p 
              className="font-mono text-base sm:text-xl text-white/80 max-w-3xl leading-relaxed"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              {profile.bio}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 02: PROJECTS                                         */}
      {/* ------------------------------------------------------------- */}
      {projects.length > 0 && (
        <section id="projects" className="py-24 sm:py-32 bg-[#111111] border-t border-white/5 scroll-mt-0">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <span 
                className="font-mono text-sm uppercase tracking-widest block mb-4"
                style={{ color: accentOrange, fontFamily: "'Space Mono', monospace" }}
              >
                02
              </span>

              <h2 
                className="text-4xl sm:text-7xl lg:text-8xl font-serif font-medium tracking-tight leading-[0.95]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Projects
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#181818] border border-white/5 p-8 flex flex-col justify-between group hover:border-white/20 transition-all duration-300"
                >
                  <div>
                    {project.image && (
                      <div className="overflow-hidden mb-6 aspect-video bg-black/40 relative">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-3">
                      <h3 
                        className="text-2xl sm:text-3xl font-serif font-medium"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      >
                        {project.title}
                      </h3>
                      {project.year && (
                        <span 
                          className="font-mono text-xs text-white/40"
                          style={{ fontFamily: "'Space Mono', monospace" }}
                        >
                          {project.year}
                        </span>
                      )}
                    </div>

                    <p 
                      className="font-mono text-xs sm:text-sm text-white/70 mb-6 leading-relaxed"
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    >
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {project.stack.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.stack.map((tech, tIdx) => (
                          <span 
                            key={tIdx}
                            className="font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 bg-white/5 border border-white/5 text-white/80"
                            style={{ fontFamily: "'Space Mono', monospace" }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center space-x-4 pt-4 border-t border-white/5">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center space-x-1.5 font-mono text-xs font-bold uppercase tracking-wider hover:underline"
                          style={{ color: accentOrange, fontFamily: "'Space Mono', monospace" }}
                        >
                          <span>Live Demo</span>
                          <ArrowUpRight size={14} />
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center space-x-1.5 font-mono text-xs text-white/70 uppercase tracking-wider hover:text-white"
                          style={{ fontFamily: "'Space Mono', monospace" }}
                        >
                          <span>GitHub</span>
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SECTION 03: SERVICES                                         */}
      {/* ------------------------------------------------------------- */}
      {services.length > 0 && (
        <section id="services" className="py-24 sm:py-32 bg-[#111111] border-t border-white/5 scroll-mt-0">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <span 
                className="font-mono text-sm uppercase tracking-widest block mb-4"
                style={{ color: accentOrange, fontFamily: "'Space Mono', monospace" }}
              >
                03
              </span>

              <h2 
                className="text-4xl sm:text-7xl lg:text-8xl font-serif font-medium tracking-tight leading-[0.95]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Services
              </h2>
            </motion.div>

            <div className="space-y-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="p-8 bg-[#181818] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-start space-x-6">
                    <span 
                      className="font-mono text-base font-bold"
                      style={{ color: accentOrange, fontFamily: "'Space Mono', monospace" }}
                    >
                      {service.number}
                    </span>
                    <div>
                      <h3 
                        className="text-2xl sm:text-3xl font-serif font-medium mb-2"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      >
                        {service.title}
                      </h3>
                      <p 
                        className="font-mono text-xs sm:text-sm text-white/60 max-w-xl leading-relaxed"
                        style={{ fontFamily: "'Space Mono', monospace" }}
                      >
                        {service.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SECTION 04: CONTACT                                          */}
      {/* ------------------------------------------------------------- */}
      <section id="contact" className="py-24 sm:py-36 bg-[#111111] border-t border-white/5 scroll-mt-0">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span 
              className="font-mono text-sm uppercase tracking-widest block mb-4"
              style={{ color: accentOrange, fontFamily: "'Space Mono', monospace" }}
            >
              04
            </span>

            <h2 
              className="text-4xl sm:text-7xl lg:text-8xl font-serif font-medium tracking-tight mb-8 leading-[0.95]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Let's work together.
            </h2>

            <a
              href={`mailto:${profile.email}`}
              className="font-mono text-xl sm:text-4xl md:text-5xl font-bold tracking-tight inline-block transition-colors hover:underline"
              style={{ color: accentOrange, fontFamily: "'Space Mono', monospace" }}
            >
              {profile.email}
            </a>
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* NAVIGATION OVERLAY                                            */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#111111] flex flex-col justify-center items-center px-8"
          >
            {/* Close Button */}
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 sm:top-10 sm:right-10 w-14 h-14 bg-transparent text-white hover:text-[#ff5428] transition-colors flex items-center justify-center cursor-pointer focus:outline-none"
            >
              <X size={36} />
            </button>

            {/* Nav List */}
            <nav className="flex flex-col space-y-6 sm:space-y-8 max-w-3xl w-full">
              {[
                { label: 'HOME', id: 'home', num: '01' },
                { label: 'ABOUT', id: 'about', num: '02' },
                { label: 'PROJECTS', id: 'projects', num: '03' },
                { label: 'SERVICES', id: 'services', num: '04' },
                { label: 'CONTACT', id: 'contact', num: '05' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className="group text-left border-none bg-transparent cursor-pointer flex items-center space-x-6 focus:outline-none"
                >
                  <span 
                    className="font-mono text-sm sm:text-xl font-bold"
                    style={{ color: accentOrange, fontFamily: "'Space Mono', monospace" }}
                  >
                    {item.num}
                  </span>
                  <span 
                    className="text-3xl sm:text-6xl lg:text-7xl font-serif font-medium text-white transition-colors group-hover:text-[#ff5428]"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {item.label}
                  </span>
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
