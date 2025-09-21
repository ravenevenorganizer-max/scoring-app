import User from "../models/User.js";
import jwt from "jsonwebtoken";

// ✅ Register
export const register = async (req, res) => {
  const { name, password, role } = req.body;
  try {
    const exists = await User.findOne({ name });
    if (exists) return res.status(400).json({ message: "Username sudah digunakan" });

    const user = await User.create({ name, password, role });
    res.status(201).json({
      message: "Registrasi berhasil",
      user: { id: user._id, name: user.name, role: user.role }
    });
  } catch (err) {
    console.error("❌ Error register:", err.message);
    res.status(500).json({ message: "Registrasi gagal" });
  }
};

// ✅ Login
export const login = async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await User.findOne({ name });
    if (!user) return res.status(400).json({ message: "User tidak ditemukan" });

    const match = await user.matchPassword(password);
    if (!match) return res.status(400).json({ message: "Password salah" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login berhasil",
      token,
      user: { id: user._id, name: user.name, role: user.role }
    });
  } catch (err) {
    console.error("❌ Error login:", err.message);
    res.status(500).json({ message: "Login gagal" });
  }
};
