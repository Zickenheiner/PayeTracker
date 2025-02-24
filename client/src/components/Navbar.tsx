import { History, LayoutDashboard, User } from "lucide-react";
import "../styles/Navbar.css";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  return (
    <nav className="navbar-container">
      <Link className="navbar-link" to="/history">
        <History
          className={`navbar-history-icon ${location.pathname.includes("/history") && "active"}`}
          size={35}
        />
        <span
          className={`navbar-link-name ${location.pathname.includes("/history") && "active"}`}
        >
          Historique
        </span>
      </Link>
      <Link className="navbar-link" to="/dashboard">
        <LayoutDashboard
          className={`navbar-dashboard-icon ${location.pathname.includes("/dashboard") && "active"}`}
          size={35}
        />
        <span
          className={`navbar-link-name ${location.pathname.includes("/dashboard") && "active"}`}
        >
          Dashboard
        </span>
      </Link>
      <Link className="navbar-link" to="/account">
        <User
          className={`navbar-user-icon ${location.pathname.includes("/acccount") && "active"}`}
          size={35}
        />
        <span
          className={`navbar-link-name ${location.pathname.includes("/acccount") && "active"}`}
        >
          Compte
        </span>
      </Link>
    </nav>
  );
}
