import { redirect } from "react-router-dom";

export const requireAuth = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw redirect("/login");
  }
  return null;
};
