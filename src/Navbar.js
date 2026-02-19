import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/dashboard" className="navbar-logo">
          🛡️ Medicine Identifier
        </Link>

        {/* Hamburger for mobile */}
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          <i className={isOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </div>

        {/* Links */}
        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
          <li><Link to="/check" className="nav-link">Check Product</Link></li>
        </ul>
      </div>
    </nav>
  );
}
