import { createContext } from "react";
import { User } from "firebase/auth";

interface AuthContextType {
  currentUser: User | null;
  userLoggedIn: boolean;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);
