import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import CheckProduct from "./CheckProduct";
import Navbar from "./Navbar";
import AdminUsers from "./AdminUsers";


// import ProtectedRoute from "./ProtectedRoute"; // ❌ remove for now

function Layout({ children }) {
  const location = useLocation();

  // Hide Navbar on login & signup pages
  const hideNavbar = ["/login", "/signup"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Default route → redirect to login */}
          <Route path="/" element={<Navigate to="/dashboard" />} />

          
          {/* Dashboards (no protection for now) */}
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />

          {/* Features (no protection for now) */}
          <Route path="/check" element={<CheckProduct />} />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
