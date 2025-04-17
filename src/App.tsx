
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NewData from "./pages/NewData";
import UpdateData from "./pages/UpdateData";
import ProcedureBot from "./pages/ProcedureBot";
import TisBot from "./pages/TisBot";
import UploadTis from "./pages/UploadTis";
import DataDetails from "./pages/DataDetails";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/AppLayout";
import ProcedureStatus from "./pages/ProcedureStatus";
import WriteLegalNotice from "./pages/WriteLegalNotice";
import CourtDecisionQuery from "./pages/CourtDecisionQuery";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // Basit bir token kontrolü - gerçek uygulamada daha gelişmiş bir doğrulama olmalı
  const isAuthenticated = !!localStorage.getItem("token");
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
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
          
          <Route path="/" element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="new-data" element={<NewData />} />
            <Route path="update-data" element={<UpdateData />} />
            <Route path="upload-tis" element={<UploadTis />} />
            <Route path="procedure-bot" element={<ProcedureBot />} />
            <Route path="tis-bot" element={<TisBot />} />
            <Route path="procedure-status" element={<ProcedureStatus />} />
            <Route path="write-legal-notice" element={<WriteLegalNotice />} />
            <Route path="court-decision-query" element={<CourtDecisionQuery />} />
            <Route path="details/:type" element={<DataDetails />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
