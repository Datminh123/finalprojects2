# 📘 PHẦN 3: THỨ TỰ CODE + PATTERNS + LƯU Ý QUAN TRỌNG

> Tiếp nối [Phần 1](file:///C:/Users/Minh%20Dat/.gemini/antigravity/brain/b3581aca-fb0b-4379-b6f3-fcc1f37e394c/huong_dan_tu_code_job_portal.md) và [Phần 2](file:///C:/Users/Minh%20Dat/.gemini/antigravity/brain/b3581aca-fb0b-4379-b6f3-fcc1f37e394c/phan2_backend_frontend.md)

---

## 6. THỨ TỰ 7 GIAI ĐOẠN CODE — CHI TIẾT TỪNG BƯỚC

---

### 🔷 GIAI ĐOẠN 1: SETUP MÔI TRƯỜNG (~2 giờ)

```bash
# 1. Tạo project
mkdir job-portal && cd job-portal

# 2. Backend
mkdir backend && cd backend
npm init -y
# → Sửa package.json: thêm "type": "module"

# 3. Cài dependencies backend
npm install express cors mongoose dotenv bcryptjs nodemailer socket.io
npm install -D nodemon

# 4. Frontend (từ thư mục gốc)
cd ..
npm create vite@latest frontend -- --template react
cd frontend
npm install antd @ant-design/icons axios lucide-react socket.io-client
```

**Tạo 2 file [.env](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/.env)**:
```bash
# backend/.env
MONGO_URI=mongodb+srv://...   # Lấy từ MongoDB Atlas
EMAIL_USER=abc@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx  # App Password Gmail
PORT=5000

# frontend/.env
VITE_API_URL=http://localhost:5000/api
```

---

### 🔷 GIAI ĐOẠN 2: BACKEND — DATABASE (Ngày 1-2)

**Thứ tự file tạo**:

| # | File | Kiến thức áp dụng |
|---|---|---|
| 1 | [config/db.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/config/db.js) | `mongoose.connect()`, async/await |
| 2 | [config/environtment.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/config/environtment.js) | dotenv, `process.env` |
| 3 | [models/Account.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/models/Account.js) | Schema, type, required, unique, enum, default |
| 4 | [models/Jobs.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/models/Jobs.js) | Schema đơn giản với nhiều String fields |
| 5 | [models/Applications.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/models/Applications.js) | ObjectId ref (foreign key), Date.now |
| 6 | [models/Notification.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/models/Notification.js) | Boolean default, Date default |
| 7 | [server.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/server.js) (v1 đơn giản) | Express app, middleware, connectDB |

**Test**: Chạy `npm run dev` → thấy "MongoDB Connected" là thành công!

#### 📝 Bài tập Giai đoạn 2
- **BT**: Dùng Postman gửi POST request tạo 1 Account trực tiếp vào DB. Sau đó vào MongoDB Atlas xem document đã được lưu chưa.

---

### 🔷 GIAI ĐOẠN 3: BACKEND — API ROUTES (Ngày 2-3)

**Thứ tự file tạo** (từ đơn giản → phức tạp):

| # | File | Số dòng | API endpoints | Kiến thức mới |
|---|---|---|---|---|
| 1 | [authRoutes.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/routes/authRoutes.js) | 202 | register, login, profile, change-password, forgot/reset-password | bcrypt, nodemailer, OTP |
| 2 | [jobRoutes.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/routes/jobRoutes.js) | 115 | CRUD + phân trang + tìm kiếm + bulk | `$regex`, `.skip()/.limit()`, `$or` |
| 3 | [applicationRoutes.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/routes/applicationRoutes.js) | 110 | GET theo role, POST + notify, PUT + notify | `.populate()`, Socket.IO emit |
| 4 | [adminRoutes.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/routes/adminRoutes.js) | 212 | Stats + CRUD users/jobs/apps | Middleware [isAdmin](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/routes/adminRoutes.js#8-20), `.countDocuments()` |
| 5 | [notificationRoutes.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/routes/notificationRoutes.js) | 23 | GET by email, PUT read | Đơn giản nhất |
| 6 | [server.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/server.js) (nâng cấp) | 61 | Thêm Socket.IO + middleware io | `http.createServer`, `Server` socket.io |

**Sau mỗi route file**: Test bằng Postman trước khi sang file tiếp!

#### 📝 Bài tập Giai đoạn 3
1. **BT1**: Test tất cả auth APIs: register → login → update profile → change password
2. **BT2**: Tạo 5 jobs bằng POST, sau đó test GET với phân trang `?page=1&limit=2`
3. **BT3 ⭐**: Test luồng đầy đủ: employer tạo job → candidate nộp đơn → kiểm tra notification trong DB

---

### 🔷 GIAI ĐOẠN 4: FRONTEND — SERVICE & CONTEXT (Ngày 3)

| # | File | Kiến thức |
|---|---|---|
| 1 | [main.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/main.jsx) | Entry point, import antd CSS |
| 2 | [services/api.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/services/api.js) | axios.create, 4 nhóm API (jobs, applications, auth, admin) |
| 3 | [context/AuthContext.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/context/AuthContext.jsx) | createContext, Provider, localStorage, login/logout |
| 4 | [context/JobsContext.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/context/JobsContext.jsx) | CRUD state management, useCallback |
| 5 | [context/ApplicationsContext.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/context/ApplicationsContext.jsx) | Tương tự JobsContext |
| 6 | [hooks/useAuth.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/hooks/useAuth.js) | Custom hook |

---

### 🔷 GIAI ĐOẠN 5: FRONTEND — COMPONENTS (Ngày 3-5)

**Thứ tự từ đơn giản → phức tạp**:

| Cấp | Components | Kiến thức Ant Design |
|---|---|---|
| 🟢 Dễ | [Profile.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/components/Profile.jsx), [ChangePassword.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/components/ChangePassword.jsx) | Form, Input, Button, message |
| 🟢 Dễ | [CandidateLanding.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/components/CandidateLanding.jsx), [EmployerLanding.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/components/EmployerLanding.jsx) | Inline styles, gradient |
| 🟡 TB | [LoginForm.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/components/LoginForm.jsx), [RegisterForm.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/components/RegisterForm.jsx) | Form validation, Select, Steps |
| 🟡 TB | [ForgotPassword.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/components/ForgotPassword.jsx) | Multi-step form, Steps component |
| 🟡 TB | [JobSearchPage.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/components/JobSearchPage.jsx), [CVLibrary.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/components/CVLibrary.jsx) | Search, filter, Card list |
| 🟡 TB | [ApplicationManager.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/components/ApplicationManager.jsx), [PostJob.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/components/PostJob.jsx) | Table, Form với nhiều fields |
| 🔴 Khó | [CandidateDashboard.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/components/CandidateDashboard.jsx) | Statistic, Card, data computation |
| 🔴 Khó | [EmployerDashboard.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/components/EmployerDashboard.jsx) (16KB) | Table, Tag, Modal, Tabs, status update |
| 🔴 Rất khó | [AdminDashboard.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/components/AdminDashboard.jsx) (22KB) | Tabs, Table + CRUD Modal, pagination API |

#### 📝 Bài tập Giai đoạn 5
1. **BT1**: Code `LoginForm` từ đầu, gọi API login, lưu user vào context
2. **BT2 ⭐**: Code `JobSearchPage` với ô tìm kiếm + filter dropdown + hiển thị kết quả
3. **BT3 ⭐⭐**: Code `EmployerDashboard` hiển thị table jobs + duyệt đơn ứng tuyển

---

### 🔷 GIAI ĐOẠN 6: APP LAYOUT & CSS (Ngày 5)

| File | Nội dung |
|---|---|
| [App.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/App.jsx) | MainLayout (sidebar + header + content), AuthWrapper (routing), Provider wrapper |
| [App.css](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/App.css) | CSS Variables, Antd overrides, responsive, animations |

---

### 🔷 GIAI ĐOẠN 7: TEST & HOÀN THIỆN (Ngày 6-7)

#### Checklist test:
- [ ] Đăng ký candidate + employer + admin
- [ ] Đăng nhập đúng role
- [ ] Quên mật khẩu → nhận OTP email → đặt lại
- [ ] Employer đăng tin → Candidate tìm thấy
- [ ] Candidate ứng tuyển → Employer nhận notification real-time
- [ ] Employer duyệt → Candidate nhận notification
- [ ] Admin xem thống kê, quản lý tất cả
- [ ] Responsive: desktop + tablet + mobile

---

## 7. 10 PATTERN CODE QUAN TRỌNG TRONG BÀI

---

### Pattern 1: Middleware truyền Socket.IO vào routes
```javascript
// server.js dòng 39-43
app.use((req, res, next) => {
  req.io = io;                  // Gắn socket server
  req.onlineUsers = onlineUsers; // Gắn danh sách user online
  next();                        // → Chuyển sang route handler
});
```
> **Tại sao**: Routes không truy cập được biến [io](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/context/ApplicationsContext.jsx#29-40) ngoài scope. Middleware giải quyết bằng cách gắn vào `req`.

---

### Pattern 2: Phân trang Backend
```javascript
// Công thức
const skip = (pageNumber - 1) * pageSize;
const data = await Model.find(filter).skip(skip).limit(pageSize);
const total = await Model.countDocuments(filter);
const totalPages = Math.ceil(total / pageSize);
```

---

### Pattern 3: Tìm kiếm đa trường
```javascript
if (keyword) {
  filter.$or = [
    { title: { $regex: keyword, $options: "i" } },
    { company: { $regex: keyword, $options: "i" } },
  ];
}
```

---

### Pattern 4: Socket.IO gửi cho 1 user cụ thể
```javascript
// Tìm user online → gửi đích danh
const target = onlineUsers.find(u => u.email === targetEmail);
if (target) {
  io.to(target.socketId).emit("eventName", data);
}
```

---

### Pattern 5: Context + localStorage Session
```javascript
// Đọc khi khởi tạo
const [user, setUser] = useState(() => {
  const saved = localStorage.getItem('user');
  return saved ? JSON.parse(saved) : null;
});
// Lưu khi login
localStorage.setItem('user', JSON.stringify(userData));
// Xóa khi logout
localStorage.removeItem('user');
```

---

### Pattern 6: Responsive detect trong React
```javascript
useEffect(() => {
  const check = () => setIsMobile(window.innerWidth < 768);
  check();
  window.addEventListener('resize', check);
  return () => window.removeEventListener('resize', check); // Cleanup!
}, []);
```

---

### Pattern 7: Immutable State Update (React)
```javascript
// Thêm vào đầu mảng
setItems(prev => [newItem, ...prev]);

// Cập nhật 1 item
setItems(prev => prev.map(item => item._id === id ? updated : item));

// Xóa 1 item
setItems(prev => prev.filter(item => item._id !== id));

// Cập nhật 1 field của tất cả
setItems(prev => prev.map(item => ({ ...item, isRead: true })));
```

---

### Pattern 8: OTP 6 chữ số + hết hạn
```javascript
const otp = Math.floor(100000 + Math.random() * 900000).toString();
account.resetOTP = otp;
account.resetOTPExpires = new Date(Date.now() + 10 * 60 * 1000);  // 10 phút
```

---

### Pattern 9: Role-based UI rendering
```javascript
const menuItems = {
  candidate: [{...}, {...}],
  employer: [{...}, {...}],
  admin: [{...}, {...}],
};
// Render menu theo role
<Menu items={menuItems[user.role]} />
```

---

### Pattern 10: Axios instance tập trung
```javascript
const API = axios.create({ baseURL, timeout: 10000 });
// Tất cả API calls dùng chung instance
export const jobsAPI = {
  getAll: async () => (await API.get('/jobs')).data,
  create: async (data) => (await API.post('/jobs', data)).data,
};
```

---

## 8. LƯU Ý BẢO MẬT & LỖI THƯỜNG GẶP

### ⚠️ Bảo mật

| Việc đã làm ✅ | Cần cải thiện ⚡ |
|---|---|
| Hash password bằng bcrypt | Thêm **JWT token** cho API authentication |
| Tách secrets vào [.env](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/.env) | Thêm [.env](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/.env) vào [.gitignore](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/.gitignore) |
| Middleware [isAdmin](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/routes/adminRoutes.js#8-20) | Thêm JWT verify middleware cho mọi route |
| OTP có thời hạn 10 phút | Rate limiting cho API login/OTP |

### ⚠️ Lỗi thường gặp

| Lỗi | Nguyên nhân | Sửa |
|---|---|---|
| `CORS error` | Backend chưa cors() | `app.use(cors())` |
| `_id not found` | Dùng [id](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/context/AuthContext.jsx#6-59) thay vì `_id` | MongoDB luôn dùng `_id` |
| `await` không hoạt động | Quên `async` | Thêm `async` vào hàm |
| Data undefined | API chưa trả về | Dùng `?.` optional chaining |
| Email OTP không gửi | Chưa App Password | Google → Security → App Passwords |
| `Cannot GET /api/jobs` | Chưa đăng ký route | `app.use('/api/jobs', jobRoutes)` |

### ⚠️ Thứ tự chạy
```bash
# Terminal 1 — CHẠY TRƯỚC
cd backend && npm run dev

# Terminal 2 — CHẠY SAU
cd frontend && npm run dev
```

---

## 9. BÀI TẬP TỔNG HỢP CUỐI KHÓA ⭐⭐⭐

Sau khi hoàn thành tất cả giai đoạn, thử tự làm các yêu cầu nâng cao:

| # | Yêu cầu | Kiến thức tổng hợp |
|---|---|---|
| 1 | Thêm **JWT authentication** — tạo token khi login, verify token ở middleware | bcrypt + jsonwebtoken + middleware |
| 2 | Thêm **upload avatar** bằng Multer | Multer + file upload + static serving |
| 3 | Thêm **lọc jobs theo lương** (min-max) | MongoDB `$gte/$lte` operators |
| 4 | Thêm **bookmark/lưu job yêu thích** | New model + new routes + new UI |
| 5 | Thêm **dark mode toggle** | CSS Variables + Context API |
| 6 | **Deploy** lên Render (backend) + Vercel (frontend) | Environment variables, build config |
| 7 | Thêm **rate limiting** chống spam API | express-rate-limit middleware |
| 8 | Thêm **email thông báo** khi đơn được duyệt | Nodemailer + event trigger |

---

## 📚 TÀI LIỆU THAM KHẢO

| Chủ đề | Link |
|---|---|
| JavaScript | [javascript.info](https://javascript.info) |
| React (docs chính thức) | [react.dev/learn](https://react.dev/learn) |
| Express.js | [expressjs.com/en/guide](https://expressjs.com/en/guide/routing.html) |
| Mongoose | [mongoosejs.com/docs](https://mongoosejs.com/docs/guide.html) |
| Ant Design | [ant.design/components](https://ant.design/components/overview) |
| Socket.IO | [socket.io/docs/v4](https://socket.io/docs/v4/) |

---

> [!TIP]
> **💪 Lời khuyên cuối**: Không cần code hết trong 1 ngày. Hãy chia nhỏ — mỗi ngày 1 giai đoạn. Hiểu rồi mới viết. Bạn đã hoàn thành dự án này 1 lần — lần code lại sẽ nhanh và vững hơn rất nhiều!
