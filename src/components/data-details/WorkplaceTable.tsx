
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
  visibleColumns: string[];
  sortKey: string;
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
  sortKey,
  onUpdateClick,
}) => {
  // Get all available fields from the first data item
  const getAllColumns = () => {
    if (data.length === 0) return [];
    const firstItem = data[0];
    return Object.keys(firstItem).map(key => ({
      id: key,
      title: key
    }));
  };

  const displayColumns = getAllColumns();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {displayColumns.map((column) => (
            <TableHead
              key={column.id}
              className={sortKey === column.id ? 'text-primary' : ''}
            >
              {column.title}
            </TableHead>
          ))}
          <TableHead className="text-right">İşlem</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id || Math.random().toString()}>
            {displayColumns.map((column) => {
              const value = item[column.id] || '-';

              if (column.id === 'status') {
                return (
                  <TableCell key={column.id}>
                    <StatusBadge status={value} />
                  </TableCell>
                );
              }

              // Check for deadline dates
              if (column.id === "Termin Tarihi" || column.id === "deadlineDate") {
                const showRed = isPastDeadline(value) && isNoAction(item);
                return (
                  <TableCell key={column.id}>
                    <span className={showRed ? "text-destructive font-semibold" : ""}>
                      {value}
                    </span>
                  </TableCell>
                );
              }

              return (
                <TableCell key={column.id}>
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
