import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Check, Coffee, Sparkles, ShoppingBag, Plus, Minus, Info } from 'lucide-react';
import { MenuItem } from '../types';

interface ItemModalProps {
  item: MenuItem;
  initialSize?: 'small' | 'large';
  onClose: () => void;
  onAddToBasket: (item: MenuItem, selectedSize: 'small' | 'large' | 'standard', quantity: number, customizations: string[], addedCost: number) => void;
}

export default function ItemModal({ item, initialSize = 'small', onClose, onAddToBasket }: ItemModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<'small' | 'large' | 'standard'>(
    item.prices ? initialSize : 'standard'
  );
  
  // Customization States
  const [milkOption, setMilkOption] = useState<string>('Standard');
  const [sweetenerOption, setSweetenerOption] = useState<string>('None');
  const [extraShot, setExtraShot] = useState<boolean>(false);
  
  const [extraAvocado, setExtraAvocado] = useState<boolean>(false);
  const [extraProtein, setExtraProtein] = useState<boolean>(false);
  const [extraChili, setExtraChili] = useState<boolean>(false);
  const [customDressing, setCustomDressing] = useState<string>('House Dressing');

  const [tastingNoteSelected, setTastingNoteSelected] = useState<string>('Hamasho');

  // Pricing derivation
  let basePrice = 0;
  if (item.prices) {
    basePrice = selectedSize === 'small' ? item.prices.small : item.prices.large;
  } else {
    basePrice = Number(item.price);
  }

  // Calculate customization extra costs
  let extraCost = 0;
  const activeCustomizations: string[] = [];

  if (item.category === 'black-coffee' || item.category === 'milk-coffee') {
    if (milkOption !== 'Standard') {
      const milkCost = milkOption === 'Oat Milk' ? 50 : milkOption === 'Almond Milk' ? 60 : 30;
      extraCost += milkCost;
      activeCustomizations.push(`${milkOption} (+${milkCost} ETB)`);
    }
    if (sweetenerOption !== 'None') {
      activeCustomizations.push(`Sweetener: ${sweetenerOption}`);
    }
    if (extraShot) {
      extraCost += 50;
      activeCustomizations.push('Extra Espresso Shot (+50 ETB)');
    }
  }

  if (item.category === 'bowls' || item.category === 'burgers') {
    if (extraAvocado) {
      extraCost += 60;
      activeCustomizations.push('Extra Avocado (+60 ETB)');
    }
    if (extraProtein) {
      extraCost += 120;
      activeCustomizations.push('Extra Protein/Patty (+120 ETB)');
    }
    if (extraChili) {
      activeCustomizations.push('Add Green Chili/Jalapeño');
    }
    if (customDressing !== 'House Dressing') {
      activeCustomizations.push(`Dressing: ${customDressing}`);
    }
  }

  const finalUnitPrice = basePrice + extraCost;
  const totalCost = finalUnitPrice * quantity;

  // Single origin details for Sidama Slam
  const tastingDetails: Record<string, { process: string; notes: string; altitude: string; region: string }> = {
    Hamasho: {
      process: 'Natural Process',
      notes: 'Bergamot, jasmine, honey, apricot sweet finish',
      altitude: '2,300m',
      region: 'Sidama, Arbegona'
    },
    Arbegona: {
      process: 'Washed Process',
      notes: 'Bright peach acidity, lemongrass, silky white tea mouthfeel',
      altitude: '2,200m - 2,460m',
      region: 'Sidama, Arbegona'
    },
    Buncho: {
      process: 'Honey Process',
      notes: 'Creamy caramel, dark berries, candied orange peel',
      altitude: '2,100m',
      region: 'Sidama, Buncho'
    }
  };

  const handleAdd = () => {
    onAddToBasket(item, selectedSize, quantity, activeCustomizations, extraCost);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ type: "spring", damping: 25, stiffness: 220 }}
        className="bg-[#121212] border border-[#C49A6C]/20 rounded-2xl max-w-2xl w-full relative shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        
        {/* Modal Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#121212]/80 backdrop-blur-sm border border-[#C49A6C]/10 text-gray-400 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto flex-1">
          {/* Modal Header Image / Media */}
          {item.image ? (
            <div className="relative h-64 sm:h-72 w-full bg-black/40">
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/30 to-transparent z-10" />
              <img
                src={item.image}
                alt={item.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {item.isSpecialty && (
                <span className="absolute bottom-4 left-5 z-20 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-black/85 border border-[#C49A6C]/50 text-[#C49A6C] flex items-center gap-1.5 backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-[#C49A6C] animate-pulse" />
                  Gourmet Signature
                </span>
              )}
            </div>
          ) : (
            <div className="pt-12 pb-6 px-6 bg-gradient-to-br from-[#1c1c1c] to-[#242424] border-b border-[#C49A6C]/10 flex flex-col items-center">
              <div className="p-4 bg-[#C49A6C]/10 rounded-full text-[#C49A6C] mb-3">
                <Coffee className="w-8 h-8" />
              </div>
              {item.isSpecialty && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/60 border border-[#C49A6C]/30 text-[#C49A6C] mb-2">
                  Buncho Barista Special
                </span>
              )}
            </div>
          )}

          {/* Modal Body Content */}
          <div className="p-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F4F4F2] mb-2">
              {item.name}
            </h2>

            {/* Category badge */}
            <p className="text-xs text-[#C49A6C] font-mono tracking-wider uppercase mb-4 flex items-center gap-2">
              <span>Category: {item.category.replace('-', ' ')}</span>
              <span className="text-gray-600">•</span>
              <span>Bole Sanctuary</span>
            </p>

            {/* Ingredients or Descriptions */}
            <div className="bg-[#1c1c1c] border border-white/5 p-4 rounded-xl mb-6">
              <h4 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-1.5 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-[#C49A6C]" />
                Description & Ingredients
              </h4>
              <p className="text-sm text-gray-300 leading-relaxed font-sans">
                {item.ingredients || item.description || 'Our signature high-grade coffee brewed directly on the bar with custom ground beans processed in our cooperative wash stations in Arbegona, Sidama.'}
              </p>
            </div>

            {/* Specialty Coffee Tasting Notes Selector (If Sidama Slam is selected) */}
            {item.id === 'special-slam' && (
              <div className="mb-6 border border-[#C49A6C]/20 rounded-xl p-4 bg-[#1c1c1c]">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#C49A6C] mb-3 font-semibold">
                  🌿 Interactive Tasting Flight Guide
                </h4>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {Object.keys(tastingDetails).map((orig) => (
                    <button
                      key={orig}
                      type="button"
                      onClick={() => setTastingNoteSelected(orig)}
                      className={`py-2 px-1 text-center text-xs rounded-lg font-semibold font-serif border transition-all cursor-pointer ${
                        tastingNoteSelected === orig
                          ? 'bg-[#C49A6C] text-[#121212] border-[#C49A6C]'
                          : 'bg-[#242424] text-gray-300 border-transparent hover:bg-[#2c2c2c]'
                      }`}
                    >
                      {orig}
                    </button>
                  ))}
                </div>
                
                <div className="p-3 bg-black/40 rounded-lg text-xs font-sans space-y-1.5 border border-white/5">
                  <p className="text-[#C49A6C] font-mono text-[10px] uppercase tracking-wider font-semibold">
                    {tastingDetails[tastingNoteSelected].process}
                  </p>
                  <p className="text-white font-serif text-sm italic">
                    "{tastingDetails[tastingNoteSelected].notes}"
                  </p>
                  <div className="flex justify-between text-gray-400 font-mono text-[10px] pt-1.5 border-t border-white/5">
                    <span>Altitude: {tastingDetails[tastingNoteSelected].altitude}</span>
                    <span>Region: {tastingDetails[tastingNoteSelected].region}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Size selection (If dual-pricing exist) */}
            {item.prices && (
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-2 font-semibold">
                  Select Size
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedSize('small')}
                    className={`p-3 text-left rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                      selectedSize === 'small'
                        ? 'border-[#C49A6C] bg-[#C49A6C]/5 text-[#C49A6C]'
                        : 'border-white/5 bg-[#1c1c1c] text-gray-300 hover:bg-[#222]'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-semibold uppercase font-mono">Standard Size</p>
                      <p className="text-sm font-serif text-white font-bold">{item.prices.small} ETB</p>
                    </div>
                    {selectedSize === 'small' && <Check className="w-4 h-4 text-[#C49A6C]" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedSize('large')}
                    className={`p-3 text-left rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                      selectedSize === 'large'
                        ? 'border-[#C49A6C] bg-[#C49A6C]/5 text-[#C49A6C]'
                        : 'border-white/5 bg-[#1c1c1c] text-gray-300 hover:bg-[#222]'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-semibold uppercase font-mono">Large Size</p>
                      <p className="text-sm font-serif text-white font-bold">{item.prices.large} ETB</p>
                    </div>
                    {selectedSize === 'large' && <Check className="w-4 h-4 text-[#C49A6C]" />}
                  </button>
                </div>
              </div>
            )}

            {/* Coffee Customizations */}
            {(item.category === 'black-coffee' || item.category === 'milk-coffee') && (
              <div className="space-y-4 mb-6">
                {/* Milk Selector (if milk-based) */}
                {item.category === 'milk-coffee' && (
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-2 font-semibold">
                      Milk Type
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['Standard', 'Soy Milk (+30)', 'Oat Milk (+50)', 'Almond Milk (+60)'].map((milk) => {
                        const plainName = milk.split(' (')[0];
                        const isSelected = milkOption === plainName;
                        return (
                          <button
                            key={milk}
                            type="button"
                            onClick={() => setMilkOption(plainName)}
                            className={`py-2 px-1 text-center text-xs rounded-lg border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#C49A6C]/10 text-[#C49A6C] border-[#C49A6C]'
                                : 'bg-[#1c1c1c] text-gray-300 border-white/5 hover:bg-[#242424]'
                            }`}
                          >
                            {milk}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Sweetener */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-2 font-semibold">
                    Sweetener
                  </h4>
                  <div className="grid grid-cols-4 gap-2">
                    {['None', 'Brown Sugar', 'Honey', 'Stevia'].map((swe) => {
                      const isSelected = sweetenerOption === swe;
                      return (
                        <button
                          key={swe}
                          type="button"
                          onClick={() => setSweetenerOption(swe)}
                          className={`py-2 px-1 text-center text-[11px] sm:text-xs rounded-lg border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#C49A6C]/10 text-[#C49A6C] border-[#C49A6C]'
                              : 'bg-[#1c1c1c] text-gray-300 border-white/5 hover:bg-[#242424]'
                          }`}
                        >
                          {swe}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Extra Shot Option */}
                <div className="pt-2">
                  <label className="flex items-center justify-between p-3 bg-[#1c1c1c] border border-white/5 rounded-xl cursor-pointer">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-white">Add Extra Espresso Shot</span>
                      <span className="text-xs text-gray-400 font-mono">Premium Buncho Single-Origin Roast (+50 ETB)</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={extraShot}
                      onChange={() => setExtraShot(!extraShot)}
                      className="w-5 h-5 accent-[#C49A6C] bg-black border-white/10 rounded cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* Bowls & Burgers Customizations */}
            {(item.category === 'bowls' || item.category === 'burgers') && (
              <div className="space-y-4 mb-6">
                <h4 className="text-xs font-mono uppercase tracking-widest text-gray-400 font-semibold mb-2">
                  Customize Ingredients & Add-ons
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-center justify-between p-3 bg-[#1c1c1c] border border-white/5 rounded-xl cursor-pointer">
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-white">Extra Sliced Avocado</span>
                      <span className="text-[10px] text-gray-400 font-mono">+60 ETB</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={extraAvocado}
                      onChange={() => setExtraAvocado(!extraAvocado)}
                      className="w-4 h-4 accent-[#C49A6C]"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 bg-[#1c1c1c] border border-white/5 rounded-xl cursor-pointer">
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-white">Extra Protein (Patty/Chicken)</span>
                      <span className="text-[10px] text-gray-400 font-mono">+120 ETB</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={extraProtein}
                      onChange={() => setExtraProtein(!extraProtein)}
                      className="w-4 h-4 accent-[#C49A6C]"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 bg-[#1c1c1c] border border-white/5 rounded-xl cursor-pointer">
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-white">Fresh Green Chili / Jalapeño</span>
                      <span className="text-[10px] text-green-500 font-mono">Free Local Spicy kick</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={extraChili}
                      onChange={() => setExtraChili(!extraChili)}
                      className="w-4 h-4 accent-[#C49A6C]"
                    />
                  </label>
                </div>

                {/* Dressing choice */}
                <div className="pt-2">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">
                    Choice of House Dressing
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {['House Dressing', 'Garlic Cream Mayo', 'Cilantro Lime Green'].map((dress) => {
                      const isSelected = customDressing === dress;
                      return (
                        <button
                          key={dress}
                          type="button"
                          onClick={() => setCustomDressing(dress)}
                          className={`py-2 px-1 text-center text-[10px] sm:text-xs rounded-lg border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#C49A6C]/10 text-[#C49A6C] border-[#C49A6C]'
                              : 'bg-[#1c1c1c] text-gray-300 border-white/5 hover:bg-[#242424]'
                          }`}
                        >
                          {dress}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Modal Sticky Footer - Quantity & Order placement */}
        <div className="p-5 border-t border-[#C49A6C]/10 bg-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Quantity Controls */}
          <div className="flex items-center gap-3 bg-black/40 p-1.5 rounded-xl border border-white/5">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 bg-[#242424] hover:bg-[#323232] text-white rounded-lg transition-all"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-mono text-base font-bold text-white px-3 w-8 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 bg-[#242424] hover:bg-[#323232] text-white rounded-lg transition-all"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Pricing Total & Add Button */}
          <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
            <div className="text-left sm:text-right">
              <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Total cost</p>
              <p className="text-xl font-serif font-extrabold text-[#C49A6C]">
                {totalCost} <span className="text-xs font-sans font-medium text-gray-300">ETB</span>
              </p>
            </div>

            <button
              onClick={handleAdd}
              className="px-6 py-3 bg-[#C49A6C] hover:bg-[#D2B48C] text-[#121212] font-semibold text-sm rounded-xl flex items-center gap-2 shadow-lg transition-all cursor-pointer hover:scale-[1.02]"
            >
              <ShoppingBag className="w-4 h-4 font-bold" />
              <span>Add to Bill Calculator</span>
            </button>
          </div>

        </div>

      </motion.div>
    </div>
  );
}
