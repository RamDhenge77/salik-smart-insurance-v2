import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AskAgent from "./AskAgent";
import { X } from "lucide-react";

const ChatWithAgent = ({tripData, chatOpen, setChatOpen}) => {
  return (
    <Popover open={chatOpen} onOpenChange={setChatOpen}>
      <PopoverTrigger asChild>
        <img src="/lovable-uploads/chat.png" className="h-12 w-12 cursor-pointer" alt="" />
      </PopoverTrigger>
      <PopoverContent className="w-[26rem] mr-3 shadow-2xl pt-0 px-0 overflow-hidden">
        <div className="bg-[#2596be] py-1 text-[12px] text-white text-center relative">
          Ask about your Salik data
          {/* <X className="absolute top-1 right-2 h-4 w-4 cursor-pointer" /> */}
        </div>
        <AskAgent tripData={tripData} />
      </PopoverContent>
    </Popover>
  );
};

export default ChatWithAgent;
