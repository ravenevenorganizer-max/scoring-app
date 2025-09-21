import User from "../models/User.js";
import bcrypt from "bcryptjs";

// ✅ Get semua user
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data user" });
  }
};

// ✅ Tambah user
export const createUser = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email sudah terdaftar" });

    const user = await User.create({ email, password, role });
    res.status(201).json({ message: "User berhasil dibuat", user });
  } catch (err) {
    res.status(500).json({ message: "Gagal membuat user" });
  }
};

// ✅ Update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;

    if (update.password) {
      update.password = await bcrypt.hash(update.password, 10);
    }

    const user = await User.findByIdAndUpdate(id, update, { new: true }).select("-password");
    res.json({ message: "User berhasil diperbarui", user });
  } catch (err) {
    res.status(500).json({ message: "Gagal update user" });
  }
};

// ✅ Hapus user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: "User berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: "Gagal hapus user" });
  }
};
