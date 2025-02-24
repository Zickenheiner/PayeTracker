import { redirect } from "react-router-dom";

const isAuthenticated = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth`, {
    credentials: "include",
  });

  if (!response.ok) {
    return false;
  }
  return true;
};

export const requireAuth = async () => {
  const isAuth = await isAuthenticated();
  if (isAuth) {
    return null;
  }
  throw redirect("/login");
};

export const redirectBasedOnAuth = async () => {
  const isAuth = await isAuthenticated();
  if (isAuth) {
    throw redirect("/dashboard");
  }
  throw redirect("/login");
};
