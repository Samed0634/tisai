
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Bot, Loader2, Send, User, Search } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

// Mock court decisions for demonstration
const courtDecisionsMock = {
  "sendika": [
    {
      court: "Yargıtay 9. Hukuk Dairesi",
      decisionNumber: "E. 2018/5214, K. 2019/16782",
      date: "12.09.2019",
      summary: "İşverenin sendikal faaliyetlere müdahalesi, sendikal tazminat gerektiren bir işlem olarak değerlendirilmiştir."
    },
    {
      court: "Yargıtay 22. Hukuk Dairesi",
      decisionNumber: "E. 2017/12451, K. 2020/3455",
      date: "24.02.2020",
      summary: "İşçinin sendika üyeliği nedeniyle işten çıkarılması halinde, işe iade davası ile birlikte sendikal tazminat talep edilebilir."
    }
  ],
  "fazla mesai": [
    {
      court: "Yargıtay 9. Hukuk Dairesi",
      decisionNumber: "E. 2019/8754, K. 2020/12340",
      date: "17.11.2020",
      summary: "Fazla çalışmanın ispatı konusunda işçinin imzasını içermeyen puantaj kayıtları tek başına yeterli değildir."
    },
    {
      court: "Yargıtay 22. Hukuk Dairesi",
      decisionNumber: "E. 2018/9812, K. 2021/5182",
      date: "08.04.2021",
      summary: "Fazla çalışma ücretinin hesabında, 270 saati aşan kısım için %50, tatillerde yapılan çalışmalar için %100 zamlı ücret ödenmelidir."
    }
  ],
  "kıdem tazminatı": [
    {
      court: "Yargıtay 9. Hukuk Dairesi",
      decisionNumber: "E. 2020/2154, K. 2021/8945",
      date: "21.06.2021",
      summary: "İşçinin emeklilik nedeniyle işten ayrılması halinde, kıdem tazminatına hak kazanır."
    },
    {
      court: "Yargıtay 22. Hukuk Dairesi",
      decisionNumber: "E. 2019/7865, K. 2020/9876",
      date: "14.09.2020",
      summary: "Kıdem tazminatı hesabında, işçinin son brüt ücreti esas alınır ve işçinin çalıştığı her tam yıl için 30 günlük ücreti tutarında ödenir."
    }
  ],
  "ihbar tazminatı": [
    {
      court: "Yargıtay 9. Hukuk Dairesi",
      decisionNumber: "E. 2018/3214, K. 2019/11782",
      date: "05.10.2019",
      summary: "İşçinin iş sözleşmesinin haklı nedenle feshi halinde, ihbar tazminatı ödenmez."
    },
    {
      court: "Yargıtay 22. Hukuk Dairesi",
      decisionNumber: "E. 2020/5421, K. 2021/2345",
      date: "18.02.2021",
      summary: "İhbar tazminatı, işçinin kıdemine göre hesaplanır ve işçiye bildirim süresine ait ücret peşin ödenmişse, ihbar tazminatının hesabında dikkate alınmalıdır."
    }
  ],
  "yıllık izin": [
    {
      court: "Yargıtay 9. Hukuk Dairesi",
      decisionNumber: "E. 2017/9854, K. 2018/16752",
      date: "20.11.2018",
      summary: "İşçinin kullanmadığı yıllık izin ücretleri, iş sözleşmesinin sona ermesi halinde ödenir."
    },
    {
      court: "Yargıtay 22. Hukuk Dairesi",
      decisionNumber: "E. 2019/4521, K. 2020/7856",
      date: "10.07.2020",
      summary: "Yıllık izin hakkından feragat edilemez ve izin hakkı zaman aşımına uğramaz."
    }
  ]
};

const CourtDecisionQuery = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Merhaba! Yargı kararları hakkında bilgi almak için karar konusunu yazabilirsiniz. Örneğin: \"sendika\", \"fazla mesai\", \"kıdem tazminatı\", \"ihbar tazminatı\", \"yıllık izin\" gibi.",
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

  const findRelevantDecisions = (query: string) => {
    // Normalize query - convert to lowercase and remove special characters
    const normalizedQuery = query.toLowerCase().trim();
    
    // Check if the query directly matches any of our categories
    for (const [category, decisions] of Object.entries(courtDecisionsMock)) {
      if (normalizedQuery.includes(category)) {
        return { category, decisions };
      }
    }
    
    // If no direct match, try to find partial matches
    for (const [category, decisions] of Object.entries(courtDecisionsMock)) {
      // If query is at least 3 characters and is part of a category
      if (normalizedQuery.length >= 3 && category.includes(normalizedQuery)) {
        return { category, decisions };
      }
    }
    
    // If still no matches, return nothing
    return null;
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
      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const searchResults = findRelevantDecisions(input);
      
      let responseContent = "";
      
      if (searchResults) {
        responseContent = `"${searchResults.category}" konusunda bulunan yargı kararları:\n\n`;
        
        searchResults.decisions.forEach((decision, index) => {
          responseContent += `${index + 1}. ${decision.court} - ${decision.decisionNumber} (${decision.date})\n${decision.summary}\n\n`;
        });
        
        responseContent += "Başka bir konuda bilgi almak isterseniz, konuyu yazabilirsiniz.";
      } else {
        responseContent = "Aradığınız konuyla ilgili yargı kararı bulunamadı. Lütfen başka bir konu arayın veya daha genel bir arama terimi kullanın. Örnek konular: sendika, fazla mesai, kıdem tazminatı, ihbar tazminatı, yıllık izin.";
      }
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: responseContent,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Yargı kararları aranırken bir sorun oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Yargı Kararı Sor</h1>
      <p className="text-muted-foreground">
        Hukuki konular hakkında yargı kararlarını sorgulayın.
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
              placeholder="Karar konusu yazın..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              <span className="ml-2">Ara</span>
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default CourtDecisionQuery;
