
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NewData from "./pages/NewData";
import UploadTis from "./pages/UploadTis";
import DownloadTis from "./pages/DownloadTis";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/AppLayout";
import ActivityHistory from "./pages/ActivityHistory";
import ProcedureStatus from "./pages/ProcedureStatus";
import Statistics from "./pages/Statistics";
import SubscriptionPlans from "./pages/SubscriptionPlans";
import SubscriptionSuccessPage from "./pages/subscription/SuccessPage";
import SubscriptionCancelPage from "./pages/subscription/CancelPage";
import SubscriptionManagePage from "./pages/subscription/ManagePage";
import { AuthProvider, useAuth } from "@/hooks/useAuth";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  // Show loading state while checking authentication
  if (isLoading) {
    return <div>Yükleniyor...</div>;
  }
  
  if (!user) {
    console.log("User not authenticated, redirecting to login");
    return <Navigate to="/login" replace />;
  }
  
  console.log("User authenticated, rendering protected content");
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            
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
              <Route path="subscription" element={<SubscriptionPlans />} />
              <Route path="subscription/manage" element={<SubscriptionManagePage />} />
            </Route>

            {/* Public subscription success/cancel pages */}
            <Route path="/subscription/success" element={
              <ProtectedRoute>
                <SubscriptionSuccessPage />
              </ProtectedRoute>
            } />
            <Route path="/subscription/cancel" element={
              <ProtectedRoute>
                <SubscriptionCancelPage />
              </ProtectedRoute>
            } />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
