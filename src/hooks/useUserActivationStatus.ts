
import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useUserActivationStatus = (userId: string | undefined) => {
  const [isActivated, setIsActivated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(true);
  const lastCheckedUserId = useRef<string | undefined>(undefined);

  // Memoize the checkActivationStatus function to avoid recreating it on each render
  const checkActivationStatus = useCallback(async (uid: string | undefined) => {
    if (!uid) {
      console.log("useUserActivationStatus: No userId provided");
      if (isMounted.current) {
        setIsActivated(false);
        setIsLoading(false);
      }
      return;
    }

    // Skip check if we're checking the same user ID again
    if (lastCheckedUserId.current === uid && isActivated !== null) {
      console.log(`useUserActivationStatus: Using cached result for user ${uid}`);
      setIsLoading(false);
      return;
    }

    lastCheckedUserId.current = uid;
    
    try {
      console.log(`useUserActivationStatus: Checking activation for user ${uid}`);
      const { data, error } = await supabase
        .from("kullanici_kurumlar")
        .select("id")
        .eq("user_id", uid)
        .maybeSingle();

      if (error) {
        console.error("Activation status check error:", error);
        if (isMounted.current) {
          setIsActivated(false);
          setIsLoading(false);
        }
      } else {
        const activated = !!data;
        console.log(`useUserActivationStatus: User ${uid} activation status:`, activated);
        if (isMounted.current) {
          setIsActivated(activated);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error("Unexpected activation check error:", error);
      if (isMounted.current) {
        setIsActivated(false);
        setIsLoading(false);
      }
    }
  }, [isActivated]);

  useEffect(() => {
    // Component mount status tracking
    isMounted.current = true;
    
    setIsLoading(true);
    checkActivationStatus(userId);

    // Cleanup function to prevent state updates after unmount
    return () => {
      console.log("useUserActivationStatus: Cleanup");
      isMounted.current = false;
    };
  }, [userId, checkActivationStatus]);

  return { isActivated, isLoading };
};
