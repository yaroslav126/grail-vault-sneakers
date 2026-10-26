import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  CheckCircle2
} from 'lucide-react';
import { Shoe } from '../types';

interface SellModalProps {
  shoes: Shoe[];
  isOpen: boolean;
  onClose: () => void;
  currency: 'USD' | 'EUR' | 'GBP';
  currencyRate: number;
}

export const SellModal: React.FC<SellModalProps> = ({
  shoes,
  isOpen,
  onClose,
  currency,
  currencyRate
}) => {
  if (!isOpen) return null;

  const [selectedShoeId, setSelectedShoeId] = useState<string>(shoes[0]?.id || '');
  const [size, setSize] = useState<string>('9.5');
  const [condition, setCondition] = useState<string>('Deadstock (DS)');
  const [sellMode, setSellMode] = useState<'market' | 'instant'>('market');
  const [askPrice, setAskPrice] = useState<number>(1150);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const selectedShoe = shoes.find(s => s.id === selectedShoeId) || shoes[0];
  const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£';

  const instantPayout = Math.round(selectedShoe.highestBid * 0.90);
  const effectivePrice = sellMode === 'instant' ? instantPayout : askPrice;
  const vaultFee = Math.round(effectivePrice * 0.085);
  const netPayout = effectivePrice - vaultFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
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
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ type: "spring", damping: 28, stiffness: 350 }}
        className="relative w-full max-w-2xl bg-[#0D1712]/98 backdrop-blur-xl border border-[#1A3326] rounded-3xl sm:rounded-4xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col text-[#F4FAF6]"
      >
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#162A1F] flex items-center justify-between bg-[#0A120E]/90 flex-shrink-0">
          <div>
            <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#10B981]">
              <span>Consignment & Acquisition</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#F4FAF6] mt-1">
              Consign Your Authentic Pair
            </h3>
          </div>
          <motion.button
            whileHover={{ rotate: 90, scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 rounded-full bg-[#101E17] hover:bg-[#162A20] text-[#D1FAE5] hover:text-white border border-[#1A3326] transition-colors"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#101E17] text-[#10B981] flex items-center justify-center mx-auto border border-[#1A3326]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-serif font-bold text-[#F4FAF6]">Consignment Request Received</h4>
            <p className="text-xs sm:text-sm text-[#A7C2B2] max-w-md mx-auto leading-relaxed">
              Your {selectedShoe.name} (US {size}, {condition}) has been prepared for listing at {currencySymbol}{effectivePrice}.
              Consignment inquiries answered in 24 hours via Telegram <a href="https://t.me/Slava_Dev_bot" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#10B981] hover:underline">@Slava_Dev_bot</a>.
            </p>
            <div className="pt-4 flex justify-center">
              <button
                onClick={() => { setSubmitted(false); onClose(); }}
                className="px-7 py-2.5 rounded-full bg-[#00875A] hover:bg-[#059669] text-white font-bold text-xs transition-colors shadow-md shadow-[#00875A]/25"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto flex-1">
            
            {/* Step 1: Select Shoe Model */}
            <div className="space-y-1.5 text-xs">
              <label className="text-[#8CA899] font-semibold block uppercase tracking-wider">1. Select Shoe Model:</label>
              <select
                value={selectedShoeId}
                onChange={(e) => {
                  setSelectedShoeId(e.target.value);
                  const found = shoes.find(s => s.id === e.target.value);
                  if (found) setAskPrice(found.lowestAsk);
                }}
                className="w-full bg-[#101C16] border border-[#1A3326] rounded-2xl px-4 py-3 text-[#F4FAF6] font-medium focus:border-[#00875A] focus:outline-none cursor-pointer"
              >
                {shoes.map(s => (
                  <option key={s.id} value={s.id} className="bg-[#0D1712] text-[#F4FAF6]">
                    {s.brand} — {s.name} (Estimate: ${s.lowestAsk})
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Shoe Preview */}
            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-[#0E1813] border border-[#182E21]">
              <img src={selectedShoe.image} alt={selectedShoe.name} className="w-14 h-14 sm:w-16 sm:h-16 object-contain bg-[#FAF6F0] rounded-xl p-1 border border-[#1F3D2C]/40 flex-shrink-0 shadow-inner" />
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-serif font-bold text-[#F4FAF6] truncate">{selectedShoe.name}</p>
                <p className="text-[10px] sm:text-xs text-[#6A8F7C] truncate mt-0.5">
                  Estimate: ${selectedShoe.lowestAsk} • Offer: ${selectedShoe.highestBid}
                </p>
              </div>
            </div>

            {/* Step 2: Size & Condition */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs">
              <div className="space-y-1.5 min-w-0">
                <label className="text-[#8CA899] font-semibold block uppercase tracking-wider text-[11px] sm:text-xs truncate">2. Shoe Size (US):</label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full bg-[#101C16] border border-[#1A3326] rounded-2xl px-3.5 py-2.5 text-[#F4FAF6] focus:outline-none focus:border-[#00875A]"
                >
                  {['8.0', '8.5', '9.0', '9.5', '10.0', '10.5', '11.0', '12.0'].map(sz => (
                    <option key={sz} value={sz} className="bg-[#0D1712] text-[#F4FAF6]">US {sz}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5 min-w-0">
                <label className="text-[#8CA899] font-semibold block uppercase tracking-wider text-[11px] sm:text-xs truncate">Condition Grade:</label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full bg-[#101C16] border border-[#1A3326] rounded-2xl px-3.5 py-2.5 text-[#F4FAF6] focus:outline-none focus:border-[#00875A] truncate"
                >
                  <option value="Deadstock (DS)" className="bg-[#0D1712] text-[#F4FAF6]">Brand New in Box (DS)</option>
                  <option value="Near Deadstock (VNDS)" className="bg-[#0D1712] text-[#F4FAF6]">Near Mint / Worn Once</option>
                  <option value="Pre-Owned Authenticated" className="bg-[#0D1712] text-[#F4FAF6]">Authenticated Pre-Owned</option>
                </select>
              </div>
            </div>

            {/* Step 3: Selling Strategy */}
            <div className="space-y-2 text-xs">
              <label className="text-[#8CA899] font-semibold block uppercase tracking-wider">3. Selling Preference:</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setSellMode('market')}
                  className={`p-3 sm:p-3.5 rounded-2xl border text-left transition-all ${
                    sellMode === 'market'
                      ? 'bg-[#13261C] border-[#00875A] text-[#F4FAF6] shadow-md ring-1 ring-[#00875A]/40'
                      : 'bg-[#101C16] border-[#1A3326] text-[#8CA899] hover:bg-[#15281E]'
                  }`}
                >
                  <span className="font-serif font-bold block text-sm text-[#F4FAF6]">List on Collection</span>
                  <span className="text-[11px] text-[#6A8F7C] block mt-0.5">Set your desired asking price</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSellMode('instant')}
                  className={`p-3 sm:p-3.5 rounded-2xl border text-left transition-all ${
                    sellMode === 'instant'
                      ? 'bg-[#13261C] border-[#00875A] text-[#F4FAF6] shadow-md ring-1 ring-[#00875A]/40'
                      : 'bg-[#101C16] border-[#1A3326] text-[#8CA899] hover:bg-[#15281E]'
                  }`}
                >
                  <span className="font-serif font-bold block text-sm text-[#F4FAF6]">Immediate Vault Buyout</span>
                  <span className="text-[11px] text-[#6A8F7C] block mt-0.5">Immediate liquidation upon arrival</span>
                </button>
              </div>
            </div>

            {sellMode === 'market' ? (
              <div className="space-y-1.5 text-xs">
                <label className="text-[#8CA899] font-semibold block uppercase tracking-wider">Your Listing Price ({currency}):</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6A8F7C] font-bold">{currencySymbol}</span>
                  <input
                    type="number"
                    min="100"
                    max="50000"
                    value={askPrice}
                    onChange={(e) => setAskPrice(Number(e.target.value))}
                    className="w-full bg-[#101C16] border border-[#1A3326] rounded-2xl pl-9 pr-4 py-3 text-[#F4FAF6] font-serif font-bold text-base focus:border-[#00875A] focus:outline-none"
                  />
                </div>
              </div>
            ) : (
              <div className="p-3.5 bg-[#101E17] rounded-2xl border border-[#182E21] text-xs text-[#A7F3D0]">
                Immediate buyout settles at {currencySymbol}{instantPayout}. Payout dispatched within 2 hours of lab authentication.
              </div>
            )}

            {/* Payout Calculation Ledger */}
            <div className="bg-[#0E1813] rounded-3xl p-4 border border-[#182E21] space-y-2 text-xs shadow-lg">
              <div className="flex justify-between text-[#8CA899]">
                <span>Gross Valuation</span>
                <span className="text-[#F4FAF6] font-bold">{currencySymbol}{effectivePrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#8CA899]">
                <span>Vault Consignment Fee (8.5%)</span>
                <span className="text-[#6A8F7C]">-{currencySymbol}{vaultFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#8CA899]">
                <span>Insured Shipping Kit</span>
                <span className="text-[#10B981] font-medium">Complimentary</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#F4FAF6] pt-2 border-t border-[#182E21]">
                <span>Estimated Net Payout</span>
                <span className="text-[#10B981] font-serif">{currencySymbol}{netPayout.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-[#00875A] hover:bg-[#059669] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#00875A]/25 active:scale-95"
            >
              Submit Pair for Consignment
            </button>

          </form>
        )}

      </motion.div>
    </motion.div>
  );
};
