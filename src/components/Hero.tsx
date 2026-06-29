import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, MapPin, Coffee, Volume2, VolumeX, Sparkles, Navigation } from 'lucide-react';

export default function Hero() {
  const [isOpen, setIsOpen] = useState(true);
  const [localTimeStr, setLocalTimeStr] = useState('');
  const [ambientSound, setAmbientSound] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200',
      tag: 'BOLE SANCTUARY',
      title: 'Artisanal Bamboo Slats & Cozy Wood Lounges',
      desc: 'Our space is carefully curated to reflect the earthy tones and natural textures of Sidama, creating a serene environment for your daily brew.'
    },
    {
      image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=1200',
      tag: 'BUNCHO CRAFT',
      title: 'Precision Sourced, Masterfully Roasted',
      desc: 'We roast small batches of exceptional single-origin Sidama coffees, highlighting natural berry sweetness and floral jasmines.'
    },
    {
      image: 'https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?auto=format&fit=crop&q=80&w=1200',
      tag: 'GARDEN OASIS',
      title: 'Outdoor Garden Terrace in Bole',
      desc: 'Sip your traditional Jebena or espresso tonic surrounded by tropical greenery in our premium open-air courtyard.'
    }
  ];

  useEffect(() => {
    // Auto slider
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      // Cafe open hours: 8:00 AM to 9:00 PM (8 to 21)
      const open = hours >= 8 && hours < 21;
      setIsOpen(open);

      // Formatted local time string
      const str = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setLocalTimeStr(str);
    };

    updateTime();
    const interval = setInterval(updateTime, 30000); // update every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] sm:h-[550px] overflow-hidden bg-[#241F1A] flex items-center justify-center">
      
      {/* Background Slideshow with Crossfade */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 w-full h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF5EF] via-[#121212]/50 to-transparent z-10" />
            <div className="absolute inset-0 bg-black/30 z-10" />
            <img
              src={heroSlides[currentSlide].image}
              alt="Dukamo Interior"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hero Content Grid */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col justify-end pb-8 sm:pb-12 text-white">
        
        {/* Dynamic Vibe Status Box */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-[#8C6239] text-[#FFFDFB] flex items-center gap-1 shadow-md">
            <Sparkles className="w-3 h-3 animate-pulse text-[#D2B48C]" />
            {heroSlides[currentSlide].tag}
          </span>

          {/* Open/Close pulsing indicator */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase bg-black/60 border border-white/20 backdrop-blur-md">
            <span className={`w-2 h-2 rounded-full inline-block ${isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
            <span className="text-white">{isOpen ? 'Brewing Now' : 'Closed'}</span>
            <span className="text-stone-300 font-normal pl-1 border-l border-white/20">{localTimeStr}</span>
          </div>

          <span className="text-xs text-stone-200 font-sans hidden sm:inline-block font-medium drop-shadow-md">
            📍 Bole, Addis Ababa (Behind Edna Mall)
          </span>
        </div>

        {/* Catchphrase Title with beautiful typography pairing */}
        <div className="max-w-2xl drop-shadow-md">
          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white leading-tight mb-3">
            {heroSlides[currentSlide].title}
          </h2>
          <p className="text-sm sm:text-base text-stone-100 font-sans leading-relaxed font-light mb-6">
            {heroSlides[currentSlide].desc}
          </p>
        </div>

        {/* Action / Quick Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mt-2">
          
          {/* Quick Hours */}
          <div className="bg-[#2A2118]/70 backdrop-blur-md border border-white/10 p-3 rounded-xl flex items-center gap-2.5">
            <div className="p-2 bg-[#8C6239]/20 rounded-lg text-white">
              <Clock className="w-4 h-4 text-[#D2B48C]" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-stone-300 uppercase tracking-widest">Opening Hours</p>
              <p className="text-xs sm:text-sm font-bold text-white">8:00 AM – 9:00 PM</p>
            </div>
          </div>

          {/* Sourcing Origin */}
          <div className="bg-[#2A2118]/70 backdrop-blur-md border border-white/10 p-3 rounded-xl flex items-center gap-2.5">
            <div className="p-2 bg-[#8C6239]/20 rounded-lg text-white">
              <Coffee className="w-4 h-4 text-[#D2B48C]" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-stone-300 uppercase tracking-widest">Coffee Sourcing</p>
              <p className="text-xs sm:text-sm font-bold text-white">Sidama Micro-Lots</p>
            </div>
          </div>

          {/* Quick Location Nav */}
          <div className="col-span-2 sm:col-span-1 bg-[#2A2118]/70 backdrop-blur-md border border-white/10 p-3 rounded-xl flex items-center gap-2.5">
            <div className="p-2 bg-[#8C6239]/20 rounded-lg text-white">
              <MapPin className="w-4 h-4 text-[#D2B48C]" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-stone-300 uppercase tracking-widest">Find Sanctuary</p>
              <p className="text-xs sm:text-sm font-bold text-white flex items-center gap-1">
                Bole, Addis Ababa
              </p>
            </div>
          </div>

          {/* Ambient Sounds toggle to enhance physical presence */}
          <button
            onClick={() => setAmbientSound(!ambientSound)}
            className="col-span-2 sm:col-span-1 bg-[#2A2118]/80 hover:bg-[#8C6239] hover:text-white transition-all p-3 rounded-xl flex items-center gap-2.5 text-left border border-[#8C6239]/30 text-white cursor-pointer"
          >
            <div className={`p-2 rounded-lg ${ambientSound ? 'bg-[#FAF5EF] text-[#8C6239]' : 'bg-[#8C6239]/20 text-white'}`}>
              {ambientSound ? <Volume2 className="w-4 h-4 animate-bounce" /> : <VolumeX className="w-4 h-4" />}
            </div>
            <div>
              <p className="text-[10px] font-mono text-stone-300 uppercase tracking-widest">Cafe Atmosphere</p>
              <p className="text-xs sm:text-sm font-bold">
                {ambientSound ? 'Ambient Jazz Active' : 'Sound Atmosphere'}
              </p>
            </div>
            
            {/* Simple audio tags to represent coffee shop chatter & background lounge jazz */}
            {ambientSound && (
              <audio 
                src="https://assets.mixkit.co/active_storage/sfx/2433/2433-84.wav" // Coffee cup clinking loop mock or similar
                autoPlay 
                loop 
                className="hidden"
              />
            )}
          </button>

        </div>
        
      </div>
    </div>
  );
}
