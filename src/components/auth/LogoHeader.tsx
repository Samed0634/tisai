
import React from "react";
import { CardTitle } from "@/components/ui/card";

export const LogoHeader: React.FC = () => {
  return (
    <>
      <div className="flex items-center justify-center mb-2">
        <img
          alt="TİS Takip Sistemi Logo"
          className="h-16 w-16 object-contain rounded-full border-2 border-primary/20 hover:border-primary/60 transition-all duration-300"
          src="/lovable-uploads/733693aa-684f-4a0c-9a55-a65f5b9ee373.png"
        />
      </div>
      <div className="text-center text-2xl font-bold text-foreground mb-2 bg-clip-text bg-gradient-to-r from-primary-600 to-blue-500">TISAI</div>
      <CardTitle className="text-sm font-normal text-center text-muted-foreground">
        Toplu İş Sözleşmesi Otomasyon Sistemi
      </CardTitle>
    </>
  );
};
