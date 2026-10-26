import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Trash2, 
  ShieldCheck, 
  ShoppingBag, 
  ArrowRight, 
  Lock,
  CheckCircle2
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, qty: number) => void;
  currency: 'USD' | 'EUR' | 'GBP';
  currencyRate: number;
  onCheckoutSuccess: (orderData: any) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  currency,
  currencyRate,
  onCheckoutSuccess
}) => {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  // Form State
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    country: 'United States',
    paymentMethod: 'apple-pay'
  });

  const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£';

  const subtotalUSD = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const subtotal = Math.round(subtotalUSD * currencyRate);
  
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (promoCode.trim().toUpperCase() === 'VAULT10') {
      const disc = Math.round(subtotal * 0.10);
      setDiscountAmount(disc);
      setPromoApplied(true);
    } else if (promoCode.trim().toUpperCase() === 'GRAIL50') {
      const disc = Math.round(50 * currencyRate);
      setDiscountAmount(disc);
      setPromoApplied(true);
    } else {
      setPromoError("Invalid code. Try 'VAULT10' for 10% off!");
    }
  };

  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleExecutePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessingPayment(true);

    setTimeout(() => {
      setProcessingPayment(false);
      setIsCheckingOut(false);
      onCheckoutSuccess({
        orderId: `VAULT-${Math.floor(100000 + Math.random() * 900000)}`,
        items: [...items],
        subtotal,
        discount: discountAmount,
        total: finalTotal,
        currencySymbol,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        shipping: shippingInfo
      });
      onClose();
    }, 1200);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 overflow-hidden"
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
              <ShoppingBag className="w-5 h-5 text-[#10B981]" />
              <h3 className="font-serif font-bold text-lg text-[#F4FAF6]">Your Shopping Bag</h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#101E17] border border-[#1A3326] text-[#A7F3D0] font-semibold">
                {items.length} {items.length === 1 ? 'pair' : 'pairs'}
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

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#0E1813] border border-[#182E21] flex items-center justify-center mx-auto text-[#10B981]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="font-serif font-bold text-[#F4FAF6] text-lg">Your Bag is Empty</p>
                <p className="text-xs text-[#8CA899] max-w-xs mx-auto leading-relaxed">
                  Browse our curated sneaker selection to find rare and limited edition pairs.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#00875A] hover:bg-[#059669] text-white text-xs font-bold transition-all shadow-md shadow-[#00875A]/25"
                >
                  Explore Collection
                </button>
              </div>
            ) : isCheckingOut ? (
              /* Checkout View */
              <form onSubmit={handleExecutePayment} className="space-y-4 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#162B1F]">
                  <span className="font-serif font-bold text-base text-[#F4FAF6]">Shipping & Payment</span>
                  <button 
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="text-[#10B981] font-semibold hover:underline"
                  >
                    ← Edit Bag
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-[#A7C2B2] font-medium block mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Julian Vance"
                      value={shippingInfo.name}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                      className="w-full bg-[#101C16] border border-[#1A3326] rounded-2xl px-3.5 py-2.5 text-[#F4FAF6] placeholder-[#5A7A6A] focus:border-[#00875A] focus:outline-none shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="text-[#A7C2B2] font-medium block mb-1">Email for Courier Tracking</label>
                    <input
                      type="email"
                      required
                      placeholder="client@domain.com"
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                      className="w-full bg-[#101C16] border border-[#1A3326] rounded-2xl px-3.5 py-2.5 text-[#F4FAF6] placeholder-[#5A7A6A] focus:border-[#00875A] focus:outline-none shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="text-[#A7C2B2] font-medium block mb-1">Delivery Address</label>
                    <input
                      type="text"
                      required
                      placeholder="Street address, apartment or suite"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      className="w-full bg-[#101C16] border border-[#1A3326] rounded-2xl px-3.5 py-2.5 text-[#F4FAF6] placeholder-[#5A7A6A] focus:border-[#00875A] focus:outline-none shadow-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[#A7C2B2] font-medium block mb-1">City</label>
                      <input
                        type="text"
                        required
                        placeholder="City"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        className="w-full bg-[#101C16] border border-[#1A3326] rounded-2xl px-3.5 py-2 text-[#F4FAF6] placeholder-[#5A7A6A] focus:outline-none focus:border-[#00875A]"
                      />
                    </div>
                    <div>
                      <label className="text-[#A7C2B2] font-medium block mb-1">Postal Code</label>
                      <input
                        type="text"
                        required
                        placeholder="ZIP / Postal"
                        value={shippingInfo.zip}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                        className="w-full bg-[#101C16] border border-[#1A3326] rounded-2xl px-3.5 py-2 text-[#F4FAF6] placeholder-[#5A7A6A] focus:outline-none focus:border-[#00875A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[#A7C2B2] font-medium block mb-1">Payment Method</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setShippingInfo({ ...shippingInfo, paymentMethod: 'apple-pay' })}
                        className={`p-2.5 rounded-2xl border text-center transition-all ${
                          shippingInfo.paymentMethod === 'apple-pay' 
                            ? 'bg-[#13261C] border-[#00875A] text-[#F4FAF6] font-semibold ring-1 ring-[#00875A]/40' 
                            : 'bg-[#101C16] border-[#182E21] text-[#8CA899] hover:text-[#D1FAE5]'
                        }`}
                      >
                         Apple Pay
                      </button>
                      <button
                        type="button"
                        onClick={() => setShippingInfo({ ...shippingInfo, paymentMethod: 'card' })}
                        className={`p-2.5 rounded-2xl border text-center transition-all ${
                          shippingInfo.paymentMethod === 'card' 
                            ? 'bg-[#13261C] border-[#00875A] text-[#F4FAF6] font-semibold ring-1 ring-[#00875A]/40' 
                            : 'bg-[#101C16] border-[#182E21] text-[#8CA899] hover:text-[#D1FAE5]'
                        }`}
                      >
                        Credit Card
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <button
                    type="submit"
                    disabled={processingPayment}
                    className="w-full py-4 rounded-full bg-[#00875A] hover:bg-[#059669] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#00875A]/25 flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Lock className="w-4 h-4" />
                    <span>
                      {processingPayment ? 'Processing Security Verification...' : `Authorize Payment (${currencySymbol}${finalTotal.toLocaleString()})`}
                    </span>
                  </button>
                  <p className="text-[11px] text-[#6A8F7C] text-center">
                    Protected by Vault Guaranteed Escrow until inspection confirmation.
                  </p>
                </div>
              </form>
            ) : (
              /* Regular Item List */
              <>
                <div className="space-y-3">
                  <AnimatePresence initial={false}>
                    {items.map((item) => {
                      const priceFormatted = Math.round(item.price * currencyRate);
                      return (
                        <motion.div 
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 24, height: 0, marginBottom: 0, overflow: 'hidden', transition: { duration: 0.2 } }}
                          className="p-4 rounded-3xl bg-[#0D1712] border border-[#182E21] flex gap-3.5 items-center shadow-lg"
                        >
                          <div className="w-16 h-16 rounded-2xl bg-[#FAF6F0] p-1 flex-shrink-0 flex items-center justify-center border border-[#1F3D2C]/40 shadow-inner">
                            <img src={item.shoe.image} alt={item.shoe.name} className="w-full h-full object-contain" />
                          </div>

                          <div className="flex-1 min-w-0 text-xs">
                            <p className="text-[#10B981] text-[10px] sm:text-[11px] uppercase font-semibold">{item.shoe.brand}</p>
                            <h4 className="font-serif font-bold text-[#F4FAF6] text-xs sm:text-sm line-clamp-2 leading-tight">{item.shoe.name}</h4>
                            <div className="text-[#8CA899] flex items-center gap-2 mt-0.5 text-[11px]">
                              <span className="font-semibold text-[#A7F3D0]">US {item.selectedSize}</span>
                              <span>•</span>
                              <span>{item.condition}</span>
                            </div>
                            <div className="text-sm font-serif font-bold text-[#F4FAF6] mt-1">
                              {currencySymbol}{priceFormatted.toLocaleString()}
                            </div>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onRemoveItem(item.id)}
                            className="p-2 rounded-full text-[#6A8F7C] hover:text-rose-400 hover:bg-[#162A20] transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* Promo Code Box */}
                <form onSubmit={handleApplyPromo} className="pt-2">
                  <div className="flex gap-2 text-xs">
                    <input
                      type="text"
                      placeholder="Promo: VAULT10 or GRAIL50"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 min-w-0 bg-[#101C16] border border-[#1A3326] rounded-full px-3.5 sm:px-4 py-2.5 text-[#F4FAF6] placeholder-[#5A7A6A] focus:outline-none focus:border-[#00875A] shadow-sm text-xs"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-full bg-[#101E17] hover:bg-[#162A20] text-[#D1FAE5] border border-[#1E3F2E] font-semibold transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <div className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#10B981]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>Code applied: -{currencySymbol}{discountAmount.toLocaleString()} saved!</span>
                    </div>
                  )}
                  {promoError && (
                    <div className="mt-1.5 text-xs text-rose-400 font-medium">
                      {promoError}
                    </div>
                  )}
                </form>

                {/* Cost Breakdown */}
                <div className="bg-[#0D1712] rounded-3xl p-5 border border-[#182E21] space-y-2.5 text-xs shadow-lg">
                  <div className="flex justify-between text-[#8CA899]">
                    <span>Subtotal</span>
                    <span className="text-[#F4FAF6] font-bold">{currencySymbol}{subtotal.toLocaleString()}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#10B981] font-medium">
                      <span>Promo Savings</span>
                      <span>-{currencySymbol}{discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#8CA899]">
                    <span>Physical Authentication</span>
                    <span className="text-[#10B981] font-medium">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-[#8CA899]">
                    <span>Insured Courier Delivery</span>
                    <span className="text-[#10B981] font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-base font-serif font-bold text-[#F4FAF6] pt-2 border-t border-[#182E21]">
                    <span>Total Due</span>
                    <span>{currencySymbol}{finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Checkout Trigger */}
                <div className="pt-2 space-y-2">
                  <button
                    onClick={() => setIsCheckingOut(true)}
                    className="w-full py-4 rounded-full bg-[#00875A] hover:bg-[#059669] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#00875A]/25 flex items-center justify-center gap-2 active:scale-95"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-xs text-[#6A8F7C]">
                    <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                    <span>Backed by 100% Authenticity Guarantee</span>
                  </div>
                </div>
              </>
            )}
          </div>

        </motion.div>
      </div>
    </motion.div>
  );
};
