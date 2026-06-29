import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Coffee, Sparkles, CheckCircle2, ChevronRight, Pencil } from 'lucide-react';
import { MenuItem } from '../types';

interface ItemCardProps {
  item: MenuItem;
  onSelectItem: (item: MenuItem, selectedSize?: any) => void;
  onAddToBasket: (item: MenuItem, selectedSize?: any) => void;
  isAdmin?: boolean;
  onEdit?: (item: MenuItem) => void;
  key?: string | number;
}

export default function ItemCard({ item, onSelectItem, onAddToBasket, isAdmin = false, onEdit }: ItemCardProps) {
  const hasMultiplePrices = !!item.prices;
  const [selectedSize, setSelectedSize] = useState<'small' | 'large'>('small');

  // Derive active price
  let activePrice: number;
  if (hasMultiplePrices && item.prices) {
    activePrice = selectedSize === 'small' ? item.prices.small : item.prices.large;
  } else {
    activePrice = Number(item.price);
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      whileHover={{ y: -6, borderColor: 'rgba(240, 159, 29, 0.55)' }}
      transition={{ duration: 0.3 }}
      className="group bg-[#A06603] border border-[#F09F1D]/20 rounded-2xl overflow-hidden flex flex-col h-full shadow-md hover:shadow-xl hover:shadow-[#F09F1D]/10 transition-all duration-300"
    >
      
      {/* Card Header Media - Visual mapping */}
      {item.image ? (
        <div 
          onClick={() => onSelectItem(item, hasMultiplePrices ? selectedSize : undefined)}
          className="relative h-48 w-full overflow-hidden bg-stone-100 cursor-pointer"
        >
          {/* Overlay tag for Specialty Bowls */}
          {item.isSpecialty && (
            <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider bg-[#FAF5EF]/95 border border-[#F09F1D]/40 text-[#F09F1D] flex items-center gap-1.5 backdrop-blur-md shadow-sm font-semibold">
              <Sparkles className="w-3 h-3 text-[#F09F1D] animate-pulse" />
              Chef's Special
            </span>
          )}

          {/* Soft overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#A06603]/60 via-transparent to-transparent z-10 opacity-70 group-hover:opacity-40 transition-opacity" />
          <motion.img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
      ) : (
        /* Minimalist text/coffee icon header for coffee drinks */
        <div 
          onClick={() => onSelectItem(item, hasMultiplePrices ? selectedSize : undefined)}
          className="relative py-6 px-4 bg-gradient-to-br from-[#A06603] to-[#F09F1D]/5 flex items-center justify-between border-b border-[#F09F1D]/15 cursor-pointer"
        >
          <div className="p-3 bg-[#F09F1D]/20 rounded-xl text-white group-hover:bg-[#F09F1D]/30 transition-all duration-300">
            <Coffee className="w-5 h-5" />
          </div>
          
          {item.isSpecialty && (
            <span className="px-2.5 py-0.5 rounded-full text-[8px] font-mono uppercase tracking-wider bg-[#FAF5EF] border border-[#F09F1D]/30 text-[#F09F1D] font-bold shadow-sm">
              Signature
            </span>
          )}
        </div>
      )}

      {/* Item Details Container */}
      <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between bg-[#A06603] group-hover:bg-gradient-to-b group-hover:from-[#A06603] group-hover:to-[#A06603]/90 transition-colors duration-300">
        
        {/* Core Info */}
        <div className="cursor-pointer" onClick={() => onSelectItem(item, hasMultiplePrices ? selectedSize : undefined)}>
          <div className="flex items-start justify-between gap-2 mb-1.5 sm:mb-2">
            <h3 className="font-serif text-sm sm:text-lg font-bold text-white group-hover:text-amber-200 transition-colors leading-tight">
              {item.name}
            </h3>
          </div>
          
          {/* Ingredients / Descriptions */}
          {item.ingredients ? (
            <p className="text-[10px] sm:text-xs text-amber-50/80 line-clamp-2 leading-relaxed mb-3 sm:mb-4">
              {item.ingredients}
            </p>
          ) : item.description ? (
            <p className="text-[10px] sm:text-xs text-amber-50/80 line-clamp-2 leading-relaxed mb-3 sm:mb-4 italic">
              {item.description}
            </p>
          ) : (
            <p className="text-[10px] sm:text-xs text-amber-50/70 mb-3 sm:mb-4 italic">
              Brewed by professional baristas.
            </p>
          )}
        </div>

        {/* Pricing, Sizes & Interactive Button */}
        <div>
          {/* Dual Size Selector Option */}
          {hasMultiplePrices && (
            <div className="flex items-center gap-1 mb-2.5 sm:mb-3 bg-black/20 p-0.5 sm:p-1 rounded-lg w-fit border border-[#F09F1D]/20">
              <button
                type="button"
                onClick={() => setSelectedSize('small')}
                className={`px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[8px] sm:text-[10px] font-mono uppercase rounded transition-all ${
                  selectedSize === 'small'
                    ? 'bg-[#F09F1D] text-white font-bold shadow-sm'
                    : 'text-amber-100 hover:text-white'
                }`}
              >
                Std
              </button>
              <button
                type="button"
                onClick={() => setSelectedSize('large')}
                className={`px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[8px] sm:text-[10px] font-mono uppercase rounded transition-all ${
                  selectedSize === 'large'
                    ? 'bg-[#F09F1D] text-white font-bold shadow-sm'
                    : 'text-amber-100 hover:text-white'
                }`}
              >
                Lrg
              </button>
            </div>
          )}

          {/* Pricing Bottom Row */}
          <div className="flex items-center justify-between pt-2.5 sm:pt-3 border-t border-[#F09F1D]/20">
            <div>
              <p className="text-[8px] sm:text-[10px] font-mono text-amber-200/80 uppercase tracking-widest">Price</p>
              <p className="text-sm sm:text-base font-serif font-bold text-white group-hover:text-amber-200 transition-colors flex items-baseline gap-0.5">
                <span>{activePrice}</span>
                <span className="text-[8px] sm:text-[10px] font-sans font-semibold text-amber-100/80 tracking-wider">ETB</span>
              </p>
            </div>

            {/* Quick Add Actions */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              {isAdmin && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.(item);
                  }}
                  className="p-1.5 sm:p-2 bg-white/10 hover:bg-[#F09F1D]/30 text-white rounded-lg transition-all border border-white/10"
                  title="Admin: Edit Item"
                >
                  <Pencil className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                </button>
              )}
              
              <button
                onClick={() => onSelectItem(item, hasMultiplePrices ? selectedSize : undefined)}
                className="p-1.5 sm:p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all text-[10px] sm:text-xs flex items-center gap-0.5 sm:gap-1 font-medium border border-white/10"
                title="View details and customize"
              >
                <span className="hidden xs:inline">Details</span>
                <ChevronRight className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              </button>

              <motion.button
                onClick={() => onAddToBasket(item, hasMultiplePrices ? selectedSize : undefined)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-1.5 sm:p-2 bg-[#F09F1D] hover:bg-[#FAF5EF] hover:text-[#A06603] text-white rounded-lg transition-all flex items-center justify-center font-bold shadow-sm"
                title="Add to order calculator"
              >
                <Plus className="w-3.5 sm:w-4 h-3.5 sm:h-4 font-bold" />
              </motion.button>
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
