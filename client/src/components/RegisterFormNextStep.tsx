import { type FormEventHandler, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toastSuccess } from "../services/toast";
import type { UserRegister } from "../types/userTypes";

interface RegisterFormNextStepProps {
  userInfos: UserRegister;
}

export default function RegisterFormNextStep({
  userInfos,
}: RegisterFormNextStepProps) {
  const navigate = useNavigate();

  const lastnameRef = useRef<HTMLInputElement>(null);
  const firstnameRef = useRef<HTMLInputElement>(null);
  const birthdateRef = useRef<HTMLInputElement>(null);
  const sexRef = useRef<HTMLSelectElement>(null);

  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...userInfos,
            lastname: lastnameRef.current?.value,
            firstname: firstnameRef.current?.value,
            birthdate: birthdateRef.current?.value,
            sex: sexRef.current?.value,
            rate: 15.9,
          }),
        },
      );

      if (response.ok) {
        navigate("/login");
        toastSuccess("Votre compte a été créé avec succès");
      } else {
        setMessage("Une erreur est survenue");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2 className="register-form-title">Créer votre compte</h2>
      <div className="register-form-input-container">
        <label htmlFor="register-form-input-lastname">Nom</label>
        <input
          type="text"
          ref={lastnameRef}
          className="register-form-input"
          id="register-form-input-lastname"
          required
        />
      </div>
      <div className="register-form-input-container">
        <label htmlFor="register-form-input-fistname">Prénom</label>
        <input
          type="text"
          ref={firstnameRef}
          className="register-form-input"
          id="register-form-input-fistname"
          required
        />
      </div>
      <div className="register-form-input-container">
        <label htmlFor="register-form-input-birthdate">Date de naissance</label>
        <input
          type="date"
          ref={birthdateRef}
          max={
            new Date(new Date().setFullYear(new Date().getFullYear() - 18))
              .toISOString()
              .split("T")[0]
          }
          className="register-form-input"
          id="register-form-input-birthdate"
          required
        />
      </div>
      <div className="register-form-input-container">
        <label htmlFor="register-form-input-sex">Sexe</label>
        <select
          name="sex"
          ref={sexRef}
          id="register-form-input-sex"
          className="register-form-input"
        >
          <option value="">--</option>
          <option value="Homme">Homme</option>
          <option value="Femme">Femme</option>
        </select>
        {message && <p className="register-form-message">{message}</p>}
      </div>
      <button type="submit" className="register-form-button">
        Créer le compte
      </button>
      <p className="register-form-go-to-login">
        Vous n'avez pas compte ? <Link to="/login">Cliquer ici</Link>
      </p>
    </form>
  );
}
