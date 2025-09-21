const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // alamat React
    methods: ["GET", "POST"],
  },
});

// simpan skor per lapangan
let courts = {
  1: { player1: 0, player2: 0 },
  2: { player1: 0, player2: 0 },
  3: { player1: 0, player2: 0 },
  4: { player1: 0, player2: 0 },
};

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // saat controller update skor
  socket.on("updateScore", ({ courtId, scores }) => {
    courts[courtId] = scores;

    // broadcast ke semua scoreboard sesuai lapangan
    io.emit(`scoreUpdate-${courtId}`, scores);
    console.log(`Lapangan ${courtId} updated:`, scores);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(4000, () => {
  console.log("🚀 Server running on http://localhost:4000");
});
