import { type ReactNode, createContext, useContext, useState } from "react";

interface RefreshContextType {
  refresh: boolean;
  setRefresh: (refresh: boolean) => void;
}

const RefreshContext = createContext<RefreshContextType | null>(null);

export default function RefreshProvider({ children }: { children: ReactNode }) {
  const [refresh, setRefresh] = useState(false);
  return (
    <RefreshContext.Provider value={{ refresh, setRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
}

export const useRefresh = () => {
  const context = useContext(RefreshContext);
  if (!context) {
    throw new Error("useRefresh must be used within a RefreshProvider");
  }
  return context;
};
