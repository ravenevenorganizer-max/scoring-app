// frontend/src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Master from "./pages/Master";
import ScoreUpdate from "./pages/ScoreUpdate";
import ScorePage from "./pages/ScorePage";
import Controller from "./pages/Controller";
import Scoreboard from "./pages/Scoreboard"; // ✅ Halaman utama scoreboard

function App() {
  return (
    <Router>
      <Routes>
        {/* Default halaman login */}
        <Route path="/" element={<Login />} />

        {/* Halaman Master (kelola user) */}
        <Route path="/master" element={<Master />} />

        {/* Halaman utama scoreboard */}
        <Route path="/scoreboard" element={<Scoreboard />} />

        {/* Halaman Update Score (opsional, kalau dipakai) */}
        <Route path="/score-update" element={<ScoreUpdate />} />

        {/* Halaman Score Display (publik) */}
        <Route path="/lapangan/:id" element={<ScorePage />} />

        {/* Halaman Controller (bisa pakai id atau tanpa id) */}
        <Route path="/controller" element={<Controller />} />
        <Route path="/controller/:id" element={<Controller />} />

        {/* Alias Score Page */}
        <Route path="/score/:courtId" element={<ScorePage />} />

        {/* 404 Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

// ✅ Komponen NotFound biar lebih rapih
function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>⚠️ 404 - Halaman Tidak Ditemukan</h2>
      <a href="/" style={{ color: "blue", textDecoration: "underline" }}>
        Kembali ke Login
      </a>
    </div>
  );
}

export default App;
