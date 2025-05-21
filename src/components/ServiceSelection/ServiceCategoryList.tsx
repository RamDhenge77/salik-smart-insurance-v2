
import { useState } from 'react';
import { serviceCategories } from '../../data/services';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ServiceCategoryListProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string) => void;
}

const ServiceCategoryList: React.FC<ServiceCategoryListProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollAmount = 200;
  
  const scrollLeft = () => {
    const newPosition = Math.max(0, scrollPosition - scrollAmount);
    setScrollPosition(newPosition);
    const container = document.getElementById('category-scroll-container');
    if (container) {
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    const container = document.getElementById('category-scroll-container');
    if (container) {
      const newPosition = Math.min(
        container.scrollWidth - container.clientWidth,
        scrollPosition + scrollAmount
      );
      setScrollPosition(newPosition);
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full my-6">
      <h2 className="text-2xl font-semibold mb-4">Select a service</h2>
      <div className="relative">
        <button 
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
          aria-label="Scroll left"
        >
          <ChevronLeft size={16} className="text-salik-primary" />
        </button>
        
        <div 
          id="category-scroll-container"
          className="flex overflow-x-auto gap-2 py-2 px-6 scrollbar-none"
          style={{ scrollBehavior: 'smooth' }}
        >
          {serviceCategories.map((category) => (
            <div 
              key={category.id}
              className={cn(
                "flex-none min-w-[120px] cursor-pointer text-center p-2 rounded-lg border transition-all",
                selectedCategory === category.id 
                  ? "border-salik-primary bg-salik-primary/5 shadow-sm" 
                  : "border-gray-200 hover:border-[#2596be] hover:shadow-sm"
              )}
              onClick={() => onSelectCategory(category.id)}
            >
              <div className="text-xl mb-1">{category.icon}</div>
              <h3 className="text-xs font-medium">{category.name}</h3>
            </div>
          ))}
        </div>
        
        <button 
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
          aria-label="Scroll right"
        >
          <ChevronRight size={16} className="text-salik-primary" />
        </button>
      </div>
    </div>
  );
};

export default ServiceCategoryList;
