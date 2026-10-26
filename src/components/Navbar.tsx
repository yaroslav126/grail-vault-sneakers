import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  ShieldCheck, 
  X,
  Menu,
  ArrowRight,
  Send
} from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSell: () => void;
  onOpenAuth: () => void;
  onOpenContact?: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  currency: 'USD' | 'EUR' | 'GBP';
  onCurrencyChange: (c: 'USD' | 'EUR' | 'GBP') => void;
  onNavigateMarket: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSell,
  onOpenAuth,
  onOpenContact,
  searchQuery,
  onSearchChange,
  currency,
  onCurrencyChange,
  onNavigateMarket
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#080C0A]/94 backdrop-blur-xl border-b border-[#162B1F] shadow-md transition-all">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-3 sm:gap-6 min-w-0">
          <button 
            onClick={onNavigateMarket}
            className="flex items-center gap-2.5 sm:gap-3 group text-left min-w-0"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#00875A] text-white flex-shrink-0 flex items-center justify-center font-serif font-bold text-base sm:text-xl shadow-md shadow-[#00875A]/30 group-hover:bg-[#059669] transition-colors">
              V
            </div>
            <div className="min-w-0">
              <span className="font-serif font-bold text-base sm:text-xl lg:text-2xl tracking-tight text-[#F4FAF6] group-hover:text-[#34D399] transition-colors truncate block max-w-[140px] xs:max-w-[200px] sm:max-w-none">
                The Sneaker Vault
              </span>
              <p className="hidden sm:block text-[10px] sm:text-[11px] font-medium tracking-wide text-[#8CA899] uppercase truncate">
                Curated Luxury Archive
              </p>
            </div>
          </button>
        </div>

        {/* Center: Search Bar (Desktop & Tablets) */}
        <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-6 relative">
          <div className={`w-full flex items-center gap-2.5 px-4 py-2 sm:py-2.5 rounded-full bg-[#0E1813] border transition-all ${
            searchFocused ? 'border-[#00875A] shadow-md ring-2 ring-[#00875A]/25' : 'border-[#1C3627] hover:border-[#2A523C]'
          }`}>
            <Search className="w-4 h-4 text-[#6A8F7C] flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search Dior, Travis Scott, Off-White, Dunks..."
              className="bg-transparent w-full text-sm text-[#F4FAF6] placeholder-[#5A7A6A] focus:outline-none"
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="text-[#6A8F7C] hover:text-[#F4FAF6] p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
          
          {/* Mobile Search Icon Toggle */}
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="md:hidden p-2 rounded-full bg-[#101E17] hover:bg-[#162A20] border border-[#1C3627] text-[#D1FAE5]"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-[#A7C2B2] mr-2">
            <button 
              onClick={onNavigateMarket} 
              className="px-3 py-1.5 rounded-full hover:text-[#F4FAF6] hover:bg-[#12241B] transition-colors"
            >
              Collection
            </button>
            <button 
              onClick={onOpenAuth} 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:text-[#F4FAF6] hover:bg-[#12241B] transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span>Authenticity</span>
            </button>
            {onOpenContact && (
              <button 
                onClick={onOpenContact} 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:text-[#F4FAF6] hover:bg-[#12241B] transition-colors"
                title="Work requests & contact via Telegram bot @Slava_Dev_bot"
              >
                <Send className="w-3.5 h-3.5 text-[#34D399]" />
                <span>Contact</span>
              </button>
            )}
          </nav>

          {/* Currency Selector (Tablet & Desktop) */}
          <div className="hidden sm:flex items-center bg-[#0E1813] border border-[#1C3627] rounded-full p-0.5 text-xs font-medium">
            {(['USD', 'EUR', 'GBP'] as const).map((curr) => (
              <button
                key={curr}
                onClick={() => onCurrencyChange(curr)}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  currency === curr ? 'bg-[#00875A] text-white font-bold shadow-sm' : 'text-[#8CA899] hover:text-[#D1FAE5]'
                }`}
              >
                {curr}
              </button>
            ))}
          </div>

          {/* Consign / Sell Button */}
          <button
            onClick={onOpenSell}
            className="hidden md:flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold tracking-wide bg-[#101E17] hover:bg-[#172D22] border border-[#1E3F2D] text-[#F4FAF6] transition-all shadow-sm"
          >
            <span>Consign</span>
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 sm:p-2.5 rounded-full bg-[#101E17] hover:bg-[#172D22] border border-[#1C3627] text-[#D1FAE5] hover:text-[#F4FAF6] transition-colors shadow-sm"
            title="Saved Favorites"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#00875A] text-white text-[10px] sm:text-[11px] font-bold flex items-center justify-center shadow-sm">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Bag Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#00875A] hover:bg-[#059669] text-white font-semibold text-xs tracking-wide transition-all shadow-md shadow-[#00875A]/30 active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bag</span>
            {cartCount > 0 && (
              <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#080C0A] text-[#F4FAF6] text-[10px] sm:text-[11px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#101E17] border border-[#1C3627] text-[#D1FAE5] hover:bg-[#172D22]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar Dropdown */}
      {mobileSearchOpen && (
        <div className="md:hidden border-t border-[#162B1F] bg-[#0A120E] px-4 py-3">
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#101E17] border border-[#1C3627] shadow-sm">
            <Search className="w-4 h-4 text-[#6A8F7C] flex-shrink-0" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search Dior, Travis Scott, Off-White..."
              className="bg-transparent w-full text-sm text-[#F4FAF6] placeholder-[#5A7A6A] focus:outline-none"
            />
            {searchQuery && (
              <button onClick={() => onSearchChange('')} className="text-[#6A8F7C]">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#162B1F] bg-[#0A120E] px-4 py-5 space-y-4 shadow-2xl">
          {/* Currency on Mobile */}
          <div className="flex items-center justify-between py-2 border-b border-[#162B1F]">
            <span className="text-xs font-semibold text-[#8CA899] uppercase tracking-wider">Currency</span>
            <div className="flex items-center bg-[#101E17] border border-[#1C3627] rounded-full p-0.5 text-xs font-medium">
              {(['USD', 'EUR', 'GBP'] as const).map((curr) => (
                <button
                  key={curr}
                  onClick={() => onCurrencyChange(curr)}
                  className={`px-3 py-1 rounded-full transition-all ${
                    currency === curr ? 'bg-[#00875A] text-white font-bold shadow-sm' : 'text-[#8CA899]'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <button
              onClick={() => { onNavigateMarket(); setMobileMenuOpen(false); }}
              className="px-4 py-3 rounded-2xl bg-[#00875A] hover:bg-[#059669] text-xs font-semibold text-white text-center shadow-md shadow-[#00875A]/25"
            >
              Explore Collection
            </button>
            <button
              onClick={() => { onOpenSell(); setMobileMenuOpen(false); }}
              className="px-4 py-3 rounded-2xl bg-[#101E17] border border-[#1E3F2D] text-[#F4FAF6] text-xs font-semibold text-center hover:bg-[#172D22]"
            >
              Consign a Pair
            </button>
          </div>

          <button
            onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#0E1813] border border-[#1C3627] text-xs text-[#D1FAE5] font-medium shadow-sm hover:bg-[#14261D]"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span>12-Point Authentication Guarantee</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#6A8F7C]" />
          </button>

          {onOpenContact && (
            <button
              onClick={() => { onOpenContact(); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#101E17] border border-[#1E3F2D] text-xs text-[#F4FAF6] font-semibold shadow-sm hover:bg-[#172D22]"
            >
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-[#34D399]" />
                <span>Telegram Work Requests (@Slava_Dev_bot)</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#34D399]" />
            </button>
          )}
        </div>
      )}
    </header>
  );
};
