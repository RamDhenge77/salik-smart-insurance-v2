import React from "react";
import {
  LayoutDashboard,
  Shield,
  Car,
  Calendar,
  Wrench,
  CarFront,
  DollarSign,
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
      className="text-white hover:text-white/90"
      tooltip={label}
    >
      <a href={href} className="flex items-center gap-3">
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </a>
    </SidebarMenuButton>
  </SidebarMenuItem>
);

const SidebarNav = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/", isActive: true },
    { icon: Shield, label: "Insurance", href: "/insurance" },
    { icon: Car, label: "Buy/Sell Car", href: "/buy-sell" },
    { icon: Calendar, label: "Renew Registration", href: "/registration" },
    { icon: Wrench, label: "Maintenance", href: "/maintenance" },
    { icon: CarFront, label: "Car Leasing", href: "/leasing" },
    { icon: DollarSign, label: "Car Financing", href: "/financing" },
  ];

  return (
    <Sidebar
      className="bg-transparent border-none fixed left-0 top-0 h-screen z-50"
      variant="floating"
      collapsible="icon"
      style={
        {
          "--sidebar-width": "14rem",
          "--sidebar-width-icon": "2.5rem",
        } as React.CSSProperties
      }
    >
      <SidebarContent className="mt-4">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isActive={item.isActive}
            />
          ))}
        </SidebarMenu>
      </SidebarContent>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <SidebarTrigger className="bg-[#5a3d25]/70 hover:bg-[#5a3d25] text-white rounded-full" />
      </div>
    </Sidebar>
  );
};

export default SidebarNav;
