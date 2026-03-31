# 📘 PHẦN 2: KIẾN THỨC BACKEND & FRONTEND — ĐỊNH NGHĨA & BÀI TẬP

> Tiếp nối [Phần 1 — Nền tảng](file:///C:/Users/Minh%20Dat/.gemini/antigravity/brain/b3581aca-fb0b-4379-b6f3-fcc1f37e394c/huong_dan_tu_code_job_portal.md)  

---

## 4. KIẾN THỨC BACKEND

---

### 📖 4.1. Node.js & npm

#### Định nghĩa
- **Node.js**: Môi trường chạy JavaScript **bên ngoài trình duyệt** (phía server). Nhờ Node.js, ta dùng 1 ngôn ngữ JavaScript cho cả frontend lẫn backend.
- **npm** (Node Package Manager): Công cụ quản lý thư viện. Cài thư viện bằng `npm install`, chạy script bằng `npm run`.

#### Dùng ở đâu
- [package.json](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/package.json) — khai báo dependencies & scripts
- `"type": "module"` (dòng 13) → cho phép dùng `import/export`
- `"dev": "nodemon server.js"` (dòng 8) → script chạy dev server

#### Khái niệm quan trọng
| Khái niệm | Giải thích |
|---|---|
| [package.json](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/package.json) | "Hồ sơ" dự án: tên, phiên bản, dependencies, scripts |
| `node_modules/` | Thư mục chứa tất cả thư viện đã cài |
| `npm install` | Cài tất cả dependencies trong [package.json](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/package.json) |
| `npm install express` | Cài 1 package cụ thể |
| `npm install -D nodemon` | Cài devDependency (chỉ dùng khi dev) |
| `nodemon` | Tự restart server khi code thay đổi |

#### 📝 Bài tập
1. **BT1**: Chạy `npm init -y` trong 1 thư mục trống. Mở [package.json](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/package.json) và giải thích từng trường
2. **BT2**: Cài `express` và `nodemon`. Xem [package.json](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/package.json) thay đổi thế nào
3. **BT3**: Tạo file `index.js` in ra `"Hello from Node.js!"`. Chạy bằng `node index.js`

---

### 📖 4.2. Express.js ⭐⭐⭐

#### Định nghĩa
Express.js là **framework web cho Node.js**, giúp tạo **API server** nhanh chóng. Nó xử lý HTTP requests (GET, POST, PUT, DELETE) và trả về responses.

#### Dùng ở đâu
- [server.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/server.js) — tạo app Express
- Tất cả file trong [routes/](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/routes) — định nghĩa API endpoints

#### Khái niệm quan trọng

**a) Middleware** — Hàm xử lý request trước khi đến route handler:
```javascript
// server.js dòng 22-23
app.use(cors());           // Cho phép frontend gọi API (khác origin)
app.use(express.json());   // Parse JSON từ request body → req.body
```
> **Ý nghĩa**: Middleware chạy **TRƯỚC** route handlers. Thứ tự `app.use()` rất quan trọng!

**b) Route Handler** — Hàm xử lý 1 API endpoint:
```javascript
// jobRoutes.js dòng 63-71
router.post("/", async (req, res) => {    // POST /api/jobs
  const jobs = new Jobs(req.body);        // req.body = data từ client
  await jobs.save();                       // Lưu vào DB
  res.status(201).json(jobs);             // Trả về cho client (201 = Created)
});
```

**c) req (Request)** — Object chứa thông tin request từ client:
| Thuộc tính | Ý nghĩa | Ví dụ |
|---|---|---|
| `req.body` | Dữ liệu gửi trong body (POST/PUT) | `{ title: "Dev", salary: "20tr" }` |
| `req.params` | Tham số trong URL path | `/api/jobs/:id` → `req.params.id` |
| `req.query` | Tham số query string | `/api/jobs?city=HCM` → `req.query.city` |
| `req.headers` | HTTP headers | `req.headers.adminemail` |

**d) res (Response)** — Object để gửi phản hồi:
| Method | Ý nghĩa | HTTP Status |
|---|---|---|
| `res.json(data)` | Trả JSON thành công | 200 (mặc định) |
| `res.status(201).json(data)` | Trả với status tùy chỉnh | 201 = Created |
| `res.status(400).json({message})` | Lỗi client | 400 = Bad Request |
| `res.status(404).json({message})` | Không tìm thấy | 404 = Not Found |
| `res.status(500).json({message})` | Lỗi server | 500 = Internal Error |

