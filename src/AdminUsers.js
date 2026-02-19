import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setMsg("⚠️ Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((u) => u._id !== id));
      setMsg("✅ User deleted successfully");
    } catch (err) {
      console.error("Error deleting user:", err);
      setMsg("❌ Error deleting user");
    }
  };

  const promoteUser = async (id) => {
    if (!window.confirm("Promote this user to Admin?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/admin/users/${id}/promote`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);
      setUsers(users.map((u) => (u._id === id ? { ...u, role: "admin" } : u)));
    } catch (err) {
      console.error("Error promoting user:", err);
      alert("❌ Failed to promote user");
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div style={{ padding: "2rem", color: "#eee" }}>
      <h1>👥 Manage Users</h1>
      {msg && <p style={{ color: "yellow" }}>{msg}</p>}

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "1rem" }}>
          <thead style={{ background: "#222", color: "white" }}>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                <td>
                  {u.role !== "admin" && (
                    <button
                      onClick={() => promoteUser(u._id)}
                      style={{
                        background: "green",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        marginRight: "5px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      ⬆ Promote
                    </button>
                  )}
                  <button
                    onClick={() => deleteUser(u._id)}
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
