
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
    { id: 1, name: "ABC İşyeri", sgkNo: "12345678901", employeeCount: 25, memberCount: 15, dueDate: "2023-04-20", status: "Bekliyor" },
    { id: 2, name: "DEF İşyeri", sgkNo: "23456789012", employeeCount: 40, memberCount: 20, dueDate: "2023-04-18", status: "Tamamlandı" },
    { id: 3, name: "GHI İşyeri", sgkNo: "34567890123", employeeCount: 15, memberCount: 8, dueDate: "2023-04-22", status: "Bekliyor" },
    { id: 4, name: "JKL İşyeri", sgkNo: "45678901234", employeeCount: 60, memberCount: 35, dueDate: "2023-04-19", status: "Tamamlandı" },
    { id: 5, name: "MNO İşyeri", sgkNo: "56789012345", employeeCount: 30, memberCount: 18, dueDate: "2023-04-21", status: "Bekliyor" },
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
      title: "Veri Güncellendi",
      description: `${selectedCompany.name} için veri güncelleme işlemi başarılı.`,
    });

    setIsDialogOpen(false);
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
              <SelectItem value="pending">Bekleyenler</SelectItem>
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
              <TableHead>Termin Tarihi</TableHead>
              <TableHead>Durum</TableHead>
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
                <TableCell>{item.dueDate}</TableCell>
                <TableCell>
                  <span 
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      item.status === "Tamamlandı"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </TableCell>
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
              <DialogTitle>Veri Güncelleme: {selectedCompany.name}</DialogTitle>
              <DialogDescription>
                İşyeri için termin bilgilerini güncelleyin.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="status">Durum</Label>
                <Select defaultValue={selectedCompany.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bekliyor">Bekliyor</SelectItem>
                    <SelectItem value="Tamamlandı">Tamamlandı</SelectItem>
                    <SelectItem value="Ertelendi">Ertelendi</SelectItem>
                    <SelectItem value="İptal">İptal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Termin Tarihi</Label>
                <div className="flex w-full items-center space-x-2">
                  <Button 
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedCompany.dueDate}
                    <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="notes">Notlar</Label>
                <Textarea
                  id="notes"
                  placeholder="Güncelleme ile ilgili notlar..."
                  className="min-h-[100px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                İptal
              </Button>
              <Button onClick={handleUpdate}>
                Güncelle
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default DataDetails;