**e) RESTful API** — Quy ước thiết kế API:
```
GET    /api/jobs        → Lấy danh sách    (Read)
POST   /api/jobs        → Tạo mới          (Create)
GET    /api/jobs/:id    → Lấy chi tiết     (Read one)
PUT    /api/jobs/:id    → Cập nhật         (Update)
DELETE /api/jobs/:id    → Xóa              (Delete)
```

#### 📝 Bài tập Express
1. **BT1**: Tạo Express server chạy ở port 3000, có route `GET /` trả về `{ message: "Hello API" }`
2. **BT2**: Thêm route `POST /api/users` nhận `{ name, email }` từ `req.body` và in ra console
3. **BT3**: Tạo route `GET /api/users/:id` lấy [id](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/context/JobsContext.jsx#6-92) từ `req.params` và trả về `{ userId: id }`
4. **BT4**: Tạo route `GET /api/search?keyword=abc` lấy keyword từ `req.query`
5. **BT5 ⭐**: Tạo mảng `let users = []` → viết đầy đủ 4 route CRUD (GET all, POST create, PUT update, DELETE) sử dụng mảng này làm database tạm

---

### 📖 4.3. MongoDB & Mongoose ⭐⭐⭐

#### Định nghĩa
- **MongoDB**: Cơ sở dữ liệu **NoSQL** — lưu dữ liệu dạng **document** (JSON), khác SQL lưu dạng bảng.
- **Mongoose**: Thư viện ODM (Object Data Modeling) — giúp Node.js tương tác với MongoDB qua **Schema** (cấu trúc dữ liệu).
- **MongoDB Atlas**: Dịch vụ MongoDB trên cloud, miễn phí 512MB.

#### Dùng ở đâu
- [config/db.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/config/db.js) — kết nối
- [models/](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/models) — 4 model chính

#### Khái niệm quan trọng

**a) Schema** — Cấu trúc dữ liệu (giống bảng trong SQL):
```javascript
// models/Account.js
const AccountSchema = new mongoose.Schema({
  fullName: { type: String, required: true },      // Bắt buộc
  email:    { type: String, required: true, unique: true }, // Duy nhất
  role:     { type: String, enum: ["candidate", "employer", "admin"] }, // Giới hạn giá trị
  phone:    { type: String, default: "" },          // Giá trị mặc định
  createdAt:{ type: Date, default: Date.now },      // Tự tạo timestamp
});
```

**b) Model** — Đối tượng để thao tác CRUD:
```javascript
const Account = mongoose.model("Account", AccountSchema);
// "Account" → tên collection trong MongoDB (tự thêm 's' → 'accounts')
```

**c) CRUD Operations** — 4 thao tác chính:
```javascript
// CREATE — Tạo mới
const account = new Account({ fullName, email, password });
await account.save();

// READ — Đọc
await Jobs.find(filter);        // Tìm nhiều
await Jobs.findById(id);        // Tìm theo ID
await Jobs.findOne({ email });  // Tìm 1 document

// UPDATE — Cập nhật
await Jobs.findByIdAndUpdate(id, newData, { returnDocument: 'after' });
// returnDocument: 'after' → trả về document SAU KHI update

// DELETE — Xóa
await Jobs.findByIdAndDelete(id);
```

**d) Populate** — Nối dữ liệu giữa các collection:
```javascript
// applications có field: jobId: { type: ObjectId, ref: "Job" }
await Applications.find(query).populate('jobId');
// → Tự động thay jobId (ObjectId) bằng object Job đầy đủ
```

**e) Query Operators** — Toán tử truy vấn:
```javascript
filter.$or = [...]        // Tìm thỏa HOẶC điều kiện 1 HOẶC điều kiện 2
filter.$in = [...]        // Tìm giá trị nằm trong mảng
$regex: keyword           // Tìm kiếm theo pattern
$options: "i"             // Case insensitive
```

