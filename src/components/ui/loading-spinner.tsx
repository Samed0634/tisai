
import { Loader2 } from "lucide-react";

export const LoadingSpinner = ({ className }: { className?: string }) => {
  return (
    <div className="flex items-center justify-center p-4">
      <Loader2 className={`h-6 w-6 animate-spin text-primary ${className}`} />
    </div>
  );
};
