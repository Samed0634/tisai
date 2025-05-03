
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Login from "./pages/Login";
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

const queryClient = new QueryClient();

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireActivation?: boolean;
}

const ProtectedRoute = ({ children, requireActivation = true }: ProtectedRouteProps) => {
  const [user, setUser] = useState<any | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const { isActivated, isLoading: isActivationLoading } = useUserActivationStatus(user?.id);
  
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
    return <Navigate to="/token-activation" replace />;
  }
  
  console.log("User authenticated and activated, rendering protected content");
  return <>{children}</>;
};

const TokenActivationRoute = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const { isActivated, isLoading, hasError } = useUserActivationStatus(user?.id);
  const redirected = useRef(false);
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setUser(data.session?.user || null);
        setAuthChecked(true);
      } catch (error) {
        console.error("Auth check error:", error);
        setUser(null);
        setAuthChecked(true);
      }
    };
    
    checkAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("TokenActivationRoute: Auth state changed", event);
      setUser(session?.user || null);
      setAuthChecked(true);
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  useEffect(() => {
    if (isActivated && !redirected.current) {
      console.log("TokenActivationRoute: User already activated, redirecting to dashboard");
      redirected.current = true;
      
      // Redirect after a small delay to prevent render loop
      const timer = setTimeout(() => {
        window.location.href = "/";
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isActivated]);
  
  if (!authChecked || isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>;
  }
  
  // Not authenticated, redirect to login
  if (!user) {
    console.log("TokenActivationRoute: User not authenticated, redirecting to login");
    return <Navigate to="/login" replace />;
  }
  
  // Already activated, redirect to dashboard
  if (isActivated && !hasError) {
    console.log("TokenActivationRoute: User already activated, redirecting to dashboard");
    return <Navigate to="/" replace />;
  }
  
  console.log("TokenActivationRoute: User authenticated but not activated, showing activation page");
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
