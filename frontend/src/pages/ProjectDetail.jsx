import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectBySlug, clearSelectedProject } from '../store/projectSlice';
import { openEnquiryModal } from '../store/enquirySlice';
import { pageVariants } from '../animations/pageTransitions';
import ImageLightbox from '../Components/ui/ImageLightbox';
import {
  Compass, MapPin, Building2, Calendar, FileText, ChevronDown, Video,
  CheckCircle, Landmark, ShieldCheck, Download, Award, Trees, Sparkles
} from 'lucide-react';

export const ProjectDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { selectedProject: project, selectedLoading: loading, selectedError: error } = useSelector((state) => state.projects);

  const [activeTab, setActiveTab] = useState('overview');
  const [openSpecCategory, setOpenSpecCategory] = useState(0);

  // Fetch project details on load
  useEffect(() => {
    dispatch(fetchProjectBySlug(slug));
    return () => {
      dispatch(clearSelectedProject());
    };
  }, [dispatch, slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center flex-col gap-4">
        <span className="font-display text-4xl font-extrabold text-primary tracking-widest animate-pulse">
          VOORA
        </span>
        <div className="w-16 h-0.5 bg-secondary animate-bounce" />
        <p className="text-xs text-text-muted uppercase tracking-widest font-extrabold">Retrieving Landmark Details...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center flex-col p-4 text-center">
        <Building2 className="text-primary mb-4 animate-pulse" size={48} />
        <h2 className="font-display text-3xl font-black text-primary uppercase tracking-tight">Landmark Not Found</h2>
        <p className="text-text-muted text-xs mt-2 max-w-sm uppercase tracking-wider font-semibold">
          We could not locate this project. It might have been moved or archived.
        </p>
        <Link to="/projects" className="btn-gold text-xs px-6 py-2.5 mt-6 font-bold tracking-widest cursor-pointer shadow-lg">
          Browse Active Projects
        </Link>
      </div>
    );
  }

  const {
    name, location, price, type, status, bhkTypes, sizeRange,
    totalUnits, landArea, floors, heroImage, overview, amenities,
    specifications, nearbyPlaces, faqs, videoUrl, mapEmbed, images
  } = project;

  const internalTabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'amenities', name: 'Amenities' },
    { id: 'walkthrough', name: 'Walkthrough' },
    { id: 'specifications', name: 'Specifications' },
    { id: 'gallery', name: 'Gallery' },
    { id: 'faqs', name: 'FAQs' }
  ];

  // Helper to scroll to section
  const scrollToSection = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 140; // accounted for sticky headers
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Safe fallback list of images
  const allGalleryImages = [
    heroImage,
    ...(images?.exterior || []),
    ...(images?.interior || []),
    ...(images?.siteProgress || [])
  ].filter(Boolean);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full relative bg-surface overflow-x-hidden"
    >
      <Helmet>
        <title>{`${name} | ${location} — Voora Real Estate`}</title>
        <meta name="description" content={`Discover ${name} in ${location}. Features: ${bhkTypes?.join(' / ')} starting ${price}. Explore specifications, virtual walkthroughs, and map locations.`} />
      </Helmet>

      {/* Decorative glowing blobs */}
      <div className="absolute top-[15%] right-[-10%] w-[45%] h-[45%] rounded-full bg-primary/5 blur-[120px] pointer-events-none select-none" />
      <div className="absolute bottom-[25%] left-[-10%] w-[35%] h-[35%] rounded-full bg-secondary/5 blur-[100px] pointer-events-none select-none" />

      {/* SECTION 1: HERO CONTAINER */}
      <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden flex items-end">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'}
            alt={name}
            className="w-full h-full object-cover"
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/45 to-transparent z-10" />
        </div>

        {/* Title details */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full relative z-20 pb-12">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-4.5 py-1.5 rounded-full bg-primary/10 border border-primary/15 text-primary text-[10px] font-extrabold uppercase tracking-widest mb-3">
              Voora Exclusive Property
            </span>
            <h1 className="font-display text-4.5xl md:text-6xl font-black text-primary leading-tight uppercase tracking-tight mb-4">
              {name}
            </h1>
            
            {/* Meta tags bar */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-4 text-[10px] font-extrabold uppercase tracking-widest text-text-muted">
              <div className="flex items-center gap-1.5">
                <MapPin size={13} className="text-primary" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Compass size={13} className="text-primary" />
                <span>{sizeRange || 'Premium Config'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Building2 size={13} className="text-primary" />
                <span>{bhkTypes?.join(' / ') || 'Residential'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1.1: STICKY INTERNAL NAV BAR */}
      <div className="sticky top-20 z-30 max-w-5xl mx-auto my-4 px-4 bg-white/75 backdrop-blur-md border border-white/50 rounded-full py-1.5 shadow-[0_10px_35px_rgba(99,70,229,0.05)] relative z-20 overflow-x-auto scrollbar-none">
        <div className="flex items-center justify-between whitespace-nowrap py-1 gap-6">
          <div className="flex gap-5.5">
            {internalTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`text-[10px] uppercase tracking-widest font-extrabold py-1 cursor-pointer transition-colors duration-300 relative ${
                  activeTab === tab.id ? 'text-primary font-black' : 'text-text-muted hover:text-primary'
                }`}
              >
                <span>{tab.name}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-[-4px] left-0 h-[2px] bg-primary w-full rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => dispatch(openEnquiryModal(name))}
            className="btn-gold text-[9px] px-4 py-2 cursor-pointer font-bold tracking-widest flex items-center gap-1.5 shrink-0 shadow-md"
          >
            <Download size={11} />
            <span>Download Brochure</span>
          </button>
        </div>
      </div>

      {/* INTERNAL PAGE CONTENT SECTIONS */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 space-y-24 relative z-10">

        {/* SECTION 2: OVERVIEW */}
        <section id="overview" className="grid grid-cols-1 lg:grid-cols-12 gap-12 scroll-mt-32">
          <div className="lg:col-span-8 space-y-6">
            <span className="text-primary font-extrabold uppercase tracking-widest text-[11px] bg-primary/10 border border-primary/10 px-4.5 py-1.5 rounded-full mb-3 inline-block">Project Overview</span>
            <h2 className="font-display text-3.5xl lg:text-4.5xl font-black text-primary leading-tight uppercase tracking-tight">Privileged Architectural Distinction</h2>
            <div className="w-16 h-0.5 bg-primary" />
            
            <div className="space-y-4 pt-2">
              {overview?.map((bullet, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-3 items-start"
                >
                  <CheckCircle className="text-primary shrink-0 mt-0.5" size={15} />
                  <p className="text-text-muted text-sm leading-relaxed">{bullet}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Specifications specs bar card */}
          <div className="lg:col-span-4 glass-panel p-6 rounded-[2rem] bg-white/70 border border-white/50 space-y-4.5 shadow-sm">
            <h4 className="font-display text-base font-black text-primary border-b border-border/40 pb-2.5 uppercase tracking-wider">
              Core Parameters
            </h4>
            <div className="space-y-3.5 text-[10px] font-extrabold uppercase tracking-wider text-text-muted">
              <div className="flex justify-between border-b border-border/20 pb-2.5">
                <span>Pricing</span>
                <span className="text-primary font-black">{price}</span>
              </div>
              {floors && (
                <div className="flex justify-between border-b border-border/20 pb-2.5">
                  <span>Structure</span>
                  <span className="text-primary font-black">{floors} Floors</span>
                </div>
              )}
              {landArea && (
                <div className="flex justify-between border-b border-border/20 pb-2.5">
                  <span>Land Parcel</span>
                  <span className="text-primary font-black">{landArea}</span>
                </div>
              )}
              {totalUnits && (
                <div className="flex justify-between border-b border-border/20 pb-2.5">
                  <span>Total Inventory</span>
                  <span className="text-primary font-black">{totalUnits} Units</span>
                </div>
              )}
              <div className="flex justify-between border-b border-border/20 pb-2.5">
                <span>RERA Status</span>
                <span className="text-emerald-600 font-black uppercase tracking-widest">Approved</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: AMENITIES GRID */}
        <section id="amenities" className="scroll-mt-32">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-primary font-extrabold uppercase tracking-widest text-[11px] bg-primary/10 border border-primary/10 px-4.5 py-1.5 rounded-full mb-3 inline-block">Resort Living</span>
            <h2 className="font-display text-3.5xl font-black text-primary uppercase tracking-tight">Privileged Amenities</h2>
            <div className="w-16 h-0.5 bg-primary mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {amenities?.map((item, idx) => (
              <div
                key={idx}
                className="p-5.5 rounded-3xl glass-panel bg-white/70 border border-white/50 hover:border-primary/25 hover:shadow-md transition-all duration-300 text-center flex flex-col items-center justify-center gap-2 group hover:translate-y-[-2px]"
              >
                <div className="p-3 bg-primary/10 rounded-2xl border border-primary/15 text-primary flex items-center justify-center shrink-0 mb-1 group-hover:scale-105 transition-transform duration-300">
                  <Sparkles size={18} />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-extrabold text-primary">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: WALKTHROUGH EMBED */}
        {videoUrl && (
          <section id="walkthrough" className="scroll-mt-32 space-y-6">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-primary font-extrabold uppercase tracking-widest text-[11px] bg-primary/10 border border-primary/10 px-4.5 py-1.5 rounded-full mb-3 inline-block">Virtual Lounge</span>
              <h2 className="font-display text-3.5xl font-black text-primary uppercase tracking-tight">Cinematic Walkthrough</h2>
              <div className="w-16 h-0.5 bg-primary mx-auto mt-4" />
            </div>

            <div className="relative aspect-video max-w-4xl mx-auto rounded-[2.5rem] overflow-hidden border border-white/60 shadow-[0_20px_45px_rgba(124,58,237,0.08)]">
              <iframe
                src={videoUrl}
                title={`${name} Walkthrough`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full absolute inset-0"
              />
            </div>
          </section>
        )}

        {/* SECTION 5: SPECIFICATIONS ACCORDION */}
        {specifications && specifications.length > 0 && (
          <section id="specifications" className="scroll-mt-32 max-w-3xl mx-auto space-y-6">
            <div className="text-center mb-10">
              <span className="text-primary font-extrabold uppercase tracking-widest text-[11px] bg-primary/10 border border-primary/10 px-4.5 py-1.5 rounded-full mb-3 inline-block">Materials & Engineering</span>
              <h2 className="font-display text-3.5xl font-black text-primary uppercase tracking-tight">Quality Construction Specs</h2>
              <div className="w-16 h-0.5 bg-primary mx-auto mt-4" />
            </div>

            <div className="space-y-4">
              {specifications.map((spec, sidx) => (
                <div key={sidx} className="border border-white/50 rounded-3xl glass-panel bg-white/70 overflow-hidden shadow-sm hover:border-primary/15 transition-all duration-300">
                  <button
                    onClick={() => setOpenSpecCategory(openSpecCategory === sidx ? -1 : sidx)}
                    className="w-full px-6 py-4.5 flex items-center justify-between text-left font-display text-base font-black text-primary hover:bg-primary/5 cursor-pointer uppercase tracking-wider transition-colors duration-200"
                  >
                    <span>{spec.category}</span>
                    <ChevronDown
                      size={18}
                      className={`text-primary transition-transform duration-300 ${
                        openSpecCategory === sidx ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {openSpecCategory === sidx && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5.5 pt-1 space-y-2.5 border-t border-border/10 text-xs text-text-muted leading-relaxed">
                          {spec.points.map((p, pidx) => (
                            <div key={pidx} className="flex gap-2 items-start">
                              <span className="text-primary shrink-0 mt-1.5 text-[10px]">•</span>
                              <p>{p}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 6: GALLERY LIGHTBOX */}
        <section id="gallery" className="scroll-mt-32 space-y-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-primary font-extrabold uppercase tracking-widest text-[11px] bg-primary/10 border border-primary/10 px-4.5 py-1.5 rounded-full mb-3 inline-block">Visual Showcase</span>
            <h2 className="font-display text-3.5xl font-black text-primary uppercase tracking-tight">Delivered Project Gallery</h2>
            <div className="w-16 h-0.5 bg-primary mx-auto mt-4" />
          </div>

          <ImageLightbox images={allGalleryImages} />
        </section>

        {/* SECTION 7: FAQS ACCORDION */}
        {faqs && faqs.length > 0 && (
          <section id="faqs" className="scroll-mt-32 max-w-3xl mx-auto space-y-6">
            <div className="text-center mb-10">
              <span className="text-primary font-extrabold uppercase tracking-widest text-[11px] bg-primary/10 border border-primary/10 px-4.5 py-1.5 rounded-full mb-3 inline-block">Information Desk</span>
              <h2 className="font-display text-3.5xl font-black text-primary uppercase tracking-tight">Frequently Asked Questions</h2>
              <div className="w-16 h-0.5 bg-primary mx-auto mt-4" />
            </div>

            <div className="space-y-4">
              {faqs.map((faq, fidx) => (
                <div key={fidx} className="border border-white/50 rounded-3xl glass-panel bg-white/70 p-6 shadow-sm hover:border-primary/25 hover:shadow-md transition-all duration-300">
                  <h4 className="font-display text-base font-black text-primary uppercase tracking-wide mb-2.5">{faq.question}</h4>
                  <p className="text-text-muted text-xs leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </motion.div>
  );
};

export default ProjectDetail;
