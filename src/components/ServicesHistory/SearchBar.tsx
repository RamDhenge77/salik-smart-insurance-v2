import { useEffect, useState } from "react";
import { Search, Filter, CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface SearchBarProps {
  onSearch: (term: string) => void;
  onFilterChange: (
    date: { from: Date | undefined; to: Date | undefined } | undefined,
    status: string | null,
    vehicle: string | null
  ) => void;
}

const SearchBar = ({ onSearch, onFilterChange }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [status, setStatus] = useState<string | null>(null);
  const [vehicle, setVehicle] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleApplyFilters = () => {
    onFilterChange(date, status, vehicle);
    setIsOpen(false);
  };

  const handleResetFilters = () => {
    setDate({ from: undefined, to: undefined });
    setStatus(null);
    setVehicle(null);
    onFilterChange({ from: undefined, to: undefined }, null, null);
    setIsOpen(false);
  };

  useEffect(() => {
    if (status === "all") {
      setStatus(null);
    }
  }, [status]);
  
  useEffect(() => {
    if (vehicle === "all") {
      setVehicle(null);
    }
  }, [vehicle]);

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <div className="relative flex-grow">
        <Input
          placeholder="Search by Date, Service ID, Vehicle, Status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full pl-10"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Search size={18} />
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="primary" onClick={handleSearch} className="btn-service">
          Search
        </Button>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              <Filter size={16} />
              Filter
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4" align="end">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Date Range</h3>
                <div className="grid gap-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col space-y-1">
                      <span className="text-xs text-gray-500">From</span>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="justify-start text-left font-normal h-9"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date.from ? (
                              format(date.from, "PPP")
                            ) : (
                              <span className="text-muted-foreground">
                                Pick a date
                              </span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date.from}
                            onSelect={(day) =>
                              setDate((prev) => ({ ...prev, from: day }))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <span className="text-xs text-gray-500">To</span>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="justify-start text-left font-normal h-9"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date.to ? (
                              format(date.to, "PPP")
                            ) : (
                              <span className="text-muted-foreground">
                                Pick a date
                              </span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date.to}
                            onSelect={(day) =>
                              setDate((prev) => ({ ...prev, to: day }))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Status</h3>
                <Select
                  value={status || "all"}
                  onValueChange={(value) => setStatus(value || null)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Expired">Expired</SelectItem>
                    <SelectItem value="Canceled">Canceled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Vehicle</h3>
                <Select
                  value={vehicle || "all"}
                  onValueChange={(value) => setVehicle(value || null)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Toyota Camry">Toyota Camry</SelectItem>
                    <SelectItem value="Honda Civic">Honda Civic</SelectItem>
                    <SelectItem value="Tesla Model 3">Tesla Model 3</SelectItem>
                    <SelectItem value="BMW X5">BMW X5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-between pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetFilters}
                >
                  Reset
                </Button>
                <Button
                  variant="primary"
                  className="btn-service"
                  size="sm"
                  onClick={handleApplyFilters}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default SearchBar;
