import { useState } from "react";
import { ServiceOption, carBrands } from "../../data/services";
import { Button } from "../ui/button";
import { toast } from "../ui/sonner";
import { Car } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCarContext } from "@/context/Context";

interface ServiceDetailProps {
  service: ServiceOption;
  brandName: string;
  modelName: string;
  modelYear: number;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({
  service,
  brandName,
  modelName,
  modelYear,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  const { setCurrentStep } = useCarContext();

  const handleAddToCart = () => {
    setIsAdding(true);

    // Simulate API call delay
    setTimeout(() => {
      setIsAdding(false);

      // Store selected service in sessionStorage
      const cartItem = {
        service,
        brandName,
        modelName,
        modelYear,
      };

      sessionStorage.setItem("cartItem", JSON.stringify(cartItem));

      toast.success("Service added to cart", {
        description: `${service.name} for your ${modelYear} ${brandName} ${modelName} has been added to your cart.`,
      });

      // Navigate to location selection
      // navigate("/checkout/location");
      setCurrentStep(3);
    }, 800);
  };

  // Get the brand logo from our data
  const brandLogo =
    carBrands.find(
      (brand) => brand.name.toLowerCase() === brandName.toLowerCase()
    )?.logo || `/cars/${brandName.toLowerCase()}.png`;

  console.log("service", service);

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm h-full flex flex-col">
      <div className="aspect-video relative rounded-t-md overflow-hidden bg-gray-100">
        <img
          src={service.image}
          alt={service.name}
          className="object-cover w-full h-full"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              "https://via.placeholder.com/600x400?text=" +
              service.name.replace(/\s+/g, "+");
          }}
        />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{service.name}</h3>
          <span className="text-lg font-semibold text-salik-primary">
            AED {service.price}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-3">{service.subCategory}</p>

        <div className="bg-[#F0F8FA] p-3 rounded-md mb-3">
          <div className="flex items-center gap-2">
            <img
              src={brandLogo}
              alt={`${brandName} ${modelName}`}
              className="w-8 h-8 object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `/lovable-uploads/003a6340-092f-4859-87f7-18288f7787d4.png`;
                // Fallback to first letter if even the default image fails
                target.onerror = () => {
                  target.src = `https://via.placeholder.com/32?text=${brandName.charAt(
                    0
                  )}`;
                  target.onerror = null;
                };
              }}
            />
            <p className="text-sm text-gray-700">
              {modelYear} {brandName} {modelName}
            </p>
          </div>
        </div>

        <div className="mb-3 flex-1">
          <p className="text-sm text-gray-700 line-clamp-3">
            {service.description}
          </p>
        </div>

        <Button
          variant="primary"
          className="w-full mt-auto"
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          {isAdding ? "Adding..." : "Add to cart"}
        </Button>
      </div>
    </div>
  );
};

export default ServiceDetail;
