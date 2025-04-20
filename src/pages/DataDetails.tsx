
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { TableControls } from "@/components/data-details/TableControls";
import { WorkplaceTable } from "@/components/data-details/WorkplaceTable";
import { useColumnVisibility } from "@/hooks/useColumnVisibility";
import { useTableSort } from "@/hooks/useTableSort";
import UpdateWorkplaceDialog from "@/components/UpdateWorkplaceDialog";

interface WorkplaceItem {
  id: string;
  name: string;
  responsibleExpert: string;
  branch: string;
  sgkNo: string;
  employeeCount: number;
  memberCount: number;
  status: 'İşlem Bekliyor' | 'Tamamlandı';
}

export const categoryTitles: Record<string, string> = {
  "authorization-requests": "Yetki Tespiti İstenecek İşyerleri",
  "authorization-notices": "Yetki Belgesi Tebliğ Yapılan İşyerleri",
  "call-required": "Çağrı Yapılacak İşyerleri",
  "first-session": "İlk Oturum Tutulması Gereken İşyerleri",
  "dispute-notices": "Uyuşmazlık Bildirimi Yapılması Gereken İşyerleri",
  "strike-decisions": "Grev Kararı Alınması Gereken İşyerleri",
  "yhk-submissions": "YHK'ya Gönderilmesi Gereken İşyerleri"
};

const DataDetails = () => {
  const { type } = useParams<{ type: string }>();
  const [selectedCompany, setSelectedCompany] = useState<WorkplaceItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [data, setData] = useState<WorkplaceItem[]>([]);
  const { toast } = useToast();
  const [processDate, setProcessDate] = useState("");
  
  const { visibleColumns, toggleColumn } = useColumnVisibility();
  const { sortKey, sortOrder, handleSort, sortedData } = useTableSort(data);

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

    const activityMessage = `${selectedCompany.name} işlemi tamamlandı.`;
    setData(prevData => prevData.filter(item => item.id !== selectedCompany.id));

    toast({
      title: "İşlem Tamamlandı",
      description: activityMessage,
    });

    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <TableControls
          visibleColumns={visibleColumns}
          sortKey={sortKey}
          handleSort={handleSort}
          toggleColumn={toggleColumn}
        />
      </div>

      <Card>
        <WorkplaceTable
          visibleColumns={visibleColumns}
          sortKey={sortKey}
          data={sortedData}
          onUpdateClick={openUpdateDialog}
        />
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
