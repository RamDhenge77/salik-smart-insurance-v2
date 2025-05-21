export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
}

export interface CarBrand {
  id: string;
  name: string;
  logo: string;
}

export interface CarModel {
  id: string;
  brandId: string;
  name: string;
  years: number[];
}

export interface ServiceOption {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  subCategory?: string;
}

export const serviceCategories: ServiceCategory[] = [
  { id: 'car-wash', name: 'Car Wash', icon: '🚗' },
  { id: 'car-service', name: 'Car Service', icon: '🔧' },
  { id: '3m-detailing', name: '3M Detailing', icon: '✨' },
  { id: 'emergency-services', name: 'Emergency Services', icon: '🚨' },
  { id: 'body-paint', name: 'Body Paint', icon: '🎨' },
  { id: 'window-tinting', name: 'Window Tinting', icon: '🪟' },
  { id: 'doorstep-mechanic', name: 'Doorstep Mechanic', icon: '🚚' },
  { id: 'battery', name: 'Battery', icon: '🔋' },
  { id: 'car-repair', name: 'Car Repair', icon: '🔨' },
  { id: 'brake-pad', name: 'Brake Pad', icon: '🛑' },
  { id: 'summer-check', name: 'Summer Check', icon: '☀️' },
];

export const carBrands: CarBrand[] = [
  { id: 'audi', name: 'Audi', logo: '/cars/audi.png' },
  { id: 'bmw', name: 'BMW', logo: '/cars/bmw.png' },
  { id: 'ford', name: 'Ford', logo: '/cars/ford.png' },
  { id: 'honda', name: 'Honda', logo: '/cars/honda.png' },
  { id: 'hyundai', name: 'Hyundai', logo: '/cars/hyundai.png' },
  { id: 'lexus', name: 'Lexus', logo: '/cars/lexus.png' },
  { id: 'mercedes', name: 'Mercedes', logo: '/cars/mercedes.png' },
  { id: 'nissan', name: 'Nissan', logo: '/cars/nissan.png' },
  { id: 'toyota', name: 'Toyota', logo: '/cars/toyota.png' },
];

export const carModels: CarModel[] = [
  // Audi
  { id: 'a3', brandId: 'audi', name: 'A3', years: [2018, 2019, 2020, 2021, 2022, 2023] },
  { id: 'a4', brandId: 'audi', name: 'A4', years: [2018, 2019, 2020, 2021, 2022, 2023] },
  { id: 'q5', brandId: 'audi', name: 'Q5', years: [2018, 2019, 2020, 2021, 2022, 2023] },
  
  // BMW
  { id: '3-series', brandId: 'bmw', name: '3 Series', years: [2018, 2019, 2020, 2021, 2022, 2023] },
  { id: '5-series', brandId: 'bmw', name: '5 Series', years: [2018, 2019, 2020, 2021, 2022, 2023] },
  { id: 'x3', brandId: 'bmw', name: 'X3', years: [2018, 2019, 2020, 2021, 2022, 2023] },
  
  // Ford
  { id: 'focus', brandId: 'ford', name: 'Focus', years: [2018, 2019, 2020, 2021, 2022, 2023] },
  { id: 'mustang', brandId: 'ford', name: 'Mustang', years: [2018, 2019, 2020, 2021, 2022, 2023] },
  { id: 'explorer', brandId: 'ford', name: 'Explorer', years: [2018, 2019, 2020, 2021, 2022, 2023] },
  
  // Honda
  { id: 'civic', brandId: 'honda', name: 'Civic', years: [2018, 2019, 2020, 2021, 2022, 2023] },
  { id: 'accord', brandId: 'honda', name: 'Accord', years: [2018, 2019, 2020, 2021, 2022, 2023] },
  { id: 'cr-v', brandId: 'honda', name: 'CR-V', years: [2018, 2019, 2020, 2021, 2022, 2023] },
  
  // Add more models for other brands
  { id: 'elantra', brandId: 'hyundai', name: 'Elantra', years: [2018, 2019, 2020, 2021, 2022, 2023] },
  { id: 'sonata', brandId: 'hyundai', name: 'Sonata', years: [2018, 2019, 2020, 2021, 2022, 2023] },
  
  { id: 'is', brandId: 'lexus', name: 'IS', years: [2018, 2019, 2020, 2021, 2022, 2023] },
  { id: 'rx', brandId: 'lexus', name: 'RX', years: [2018, 2019, 2020, 2021, 2022, 2023] },
  
  { id: 'c-class', brandId: 'mercedes', name: 'C-Class', years: [2018, 2019, 2020, 2021, 2022, 2023] },
  { id: 'e-class', brandId: 'mercedes', name: 'E-Class', years: [2018, 2019, 2020, 2021, 2022, 2023] },
  
  { id: 'altima', brandId: 'nissan', name: 'Altima', years: [2018, 2019, 2020, 2021, 2022, 2023] },
  { id: 'pathfinder', brandId: 'nissan', name: 'Pathfinder', years: [2018, 2019, 2020, 2021, 2022, 2023] },
  
  { id: 'camry', brandId: 'toyota', name: 'Camry', years: [2018, 2019, 2020, 2021, 2022, 2023] },
  { id: 'rav4', brandId: 'toyota', name: 'RAV4', years: [2018, 2019, 2020, 2021, 2022, 2023] },
];

