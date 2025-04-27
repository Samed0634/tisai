import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Workplace } from '@/types/workplace';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TablePagination } from '@/components/table/TablePagination';
import { useWorkplaceData } from '@/hooks/useWorkplaceData';
import { useTableColumns } from '@/hooks/useTableColumns';
import { TableColumnFilter } from './table/TableColumnFilter';
import { EditableCell } from './table/EditableCell';

interface EditableTableBaseProps {
  data: Workplace[];
  isLoading?: boolean;
  refetch: () => void;
  tableType?: string;
  editableField: string;
  title: string;
  defaultColumns?: string[];
  titleClassName?: string;
  showControls?: boolean;
  pageSize?: number;
  currentPage?: number;
  setPageSize?: (size: number) => void;
  setCurrentPage?: (page: number) => void;
  pageSizeOptions?: number[];
  showHorizontalScrollbar?: boolean;
}

export const EditableTableBase: React.FC<EditableTableBaseProps> = ({
  data,
  isLoading = false,
  refetch,
  tableType = 'default',
  editableField,
  title,
  defaultColumns,
  titleClassName = 'text-2xl',
  showControls = true,
  pageSize = 10,
  currentPage = 1,
  setPageSize,
  setCurrentPage,
  pageSizeOptions = [10, 20, 30, 40, 50],
  showHorizontalScrollbar = false
}) => {
  const { visibleColumns, toggleColumn } = useTableColumns({
    tableType,
    defaultColumns: defaultColumns || getDefaultColumns(tableType)
  });

  const [editingCell, setEditingCell] = useState<{ id: number; column: string } | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const { updateWorkplace } = useWorkplaceData();

  const availableColumns = data && data.length > 0 
    ? Object.keys(data[0] || {}).filter(key => key !== 'ID') 
    : [];

  const handleCellClick = (workplace: Workplace, column: string) => {
    setEditingCell({ id: workplace.ID, column });
    setEditValue(workplace[column]?.toString() || '');
  };

  const handleSave = (workplace: Workplace) => {
    if (!editingCell) return;
    
    const updatedWorkplace = {
      ...workplace,
      [editingCell.column]: editValue
    };
    
    updateWorkplace(updatedWorkplace);
    setEditingCell(null);
  };

  // Pagination calculations
  const totalPages = Math.ceil(data.length / (pageSize || 10));
  const startIndex = ((currentPage || 1) - 1) * (pageSize || 10);
  const paginatedData = pageSize ? data.slice(startIndex, startIndex + pageSize) : data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {showControls && (
        <div className="flex justify-between items-center">
          <h1 className={titleClassName}>{title}</h1>
          <TableColumnFilter
            availableColumns={availableColumns}
            visibleColumns={visibleColumns}
            toggleColumn={toggleColumn}
          />
        </div>
      )}

      <div className="border rounded-md">
        <ScrollArea 
          className="w-full" 
          showTopScrollbar={showHorizontalScrollbar}
          showBottomScrollbar={showHorizontalScrollbar}
        >
          <div className="min-w-max">
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
                    {visibleColumns.map(column => (
                      <TableCell key={column}>
                        <EditableCell
                          workplace={workplace}
                          column={column}
                          editingCell={editingCell}
                          editValue={editValue}
                          setEditValue={setEditValue}
                          handleSave={handleSave}
                          handleCellClick={handleCellClick}
                          editableField={editableField}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </div>

      {pageSize && setPageSize && setCurrentPage && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={data.length}
          startIndex={startIndex}
          onPageSizeChange={(value) => {
            setPageSize(Number(value));
            setCurrentPage(1);
          }}
          onPreviousPage={() => {
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1);
            }
          }}
          onNextPage={() => {
            if (currentPage < totalPages) {
              setCurrentPage(currentPage + 1);
            }
          }}
        />
      )}
    </div>
  );
};

const getDefaultColumns = (tableType: string): string[] => {
  switch (tableType) {
    case "oylamaColumns":
      return ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "GREV OYLAMASI TARİHİ"];
    case "cagriColumns":
      return ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "ÇAĞRI TARİHİ"];
    case "yetkiTespitColumns":
      return ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "YETKİ BELGESİ TEBLİĞ TARİHİ"];
    case "yetkiBelgesiColumns":
      return ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "ÇAĞRI TARİHİ"];
    case "yerGunTespitColumns":
      return ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "YER VE GÜN TESPİT TARİHİ"];
    case "ilkOturumColumns":
      return ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "İLK OTURUM TARİHİ"];
    case "muzakereSuresiColumns":
      return ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "UYUŞMAZLIK TARİHİ"];
    case "uyusmazlikColumns":
      return ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "UYUŞMAZLIK TARİHİ"];
    case "yhkColumns":
      return ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "YHK GÖNDERİM TARİHİ"];
    case "imzalananTislerColumns":
      return ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "TİS GELİŞ TARİHİ"];
    case "grevYasagiColumns":
      return ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "GREV YASAĞI DURUMU"];
    default:
      return ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "İŞÇİ SAYISI", "ÜYE SAYISI"];
  }
};
