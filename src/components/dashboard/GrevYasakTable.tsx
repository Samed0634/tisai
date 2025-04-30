
import React from "react";
import { EditableTableBase } from "./EditableTableBase";
import { Workplace } from "@/types/workplace";

interface GrevYasakTableProps {
  data: Workplace[];
  isLoading?: boolean;
  refetch: () => void;
  defaultColumns?: string[];
}

export const GrevYasakTable: React.FC<GrevYasakTableProps> = ({ 
  data, 
  isLoading = false,
  refetch,
  defaultColumns
}) => {
  return (
    <EditableTableBase 
      data={data}
      isLoading={isLoading}
      refetch={refetch}
      tableType="grevYasakColumns"
      editableField="GREV YASAĞI DURUMU"
      title="Grev Yasağı Olan İşyerleri"
      defaultColumns={defaultColumns}
    />
  );
};
