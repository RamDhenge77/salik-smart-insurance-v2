import { UserProfile } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LICENSE_CATEGORIES } from "@/utils/profileUtils";
import { Car } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DrivingLicenseFormProps {
  profile: UserProfile;
  updateDrivingLicense: (field: string, value: string) => void;
}

export const DrivingLicenseForm = ({
  profile,
  updateDrivingLicense,
}: DrivingLicenseFormProps) => {
  return (
    <Card>
      <CardHeader className="bg-uae-primary text-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <Car size={20} />
          <CardTitle className="text-lg text-white">Driving License</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="licenseNumber">License Number</Label>
            <Input
              id="licenseNumber"
              value={profile.drivingLicense.number}
              onChange={(e) => updateDrivingLicense("number", e.target.value)}
              placeholder="e.g., UAE-DL-12345678"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">License Category</Label>
            <Select
              value={profile.drivingLicense.category}
              onValueChange={(value) => updateDrivingLicense("category", value)}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {LICENSE_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="issueDate">Issue Date</Label>
            <Input
              id="issueDate"
              type="date"
              value={profile.drivingLicense.issueDate}
              onChange={(e) => updateDrivingLicense("issueDate", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input
              id="expiryDate"
              type="date"
              value={profile.drivingLicense.expiryDate}
              onChange={(e) => updateDrivingLicense("expiryDate", e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button
            variant="primary"
            type="button"
            className=""
          >
            Save License Information
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};