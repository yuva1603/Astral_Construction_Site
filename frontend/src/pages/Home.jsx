import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../store/projectSlice';
import { openEnquiryModal } from '../store/enquirySlice';
import { submitEnquiry } from '../store/enquirySlice';
import ProjectCard from '../Components/ui/ProjectCard';
import AnimatedCounter from '../Components/ui/AnimatedCounter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';

import {
  Sparkles, Award, ShieldCheck, BadgeCheck, CheckCircle2, ChevronRight,
  TrendingUp, Building2, Users2, Landmark, Trophy, ArrowRight, Star,
  ArrowUpRight, Compass, Shield, Clock, Palette, HardHat, FileText,
  ChevronLeft, MessageSquare, Mail, Phone, User
} from 'lucide-react';

// Form validation schema
const enquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  projectType: z.string().min(1, 'Please select a project type'),
  message: z.string().min(5, 'Message must be at least 5 characters')
});

export const Home = () => {
  const dispatch = useDispatch();
  const { items: projects, loading } = useSelector((state) => state.projects);
  const { loading: submitting } = useSelector((state) => state.enquiry);
  const [upcomingFilter, setUpcomingFilter] = useState('all');
  const [completedFilter, setCompletedFilter] = useState('all');
  const [heroSlideIdx, setHeroSlideIdx] = useState(0);

  // Form handle
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      projectType: '',
      message: ''
    }
  });

  // Fetch projects on load
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  // Dynamic Hero slider automatic rotation (every 6 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlideIdx((prev) => (prev + 1) % sliderProjects.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Handle inquiry submission
  const onSubmit = async (data) => {
    try {
      await dispatch(submitEnquiry({
        name: data.name,
        email: data.email,
        phone: data.phone,
        interest: data.projectType,
        message: data.message
      })).unwrap();

      toast.success('Your consultation enquiry has been sent successfully!');
      reset();
    } catch (err) {
      toast.error(err || 'Failed to submit enquiry. Please try again.');
    }
  };

  const sliderProjects = [
    {
      title: "Voora One Sea",
      subtitle: "ECR, Kanathur | 2 & 3 BHK",
      tagline: "First Chennai tower with dual sea & Muttukadu backwater views rising 41 floors high.",
      image: "/images/arkhe_villa.png", // Keeps our stunning generated villa image as the flagship visual representation!
      cta: "Explore Landmark"
    },
    {
      title: "Voora Westside",
      subtitle: "Ramapuram, DLF Hub | Ready To Occupy",
      tagline: "Premium Smart Homes with zero dead-space layout starting 1 Cr onwards.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      cta: "View Residence"
    },
    {
      title: "Voora Beckford",
      subtitle: "Nungambakkam | Luxury Apartments",
      tagline: "Ultra-luxury custom boutique apartments in the heart of Chennai City.",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      cta: "Request Consultation"
    },
    {
      title: "Voora Highway Haven",
      subtitle: "NH-48, Kanchipuram | Premium Plots",
      tagline: "Gated residential plots starting at ₹1,500/sqft near the airport corridor.",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      cta: "Explore Plots"
    }
  ];

  // Map database seeded projects as fallback for cards
  const fallbackUpcoming = [
    {
      _id: 'up1',
      slug: 'voora-one-sea',
      name: 'Voora One Sea',
      type: 'residential',
      status: 'upcoming',
      location: 'Kanathur, ECR, Chennai',
      price: '₹7,199/sqft',
      heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      bhkTypes: ['2 BHK', '3 BHK']
    },
    {
      _id: 'up2',
      slug: 'voora-beckford',
      name: 'Voora Beckford',
      type: 'residential',
      status: 'upcoming',
      location: 'Nungambakkam, Chennai',
      price: '3.5 Cr Onwards',
      heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      bhkTypes: ['3 BHK', '4 BHK']
    },
    {
      _id: 'up3',
      slug: 'voora-tech-edge',
      name: 'Voora Tech Edge',
      type: 'commercial',
      status: 'upcoming',
      location: 'Guindy IT Hub, Chennai',
      price: '12 Cr Onwards',
      heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      bhkTypes: ['Office / Retail']
    }
  ];

  const fallbackCompleted = [
    {
      _id: 'comp1',
      slug: 'voora-westside',
      name: 'Voora Westside',
      type: 'residential',
      status: 'completed',
      location: 'Ramapuram, Adjacent to DLF, Chennai',
      price: '1.0 Cr Onwards',
      heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      bhkTypes: ['2 BHK', '3 BHK Ready']
    },
    {
      _id: 'comp2',
      slug: 'voora-vidyasagar-t-block',
      name: 'Vidyasagar T-Block',
      type: 'residential',
      status: 'completed',
      location: 'Anna Nagar, Chennai',
      price: '2.8 Cr Onwards',
      heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      bhkTypes: ['3 BHK Boutique']
    },
    {
      _id: 'comp3',
      slug: 'voora-oceans27',
      name: 'Voora Ocean\'s 27',
      type: 'residential',
      status: 'completed',
      location: 'Tondiarpet, Chennai Shoreline',
      price: '2.1 Cr Onwards',
      heroImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      bhkTypes: ['2 BHK', '3 BHK']
    },
    {
      _id: 'comp4',
      slug: 'voora-agastya',
      name: 'Voora Agastya',
      type: 'residential',
      status: 'completed',
      location: 'Tondiarpet Sea Vistas',
      price: '2.3 Cr Onwards',
      heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      bhkTypes: ['3 BHK', '4 BHK Sea View']
    },
    {
      _id: 'comp5',
      slug: 'voora-highway-haven-completed',
      name: 'Voora Highway Haven',
      type: 'plot',
      status: 'completed',
      location: 'Panapakkam, NH-48, Kanchipuram',
      price: '₹1,500/sqft',
      heroImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
      bhkTypes: ['DTCP Plots Gated']
    }
  ];

  // Merge loaded projects from backend with fallback lists if backend database is empty
  const activeUpcoming = projects.filter(p => p.status === 'upcoming' || p.status === 'ongoing').length > 0
    ? projects.filter(p => p.status === 'upcoming' || p.status === 'ongoing')
    : fallbackUpcoming;

  const activeCompleted = projects.filter(p => p.status === 'completed' || p.status === 'ready').length > 0
    ? projects.filter(p => p.status === 'completed' || p.status === 'ready')
    : fallbackCompleted;

  // Filters logic
  const filteredUpcoming = activeUpcoming.filter(p => upcomingFilter === 'all' || p.type === upcomingFilter);
  const filteredCompleted = activeCompleted.filter(p => completedFilter === 'all' || p.type === completedFilter || (completedFilter === 'villa' && p.type === 'residential'));

  // Testimonials lists
  const testimonials = [
    {
      quote: "Voora’s transparent documentation made purchasing our beach apartment at One Sea completely stress-free. The construction engineering quality is outstanding.",
      name: "Ramesh Krishnan",
      role: "NRI Client (USA)",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      quote: "Voora Westside Ramapuram is a masterpiece. Zero dead space means my 3 BHK feels incredibly spacious, and the location near DLF IT Park is super convenient.",
      name: "Ananya Deshmukh",
      role: "IT Director, OMR Corridor",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80"
    }
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full relative bg-surface overflow-x-hidden"
    >
      <Helmet>
        <title>Voora Real Estate | Premium MERN Real Estate Chennai</title>
        <meta name="description" content="Welcome to Voora — a leading Chennai-based real estate developer with a legacy spanning over 30 years. Discover sea-facing luxury towers and plotted communities." />
      </Helmet>

      {/* SECTION 1: HERO CINEMATIC SECTION (WITH DYNAMIC VOORA TEXT ROTATION) */}
      <section className="relative min-h-[90vh] lg:min-h-[95vh] flex items-center pt-0 pb-16 overflow-hidden bg-gradient-to-br from-surface via-surface to-accent/15">
        <div className="noise-overlay" />

        {/* Subtle decorative purple glowing shapes */}
        <div className="absolute top-[20%] right-[-10%] w-[45%] h-[45%] rounded-full bg-primary/8 blur-[120px] pointer-events-none select-none" />
        <div className="absolute bottom-[10%] left-[-10%] w-[35%] h-[35%] rounded-full bg-secondary/6 blur-[100px] pointer-events-none select-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-2">

          {/* Left Column Content - Dynamic Project Details */}
          <div className="lg:col-span-6 flex flex-col items-start text-left min-h-[380px] justify-center">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/15 text-primary text-xs font-extrabold uppercase tracking-widest mb-6">
              <Sparkles size={12} className="animate-pulse" />
              <span>{sliderProjects[heroSlideIdx].subtitle}</span>
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={heroSlideIdx}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <h1 className="font-display text-4.5xl md:text-5.5xl lg:text-6.5xl font-black text-primary leading-[1.08] tracking-tight mb-5">
                  {sliderProjects[heroSlideIdx].title.split(' ')[0]}<br />
                  {sliderProjects[heroSlideIdx].title.split(' ').slice(1).join(' ')}
                </h1>

                <p className="text-text-muted text-sm md:text-base mb-8 leading-relaxed max-w-xl">
                  {sliderProjects[heroSlideIdx].tagline} Powered by thirty years of corporate legacy, seismic design engineering, and backward integration.
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-wrap gap-4 w-full sm:w-auto">
              <button
                onClick={() => dispatch(openEnquiryModal(sliderProjects[heroSlideIdx].title))}
                className="btn-gold text-xs font-bold tracking-widest w-full sm:w-auto py-3.5 cursor-pointer shadow-lg"
              >
                {sliderProjects[heroSlideIdx].cta}
              </button>
              <button
                onClick={() => dispatch(openEnquiryModal('General Pricing Request'))}
                className="btn-gold-outline text-xs font-bold tracking-widest w-full sm:w-auto py-3.5 cursor-pointer"
              >
                Request Pricing
              </button>
            </div>

            {/* Custom slider progress ticks */}
            <div className="flex gap-2.5 mt-8 select-none">
              {sliderProjects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setHeroSlideIdx(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${heroSlideIdx === i ? 'w-8 bg-primary' : 'w-2 bg-primary/20 hover:bg-primary/40'
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Right Column Visual Graphic */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end">

            {/* Voora brand legacy counter glass box */}
            <div className="absolute left-[-20px] md:left-[30px] lg:left-[-40px] bottom-[30px] z-20 glass-panel p-5.5 rounded-3xl border border-white/40 shadow-2xl flex flex-col gap-4 max-w-[190px]">
              <div className="flex items-center gap-3 border-b border-border/50 pb-3">
                <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary">
                  <Award size={16} />
                </div>
                <div>
                  <p className="font-display text-[15px] font-black text-primary leading-none">VOORA</p>
                  <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">ESTD 1996</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-primary shrink-0" />
                  <span className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider">30+ Yrs Legacy</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-primary shrink-0" />
                  <span className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider">5M+ Sqft Built</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-primary shrink-0" />
                  <span className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider">5k+ Families</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-primary shrink-0" />
                  <span className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider">50+ Landmarks</span>
                </div>
              </div>
            </div>

            {/* Rotational Villa Graphic container with premium animated gradient border and glow shadow */}
            <div className="w-[85%] sm:w-[70%] lg:w-[88%] h-[380px] sm:h-[450px] lg:h-[480px] rounded-[3.5rem] p-[3.5px] bg-gradient-to-tr from-primary via-secondary to-accent hover:from-secondary hover:via-accent hover:to-primary transition-all duration-700 ease-out shadow-[0_20px_50px_rgba(99,70,229,0.06)] hover:shadow-[0_25px_60px_rgba(99,70,229,0.22)] group/img cursor-pointer relative">
              <div className="w-full h-full rounded-[3.3rem] overflow-hidden relative bg-white/40 backdrop-blur-sm">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={heroSlideIdx}
                    src={sliderProjects[heroSlideIdx].image}
                    alt={sliderProjects[heroSlideIdx].title}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-103"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: SUB-HERO ROW HIGHLIGHTS (VOORA CORE STATS) */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mt-[-30px] mb-20">
        <div className="glass-panel p-6.5 rounded-[2rem] bg-white/70 shadow-[0_20px_45px_rgba(124,58,237,0.04)] border border-white/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-border/20">
            <div className="text-center flex flex-col items-center justify-center p-2">
              <Building2 className="text-primary mb-2" size={20} />
              <AnimatedCounter end={30} suffix="+" />
              <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-1">Years Legacy</span>
            </div>
            <div className="text-center flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
              <TrendingUp className="text-primary mb-2" size={20} />
              <AnimatedCounter end={5} suffix="M+" />
              <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-1">Sqft Handed Over</span>
            </div>
            <div className="text-center flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
              <Users2 className="text-primary mb-2" size={20} />
              <AnimatedCounter end={5000} suffix="+" />
              <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-1">Happy Families</span>
            </div>
            <div className="text-center flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
              <Landmark className="text-primary mb-2" size={20} />
              <AnimatedCounter end={50} suffix="+" />
              <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-1">Completed Landmarks</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: STORY ("Where Vision Meets Craft" - Real Voora Legacy) */}
      <section className="py-20 relative overflow-hidden bg-white/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Content Column */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <span className="text-primary font-extrabold uppercase tracking-widest text-[11px] bg-primary/10 border border-primary/10 px-4.5 py-1.5 rounded-full mb-4">Our Roots</span>

              <h2 className="font-display text-3.5xl lg:text-4.5xl font-black text-primary leading-tight mb-5">
                Building Trust,<br />Crafting Landmarks
              </h2>

              <p className="text-text-muted text-sm leading-relaxed mb-6 max-w-lg">
                Welcome to Voora — a leading Chennai-based real estate conglomerate with a legacy spanning over three decades. Renowned for creating architectural landmarks, Voora has left an indelible signature on Chennai's rising skyline.
              </p>

              <p className="text-text-muted text-sm leading-relaxed mb-8 max-w-lg">
                Founded by the visionary developer Shri Voora Lakshminarasimha Rao, our brand is helmed today by sons Pavan Voora and Suman Voora, continuing a legacy of absolute precision and transparent business code.
              </p>

              <button
                onClick={() => dispatch(openEnquiryModal('Legacy History Walkthrough'))}
                className="btn-gold text-xs font-bold tracking-widest py-3 px-6 shadow-md"
              >
                Learn Our History
              </button>
            </div>

            {/* Right Visual Stack Column - Story graphics */}
            <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end">

              {/* Floating translucent glass card */}
              <div className="absolute left-[10px] sm:left-[30px] top-[40px] z-20 bg-white/70 backdrop-blur-xl border border-white/50 p-4.5 rounded-2xl shadow-xl flex flex-col items-center">
                <span className="font-display text-3xl font-black text-primary">30+</span>
                <span className="text-[9px] font-extrabold text-text-muted uppercase tracking-widest mt-0.5">Years Legacy</span>
              </div>

              {/* Main image container with premium animated gradient border and glow shadow */}
              <div className="w-[90%] sm:w-[75%] lg:w-[90%] h-[350px] sm:h-[400px] rounded-[3rem] p-[3.5px] bg-gradient-to-tr from-primary via-secondary to-accent hover:from-secondary hover:via-accent hover:to-primary transition-all duration-700 ease-out shadow-sm hover:shadow-lg group/img cursor-pointer relative">
                <div className="w-full h-full rounded-[2.8rem] overflow-hidden relative bg-white/40">
                  <img
                    src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=600&q=80"
                    alt="Premium Engineering Design"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-103"
                  />
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: "Our Services" (VOORA SEGMENTS) */}
      <section id="services" className="py-24 relative overflow-hidden">

        {/* Subtle vector line-art background effect */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none flex items-center justify-center">
          <div className="w-[600px] h-[600px] rounded-full border border-primary animate-pulse" />
          <div className="w-[400px] h-[400px] rounded-full border border-secondary absolute" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Header Description */}
            <div className="lg:col-span-4 flex flex-col items-start">
              <span className="text-primary font-extrabold uppercase tracking-widest text-[11px] bg-primary/10 border border-primary/10 px-4.5 py-1.5 rounded-full mb-4">Our Core Segments</span>

              <h2 className="font-display text-3.5xl lg:text-4.5xl font-black text-primary leading-tight mb-5">
                Our Segments
              </h2>

              <p className="text-text-muted text-sm leading-relaxed mb-6">
                From ultra-luxury oceanfront towers along the scenic ECR to strategic industrial plotting setups in airport corridors.
              </p>

              <Link
                to="/projects"
                className="btn-gold text-xs font-bold tracking-widest py-3 px-6 shadow-md"
              >
                Browse All Segments
              </Link>
            </div>

            {/* Right Service Grid (4 segments) */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">

              <div className="glass-panel p-6 rounded-3xl border border-border/80 hover:border-primary/30 transition-all duration-300 flex flex-col items-start shadow-sm hover:shadow-md hover:translate-y-[-2px]">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Compass size={20} />
                </div>
                <h3 className="font-display text-lg font-black text-primary mb-2 uppercase tracking-wide">Residential Complex</h3>
                <p className="text-text-muted text-xs leading-relaxed mb-4">
                  Developing tall towers, luxury boutique apartments, and smart residences with zero dead-space layouts.
                </p>
                <button
                  onClick={() => dispatch(openEnquiryModal('Residential Segment Info'))}
                  className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-1 hover:text-secondary transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight size={12} />
                </button>
              </div>

              <div className="glass-panel p-6 rounded-3xl border border-border/80 hover:border-primary/30 transition-all duration-300 flex flex-col items-start shadow-sm hover:shadow-md hover:translate-y-[-2px]">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Building2 size={20} />
                </div>
                <h3 className="font-display text-lg font-black text-primary mb-2 uppercase tracking-wide">Commercial Spaces</h3>
                <p className="text-text-muted text-xs leading-relaxed mb-4">
                  Constructing Grade-A business centers, corporate office infrastructures, and strategic tech hubs in Guindy.
                </p>
                <button
                  onClick={() => dispatch(openEnquiryModal('Commercial Segment Info'))}
                  className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-1 hover:text-secondary transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight size={12} />
                </button>
              </div>

              <div className="glass-panel p-6 rounded-3xl border border-border/80 hover:border-primary/30 transition-all duration-300 flex flex-col items-start shadow-sm hover:shadow-md hover:translate-y-[-2px]">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Landmark size={20} />
                </div>
                <h3 className="font-display text-lg font-black text-primary mb-2 uppercase tracking-wide">Gated Plots</h3>
                <p className="text-text-muted text-xs leading-relaxed mb-4">
                  Curating premium residential and industrial gated communities on high-speed corridors like NH-48.
                </p>
                <button
                  onClick={() => dispatch(openEnquiryModal('Gated Plots Segment Info'))}
                  className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-1 hover:text-secondary transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight size={12} />
                </button>
              </div>

              <div className="glass-panel p-6 rounded-3xl border border-border/80 hover:border-primary/30 transition-all duration-300 flex flex-col items-start shadow-sm hover:shadow-md hover:translate-y-[-2px]">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Users2 size={20} />
                </div>
                <h3 className="font-display text-lg font-black text-primary mb-2 uppercase tracking-wide">NRI Investment</h3>
                <p className="text-text-muted text-xs leading-relaxed mb-4">
                  Providing dedicated legal counsel, direct taxation, and portfolio asset management for international buyers.
                </p>
                <Link
                  to="/nri"
                  className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-1 hover:text-secondary transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight size={12} />
                </Link>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 5: "Iconic Upcoming Projects" (VOORA ACTIVE SLIDER) */}
      <section className="py-20 relative overflow-hidden bg-white/20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
            <div>
              <span className="text-primary font-extrabold uppercase tracking-widest text-[11px] bg-primary/10 border border-primary/10 px-4.5 py-1.5 rounded-full mb-3 inline-block">Curated Horizons</span>
              <h2 className="font-display text-3.5xl font-black text-primary leading-tight uppercase tracking-tight">Active Upcoming Developments</h2>
            </div>

            <Link
              to="/projects?status=ongoing"
              className="text-primary font-extrabold text-xs uppercase tracking-widest flex items-center gap-1 border-b border-primary/20 pb-0.5 hover:text-secondary transition-colors mt-4 md:mt-0"
            >
              <span>View All Landmarks</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Filter Categories Tabs */}
          <div className="flex gap-3 mb-10 overflow-x-auto pb-2 select-none">
            {['all', 'residential', 'commercial', 'plot'].map((f) => (
              <button
                key={f}
                onClick={() => setUpcomingFilter(f)}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${upcomingFilter === f
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-text-muted border border-border/80 hover:border-primary/20'
                  }`}
              >
                {f === 'all' ? 'All Projects' : f === 'plot' ? 'Gated Plots' : f}
              </button>
            ))}
          </div>

          {/* Premium Upcoming Projects Grid Carousel Wrapper */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredUpcoming.slice(0, 3).map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 6: "Completed Projects" (VOORA ASYMMETRIC GRID) */}
      <section className="py-24 relative overflow-hidden bg-white/40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
            <div>
              <span className="text-primary font-extrabold uppercase tracking-widest text-[11px] bg-primary/10 border border-primary/10 px-4.5 py-1.5 rounded-full mb-3 inline-block">Curated Horizons</span>
              <h2 className="font-display text-3.5xl font-black text-primary leading-tight uppercase tracking-tight">Delivered Milestones</h2>
            </div>

            <Link
              to="/projects?status=completed"
              className="text-primary font-extrabold text-xs uppercase tracking-widest flex items-center gap-1 border-b border-primary/20 pb-0.5 hover:text-secondary transition-colors mt-4 md:mt-0"
            >
              <span>View All Landmarks</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Filter Categories Tabs */}
          <div className="flex flex-wrap gap-2.5 mb-12 select-none">
            {['all', 'residential', 'plot'].map((f) => (
              <button
                key={f}
                onClick={() => setCompletedFilter(f)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${completedFilter === f
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-text-muted border border-border/80 hover:border-primary/20'
                  }`}
              >
                {f === 'all' ? 'All Milestones' : f === 'plot' ? 'Gated Plots' : f}
              </button>
            ))}
          </div>

          {/* Asymmetric completed projects layout matching mockup */}
          {filteredCompleted.length === 0 ? (
            <div className="text-center py-20 bg-white/50 border border-dashed border-border rounded-3xl">
              <Building2 className="text-primary/40 mx-auto mb-4" size={40} />
              <h4 className="font-display text-lg font-black text-primary">No Completed Projects Found</h4>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

              {/* Large Featured Card (Left side, takes 5 cols) */}
              <div className="lg:col-span-5 flex">
                {filteredCompleted[0] && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative group w-full h-[480px] sm:h-[550px] lg:h-auto rounded-[2.5rem] overflow-hidden border border-border bg-white flex flex-col justify-end p-8 cursor-pointer shadow-md"
                  >
                    <div className="absolute inset-0 z-0">
                      <img
                        src={filteredCompleted[0].heroImage}
                        alt={filteredCompleted[0].name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e0a24]/90 via-[#0e0a24]/30 to-transparent z-10" />
                    </div>

                    <div className="relative z-20 text-white">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-accent mb-2 block">Featured Landmark</span>
                      <h3 className="font-display text-2.5xl sm:text-3.5xl font-black mb-3">{filteredCompleted[0].name}</h3>
                      <p className="text-white/70 text-xs sm:text-sm max-w-sm mb-5 leading-relaxed">{filteredCompleted[0].location}</p>

                      <Link
                        to={`/project/${filteredCompleted[0].slug}`}
                        className="btn-gold text-[10px] font-bold py-2.5 px-6 shrink-0 shadow-lg"
                      >
                        Explore Landmark
                      </Link>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Smaller Grid Cards (Right side, takes 7 cols - grid of 4 cards) */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredCompleted.slice(1, 5).map((project) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative group h-[230px] rounded-3xl overflow-hidden border border-border bg-white flex flex-col justify-end p-5 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="absolute inset-0 z-0">
                      <img
                        src={project.heroImage}
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e0a24]/85 via-[#0e0a24]/20 to-transparent z-10" />
                    </div>

                    <div className="relative z-20 text-white flex items-end justify-between w-full">
                      <div>
                        <span className="text-[9px] font-extrabold uppercase tracking-widest text-accent block mb-0.5">{project.type}</span>
                        <h4 className="font-display text-base font-black leading-tight mb-1">{project.name}</h4>
                        <p className="text-white/60 text-[10px] truncate max-w-[180px]">{project.location.split(',')[0]}</p>
                      </div>

                      <Link
                        to={`/project/${project.slug}`}
                        className="w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center shrink-0 hover:bg-primary hover:text-white transition-all shadow-md"
                      >
                        <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          )}

        </div>
      </section>

      {/* SECTION 7: VALUE PILLARS GRID */}
      <section className="py-24 relative overflow-hidden bg-white/30 border-t border-b border-border/80">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-5">
              <span className="text-primary font-extrabold uppercase tracking-widest text-[11px] bg-primary/10 border border-primary/10 px-4.5 py-1.5 rounded-full mb-4 inline-block">Quality Standards</span>
              <h2 className="font-display text-3.5xl font-black text-primary mb-6 leading-tight">Pioneering Gated Safeguards</h2>
              <p className="text-text-muted text-sm leading-relaxed mb-6">
                Voora is highly regarded in the industry for engineering pioneering construction safeguards. We implement backward integration strategies that enable complete supervision from sourcing steel and concrete elements up to handovers.
              </p>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle2 className="text-primary shrink-0" size={18} />
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">High-grade raw materials sourced directly.</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="text-primary shrink-0" size={18} />
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Seismic design integrations for high wind resistance.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {valuePillars.map((item, idx) => (
                <div key={idx} className="p-6 bg-white/70 rounded-3xl border border-border/80 hover:border-primary/30 transition-all duration-300 shadow-sm">
                  <span className="font-display text-3xl text-primary/30 font-black block mb-2">{item.num}</span>
                  <h4 className="font-display text-base font-black text-primary uppercase tracking-wide mb-2">{item.title}</h4>
                  <p className="text-text-muted text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 8: PRESS & MEDIA INFINITE RUNNER */}
      <section className="py-12 bg-white/80 border-t border-b border-border/60 overflow-hidden relative select-none">
        <div className="w-full flex">
          {/* Loop twice to make it infinite and seamless */}
          <div className="flex gap-16 animate-marquee shrink-0 whitespace-nowrap text-primary text-xs tracking-widest uppercase font-extrabold items-center">
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

      {/* SECTION 9: "What Our Clients Say" (GENUINE TESTIMONIALS SLIDER) */}
      <section className="py-24 relative overflow-hidden bg-white/20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">

          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-primary font-extrabold uppercase tracking-widest text-[11px] bg-primary/10 border border-primary/10 px-4.5 py-1.5 rounded-full mb-3 inline-block">5,000+ Happy Families</span>
            <h2 className="font-display text-3.5xl font-black text-primary uppercase tracking-tight">What Our Clients Say</h2>
            <div className="w-16 h-0.5 bg-primary mx-auto mt-4" />
          </div>

          {/* Testimonial slider grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-10">
            {testimonials.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel p-7 rounded-3xl border border-border/80 bg-white hover:bg-white/80 transition-all shadow-sm hover:shadow-md"
              >
                <div className="text-primary mb-4">
                  <Star size={16} fill="currentColor" className="inline text-yellow-400 mr-1" />
                  <Star size={16} fill="currentColor" className="inline text-yellow-400 mr-1" />
                  <Star size={16} fill="currentColor" className="inline text-yellow-400 mr-1" />
                  <Star size={16} fill="currentColor" className="inline text-yellow-400 mr-1" />
                  <Star size={16} fill="currentColor" className="inline text-yellow-400" />
                </div>

                <p className="text-text-muted text-xs leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>

                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover shadow-sm border border-border"
                  />
                  <div>
                    <h4 className="font-display text-xs font-black text-primary uppercase tracking-wider">{item.name}</h4>
                    <p className="text-[9px] font-extrabold text-text-muted uppercase tracking-widest mt-0.5">{item.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: "Find Your Dream Horizon in Chennai" (ENQUIRY FORM) */}
      <section className="py-24 relative overflow-hidden bg-white/30">

        {/* Subtle decorative purple glowing shapes */}
        <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] pointer-events-none select-none" />
        <div className="absolute top-[10%] left-[-10%] w-[35%] h-[35%] rounded-full bg-secondary/5 blur-[100px] pointer-events-none select-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="glass-panel rounded-[3.5rem] bg-white/60 border border-white/50 shadow-2xl p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Side Form Column */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <span className="text-primary font-extrabold uppercase tracking-widest text-[11px] bg-primary/10 border border-primary/10 px-4.5 py-1.5 rounded-full mb-4">Privilege Lounge</span>

              <h2 className="font-display text-3xl sm:text-4xl font-black text-primary leading-tight mb-2 uppercase tracking-tight">
                Find Your Dream Horizon
              </h2>

              <p className="text-text-muted text-xs sm:text-sm leading-relaxed mb-8 max-w-xl uppercase tracking-wider font-semibold">
                From oceanfront towers along the ECR to plotted developments in airport corridor Kanchipuram — Voora builds for every ambition.
              </p>

              {/* Inquiry form */}
              <form onSubmit={handleSubmit(onSubmit)} className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5">

                {/* Name */}
                <div className="flex flex-col">
                  <div className="relative flex items-center">
                    <User className="absolute left-4 text-primary/40" size={14} />
                    <input
                      type="text"
                      placeholder="Your Name"
                      {...register('name')}
                      className="w-full bg-white/50 border border-border/80 rounded-full py-3 pl-11 pr-5 text-xs text-primary font-medium focus:border-primary focus:bg-white/80 focus:outline-none transition-all"
                    />
                  </div>
                  {errors.name && <span className="text-[10px] font-bold text-red-500 mt-1 pl-4">{errors.name.message}</span>}
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <div className="relative flex items-center">
                    <Mail className="absolute left-4 text-primary/40" size={14} />
                    <input
                      type="email"
                      placeholder="Email ID"
                      {...register('email')}
                      className="w-full bg-white/50 border border-border/80 rounded-full py-3 pl-11 pr-5 text-xs text-primary font-medium focus:border-primary focus:bg-white/80 focus:outline-none transition-all"
                    />
                  </div>
                  {errors.email && <span className="text-[10px] font-bold text-red-500 mt-1 pl-4">{errors.email.message}</span>}
                </div>

                {/* Phone */}
                <div className="flex flex-col">
                  <div className="relative flex items-center">
                    <Phone className="absolute left-4 text-primary/40" size={14} />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      {...register('phone')}
                      className="w-full bg-white/50 border border-border/80 rounded-full py-3 pl-11 pr-5 text-xs text-primary font-medium focus:border-primary focus:bg-white/80 focus:outline-none transition-all"
                    />
                  </div>
                  {errors.phone && <span className="text-[10px] font-bold text-red-500 mt-1 pl-4">{errors.phone.message}</span>}
                </div>

                {/* Project Type Dropdown */}
                <div className="flex flex-col">
                  <select
                    required
                    {...register('projectType')}
                    className="w-full bg-white/50 border border-border/80 rounded-full py-3 px-5 text-xs text-primary font-bold uppercase tracking-wider focus:border-primary focus:bg-white/80 focus:outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Type of Project</option>
                    <option value="residential">Residential Complex</option>
                    <option value="commercial">Commercial Space</option>
                    <option value="plot">Gated Residential Plot</option>
                  </select>
                  {errors.projectType && <span className="text-[10px] font-bold text-red-500 mt-1 pl-4">{errors.projectType.message}</span>}
                </div>

                {/* Message */}
                <div className="flex flex-col sm:col-span-2">
                  <textarea
                    rows={4}
                    placeholder="Describe your design and site requirements in brief..."
                    {...register('message')}
                    className="w-full bg-white/50 border border-border/80 rounded-3xl py-4.5 px-5 text-xs text-primary font-medium focus:border-primary focus:bg-white/80 focus:outline-none transition-all resize-none"
                  />
                  {errors.message && <span className="text-[10px] font-bold text-red-500 mt-1 pl-4">{errors.message.message}</span>}
                </div>

                {/* Send Button */}
                <div className="sm:col-span-2 mt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-gold text-xs font-bold tracking-widest w-full py-3.5 shadow-lg select-none cursor-pointer"
                  >
                    {submitting ? 'Submitting Enquiry...' : 'Send Message'}
                  </button>
                </div>

              </form>
            </div>

            {/* Right Side Visual Column with premium animated gradient border and glow shadow */}
            <div className="lg:col-span-5 h-[320px] lg:h-[450px] rounded-[2.5rem] p-[3.5px] bg-gradient-to-tr from-primary via-secondary to-accent hover:from-secondary hover:via-accent hover:to-primary transition-all duration-700 ease-out shadow-xl group/img hidden sm:block relative">
              <div className="w-full h-full rounded-[2.3rem] overflow-hidden relative bg-white/40">
                <img
                  src="/images/arkhe_villa.png"
                  alt="VOORA Contemporary Landmark Facade"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/15 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

          </div>
        </div>
      </section>

    </motion.div>
  );
};

export default Home;
