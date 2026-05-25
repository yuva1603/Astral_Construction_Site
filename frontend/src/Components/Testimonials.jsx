import React from 'react';
import { Quote } from 'lucide-react';

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      quote: "ARKHE transformed our vision into a breathtaking reality. Their attention to detail and unwavering commitment to quality exceeded all our expectations.",
      name: "Sarah Jenkins",
      role: "CEO, TechNova Solutions",
      avatar: "https://i.pravatar.cc/150?img=47"
    },
    {
      id: 2,
      quote: "Working with this team was a seamless experience from start to finish. The final residential complex is nothing short of a modern architectural masterpiece.",
      name: "Marcus Thorne",
      role: "Property Investor",
      avatar: "https://i.pravatar.cc/150?img=11"
    },
    {
      id: 3,
      quote: "They don't just build structures; they craft experiences. Our new corporate headquarters has become a landmark in the city thanks to their innovative design.",
      name: "Elena Rodriguez",
      role: "Director, Vertex Corp",
      avatar: "https://i.pravatar.cc/150?img=5"
    }
  ];

  return (
    <section className="py-24 px-6 md:px-16 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-light/40 rounded-full blur-3xl translate-y-1/2 translate-x-1/4"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="text-sm font-bold tracking-widest text-brand-main uppercase mb-2">
            Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-sans">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-brand-light/30 p-8 rounded-2xl relative border border-brand-light/50">
              <Quote className="absolute top-6 left-6 w-10 h-10 text-brand-main/20" />
              <div className="relative z-10">
                <p className="text-gray-700 italic mb-8 leading-relaxed pt-4 text-sm md:text-base">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center space-x-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Dots Placeholder */}
        <div className="flex justify-center items-center space-x-2 mt-12">
          <button className="w-8 h-2 bg-brand-main rounded-full"></button>
          <button className="w-2 h-2 bg-gray-300 rounded-full hover:bg-brand-medium transition-colors"></button>
          <button className="w-2 h-2 bg-gray-300 rounded-full hover:bg-brand-medium transition-colors"></button>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
