"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, Bot, Send, Loader2 } from "lucide-react";
import { getAiSupportResponse } from "./actions";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "model";
  content: string;
}

export default function SupportChatClient() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content: "¡Hola! Soy el asistente virtual de Fotoprix. ¿En qué puedo ayudarte hoy?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector("div");
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const history = [...messages, userMessage];
    const result = await getAiSupportResponse(history, input.trim());
    
    if ("error" in result) {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error,
      });
      setMessages(prev => prev.slice(0, -1)); 
    } else {
      const botMessage: Message = { role: "model", content: result.response };
      setMessages((prev) => [...prev, botMessage]);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-card">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                message.role === "user" ? "justify-end" : ""
              }`}
            >
              {message.role === "model" && (
                <Avatar className="w-8 h-8 border-2 border-primary/50">
                  <div className="bg-primary/10 flex items-center justify-center h-full w-full">
                     <Bot className="w-5 h-5 text-primary" />
                  </div>
                </Avatar>
              )}
              <div
                className={`relative rounded-2xl px-4 py-2 max-w-[80%] chat-bubble-${message.role}`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
              {message.role === "user" && (
                 <Avatar className="w-8 h-8 border">
                    <AvatarFallback>
                        <User className="w-5 h-5"/>
                    </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
           {isLoading && (
            <div className="flex items-start gap-3">
              <Avatar className="w-8 h-8 border-2 border-primary/50">
                  <div className="bg-primary/10 flex items-center justify-center h-full w-full">
                     <Bot className="w-5 h-5 text-primary" />
                  </div>
              </Avatar>
              <div className="rounded-lg p-3 max-w-[80%] bg-muted flex items-center space-x-2">
                 <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                 <p className="text-sm text-muted-foreground">Pensando...</p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t bg-background">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu pregunta..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            <span className="sr-only">Enviar</span>
          </Button>
        </form>
      </div>
    </div>
  );
}