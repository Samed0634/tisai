
import React from "react";
import { EditableTableBase } from "./EditableTableBase";

interface WorkplaceItem {
  ID: number;
  [key: string]: any;
}

interface GrevYasakTableProps {
  data: WorkplaceItem[];
  isLoading?: boolean;
  refetch: () => void;
}

export const GrevYasakTable: React.FC<GrevYasakTableProps> = ({ 
  data, 
  isLoading = false,
  refetch
}) => {
  return (
    <EditableTableBase 
      data={data}
      isLoading={isLoading}
      refetch={refetch}
      tableType="grevYasakColumns"
      editableField="GREV YASAĞI DURUMU"
      title="Grev Yasağı Olan İşyerleri"
    />
  );
};
