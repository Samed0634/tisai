
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ActionHistory } from "@/types/actionHistory";
import { formatInTimeZone } from "date-fns-tz";
import { tr } from "date-fns/locale";
import { TablePagination } from "@/components/table/TablePagination";

interface ActivityTableProps {
  activities: ActionHistory[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  startIndex: number;
  onPageSizeChange: (value: string) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

export const ActivityTable: React.FC<ActivityTableProps> = ({
  activities,
  currentPage,
  totalPages,
  pageSize,
  startIndex,
  onPageSizeChange,
  onPreviousPage,
  onNextPage
}) => {
  // Function to clean action descriptions from kurum_id mentions
  const cleanActionName = (actionName: string): string => {
    if (actionName.includes("kurum_id")) {
      return actionName.replace(/\s*"kurum_id".*?(?=\s*\w+|$)/g, '');
    }
    return actionName;
  };

  return (
    <>
      <div className="min-w-max">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tarih</TableHead>
              <TableHead>Saat</TableHead>
              <TableHead>İşlem</TableHead>
              <TableHead>İşlemi Yapan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.length > 0 ? (
              activities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>
                    {formatInTimeZone(new Date(activity["Tarih"]), 'Europe/Istanbul', 'dd.MM.yyyy', { locale: tr })}
                  </TableCell>
                  <TableCell>
                    {formatInTimeZone(new Date(`${activity["Tarih"]}T${activity["Saat"]}`), 'Europe/Istanbul', 'HH:mm:ss', { locale: tr })}
                  </TableCell>
                  <TableCell>{cleanActionName(activity["İşlem Adı"])}</TableCell>
                  <TableCell>{activity["İşlem Yapan Kullanıcı"]}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  Arama kriterlerine uygun sonuç bulunamadı.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {activities.length > 0 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={activities.length}
          startIndex={startIndex}
          onPageSizeChange={onPageSizeChange}
          onPreviousPage={onPreviousPage}
          onNextPage={onNextPage}
        />
      )}
    </>
  );
};
