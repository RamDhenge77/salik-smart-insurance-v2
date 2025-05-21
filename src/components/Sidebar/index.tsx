import React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCarContext } from "@/context/Context";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  const { collapsed, setCollapsed } = useCarContext();

  return (
    <div
      className={cn(
        "fixed h-screen transition-all duration-300 bg-[#1A1F2C] text-white z-40",
        collapsed ? "w-[60px]" : "w-[240px]"
      )}
    >
      <div className="flex flex-col h-full">
        <div
          className={cn(
            "p-4 flex items-center justify-between",
            collapsed && "justify-center p-2"
          )}
        >
          {!collapsed && <h1 className="text-2xl font-bold">salikGO</h1>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "p-2 rounded-full hover:bg-gray-700/50",
              collapsed ? "mx-auto" : "ml-auto"
            )}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as React.ReactElement<any>, {
                collapsed,
              });
            }
            return child;
          })}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Sidebar);

//  {React.Children.map(children, (child) => {
//             if (React.isValidElement(child)) {
//               return React.cloneElement(child as React.ReactElement<any>, {
//                 collapsed,
//               });
//             }
//             return child;
//           })}
