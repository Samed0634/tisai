
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useUserActivationStatus = (userId: string | undefined) => {
  const [isActivated, setIsActivated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const checkActivationStatus = async () => {
      if (!userId) {
        if (isMounted) {
          setIsActivated(false);
          setIsLoading(false);
        }
        return;
      }

      try {
        const { data, error } = await supabase
          .from("kullanici_kurumlar")
          .select("id")
          .eq("user_id", userId)
          .single();

        if (isMounted) {
          if (error) {
            console.error("Aktivasyon durumu kontrol hatası:", error);
            setIsActivated(false);
          } else {
            setIsActivated(!!data);
          }
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Beklenmeyen aktivasyon kontrol hatası:", error);
          setIsActivated(false);
          setIsLoading(false);
        }
      }
    };

    checkActivationStatus();
    
    return () => {
      isMounted = false;
    };
  }, [userId]);

  return { isActivated, isLoading };
};
