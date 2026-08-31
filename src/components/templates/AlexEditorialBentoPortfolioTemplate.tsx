import React, { useState, useMemo } from 'react';
import { PortfolioData, LayoutConfiguration, ExperienceItem, ProjectItem, ProfileData, SocialLinks, ContactData, AboutData } from '../../types';
import { 
  Menu, X, Play, ArrowUpRight, Github, Linkedin, Twitter, Mail, ExternalLink, MapPin, Phone 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AlexEditorialBentoPortfolioTemplateProps {
  data: PortfolioData;
  config?: LayoutConfiguration;
}

// -------------------------------------------------------------
// ALEX EDITORIAL BENTO PORTFOLIO #013 DATA ADAPTER
// -------------------------------------------------------------
const useAlexBentoAdapter = (data: PortfolioData) => {
  return useMemo(() => {
    const rawProfile = (data.profile || {}) as Partial<ProfileData>;
    const rawSocial = (data.socialLinks || {}) as Partial<SocialLinks>;
    const rawContact = (data.contact || {}) as Partial<ContactData>;
    const rawAbout = (data.about || {}) as Partial<AboutData>;

    const name = rawProfile.name || 'Alex Carter';
    const email = rawContact.email || rawProfile.email || 'hey.@alexcarter.com';
    const profileImage = rawProfile.profilePhoto || 
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80';

    const role = rawProfile.title || 'Product Lead';
    const company = (data as any).company || 'Apple Design.';
    const intro = rawProfile.bio || rawAbout.aboutText || 
      'Feel free to explore my portfolio and reach out — I’d love to connect!';

    const availableForWork = (data as any).availableForWork !== false;
    const bookingUrl = (data as any).bookingUrl || rawProfile.website || '';

    // Experience timeline adapter
    const experience = (data.experience || []).map((exp: ExperienceItem, idx: number) => ({
      id: exp.id || `exp-${idx}`,
      year: exp.duration ? exp.duration.split('-')[0].trim() : '2024',
      role: exp.role || 'Product Lead',
      company: exp.company || 'Apple',
      type: exp.description ? exp.description.slice(0, 30) : 'On-site · Full time'
    }));

    const displayExperience = experience.length > 0 ? experience : [
      { id: '1', year: '2025', role: 'Product Lead', company: 'Apple', type: 'Remote · Full time' },
      { id: '2', year: '2024', role: 'Product Lead', company: 'Apple', type: 'On-site · Full time' },
      { id: '3', year: '2023', role: 'Product Designer', company: 'Apple', type: 'Hybrid · Part time' },
      { id: '4', year: '2022', role: 'UI-UX Designer', company: 'Apple', type: 'Remote · Full time' }
    ];

    // Playlist adapter
    const playlist = (data as any).playlist || {
      title: `${name.split(' ')[0]}'s Playlist`,
      spotifyUrl: 'https://spotify.com',
      tracks: [
        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=200&q=80',
        'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=200&q=80',
        'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=200&q=80'
      ]
    };

    // Current reading adapter
    const currentBook = (data as any).currentBook || {
      title: 'Dieter Rams',
      subtitle: 'The Complete Works',
      author: 'Klaus Klemp',
      coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80'
    };

    // Location & map adapter
    const location = (data as any).locationDetails || {
      city: (rawProfile.location || 'Montreal').split(',')[0].trim(),
      country: (rawProfile.location || 'Canada').split(',')[1]?.trim() || 'Canada',
      coordinates: '45.5017° N, 73.5673° W',
      mapImage: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=80'
    };

    // Work process adapter
    const processList = (data as any).process || [
      {
        title: 'Discovery Call',
        description: 'In the first stage, we discuss your goals, needs, and project requirements to align our vision and set the foundation for a successful collaboration.'
      },
      {
        title: 'Research & Strategy',
        description: 'We explore user personas, market opportunities, and technical requirements to establish a crisp strategic direction.'
      },
      {
        title: 'Design & Prototyping',
        description: 'We transform strategy into high-fidelity, interactive prototypes and accessible visual design systems.'
      },
      {
        title: 'Development & Build',
        description: 'The approved design is turned into performant, clean, and scalable frontend architecture.'
      },
      {
        title: 'Launch & Iteration',
        description: 'After thorough quality assurance and user testing, the product is deployed with post-launch analytics.'
      }
    ];

    const socialLinks = {
      github: rawSocial.github || '',
      linkedin: rawSocial.linkedin || '',
      twitter: rawSocial.twitter || '',
      website: rawSocial.website || rawProfile.website || '',
    };

    const projects = (data.projects || []).map((p: ProjectItem, idx: number) => ({
      id: p.id || `project-${idx}`,
      title: p.name || `Project ${idx + 1}`,
      description: p.description || 'Clean editorial web experience.',
      image: p.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
      liveUrl: p.liveUrl || '',
      githubUrl: p.githubUrl || ''
    }));

    return {
      name,
      email,
      profileImage,
      role,
      company,
      intro,
      availableForWork,
      bookingUrl,
      experience: displayExperience,
      playlist,
      currentBook,
      location,
      process: processList,
      socialLinks,
      projects
    };
  }, [data]);
};

export const AlexEditorialBentoPortfolioTemplate: React.FC<AlexEditorialBentoPortfolioTemplateProps> = ({ data, config }) => {
  const adapterData = useAlexBentoAdapter(data);
  const { 
    name, email, profileImage, role, company, intro, availableForWork, 
    bookingUrl, experience, playlist, currentBook, location, process: processSteps,
    socialLinks, projects
  } = adapterData;

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const orangeAccent = config?.accentColor || '#f47721';

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBooking = () => {
    if (bookingUrl) {
      window.open(bookingUrl, '_blank', 'noopener,noreferrer');
    } else {
      scrollTo('contact');
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f1f0] text-[#0b0b0b] font-sans p-4 sm:p-8 md:p-12 selection:bg-[#f47721] selection:text-white">
      {/* Centered Portfolio Surface */}
      <div className="max-w-[1160px] mx-auto bg-white rounded-xl shadow-sm border border-[#e5e5e5] px-6 sm:px-12 md:px-16 py-12 md:py-16">
        
        {/* ------------------------------------------------------------- */}
        {/* HEADER                                                        */}
        {/* ------------------------------------------------------------- */}
        <header className="flex items-center justify-between mb-12 sm:mb-16">
          <a
            href={`mailto:${email}`}
            className="flex items-center space-x-2 text-sm font-medium text-[#0b0b0b] hover:opacity-80 transition-opacity"
          >
            {/* Minimal Geometric Logo */}
            <span className="w-8 h-8 flex items-center justify-center">
              <svg viewBox="0 0 40 40" className="w-7 h-7 text-[#0b0b0b]">
                <path
                  d="M20 5 L34 28 Q35 31 31 31 H9 Q5 31 7 28 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
            </span>

            {/* Small Orange Dot Accent */}
            <span 
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: orangeAccent }}
            />

            <span className="underline underline-offset-4">{email}</span>
          </a>

          {/* Minimal Round Menu Trigger */}
          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setMenuOpen(true)}
            className="w-11 h-11 rounded-full border border-[#eeeeee] bg-white hover:bg-[#fafafa] flex items-center justify-center shadow-xs transition-transform hover:scale-105 cursor-pointer focus:outline-none"
          >
            <Menu size={18} className="text-[#0b0b0b]" />
          </button>
        </header>

        {/* ------------------------------------------------------------- */}
        {/* HERO SECTION                                                 */}
        {/* ------------------------------------------------------------- */}
        <section id="home" className="max-w-[760px] mx-auto mb-16 sm:mb-20">
          <h1 className="text-4xl sm:text-6xl md:text-[64px] font-bold tracking-tight leading-[0.98] text-[#0a0a0a] mb-3">
            <span>Hi, I’m </span>
            <span className="inline-flex items-center space-x-3 ml-1 align-baseline">
              <img
                src={profileImage}
                alt={`${name} profile`}
                className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-2xl border border-black/10 shadow-xs inline-block align-middle -mt-1"
              />
              <span>{name}!</span>
            </span>
          </h1>

          <div className="text-3xl sm:text-4xl md:text-[48px] font-semibold tracking-tight leading-tight mt-3">
            <span className="text-[#b8b8b8]">I’m a </span>
            <span className="text-[#0b0b0b]">{role} </span>
            <span className="text-[#b8b8b8]">at</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-2 mb-8">
            <span 
              className="text-3xl sm:text-4xl md:text-[48px] font-semibold tracking-tight leading-none"
              style={{ color: orangeAccent }}
            >
              {company}
            </span>

            {availableForWork && (
              <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#dedede] text-xs font-medium text-[#0b0b0b] bg-white shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
                <span>Open to work</span>
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mt-8">
            <button
              type="button"
              onClick={handleBooking}
              className="px-6 py-3.5 rounded-full bg-[#0b0b0b] hover:bg-[#222222] text-white text-sm font-semibold tracking-wide transition-all hover:-translate-y-0.5 cursor-pointer border-none shadow-sm"
            >
              Book a call
            </button>

            <p className="text-sm sm:text-base text-[#111111] max-w-sm leading-relaxed">
              {intro}
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* BENTO GRID                                                   */}
        {/* ------------------------------------------------------------- */}
        <section id="work" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          
          {/* Card 1: Experience Timeline */}
          <article className="bg-white rounded-2xl p-5 border border-[#eeeeee] shadow-2xs flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-semibold text-[#888888] uppercase tracking-wider mb-4">
                My Experience
              </h3>

              <div className="space-y-3.5">
                {experience.slice(0, 4).map((item, idx) => (
                  <div key={item.id || idx} className="relative pl-4 border-l border-[#dedede]">
                    <div className="absolute -left-[4px] top-1.5 w-1.5 h-1.5 rounded-full bg-[#0b0b0b]" />
                    <strong className="block text-xs font-semibold text-[#0b0b0b]">
                      {item.role} at {item.company}
                    </strong>
                    <span className="block text-[10px] text-[#aaaaaa] mt-0.5 font-mono">
                      {item.year} · {item.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* Card 2: Spotify Playlist */}
          <article className="bg-white rounded-2xl p-5 border border-[#eeeeee] shadow-2xs flex flex-col justify-between min-h-[220px]">
            <h3 className="text-xs font-semibold text-[#888888] uppercase tracking-wider mb-2">
              My music playlist
            </h3>

            <div className="relative h-24 my-2 flex items-center justify-center">
              {playlist.tracks && playlist.tracks.slice(0, 3).map((imgUrl: string, idx: number) => (
                <img
                  key={idx}
                  src={imgUrl}
                  alt="Track art"
                  className={`absolute w-20 h-20 object-cover rounded-xl border-2 border-white shadow-md transition-transform hover:scale-105 ${
                    idx === 0 ? '-translate-x-12 -rotate-6' : idx === 1 ? 'z-10 scale-105' : 'translate-x-12 rotate-6'
                  }`}
                />
              ))}
            </div>

            <div className="text-center pt-2">
              <strong className="block text-xs font-bold text-[#0b0b0b]">
                {playlist.title}
              </strong>
              {playlist.spotifyUrl && (
                <a
                  href={playlist.spotifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1 text-[10px] font-medium text-[#444444] hover:text-[#0b0b0b] mt-1"
                >
                  <Play size={10} className="fill-current" />
                  <span>Play on Spotify</span>
                </a>
              )}
            </div>
          </article>

          {/* Card 3: What I'm Reading */}
          <article className="bg-white rounded-2xl p-5 border border-[#eeeeee] shadow-2xs flex flex-col justify-between min-h-[220px]">
            <h3 className="text-xs font-semibold text-[#888888] uppercase tracking-wider mb-2">
              What I'm reading
            </h3>

            <div className="flex items-center justify-between gap-4 mt-1">
              <div>
                <strong className="block text-xs font-bold text-[#0b0b0b]">
                  {currentBook.title}
                </strong>
                <span className="block text-[11px] font-semibold text-[#333333] mt-0.5">
                  {currentBook.subtitle}
                </span>
                <small className="block text-[10px] text-[#999999] mt-1">
                  {currentBook.author}
                </small>
              </div>

              {currentBook.coverImage && (
                <img
                  src={currentBook.coverImage}
                  alt={currentBook.title}
                  className="w-20 h-24 object-cover rounded-lg border border-black/5 shadow-xs shrink-0"
                />
              )}
            </div>
          </article>

          {/* Card 4: Location Map */}
          <article className="bg-white rounded-2xl p-5 border border-[#eeeeee] shadow-2xs overflow-hidden flex flex-col justify-between">
            <h3 className="text-xs font-semibold text-[#888888] uppercase tracking-wider mb-3">
              Location Map
            </h3>

            {location.mapImage && (
              <img
                src={location.mapImage}
                alt={`Map of ${location.city}`}
                className="w-full h-24 object-cover rounded-lg grayscale opacity-80 border border-black/5 mb-3"
              />
            )}

            <div className="text-center tracking-widest">
              <strong className="block text-sm font-extrabold text-[#0b0b0b] uppercase">
                {location.city}
              </strong>
              <span className="block text-[10px] font-bold text-[#666666] uppercase mt-0.5">
                {location.country}
              </span>
              <small className="block text-[9px] text-[#aaaaaa] font-mono mt-1">
                {location.coordinates}
              </small>
            </div>
          </article>

          {/* Card 5: How I Work Process */}
          <article className="bg-white rounded-2xl p-5 border border-[#eeeeee] shadow-2xs md:col-span-2 flex flex-col justify-between min-h-[220px]">
            <div>
              <h3 className="text-xs font-semibold text-[#888888] uppercase tracking-wider mb-3">
                How I work
              </h3>

              <div className="min-h-[80px]">
                <h4 className="text-base font-bold text-[#0b0b0b] mb-1.5">
                  0{activeStep + 1} {processSteps[activeStep]?.title}
                </h4>
                <p className="text-xs text-[#666666] leading-relaxed max-w-xl">
                  {processSteps[activeStep]?.description}
                </p>
              </div>
            </div>

            {/* Step Tabs */}
            <div className="flex flex-wrap gap-1.5 pt-4 mt-2 border-t border-[#f0f0f0]">
              {processSteps.map((step: any, index: number) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveStep(index)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-colors cursor-pointer border-none ${
                    index === activeStep 
                      ? 'bg-[#0b0b0b] text-white' 
                      : 'bg-[#f5f5f5] text-[#555555] hover:bg-[#e8e8e8]'
                  }`}
                >
                  Step {String(index + 1).padStart(2, '0')}
                </button>
              ))}
            </div>
          </article>

        </section>

        {/* ------------------------------------------------------------- */}
        {/* PROJECTS SECTION (If user has additional portfolio works)    */}
        {/* ------------------------------------------------------------- */}
        {projects.length > 0 && (
          <section id="projects" className="pt-10 border-t border-[#eeeeee] mb-16">
            <h2 className="text-xs font-semibold text-[#888888] uppercase tracking-wider mb-6">
              Featured Projects
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="group">
                  {project.image && (
                    <div className="overflow-hidden rounded-2xl border border-black/5 mb-4 aspect-video bg-black/5">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-[#0b0b0b] mb-1">
                    {project.title}
                  </h3>

                  <p className="text-xs text-[#666666] leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <div className="flex items-center space-x-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1 text-xs font-semibold text-[#0b0b0b] hover:underline"
                      >
                        <span>Live Preview</span>
                        <ArrowUpRight size={14} />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1 text-xs font-medium text-[#777777] hover:text-[#0b0b0b]"
                      >
                        <span>Repository</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------- */}
        {/* CONTACT SECTION                                              */}
        {/* ------------------------------------------------------------- */}
        <section id="contact" className="pt-12 border-t border-[#eeeeee]">
          <span className="text-xs font-medium text-[#888888] block mb-2">
            Let's work together.
          </span>

          <a
            href={`mailto:${email}`}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#0b0b0b] hover:opacity-80 transition-opacity inline-flex items-center space-x-2"
          >
            <span>{email}</span>
            <ArrowUpRight size={32} className="text-[#0b0b0b]" />
          </a>
        </section>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* NAVIGATION OVERLAY                                            */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-white/98 flex flex-col justify-center items-center px-8"
          >
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setMenuOpen(false)}
              className="absolute top-8 right-8 w-12 h-12 rounded-full border border-[#dedede] bg-white flex items-center justify-center cursor-pointer hover:bg-[#fafafa]"
            >
              <X size={20} className="text-[#0b0b0b]" />
            </button>

            <nav className="flex flex-col space-y-6 text-center">
              {[
                { label: 'HOME', id: 'home' },
                { label: 'WORK', id: 'work' },
                { label: 'PROCESS', id: 'process' },
                { label: 'CONTACT', id: 'contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className="text-4xl sm:text-6xl font-bold tracking-tight text-[#0b0b0b] transition-colors border-none bg-transparent cursor-pointer"
                  onMouseEnter={(e) => (e.currentTarget.style.color = orangeAccent)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#0b0b0b')}
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
