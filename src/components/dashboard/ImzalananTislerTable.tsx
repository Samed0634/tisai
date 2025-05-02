
import React from "react";
import { EditableTableBase } from "./EditableTableBase";
import { Workplace } from "@/types/workplace";
import { TisUploadButton } from "./TisUploadButton";

interface ImzalananTislerTableProps {
  data: Workplace[];
  isLoading?: boolean;
  refetch: () => void;
}

export const ImzalananTislerTable: React.FC<ImzalananTislerTableProps> = ({ 
  data, 
  isLoading = false,
  refetch
}) => {
  // Custom render function for the TİS Upload column
  const renderTisUploadCell = (item: Workplace) => {
    return (
      <TisUploadButton 
        workplaceId={item.ID} 
        workplaceName={item["İŞYERİ ADI"] || ""}
      />
    );
  };

  return (
    <EditableTableBase 
      data={data}
      isLoading={isLoading}
      refetch={refetch}
      tableType="imzalananTislerColumns"
      editableField="TİS GELİŞ TARİHİ"
      title="İmzalanan Tisler"
      customColumns={{
        "TİS Yükleme": {
          position: 1, // Position after the "İşlem" column
          render: renderTisUploadCell
        }
      }}
    />
  );
};
