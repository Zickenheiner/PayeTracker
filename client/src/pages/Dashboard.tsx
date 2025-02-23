import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

export default function Dashboard() {
  return (
    <main className="dashboard-container">
      <h1 className="dashboard-title">Janvier</h1>
      <div className="dashboard-section-container">
        <section className="dashboard-section">
          <h2 className="dashboard-section-amount">543.56€</h2>
          <h3 className="dashboard-section-name">Brut</h3>
        </section>
        <section className="dashboard-section">
          <h2 className="dashboard-section-amount">399.43€</h2>
          <h3 className="dashboard-section-name">Net</h3>
        </section>
      </div>
      <Link to="/add" className="dashboard-add-button">
        Ajouter
      </Link>
    </main>
  );
}
