
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useUserActivationStatus = (userId: string | undefined) => {
  const [isActivated, setIsActivated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkActivationStatus = async () => {
      if (!userId) {
        setIsActivated(false);
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("kullanici_kurumlar")
          .select("id")
          .eq("user_id", userId)
          .single();

        if (error) {
          console.error("Aktivasyon durumu kontrol hatası:", error);
          setIsActivated(false);
        } else {
          setIsActivated(!!data);
        }
      } catch (error) {
        console.error("Beklenmeyen aktivasyon kontrol hatası:", error);
        setIsActivated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkActivationStatus();
  }, [userId]);

  return { isActivated, isLoading };
};
