
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
import { COLUMNS } from "@/constants/tableColumns";

interface WorkplaceItem {
  id: string;
  [key: string]: any;
}

interface WorkplaceTableProps {
  data: WorkplaceItem[];
  onUpdateClick: (company: WorkplaceItem) => void;
  visibleColumns?: string[];
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
  visibleColumns = COLUMNS.map(col => col.id)
}) => {
  // Get visible columns including fixed ones
  const displayColumns = COLUMNS.filter(col => visibleColumns.includes(col.id) || col.fixed);

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {displayColumns.map((column) => (
              <TableHead key={column.id} className="whitespace-nowrap">
                {column.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id || Math.random().toString()}>
              {displayColumns.map((column) => {
                if (column.id === "İŞLEM") {
                  return (
                    <TableCell key={column.id} className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onUpdateClick(item)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  );
                }

                const value = item[column.id] || '-';

                if (column.id === "SON DURUM") {
                  return (
                    <TableCell key={column.id} className="whitespace-nowrap">
                      <StatusBadge status={value.toString()} />
                    </TableCell>
                  );
                }

                // Check for deadline dates
                const isDateField = [
                  "İHALE BİTİŞ TARİHİ",
                  "TİS BİTİŞ TARİHİ",
                  "Termin Tarihi"
                ].includes(column.id);

                if (isDateField) {
                  const showRed = isPastDeadline(value) && isNoAction(item);
                  return (
                    <TableCell key={column.id} className="whitespace-nowrap">
                      <span className={showRed ? "text-destructive font-semibold" : ""}>
                        {value?.toString() || '-'}
                      </span>
                    </TableCell>
                  );
                }

                return (
                  <TableCell key={column.id} className="whitespace-nowrap">
                    {value?.toString() || '-'}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
