
import { useContext } from "react";
import { AuthContext, AuthContextType } from "@/context/AuthContext";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Export the AuthProvider from the providers folder
export { AuthProvider } from "@/providers/AuthProvider";
