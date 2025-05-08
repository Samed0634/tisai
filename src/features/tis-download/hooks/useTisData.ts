
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export interface TisItem {
  ID: number;
  "İŞYERİ ADI": string | null;
  "SGK NO": string | null;
  "TİS BAŞLANGIÇ TARİHİ": string | null;
  "TİS BİTİŞ TARİHİ": string | null;
  "BAĞLI OLDUĞU ŞUBE": string | null;
  "SORUMLU UZMAN": string | null;
  "TİS İMZA TARİHİ": string | null;
  "TİS GELİŞ TARİHİ": string | null;
  tis_url: string | null;
  [key: string]: any;
}

export const useTisData = () => {
  const [allResults, setAllResults] = useState<TisItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Get unique values for filter dropdowns
  const branches = Array.from(
    new Set(
      allResults.filter(item => item['BAĞLI OLDUĞU ŞUBE'])
        .map(item => item['BAĞLI OLDUĞU ŞUBE'] as string)
    )
  ).sort();

  const years = Array.from(
    new Set(
      allResults
        .filter(item => item['TİS İMZA TARİHİ'])
        .map(item => new Date(item['TİS İMZA TARİHİ'] as string).getFullYear().toString())
    )
  ).sort().reverse();

  const experts = Array.from(
    new Set(
      allResults
        .filter(item => item['SORUMLU UZMAN'])
        .map(item => item['SORUMLU UZMAN'] as string)
    )
  ).sort();

  const fetchTisData = async () => {
    setIsLoading(true);
    try {
      // Fetch all items with TIS URLs, then filter on client side
      const { data, error } = await supabase
        .from('isyerleri')
        .select('*')
        .not('tis_url', 'is', null);
      
      if (error) throw error;
      
      setAllResults(data || []);
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Hata",
        description: "Arama yapılırken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Load data when component mounts
  useEffect(() => {
    fetchTisData();
  }, []);

  return { 
    allResults, 
    isLoading, 
    branches, 
    years, 
    experts, 
    fetchTisData 
  };
};
