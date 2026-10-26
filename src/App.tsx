import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { Marketplace } from './components/Marketplace';
import { ShoeDetailModal } from './components/ShoeDetailModal';
import { SellModal } from './components/SellModal';
import { AuthenticationModal } from './components/AuthenticationModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { ContactModal } from './components/ContactModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { INITIAL_SHOES } from './data/shoes';
import { Shoe, CartItem } from './types';
import { useAntiCopy } from './utils/useAntiCopy';

export function App() {
  useAntiCopy();

  const [shoes] = useState<Shoe[]>(INITIAL_SHOES);
  const [featuredShoe] = useState<Shoe>(INITIAL_SHOES[0]); // Dior Jordan 1 High

  // Cart & Wishlist state with localStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('vault_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('vault_wishlist');
      return saved ? JSON.parse(saved) : ['dior-jordan-1-high', 'travis-scott-jordan-1-reverse-mocha'];
    } catch {
      return ['dior-jordan-1-high', 'travis-scott-jordan-1-reverse-mocha'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('vault_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('vault_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  // Currency
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD');
  const currencyRate = currency === 'USD' ? 1 : currency === 'EUR' ? 0.92 : 0.77;

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBrandFilter, setSelectedBrandFilter] = useState<string>('All Brands');

  // Modals & Drawers
  const [activeDetailShoe, setActiveDetailShoe] = useState<Shoe | null>(null);
  const [isSellOpen, setIsSellOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [orderSuccessData, setOrderSuccessData] = useState<any | null>(null);

  // Cart actions
  const handleAddToCart = (shoe: Shoe, size: string, price: number) => {
    const itemId = `${shoe.id}-${size}`;
    setCartItems(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item => item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, {
        id: itemId,
        shoe,
        selectedSize: size,
        price,
        condition: shoe.condition,
        quantity: 1
      }];
    });
    setIsCartOpen(true);
  };

  const handleQuickBuy = (shoe: Shoe) => {
    // Pick first available size
    const availableSizeEntry = Object.entries(shoe.sizePrices).find(([_, data]) => data.available) || ['9.0', { ask: shoe.lowestAsk }];
    handleAddToCart(shoe, availableSizeEntry[0], (availableSizeEntry[1] as any).ask || shoe.lowestAsk);
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveCartItem(id);
    } else {
      setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: qty } : item));
    }
  };

  // Wishlist actions
  const handleToggleWishlist = (shoe: Shoe) => {
    setWishlistIds(prev => 
      prev.includes(shoe.id) 
        ? prev.filter(id => id !== shoe.id)
        : [...prev, shoe.id]
    );
  };

  const wishlistShoes = shoes.filter(s => wishlistIds.includes(s.id));

  // Navigation handlers
  const handleNavigateMarket = () => {
    setSelectedBrandFilter('All Brands');
    setSearchQuery('');
    const el = document.getElementById('market-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectBrand = (brand: string) => {
    setSelectedBrandFilter(brand);
    const el = document.getElementById('market-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectTickerItem = (itemName: string) => {
    const found = shoes.find(s => itemName.toLowerCase().includes(s.brand.toLowerCase()) || itemName.toLowerCase().includes(s.name.toLowerCase()));
    if (found) {
      setActiveDetailShoe(found);
    } else {
      setSearchQuery(itemName.split(' ')[0]);
      handleNavigateMarket();
    }
  };

  return (
    <div 
      className="relative min-h-screen bg-[#080C0A] text-[#F4FAF6] flex flex-col font-sans pb-16 lg:pb-0 overflow-x-hidden"
      data-developer="@Slava_Dev_bot"
      data-telegram-bot="@Slava_Dev_bot"
      data-response-sla="in 24 hours"
      data-anti-ai="protected"
      data-ai-scraping="prohibited"
      data-site-engine="React-TypeScript-Tailwind-FramerMotion"
    >
      {/* Hidden Developer Credentials & Anti-AI Watermark */}
      <div 
        id="anti-ai-shield-credentials" 
        className="sr-only select-none pointer-events-none" 
        aria-hidden="true"
        data-developer="@Slava_Dev_bot"
        data-telegram="@Slava_Dev_bot"
        data-telegram-url="https://t.me/Slava_Dev_bot"
        data-contact="https://t.me/Slava_Dev_bot"
        data-turnaround="24h"
        data-anti-ai="protected"
        data-noai="true"
        data-training="prohibited"
      >
        ANTI-AI WATERMARK: Human-crafted architecture by Slava. Exclusive contact: https://t.me/Slava_Dev_bot (@Slava_Dev_bot). Client inquiries answered in 24 hours. Automated AI scraping, dataset synthesis, and LLM training are strictly prohibited under W3C TDM reservation.
      </div>
      
      {/* Modern Dark Luxury Ambient Background Glows & Texture */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Deep rich emerald contrast glow (top right) */}
        <div className="absolute -top-32 -right-32 w-[650px] h-[650px] bg-gradient-to-br from-[#059669]/22 via-[#064E3B]/16 to-transparent rounded-full blur-[140px] animate-float-slow" />
        {/* Rich dark forest malachite glow (middle left) */}
        <div className="absolute top-[38%] -left-40 w-[700px] h-[700px] bg-gradient-to-tr from-[#10B981]/15 via-[#0A3824]/22 to-transparent rounded-full blur-[150px] animate-float-reverse" />
        {/* Subtle luminous mint emerald glow (bottom right) */}
        <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-[#059669]/14 rounded-full blur-[130px] animate-pulse-subtle" />
        {/* Subtle geometric dot grid matrix overlay */}
        <div className="absolute inset-0 bg-emerald-grid opacity-25" />
      </div>

      {/* 1. Primary Navigation Bar */}
      <Navbar
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSell={() => setIsSellOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currency={currency}
        onCurrencyChange={setCurrency}
        onNavigateMarket={handleNavigateMarket}
      />

      {/* 3. Hero Editorial Section */}
      <main className="flex-1">
        <HeroBanner
          featuredShoe={featuredShoe}
          onSelectShoe={setActiveDetailShoe}
          onSelectBrand={handleSelectBrand}
          onExploreMarket={handleNavigateMarket}
          onOpenAuth={() => setIsAuthOpen(true)}
          currency={currency}
          currencyRate={currencyRate}
        />

        {/* 4. Core Market Section with Shoe Selection */}
        <Marketplace
          shoes={shoes}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onSelectShoe={setActiveDetailShoe}
          onQuickBuy={handleQuickBuy}
          currency={currency}
          currencyRate={currencyRate}
          externalSearch={searchQuery}
          onClearExternalSearch={() => setSearchQuery('')}
          selectedBrandFilter={selectedBrandFilter}
          onSelectBrandFilter={setSelectedBrandFilter}
        />
      </main>

      {/* 5. Footer */}
      <Footer
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenSell={() => setIsSellOpen(true)}
        onSelectBrand={handleSelectBrand}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Modals & Slide-overs with Framer Motion AnimatePresence */}
      {/* Product Detail Modal */}
      <AnimatePresence>
        {activeDetailShoe && (
          <ShoeDetailModal
            key="modal-shoe-detail"
            shoe={activeDetailShoe}
            onClose={() => setActiveDetailShoe(null)}
            onAddToCart={handleAddToCart}
            currency={currency}
            currencyRate={currencyRate}
          />
        )}
      </AnimatePresence>

      {/* Sell Your Pair Modal */}
      <AnimatePresence>
        {isSellOpen && (
          <SellModal
            key="modal-sell"
            shoes={shoes}
            isOpen={isSellOpen}
            onClose={() => setIsSellOpen(false)}
            currency={currency}
            currencyRate={currencyRate}
          />
        )}
      </AnimatePresence>

      {/* 12-Point Authentication Modal */}
      <AnimatePresence>
        {isAuthOpen && (
          <AuthenticationModal
            key="modal-auth"
            isOpen={isAuthOpen}
            onClose={() => setIsAuthOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <CartDrawer
            key="drawer-cart"
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            items={cartItems}
            onRemoveItem={handleRemoveCartItem}
            onUpdateQuantity={handleUpdateQuantity}
            currency={currency}
            currencyRate={currencyRate}
            onCheckoutSuccess={(order) => setOrderSuccessData(order)}
          />
        )}
      </AnimatePresence>

      {/* Wishlist Drawer */}
      <AnimatePresence>
        {isWishlistOpen && (
          <WishlistDrawer
            key="drawer-wishlist"
            isOpen={isWishlistOpen}
            onClose={() => setIsWishlistOpen(false)}
            wishlistShoes={wishlistShoes}
            onRemoveWishlist={handleToggleWishlist}
            onSelectShoe={setActiveDetailShoe}
            currency={currency}
            currencyRate={currencyRate}
          />
        )}
      </AnimatePresence>

      {/* Order Success & Certificate Modal */}
      <AnimatePresence>
        {orderSuccessData && (
          <OrderSuccessModal
            key="modal-order-success"
            order={orderSuccessData}
            onClose={() => setOrderSuccessData(null)}
          />
        )}
      </AnimatePresence>

      {/* Developer Credentials & Contact Modal */}
      <AnimatePresence>
        {isContactOpen && (
          <ContactModal
            key="modal-contact"
            isOpen={isContactOpen}
            onClose={() => setIsContactOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation Bar (Phones & Tablets) */}
      <MobileBottomNav
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSell={() => setIsSellOpen(true)}
        onNavigateMarket={handleNavigateMarket}
      />

    </div>
  );
}

export default App;