#### 📝 Bài tập MongoDB/Mongoose
1. **BT1**: Tạo Schema `Product` có fields: `name` (String, required), `price` (Number), `category` (String), `inStock` (Boolean, default: true)
2. **BT2**: Viết route tạo 1 product mới (POST) và lấy tất cả products (GET)
3. **BT3**: Viết route tìm products theo category dùng `req.query`
4. **BT4 ⭐**: Viết phân trang: `GET /api/products?page=2&limit=5` sử dụng `.skip()` và `.limit()`
5. **BT5 ⭐**: Viết tìm kiếm: `GET /api/products?keyword=áo` dùng `$regex`

---

### 📖 4.4. Bcrypt.js — Mã hóa mật khẩu

#### Định nghĩa
Bcrypt là thuật toán **hash một chiều** — biến mật khẩu thành chuỗi mã hóa, **không thể giải mã ngược**. Dùng để bảo vệ mật khẩu trong database.

#### Dùng ở đâu
[authRoutes.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/routes/authRoutes.js) dòng 28-29 (đăng ký), dòng 55 (đăng nhập)

#### 2 thao tác duy nhất:
```javascript
// 1. Hash (khi đăng ký)
const salt = await bcrypt.genSalt(10);                 // Tạo "muối" ngẫu nhiên
const hashedPassword = await bcrypt.hash("abc123", salt); // Hash: "$2a$10$xK..."

// 2. Compare (khi đăng nhập)
const isMatch = await bcrypt.compare("abc123", hashedPassword); // true/false
```

> [!WARNING]
> **Tuyệt đối KHÔNG** lưu password gốc vào database. Luôn hash trước!

---

### 📖 4.5. Nodemailer — Gửi email

#### Định nghĩa
Nodemailer là thư viện Node.js để **gửi email**. Trong bài dùng để gửi mã OTP qua Gmail.

#### Dùng ở đâu
[authRoutes.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/routes/authRoutes.js) dòng 9-16 (config), dòng 143-163 (gửi)

#### Pattern:
```javascript
// 1. Tạo transporter (cấu hình email server)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: "your@gmail.com", pass: "app_password" }
});

// 2. Gửi email
await transporter.sendMail({
  from: '"Job Portal" <your@gmail.com>',
  to: targetEmail,
  subject: "Mã OTP",
  html: "<h1>OTP: 123456</h1>"    // Có thể dùng HTML
});
```

> [!IMPORTANT]
> Gmail yêu cầu **App Password** (không dùng mật khẩu thường). Vào Google Account → Security → 2-Step Verification → App passwords → Tạo mật khẩu cho "Mail".

---

### 📖 4.6. Socket.IO — Thông báo Real-time

#### Định nghĩa
Socket.IO là thư viện cho phép **giao tiếp 2 chiều real-time** giữa server và client qua WebSocket. Khác với HTTP (client hỏi → server trả lời), WebSocket cho phép **server chủ động gửi** dữ liệu cho client.

#### Dùng ở đâu
- Backend: [server.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/server.js) dòng 16-43
- Frontend: [App.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/App.jsx) dòng 77-97

#### Luồng hoạt động:
```
1. Client kết nối:     io("http://localhost:5000")
2. Client đăng ký:     socket.emit("registerUser", email)
3. Server lưu:         onlineUsers.push({ email, socketId })
4. Khi có sự kiện:     io.to(socketId).emit("getNotification", data)
5. Client nhận:        socket.on("getNotification", callback)
```

#### 📝 Bài tập Socket.IO
1. **BT1**: Tạo server Socket.IO đơn giản, khi client kết nối in ra "User connected"
2. **BT2 ⭐**: Tạo chat room: client gửi tin nhắn → server broadcast cho tất cả client

---

### 📖 4.7. dotenv — Biến môi trường

#### Định nghĩa
dotenv đọc file [.env](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/.env) và load các biến vào `process.env`. Dùng để **tách thông tin bí mật** (password, API key) khỏi source code.

#### Dùng ở đâu
- [.env](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/.env), [environtment.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/backend/config/environtment.js)

```bash
# .env (KHÔNG push lên GitHub)
MONGO_URI=mongodb+srv://...
EMAIL_USER=abc@gmail.com
PORT=5000
```
```javascript
// Đọc trong code
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.PORT); // "5000"
```

---

## 5. KIẾN THỨC FRONTEND

---

### 📖 5.1. React.js ⭐⭐⭐

