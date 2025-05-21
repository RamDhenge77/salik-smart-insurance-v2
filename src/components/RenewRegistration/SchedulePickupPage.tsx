import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, ArrowLeft, Check } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { format, addDays } from "date-fns";
import { useCarContext } from "@/context/Context";
import { Button } from "../ui/button";

const SchedulePickupPage = () => {
  const navigate = useNavigate();
  const { booking } = useBooking();
  const { setRegistrationSteps } = useCarContext();

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleContinue = () => {
    // navigate('/location');
    setRegistrationSteps(3);
  };

  const handleBack = () => {
    // navigate(-1);
    setRegistrationSteps(1);
  };

  // Generate dates for the next 15 days
  const generateDates = () => {
    const today = new Date();
    const dates = [];

    for (let i = 0; i < 15; i++) {
      const date = addDays(today, i);
      const formatted = {
        day: format(date, "EEE"),
        date: format(date, "d"),
        full: format(date, "EEE, d MMM"),
        value: format(date, "yyyy-MM-dd"),
      };
      dates.push(formatted);
    }

    return dates;
  };

  const dates = generateDates();

  // Morning and afternoon time slots
  const morningTimes = ["09:00 AM", "10:00 AM", "11:00 AM"];
  const afternoonTimes = [
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];
  const eveningTimes = ["6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM"];

  const isDateSelected = (value: string) => selectedDate === value;
  const isTimeSelected = (value: string) => selectedTime === value;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200 flex items-center">
        <button onClick={handleBack} className="mr-4">
          <ArrowLeft size={24} className="text-gray-700" />
        </button>
        <h1 className="text-xl font-bold">Schedule Pickup</h1>
      </div>

      <div className="p-4 flex-1 overflow-auto">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">
            Thank you for choosing our home concierge service!
          </h2>
          <p className="text-gray-700 mb-4">
            As a valued Salik customer, we're here to make the process seamless
            and convenient for you.
          </p>
          <p className="text-gray-700 mb-4">
            Please schedule a pick-up of your vehicle for inspection.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-bgLight p-4 rounded-md">
            <div className="flex items-center mb-4">
              <Calendar size={20} className="mr-2 text-gray-700" />
              <h3 className="font-medium">Select Date</h3>
              <p className="ml-2 text-xs text-gray-500">
                (up to 15 days in advance)
              </p>
            </div>

            <div className="overflow-x-auto pb-2">
              <div className="flex gap-2 min-w-max">
                {dates.map((date) => (
                  <button
                    key={date.value}
                    onClick={() => setSelectedDate(date.value)}
                    className={`px-3 py-2 min-w-16 flex flex-col items-center justify-center rounded-md border 
                      ${
                        isDateSelected(date.value)
                          ? "bg-btn-primary text-white border-[#2596be]"
                          : "bg-white border-gray-300"
                      }`}
                  >
                    <span className="text-xs font-medium">{date.day}</span>
                    <span className="text-lg font-bold">{date.date}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-bgLight p-4 rounded-md">
            <div className="flex items-center mb-4">
              <Clock size={20} className="mr-2 text-gray-700" />
              <h3 className="font-medium">Select Time</h3>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Morning
                </h4>
                <div className="flex flex-wrap gap-2">
                  {morningTimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`px-4 py-2 rounded-md border 
                        ${
                          isTimeSelected(time)
                            ? "bg-btn-primary text-white border-[#2596be]"
                            : "bg-white border-gray-300"
                        }`}
                    >
                      {time}
                      {isTimeSelected(time) && (
                        <Check size={12} className="ml-1 inline" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Afternoon
                </h4>
                <div className="flex flex-wrap gap-2">
                  {afternoonTimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`px-4 py-2 rounded-md border 
                        ${
                          isTimeSelected(time)
                            ? "bg-btn-primary text-white border-[#2596be]"
                            : "bg-white border-gray-300"
                        }`}
                    >
                      {time}
                      {isTimeSelected(time) && (
                        <Check size={12} className="ml-1 inline" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Evening
                </h4>
                <div className="flex flex-wrap gap-2">
                  {eveningTimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`px-4 py-2 rounded-md border 
                        ${
                          isTimeSelected(time)
                            ? "bg-btn-primary text-white border-[#2596be]"
                            : "bg-white border-gray-300"
                        }`}
                    >
                      {time}
                      {isTimeSelected(time) && (
                        <Check size={12} className="ml-1 inline" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {selectedDate && selectedTime && (
              <div className="mt-6 p-3 bg-gray-200 rounded-md text-center">
                <p className="font-bold">
                  {dates.find((d) => d.value === selectedDate)?.full} |{" "}
                  {selectedTime}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200">
        <Button
          variant="primary"
          onClick={handleContinue}
          disabled={!selectedDate || !selectedTime}
          className={`w-full h-[3.4rem] py-4 rounded-md font-bold ${
            selectedDate && selectedTime
              ? "bg-btn-primary text-white"
              : "bg-gray-200 text-gray-500"
          }`}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default SchedulePickupPage;
