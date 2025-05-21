import RenewRegistration from "@/components/RenewRegistration";
import { useCarContext } from "@/context/Context";
import React from "react";

const RenewRegistrationPage = () => {
  const { uploadKey } = useCarContext();
  return (
    <>
      <RenewRegistration key={`renewRegistration-${uploadKey}`} />
    </>
  );
};

export default RenewRegistrationPage;
