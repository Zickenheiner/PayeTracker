import { Link } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {
  return (
    <div className="login-container">
      <h1 className="login-title">PayeTacker</h1>
      <form className="login-form">
        <h2 className="login-form-title">Connexion</h2>
        <div className="login-form-input-container">
          <label htmlFor="login-form-input-email">Email</label>
          <input
            type="email"
            className="login-form-input"
            id="login-form-input-email"
            required
          />
        </div>
        <div className="login-form-input-container">
          <label htmlFor="login-form-input-password">Mot de passe</label>
          <input
            type="password"
            className="login-form-input"
            id="login-form-input-password"
            required
          />
          <p className="login-form-password-forgotten">Mot de passe oublié ?</p>
        </div>
        <button type="submit" className="login-form-button">
          Se connecter
        </button>
        <p className="login-form-go-to-register">
          Vous n'avez pas compte ? <Link to="/register">Cliquer ici</Link>
        </p>
      </form>
    </div>
  );
}
