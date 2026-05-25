import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import EnquiryModal from './components/layout/EnquiryModal';

// Pages - Lazy load for performance optimization
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const NRI = lazy(() => import('./pages/NRI'));
const Contact = lazy(() => import('./pages/Contact'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));

// Page transition wrapper to animate route transitions
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />
        <Route path="/nri" element={<NRI />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-surface selection:bg-secondary selection:text-surface overflow-x-hidden">
        {/* Premium noise texture effect */}
        <div className="noise-overlay" />

        {/* Global Toaster notifications */}
        <Toaster position="top-right" reverseOrder={false} />

        {/* Global Layout Components */}
        <Navbar />
        <EnquiryModal />

        {/* Suspense fallback for premium lazy page loading */}
        <Suspense
          fallback={
            <div className="min-h-screen bg-surface flex items-center justify-center flex-col gap-4">
              <span className="font-display text-4xl font-extrabold text-white tracking-widest animate-pulse">
                VOORA
              </span>
              <div className="w-16 h-0.5 bg-secondary animate-bounce" />
            </div>
          }
        >
          <main className="pt-20">
            <AnimatedRoutes />
          </main>
        </Suspense>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
