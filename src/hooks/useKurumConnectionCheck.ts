
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export const useKurumConnectionCheck = () => {
  const navigate = useNavigate();

  const checkUserKurumConnection = async (userId: string) => {
    try {
      const { data: connections, error } = await supabase
        .from('kullanici_kurumlar')
        .select('*')
        .eq('user_id', userId)
        .limit(1);
      
      if (error) {
        console.error("Error checking kurum connection:", error);
        navigate("/");
        return;
      }
      
      if (connections && connections.length > 0) {
        // User has a kurum connection, redirect to main page
        navigate("/");
      } else {
        // User doesn't have a kurum connection, redirect to connection page
        navigate("/kurum-aktivasyon");
      }
    } catch (err) {
      console.error("Unexpected error during kurum connection check:", err);
      navigate("/");
    }
  };

  return { checkUserKurumConnection };
};
