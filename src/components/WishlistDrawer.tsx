import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ArrowRight, Trash2 } from 'lucide-react';
import { Shoe } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistShoes: Shoe[];
  onRemoveWishlist: (shoe: Shoe) => void;
  onSelectShoe: (shoe: Shoe) => void;
  currency: 'USD' | 'EUR' | 'GBP';
  currencyRate: number;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistShoes,
  onRemoveWishlist,
  onSelectShoe,
  currency,
  currencyRate
}) => {
  if (!isOpen) return null;

  const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 overflow-hidden"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="w-screen max-w-full sm:max-w-md bg-[#0C1510]/98 backdrop-blur-2xl border-l border-[#162B1F] shadow-2xl flex flex-col text-[#F4FAF6]"
        >
          
          {/* Header */}
          <div className="p-5 border-b border-[#162B1F] flex items-center justify-between bg-[#0A120E]/90">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <h3 className="font-serif font-bold text-lg text-[#F4FAF6]">Saved Favorites</h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#101E17] border border-[#1A3326] text-[#A7F3D0] font-semibold">
                {wishlistShoes.length}
              </span>
            </div>
            <motion.button 
              whileHover={{ rotate: 90, scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 rounded-full bg-[#101E17] hover:bg-[#162A20] text-[#D1FAE5] hover:text-white border border-[#1A3326] transition-colors"
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlistShoes.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#0E1813] border border-[#182E21] flex items-center justify-center mx-auto text-rose-500">
                  <Heart className="w-8 h-8" />
                </div>
                <p className="font-serif font-bold text-[#F4FAF6] text-lg">No Saved Favorites</p>
                <p className="text-xs text-[#8CA899] max-w-xs mx-auto leading-relaxed">
                  Click the heart icon on any pair in the collection to save it to your private vault list.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <AnimatePresence initial={false}>
                  {wishlistShoes.map((shoe) => {
                    const askFormatted = Math.round(shoe.lowestAsk * currencyRate);
                    return (
                      <motion.div
                        key={shoe.id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 24, height: 0, marginBottom: 0, overflow: 'hidden', transition: { duration: 0.2 } }}
                        className="p-4 rounded-3xl bg-[#0D1712] border border-[#182E21] flex gap-3.5 items-center group shadow-lg hover:border-[#264D39] transition-colors"
                      >
                        <div 
                          onClick={() => { onSelectShoe(shoe); onClose(); }}
                          className="w-16 h-16 rounded-2xl bg-[#FAF6F0] p-1 flex-shrink-0 flex items-center justify-center border border-[#1F3D2C]/40 shadow-inner cursor-pointer"
                        >
                          <img src={shoe.image} alt={shoe.name} className="w-full h-full object-contain" />
                        </div>

                        <div 
                          onClick={() => { onSelectShoe(shoe); onClose(); }}
                          className="flex-1 min-w-0 text-xs cursor-pointer"
                        >
                          <p className="text-[#10B981] text-[10px] sm:text-[11px] uppercase font-semibold">{shoe.brand}</p>
                          <h4 className="font-serif font-bold text-[#F4FAF6] text-xs sm:text-sm line-clamp-2 leading-tight group-hover:text-[#34D399] transition-colors">
                            {shoe.name}
                          </h4>
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1">
                            <span className="font-serif font-bold text-[#F4FAF6] text-xs sm:text-sm">
                              {currencySymbol}{askFormatted.toLocaleString()}
                            </span>
                            <span className="text-[10px] sm:text-[11px] text-[#10B981] font-semibold">
                              +{shoe.priceChange24h}% Demand
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => { onSelectShoe(shoe); onClose(); }}
                            className="p-2 rounded-full bg-[#101E17] hover:bg-[#162A20] text-[#D1FAE5] border border-[#1A3326] transition-colors"
                            title="View Details"
                          >
                            <ArrowRight className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onRemoveWishlist(shoe)}
                            className="p-2 rounded-full text-[#6A8F7C] hover:text-rose-400 hover:bg-[#162A20] transition-colors"
                            title="Remove from favorites"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>

        </motion.div>
      </div>
    </motion.div>
  );
};
