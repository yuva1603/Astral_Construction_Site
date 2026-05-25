import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { pageVariants, scrollReveal, staggerContainer, staggerItem } from '../animations/pageTransitions';
import { Award, Compass, Heart, Users, Star, Landmark } from 'lucide-react';

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
      icon: <Landmark className="text-secondary" />
    },
    {
      title: 'Ecological Resilience',
      desc: 'Our projects like Voora One Sea are IGBC certified, ensuring water retention, natural lakes, and lush canopies.',
      icon: <Compass className="text-secondary" />
    },
    {
      title: 'Customer Trust',
      desc: 'Serving over 5,000 Chennai families with absolute transparent deed documentings and zero hidden guidelines.',
      icon: <Heart className="text-secondary" />
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

      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-16 pt-6">
        <span className="text-secondary font-accent uppercase tracking-widest text-xs block mb-2">Our Legacy</span>
        <h1 className="font-display text-4xl md:text-5xl text-white leading-tight">
          Crafting Landmarks, Sowing Trust
        </h1>
        <div className="w-16 h-0.5 bg-secondary mx-auto mt-4 mb-4" />
        <p className="text-text-muted text-sm leading-relaxed">
          Spanning thirty years of architectural excellence in Chennai, Voora is guided by transparent codes of business ethics and high engineering precision.
        </p>
      </div>

      {/* LEGACY STATS CHART CHART */}
      <section className="glass-panel p-8 rounded-sm bg-surface-2/45 border border-border/10 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-secondary font-accent uppercase tracking-widest text-xs block">Volume Trends</span>
            <h3 className="font-heading text-3xl text-white">Three Decades of Growth</h3>
            <p className="text-text-muted text-xs leading-relaxed">
              Our projects delivered count has steadily climbed to 50 landmarks, capturing over 5 million square feet of premium constructed area across Chennai.
            </p>
            <div className="flex gap-4 pt-2">
              <div>
                <p className="text-secondary font-accent text-3xl">50+</p>
                <p className="text-[9px] text-text-muted uppercase tracking-widest font-bold">Landmarks Built</p>
              </div>
              <div>
                <p className="text-secondary font-accent text-3xl">5M+</p>
                <p className="text-[9px] text-text-muted uppercase tracking-widest font-bold">Sqft Handover</p>
              </div>
            </div>
          </div>

          {/* Area Chart */}
          <div className="lg:col-span-7 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={projectsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c9a84c" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#c9a84c" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" stroke="#a09880" fontSize={11} tickLine={false} />
                <YAxis stroke="#a09880" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: '#16213e', border: '1px solid #c9a84c', borderRadius: '4px', fontSize: '12px' }}
                  labelStyle={{ color: '#c9a84c', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="projects" stroke="#c9a84c" strokeWidth={2} fillOpacity={1} fill="url(#colorProjects)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* FOUNDERS & DIRECTORS */}
      <section className="mb-24 space-y-12">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-secondary font-accent uppercase tracking-widest text-xs block mb-2">Leadership</span>
          <h2 className="font-heading text-3xl text-white">The Guiding Vision</h2>
          <div className="w-16 h-0.5 bg-secondary mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {foundersList.map((f, idx) => (
            <div key={idx} className="glass-panel rounded-sm bg-surface-2/30 border border-border/10 p-6 md:p-8 flex flex-col md:flex-row gap-6 hover:border-secondary/30 transition-all duration-300">
              <img
                src={f.image}
                alt={f.name}
                className="w-full md:w-40 h-52 object-cover rounded-sm border border-border/10 shrink-0 self-center md:self-start"
              />
              <div className="space-y-3">
                <span className="text-secondary text-[10px] uppercase font-bold tracking-widest">{f.role}</span>
                <h4 className="font-heading text-2xl text-white">{f.name}</h4>
                <p className="text-text-muted text-xs leading-relaxed">{f.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="mb-24 space-y-12">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-secondary font-accent uppercase tracking-widest text-xs block mb-2">Pillars</span>
          <h2 className="font-heading text-3xl text-white">Values We Stand For</h2>
          <div className="w-16 h-0.5 bg-secondary mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreValues.map((v, idx) => (
            <div key={idx} className="p-6 bg-surface-2 rounded-sm border border-border/10 text-center flex flex-col items-center gap-4">
              <div className="p-3 bg-secondary/15 rounded-full border border-secondary/25">
                {v.icon}
              </div>
              <h4 className="font-heading text-xl text-white">{v.title}</h4>
              <p className="text-text-muted text-xs leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HISTORIC TIMELINE */}
      <section className="space-y-12 mb-12">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-secondary font-accent uppercase tracking-widest text-xs block mb-2">Milestones</span>
          <h2 className="font-heading text-3xl text-white">Voora Legacy Timeline</h2>
          <div className="w-16 h-0.5 bg-secondary mx-auto mt-3" />
        </div>

        <div className="max-w-3xl mx-auto space-y-8 relative before:absolute before:left-4 md:before:left-1/2 before:top-0 before:w-0.5 before:h-full before:bg-border/20 z-10">
          {timelineMilestones.map((m, idx) => (
            <div key={idx} className={`relative flex flex-col md:flex-row gap-6 md:gap-12 items-start ${idx % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
              
              {/* Year dot */}
              <div className="absolute left-4 md:left-1/2 transform -translate-x-[7px] w-4 h-4 rounded-full bg-secondary border-4 border-surface z-20 mt-1" />

              {/* Milestone Content block */}
              <div className={`ml-10 md:ml-0 w-full md:w-1/2 p-6 glass-panel bg-surface-2/70 border border-border/10 rounded-sm ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                <span className="font-accent text-2xl text-secondary font-extrabold">{m.year}</span>
                <h4 className="font-heading text-lg font-bold text-white mt-1 mb-2">{m.title}</h4>
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
