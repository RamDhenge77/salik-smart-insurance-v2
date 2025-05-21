
import { useState } from "react";
import { Input } from "../ui/input";
import { Car } from "lucide-react";
import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription
} from "../ui/form";
import { useForm } from "react-hook-form";

interface VehicleDetailsFormProps {
  licensePlate: string;
  onLicensePlateChange: (licensePlate: string) => void;
}

interface FormValues {
  licensePlate: string;
}

const VehicleDetailsForm: React.FC<VehicleDetailsFormProps> = ({
  licensePlate,
  onLicensePlateChange,
}) => {
  const form = useForm<FormValues>({
    defaultValues: {
      licensePlate: licensePlate || "",
    },
  });

  const handleSubmit = (data: FormValues) => {
    onLicensePlateChange(data.licensePlate);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onLicensePlateChange(e.target.value);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Your Vehicle Number Plate</h2>
      
      <div className="space-y-6">
        <div className="mb-6">
          <label htmlFor="licensePlate" className="text-lg font-medium mb-3 block">
            Enter your license / number plate
          </label>
          
          <Input
            id="licensePlate"
            value={licensePlate}
            onChange={(e) => onLicensePlateChange(e.target.value)}
            placeholder="Enter your license / number plate"
            className="h-14 text-base"
          />
          
          <p className="text-sm text-gray-500 mt-2">
            Please enter your vehicle's license plate number exactly as it appears on your vehicle
          </p>
        </div>
      </div>
      
      {licensePlate && (
        <div className="bg-[#F0F8FA] p-4 rounded-md mt-6">
          <div className="flex items-start gap-3">
            <Car className="h-5 w-5 text-salik-primary mt-1" />
            <div>
              <h4 className="font-medium">Vehicle Number Plate</h4>
              <p className="text-gray-700">{licensePlate}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleDetailsForm;
