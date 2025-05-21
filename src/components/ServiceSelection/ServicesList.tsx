
import { getServicesByCategory, ServiceOption } from "../../data/services";
import ServiceDetail from "./ServiceDetail";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "../ui/carousel";

interface ServicesListProps {
  categoryId: string;
  brandName: string;
  modelName: string;
  modelYear: number;
}

const ServicesList: React.FC<ServicesListProps> = ({
  categoryId,
  brandName,
  modelName,
  modelYear,
}) => {
  const services = getServicesByCategory(categoryId);
  
  if (!services || services.length === 0) {
    return (
      <div className="text-center p-8">
        <h3 className="text-lg font-medium">No services available for this category</h3>
        <p className="text-gray-600 mt-2">Please select a different category</p>
      </div>
    );
  }
  
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Available Services</h3>
      
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            {services.map((service) => (
              <CarouselItem key={service.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/3">
                <ServiceDetail
                  service={service}
                  brandName={brandName}
                  modelName={modelName}
                  modelYear={modelYear}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-4">
            <CarouselPrevious className="relative inset-0 translate-y-0 left-0 hover:bg-btn-primary hover:text-btn-textPrimary" />
            <CarouselNext className="relative inset-0 translate-y-0 right-0 hover:bg-btn-primary hover:text-btn-textPrimary" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default ServicesList;
