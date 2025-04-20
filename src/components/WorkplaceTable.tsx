
import React from "react";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

interface WorkplaceItem {
  id: string;
  name: string;
  responsibleExpert?: string;
  branch?: string;
  sgkNo?: string;
  employeeCount?: number;
  memberCount?: number;
  status?: string;
  [key: string]: any;
}

interface WorkplaceTableProps {
  data: WorkplaceItem[];
  onEdit: (item: WorkplaceItem) => void;
}

const WorkplaceTable: React.FC<WorkplaceTableProps> = ({ data, onEdit }) => {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Güncel İşlem</TableHead>
            <TableHead>İşyeri Adı</TableHead>
            <TableHead>Bağlı Olduğu Şube</TableHead>
            <TableHead>Sorumlu Uzman</TableHead>
            <TableHead>SGK No</TableHead>
            <TableHead>İşçi Sayısı</TableHead>
            <TableHead>Üye Sayısı</TableHead>
            <TableHead className="text-right">İşlem</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.status}</TableCell>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.branch}</TableCell>
              <TableCell>{item.responsibleExpert}</TableCell>
              <TableCell>{item.sgkNo}</TableCell>
              <TableCell>{item.employeeCount}</TableCell>
              <TableCell>{item.memberCount}</TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onEdit(item)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default WorkplaceTable;
