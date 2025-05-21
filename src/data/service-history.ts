
import { ServiceData } from "@/types/serviceTypes";

export const serviceData: ServiceData = {
  insurance: [
    {
      id: "ins1",
      policyNumber: "POL-23456",
      insurerName: "Liva Insurance",
      vehicle: "Toyota Camry",
      startDate: "2025-01-15",
      endDate: "2026-01-14",
      status: "Active"
    },
    {
      id: "ins2",
      policyNumber: "POL-12345",
      insurerName: "Liva Insurance",
      vehicle: "Honda Civic",
      startDate: "2024-08-10",
      endDate: "2025-08-09",
      status: "Expired"
    }
  ],
  buySellCar: [
    {
      id: "bs1",
      transactionId: "TX-78901",
      carModel: "BMW X5",
      transactionType: "buy",
      otherParty: "Premium Motors",
      date: "2024-11-05",
      amount: 45000,
      status: "Completed"
    },
    {
      id: "bs2",
      transactionId: "TX-56789",
      carModel: "Honda Civic",
      transactionType: "sell",
      otherParty: "John Smith",
      date: "2024-06-22",
      amount: 15000,
      status: "Completed"
    }
  ],
  renewRegistration: [
    {
      id: "reg1",
      renewalId: "REN-9012",
      vehicle: "Toyota Camry",
      renewalDate: "2025-03-15",
      expiryDate: "2026-03-14",
      fee: 120,
      status: "Completed"
    },
    {
      id: "reg2",
      renewalId: "REN-6789",
      vehicle: "BMW X5",
      renewalDate: "2025-02-28",
      expiryDate: "2026-02-27",
      fee: 180,
      status: "Pending"
    }
  ],
  maintenance: [
    {
      id: "maint1",
      serviceId: "SRV-3456",
      vehicle: "Toyota Camry",
      serviceType: "Oil Change",
      date: "2025-04-10",
      workshopName: "QuickFix Auto",
      cost: 75,
      status: "Completed"
    },
    {
      id: "maint2",
      serviceId: "SRV-2345",
      vehicle: "BMW X5",
      serviceType: "Tire Replacement",
      date: "2025-03-25",
      workshopName: "Premium Auto Service",
      cost: 450,
      status: "Completed"
    },
    {
      id: "maint3",
      serviceId: "SRV-1234",
      vehicle: "Honda Civic",
      serviceType: "Annual Maintenance",
      date: "2025-05-08",
      workshopName: "AutoCare Plus",
      cost: 320,
      status: "Scheduled"
    }
  ],
  hireDriver: [
    {
      id: "hd1",
      bookingId: "DRV-5678",
      driverName: "Mike Johnson",
      vehicle: "BMW X5",
      hirePeriod: "May 3, 2025 (8 hours)",
      cost: 180,
      status: "Completed"
    },
    {
      id: "hd2",
      bookingId: "DRV-4567",
      driverName: "Sarah Williams",
      vehicle: "Tesla Model 3",
      hirePeriod: "Apr 28, 2025 (4 hours)",
      cost: 95,
      status: "Canceled"
    }
  ],
  carLeasing: [
    {
      id: "lease1",
      leaseId: "LSE-7890",
      vehicle: "Tesla Model 3",
      leaseStartDate: "2024-12-01",
      leaseEndDate: "2027-11-30",
      monthlyCost: 650,
      status: "Active"
    }
  ],
  carFinancing: [
    {
      id: "fin1",
      loanId: "LN-12345",
      bankName: "First National Bank",
      vehicle: "BMW X5",
      financingAmount: 38000,
      emiAmount: 875,
      tenure: 48,
      status: "Active"
    },
    {
      id: "fin2",
      loanId: "LN-23456",
      bankName: "City Finance",
      vehicle: "Honda Civic",
      financingAmount: 22000,
      emiAmount: 525,
      tenure: 36,
      status: "Completed"
    }
  ]
};
