
import { getModelsByBrand } from '../../data/services';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface CarModelSelectorProps {
  brandId: string | null;
  selectedModel: string | null;
  selectedYear: number | null;
  onSelectModel: (modelId: string) => void;
  onSelectYear: (year: number) => void;
}

const CarModelSelector: React.FC<CarModelSelectorProps> = ({
  brandId,
  selectedModel,
  selectedYear,
  onSelectModel,
  onSelectYear,
}) => {
  if (!brandId) return null;
  
  const availableModels = getModelsByBrand(brandId);
  
  // Find the selected model details
  const modelDetails = availableModels.find(model => model.id === selectedModel);
  const availableYears = modelDetails?.years || [];
  
  return (
    <div className="w-full max-w-md mx-auto mt-6 grid gap-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Select Your Car Model</h3>
        <Select
          value={selectedModel || ''}
          onValueChange={onSelectModel}
        >
          <SelectTrigger className="w-full bg-white border-gray-300 focus:ring-[#6cd0f585] h-12">
            <SelectValue placeholder="Select model" className="truncate" />
          </SelectTrigger>
          <SelectContent className="max-h-80">
            {availableModels.map((model) => (
              <SelectItem key={model.id} value={model.id} className="cursor-pointer data-[state=checked]:bg-[#6cd0f585] data-[state=unchecked]:hover:bg-[#6cd0f585]">
                <span className="truncate block">{model.name}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {selectedModel && (
        <div>
          <h3 className="text-lg font-medium mb-3">Select Model Year</h3>
          <Select
            value={selectedYear?.toString() || ''}
            onValueChange={(value) => onSelectYear(Number(value))}
          >
            <SelectTrigger className="w-full bg-white border-gray-300 focus:ring-[#6cd0f585] h-12">
              <SelectValue placeholder="Select year" className="truncate" />
            </SelectTrigger>
            <SelectContent className="max-h-80">
              {availableYears.map((year) => (
                <SelectItem key={year} value={year.toString()} className="cursor-pointer data-[state=checked]:bg-[#6cd0f585] data-[state=unchecked]:hover:bg-[#6cd0f585]">
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default CarModelSelector;
