import React, { useState } from 'react';

const completedProjects = [
  {
    id: 1,
    title: 'Aurora Prime Villa',
    category: 'Villas',
    location: 'Beverly Hills',
    image: '/images/completed_villa_1779537830931.png',
    featured: true, // This will be the large one on the left
  },
  {
    id: 2,
    title: 'Serene Mansion',
    category: 'Residential',
    location: 'Silicon Valley',
    image: '/images/completed_interior_1779537814303.png',
  },
  {
    id: 3,
    title: 'Astra High-Rise',
    category: 'Commercial',
    location: 'Downtown',
    image: '/images/upcoming_residential_1779537775378.png',
  },
  {
    id: 4,
    title: 'Azure Residence',
    category: 'Interior',
    location: 'Miami Beach',
    image: '/images/upcoming_commercial_1779537795007.png',
  },
  {
    id: 5,
    title: 'Eco Valley Homes',
    category: 'Residential',
    location: 'Austin',
    image: '/images/completed_villa_1779537830931.png',
  },
];

function Completed() {
  const [activeTab, setActiveTab] = useState('All Projects');

  const tabs = ['All Projects', 'Residential', 'Commercial', 'Interior', 'Villas'];

  // Filtering logic
  const filteredProjects = completedProjects.filter((project) =>
    activeTab === 'All Projects' ? true : project.category === activeTab
  );

  // We want to separate the first featured one from the rest for the layout
  const featuredProject = filteredProjects.length > 0 ? filteredProjects[0] : null;
  const gridProjects = filteredProjects.slice(1, 5); // Take next 4 for the grid

  return (
    <section className="bg-gray-50 py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h4 className="text-gray-500 font-bold tracking-widest uppercase text-sm mb-2">
              Our Legacy
            </h4>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-sans">
              Completed Projects
            </h2>
          </div>
          <button className="mt-6 md:mt-0 px-6 py-2.5 border border-gray-200 text-gray-700 hover:border-brand-main hover:text-brand-main rounded-full transition-colors duration-300 font-medium">
            Explore All Projects →
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center space-x-2 md:space-x-4 mb-12">
          {tabs.map((tab) => (
             <button
             key={tab}
             onClick={() => setActiveTab(tab)}
             className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
               activeTab === tab
                 ? 'bg-brand-main text-white shadow-md shadow-brand-main/30'
                 : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-main hover:text-brand-main'
             }`}
           >
             {tab}
           </button>
          ))}
        </div>

        {filteredProjects.length === 0 ? (
           <div className="py-20 text-center text-gray-500">
             No completed projects found in this category.
           </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[600px]">
            
            {/* Large Featured Project */}
            {featuredProject && (
              <div className="lg:col-span-7 h-[400px] lg:h-full group relative overflow-hidden rounded-2xl cursor-pointer shadow-md">
                <img
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-8">
                  <span className="bg-brand-main text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider mb-3 inline-block">
                    {featuredProject.category}
                  </span>
                  <h3 className="text-3xl font-bold text-white mb-1">{featuredProject.title}</h3>
                  <p className="text-white/80 font-medium">{featuredProject.location}</p>
                </div>
              </div>
            )}

            {/* 2x2 Grid for Remaining Projects */}
            <div className="lg:col-span-5 grid grid-cols-2 grid-rows-2 gap-6 h-full">
              {gridProjects.map((project) => (
                <div key={project.id} className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-md h-[200px] lg:h-auto">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full p-4">
                    <h3 className="text-lg font-bold text-white leading-tight">{project.title}</h3>
                    <p className="text-white/70 text-xs mt-1">{project.location}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </div>
    </section>
  );
}

export default Completed;