import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Thermometer, Droplet, Sun, Wind, CheckCircle } from 'lucide-react';

interface FlightItem {
  id: string;
  name: string;
  process: string;
  processColor: string;
  altitude: string;
  notes: string;
  details: string;
  flavorProfile: {
    sweetness: number; // 1-10
    acidity: number;
    body: number;
    floral: number;
    berry: number;
  };
  cupImg: string;
  foodPairing: string;
}

export default function SlamFlight() {
  const [activeCup, setActiveCup] = useState<string>('hamasho');

  const flightData: Record<string, FlightItem> = {
    hamasho: {
      id: 'hamasho',
      name: 'Hamasho Lot',
      process: 'Natural Process',
      processColor: 'from-[#C49A6C] to-amber-700',
      altitude: '2,300 meters',
      notes: 'Bergamot, jasmine, honey, dried apricot sweet finish.',
      details: 'Grown on the high-altitude volcanic slopes of Arbegona, Hamasho undergoes meticulous hand-sorting before cherries are dried slowly on raised bamboo beds for 21 days. This natural process enhances intense stone fruit notes and a deep syrupy sweetness.',
      flavorProfile: {
        sweetness: 9,
        acidity: 7,
        body: 8,
        floral: 9,
        berry: 6
      },
      cupImg: '☕',
      foodPairing: 'Complements the rich, savory profile of the Dukamo Beef Burger.'
    },
    arbegona: {
      id: 'arbegona',
      name: 'Arbegona Reserve',
      process: 'Fully Washed Process',
      processColor: 'from-sky-700 to-indigo-900',
      altitude: '2,460 meters (Highest Peaks)',
      notes: 'Bright peach acidity, lemongrass, silky white tea mouthfeel.',
      details: 'Sourced from cooperative micro-lots exceeding 2,400m altitude. Cherries are double-fermented under cold spring water and washed pristine. It presents an incredibly clean, tea-like clarity, high cup score, and pristine lemongrass brightness.',
      flavorProfile: {
        sweetness: 6,
        acidity: 9,
        body: 5,
        floral: 10,
        berry: 7
      },
      cupImg: '🍵',
      foodPairing: 'Highly recommended alongside our fresh, zesty Garden Mix.'
    },
    buncho: {
      id: 'buncho',
      name: 'Buncho Honey',
      process: 'Honey Process',
      processColor: 'from-amber-500 to-amber-600',
      altitude: '2,100 meters',
      notes: 'Creamy caramel, dark wild berries, candied orange peel.',
      details: 'Representing the core sweetness of Buncho roasting methods. Part of the mucilage is left intact during drying, absorbing sweet fruit sugars back into the bean. This results in a heavy, buttery mouthfeel, wild dark cherry notes, and a chocolatey caramel finish.',
      flavorProfile: {
        sweetness: 10,
        acidity: 6,
        body: 9,
        floral: 6,
        berry: 8
      },
      cupImg: '🍯',
      foodPairing: 'A perfect sweet counter-balance to the savory Burrito Bowl Tuna.'
    }
  };

  const activeData = flightData[activeCup];

  return (
    <div className="bg-[#1a1a1a] border border-white/5 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
      
      {/* Decorative wood grain light background lines */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#1a1a1a]/90 to-[#121212] pointer-events-none" />
      
      <div className="relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C49A6C]/10 border border-[#C49A6C]/30 text-[#C49A6C] rounded-full text-[10px] font-mono uppercase tracking-widest font-semibold mb-3">
            <Award className="w-3.5 h-3.5" />
            Exclusive Tasting Flight
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2 uppercase tracking-wide italic">
            The Sidama Slam Flight
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
            A premium three-cup sensory exploration showcasing the incredible processing variety of our high-altitude Sidama micro-lots (1,000 ETB).
          </p>
        </div>

        {/* Visual Wooden Flight Board Layout */}
        <div className="bg-[#2a221b]/40 border border-[#C49A6C]/15 rounded-2xl p-5 mb-8 flex flex-col md:flex-row items-center justify-around gap-6 shadow-inner relative">
          
          {/* Aesthetic board background textures */}
          <div className="absolute inset-x-0 bottom-0 h-4 bg-[#121212]/40 rounded-b-2xl border-t border-white/5" />

          {Object.values(flightData).map((cup) => {
            const isActive = activeCup === cup.id;
            return (
              <button
                key={cup.id}
                onClick={() => setActiveCup(cup.id)}
                className="relative group flex flex-col items-center gap-3 py-4 px-6 rounded-xl transition-all w-full md:w-1/3 cursor-pointer"
              >
                {/* Active Indicator Board indentation */}
                {isActive && (
                  <motion.div
                    layoutId="activeCupIndentation"
                    className="absolute inset-0 bg-black/60 border border-[#C49A6C]/30 rounded-xl shadow-xl z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}

                {/* Cup Visual with steam animation */}
                <div className="relative z-10 flex flex-col items-center">
                  
                  {/* Subtle dynamic rising steam elements */}
                  {isActive && (
                    <div className="flex gap-1 justify-center -mt-4 mb-1 h-5 overflow-hidden">
                      <span className="w-[1.5px] bg-[#C49A6C]/40 rounded-full animate-[pulse_1.5s_infinite] h-4" />
                      <span className="w-[1.5px] bg-[#C49A6C]/60 rounded-full animate-[pulse_1.2s_infinite] h-5 delay-100" />
                      <span className="w-[1.5px] bg-[#C49A6C]/30 rounded-full animate-[pulse_1.8s_infinite] h-3 delay-300" />
                    </div>
                  )}

                  {/* Cup Shadow base */}
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-3xl transition-transform ${
                    isActive ? 'scale-110 rotate-6 shadow-lg shadow-[#C49A6C]/20 bg-gradient-to-tr from-[#241c15] to-[#423326] border border-[#C49A6C]/40' : 'bg-[#1c140e] hover:scale-105 border border-transparent'
                  }`}>
                    {cup.cupImg}
                  </div>
                </div>

                <div className="relative z-10 text-center">
                  <h4 className={`text-sm sm:text-base font-serif font-bold ${isActive ? 'text-[#C49A6C]' : 'text-gray-300 group-hover:text-white'}`}>
                    {cup.name}
                  </h4>
                  <p className="text-[10px] font-mono text-gray-400">
                    {cup.process}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Details with Framer Motion */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCup}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4 border-t border-[#C49A6C]/10"
          >
            {/* Sourcing & Narrative column */}
            <div className="space-y-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-[#C49A6C]/10 text-[#C49A6C] border border-[#C49A6C]/20 inline-block mb-2">
                  Origin Details
                </span>
                <h4 className="text-xl font-serif font-bold text-white mb-2">
                  {activeData.name} — {activeData.process}
                </h4>
                <p className="text-xs font-mono text-[#C49A6C] mb-3 flex items-center gap-1.5">
                  <Wind className="w-3.5 h-3.5" />
                  <span>Harvest Altitude: {activeData.altitude}</span>
                </p>
                <p className="text-sm text-gray-300 leading-relaxed font-sans font-light">
                  {activeData.details}
                </p>
              </div>

              {/* Pairing Tip */}
              <div className="bg-black/30 border border-[#C49A6C]/10 rounded-xl p-3.5 flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#C49A6C] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[10px] font-mono text-[#C49A6C] uppercase tracking-widest font-semibold">Gourmet Food Pairing</p>
                  <p className="text-xs text-gray-300 font-sans mt-0.5 leading-relaxed">{activeData.foodPairing}</p>
                </div>
              </div>
            </div>

            {/* Flavor Sensory Chart column */}
            <div className="space-y-4 bg-black/25 border border-white/5 p-5 rounded-2xl">
              <h5 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-3 flex items-center justify-between">
                <span>Sensory Flavor Profile</span>
                <span className="text-[#C49A6C]">10-Point Specialty scale</span>
              </h5>

              <div className="space-y-3">
                {/* Sweetness */}
                <div>
                  <div className="flex justify-between text-xs font-mono text-gray-300 mb-1">
                    <span>Honeyed Sweetness</span>
                    <span className="text-[#C49A6C]">{activeData.flavorProfile.sweetness}/10</span>
                  </div>
                  <div className="w-full bg-[#242424] h-2 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${activeData.flavorProfile.sweetness * 10}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="bg-gradient-to-r from-amber-600 to-[#C49A6C] h-full rounded-full"
                    />
                  </div>
                </div>

                {/* Acidity */}
                <div>
                  <div className="flex justify-between text-xs font-mono text-gray-300 mb-1">
                    <span>Bright Citric Acidity</span>
                    <span className="text-[#C49A6C]">{activeData.flavorProfile.acidity}/10</span>
                  </div>
                  <div className="w-full bg-[#242424] h-2 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${activeData.flavorProfile.acidity * 10}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="bg-gradient-to-r from-amber-600 to-[#C49A6C] h-full rounded-full"
                    />
                  </div>
                </div>

                {/* Body */}
                <div>
                  <div className="flex justify-between text-xs font-mono text-gray-300 mb-1">
                    <span>Mouthfeel & Body</span>
                    <span className="text-[#C49A6C]">{activeData.flavorProfile.body}/10</span>
                  </div>
                  <div className="w-full bg-[#242424] h-2 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${activeData.flavorProfile.body * 10}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="bg-gradient-to-r from-amber-600 to-[#C49A6C] h-full rounded-full"
                    />
                  </div>
                </div>

                {/* Floral */}
                <div>
                  <div className="flex justify-between text-xs font-mono text-gray-300 mb-1">
                    <span>Floral Jasmine Notes</span>
                    <span className="text-[#C49A6C]">{activeData.flavorProfile.floral}/10</span>
                  </div>
                  <div className="w-full bg-[#242424] h-2 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${activeData.flavorProfile.floral * 10}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="bg-gradient-to-r from-amber-600 to-[#C49A6C] h-full rounded-full"
                    />
                  </div>
                </div>

                {/* Berry */}
                <div>
                  <div className="flex justify-between text-xs font-mono text-gray-300 mb-1">
                    <span>Dark Berry / Fruity</span>
                    <span className="text-[#C49A6C]">{activeData.flavorProfile.berry}/10</span>
                  </div>
                  <div className="w-full bg-[#242424] h-2 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${activeData.flavorProfile.berry * 10}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="bg-gradient-to-r from-amber-600 to-[#C49A6C] h-full rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* Summary note */}
              <div className="pt-2 text-[11px] text-gray-400 font-mono italic text-center">
                *Sourced in partnerships with Buncho Coffee micro-lots, roasted locally.
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
