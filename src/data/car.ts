export const filterOptions = {
    makes: ["Audi", "BMW", "Honda", "Mercedes-Benz", "Tesla", "Toyota"],
    models: {
      Honda: ["City", "Accord", "Civic", "CR-V"],
      Toyota: ["Corolla", "Camry", "Land Cruiser", "RAV4"],
      BMW: ["3 Series", "5 Series", "X3", "X5", "X7"],
      Nissan: ["Patrol", "Altima", "X-Trail", "Pathfinder"],
      "Mercedes-Benz": ["C-Class", "E-Class", "GLC", "GLE", "S-Class"],
      Lexus: ["ES", "GX460", "RX", "LX", "IS"],
    },
    trims: {
      City: ["LX", "EX", "DX"],
      Corolla: ["LE", "XLE", "SE"],
      X5: ["xDrive40i", "M50i", "xDrive45e"],
      Patrol: ["XE", "SE", "LE", "Platinum"],
      "C-Class": ["C200", "C300", "AMG C43"],
      GX460: ["Premium", "Platinum", "Sport", "Luxury"],
    },
    years: Array.from({ length: 11 }, (_, i) => 2015 + i),
    priceRanges: [
      { min: 0, max: 50000 },
      { min: 50001, max: 100000 },
      { min: 100001, max: 200000 },
      { min: 200001, max: 500000 },
    ],
    kilometerRanges: [
      { min: 0, max: 20000 },
      { min: 20001, max: 60000 },
      { min: 60001, max: 100000 },
      { min: 100001, max: 150000 },
    ],
    sellerTypes: ["direct", "dealer", "auction"],
    colors: ["Black", "White", "Silver", "Gray", "Red", "Blue", "White Pearl", "Nebula Gray"],
  };
  
export interface carLeasingData {
  id: string;
  brand: string;
  model: string;
  type: 'economy' | 'sedan' | 'suv' | 'luxury';
  year: number;
  image: string;
  monthlyPrice: number;
  features: string[];
  engineSize: string;
  transmission: 'Auto' | 'Manual';
  seats: number;
}

export const carLeasingData: carLeasingData[] = [
  {
    id: '1',
    brand: 'Mitsubishi',
    model: 'Mirage',
    type: 'economy',
    year: 2022,
    image: '/cars/Mitsubishi-Mirage.webp',
    monthlyPrice: 1100,
    features: ['Cruise Control', 'Bluetooth', 'USB Connection', 'Parking Sensors'],
    engineSize: '1.4L',
    transmission: 'Auto',
    seats: 5
  },
  {
    id: '2',
    brand: 'Renault',
    model: 'Symbol',
    type: 'sedan',
    year: 2020,
    image: '/cars/Renault-Symbol.jpg',
    monthlyPrice: 1300,
    features: ['Cruise Control', '360 Surround Camera', 'Memory Front Seats', 'Parking Assist'],
    engineSize: '1.7L',
    transmission: 'Auto',
    seats: 5
  },
  {
    id: '3',
    brand: 'Toyota',
    model: 'Corolla',
    type: 'sedan',
    year: 2021,
    image: '/cars/Toyota-Corolla.jpg',
    monthlyPrice: 1600,
    features: ['Cruise Control', 'Lane Assist', 'Blind Spot Detection', 'Android Auto/Apple CarPlay'],
    engineSize: '1.8L',
    transmission: 'Auto',
    seats: 5
  },
  {
    id: '4',
    brand: 'Nissan',
    model: 'Qashqai',
    type: 'suv',
    year: 2021,
    image: '/cars/Nissan-Qashqai.webp',
    monthlyPrice: 1800,
    features: ['360° Camera', 'Navigation System', 'Panoramic Sunroof', 'Wireless Charging'],
    engineSize: '2.0L',
    transmission: 'Auto',
    seats: 5
  },
  {
    id: '5',
    brand: 'BMW',
    model: '3 Series',
    type: 'luxury',
    year: 2022,
    image: '/cars/BMW-3.webp',
    monthlyPrice: 3500,
    features: ['Leather Seats', 'Premium Sound', 'Navigation', 'Driver Assist Package'],
    engineSize: '2.0L',
    transmission: 'Auto',
    seats: 5
  },
  {
    id: '6',
    brand: 'Audi',
    model: 'A6',
    type: 'luxury',
    year: 2022,
    image: '/cars/Audi-A6.jpg',
    monthlyPrice: 4200,
    features: ['Premium Sound System', 'Leather Interior', 'Heads-up Display', 'Virtual Cockpit'],
    engineSize: '2.5L',
    transmission: 'Auto',
    seats: 5
  },
  {
    id: '7',
    brand: 'Kia',
    model: 'Sportage',
    type: 'suv',
    year: 2021,
    image: '/cars/Kia-Sportage.jpg',
    monthlyPrice: 1700,
    features: ['Reverse Camera', 'Blind Spot Monitoring', 'LED Headlights', 'Push Button Start'],
    engineSize: '2.0L',
    transmission: 'Auto',
    seats: 5
  },
  {
    id: '8',
    brand: 'Chevrolet',
    model: 'Spark',
    type: 'economy',
    year: 2021,
    image: '/cars/Chevrolet-Spark.jpg',
    monthlyPrice: 950,
    features: ['Bluetooth', 'USB Connection', 'Air Conditioning', 'Power Windows'],
    engineSize: '1.2L',
    transmission: 'Manual',
    seats: 4
  }
];