export const serviceOptions: ServiceOption[] = [
  // Car Wash Services
  {
    id: 'exterior-wash',
    categoryId: 'car-wash',
    name: 'Exterior Wash',
    description: 'New waterless & eco-friendly doorstep wash for your car\'s exterior. *Exterior wash is mandatory for all Car Wash orders.',
    price: 45,
    image: '/services/exterior-wash.jpg',
    subCategory: 'Car Wash'
  },
  {
    id: 'interior-cleaning',
    categoryId: 'car-wash',
    name: 'Interior Cleaning',
    description: 'A deep clean vacuum treatment for your car\'s interior. We also do a bonus virus & bacterial disinfection of your sensitive interior surfaces. Has to be done along with Exterior Wash.',
    price: 30,
    image: '/services/interior-cleaning.webp',
    subCategory: 'Car Wash'
  },
  {
    id: 'full-detailing',
    categoryId: 'car-wash',
    name: 'Full Detailing',
    description: 'Complete interior and exterior cleaning with premium products. Includes dashboard polishing, carpet cleaning, and leather conditioning.',
    price: 120,
    image: '/services/full-detailing.png',
    subCategory: 'Car Wash'
  },
  
  // Car Service
  {
    id: 'oil-change',
    categoryId: 'car-service',
    name: 'Oil Change',
    description: 'Complete oil and filter change using high-quality synthetic oil. Our professional technicians will ensure your engine runs smoothly.',
    price: 250,
    image: '/services/oil-change.png',
    subCategory: 'Maintenance'
  },
  {
    id: 'brake-service',
    categoryId: 'car-service',
    name: 'Brake Service',
    description: 'Comprehensive brake inspection and service including pad replacement and rotor check. Ensures optimal braking performance and safety.',
    price: 350,
    image: '/services/brake-service.jpg',
    subCategory: 'Maintenance'
  },
  {
    id: 'battery-replacement',
    categoryId: 'car-service',
    name: 'Battery Replacement',
    description: 'Complete replacement of your car battery with a new high-performance battery. Includes installation and electrical system check.',
    price: 280,
    image: '/services/battery-replacement.webp',
    subCategory: 'Electrical'
  },
  {
    id: 'ac-service',
    categoryId: 'car-service',
    name: 'AC Service',
    description: 'Comprehensive air conditioning service to ensure optimal cooling performance during hot summer months.',
    price: 320,
    image: '/services/ac-service.jpg',
    subCategory: 'Comfort'
  },
  
  // 3M Detailing
  {
    id: 'paint-protection',
    categoryId: '3m-detailing',
    name: 'Paint Protection Film',
    description: 'Premium 3M paint protection film to guard against scratches, stone chips, and environmental damage. Preserves your car\'s appearance for years.',
    price: 1200,
    image: '/services/paint-protection.jpg',
    subCategory: 'Protection'
  },
  {
    id: 'ceramic-coating',
    categoryId: '3m-detailing',
    name: 'Ceramic Coating',
    description: 'Professional application of 3M ceramic coating that provides long-lasting shine, UV protection, and hydrophobic properties.',
    price: 1500,
    image: '/services/ceramic-coating.jpg',
    subCategory: 'Protection'
  },
  {
    id: 'headlight-restoration',
    categoryId: '3m-detailing',
    name: 'Headlight Restoration',
    description: 'Professional restoration of cloudy, yellowed headlights to improve visibility and appearance. Uses 3M\'s proprietary restoration system.',
    price: 200,
    image: '/services/headlight-restoration.jpg',
    subCategory: 'Restoration'
  },
  
  // Emergency Services
  {
    id: 'roadside-assistance',
    categoryId: 'emergency-services',
    name: 'Roadside Assistance',
    description: 'Emergency roadside support for breakdowns, flat tires, or battery issues. Our team will reach you quickly to get you back on the road.',
    price: 150,
    image: '/services/roadside-assistance.jpg',
    subCategory: 'Emergency'
  },
  {
    id: 'towing-service',
    categoryId: 'emergency-services',
    name: 'Towing Service',
    description: 'Professional towing to our service center or your preferred location. Safe transportation for your vehicle during emergencies.',
    price: 300,
    image: '/services/towing-service.jpg',
    subCategory: 'Emergency'
  },
  {
    id: 'flat-tire',
    categoryId: 'emergency-services',
    name: 'Flat Tire Repair',
    description: 'Quick and efficient flat tire repair or replacement at your location. Get back on the road without the hassle.',
    price: 120,
    image: '/services/flat-tire.webp',
    subCategory: 'Emergency'
  },
  
  // Body Paint
  {
    id: 'scratch-removal',
    categoryId: 'body-paint',
    name: 'Scratch Removal',
    description: 'Professional repair and removal of surface scratches using color matching technology and high-quality paints.',
    price: 350,
    image: '/services/scratch-removal.jpg',
    subCategory: 'Repair'
  },
  {
    id: 'full-repaint',
    categoryId: 'body-paint',
    name: 'Full Repaint',
    description: 'Complete vehicle repainting with premium automotive paint. Includes preparation, painting, and finishing for a factory-like result.',
    price: 5000,
    image: '/services/full-repaint.jpeg',
    subCategory: 'Paint'
  },
  {
    id: 'dent-removal',
    categoryId: 'body-paint',
    name: 'Dent Removal',
    description: 'Professional dent repair and removal without damaging your vehicle\'s paint. Restore your car\'s appearance quickly.',
    price: 450,
    image: '/services/dent-removal.jpg',
    subCategory: 'Repair'
  },
  
  // Window Tinting
  {
    id: 'standard-tint',
    categoryId: 'window-tinting',
    name: 'Standard Tint',
    description: 'High-quality window tinting that blocks UV rays and reduces heat. Improves privacy and interior comfort.',
    price: 400,
    image: '/services/standard-tint.webp',
    subCategory: 'Tinting'
  },
  {
    id: 'premium-tint',
    categoryId: 'window-tinting',
    name: 'Ceramic Tint',
    description: 'Premium ceramic window tinting with superior heat rejection, clarity, and UV protection. Lifetime warranty included.',
    price: 600,
    image: '/services/premium-tint.jpg',
    subCategory: 'Tinting'
  },
  {
    id: 'security-tint',
    categoryId: 'window-tinting',
    name: 'Security Tint',
    description: 'Advanced security window film that holds glass together when broken, providing additional protection against break-ins.',
    price: 700,
    image: '/services/security-tint.jpg',
    subCategory: 'Tinting'
  },
  
  // New categories
  // Doorstep Mechanic
  {
    id: 'basic-service',
    categoryId: 'doorstep-mechanic',
    name: 'Basic Service',
    description: 'Comprehensive basic service at your doorstep including oil change, filter replacement, and inspection of essential components.',
    price: 350,
    image: '/services/doorstep-mechanic.jpg',
    subCategory: 'Maintenance'
  },
  {
    id: 'major-service',
    categoryId: 'doorstep-mechanic',
    name: 'Major Service',
    description: 'Complete major service package with detailed inspection and replacement of worn parts, all performed at your location.',
    price: 650,
    image: '/services/doorstep-major.png',
    subCategory: 'Maintenance'
  },
  
  // Battery
  {
    id: 'battery-test',
    categoryId: 'battery',
    name: 'Battery Test',
    description: 'Professional battery diagnostic test to check your battery\'s health and performance. Includes charging system evaluation.',
    price: 80,
    image: '/services/battery-test.jpg',
    subCategory: 'Electrical'
  },
  {
    id: 'premium-battery',
    categoryId: 'battery',
    name: 'Premium Battery Replacement',
    description: 'Installation of a high-quality premium battery with extended warranty. Includes disposal of your old battery.',
    price: 450,
    image: '/services/premium-battery.jpeg',
    subCategory: 'Electrical'
  },
  
  // Car Repair
  {
    id: 'suspension-repair',
    categoryId: 'car-repair',
    name: 'Suspension Repair',
    description: 'Complete diagnosis and repair of suspension components to restore ride comfort and handling.',
    price: 800,
    image: '/services/suspension-repair.jpg',
    subCategory: 'Repair'
  },
  {
    id: 'engine-diagnostics',
    categoryId: 'car-repair',
    name: 'Engine Diagnostics',
    description: 'Comprehensive engine diagnostics using advanced tools to identify and resolve performance issues.',
    price: 250,
    image: '/services/engine-diagnostics.webp',
    subCategory: 'Repair'
  },
  
  // Brake Pad
  {
    id: 'front-brake-pads',
    categoryId: 'brake-pad',
    name: 'Front Brake Pads Replacement',
    description: 'Replacement of front brake pads and inspection of rotors for optimal braking performance.',
    price: 320,
    image: '/services/brake-pads.jpg',
    subCategory: 'Safety'
  },
  {
    id: 'complete-brake-service',
    categoryId: 'brake-pad',
    name: 'Complete Brake Service',
    description: 'Comprehensive brake service including pad replacement, rotor inspection/machining, and brake fluid flush.',
    price: 650,
    image: '/services/complete-brake.jpg',
    subCategory: 'Safety'
  },
  
  // Summer Check
  {
    id: 'ac-inspection',
    categoryId: 'summer-check',
    name: 'AC System Inspection',
    description: 'Complete inspection of your AC system to ensure optimal cooling performance during hot summer months.',
    price: 200,
    image: '/services/ac-inspection.jpg',
    subCategory: 'Seasonal'
  },
  {
    id: 'cooling-system-check',
    categoryId: 'summer-check',
    name: 'Cooling System Check',
    description: 'Thorough inspection and pressure test of your vehicle\'s cooling system to prevent overheating issues.',
    price: 180,
    image: '/services/cooling-system.jpeg',
    subCategory: 'Seasonal'
  },
  {
    id: 'comprehensive-summer',
    categoryId: 'summer-check',
    name: 'Comprehensive Summer Check',
    description: 'Complete summer preparation package including AC inspection, cooling system check, tire inspection, and fluid top-ups.',
    price: 350,
    image: '/services/summer-check.jpg',
    subCategory: 'Seasonal'
  },
];

// Function to get car models by brand ID
export const getModelsByBrand = (brandId: string) => {
  return carModels.filter(model => model.brandId === brandId);
};

// Function to get service options by category ID
export const getServicesByCategory = (categoryId: string) => {
  return serviceOptions.filter(service => service.categoryId === categoryId);
};

// Function to generate placeholder image for car
export const getCarImage = (brand: string, model: string) => {
  return `/cars/${brand.toLowerCase()}-${model.toLowerCase().replace(/\s+/g, '-')}.jpg`;
};
