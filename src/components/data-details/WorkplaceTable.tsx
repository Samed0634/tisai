
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
import { COLUMNS } from "@/constants/tableColumns";
import { StatusBadge } from "./StatusBadge";

interface WorkplaceItem {
  id: string;
  name: string;
  responsibleExpert?: string;
  branch?: string;
  sgkNo?: string;
  employeeCount?: number;
  memberCount?: number;
  status?: string;
  [key: string]: any;
}

interface WorkplaceTableProps {
  visibleColumns: string[];
  sortKey: string;
  data: WorkplaceItem[];
  onUpdateClick: (company: WorkplaceItem) => void;
}

export const WorkplaceTable: React.FC<WorkplaceTableProps> = ({
  visibleColumns,
  sortKey,
  data,
  onUpdateClick,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {COLUMNS.filter(column => visibleColumns.includes(column.id))
            .map(column => (
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
          <TableRow key={item.id}>
            {COLUMNS.filter(column => visibleColumns.includes(column.id))
              .map(column => (
                <TableCell key={column.id}>
                  {column.id === 'status' ? (
                    <StatusBadge status={item.status || ''} />
                  ) : (
                    (item as any)[column.id]
                  )}
                </TableCell>
              ))}
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
