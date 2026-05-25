import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Instagram, Facebook, Linkedin, Youtube, Award, Sparkles } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { openEnquiryModal } from '../../store/enquirySlice';

export const Footer = () => {
  const dispatch = useDispatch();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border/10 text-text pt-16 pb-8 relative overflow-hidden">
      {/* Decorative background vectors */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none select-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[80%] rounded-full bg-secondary blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] rounded-full bg-accent blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        
        {/* Core content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Logo & Company Profile */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-display text-3xl font-extrabold text-white tracking-widest">VOORA</span>
              <div className="flex flex-col border-l border-border/40 pl-2 leading-none">
                <span className="text-[10px] text-secondary font-bold uppercase tracking-widest">REAL ESTATE</span>
                <span className="text-[8px] text-text-muted mt-0.5">ESTD 1996</span>
              </div>
            </Link>
            
            <p className="text-text-muted text-xs leading-relaxed mt-2">
              For over 30 years, Voora has crafted landmark residential and commercial infrastructures across Chennai’s premium horizons, setting the benchmark for architectural distinction, quality standards, and structural warranty.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="p-2 bg-surface-2 border border-border/10 rounded-full hover:border-secondary hover:text-secondary text-text-muted transition-colors duration-300">
                <Instagram size={16} />
              </a>
              <a href="#" className="p-2 bg-surface-2 border border-border/10 rounded-full hover:border-secondary hover:text-secondary text-text-muted transition-colors duration-300">
                <Facebook size={16} />
              </a>
              <a href="#" className="p-2 bg-surface-2 border border-border/10 rounded-full hover:border-secondary hover:text-secondary text-text-muted transition-colors duration-300">
                <Linkedin size={16} />
              </a>
              <a href="#" className="p-2 bg-surface-2 border border-border/10 rounded-full hover:border-secondary hover:text-secondary text-text-muted transition-colors duration-300">
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Directory Listings */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-secondary uppercase tracking-wider mb-5 pb-2 border-b border-border/10">
              Premium Directory
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/project/voora-one-sea" className="text-text-muted hover:text-white transition-colors text-xs uppercase tracking-widest font-semibold">
                  Voora One Sea (ECR)
                </Link>
              </li>
              <li>
                <Link to="/project/voora-westside" className="text-text-muted hover:text-white transition-colors text-xs uppercase tracking-widest font-semibold">
                  Voora Westside (Ramapuram)
                </Link>
              </li>
              <li>
                <Link to="/project/voora-beckford" className="text-text-muted hover:text-white transition-colors text-xs uppercase tracking-widest font-semibold">
                  Voora Beckford (Nungambakkam)
                </Link>
              </li>
              <li>
                <Link to="/project/voora-highway-haven" className="text-text-muted hover:text-white transition-colors text-xs uppercase tracking-widest font-semibold">
                  Voora Highway Haven (NH-48)
                </Link>
              </li>
              <li>
                <Link to="/project/voora-tech-edge" className="text-text-muted hover:text-white transition-colors text-xs uppercase tracking-widest font-semibold">
                  Voora Tech Edge (Guindy)
                </Link>
              </li>
            </ul>
          </div>

          {/* Allied Ventures */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-secondary uppercase tracking-wider mb-5 pb-2 border-b border-border/10">
              Allied Horizons
            </h4>
            <ul className="space-y-3 text-xs text-text-muted uppercase tracking-widest font-semibold">
              <li className="hover:text-white transition-colors cursor-default">
                Voora Shreeram Constructions
              </li>
              <li className="hover:text-white transition-colors cursor-default">
                Voora Energy (Green Power)
              </li>
              <li className="hover:text-white transition-colors cursor-default">
                Voora Trading LLP
              </li>
              <li>
                <Link to="/nri" className="hover:text-white text-secondary transition-colors">
                  NRI Investment Lounge
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading text-lg font-semibold text-secondary uppercase tracking-wider mb-1 pb-2 border-b border-border/10">
              Concierge Lounge
            </h4>
            
            <div className="flex items-start gap-3 text-xs leading-relaxed text-text-muted">
              <MapPin size={18} className="text-secondary shrink-0 mt-0.5" />
              <span>
                Voora Towers, Old No. 12, New No. 23, College Road, Nungambakkam, Chennai - 600006
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-text-muted">
              <Phone size={16} className="text-secondary shrink-0" />
              <span>+91 44 2822 4545 / +91 98400 12345</span>
            </div>

            <div className="flex items-center gap-3 text-xs text-text-muted">
              <Mail size={16} className="text-secondary shrink-0" />
              <span>info@voora.co.in</span>
            </div>

            <button
              onClick={() => dispatch(openEnquiryModal())}
              className="btn-gold-outline w-full py-2.5 text-xs font-bold tracking-widest mt-2"
            >
              Book Site Walkthrough
            </button>
          </div>

        </div>

        {/* Brand legacy stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t border-b border-border/10 mb-8 text-center bg-surface-2/40">
          <div>
            <p className="text-secondary font-accent text-2xl lg:text-3xl">30+</p>
            <p className="text-[10px] text-text-muted uppercase tracking-widest font-semibold mt-1">Years Legacy</p>
          </div>
          <div>
            <p className="text-secondary font-accent text-2xl lg:text-3xl">5M+</p>
            <p className="text-[10px] text-text-muted uppercase tracking-widest font-semibold mt-1">Sqft Built</p>
          </div>
          <div>
            <p className="text-secondary font-accent text-2xl lg:text-3xl">5K+</p>
            <p className="text-[10px] text-text-muted uppercase tracking-widest font-semibold mt-1">Happy Families</p>
          </div>
          <div>
            <p className="text-secondary font-accent text-2xl lg:text-3xl">50+</p>
            <p className="text-[10px] text-text-muted uppercase tracking-widest font-semibold mt-1">Delivered Landmarks</p>
          </div>
        </div>

        {/* Footer Base */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[10px] text-text-muted gap-4">
          <p>© {currentYear} Voora Real Estate. All rights reserved.</p>
          
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors uppercase tracking-widest">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors uppercase tracking-widest">Disclaimer</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
