
import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const useKurumStatus = () => {
  const [hasKurum, setHasKurum] = useState<boolean>(false);
  const [kurumId, setKurumId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();

  useEffect(() => {
    const checkKurumStatus = async () => {
      if (!user) {
        setHasKurum(false);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Check if user is associated with any institution
        const { data, error } = await supabase
          .from('kullanici_kurumlar')
          .select('kurum_id')
          .eq('user_id', user.id)
          .maybeSingle();
        
        if (error) throw error;
        
        setHasKurum(!!data);
        setKurumId(data?.kurum_id || null);
      } catch (error) {
        console.error('Error checking kurum status:', error);
        setHasKurum(false);
      } finally {
        setLoading(false);
      }
    };

    checkKurumStatus();
  }, [user]);

  return { hasKurum, kurumId, loading };
};
