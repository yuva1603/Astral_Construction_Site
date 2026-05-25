import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectBySlug, clearSelectedProject } from '../store/projectSlice';
import { openEnquiryModal } from '../store/enquirySlice';
import { pageVariants, scrollReveal } from '../animations/pageTransitions';
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
        <span className="font-display text-4xl font-extrabold text-white tracking-widest animate-pulse">
          VOORA
        </span>
        <p className="text-xs text-text-muted uppercase tracking-widest font-semibold">Retrieving Landmark Details...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center flex-col p-4 text-center">
        <Building2 className="text-secondary mb-4" size={48} />
        <h2 className="font-heading text-3xl text-white">Landmark Not Found</h2>
        <p className="text-text-muted text-xs mt-2 max-w-sm">
          We could not locate this project. It might have been moved or archived.
        </p>
        <Link to="/projects" className="btn-gold text-xs px-6 py-2.5 mt-6 font-bold tracking-widest">
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
      className="w-full relative"
    >
      <Helmet>
        <title>{`${name} | ${location} — Voora Real Estate`}</title>
        <meta name="description" content={`Discover ${name} in ${location}. Features: ${bhkTypes?.join(' / ')} starting ${price}. Explore specifications, virtual walkthroughs, and map locations.`} />
      </Helmet>

      {/* SECTION 1: HERO CONTAINER */}
      <section className="relative w-full h-[65vh] md:h-[75vh] overflow-hidden flex items-end">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'}
            alt={name}
            className="w-full h-full object-cover"
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent z-10" />
        </div>

        {/* Title details */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full relative z-20 pb-12">
          <div className="max-w-3xl">
            <span className="text-secondary font-accent uppercase tracking-widest text-xs block mb-2">
              Voora Exclusive Property
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold text-white mb-4">
              {name}
            </h1>
            
            {/* Meta tags bar */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-4 text-xs font-semibold uppercase tracking-widest text-text-muted">
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-secondary" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Compass size={14} className="text-secondary" />
                <span>{sizeRange || 'Premium Config'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Building2 size={14} className="text-secondary" />
                <span>{bhkTypes?.join(' / ') || 'Residential'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1.1: STICKY INTERNAL NAV BAR */}
      <div className="sticky top-16 z-30 bg-surface/95 backdrop-blur-md border-t border-b border-border/10 py-1 shadow-md">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between overflow-x-auto whitespace-nowrap scrollbar-none py-2 gap-6">
          <div className="flex gap-6">
            {internalTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`text-xs uppercase tracking-widest font-bold py-1.5 cursor-pointer transition-colors duration-300 relative ${
                  activeTab === tab.id ? 'text-secondary' : 'text-text-muted hover:text-white'
                }`}
              >
                <span>{tab.name}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-[-6px] left-0 h-[2px] bg-secondary w-full"
                  />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => dispatch(openEnquiryModal(name))}
            className="btn-gold text-[10px] px-4 py-2 cursor-pointer font-bold tracking-widest flex items-center gap-1.5 shrink-0"
          >
            <Download size={12} />
            <span>Download Brochure</span>
          </button>
        </div>
      </div>

      {/* INTERNAL PAGE CONTENT SECTIONS */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 space-y-24">

        {/* SECTION 2: OVERVIEW */}
        <section id="overview" className="grid grid-cols-1 lg:grid-cols-12 gap-12 scroll-mt-32">
          <div className="lg:col-span-8 space-y-6">
            <span className="text-secondary font-accent uppercase tracking-widest text-xs block">Project Overview</span>
            <h2 className="font-heading text-3xl md:text-4xl text-white">Privileged Architectural Distinction</h2>
            <div className="w-16 h-0.5 bg-secondary" />
            
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
                  <CheckCircle className="text-secondary shrink-0 mt-0.5" size={16} />
                  <p className="text-text-muted text-sm leading-relaxed">{bullet}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Specifications specs bar card */}
          <div className="lg:col-span-4 bg-surface-2 p-6 rounded-sm border border-border/15 space-y-4">
            <h4 className="font-heading text-lg font-bold text-white border-b border-border/10 pb-2">
              Core Parameters
            </h4>
            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between border-b border-border/5 pb-2.5">
                <span className="text-text-muted uppercase tracking-widest font-semibold">Pricing</span>
                <span className="text-secondary font-bold">{price}</span>
              </div>
              {floors && (
                <div className="flex justify-between border-b border-border/5 pb-2.5">
                  <span className="text-text-muted uppercase tracking-widest font-semibold">Structure</span>
                  <span className="text-white font-bold">{floors} Floors</span>
                </div>
              )}
              {landArea && (
                <div className="flex justify-between border-b border-border/5 pb-2.5">
                  <span className="text-text-muted uppercase tracking-widest font-semibold">Land Parcel</span>
                  <span className="text-white font-bold">{landArea}</span>
                </div>
              )}
              {totalUnits && (
                <div className="flex justify-between border-b border-border/5 pb-2.5">
                  <span className="text-text-muted uppercase tracking-widest font-semibold">Total Inventory</span>
                  <span className="text-white font-bold">{totalUnits} Units</span>
                </div>
              )}
              <div className="flex justify-between border-b border-border/5 pb-2.5">
                <span className="text-text-muted uppercase tracking-widest font-semibold">RERA Status</span>
                <span className="text-emerald-400 font-bold uppercase tracking-wider">Approved</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: AMENITIES GRID */}
        <section id="amenities" className="scroll-mt-32">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-secondary font-accent uppercase tracking-widest text-xs block mb-2">Resort Living</span>
            <h2 className="font-heading text-3xl text-white">Privileged Amenities</h2>
            <div className="w-16 h-0.5 bg-secondary mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {amenities?.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-sm bg-surface-2 border border-border/10 hover:border-secondary/35 hover:bg-surface-2/70 transition-all duration-300 text-center flex flex-col items-center justify-center gap-2 group"
              >
                <Sparkles size={20} className="text-secondary group-hover:scale-110 transition-transform duration-300" />
                <span className="text-xs uppercase tracking-widest font-bold text-white mt-1">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: WALKTHROUGH EMBED */}
        {videoUrl && (
          <section id="walkthrough" className="scroll-mt-32 space-y-6">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-secondary font-accent uppercase tracking-widest text-xs block mb-2">Virtual Lounge</span>
              <h2 className="font-heading text-3xl text-white">Cinematic Walkthrough</h2>
              <div className="w-16 h-0.5 bg-secondary mx-auto mt-3" />
            </div>

            <div className="relative aspect-video max-w-4xl mx-auto rounded-sm overflow-hidden border border-border/15 shadow-2xl">
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
              <span className="text-secondary font-accent uppercase tracking-widest text-xs block mb-2">Materials & Engineering</span>
              <h2 className="font-heading text-3xl text-white">Quality Construction Specs</h2>
              <div className="w-16 h-0.5 bg-secondary mx-auto mt-3" />
            </div>

            <div className="space-y-4">
              {specifications.map((spec, sidx) => (
                <div key={sidx} className="border border-border/15 rounded-sm bg-surface-2 overflow-hidden">
                  <button
                    onClick={() => setOpenSpecCategory(openSpecCategory === sidx ? -1 : sidx)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left font-heading text-lg font-bold text-white hover:bg-surface/30 cursor-pointer"
                  >
                    <span>{spec.category}</span>
                    <ChevronDown
                      size={18}
                      className={`text-secondary transition-transform duration-300 ${
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
                        <div className="px-6 pb-5 pt-1 space-y-2 border-t border-border/5 text-xs text-text-muted leading-relaxed">
                          {spec.points.map((p, pidx) => (
                            <div key={pidx} className="flex gap-2 items-start">
                              <span className="text-secondary shrink-0 mt-1">•</span>
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
            <span className="text-secondary font-accent uppercase tracking-widest text-xs block mb-2">Visual Showcase</span>
            <h2 className="font-heading text-3xl text-white">Delivered Project Gallery</h2>
            <div className="w-16 h-0.5 bg-secondary mx-auto mt-3" />
          </div>

          <ImageLightbox images={allGalleryImages} />
        </section>

        {/* SECTION 7: FAQS ACCORDION */}
        {faqs && faqs.length > 0 && (
          <section id="faqs" className="scroll-mt-32 max-w-3xl mx-auto space-y-6">
            <div className="text-center mb-10">
              <span className="text-secondary font-accent uppercase tracking-widest text-xs block mb-2">Information Desk</span>
              <h2 className="font-heading text-3xl text-white">Frequently Asked Questions</h2>
              <div className="w-16 h-0.5 bg-secondary mx-auto mt-3" />
            </div>

            <div className="space-y-4">
              {faqs.map((faq, fidx) => (
                <div key={fidx} className="border border-border/15 rounded-sm bg-surface-2 p-5">
                  <h4 className="font-heading text-lg font-bold text-white mb-2">{faq.question}</h4>
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
