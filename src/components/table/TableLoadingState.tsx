
import React from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export const TableLoadingState: React.FC = () => {
  return (
    <div className="rounded-md border p-8">
      <LoadingSpinner />
    </div>
  );
};
