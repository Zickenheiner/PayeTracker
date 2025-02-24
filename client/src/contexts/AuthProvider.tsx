import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthType {
  user_id: number;
}

interface AuthContextType {
  auth: AuthType | null;
  setAuth: (auth: AuthType) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthType | null>(null);

  useEffect(() => {
    (async () => {
      if (auth) {
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
  }, [auth]);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
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
