import { UserProfile, UserProfileSection } from "../types/user";

export const AVATAR_OPTIONS = [
  // Professional avatar options
  "/lovable-uploads/d182b019-9597-4df8-bcc7-47f450363255.png",  // Business man in suit with red tie
  "/lovable-uploads/5aff0c3a-4701-4ed6-b444-07f4ed5c63e0.png",  // Business man with glasses
  "/lovable-uploads/acfaab67-fcc5-4dd3-92ea-10f696bfa1e6.png",  // Professional man in white shirt
  "/lovable-uploads/f061c22f-abfe-454f-a83d-ff648a54a462.png",  // Smiling man with beard
  "/lovable-uploads/cb4a0eaf-b51c-4e10-8d3f-66b1ae47e219.png",  // Man with glasses and beard in circle
  "/lovable-uploads/f3fbbbf6-b30a-40a6-9ccb-c8609b343710.png",  // Woman with long hair in circle
  "/lovable-uploads/91e5c89e-9d4b-4a57-bccb-97d9f008db69.png",  // Man in suit with tie in circle
  "/lovable-uploads/e586deff-886a-4459-a5de-9730409ed7fc.png"   // Woman with short hair in circle
];

// Add the missing constants required by VehicleForm.tsx
export const VEHICLE_MAKES = [
  "Toyota", 
  "Honda", 
  "Nissan", 
  "BMW", 
  "Mercedes-Benz", 
  "Audi", 
  "Lexus", 
  "Ford", 
  "Chevrolet", 
  "Hyundai",
  "Kia",
  "Infiniti",
  "Mitsubishi",
  "Porsche",
  "Mazda",
  "Volkswagen",
  "Jeep",
  "Land Rover"
];

export const VEHICLE_COLORS = [
  "White", 
  "Silver", 
  "Black", 
  "Grey", 
  "Blue", 
  "Red", 
  "Green", 
  "Brown", 
  "Yellow",
  "Burgundy",
  "Champagne",
  "Gold",
  "Orange",
  "Purple"
];

export const INSURANCE_PROVIDERS = [
  "Orient Insurance", 
  "Oman Insurance",
  "AXA Gulf", 
  "RSA Insurance", 
  "Noor Takaful", 
  "ADNIC", 
  "Sukoon Insurance", 
  "Emirates Insurance",
  "Dubai Insurance",
  "Al Ain Ahlia",
  "Al Buhaira National Insurance",
  "Watania Takaful"
];

export const PROFILE_SECTIONS: UserProfileSection[] = [
  {
    title: "Personal Information",
    weight: 0.3,
    fields: ["fullName", "dateOfBirth", "gender", "email", "mobile", "emiratesId", "emiratesIdExpiry"]
  },
  {
    title: "Address",
    weight: 0.2,
    fields: ["emirate", "area", "street", "poBox"]
  },
  {
    title: "Driving License",
    weight: 0.25,
    fields: ["number", "issueDate", "expiryDate", "category"]
  },
  {
    title: "Vehicles",
    weight: 0.15,
    fields: ["vehicles"]
  },
  {
    title: "Documents",
    weight: 0.1,
    fields: ["mulkiya", "license", "insurance"]
  }
];

export const UAE_EMIRATES = [
  "Abu Dhabi",
  "Dubai",
  "Sharjah",
  "Ajman",
  "Umm Al Quwain",
  "Ras Al Khaimah",
  "Fujairah"
];

export const LICENSE_CATEGORIES = [
  "Light Vehicle",
  "Motorcycle",
  "Heavy Vehicle",
  "Bus",
  "Construction Equipment"
];

export const getProfileCompletionPercentage = (profile: UserProfile): number => {
  let completedFields = 0;
  let totalFieldsWeight = 0;

  PROFILE_SECTIONS.forEach(section => {
    section.fields.forEach(field => {
      totalFieldsWeight += section.weight / section.fields.length;
      if (profile[field as keyof UserProfile]) {
        if (Array.isArray(profile[field as keyof UserProfile])) {
          completedFields += (profile[field as keyof UserProfile] as any[]).length > 0 ? section.weight / section.fields.length : 0;
        } else if (typeof profile[field as keyof UserProfile] === 'object' && profile[field as keyof UserProfile] !== null) {
          let hasData = false;
          for (const key in profile[field as keyof UserProfile] as object) {
            if ((profile[field as keyof UserProfile] as any)[key]) {
              hasData = true;
              break;
            }
          }
          completedFields += hasData ? section.weight / section.fields.length : 0;
        }
        else if (profile[field as keyof UserProfile] !== "") {
          completedFields += section.weight / section.fields.length;
        }
      }
    });
  });

  const completionPercentage = (completedFields / totalFieldsWeight) * 100;
  // Return as integer instead of float
  return Math.round(Math.min(Math.max(completionPercentage, 0), 100));
};

export const generateEmptyUserProfile = (): UserProfile => {
  return {
    avatar: AVATAR_OPTIONS[0],
    fullName: "Arvind Venkat",
    dateOfBirth: "15/05/1980",
    gender: "male",
    email: "arvind.v@example.com",
    mobile: "97150XXXXXX",
    emiratesId: "784-1980-XXXXXXX-1",
    emiratesIdExpiry: "2028-10-15",
    address: {
      emirate: "Dubai",
      area: "",
      street: "",
      poBox: ""
    },
    drivingLicense: {
      number: "",
      issueDate: "",
      expiryDate: "",
      category: ""
    },
    vehicles: [],
    documents: {}
  };
};

export const saveUserProfileToStorage = (profile: UserProfile): void => {
  localStorage.setItem("userProfile", JSON.stringify(profile));
};

export const loadUserProfileFromStorage = (): UserProfile | null => {
  const stored = localStorage.getItem("userProfile");
  return stored ? JSON.parse(stored) : null;
};