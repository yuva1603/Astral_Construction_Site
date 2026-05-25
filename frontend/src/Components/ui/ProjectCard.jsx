import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Download, MapPin, Sparkles } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { openEnquiryModal } from '../../store/enquirySlice';

export const ProjectCard = ({ project }) => {
  const dispatch = useDispatch();
  const { name, slug, location, price, type, status, heroImage, bhkTypes, sizeRange } = project;

  // Format badges
  const getStatusBadge = (status) => {
    switch (status) {
      case 'ongoing':
        return { text: 'Ongoing', class: 'bg-amber-500/20 text-amber-300 border-amber-500/30' };
      case 'completed':
        return { text: 'Completed', class: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' };
      case 'upcoming':
        return { text: 'Upcoming', class: 'bg-blue-500/20 text-blue-300 border-blue-500/30' };
      case 'ready':
        return { text: 'Ready To Occupy', class: 'bg-secondary/20 text-secondary border-secondary/30' };
      default:
        return { text: status, class: 'bg-gray-500/20 text-gray-300 border-gray-500/30' };
    }
  };

  const badge = getStatusBadge(status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative group w-full h-[450px] rounded-sm overflow-hidden border border-border/20 bg-surface-2 flex flex-col justify-end p-6 cursor-pointer"
    >
      {/* Background Image with zoom on hover */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent z-10" />
      </div>

      {/* Badges */}
      <div className="absolute top-4 left-4 z-20 flex gap-2">
        <span className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider border rounded-full ${badge.class}`}>
          {badge.text}
        </span>
        <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider border border-white/10 bg-black/40 text-white rounded-full">
          {type}
        </span>
      </div>

      {/* Project details card wrapper */}
      <div className="relative z-20 flex flex-col w-full">
        {/* Location & Title */}
        <div className="flex items-center gap-1 text-text-muted text-sm mb-1">
          <MapPin size={14} className="text-secondary" />
          <span>{location}</span>
        </div>

        <h3 className="font-heading text-2xl lg:text-3xl text-white group-hover:text-secondary transition-colors duration-300 mb-2">
          {name}
        </h3>

        {/* Dynamic size range and configuration info */}
        <div className="flex justify-between items-center text-sm border-t border-border/10 pt-3 pb-4 mb-4">
          <div>
            <p className="text-text-muted text-xs">Configuration</p>
            <p className="font-semibold text-text">{bhkTypes?.join(' / ') || 'Residential'}</p>
          </div>
          <div className="text-right">
            <p className="text-text-muted text-xs">Pricing</p>
            <p className="font-semibold text-secondary">{price}</p>
          </div>
        </div>

        {/* Buttons drawer: slide up on hover */}
        <div className="flex gap-3 h-0 opacity-0 overflow-hidden group-hover:h-12 group-hover:opacity-100 transition-all duration-500 ease-in-out">
          <Link
            to={`/project/${slug}`}
            className="flex-1 btn-gold text-xs h-10 flex items-center justify-center gap-2"
          >
            <span>Explore</span>
            <ArrowRight size={14} />
          </Link>
          <button
            onClick={() => dispatch(openEnquiryModal(name))}
            className="px-3 border border-border/40 hover:border-secondary hover:text-secondary rounded-sm transition-all duration-300 text-text-muted flex items-center justify-center"
            title="Download Brochure"
          >
            <Download size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
