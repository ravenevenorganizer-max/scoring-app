import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/raven.png"; // 🔹 logo biar konsisten sama login

export default function Master() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("wasit");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // 📌 Ambil data user
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (error) {
      console.error("Gagal ambil user:", error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/"); // redirect kalau belum login
      return;
    }
    fetchUsers();
  }, [navigate, token]);

  // 📌 Tambah user baru
  const handleAddUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/users",
        { name, password, role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setName("");
      setPassword("");
      setRole("wasit");
      fetchUsers();
    } catch (error) {
      console.error("Gagal tambah user:", error);
    } finally {
      setLoading(false);
    }
  };

  // 📌 Hapus user
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus user ini?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (error) {
      console.error("Gagal hapus user:", error);
    }
  };

  // 📌 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🔹 Header */}
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Raven Studio" className="h-10" />
            <h1 className="text-xl font-bold text-gray-700">Manajemen Wasit</h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/controller")}
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
            >
              🎮 Controller
            </button>
            <button
              onClick={() => navigate("/scoreboard")}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              📺 Scoreboard
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </header>

      {/* 🔹 Konten */}
      <main className="max-w-6xl mx-auto p-6">
        {/* Form tambah wasit */}
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">➕ Tambah User</h2>
          <form onSubmit={handleAddUser} className="grid gap-4 md:grid-cols-3">
            <input
              type="text"
              placeholder="Nama wasit"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded-lg w-full"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded-lg w-full"
              required
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border p-2 rounded-lg w-full"
            >
              <option value="wasit">Wasit</option>
              <option value="admin">Admin</option>
              <option value="scorer">Scorer</option>
            </select>
            <button
              type="submit"
              disabled={loading}
              className="col-span-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              {loading ? "Menyimpan..." : "Tambah User"}
            </button>
          </form>
        </div>

        {/* Daftar user */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">👥 Daftar User</h2>
          {users.length === 0 ? (
            <p className="text-gray-500">Belum ada user terdaftar.</p>
          ) : (
            <ul className="divide-y">
              {users.map((user) => (
                <li
                  key={user._id}
                  className="flex justify-between items-center py-3"
                >
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">Role: {user.role}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    Hapus
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
