
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ActivityHistoryProps {
  activities: Array<{
    id: number;
    title: string;
    date: string;
    time: string;
    category: string;
  }>;
}

const ActivityHistory: React.FC<ActivityHistoryProps> = ({ activities }) => {
  const sortedActivities = [...activities].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>İşlem Geçmişi</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tarih</TableHead>
              <TableHead>Saat</TableHead>
              <TableHead>İşlem</TableHead>
              <TableHead>Kategori</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedActivities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>{activity.date}</TableCell>
                <TableCell>{activity.time}</TableCell>
                <TableCell>{activity.title}</TableCell>
                <TableCell>{activity.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ActivityHistory;
