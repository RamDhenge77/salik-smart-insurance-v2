
export type ServiceType = 
  | "insurance" 
  | "buySellCar" 
  | "renewRegistration" 
  | "maintenance" 
  | "hireDriver" 
  | "carLeasing" 
  | "carFinancing";

// Generic service item with all possible properties
export interface ServiceItem {
  id: string;
  status: string;
  date?: string;

  // Insurance
  policyNumber?: string;
  insurerName?: string;
  vehicle?: string;
  startDate?: string;
  endDate?: string;

  // Buy/Sell Car
  transactionId?: string;
  carModel?: string;
  transactionType?: "buy" | "sell";
  otherParty?: string;
  amount?: number;

  // Renew Registration
  renewalId?: string;
  renewalDate?: string;
  expiryDate?: string;
  fee?: number;

  // Maintenance
  serviceId?: string;
  serviceType?: string;
  workshopName?: string;
  cost?: number;

  // Hire Driver
  bookingId?: string;
  driverName?: string;
  hirePeriod?: string;

  // Car Leasing
  leaseId?: string;
  leaseStartDate?: string;
  leaseEndDate?: string;
  monthlyCost?: number;

  // Car Financing
  loanId?: string;
  bankName?: string;
  financingAmount?: number;
  emiAmount?: number;
  tenure?: number;
}

export interface ServiceData {
  [key: string]: ServiceItem[];
}
