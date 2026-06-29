import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Eye, X, ZoomIn, MapPin, Compass } from 'lucide-react';
import { CAFE_IMAGES } from '../data';

export default function VibeGallery() {
  const [lightboxImage, setLightboxImage] = useState<{ url: string; label: string } | null>(null);

  return (
    <div className="space-y-6">
      
      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 border-l-4 border-[#C49A6C] pl-4 pb-1">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#C49A6C] font-semibold flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 animate-spin-slow" />
            Vibe Gallery
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1 uppercase tracking-wide italic">
            Our Bole Sanctuary
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 font-sans mt-0.5 font-light">
            An architectural celebration of warm bamboo slats, raw concrete, and local woodcraft.
          </p>
        </div>

        <div className="text-xs font-mono text-gray-400 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-[#C49A6C]" />
          <span>Behind Edna Mall, Bole, Addis Ababa</span>
        </div>
      </div>

      {/* Masonry or flexible flex-grid layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        
        {CAFE_IMAGES.map((img, index) => {
          // Make certain cards double-sized for a beautiful layout rhythm
          const isFeatured = index === 0 || index === 3;
          return (
            <motion.div
              layout
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative rounded-2xl overflow-hidden cursor-pointer shadow-lg group border border-[#C49A6C]/5 h-48 sm:h-56 ${
                isFeatured ? 'col-span-2' : 'col-span-1'
              }`}
              onClick={() => setLightboxImage(img)}
            >
              {/* Background image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-70" />
              
              {/* Action zoom button on hover */}
              <div className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn className="w-4 h-4 text-white" />
              </div>

              {/* Decorative label */}
              <div className="absolute bottom-4 left-4 z-20 space-y-1">
                <span className="px-2 py-0.5 rounded bg-[#C49A6C] text-[#121212] font-mono text-[8px] font-bold uppercase tracking-widest inline-block">
                  {isFeatured ? 'FEATURED SPACE' : 'SANCTUARY'}
                </span>
                <p className="text-xs font-serif font-semibold text-white group-hover:text-[#C49A6C] transition-colors leading-tight">
                  {img.label}
                </p>
              </div>

              <img
                src={img.url}
                alt={img.label}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
            
            {/* Click backdrop to exit */}
            <div className="absolute inset-0 cursor-zoom-out" onClick={() => setLightboxImage(null)} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative z-10 max-w-4xl w-full bg-[#121212] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/75 border border-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex-1 overflow-hidden bg-black flex items-center justify-center h-[50vh] sm:h-[60vh]">
                <img
                  src={lightboxImage.url}
                  alt={lightboxImage.label}
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="p-5 border-t border-[#C49A6C]/10 bg-[#121212] flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono text-[#C49A6C] uppercase tracking-wider font-semibold">
                    Interior Architecture
                  </span>
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-white leading-tight">
                    {lightboxImage.label}
                  </h4>
                </div>
                
                <span className="text-xs text-gray-400 font-sans hidden sm:inline-block">
                  📍 Bole, Addis Ababa, Ethiopia
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
