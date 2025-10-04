"use client";

import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SupportChatClient from "@/app/support/support-chat-client";
import { PopoverHeader, PopoverTitle } from "@/components/ui/popover";

export default function FloatingSupportButton() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-primary hover:bg-primary/90 shadow-lg transition-transform hover:scale-110"
          aria-label="Abrir chat de soporte"
        >
          <MessageSquare className="h-8 w-8 text-primary-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={16}
        align="end"
        className="w-[calc(100vw-32px)] sm:w-[400px] h-[70vh] flex flex-col p-0 rounded-2xl"
      >
        <div className="p-4 border-b">
          <h3 className="font-semibold text-lg">Asistente Virtual Fotoprix</h3>
        </div>
        <div className="flex-grow overflow-hidden">
          <SupportChatClient />
        </div>
      </PopoverContent>
    </Popover>
  );
}