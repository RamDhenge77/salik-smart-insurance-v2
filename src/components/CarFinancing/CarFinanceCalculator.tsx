import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CarFinanceCalculator = () => {
  const [carValue, setCarValue] = useState(100000);
  const [tenure, setTenure] = useState(36); // Months
  const [interestRate, setInterestRate] = useState(3.61); // Percentage
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  // Calculate monthly payment whenever inputs change
  useEffect(() => {
    // Convert annual interest rate to monthly
    const monthlyInterestRate = interestRate / 100 / 12;
    // Calculate monthly payment using the formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
    const payment = 
      (carValue * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenure)) / 
      (Math.pow(1 + monthlyInterestRate, tenure) - 1);
    
    setMonthlyPayment(isNaN(payment) ? 0 : payment);
  }, [carValue, tenure, interestRate]);

  return (
    <Card className="mb-6">
      <CardHeader className="bg-[#f0f9fc] border-b border-[#95c7dc]">
        <CardTitle className="text-[#4F5063] text-xl">Car Finance Calculator</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Car Value Input */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="carValue" className="text-[#4F5063]">Car Value (AED)</Label>
              <span className="font-medium text-[#4F5063]">{carValue.toLocaleString()}</span>
            </div>
            <div className="pt-2">
              <Slider 
                id="carValue"
                min={50000} 
                max={500000} 
                step={5000} 
                value={[carValue]} 
                onValueChange={(values) => setCarValue(values[0])}
                className="cursor-pointer"
              />
            </div>
            <div className="flex justify-between text-xs text-[#4F5063] pt-1">
              <span>50,000</span>
              <span>500,000</span>
            </div>
          </div>
          
          {/* Tenure Input */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="tenure" className="text-[#4F5063]">Tenure (Months)</Label>
              <span className="font-medium text-[#4F5063]">{tenure} months</span>
            </div>
            <div className="pt-2">
              <Slider 
                id="tenure"
                min={12} 
                max={60} 
                step={12} 
                value={[tenure]} 
                onValueChange={(values) => setTenure(values[0])}
                className="cursor-pointer"
              />
            </div>
            <div className="flex justify-between text-xs text-[#4F5063] pt-1">
              <span>12</span>
              <span>60</span>
            </div>
          </div>
        </div>

        {/* Interest Rate Input */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="interestRate" className="text-[#4F5063]">Interest Rate (%)</Label>
            <span className="font-medium text-[#4F5063]">{interestRate.toFixed(2)}%</span>
          </div>
          <div className="pt-2">
            <Slider 
              id="interestRate"
              min={1.5} 
              max={10} 
              step={0.1} 
              value={[interestRate]} 
              onValueChange={(values) => setInterestRate(values[0])}
              className="cursor-pointer"
            />
          </div>
          <div className="flex justify-between text-xs text-[#4F5063] pt-1">
            <span>1.5%</span>
            <span>10%</span>
          </div>
        </div>

        {/* Results */}
        <div className="mt-6 p-4 bg-[#f0f9fc] rounded-md border border-[#95c7dc]">
          <div className="flex justify-between items-center">
            <span className="text-[#4F5063] font-medium">Monthly Payment:</span>
            <span className="text-[#4F5063] text-xl font-bold">
              {monthlyPayment.toLocaleString('en-US', { 
                style: 'currency', 
                currency: 'AED',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              })}
            </span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-[#4F5063] font-medium">Total Payment:</span>
            <span className="text-[#4F5063] font-semibold">
              {(monthlyPayment * tenure).toLocaleString('en-US', { 
                style: 'currency', 
                currency: 'AED',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              })}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarFinanceCalculator;