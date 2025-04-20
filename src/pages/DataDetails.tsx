
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { generateMockData, categoryTitles, WorkplaceItem } from "@/utils/mockData";
import { generateActivityMessage } from "@/utils/activityUtils";
import { Card } from "@/components/ui/card";
import { TableControls } from "@/components/data-details/TableControls";
import { WorkplaceTable } from "@/components/data-details/WorkplaceTable";
import { useColumnVisibility } from "@/hooks/useColumnVisibility";
import { useTableSort } from "@/hooks/useTableSort";
import UpdateWorkplaceDialog from "@/components/UpdateWorkplaceDialog";

const DataDetails = () => {
  const { type } = useParams<{ type: string }>();
  const [selectedCompany, setSelectedCompany] = useState<WorkplaceItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [data, setData] = useState<WorkplaceItem[]>(generateMockData(type || ""));
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

    const activityMessage = generateActivityMessage(selectedCompany.name, type);
    setData(prevData => prevData.filter(item => item.id !== selectedCompany.id));

    toast({
      title: "İşlem Tamamlandı",
      description: `${selectedCompany.name} için ${activityMessage}.`,
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
