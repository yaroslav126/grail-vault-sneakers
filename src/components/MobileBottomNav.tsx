import React from 'react';
import { 
  Compass, 
  Search, 
  ArrowUpRight, 
  Heart, 
  ShoppingBag 
} from 'lucide-react';

interface MobileBottomNavProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSell: () => void;
  onNavigateMarket: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSell,
  onNavigateMarket
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#080C0A]/96 backdrop-blur-xl border-t border-[#162B1F] py-2 px-2 flex items-center justify-around lg:hidden shadow-[0_-4px_24px_rgba(0,0,0,0.7)]">
      
      {/* 1. Explore */}
      <button
        onClick={onNavigateMarket}
        className="flex-1 min-w-0 flex flex-col items-center justify-center p-1 text-[#8CA899] hover:text-[#F4FAF6] active:scale-95 transition-all"
      >
        <Compass className="w-5 h-5 text-[#10B981] shrink-0" />
        <span className="text-[10px] text-[#A7F3D0] font-medium tracking-tight mt-0.5 truncate max-w-full">Explore</span>
      </button>

      {/* 2. Search */}
      <button
        onClick={() => {
          onNavigateMarket();
          const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
          if (searchInput) searchInput.focus();
        }}
        className="flex-1 min-w-0 flex flex-col items-center justify-center p-1 text-[#8CA899] hover:text-[#F4FAF6] active:scale-95 transition-all"
      >
        <Search className="w-5 h-5 shrink-0" />
        <span className="text-[10px] text-[#8CA899] font-medium tracking-tight mt-0.5 truncate max-w-full">Search</span>
      </button>

      {/* 3. Consign */}
      <button
        onClick={onOpenSell}
        className="flex-1 min-w-0 flex flex-col items-center justify-center p-1 text-[#8CA899] hover:text-[#F4FAF6] active:scale-95 transition-all"
      >
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#101E17] border border-[#1A3326] flex items-center justify-center shadow-md shrink-0">
          <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#10B981]" />
        </div>
        <span className="text-[10px] text-[#A7F3D0] font-medium tracking-tight mt-0.5 truncate max-w-full">Consign</span>
      </button>

      {/* 4. Wishlist */}
      <button
        onClick={onOpenWishlist}
        className="flex-1 min-w-0 relative flex flex-col items-center justify-center p-1 text-[#8CA899] hover:text-[#F4FAF6] active:scale-95 transition-all"
      >
        <Heart className="w-5 h-5 shrink-0" />
        <span className="text-[10px] text-[#8CA899] font-medium tracking-tight mt-0.5 truncate max-w-full">Favorites</span>
        {wishlistCount > 0 && (
          <span className="absolute top-0 right-2 sm:right-3 w-4 h-4 rounded-full bg-[#00875A] text-white text-[9px] font-bold flex items-center justify-center shadow-sm">
            {wishlistCount}
          </span>
        )}
      </button>

      {/* 5. Bag */}
      <button
        onClick={onOpenCart}
        className="flex-1 min-w-0 relative flex flex-col items-center justify-center p-1 text-[#8CA899] hover:text-[#F4FAF6] active:scale-95 transition-all"
      >
        <ShoppingBag className="w-5 h-5 text-[#10B981] shrink-0" />
        <span className="text-[10px] font-semibold tracking-tight text-[#F4FAF6] mt-0.5 truncate max-w-full">Bag</span>
        {cartCount > 0 && (
          <span className="absolute top-0 right-2 sm:right-3 w-4 h-4 rounded-full bg-[#00875A] text-white text-[9px] font-bold flex items-center justify-center shadow-sm">
            {cartCount}
          </span>
        )}
      </button>

    </nav>
  );
};
