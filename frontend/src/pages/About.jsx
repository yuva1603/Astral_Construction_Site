import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { pageVariants, staggerContainer, staggerItem } from '../animations/pageTransitions';
import { Award, Compass, Heart, Users, Star, Landmark, ChevronRight } from 'lucide-react';

export const About = () => {
  // Recharts projects data over years
  const projectsData = [
    { year: '2000', projects: 5 },
    { year: '2005', projects: 12 },
    { year: '2010', projects: 22 },
    { year: '2015', projects: 35 },
    { year: '2020', projects: 44 },
    { year: '2026', projects: 50 }
  ];

  const coreValues = [
    {
      title: 'Architectural Integrity',
      desc: 'We never compromise on materials or engineering configurations, offering India-first structural assurances.',
      icon: <Landmark className="text-primary" size={22} />
    },
    {
      title: 'Ecological Resilience',
      desc: 'Our projects like Voora One Sea are IGBC certified, ensuring water retention, natural lakes, and lush canopies.',
      icon: <Compass className="text-primary" size={22} />
    },
    {
      title: 'Customer Trust',
      desc: 'Serving over 5,000 Chennai families with absolute transparent deed documentings and zero hidden guidelines.',
      icon: <Heart className="text-primary" size={22} />
    }
  ];

  const foundersList = [
    {
      name: 'Pavan Voora',
      role: 'Managing Partner',
      bio: 'Leading corporate strategy and backward integration systems. Pavan Voora has expanded the developer\'s portfolio into large-scale residential horizons across OMR, ECR, and central business Chennai.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=500&q=80'
    },
    {
      name: 'Suman Voora',
      role: 'Partner & Chief of Engineering',
      bio: 'Overseeing structural design and engineering precision. Suman Voora is the architect behind our benchmark 265+ pre-handover checks and 20-year structural warranty blueprints.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=500&q=80'
    }
  ];

  const timelineMilestones = [
    { year: '1996', title: 'Foundational Stones', desc: 'Shri Voora Lakshminarasimha Rao establishes Voora Real Estate, laying down the core principles of customer trust and quality infrastructure.' },
    { year: '2005', title: 'IT Boom Horizons', desc: 'Sensing the OMR IT corridor expansion, Voora delivers landmark tech residential hubs, completing over 10 major multi-tower communities.' },
    { year: '2015', title: 'Allied Horizon Expansions', desc: 'Branching into Voora Energy (wind and green power generations) and backward material manufacturing complexes to consolidate quality.' },
    { year: '2026', title: 'The Sky Landmark', desc: 'Launching Voora One Sea rising 41 storeys, establishing ECR\'s tallest residential shoreline architectural marvel.' }
  ];

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full relative py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <Helmet>
        <title>Our 30-Year Chennai Legacy & Founders | Voora Real Estate</title>
        <meta name="description" content="Discover Voora's architectural legacy spanning 30+ years in Chennai. Meet our founders Pavan Voora and Suman Voora, and explore our growth timelines." />
      </Helmet>

      {/* Decorative glowing blobs */}
      <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] pointer-events-none select-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[35%] h-[35%] rounded-full bg-secondary/5 blur-[100px] pointer-events-none select-none" />

      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-16 pt-6 relative z-10">
        <span className="text-primary font-extrabold uppercase tracking-widest text-[11px] bg-primary/10 border border-primary/10 px-4.5 py-1.5 rounded-full mb-4 inline-block">Our Roots</span>
        <h1 className="font-display text-4xl md:text-5xl font-black text-primary leading-tight uppercase tracking-tight">
          Crafting Landmarks,<br />Sowing Absolute Trust
        </h1>
        <div className="w-16 h-0.5 bg-primary mx-auto mt-4" />
        <p className="text-text-muted text-xs sm:text-sm mt-4 leading-relaxed max-w-xl mx-auto uppercase tracking-wider font-semibold">
          Spanning thirty years of architectural excellence in Chennai, Voora is guided by transparent codes of business ethics and high engineering precision.
        </p>
      </div>

      {/* LEGACY STATS CHART */}
      <section className="glass-panel p-8 rounded-[2.5rem] bg-white/70 shadow-[0_20px_45px_rgba(124,58,237,0.03)] border border-white/50 mb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-5">
            <span className="inline-flex items-center gap-1.5 px-4.5 py-1.5 rounded-full bg-primary/10 border border-primary/15 text-primary text-[10px] font-extrabold uppercase tracking-widest">
              Volume Trends
            </span>
            <h3 className="font-display text-3xl font-black text-primary uppercase tracking-tight">Three Decades of Growth</h3>
            <p className="text-text-muted text-xs leading-relaxed">
              Our projects delivered count has steadily climbed to 50 landmarks, capturing over 5 million square feet of premium constructed area across Chennai.
            </p>
            <div className="flex gap-8 pt-2">
              <div>
                <p className="font-display text-4xl font-black text-primary leading-none">50+</p>
                <p className="text-[9px] text-text-muted uppercase tracking-widest font-extrabold mt-1">Landmarks Built</p>
              </div>
              <div className="border-l border-border/40 pl-8">
                <p className="font-display text-4xl font-black text-primary leading-none">5M+</p>
                <p className="text-[9px] text-text-muted uppercase tracking-widest font-extrabold mt-1">Sqft Handover</p>
              </div>
            </div>
          </div>

          {/* Area Chart */}
          <div className="lg:col-span-7 h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={projectsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6346e5" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#6346e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" stroke="#5e5296" fontSize={10} tickLine={false} style={{ fontWeight: 600 }} />
                <YAxis stroke="#5e5296" fontSize={10} tickLine={false} style={{ fontWeight: 600 }} />
                <Tooltip
                  contentStyle={{ background: 'rgba(255, 255, 255, 0.9)', border: '1px solid rgba(99, 70, 229, 0.2)', borderRadius: '16px', fontSize: '11px', boxShadow: '0 10px 25px rgba(99, 70, 229, 0.05)' }}
                  labelStyle={{ color: '#3b22a1', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="projects" stroke="#6346e5" strokeWidth={2.5} fillOpacity={1} fill="url(#colorProjects)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* FOUNDERS & DIRECTORS */}
      <section className="mb-24 space-y-12 relative z-10">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-primary font-extrabold uppercase tracking-widest text-[11px] bg-primary/10 border border-primary/10 px-4.5 py-1.5 rounded-full mb-3 inline-block">Leadership</span>
          <h2 className="font-display text-3.5xl font-black text-primary uppercase tracking-tight">The Guiding Vision</h2>
          <div className="w-16 h-0.5 bg-primary mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {foundersList.map((f, idx) => (
            <div key={idx} className="glass-panel rounded-[2.5rem] bg-white/70 border border-white/50 p-6 sm:p-8 flex flex-col sm:flex-row gap-6 hover:border-primary/25 hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300">
              <img
                src={f.image}
                alt={f.name}
                className="w-full sm:w-36 h-48 object-cover rounded-3xl border border-border/10 shrink-0 self-center sm:self-start shadow-sm"
              />
              <div className="space-y-3 flex flex-col justify-center">
                <span className="text-secondary text-[9px] uppercase font-extrabold tracking-widest bg-secondary/10 border border-secondary/10 px-3 py-1 rounded-full self-start">{f.role}</span>
                <h4 className="font-display text-2.5xl font-black text-primary uppercase tracking-tight">{f.name}</h4>
                <p className="text-text-muted text-xs leading-relaxed">{f.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="mb-24 space-y-12 relative z-10">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-primary font-extrabold uppercase tracking-widest text-[11px] bg-primary/10 border border-primary/10 px-4.5 py-1.5 rounded-full mb-3 inline-block">Pillars</span>
          <h2 className="font-display text-3.5xl font-black text-primary uppercase tracking-tight">Values We Stand For</h2>
          <div className="w-16 h-0.5 bg-primary mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreValues.map((v, idx) => (
            <div key={idx} className="glass-panel p-8 bg-white/70 border border-white/50 rounded-[2rem] text-center flex flex-col items-center gap-4 hover:shadow-md hover:translate-y-[-2px] transition-all duration-300 hover:border-primary/25">
              <div className="p-4 bg-primary/10 rounded-2xl border border-primary/15 text-primary flex items-center justify-center shrink-0">
                {v.icon}
              </div>
              <h4 className="font-display text-xl font-black text-primary uppercase tracking-wide">{v.title}</h4>
              <p className="text-text-muted text-xs leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HISTORIC TIMELINE */}
      <section className="space-y-12 mb-12 relative z-10">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-primary font-extrabold uppercase tracking-widest text-[11px] bg-primary/10 border border-primary/10 px-4.5 py-1.5 rounded-full mb-3 inline-block">Milestones</span>
          <h2 className="font-display text-3.5xl font-black text-primary uppercase tracking-tight">Voora Legacy Timeline</h2>
          <div className="w-16 h-0.5 bg-primary mx-auto mt-4" />
        </div>

        <div className="max-w-3xl mx-auto space-y-8 relative before:absolute before:left-4 md:before:left-1/2 before:top-0 before:w-0.5 before:h-full before:bg-primary/15 z-10 pb-4">
          {timelineMilestones.map((m, idx) => (
            <div key={idx} className={`relative flex flex-col md:flex-row gap-6 md:gap-12 items-start ${idx % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
              
              {/* Year dot */}
              <div className="absolute left-4 md:left-1/2 transform -translate-x-[7px] w-4 h-4 rounded-full bg-primary border-4 border-surface z-20 mt-2.5 shadow-lg shadow-primary/30" />

              {/* Milestone Content block */}
              <div className={`ml-10 md:ml-0 w-full md:w-1/2 p-6.5 glass-panel bg-white/70 border border-white/50 rounded-[2rem] shadow-sm hover:shadow-md hover:border-primary/25 transition-all duration-300 ${idx % 2 === 0 ? 'md:text-right md:items-end' : 'md:text-left md:items-start'} flex flex-col`}>
                <span className="font-display text-2.5xl text-primary font-black leading-none">{m.year}</span>
                <h4 className="font-display text-lg font-black text-primary uppercase tracking-wide mt-2 mb-2">{m.title}</h4>
                <p className="text-text-muted text-xs leading-relaxed">{m.desc}</p>
              </div>
              
              <div className="hidden md:block w-1/2" />
            </div>
          ))}
        </div>
      </section>

    </motion.div>
  );
};

export default About;

