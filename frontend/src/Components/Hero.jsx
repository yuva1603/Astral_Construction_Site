import React from 'react';
import { ArrowRight, Star, Users, Building, CheckCircle2 } from 'lucide-react';

function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 md:px-16 min-h-screen flex flex-col justify-center bg-gradient-to-br from-brand-light/40 to-white overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-light rounded-full blur-3xl opacity-50 -z-10 translate-x-1/3 -translate-y-1/4"></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Content */}
        <div>
          <div className="inline-flex items-center space-x-2 bg-white px-3 py-1 rounded-full shadow-sm mb-6 border border-gray-100">
            <Star className="w-4 h-4 text-brand-main" fill="currentColor" />
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Astra Real Estate & Architectural</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-[1.1] mb-6">
            Building Future <br />
            <span className="text-gray-900 relative">
              Landmarks
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-brand-main/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          
          <p className="text-gray-600 text-lg md:text-xl max-w-lg mb-8 leading-relaxed">
            From visionary concepts to enduring structures, we engineer spaces that define tomorrow's skyline.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button className="bg-brand-main text-white px-8 py-3.5 rounded-full font-medium hover:bg-brand-dark transition-colors shadow-lg shadow-brand-main/30 flex items-center space-x-2">
              <span>Get Free Consultant</span>
            </button>
            <button className="bg-white text-gray-900 px-8 py-3.5 rounded-full font-medium border border-gray-200 hover:border-brand-main hover:text-brand-main transition-colors flex items-center space-x-2 group">
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl relative">
            <img 
              src="/images/upcoming_commercial_1779537795007.png" 
              alt="Futuristic Architecture" 
              className="w-full h-[600px] object-cover"
            />
            {/* Stats Overlay inside Image */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-4 flex justify-between items-center text-white">
              <div className="text-center">
                <div className="text-2xl font-bold flex items-center justify-center space-x-1">
                  <Star className="w-5 h-5" fill="currentColor" />
                  <span>15+</span>
                </div>
                <div className="text-xs uppercase tracking-wider opacity-80">Years Exp</div>
              </div>
              <div className="w-px h-10 bg-white/30"></div>
              <div className="text-center">
                <div className="text-2xl font-bold flex items-center justify-center space-x-1">
                  <Building className="w-5 h-5" fill="currentColor" />
                  <span>250+</span>
                </div>
                <div className="text-xs uppercase tracking-wider opacity-80">Projects</div>
              </div>
              <div className="w-px h-10 bg-white/30"></div>
              <div className="text-center">
                <div className="text-2xl font-bold flex items-center justify-center space-x-1">
                  <Users className="w-5 h-5" fill="currentColor" />
                  <span>500+</span>
                </div>
                <div className="text-xs uppercase tracking-wider opacity-80">Clients</div>
              </div>
              <div className="w-px h-10 bg-white/30"></div>
              <div className="text-center">
                <div className="text-2xl font-bold flex items-center justify-center space-x-1">
                  <CheckCircle2 className="w-5 h-5" fill="currentColor" />
                  <span>12</span>
                </div>
                <div className="text-xs uppercase tracking-wider opacity-80">Awards</div>
              </div>
            </div>
          </div>
        </div>
        
      </div>

      {/* Ticker Bar at Bottom */}
      <div className="absolute bottom-0 left-0 w-full bg-brand-main text-white py-3 overflow-hidden whitespace-nowrap flex items-center">
        <div className="animate-marquee inline-flex space-x-12">
           <span className="flex items-center space-x-2"><span>RESIDENTIAL BUILDING</span><Star className="w-4 h-4" /></span>
           <span className="flex items-center space-x-2"><span>COMMERCIAL DEVELOPMENT</span><Star className="w-4 h-4" /></span>
           <span className="flex items-center space-x-2"><span>ARCHITECTURAL DESIGN</span><Star className="w-4 h-4" /></span>
           <span className="flex items-center space-x-2"><span>INTERIOR DESIGN</span><Star className="w-4 h-4" /></span>
           <span className="flex items-center space-x-2"><span>URBAN PLANNING</span><Star className="w-4 h-4" /></span>
           <span className="flex items-center space-x-2"><span>RESIDENTIAL BUILDING</span><Star className="w-4 h-4" /></span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
