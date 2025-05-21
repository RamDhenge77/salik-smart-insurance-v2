import { useState, useEffect } from "react";
import { UserProfile, Vehicle } from "../types/user";
import { 
  generateEmptyUserProfile, 
  saveUserProfileToStorage, 
  loadUserProfileFromStorage, 
  getProfileCompletionPercentage 
} from "../utils/profileUtils";
import { useToast } from "@/components/ui/use-toast";

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile>(generateEmptyUserProfile());
  const [loading, setLoading] = useState(true);
  const [uaePassLoading, setUaePassLoading] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [showUaePassModal, setShowUaePassModal] = useState(false);
  const [uaePassNumber, setUaePassNumber] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const storedProfile = loadUserProfileFromStorage();
    if (storedProfile) {
      setProfile(storedProfile);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      setCompletionPercentage(getProfileCompletionPercentage(profile));
      saveUserProfileToStorage(profile);
    }
  }, [profile, loading]);

  const updateProfile = (updatedData: Partial<UserProfile>) => {
    setProfile(prev => {
      const newProfile = { ...prev, ...updatedData };
      return newProfile;
    });
  };

  const updateAddress = (field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  };

  const updateDrivingLicense = (field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      drivingLicense: {
        ...prev.drivingLicense,
        [field]: value
      }
    }));
  };

  const addVehicle = (vehicle: Vehicle) => {
    setProfile(prev => ({
      ...prev,
      vehicles: [...prev.vehicles, vehicle]
    }));
    toast({
      title: "Vehicle Added",
      description: `${vehicle.make} ${vehicle.model} has been added to your profile.`
    });
  };

  const updateVehicle = (id: string, updatedVehicle: Partial<Vehicle>) => {
    setProfile(prev => ({
      ...prev,
      vehicles: prev.vehicles.map(v => 
        v.id === id ? { ...v, ...updatedVehicle } : v
      )
    }));
  };

  const removeVehicle = (id: string) => {
    setProfile(prev => ({
      ...prev,
      vehicles: prev.vehicles.filter(v => v.id !== id)
    }));
    toast({
      title: "Vehicle Removed",
      description: "Vehicle has been removed from your profile."
    });
  };

  const updateDocument = (docType: keyof UserProfile['documents'], value: string) => {
    setProfile(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [docType]: value
      }
    }));
  };
  
  const openUaePassModal = () => {
    setUaePassNumber("");
    setShowUaePassModal(true);
  };
  
  const closeUaePassModal = () => {
    setShowUaePassModal(false);
  };
  
  const updateProfileWithUaePass = async () => {
    if (!uaePassNumber.trim()) {
      toast({
        title: "Emirates ID Required",
        description: "Please enter your Emirates ID to continue.",
        variant: "destructive"
      });
      return;
    }
    
    setUaePassLoading(true);
    closeUaePassModal();
    
    // Simulate API call to UAE Pass (would be replaced with actual API)
    try {
      // Using setTimeout to simulate API delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Sample UAE Pass data
      const uaePassData: Partial<UserProfile> = {
        fullName: "Arvind Venkat",
        dateOfBirth: "1985-06-15",
        gender: "male",
        email: "arvind.venkat@example.ae",
        mobile: "971501234567",
        emiratesId: "784-1985-1234567-8",
        emiratesIdExpiry: "2028-10-15",
        address: {
          emirate: "Dubai",
          area: "Downtown Dubai",
          street: "Sheikh Mohammed Bin Rashid Boulevard",
          poBox: "123456"
        },
        drivingLicense: {
          number: "UAE-DL-98765432",
          issueDate: "2010-03-20",
          expiryDate: "2030-03-19",
          category: "Light Vehicle"
        }
      };
      
      setProfile(prev => ({
        ...prev,
        ...uaePassData
      }));
      
      toast({
        title: "UAE Pass Connected",
        description: "Your profile has been updated with UAE Pass information."
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Unable to connect to UAE Pass. Please try again later.",
        variant: "destructive"
      });
      console.error("Error connecting to UAE Pass:", error);
    } finally {
      setUaePassLoading(false);
    }
  };
  
  return {
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
    updateProfileWithUaePass
  };
};