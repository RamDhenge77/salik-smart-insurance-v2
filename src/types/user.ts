export type Gender = "male" | "female" | "other" | "";

export interface UserProfile {
  id?: string;
  avatar: string;
  fullName: string;
  dateOfBirth: string;
  gender: Gender;
  email: string;
  mobile: string;
  emiratesId: string;
  emiratesIdExpiry: string;
  address: {
    emirate: string;
    area: string;
    street: string;
    poBox: string;
  };
  drivingLicense: {
    number: string;
    issueDate: string;
    expiryDate: string;
    category: string;
  };
  vehicles: Vehicle[];
  documents: {
    mulkiya?: string;
    license?: string;
    insurance?: string;
  };
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: string;
  color: string;
  registrationNumber: string;
  chassisNumber: string;
  plateCode: string;
  plateNumber: string;
  rtaTagNumber: string;
  insurance: {
    provider: string;
    policyNumber: string;
    expiryDate: string;
  };
}

export interface UserProfileSection {
  title: string;
  weight: number;
  fields: string[];
}