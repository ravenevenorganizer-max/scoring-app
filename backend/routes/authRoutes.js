import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();

// 📌 LOGIN pakai name + password
router.post("/login", async (req, res) => {
  const { name, password } = req.body;

  try {
    // cari user berdasarkan name
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(400).json({ message: "User tidak ditemukan" });
    }

    // cek password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password salah" });
    }

    // buat token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

// 📌 REGISTER (opsional, kalau perlu buat akun wasit baru)
router.post("/register", async (req, res) => {
  const { name, password, role } = req.body;

  try {
    // cek duplikat name
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ message: "Nama sudah digunakan" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      password: hashedPassword,
      role: role || "user",
    });

    await newUser.save();

    res.json({ message: "User berhasil didaftarkan" });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Gagal mendaftarkan user" });
  }
});

export default router;
