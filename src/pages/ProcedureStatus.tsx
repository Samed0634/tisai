
import React, { useState } from "react";
import { useWorkplaceData } from "@/hooks/useWorkplaceData";
import { EditableTableBase } from "@/components/dashboard/EditableTableBase";
import { SearchBox } from "@/components/data-details/SearchBox";

const ALL_COLUMNS = [
  "İŞYERİ TÜRÜ",
  "SORUMLU UZMAN",
  "İŞYERİNİN BULUNDUĞU İL",
  "BAĞLI OLDUĞU ŞUBE",
  "İŞYERİ ADI",
  "SGK NO",
  "İŞÇİ SAYISI",
  "ÜYE SAYISI",
  "İŞVEREN SENDİKASI",
  "GREV YASAĞI DURUMU",
  "İHALE ADI",
  "İHALE BAŞLANGIÇ TARİHİ",
  "İHALE BİTİŞ TARİHİ",
  "YETKİ TESPİT İSTEM TARİHİ",
  "YETKİ BELGESİ TEBLİĞ TARİHİ",
  "ÇAĞRI TARİHİ",
  "YER VE GÜN TESPİT TARİHİ",
  "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ",
  "İLK OTURUM TARİHİ",
  "MÜZAKERE SÜRESİ SON TARİH",
  "UYUŞMAZLIK TARİHİ",
  "ARABULUCU RAPORU TEBLİĞ TARİHİ",
  "GREV KARARI TARİHİ",
  "FİİLİ GREV KARARI TARİHİ",
  "GREV OYLAMASI TARİHİ",
  "YHK GÖNDERİM TARİHİ",
  "TİS GELİŞ TARİHİ",
  "TİS İMZA TARİHİ",
  "TİS BAŞLANGIÇ TARİHİ",
  "TİS BİTİŞ TARİHİ"
];

const DEFAULT_VISIBLE_COLUMNS = [
  "SORUMLU UZMAN",
  "BAĞLI OLDUĞU ŞUBE",
  "İŞYERİ ADI",
  "İŞÇİ SAYISI",
  "ÜYE SAYISI"
];

const ProcedureStatus = () => {
  const { workplaces, isLoading, refetch, updateWorkplace } = useWorkplaceData();
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredWorkplaces = workplaces?.filter(workplace => 
    workplace["İŞYERİ ADI"]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workplace["SORUMLU UZMAN"]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workplace["BAĞLI OLDUĞU ŞUBE"]?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Prosedür Durumu</h1>
      
      <SearchBox 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="İşyeri veya uzman ara..."
      />

      <EditableTableBase
        data={filteredWorkplaces}
        isLoading={isLoading}
        refetch={refetch}
        tableType="default"
        editableField=""
        title="Prosedür Durumu"
        defaultColumns={DEFAULT_VISIBLE_COLUMNS}
        titleClassName="text-xl"
        pageSize={pageSize}
        currentPage={currentPage}
        setPageSize={setPageSize}
        setCurrentPage={setCurrentPage}
        pageSizeOptions={[10, 20, 30, 40, 50]}
        showHorizontalScrollbar={true}
      />
    </div>
  );
};

export default ProcedureStatus;
