import React, {useState} from "react";
import Index from "@/components/GetWarranty/Index";
import Eligibility from "@/components/GetWarranty/Eligibility";
import Coverage from "@/components/GetWarranty/Coverage";
import Pricing from "@/components/GetWarranty/Pricing";
import Customer from "@/components/GetWarranty/Customer";
import Payment from "@/components/GetWarranty/Payment";
import Confirmation from "@/components/GetWarranty/Confirmation";
import Dashboard from "@/components/GetWarranty/Dashboard";

const GetWarrantyPage = () => {
  const [getWarranty, setGetWarranty ] = useState(1);

  const renderGetWarranty = () => {
    switch (getWarranty) {
      case 1:
        return <Index setGetWarranty={setGetWarranty} />;
      case 2:
        return <Eligibility setGetWarranty={setGetWarranty} />;
      case 3:
        return <Coverage setGetWarranty={setGetWarranty} />;
      case 4:
        return <Pricing setGetWarranty={setGetWarranty} />;
      case 5:
        return <Customer setGetWarranty={setGetWarranty} />;
      case 6:
        return <Payment setGetWarranty={setGetWarranty} />;
      case 7:
        return <Confirmation setGetWarranty={setGetWarranty} />;
      case 8:
        return <Dashboard />;
      default:
        return <div>No data found</div>;
    }
  };

  return (
    <div>
      {renderGetWarranty()}
    </div>
  );
};

export default GetWarrantyPage;
