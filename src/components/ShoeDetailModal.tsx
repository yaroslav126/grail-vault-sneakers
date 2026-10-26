import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  ShoppingBag, 
  Scale
} from 'lucide-react';
import { Shoe } from '../types';

interface ShoeDetailModalProps {
  shoe: Shoe | null;
  onClose: () => void;
  onAddToCart: (shoe: Shoe, size: string, price: number) => void;
  currency: 'USD' | 'EUR' | 'GBP';
  currencyRate: number;
}

export const ShoeDetailModal: React.FC<ShoeDetailModalProps> = ({
  shoe,
  onClose,
  onAddToCart,
  currency,
  currencyRate
}) => {
  if (!shoe) return null;

  const [activeImage, setActiveImage] = useState<string>(shoe.image);
  const [selectedSize, setSelectedSize] = useState<string>('9.0');
  const [tab, setTab] = useState<'buy' | 'bid'>('buy');
  const [customBid, setCustomBid] = useState<number>(shoe.highestBid + 25);
  const [bidSubmitted, setBidSubmitted] = useState<boolean>(false);

  const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£';

  const currentSizeData = shoe.sizePrices[selectedSize] || {
    ask: shoe.lowestAsk,
    bid: shoe.highestBid,
    lastSale: shoe.lastSale,
    available: true
  };

  const currentAsk = Math.round(currentSizeData.ask * currencyRate);
  const currentBid = Math.round(currentSizeData.bid * currencyRate);

  const handlePlaceBid = (e: React.FormEvent) => {
    e.preventDefault();
    setBidSubmitted(true);
    setTimeout(() => {
      setBidSubmitted(false);
      alert(`Offer of ${currencySymbol}${customBid} submitted for ${shoe.name} (US ${selectedSize}). Our concierge will notify you when a seller accepts.`);
    }, 1000);
  };

  // SVG Chart calculation for 30-day sales history
  const history = shoe.salesHistory;
  const minPrice = Math.min(...history.map(h => h.price)) * 0.95;
  const maxPrice = Math.max(...history.map(h => h.price)) * 1.05;
  const chartHeight = 80;
  const chartWidth = 260;

  const points = history.map((item, idx) => {
    const x = (idx / (history.length - 1)) * chartWidth;
    const y = chartHeight - ((item.price - minPrice) / (maxPrice - minPrice)) * chartHeight;
    return `${x},${y}`;
  }).join(' ');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden"
    >
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ type: "spring", damping: 28, stiffness: 350 }}
        className="relative w-full max-w-4xl bg-[#0D1712]/98 backdrop-blur-2xl border-t sm:border border-[#1A3326] rounded-t-3xl sm:rounded-4xl shadow-2xl overflow-hidden z-10 h-[92vh] sm:h-auto sm:max-h-[90vh] flex flex-col text-[#F4FAF6]"
      >
        
        {/* Top Header */}
        <div className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-[#162A1F] flex items-center justify-between gap-3 bg-[#0A120E]/90 flex-shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="px-2.5 sm:px-3 py-1 rounded-full bg-[#101E17] border border-[#182E21] text-[#A7F3D0] text-[11px] sm:text-xs font-semibold uppercase tracking-wider flex-shrink-0">
              {shoe.brand}
            </span>
            <span className="text-[#1E3F2D]">•</span>
            <span className="text-[11px] sm:text-xs text-[#6A8F7C] font-medium truncate">Style: {shoe.sku}</span>
            {shoe.isGrail && (
              <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#13241B] text-[#A7F3D0] border border-[#1E3F2D] text-xs font-semibold flex-shrink-0">
                <span>Grail Tier</span>
              </span>
            )}
          </div>

          <motion.button
            whileHover={{ rotate: 90, scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full bg-[#101E17] hover:bg-[#162A20] text-[#D1FAE5] hover:text-white border border-[#1A3326] transition-colors flex-shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-7 space-y-6 flex-1 pb-24 sm:pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            
            {/* Left: Gallery & Inspection details */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-5">
              {/* Main Photo on Clean Neutral Museum Vitrine */}
              <div className="relative aspect-[4/3] w-full rounded-2xl sm:rounded-3xl bg-[#FAF6F0] p-4 sm:p-6 flex items-center justify-center border border-[#1F3D2C]/40 shadow-inner overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={activeImage}
                    alt={shoe.name}
                    initial={{ opacity: 0.4, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.4, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full object-contain filter drop-shadow-md"
                  />
                </AnimatePresence>
                
                {/* Condition Badge */}
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-[#0A1610]/90 border border-[#1A3326] px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium text-[#A7F3D0] shadow-sm">
                  {shoe.condition} • {shoe.year}
                </div>

                <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 bg-[#0A1610]/90 border border-[#1A3326] px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold text-[#10B981] flex items-center gap-1 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Verified</span>
                </div>
              </div>

              {/* Multi-angle Thumbnails */}
              {shoe.gallery && shoe.gallery.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {shoe.gallery.map((img, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveImage(img)}
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-[#FAF6F0] p-1 border transition-all flex-shrink-0 ${
                        activeImage === img ? 'border-[#00875A] shadow-md ring-2 ring-[#00875A]/50' : 'border-[#1A3326] hover:border-[#2D5A42]'
                      }`}
                    >
                      <img src={img} alt={`View ${i}`} className="w-full h-full object-contain" />
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Inspection Attributes */}
              <div className="bg-[#101C16] rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-[#1A3326] space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#162A1F] text-[#6A8F7C]">
                  <span className="flex items-center gap-1.5 font-bold text-[#F4FAF6]">
                    <Scale className="w-4 h-4 text-[#10B981]" />
                    <span>Inspection Data</span>
                  </span>
                  <span className="text-[#10B981] font-semibold">100% Genuine</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <span className="text-[#6A8F7C] block text-[11px]">Weight:</span>
                    <span className="text-[#A7F3D0] font-medium">{shoe.details.verifiedWeight}</span>
                  </div>
                  <div>
                    <span className="text-[#6A8F7C] block text-[11px]">Packaging:</span>
                    <span className="text-[#A7F3D0] font-medium">{shoe.details.boxCondition}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[#6A8F7C] block text-[11px] mb-1">Included Accessories:</span>
                    <div className="flex flex-wrap gap-1">
                      {shoe.details.accessories.map((acc, idx) => (
                        <span key={idx} className="bg-[#0A120E] border border-[#1A3326] px-2 py-0.5 rounded-full text-[10px] text-[#A7F3D0]">
                          {acc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Trend Chart */}
              <div className="bg-[#101C16] rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-[#1A3326] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#A7C2B2] font-semibold flex items-center gap-1.5 text-[11px] sm:text-xs">
                    <TrendingUp className="w-4 h-4 text-[#10B981]" />
                    <span>Valuation Trajectory</span>
                  </span>
                  <span className="text-[#10B981] font-bold text-[11px] sm:text-xs">Vault Index</span>
                </div>

                <div className="py-2 flex justify-center">
                  <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full max-w-[280px] h-auto overflow-visible">
                    <polyline
                      fill="none"
                      stroke="#00875A"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={points}
                    />
                    {history.map((h, i) => {
                      const x = (i / (history.length - 1)) * chartWidth;
                      const y = chartHeight - ((h.price - minPrice) / (maxPrice - minPrice)) * chartHeight;
                      return (
                        <circle key={i} cx={x} cy={y} r="3.5" fill="#10B981" />
                      );
                    })}
                  </svg>
                </div>

                <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#6A8F7C] font-medium">
                  <span>{history[0].date}: {currencySymbol}{Math.round(history[0].price * currencyRate).toLocaleString()}</span>
                  <span>Latest: {currencySymbol}{Math.round(history[history.length - 1].price * currencyRate).toLocaleString()}</span>
                </div>
              </div>

            </div>

            {/* Right: Buy / Bid Transaction Engine */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-5">
              
              {/* Title & Description */}
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-[#F4FAF6] break-words leading-tight">
                  {shoe.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#6A8F7C] mt-1 font-medium">{shoe.colorway}</p>
                <p className="text-xs text-[#8CA899] mt-2 sm:mt-3 font-normal leading-relaxed">
                  {shoe.description}
                </p>
              </div>

              {/* Size Matrix Selector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#6A8F7C] font-semibold uppercase tracking-wider">Select US Size:</span>
                  <span className="text-[#10B981] font-bold">US {selectedSize} Selected</span>
                </div>
                
                <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                  {Object.entries(shoe.sizePrices).map(([sz, data]) => {
                    const isSelected = selectedSize === sz;
                    return (
                      <motion.button
                        key={sz}
                        disabled={!data.available}
                        whileHover={data.available ? { scale: 1.04 } : {}}
                        whileTap={data.available ? { scale: 0.96 } : {}}
                        onClick={() => setSelectedSize(sz)}
                        className={`p-2 sm:p-2.5 rounded-xl sm:rounded-2xl text-center transition-all ${
                          !data.available
                            ? 'opacity-30 bg-[#0E1813] border border-[#14261D] text-[#6A8F7C] cursor-not-allowed'
                            : isSelected
                            ? 'bg-[#00875A] text-white font-bold shadow-md shadow-[#00875A]/25'
                            : 'bg-[#101C16] hover:bg-[#162A20] border border-[#1A3326] text-[#A7C2B2]'
                        }`}
                      >
                        <div className="text-[11px] sm:text-xs font-semibold">{sz}</div>
                        <div className={`text-[10px] sm:text-[11px] ${isSelected ? 'text-[#D1FAE5]' : 'text-[#6A8F7C] font-medium'}`}>
                          {data.available ? `${currencySymbol}${Math.round(data.ask * currencyRate)}` : 'Sold'}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Mode Tabs: Buy Now vs Make Offer */}
              <div className="bg-[#0A120E] p-1 rounded-full border border-[#162A1F] grid grid-cols-2 gap-1 text-xs">
                <button
                  onClick={() => setTab('buy')}
                  className={`py-2 px-2 rounded-full font-semibold transition-all text-center truncate ${
                    tab === 'buy' ? 'bg-[#00875A] text-white shadow-sm font-bold' : 'text-[#6A8F7C] hover:text-[#A7F3D0]'
                  }`}
                >
                  Buy Now <span className="opacity-80">({currencySymbol}{currentAsk})</span>
                </button>
                <button
                  onClick={() => setTab('bid')}
                  className={`py-2 px-2 rounded-full font-semibold transition-all text-center truncate ${
                    tab === 'bid' ? 'bg-[#00875A] text-white shadow-sm font-bold' : 'text-[#6A8F7C] hover:text-[#A7F3D0]'
                  }`}
                >
                  <span className="hidden xs:inline">Make an </span>Offer <span className="opacity-80">({currencySymbol}{currentBid})</span>
                </button>
              </div>

              {/* Tab 1: Buy Now Engine */}
              {tab === 'buy' ? (
                <div className="bg-[#101C16] rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-[#1A3326] space-y-3 sm:space-y-4">
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between text-[#A7C2B2]">
                      <span>Acquisition Price (US {selectedSize})</span>
                      <span className="font-serif font-bold text-[#F4FAF6] text-base sm:text-lg">{currencySymbol}{currentAsk.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-[#6A8F7C]">
                      <span>Physical Authentication</span>
                      <span className="text-[#10B981] font-semibold">Complimentary</span>
                    </div>
                    <div className="flex items-center justify-between text-[#6A8F7C]">
                      <span>Insured Courier Shipping</span>
                      <span className="text-[#10B981] font-semibold">Complimentary</span>
                    </div>
                  </div>

                  <div className="hidden sm:block pt-1 space-y-2">
                    <button
                      onClick={() => {
                        onAddToCart(shoe, selectedSize, currentSizeData.ask);
                        onClose();
                      }}
                      className="w-full py-3.5 rounded-full bg-[#00875A] hover:bg-[#059669] text-white font-bold text-xs tracking-wide transition-all shadow-lg shadow-[#00875A]/25 flex items-center justify-center gap-2 active:scale-95"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag ({currencySymbol}{currentAsk})</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Tab 2: Make Offer Engine */
                <form onSubmit={handlePlaceBid} className="bg-[#101C16] rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-[#1A3326] space-y-3 sm:space-y-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="text-[#A7C2B2] font-semibold block">Your Private Offer ({currency}):</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6A8F7C] font-bold text-base">{currencySymbol}</span>
                      <input
                        type="number"
                        min={shoe.highestBid}
                        max={shoe.lowestAsk * 2}
                        value={customBid}
                        onChange={(e) => setCustomBid(Number(e.target.value))}
                        className="w-full bg-[#0A120E] border border-[#182E21] rounded-2xl pl-9 pr-4 py-2.5 sm:py-3 text-[#F4FAF6] font-serif font-bold text-base focus:border-[#00875A] focus:outline-none shadow-sm"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={bidSubmitted}
                    className="w-full py-3 sm:py-3.5 rounded-full bg-[#00875A] hover:bg-[#059669] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
                  >
                    {bidSubmitted ? 'Submitting...' : `Submit Offer for ${currencySymbol}${customBid}`}
                  </button>
                </form>
              )}

              {/* Guarantee callout */}
              <div className="flex items-center gap-2.5 p-3 sm:p-3.5 rounded-2xl bg-[#0A120E] border border-[#1A3326] text-xs shadow-sm">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#10B981] flex-shrink-0" />
                <span className="text-[#6A8F7C] text-[10px] sm:text-[11px] leading-relaxed">
                  Every pair is held in our climate-controlled vault and verified prior to shipment.
                </span>
              </div>

            </div>

          </div>
        </div>

        {/* Mobile Sticky Quick Buy Bar (Fixed at the bottom of modal on phones) */}
        <div className="sm:hidden absolute bottom-0 left-0 right-0 bg-[#0A120E]/95 backdrop-blur-md border-t border-[#162A1F] p-3 flex items-center justify-between gap-3 shadow-lg z-20">
          <div>
            <span className="text-[10px] text-[#6A8F7C] block uppercase">US {selectedSize} • Vault Price</span>
            <span className="font-serif font-bold text-[#F4FAF6] text-base">{currencySymbol}{currentAsk.toLocaleString()}</span>
          </div>
          <button
            onClick={() => {
              onAddToCart(shoe, selectedSize, currentSizeData.ask);
              onClose();
            }}
            className="flex-1 py-3 px-4 rounded-full bg-[#00875A] hover:bg-[#059669] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Bag</span>
          </button>
        </div>

      </motion.div>
    </motion.div>
  );
};
