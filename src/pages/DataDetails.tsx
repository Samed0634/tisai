
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, ChevronDown, Edit, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Sample data for different categories - In real app, this would come from API
const generateMockData = (type) => {
  const baseData = [
    { id: 1, name: "ABC İşyeri", sgkNo: "12345678901", employeeCount: 25, memberCount: 15, processDate: "2023-04-20" },
    { id: 2, name: "DEF İşyeri", sgkNo: "23456789012", employeeCount: 40, memberCount: 20, processDate: "2023-04-18" },
    { id: 3, name: "GHI İşyeri", sgkNo: "34567890123", employeeCount: 15, memberCount: 8, processDate: "2023-04-22" },
    { id: 4, name: "JKL İşyeri", sgkNo: "45678901234", employeeCount: 60, memberCount: 35, processDate: "2023-04-19" },
    { id: 5, name: "MNO İşyeri", sgkNo: "56789012345", employeeCount: 30, memberCount: 18, processDate: "2023-04-21" },
  ];
  
  return baseData;
};

// Map category IDs to their titles
const categoryTitles = {
  "authorization-requests": "Yetki Tespiti İstenecek İşyerleri",
  "authorization-notices": "Yetki Belgesi Tebliğ Yapılan İşyerleri",
  "call-required": "Çağrı Yapılacak İşyerleri",
  "first-session": "İlk Oturum Tutulması Gereken İşyerleri",
  "dispute-notices": "Uyuşmazlık Bildirimi Yapılması Gereken İşyerleri",
  "strike-decisions": "Grev Kararı Alınması Gereken İşyerleri",
  "yhk-submissions": "YHK'ya Gönderilmesi Gereken İşyerleri",
  "calls": "Haftalık Çağrı Yapılması Gereken İşyerleri",
  "sessions": "Haftalık İlk Oturum Tutulacak İşyerleri",
  "daily": "Günlük İşyerleri"
};

const DataDetails = () => {
  const { type } = useParams();
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // Get data based on the category type
  const data = generateMockData(type);
  
  // Get title for the current category
  const title = categoryTitles[type] || "Detaylar";

  const openUpdateDialog = (company) => {
    setSelectedCompany(company);
    setIsDialogOpen(true);
  };

  const handleUpdate = () => {
    // In real app: Update data in the database via API call
    toast({
      title: "İşlem Tamamlandı",
      description: `${selectedCompany.name} için işlem tamamlanmıştır.`,
    });

    // Add to recent activities
    const activityMessage = generateActivityMessage(selectedCompany.name, type);
    
    setIsDialogOpen(false);
  };
  
  const generateActivityMessage = (companyName, categoryType) => {
    const categoryMap = {
      "authorization-requests": "yetki tespiti istenmiştir",
      "authorization-notices": "yetki belgesi tebliğ edilmiştir",
      "call-required": "çağrı yapılmıştır",
      "first-session": "ilk oturum tutulmuştur",
      "dispute-notices": "uyuşmazlık bildirimi yapılmıştır",
      "strike-decisions": "grev kararı alınmıştır",
      "yhk-submissions": "YHK'ya gönderilmiştir",
    };
    
    return `${companyName} işyerinde ${categoryMap[categoryType] || "işlem yapılmıştır"}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <div className="flex items-center gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filtrele" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tümü</SelectItem>
              <SelectItem value="pending">İşlem Bekleyenler</SelectItem>
              <SelectItem value="completed">Tamamlananlar</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>İşyeri Adı</TableHead>
              <TableHead>SGK No</TableHead>
              <TableHead>İşçi Sayısı</TableHead>
              <TableHead>Üye Sayısı</TableHead>
              <TableHead>İşlem Yapılan Tarih</TableHead>
              <TableHead className="text-right">İşlem</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.sgkNo}</TableCell>
                <TableCell>{item.employeeCount}</TableCell>
                <TableCell>{item.memberCount}</TableCell>
                <TableCell>{item.processDate}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => openUpdateDialog(item)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {selectedCompany && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>İşlem Tamamlama: {selectedCompany.name}</DialogTitle>
              <DialogDescription>
                İşyeri için işlem bilgilerini güncelleyin.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>İşlem Yapılan Tarih</Label>
                <div className="flex w-full items-center space-x-2">
                  <Button 
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedCompany.processDate}
                    <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="notes">Notlar</Label>
                <Textarea
                  id="notes"
                  placeholder="İşlem ile ilgili notlar..."
                  className="min-h-[100px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                İptal
              </Button>
              <Button onClick={handleUpdate}>
                İşlemi Tamamla
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default DataDetails;
