
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Bot, Loader2, Send, User } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const ProcedureBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Merhaba! Ben Prosedür Bilgi Botu asistanınızım. İş akışları, prosedürler ve kurallar hakkında sorularınız varsa, bana sorabilirsiniz.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mesajlar güncellendiğinde otomatik olarak en son mesaja kaydırma
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      // Burada OpenAI entegrasyonu ve n8n ile veri sorgulaması yapılacak
      // Örnek olarak direkt cevap döndürelim
      await new Promise((resolve) => setTimeout(resolve, 1000));

      let response = "";
      
      if (input.toLowerCase().includes("prosedür")) {
        response = "Prosedürler, işyerlerinde standart çalışma yöntemlerini belirleyen dokümanlardır. Her departman için ayrı prosedürler bulunmaktadır ve bu prosedürlere uyulması zorunludur.";
      } else if (input.toLowerCase().includes("iş akışı")) {
        response = "İş akışları, belirli bir görevin tamamlanması için gerekli adımları ve bu adımların sırasını gösteren diyagramlardır. İş akışları, prosedürlerin görsel temsilidir.";
      } else if (input.toLowerCase().includes("kural")) {
        response = "Kurallar, işyerinde uyulması gereken davranış standartlarını ve çalışma prensiplerini belirler. Bu kurallar, iş sağlığı ve güvenliği, etik davranışlar ve iş disiplini gibi konuları kapsar.";
      } else {
        response = "Sorunuzla ilgili prosedür bilgilerini aradım. Daha spesifik bir soru sorarsanız size daha iyi yardımcı olabilirim.";
      }

      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Mesaj gönderilirken bir sorun oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="heading-1">Prosedür Bilgi Botu</h1>
      <p className="text-secondary-600">
        İş akışları, prosedürler ve kurallar hakkında bilgi almak için chatbot'a sorularınızı sorabilirsiniz.
      </p>

      <Card className="flex flex-col h-[calc(100vh-240px)]">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.role === "user" ? "justify-end" : ""
              }`}
            >
              {message.role === "assistant" && (
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary-100">
                    <Bot className="h-5 w-5 text-primary-500" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`rounded-lg p-4 max-w-[80%] ${
                  message.role === "user"
                    ? "bg-primary-500 text-white"
                    : "bg-secondary-100"
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs mt-2 opacity-70">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </p>
              </div>
              {message.role === "user" && (
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-secondary-100">
                    <User className="h-5 w-5 text-secondary-500" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Sorunuzu yazın..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              <span className="ml-2">Gönder</span>
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default ProcedureBot;
