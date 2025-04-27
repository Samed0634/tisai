import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Filter } from "lucide-react";
import { Button } from "../ui/button";
import { EditableTableCell } from "./EditableTableCell";
import { TablePagination } from "./TablePagination";
import { TableHeader as CustomTableHeader } from "./TableHeader";
import { TableBody as CustomTableBody } from "./TableBody";
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Workplace } from "@/types/workplace";

interface TableContentProps {
  data: Workplace[];
  isLoading: boolean;
  visibleColumns: string[];
  toggleColumn: (column: string) => void;
  editingId: number | null;
  editData: Record<string, any>;
  handleEdit: (id: number, field: string, value: any) => void;
  handleCancel: () => void;
  handleChange: (field: string, value: any) => void;
  handleSave: (workplace: Workplace) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  title?: string;
  titleClassName?: string;
  editableField?: string;
}

export const TableContent: React.FC<TableContentProps> = ({
  data,
  isLoading,
  visibleColumns,
  toggleColumn,
  editingId,
  editData,
  handleEdit,
  handleCancel,
  handleChange,
  handleSave,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
  title,
  titleClassName = 'text-2xl font-bold',
  editableField
}) => {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        {title && <h1 className={titleClassName}>{title}</h1>}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Sütunları Filtrele
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            {Object.keys(data[0] || {}).filter(key => key !== "ID").map(column => (
              <DropdownMenuCheckboxItem
                key={column}
                checked={visibleColumns.includes(column)}
                onCheckedChange={() => toggleColumn(column)}
              >
                {column}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="border rounded-md overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {visibleColumns.map(column => (
                <TableHead key={column}>{column}</TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedData.map(workplace => (
              <TableRow key={workplace.ID}>
                {visibleColumns.map((column) => {
                  const isEditing = editingId === workplace.ID && column === editableField;
                  return (
                    <EditableTableCell
                      key={`${workplace.ID}-${column}`}
                      column={column}
                      value={workplace[column]}
                      isEditing={isEditing}
                      editValue={isEditing ? editData[column] : null}
                      onEdit={() => editableField && column === editableField && handleEdit(workplace.ID, column, workplace[column])}
                      onChange={(value) => handleChange(column, value)}
                      onCancel={handleCancel}
                      onSave={() => {
                        const updatedWorkplace = {
                          ...workplace,
                          [column]: editData[column]
                        };
                        handleSave(updatedWorkplace);
                      }}
                    />
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <TablePagination
        totalItems={data.length}
        pageSize={pageSize}
        currentPage={currentPage}
        setPageSize={setPageSize}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
