
import { ReactNode } from "react";
import { AuthContext, AuthContextType } from "@/context/AuthContext";
import { useAuthProvider } from "@/hooks/useAuthProvider";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const authValues = useAuthProvider();
  
  return (
    <AuthContext.Provider value={authValues}>
      {children}
    </AuthContext.Provider>
  );
};
