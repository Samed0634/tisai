
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";

interface EmptyTableBodyProps {
  colSpan: number;
}

export const EmptyTableBody: React.FC<EmptyTableBodyProps> = ({ colSpan }) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="text-center py-6 text-xs">
        Görüntülenecek veri bulunamadı
      </TableCell>
    </TableRow>
  );
};
