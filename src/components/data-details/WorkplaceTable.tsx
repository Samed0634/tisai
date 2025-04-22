
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
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface WorkplaceItem {
  id: string;
  name: string;
  responsibleExpert?: string;
  branch?: string;
  status?: string;
  authorityNoticeDate?: string;
  callDate?: string;
  [key: string]: any;
}

interface WorkplaceTableProps {
  data: WorkplaceItem[];
  onUpdateClick: (company: WorkplaceItem) => void;
  visibleColumns?: string[];
  isLoading?: boolean;
}

export const WorkplaceTable: React.FC<WorkplaceTableProps> = ({ 
  data, 
  onUpdateClick,
  visibleColumns = [],
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="rounded-md border p-8">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>İşyeri Adı</TableHead>
            <TableHead>Bağlı Olduğu Şube</TableHead>
            <TableHead>Sorumlu Uzman</TableHead>
            <TableHead>Yetki Belgesi Tebliğ Tarihi</TableHead>
            <TableHead>Çağrı Tarihi</TableHead>
            <TableHead>Güncel Durum</TableHead>
            <TableHead className="text-right">İşlem</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6">
                Görüntülenecek veri bulunamadı
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={item.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.branch}</TableCell>
                <TableCell>{item.responsibleExpert}</TableCell>
                <TableCell>{item.authorityNoticeDate}</TableCell>
                <TableCell>{item.callDate}</TableCell>
                <TableCell>
                  <StatusBadge status={item.status || 'Bekliyor'} />
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onUpdateClick(item)}
                    className="hover:bg-primary hover:text-white"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
