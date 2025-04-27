
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { ActionHistory } from "@/types/actionHistory";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const ActivityHistory: React.FC = () => {
  const [activities, setActivities] = useState<ActionHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const { data, error } = await supabase
          .from('İşlem Geçmişi')
          .select('*')
          .order('id', { ascending: false });

        if (error) throw error;
        setActivities(data || []);
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'İşlem Geçmişi'
        },
        () => {
          fetchActivities();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

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
              <TableHead>İşlemi Yapan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>{activity["Tarih"]}</TableCell>
                <TableCell>{activity["Saat"]}</TableCell>
                <TableCell>{activity["İşlem Adı"]}</TableCell>
                <TableCell>{activity["İşlem Yapan Kullanıcı"]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ActivityHistory;
