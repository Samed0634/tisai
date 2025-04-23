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
  return <Link to={to} onClick={onClick} className="Canl\u0131 Panel">
      {children}
    </Link>;
}