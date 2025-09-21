// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import logo from "../assets/raven.png"; // ✅ ambil logo dari folder assets

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        formData
      );
      localStorage.setItem("token", res.data.token);
      navigate("/master");
    } catch (err) {
      alert(err.response?.data?.message || "Login gagal!");
    }
  };

  return (
    <div className="login-container">
      {/* 🔥 Tambah logo */}
      <img src={logo} alt="Raven Studio Logo" className="logo" />

      <h2>🔑 Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nama"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        <button type="submit">Masuk</button>
      </form>
    </div>
  );
}
