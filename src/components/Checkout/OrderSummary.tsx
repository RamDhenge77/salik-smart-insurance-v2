import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Check } from "lucide-react";

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}

interface OrderSummaryProps {
  cartItem: {
    service: {
      name: string;
      price: number;
    };
    brandName: string;
    modelName: string;
    modelYear: number;
  };
  location: string;
  date: Date | undefined;
  time: string;
  licensePlate: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  cartItem,
  location,
  date,
  time,
  licensePlate,
}) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [coupon, setCoupon] = useState("");
  const [notes, setNotes] = useState("");

  const subtotal = cartItem.service.price;
  const tax = subtotal * 0.05; // 5% VAT
  const total = subtotal + tax;

  const paymentMethods: PaymentMethod[] = [
    { id: "tabby", name: "Tabby (BNPL)", icon: "💳" },
    { id: "card", name: "Online card payment", icon: "💳" },
  ];

  const handleApplyCoupon = () => {
    // Here you would validate the coupon
    alert("Coupon code validation would happen here");
  };

  const handlePlaceOrder = () => {
    alert(
      "Order placed! In a real app, this would process the payment and save the order."
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Selected Car</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 items-center">
              <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                <img
                  src={`/cars/${cartItem.brandName.toLowerCase()}.png`}
                  alt={cartItem.brandName}
                  className="max-w-full max-h-full object-contain p-1"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `/lovable-uploads/003a6340-092f-4859-87f7-18288f7787d4.png`;
                  }}
                />
              </div>
              <div>
                <h3 className="font-medium">
                  {cartItem.brandName} {cartItem.modelName}
                </h3>
                <p className="text-gray-500">{licensePlate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="font-medium">Address: </span>
                <span className="text-gray-600">{location}</span>
              </div>
              {date && time && (
                <div>
                  <span className="font-medium">Date and Time: </span>
                  <span className="text-gray-600">
                    {date.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    , {time}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Service Order Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">{cartItem.service.name}</span>
              <span className="font-medium">
                AED {cartItem.service.price.toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Select Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    paymentMethod === method.id
                      ? "border-[#2596be] bg-blue-50"
                      : "border-gray-200"
                  }`}
                  onClick={() => setPaymentMethod(method.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{method.icon}</span>
                      <span className="text-sm">{method.name}</span>
                    </div>
                    {paymentMethod === method.id && (
                      <div className="h-5 w-5 rounded-full bg-btn-primary flex items-center justify-center">
                        <Check className="h-3 w-3 text-btn-textPrimary" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Apply coupon / voucher</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Enter Voucher Code Here"
                className="flex-1"
              />
              <Button
                variant="primary"
                onClick={handleApplyCoupon}
                className=""
              >
                Apply
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Sub-Total</span>
                <span>AED {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total</span>
                <span>AED {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>AED {tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-4 flex justify-between font-bold">
                <span>Final Total</span>
                <span>AED {total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div>
          <label className="font-medium block mb-2">
            Additional Notes / Information
          </label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any special instructions..."
            className="mb-6"
          />

          <Button
            variant="primary"
            className="w-full py-6 text-lg"
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
