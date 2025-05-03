
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TokenActivation from "./pages/TokenActivation";
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
import { useUserActivationStatus } from "./hooks/useUserActivationStatus";
import { useToast } from "./hooks/use-toast";

const queryClient = new QueryClient();

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireActivation?: boolean;
}

const ProtectedRoute = ({ children, requireActivation = true }: ProtectedRouteProps) => {
  const [user, setUser] = useState<any | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const { isActivated, isLoading: isActivationLoading, error } = useUserActivationStatus(user?.id);
  const { toast } = useToast();
  
  useEffect(() => {
    // Make sure authentication state is properly initialized and tracked
    console.log("Setting up auth state tracking...");
    
    // Set up the auth state change listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(`Auth state changed: ${event}`, session ? "Session active" : "No session");
      
      // Update authentication state based on session presence
      setUser(session?.user || null);
      setAuthChecked(true);
    });
    
    // Then check for existing session
    const checkAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Session check error:", error);
          setUser(null);
          setAuthChecked(true);
          return;
        }
        
        console.log("Initial session check:", data.session ? "Session active" : "No session");
        setUser(data.session?.user || null);
        setAuthChecked(true);
      } catch (err) {
        console.error("Unexpected error during session check:", err);
        setUser(null);
        setAuthChecked(true);
      }
    };
    
    checkAuth();
    
    // Cleanup subscription on component unmount
    return () => {
      console.log("Cleaning up auth subscription");
      subscription.unsubscribe();
    };
  }, []);
  
  // Show loading state while checking authentication and activation
  if (!authChecked || (user && requireActivation && isActivationLoading)) {
    return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>;
  }
  
  // If not authenticated, redirect to login
  if (!user) {
    console.log("User not authenticated, redirecting to login");
    return <Navigate to="/login" replace />;
  }
  
  // If authentication is required but user is not activated, redirect to activation
  if (requireActivation && !isActivated) {
    console.log("User not activated, redirecting to activation");
    
    // Show error toast if there's an activation check error
    if (error) {
      toast({
        title: "Aktivasyon Kontrol Hatası",
        description: `Hesap aktivasyon durumu kontrol edilirken bir hata oluştu: ${error}`,
        variant: "destructive"
      });
    }
    
    return <Navigate to="/token-activation" replace />;
  }
  
  console.log("User authenticated and activated, rendering protected content");
  return <>{children}</>;
};

const TokenActivationRoute = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const { isActivated, isLoading: isActivationLoading } = useUserActivationStatus(user?.id);
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [redirectTimeout, setRedirectTimeout] = useState<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Session check error in TokenActivationRoute:", error);
          setUser(null);
          setAuthChecked(true);
          return;
        }
        
        console.log("Initial session check in TokenActivationRoute:", 
          data.session ? "Session active" : "No session");
        setUser(data.session?.user || null);
        setAuthChecked(true);
      } catch (err) {
        console.error("Unexpected error during session check:", err);
        setUser(null);
        setAuthChecked(true);
      }
    };
    
    checkAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(`Auth state changed in TokenActivationRoute: ${event}`);
      setUser(session?.user || null);
      setAuthChecked(true);
    });
    
    return () => subscription.unsubscribe();
  }, []);
  
  // Handle redirection when activation state changes
  useEffect(() => {
    // Clear any existing timeout
    if (redirectTimeout) {
      clearTimeout(redirectTimeout);
      setRedirectTimeout(null);
    }
    
    // Only proceed if authentication check is complete
    if (!authChecked) return;
    
    if (isActivated && !isActivationLoading) {
      console.log("User already activated, setting up redirect to home page");
      const timeout = setTimeout(() => {
        console.log("Executing redirect to home page for already-activated user");
        // We'll use window.location.href for a full page refresh to ensure clean state
        window.location.href = "/";
      }, 1500);
      setRedirectTimeout(timeout);
    }
    
    return () => {
      if (redirectTimeout) {
        clearTimeout(redirectTimeout);
      }
    };
  }, [isActivated, isActivationLoading, authChecked]);
  
  if (!authChecked || (user && isActivationLoading)) {
    return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>;
  }
  
  // Not authenticated, redirect to login
  if (!user) {
    // If there's a token in URL, save it to localStorage before redirecting
    if (token) {
      localStorage.setItem("pendingActivationToken", token);
      toast({
        title: "Giriş Yapmanız Gerekiyor",
        description: "Token aktivasyonu için önce giriş yapmalısınız.",
      });
    }
    return <Navigate to="/login" replace />;
  }
  
  // Already activated, redirect will be handled by the useEffect above
  if (isActivated) {
    return <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-xl font-semibold mb-4">Hesabınız zaten aktive edilmiş</h2>
      <p className="text-muted-foreground mb-4">Ana sayfaya yönlendiriliyorsunuz...</p>
    </div>;
  }
  
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
          <Route path="/token-activation" element={
            <TokenActivationRoute>
              <TokenActivation />
            </TokenActivationRoute>
          } />
          
          {/* Redirect root path to login if not authenticated */}
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
