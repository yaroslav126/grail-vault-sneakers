export type Brand = 
  | 'All Brands'
  | 'Dior'
  | 'Travis Scott'
  | 'Off-White'
  | 'Balenciaga'
  | 'Louis Vuitton'
  | 'Gucci'
  | 'Maison Margiela'
  | 'Jordan'
  | 'Nike'
  | 'New Balance'
  | 'Adidas'
  | 'Rick Owens';

export type Category = 
  | 'All Categories'
  | 'Luxury High-Fashion'
  | 'Iconic Grails'
  | 'Streetwear Dunks & Jordans'
  | 'Limited Collabs'
  | 'Design Runway';

export type Condition = 'All Conditions' | 'Deadstock (DS)' | 'Near Deadstock (VNDS)' | 'Pre-Owned Authenticated';

export interface SizeMarketData {
  ask: number;
  bid: number;
  lastSale: number;
  available: boolean;
}

export interface SaleRecord {
  date: string;
  price: number;
  size: string;
}

export interface Shoe {
  id: string;
  name: string;
  brand: string;
  category: Category;
  colorway: string;
  sku: string;
  retailPrice: number;
  lowestAsk: number;
  highestBid: number;
  lastSale: number;
  priceChange24h: number; // percentage, e.g. +12.4 or -3.5
  condition: 'Deadstock (DS)' | 'Near Deadstock (VNDS)' | 'Pre-Owned Authenticated';
  year: number;
  image: string;
  gallery: string[];
  featured: boolean;
  isGrail: boolean;
  totalVolume: string; // e.g. "$412.5K"
  description: string;
  details: {
    boxCondition: string;
    accessories: string[];
    authenticationScore: number; // e.g. 100
    verifiedWeight: string;
    provenance: string;
  };
  sizePrices: Record<string, SizeMarketData>;
  salesHistory: SaleRecord[];
}

export interface CartItem {
  id: string; // unique item id in cart (shoe.id + size)
  shoe: Shoe;
  selectedSize: string;
  price: number;
  condition: string;
  quantity: number;
}

export interface FilterState {
  search: string;
  brand: string;
  category: string;
  condition: string;
  minPrice: number;
  maxPrice: number;
  size: string;
  sortBy: 'trending' | 'price-asc' | 'price-desc' | 'highest-bid' | 'top-gainers' | 'newest';
}

export interface SellListing {
  shoeId: string;
  shoeName: string;
  brand: string;
  size: string;
  condition: string;
  askPrice: number;
  instantPayoutPrice: number;
  includesOriginalBox: boolean;
  includesExtraLaces: boolean;
  includesReceipt: boolean;
}
