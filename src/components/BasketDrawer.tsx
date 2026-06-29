import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, Receipt, QrCode, CheckCircle, Calculator, ChevronRight, Copy, Check } from 'lucide-react';
import { BasketItem } from '../types';

interface BasketDrawerProps {
  basket: BasketItem[];
  onClose: () => void;
  onRemoveItem: (index: number) => void;
  onClearBasket: () => void;
  onUpdateQuantity: (index: number, change: number) => void;
}

export default function BasketDrawer({
  basket,
  onClose,
  onRemoveItem,
  onClearBasket,
  onUpdateQuantity
}: BasketDrawerProps) {
  const [tableNumber, setTableNumber] = useState<string>('Table 3');
  const [isReceiptGenerated, setIsReceiptGenerated] = useState<boolean>(false);
  const [receiptData, setReceiptData] = useState<any>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Subtotal calculation
  const subtotal = basket.reduce((sum, item) => {
    let unitPrice = 0;
    if (item.item.prices) {
      const sizeKey = item.selectedSize || 'small';
      unitPrice = sizeKey === 'small' ? item.item.prices.small : item.item.prices.large;
    } else {
      unitPrice = Number(item.item.price);
    }
    
    // Add extra customization costs calculated already
    return sum + (unitPrice * item.quantity);
  }, 0);

  // Addis Ababa Standard Taxes
  const serviceCharge = Math.round(subtotal * 0.10); // 10%
  const vat = Math.round((subtotal + serviceCharge) * 0.15); // 15% VAT on subtotal + service
  const grandTotal = subtotal + serviceCharge + vat;

  const handleGenerateReceipt = () => {
    if (basket.length === 0) return;

    const orderId = 'DKM-' + Math.floor(100000 + Math.random() * 900000);
    const dateStr = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    setReceiptData({
      orderId,
      date: dateStr,
      table: tableNumber,
      items: [...basket],
      subtotal,
      serviceCharge,
      vat,
      grandTotal
    });
    setIsReceiptGenerated(true);
  };

  const handleFinishVirtualOrder = () => {
    setIsReceiptGenerated(false);
    onClearBasket();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
      {/* Tap outside to close (disabled when receipt is generated for focus) */}
      {!isReceiptGenerated && (
        <div className="absolute inset-0 cursor-pointer" onClick={onClose} />
      )}

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="relative z-10 w-full max-w-md h-full bg-[#FAF5EF] border-l border-[#8C6239]/20 shadow-2xl flex flex-col justify-between overflow-hidden"
      >
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#8C6239]/15 flex items-center justify-between bg-[#FAF5EF]">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#8C6239]" />
            <h3 className="font-serif text-lg font-bold text-[#2D241C]">
              Order & Bill Calculator
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#F3EBE0] text-[#5C4E43] hover:text-[#2D241C] transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Content Frame */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          <AnimatePresence mode="wait">
            {!isReceiptGenerated ? (
              /* ACTIVE BASKET VIEW */
              <motion.div
                key="basket-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {/* Table Number Selector */}
                <div className="p-3 bg-[#FAF5EF] rounded-xl border border-[#E3D7C8] flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-mono text-[#8C6239] uppercase tracking-widest font-bold">Your Location</p>
                    <p className="text-sm font-semibold text-[#2D241C]">Bole Sanctuary Seating</p>
                  </div>
                  
                  <select
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="bg-[#FAF5EF] border border-[#8C6239]/30 rounded-lg text-xs font-mono text-[#2D241C] px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#8C6239] cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'Bar Lounge', 'Garden Terrace'].map((num) => (
                      <option key={num} value={typeof num === 'number' ? `Table ${num}` : String(num)}>
                        {typeof num === 'number' ? `Table ${num}` : num}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Clear all action */}
                {basket.length > 0 && (
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#5C4E43] font-mono font-bold">{basket.length} unique item(s) selected</span>
                    <button
                      onClick={onClearBasket}
                      className="text-red-600 hover:text-red-800 flex items-center gap-1 font-mono font-bold transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear All</span>
                    </button>
                  </div>
                )}

                {/* Items List */}
                {basket.length === 0 ? (
                  <div className="py-16 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#8C6239]/10 flex items-center justify-center mx-auto text-[#8C6239]">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-[#2D241C] font-semibold">Your calculator is empty</p>
                      <p className="text-xs text-[#5C4E43] leading-relaxed max-w-xs mx-auto font-medium">
                        Explore the menu and tap the "+" icon to add artisanal coffees, specialty salads, and burgers to calculate your final bill.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {basket.map((basketItem, index) => {
                      const item = basketItem.item;
                      const sizeKey = basketItem.selectedSize || 'small';
                      const unitPrice = item.prices 
                        ? (sizeKey === 'small' ? item.prices.small : item.prices.large)
                        : Number(item.price);

                      return (
                        <motion.div
                          layout
                          key={`${item.id}-${sizeKey}-${index}`}
                          className="p-3.5 bg-[#FAF5EF] rounded-xl border border-[#E3D7C8] flex items-start justify-between gap-3 relative group shadow-sm"
                        >
                          <div className="flex-1 space-y-1">
                            <h4 className="font-serif text-sm font-bold text-[#2D241C] group-hover:text-[#8C6239] transition-colors">
                              {item.name}
                            </h4>
                            
                            {/* Selected choices */}
                            <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
                              {item.prices && (
                                <span className="bg-[#8C6239]/15 text-[#8C6239] px-1.5 py-0.5 rounded uppercase font-bold">
                                  {sizeKey === 'small' ? 'Standard' : 'Large'}
                                </span>
                              )}
                              
                              <span className="text-[#5C4E43] font-semibold">
                                {unitPrice} ETB each
                              </span>
                            </div>

                            {/* Optional checklist tags from customizations */}
                            <p className="text-[10px] text-[#8C6239] font-mono leading-tight font-semibold">
                              {item.ingredients ? 'Custom ingredients verified' : 'Micro-lot premium brewing'}
                            </p>
                          </div>

                          <div className="flex flex-col items-end justify-between h-full min-h-[50px]">
                            {/* Remove item button */}
                            <button
                              onClick={() => onRemoveItem(index)}
                              className="text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                              title="Delete item"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>

                            {/* Quantity Adjusters */}
                            <div className="flex items-center gap-1.5 bg-[#F3EBE0] p-1 rounded-lg border border-[#E3D7C8] mt-2">
                              <button
                                onClick={() => onUpdateQuantity(index, -1)}
                                className="w-5 h-5 bg-[#FAF5EF] text-[#2D241C] border border-[#E3D7C8] hover:bg-[#EFE5D9] text-[10px] flex items-center justify-center rounded transition-all font-bold cursor-pointer"
                              >
                                -
                              </button>
                              <span className="text-[11px] font-mono font-bold text-[#2D241C] px-1.5 w-4 text-center">
                                {basketItem.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(index, 1)}
                                className="w-5 h-5 bg-[#FAF5EF] text-[#2D241C] border border-[#E3D7C8] hover:bg-[#EFE5D9] text-[10px] flex items-center justify-center rounded transition-all font-bold cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            ) : (
              /* VIRTUAL RECEIPT VIEW */
              <motion.div
                key="receipt-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-4"
              >
                <div className="bg-[#FAF5EF] text-[#121212] p-5 rounded-2xl border-2 border-dashed border-[#E3D7C8] shadow-2xl relative font-sans">
                  
                  {/* Outer edge indentations to look like a physical paper paper receipt */}
                  <div className="absolute inset-x-0 -top-1.5 flex justify-around overflow-hidden h-1.5">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <span key={i} className="w-3 h-3 bg-[#FAF5EF] rounded-full flex-shrink-0 -mt-1.5" />
                    ))}
                  </div>

                  {/* Receipt Header */}
                  <div className="text-center pt-2 pb-4 border-b border-gray-200">
                    <img 
                      src="https://www.image2url.com/r2/default/images/1782749784839-a01b6ede-101a-4ae3-89d9-4c5c3f3e8336.jpg" 
                      alt="Dukamo Logo" 
                      className="w-20 h-20 rounded-full mx-auto border border-gray-200 object-cover shadow-md mb-2 bg-white"
                      referrerPolicy="no-referrer"
                    />
                    <h4 className="font-serif text-lg font-extrabold tracking-wide text-gray-900 uppercase">DUKAMO COFFEE</h4>
                    <p className="text-[10px] text-gray-500 font-mono">BOLE SANCTUARY • ADDIS ABABA</p>
                    <p className="text-[9px] text-gray-400 font-mono">TEL: +251 11 DUKAMO COF</p>
                  </div>

                  {/* Metadata Row */}
                  <div className="py-3 text-[10px] font-mono text-gray-600 border-b border-gray-100 flex flex-col gap-1">
                    <div className="flex justify-between">
                      <span>ORDER ID:</span>
                      <span className="font-bold text-gray-900">{receiptData.orderId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TIMESTAMP:</span>
                      <span>{receiptData.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>STATION / LOCATION:</span>
                      <span className="font-bold text-gray-900 uppercase">{receiptData.table}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CLERK / ROASTER:</span>
                      <span>Buncho Specialty Bar</span>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="py-3 border-b border-gray-100 space-y-2.5 max-h-[180px] overflow-y-auto">
                    {receiptData.items.map((bItem: any, index: number) => {
                      const item = bItem.item;
                      const sizeKey = bItem.selectedSize || 'standard';
                      const price = item.prices 
                        ? (sizeKey === 'small' ? item.prices.small : item.prices.large)
                        : Number(item.price);
                      
                      return (
                        <div key={index} className="text-xs flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <p className="font-bold text-gray-900 leading-tight">
                              {item.name}
                            </p>
                            <p className="text-[9px] text-gray-500 uppercase font-mono">
                              QTY: {bItem.quantity} x {price} ETB {item.prices && `(${sizeKey === 'small' ? 'Small' : 'Large'})`}
                            </p>
                          </div>
                          <span className="font-mono text-gray-900 font-bold">
                            {price * bItem.quantity} ETB
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Calculations breakdown */}
                  <div className="py-3 text-xs font-mono text-gray-700 space-y-1.5 border-b border-gray-200">
                    <div className="flex justify-between">
                      <span>ITEMS SUB-TOTAL:</span>
                      <span className="text-gray-900">{receiptData.subtotal} ETB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ADDIS SERVICE CHG (10%):</span>
                      <span className="text-gray-900">+{receiptData.serviceCharge} ETB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>FEDERAL VAT TAX (15%):</span>
                      <span className="text-gray-900">+{receiptData.vat} ETB</span>
                    </div>
                  </div>

                  {/* Grand total */}
                  <div className="py-3 flex justify-between items-center">
                    <span className="text-xs font-mono font-bold text-gray-900 uppercase">AMOUNT PAYABLE:</span>
                    <span className="font-serif text-lg font-extrabold text-gray-900">
                      {receiptData.grandTotal} ETB
                    </span>
                  </div>

                  {/* Interactive QR Code scan layout */}
                  <div className="pt-3 border-t border-dashed border-gray-200 text-center space-y-2">
                    <div className="w-24 h-24 bg-gray-100 rounded-xl mx-auto flex items-center justify-center p-2.5 border border-gray-200">
                      <QrCode className="w-full h-full text-gray-800" />
                    </div>
                    <p className="text-[9px] text-gray-500 font-mono leading-relaxed max-w-[220px] mx-auto uppercase">
                      Scan to make a quick local Telebirr payment, or show this receipt to your server on bar.
                    </p>

                    {/* Extended Payment Methods Section */}
                    <div className="pt-4 mt-3 border-t border-dashed border-gray-200 text-left space-y-3">
                      <h5 className="text-[10px] font-mono text-gray-400 font-extrabold uppercase tracking-widest text-center">
                        DIRECT PAYMENT OPTIONS
                      </h5>
                      
                      {/* Telebirr Channel with Pop Animation */}
                      <motion.div 
                        animate={{ scale: [1, 1.03, 1] }}
                        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                        whileHover={{ scale: 1.05 }}
                        className="p-2.5 bg-gradient-to-r from-blue-50 to-blue-100/40 rounded-xl border border-blue-200 flex items-center justify-between gap-3 shadow-sm hover:border-blue-300 transition-all cursor-pointer"
                        onClick={() => {
                          navigator.clipboard.writeText('+251 10000000');
                          setCopiedText('telebirr');
                          setTimeout(() => setCopiedText(null), 2000);
                        }}
                      >
                        <div className="flex items-center gap-2.5">
                          {/* Telebirr Logo Image */}
                          <div className="w-9 h-9 rounded-full bg-white border border-blue-200 shadow-sm flex-shrink-0 overflow-hidden relative" title="Telebirr Logo">
                            <img 
                              src="https://user15514.na.imgto.link/public/20260629/telebirr.avif" 
                              alt="Telebirr Logo" 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-mono text-blue-700 font-extrabold tracking-wider uppercase">TELEBIRR</span>
                              <span className="text-[8px] bg-blue-200/60 text-blue-800 px-1 py-0.2 rounded font-mono font-bold uppercase">INSTANT</span>
                            </div>
                            <p className="text-xs font-mono font-black text-gray-900 tracking-wider">
                              +251 10000000
                            </p>
                          </div>
                        </div>
                        
                        <button className="p-1.5 bg-white rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 transition-all">
                          {copiedText === 'telebirr' ? (
                            <Check className="w-3.5 h-3.5 text-green-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </motion.div>

                      {/* Bank Accounts Section */}
                      <div className="space-y-2">
                        <p className="text-[9px] font-mono text-gray-400 font-bold uppercase tracking-wider pl-1">
                          Bank Transfers (Account: 100000000001100)
                        </p>
                        
                        {[
                          { id: 'cbe', name: 'Ethiopian Commercial Bank', abbr: 'CBE', image: 'https://user15514.na.imgto.link/public/20260629/cbe.avif' },
                          { id: 'boa', name: 'Bank of Abyssinia', abbr: 'BOA', image: 'https://user15514.na.imgto.link/public/20260629/boa.avif' },
                          { id: 'dashen', name: 'Dashen Bank', abbr: 'DB', image: 'https://user15514.na.imgto.link/public/20260629/dashen.avif' }
                        ].map((bank) => (
                          <div 
                            key={bank.id}
                            className="p-2 bg-gray-50 hover:bg-gray-100/80 rounded-xl border border-gray-200 flex items-center justify-between gap-3 transition-all"
                          >
                            <div className="flex items-center gap-2.5">
                              {/* Standard Logo Container Box with image */}
                              <div className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-xs flex-shrink-0 overflow-hidden relative" title={`${bank.name} Logo`}>
                                <img 
                                  src={bank.image} 
                                  alt={`${bank.name} Logo`} 
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                              <div>
                                <p className="text-[10px] font-serif font-black text-gray-800 leading-tight">
                                  {bank.name}
                                </p>
                                <p className="text-[9px] font-mono text-gray-500 font-bold">
                                  A/C: 100000000001100
                                </p>
                              </div>
                            </div>

                            <button 
                              onClick={() => {
                                navigator.clipboard.writeText('100000000001100');
                                setCopiedText(bank.id);
                                setTimeout(() => setCopiedText(null), 2000);
                              }}
                              className="p-1.5 bg-white rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all flex-shrink-0"
                            >
                              {copiedText === bank.id ? (
                                <Check className="w-3.5 h-3.5 text-green-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        ))}
                      </div>

                      <p className="text-[8px] text-gray-400 font-mono text-center leading-normal">
                        *Please add your Table/Order ID in the transfer description for faster settlement verification.
                      </p>
                    </div>

                  </div>

                </div>

                <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-400 text-xs rounded-xl flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Virtual bill calculated! Present this digital ticket at DUKAMO.</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Calculations & Order Trigger footer */}
        {basket.length > 0 && !isReceiptGenerated && (
          <div className="p-5 border-t border-[#8C6239]/15 bg-[#FAF5EF] space-y-4">
            
            <div className="space-y-1.5 text-xs font-mono text-[#5C4E43] font-semibold">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="text-[#2D241C]">{subtotal} ETB</span>
              </div>
              <div className="flex justify-between">
                <span>Service Charge (10%):</span>
                <span className="text-[#2D241C]">+{serviceCharge} ETB</span>
              </div>
              <div className="flex justify-between">
                <span>Value Added Tax (15%):</span>
                <span className="text-[#2D241C]">+{vat} ETB</span>
              </div>
              <div className="flex justify-between pt-1.5 border-t border-[#8C6239]/10 text-sm">
                <span className="text-[#2D241C] font-bold uppercase">Estimated Bill Total:</span>
                <span className="text-[#8C6239] font-serif font-extrabold text-base">
                  {grandTotal} ETB
                </span>
              </div>
            </div>

            {/* Receipt Trigger Button */}
            <button
              onClick={handleGenerateReceipt}
              className="w-full py-3.5 bg-gradient-to-r from-[#8C6239] to-[#A37D55] hover:from-[#704E2D] hover:to-[#8C6239] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md hover:scale-[1.01] cursor-pointer"
            >
              <Receipt className="w-4 h-4" />
              <span>Generate Digital Ticket & Receipt</span>
            </button>

          </div>
        )}

        {/* Finish Receipt flow button */}
        {isReceiptGenerated && (
          <div className="p-5 border-t border-[#8C6239]/15 bg-[#FAF5EF]">
            <button
              onClick={handleFinishVirtualOrder}
              className="w-full py-3 bg-gradient-to-r from-[#8C6239] to-[#A37D55] hover:from-[#704E2D] hover:to-[#8C6239] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Back to Menu & New Session</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </motion.div>
    </div>
  );
}
