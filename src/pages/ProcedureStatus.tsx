
import { useState } from "react";
import { useWorkplaceData } from "@/hooks/useWorkplaceData";
import { Workplace } from "@/types/workplace";
import { EditableTable } from "@/components/procedure-status/EditableTable";

const DEFAULT_VISIBLE_COLUMNS = [
  "SORUMLU UZMAN",
  "BAĞLI OLDUĞU ŞUBE",
  "İŞYERİ ADI",
  "İŞÇİ SAYISI",
  "ÜYE SAYISI"
];

const ProcedureStatus = () => {
  const { workplaces, isLoading, updateWorkplace } = useWorkplaceData();
  const [visibleColumns, setVisibleColumns] = useState<string[]>(DEFAULT_VISIBLE_COLUMNS);

  const handleUpdate = (workplace: Workplace) => {
    updateWorkplace(workplace);
  };

  return (
    <div className="container mx-auto py-6">
      <EditableTable
        data={workplaces || []}
        isLoading={isLoading}
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
        onUpdate={handleUpdate}
        defaultColumns={DEFAULT_VISIBLE_COLUMNS}
      />
    </div>
  );
};

export default ProcedureStatus;
