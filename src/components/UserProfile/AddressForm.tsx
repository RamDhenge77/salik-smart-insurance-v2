import { UserProfile } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UAE_EMIRATES } from "@/utils/profileUtils";
import { MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface AddressFormProps {
  profile: UserProfile;
  updateAddress: (field: string, value: string) => void;
}

export const AddressForm = ({ profile, updateAddress }: AddressFormProps) => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Address Updated",
        description: "Your address information has been saved successfully.",
      });
    }, 1000);
  };

  return (
    <Card className="shadow-lg border-salik-primary/10">
      <CardHeader className="bg-uae-primary text-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <MapPin size={20} />
          <CardTitle className="text-lg text-white">Address Information</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="emirate">Emirate</Label>
            <Select
              value={profile.address.emirate}
              onValueChange={(value) => updateAddress("emirate", value)}
            >
              <SelectTrigger id="emirate" className="bg-white border-gray-300">
                <SelectValue placeholder="Select emirate" />
              </SelectTrigger>
              <SelectContent>
                {UAE_EMIRATES.map((emirate) => (
                  <SelectItem key={emirate} value={emirate}>
                    {emirate}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="area">Area</Label>
            <Input
              id="area"
              value={profile.address.area}
              onChange={(e) => updateAddress("area", e.target.value)}
              placeholder="e.g., Al Barsha, Jumeirah"
              className="bg-white border-gray-300"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              value={profile.address.street}
              onChange={(e) => updateAddress("street", e.target.value)}
              placeholder="Building name, street name"
              className="bg-white border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="poBox">P.O. Box</Label>
            <Input
              id="poBox"
              value={profile.address.poBox}
              onChange={(e) => updateAddress("poBox", e.target.value)}
              placeholder="e.g., 12345"
              className="bg-white border-gray-300"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button
            variant="primary"
            type="button"
            className=""
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving && (
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            Save Address
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
