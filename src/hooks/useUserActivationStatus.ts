import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ActivationStatus {
  isActivated: boolean | null;
  isLoading: boolean;
  error: string | null;
}

// Keep track of activation status by user ID to prevent unnecessary re-fetching
const activationCache = new Map<string, boolean>();

export const useUserActivationStatus = (userId: string | undefined) => {
  const [status, setStatus] = useState<ActivationStatus>({
    isActivated: null,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    // Reset status when user ID changes
    if (userId) {
      setStatus(prev => ({ ...prev, isLoading: true }));
    }

    const checkActivationStatus = async () => {
      if (!userId) {
        setStatus({
          isActivated: false,
          isLoading: false,
          error: null
        });
        return;
      }

      // Check cache first
      if (activationCache.has(userId)) {
        const cachedStatus = activationCache.get(userId);
        console.log(`Using cached activation status for user ${userId}: ${cachedStatus}`);
        setStatus({
          isActivated: cachedStatus || false,
          isLoading: false,
          error: null
        });
        return;
      }

      try {
        const { data, error, status: queryStatus } = await supabase
          .from("kullanici_kurumlar")
          .select("id")
          .eq("user_id", userId)
          .single();

        if (error && queryStatus !== 406) { // 406 means no rows returned
          console.error("Aktivasyon durumu kontrol hatası:", error);
          setStatus({
            isActivated: false,
            isLoading: false,
            error: error.message
          });
          return;
        }
        
        const isActivated = !!data;
        
        // Cache the result
        activationCache.set(userId, isActivated);
        
        console.log(`User ${userId} activation status: ${isActivated}`);
        setStatus({
          isActivated: isActivated,
          isLoading: false,
          error: null
        });
      } catch (error: any) {
        console.error("Beklenmeyen aktivasyon kontrol hatası:", error);
        setStatus({
          isActivated: false,
          isLoading: false,
          error: error.message || "Aktivasyon durumu kontrol edilirken bir hata oluştu"
        });
      }
    };

    checkActivationStatus();
  }, [userId]);

  // Method to manually update cache and state (useful after activation)
  const setActivated = (userId: string, activated: boolean) => {
    if (userId) {
      activationCache.set(userId, activated);
      setStatus({
        isActivated: activated,
        isLoading: false,
        error: null
      });
    }
  };

  return { 
    ...status,
    setActivated 
  };
};
