
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { ActionHistory } from "@/types/actionHistory";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const ActivityHistory: React.FC = () => {
  const [activities, setActivities] = useState<ActionHistory[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<ActionHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // Fetch the current session to ensure we're authenticated
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          toast({
            title: "Oturum Hatası",
            description: "Oturum bilgileri alınamadı. Lütfen tekrar giriş yapın.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
        
        if (!sessionData.session) {
          console.error('No active session found. User might not be authenticated.');
          toast({
            title: "Oturum Bulunamadı",
            description: "Aktif bir oturum bulunamadı. Lütfen giriş yapın.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
        
        // Ensure we have the auth token in the request
        const { data, error } = await supabase
          .from('İşlem Geçmişi')
          .select('*')
          .order('id', { ascending: false });

        if (error) {
          console.error('Error fetching activities:', error);
          toast({
            title: "Veri Hatası",
            description: "İşlem geçmişi verileri yüklenirken bir hata oluştu: " + error.message,
            variant: "destructive",
          });
          throw error;
        }
        
        console.log('Fetched activities data:', data);
        setActivities(data || []);
        setFilteredActivities(data || []);
      } catch (error) {
        console.error('Error in fetchActivities:', error);
        toast({
          title: "Hata",
          description: "İşlem geçmişi yüklenirken bir hata oluştu.",
          variant: "destructive",
        });
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
        (payload) => {
          console.log('Realtime update received:', payload);
          fetchActivities();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  useEffect(() => {
    filterActivities();
  }, [searchTerm, timeFilter, activities]);

  const filterActivities = () => {
    let filtered = [...activities];

    // Apply search filter
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (activity) => 
          activity["İşlem Adı"]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity["İşlem Yapan Kullanıcı"]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (activity["İşyeri ADI"] && activity["İşyeri ADI"]?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply time filter
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    if (timeFilter === "daily") {
      filtered = filtered.filter(activity => {
        const activityDate = new Date(activity["Tarih"]);
        return activityDate >= today;
      });
    } else if (timeFilter === "weekly") {
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
      filtered = filtered.filter(activity => {
        const activityDate = new Date(activity["Tarih"]);
        return activityDate >= weekAgo;
      });
    } else if (timeFilter === "monthly") {
      const monthAgo = new Date(today);
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      filtered = filtered.filter(activity => {
        const activityDate = new Date(activity["Tarih"]);
        return activityDate >= monthAgo;
      });
    } else if (timeFilter === "yearly") {
      const yearAgo = new Date(today);
      yearAgo.setFullYear(yearAgo.getFullYear() - 1);
      filtered = filtered.filter(activity => {
        const activityDate = new Date(activity["Tarih"]);
        return activityDate >= yearAgo;
      });
    }

    setFilteredActivities(filtered);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (value: string) => {
    setTimeFilter(value);
  };

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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mt-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="İşlem veya İşyeri Ara..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-8"
            />
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Select value={timeFilter} onValueChange={handleFilterChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtre Seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
                <SelectItem value="daily">Günlük</SelectItem>
                <SelectItem value="weekly">Haftalık</SelectItem>
                <SelectItem value="monthly">Aylık</SelectItem>
                <SelectItem value="yearly">Yıllık</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
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
            {filteredActivities.length > 0 ? (
              filteredActivities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>{activity["Tarih"]}</TableCell>
                  <TableCell>{activity["Saat"]}</TableCell>
                  <TableCell>{activity["İşlem Adı"]}</TableCell>
                  <TableCell>{activity["İşlem Yapan Kullanıcı"]}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  {searchTerm || timeFilter !== "all" 
                    ? "Arama kriterlerine uygun sonuç bulunamadı." 
                    : "Henüz işlem geçmişi bulunmamaktadır."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ActivityHistory;
