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
  visibleColumns?: string[];
}

const COLUMN_ORDER = [
  "ID",
  "İŞYERİ TÜRÜ",
  "SORUMLU UZMAN",
  "İŞYERİNİN BULUNDUĞU İL",
  "BAĞLI OLDUĞU ŞUBE",
  "İŞYERİ ADI",
  "SGK NO",
  "İŞÇİ SAYISI",
  "ÜYE SAYISI",
  "İŞVEREN SENDİKASI",
  "İHALE BAŞLANGIÇ TARİHİ",
  "İHALE BİTİŞ TARİHİ",
  "İHALE ADI",
  "YETKİ BELGESİ TÜRÜ",
  "YETKİ TESPİT İSTEM TARİHİ",
  "GREV YASAĞI DURUMU",
  "YETKİ BELGESİ TEBLİĞ TARİHİ",
  "ÇAĞRI TARİHİ",
  "YETKİ DURUMU",
  "YER VE GÜN TESPİT TARİHİ",
  "ÖNCEDEN BELİRLENEN İLK OTURUM TARİHİ",
  "İLK OTURUM TARİHİ",
  "GREVE KATILAMAYACAKLAR İÇİN LİSTE TALEBİ",
  "60.GÜN DOLAN İŞYERLERİ",
  "UYUŞMAZLIK TARİHİ",
  "ARABULUCU ATANMA TARİHİ",
  "ARABULUCU",
  "ARABULUCU TOPLANTI TARİHİ",
  "ARABULUCU RAPORU TEBLİĞ TARİHİ",
  "GREV KARARI TARİHİ",
  "FİİLİ GREV KARARI TARİHİ",
  "GREV OYLAMASI TARİHİ",
  "YHK GÖNDERİM TARİHİ",
  "TİS GELİŞ TARİHİ",
  "TİS İMZA TARİHİ",
  "TİS BAŞLANGIÇ TARİHİ",
  "TİS BİTİŞ TARİHİ",
  "SON DURUM",
  "İŞLEM"
];

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
  visibleColumns = COLUMN_ORDER
}) => {
  const displayColumns = COLUMN_ORDER.filter(column => 
    visibleColumns.includes(column)
  );

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {displayColumns.map((header) => (
              <TableHead key={header} className="whitespace-nowrap">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id || Math.random().toString()}>
              {displayColumns.map((field) => {
                if (field === "İŞLEM") {
                  return (
                    <TableCell key={field} className="text-right">
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

                const value = item[field] || '-';

                if (field === "SON DURUM") {
                  return (
                    <TableCell key={field} className="whitespace-nowrap">
                      <StatusBadge status={value.toString()} />
                    </TableCell>
                  );
                }

                const isDateField = [
                  "İHALE BİTİŞ TARİHİ",
                  "TİS BİTİŞ TARİHİ",
                  "Termin Tarihi"
                ].includes(field);

                if (isDateField) {
                  const showRed = isPastDeadline(value) && isNoAction(item);
                  return (
                    <TableCell key={field} className="whitespace-nowrap">
                      <span className={showRed ? "text-destructive font-semibold" : ""}>
                        {value?.toString() || '-'}
                      </span>
                    </TableCell>
                  );
                }

                return (
                  <TableCell key={field} className="whitespace-nowrap">
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
