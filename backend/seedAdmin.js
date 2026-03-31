/**
 * Script tạo tài khoản Admin mặc định
 * Chạy 1 lần duy nhất: node seedAdmin.js
 *
 * Nếu admin đã tồn tại (email trùng) thì script sẽ bỏ qua, không tạo trùng.
 */
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { env } from "./config/environtment.js";
import Account from "./models/Account.js";

// CẤU HÌNH ADMIN MẶC ĐỊNH 
const ADMIN_EMAIL = "admin@jobportal.com";
const ADMIN_PASSWORD = "admin123456"; // Nên đổi mật khẩu ngay sau khi đăng nhập lần đầu!
const ADMIN_FULLNAME = "Quản trị viên";
const ADMIN_PHONE = "0000000000";

const seedAdmin = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("✅ Đã kết nối MongoDB");

    // Kiểm tra admin đã tồn tại chưa
    const existing = await Account.findOne({ email: ADMIN_EMAIL });
    if (existing) {
      console.log(`⚠️  Admin với email "${ADMIN_EMAIL}" đã tồn tại — bỏ qua.`);
      process.exit(0);
    }

    // Hash mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

    // Tạo tài khoản admin
    const admin = new Account({
      fullName: ADMIN_FULLNAME,
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
      phone: ADMIN_PHONE,
    });

    await admin.save();
    console.log("🎉 Tạo tài khoản admin thành công!");
    console.log(`   Email:    ${ADMIN_EMAIL}`);
    console.log(`   Mật khẩu: ${ADMIN_PASSWORD}`);
    console.log("   ⚠️  Hãy đổi mật khẩu ngay sau khi đăng nhập!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Lỗi tạo admin:", error.message);
    process.exit(1);
  }
};

seedAdmin();
