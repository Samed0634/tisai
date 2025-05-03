
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/routes/ProtectedRoute";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Dashboard from "@/pages/Dashboard";
import NewData from "@/pages/NewData";
import UploadTis from "@/pages/UploadTis";
import DownloadTis from "@/pages/DownloadTis";
import NotFound from "@/pages/NotFound";
import ActivityHistory from "@/pages/ActivityHistory";
import ProcedureStatus from "@/pages/ProcedureStatus";
import Statistics from "@/pages/Statistics";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="procedure-status" element={<ProcedureStatus />} />
        <Route path="new-data" element={<NewData />} />
        <Route path="upload-tis" element={<UploadTis />} />
        <Route path="download-tis" element={<DownloadTis />} />
        <Route path="activity-history" element={<ActivityHistory />} />
      </Route>

      {/* Redirect root path to login if not authenticated */}
      <Route index element={<Navigate to="/login" replace />} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
