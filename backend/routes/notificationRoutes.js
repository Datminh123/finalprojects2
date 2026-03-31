import express from "express";
import Notification from "../models/Notification.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/notifications/:email — User chỉ đọc thông báo của chính mình
router.get("/:email", authMiddleware, async (req, res) => {
  try {
    // Bảo vệ: chỉ cho phép xem notification của chính mình (admin xem tất cả)
    if (req.user.email !== req.params.email && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Bạn chỉ được xem thông báo của chính mình!" });
    }

    const notifications = await Notification.find({ recipientEmail: req.params.email }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/notifications/read/:id — User chỉ đánh dấu đã đọc notification của chính mình
router.put("/read/:id", authMiddleware, async (req, res) => {
  try {
    const noti = await Notification.findById(req.params.id);
    if (!noti) {
      return res.status(404).json({ message: "Không tìm thấy thông báo!" });
    }

    // Bảo vệ: chỉ chủ sở hữu hoặc admin mới được đánh dấu đã đọc
    if (noti.recipientEmail !== req.user.email && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Bạn chỉ được quản lý thông báo của chính mình!" });
    }

    await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
    res.json({ message: "Đã đọc" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;