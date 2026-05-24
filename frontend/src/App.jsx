import React from 'react';
import './App.css';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import About from './Components/About';
import Services from './Components/Services';
import Home from './Components/Home';
import Completed from './Components/Completed';
import Stats from './Components/Stats';
import Testimonials from './Components/Testimonials';
import Contact from './Components/Contact';
import Footer from './Components/Footer';

function App() {
  return (
    <main className="min-h-screen bg-white font-sans text-gray-900 selection:bg-brand-main selection:text-white">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Home /> {/* Upcoming Projects */}
      <Completed />
      <Stats />
      <Testimonials />
      <Contact />
      <Footer />
      <Analytics />
    </main>
  );
}

export default App;
