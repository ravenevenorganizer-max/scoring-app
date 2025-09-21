// src/pages/Scoreboard.jsx
import { useNavigate } from "react-router-dom";

export default function Scoreboard() {
  const navigate = useNavigate();

  const courts = [
    { id: 1, name: "LAPANGAN 1" },
    { id: 2, name: "LAPANGAN 2" },
    { id: 3, name: "LAPANGAN 3" },
    { id: 4, name: "LAPANGAN 4" },
  ];

  const handleCopy = (id) => {
    const url = `${window.location.origin}/lapangan/${id}`;
    navigator.clipboard.writeText(url);
    alert(`Link Lapangan ${id} disalin: ${url}`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-8">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-6 py-4 bg-gray-800 text-white">
        <h1 className="text-xl font-bold">RAVEN STUDIO</h1>
        <div className="flex gap-4">
          <a href="#" className="hover:opacity-80">📷</a>
          <a href="#" className="hover:opacity-80">▶️</a>
          <a href="#" className="hover:opacity-80">🎵</a>
        </div>
      </header>

      {/* Title */}
      <h2 className="text-2xl font-bold mt-6 mb-10">BADMINTON SCOREBOARD</h2>

      {/* Courts List */}
      <div className="w-full max-w-xl flex flex-col gap-6">
        {courts.map((court) => (
          <div
            key={court.id}
            className="flex justify-between items-center"
          >
            {/* Tombol Lapangan */}
            <button
              onClick={() => navigate(`/controller/${court.id}`)}
              className="bg-gray-700 text-white font-bold py-4 px-6 rounded-md w-1/2 hover:bg-gray-900"
            >
              {court.name}
            </button>

            {/* Tombol Copy Link */}
            <button
              onClick={() => handleCopy(court.id)}
              className="flex items-center gap-2 text-black font-semibold ml-6 hover:opacity-70"
            >
              📄 COPY LINK
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
