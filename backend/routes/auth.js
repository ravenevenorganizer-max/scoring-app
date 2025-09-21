import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();

// 📌 Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, name: user.name, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

// 📌 REGISTER user baru
router.post("/register", async (req, res) => {
  try {
    const { name, password, role } = req.body;

    // cek kalau nama sudah dipakai
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ message: "Nama sudah digunakan" });
    }

    const newUser = new User({ name, password, role });
    await newUser.save();

    res.status(201).json({
      message: "User berhasil dibuat",
      user: {
        id: newUser._id,
        name: newUser.name,
        role: newUser.role,
      },
      token: generateToken(newUser),
    });
  } catch (error) {
    res.status(500).json({ message: "Gagal register user" });
  }
});

// 📌 LOGIN
router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await User.findOne({ name });
    if (!user) {
      return res.status(400).json({ message: "User tidak ditemukan" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password salah" });
    }

    res.json({
      message: "Login berhasil",
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
      token: generateToken(user),
    });
  } catch (error) {
    res.status(500).json({ message: "Gagal login" });
  }
});

export default router;
