
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export interface ExpertStatistics {
  name: string;
  count: number;
  color?: string;
}

export const useExpertStatistics = () => {
  const [expertStats, setExpertStats] = useState<ExpertStatistics[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Generate a color based on the expert's name for consistency
  const generateColor = (name: string) => {
    const colors = [
      "#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#0088fe", 
      "#00C49F", "#FFBB28", "#FF8042", "#a4de6c", "#d0ed57"
    ];
    
    // Use the sum of character codes to select a color
    const sum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[sum % colors.length];
  };

  const fetchExpertStatistics = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch all workplace data
      const { data, error } = await supabase
        .from('isyerleri')
        .select('SORUMLU UZMAN, ID')
        .not('SORUMLU UZMAN', 'is', null);
      
      if (error) throw error;
      
      // Process data to count files per expert
      const expertCounts: Record<string, number> = {};
      
      data.forEach(item => {
        const expert = item["SORUMLU UZMAN"];
        if (expert) {
          expertCounts[expert] = (expertCounts[expert] || 0) + 1;
        }
      });
      
      // Convert to array format with colors
      const stats = Object.entries(expertCounts).map(([name, count]) => ({
        name,
        count,
        color: generateColor(name)
      }));
      
      // Sort by count in descending order
      stats.sort((a, b) => b.count - a.count);
      
      setExpertStats(stats);
    } catch (error) {
      console.error('Error fetching expert statistics:', error);
      setError('İstatistikler yüklenirken bir hata oluştu.');
      toast({
        title: "Hata",
        description: "Uzman istatistikleri yüklenirken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchExpertStatistics();
  }, []);

  return {
    expertStats,
    isLoading,
    error,
    refetch: fetchExpertStatistics
  };
};
