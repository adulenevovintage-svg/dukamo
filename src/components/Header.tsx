import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingBag, Clock, MapPin, Coffee, HelpCircle, X, Settings } from 'lucide-react';
import { CategoryType, BasketItem } from '../types';

interface HeaderProps {
  activeCategory: CategoryType;
  setActiveCategory: (category: CategoryType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  basket: BasketItem[];
  onOpenBasket: () => void;
  isAdmin?: boolean;
  onOpenAdmin: () => void;
  onLogoutAdmin: () => void;
}

export default function Header({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  basket,
  onOpenBasket,
  isAdmin = false,
  onOpenAdmin,
  onLogoutAdmin,
}: HeaderProps) {
  const [showStory, setShowStory] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const totalBasketItems = basket.reduce((acc, curr) => acc + curr.quantity, 0);

  const categories: { id: CategoryType; label: string; icon: string }[] = [
    { id: 'all', label: 'All Items', icon: '✨' },
    { id: 'black-coffee', label: 'Black Coffee', icon: '☕' },
    { id: 'milk-coffee', label: 'Milk-Based & Hot', icon: '🥛' },
    { id: 'non-coffee', label: 'Matcha & Teas', icon: '🍵' },
    { id: 'juices', label: 'Juices & Smoothies', icon: '🍹' },
    { id: 'bowls', label: 'Specialty Bowls', icon: '🥗' },
    { id: 'burgers', label: 'Burgers', icon: '🍔' },
    { id: 'specials', label: 'Specials & Samplers', icon: '🎁' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F5EBE0]/95 backdrop-blur-md border-b border-[#E3D7C8] text-[#2D241C] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Circular Logo with Elegant Dark Theme Spec */}
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="relative group cursor-pointer" onClick={() => setShowStory(true)}>
              {/* Outer double circle elements from Elegant Dark */}
              <div className="hidden sm:block absolute -inset-2 rounded-full border border-dashed border-[#8C6239]/30 animate-[spin_40s_linear_infinite]" />
              <div className="hidden sm:block absolute -inset-3.5 rounded-full border border-[#8C6239]/15" />
              
              {/* Inner container with logo */}
              <motion.div 
                className="relative w-12 h-12 sm:w-20 md:w-24 sm:h-20 md:h-24 rounded-full overflow-hidden border border-[#8C6239]/60 sm:border-2 sm:border-[#8C6239] bg-[#FAF5EF] flex items-center justify-center shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <img
                  src="https://www.image2url.com/r2/default/images/1782749784839-a01b6ede-101a-4ae3-89d9-4c5c3f3e8336.jpg"
                  alt="Dukamo Logo"
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all" />
              </motion.div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex items-baseline gap-1 sm:gap-1.5 leading-none">
                <h1 className="font-serif text-lg sm:text-2xl md:text-3xl font-black tracking-tight sm:tracking-tighter text-[#8C6239] hover:text-[#5C4E43] transition-colors cursor-pointer uppercase leading-none" onClick={() => setShowStory(true)}>
                  DUKAMO
                </h1>
                <span className="text-[7px] sm:text-[9px] font-mono tracking-widest text-white uppercase font-bold px-1.5 py-0.5 rounded bg-[#8C6239] border border-[#8C6239]/20">
                  Bole
                </span>
              </div>
              <p className="text-[7px] sm:text-[9px] font-mono text-[#5C4E43] uppercase tracking-[0.18em] sm:tracking-[0.25em] mt-0.5 sm:mt-1 font-bold">
                Powered By Buncho Coffee
              </p>
            </div>
          </div>

          {/* Search bar inside header for screens */}
          <div className="hidden md:flex items-center flex-1 max-w-md relative">
            <Search className="absolute left-3 w-4 h-4 text-[#8A7968]" />
            <input
              type="text"
              placeholder="Search coffee, bowls, burgers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#FAF5EF] border border-[#E3D7C8] rounded-full text-sm text-[#2D241C] placeholder-[#8A7968] focus:outline-none focus:ring-1 focus:ring-[#8C6239] focus:border-[#8C6239] transition-all shadow-inner"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-[#8A7968] hover:text-[#2D241C]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Stats & Bag Button */}
          <div className="flex items-center gap-1.5 sm:gap-4">
            <div className="hidden lg:block text-right mr-3 font-mono border-r border-[#E3D7C8] pr-4 leading-normal">
              <p className="text-[10px] uppercase tracking-widest text-[#5C4E43] font-semibold">Bole, Addis Ababa</p>
              <p className="text-[#8C6239] text-xs font-bold tracking-wider">8:00 AM – 9:00 PM</p>
            </div>

            <button 
              onClick={() => setShowStory(true)}
              className="p-2 text-[#5C4E43] hover:text-[#8C6239] transition-colors rounded-full hover:bg-[#EFE5D9]/60 hidden sm:flex items-center gap-1 text-xs font-semibold"
              title="About Our Coffee"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Our Story</span>
            </button>

            {/* Admin Toggle Button */}
            <button
              onClick={isAdmin ? onLogoutAdmin : onOpenAdmin}
              className={`p-2 transition-colors rounded-full ${isAdmin ? 'text-red-600 bg-red-50 shadow-inner' : 'text-[#5C4E43] hover:text-[#8C6239] hover:bg-[#EFE5D9]/60'}`}
              title={isAdmin ? "Exit Admin Mode (Active)" : "Admin Settings"}
            >
              <Settings className={`w-4 h-4 ${isAdmin ? 'animate-spin' : ''}`} style={{ animationDuration: isAdmin ? '3s' : '0s' }} />
            </button>

            {/* Mobile Search Toggle Button */}
            <button 
              onClick={() => {
                setIsMobileSearchOpen(!isMobileSearchOpen);
                if (isMobileSearchOpen) setSearchQuery('');
              }}
              className="p-2 text-[#5C4E43] hover:text-[#8C6239] hover:bg-[#EFE5D9]/60 rounded-full md:hidden flex items-center justify-center transition-colors cursor-pointer"
              title="Search menu"
            >
              {isMobileSearchOpen ? <X className="w-5 h-5 text-[#8C6239]" /> : <Search className="w-5 h-5" />}
            </button>

            <motion.button
              onClick={onOpenBasket}
              className="relative p-2 sm:p-2.5 bg-[#8C6239] hover:bg-[#704E2D] text-white rounded-full flex items-center justify-center shadow-md cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              id="basket-btn"
            >
              <ShoppingBag className="w-4.5 h-4.5 sm:w-5 sm:h-5 font-bold" />
              <AnimatePresence>
                {totalBasketItems > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-[#FAF5EF] text-[#8C6239] border-2 border-[#8C6239] text-[9px] sm:text-[10px] font-bold rounded-full w-4.5 h-4.5 sm:w-5 sm:h-5 flex items-center justify-center shadow-md font-sans"
                  >
                    {totalBasketItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Animated Mobile Search Bar */}
        <AnimatePresence>
          {isMobileSearchOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: 'auto', opacity: 1, marginTop: 10 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden md:hidden"
            >
              <div className="relative flex items-center">
                <Search className="absolute left-3.5 w-4 h-4 text-[#8A7968]" />
                <input
                  type="text"
                  placeholder="Search coffee, bowls, burgers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-9 py-2 bg-[#FAF5EF] border border-[#E3D7C8] rounded-full text-xs text-[#2D241C] placeholder-[#8A7968] focus:outline-none focus:ring-1 focus:ring-[#8C6239] focus:border-[#8C6239] transition-all shadow-inner"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 p-1 rounded-full text-[#8A7968] hover:text-[#2D241C]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Categories sliding sub-navigation */}
        <div className="relative mt-3 sm:mt-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="overflow-x-auto scrollbar-none flex items-center gap-2 pb-2.5">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#8C6239] text-white shadow-md shadow-[#8C6239]/20 scale-[1.03] font-bold'
                      : 'bg-[#FAF5EF] text-[#5C4E43] hover:bg-[#EFE5D9] hover:text-[#2D241C] border border-[#E3D7C8] hover:border-[#8C6239]/40 shadow-sm'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
          
          {/* Fading side indicators to guide horizontal swiping on mobile */}
          <div className="absolute right-0 top-0 bottom-2.5 w-8 bg-gradient-to-l from-[#FAF5EF] via-[#FAF5EF]/40 to-transparent pointer-events-none sm:hidden" />
          <div className="absolute left-0 top-0 bottom-2.5 w-8 bg-gradient-to-r from-[#FAF5EF] via-[#FAF5EF]/40 to-transparent pointer-events-none sm:hidden" />
        </div>
      </div>

      {/* About story modal popup */}
      <AnimatePresence>
        {showStory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#FAF5EF] border border-[#8C6239]/30 rounded-2xl p-6 max-w-lg w-full relative shadow-2xl text-[#2D241C]"
            >
              <button 
                onClick={() => setShowStory(false)}
                className="absolute top-4 right-4 p-1 rounded-full bg-[#F3EBE0] hover:bg-[#E9DFD3] text-[#5C4E43] hover:text-[#2D241C] transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-4 mb-4">
                <img 
                  src="https://www.image2url.com/r2/default/images/1782749784839-a01b6ede-101a-4ae3-89d9-4c5c3f3e8336.jpg" 
                  alt="Dukamo Logo" 
                  className="w-24 h-24 rounded-full border-2 border-[#8C6239] shadow-lg object-cover bg-white"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#2D241C]">DUKAMO COFFEE</h3>
                  <p className="text-xs text-[#8C6239] font-mono tracking-widest uppercase font-bold">Bole Sanctuary, Addis Ababa</p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-[#4A3F35] leading-relaxed font-sans">
                <p>
                  Welcome to <strong className="text-[#2D241C]">Dukamo Coffee</strong>, a premier destination for coffee connoisseurs in the heart of Bole, Addis Ababa. Powered by the meticulous craftsmanship of <strong className="text-[#8C6239]">Buncho Coffee</strong>, we offer a coffee experience deeply rooted in Sidama heritage.
                </p>
                <p>
                  Our interior is a physical manifestation of comfort and design, boasting a striking light oak and warm bamboo slatted ceiling paired with rich natural wood lounges, concrete accents, and warm ambient light.
                </p>
                <p>
                  We roast and brew with extreme precision, sourcing single-origin lots from world-renowned Sidama micro-regions: Hamasho (Natural), Arbegona (Washed), and Buncho (Honey). Our kitchen maps fresh, vibrant presentations in signature bowls and gourmet burgers.
                </p>
                
                <div className="pt-4 border-t border-[#E3D7C8] flex flex-col gap-2 text-xs font-mono text-[#5C4E43]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#8C6239]" />
                    <span className="font-semibold">8:00 AM – 9:00 PM Daily</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#8C6239]" />
                    <span className="font-semibold">Bole, behind Edna Mall, Addis Ababa, Ethiopia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Coffee className="w-3.5 h-3.5 text-[#8C6239]" />
                    <span className="font-semibold">Single-Origin Sidama Specialty Selection</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowStory(false)}
                className="mt-6 w-full py-2.5 bg-gradient-to-r from-[#8C6239] to-[#A37D55] hover:from-[#704E2D] hover:to-[#8C6239] text-white font-semibold rounded-xl text-sm transition-all shadow-sm"
              >
                Explore the Menu
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
