import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// 🔑 Middleware cek token
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // simpan data user dari token
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token tidak valid" });
  }
};

// 📌 GET semua user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // exclude password
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data user" });
  }
});

// 📌 GET user by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id, "-password");
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil user" });
  }
});

// 📌 CREATE user baru
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, password, role } = req.body;

    if (!name || !password) {
      return res.status(400).json({ message: "Nama dan password wajib diisi" });
    }

    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ message: "Nama sudah dipakai" });
    }

    const newUser = new User({ name, password, role });
    await newUser.save();

    res.status(201).json({
      message: "User berhasil ditambahkan",
      user: { id: newUser._id, name: newUser.name, role: newUser.role },
    });
  } catch (error) {
    res.status(500).json({ message: "Gagal menambahkan user" });
  }
});

// 📌 UPDATE user by ID
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { name, role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, role },
      { new: true, runValidators: true, select: "-password" }
    );
    if (!updatedUser)
      return res.status(404).json({ message: "User tidak ditemukan" });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Gagal update user" });
  }
});

// 📌 DELETE user by ID
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus user" });
  }
});

export default router;
