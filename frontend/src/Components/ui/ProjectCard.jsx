import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Sparkles } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { openEnquiryModal } from '../../store/enquirySlice';

export const ProjectCard = ({ project }) => {
  const dispatch = useDispatch();
  const { name, slug, location, price, type, status, heroImage, bhkTypes } = project;

  // Format badges with gorgeous tailored colors matching the new palette
  const getStatusBadge = (status) => {
    switch (status) {
      case 'ongoing':
        return { text: 'Ongoing', class: 'bg-primary/10 text-primary border-primary/20' };
      case 'completed':
        return { text: 'Completed', class: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' };
      case 'upcoming':
        return { text: 'Upcoming', class: 'bg-secondary/10 text-secondary border-secondary/20' };
      case 'ready':
        return { text: 'Ready To Occupy', class: 'bg-indigo-600/10 text-indigo-700 border-indigo-600/20' };
      default:
        return { text: status, class: 'bg-gray-500/10 text-gray-600 border-gray-500/20' };
    }
  };

  const badge = getStatusBadge(status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative group w-full h-[460px] rounded-3xl overflow-hidden border border-border/80 bg-white/40 shadow-[0_10px_35px_rgba(124,58,237,0.03)] cursor-pointer flex flex-col justify-end p-5 transition-all duration-500 hover:shadow-[0_20px_45px_rgba(124,58,237,0.08)] hover:border-primary/25"
    >
      {/* Background Image with hover scale */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />
        {/* Soft elegant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0a24]/90 via-[#0e0a24]/30 to-transparent z-10" />
      </div>

      {/* Badges */}
      <div className="absolute top-4 left-4 z-20 flex gap-2">
        <span className={`px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest border rounded-full backdrop-blur-md ${badge.class}`}>
          {badge.text}
        </span>
        <span className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest border border-white/10 bg-white/10 text-white rounded-full backdrop-blur-md">
          {type}
        </span>
      </div>

      {/* Translucent Glass Card Footer */}
      <div className="relative z-20 w-full bg-white/12 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center justify-between transition-all duration-500 group-hover:bg-white/20 group-hover:border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
        <div className="flex-1 pr-3">
          {/* Location */}
          <div className="flex items-center gap-1 text-white/70 text-[11px] font-semibold uppercase tracking-widest mb-0.5">
            <MapPin size={10} className="text-accent" />
            <span className="truncate">{location.split(',')[0]}</span>
          </div>

          {/* Title */}
          <h3 className="font-display text-lg font-extrabold text-white leading-tight truncate">
            {name}
          </h3>

          {/* Config & Price */}
          <div className="flex gap-2.5 items-center mt-1 text-[10px] text-white/60 font-semibold tracking-wider uppercase">
            <span>{bhkTypes?.join('/') || 'Premium'}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent/40" />
            <span className="text-accent font-bold">{price}</span>
          </div>
        </div>

        {/* Circular Link Button */}
        <Link
          to={`/project/${slug}`}
          className="w-11 h-11 rounded-full bg-white text-primary flex items-center justify-center shrink-0 shadow-[0_5px_15px_rgba(0,0,0,0.1)] transition-transform duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-white"
        >
          <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:rotate-45" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
