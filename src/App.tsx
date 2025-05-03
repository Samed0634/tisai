
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
  const [hasKurumConnection, setHasKurumConnection] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  
  useEffect(() => {
    // Set up the auth state change listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(`Auth state changed: ${event}`, session ? "Session active" : "No session");
      
      // Update authentication state based on session presence
      setIsAuthenticated(!!session);
      
      // If user is authenticated, check their kurum connection
      if (session?.user) {
        const { data: connections, error } = await supabase
          .from('kullanici_kurumlar')
          .select('*')
          .eq('user_id', session.user.id);
        
        setHasKurumConnection(connections && connections.length > 0);
      } else {
        setHasKurumConnection(false);
      }
      
      setIsChecking(false);
    });
    
    // Then check for existing session
    const checkAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Session check error:", error);
          setIsAuthenticated(false);
          setHasKurumConnection(false);
          setIsChecking(false);
          return;
        }
        
        console.log("Initial session check:", data.session ? "Session active" : "No session");
        setIsAuthenticated(!!data.session);
        
        // If user is authenticated, check their kurum connection
        if (data.session?.user) {
          const { data: connections, error } = await supabase
            .from('kullanici_kurumlar')
            .select('*')
            .eq('user_id', data.session.user.id);
          
          setHasKurumConnection(connections && connections.length > 0);
        } else {
          setHasKurumConnection(false);
        }
        
        setIsChecking(false);
      } catch (err) {
        console.error("Unexpected error during session check:", err);
        setIsAuthenticated(false);
        setHasKurumConnection(false);
        setIsChecking(false);
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
  if (isChecking || isAuthenticated === null) {
    return <div>Yükleniyor...</div>;
  }
  
  if (!isAuthenticated) {
    console.log("User not authenticated, redirecting to login");
    return <Navigate to="/login" replace />;
  }
  
  // If user is authenticated but has no kurum connection, redirect to kurum-aktivasyon
  if (isAuthenticated && hasKurumConnection === false) {
    console.log("User has no kurum connection, redirecting to activation page");
    return <Navigate to="/kurum-aktivasyon" replace />;
  }
  
  console.log("User authenticated and has kurum connection, rendering protected content");
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
          
          {/* Protected routes */}
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
