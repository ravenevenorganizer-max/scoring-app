// frontend/src/pages/ScoreUpdate.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import "./ScoreUpdate.css";

// Koneksi ke backend Socket.IO
const socket = io("http://localhost:5000");

export default function ScoreUpdate() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [teams, setTeams] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/"); // proteksi: kalau belum login
      return;
    }

    // Ambil data awal dari backend
    const fetchScores = async () => {
      try {
        const res = await axios.get("http://localhost:5000/scores");
        setTeams(res.data);
      } catch (err) {
        console.error("Gagal ambil skor:", err);
      }
    };

    fetchScores();

    // Dengarkan update realtime dari server
    socket.on("scoreUpdated", (newScores) => {
      setTeams(newScores);
    });

    return () => {
      socket.off("scoreUpdated");
    };
  }, [navigate, token]);

  // Tambah skor
  const handleAddPoint = (teamName) => {
    const team = teams.find((t) => t.team === teamName);
    if (!team) return;
    socket.emit("updateScore", { team: teamName, score: team.score + 1 });
  };

  // Reset skor
  const handleReset = () => {
    teams.forEach((t) => {
      socket.emit("updateScore", { team: t.team, score: 0 });
    });
  };

  return (
    <div className="controller-container">
      <h2>🎮 Controller Score</h2>

      <div className="team-wrapper">
        {teams.map((team) => (
          <div key={team.team} className="team-card">
            <h3>{team.team}</h3>
            <p>
              👤 {team.player1} & {team.player2}
            </p>
            <div className="score-display">{team.score}</div>
            <button onClick={() => handleAddPoint(team.team)}>+ Point</button>
          </div>
        ))}
      </div>

      <div className="actions">
        <button onClick={handleReset} className="reset-btn">
          🔄 Reset
        </button>
        <button onClick={() => navigate("/master")} className="back-btn">
          ⬅ Kembali
        </button>
      </div>
    </div>
  );
}
