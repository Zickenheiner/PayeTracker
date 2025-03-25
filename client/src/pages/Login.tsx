import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { type FormEventHandler, useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";

export default function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const [message, setMessage] = useState<string | null>(null);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/api/logout`, {
          method: "post",
          credentials: "include",
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          method: "post",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: (emailRef.current as HTMLInputElement).value,
            password: (passwordRef.current as HTMLInputElement).value,
          }),
        },
      );

      if (response.ok) {
        const user = await response.json();
        setAuth(user);
        navigate("/dashboard");
      } else {
        setMessage("Email ou mot de passe incorrect");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="login-page-container">
      <h1 className="login-title">PayeTacker</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-form-title">Connexion</h2>
        <div className="login-form-input-container">
          <label htmlFor="login-form-input-email">Email</label>
          <input
            type="email"
            ref={emailRef}
            className="login-form-input"
            id="login-form-input-email"
            required
          />
        </div>
        <div className="login-form-input-container">
          <label htmlFor="login-form-input-password">Mot de passe</label>
          <input
            type="password"
            ref={passwordRef}
            className="login-form-input"
            id="login-form-input-password"
            required
          />
          {message && <p className="login-form-message">{message}</p>}
          <p className="login-form-password-forgotten">Mot de passe oublié ?</p>
        </div>
        <button type="submit" className="login-form-button">
          Se connecter
        </button>
        <p className="login-form-go-to-register">
          Vous n'avez pas compte ? <Link to="/register">Cliquer ici</Link>
        </p>
      </form>
    </main>
  );
}
