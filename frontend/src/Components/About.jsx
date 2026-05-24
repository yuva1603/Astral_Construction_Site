import React from 'react';
import { Shield, Users, Clock, Headset, Star } from 'lucide-react';

function About() {
  return (
    <section className="py-24 px-6 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <div>
          <div className="text-sm font-bold tracking-widest text-brand-main uppercase mb-4">
            About Our Company
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Where Vision <br /> Meets Craft
          </h2>
          <p className="text-gray-600 mb-10 leading-relaxed text-lg">
            Since 2008, ARKHE has been at the forefront of premium construction and architectural design. We bridge the gap between imagination and reality, delivering visionary spaces with unwavering commitment to quality.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="bg-brand-light p-3 rounded-xl text-brand-main">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-gray-900 font-bold mb-1">Premium Materials</h4>
                <p className="text-gray-500 text-sm">Finest quality selection</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-brand-light p-3 rounded-xl text-brand-main">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-gray-900 font-bold mb-1">Expert Workforce</h4>
                <p className="text-gray-500 text-sm">Professional contractors</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-brand-light p-3 rounded-xl text-brand-main">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-gray-900 font-bold mb-1">Completed On Time</h4>
                <p className="text-gray-500 text-sm">Strict deadline adherence</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-brand-light p-3 rounded-xl text-brand-main">
                <Headset className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-gray-900 font-bold mb-1">24/7 Support</h4>
                <p className="text-gray-500 text-sm">Always here to help</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl relative">
            <img 
              src="/images/completed_villa_1779537830931.png" 
              alt="Premium Villa" 
              className="w-full h-[550px] object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
          </div>
          
          {/* Floating Badge */}
          <div className="absolute -bottom-8 -left-8 bg-brand-main text-white p-6 rounded-2xl shadow-xl shadow-brand-main/30 flex items-center space-x-4 border-4 border-white">
            <Star className="w-10 h-10 fill-white" />
            <div>
              <div className="text-3xl font-bold">15+</div>
              <div className="text-sm font-medium opacity-90">Years Experience</div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}

export default About;
