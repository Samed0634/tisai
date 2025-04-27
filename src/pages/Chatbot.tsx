
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

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Merhaba! Ben TISAI, Prosedür asistanınızım. Prosedür sistemindeki herhangi bir veri hakkında sorularınız varsa, bana sorabilirsiniz.",
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
      
      if (input.toLowerCase().includes("çağrı")) {
        response = "Bu hafta çağrı yapılması gereken 12 işyeri bulunmaktadır. Bu işyerlerinin detaylarını Dashboard ekranından görüntüleyebilirsiniz.";
      } else if (input.toLowerCase().includes("oturum")) {
        response = "Bu hafta ilk oturum yapılması gereken 8 işyeri bulunmaktadır. İlk oturum tarihleri ve detayları için Dashboard ekranına bakabilirsiniz.";
      } else if (input.toLowerCase().includes("günlük")) {
        response = "Bugün 5 işyeri için işlem yapmanız gerekmektedir. Bu işlemlerin 3'ü çağrı, 2'si ise belge teslimi ile ilgilidir.";
      } else if (input.toLowerCase().includes("işçi") || input.toLowerCase().includes("üye")) {
        response = "Sistemde kayıtlı işyerlerinde toplam 320 işçi bulunmakta ve bunların 198'i üyedir. Üyelik oranı %61.87'dir.";
      } else {
        response = "Sorunuzla ilgili veri tabanımda arama yaptım. Daha spesifik bir soru sorarsanız size daha iyi yardımcı olabilirim. Örneğin, belirli bir işyeri hakkında bilgi isteyebilir veya çağrı ve oturum tarihlerini sorabilirsiniz.";
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
      <h1 className="heading-1">Bilgi Alma</h1>
      <p className="text-secondary-600">
        Chatbot'a sorularınızı sorarak sistemdeki veriler hakkında bilgi alabilirsiniz.
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

export default Chatbot;
