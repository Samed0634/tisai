
import React from "react";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "./StatusBadge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { COLUMNS } from "@/constants/tableColumns";

interface WorkplaceItem {
  id: string;
  [key: string]: any;
}

interface WorkplaceTableProps {
  data: WorkplaceItem[];
  onUpdateClick: (company: WorkplaceItem) => void;
  visibleColumns: string[];
  isLoading?: boolean;
}

export const WorkplaceTable: React.FC<WorkplaceTableProps> = ({ 
  data, 
  onUpdateClick,
  visibleColumns,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="rounded-md border p-8">
        <LoadingSpinner />
      </div>
    );
  }

  const visibleColumnDefinitions = COLUMNS.filter(col => 
    visibleColumns.includes(col.id)
  );

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {visibleColumnDefinitions.map(column => (
              <TableHead key={column.id}>{column.title}</TableHead>
            ))}
            <TableHead className="text-right">İşlem</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={visibleColumnDefinitions.length + 1} className="text-center py-6">
                Görüntülenecek veri bulunamadı
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={item.id} className="hover:bg-muted/50">
                {visibleColumnDefinitions.map(column => (
                  <TableCell key={column.id}>
                    {column.id === 'SON DURUM' ? (
                      <StatusBadge status={item[column.id] || 'Bekliyor'} />
                    ) : (
                      item[column.id]
                    )}
                  </TableCell>
                ))}
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onUpdateClick(item)}
                    className="hover:bg-primary hover:text-white"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
