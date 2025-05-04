
import { createContext } from "react";
import { Session, User } from "@supabase/supabase-js";

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkTrialStatus: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
