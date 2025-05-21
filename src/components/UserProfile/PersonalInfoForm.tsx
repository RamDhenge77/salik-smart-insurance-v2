import { UserProfile, Gender } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

interface PersonalInfoFormProps {
  profile: UserProfile;
  updateProfile: (data: Partial<UserProfile>) => void;
}

export const PersonalInfoForm = ({
  profile,
  updateProfile,
}: PersonalInfoFormProps) => {
  const handleGenderChange = (value: Gender) => {
    updateProfile({ gender: value });
  };

  return (
    <Card>
      <CardHeader className="bg-uae-primary text-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <User size={20} />
          <CardTitle className="text-lg text-white">Personal Information</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={profile.fullName}
              onChange={(e) => updateProfile({ fullName: e.target.value })}
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={profile.dateOfBirth}
              onChange={(e) => updateProfile({ dateOfBirth: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => updateProfile({ email: e.target.value })}
              placeholder="your.email@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              id="mobile"
              value={profile.mobile}
              onChange={(e) => updateProfile({ mobile: e.target.value })}
              placeholder="971 50 123 4567"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select
              value={profile.gender}
              onValueChange={handleGenderChange}
            >
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="emiratesId">Emirates ID</Label>
            <Input
              id="emiratesId"
              value={profile.emiratesId}
              onChange={(e) => updateProfile({ emiratesId: e.target.value })}
              placeholder="784-YYYY-1234567-8"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emiratesIdExpiry">Emirates ID Expiry Date</Label>
            <Input
              id="emiratesIdExpiry"
              type="date"
              value={profile.emiratesIdExpiry}
              onChange={(e) => updateProfile({ emiratesIdExpiry: e.target.value })}
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button
            variant="primary"
            type="button"
            className=""
            onClick={() => console.log("Personal info saved")}
          >
            Save Personal Information
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};