// frontend/src/pages/ScorePage.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ScorePage() {
  const { id, courtId } = useParams();
  const courtNumber = id || courtId;

  // sementara masih dummy, nanti bisa di-fetch dari backend/controller
  const [scoreData, setScoreData] = useState({
    left: { players: ["PLAYER A1", "PLAYER A2"], score: 15 },
    right: { players: ["PLAYER B1", "PLAYER B2"], score: 18 },
  });

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background scoreboard */}
      <img
        src="/scoreboard-bg.jpg" // simpan file desain scoreboard di folder public/
        alt="Scoreboard"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay konten */}
      <div className="absolute inset-0 flex flex-col text-white">
        {/* Header title & lapangan */}
        <div className="flex justify-between items-center px-10 py-6">
          <div className="text-3xl font-extrabold uppercase drop-shadow-md">
            TOURNAMENT BADMINTON NARAYA CUP 2025
          </div>
          <div className="text-xl font-bold drop-shadow-md">
            LAPANGAN {courtNumber}
          </div>
        </div>

        {/* Konten score */}
        <div className="flex-1 flex flex-col justify-center px-10">
          {/* Tim kiri */}
          <div className="flex justify-between items-center py-6">
            <div className="text-3xl font-bold uppercase drop-shadow-md">
              {scoreData.left.players.join(" / ")}
            </div>
            <div className="w-28 text-center text-yellow-400 text-7xl font-extrabold drop-shadow-lg">
              {scoreData.left.score}
            </div>
          </div>

          {/* Tim kanan */}
          <div className="flex justify-between items-center py-6">
            <div className="text-3xl font-bold uppercase drop-shadow-md">
              {scoreData.right.players.join(" / ")}
            </div>
            <div className="w-28 text-center text-yellow-400 text-7xl font-extrabold drop-shadow-lg">
              {scoreData.right.score}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
