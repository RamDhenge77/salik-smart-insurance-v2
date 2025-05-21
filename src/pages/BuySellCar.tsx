import BuyCar from "@/components/BuyCar";
import { useCarContext } from "@/context/Context";
import React from "react";

const BuySellCar = () => {
  const { uploadKey } = useCarContext();
  return (
    <div>
      <BuyCar key={`buycar-${uploadKey}`} uploadKey={uploadKey} />
    </div>
  );
};

export default BuySellCar;
