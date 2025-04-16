import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Actions from "./pages/Actions";
import NewData from "./pages/NewData";
import UpdateData from "./pages/UpdateData";
import Chatbot from "./pages/Chatbot";
import DataDetails from "./pages/DataDetails";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/AppLayout";

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
            <Route path="actions" element={<Actions />} />
            <Route path="new-data" element={<NewData />} />
            <Route path="update-data" element={<UpdateData />} />
            <Route path="chatbot" element={<Chatbot />} />
            <Route path="details/:type" element={<DataDetails />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
