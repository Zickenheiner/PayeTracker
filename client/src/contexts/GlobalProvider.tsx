import type { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./AuthProvider";
import RefreshProvider from "./RefreshProvider";

export default function GlobalProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <ToastContainer />
      <RefreshProvider>
        <AuthProvider>{children}</AuthProvider>
      </RefreshProvider>
    </>
  );
}
