
import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { TableControls } from "@/components/data-details/TableControls";
import { WorkplaceTable } from "@/components/data-details/WorkplaceTable";
import { useColumnVisibility } from "@/hooks/useColumnVisibility";
import { useTableSort } from "@/hooks/useTableSort";
import UpdateWorkplaceDialog from "@/components/UpdateWorkplaceDialog";

// Define the category titles map
export const categoryTitles: Record<string, string> = {
  "authorization-requests": "Yetki Tespiti İstenecek İşyerleri",
  "authorization-notices": "Yetki Belgesi Tebliğ Yapılan İşyerleri",
  "call-required": "Çağrı Yapılacak İşyerleri",
  "place-date-determination": "Yer ve Gün Tespiti Yapılacak İşyerleri",
  "pre-determined-first-session": "Önceden Belirlenen İlk Oturum İşyerleri",
  "first-session": "İlk Oturum Tutulması Gereken İşyerleri",
  "dispute-notices": "Uyuşmazlık Bildirimi Yapılması Gereken İşyerleri",
  "mediator-appointment-deadline": "Arabulucu Ataması Son Tarih İşyerleri",
  "strike-decisions": "Grev Kararı Alınması Gereken İşyerleri",
  "strike-voting": "Grev Oylaması Yapılması Gereken İşyerleri",
  "yhk-submissions": "YHK'ya Gönderilmesi Gereken İşyerleri",
  "yhk-reminder": "YHK Hatırlatması Yapılacak İşyerleri",
  "signed-tis": "İmzalanan TİSler",
  "expiring-tis": "Sona Erecek TİSler",
  "strike-ban": "Grev Yasağı Olan İşyerleri"
};

interface WorkplaceItem {
  id: string;
  name: string;
  responsibleExpert?: string;
  branch?: string;
  sgkNo?: string;
  employeeCount?: number;
  memberCount?: number;
  status?: string;
  [key: string]: any;
}

const DataDetails = () => {
  const { type } = useParams<{ type: string }>();
  const location = useLocation();
  const items = (location.state?.items || []) as WorkplaceItem[];
  const [selectedCompany, setSelectedCompany] = useState<WorkplaceItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [processDate, setProcessDate] = useState("");
  const { toast } = useToast();
  
  // Handle API field mapping for column visibility
  const mapApiFieldsToColumnIds = (item: WorkplaceItem) => {
    if (!item) return {};
    
    const fieldMap: Record<string, string> = {
      "İşyeri Adı": "name",
      "Bağlı Olduğu Şube": "branch",
      "Sorumlu Uzman": "responsibleExpert",
      "İl": "province",
      "İşyeri Türü": "workplaceType",
      "SGK No": "sgkNo",
      "İşçi Sayısı": "employeeCount",
      "Üye Sayısı": "memberCount"
    };
    
    return Object.entries(item).reduce((acc, [key, value]) => {
      const mappedKey = fieldMap[key] || key;
      return { ...acc, [mappedKey]: value };
    }, {});
  };

  // Ensure that items are transformed to match WorkplaceItem interface
  const processedItems = items.map((item) => {
    // Make sure each item has at least id and name properties
    return {
      id: item.id || item["İşyeri Adı"] || String(Math.random()),
      name: item.name || item["İşyeri Adı"] || "Unnamed",
      ...item
    };
  });
  
  const { visibleColumns, toggleColumn } = useColumnVisibility();
  const { sortKey, sortOrder, handleSort, sortedData } = useTableSort(processedItems);

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

    const activityMessage = `${selectedCompany.name || selectedCompany["İşyeri Adı"]} işlemi tamamlandı.`;
    
    toast({
      title: "İşlem Tamamlandı",
      description: activityMessage,
    });

    setIsDialogOpen(false);
  };

  // Get all dynamic columns from data
  const getAllColumns = () => {
    if (items.length === 0) return [];
    
    return Object.keys(items[0]).filter(key => key !== 'id');
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
          data={processedItems} 
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
