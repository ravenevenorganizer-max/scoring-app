import { useState } from "react";
import { FaUndo } from "react-icons/fa";
import { GiShuttlecock } from "react-icons/gi";

export default function Controller() {
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [shuttle, setShuttle] = useState(0);
  const [server, setServer] = useState("player1"); // default player1 yg servis

  const resetScore = () => {
    setScore1(0);
    setScore2(0);
    setShuttle(0);
    setServer("player1");
  };

  const resetGame = () => {
    resetScore();
  };

  const changeCourt = () => {
    setServer(server === "player1" ? "player2" : "player1");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-800 text-white">
      {/* Player Names */}
      <div className="grid grid-cols-2 w-full text-center text-2xl font-bold">
        <div className="bg-black py-2">PLAYER 1</div>
        <div className="bg-black py-2">PLAYER 2</div>
      </div>

      {/* Scores */}
      <div className="grid grid-cols-2 gap-4 w-full flex-1 text-center">
        <div className="bg-black flex flex-col items-center justify-center relative">
          <span className="text-8xl font-bold">{score1}</span>
          {server === "player1" && (
            <GiShuttlecock className="absolute top-4 right-4 text-white text-4xl" />
          )}
        </div>
        <div className="bg-black flex flex-col items-center justify-center relative">
          <span className="text-8xl font-bold">{score2}</span>
          {server === "player2" && (
            <GiShuttlecock className="absolute top-4 right-4 text-white text-4xl" />
          )}
        </div>
      </div>

      {/* Shuttle Count & Control */}
      <div className="grid grid-cols-3 gap-2 w-1/2 my-4 text-center">
        <button
          onClick={() => setShuttle((prev) => Math.max(prev - 1, 0))}
          className="bg-black py-2 text-2xl"
        >
          -
        </button>
        <div className="bg-black py-2 text-2xl">Shuttle: {shuttle}</div>
        <button
          onClick={() => setShuttle((prev) => prev + 1)}
          className="bg-black py-2 text-2xl"
        >
          +
        </button>
      </div>

      {/* Middle Controls */}
      <div className="grid grid-cols-3 gap-4 w-3/4 text-center">
        <button onClick={resetScore} className="bg-black py-2 flex items-center justify-center gap-2">
          <FaUndo /> RESET SCORE
        </button>
        <button onClick={changeCourt} className="bg-black py-2">
          Change Court
        </button>
        <button onClick={resetGame} className="bg-black py-2">
          RESET GAME
        </button>
      </div>
    </div>
  );
}
