import { Link } from "react-router-dom";
import "../styles/Dashboard.css";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";

export default function Dashboard() {
  const { auth } = useAuth();
  const [gross, setGross] = useState(0);
  const [net, setNet] = useState(0);

  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  const month = new Date().getMonth();

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/payes/${auth?.user_id}`,
        {
          credentials: "include",
        },
      );
      const data = await response.json();
      setGross(
        data.reduce(
          (acc: number, paye: { gross: number }) => acc + paye.gross,
          0,
        ),
      );
      setNet(
        data.reduce((acc: number, paye: { net: number }) => acc + paye.net, 0),
      );
    })();
  }, [auth]);

  return (
    <main className="dashboard-page-container">
      <h1 className="dashboard-title">{months[month - 1]}</h1>
      <div className="dashboard-section-container">
        <section className="dashboard-section">
          <h2 className="dashboard-section-amount">{gross.toFixed(2)}€</h2>
          <h3 className="dashboard-section-name">Brut</h3>
        </section>
        <section className="dashboard-section">
          <h2 className="dashboard-section-amount">~{net.toFixed(2)}€</h2>
          <h3 className="dashboard-section-name">Net</h3>
        </section>
      </div>
      <Link to="/dashboard/add" className="dashboard-add-button">
        Ajouter
      </Link>
    </main>
  );
}
