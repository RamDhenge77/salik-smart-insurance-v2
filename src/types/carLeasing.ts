export interface FilterState {
    carType: string;
    minPrice: number;
    maxPrice: number;
    includeInsurance: boolean;
    includeMaintenance: boolean;
    mileageCap: number;
  }

  export interface LeaseFormState {
    carType: string;
    leaseTerm: number;
    budget: number;
    includeInsurance: boolean;
    includeMaintenance: boolean;
    mileageCap: number;
    selectedCarId?: string;
    customerName: string;
    email: string;
    phone: string;
    pickupDate: Date | undefined;
    emiratesIdFile: File | null;
    licenseFile: File | null;
    salaryCertificateFile: File | null;
  }

  export interface BookingStep {
    id: string;
    title: string;
    description: string;
  }
  