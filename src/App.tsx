
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import KurumAktivasyon from "./pages/KurumAktivasyon";
import Dashboard from "./pages/Dashboard";
import NewData from "./pages/NewData";
import UploadTis from "./pages/UploadTis";
import DownloadTis from "./pages/DownloadTis";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/AppLayout";
import ActivityHistory from "./pages/ActivityHistory";
import ProcedureStatus from "./pages/ProcedureStatus";
import Statistics from "./pages/Statistics";
import { supabase } from "./integrations/supabase/client";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasKurumConnection, setHasKurumConnection] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Make sure authentication state is properly initialized and tracked
    console.log("Setting up auth state tracking...");
    
    // Set up the auth state change listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(`Auth state changed: ${event}`, session ? "Session active" : "No session");
      
      // Update authentication state based on session presence
      setIsAuthenticated(!!session);
      
      // Check if user has a kurum connection
      if (session?.user) {
        try {
          const { data, error } = await supabase
            .from('kullanici_kurumlar')
            .select('*')
            .eq('user_id', session.user.id)
            .single();
          
          if (error && error.code !== 'PGRST116') { // PGRST116 = row not found
            console.error("Error checking kurum connection:", error);
          }
          
          setHasKurumConnection(!!data);
        } catch (err) {
          console.error("Error checking kurum connection:", err);
          setHasKurumConnection(false);
        }
      } else {
        setHasKurumConnection(false);
      }
      
      setIsLoading(false);
    });
    
    // Then check for existing session
    const checkAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Session check error:", error);
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }
        
        console.log("Initial session check:", data.session ? "Session active" : "No session");
        setIsAuthenticated(!!data.session);
        
        // Check if user has a kurum connection
        if (data.session?.user) {
          try {
            const { data: kurumData, error: kurumError } = await supabase
              .from('kullanici_kurumlar')
              .select('*')
              .eq('user_id', data.session.user.id)
              .single();
            
            if (kurumError && kurumError.code !== 'PGRST116') { // PGRST116 = row not found
              console.error("Error checking kurum connection:", kurumError);
            }
            
            setHasKurumConnection(!!kurumData);
          } catch (err) {
            console.error("Error checking kurum connection:", err);
            setHasKurumConnection(false);
          }
        } else {
          setHasKurumConnection(false);
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error("Unexpected error during session check:", err);
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    };
    
    checkAuth();
    
    // Cleanup subscription on component unmount
    return () => {
      console.log("Cleaning up auth subscription");
      subscription.unsubscribe();
    };
  }, []);
  
  // Show loading state while checking authentication
  if (isLoading || isAuthenticated === null || hasKurumConnection === null) {
    return <div>Yükleniyor...</div>;
  }
  
  if (!isAuthenticated) {
    console.log("User not authenticated, redirecting to login");
    return <Navigate to="/login" replace />;
  }
  
  // If authenticated but no kurum connection, redirect to kurum activation
  if (isAuthenticated && !hasKurumConnection) {
    console.log("User authenticated but no kurum connection, redirecting to kurum activation");
    return <Navigate to="/kurum-aktivasyon" replace />;
  }
  
  console.log("User authenticated with kurum connection, rendering protected content");
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/kurum-aktivasyon" element={<KurumAktivasyon />} />
          
          {/* Redirect root path to dashboard if authenticated */}
          <Route path="/" element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="procedure-status" element={<ProcedureStatus />} />
            <Route path="new-data" element={<NewData />} />
            <Route path="upload-tis" element={<UploadTis />} />
            <Route path="download-tis" element={<DownloadTis />} />
            <Route path="activity-history" element={<ActivityHistory />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
