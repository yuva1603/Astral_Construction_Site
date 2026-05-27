import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Instagram, Facebook, Linkedin, Youtube, ArrowRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { openEnquiryModal } from '../../store/enquirySlice';
import toast from 'react-hot-toast';

export const Footer = () => {
  const dispatch = useDispatch();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail) {
      toast.error('Please enter a valid email address');
      return;
    }
    toast.success('Thank you for subscribing to our newsletter!');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#f0eef7] border-t border-border/80 text-text pt-16 pb-8 relative overflow-hidden">
      {/* Decorative background vectors */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none select-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[80%] rounded-full bg-primary blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] rounded-full bg-secondary blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        
        {/* Core content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Logo & Company Profile - VOORA REAL ESTATE */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 select-none group">
              <span className="font-display text-3xl font-black text-primary tracking-widest uppercase">
                VOORA
              </span>
              <div className="flex flex-col border-l border-primary/30 pl-2 leading-none">
                <span className="text-[10px] text-primary font-bold uppercase tracking-widest">REAL ESTATE</span>
                <span className="text-[8px] text-text-muted mt-0.5">ESTD 1996</span>
              </div>
            </Link>
            
            <p className="text-text-muted text-[13px] leading-relaxed mt-2">
              For over three decades, Voora has engineered iconic residential, commercial, and custom villa infrastructures across Chennai's horizons, setting the absolute standard for premium design, seismic safety, and structural warranty.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-2">
              <a href="#" className="w-8 h-8 bg-white border border-border/80 rounded-full hover:border-primary hover:text-primary text-text-muted flex items-center justify-center transition-all shadow-sm">
                <Instagram size={14} />
              </a>
              <a href="#" className="w-8 h-8 bg-white border border-border/80 rounded-full hover:border-primary hover:text-primary text-text-muted flex items-center justify-center transition-all shadow-sm">
                <Facebook size={14} />
              </a>
              <a href="#" className="w-8 h-8 bg-white border border-border/80 rounded-full hover:border-primary hover:text-primary text-text-muted flex items-center justify-center transition-all shadow-sm">
                <Linkedin size={14} />
              </a>
              <a href="#" className="w-8 h-8 bg-white border border-border/80 rounded-full hover:border-primary hover:text-primary text-text-muted flex items-center justify-center transition-all shadow-sm">
                <Youtube size={14} />
              </a>
            </div>
          </div>

          {/* Directory Listings Column */}
          <div>
            <h4 className="font-display text-sm font-black text-primary uppercase tracking-wider mb-5 pb-2 border-b border-border/40">
              Premium Directory
            </h4>
            <ul className="space-y-3 text-xs font-bold uppercase tracking-wider">
              <li>
                <Link to="/project/voora-one-sea" className="text-text-muted hover:text-primary transition-colors block truncate">
                  Voora One Sea (ECR)
                </Link>
              </li>
              <li>
                <Link to="/project/voora-westside" className="text-text-muted hover:text-primary transition-colors block truncate">
                  Voora Westside (Ramapuram)
                </Link>
              </li>
              <li>
                <Link to="/project/voora-beckford" className="text-text-muted hover:text-primary transition-colors block truncate">
                  Voora Beckford (Nungambakkam)
                </Link>
              </li>
              <li>
                <Link to="/project/voora-highway-haven" className="text-text-muted hover:text-primary transition-colors block truncate">
                  Voora Highway Haven (NH-48)
                </Link>
              </li>
              <li>
                <Link to="/project/voora-tech-edge" className="text-text-muted hover:text-primary transition-colors block truncate">
                  Voora Tech Edge (Guindy)
                </Link>
              </li>
            </ul>
          </div>

          {/* Allied Ventures Column */}
          <div>
            <h4 className="font-display text-sm font-black text-primary uppercase tracking-wider mb-5 pb-2 border-b border-border/40">
              Allied Horizons
            </h4>
            <ul className="space-y-3 text-xs font-bold uppercase tracking-wider">
              <li className="text-text-muted hover:text-primary transition-colors cursor-default">
                Voora Shreeram Const
              </li>
              <li className="text-text-muted hover:text-primary transition-colors cursor-default">
                Voora Energy (Green Power)
              </li>
              <li className="text-text-muted hover:text-primary transition-colors cursor-default">
                Voora Trading LLP
              </li>
              <li>
                <Link to="/nri" className="text-primary hover:text-secondary transition-colors block">
                  NRI Investment Lounge
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column / Contact HQ Details */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-sm font-black text-primary uppercase tracking-wider mb-1 pb-2 border-b border-border/40">
              Newsletter
            </h4>

            <form onSubmit={handleSubscribe} className="relative flex items-center w-full">
              <input
                type="email"
                placeholder="Email Address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full bg-white border border-border/80 rounded-full py-3.5 pl-5 pr-12 text-xs font-semibold text-primary focus:border-primary focus:outline-none transition-all shadow-sm"
              />
              <button
                type="submit"
                className="absolute right-1 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-secondary transition-all shadow-md cursor-pointer"
              >
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="flex flex-col gap-2 mt-2 text-xs text-text-muted font-semibold">
              <div className="flex items-start gap-2">
                <MapPin size={12} className="text-primary shrink-0 mt-0.5" />
                <span className="leading-tight text-[11px]">
                  Voora Towers, Old 12, New 23, College Road, Nungambakkam, Chennai - 06
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={12} className="text-primary shrink-0" />
                <span className="text-[11px]">+91 44 2822 4545</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={12} className="text-primary shrink-0" />
                <span className="text-[11px] block truncate">info@voora.co.in</span>
              </div>
            </div>
          </div>

        </div>

        {/* Brand Legacy Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-t border-b border-border/45 mb-8 text-center bg-white/35 rounded-2xl shadow-sm">
          <div>
            <p className="text-primary font-display text-2xl lg:text-3xl font-black">30+</p>
            <p className="text-[9px] text-text-muted uppercase tracking-widest font-extrabold mt-0.5">Years Legacy</p>
          </div>
          <div>
            <p className="text-primary font-display text-2xl lg:text-3xl font-black">5M+</p>
            <p className="text-[9px] text-text-muted uppercase tracking-widest font-extrabold mt-0.5">Sqft Built</p>
          </div>
          <div>
            <p className="text-primary font-display text-2xl lg:text-3xl font-black">5K+</p>
            <p className="text-[9px] text-text-muted uppercase tracking-widest font-extrabold mt-0.5">Happy Families</p>
          </div>
          <div>
            <p className="text-primary font-display text-2xl lg:text-3xl font-black">50+</p>
            <p className="text-[9px] text-text-muted uppercase tracking-widest font-extrabold mt-0.5">Landmarks Delivered</p>
          </div>
        </div>

        {/* Footer Base */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] font-bold text-text-muted uppercase tracking-wider border-t border-border/40 pt-8 gap-4">
          <p>© {currentYear} Voora Real Estate. All rights reserved.</p>
          
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-primary transition-colors">Disclaimer</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
