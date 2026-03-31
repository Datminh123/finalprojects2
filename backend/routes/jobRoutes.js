import express from "express";
const router = express.Router();
import Jobs from '../models/Jobs.js'
import { authMiddleware, roleMiddleware } from '../middleware/authMiddleware.js';

// GET /api/jobs — Công khai: ai cũng xem được danh sách job
router.get("/", async (req, res) => {
  try {
    const { page, limit, keyword, city, industry, type, level } = req.query;

    // Nếu không có page/limit → trả về tất cả (tương thích cũ)
    if (!page && !limit) {
      const filter = {};
      if (keyword) {
        filter.$or = [
          { title: { $regex: keyword, $options: "i" } },
          { company: { $regex: keyword, $options: "i" } },
          { requirements: { $regex: keyword, $options: "i" } },
        ];
      }
      if (city) filter.city = city;
      if (industry) filter.industry = industry;
      if (type) filter.type = type;
      if (level) filter.level = level;

      const jobs = await Jobs.find(filter).sort({ postedDate: -1 });
      return res.json(jobs);
    }

    // Có phân trang
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const filter = {};

    if (keyword) {
      filter.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { company: { $regex: keyword, $options: "i" } },
        { requirements: { $regex: keyword, $options: "i" } },
      ];
    }
    if (city) filter.city = city;
    if (industry) filter.industry = industry;
    if (type) filter.type = type;
    if (level) filter.level = level;

    const total = await Jobs.countDocuments(filter);
    const jobs = await Jobs.find(filter)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .sort({ postedDate: -1 });

    res.json({
      data: jobs,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/jobs/:id — Công khai: ai cũng xem chi tiết job
router.get("/:id", async (req, res) => {
  try {
    const job = await Jobs.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Không tìm thấy công việc" });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/jobs — Chỉ employer mới được tạo job
router.post("/", authMiddleware, roleMiddleware(['employer']), async (req, res) => {
  try {
    const jobs = new Jobs(req.body);
    await jobs.save();
    res.status(201).json(jobs);
  } catch (error) {
    res.status(400).json({ message: "Không thể tạo job mới", error: error.message });
  }
});

// PUT /api/jobs/:id — Employer chỉ sửa job của chính mình, admin sửa tất cả
router.put("/:id", authMiddleware, roleMiddleware(['employer', 'admin']), async (req, res) => {
  try {
    const job = await Jobs.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Không tìm thấy công việc" });

    // Employer chỉ được sửa job do mình đăng (so sánh qua postedBy = email)
    if (req.user.role === 'employer' && job.postedBy !== req.user.email) {
      return res.status(403).json({ message: "Bạn chỉ được sửa công việc do chính mình đăng!" });
    }

    const updatedJob = await Jobs.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
    res.json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/jobs/:id — Employer chỉ xóa job của chính mình, admin xóa tất cả
router.delete("/:id", authMiddleware, roleMiddleware(['employer', 'admin']), async (req, res) => {
  try {
    const job = await Jobs.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Không tìm thấy công việc" });

    // Employer chỉ được xóa job do mình đăng
    if (req.user.role === 'employer' && job.postedBy !== req.user.email) {
      return res.status(403).json({ message: "Bạn chỉ được xóa công việc do chính mình đăng!" });
    }

    await Jobs.findByIdAndDelete(req.params.id);
    res.json({ message: "Đã xóa công việc" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/jobs/bulk — Chỉ employer/admin mới bulk import
router.post("/bulk", authMiddleware, roleMiddleware(['employer', 'admin']), async (req, res) => {
  try {
    const jobsArray = req.body;
    if (!Array.isArray(jobsArray)) {
      return res.status(400).json({ message: "Dữ liệu phải là một mảng" });
    }
    const jobs = await Jobs.insertMany(jobsArray);
    res.status(201).json({ message: `Đã thêm ${jobs.length} job thành công`, jobs });
  } catch (error) {
    res.status(400).json({ message: "Không thể thêm nhiều job", error: error.message });
  }
});

export default router;