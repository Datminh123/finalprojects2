# 📘 HƯỚNG DẪN TỰ CODE LẠI JOB PORTAL — TỪ SỐ 0 ĐẾN HOÀN THIỆN

> [!NOTE]
> Đây là bản hướng dẫn chi tiết được phân tích từ dự án `finalprojects2` của bạn. Mục tiêu: giúp bạn **tự tay code lại toàn bộ** từ đầu, hiểu rõ từng phần.

---

## 📑 MỤC LỤC

1. [Tổng quan dự án](#1-tổng-quan-dự-án)
2. [Công cụ cần cài đặt](#2-công-cụ-cần-cài-đặt)
3. [Kiến thức cần học](#3-kiến-thức-cần-học)
4. [Kiến trúc dự án](#4-kiến-trúc-dự-án)
5. [Thứ tự các bước làm](#5-thứ-tự-các-bước-làm)
6. [Chi tiết từng phần code](#6-chi-tiết-từng-phần-code)
7. [Những lưu ý quan trọng](#7-những-lưu-ý-quan-trọng)

---

## 1. TỔNG QUAN DỰ ÁN

Dự án **Job Portal** (Cổng tìm việc làm) là một ứng dụng web full-stack với kiến trúc **MERN Stack**:

| Thành phần | Công nghệ | Vai trò |
|---|---|---|
| **M** - MongoDB | MongoDB Atlas (cloud) | Cơ sở dữ liệu NoSQL |
| **E** - Express.js | Express 5 | Server/Backend API |
| **R** - React | React 19 + Vite 7 | Giao diện Frontend |
| **N** - Node.js | Node.js | Môi trường chạy JavaScript phía server |

### Tính năng chính:
- 🔐 **Xác thực**: Đăng ký, đăng nhập, quên mật khẩu (OTP qua email)
- 👤 **3 vai trò**: Ứng viên (candidate), Nhà tuyển dụng (employer), Quản trị viên (admin)
- 💼 **Quản lý công việc**: CRUD tin tuyển dụng, tìm kiếm/lọc, phân trang
- 📋 **Ứng tuyển**: Nộp đơn, duyệt/từ chối đơn
- 🔔 **Thông báo real-time**: Socket.IO
- 📧 **Gửi email OTP**: Nodemailer
- 🛡️ **Admin Dashboard**: Thống kê, quản lý users/jobs/applications

---

## 2. CÔNG CỤ CẦN CÀI ĐẶT

### 2.1. Bắt buộc

| Công cụ | Link tải | Mục đích |
|---|---|---|
| **Node.js** (v18+) | [nodejs.org](https://nodejs.org) | Chạy JavaScript phía server, quản lý packages (npm) |
| **VS Code** | [code.visualstudio.com](https://code.visualstudio.com) | Code editor |
| **Git** | [git-scm.com](https://git-scm.com) | Quản lý source code |
| **Trình duyệt Chrome/Edge** | Có sẵn | Test website + DevTools |

### 2.2. Tài khoản online (miễn phí)

| Dịch vụ | Link | Mục đích |
|---|---|---|
| **MongoDB Atlas** | [mongodb.com/atlas](https://www.mongodb.com/atlas) | Database trên cloud (miễn phí 512MB) |
| **Gmail** | gmail.com | Gửi email OTP (cần bật App Passwords) |
| **GitHub** | github.com | Lưu trữ mã nguồn |

### 2.3. Extensions VS Code nên cài

- **ES7+ React/Redux/React-Native snippets** — Gõ tắt React
- **Prettier** — Format code tự động
- **MongoDB for VS Code** — Xem DB ngay trong VS Code
- **Thunder Client** hoặc **Postman** — Test API

---

## 3. KIẾN THỨC CẦN HỌC

### 🟢 Mức 1: Nền tảng (Phải biết trước)

#### 3.1. HTML & CSS cơ bản
- **Dùng ở đâu trong bài**: File [index.html](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/index.html), [App.css](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/App.css)
- Cần biết: thẻ HTML, CSS selector, Flexbox, media query responsive
- **Quan trọng**: CSS Variables (custom properties) — bạn dùng ở dòng 2-17 trong [App.css](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/App.css):
```css
:root {
  --primary-color: #2563eb;
  --gradient-primary: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}
```

#### 3.2. JavaScript ES6+
- **Dùng ở đâu**: **TẤT CẢ** các file [.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/server.js) và [.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/App.jsx) trong dự án
- Cần biết kỹ:

| Cú pháp | Ví dụ trong bài | File |
|---|---|---|
| `import/export` | `import express from "express"` | [server.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/server.js) dòng 1 |
| Arrow function `=>` | `const login = async ({ email }) => {...}` | [AuthContext.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/context/AuthContext.jsx) dòng 17 |
| Destructuring `{}` | `const { fullName, email, password } = req.body` | [authRoutes.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/routes/authRoutes.js) dòng 21 |
| Template literal `` ` ` `` | `` `Server running on port ${PORT}` `` | `server.js` dòng 60 |
| Spread operator `...` | `{...noti, isRead: true}` | [App.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/App.jsx) dòng 107 |
| `async/await` | `const data = await jobsAPI.getAll()` | [JobsContext.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/context/JobsContext.jsx) dòng 15 |
| `Array.map/filter/some` | `prev.filter(job => job._id !== id)` | [JobsContext.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/context/JobsContext.jsx) dòng 57 |
| Optional chaining `?.` | `user?.email`, `req.onlineUsers?.find(...)` | [App.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/App.jsx), [applicationRoutes.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/routes/applicationRoutes.js) |

> [!IMPORTANT]
> **`async/await` là kiến thức QUAN TRỌNG NHẤT**. Gần như mọi thao tác gọi API, đọc database đều dùng `async/await`. Hãy nắm vững `try/catch` kết hợp `async/await` trước khi bắt tay code.

---

### 🟡 Mức 2: Backend (Node.js + Express + MongoDB)

#### 3.3. Node.js & npm
- **Dùng ở đâu**: Chạy cả project backend
- Cần biết: `npm init`, `npm install`, file [package.json](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/package.json), `node_modules`
- **Trong bài**: [package.json backend](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/package.json) — liệt kê tất cả dependencies

#### 3.4. Express.js — Framework Backend
- **Dùng ở đâu**: [server.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/server.js) và tất cả file trong `routes/`
- Cần biết:

| Khái niệm | Dùng ở đâu | Giải thích |
|---|---|---|
| `express()` | [server.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/server.js) dòng 14 | Tạo ứng dụng Express |
| Middleware `app.use()` | [server.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/server.js) dòng 22-23 | `cors()`, `express.json()` — xử lý request |
| Router `express.Router()` | [authRoutes.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/routes/authRoutes.js) dòng 6 | Tách route thành module |
| HTTP Methods | Mọi file routes | `router.get()`, `.post()`, `.put()`, `.delete()` |
| `req.body`, `req.params`, `req.query` | Mọi route handler | Nhận dữ liệu từ client |
| `res.json()`, `res.status()` | Mọi route handler | Trả dữ liệu về client |
| Error handling middleware | [server.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/server.js) dòng 54-56 | Middleware bắt lỗi toàn cục |

> [!IMPORTANT]
> **RESTful API design** là pattern quan trọng. Bạn cần hiểu:
> - `GET /api/jobs` = lấy danh sách
> - `POST /api/jobs` = tạo mới
> - `PUT /api/jobs/:id` = cập nhật
> - `DELETE /api/jobs/:id` = xóa

#### 3.5. MongoDB & Mongoose
- **Dùng ở đâu**: Tất cả file trong `models/` và [config/db.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/config/db.js)
- Cần biết:

| Khái niệm | File minh họa | Giải thích |
|---|---|---|
| `mongoose.connect()` | [db.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/config/db.js) | Kết nối MongoDB Atlas |
| `mongoose.Schema` | [Account.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/models/Account.js) | Định nghĩa cấu trúc dữ liệu |
| `mongoose.model()` | Mọi file model | Tạo model để CRUD |
| `.find()`, `.findById()` | [jobRoutes.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/routes/jobRoutes.js) dòng 25, 75 | Truy vấn dữ liệu |
| `.findByIdAndUpdate()` | [jobRoutes.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/routes/jobRoutes.js) dòng 85 | Cập nhật |
| `.findByIdAndDelete()` | [jobRoutes.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/routes/jobRoutes.js) dòng 95 | Xóa |
| `.populate()` | [applicationRoutes.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/routes/applicationRoutes.js) dòng 22 | Join bảng (lấy dữ liệu liên kết) |
| `.countDocuments()` | [adminRoutes.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/routes/adminRoutes.js) dòng 26 | Đếm số lượng |
| `.skip()/.limit()` | [jobRoutes.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/routes/jobRoutes.js) dòng 47-49 | Phân trang |
| `$regex`, `$options: "i"` | [jobRoutes.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/routes/jobRoutes.js) dòng 15 | Tìm kiếm không phân biệt hoa thường |

> [!CAUTION]
> **Schema design** rất quan trọng. Hãy thiết kế **MÔ HÌNH DỮ LIỆU** trước khi code. Trong bài bạn có 4 model chính: `Account`, [Job](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/context/JobsContext.jsx#29-40), [Applications](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/services/api.js#284-294), `Notification`.

#### 3.6. Bcrypt.js — Mã hóa mật khẩu
- **Dùng ở đâu**: [authRoutes.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/routes/authRoutes.js) dòng 28-29, 55
- Cần biết 2 hàm:
```javascript
// Mã hóa password khi đăng ký (dòng 28-29)
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

// So sánh password khi đăng nhập (dòng 55)
const isMatch = await bcrypt.compare(password, account.password);
```

> [!WARNING]
> **KHÔNG BAO GIỜ lưu mật khẩu dạng plain text** vào database. Luôn hash trước khi lưu.

#### 3.7. Nodemailer — Gửi email
- **Dùng ở đâu**: [authRoutes.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/routes/authRoutes.js) dòng 9-16, 143-163
- Cần biết: cấu hình transport Gmail, gửi email HTML
- **Lưu ý**: Cần tạo **App Password** trong Google Account (không dùng mật khẩu thường)

#### 3.8. Socket.IO — Real-time
- **Dùng ở đâu backend**: [server.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/server.js) dòng 16-43
- **Dùng ở đâu frontend**: [App.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/App.jsx) dòng 77-97
- Cần biết:

```
Server:                          Client:
io.on("connection")      ←→     io("http://localhost:5000")
socket.on("registerUser")←      socket.emit("registerUser", email)
io.to(socketId).emit()   →      socket.on("getNotification")
```

#### 3.9. dotenv — Biến môi trường
- **Dùng ở đâu**: [.env](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/.env), [environtment.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/config/environtment.js)
- Dùng để lưu thông tin bí mật (connection string, email, password) tách khỏi source code

---

### 🔴 Mức 3: Frontend (React + Ant Design)

#### 3.10. React cơ bản
- **Dùng ở đâu**: **TẤT CẢ** file [.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/App.jsx) trong `frontend/src/`
- Cần biết:

| Khái niệm | Ví dụ trong bài | File |
|---|---|---|
| **Component** (hàm) | `const MainLayout = () => {...}` | `App.jsx` dòng 46 |
| **JSX** | `<Button type="primary">Đăng nhập</Button>` | Mọi file component |
| **`useState`** | `const [activeMenu, setActiveMenu] = useState('1')` | `App.jsx` dòng 48 |
| **`useEffect`** | `useEffect(() => { fetchNotis(); }, [user])` | `App.jsx` dòng 66-75 |
| **`useCallback`** | `const fetchJobs = useCallback(async () => {...}, [])` | `JobsContext.jsx` dòng 11 |
| **Props** | `<LoginForm onLogin={login} />` | `App.jsx` dòng 542 |
| **Conditional rendering** | `{!isMobile && <Sider>...</Sider>}` | `App.jsx` dòng 292 |
| **List rendering** | `notifications.map(item => ...)` | `App.jsx` dòng 147 |

> [!IMPORTANT]
> **React Hooks** (`useState`, `useEffect`, `useContext`, `useCallback`) là kiến thức **BẮT BUỘC** phải nắm vững. Đây là cách React quản lý state và side effects.

#### 3.11. Context API — Quản lý state toàn cục
- **Dùng ở đâu**: Thư mục `context/` — 3 file
- Luồng hoạt động:

```
createContext() → Provider bọc component → useContext() lấy dữ liệu

AuthContext   → quản lý user, login, logout
JobsContext   → quản lý danh sách jobs, CRUD
ApplicationsContext → quản lý đơn ứng tuyển
```

- File thể hiện: [AuthContext.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/context/AuthContext.jsx) — Provider bọc ở [App.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/App.jsx) dòng 556-562

#### 3.12. Axios — Gọi API
- **Dùng ở đâu**: [api.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/services/api.js)
- Cần biết: `axios.create()`, `API.get()`, `API.post()`, `API.put()`, `API.delete()`
- Đặc biệt: `import.meta.env.VITE_API_URL` — đọc biến môi trường Vite (dòng 3)

#### 3.13. Ant Design — UI Library
- **Dùng ở đâu**: **TẤT CẢ** component frontend
- Thành phần đã dùng:

| Component | Mục đích | Ví dụ |
|---|---|---|
| `Layout, Sider, Header, Content` | Bố cục trang | `App.jsx` |
| `Menu` | Sidebar menu | `App.jsx` dòng 279 |
| `Button, Input, Select, Form` | Form nhập liệu | `LoginForm.jsx`, `RegisterForm.jsx` |
| `Table, Tag, Badge` | Bảng dữ liệu | `AdminDashboard.jsx` |
| `Card, Statistic` | Thẻ thống kê | `CandidateDashboard.jsx` |
| `Modal, Drawer` | Popup, sidebar mobile | `App.jsx` dòng 339 |
| `notification, message` | Thông báo toast | `App.jsx` dòng 90-94, 111 |
| `Popover, List` | Danh sách thông báo | `App.jsx` dòng 118-167 |
| `Tabs, Steps` | Tab, bước | `ForgotPassword.jsx` |
| `Skeleton, Spin` | Loading state | Nhiều component |

#### 3.14. Vite — Build tool
- **Dùng ở đâu**: [vite.config.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/vite.config.js), `package.json` frontend
- Nhanh hơn Create React App. Dùng `npm create vite@latest` để tạo project

#### 3.15. Lucide React — Icons
- **Dùng ở đâu**: [App.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/App.jsx) dòng 23-40
- Import dạng: `import { Bell, User, Briefcase } from 'lucide-react'`

---

## 4. KIẾN TRÚC DỰ ÁN

### 4.1. Cấu trúc thư mục

```
finalprojects2/
├── backend/                    ← Server (Express + MongoDB)
│   ├── config/
│   │   ├── db.js              ← Kết nối MongoDB
│   │   └── environtment.js    ← Đọc biến .env
│   ├── models/                ← Schema cơ sở dữ liệu
│   │   ├── Account.js         ← Tài khoản (user chính)
│   │   ├── Jobs.js            ← Tin tuyển dụng
│   │   ├── Applications.js    ← Đơn ứng tuyển
│   │   └── Notification.js    ← Thông báo
│   ├── routes/                ← API endpoints
│   │   ├── authRoutes.js      ← Đăng ký, đăng nhập, quên MK
│   │   ├── jobRoutes.js       ← CRUD jobs
│   │   ├── applicationRoutes.js ← Quản lý đơn ứng tuyển
│   │   ├── adminRoutes.js     ← Admin management
│   │   └── notificationRoutes.js ← Thông báo
│   ├── server.js              ← Entry point backend
│   ├── .env                   ← Biến môi trường bí mật
│   └── package.json
│
├── frontend/                   ← Client (React + Vite)
│   ├── src/
│   │   ├── components/        ← 14 component giao diện
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── CandidateDashboard.jsx
│   │   │   ├── CandidateLanding.jsx
│   │   │   ├── EmployerDashboard.jsx
│   │   │   ├── EmployerLanding.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── JobSearchPage.jsx
│   │   │   ├── ApplicationManager.jsx
│   │   │   ├── CVLibrary.jsx
│   │   │   ├── PostJob.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── ChangePassword.jsx
│   │   ├── context/           ← State management
│   │   │   ├── AuthContext.jsx
│   │   │   ├── JobsContext.jsx
│   │   │   └── ApplicationsContext.jsx
│   │   ├── services/
│   │   │   └── api.js         ← Tất cả API calls
│   │   ├── hooks/             ← Custom hooks
│   │   ├── App.jsx            ← Layout chính + routing
│   │   ├── App.css            ← CSS toàn cục
│   │   └── main.jsx           ← Entry point React
│   ├── .env
│   ├── vite.config.js
│   └── package.json
```

### 4.2. Luồng dữ liệu (Data Flow)

```mermaid
graph LR
    A[Người dùng] -->|Tương tác UI| B[React Component]
    B -->|Gọi function| C[Context Provider]
    C -->|Gọi API| D[services/api.js<br/>Axios]
    D -->|HTTP Request| E[Express Routes<br/>Backend]
    E -->|Query| F[MongoDB<br/>Mongoose]
    F -->|Data| E
    E -->|JSON Response| D
    D -->|Data| C
    C -->|setState| B
    B -->|Render| A
```

### 4.3. Mô hình dữ liệu (Database Schema)

```mermaid
erDiagram
    Account {
        String fullName
        String email UK
        String password
        String role "candidate | employer | admin"
        String phone
        String company
        String avatar
        String resetOTP
        Date resetOTPExpires
        Date createdAt
    }
    
    Job {
        String title
        String company
        String city
        String salary
        String type
        String level
        String industry
        Number experienceYears
        String description
        String requirements
        String status
        String postedBy "email của employer"
        String postedDate
    }
    
    Applications {
        ObjectId jobId FK
        String candidateName
        String candidateEmail
        String resume
        String coverLetter
        String status "pending | accepted | rejected"
        Date appliedDate
    }
    
    Notification {
        String recipientEmail
        String title
        String message
        Boolean isRead
        Date createdAt
    }
    
    Account ||--o{ Job : "đăng tin"
    Account ||--o{ Applications : "ứng tuyển"
    Job ||--o{ Applications : "nhận đơn"
    Account ||--o{ Notification : "nhận thông báo"
```

---

## 5. THỨ TỰ CÁC BƯỚC LÀM

### ⏱️ Tổng thời gian ước tính: 5-7 ngày (nếu đã biết cơ bản)

---

### GIAI ĐOẠN 1: SETUP MÔI TRƯỜNG (Ngày 1 — ~2 giờ)

#### Bước 1.1: Cài đặt công cụ
```bash
# Kiểm tra Node.js đã cài chưa
node -v
npm -v
```

#### Bước 1.2: Tạo MongoDB Atlas
1. Truy cập [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Tạo tài khoản → Tạo Cluster (dùng Free tier M0)
3. Tạo Database User (username + password)
4. Lấy **Connection String** (dạng: `mongodb+srv://user:pass@cluster.xxx.mongodb.net/`)
5. Cho phép IP: `0.0.0.0/0` (Network Access)

#### Bước 1.3: Khởi tạo project Backend
```bash
mkdir job-portal
cd job-portal
mkdir backend
cd backend
npm init -y
```

Chỉnh `package.json` thêm **`"type": "module"`** để dùng `import/export`:
```json
{
  "type": "module",
  "scripts": {
    "dev": "nodemon server.js"
  }
}
```

#### Bước 1.4: Cài dependencies Backend
```bash
# Dependencies chính
npm install express cors mongoose dotenv bcryptjs nodemailer socket.io

# DevDependency
npm install -D nodemon
```

#### Bước 1.5: Khởi tạo project Frontend
```bash
cd ..
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm install antd @ant-design/icons axios lucide-react socket.io-client
```

---

### GIAI ĐOẠN 2: BACKEND — CƠ SỞ DỮ LIỆU (Ngày 1-2)

#### Bước 2.1: Tạo file `.env`
```
MONGO_URI=mongodb+srv://YOUR_USER:YOUR_PASS@YOUR_CLUSTER.mongodb.net/?appName=YOUR_APP
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
PORT=5000
```

#### Bước 2.2: Tạo `config/db.js` — Kết nối MongoDB
- **Kiến thức**: `mongoose.connect()`, `async/await`, `try/catch`
- **Tham khảo**: [db.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/config/db.js)

#### Bước 2.3: Tạo `config/environtment.js` — Đọc biến .env
- **Kiến thức**: `dotenv`, `process.env`
- **Tham khảo**: [environtment.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/config/environtment.js)

#### Bước 2.4: Tạo Models (4 file)
Thứ tự tạo model:
1. **`Account.js`** — Model quan trọng nhất (user có 3 role)
2. **`Jobs.js`** — Tin tuyển dụng
3. **`Applications.js`** — Đơn ứng tuyển (liên kết với Job qua `jobId`)
4. **`Notification.js`** — Thông báo

- **Kiến thức**: `mongoose.Schema`, kiểu dữ liệu (String, Number, Date, ObjectId), `ref`, `default`, `enum`, `unique`, `required`
- **Tham khảo**: Thư mục [models/](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/models)

> [!TIP]
> **Test ngay**: Sau khi tạo xong models, hãy test kết nối DB bằng cách chạy `server.js` tối giản và xem log "MongoDB Connected".

---

### GIAI ĐOẠN 3: BACKEND — API ROUTES (Ngày 2-3)

#### Bước 3.1: Tạo `server.js` — Entry Point
Bắt đầu đơn giản:
```javascript
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.get("/", (req, res) => res.send("API running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```
- **Kiến thức**: Express app creation, middleware, `cors()` cho phép frontend gọi API, `express.json()` parse JSON body

#### Bước 3.2: Tạo `routes/authRoutes.js` — Xác thực (LÀM ĐẦU TIÊN)
Thứ tự API:
1. `POST /register` — Đăng ký (hash password bằng bcrypt)
2. `POST /login` — Đăng nhập (compare password)
3. `PUT /profile` — Cập nhật hồ sơ
4. `PUT /change-password` — Đổi mật khẩu
5. `POST /forgot-password` — Gửi OTP qua email (nodemailer)
6. `POST /reset-password` — Đặt lại mật khẩu bằng OTP

- **Kiến thức**: bcrypt hash/compare, nodemailer transporter, HTML email template
- **Tham khảo**: [authRoutes.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/routes/authRoutes.js) (202 dòng)

#### Bước 3.3: Tạo `routes/jobRoutes.js` — CRUD Jobs
API:
1. `GET /` — Lấy danh sách + phân trang + tìm kiếm
2. `POST /` — Tạo job mới
3. `GET /:id` — Lấy chi tiết 1 job
4. `PUT /:id` — Cập nhật job
5. `DELETE /:id` — Xóa job
6. `POST /bulk` — Thêm nhiều job cùng lúc

- **Kiến thức**: `req.query` cho search/filter/pagination, `$regex` MongoDB, `.skip()/.limit()` phân trang
- **Tham khảo**: [jobRoutes.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/routes/jobRoutes.js) (115 dòng)

#### Bước 3.4: Tạo `routes/applicationRoutes.js` — Đơn ứng tuyển
API:
1. `GET /` — Lấy đơn theo role (candidate xem đơn mình, employer xem đơn nộp vào job mình)
2. `POST /` — Nộp đơn ứng tuyển + gửi notification real-time
3. `PUT /:id` — Duyệt/từ chối đơn + gửi notification real-time
4. `PUT /mark-all-read/:email` — Đánh dấu tất cả thông báo đã đọc

- **Kiến thức**: `.populate('jobId')` join data, Socket.IO emit từ route, **phân quyền theo role qua query**
- **Tham khảo**: [applicationRoutes.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/routes/applicationRoutes.js) (110 dòng)

> [!IMPORTANT]
> **Socket.IO trong route**: Nhờ middleware ở `server.js` dòng 39-43, mỗi route đều truy cập được `req.io` và `req.onlineUsers` để phát thông báo real-time. Đây là pattern quan trọng!

#### Bước 3.5: Tạo `routes/adminRoutes.js` — Admin Dashboard
API:
1. `GET /stats` — Thống kê tổng quan
2. `GET /users` + `PUT /users/:id` + `DELETE /users/:id`
3. `GET /jobs` + `PUT /jobs/:id` + `DELETE /jobs/:id`
4. `GET /applications` + `DELETE /applications/:id`

- **Kiến thức**: Middleware `isAdmin` kiểm tra quyền admin, phân trang ở mọi endpoint
- **Tham khảo**: [adminRoutes.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/routes/adminRoutes.js) (212 dòng)

#### Bước 3.6: Tạo `routes/notificationRoutes.js`
- `GET /:email` — Lấy thông báo theo email
- `PUT /read/:id` — Đánh dấu đã đọc

#### Bước 3.7: Thêm Socket.IO vào `server.js`
- Nâng cấp `server.js` từ bản đơn giản lên bản có Socket.IO
- **Kiến thức**: `http.createServer(app)`, `new Server(server)`, event `connection/disconnect/registerUser`
- **Tham khảo**: [server.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/server.js) dòng 3-43

#### Bước 3.8: Đăng ký routes và test
```javascript
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notifications', notificationRoutes);
```

> [!TIP]
> **Test API bằng Postman/Thunder Client** trước khi làm Frontend. Tạo tài khoản, đăng nhập, tạo job, nộp đơn... đảm bảo backend hoạt động đúng.

---

### GIAI ĐOẠN 4: FRONTEND — SETUP & SERVICE LAYER (Ngày 3)

#### Bước 4.1: Thiết lập file `.env` frontend
```
VITE_API_URL=http://localhost:5000/api
```

#### Bước 4.2: Tạo `main.jsx` — Entry Point React
- Import `antd/dist/reset.css`
- **Tham khảo**: [main.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/main.jsx)

#### Bước 4.3: Tạo `services/api.js` — API Service Layer (QUAN TRỌNG)
Đây là file **trung tâm** gọi tất cả API backend:
- `jobsAPI` — CRUD jobs (7 methods)
- `applicationsAPI` — CRUD applications (7 methods)
- `authAPI` — Auth: register, login, profile, password, OTP (6 methods)
- `adminAPI` — Admin management (8 methods)

- **Kiến thức**: `axios.create()` tạo instance, `import.meta.env.VITE_API_URL` biến môi trường Vite
- **Tham khảo**: [api.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/services/api.js) (340 dòng)

#### Bước 4.4: Tạo Context Providers (3 file)
Thứ tự:
1. **`AuthContext.jsx`** — Quản lý login/logout/user state + localStorage
2. **`JobsContext.jsx`** — Quản lý danh sách jobs, CRUD + search
3. **`ApplicationsContext.jsx`** — Quản lý đơn ứng tuyển

- **Kiến thức**: `createContext()`, `Provider`, `useContext`, `useCallback`
- **Tham khảo**: Thư mục [context/](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/context)

> [!IMPORTANT]
> **AuthContext dùng `localStorage`** để duy trì phiên đăng nhập khi refresh trang. Đây là pattern rất phổ biến trong React (dòng 8-15 trong `AuthContext.jsx`).

---

### GIAI ĐOẠN 5: FRONTEND — COMPONENTS (Ngày 3-5)

Thứ tự làm component (từ đơn giản → phức tạp):

#### Bước 5.1: `LoginForm.jsx` — Trang đăng nhập ⭐
- Form nhập email, password, chọn role
- Gọi `authAPI.login()`
- **Kiến thức**: Ant Design `Form`, `Input`, `Select`, `Button`, `message`

#### Bước 5.2: `RegisterForm.jsx` — Trang đăng ký
- Form nhiều trường, validate
- Phân biệt candidate/employer (employer có thêm trường company)
- **Kiến thức**: Form validation, conditional fields

#### Bước 5.3: `ForgotPassword.jsx` — Quên mật khẩu
- 3 bước: Nhập email → Nhập OTP → Đặt mật khẩu mới
- **Kiến thức**: Multi-step form, `Steps` component Ant Design

#### Bước 5.4: `CandidateLanding.jsx` + `EmployerLanding.jsx` — Trang Landing
- Trang chào mừng cho khách
- **Kiến thức**: Inline styling, gradient backgrounds, responsive layout

#### Bước 5.5: `Profile.jsx` — Trang cá nhân
- Xem và cập nhật thông tin user
- **Kiến thức**: Form pre-filled with data, `updateUser()` từ context

#### Bước 5.6: `ChangePassword.jsx` — Đổi mật khẩu
- Form đổi password (cần nhập password cũ)

#### Bước 5.7: `CandidateDashboard.jsx` — Dashboard ứng viên
- Thống kê đơn đã nộp, trạng thái
- **Kiến thức**: `Statistic`, `Card`, tính toán từ data

#### Bước 5.8: `JobSearchPage.jsx` — Tìm kiếm việc làm ⭐
- Search bar + filters (city, industry, type, level)
- Danh sách kết quả dạng Card
- Nút ứng tuyển
- **Kiến thức**: Controlled inputs, filter logic, API call with query params

#### Bước 5.9: `ApplicationManager.jsx` — Quản lý đơn ứng tuyển
- Bảng danh sách đơn đã nộp + trạng thái

#### Bước 5.10: `CVLibrary.jsx` — Thư viện CV
- Hiển thị mẫu CV

#### Bước 5.11: `PostJob.jsx` — Đăng tin tuyển dụng (Employer)
- Form tạo job mới
- **Kiến thức**: Form validation, `Select` options, `DatePicker`

#### Bước 5.12: `EmployerDashboard.jsx` — Dashboard Nhà tuyển dụng ⭐⭐
- Xem danh sách jobs đã đăng
- Xem đơn ứng tuyển vào từng job
- Duyệt/từ chối đơn → gửi notification
- **Kiến thức**: `Table`, `Tag`, Modal confirm, `Tabs`

#### Bước 5.13: `AdminDashboard.jsx` — Dashboard Admin ⭐⭐⭐
- Thống kê tổng quan (users, jobs, applications)
- CRUD quản lý: users, jobs, applications
- Phân trang + tìm kiếm ở mỗi tab
- **Kiến thức**: `Tabs`, `Table` với `columns`, `Modal` form, `Pagination`, API phân trang

---

### GIAI ĐOẠN 6: FRONTEND — APP LAYOUT & ROUTING (Ngày 5)

#### Bước 6.1: Tạo `App.css` — CSS toàn cục
- CSS Variables cho color system
- Override Ant Design styles
- Responsive media queries (992px, 768px, 480px)
- Animations (fadeInUp, pulse, shimmer)
- **Tham khảo**: [App.css](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/App.css) (369 dòng)

#### Bước 6.2: Tạo `App.jsx` — Component gốc (PHỨC TẠP NHẤT)

File này có 3 phần lớn:

**A. `MainLayout`** (dòng 46-487) — Layout khi đã đăng nhập:
- Sidebar menu phân quyền theo role
- Header với avatar, thông báo, đăng xuất
- Content render component tương ứng menu
- Socket.IO kết nối + nhận notification
- Responsive: Drawer cho mobile

**B. `AuthWrapper`** (dòng 490-552) — Điều hướng khi chưa đăng nhập:
- Landing pages (candidate/employer)
- Login/Register/ForgotPassword forms

**C. `App`** (dòng 554-566) — Bọc Providers:
```jsx
<AuthProvider>
  <JobsProvider>
    <ApplicationsProvider>
      <AuthWrapper />
    </ApplicationsProvider>
  </JobsProvider>
</AuthProvider>
```

---

### GIAI ĐOẠN 7: HOÀN THIỆN VÀ TEST (Ngày 6-7)

#### Bước 7.1: Test toàn bộ luồng
1. Đăng ký tài khoản candidate + employer
2. Employer đăng tin tuyển dụng
3. Candidate tìm kiếm → ứng tuyển
4. Employer nhận notification real-time → duyệt đơn
5. Candidate nhận notification kết quả
6. Test quên mật khẩu (OTP email)
7. Test Admin dashboard

#### Bước 7.2: Responsive test
- Resize trình duyệt hoặc dùng DevTools (F12 → Toggle Device Toolbar)
- Test ở 3 breakpoints: Desktop (>992px), Tablet (768-992px), Mobile (<768px)

---

## 6. CHI TIẾT TỪNG PHẦN CODE — KIẾN THỨC SỬ DỤNG

### 6.1. Connection String MongoDB Atlas

```javascript
// config/db.js
mongoose.connect("mongodb+srv://user:pass@cluster.mongodb.net/")
```
- **Kiến thức**: MongoDB Atlas, SRV connection, async connection handling

### 6.2. Middleware Pattern

```javascript
// server.js dòng 39-43 — Gắn io và onlineUsers vào mọi request
app.use((req, res, next) => {
  req.io = io;
  req.onlineUsers = onlineUsers;
  next();   // <-- gọi next() để chuyển sang middleware/route tiếp theo
});
```
- **Kiến thức**: Express middleware chain, `next()` function

### 6.3. Phân trang Backend (Pagination)

```javascript
// jobRoutes.js dòng 30-57
const pageNum = parseInt(page) || 1;
const limitNum = parseInt(limit) || 10;
const total = await Jobs.countDocuments(filter);
const jobs = await Jobs.find(filter)
  .skip((pageNum - 1) * limitNum)  // Bỏ qua N bản ghi đầu
  .limit(limitNum)                  // Lấy tối đa N bản ghi
  .sort({ postedDate: -1 });       // Sắp xếp mới nhất trước
```
- **Công thức**: `skip = (page - 1) * limit`
- **Kiến thức**: MongoDB cursor methods, query chaining

### 6.4. Tìm kiếm với Regex

```javascript
// jobRoutes.js dòng 14-18
filter.$or = [
  { title: { $regex: keyword, $options: "i" } },    // "i" = case insensitive
  { company: { $regex: keyword, $options: "i" } },
];
```
- **Kiến thức**: MongoDB `$regex` operator, `$or` logical operator

### 6.5. Populate (Join Data)

```javascript
// applicationRoutes.js dòng 21-22
const applications = await Applications.find(query)
  .populate('jobId')   // Tự động nối dữ liệu Job vào trường jobId
```
- **Kiến thức**: Mongoose `.populate()` — tương tự JOIN trong SQL

### 6.6. Socket.IO Real-time Flow

```javascript
// Backend: applicationRoutes.js dòng 47-50
const targetEmployer = req.onlineUsers?.find(u => u.email === jobInfo.postedBy);
if (targetEmployer) {
  req.io.to(targetEmployer.socketId).emit("getNotification", employerNoti);
}

// Frontend: App.jsx dòng 86-97
socket.on("getNotification", (data) => {
  setNotifications((prev) => [data, ...prev]);
  notification.success({ message: data.title, description: data.message });
});
```
- **Kiến thức**: `.to(socketId).emit()` gửi cho 1 user cụ thể, event-driven architecture

### 6.7. OTP Email Flow

```javascript
// authRoutes.js dòng 135-140
const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 chữ số
account.resetOTP = otp;
account.resetOTPExpires = new Date(Date.now() + 10 * 60 * 1000);   // 10 phút
await account.save();
await transporter.sendMail(mailOptions);                            // Gửi email
```
- **Kiến thức**: Random number generation, timestamp expiry, HTML email template

### 6.8. Context API Pattern

```javascript
// AuthContext.jsx — Toàn bộ pattern
const AuthContext = createContext();           // 1. Tạo context

const AuthProvider = ({ children }) => {       // 2. Tạo Provider
  const [user, setUser] = useState(null);     //    quản lý state
  const login = async () => {...};            //    định nghĩa actions
  return (
    <AuthContext.Provider value={{ user, login }}>  // 3. Cung cấp value
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);  // 4. Custom hook lấy value
```

### 6.9. localStorage cho Session

```javascript
// AuthContext.jsx dòng 8-15
const [user, setUser] = useState(() => {
  try {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;    // Khôi phục user khi refresh
  } catch { return null; }
});
```
- **Kiến thức**: `localStorage`, lazy initialization với `useState(() => ...)`

### 6.10. Responsive Design

```javascript
// App.jsx dòng 56-65
useEffect(() => {
  const checkMobile = () => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    if (mobile) setCollapsed(true);
  };
  checkMobile();
  window.addEventListener('resize', checkMobile);     // Lắng nghe resize
  return () => window.removeEventListener('resize', checkMobile); // Cleanup
}, []);
```
- **Kiến thức**: Event listener, cleanup function trong useEffect, responsive breakpoints

---

## 7. NHỮNG LƯU Ý QUAN TRỌNG

### ⚠️ 7.1. Bảo mật

| Vấn đề | Giải pháp trong bài | Cần cải thiện |
|---|---|---|
| Mật khẩu | Hash bằng bcrypt ✅ | Tốt rồi |
| API keys, DB password | File `.env` ✅ | Thêm `.env` vào `.gitignore` |
| Auth check | Check role ở frontend | **Nên thêm JWT token** để bảo mật API |
| Admin routes | Middleware `isAdmin` ✅ | Tốt nhưng header-based, nên dùng JWT |

> [!CAUTION]
> Dự án hiện tại **KHÔNG dùng JWT (JSON Web Token)** — đây là điểm cần cải thiện. Hiện tại việc xác thực chỉ dựa vào client gửi email/role, ai cũng có thể giả mạo. Khi nâng cấp, hãy thêm JWT.

### ⚠️ 7.2. Lỗi thường gặp khi tự code lại

| Lỗi | Nguyên nhân | Cách sửa |
|---|---|---|
| `CORS error` | Frontend gọi Backend khác port | Thêm `app.use(cors())` ở backend |
| `Cannot find module` | Import sai đường dẫn | Kiểm tra đường dẫn file `.js` extension |
| `_id vs id` | MongoDB dùng `_id` | Luôn dùng `_id` khi thao tác với MongoDB |
| `Cannot read undefined` | Data chưa load xong | Dùng optional chaining `?.` hoặc check null |
| Port 5000 bị chiếm | Chương trình khác dùng | Đổi PORT trong `.env` |
| Email OTP không gửi | Chưa bật App Password | Vào Google Account → Security → App Passwords |

### ⚠️ 7.3. Thứ tự chạy dự án

```bash
# Terminal 1 — Backend
cd backend
npm run dev       # Chạy bằng nodemon, tự restart khi thay đổi code

# Terminal 2 — Frontend
cd frontend
npm run dev       # Vite dev server chạy ở http://localhost:5173
```

> [!IMPORTANT]
> Luôn chạy **Backend trước**, **Frontend sau**. Frontend phụ thuộc vào Backend để gọi API.

### ⚠️ 7.4. Tips khi code

1. **Code backend trước, test bằng Postman** → Đảm bảo API đúng → Rồi mới làm frontend
2. **Tạo model trước, route sau** → Model là nền tảng, route phụ thuộc vào model
3. **Làm Auth trước** (đăng ký/đăng nhập) → Tất cả tính năng khác đều cần user
4. **Mỗi lần thêm tính năng mới, test ngay** → Đừng code hết rồi mới test
5. **Dùng `console.log()` để debug** → In ra xem data nhận/trả đúng chưa
6. **Đọc error message** → MongoDB và Express đều trả error rất rõ ràng

---

## 📚 TÀI LIỆU HỌC THÊM

| Chủ đề | Nguồn học miễn phí |
|---|---|
| JavaScript ES6+ | [javascript.info](https://javascript.info) |
| React | [react.dev](https://react.dev/learn) (docs chính thức) |
| Express.js | [expressjs.com](https://expressjs.com/en/guide/routing.html) |
| MongoDB/Mongoose | [mongoosejs.com/docs/guide.html](https://mongoosejs.com/docs/guide.html) |
| Ant Design | [ant.design/components](https://ant.design/components/overview) |
| Socket.IO | [socket.io/docs/v4](https://socket.io/docs/v4/) |
| Vite | [vitejs.dev/guide](https://vitejs.dev/guide/) |

---

> [!TIP]
> **Lời khuyên cuối**: Đừng cố code hết trong 1 ngày. Hãy chia nhỏ từng phần, hiểu rồi mới code. Bạn đã hoàn thành dự án này một lần rồi — lần code lại sẽ nhanh hơn nhiều vì bạn đã hiểu tổng thể! 💪
