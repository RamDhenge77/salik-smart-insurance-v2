
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import ServiceSection from "./ServiceSection";
import SearchBar from "./SearchBar";
import { serviceData } from "@/data/service-history";

const ServiceHistoryPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleDownloadInvoice = () => {
    toast({
      title: "Invoice downloaded",
      description: "Your invoice has been downloaded successfully.",
    });
  };

  const handleRequestAgain = (serviceType: string, id: string) => {
    toast({
      title: "Service requested",
      description: `Your ${serviceType} service has been requested again.`,
    });
  };

  const handleFilterChange = (
    date: { from: Date | undefined; to: Date | undefined } | undefined,
    status: string | null,
    vehicle: string | null
  ) => {
    if (date) setFilterDate(date);
    setSelectedStatus(status);
    setSelectedVehicle(vehicle);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold mb-2 text-themeDark">My Services History</h1>
          <p className="text-muted-foreground mb-4">
            Track all your past services and activities across your vehicles in one place.
          </p>
          <SearchBar 
            onSearch={handleSearch} 
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>

      <div className="container mx-auto px-4">
        {Object.keys(serviceData).map((serviceType) => (
          <ServiceSection
            key={serviceType}
            serviceType={serviceType}
            data={serviceData[serviceType]}
            searchTerm={searchTerm}
            filterDate={filterDate}
            selectedStatus={selectedStatus}
            selectedVehicle={selectedVehicle}
            onDownloadInvoice={handleDownloadInvoice}
            onRequestAgain={(id) => handleRequestAgain(serviceType, id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceHistoryPage;
