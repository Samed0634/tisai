
import React from "react";
import { EditableTableBase } from "./EditableTableBase";
import { Workplace } from "@/types/workplace";

interface IlkOturumTableProps {
  data: Workplace[];
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
      showHorizontalScrollbar={true}
    />
  );
};
