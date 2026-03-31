import express from "express";
const router = express.Router();
import Applications from '../models/Applications.js';
import Notification from "../models/Notification.js";
import Job from '../models/Jobs.js';
import { authMiddleware, roleMiddleware } from '../middleware/authMiddleware.js';

// GET /api/applications — Candidate xem đơn của mình, Employer xem đơn vào job của mình
router.get("/", authMiddleware, async (req, res) => {
  try {
    const { email, role } = req.query;
    let query = {};

    // Bảo vệ: user chỉ xem dữ liệu liên quan đến chính mình
    if (req.user.role === 'candidate') {
      // Candidate chỉ xem đơn ứng tuyển của chính mình
      query = { candidateEmail: req.user.email };
    } else if (req.user.role === 'employer') {
      // Employer chỉ xem đơn ứng tuyển vào các job do mình đăng
      const myJobs = await Job.find({ postedBy: req.user.email });
      if (!myJobs || myJobs.length === 0) return res.json([]);
      const myJobIds = myJobs.map(job => job._id);
      query = { jobId: { $in: myJobIds } };
    } else if (req.user.role === 'admin') {
      // Admin xem tất cả — cho phép filter theo query params
      if (role === 'candidate' && email) {
        query = { candidateEmail: email };
      } else if (role === 'employer' && email) {
        const jobs = await Job.find({ postedBy: email });
        if (!jobs || jobs.length === 0) return res.json([]);
        const jobIds = jobs.map(job => job._id);
        query = { jobId: { $in: jobIds } };
      }
      // Nếu không có filter → admin xem tất cả
    }

    const applications = await Applications.find(query)
      .populate('jobId') 
      .sort({ appliedDate: -1 });
    
    return res.json(applications);
  } catch (error) {
    console.error("LỖI 500 TẠI ROUTE GET APPLICATIONS:", error);
    return res.status(500).json({ message: error.message });
  }
});

// POST /api/applications — Chỉ candidate mới được ứng tuyển
router.post("/", authMiddleware, roleMiddleware(['candidate']), async (req, res) => {
  try {
    // Đảm bảo email ứng tuyển khớp với user đang đăng nhập
    const applicationData = {
      ...req.body,
      candidateEmail: req.user.email // Ghi đè bằng email từ token, không tin client
    };

    const application = new Applications(applicationData);
    const savedApp = await application.save();

    const jobInfo = await Job.findById(req.body.jobId);
    
    if (jobInfo && jobInfo.postedBy) {
      const employerNoti = await Notification.create({
        recipientEmail: jobInfo.postedBy,
        title: "Ứng viên mới",
        message: `Ứng viên ${application.candidateName} đã ứng tuyển vào vị trí ${jobInfo.title}`,
        isRead: false
      });

      const targetEmployer = req.onlineUsers?.find(u => u.email === jobInfo.postedBy);
      if (targetEmployer) {
        req.io.to(targetEmployer.socketId).emit("getNotification", employerNoti);
      }
    }

    return res.status(201).json(savedApp);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// PUT /api/applications/mark-all-read/:email — User chỉ đánh dấu notification của chính mình
router.put("/mark-all-read/:email", authMiddleware, async (req, res) => {
  try {
    // Bảo vệ: chỉ cho phép đánh dấu notification của chính mình
    if (req.user.email !== req.params.email && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Bạn chỉ được quản lý thông báo của chính mình!" });
    }

    const result = await Notification.updateMany(
      { recipientEmail: req.params.email, isRead: false },
      { $set: { isRead: true } }
    );
    return res.json({ 
      message: "Đã đánh dấu tất cả là đã đọc", 
      modifiedCount: result.modifiedCount 
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// PUT /api/applications/:id — Employer duyệt/từ chối đơn (chỉ đơn vào job của mình)
router.put("/:id", authMiddleware, roleMiddleware(['employer', 'admin']), async (req, res) => {
  try {
    const application = await Applications.findById(req.params.id).populate('jobId');
    
    if (!application) {
      return res.status(404).json({ message: "Không tìm thấy đơn ứng tuyển này" });
    }

    // Employer chỉ duyệt đơn vào job do chính mình đăng
    if (req.user.role === 'employer') {
      const job = application.jobId;
      if (!job || job.postedBy !== req.user.email) {
        return res.status(403).json({ message: "Bạn chỉ được duyệt đơn ứng tuyển vào công việc do bạn đăng!" });
      }
    }

    application.status = req.body.status;
    await application.save();

    if (req.body.status) {
      const statusText = req.body.status === 'accepted' ? 'được chấp nhận' : 'bị từ chối';
      const updateNoti = await Notification.create({
        recipientEmail: application.candidateEmail,
        title: "Kết quả ứng tuyển",
        message: `Đơn ứng tuyển vào ${application.jobId?.title || 'công việc'} đã ${statusText}.`,
        isRead: false
      });

      const targetCandidate = req.onlineUsers?.find(u => u.email === application.candidateEmail);
      if (targetCandidate) {
        req.io.to(targetCandidate.socketId).emit("getNotification", updateNoti);
      }
    }
    
    return res.json(application); 
  } catch (error) {
    console.error("Lỗi duyệt đơn:", error);
    return res.status(400).json({ message: error.message });
  }
});

export default router;