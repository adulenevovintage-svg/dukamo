import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coffee, 
  MapPin, 
  Clock, 
  Sparkles, 
  Search, 
  ChevronRight, 
  Compass, 
  AlertCircle, 
  ShoppingBag, 
  Calculator,
  ArrowRight,
  Heart
} from 'lucide-react';

import { CategoryType, MenuItem, BasketItem } from './types';
import { MENU_ITEMS } from './data';

// Component Imports
import Header from './components/Header';
import Hero from './components/Hero';
import ItemCard from './components/ItemCard';
import ItemModal from './components/ItemModal';
import SlamFlight from './components/SlamFlight';
import BasketDrawer from './components/BasketDrawer';
import VibeGallery from './components/VibeGallery';
import FeedbackBoard from './components/FeedbackBoard';

// Reusable scroll reveal helper for premium fade & slide-up transitions
function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number; key?: React.Key }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<{ item: MenuItem; size?: 'small' | 'large' } | null>(null);
  const [basket, setBasket] = useState<BasketItem[]>([]);
  const [isBasketOpen, setIsBasketOpen] = useState<boolean>(false);

  const menuRef = useRef<HTMLElement>(null);
  const shouldScrollRef = useRef(false);

  useEffect(() => {
    if (shouldScrollRef.current) {
      menuRef.current?.scrollIntoView({ behavior: 'smooth' });
      shouldScrollRef.current = false;
    }
  }, [activeCategory]);

  const handleCategoryChange = (cat: CategoryType) => {
    if (cat !== activeCategory) {
      shouldScrollRef.current = true;
    }
    setActiveCategory(cat);
    setSearchQuery(''); // reset search on category swap
  };

  // Custom toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Select Item Handler
  const handleSelectItem = (item: MenuItem, size?: 'small' | 'large') => {
    setSelectedItem({ item, size });
  };

  // Add directly from card (default parameters)
  const handleDirectAddToBasket = (item: MenuItem, selectedSize?: 'small' | 'large') => {
    const defaultSize = item.prices ? (selectedSize || 'small') : 'standard';
    
    setBasket((prev) => {
      const existingIndex = prev.findIndex(
        (bi) => bi.item.id === item.id && bi.selectedSize === defaultSize
      );

      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += 1;
        return copy;
      } else {
        return [...prev, { item, quantity: 1, selectedSize: defaultSize as any }];
      }
    });

    showToast(`Added ${item.name} to order calculator`);
  };

  // Add customized from modal
  const handleModalAddToBasket = (
    item: MenuItem,
    selectedSize: 'small' | 'large' | 'standard',
    quantity: number,
    customizations: string[],
    addedCost: number
  ) => {
    // Create a modified menu item containing customized info to show on the calculator
    const modifiedItem: MenuItem = {
      ...item,
      name: customizations.length > 0 
        ? `${item.name} (${customizations.map(c => c.split(' (+')[0]).join(', ')})`
        : item.name,
      price: item.prices 
        ? (selectedSize === 'small' ? item.prices.small : item.prices.large) + addedCost
        : Number(item.price) + addedCost
    };

    setBasket((prev) => {
      // Find if identical customized item exists
      const existingIndex = prev.findIndex(
        (bi) => bi.item.id === item.id && 
                bi.selectedSize === selectedSize && 
                bi.item.name === modifiedItem.name
      );

      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      } else {
        return [...prev, { item: modifiedItem, quantity, selectedSize: selectedSize as any }];
      }
    });

    showToast(`Added ${quantity}x ${item.name} with customizations`);
  };

  // Basket Actions
  const handleRemoveItem = (index: number) => {
    const itemToRemove = basket[index];
    setBasket((prev) => prev.filter((_, i) => i !== index));
    showToast(`Removed ${itemToRemove.item.name} from calculator`);
  };

  const handleUpdateQuantity = (index: number, change: number) => {
    setBasket((prev) => {
      const copy = [...prev];
      const newQty = copy[index].quantity + change;
      if (newQty <= 0) {
        return prev.filter((_, i) => i !== index);
      } else {
        copy[index].quantity = newQty;
        return copy;
      }
    });
  };

  const handleClearBasket = () => {
    setBasket([]);
    showToast('Cleared order calculator');
  };

  const CATEGORY_WORDS: Record<CategoryType, string> = {
    all: 'SANCTUARY',
    specials: 'SIGNATURES',
    bowls: 'FRESH BOWLS',
    burgers: 'GOURMET',
    'black-coffee': 'PURE BLACK',
    'milk-coffee': 'SILKY MILK',
    'non-coffee': 'ORGANIC TEAS',
    juices: 'JUICE & CO',
  };

  // Filtering Logic
  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.ingredients && item.ingredients.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // Group items by category for dashboard 'All' view
  const signatureSamplers = filteredItems.filter(item => item.category === 'specials');
  const specialtyBowls = filteredItems.filter(item => item.category === 'bowls');
  const burgers = filteredItems.filter(item => item.category === 'burgers');
  const blackCoffees = filteredItems.filter(item => item.category === 'black-coffee');
  const milkBased = filteredItems.filter(item => item.category === 'milk-coffee');
  const nonCoffeeTeas = filteredItems.filter(item => item.category === 'non-coffee');
  const juices = filteredItems.filter(item => item.category === 'juices');

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF5EF] via-[#F3A577] to-[#E36A29] text-[#2D241C] font-sans antialiased overflow-x-hidden selection:bg-[#8C6239] selection:text-white relative">
      
      {/* Absolute Full Page Backdrop Watermark Signal */}
      <div className="absolute inset-x-0 overflow-hidden pointer-events-none select-none -z-10 h-[1500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 0.04, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute top-[350px] left-1/2 -translate-x-1/2 text-[4rem] xs:text-[6rem] sm:text-[12rem] md:text-[16rem] font-serif font-black tracking-tighter text-[#8C6239] uppercase text-center leading-none whitespace-nowrap"
          >
            {CATEGORY_WORDS[activeCategory] || 'SANCTUARY'}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Full Page Category Transition Sweep Signal */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={`sweep-${activeCategory}`}
          initial={{ top: "0%", opacity: 0.8 }}
          animate={{ top: "100%", opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="fixed left-0 right-0 h-4 bg-gradient-to-b from-[#8C6239]/20 via-[#C49A6C]/40 to-transparent z-50 pointer-events-none"
        />
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#8C6239] text-white px-5 py-3 rounded-xl shadow-xl font-mono text-xs font-semibold tracking-wider uppercase border border-[#E3D7C8] flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Sticky Container */}
      <Header
        activeCategory={activeCategory}
        setActiveCategory={handleCategoryChange}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        basket={basket}
        onOpenBasket={() => setIsBasketOpen(true)}
      />

      {/* Hero Visual Block */}
      <Hero />

      {/* Interactive Floating Quick Basket Pill (shown when items are in calculator) */}
      {basket.length > 0 && !isBasketOpen && (
        <motion.div
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="fixed bottom-4 sm:bottom-6 left-4 sm:left-auto sm:right-6 z-30 w-[calc(100%-2rem)] sm:w-auto"
        >
          <button
            onClick={() => setIsBasketOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 bg-gradient-to-r from-[#8C6239] to-[#A37D55] text-white rounded-full shadow-2xl font-bold text-xs tracking-wider uppercase border border-[#E3D7C8]/40 hover:scale-[1.03] sm:hover:scale-105 transition-all cursor-pointer"
          >
            <Calculator className="w-4 h-4" />
            <span>Bill Calculator ({basket.reduce((sum, i) => sum + i.quantity, 0)})</span>
          </button>
        </motion.div>
      )}

      {/* Main Content Area */}
      <main ref={menuRef} className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 space-y-16 scroll-mt-28">
        
        {/* Search Results Summary Label */}
        {searchQuery && (
          <div className="bg-[#FAF5EF] border border-[#E3D7C8] p-4 rounded-2xl flex items-center justify-between shadow-sm">
            <p className="text-sm font-sans text-[#5C4E43] font-medium">
              Search results for "<strong className="text-[#8C6239]">{searchQuery}</strong>": found {filteredItems.length} items
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs font-mono uppercase tracking-wider text-[#5C4E43] hover:text-[#2D241C]"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Dynamic Category Render Layout */}
        <motion.div 
          key={activeCategory}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-12"
        >
          
          {filteredItems.length === 0 ? (
            /* No Results fallback */
            <div className="py-20 text-center space-y-4 max-w-md mx-auto">
              <AlertCircle className="w-12 h-12 text-[#8C6239] mx-auto animate-bounce" />
              <div className="space-y-1.5">
                <h4 className="font-serif text-lg font-bold text-[#2D241C]">No items found matching your filter</h4>
                <p className="text-xs text-[#5C4E43] leading-relaxed font-sans font-medium">
                  We couldn't find matches for "{searchQuery}". Try selecting another category or typing another item.
                </p>
              </div>
            </div>
          ) : activeCategory !== 'all' ? (
            /* SINGLE CATEGORY GRID VIEW */
            <div className="space-y-6">
              <ScrollReveal>
                <div className="border-l-4 border-[#8C6239] pl-4 pb-1">
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D241C] capitalize flex items-center gap-2 uppercase tracking-wide italic">
                    <span>{activeCategory.replace('-', ' ')}</span>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#8C6239] font-bold pl-2 border-l border-[#8C6239]/30 ml-2">
                      Bole Craft
                    </span>
                  </h3>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item, index) => (
                  <ScrollReveal key={item.id} delay={Math.min(index * 0.05, 0.3)}>
                    <ItemCard
                      item={item}
                      onSelectItem={handleSelectItem}
                      onAddToBasket={handleDirectAddToBasket}
                    />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ) : (
            /* ALL / DASHBOARD STRUCTURED VIEW (Crafted hierarchy instead of massive flat grid) */
            <div className="space-y-16">
              
              {/* 1. BLACK COFFEES & JEBENA */}
              {blackCoffees.length > 0 && (
                <div className="space-y-6">
                  <ScrollReveal>
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-l-4 border-[#8C6239] pl-4 pb-1">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C6239] font-bold">
                          Aromatic & Intense
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D241C] mt-0.5 tracking-wide italic uppercase">
                          Pure Black Coffee Selection
                        </h3>
                      </div>
                      <button 
                        onClick={() => handleCategoryChange('black-coffee')}
                        className="text-xs font-mono text-[#8C6239] hover:text-[#2D241C] flex items-center gap-0.5 transition-colors self-start sm:self-auto font-bold"
                      >
                        <span>See All Black Coffee</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </ScrollReveal>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {blackCoffees.map((item, index) => (
                      <ScrollReveal key={item.id} delay={Math.min(index * 0.05, 0.3)}>
                        <ItemCard
                          item={item}
                          onSelectItem={handleSelectItem}
                          onAddToBasket={handleDirectAddToBasket}
                        />
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. MILK BASED HOT DRINKS */}
              {milkBased.length > 0 && (
                <div className="space-y-6">
                  <ScrollReveal>
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-l-4 border-[#8C6239] pl-4 pb-1">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C6239] font-bold">
                          Silky Micro-foam
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D241C] mt-0.5 tracking-wide italic uppercase">
                          Milk-Based & Hot Drinks
                        </h3>
                      </div>
                      <button 
                        onClick={() => handleCategoryChange('milk-coffee')}
                        className="text-xs font-mono text-[#8C6239] hover:text-[#2D241C] flex items-center gap-0.5 transition-colors self-start sm:self-auto font-bold"
                      >
                        <span>See All Hot Drinks</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </ScrollReveal>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {milkBased.slice(0, 8).map((item, index) => (
                      <ScrollReveal key={item.id} delay={Math.min(index * 0.05, 0.3)}>
                        <ItemCard
                          item={item}
                          onSelectItem={handleSelectItem}
                          onAddToBasket={handleDirectAddToBasket}
                        />
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. NON COFFEE MATCHAS & TEAS */}
              {nonCoffeeTeas.length > 0 && (
                <div className="space-y-6">
                  <ScrollReveal>
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-l-4 border-[#8C6239] pl-4 pb-1">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C6239] font-bold">
                          Stone-ground & Herbal infusion
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D241C] mt-0.5 tracking-wide italic uppercase">
                          Matcha & Artisanal Teas
                        </h3>
                      </div>
                      <button 
                        onClick={() => handleCategoryChange('non-coffee')}
                        className="text-xs font-mono text-[#8C6239] hover:text-[#2D241C] flex items-center gap-0.5 transition-colors self-start sm:self-auto font-bold"
                      >
                        <span>See All Teas</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </ScrollReveal>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {nonCoffeeTeas.map((item, index) => (
                      <ScrollReveal key={item.id} delay={Math.min(index * 0.05, 0.3)}>
                        <ItemCard
                          item={item}
                          onSelectItem={handleSelectItem}
                          onAddToBasket={handleDirectAddToBasket}
                        />
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. FRESH JUICES & SMOOTHIES */}
              {juices.length > 0 && (
                <div className="space-y-6">
                  <ScrollReveal>
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-l-4 border-[#8C6239] pl-4 pb-1">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C6239] font-bold">
                          Pureed & Refreshing
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D241C] mt-0.5 tracking-wide italic uppercase">
                          Fresh Juices & Smoothies
                        </h3>
                      </div>
                      <button 
                        onClick={() => handleCategoryChange('juices')}
                        className="text-xs font-mono text-[#8C6239] hover:text-[#2D241C] flex items-center gap-0.5 transition-colors self-start sm:self-auto font-bold"
                      >
                        <span>See All Juices</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </ScrollReveal>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {juices.slice(0, 8).map((item, index) => (
                      <ScrollReveal key={item.id} delay={Math.min(index * 0.05, 0.3)}>
                        <ItemCard
                          item={item}
                          onSelectItem={handleSelectItem}
                          onAddToBasket={handleDirectAddToBasket}
                        />
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. VERIFIED SPECIALTY BOWLS WITH ORIGINAL MEDIA */}
              {specialtyBowls.length > 0 && (
                <div className="space-y-6">
                  <ScrollReveal>
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-l-4 border-[#8C6239] pl-4 pb-1">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C6239] font-bold">
                          Fresh Healthy Bowls
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D241C] mt-0.5 tracking-wide italic uppercase">
                          Specialty Bowls & Salads
                        </h3>
                      </div>
                      <button 
                        onClick={() => handleCategoryChange('bowls')}
                        className="text-xs font-mono text-[#8C6239] hover:text-[#2D241C] flex items-center gap-0.5 transition-colors self-start sm:self-auto font-bold"
                      >
                        <span>See All Bowls</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </ScrollReveal>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {specialtyBowls.map((item, index) => (
                      <ScrollReveal key={item.id} delay={Math.min(index * 0.05, 0.3)}>
                        <ItemCard
                          item={item}
                          onSelectItem={handleSelectItem}
                          onAddToBasket={handleDirectAddToBasket}
                        />
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. GOURMET BURGERS */}
              {burgers.length > 0 && (
                <div className="space-y-6">
                  <ScrollReveal>
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-l-4 border-[#8C6239] pl-4 pb-1">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C6239] font-bold">
                          Gourmet Main dishes
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D241C] mt-0.5 tracking-wide italic uppercase">
                          Dukamo Burgers
                        </h3>
                      </div>
                      <button 
                        onClick={() => handleCategoryChange('burgers')}
                        className="text-xs font-mono text-[#8C6239] hover:text-[#2D241C] flex items-center gap-0.5 transition-colors self-start sm:self-auto font-bold"
                      >
                        <span>See All Burgers</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </ScrollReveal>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
                    {burgers.map((item, index) => (
                      <ScrollReveal key={item.id} delay={Math.min(index * 0.05, 0.3)}>
                        <ItemCard
                          item={item}
                          onSelectItem={handleSelectItem}
                          onAddToBasket={handleDirectAddToBasket}
                        />
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. DUKAMO SIGNATURE SAMPLERS & FLIGHTS */}
              {signatureSamplers.length > 0 && (
                <div className="space-y-6">
                  <ScrollReveal>
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-l-4 border-[#8C6239] pl-4 pb-1">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C6239] font-bold">
                          Gourmet Flights
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D241C] mt-0.5 tracking-wide italic uppercase">
                          Dukamo Signature Samplers
                        </h3>
                      </div>
                      <button 
                        onClick={() => handleCategoryChange('specials')}
                        className="text-xs font-mono text-[#8C6239] hover:text-[#2D241C] flex items-center gap-0.5 transition-colors self-start sm:self-auto font-bold"
                      >
                        <span>See All</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </ScrollReveal>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {signatureSamplers.map((item, index) => (
                      <ScrollReveal key={item.id} delay={Math.min(index * 0.05, 0.3)}>
                        <ItemCard
                          item={item}
                          onSelectItem={handleSelectItem}
                          onAddToBasket={handleDirectAddToBasket}
                        />
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </motion.div>

        {/* 8. INTERACTIVE SIDAMA SLAM FLIGHT EXPERIENCE BOARD */}
        <ScrollReveal>
          <SlamFlight />
        </ScrollReveal>

        {/* 9. SIGNATURE BOLE SANCTUARY WOOD DETAILS & INTERIOR */}
        <ScrollReveal>
          <VibeGallery />
        </ScrollReveal>

        {/* 10. GUESTBOOK GUEST INTERACTION REVIEWS BOARD */}
        <ScrollReveal>
          <FeedbackBoard />
        </ScrollReveal>

      </main>

      {/* FOOTER DETAIL BLOCK */}
      <footer className="bg-[#241F1A] border-t border-[#8C6239]/20 text-stone-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Brand Philosophy column */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <img 
                src="https://www.image2url.com/r2/default/images/1782749784839-a01b6ede-101a-4ae3-89d9-4c5c3f3e8336.jpg" 
                alt="Dukamo Logo" 
                className="w-16 h-16 rounded-full border-2 border-[#8C6239] object-cover bg-white"
                referrerPolicy="no-referrer"
              />
              <h4 className="font-serif text-xl font-bold text-white tracking-widest">DUKAMO COFFEE</h4>
            </div>
            <p className="text-xs font-sans font-light leading-relaxed max-w-sm text-stone-300">
              Powered by the roasters of <strong className="text-[#A37D55]">Buncho Coffee</strong>. Sourcing micro-lots exceeding 2,100 meters across Sidama. Hand-selected, masterfully extracted, and served in an architectural sanctuary.
            </p>
            <div className="flex gap-4 pt-1 font-mono text-[10px] text-stone-400">
              <a href="https://tiktok.com/@dukamocoffee" target="_blank" rel="noopener noreferrer" className="hover:text-[#A37D55] transition-colors">TikTok: @dukamocoffee</a>
              <span className="text-stone-600">|</span>
              <a href="#" className="hover:text-[#A37D55] transition-colors">Insta: @dukamocoffee</a>
            </div>
          </div>

          {/* Location & Directions */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white font-semibold">
              The Bole Sanctuary
            </h4>
            <div className="space-y-2.5 text-xs font-sans font-light text-stone-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#A37D55] mt-0.5 flex-shrink-0" />
                <span>Bole, behind Edna Mall, next to Buncho Cooperative Office, Addis Ababa, Ethiopia</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#A37D55] flex-shrink-0" />
                <span>Open Daily: 8:00 AM – 9:00 PM</span>
              </p>
              <p className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-[#A37D55] flex-shrink-0" />
                <span>Traditional Jebena Ceremony available on request</span>
              </p>
            </div>
          </div>

          {/* Local Addis Hospitality info */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white font-semibold">
              Bunna Bereka
            </h4>
            <p className="text-xs font-sans font-light leading-relaxed text-stone-300">
              "Bunna Bereka" is the traditional Ethiopian blessing of hospitality. We carry this heritage with contemporary design precision, ensuring every guest feels the deep warmth of Addis Ababa coffee culture.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-white">
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
              <span>Made with love in Ethiopia</span>
            </div>
          </div>

        </div>

        {/* Final copyright bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 mt-10 border-t border-[#8C6239]/10 text-center text-[10px] font-mono text-stone-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} DUKAMO COFFEE (Powered by Buncho Coffee). All rights reserved.</p>
          <p className="uppercase tracking-widest">Addis Ababa specialty coffee roasters</p>
        </div>
      </footer>

      {/* ITEM VIEW DETAILED MODAL */}
      <AnimatePresence>
        {selectedItem && (
          <ItemModal
            item={selectedItem.item}
            initialSize={selectedItem.size}
            onClose={() => setSelectedItem(null)}
            onAddToBasket={handleModalAddToBasket}
          />
        )}
      </AnimatePresence>

      {/* DIGITAL CALCULATOR BILL DRAWER */}
      <AnimatePresence>
        {isBasketOpen && (
          <BasketDrawer
            basket={basket}
            onClose={() => setIsBasketOpen(false)}
            onRemoveItem={handleRemoveItem}
            onClearBasket={handleClearBasket}
            onUpdateQuantity={handleUpdateQuantity}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
