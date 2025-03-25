import { useNavigate } from "react-router-dom";
import InputAccountInfo from "../components/InputAccountInfo";
import { useAuth } from "../contexts/AuthProvider";
import "../styles/Account.css";

export default function Account() {
  const { user, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/logout`,
        {
          method: "POST",
          credentials: "include",
        },
      );
      if (response.ok) {
        setAuth(null);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="account-page-container">
      <h1 className="account-title">Mon profil</h1>
      <section className="account-section-container">
        <h2 className="account-section-title">Mes informations :</h2>
        <section className="account-section-info-container">
          <div className="account-section-info-input-container">
            <label htmlFor="lastname">Nom</label>
            <InputAccountInfo
              id="lastname"
              column="lastname"
              value={user?.lastname}
              type="text"
            />
          </div>
          <div className="account-section-info-input-container">
            <label htmlFor="firstname">Prénom</label>
            <InputAccountInfo
              id="firstname"
              column="firstname"
              value={user?.firstname}
              type="text"
            />
          </div>
          <div className="account-section-info-input-container">
            <label htmlFor="birthdate">Date de naissance</label>
            <InputAccountInfo
              id="birthdate"
              column="birthdate"
              value={user?.birthdate}
              type="date"
            />
          </div>
          <div className="account-section-info-input-container">
            <label htmlFor="sex">Sexe</label>
            <InputAccountInfo
              id="sex"
              column="sex"
              value={user?.sex}
              type="sex"
            />
          </div>
          <div className="account-section-info-input-container">
            <label htmlFor="rate">Taux horaire</label>
            <InputAccountInfo
              id="rate"
              column="rate"
              value={user?.rate}
              type="number"
            />
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="account-logout-button"
          >
            Se déconnecter
          </button>
        </section>
      </section>
    </main>
  );
}
