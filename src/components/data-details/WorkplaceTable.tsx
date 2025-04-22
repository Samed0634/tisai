
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

interface WorkplaceItem {
  id: string;
  [key: string]: any;
}

interface WorkplaceTableProps {
  data: WorkplaceItem[];
  onUpdateClick: (company: WorkplaceItem) => void;
}

function isPastDeadline(deadlineDate: string | undefined) {
  if (!deadlineDate) return false;
  const now = new Date();
  const deadline = new Date(deadlineDate);
  deadline.setHours(23, 59, 59, 999);
  return deadline < now;
}

function isNoAction(item: WorkplaceItem) {
  return !item.status || item.status === "" || item.status?.toLowerCase().includes("bekleniyor");
}

export const WorkplaceTable: React.FC<WorkplaceTableProps> = ({
  data,
  onUpdateClick,
}) => {
  // Get all available fields from the first data item
  const getColumns = () => {
    if (data.length === 0) return [];
    return Object.keys(data[0]).map(key => ({
      field: key,
      header: key
    }));
  };

  const columns = getColumns();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.field}>
              {column.header}
            </TableHead>
          ))}
          <TableHead className="text-right">İşlem</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id || Math.random().toString()}>
            {columns.map((column) => {
              const value = item[column.field] || '-';

              if (column.field === 'status') {
                return (
                  <TableCell key={column.field}>
                    <StatusBadge status={value} />
                  </TableCell>
                );
              }

              // Check for deadline dates
              if (column.field === "Termin Tarihi" || column.field === "deadlineDate") {
                const showRed = isPastDeadline(value) && isNoAction(item);
                return (
                  <TableCell key={column.field}>
                    <span className={showRed ? "text-destructive font-semibold" : ""}>
                      {value}
                    </span>
                  </TableCell>
                );
              }

              return (
                <TableCell key={column.field}>
                  {value?.toString() || '-'}
                </TableCell>
              );
            })}
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onUpdateClick(item)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

