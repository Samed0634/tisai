
import React from "react";
import { EditableTableBase } from "./EditableTableBase";

interface WorkplaceItem {
  ID: number;
  [key: string]: any;
}

interface IlkOturumTableProps {
  data: WorkplaceItem[];
  isLoading?: boolean;
  refetch: () => void;
}

export const IlkOturumTable: React.FC<IlkOturumTableProps> = ({ 
  data, 
  isLoading = false,
  refetch
}) => {
  return (
    <EditableTableBase 
      data={data}
      isLoading={isLoading}
      refetch={refetch}
      tableType="ilkOturumColumns"
      editableField="İLK OTURUM TARİHİ"
      title="İlk Oturum Gereken İşyerleri"
    />
  );
};
