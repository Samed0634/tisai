
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavigationLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function NavigationLink({ 
  to, 
  children,
  className,
  onClick
}: NavigationLinkProps) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
        className
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
