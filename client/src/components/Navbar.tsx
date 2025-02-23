import { History, LayoutDashboard, User } from "lucide-react";
import "../styles/Navbar.css";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  return (
    <nav className="navbar-container">
      <Link className="navbar-link" to="/">
        <History
          className={`navbar-history-icon ${location.pathname === "/history" && "active"}`}
          size={45}
        />
        <span
          className={`navbar-link-name ${location.pathname === "/history" && "active"}`}
        >
          Historique
        </span>
      </Link>
      <Link className="navbar-link" to="/">
        <LayoutDashboard
          className={`navbar-dashboard-icon ${location.pathname === "/" && "active"}`}
          size={45}
        />
        <span
          className={`navbar-link-name ${location.pathname === "/" && "active"}`}
        >
          Dashboard
        </span>
      </Link>
      <Link className="navbar-link" to="/">
        <User
          className={`navbar-user-icon ${location.pathname === "/acccount" && "active"}`}
          size={45}
        />
        <span
          className={`navbar-link-name ${location.pathname === "/acccount" && "active"}`}
        >
          Compte
        </span>
      </Link>
    </nav>
  );
}
