import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export const ImageLightbox = ({ images }) => {
  const [index, setIndex] = useState(-1);

  const openLightbox = (i) => setIndex(i);
  const closeLightbox = () => setIndex(-1);

  const prevImage = (e) => {
    e.stopPropagation();
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation
  useEffect(() => {
    if (index === -1) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      if (e.key === 'ArrowRight') setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [index, images]);

  if (!images || !images.length) {
    return (
      <div className="text-center py-12 text-text-muted">
        No images available in this gallery section.
      </div>
    );
  }

  return (
    <div>
      {/* Grid gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            onClick={() => openLightbox(i)}
            className="relative h-64 overflow-hidden rounded-sm border border-border/10 cursor-pointer group bg-surface-2"
          >
            <img
              src={img}
              alt={`Gallery Image ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Hover overlay with zoom icon */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
              <div className="p-3 bg-secondary/80 text-surface rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <Maximize2 size={20} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox full-screen modal */}
      <AnimatePresence>
        {index !== -1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-surface/95 backdrop-blur-md flex items-center justify-center p-4 select-none"
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 p-2 text-text-muted hover:text-white bg-surface-2/60 border border-border/20 rounded-full transition-colors duration-300 cursor-pointer"
            >
              <X size={24} />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={prevImage}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 z-50 p-3 text-secondary hover:text-white bg-surface-2/60 border border-border/20 rounded-full transition-colors duration-300 cursor-pointer"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 z-50 p-3 text-secondary hover:text-white bg-surface-2/60 border border-border/20 rounded-full transition-colors duration-300 cursor-pointer"
            >
              <ChevronRight size={28} />
            </button>

            {/* Image display */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[80vh] w-full flex items-center justify-center"
            >
              <img
                src={images[index]}
                alt={`Selected Gallery Image ${index + 1}`}
                className="max-w-full max-h-[85vh] object-contain border border-border/20 shadow-2xl"
              />
              <div className="absolute bottom-[-40px] text-center w-full text-text-muted text-sm uppercase tracking-widest">
                Image {index + 1} of {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageLightbox;
