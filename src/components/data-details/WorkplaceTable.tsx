
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatInTimeZone } from "date-fns-tz";
import { tr } from "date-fns/locale";

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

  const formatDateValue = (value: any, isDateTime = false) => {
    if (!value) return "";
    
    try {
      const date = new Date(value);
      if (isNaN(date.getTime())) return value; // Invalid date
      
      // Always using Europe/Istanbul timezone for Turkish dates
      return formatInTimeZone(
        date, 
        'Europe/Istanbul', 
        isDateTime ? 'dd.MM.yyyy HH:mm' : 'dd.MM.yyyy',
        { locale: tr }
      );
    } catch (error) {
      console.error("Error formatting date:", error);
      return value;
    }
  };

  return (
    <div className="rounded-md border">
      <ScrollArea className="w-full" showTopScrollbar={true}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[#ea384c] sticky left-0 bg-background z-10">İşlem</TableHead>
              {visibleColumnDefinitions.map(column => (
                <TableHead key={column.id}>
                  {column.id === 'updated_at' ? 'Son Güncelleme' : column.title}
                </TableHead>
              ))}
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
                  <TableCell className="sticky left-0 bg-background z-10">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onUpdateClick(item)}
                      className="hover:bg-primary hover:text-white"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                  {visibleColumnDefinitions.map(column => (
                    <TableCell key={column.id}>
                      {column.id === 'durum' ? (
                        <StatusBadge status={item[column.id] || 'Bekliyor'} />
                      ) : column.id === 'updated_at' ? (
                        formatDateValue(item[column.id], true)
                      ) : column.id.includes('TARİHİ') ? (
                        formatDateValue(item[column.id])
                      ) : (
                        item[column.id]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};
