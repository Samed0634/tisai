
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export const useKurumConnection = () => {
  const [isChecking, setIsChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserKurumConnection = async () => {
      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // Check if the user already has a connection to a kurum
        const { data: connections, error } = await supabase
          .from('kullanici_kurumlar')
          .select('*')
          .eq('user_id', session.user.id);
          
        if (connections && connections.length > 0) {
          // User already has a kurum connection, redirect to dashboard
          navigate('/');
        }
      }
      setIsChecking(false);
    };
    
    checkUserKurumConnection();
  }, [navigate]);

  return { isChecking };
};
