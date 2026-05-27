import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../store/projectSlice';
import { setCategory, setStatus } from '../store/filterSlice';
import ProjectCard from '../Components/ui/ProjectCard';
import { pageVariants, staggerContainer } from '../animations/pageTransitions';
import { Sparkles, Building2, MapPin } from 'lucide-react';

export const Projects = () => {
  const dispatch = useDispatch();
  const { items: projects, loading } = useSelector((state) => state.projects);
  const { category, status } = useSelector((state) => state.filters);

  // Fetch projects on filter change
  useEffect(() => {
    dispatch(fetchProjects({ type: category, status }));
  }, [dispatch, category, status]);

  const categories = [
    { name: 'All Categories', value: 'all' },
    { name: 'Residential', value: 'residential' },
    { name: 'Commercial', value: 'commercial' },
    { name: 'Plots', value: 'plot' }
  ];

  const statuses = [
    { name: 'All Status', value: 'all' },
    { name: 'Ongoing', value: 'ongoing' },
    { name: 'Completed', value: 'completed' },
    { name: 'Upcoming', value: 'upcoming' },
    { name: 'Ready To Occupy', value: 'ready' }
  ];

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full min-h-screen py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto relative"
    >
      <Helmet>
        <title>Delivered Landmarks & Ongoing Projects | Voora Real Estate</title>
        <meta name="description" content="Browse through Voora's extensive portfolio of premium residential towers, Grade-A commercial parks, and highly strategic gated plots in Chennai." />
      </Helmet>

      {/* Decorative glowing blobs */}
      <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] pointer-events-none select-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[35%] h-[35%] rounded-full bg-secondary/5 blur-[100px] pointer-events-none select-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 pt-6 relative z-10">
        <span className="text-primary font-extrabold uppercase tracking-widest text-[11px] bg-primary/10 border border-primary/10 px-4.5 py-1.5 rounded-full mb-3 inline-block">Our Portfolios</span>
        <h1 className="font-display text-4xl md:text-5xl font-black text-primary leading-tight uppercase tracking-tight">
          Architectural Landmark Developments
        </h1>
        <div className="w-16 h-0.5 bg-primary mx-auto mt-4" />
        <p className="text-text-muted text-xs sm:text-sm mt-4 leading-relaxed max-w-xl mx-auto uppercase tracking-wider font-semibold">
          Discover thirty years of construction legacy. From oceanfront tall towers in ECR to highly strategic gated plots near airport corridor.
        </p>
      </div>

      {/* FILTER PANEL */}
      <div className="glass-panel p-6 sm:p-8 rounded-[2.5rem] bg-white/70 shadow-[0_20px_45px_rgba(124,58,237,0.03)] border border-white/50 mb-12 relative z-10">
        <div className="flex flex-col gap-6">
          
          {/* Category Tabs */}
          <div>
            <span className="block text-[10px] font-extrabold text-text-muted uppercase tracking-widest mb-3.5">Filter by Category</span>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => dispatch(setCategory(cat.value))}
                  className={`px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer rounded-full ${
                    category === cat.value
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/25'
                      : 'bg-white/60 text-text-muted border border-border/15 hover:border-primary/25 hover:text-primary hover:bg-white/90'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Status Tabs */}
          <div>
            <span className="block text-[10px] font-extrabold text-text-muted uppercase tracking-widest mb-3.5">Filter by Status</span>
            <div className="flex flex-wrap gap-3">
              {statuses.map((stat) => (
                <button
                  key={stat.value}
                  onClick={() => dispatch(setStatus(stat.value))}
                  className={`px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer rounded-full ${
                    status === stat.value
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/25'
                      : 'bg-white/60 text-text-muted border border-border/15 hover:border-primary/25 hover:text-primary hover:bg-white/90'
                  }`}
                >
                  {stat.name}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* PROJECTS GRID */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div key={idx} className="h-[460px] bg-white/50 border border-border/10 rounded-[2rem] animate-pulse" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border/30 rounded-[2.5rem] bg-white/40 shadow-sm relative z-10">
          <Building2 className="text-primary/60 mx-auto mb-4 animate-bounce" size={40} />
          <h3 className="font-display text-2xl font-black text-primary uppercase tracking-tight">No Matching Landmarks</h3>
          <p className="text-text-muted text-xs mt-2 max-w-sm mx-auto leading-relaxed uppercase tracking-wider font-semibold">
            There are currently no projects matching this combination of criteria. Try resetting the filters or browsing other active categories.
          </p>
        </div>
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
        >
          <AnimatePresence mode="popLayout">
            {projects.map((project) => (
              <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

    </motion.div>
  );
};

export default Projects;
