import { useEffect, useState } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { ProfileHeader } from "./ProfileHeader";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { AddressForm } from "./AddressForm";
import { DrivingLicenseForm } from "./DrivingLicenseForm";
import { VehicleForm } from "./VehicleForm";
import { DocumentsSection } from "./DocumentsSection";
import { 
  ProfileTabs, 
  ProfileTabsList, 
  ProfileTabsTrigger, 
  ProfileTabsContent 
} from "@/components/ui/profile-tabs";
import { User, MapPin, Car, FileText } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const UserProfile = () => {
  const {
    profile,
    loading,
    uaePassLoading,
    completionPercentage,
    updateProfile,
    updateAddress,
    updateDrivingLicense,
    addVehicle,
    updateVehicle,
    removeVehicle,
    updateDocument,
    showUaePassModal,
    uaePassNumber,
    setUaePassNumber,
    openUaePassModal,
    closeUaePassModal,
    updateProfileWithUaePass,
  } = useUserProfile();
  
  const [activeTab, setActiveTab] = useState("personal");
  const [message, setMessage] = useState("Please confirm on UAE Pass application.");

  useEffect(()=>{
    if (uaePassLoading) {
      const timer = setTimeout(() => {
        setMessage("Fetching your profile from UAE Pass...");
      }, 1500);

      return () => clearTimeout(timer);
    }
  },[uaePassLoading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-salik-light">
        <div className="animate-spin h-8 w-8 border-4 border-salik-primary rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-salik-light">
      <div className="container max-w-[1000px] mx-auto py-8 px-4">
        <ProfileHeader
          profile={profile}
          completionPercentage={completionPercentage}
          updateProfile={updateProfile}
          loading={loading}
          uaePassLoading={uaePassLoading}
          showUaePassModal={showUaePassModal}
          uaePassNumber={uaePassNumber}
          setUaePassNumber={setUaePassNumber}
          openUaePassModal={openUaePassModal}
          closeUaePassModal={closeUaePassModal}
          updateProfileWithUaePass={updateProfileWithUaePass}
        />

        {uaePassLoading && (
          <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
            <div className="flex items-center justify-center flex-col">
              <div className="animate-spin h-10 w-10 border-4 border-salik-primary rounded-full border-t-transparent"></div>
              <p className="mt-4 text-salik-dark font-medium">{message}</p>
            </div>
          </div>
        )}

        <ProfileTabs value={activeTab} onValueChange={setActiveTab}>
          <ProfileTabsList className="bg-white shadow-sm">
            <ProfileTabsTrigger value="personal" icon={<User size={18} />}>
              Personal
            </ProfileTabsTrigger>
            <ProfileTabsTrigger value="address" icon={<MapPin size={18} />}>
              Address
            </ProfileTabsTrigger>
            <ProfileTabsTrigger value="vehicles" icon={<Car size={18} />}>
              Vehicles
            </ProfileTabsTrigger>
            <ProfileTabsTrigger value="documents" icon={<FileText size={18} />}>
              Documents
            </ProfileTabsTrigger>
          </ProfileTabsList>

          <div className="mt-6 animate-fade-in">
            {uaePassLoading ? (
              <div className="space-y-6">
                <Skeleton className="h-[300px] w-full rounded-lg" />
              </div>
            ) : (
              <>
                <ProfileTabsContent value="personal" className="space-y-8">
                  <PersonalInfoForm profile={profile} updateProfile={updateProfile} />
                  <DrivingLicenseForm
                    profile={profile}
                    updateDrivingLicense={updateDrivingLicense}
                  />
                </ProfileTabsContent>

                <ProfileTabsContent value="address">
                  <AddressForm profile={profile} updateAddress={updateAddress} />
                </ProfileTabsContent>

                <ProfileTabsContent value="vehicles">
                  <VehicleForm
                    vehicles={profile.vehicles}
                    addVehicle={addVehicle}
                    updateVehicle={updateVehicle}
                    removeVehicle={removeVehicle}
                  />
                </ProfileTabsContent>

                <ProfileTabsContent value="documents">
                  <DocumentsSection
                    profile={profile}
                    updateDocument={updateDocument}
                  />
                </ProfileTabsContent>
              </>
            )}
          </div>
        </ProfileTabs>
      </div>
    </div>
  );
};

export default UserProfile;