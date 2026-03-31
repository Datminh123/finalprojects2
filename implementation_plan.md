# Sửa Responsive Mobile cho Job Portal

Tất cả các trang đều bị vỡ layout trên mobile do: inline style cố định width, `Col span={12}` không responsive, header padding lớn, bảng không cuộn ngang, và thiếu xử lý overflow.

## Proposed Changes

### App Layout (Header + Content)

#### [MODIFY] [App.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/App.jsx)

- **Header**: Giảm padding trên mobile, ẩn text "HỆ THỐNG..." dài trên mobile nhỏ, rút gọn role badge
- **Notification popup**: Chiều rộng `320px` cố định → sử dụng [min(320px, calc(100vw - 32px))](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/components/AdminDashboard.jsx#14-506)
- **Header row**: Thêm `flexWrap: 'wrap'` và `overflow: hidden` cho header content

---

### Landing Pages

#### [MODIFY] [CandidateLanding.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/components/CandidateLanding.jsx)

- Header: `padding: '16px 40px'` → `padding: '12px 16px'` trên mobile, thêm `flexWrap: 'wrap'`
- Hero section: `marginBottom: 60` → giảm xuống `32` trên mobile
- Benefits section: `padding: 40` → responsive `padding: '24px 16px'`

#### [MODIFY] [EmployerLanding.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/components/EmployerLanding.jsx)

- Cùng các fix như CandidateLanding

---

### Auth Forms

#### [MODIFY] [RegisterForm.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/components/RegisterForm.jsx)

- Card `width: 440` cố định → `width: '100%', maxWidth: 440` để không vượt quá màn hình mobile

---

### Dashboard & Data Pages

#### [MODIFY] [EmployerDashboard.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/components/EmployerDashboard.jsx)

- Hai bảng Table thiếu `scroll={{ x: ... }}` → thêm horizontal scroll
- Modal `width={700}` → `width="95%"` + `style={{ maxWidth: 700 }}`
- Các `Col span={12}` trong Modal → `xs={24} sm={12}` để stack trên mobile

#### [MODIFY] [JobSearchPage.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/components/JobSearchPage.jsx)

- Bảng chính thiếu `scroll={{ x: ... }}` → thêm horizontal scroll

#### [MODIFY] [PostJob.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/components/PostJob.jsx)

- Tất cả `Col span={12}` → `xs={24} sm={12}` để stack trên mobile
- Container padding: cân chỉnh cho mobile

#### [MODIFY] [AdminDashboard.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/components/AdminDashboard.jsx)

- Các `Input.Search` có `width: 280` cố định → `width: '100%', maxWidth: 280`
- Select filter `width: 160` → `width: '100%', maxWidth: 160` (đã có flexWrap)
- Modal `Col span={12}` → `xs={24} sm={12}`

#### [MODIFY] [ApplicationManager.jsx](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/components/ApplicationManager.jsx)

- Table thiếu `scroll={{ x: ... }}` → thêm horizontal scroll

---

### Global CSS

#### [MODIFY] [App.css](file:///c:/Users/Minh%20Dat/OneDrive/Desktop/Workspace/Web-93/finalprojects2/frontend/src/App.css)

- Thêm CSS toàn cục cho mobile: force `box-sizing: border-box` trên `*`, overflow fixes
- Cải thiện responsive cho Ant Design components header, card, form
- Thêm responsive cho Layout Content area

## Verification Plan

### Browser Test
- Mở dev server (`npm run dev`) và dùng browser tool để kiểm tra ở viewport 375px (iPhone SE), 390px (iPhone 14), 768px (iPad)
- Kiểm tra tất cả các trang: Landing, Login, Register, Dashboard, Search, PostJob, Profile
- Xác nhận không có overflow ngang (scrollbar ngang) ở bất kỳ trang nào
