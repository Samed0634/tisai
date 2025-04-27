import { useState } from "react";
import { COLUMNS } from "@/constants/tableColumns";

// Define default columns for different table types
const DEFAULT_COLUMNS_MAP = {
  default: ['SORUMLU UZMAN', 'BAĞLI OLDUĞU ŞUBE', 'İŞYERİ ADI', 'ARABULUCU RAPORU TEBLİĞ TARİHİ', 'GREV KARARI TARİHİ'],
  grevKarariColumns: ['SORUMLU UZMAN', 'BAĞLI OLDUĞU ŞUBE', 'İŞYERİ ADI', 'ARABULUCU RAPORU TEBLİĞ TARİHİ', 'GREV KARARI TARİHİ'],
  oylamaColumns: ['SORUMLU UZMAN', 'BAĞLI OLDUĞU ŞUBE', 'İŞYERİ ADI', 'GREV KARARI TARİHİ', 'GREV OYLAMASI TARİHİ'],
  cagriColumns: ['SORUMLU UZMAN', 'BAĞLI OLDUĞU ŞUBE', 'İŞYERİ ADI', 'YETKİ BELGESİ TEBLİĞ TARİHİ', 'ÇAĞRI TARİHİ'],
  yetkiTespitColumns: ['SORUMLU UZMAN', 'BAĞLI OLDUĞU ŞUBE', 'İŞYERİ ADI', 'YETKİ TESPİT İSTEM TARİHİ', 'YETKİ BELGESİ TEBLİĞ TARİHİ'],
  yetkiBelgesiColumns: ['SORUMLU UZMAN', 'BAĞLI OLDUĞU ŞUBE', 'İŞYERİ ADI', 'YETKİ BELGESİ TEBLİĞ TARİHİ', 'ÇAĞRI TARİHİ'],
  yerGunTespitColumns: ['SORUMLU UZMAN', 'BAĞLI OLDUĞU ŞUBE', 'İŞYERİ ADI', 'YER VE GÜN TESPİT TARİHİ', 'İLK OTURUM TARİHİ'],
  ilkOturumColumns: ['SORUMLU UZMAN', 'BAĞLI OLDUĞU ŞUBE', 'İŞYERİ ADI', 'ÇAĞRI TARİHİ', 'İLK OTURUM TARİHİ'],
  muzakereSuresiColumns: ['SORUMLU UZMAN', 'BAĞLI OLDUĞU ŞUBE', 'İŞYERİ ADI', 'MÜZAKERE SÜRESİ SON TARİH', 'UYUŞMAZLIK TARİHİ'],
  uyusmazlikColumns: ['SORUMLU UZMAN', 'BAĞLI OLDUĞU ŞUBE', 'İŞYERİ ADI', 'MÜZAKERE SÜRESİ SON TARİH', 'UYUŞMAZLIK TARİHİ'],
  yhkGonderimColumns: ['SORUMLU UZMAN', 'BAĞLI OLDUĞU ŞUBE', 'İŞYERİ ADI', 'GREV OYLAMASI TARİHİ', 'YHK GÖNDERİM TARİHİ'],
  imzalananTislerColumns: ['SORUMLU UZMAN', 'BAĞLI OLDUĞU ŞUBE', 'İŞYERİ ADI', 'TİS İMZA TARİHİ', 'TİS BAŞLANGIÇ TARİHİ', 'TİS BİTİŞ TARİHİ'],
  grevYasakColumns: ['SORUMLU UZMAN', 'BAĞLI OLDUĞU ŞUBE', 'İŞYERİ ADI', 'GREV YASAĞI DURUMU']
};

export type TableType = keyof typeof DEFAULT_COLUMNS_MAP;

export const useColumnVisibility = (type: TableType = "default", customDefaultColumns?: string[]) => {
  // Use customDefaultColumns if provided, otherwise use the predefined defaults
  const defaultColumns = customDefaultColumns || DEFAULT_COLUMNS_MAP[type] || DEFAULT_COLUMNS_MAP.default;
  const [visibleColumns, setVisibleColumns] = useState<string[]>(defaultColumns);

  const toggleColumn = (columnId: string) => {
    const column = COLUMNS.find(col => col.id === columnId);
    
    // Don't toggle fixed columns
    if (column?.fixed) return;
    
    setVisibleColumns(current =>
      current.includes(columnId)
        ? current.filter(id => id !== columnId)
        : [...current, columnId]
    );
  };

  // Reset to default visible columns
  const resetColumns = () => {
    setVisibleColumns(defaultColumns);
  };

  return {
    visibleColumns,
    toggleColumn,
    resetColumns,
    DEFAULT_VISIBLE_COLUMNS: defaultColumns
  };
};
