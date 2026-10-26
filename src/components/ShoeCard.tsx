import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  ShieldCheck, 
  ArrowRight,
  ShoppingBag
} from 'lucide-react';
import { Shoe } from '../types';

interface ShoeCardProps {
  shoe: Shoe;
  isWishlisted: boolean;
  onToggleWishlist: (shoe: Shoe) => void;
  onSelect: (shoe: Shoe) => void;
  onQuickBuy: (shoe: Shoe) => void;
  currencySymbol?: string;
  currencyRate?: number;
}

export const ShoeCard: React.FC<ShoeCardProps> = ({
  shoe,
  isWishlisted,
  onToggleWishlist,
  onSelect,
  onQuickBuy,
  currencySymbol = '$',
  currencyRate = 1
}) => {
  const lowestAskConverted = Math.round(shoe.lowestAsk * currencyRate);
  const highestBidConverted = Math.round(shoe.highestBid * currencyRate);

  return (
    <motion.div 
      whileHover={{ y: -6, transition: { duration: 0.22, ease: "easeOut" } }}
      className="group relative flex flex-col rounded-2xl sm:rounded-3xl bg-[#0D1712] border border-[#1A3326] hover:border-[#2D5A42] hover:shadow-2xl hover:shadow-[#000000]/80 transition-all duration-300 overflow-hidden"
    >
      {/* Top Meta Header */}
      <div className="p-3 sm:p-4 pb-0 flex items-center justify-between gap-1.5 sm:gap-2 z-10">
        <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap min-w-0">
          {shoe.isGrail ? (
            <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#13241B] border border-[#1E3F2D] text-[#A7F3D0] text-[10px] sm:text-[11px] font-semibold">
              <span>Grail</span>
            </span>
          ) : (
            <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#101E17] text-[#8CA899] border border-[#182E21] text-[10px] sm:text-[11px] font-medium">
              {shoe.condition.split(' ')[0]}
            </span>
          )}

          <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded-full bg-[#101E17] text-[#A7F3D0] text-[10px] sm:text-[11px] border border-[#182E21]">
            <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#10B981] flex-shrink-0" />
            <span className="hidden xs:inline">Verified</span>
          </span>
        </div>

        {/* Wishlist toggle */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.8 }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(shoe);
          }}
          className={`p-1.5 sm:p-2 rounded-full transition-all flex-shrink-0 ${
            isWishlisted 
              ? 'bg-rose-950/70 text-rose-400 border border-rose-800/60' 
              : 'bg-[#101E17] text-[#6A8F7C] hover:text-[#F4FAF6] hover:bg-[#162A20] border border-[#182E21]'
          }`}
          title={isWishlisted ? "Remove from saved" : "Save to favorites"}
          aria-label="Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-400' : ''}`} />
        </motion.button>
      </div>

      {/* Shoe Image Box in Gallery Vitrine */}
      <div 
        onClick={() => onSelect(shoe)}
        className="relative aspect-[4/3] mx-3 sm:mx-4 mt-2.5 rounded-2xl p-3 sm:p-5 flex items-center justify-center cursor-pointer bg-[#FAF6F0] border border-[#1F3D2C]/40 shadow-inner group-hover:bg-[#FFFDF9] transition-colors overflow-hidden"
      >
        <img
          src={shoe.image}
          alt={shoe.name}
          loading="lazy"
          className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-108 transition-all duration-500 ease-out"
        />
      </div>

      {/* Details Box */}
      <div className="p-3.5 sm:p-5 pt-3 sm:pt-4 flex-1 flex flex-col justify-between space-y-2.5 sm:space-y-4">
        <div 
          onClick={() => onSelect(shoe)} 
          className="cursor-pointer space-y-0.5 sm:space-y-1"
        >
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-[#10B981] uppercase tracking-wider font-semibold">
            <span className="truncate">{shoe.brand}</span>
            <span className="text-[#6A8F7C] font-normal ml-1 flex-shrink-0">{shoe.year}</span>
          </div>
          <h4 className="font-serif font-bold text-xs xs:text-sm sm:text-base text-[#F4FAF6] group-hover:text-[#34D399] transition-colors line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] leading-tight">
            {shoe.name}
          </h4>
          <p className="text-[10px] xs:text-[11px] sm:text-xs text-[#6A8F7C] line-clamp-1">{shoe.colorway}</p>
        </div>

        {/* Pricing Box */}
        <div className="bg-[#101C16] rounded-xl sm:rounded-2xl p-2.5 sm:p-3 border border-[#1A3326] flex items-center justify-between">
          <span className="text-[10px] xs:text-[11px] sm:text-xs text-[#6A8F7C] uppercase tracking-wider font-medium">Price</span>
          <span className="font-serif font-bold text-[#F4FAF6] text-xs xs:text-sm sm:text-base">
            {currencySymbol}{lowestAskConverted.toLocaleString()}
          </span>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2 pt-0.5 sm:pt-1">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(shoe)}
            className="w-full py-2 sm:py-2.5 px-1.5 sm:px-3 rounded-full bg-[#13221B] hover:bg-[#1A3026] text-[10px] xs:text-[11px] sm:text-xs font-semibold text-[#A7F3D0] border border-[#1E3F2E] transition-colors flex items-center justify-center gap-1 text-center"
          >
            <span>Details</span>
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onQuickBuy(shoe);
            }}
            className="w-full py-2 sm:py-2.5 px-1.5 sm:px-3 rounded-full bg-[#00875A] hover:bg-[#059669] text-white text-[10px] xs:text-[11px] sm:text-xs font-semibold transition-all shadow-md shadow-[#00875A]/25 flex items-center justify-center gap-1 text-center"
          >
            <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
            <span>Acquire</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
