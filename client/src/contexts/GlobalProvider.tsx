import type { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./AuthProvider";

export default function GlobalProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <ToastContainer />
      <AuthProvider>{children}</AuthProvider>
    </>
  );
}
