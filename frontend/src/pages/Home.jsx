import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../store/projectSlice';
import { openEnquiryModal } from '../store/enquirySlice';
import { pageVariants, scrollReveal, staggerContainer, staggerItem } from '../animations/pageTransitions';
import GoldParticles from '../components/ui/GoldParticles';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import ProjectCard from '../components/ui/ProjectCard';

// Swiper CSS imports (handled in Vite)
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import {
  Sparkles, Award, ShieldAlert, BadgeCheck, CheckCircle2, ChevronRight,
  TrendingUp, Building2, Users2, Landmark, Trophy, ArrowRight, Star
} from 'lucide-react';

export const Home = () => {
  const dispatch = useDispatch();
  const { items: projects, loading } = useSelector((state) => state.projects);
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);

  // Fetch projects on load
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  // Parallax Scroll logic
  const { scrollY } = useScroll();
  const heroTextY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroBgY = useTransform(scrollY, [0, 500], [0, 200]);

  const sliderProjects = [
    {
      title: "Voora One Sea",
      subtitle: "ECR, Kanathur | 2 & 3 BHK",
      tagline: "First Chennai tower with dual sea & Muttukadu backwater views | 41 Floors",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
      cta: "Explore Landmark"
    },
    {
      title: "Voora Westside",
      subtitle: "Ramapuram, DLF Hub | Ready To Occupy",
      tagline: "Premium Smart Homes with zero dead-space layout starting 1 Cr onwards",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      cta: "View Residence"
    },
    {
      title: "Voora Beckford",
      subtitle: "Nungambakkam | Luxury Apartments",
      tagline: "Ultra-luxury custom boutique apartments in the heart of Chennai City",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
      cta: "Request Consultation"
    },
    {
      title: "Voora Highway Haven",
      subtitle: "NH-48, Kanchipuram | Premium Plots",
      tagline: "Gated residential plots on NH-48 starting at ₹1,500/sqft near airport corridor",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80",
      cta: "Explore Plots"
    }
  ];

  const amenities = [
    { name: 'Sky Amphitheatre', desc: '41st-floor breathtaking view deck', icon: <Sparkles className="text-secondary" /> },
    { name: 'Grand Clubhouse', desc: '60,000 sqft premium leisure zone', icon: <Landmark className="text-secondary" /> },
    { name: 'Natural Pond', desc: '1-acre eco-sensitive natural lake', icon: <Trophy className="text-secondary" /> },
    { name: 'Futsal Turf', desc: 'Acoustic buffered sport arena', icon: <Award className="text-secondary" /> },
    { name: 'EV Charging Hub', desc: 'Smart high-voltage load points', icon: <Building2 className="text-secondary" /> },
    { name: 'Smart Home Automation', desc: 'Keyless biometric door modules', icon: <BadgeCheck className="text-secondary" /> }
  ];

  const valuePillars = [
    {
      num: '01',
      title: '20-Year Structural Warranty',
      desc: 'First builder in India to offer twenty years of solid structural warranty backing.'
    },
    {
      num: '02',
      title: 'IGBC Pre-Certified Gold',
      desc: 'Designed for ecological resilience with native landscaping and water recycling.'
    },
    {
      num: '03',
      title: '265+ Quality Checkpoints',
      desc: 'Rigorous engineering assessments conducted before handover to assure visual perfection.'
    },
    {
      num: '04',
      title: '10-Year Fittings Warranty',
      desc: 'Complete decade-long coverage on top premium fixtures and piping installations.'
    }
  ];

  const testimonials = [
    {
      name: "Ramesh Krishnan",
      role: "NRI Client (USA)",
      quote: "Voora’s transparent documentation made purchasing our beach apartment at One Sea completely stress-free. The construction engineering quality is outstanding.",
      rating: 5
    },
    {
      name: "Ananya Deshmukh",
      role: "IT Director, OMR Corridor",
      quote: "Voora Westside Ramapuram is a masterpiece. Zero dead space means my 3 BHK feels incredibly spacious, and the location near DLF IT Park is super convenient.",
      rating: 5
    }
  ];

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full relative"
    >
      <Helmet>
        <title>Voora Real Estate | Premium MERN Real Estate Chennai</title>
        <meta name="description" content="Welcome to Voora — a leading Chennai-based real estate developer with a legacy spanning over 30 years. Discover sea-facing luxury towers and plotted communities." />
      </Helmet>

      {/* SECTION 1.2: HERO CINEMATIC SLIDER */}
      <section className="relative w-full h-[95vh] overflow-hidden bg-black flex items-center">
        {/* Particle Canvas background overlay */}
        <GoldParticles />

        <Swiper
          modules={[Autoplay, EffectFade, Pagination, Navigation]}
          effect={'fade'}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          onSlideChange={(swiper) => setActiveSlideIdx(swiper.activeIndex)}
          className="absolute inset-0 w-full h-full"
        >
          {sliderProjects.map((slide, idx) => (
            <SwiperSlide key={idx} className="relative w-full h-full">
              {/* Ken burns image effect */}
              <motion.div style={{ y: heroBgY }} className="absolute inset-0 w-full h-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover animate-ken-burns"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/75 to-transparent" />
              </motion.div>

              {/* Slider content alignment */}
              <div className="absolute inset-0 flex items-center z-20">
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full">
                  <motion.div
                    style={{ y: heroTextY }}
                    initial={{ opacity: 0, x: -50 }}
                    animate={activeSlideIdx === idx ? { opacity: 1, x: 0 } : { opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-2xl"
                  >
                    <span className="text-secondary font-accent uppercase tracking-widest text-sm block mb-2">
                      {slide.subtitle}
                    </span>
                    <h1 className="font-display text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-text-muted text-base md:text-lg mb-8 leading-relaxed max-w-xl">
                      {slide.tagline}
                    </p>

                    <div className="flex gap-4">
                      <button
                        onClick={() => dispatch(openEnquiryModal(slide.title))}
                        className="btn-gold text-xs font-bold tracking-widest cursor-pointer"
                      >
                        {slide.cta}
                      </button>
                      <button
                        onClick={() => dispatch(openEnquiryModal())}
                        className="btn-gold-outline text-xs font-bold tracking-widest cursor-pointer"
                      >
                        Request Pricing
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Cinematic slide progress indicators */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-border/20 z-30">
          <motion.div
            key={activeSlideIdx}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 6, ease: 'linear' }}
            className="h-full bg-secondary"
          />
        </div>
      </section>

      {/* SECTION 1.3: DYNAMIC STATS BAR */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mt-[-60px]">
        <div className="glass-panel p-8 md:p-10 rounded-sm bg-surface-2/80 shadow-2xl border border-border/20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-border/10">
            <div className="text-center flex flex-col items-center justify-center p-2">
              <Building2 className="text-secondary mb-2" size={24} />
              <AnimatedCounter end={30} suffix="+" />
              <p className="text-text-muted text-[10px] uppercase tracking-widest font-bold mt-2">Years Legacy</p>
            </div>
            <div className="text-center flex flex-col items-center justify-center p-2 pt-6 lg:pt-2">
              <TrendingUp className="text-secondary mb-2" size={24} />
              <AnimatedCounter end={5} suffix="M+" />
              <p className="text-text-muted text-[10px] uppercase tracking-widest font-bold mt-2">Sqft Handed Over</p>
            </div>
            <div className="text-center flex flex-col items-center justify-center p-2 pt-6 lg:pt-2">
              <Users2 className="text-secondary mb-2" size={24} />
              <AnimatedCounter end={5000} suffix="+" />
              <p className="text-text-muted text-[10px] uppercase tracking-widest font-bold mt-2">Happy Families</p>
            </div>
            <div className="text-center flex flex-col items-center justify-center p-2 pt-6 lg:pt-2">
              <Landmark className="text-secondary mb-2" size={24} />
              <AnimatedCounter end={50} suffix="+" />
              <p className="text-text-muted text-[10px] uppercase tracking-widest font-bold mt-2">Completed Landmarks</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1.4: ABOUT STORY (SCROLL STORY) */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Sticky Column */}
            <motion.div
              variants={scrollReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-5 lg:sticky lg:top-28"
            >
              <span className="text-secondary font-accent uppercase tracking-widest text-xs block mb-2">Our Roots</span>
              <h2 className="font-heading text-4xl lg:text-5xl text-white leading-tight mb-6">
                Building Trust,<br />Crafting Landmarks
              </h2>
              <div className="w-20 h-0.5 bg-secondary mb-6" />
              <p className="text-text-muted text-sm leading-relaxed mb-6">
                Welcome to Voora — a leading Chennai-based real estate conglomerate with a legacy spanning over three decades. Renowned for creating architectural landmarks, Voora has left an indelible signature on Chennai's rising skyline.
              </p>
              <p className="text-text-muted text-sm leading-relaxed mb-6">
                Founded by the visionary developer Shri Voora Lakshminarasimha Rao, our brand is helmed today by sons Pavan Voora and Suman Voora, continuing a legacy of absolute precision and transparent business code.
              </p>
              <button
                onClick={() => dispatch(openEnquiryModal())}
                className="btn-gold-outline text-xs px-6 py-2.5 font-bold tracking-widest mt-2 cursor-pointer"
              >
                Learn Our History
              </button>
            </motion.div>

            {/* Right Scroll-Jacking Image Stack */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="h-80 rounded-sm overflow-hidden border border-border/10 bg-surface-2 relative group"
              >
                <img
                  src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=600&q=80"
                  alt="Craftsmanship"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-surface/40 flex items-end p-4">
                  <span className="text-xs uppercase tracking-widest text-white font-bold bg-secondary/80 px-2 py-1">Premium Engineering</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="h-80 rounded-sm overflow-hidden border border-border/10 bg-surface-2 relative group mt-6 sm:mt-12"
              >
                <img
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80"
                  alt="Legacy Landmarks"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-surface/40 flex items-end p-4">
                  <span className="text-xs uppercase tracking-widest text-white font-bold bg-secondary/80 px-2 py-1">Chennai Skies</span>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 1.5: ACTIVE PROJECTS ARCHIVE */}
      <section className="py-20 bg-surface-2/30 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
            <div>
              <span className="text-secondary font-accent uppercase tracking-widest text-xs block mb-2">Curated Horizons</span>
              <h2 className="font-heading text-4xl text-white">Delivering Distinctions</h2>
              <div className="w-16 h-0.5 bg-secondary mt-3" />
            </div>
            
            <Link
              to="/projects"
              className="group text-secondary text-xs font-bold tracking-widest uppercase hover:text-white transition-colors duration-300 mt-4 md:mt-0 flex items-center gap-1 border-b border-secondary/20 pb-1"
            >
              <span>View All Landmarks</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="h-[400px] bg-surface-2/60 animate-pulse rounded-sm border border-border/10" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.slice(0, 3).map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* SECTION 1.6: AMENITIES SHOWCASE */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-secondary font-accent uppercase tracking-widest text-xs block mb-2">Luxury Conveniences</span>
            <h2 className="font-heading text-4xl text-white">Privileged Horizon Lifestyle</h2>
            <div className="w-16 h-0.5 bg-secondary mx-auto mt-4" />
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {amenities.map((item, idx) => (
              <motion.div
                key={idx}
                variants={staggerItem}
                className="glass-panel p-6 rounded-sm bg-surface-2/30 hover:bg-surface-2/70 border border-border/15 glass-panel-hover flex gap-4"
              >
                <div className="p-3 bg-secondary/15 rounded-sm h-12 flex items-center justify-center shrink-0 border border-secondary/25">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-heading text-lg font-semibold text-white group-hover:text-secondary transition-colors duration-300">
                    {item.name}
                  </h4>
                  <p className="text-text-muted text-xs leading-relaxed mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* SECTION 1.7: WHY CHOOSE VOORA */}
      <section className="py-20 bg-surface-2/20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5">
              <span className="text-secondary font-accent uppercase tracking-widest text-xs block mb-2">Quality Standards</span>
              <h2 className="font-heading text-4xl text-white mb-6">Pioneering Gated Safeguards</h2>
              <p className="text-text-muted text-sm leading-relaxed mb-6">
                Voora is highly regarded in the industry for engineering pioneering construction safeguards. We implement backward integration strategies that enable complete supervision from sourcing steel and concrete elements up to handovers.
              </p>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle2 className="text-secondary shrink-0" size={18} />
                  <p className="text-xs text-text-muted">High-grade raw materials sourced directly.</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="text-secondary shrink-0" size={18} />
                  <p className="text-xs text-text-muted">Seismic design integrations for high wind resistance.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {valuePillars.map((item, idx) => (
                <div key={idx} className="p-6 bg-surface-2 rounded-sm border border-border/10 hover:border-secondary/30 transition-all duration-300">
                  <span className="font-accent text-3xl text-secondary/35 font-bold block mb-2">{item.num}</span>
                  <h4 className="font-heading text-lg font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-text-muted text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 1.8: PRESS & MEDIA INFINITE RUNNER */}
      <section className="py-12 bg-surface border-t border-b border-border/10 overflow-hidden relative select-none">
        <div className="w-full flex">
          {/* Loop twice to make it infinite and seamless */}
          <div className="flex gap-16 animate-marquee shrink-0 whitespace-nowrap text-text-muted text-sm tracking-widest uppercase font-semibold items-center">
            <span>📰 Featured in The Hindu</span>
            <span>★ NDTV Real Estate Awards</span>
            <span>📰 DT Next Editorial Spotlight</span>
            <span>★ TOI Chennai Infrastructure Updates</span>
            <span>📰 Chennai Real Property Digest</span>
            
            <span>📰 Featured in The Hindu</span>
            <span>★ NDTV Real Estate Awards</span>
            <span>📰 DT Next Editorial Spotlight</span>
            <span>★ TOI Chennai Infrastructure Updates</span>
            <span>📰 Chennai Real Property Digest</span>
          </div>
        </div>
      </section>

      {/* SECTION 1.9: TESTIMONIAL CAROUSEL */}
      <section className="py-24 bg-surface relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-secondary font-accent uppercase tracking-widest text-xs block mb-2">Testimonials</span>
            <h2 className="font-heading text-4xl text-white">Legacy Told By 5,000+ Families</h2>
            <div className="w-16 h-0.5 bg-secondary mx-auto mt-4" />
          </div>

          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="max-w-3xl mx-auto py-10"
          >
            {testimonials.map((item, idx) => (
              <SwiperSlide key={idx} className="text-center px-6">
                <div className="flex justify-center gap-1 mb-6 text-secondary">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="font-heading text-xl md:text-2xl text-text leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
                <div>
                  <h4 className="font-bold text-white text-sm uppercase tracking-wider">{item.name}</h4>
                  <p className="text-text-muted text-[10px] uppercase tracking-widest font-semibold mt-1">{item.role}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </section>

      {/* SECTION 1.10: PARALLAX CALL TO ACTION */}
      <section className="relative py-32 bg-black overflow-hidden flex items-center justify-center text-center">
        {/* Parallax background cover image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
            alt="Find dream home"
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-surface z-10" />
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-20">
          <span className="text-secondary font-accent uppercase tracking-widest text-sm block mb-2">Privilege Lounge</span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            Find Your Dream Horizon in Chennai
          </h2>
          <p className="text-text-muted text-base max-w-xl mx-auto mb-10 leading-relaxed">
            From sea-facing architectural marvel towers along the ECR to plotted industrial communities in Kanchipuram — Voora builds for every ambition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => dispatch(openEnquiryModal())}
              className="btn-gold text-xs font-bold tracking-widest w-full sm:w-auto cursor-pointer"
            >
              Enquire Privately
            </button>
            <Link
              to="/projects"
              className="btn-gold-outline text-xs font-bold tracking-widest w-full sm:w-auto cursor-pointer"
            >
              Browse All Landmarks
            </Link>
          </div>
        </div>
      </section>

    </motion.div>
  );
};

export default Home;
