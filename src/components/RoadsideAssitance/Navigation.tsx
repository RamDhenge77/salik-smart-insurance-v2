import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Car, MapPin, Phone } from "lucide-react";
import { useCarContext } from "@/context/Context";

type NavigationItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  setPage?: number;
};

const navItems: NavigationItem[] = [
  {
    title: "My Vehicle",
    path: "/vehicle",
    icon: <Car className="mr-2 h-5 w-5" />,
    setPage:5
  },
  {
    title: "My Services",
    path: "/services",
    icon: <MapPin className="mr-2 h-5 w-5" />,
    setPage:2
  },
  {
    title: "Contact Us",
    path: "/contact",
    icon: <Phone className="mr-2 h-5 w-5" />,
    setPage:4
  },
];

export default function Navigation() {
  const {roadsideAssistance,setRoadsideAssistance} = useCarContext();
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              {/* Logo placeholder */}
            </Link>
          </div>
          <div className="hidden md:ml-6 md:flex md:items-center">
            {navItems.map((item) => (
              <div
                key={item.title}
                // to={item.path}
                className="px-4 py-2 rounded-md text-sm font-medium text-salik-gray-600 hover:text-salik-gray-800 hover:bg-salik-gray-50 flex items-center mx-2 transition-colors duration-200 cursor-pointer"
                onClick={() => {
                  setRoadsideAssistance(item.setPage!);
                }}
              >
                {item.icon}
                {item.title}
              </div>
            ))}
          </div>
          <div className="flex items-center">
            {/* User profile or other elements can go here */}
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className="md:hidden border-t border-salik-gray-200">
        <div className="grid grid-cols-3 text-center">
          {navItems.map((item) => (
            <div
              key={item.title}
              // to={item.path}
              className={cn(
                "py-3 px-2 text-xs font-medium flex flex-col items-center justify-center",
                "text-salik-gray-600 hover:text-salik-gray-800 hover:bg-salik-gray-50 transition-colors"
              )}
            >
              <div className="h-6 w-6 mb-1 flex items-center justify-center">
                {item.icon}
              </div>
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
