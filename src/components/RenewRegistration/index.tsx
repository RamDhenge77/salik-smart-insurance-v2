import { useCarContext } from '@/context/Context'
import React from 'react'
import RequestInspectionPage from './RequestInspectionPage';
import SchedulePickupPage from './SchedulePickupPage';
import LocationPage from './LocationPage';
import DestinationPage from './DestinationPage';
import ServiceOptionsPage from './ServiceOptionsPage';
import ConfirmPickupPage from './ConfirmPickupPage';
import BookingInfoPage from './BookingInfoPage';

const RenewRegistration = () => {
  const {registrationSteps, setRegistrationSteps} = useCarContext();
  const renderComponent = () => {
    switch(registrationSteps){
      case 1:
        return <RequestInspectionPage />;
      case 2:
        return <SchedulePickupPage />;
      case 3:
        return <LocationPage />;
      case 4:
        return <DestinationPage />;

      case 5:
        return <ServiceOptionsPage />;

      case 6:
        return <ConfirmPickupPage />;

      case 7:
        return <BookingInfoPage />;

      default:
        return <RequestInspectionPage />;
    }
  }
  return (
    <div>
      {renderComponent()}
    </div>
  )
}

export default RenewRegistration
