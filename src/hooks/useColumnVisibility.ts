import { useState, useEffect } from "react";
import { COLUMNS } from "@/constants/tableColumns";

// Define default columns for different table types
const DEFAULT_COLUMNS_MAP = {
  default: ['durum', 'SORUMLU UZMAN', 'BAĞLI OLDUĞU ŞUBE', 'İŞYERİ ADI', 'İŞÇİ SAYISI', 'ÜYE SAYISI'],
  grevKarariColumns: ['durum', 'SORUMLU UZMAN', 'BAĞLI OLDUĞU ŞUBE', 'İŞYERİ ADI', 'GREV KARARI TARİHİ'],
  oylamaColumns: ['durum', 'SORUMLU UZMAN', 'BAĞLI OLDUĞU ŞUBE', 'İŞYERİ ADI', 'GREV OYLAMASI TARİHİ'],
  cagriColumns: ['durum', 'SORUMLU UZMAN', 'BAĞLI OLDUĞU ŞUBE', 'İŞYERİ ADI', 'ÇAĞRI TARİHİ'],
  yetkiTespitColumns: ['durum', 'SORUMLU UZMAN', 'BAĞLI OLDUĞU ŞUBE', 'İŞYERİ ADI', 'YETKİ BELGESİ TEBLİĞ TARİHİ'],
  yetkiBelgesiColumns: ['durum', 'SORUMLU UZMAN', 'BAĞLI OLDUĞU ŞUBE', 'İŞYERİ ADI'],
  yerGunTespitColumns: ['durum', 'SORUMLU UZMAN', 'BAĞLI OLDUĞU ŞUBE', 'İŞYERİ ADI'],
  oncedenBelirlenenColumns: ['durum', 'SORUMLU UZMAN', 'BAĞLI OLDUĞU ŞUBE', 'İŞYERİ ADI', 'ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ'],
  ilkOturumColumns: ['durum', 'SORUMLU UZMAN', 'BAĞLI OLDUĞU ŞUBE', 'İŞYERİ ADI', 'İLK OTURUM TARİHİ'],
  muzakereSuresiColumns: ['durum', 'SORUMLU UZMAN', 'BAĞLI OLDUĞU ŞUBE', 'İŞYERİ ADI', 'MÜZAKERE SÜRESİ SON TARİH'],
  uyusmazlikColumns: ['durum', 'SORUMLU UZMAN', 'BAĞLI OLDUĞU ŞUBE', 'İŞYERİ ADI', 'UYUŞMAZLIK TARİHİ'],
  yhkGonderimColumns: ['durum', 'SORUMLU UZMAN', 'BAĞLI OLDUĞU ŞUBE', 'İŞYERİ ADI', 'YHK GÖNDERİM TARİHİ'],
  imzalananTislerColumns: ['durum', 'SORUMLU UZMAN', 'BAĞLI OLDUĞU ŞUBE', 'İŞYERİ ADI', 'TİS GELİŞ TARİHİ'],
  grevYasakColumns: ['durum', 'SORUMLU UZMAN', 'BAĞLI OLDUĞU ŞUBE', 'İŞYERİ ADI']
};

export type TableType = keyof typeof DEFAULT_COLUMNS_MAP;

export const useColumnVisibility = (type: TableType = "default", customDefaultColumns?: string[]) => {
  // Kullanıcı tercihleri için storage key oluştur
  const storageKey = `tableColumns_${type}`;
  
  // Varsayılan sütunları belirle
  const defaultColumns = customDefaultColumns || DEFAULT_COLUMNS_MAP[type] || DEFAULT_COLUMNS_MAP.default;
  
  // Local storage'dan kayıtlı tercihleri al, yoksa varsayılanları kullan
  const getInitialColumns = () => {
    if (typeof window === 'undefined') return defaultColumns;
    
    const savedColumns = localStorage.getItem(storageKey);
    return savedColumns ? JSON.parse(savedColumns) : defaultColumns;
  };

  const [visibleColumns, setVisibleColumns] = useState<string[]>(getInitialColumns());

  // Kullanıcı tercihleri değiştiğinde localStorage'a kaydet
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, JSON.stringify(visibleColumns));
    }
  }, [visibleColumns, storageKey]);

  const toggleColumn = (columnId: string) => {
    const column = COLUMNS.find(col => col.id === columnId);
    
    // Sabit sütunlar toggle edilemez
    if (column?.fixed) return;
    
    setVisibleColumns(current =>
      current.includes(columnId)
        ? current.filter(id => id !== columnId)
        : [...current, columnId]
    );
  };

  // Varsayılan görünür sütunlara sıfırla
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
