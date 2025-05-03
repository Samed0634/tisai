
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const INACTIVITY_TIMEOUT = 180000; // 3 minutes in milliseconds (180 seconds)

export const useInactivityTimeout = () => {
  const timeoutRef = useRef<number | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const resetTimeout = () => {
    // Clear existing timeout
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    
    // Set new timeout
    timeoutRef.current = window.setTimeout(async () => {
      try {
        console.log('Inactive for 3 minutes, logging out...');
        
        // First perform the sign out
        const { error } = await supabase.auth.signOut();
        
        if (error) {
          console.error('Auto-logout error:', error);
          throw error;
        } else {
          toast({
            title: "Oturum sonlandı",
            description: "Uzun süre işlem yapılmadığı için oturumunuz sonlandırıldı.",
            variant: "default"
          });
          
          // Redirect to login page
          navigate('/login');
        }
      } catch (error: any) {
        console.error('Auto-logout error:', error);
        toast({
          title: "Çıkış yapılamadı",
          description: error?.message || "Bir hata oluştu.",
          variant: "destructive"
        });
        
        // Even if there's an error, still redirect to login page
        navigate('/login');
      }
    }, INACTIVITY_TIMEOUT);
  };

  // Setup event listeners to reset timeout on user activity
  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    // Reset timeout on component mount
    resetTimeout();
    
    // Add event listeners
    events.forEach((event) => {
      document.addEventListener(event, resetTimeout);
    });
    
    // Cleanup event listeners on component unmount
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      
      events.forEach((event) => {
        document.removeEventListener(event, resetTimeout);
      });
    };
  }, []);

  return { resetTimeout };
};
