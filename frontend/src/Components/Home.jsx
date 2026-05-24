import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Astra High-Rise',
    category: 'Residential',
    image: '/images/upcoming_residential_1779537775378.png',
    location: 'Downtown District',
  },
  {
    id: 2,
    title: 'Neon Corporate Hub',
    category: 'Commercial',
    image: '/images/upcoming_commercial_1779537795007.png',
    location: 'Tech Park Avenue',
  },
  {
    id: 3,
    title: 'Crystal Business Plaza',
    category: 'Commercial',
    image: '/images/upcoming_commercial_1779537795007.png', // Reused for 3rd item
    location: 'Financial Sector',
  },
];

function Home() {
  const [activeTab, setActiveTab] = useState('All Projects');

  const tabs = ['All Projects', 'Residential', 'Commercial'];

  const filteredProjects = projects.filter((project) =>
    activeTab === 'All Projects' ? true : project.category === activeTab
  );

  return (
    <section className="bg-white py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h4 className="text-gray-500 font-bold tracking-widest uppercase text-sm mb-2">
              What We Build
            </h4>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-sans">
              Iconic Upcoming Projects
            </h2>
          </div>
          <button className="mt-6 md:mt-0 px-6 py-2.5 border border-gray-200 text-gray-700 hover:border-brand-main hover:text-brand-main rounded-full transition-colors duration-300 font-medium">
            View All Projects →
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center space-x-2 md:space-x-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-brand-main text-white shadow-md shadow-brand-main/30'
                  : 'bg-white text-gray-600 hover:bg-brand-light hover:text-brand-main'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          
          {/* Decorative Carousel Arrows (Static for UI) */}
          <button className="hidden lg:flex absolute -left-16 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gray-100 hover:bg-brand-light text-gray-600 hover:text-brand-main items-center justify-center rounded-full transition-colors z-10">
             ←
          </button>
          <button className="hidden lg:flex absolute -right-16 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gray-900 text-white hover:bg-brand-main items-center justify-center rounded-full transition-colors z-10">
             →
          </button>

          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg shadow-gray-200/50"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Purple-ish gradient overlay matching the design */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-8 flex justify-between items-end">
                <div>
                  <span className="bg-white/20 backdrop-blur-md text-white border border-white/30 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider mb-3 inline-block">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-1">{project.title}</h3>
                  <p className="text-white/80 text-sm font-medium">
                    {project.location}
                  </p>
                </div>
                
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white group-hover:bg-brand-main group-hover:border-brand-main transition-colors duration-300">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
          {filteredProjects.length === 0 && (
            <div className="col-span-full py-20 text-center text-gray-500">
              No projects found in this category.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Home;