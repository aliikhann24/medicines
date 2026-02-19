import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
      } catch (err) {
        setError("Failed to load dashboard");
        console.error(err);
      }
    };
    fetchData();
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📊 {data.message}</h1>

      {/* Stats */}
      <div style={{ marginBottom: "1rem" }}>
        <h2>Stats</h2>
        <p>Total Users: {data.stats.totalUsers}</p>
        <p>Total Products: {data.stats.totalProducts}</p>
        <p>Reports: {data.stats.reports}</p>
      </div>

      {/* Recent Users */}
      <div style={{ marginBottom: "1rem" }}>
        <h2>Recent Users</h2>
        <ul>
          {data.recentUsers?.map((u) => (
            <li key={u._id}>
              {u.email} — {new Date(u.createdAt).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Checks */}
      <div>
        <h2>Recent Product Checks</h2>
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Result</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data.recentChecks?.map((c) => (
              <tr key={c._id}>
                <td>{c.user?.email || "N/A"}</td>
                <td>{c.productType}</td>
                <td>{c.result}</td>
                <td>{new Date(c.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
