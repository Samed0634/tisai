
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
  deadlineDate?: string;
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
  deadline.setHours(23, 59, 59, 999); // Deadline is inclusive of the whole date
  return deadline < now;
}

export const WorkplaceTable: React.FC<WorkplaceTableProps> = ({
  visibleColumns,
  sortKey,
  data,
  onUpdateClick,
}) => {
  // Function to map API fields to column IDs
  const mapApiFieldToColumnId = (apiField: string): string => {
    const mapping: Record<string, string> = {
      "İşyeri Adı": "name",
      "Bağlı Olduğu Şube": "branch",
      "Sorumlu Uzman": "responsibleExpert",
      "İl": "province",
      "İşyeri Türü": "workplaceType",
      "SGK No": "sgkNo",
      "İşçi Sayısı": "employeeCount",
      "Üye Sayısı": "memberCount",
      "İşveren Sendikası": "employerUnion",
      "İhale Adı": "tenderName",
      "Yetki Belgesi Türü": "authorizationType",
      "Grev Yasağı Durumu": "strikeStatus",
      "İhale Başlangıç Tarihi": "tenderStartDate",
      "İhale Bitiş Tarihi": "tenderEndDate",
      "TİS Bitiş Tarihi": "tisEndDate",
      "Yetki Tespit Tarihi": "authorizationDate",
      "Yetki Belgesi Tebliğ Tarihi": "authorizationNoticeDate",
      "Çağrı Tarihi": "callDate",
      "Yer ve Gün Tespit Tarihi": "placeAndDateDetermination",
      "Önceden Belirlenen İlk Oturum Tarihi": "predeterminedFirstSession",
      "İlk Oturum Tarihi": "firstSessionDate",
      "Uyuşmazlık Tarihi": "disputeDate",
      "Arabulucu Ataması Son Tarih": "mediatorDeadline",
      "Arabulucu Raporu Tebliğ Tarihi": "mediatorReportDate",
      "Grev Kararı Tarihi": "strikeDecisionDate",
      "Grev Oylaması Tarihi": "strikeVotingDate",
      "YHK Gönderim Tarihi": "yhkSubmissionDate",
      "YHK Hatırlatma": "yhkReminder",
      "İmza Tarihi": "signDate",
      "TİS Başlangıç Tarihi": "tisStartDate",
      "Beklenen Adım": "expectedStep",
      "Termin Tarihi": "deadlineDate",
      "Termin Kuralı": "deadlineRule"
    };
    return mapping[apiField] || apiField;
  };

  // Get all available fields from the first data item
  const getAllFields = () => {
    if (data.length === 0) return [];
    const firstItem = data[0];
    return Object.keys(firstItem).map((key) => {
      const matchingColumn = COLUMNS.find((col) =>
        col.id === mapApiFieldToColumnId(key) || col.title === key
      );
      return matchingColumn || { id: key, title: key };
    });
  };

  const allColumns = getAllFields();
  const displayColumns = visibleColumns.length > 0
    ? COLUMNS.filter((col) => visibleColumns.includes(col.id))
    : allColumns;

  // Helper for detecting pending status (no action taken)
  function isNoAction(item: WorkplaceItem) {
    // You can expand this according to the actual "pending" statuses of your workflow.
    return !item.status || item.status === "" || item.status?.toLowerCase().includes("bekleniyor");
  }

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
          <TableRow key={item.id || item.İşyeri_Adı || Math.random().toString()}>
            {displayColumns.map((column) => {
              let value =
                column.id === 'status'
                  ? (item.status || '')
                  : item[column.id] ||
                    item[column.title] ||
                    (Object.entries(item).find(([k]) =>
                      mapApiFieldToColumnId(k) === column.id
                    ) || [])[1] ||
                    '-';

              if (column.id === 'status') {
                return (
                  <TableCell key={column.id}>
                    <StatusBadge status={value} />
                  </TableCell>
                );
              }

              // For "deadlineDate" (Termin Tarihi), check if overdue and pending action
              if (column.id === "deadlineDate" && value && value !== "-") {
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
                  {value}
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
