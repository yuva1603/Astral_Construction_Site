import React from 'react';
import { Home, Building2, HardHat, Wrench, ArrowRight } from 'lucide-react';

function Services() {
  const services = [
    {
      icon: Home,
      title: 'Residential',
      description: 'Building dream homes with modern aesthetics and structural integrity.',
    },
    {
      icon: Building2,
      title: 'Commercial Building',
      description: 'State-of-the-art corporate and commercial hubs for the future.',
    },
    {
      icon: HardHat,
      title: 'Infrastructure',
      description: 'Developing robust infrastructure that connects communities.',
    },
    {
      icon: Wrench,
      title: 'Renovation',
      description: 'Breathing new life into existing spaces with premium upgrades.',
    },
  ];

  return (
    <section className="py-24 px-6 md:px-16 bg-brand-light/30 relative overflow-hidden">
      {/* Abstract Background Element (Torus Placeholder) */}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/3 opacity-30 pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full border-[80px] border-brand-light blur-sm"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Headline */}
        <div className="lg:col-span-4">
          <div className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-4">
            What We Do
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Our Services
          </h2>
          <p className="text-brand-main text-xl font-medium mb-8">
            End-to-end Construction Solution
          </p>
          <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-medium border border-gray-200 hover:border-brand-main hover:text-brand-main transition-colors flex items-center space-x-2 group shadow-sm">
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Right Cards */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-white hover:border-brand-medium hover:shadow-xl hover:shadow-brand-main/10 transition-all duration-300 group cursor-pointer"
            >
              <div className="bg-brand-light w-14 h-14 rounded-xl flex items-center justify-center text-brand-main mb-6 group-hover:bg-brand-main group-hover:text-white transition-colors duration-300">
                <service.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-500 mb-6 leading-relaxed">
                {service.description}
              </p>
              <div className="text-brand-main font-medium flex items-center space-x-1">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
