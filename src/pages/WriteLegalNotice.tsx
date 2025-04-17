
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Bot, Loader2, Send, User, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

type NoticeState = {
  subject: string | null;
  incident: string | null;
  workplaceName: string | null;
  generatedNotice: string | null;
  currentQuestion: "subject" | "incident" | "workplaceName" | "complete";
};

const WriteLegalNotice = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Merhaba! İhtar yazısı oluşturmak için size birkaç soru soracağım. Lütfen soruları yanıtlayın.",
      timestamp: new Date(),
    },
    {
      id: "question-1",
      role: "assistant",
      content: "İhtar konusu nedir?",
      timestamp: new Date(),
    },
  ]);
  
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [noticeState, setNoticeState] = useState<NoticeState>({
    subject: null,
    incident: null,
    workplaceName: null,
    generatedNotice: null,
    currentQuestion: "subject",
  });
  
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mesajlar güncellendiğinde otomatik olarak en son mesaja kaydırma
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const askNextQuestion = () => {
    let nextQuestion = "";
    let nextState: NoticeState["currentQuestion"] = "subject";
    
    if (noticeState.currentQuestion === "subject") {
      nextQuestion = "Olayı detaylı bir şekilde açıklayabilir misiniz?";
      nextState = "incident";
    } else if (noticeState.currentQuestion === "incident") {
      nextQuestion = "İşyeri adı nedir?";
      nextState = "workplaceName";
    } else if (noticeState.currentQuestion === "workplaceName") {
      nextQuestion = "Teşekkürler! Bilgileriniz alınmıştır. İhtar yazınız hazırlanıyor...";
      nextState = "complete";
      generateLegalNotice();
    }
    
    // Add the next question as a message
    if (nextQuestion) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: "assistant",
        content: nextQuestion,
        timestamp: new Date(),
      }]);
    }
    
    setNoticeState(prev => ({ ...prev, currentQuestion: nextState }));
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
    
    setMessages(prev => [...prev, userMessage]);
    
    // Store the user's answer in the appropriate field
    setNoticeState(prev => {
      if (prev.currentQuestion === "subject") {
        return { ...prev, subject: input };
      } else if (prev.currentQuestion === "incident") {
        return { ...prev, incident: input };
      } else if (prev.currentQuestion === "workplaceName") {
        return { ...prev, workplaceName: input };
      }
      return prev;
    });
    
    setInput("");
    
    // Wait a moment before asking the next question
    setTimeout(() => {
      askNextQuestion();
    }, 500);
  };

  const generateLegalNotice = () => {
    setIsLoading(true);

    // Simulating API request delay
    setTimeout(() => {
      const { subject, incident, workplaceName } = noticeState;
      
      // Generate a template legal notice based on the inputs
      const generatedText = `
İHTAR

Sayın ${workplaceName} İşveren Yetkilisi,

KONU: ${subject}

İLGİ: Şirketinizde yaşanan olaylar ve 6356 sayılı Sendikalar ve Toplu İş Sözleşmesi Kanunu hükümleri

Sendikamız, işyerinizde çalışan üyelerimizin bildirdiği aşağıdaki olaylar hakkında yasal haklarımızı kullanma gereği duymuştur:

OLAY: ${incident}

Yargıtay'ın emsal kararlarında belirtildiği üzere (Yargıtay 9. Hukuk Dairesi, E. 2018/5214, K. 2019/16782), işverenin işçilerin sendika üyeliği ve sendikal faaliyetlerine müdahale etmesi, 6356 sayılı Kanun'un açık ihlali niteliğindedir.

Bu doğrultuda, işyerinizde yaşanan ve yukarıda belirtilen olayların derhal sona erdirilmesini, sendikal haklara saygı gösterilmesini ve yasalara uygun davranmanızı ihtar ediyoruz.

Aksi halde yasal yollara başvuracağımızı bildiririz.

Saygılarımızla,

[Sendika Yetkilisi]
[Tarih]
      `;
      
      setNoticeState(prev => ({ ...prev, generatedNotice: generatedText }));
      setIsLoading(false);
      
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: "assistant",
        content: "İhtar yazınız hazır! 'İhtar Metni' sekmesinden yazınızı görüntüleyebilirsiniz.",
        timestamp: new Date(),
      }]);
    }, 2000);
  };
  
  const copyToClipboard = () => {
    if (noticeState.generatedNotice) {
      navigator.clipboard.writeText(noticeState.generatedNotice);
      toast({
        title: "Kopyalandı",
        description: "İhtar metni panoya kopyalandı.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">İhtar Yazısı Yaz</h1>
      <p className="text-muted-foreground">
        Chatbot ile konuşarak yargı kararları ışığında ihtar yazısı oluşturun.
      </p>

      <Tabs defaultValue="chat" className="w-full">
        <TabsList>
          <TabsTrigger value="chat">Chatbot</TabsTrigger>
          <TabsTrigger value="notice" disabled={!noticeState.generatedNotice}>İhtar Metni</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat">
          <Card className="flex flex-col h-[calc(100vh-310px)]">
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
                  placeholder="Mesajınızı yazın..."
                  disabled={isLoading || noticeState.currentQuestion === "complete"}
                  className="flex-1"
                />
                <Button 
                  type="submit" 
                  disabled={isLoading || !input.trim() || noticeState.currentQuestion === "complete"}
                >
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
        </TabsContent>
        
        <TabsContent value="notice">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">İhtar Metni</h3>
              <Button onClick={copyToClipboard} variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Kopyala
              </Button>
            </div>
            <Textarea 
              value={noticeState.generatedNotice || ""} 
              readOnly 
              className="min-h-[400px] font-mono whitespace-pre-wrap"
            />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WriteLegalNotice;
