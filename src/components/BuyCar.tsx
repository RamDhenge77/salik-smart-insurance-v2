import React, { useEffect, useState } from "react";
import CarFilters from "./car/CarFilters";
import CarListing from "./car/CarListing";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CarPurchaseModal } from "./car/CarPurchaseModal";
import { FilterOptions } from "@/types/car";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowUpDown,
  CarFront,
  Filter,
  Store,
  User,
  Users,
} from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SellCar from "./SellCar";

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  location: string;
  seller: string;
  image: string;
}

export interface FilterState {
  make: string[];
  minYear: number;
  maxYear: number;
  minPrice: number;
  maxPrice: number;
  fuelType: string[];
  transmission: string[];
  seller: string[];
}

const BuyCar = ({ uploadKey }) => {
  const [cars, setCars] = useState<Car[]>(sampleCars);
  const [filteredCars, setFilteredCars] = useState<Car[]>(sampleCars);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<string>("default");
  const [selectedSellerType, setSelectedSellerType] = useState<string | null>(
    null
  );

  const handleSellerTypeChange = (type: string) => {
    setSelectedSellerType(type);
  };

  const handleSortChange = (value: string) => {
    setSortOrder(value);
  };

  // Default filter state
  const [filters, setFilters] = useState<FilterState>({
    make: [],
    minYear: 2010,
    maxYear: 2025,
    minPrice: 0,
    maxPrice: 200000,
    fuelType: [],
    transmission: [],
    seller: [],
  });

  const onClearFilters = () => {
    setFilters({
      make: [],
      minYear: 2010,
      maxYear: 2025,
      minPrice: 0,
      maxPrice: 200000,
      fuelType: [],
      transmission: [],
      seller: [],
    });
    setFilteredCars(cars);
  };

  // Apply filters to cars
  const applyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    const filtered = cars.filter((car) => {
      // Filter by make
      if (newFilters.make.length > 0 && !newFilters.make.includes(car.make)) {
        return false;
      }

      // Filter by year range
      if (car.year < newFilters.minYear || car.year > newFilters.maxYear) {
        return false;
      }

      // Filter by price range
      if (car.price < newFilters.minPrice || car.price > newFilters.maxPrice) {
        return false;
      }

      // Filter by fuel type
      if (
        newFilters.fuelType.length > 0 &&
        !newFilters.fuelType.includes(car.fuelType)
      ) {
        return false;
      }

      // Filter by transmission
      if (
        newFilters.transmission.length > 0 &&
        !newFilters.transmission.includes(car.transmission)
      ) {
        return false;
      }

      // Filter by seller
      if (
        newFilters.seller.length > 0 &&
        !newFilters.seller.includes(car.seller)
      ) {
        return false;
      }

      return true;
    });

    setFilteredCars(filtered);
  };

  const handleOpenPurchaseModal = (car: Car) => {
    setSelectedCar(car);
    setIsPurchaseModalOpen(true);
  };

  const handleClosePurchaseModal = () => {
    setIsPurchaseModalOpen(false);
    setSelectedCar(null);
  };

  // *******************************

  const initialFilters: Partial<FilterOptions> = {
    // make: ["Lexus"],
    // model: ["GX460"],
    // trim: [],
    // minPrice: 0,
    // maxPrice: 500000,
    // minKilometers: 0,
    // maxKilometers: 150000,
    // sellerType: [],
    make: [],
    minYear: 2010,
    maxYear: 2025,
    minPrice: 0,
    maxPrice: 200000,
    fuelType: [],
    transmission: [],
    seller: [],
  };

  useEffect(() => {
    handleFilterChange(initialFilters);
  }, []);

  const [activeFilters, setActiveFilters] =
    useState<Partial<FilterOptions>>(initialFilters);
  const handleFilterChange = (filters: Partial<FilterOptions>) => {
    setActiveFilters(filters);
    let result = [...cars];

    // Filter by make
    if (filters.make && filters.make.length > 0) {
      result = result.filter((car) => filters.make?.includes(car.make));
    }

    // Filter by model
    if (filters.model && filters.model.length > 0) {
      result = result.filter((car) => filters.model?.includes(car.model));
    }

    // Filter by trim
    if (filters.trim && filters.trim.length > 0) {
      result = result.filter((car) => filters.trim?.includes(car.trim));
    }

    // Filter by price range
    if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
      result = result.filter(
        (car) =>
          car.price >= filters.minPrice! && car.price <= filters.maxPrice!
      );
    }

    // Filter by kilometers range
    if (
      filters.minKilometers !== undefined &&
      filters.maxKilometers !== undefined
    ) {
      result = result.filter(
        (car) =>
          car.kilometers >= filters.minKilometers! &&
          car.kilometers <= filters.maxKilometers!
      );
    }

    // Filter by seller type
    if (filters.sellerType && filters.sellerType.length > 0) {
      result = result.filter((car) =>
        filters.sellerType?.includes(car.sellerType)
      );
    }

    // setFilteredCars(result);
  };

  return (
    <Tabs defaultValue="buycar">
      <div className="flex items-center justify-center">
        <TabsList className="mb-6 gap-4">
          <TabsTrigger
            value="buycar"
            className="text-center data-[state=active]:bg-white data-[state=active]:text-gray-700 border-r border-gray-200 hover:bg-gray-100 transition-colors font-medium"
          >
            <CarFront className="h-4 w-4 mr-2" />
            Buy Car
          </TabsTrigger>
          <TabsTrigger
            value="sellcar"
            className="text-center data-[state=active]:bg-white data-[state=active]:text-gray-700 border-r border-gray-200 hover:bg-gray-100 transition-colors font-medium"
          >
            <CarFront className="h-4 w-4 mr-2" />
            Sell Car
          </TabsTrigger>
        </TabsList>
      </div>

      <div className="space-y-6">
        <TabsContent value="buycar">
          <Card className="border !border-[#6cd0f585]">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-[#2596be]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                  <h1 className="text-3xl font-bold mb-2 sm:mb-0 text-[#2596be]">
                    Find Your Perfect Car
                  </h1>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      className="mr-2 hidden md:flex border-[#6cd0f585] text-[#2596be] hover:bg-[#6cd0f585] hover:text-[#2596be]"
                      // onClick={() => setShowSellerFilter(!showSellerFilter)}
                    >
                      <Filter size={16} className="mr-2" /> Seller Type
                    </Button>
                    <div className="flex items-center">
                      <Select
                        value={sortOrder}
                        onValueChange={handleSortChange}
                      >
                        <SelectTrigger className="w-[160px] border-[#6cd0f585] font-normal text-black">
                          <ArrowUpDown
                            size={16}
                            className="mr-2 text-[#2596be]"
                          />
                          <SelectValue placeholder="Sort" />
                        </SelectTrigger>
                        <SelectContent align="end">
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="price-asc">
                            Price: Low to High
                          </SelectItem>
                          <SelectItem value="price-desc">
                            Price: High to Low
                          </SelectItem>
                          <SelectItem value="year-desc">
                            Newest First
                          </SelectItem>
                          <SelectItem value="km-asc">Lowest Mileage</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <Card className="p-4 mb-4 border !border-[#6cd0f585] shadow-sm">
                  <RadioGroup
                    value={selectedSellerType || "all"}
                    onValueChange={handleSellerTypeChange}
                    className="flex space-x-4 flex-wrap"
                  >
                    <div className="flex items-center space-x-2 bg-white border rounded-md px-3 py-2 hover:bg-[#6cd0f585] transition-colors">
                      <RadioGroupItem
                        value="all"
                        id="all"
                        className="text-[#2596be] border-[#2596be]"
                      />
                      <Label
                        htmlFor="all"
                        className="cursor-pointer flex items-center"
                      >
                        <Users className="w-5 h-5 mr-2 text-slate-600" />
                        All Sellers
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 bg-white border rounded-md px-3 py-2 hover:bg-[#6cd0f585] transition-colors">
                      <RadioGroupItem
                        value="direct"
                        id="direct"
                        className="text-[#2596be] border-[#2596be]"
                      />
                      <Label
                        htmlFor="direct"
                        className="cursor-pointer flex items-center"
                      >
                        <User className="w-5 h-5 mr-2 text-slate-600" />
                        Direct from Owner
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 bg-white border rounded-md px-3 py-2 hover:bg-[#6cd0f585] transition-colors">
                      <RadioGroupItem
                        value="dealer"
                        id="dealer"
                        className="text-[#2596be] border-[#2596be]"
                      />
                      <Label
                        htmlFor="dealer"
                        className="cursor-pointer flex items-center"
                      >
                        <Store className="w-5 h-5 mr-2 text-slate-600" />
                        Dealer
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md px-3 py-2 hover:bg-[#6cd0f585] transition-colors bg-[#2595be31] from-pastel-peach to-[#6cd0f585]">
                      <RadioGroupItem
                        value="auction"
                        id="auction"
                        className="text-[#2596be] border-[#2596be]"
                      />
                      <Label
                        htmlFor="auction"
                        className="cursor-pointer flex items-center"
                      >
                        <Store className="w-5 h-5 mr-2 text-[#2596be]" />
                        Salik Auction
                      </Label>
                    </div>
                  </RadioGroup>
                </Card>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CarFilters
                onFilterChange={handleFilterChange}
                onClearFilters={onClearFilters}
                initialFilters={initialFilters}
                activeFilters={activeFilters}
              />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCars.map((car) => (
              <CarListing
                key={car.id}
                car={car}
                onPurchaseClick={handleOpenPurchaseModal}
              />
            ))}
            {filteredCars.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">
                  No cars match your filter criteria.
                </p>
              </div>
            )}
          </div>

          <CarPurchaseModal
            car={selectedCar}
            isOpen={isPurchaseModalOpen}
            onClose={handleClosePurchaseModal}
          />
        </TabsContent>
        <TabsContent value="sellcar" className="mt-6">
          <SellCar key={`sellcar-${uploadKey}`} />
        </TabsContent>
      </div>
    </Tabs>
  );
};

// Sample car data with real car images
const sampleCars: Car[] = [
  {
    id: "1",
    make: "Toyota",
    model: "Camry",
    year: 2020,
    price: 25000,
    mileage: 15000,
    fuelType: "Gasoline",
    transmission: "Automatic",
    location: "Dubai",
    seller: "Dealer",
    image: "/lovable-uploads/Toyota-Camry.jpg",
  },
  {
    id: "2",
    make: "Honda",
    model: "Accord",
    year: 2019,
    price: 23000,
    mileage: 20000,
    fuelType: "Gasoline",
    transmission: "Automatic",
    location: "Abu Dhabi",
    seller: "Private",
    image: "/lovable-uploads/Honda-Accord.webp",
  },
  {
    id: "3",
    make: "BMW",
    model: "X5",
    year: 2021,
    price: 60000,
    mileage: 8000,
    fuelType: "Diesel",
    transmission: "Automatic",
    location: "Dubai",
    seller: "Dealer",
    image: "/lovable-uploads/BMW-X5.jpg",
  },
  {
    id: "4",
    make: "Mercedes-Benz",
    model: "C-Class",
    year: 2020,
    price: 45000,
    mileage: 12000,
    fuelType: "Gasoline",
    transmission: "Automatic",
    location: "Sharjah",
    seller: "Dealer",
    image: "/lovable-uploads/Mercedes-Benz-C-Class.jpg",
  },
  {
    id: "5",
    make: "Tesla",
    model: "Model 3",
    year: 2022,
    price: 55000,
    mileage: 5000,
    fuelType: "Electric",
    transmission: "Automatic",
    location: "Dubai",
    seller: "Dealer",
    image: "/lovable-uploads/Tesla-Model-3.webp",
  },
  {
    id: "6",
    make: "Audi",
    model: "A4",
    year: 2020,
    price: 38000,
    mileage: 18000,
    fuelType: "Gasoline",
    transmission: "Automatic",
    location: "Abu Dhabi",
    seller: "Private",
    image: "/lovable-uploads/Audi-A4.jpg",
  },
];

export default BuyCar;
