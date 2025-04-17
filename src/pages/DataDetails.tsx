
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { generateMockData, categoryTitles, WorkplaceItem } from "@/utils/mockData";
import { generateActivityMessage } from "@/utils/activityUtils";
import FilterDropdown from "@/components/FilterDropdown";
import WorkplaceTable from "@/components/WorkplaceTable";
import UpdateWorkplaceDialog from "@/components/UpdateWorkplaceDialog";

const DataDetails = () => {
  const { type } = useParams<{ type: string }>();
  const [selectedCompany, setSelectedCompany] = useState<WorkplaceItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [data, setData] = useState<WorkplaceItem[]>(generateMockData(type || ""));
  const { toast } = useToast();
  const [processDate, setProcessDate] = useState("");

  // Get title for the current category
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

    // Update status and create activity
    const activityMessage = generateActivityMessage(selectedCompany.name, type);
    
    // Remove the completed item from the list
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
        <div className="flex items-center gap-2">
          <FilterDropdown />
        </div>
      </div>

      <WorkplaceTable 
        data={data} 
        onEdit={openUpdateDialog} 
      />

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
