import React, { useState } from "react";
import {
  LayoutDashboard,
  Shield,
  Car,
  Calendar,
  Wrench,
  CarFront,
  DollarSign,
  CircleUserRound,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive?: boolean;
}

const SidebarItem = ({
  icon: Icon,
  label,
  href,
  isActive = false,
}: SidebarItemProps) => (
  <SidebarMenuItem>
    <SidebarMenuButton
      asChild
      isActive={isActive}
      className="text-white hover:text-black transition-all duration-200"
      tooltip={label}
    >
      <Link to={href} className="flex items-center gap-3">
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </Link>
    </SidebarMenuButton>
  </SidebarMenuItem>
);

// const [isActive, setIsActive] = useState(false);
const SidebarNav = () => {
  const location = useLocation();
  const menuItems = [
    { icon: LayoutDashboard, label: "Analytics", href: "/dashboard" },
    { icon: Shield, label: "Insurance", href: "/insurance" },
    { icon: Car, label: "Buy/Sell Car", href: "/buy-sell" },
    { icon: Calendar, label: "Renew Registration", href: "/registration" },
    { icon: Wrench, label: "Maintenance", href: "/maintenance" },
    { icon: CircleUserRound, label: "Hire a Driver", href: "/hire-driver" },
    { icon: CarFront, label: "Car Leasing", href: "/car-leasing" },
    { icon: DollarSign, label: "Car Financing", href: "/car-financing" },
  ];

  return (
    <Sidebar
      className="!bg-transparent border-none fixed left-0 top-0 h-screen z-50"
      variant="floating"
      collapsible="icon"
      style={
        {
          "--sidebar-width": "14rem",
          "--sidebar-width-icon": "2.5rem",
          background: "transparent",
        } as React.CSSProperties
      }
    >
      <SidebarContent className="mt-10">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isActive={location.pathname === item.href}
            />
          ))}
        </SidebarMenu>
      </SidebarContent>
      <div className="absolute top-4 right-[.3rem] -translate-x-1/2">
        <SidebarTrigger className="bg-[#5a3d25]/70 hover:bg-[#5a3d25] text-white rounded-full" />
      </div>
    </Sidebar>
  );
};

export default SidebarNav;
