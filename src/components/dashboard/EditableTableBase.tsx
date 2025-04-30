
import React, { useState, useEffect } from "react";
import { TableContent } from "@/components/table/TableContent";
import { Workplace } from "@/types/workplace";

interface EditableTableBaseProps {
  data: Workplace[];
  isLoading?: boolean;
  refetch: () => void;
  tableType: string;
  editableField: string;
  title: string;
  titleClassName?: string;
  defaultColumns?: string[];
  pageSize?: number;
  currentPage?: number;
  setPageSize?: (size: number) => void;
  setCurrentPage?: (page: number) => void;
  pageSizeOptions?: number[];
  showHorizontalScrollbar?: boolean;
  columnLabels?: Record<string, string>;
  formatters?: Record<string, (value: any) => string>;
}

export const EditableTableBase: React.FC<EditableTableBaseProps> = ({
  data,
  isLoading = false,
  refetch,
  tableType,
  editableField,
  title,
  titleClassName,
  defaultColumns = ["SORUMLU UZMAN", "BAĞLI OLDUĞU ŞUBE", "İŞYERİ ADI", "İŞÇİ SAYISI", "ÜYE SAYISI"],
  pageSize: propPageSize,
  currentPage: propCurrentPage,
  setPageSize: propSetPageSize,
  setCurrentPage: propSetCurrentPage,
  pageSizeOptions = [10, 20, 30, 40, 50],
  showHorizontalScrollbar = true,
  columnLabels = {
    "durum": "Durum", 
    "updated_at": "Son Güncelleme"
  },
  formatters = {},
}) => {
  const [localPageSize, setLocalPageSize] = useState(propPageSize || 10);
  const [localCurrentPage, setLocalCurrentPage] = useState(propCurrentPage || 1);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Workplace | null>(null);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);

  // Load saved column visibility from localStorage
  useEffect(() => {
    const savedColumns = localStorage.getItem(`${tableType}Columns`);
    if (savedColumns) {
      setVisibleColumns(JSON.parse(savedColumns));
    } else {
      setVisibleColumns(defaultColumns);
    }
  }, [tableType, defaultColumns]);

  // Save column visibility to localStorage whenever it changes
  useEffect(() => {
    if (visibleColumns.length > 0) {
      localStorage.setItem(`${tableType}Columns`, JSON.stringify(visibleColumns));
    }
  }, [visibleColumns, tableType]);

  const handleEdit = (item: Workplace) => {
    setEditingId(item.ID);
    setEditData({ ...item });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData(null);
  };

  const handleChange = (field: string, value: string | number) => {
    if (editData) {
      setEditData({
        ...editData,
        [field]: value
      });
    }
  };

  const handleSave = async () => {
    if (!editData) return;

    try {
      await refetch();
      setEditingId(null);
      setEditData(null);
    } catch (error) {
      console.error("Error updating workplace:", error);
    }
  };

  const toggleColumn = (columnId: string) => {
    setVisibleColumns(prev => 
      prev.includes(columnId)
        ? prev.filter(id => id !== columnId)
        : [...prev, columnId]
    );
  };

  const setPageSize = propSetPageSize || setLocalPageSize;
  const setCurrentPage = propSetCurrentPage || setLocalCurrentPage;

  return (
    <TableContent
      data={data}
      isLoading={isLoading}
      visibleColumns={visibleColumns}
      toggleColumn={toggleColumn}
      editingId={editingId}
      editData={editData}
      handleEdit={handleEdit}
      handleCancel={handleCancel}
      handleChange={handleChange}
      handleSave={handleSave}
      pageSize={propPageSize || localPageSize}
      setPageSize={setPageSize}
      currentPage={propCurrentPage || localCurrentPage}
      setCurrentPage={setCurrentPage}
      title={title}
      titleClassName={titleClassName}
      editableField={editableField}
      columnLabels={columnLabels}
      formatters={formatters}
    />
  );
};
