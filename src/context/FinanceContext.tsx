
import React, { createContext, useContext, useState } from 'react';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  company?: string;
  income: number;
  emirates: string;
}

interface CarInfo {
  brand: string;
  model: string;
  year: number;
  price: number;
}

interface FinanceDetails {
  downPayment: number;
  financeAmount: number;
  term: number;
  monthlyEMI: number;
  profitRate: number;
}

interface Documents {
  emiratesID?: File;
  salaryCertificate?: File;
  carQuote?: File;
}

interface ApplicationData {
  applicationId?: string;
  personalInfo?: PersonalInfo;
  carInfo?: CarInfo;
  financeDetails?: FinanceDetails;
  documents?: Documents;
  paymentComplete?: boolean;
  applicationDate?: Date;
  status?: 'draft' | 'submitted' | 'processing' | 'approved' | 'rejected';
}

interface FinanceContextType {
  applicationData: ApplicationData;
  setPersonalInfo: (info: PersonalInfo) => void;
  setCarInfo: (info: CarInfo) => void;
  setFinanceDetails: (details: FinanceDetails) => void;
  setDocuments: (docs: Documents) => void;
  setPaymentComplete: (complete: boolean) => void;
  resetApplication: () => void;
  calculateEMI: (principal: number, rate: number, time: number) => number;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    status: 'draft',
    applicationDate: new Date(),
    applicationId: `AF-${Math.floor(Math.random() * 900000) + 100000}` // Generate a random application ID
  });

  const setPersonalInfo = (info: PersonalInfo) => {
    setApplicationData(prev => ({ ...prev, personalInfo: info }));
  };

  const setCarInfo = (info: CarInfo) => {
    setApplicationData(prev => ({ ...prev, carInfo: info }));
  };

  const setFinanceDetails = (details: FinanceDetails) => {
    setApplicationData(prev => ({ ...prev, financeDetails: details }));
  };

  const setDocuments = (docs: Documents) => {
    setApplicationData(prev => ({ ...prev, documents: { ...prev.documents, ...docs } }));
  };

  const setPaymentComplete = (complete: boolean) => {
    setApplicationData(prev => ({ 
      ...prev, 
      paymentComplete: complete,
      status: complete ? 'submitted' : prev.status
    }));
  };

  const resetApplication = () => {
    setApplicationData({
      status: 'draft',
      applicationDate: new Date(),
      applicationId: `AF-${Math.floor(Math.random() * 900000) + 100000}`
    });
  };

  // Calculate EMI (Equated Monthly Installment)
  const calculateEMI = (principal: number, ratePercent: number, timeMonths: number): number => {
    const rate = ratePercent / 100 / 12; // Monthly interest rate
    const emi = principal * rate * (Math.pow(1 + rate, timeMonths)) / (Math.pow(1 + rate, timeMonths) - 1);
    return Math.round(emi);
  };

  return (
    <FinanceContext.Provider
      value={{
        applicationData,
        setPersonalInfo,
        setCarInfo,
        setFinanceDetails,
        setDocuments,
        setPaymentComplete,
        resetApplication,
        calculateEMI
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};
