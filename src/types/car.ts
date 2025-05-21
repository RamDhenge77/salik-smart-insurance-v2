export interface FilterOptions {
    make: string[];
    model: string[];
    trim: string[];
    minYear: number;
    maxYear: number;
    minPrice: number;
    maxPrice: number;
    minKilometers: number;
    maxKilometers: number;
    sellerType: ("direct" | "dealer" | "auction")[];
    keyword?: string;
  }