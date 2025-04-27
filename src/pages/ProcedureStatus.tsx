
import { useState } from "react";
import { useWorkplaceData } from "@/hooks/useWorkplaceData";
import { EditableTableBase } from "@/components/dashboard/EditableTableBase";

const DEFAULT_VISIBLE_COLUMNS = [
  "SORUMLU UZMAN",
  "BAĞLI OLDUĞU ŞUBE",
  "İŞYERİ ADI",
  "İŞÇİ SAYISI",
  "ÜYE SAYISI"
];

const ProcedureStatus = () => {
  const { workplaces, isLoading, refetch } = useWorkplaceData();

  return (
    <div className="container mx-auto py-6">
      <EditableTableBase
        data={workplaces || []}
        isLoading={isLoading}
        refetch={refetch}
        tableType="default"
        editableField="GREV YASAĞI DURUMU"
        title="Prosedür Durumu"
        defaultColumns={DEFAULT_VISIBLE_COLUMNS}
        titleClassName="text-xl"
      />
    </div>
  );
};

export default ProcedureStatus;
