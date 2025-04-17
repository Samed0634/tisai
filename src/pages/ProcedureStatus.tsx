
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { getProcedureStatusData } from "@/utils/procedureStatusData";

const ProcedureStatus = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const procedureData = getProcedureStatusData();
  
  // Filter data based on search query
  const filteredData = procedureData.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.responsibleExpert.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.branch.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Tüm Prosedür Durumu</h1>
      </div>
      
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="İşyeri veya uzman ara..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>İşyeri Adı</TableHead>
              <TableHead>Sorumlu Uzman</TableHead>
              <TableHead>Şube</TableHead>
              <TableHead>İşçi Sayısı</TableHead>
              <TableHead>Üye Sayısı</TableHead>
              <TableHead>Güncel Durum</TableHead>
              <TableHead>Son İşlem Tarihi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.responsibleExpert}</TableCell>
                  <TableCell>{item.branch}</TableCell>
                  <TableCell>{item.employeeCount}</TableCell>
                  <TableCell>{item.memberCount}</TableCell>
                  <TableCell>
                    <span 
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        item.currentStatus
                      )}`}
                    >
                      {item.currentStatus}
                    </span>
                  </TableCell>
                  <TableCell>{getLastActionDate(item)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                  Sonuç bulunamadı
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

// Helper function to get status color based on current status
const getStatusColor = (status: string): string => {
  switch (status) {
    case "Yetki Belgesi Bekleniyor":
      return "bg-blue-100 text-blue-800";
    case "Çağrı Bekleniyor":
      return "bg-amber-100 text-amber-800";
    case "İlk Oturum Bekleniyor":
      return "bg-purple-100 text-purple-800";
    case "Müzakere Sürecinde":
      return "bg-green-100 text-green-800";
    case "Uyuşmazlık Bildirimi Bekleniyor":
      return "bg-orange-100 text-orange-800";
    case "Grev Kararı Bekleniyor":
      return "bg-red-100 text-red-800";
    case "YHK'ya Gönderilme Bekleniyor":
      return "bg-teal-100 text-teal-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Helper function to get the last action date
const getLastActionDate = (item: any): string => {
  const dates = item.dates;
  if (!dates) return "-";

  // Find the most recent date
  const dateKeys = Object.keys(dates) as Array<keyof typeof dates>;
  if (dateKeys.length === 0) return "-";

  // Sort dates by most recent first
  const sortedDates = dateKeys
    .filter(key => dates[key]) // Filter out undefined dates
    .sort((a, b) => {
      const dateA = new Date(dates[a] || "");
      const dateB = new Date(dates[b] || "");
      return dateB.getTime() - dateA.getTime();
    });

  if (sortedDates.length === 0) return "-";
  
  // Format the date to a more readable Turkish format (DD.MM.YYYY)
  const mostRecentDate = dates[sortedDates[0]];
  if (!mostRecentDate) return "-";
  
  const date = new Date(mostRecentDate);
  return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
};

export default ProcedureStatus;
