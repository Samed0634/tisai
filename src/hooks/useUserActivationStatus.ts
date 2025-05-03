
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useUserActivationStatus = (userId: string | undefined) => {
  const [isActivated, setIsActivated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {
    // Component mount status tracking
    isMounted.current = true;
    
    const checkActivationStatus = async () => {
      if (!userId) {
        console.log("useUserActivationStatus: No userId provided");
        if (isMounted.current) {
          setIsActivated(false);
          setIsLoading(false);
        }
        return;
      }

      try {
        console.log(`useUserActivationStatus: Checking activation for user ${userId}`);
        const { data, error } = await supabase
          .from("kullanici_kurumlar")
          .select("id")
          .eq("user_id", userId)
          .single();

        if (error) {
          console.error("Aktivasyon durumu kontrol hatası:", error);
          if (isMounted.current) {
            setIsActivated(false);
            setIsLoading(false);
          }
        } else {
          console.log(`useUserActivationStatus: User ${userId} activation status:`, !!data);
          if (isMounted.current) {
            setIsActivated(!!data);
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error("Beklenmeyen aktivasyon kontrol hatası:", error);
        if (isMounted.current) {
          setIsActivated(false);
          setIsLoading(false);
        }
      }
    };

    setIsLoading(true);
    checkActivationStatus();

    // Cleanup function to prevent state updates after unmount
    return () => {
      console.log("useUserActivationStatus: Cleanup");
      isMounted.current = false;
    };
  }, [userId]);

  return { isActivated, isLoading };
};
