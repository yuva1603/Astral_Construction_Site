import React from 'react';

function Stats() {
  const stats = [
    { value: '15+', label: 'Years Experience' },
    { value: '250+', label: 'Projects Completed' },
    { value: '100%', label: 'On-Time Delivery' },
    { value: '98%', label: 'Happy Clients' },
    { value: 'A+', label: 'Quality Rating' },
  ];

  return (
    <section className="py-20 px-6 md:px-16 bg-brand-light/20 border-y border-brand-light/50">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Text */}
        <div className="lg:w-1/3">
          <div className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-2">
            Why Choose Us
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Build On <span className="text-brand-main">Trust</span> <br />
            Driven By <span className="text-brand-main">Excellence</span>
          </h2>
        </div>

        {/* Right Stats */}
        <div className="lg:w-2/3 w-full grid grid-cols-2 md:grid-cols-5 gap-6 divide-x divide-gray-200">
          {stats.map((stat, index) => (
            <div key={index} className="text-center px-4">
              <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Stats;