#### Định nghĩa
React là **thư viện JavaScript** để xây dựng giao diện người dùng (UI). React dùng **component-based architecture** — chia UI thành nhiều component nhỏ, tái sử dụng.

#### 4 Hooks quan trọng nhất

**① `useState`** — Quản lý state (dữ liệu thay đổi):
```javascript
// App.jsx dòng 48
const [activeMenu, setActiveMenu] = useState('1');
//      ↑ giá trị    ↑ hàm thay đổi     ↑ giá trị ban đầu

// Khi gọi setActiveMenu('2') → component tự render lại
```

**② `useEffect`** — Chạy side effects (gọi API, lắng nghe sự kiện):
```javascript
// App.jsx dòng 66-75 — Gọi API khi user.email thay đổi
useEffect(() => {
  const fetchNotis = async () => {
    const response = await fetch(`/api/notifications/${user.email}`);
    const data = await response.json();
    setNotifications(data);
  };
  if (user?.email) fetchNotis();
}, [user?.email]);  // ← dependency array: chạy khi user.email thay đổi
```

> [!IMPORTANT]
> **Dependency array `[]`** rất quan trọng:
> - `[]` rỗng = chạy **1 lần** sau render đầu tiên
> - `[user]` = chạy mỗi khi `user` thay đổi
> - Không có `[]` = chạy **SAU MỖI LẦN render** (tránh dùng!)

**③ `useContext`** — Lấy dữ liệu từ Context (state toàn cục):
```javascript
// App.jsx dòng 47
const { user, logout } = useAuth();
// useAuth() = useContext(AuthContext) — lấy user và logout từ AuthProvider
```

**④ `useCallback`** — Ghi nhớ hàm, tránh tạo lại không cần thiết:
```javascript
// JobsContext.jsx dòng 11-23
const fetchJobs = useCallback(async () => {
  const data = await jobsAPI.getAll();
  setJobs(data);
}, []);  // Chỉ tạo hàm 1 lần
```

#### JSX — HTML trong JavaScript
```jsx
// Đây là JSX, KHÔNG phải HTML:
<Button type="primary" onClick={() => setActiveMenu('1')}>
  Dashboard
</Button>
// JSX khác HTML: dùng className thay class, dùng {} để nhúng JS
```

#### 📝 Bài tập React
1. **BT1**: Tạo component `Counter` có nút +/- và hiển thị số đếm (useState)
2. **BT2**: Tạo component `UserList`, dùng useEffect gọi API `https://jsonplaceholder.typicode.com/users` và hiển thị danh sách
3. **BT3 ⭐**: Tạo form đăng nhập (email + password) dùng useState, khi submit in ra console
4. **BT4 ⭐**: Tạo component `TodoList` — thêm/xóa task (kết hợp useState + map + filter)

---

### 📖 5.2. Context API — State toàn cục

#### Định nghĩa
Context API là cơ chế **chia sẻ dữ liệu** giữa nhiều component mà **không cần truyền props** qua nhiều cấp. Giống "biến toàn cục" nhưng có kiểm soát.

#### Dùng ở đâu
3 file context: [AuthContext](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/context/AuthContext.jsx), [JobsContext](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/context/JobsContext.jsx), [ApplicationsContext](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/context/ApplicationsContext.jsx)

#### Pattern 4 bước:
```javascript
// Bước 1: Tạo Context
const AuthContext = createContext();

// Bước 2: Tạo Provider (bọc component con)
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Bước 3: Bọc Provider ở App.jsx
<AuthProvider>
  <JobsProvider>
    <App />
  </JobsProvider>
</AuthProvider>

// Bước 4: Dùng trong bất kỳ component con
const { user } = useContext(AuthContext);
```

#### 📝 Bài tập Context
1. **BT1 ⭐**: Tạo `ThemeContext` — toggle dark/light mode, hiển thị ở 2 component khác nhau
2. **BT2 ⭐⭐**: Tạo `CartContext` — giỏ hàng: thêm sản phẩm, xóa, tính tổng tiền

---

### 📖 5.3. Axios — Gọi API

