import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRefresh } from "./RefreshProvider";

interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  sex: string;
  rate: number;
}

interface AuthType {
  user_id: number;
}

interface AuthContextType {
  auth: AuthType | null;
  setAuth: (auth: AuthType | null) => void;
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthType | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const { refresh } = useRefresh();

  useEffect(() => {
    (async () => {
      if (auth) {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/${auth.user_id}`,
          {
            credentials: "include",
          },
        );
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
        return;
      }
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth`,
          {
            credentials: "include",
          },
        );

        if (response.ok) {
          const data = await response.json();
          setAuth(data);
        }
      } catch (error) {
        console.error(error);
      }
    })();
    refresh;
  }, [auth, refresh]);
  return (
    <AuthContext.Provider value={{ auth, setAuth, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
