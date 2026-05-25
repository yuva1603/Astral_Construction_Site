import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Phone, Shield } from 'lucide-react';
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
      if (window.scrollY > 50) {
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
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    {
      name: 'Projects',
      path: '/projects',
      submenu: [
        { name: 'All Projects', path: '/projects' },
        { name: 'Residential', path: '/projects?type=residential' },
        { name: 'Commercial', path: '/projects?type=commercial' },
        { name: 'Gated Plots', path: '/projects?type=plot' }
      ]
    },
    { name: 'NRI Corner', path: '/nri' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-surface/90 backdrop-blur-md border-b border-border/10 py-3 shadow-lg'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 select-none group">
            <span className="font-display text-2xl md:text-3xl font-extrabold text-white tracking-widest group-hover:text-secondary transition-colors duration-300">
              VOORA
            </span>
            <div className="hidden sm:flex flex-col border-l border-border/40 pl-2 leading-none">
              <span className="text-[10px] text-secondary font-bold uppercase tracking-widest">REAL ESTATE</span>
              <span className="text-[8px] text-text-muted mt-0.5">ESTD 1996</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, idx) => (
              <div
                key={idx}
                className="relative group"
                onMouseEnter={() => link.submenu && setActiveDropdown(idx)}
                onMouseLeave={() => link.submenu && setActiveDropdown(null)}
              >
                <Link
                  to={link.path}
                  className={`text-sm font-semibold tracking-wider hover:text-secondary uppercase transition-all duration-300 flex items-center gap-1 ${
                    location.pathname === link.path ? 'text-secondary' : 'text-text'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.submenu && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />}
                </Link>

                {/* Dropdown Menu */}
                {link.submenu && activeDropdown === idx && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="absolute left-0 mt-3 w-52 glass-panel rounded-sm bg-surface-2 p-2 shadow-2xl border border-border/15"
                  >
                    {link.submenu.map((sub, sidx) => (
                      <Link
                        key={sidx}
                        to={sub.path}
                        className="block px-4 py-2.5 text-xs text-text-muted hover:text-white hover:bg-surface/50 rounded-sm transition-colors duration-300 uppercase tracking-widest font-semibold"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </motion.div>
                )}

                {/* Hover slide underline */}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-[-6px] left-0 h-[2px] bg-secondary w-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Actions & Hamburger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => dispatch(openEnquiryModal())}
              className="hidden sm:inline-flex btn-gold text-xs px-5 py-2 cursor-pointer font-bold tracking-widest"
            >
              Enquire Now
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-text hover:text-secondary transition-colors duration-300 cursor-pointer"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
            className="fixed inset-0 z-30 bg-surface/98 backdrop-blur-xl lg:hidden flex flex-col justify-center px-6 pt-24 pb-8"
          >
            {/* Links list */}
            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <Link
                    to={link.path}
                    className={`text-2xl font-heading hover:text-secondary transition-all duration-300 flex items-center gap-1 ${
                      location.pathname === link.path ? 'text-secondary' : 'text-text'
                    }`}
                  >
                    {link.name}
                  </Link>

                  {/* Submenu links directly in mobile screen */}
                  {link.submenu && (
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mt-2 max-w-sm">
                      {link.submenu.map((sub, sidx) => (
                        <Link
                          key={sidx}
                          to={sub.path}
                          className="text-xs text-text-muted hover:text-white uppercase tracking-widest font-semibold border-b border-white/5 pb-0.5"
                        >
                          {sub.name}
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
                  dispatch(openEnquiryModal());
                }}
                className="btn-gold w-full max-w-xs py-3.5 text-xs font-bold tracking-widest cursor-pointer"
              >
                Enquire Now
              </button>
              
              <div className="flex items-center gap-1.5 text-xs text-text-muted mt-4">
                <Phone size={14} className="text-secondary" />
                <span>Call Concierge: +91 44 2822 4545</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