#### Định nghĩa
Axios là thư viện HTTP client — giúp gọi API dễ dàng hơn [fetch()](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/App.jsx#67-74) native. Hỗ trợ interceptors, timeout, auto JSON parse.

#### Dùng ở đâu
[services/api.js](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/services/api.js) — file trung tâm 340 dòng

#### Pattern:
```javascript
// Tạo instance — api.js dòng 4-10
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
});

// Gọi API — api.js dòng 14-21
const response = await API.get('/jobs', { params: filters });
return response.data;   // Axios tự parse JSON
```

---

### 📖 5.4. Ant Design — UI Component Library

#### Định nghĩa
Ant Design (antd) là thư viện **component UI** có sẵn — cung cấp Button, Table, Form, Modal... đẹp mắt, không cần tự viết CSS.

#### Dùng ở đâu: **MỌI** component frontend

#### Components chính đã dùng:

| Component | Mục đích | Kiến thức cần biết |
|---|---|---|
| `Layout, Sider, Header, Content` | Bố cục trang | Props: `collapsible`, `collapsed` |
| [Menu](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/App.jsx#241-245) | Menu điều hướng | Props: `items`, `selectedKeys`, `onClick` |
| `Form, Form.Item` | Form với validation | Props: `rules`, `onFinish` |
| `Input, Input.Password` | Ô nhập liệu | Props: `prefix` (icon), `placeholder` |
| `Select, Option` | Dropdown chọn | Props: `options`, `onChange` |
| `Table` | Bảng dữ liệu | Props: `columns`, `dataSource`, `pagination` |
| `Button` | Nút bấm | Props: `type`, `danger`, `icon`, `onClick` |
| `Card, Statistic` | Thẻ thông tin | Props: `title`, `value`, `prefix` |
| `Modal` | Dialog popup | Props: `open`, `onOk`, `onCancel` |
| `notification, message` | Toast thông báo | Methods: `.success()`, `.error()` |
| `Badge, Tag` | Label trạng thái | Props: `count`, `color` |
| `Drawer` | Sidebar trượt (mobile) | Props: `open`, `placement`, `onClose` |
| `Tabs` | Tab chuyển đổi | Props: `items` |
| `Skeleton, Spin` | Loading state | Hiển thị khi chờ data |

#### 📝 Bài tập Ant Design
1. **BT1**: Tạo trang có [Layout](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/App.jsx#45-488) (Sider + Header + Content), Sider có Menu 3 mục
2. **BT2**: Tạo form đăng nhập dùng `Form`, `Input`, `Button` với validation (required, email format)
3. **BT3 ⭐**: Tạo `Table` hiển thị danh sách users, có cột actions (Edit, Delete)
4. **BT4 ⭐**: Tạo `Modal` form thêm/sửa user, mở khi click nút

---

### 📖 5.5. Vite — Build Tool

#### Định nghĩa
Vite là **build tool** cho frontend, nhanh hơn nhiều so với Create React App (CRA). Dùng ES modules, Hot Module Replacement (HMR).

#### Biến môi trường Vite
```bash
# .env (frontend)
VITE_API_URL=http://localhost:5000/api
```
```javascript
// Đọc trong code — PHẢI có prefix VITE_
const BASE_URL = import.meta.env.VITE_API_URL;
```

> [!WARNING]
> Frontend dùng `import.meta.env.VITE_*`, backend dùng `process.env.*`. **ĐỪNG NHẦM LẪN!**

---

### 📖 5.6. localStorage — Lưu trữ trình duyệt

#### Định nghĩa
`localStorage` **lưu dữ liệu vĩnh viễn** trên trình duyệt (cho đến khi xóa). Dùng để duy trì phiên đăng nhập khi refresh.

#### Dùng ở đâu
[AuthContext.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/context/AuthContext.jsx) dòng 8-15, 20, 31, 40

```javascript
// Lưu
localStorage.setItem('user', JSON.stringify(userData));

// Đọc
const saved = localStorage.getItem('user');
const user = JSON.parse(saved);

// Xóa
localStorage.removeItem('user');
```

> [!IMPORTANT]
> localStorage chỉ lưu **String**. Phải dùng `JSON.stringify()` khi lưu object và `JSON.parse()` khi đọc.

---

> **Tiếp tục đọc**: [Phần 3 — Thứ tự code từng bước + Chi tiết patterns + Lưu ý](file:///C:/Users/Minh%20Dat/.gemini/antigravity/brain/b3581aca-fb0b-4379-b6f3-fcc1f37e394c/phan3_buoc_lam_va_luu_y.md)

