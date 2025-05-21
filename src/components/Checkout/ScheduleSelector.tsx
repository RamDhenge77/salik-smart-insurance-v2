
import { useState } from "react";
import { format, addDays, isBefore, startOfToday } from "date-fns";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon, Clock } from "lucide-react";
import { cn } from "../../lib/utils";

interface ScheduleSelectorProps {
  selectedDate: Date | undefined;
  selectedTime: string;
  onDateChange: (date: Date | undefined) => void;
  onTimeChange: (time: string) => void;
}

const ScheduleSelector: React.FC<ScheduleSelectorProps> = ({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
}) => {
  // Generate available time slots
  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Select Schedule</h2>
      
      <div className="space-y-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Schedule Your Service</h3>
          
          <div className="space-y-4">
            {/* Date picker */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left h-14 font-normal hover:bg-[#6cd0f585]",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-5 w-5" />
                  {selectedDate ? (
                    format(selectedDate, "PPP")
                  ) : (
                    "Select Schedule Date"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 pointer-events-auto">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={onDateChange}
                  disabled={(date) => 
                    isBefore(date, startOfToday()) || 
                    isBefore(addDays(startOfToday(), 60), date)
                  }
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            
            {/* Time picker */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left h-14 font-normal hover:bg-[#6cd0f585]",
                    !selectedTime && "text-muted-foreground"
                  )}
                >
                  <Clock className="mr-2 h-5 w-5" />
                  {selectedTime ? selectedTime : "Select Schedule Time"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="grid grid-cols-2 gap-2 p-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      className={selectedTime === time ? "bg-btn-primary hover:bg-btn-secondary text-btn-textPrimary" : "hover:bg-btn-secondary text-btn-textPrimary"}
                      onClick={() => onTimeChange(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      
      {selectedDate && selectedTime && (
        <div className="bg-[#F0F8FA] p-4 rounded-md mt-6">
          <div className="flex items-start gap-3">
            <CalendarIcon className="h-5 w-5 text-salik-primary mt-1" />
            <div>
              <h4 className="font-medium">Selected Schedule</h4>
              <p className="text-gray-700">
                {format(selectedDate, "EEEE, d MMMM yyyy")} at {selectedTime}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleSelector;
