
import React from "react";

interface AuthLogoProps {
  title: string;
}

export function AuthLogo({ title }: AuthLogoProps) {
  return (
    <>
      <div className="flex items-center justify-center mb-2">
        <img 
          alt="TİS Takip Sistemi Logo"
          className="h-16 w-16 object-contain rounded-full border-2 border-primary/20"
          src="/lovable-uploads/733693aa-684f-4a0c-9a55-a65f5b9ee373.png"
        />
      </div>
      <div className="text-center text-2xl font-bold text-foreground mb-2">TISAI</div>
      <div className="text-sm font-normal text-center text-muted-foreground">
        {title}
      </div>
    </>
  );
}
