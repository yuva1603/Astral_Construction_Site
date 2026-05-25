import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../store/projectSlice';
import { setCategory, setStatus } from '../store/filterSlice';
import ProjectCard from '../components/ui/ProjectCard';
import { pageVariants, scrollReveal, staggerContainer } from '../animations/pageTransitions';
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
      className="w-full min-h-screen py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <Helmet>
        <title>Delivered Landmarks & Ongoing Projects | Voora Real Estate</title>
        <meta name="description" content="Browse through Voora's extensive portfolio of premium residential towers, Grade-A commercial parks, and highly strategic gated plots in Chennai." />
      </Helmet>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 pt-6">
        <span className="text-secondary font-accent uppercase tracking-widest text-xs block mb-2">Our Portfolios</span>
        <h1 className="font-heading text-4xl md:text-5xl text-white leading-tight">
          Architectural Landmark Developments
        </h1>
        <div className="w-16 h-0.5 bg-secondary mx-auto mt-4 mb-4" />
        <p className="text-text-muted text-sm leading-relaxed">
          Discover thirty years of construction legacy. From oceanfront tall towers in ECR to highly strategic gated plots near airport corridor.
        </p>
      </div>

      {/* FILTER PANEL */}
      <div className="glass-panel p-6 rounded-sm bg-surface-2/40 border border-border/10 mb-12">
        <div className="flex flex-col gap-6">
          
          {/* Category Tabs */}
          <div>
            <span className="block text-[10px] font-semibold text-text-muted uppercase tracking-widest mb-3">Filter by Category</span>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => dispatch(setCategory(cat.value))}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all duration-300 cursor-pointer ${
                    category === cat.value
                      ? 'bg-secondary text-surface shadow-lg shadow-secondary/20'
                      : 'bg-surface-2 text-text-muted border border-border/15 hover:border-secondary hover:text-white'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Status Tabs */}
          <div>
            <span className="block text-[10px] font-semibold text-text-muted uppercase tracking-widest mb-3">Filter by Status</span>
            <div className="flex flex-wrap gap-3">
              {statuses.map((stat) => (
                <button
                  key={stat.value}
                  onClick={() => dispatch(setStatus(stat.value))}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all duration-300 cursor-pointer ${
                    status === stat.value
                      ? 'bg-secondary text-surface shadow-lg shadow-secondary/20'
                      : 'bg-surface-2 text-text-muted border border-border/15 hover:border-secondary hover:text-white'
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div key={idx} className="h-[450px] bg-surface-2/50 border border-border/10 rounded-sm animate-pulse" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border/20 rounded-sm bg-surface-2/10">
          <Building2 className="text-secondary mx-auto mb-4" size={40} />
          <h3 className="font-heading text-2xl text-white">No Matching Landmarks</h3>
          <p className="text-text-muted text-xs mt-2 max-w-md mx-auto leading-relaxed">
            There are currently no projects matching this combination of criteria. Try resetting the filters or browsing other active categories.
          </p>
        </div>
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
