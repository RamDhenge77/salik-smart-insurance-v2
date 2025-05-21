import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Layout from "@/components/Layout";
import StepIndicator from "./StepIndicator";
import { useFinance } from "@/context/FinanceContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { CarFront, Search } from "lucide-react";
import { useCarContext } from "@/context/Context";

interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  image: string;
}

const CarSelection = () => {
  const navigate = useNavigate();
  const { applicationData, setCarInfo, calculateEMI } = useFinance();
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [loading, setLoading] = useState(true);
  const { handleCarFinancingNext, setCarFinanceSteps } = useCarContext();

  // Dummy car data - in a real app, this would come from an API
  useEffect(() => {
    if (!applicationData.personalInfo) {
      // navigate("/apply");
      setCarFinanceSteps(2);
      return;
    }

    // Simulate loading car data from API
    setTimeout(() => {
      const carData: Car[] = [
        {
          id: 1,
          brand: "Toyota",
          model: "Camry",
          year: 2023,
          price: 110000,
          image: "/lovable-uploads/Toyota-Camry.jpg",
        },
        {
          id: 2,
          brand: "Honda",
          model: "Accord",
          year: 2023,
          price: 120000,
          image: "/lovable-uploads/Honda-Accord.webp",
        },
        {
          id: 3,
          brand: "Nissan",
          model: "Altima",
          year: 2023,
          price: 95000,
          image:
            "/lovable-uploads/Mercedes-Benz-C-Class.jpg",
        },
        {
          id: 4,
          brand: "BMW",
          model: "3 Series",
          year: 2023,
          price: 220000,
          image: "/lovable-uploads/BMW-X5.jpg",
        },
        {
          id: 5,
          brand: "Mercedes",
          model: "C-Class",
          year: 2023,
          price: 240000,
          image:
            "/lovable-uploads/Mercedes-Benz-C-Class.jpg",
        },
        {
          id: 6,
          brand: "Audi",
          model: "A4",
          year: 2023,
          price: 210000,
          image: "/lovable-uploads/Audi-A4.jpg",
        },
        {
          id: 7,
          brand: "Lexus",
          model: "ES",
          year: 2023,
          price: 195000,
          image: "/lovable-uploads/lexus-2.webp",
        },
        {
          id: 8,
          brand: "Chevrolet",
          model: "Malibu",
          year: 2023,
          price: 85000,
          image:
            "/lovable-uploads/Honda-Accord.webp",
        },
        {
          id: 9,
          brand: "Hyundai",
          model: "Sonata",
          year: 2023,
          price: 80000,
          image:
            "/lovable-uploads/Toyota-Camry.jpg",
        },
      ];
      setCars(carData);
      setFilteredCars(carData);
      setLoading(false);
    }, 1000);
  }, [applicationData.personalInfo, navigate]);

  useEffect(() => {
    // Apply filters when any filter changes
    let filtered = [...cars];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (car) =>
          car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.model.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by brand
    if (selectedBrand) {
      filtered = filtered.filter((car) => car.brand === selectedBrand);
    }

    // Filter by price range
    filtered = filtered.filter(
      (car) => car.price >= priceRange[0] && car.price <= priceRange[1]
    );

    setFilteredCars(filtered);
  }, [searchTerm, selectedBrand, priceRange, cars]);

  useEffect(() => {
    if (selectedBrand === "allBrands") {
      setSelectedBrand("");
    }
  }, [selectedBrand]);

  const getUniqueBrands = () => {
    const brands = cars.map((car) => car.brand);
    return [...new Set(brands)];
  };

  const handleSelectCar = (car: Car) => {
    setCarInfo({
      brand: car.brand,
      model: car.model,
      year: car.year,
      price: car.price,
    });
    // navigate("/plan-summary");
    handleCarFinancingNext();
  };

  const calculateMonthlyEMI = (carPrice: number) => {
    // Assume 20% down payment, 5% profit rate, 60 months term
    const downPayment = carPrice * 0.2;
    const financeAmount = carPrice - downPayment;
    return calculateEMI(financeAmount, 5, 60);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-AE", {
      style: "currency",
      currency: "AED",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const steps = [
    "Personal Details",
    "Eligibility",
    "Select Car",
    "Plan",
    "Documents",
    "Payment",
  ];

  return (
    // <Layout>
    <>
      <div className="bg-finance-sand min-h-screen py-8">
        <div className="container mx-auto px-4">
          <StepIndicator currentStep={2} steps={steps} />

          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-finance-purple text-center mb-8">
              Select Your Dream Car
            </h1>

            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by brand or model"
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Brand filter */}
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="allBrands">All Brands</SelectItem>
                    {getUniqueBrands().map((brand, index) => (
                      <SelectItem key={index} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Price range */}
                <div>
                  <p className="text-sm mb-2">
                    Price Range: {formatPrice(priceRange[0])} -{" "}
                    {formatPrice(priceRange[1])}
                  </p>
                  <Slider
                    defaultValue={[0, 500000]}
                    max={500000}
                    step={10000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                </div>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-10">
                <p className="text-lg text-gray-600">Loading cars...</p>
              </div>
            ) : filteredCars.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-lg shadow-lg">
                <CarFront className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  No cars found
                </h3>
                <p className="mt-2 text-gray-500">
                  Try adjusting your filters to find more options.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
                  <Card key={car.id} className="overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={car.image}
                        alt={`${car.brand} ${car.model}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>
                        {car.brand} {car.model}
                      </CardTitle>
                      <CardDescription>{car.year}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <p className="text-lg font-semibold text-finance-purple">
                          {formatPrice(car.price)}
                        </p>
                      </div>
                      <div className="bg-finance-sand p-3 rounded-md">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Monthly EMI (est.):</span>
                          <span className="font-semibold">
                            {formatPrice(calculateMonthlyEMI(car.price))}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Down Payment (20%):</span>
                          <span className="font-semibold">
                            {formatPrice(car.price * 0.2)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="primary"
                        className="w-full"
                        onClick={() => handleSelectCar(car)}
                      >
                        Select This Car
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CarSelection;
