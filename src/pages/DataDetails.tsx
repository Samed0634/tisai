
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateMockData, categoryTitles, WorkplaceItem } from "@/utils/mockData";
import { generateActivityMessage } from "@/utils/activityUtils";
import FilterDropdown from "@/components/FilterDropdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import UpdateWorkplaceDialog from "@/components/UpdateWorkplaceDialog";

const DataDetails = () => {
  const { type } = useParams<{ type: string }>();
  const [selectedCompany, setSelectedCompany] = useState<WorkplaceItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [data, setData] = useState<WorkplaceItem[]>(generateMockData(type || ""));
  const { toast } = useToast();
  const [processDate, setProcessDate] = useState("");

  const title = categoryTitles[type as keyof typeof categoryTitles] || "Detaylar";

  const openUpdateDialog = (company: WorkplaceItem) => {
    setSelectedCompany(company);
    setProcessDate("");
    setIsDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!processDate || !selectedCompany || !type) {
      toast({
        title: "Uyarı",
        description: "Lütfen tarih seçiniz.",
        variant: "destructive"
      });
      return;
    }

    const activityMessage = generateActivityMessage(selectedCompany.name, type);
    
    setData(prevData => prevData.filter(item => item.id !== selectedCompany.id));

    toast({
      title: "İşlem Tamamlandı",
      description: `${selectedCompany.name} için ${activityMessage}.`,
    });

    setIsDialogOpen(false);
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const getStatusClassName = () => {
      switch(status) {
        case "İşlem Bekliyor":
          return "bg-yellow-100 text-yellow-800";
        case "Tamamlandı":
          return "bg-green-100 text-green-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };

    return (
      <Badge variant="outline" className={getStatusClassName()}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <div className="flex items-center gap-2">
          <FilterDropdown />
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>İşyeri Adı</TableHead>
              <TableHead>Sorumlu Uzman</TableHead>
              <TableHead>Şube</TableHead>
              <TableHead>SGK No</TableHead>
              <TableHead>İşçi Sayısı</TableHead>
              <TableHead>Üye Sayısı</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead className="text-right">İşlem</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.responsibleExpert}</TableCell>
                <TableCell>{item.branch}</TableCell>
                <TableCell>{item.sgkNo}</TableCell>
                <TableCell>{item.employeeCount}</TableCell>
                <TableCell>{item.memberCount}</TableCell>
                <TableCell>
                  <StatusBadge status={item.status} />
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

      <UpdateWorkplaceDialog 
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        workplace={selectedCompany}
        processDate={processDate}
        onProcessDateChange={setProcessDate}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default DataDetails;
