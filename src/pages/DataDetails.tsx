
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
import { useToast } from "@/hooks/use-toast";

// Örnek veri - Gerçek uygulamada API'den gelecek
const callsData = [
  { id: 1, name: "ABC İşyeri", sgkNo: "12345678901", employeeCount: 25, memberCount: 15, callDate: "2023-04-20", status: "Bekliyor" },
  { id: 2, name: "DEF İşyeri", sgkNo: "23456789012", employeeCount: 40, memberCount: 20, callDate: "2023-04-18", status: "Tamamlandı" },
  { id: 3, name: "GHI İşyeri", sgkNo: "34567890123", employeeCount: 15, memberCount: 8, callDate: "2023-04-22", status: "Bekliyor" },
  { id: 4, name: "JKL İşyeri", sgkNo: "45678901234", employeeCount: 60, memberCount: 35, callDate: "2023-04-19", status: "Tamamlandı" },
  { id: 5, name: "MNO İşyeri", sgkNo: "56789012345", employeeCount: 30, memberCount: 18, callDate: "2023-04-21", status: "Bekliyor" },
];

const sessionsData = [
  { id: 1, name: "ABC İşyeri", sgkNo: "12345678901", employeeCount: 25, memberCount: 15, sessionDate: "2023-04-25", status: "Planlandı" },
  { id: 2, name: "PQR İşyeri", sgkNo: "67890123456", employeeCount: 35, memberCount: 22, sessionDate: "2023-04-26", status: "Planlandı" },
  { id: 3, name: "STU İşyeri", sgkNo: "78901234567", employeeCount: 50, memberCount: 30, sessionDate: "2023-04-24", status: "Tamamlandı" },
  { id: 4, name: "VWX İşyeri", sgkNo: "89012345678", employeeCount: 20, memberCount: 12, sessionDate: "2023-04-27", status: "Planlandı" },
  { id: 5, name: "YZA İşyeri", sgkNo: "90123456789", employeeCount: 45, memberCount: 28, sessionDate: "2023-04-23", status: "Tamamlandı" },
];

const dailyData = [
  { id: 1, name: "ABC İşyeri", sgkNo: "12345678901", employeeCount: 25, memberCount: 15, dueDate: "2023-04-17", action: "Çağrı" },
  { id: 2, name: "DEF İşyeri", sgkNo: "23456789012", employeeCount: 40, memberCount: 20, dueDate: "2023-04-17", action: "Oturum" },
  { id: 3, name: "MNO İşyeri", sgkNo: "56789012345", employeeCount: 30, memberCount: 18, dueDate: "2023-04-17", action: "Çağrı" },
  { id: 4, name: "STU İşyeri", sgkNo: "78901234567", employeeCount: 50, memberCount: 30, dueDate: "2023-04-17", action: "Belge" },
  { id: 5, name: "YZA İşyeri", sgkNo: "90123456789", employeeCount: 45, memberCount: 28, dueDate: "2023-04-17", action: "Oturum" },
];

const DataDetails = () => {
  const { type } = useParams();
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // Veri tipine göre başlık belirleme
  let title = "";
  let data: any[] = [];

  switch (type) {
    case "calls":
      title = "Haftalık Çağrı Yapılması Gereken İşyerleri";
      data = callsData;
      break;
    case "sessions":
      title = "Haftalık İlk Oturum Tutulması Gereken İşyerleri";
      data = sessionsData;
      break;
    case "daily":
      title = "Günlük İşyerleri";
      data = dailyData;
      break;
    default:
      title = "Detaylar";
      data = [];
  }

  const openUpdateDialog = (company: any) => {
    setSelectedCompany(company);
    setIsDialogOpen(true);
  };

  const handleUpdate = () => {
    // Güncelleme işlemi burada yapılacak
    // n8n HTTP webhook ile veri güncellemesi

    toast({
      title: "Veri Güncellendi",
      description: `${selectedCompany.name} için veri güncelleme işlemi başarılı.`,
    });

    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="heading-1">{title}</h1>
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
              {type === "calls" && <TableHead>Çağrı Tarihi</TableHead>}
              {type === "sessions" && <TableHead>Oturum Tarihi</TableHead>}
              {type === "daily" && <TableHead>Termin Tarihi</TableHead>}
              {type === "daily" && <TableHead>İşlem</TableHead>}
              {type !== "daily" && <TableHead>Durum</TableHead>}
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
                {type === "calls" && <TableCell>{item.callDate}</TableCell>}
                {type === "sessions" && <TableCell>{item.sessionDate}</TableCell>}
                {type === "daily" && <TableCell>{item.dueDate}</TableCell>}
                {type === "daily" && <TableCell>{item.action}</TableCell>}
                {type !== "daily" && (
                  <TableCell>
                    <span 
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        item.status === "Tamamlandı" || item.status === "Planlandı"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </TableCell>
                )}
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
                İşyeri verisini güncellemek için aşağıdaki formu kullanın.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="status">Durum</Label>
                <Select defaultValue={selectedCompany.status || selectedCompany.action}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bekliyor">Bekliyor</SelectItem>
                    <SelectItem value="Tamamlandı">Tamamlandı</SelectItem>
                    <SelectItem value="Planlandı">Planlandı</SelectItem>
                    <SelectItem value="İptal">İptal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(type === "calls" || type === "sessions") && (
                <div className="grid gap-2">
                  <Label>{type === "calls" ? "Çağrı Tarihi" : "Oturum Tarihi"}</Label>
                  <div className="flex w-full items-center space-x-2">
                    <Button 
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {type === "calls" ? selectedCompany.callDate : selectedCompany.sessionDate}
                      <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </div>
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="notes">Notlar</Label>
                <Input id="notes" placeholder="Güncelleme ile ilgili notlar..." />
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
