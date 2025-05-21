
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import { carBrands } from "../../data/services";

interface SelectedCarDisplayProps {
  brandName: string;
  modelName: string;
  modelYear: number;
  onChangeCar: () => void;
}

const SelectedCarDisplay: React.FC<SelectedCarDisplayProps> = ({
  brandName,
  modelName,
  modelYear,
  onChangeCar,
}) => {
  // Find the brand logo from our data
  const brandLogo = carBrands.find(brand => 
    brand.name.toLowerCase() === brandName.toLowerCase()
  )?.logo || `/cars/${brandName.toLowerCase()}.png`;

  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm mb-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden p-1">
          <img 
            src={brandLogo}
            alt={brandName}
            className="max-w-full max-h-full object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `/lovable-uploads/003a6340-092f-4859-87f7-18288f7787d4.png`;
              // Fallback to first letter if even the default image fails
              target.onerror = () => {
                target.src = `https://via.placeholder.com/48?text=${brandName.charAt(0)}`;
                target.onerror = null;
              };
            }}
          />
        </div>
        <div>
          <h3 className="font-medium text-lg">Your Selected Vehicle</h3>
          <p className="text-gray-600">
            {modelYear} {brandName} {modelName}
          </p>
        </div>
      </div>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onChangeCar}
        className="border-salik-primary text-salik-primary hover:border-transparent hover:bg-btn-primary"
      >
        <Edit className="mr-2 h-4 w-4" />
        Change
      </Button>
    </div>
  );
};

export default SelectedCarDisplay;
