import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  ArrowRight, 
  Lock
} from 'lucide-react';
import { Shoe } from '../types';

interface HeroBannerProps {
  featuredShoe: Shoe;
  onSelectShoe: (shoe: Shoe) => void;
  onSelectBrand: (brand: string) => void;
  onExploreMarket: () => void;
  onOpenAuth: () => void;
  currency?: 'USD' | 'EUR' | 'GBP';
  currencyRate?: number;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  featuredShoe,
  onSelectShoe,
  onSelectBrand,
  onExploreMarket,
  onOpenAuth,
  currency = 'USD',
  currencyRate = 1
}) => {
  const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£';
  const priceConverted = Math.round(featuredShoe.lowestAsk * currencyRate);
  const topBrands = ['Dior', 'Travis Scott', 'Off-White', 'Louis Vuitton', 'Balenciaga', 'Maison Margiela', 'Rick Owens', 'Jordan'];

  return (
    <section className="relative overflow-hidden pt-6 sm:pt-10 pb-12 sm:pb-16 bg-gradient-to-b from-[#09120D] via-[#080C0A] to-[#080C0A] border-b border-[#162B1F]">
      
      {/* Modern floating ambient dark contrast emerald & forest glows */}
      <div className="absolute -top-12 right-1/4 w-[350px] sm:w-[550px] h-[300px] sm:h-[450px] bg-gradient-to-tr from-[#059669]/24 via-[#064E3B]/16 to-transparent rounded-full blur-[110px] pointer-events-none animate-float-slow -z-10" />
      <div className="absolute top-1/3 -left-12 w-[300px] sm:w-[480px] h-[250px] sm:h-[380px] bg-gradient-to-br from-[#10B981]/15 via-[#0A3824]/20 to-transparent rounded-full blur-[130px] pointer-events-none animate-float-reverse -z-10" />
      <div className="absolute bottom-0 right-10 w-[240px] sm:w-[380px] h-[200px] sm:h-[300px] bg-[#059669]/14 rounded-full blur-[90px] pointer-events-none animate-pulse-subtle -z-10" />

      {/* Modern luxury background grid overlay */}
      <div className="absolute inset-0 bg-emerald-grid opacity-25 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Editorial Value Proposition */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#0E1A13] border border-[#1A3326] shadow-sm text-[10px] xs:text-[11px] sm:text-xs font-semibold text-[#A7F3D0] max-w-full">
              <span className="truncate">Private Archival Haute Collection</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2 sm:space-y-3">
              <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-[#F4FAF6] leading-[1.18] sm:leading-[1.12]">
                The Rare Footwear <br className="hidden xs:inline" />
                <span className="italic font-normal text-[#10B981]">Archival Collection.</span>
              </h1>
              <p className="text-[#8CA899] text-xs sm:text-base lg:text-lg max-w-xl font-normal leading-relaxed">
                A refined destination to acquire and consign authenticated luxury sneakers and limited runway editions. 
                Every pair undergoes physical laboratory inspection prior to release.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1 sm:pt-2">
              <button
                onClick={onExploreMarket}
                className="w-full sm:w-auto px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#00875A] hover:bg-[#059669] text-white font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-md shadow-[#00875A]/30 flex items-center justify-center gap-2 active:scale-95 text-center"
              >
                <span>Explore the Collection</span>
                <ArrowRight className="w-4 h-4 flex-shrink-0" />
              </button>
              
              <button
                onClick={onOpenAuth}
                className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-[#101E17] hover:bg-[#162A20] border border-[#1E3F2D] text-[#D1FAE5] text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-sm text-center"
              >
                <ShieldCheck className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                <span className="truncate">Our Verification Standard</span>
              </button>
            </div>

            {/* Curation Standards Metric Bar in Dark Green Contrast Theme */}
            <div className="pt-6 sm:pt-8 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-6 border-t border-[#162B1F]">
              <div className="p-2.5 sm:p-0 rounded-2xl bg-[#0E1813] sm:bg-transparent border border-[#182F22] sm:border-none text-center sm:text-left min-w-0">
                <p className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-[#F4FAF6] truncate">100%</p>
                <p className="text-[10px] xs:text-[11px] sm:text-xs text-[#6A8F7C] uppercase tracking-wide mt-0.5 leading-tight break-words">Physical Guarantee</p>
              </div>
              <div className="p-2.5 sm:p-0 rounded-2xl bg-[#0E1813] sm:bg-transparent border border-[#182F22] sm:border-none text-center sm:text-left min-w-0">
                <p className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-[#10B981] truncate">12-Point</p>
                <p className="text-[10px] xs:text-[11px] sm:text-xs text-[#6A8F7C] uppercase tracking-wide mt-0.5 leading-tight break-words">Laboratory Audit</p>
              </div>
              <div className="p-2.5 sm:p-0 rounded-2xl bg-[#0E1813] sm:bg-transparent border border-[#182F22] sm:border-none text-center sm:text-left min-w-0">
                <p className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-[#F4FAF6] truncate">Insured</p>
                <p className="text-[10px] xs:text-[11px] sm:text-xs text-[#6A8F7C] uppercase tracking-wide mt-0.5 leading-tight break-words">White-Glove Courier</p>
              </div>
              <div className="p-2.5 sm:p-0 rounded-2xl bg-[#0E1813] sm:bg-transparent border border-[#182F22] sm:border-none text-center sm:text-left min-w-0">
                <p className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-[#F4FAF6] truncate">Archival</p>
                <p className="text-[10px] xs:text-[11px] sm:text-xs text-[#6A8F7C] uppercase tracking-wide mt-0.5 leading-tight break-words">Curated Editions</p>
              </div>
            </div>

            {/* House Brands */}
            <div className="pt-1">
              <span className="text-xs font-semibold text-[#8CA899] uppercase tracking-wider block mb-2">Featured Ateliers:</span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {topBrands.map((b) => (
                  <button
                    key={b}
                    onClick={() => onSelectBrand(b)}
                    className="px-3 py-1.5 text-xs rounded-full bg-[#0E1813] hover:bg-[#13241B] border border-[#1A3326] text-[#A7C2B2] hover:text-[#F4FAF6] transition-colors shadow-sm"
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Featured Spotlight Pair */}
          <div className="lg:col-span-5">
            <motion.div 
              whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
              onClick={() => onSelectShoe(featuredShoe)}
              className="group relative rounded-3xl p-4 sm:p-6 bg-[#0D1712]/95 backdrop-blur-md border border-[#1A3326] hover:border-[#2E5C44] transition-all duration-300 shadow-2xl hover:shadow-[#000000]/70 cursor-pointer"
            >
              {/* Badges */}
              <div className="flex items-center justify-between gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                <span className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full bg-[#13241B] border border-[#1E3F2D] text-[#A7F3D0] text-[10px] xs:text-[11px] sm:text-xs font-semibold shrink-0">
                  <span>Curator's Spotlight</span>
                </span>
                <span className="text-[#A7F3D0] text-[10px] xs:text-[11px] sm:text-xs font-semibold bg-[#0E1B14] px-2.5 sm:px-3 py-1 rounded-full border border-[#1A3326] shrink-0">
                  {featuredShoe.condition}
                </span>
              </div>

              {/* Shoe Image on Neutral Vitrine Pedestal */}
              <div className="relative aspect-[4/3] w-full flex items-center justify-center overflow-hidden rounded-2xl bg-[#FAF6F0] p-4 sm:p-6 border border-[#1F3D2C]/40 shadow-inner">
                <img
                  src={featuredShoe.image}
                  alt={featuredShoe.name}
                  className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2.5 left-2.5 bg-[#0B150F]/90 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium text-[#A7F3D0] border border-[#1A3326] flex items-center gap-1.5 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />
                  <span>Hand Inspected</span>
                </div>
              </div>

              {/* Shoe Info */}
              <div className="mt-4 sm:mt-5 space-y-3">
                <div>
                  <div className="flex items-center justify-between text-[11px] sm:text-xs text-[#10B981] uppercase tracking-wider font-semibold">
                    <span>{featuredShoe.brand}</span>
                    <span className="text-[#6A8F7C]">Style: {featuredShoe.sku}</span>
                  </div>
                  <h3 className="text-base xs:text-lg sm:text-2xl font-serif font-bold text-[#F4FAF6] group-hover:text-[#34D399] transition-colors mt-1 line-clamp-2 leading-tight break-words">
                    {featuredShoe.name}
                  </h3>
                  <p className="text-xs text-[#6A8F7C] line-clamp-1">{featuredShoe.colorway}</p>
                </div>

                {/* Acquisition Price Display */}
                <div className="flex items-center justify-between pt-2.5 sm:pt-3 border-t border-[#162B1F] bg-[#101C16] px-4 py-3 rounded-2xl border border-[#1A3326]">
                  <div>
                    <span className="text-[10px] sm:text-[11px] text-[#6A8F7C] uppercase tracking-wider block">Acquisition</span>
                    <span className="text-lg sm:text-2xl font-serif font-bold text-[#F4FAF6]">{currencySymbol}{priceConverted.toLocaleString()}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] sm:text-[11px] text-[#6A8F7C] uppercase tracking-wider block">Year</span>
                    <span className="text-xs sm:text-sm font-serif font-semibold text-[#10B981]">{featuredShoe.year}</span>
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between text-xs">
                  <span className="text-[#6A8F7C] flex items-center gap-1.5 text-[11px] sm:text-xs">
                    <Lock className="w-3.5 h-3.5 text-[#00875A]" />
                    <span>Insured Dispatch</span>
                  </span>
                  <span className="text-[#A7F3D0] font-semibold group-hover:underline flex items-center gap-1">
                    <span>Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
