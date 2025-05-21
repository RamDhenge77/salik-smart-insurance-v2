import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { CarContextProvider } from "./context/Context";
import RoadsideAssitanceLayout from "./components/RoadsideAssitance/RoadsideAssitanceLayout";
import RoadsideAssitance from "./pages/RoadsideAssitancePage";
import RoadSideServices from "./components/RoadsideAssitance/Services";
import { BookingProvider } from "./context/BookingContext";
import UserProfilePage from "./pages/UserProfilePage";
import LandingLayout from "./components/Layouts/LandingLayout";
import DashboardLayout from "./components/Layouts/DashboardLayout";
import Dashboard from "./components/dashboard/Dashboard";
import LandingPage from "./components/dashboard/LandingPage";
import { FinanceProvider } from "./context/FinanceContext";
import ServiceHistoryPage from "./components/ServicesHistory";
import DrivingAnalyticsPage from "./pages/DrivingAnalyticsPage";
import Insurance from "./components/Insurance";
import BuySellCar from "./pages/BuySellCar";
import RenewRegistrationPage from "./pages/RenewRegistrationPage";
import Maintenance from "./components/Maintenance";
import HireDriver from "./components/HireDriver/HireDriver";
import CarLeasing from "./components/CarLeasing";
import CarFinancing from "./components/CarFinancing";

const queryClient = new QueryClient();

const App = () => (
  <CarContextProvider>
    <QueryClientProvider client={queryClient}>
      <BookingProvider>
        <FinanceProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route element={<LandingLayout />}>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/user-profile" element={<UserProfilePage />} />
                  <Route path="/service-history" element={<ServiceHistoryPage />} />

                  <Route element={<DashboardLayout />}>
                    {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                    <Route path="/dashboard" element={<DrivingAnalyticsPage />} />
                    <Route path="/insurance" element={<Insurance />} />
                    <Route path="/buy-sell" element={<BuySellCar />} />
                    <Route path="/registration" element={<RenewRegistrationPage />} />
                    <Route path="/maintenance" element={<Maintenance />} />
                    <Route path="/hire-driver" element={<HireDriver />} />
                    <Route path="/car-leasing" element={<CarLeasing />} />
                    <Route path="/car-financing" element={<CarFinancing />} />
                  </Route>
                </Route>

                <Route element={<RoadsideAssitanceLayout />}>
                  <Route
                    path="/roadside-assistance"
                    element={<RoadsideAssitance />}
                  />
                  <Route
                    path="/roadside-assistance/services"
                    element={<RoadSideServices />}
                  />

                  <Route
                    path="/roadside-assistance"
                    element={<RoadsideAssitance />}
                  />
                  <Route
                    path="/roadside-assistance/services"
                    element={<RoadSideServices />}
                  />
                </Route>
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </FinanceProvider>
      </BookingProvider>
    </QueryClientProvider>
  </CarContextProvider>
);

export default App;
