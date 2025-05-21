import { useState } from "react";
import { UserProfile } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AVATAR_OPTIONS } from "@/utils/profileUtils";
import { Check, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ProfileHeaderProps {
  profile: UserProfile;
  completionPercentage: number;
  updateProfile: (data: Partial<UserProfile>) => void;
  loading: boolean;
  uaePassLoading: boolean;
  showUaePassModal: boolean;
  uaePassNumber: string;
  setUaePassNumber: (value: string) => void;
  openUaePassModal: () => void;
  closeUaePassModal: () => void;
  updateProfileWithUaePass: () => Promise<void>;
}

export const ProfileHeader = ({
  profile,
  completionPercentage,
  updateProfile,
  loading,
  uaePassLoading,
  showUaePassModal,
  uaePassNumber,
  setUaePassNumber,
  openUaePassModal,
  closeUaePassModal,
  updateProfileWithUaePass,
}: ProfileHeaderProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleAvatarSelect = (avatar: string) => {
    updateProfile({ avatar });
    setDialogOpen(false);
  };

  // Format percentage as integer
  const displayPercentage = Math.round(completionPercentage);

  return (
    <div className="bg-salik-light rounded-xl shadow-md p-6 mb-8 animate-fade-in">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="relative">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <div className="relative cursor-pointer group">
                {profile.avatar ? (
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-[#2596be] overflow-hidden bg-white">
                    <img
                      src={profile.avatar}
                      alt="User Avatar"
                      className="w-full h-full object-cover transition-all duration-300 group-hover:opacity-80"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-[#95c7dc]">
                    <User size={40} className="text-gray-400" />
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 rounded-full group-hover:bg-opacity-20 transition-all duration-300">
                  <span className="text-white opacity-0 group-hover:opacity-100 font-medium">
                    Change
                  </span>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white">
              <DialogHeader>
                <DialogTitle className="text-salik-dark font-semibold">Choose Avatar</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-4 gap-4 py-4">
                {AVATAR_OPTIONS.map((avatar, index) => (
                  <div
                    key={index}
                    className="relative cursor-pointer"
                    onClick={() => handleAvatarSelect(avatar)}
                  >
                    <div className={`w-16 h-16 rounded-full overflow-hidden bg-white border-2 transition-all duration-200 flex items-center justify-center ${
                      profile.avatar === avatar ? "border-[#99c7e0] scale-110" : "border-gray-200 hover:border-[#99c7e0]"
                    }`}>
                      <img
                        src={avatar}
                        alt={`Avatar option ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    {profile.avatar === avatar && (
                      <div className="absolute -top-1 -right-1 bg-[#99c7e0] rounded-full p-0.5">
                        <Check size={12} className="text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-[#2596be] mb-1">
            {profile.fullName || "Complete Your Profile"}
          </h1>
          <p className="text-salik-dark mb-4">
            {profile.fullName
              ? `Welcome back, ${profile.fullName.split(" ")[0]}`
              : "Please complete your profile information"}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-1">
            <div className="w-full sm:w-2/3">
              <Progress value={completionPercentage} className="h-3 bg-[#dfdfe0a4]" />
            </div>
            <span className="text-sm font-medium text-[#2596be]">
              {displayPercentage}% Complete
            </span> 
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 mt-4">
            <Button
              onClick={openUaePassModal}
              disabled={loading || uaePassLoading}
              className="bg-[#78bad6] hover:bg-[#87b8cd] text-white flex items-center gap-2"
            >
              {uaePassLoading && (
                <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent" />
              )}
              <img src="/lovable-uploads/ff143372-97e8-4e3d-bd9e-e81680279470.png" alt="UAE Pass" className="h-6 w-auto mr-1" />
              Connect
            </Button>
            <span className="text-xs text-gray-500">
              Or complete the information manually below
            </span>
          </div>
        </div>
      </div>

      {/* UAE Pass Number Input Modal - Updated to Emirates ID */}
      <AlertDialog open={showUaePassModal} onOpenChange={closeUaePassModal}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#2596be] font-semibold text-xl">
              Connect UAE Pass
            </AlertDialogTitle>
            <AlertDialogDescription>
              Please enter your Emirates ID to connect and fetch your profile information.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Label htmlFor="uaePassNumber" className="font-medium text-salik-dark">
              Emirates ID
            </Label>
            <Input
              id="uaePassNumber"
              value={uaePassNumber}
              onChange={(e) => setUaePassNumber(e.target.value)}
              placeholder="Enter your Emirates ID"
              className="mt-2"
              autoFocus
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 text-salik-dark">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                updateProfileWithUaePass();
              }}
              className="bg-btn-primary hover:bg-btn-secondary text-btn-textPrimary"
            >
              Connect
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};