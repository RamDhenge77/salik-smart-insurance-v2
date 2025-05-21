import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ServiceOptionCardProps = {
  title: string;
  icon?: React.ReactNode;
  description?: string;
  selected?: boolean;
  onClick: () => void;
};

export default function ServiceOptionCard({
  title,
  icon,
  description,
  selected = false,
  onClick,
}: ServiceOptionCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md border-2 overflow-hidden h-full",
        selected
          ? "!border-[#2595be58] !bg-[#6cd1f529] shadow-sm"
          : "border-salik-gray-200 hover:border-salik-gray-400"
      )}
      onClick={onClick}
    >
      <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
        {icon && (
          <div className={cn(
            "mb-3 p-3 rounded-full bg-[#F0F8FA] transition-colors",
            selected ? "bg-[#6cd0f585]" : ""
          )}>
            <div className={cn(
              "text-salik-gray-600",
              selected ? "text-salik-gray-800" : ""
            )}>
              {icon}
            </div>
          </div>
        )}
        <h3 className={cn(
          "font-medium text-base mb-1",
          selected ? "text-salik-gray-800" : "text-salik-gray-700"
        )}>
          {title}
        </h3>
        {description && (
          <p className={cn(
            "text-xs",
            selected ? "text-salik-gray-600" : "text-salik-gray-500"
          )}>
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}