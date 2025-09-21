import sqlite3 from "sqlite3";
import { open } from "sqlite";

let db;

/**
 * 🔹 Inisialisasi Database SQLite
 */
export async function initDB() {
  db = await open({
    filename: "./scoreboard.db", // file database SQLite
    driver: sqlite3.Database,
  });

  // Tabel skor
  await db.exec(`
    CREATE TABLE IF NOT EXISTS scores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      team TEXT UNIQUE,
      score INTEGER DEFAULT 0,
      player1 TEXT,
      player2 TEXT
    )
  `);

  // Tabel users (untuk login & master user)
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )
  `);

  // Tambahkan tim default jika kosong
  const scoreCount = await db.get(`SELECT COUNT(*) as c FROM scores`);
  if (scoreCount.c === 0) {
    await db.run(
      `INSERT INTO scores (team, score, player1, player2) VALUES (?, ?, ?, ?)`,
      ["PLAYER 1", 0, "Player A1", "Player A2"]
    );
    await db.run(
      `INSERT INTO scores (team, score, player1, player2) VALUES (?, ?, ?, ?)`,
      ["PLAYER 2", 0, "Player B1", "Player B2"]
    );
  }

  // Tambahkan admin default jika kosong
  const userCount = await db.get(`SELECT COUNT(*) as c FROM users`);
  if (userCount.c === 0) {
    await db.run(
      `INSERT INTO users (username, password) VALUES (?, ?)`,
      ["admin", "123456"]
    );
  }

  console.log("✅ Database siap digunakan");
}

/**
 * 🔹 Ambil semua skor
 */
export async function getScores() {
  return await db.all(`SELECT * FROM scores`);
}

/**
 * 🔹 Update skor berdasarkan tim
 */
export async function updateScore(team, score) {
  await db.run(`UPDATE scores SET score = ? WHERE team = ?`, [score, team]);
}

/**
 * 🔹 Update nama pemain (untuk ganda)
 */
export async function updatePlayers(team, player1, player2) {
  await db.run(
    `UPDATE scores SET player1 = ?, player2 = ? WHERE team = ?`,
    [player1, player2, team]
  );
}

/**
 * 🔹 Ambil semua user
 */
export async function getUsers() {
  return await db.all(`SELECT id, username FROM users`);
}

/**
 * 🔹 Tambah user baru
 */
export async function addUser(username, password) {
  return await db.run(
    `INSERT INTO users (username, password) VALUES (?, ?)`,
    [username, password]
  );
}

/**
 * 🔹 Hapus user berdasarkan ID
 */
export async function deleteUser(id) {
  return await db.run(`DELETE FROM users WHERE id = ?`, [id]);
}

/**
 * 🔹 Cari user berdasarkan username
 */
export async function findUser(username) {
  return await db.get(`SELECT * FROM users WHERE username = ?`, [username]);
}
