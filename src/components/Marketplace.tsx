import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpDown, 
  LayoutGrid, 
  List, 
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
  Grid
} from 'lucide-react';
import { Shoe, FilterState, Category } from '../types';
import { ShoeCard } from './ShoeCard';

interface MarketplaceProps {
  shoes: Shoe[];
  wishlistIds: string[];
  onToggleWishlist: (shoe: Shoe) => void;
  onSelectShoe: (shoe: Shoe) => void;
  onQuickBuy: (shoe: Shoe) => void;
  currency: 'USD' | 'EUR' | 'GBP';
  currencyRate: number;
  externalSearch?: string;
  onClearExternalSearch?: () => void;
  selectedBrandFilter?: string;
  onSelectBrandFilter?: (brand: string) => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({
  shoes,
  wishlistIds,
  onToggleWishlist,
  onSelectShoe,
  onQuickBuy,
  currency,
  currencyRate,
  externalSearch = '',
  onClearExternalSearch,
  selectedBrandFilter = 'All Brands',
  onSelectBrandFilter
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [mobileColumns, setMobileColumns] = useState<1 | 2>(2);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [category, setCategory] = useState<string>('All Categories');
  const [condition, setCondition] = useState<string>('All Conditions');
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number>(10000);
  const [sortBy, setSortBy] = useState<FilterState['sortBy']>('trending');
  const [localSearch, setLocalSearch] = useState<string>('');

  const effectiveSearch = externalSearch || localSearch;

  const brands = [
    'All Brands',
    'Dior',
    'Travis Scott',
    'Off-White',
    'Louis Vuitton',
    'Balenciaga',
    'Maison Margiela',
    'Jordan',
    'Nike',
    'New Balance',
    'Adidas',
    'Rick Owens'
  ];

  const categories: Category[] = [
    'All Categories',
    'Luxury High-Fashion',
    'Iconic Grails',
    'Streetwear Dunks & Jordans',
    'Limited Collabs',
    'Design Runway'
  ];

  const conditions = [
    'All Conditions',
    'Deadstock (DS)',
    'Near Deadstock (VNDS)',
    'Pre-Owned Authenticated'
  ];

  const availableSizes = ['All', '8.0', '8.5', '9.0', '9.5', '10.0', '10.5', '11.0', '12.0'];

  const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£';

  // Filter and Sort Logic
  const filteredShoes = useMemo(() => {
    return shoes.filter((shoe) => {
      if (effectiveSearch) {
        const query = effectiveSearch.toLowerCase();
        const matchName = shoe.name.toLowerCase().includes(query);
        const matchBrand = shoe.brand.toLowerCase().includes(query);
        const matchColor = shoe.colorway.toLowerCase().includes(query);
        const matchSku = shoe.sku.toLowerCase().includes(query);
        if (!matchName && !matchBrand && !matchColor && !matchSku) return false;
      }

      if (selectedBrandFilter !== 'All Brands' && shoe.brand !== selectedBrandFilter) {
        return false;
      }

      if (category !== 'All Categories' && shoe.category !== category) {
        return false;
      }

      if (condition !== 'All Conditions' && shoe.condition !== condition) {
        return false;
      }

      if (shoe.lowestAsk > priceRange) {
        return false;
      }

      if (selectedSize !== 'All') {
        const sizeData = shoe.sizePrices[selectedSize];
        if (!sizeData || !sizeData.available) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'trending') return (b.isGrail ? 1 : 0) - (a.isGrail ? 1 : 0) || b.priceChange24h - a.priceChange24h;
      if (sortBy === 'price-asc') return a.lowestAsk - b.lowestAsk;
      if (sortBy === 'price-desc') return b.lowestAsk - a.lowestAsk;
      if (sortBy === 'highest-bid') return b.highestBid - a.highestBid;
      if (sortBy === 'top-gainers') return b.priceChange24h - a.priceChange24h;
      if (sortBy === 'newest') return b.year - a.year;
      return 0;
    });
  }, [shoes, effectiveSearch, selectedBrandFilter, category, condition, priceRange, selectedSize, sortBy]);

  const resetAllFilters = () => {
    onSelectBrandFilter?.('All Brands');
    setCategory('All Categories');
    setCondition('All Conditions');
    setSelectedSize('All');
    setPriceRange(10000);
    setSortBy('trending');
    setLocalSearch('');
    onClearExternalSearch?.();
  };

  const activeFiltersCount = 
    (selectedBrandFilter !== 'All Brands' ? 1 : 0) +
    (category !== 'All Categories' ? 1 : 0) +
    (condition !== 'All Conditions' ? 1 : 0) +
    (selectedSize !== 'All' ? 1 : 0) +
    (priceRange < 10000 ? 1 : 0) +
    (effectiveSearch ? 1 : 0);

  const hasActiveFilters = activeFiltersCount > 0;

  return (
    <section id="market-section" className="py-8 sm:py-14 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
      
      {/* Market Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-[#162B1F]">
        <div>
          <div className="mb-1.5 sm:mb-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#10B981]">
            <span>The Curated Archive</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#F4FAF6] tracking-tight">
            The Vault Collection
          </h2>
          <p className="text-[#8CA899] text-xs sm:text-base mt-1 max-w-xl">
            Explore authentic luxury pairs and archival grails ready for immediate acquisition or verified consignment.
          </p>
        </div>

        {/* View Mode & Sorter Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          
          {/* Mobile Filter Sheet Button (< lg) */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 sm:py-2.5 rounded-full bg-[#0E1A13] border border-[#1C3627] text-[#D1FAE5] text-xs font-semibold shadow-sm hover:bg-[#13261C] active:scale-95"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#00875A] text-white text-[10px] font-bold flex items-center justify-center ml-0.5">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-[#0E1A13] border border-[#1C3627] px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-full text-xs shadow-sm flex-1 sm:flex-initial">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as FilterState['sortBy'])}
              className="bg-transparent text-[#F4FAF6] font-semibold focus:outline-none cursor-pointer w-full text-xs"
            >
              <option value="trending" className="bg-[#0E1A13] text-[#F4FAF6]">Curated / Featured</option>
              <option value="price-asc" className="bg-[#0E1A13] text-[#F4FAF6]">Price: Low to High</option>
              <option value="price-desc" className="bg-[#0E1A13] text-[#F4FAF6]">Price: High to Low</option>
              <option value="newest" className="bg-[#0E1A13] text-[#F4FAF6]">Release Year</option>
            </select>
          </div>

          {/* Mobile 1-col vs 2-col View Toggle (Visible on phones) */}
          <div className="sm:hidden flex items-center bg-[#0C1510] border border-[#182E21] rounded-full p-0.5 shadow-sm">
            <button
              onClick={() => { setViewMode('grid'); setMobileColumns(1); }}
              className={`p-1.5 rounded-full ${
                viewMode === 'grid' && mobileColumns === 1 ? 'bg-[#00875A] text-white' : 'text-[#6A8F7C]'
              }`}
              title="Large Cards"
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => { setViewMode('grid'); setMobileColumns(2); }}
              className={`p-1.5 rounded-full ${
                viewMode === 'grid' && mobileColumns === 2 ? 'bg-[#00875A] text-white' : 'text-[#6A8F7C]'
              }`}
              title="Compact 2-Column Grid"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-full ${
                viewMode === 'table' ? 'bg-[#00875A] text-white' : 'text-[#6A8F7C]'
              }`}
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Desktop/Tablet Grid vs Table View Mode */}
          <div className="hidden sm:flex items-center bg-[#0C1510] border border-[#182E21] rounded-full p-1 shadow-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-full transition-colors ${
                viewMode === 'grid' ? 'bg-[#00875A] text-white shadow-sm' : 'text-[#6A8F7C] hover:text-[#F4FAF6]'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-full transition-colors ${
                viewMode === 'table' ? 'bg-[#00875A] text-white shadow-sm' : 'text-[#6A8F7C] hover:text-[#F4FAF6]'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Brand Pills Carousel */}
      <div className="py-4 border-b border-[#162B1F]">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-3.5 px-3.5 sm:mx-0 sm:px-0">
          {brands.map((b) => {
            const isSelected = selectedBrandFilter === b;
            return (
              <button
                key={b}
                onClick={() => onSelectBrandFilter?.(b)}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                  isSelected
                    ? 'bg-[#00875A] text-white shadow-md shadow-[#00875A]/25'
                    : 'bg-[#0E1813] hover:bg-[#13241B] text-[#A7C2B2] border border-[#1A3326] shadow-sm'
                }`}
              >
                {b}
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop/Tablet Extended Filter Bar */}
      <div className="hidden lg:block py-6 space-y-6 border-b border-[#162B1F]">
        
        {/* Row 2: Category & Condition Pills */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          <div className="md:col-span-8 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  category === cat
                    ? 'bg-[#13261C] text-[#A7F3D0] border border-[#1E4330] font-semibold'
                    : 'bg-[#0E1813] text-[#8CA899] hover:bg-[#122219] border border-[#182E21]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="md:col-span-4 flex items-center justify-end gap-2 text-xs">
            <span className="text-[#6A8F7C] font-medium">Condition:</span>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="bg-[#0E1813] border border-[#1A3326] text-[#D1FAE5] rounded-full px-3 py-1.5 font-medium focus:outline-none shadow-sm cursor-pointer"
            >
              {conditions.map((c) => (
                <option key={c} value={c} className="bg-[#0E1813] text-[#F4FAF6]">{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 3: Size Filter Matrix & Price Max Slider */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2 items-center">
          
          <div className="lg:col-span-8 space-y-2">
            <span className="text-xs font-semibold text-[#8CA899] uppercase tracking-wider block">
              Filter by US Size:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {availableSizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-3.5 h-9 rounded-full text-xs font-medium flex items-center justify-center transition-all ${
                    selectedSize === sz
                      ? 'bg-[#00875A] text-white font-bold shadow-md shadow-[#00875A]/25'
                      : 'bg-[#0E1813] border border-[#182E21] text-[#8CA899] hover:bg-[#122219]'
                  }`}
                >
                  {sz === 'All' ? 'All Sizes' : `US ${sz}`}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-2 bg-[#0E1813] p-4 rounded-3xl border border-[#182E21] shadow-sm">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#6A8F7C] font-medium">Maximum Price</span>
              <span className="font-serif font-bold text-[#10B981] text-sm">
                {currencySymbol}{Math.round(priceRange * currencyRate).toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="300"
              max="10000"
              step="100"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-[#00875A] cursor-pointer"
            />
          </div>

        </div>

      </div>

      {/* Active Filters Pill Bar */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-3 text-xs">
          <span className="text-[#6A8F7C] font-medium text-[11px] sm:text-xs">Active:</span>
          {selectedBrandFilter !== 'All Brands' && (
            <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-[#101E17] border border-[#1A3326] text-[#D1FAE5] text-[11px] sm:text-xs">
              {selectedBrandFilter}
              <button onClick={() => onSelectBrandFilter?.('All Brands')} className="hover:text-white font-bold ml-0.5">×</button>
            </span>
          )}
          {category !== 'All Categories' && (
            <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-[#101E17] border border-[#1A3326] text-[#D1FAE5] text-[11px] sm:text-xs">
              {category}
              <button onClick={() => setCategory('All Categories')} className="hover:text-white font-bold ml-0.5">×</button>
            </span>
          )}
          {condition !== 'All Conditions' && (
            <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-[#101E17] border border-[#1A3326] text-[#D1FAE5] text-[11px] sm:text-xs">
              {condition}
              <button onClick={() => setCondition('All Conditions')} className="hover:text-white font-bold ml-0.5">×</button>
            </span>
          )}
          {selectedSize !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-[#101E17] border border-[#1A3326] text-[#D1FAE5] text-[11px] sm:text-xs">
              US {selectedSize}
              <button onClick={() => setSelectedSize('All')} className="hover:text-white font-bold ml-0.5">×</button>
            </span>
          )}
          {effectiveSearch && (
            <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-[#101E17] border border-[#1A3326] text-[#D1FAE5] text-[11px] sm:text-xs">
              "{effectiveSearch}"
              <button onClick={() => { setLocalSearch(''); onClearExternalSearch?.(); }} className="hover:text-white font-bold ml-0.5">×</button>
            </span>
          )}
          {priceRange < 10000 && (
            <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-[#101E17] border border-[#1A3326] text-[#D1FAE5] text-[11px] sm:text-xs">
              Under {currencySymbol}{Math.round(priceRange * currencyRate).toLocaleString()}
              <button onClick={() => setPriceRange(10000)} className="hover:text-white font-bold ml-0.5">×</button>
            </span>
          )}
          <button
            onClick={resetAllFilters}
            className="text-[#10B981] hover:text-[#34D399] underline ml-1 flex items-center gap-1 font-medium text-[11px] sm:text-xs"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      )}

      {/* Market Results Content */}
      <div className="pt-6 sm:pt-10">
        {filteredShoes.length === 0 ? (
          <div className="py-16 sm:py-20 text-center space-y-4 max-w-md mx-auto px-4">
            <div className="w-16 h-16 rounded-full bg-[#0E1813] border border-[#182E21] flex items-center justify-center mx-auto text-[#10B981]">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#F4FAF6]">No Matching Pairs Found</h3>
            <p className="text-xs sm:text-sm text-[#8CA899] leading-relaxed">
              We couldn't find any shoes matching your specific filter criteria. Try adjusting the size, atelier, or price filter.
            </p>
            <button
              onClick={resetAllFilters}
              className="px-6 py-2.5 rounded-full bg-[#00875A] hover:bg-[#059669] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md"
            >
              Reset All Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View Mode: 1 or 2 columns on mobile, 2 on tablets, 3 on desktops, 4 on xl */
          <div className={`grid gap-3.5 sm:gap-6 ${
            mobileColumns === 1 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          }`}>
            {filteredShoes.map((shoe) => (
              <ShoeCard
                key={shoe.id}
                shoe={shoe}
                isWishlisted={wishlistIds.includes(shoe.id)}
                onToggleWishlist={onToggleWishlist}
                onSelect={onSelectShoe}
                onQuickBuy={onQuickBuy}
                currencySymbol={currencySymbol}
                currencyRate={currencyRate}
              />
            ))}
          </div>
        ) : (
          /* List / Table Mode: Responsive List on mobile, Table on tablets & desktop */
          <div>
            {/* Mobile Touch-Friendly List (< md) */}
            <div className="md:hidden space-y-3">
              {filteredShoes.map((shoe) => (
                <div 
                  key={shoe.id}
                  onClick={() => onSelectShoe(shoe)}
                  className="p-3.5 rounded-2xl bg-[#0D1712] border border-[#182E21] flex items-center gap-3 shadow-lg cursor-pointer active:bg-[#122219] transition-colors"
                >
                  <div className="w-16 h-16 rounded-xl bg-[#FAF6F0] p-1 flex-shrink-0 flex items-center justify-center border border-[#1F3D2C]/40 shadow-inner">
                    <img src={shoe.image} alt={shoe.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-[10px] text-[#6A8F7C] uppercase font-semibold">
                      <span>{shoe.brand}</span>
                      <span className="text-[#A7F3D0]">{shoe.condition.split(' ')[0]}</span>
                    </div>
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-[#F4FAF6] line-clamp-2 leading-tight mt-0.5">
                      {shoe.name}
                    </h4>
                    <p className="text-[11px] text-[#6A8F7C] truncate">{shoe.colorway}</p>
                    <div className="flex items-center justify-between mt-1 pt-1.5 border-t border-[#182E21]">
                      <span className="font-serif font-bold text-[#F4FAF6] text-xs sm:text-sm">
                        {currencySymbol}{Math.round(shoe.lowestAsk * currencyRate).toLocaleString()}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onQuickBuy(shoe);
                        }}
                        className="px-3 py-1 rounded-full bg-[#00875A] hover:bg-[#059669] text-white text-[10px] font-semibold transition-colors shadow-sm"
                      >
                        Acquire
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tablet & Desktop Wide Table (>= md) */}
            <div className="hidden md:block overflow-x-auto rounded-3xl border border-[#1A3326] bg-[#0A120E] shadow-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0D1712] text-[#6A8F7C] uppercase tracking-wider border-b border-[#1A3326] font-semibold">
                  <tr>
                    <th className="py-4 px-5">Shoe & Colorway</th>
                    <th className="py-4 px-5">Atelier</th>
                    <th className="py-4 px-5">Condition</th>
                    <th className="py-4 px-5">Release</th>
                    <th className="py-4 px-5 text-right">Price</th>
                    <th className="py-4 px-5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#162A1F]">
                  {filteredShoes.map((shoe) => (
                    <tr 
                      key={shoe.id} 
                      onClick={() => onSelectShoe(shoe)}
                      className="hover:bg-[#101E17]/80 cursor-pointer transition-colors"
                    >
                      <td className="py-4 px-5 flex items-center gap-3 min-w-0">
                        <div className="w-14 h-14 rounded-2xl bg-[#FAF6F0] p-1 flex-shrink-0 flex items-center justify-center border border-[#1F3D2C]/40 shadow-inner">
                          <img src={shoe.image} alt={shoe.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="min-w-0 max-w-[170px] lg:max-w-xs xl:max-w-sm">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="font-serif font-bold text-xs lg:text-sm text-[#F4FAF6] hover:text-[#34D399] transition-colors line-clamp-2 leading-tight">
                              {shoe.name}
                            </span>
                            {shoe.isGrail && (
                              <span className="px-1.5 py-0.5 rounded bg-[#13241B] text-[#A7F3D0] border border-[#1E3F2D] text-[10px] font-semibold flex-shrink-0">
                                Grail
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-[#6A8F7C] truncate block mt-0.5">{shoe.colorway}</span>
                        </div>
                      </td>

                      <td className="py-4 px-5 text-[#A7C2B2] font-medium">
                        {shoe.brand}
                      </td>

                      <td className="py-4 px-5">
                        <span className="px-2.5 py-1 rounded-full bg-[#101E17] border border-[#1A3326] text-[#8CA899] text-[11px] font-medium">
                          {shoe.condition}
                        </span>
                      </td>

                      <td className="py-4 px-5 text-[#8CA899]">
                        {shoe.year}
                      </td>

                      <td className="py-4 px-5 text-right font-serif font-bold text-[#F4FAF6] text-sm">
                        {currencySymbol}{Math.round(shoe.lowestAsk * currencyRate).toLocaleString()}
                      </td>

                      <td className="py-4 px-5 text-center" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => onQuickBuy(shoe)}
                          className="px-4 py-2 rounded-full bg-[#00875A] hover:bg-[#059669] text-white font-semibold text-xs transition-transform active:scale-95 shadow-md shadow-[#00875A]/25"
                        >
                          Acquire
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Filter Slide-Up Bottom Sheet */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-lg bg-[#0C1510]/98 backdrop-blur-2xl rounded-t-4xl sm:rounded-4xl shadow-2xl p-5 sm:p-6 space-y-5 max-h-[88vh] overflow-y-auto z-10 border border-[#1A3326] text-[#F4FAF6]"
            >
              {/* Grab handle indicator for mobile sheet */}
              <div className="w-12 h-1.5 bg-[#1A3326] rounded-full mx-auto sm:hidden mb-1 -mt-1" />

              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#162A1F]">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#10B981]" />
                  <h3 className="font-serif font-bold text-lg text-[#F4FAF6]">Refine Collection</h3>
                </div>
                <motion.button 
                  whileHover={{ rotate: 90, scale: 1.08 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1.5 rounded-full bg-[#101E17] border border-[#1A3326] text-[#D1FAE5] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Category selection */}
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#6A8F7C] block">Category</span>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                        category === cat
                          ? 'bg-[#00875A] text-white font-bold shadow-md'
                          : 'bg-[#101E17] text-[#8CA899] border border-[#1A3326] hover:bg-[#162A20]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Condition */}
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#6A8F7C] block">Condition Grade</span>
                <div className="flex flex-wrap gap-1.5">
                  {conditions.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCondition(c)}
                      className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                        condition === c
                          ? 'bg-[#00875A] text-white font-bold shadow-md'
                          : 'bg-[#101E17] text-[#8CA899] border border-[#1A3326] hover:bg-[#162A20]'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Matrix */}
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#6A8F7C] block">US Size</span>
                <div className="flex flex-wrap gap-1.5">
                  {availableSizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`w-12 h-9 rounded-full text-xs font-semibold flex items-center justify-center transition-all ${
                        selectedSize === sz
                          ? 'bg-[#00875A] text-white font-bold shadow-md'
                          : 'bg-[#101E17] text-[#8CA899] border border-[#1A3326] hover:bg-[#162A20]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Ceiling */}
              <div className="space-y-2 bg-[#0E1813] p-4 rounded-3xl border border-[#182E21]">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#6A8F7C] font-medium">Max Price</span>
                  <span className="font-serif font-bold text-[#10B981] text-sm">
                    {currencySymbol}{Math.round(priceRange * currencyRate).toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="10000"
                  step="100"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-[#00875A]"
                />
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex gap-2">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={resetAllFilters}
                  className="flex-1 py-3 rounded-full bg-[#101E17] text-[#D1FAE5] border border-[#1A3326] font-medium text-xs hover:bg-[#162A20]"
                >
                  Reset All
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMobileFiltersOpen(false)}
                  className="flex-1 py-3 rounded-full bg-[#00875A] hover:bg-[#059669] text-white font-semibold text-xs shadow-lg shadow-[#00875A]/25"
                >
                  Apply ({filteredShoes.length} Pairs)
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
