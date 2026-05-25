import React from 'react';

function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 px-6 md:px-16 py-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/70 backdrop-blur-md rounded-full px-8 py-3 shadow-sm border border-white/40">
        <div className="text-2xl font-bold font-sans tracking-tight text-gray-900">
          ARK<span className="text-gray-400">HE</span>
        </div>
        
        <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-700">
          <a href="#" className="hover:text-brand-main transition-colors">Home</a>
          <a href="#" className="hover:text-brand-main transition-colors">Services</a>
          <a href="#" className="hover:text-brand-main transition-colors">Projects</a>
          <a href="#" className="hover:text-brand-main transition-colors">Testimonials</a>
          <a href="#" className="hover:text-brand-main transition-colors">Insights</a>
        </div>

        <div>
          <button className="bg-brand-main text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-brand-dark transition-colors shadow-lg shadow-brand-main/30">
            Get Consultant
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
