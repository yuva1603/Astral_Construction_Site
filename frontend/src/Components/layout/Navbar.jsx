import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ChevronDown, Phone, Award, Building2, Globe, Mail, Sparkles, ChevronRight
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { openEnquiryModal } from '../../store/enquirySlice';

export const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Monitor scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const navLinks = [
    { name: 'About', path: '/about', icon: <Award size={13} /> },
    {
      name: 'Projects',
      path: '/projects',
      icon: <Building2 size={13} />,
      submenu: [
        { name: 'All Projects', path: '/projects' },
        { name: 'Residential Complex', path: '/projects?type=residential' },
        { name: 'Commercial Parks', path: '/projects?type=commercial' },
        { name: 'Gated Plots', path: '/projects?type=plot' }
      ]
    },
    { name: 'NRI Corner', path: '/nri', icon: <Globe size={13} /> },
    { name: 'Contact', path: '/contact', icon: <Mail size={13} /> },
    { name: 'Enquiry', path: '#enquiry', isAction: true, icon: <Sparkles size={13} className="animate-pulse" /> }
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 select-none ${
          isScrolled
            ? 'bg-white/92 backdrop-blur-xl border-b border-primary/15 py-3 shadow-[0_12px_40px_rgba(99,70,229,0.08)]'
            : 'bg-white/75 backdrop-blur-lg border-b border-border/50 py-4.5 shadow-[0_8px_32px_rgba(99,70,229,0.04)]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo - VOORA REAL ESTATE */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-display text-2xl md:text-3xl font-black text-primary tracking-widest uppercase transition-all duration-300 group-hover:opacity-90">
              VOORA
            </span>
            <div className="hidden sm:flex flex-col border-l border-primary/30 pl-2 leading-none">
              <span className="text-[9px] text-primary font-bold uppercase tracking-widest">REAL ESTATE</span>
              <span className="text-[7px] text-text-muted mt-0.5 font-bold uppercase tracking-widest">ESTD 1996</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-9">
            {navLinks.map((link, idx) => (
              <div
                key={idx}
                className="relative group"
                onMouseEnter={() => link.submenu && setActiveDropdown(idx)}
                onMouseLeave={() => link.submenu && setActiveDropdown(null)}
              >
                {link.isAction ? (
                  <button
                    onClick={() => dispatch(openEnquiryModal('General Inquiry'))}
                    className="text-[12.5px] font-extrabold tracking-wider text-text-muted hover:text-primary uppercase transition-all duration-300 cursor-pointer flex items-center gap-2"
                  >
                    <span className="inline-flex items-center justify-center w-6.5 h-6.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
                      {link.icon}
                    </span>
                    <span>{link.name}</span>
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className={`text-[12.5px] font-extrabold tracking-wider hover:text-primary uppercase transition-all duration-300 flex items-center gap-2 ${
                      location.pathname === link.path ? 'text-primary' : 'text-text-muted'
                    }`}
                  >
                    <span className={`inline-flex items-center justify-center w-6.5 h-6.5 rounded-lg transition-all duration-300 shadow-sm shrink-0 ${
                      location.pathname === link.path
                        ? 'bg-primary text-white scale-105'
                        : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-105 group-hover:rotate-6'
                    }`}>
                      {link.icon}
                    </span>
                    <span>{link.name}</span>
                    {link.submenu && (
                      <ChevronDown size={13} className="group-hover:rotate-180 transition-transform duration-300 text-text-muted/70 group-hover:text-primary" />
                    )}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {link.submenu && activeDropdown === idx && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="absolute left-0 mt-3.5 w-56 glass-panel rounded-2xl p-2.5 shadow-[0_15px_40px_rgba(124,58,237,0.06)] border border-white/60 bg-white/95"
                  >
                    {link.submenu.map((sub, sidx) => (
                      <Link
                        key={sidx}
                        to={sub.path}
                        className="flex items-center gap-2 px-3.5 py-2 text-xs text-text-muted hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 uppercase tracking-widest font-extrabold group/sub"
                      >
                        <ChevronRight size={10} className="text-primary/40 group-hover/sub:text-primary transition-all shrink-0 group-hover/sub:translate-x-0.5 duration-200" />
                        <span>{sub.name}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}

                {/* Hover active indicator */}
                {location.pathname === link.path && !link.isAction && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-[-6px] left-0 h-[2.5px] bg-primary w-full rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Actions & Hamburger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => dispatch(openEnquiryModal('Get Consultation'))}
              className="hidden sm:inline-flex btn-gold text-xs px-6 py-2.5 cursor-pointer font-bold tracking-widest shadow-md"
            >
              Get Consultation
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-text-muted hover:text-primary bg-primary/5 hover:bg-primary/10 border border-primary/10 rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center shadow-sm shrink-0"
            >
              {mobileMenuOpen ? (
                <X size={18} className="rotate-90 transition-transform duration-300" />
              ) : (
                <Menu size={18} className="hover:scale-105 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-surface/98 backdrop-blur-2xl lg:hidden flex flex-col justify-center px-6 pt-24 pb-8"
          >
            {/* Links list */}
            <div className="flex flex-col gap-6 text-center items-center">
              {navLinks.map((link, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  {link.isAction ? (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        dispatch(openEnquiryModal('General Inquiry'));
                      }}
                      className="text-2xl font-black uppercase tracking-wider text-text-muted hover:text-primary transition-all duration-300 flex items-center gap-2.5"
                    >
                      <span className="inline-flex items-center justify-center w-8.5 h-8.5 rounded-xl bg-primary/10 text-primary shadow-sm">
                        {link.icon}
                      </span>
                      <span>{link.name}</span>
                    </button>
                  ) : (
                    <Link
                      to={link.path}
                      className={`text-2xl font-black uppercase tracking-wider hover:text-primary transition-all duration-300 flex items-center gap-2.5 ${
                        location.pathname === link.path ? 'text-primary' : 'text-text-muted'
                      }`}
                    >
                      <span className={`inline-flex items-center justify-center w-8.5 h-8.5 rounded-xl shadow-sm ${
                        location.pathname === link.path
                          ? 'bg-primary text-whiteScale-105'
                          : 'bg-primary/10 text-primaryScale-105'
                      }`}>
                        {link.icon}
                      </span>
                      <span>{link.name}</span>
                    </Link>
                  )}

                  {/* Submenu links directly in mobile screen */}
                  {link.submenu && (
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mt-2.5 max-w-sm">
                      {link.submenu.map((sub, sidx) => (
                        <Link
                          key={sidx}
                          to={sub.path}
                          className="text-[10px] text-text-muted hover:text-primary uppercase tracking-widest font-extrabold border-b border-primary/5 pb-0.5"
                        >
                          {sub.name.split(' ')[0]}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA action in mobile drawer */}
            <div className="mt-12 flex flex-col items-center gap-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  dispatch(openEnquiryModal('Get Consultation'));
                }}
                className="btn-gold w-full max-w-xs py-3.5 text-xs font-bold tracking-widest cursor-pointer shadow-lg"
              >
                Get Consultation
              </button>
              
              <div className="flex items-center gap-2 text-xs text-text-muted mt-4 font-bold uppercase tracking-wider bg-primary/5 border border-primary/10 px-4 py-2 rounded-full shadow-inner">
                <Phone size={13} className="text-primary animate-pulse" />
                <span>Concierge: +91 44 2822 4545</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
