import { type FormEventHandler, useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { UserRegister } from "../types/userTypes";

interface RegisterFormProps {
  setNextStep: (value: boolean) => void;
  setUserInfos: (value: UserRegister) => void;
}

export default function RegisterForm({
  setNextStep,
  setUserInfos,
}: RegisterFormProps) {
  const [message, setMessage] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/verify-email?email=${emailRef.current?.value}`,
      );
      if (response.ok) {
        setMessage("Cet email est déjà utilisé");
        return;
      }
    } catch (error) {
      console.error(error);
    }
    if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
      setMessage("Les mots de passe ne correspondent pas");
      return;
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{10,}$/.test(
        passwordRef.current?.value as string,
      )
    ) {
      setMessage(
        "Le mot de passe doit contenir au moins 10 caractères, une lettre minuscule, une lettre majuscule et un caractère spécial",
      );
      return;
    }

    setUserInfos({
      email: emailRef.current?.value as string,
      password: passwordRef.current?.value as string,
    });
    setNextStep(true);
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2 className="register-form-title">Créer votre compte</h2>
      <div className="register-form-input-container">
        <label htmlFor="register-form-input-email">Email</label>
        <input
          type="email"
          ref={emailRef}
          className="register-form-input"
          id="register-form-input-email"
          required
        />
      </div>
      <div className="register-form-input-container">
        <label htmlFor="register-form-input-password">Mot de passe</label>
        <input
          type="password"
          ref={passwordRef}
          className="register-form-input"
          id="register-form-input-password"
          required
        />
      </div>
      <div className="register-form-input-container">
        <label htmlFor="register-form-input-confirm-password">
          Confirmer le mot de passe
        </label>
        <input
          type="password"
          ref={confirmPasswordRef}
          className="register-form-input"
          id="register-form-input-confirm-password"
          required
        />
        {message && <p className="register-form-message">{message}</p>}
      </div>
      <button type="submit" className="register-form-button-next-step">
        Suivant
      </button>
      <p className="register-form-go-to-login">
        Vous n'avez pas compte ? <Link to="/login">Cliquer ici</Link>
      </p>
    </form>
  );
}
