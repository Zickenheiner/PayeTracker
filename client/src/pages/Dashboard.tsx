import { Link } from "react-router-dom";
import "../styles/Dashboard.css";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { determineAmountFromSchedule } from "../services/hoursService";

export default function Dashboard() {
  const { auth, user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
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
      let amountTotal = 0;
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/work_sessions/current/user/${auth?.user_id}`,
        {
          credentials: "include",
        },
      );
      const currentSessionsData = await response.json();

      for (const session of currentSessionsData) {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/work_periods/${session.id}`,
          {
            credentials: "include",
          },
        );
        const periodsData = await response.json();

        if (!user?.rate) return;

        const amount = determineAmountFromSchedule(
          session,
          periodsData,
          user.rate,
        );

        amountTotal += amount;
      }

      setGross(amountTotal);
      setNet(amountTotal * 0.78);
      setIsLoading(false);
    })();
  }, [auth, user]);

  if (isLoading) {
    return <></>;
  }

  return (
    <main className="dashboard-page-container">
      <h1 className="dashboard-title">{months[month]}</h1>
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
