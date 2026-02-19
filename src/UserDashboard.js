import React, { useEffect, useState, useCallback } from "react";
import {
  FaBoxOpen,
  FaHistory,
  FaCog,
  FaSignOutAlt,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || "light";
    } catch {
      return "light";
    }
  });

  // Apply theme to document (html[data-theme="..."])
  const applyTheme = useCallback(
    (t) => {
      const root = document.documentElement; // html element
      root.setAttribute("data-theme", t);
      try {
        localStorage.setItem("theme", t);
      } catch {}
      setTheme(t);
    },
    [setTheme]
  );

  useEffect(() => {
    applyTheme(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleTheme = () => {
    applyTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  // keyboard support for card "buttons"
  const handleKeyNav = (e, path) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigate(path);
    }
  };

  const Card = ({ title, desc, icon: Icon, path, accent = false, accentAction }) => (
    <div
      className={`dashboard-card ${accent ? "logout-card" : ""}`}
      role="button"
      tabIndex={0}
      onClick={() => (accent ? accentAction() : navigate(path))}
      onKeyDown={(e) => handleKeyNav(e, path)}
      aria-pressed="false"
    >
      <div className="card-top">
        <div className="icon-container">
          <Icon className="card-icon" />
        </div>
        <div className="card-content">
          <h2>{title}</h2>
          <p>{desc}</p>
        </div>
      </div>

      <div className="card-footer">
        {/* Accent button remains as visual cue; still clickable but optional */}
        {!accent ? (
          <button
            className="card-button"
            onClick={(e) => {
              e.stopPropagation();
              navigate(path);
            }}
            aria-label={`${title} button`}
          >
            Go
          </button>
        ) : (
          <button
            className="card-button logout-btn"
            onClick={(e) => {
              e.stopPropagation();
              accentAction();
            }}
            aria-label="Logout"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Welcome, User 👋</h1>
          <p className="dashboard-subtitle">Protect your health, confirm your medicine is authentic or not in seconds.</p>
        </div>

        <div className="header-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </header>

      <main className="card-container">
        <Card
          title="Identify Your Medicines"
          desc="Verify your medicine's details and authenticity."
          icon={FaBoxOpen}
          path="/check"
        />

        


        
      </main>
    </div>
  );
}
