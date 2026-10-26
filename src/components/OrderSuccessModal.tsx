import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Package
} from 'lucide-react';

interface OrderSuccessModalProps {
  order: any;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ type: "spring", damping: 25, stiffness: 320 }}
        className="relative w-full max-w-lg bg-[#0D1712]/98 backdrop-blur-xl border border-[#1A3326] rounded-3xl sm:rounded-4xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col text-[#F4FAF6]"
      >
        
        {/* Top Header */}
        <div className="p-5 sm:p-7 bg-[#0A130E]/90 border-b border-[#182E21] text-center space-y-2 flex-shrink-0">
          <motion.div 
            initial={{ scale: 0, rotate: -25 }}
            animate={{ scale: [0, 1.25, 1], rotate: 0 }}
            transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#101E17] text-[#10B981] flex items-center justify-center mx-auto border border-[#1A3326] shadow-md shadow-[#00875A]/20"
          >
            <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8" />
          </motion.div>
          <h3 className="text-2xl font-serif font-bold text-[#F4FAF6]">
            Acquisition Confirmed
          </h3>
          <p className="text-xs text-[#8CA899] font-medium break-all px-2">
            Order Reference: {order.orderId}
          </p>
        </div>

        {/* Certificate Preview */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto flex-1">
          <div className="bg-[#0E1813] rounded-3xl p-4 sm:p-5 border border-[#182E21] space-y-3 text-xs shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#182E21]">
              <span className="text-[#8CA899] font-semibold uppercase tracking-wider text-[10px] xs:text-xs">Certificate of Authenticity</span>
              <span className="inline-flex items-center gap-1 text-[#10B981] font-bold text-[10px] xs:text-xs shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#10B981]" />
                <span>Verified In-Hand</span>
              </span>
            </div>

            <div className="space-y-2.5">
              {order.items.map((item: any, i: number) => (
                <div key={i} className="flex items-center gap-3 py-1">
                  <img src={item.shoe.image} alt={item.shoe.name} className="w-12 h-12 object-contain bg-[#FAF6F0] rounded-xl p-1 border border-[#1E3F2D]/40 shrink-0 shadow-inner" />
                  <div className="flex-1 min-w-0">
                    <p className="font-serif font-bold text-[#F4FAF6] text-xs line-clamp-2 leading-tight">{item.shoe.name}</p>
                    <p className="text-[11px] text-[#8CA899]">US {item.selectedSize} • {item.condition}</p>
                  </div>
                  <span className="font-serif font-bold text-[#F4FAF6] text-xs sm:text-sm shrink-0">{order.currencySymbol}{Math.round(item.price).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#182E21] flex justify-between items-center text-sm font-bold">
              <span className="text-[#A7F3D0]">Total Settled:</span>
              <span className="font-serif text-[#10B981] text-base">{order.currencySymbol}{order.total.toLocaleString()}</span>
            </div>
          </div>

          {/* Next steps breakdown */}
          <div className="space-y-2.5 text-xs">
            <div className="flex items-center gap-2.5 text-[#8CA899]">
              <Package className="w-4 h-4 text-[#10B981] flex-shrink-0" />
              <span>Consignor pair received at Vault Verification Suite within 48h.</span>
            </div>
            <div className="flex items-center gap-2.5 text-[#8CA899]">
              <ShieldCheck className="w-4 h-4 text-[#10B981] flex-shrink-0" />
              <span>Full 12-point optical and micro-weight check completed by specialists.</span>
            </div>
            <div className="flex items-center gap-2.5 text-[#8CA899]">
              <Package className="w-4 h-4 text-[#10B981] flex-shrink-0" />
              <span>Vault Physical Tamper-Evident Medallion applied and dispatched.</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#0E1813] border border-[#182E21] text-[11px] text-[#8CA899] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5">
            <span>Direct Client Inquiries: Answering in 24 hours</span>
            <a href="https://t.me/Slava_Dev_bot" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#34D399] hover:underline inline-flex items-center gap-1">
              <span>Telegram: @Slava_Dev_bot</span>
            </a>
          </div>

          <div className="pt-2">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.96 }}
              onClick={onClose}
              className="w-full py-4 rounded-full bg-[#00875A] hover:bg-[#059669] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#00875A]/25 active:scale-95"
            >
              Return to Collection
            </motion.button>
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
};
