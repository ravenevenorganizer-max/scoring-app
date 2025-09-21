import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // cek apakah admin sudah ada
    const existingAdmin = await User.findOne({ name: "admin" });
    if (existingAdmin) {
      console.log("⚠️ Admin sudah ada, skip seeding");
    } else {
      const hashedPassword = await bcrypt.hash("admin123", 10); // password default
      const admin = new User({
        name: "admin",
        password: hashedPassword,
        role: "admin",
      });
      await admin.save();
      console.log("✅ Admin berhasil dibuat dengan password: admin123");
    }

    process.exit();
  } catch (err) {
    console.error("❌ Gagal seed admin:", err.message);
    process.exit(1);
  }
};

seedAdmin();
