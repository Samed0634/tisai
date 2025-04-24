
import React, { useState, useEffect, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { TableControls } from "@/components/data-details/TableControls";
import { WorkplaceTable } from "@/components/data-details/WorkplaceTable";
import { SearchToolbar } from "@/components/data-details/SearchToolbar";
import { useColumnVisibility } from "@/hooks/useColumnVisibility";
import { useTableSort } from "@/hooks/useTableSort";
import UpdateWorkplaceDialog from "@/components/UpdateWorkplaceDialog";
import { COLUMNS } from "@/constants/tableColumns";

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

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExpert, setSelectedExpert] = useState("all");

  const experts = useMemo(() => {
    const uniqueExperts = new Set(
      items
        .map((item) => item.responsibleExpert)
        .filter((expert): expert is string => Boolean(expert))
    );
    return Array.from(uniqueExperts).sort();
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = searchQuery.toLowerCase().trim() === "" 
        ? true 
        : (
          (item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
          (item.responsibleExpert?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
          (item.branch?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
        );

      const matchesExpert = selectedExpert === "all" 
        ? true 
        : item.responsibleExpert === selectedExpert;

      return matchesSearch && matchesExpert;
    });
  }, [items, searchQuery, selectedExpert]);

  useEffect(() => {
    if (items.length === 0) {
      console.log("No items found for this category");
    }
  }, [items]);
  
  const processedItems = filteredItems.map((item) => {
    const processedItem: WorkplaceItem = {
      id: item.id || item["İşyeri Adı"] || String(Math.random()),
      name: item.name || item["İşyeri Adı"] || "Unnamed",
      ...item
    };
    
    COLUMNS.forEach(column => {
      if (item[column.id] === undefined) {
        const key = Object.keys(item).find(k => 
          k.replace(/\s+/g, '') === column.id.replace(/\s+/g, '')
        );
        
        if (key) {
          processedItem[column.id] = item[key];
        }
      }
    });
    
    return processedItem;
  });
  
  const { visibleColumns, toggleColumn } = useColumnVisibility();
  const { sortedData } = useTableSort(processedItems);

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

    const activityMessage = `${selectedCompany.name || selectedCompany["İŞYERİ ADI"]} işlemi tamamlandı.`;
    
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
          toggleColumn={toggleColumn}
        />
      </div>

      <SearchToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedExpert={selectedExpert}
        onExpertChange={setSelectedExpert}
        experts={experts}
      />

      <Card>
        <WorkplaceTable
          data={sortedData} 
          onUpdateClick={openUpdateDialog}
          visibleColumns={visibleColumns}
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
