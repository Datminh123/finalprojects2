import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Avatar, Space, Typography, Drawer, Badge, Popover, List, notification, message } from 'antd';
import { io } from "socket.io-client";
import { AuthProvider, useAuth } from './context/AuthContext';
import { JobsProvider } from './context/JobsContext';
import { ApplicationsProvider } from './context/ApplicationsContext';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { ForgotPassword } from './components/ForgotPassword';
import { CandidateDashboard } from './components/CandidateDashboard';
import { EmployerDashboard } from './components/EmployerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { ApplicationManager } from './components/ApplicationManager';
import { JobSearchPage } from './components/JobSearchPage';
import { CVLibrary } from './components/CVLibrary';
import { Profile } from './components/Profile';
import { ChangePassword } from './components/ChangePassword';
import { PostJob } from './components/PostJob';
import { EmployerLanding } from './components/EmployerLanding';
import { CandidateLanding } from './components/CandidateLanding';

// Lucide Icons
import { 
  Menu as MenuIcon, 
  Bell, 
  User, 
  Briefcase, 
  LayoutDashboard, 
  Search, 
  FileText, 
  FolderOpen, 
  Settings, 
  Lock, 
  LogOut,
  Building2,
  Shield,
  Users,
  X,
  Home
} from 'lucide-react';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

// Component nội dung chính tách riêng để dùng được useAuth()
const MainLayout = () => {
  const { user, logout } = useAuth();
  const [activeMenu, setActiveMenu] = useState('1');
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null);

  // Responsive: phát hiện mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setCollapsed(true);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  useEffect(() => {
    const fetchNotis = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/notifications/${user.email}`);
        const data = await response.json();
        setNotifications(data);
      } catch (err) { console.error("Lỗi fetch noti:", err); }
    };
    if (user?.email) fetchNotis();
  }, [user?.email]);

  useEffect(() => {
    if (user?.email) {
      const newSocket = io("http://localhost:5000");
      setSocket(newSocket);
      newSocket.emit("registerUser", user.email);
      return () => newSocket.close();
    }
  }, [user?.email]);

  useEffect(() => {
    if (socket) {
      socket.on("getNotification", (data) => {
        setNotifications((prev) => [data, ...prev]);
        notification.success({
          message: data.title,
          description: data.message,
          placement: 'topRight',
        });
      });
    }
  }, [socket]);

  const handleMarkAllAsRead = async () => {
    if (!user?.email) return;
    try {
      const response = await fetch(`http://localhost:5000/api/applications/mark-all-read/${user.email}`, {
        method: 'PUT'
      });

      if (response.ok) {
        setNotifications(prev => prev.map(noti => ({
          ...noti,
          isRead: true
        })));
        message.success("Đã đọc tất cả thông báo");
      }
    } catch (err) {
      console.error("Lỗi:", err);
    }
  };

  const notificationContent = (
    <div style={{ width: 'min(320px, calc(100vw - 48px))' }}>
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#f8fafc',
        borderRadius: '12px 12px 0 0',
        margin: '-12px -13px 0 -13px'
      }}>
        <Text strong style={{ color: '#1e293b', fontSize: 16 }}>🔔 Thông báo</Text>
        <Button
          type="link"
          size="small"
          onClick={handleMarkAllAsRead}
          disabled={!notifications.some(n => !n.isRead)}
          style={{ color: '#2563eb', padding: 0, fontSize: 13, fontWeight: 600 }}
        >
          Đánh dấu tất cả đã đọc
        </Button>
      </div>

      <List
        size="small"
        dataSource={notifications}
        locale={{ emptyText: '📭 Không có thông báo' }}
        style={{ maxHeight: 350, overflowY: 'auto', marginTop: 8 }}
        renderItem={(item) => (
          <List.Item style={{
            cursor: 'pointer',
            background: item.isRead ? '#fff' : '#eff6ff',
            padding: '16px',
            borderBottom: '1px solid #f1f5f9',
            borderRadius: 8,
            marginBottom: 4,
            transition: 'all 0.2s ease'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <Text strong style={{ fontSize: '14px', color: item.isRead ? '#374151' : '#2563eb' }}>
                {item.isRead ? '🔔' : '📣'} {item.title}
              </Text>
              <Text style={{ fontSize: '13px', color: '#64748b', marginTop: 4 }}>{item.message}</Text>
            </div>
          </List.Item>
        )}
      />
    </div>
  );

  // 1. Phân quyền Menu Items với Icons
  const menuItems = {
    candidate: [
      { key: '1', icon: <LayoutDashboard size={18} />, label: ' Dashboard' },
      { key: 'search', icon: <Search size={18} />, label: ' Tìm việc làm' },
      { key: 'cv_lib', icon: <FileText size={18} />, label: ' Thư viện CV' },
      { key: '2', icon: <FolderOpen size={18} />, label: ' Đơn ứng tuyển' },
      { key: 'profile', icon: <User size={18} />, label: ' Trang cá nhân' },
      { key: 'change_password', icon: <Lock size={18} />, label: ' Đổi mật khẩu' },
    ],
    employer: [
      { key: '1', icon: <Building2 size={18} />, label: ' Dashboard Tuyển dụng' },
      { key: 'post_job', icon: <Briefcase size={18} />, label: ' Đăng tin' },
      { key: 'profile', icon: <Building2 size={18} />, label: ' Hồ sơ công ty' },
      { key: 'change_password', icon: <Lock size={18} />, label: ' Đổi mật khẩu' },
    ],
    admin: [
      { key: '1', icon: <Shield size={18} />, label: ' Dashboard Admin' },
      { key: 'profile', icon: <User size={18} />, label: ' Trang cá nhân' },
      { key: 'change_password', icon: <Lock size={18} />, label: ' Đổi mật khẩu' },
    ]
  };

  // Horizontal Menu Items for Header Navigation (without icons for proper Ant Design rendering)
  const horizontalMenuItems = [
    {
      key: 'home',
      label: '🏠 Trang chủ',
    },
    {
      key: 'admin',
      label: '🛡️ Quản trị',
    },
    {
      key: 'employer',
      label: '🏢 Nhà tuyển dụng',
    },
  ];

  // 2. Phân quyền Content dựa trên Role và Menu Key
  const renderMainContent = () => {
    if (user.role === 'candidate') {
      switch (activeMenu) {
        case '1': return <CandidateDashboard />;
        case 'search': return <JobSearchPage />;
        case 'cv_lib': return <CVLibrary />;
        case '2': return <ApplicationManager />;
        case 'profile': return <Profile />;
        case 'change_password': return <ChangePassword />;
        default: return <CandidateDashboard />;
      }
    }
    if (user.role === 'employer') {
      switch (activeMenu) {
        case '1': return <EmployerDashboard />;
        case 'post_job': return <PostJob />;
        case 'profile': return <Profile />;
        case 'change_password': return <ChangePassword />;
        default: return <EmployerDashboard />;
      }
    }
    if (user.role === 'admin') {
      switch (activeMenu) {
        case '1': return <AdminDashboard />;
        case 'profile': return <Profile />;
        case 'change_password': return <ChangePassword />;
        default: return <AdminDashboard />;
      }
    }
    return <div>Không có quyền truy cập</div>;
  };

  const handleMenuClick = ({ key }) => {
    setActiveMenu(key);
    if (isMobile) setDrawerVisible(false);
  };

  const handleHorizontalMenuClick = ({ key }) => {
    // Handle horizontal menu navigation
    if (key === 'home') {
      // Go to candidate dashboard
      setActiveMenu('1');
    } else if (key === 'admin') {
      // Switch to admin dashboard
      if (user.role === 'admin') {
        setActiveMenu('1');
      } else {
        message.info('Bạn không có quyền truy cập trang quản trị');
      }
    } else if (key === 'employer') {
      // Switch to employer dashboard
      if (user.role === 'employer') {
        setActiveMenu('1');
      } else {
        message.info('Bạn không có quyền truy cập trang nhà tuyển dụng');
      }
    }
  };

  const roleLabels = { candidate: 'ỨNG VIÊN', employer: 'NHÀ TUYỂN DỤNG', admin: 'QUẢN TRỊ VIÊN' };
  
  const getRoleIcon = () => {
    switch (user.role) {
      case 'admin': return <Shield size={20} />;
      case 'employer': return <Building2 size={20} />;
      default: return <User size={20} />;
    }
  };

  const menuContent = (
    <Menu
      theme="dark"
      selectedKeys={[activeMenu]}
      mode="inline"
      items={menuItems[user.role] || []}
      onClick={handleMenuClick}
      style={{ background: 'transparent' }}
    />
  );

  return (
    <Layout style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Sidebar Desktop */}
      {!isMobile && (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          breakpoint="lg"
          style={{ 
            position: 'sticky', 
            top: 0, 
            height: '100vh', 
            zIndex: 10,
            background: '#1e293b',
            boxShadow: '2px 0 8px rgba(0, 0, 0, 0.15)'
          }}
        >
          <div style={{ 
            height: 70, 
            color: '#fff', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            fontWeight: 'bold', 
            fontSize: collapsed ? 22 : 18,
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            padding: '0 10px'
          }}>
            {collapsed ? (
              <span style={{ fontSize: 28 }}>💼</span>
            ) : (
              <span style={{ 
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                padding: '8px 16px',
                borderRadius: 8,
                fontSize: 16,
                color: '#fff',
                fontWeight: 600
              }}>
                JOB PORTAL
              </span>
            )}
          </div>
          {menuContent}
        </Sider>
      )}

      {/* Drawer Mobile */}
      {isMobile && (
        <Drawer
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 24 }}>💼</span>
              <span style={{ color: '#fff', fontWeight: 'bold' }}>JOB PORTAL</span>
            </div>
          }
          placement="left"
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          width={280}
          styles={{
            header: { 
              background: '#1e293b', 
              borderBottom: '1px solid rgba(255,255,255,0.1)' 
            },
            body: { 
              padding: 0, 
              background: '#1e293b' 
            },
          }}
          extra={
            <Button 
              type="text" 
              icon={<X size={20} color="#fff" />} 
              onClick={() => setDrawerVisible(false)}
            />
          }
        >
          {menuContent}
        </Drawer>
      )}

      <Layout>
        <Header style={{
          background: '#fff', 
          padding: isMobile ? '0 8px' : '0 20px', 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          position: 'sticky', 
          top: 0, 
          zIndex: 9,
          borderBottom: '1px solid #e2e8f0',
          height: 'auto',
          lineHeight: 'normal'
        }}>
          {/* Top Row: Logo + Nav + User Info */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '8px 0',
            gap: 8,
            minWidth: 0
          }}>
            {/* Left: Logo/Title */}
            <Space style={{ minWidth: 0, flexShrink: 1 }}>
              {isMobile && (
                <Button
                  type="text"
                  icon={<MenuIcon size={20} style={{ color: '#3b82f6' }} />}
                  onClick={() => setDrawerVisible(true)}
                  style={{ 
                    fontSize: 20,
                    background: '#f1f5f9',
                    borderRadius: 10,
                    width: 36,
                    height: 36,
                    minWidth: 36,
                    flexShrink: 0
                  }}
                />
              )}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: isMobile ? 6 : 12,
                padding: isMobile ? '6px 10px' : '8px 16px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                borderRadius: 10,
                color: '#fff',
                minWidth: 0,
                overflow: 'hidden'
              }}>
                {getRoleIcon()}
                <Title level={4} style={{ margin: 0, fontSize: isMobile ? 12 : 17, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {isMobile ? (roleLabels[user.role] || user.role?.toUpperCase()) : `HỆ THỐNG ${roleLabels[user.role] || user.role?.toUpperCase()}`}
                </Title>
              </div>
            </Space>

            {/* Right: User Info + Logout */}
            <Space size={isMobile ? 4 : 'middle'} align="center" style={{ flexShrink: 0 }}>
              <Popover content={notificationContent} title={false} trigger="click" placement="bottomRight">
                <Badge count={notifications.filter(n => n.isRead === false).length} offset={[-2, 2]}>
                  <Button 
                    type="text" 
                    style={{ 
                      borderRadius: 12,
                      width: isMobile ? 36 : 48,
                      height: isMobile ? 36 : 48,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 0
                    }}
                  >
                    <Bell size={isMobile ? 18 : 24} color="#3b82f6" />
                  </Button>
                </Badge>
              </Popover>
              <Space>
                <Avatar
                  size={isMobile ? 32 : 40}
                  src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.fullName}&background=3b82f6&color=fff`}
                  style={{ border: '2px solid #3b82f6' }}
                >
                  {user?.fullName?.charAt(0).toUpperCase()}
                </Avatar>
                {!isMobile && (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text strong style={{ fontSize: 14, color: '#1e293b' }}>{user.fullName}</Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>{user.email}</Text>
                  </div>
                )}
              </Space>
              <Button 
                type="primary" 
                danger 
                onClick={logout} 
                size={isMobile ? 'small' : 'middle'}
                icon={<LogOut size={16} />}
                style={{ borderRadius: 8 }}
              >
                {isMobile ? '' : 'Đăng xuất'}
              </Button>
            </Space>
          </div>
        </Header>

        <Content style={{ margin: isMobile ? '12px 8px' : '24px' }}>
          <div style={{ 
            padding: isMobile ? 16 : 28, 
            minHeight: 360, 
            background: '#fff', 
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
          }}>
            {renderMainContent()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

// Component bao ngoài cùng
const AuthWrapper = () => {
  const { user, login, register } = useAuth();
  const [showRegister, setShowRegister] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [landingView, setLandingView] = useState('candidate'); // 'candidate', 'employer', 'login', 'register'

  // Show landing pages when not logged in
  if (!user) {
    // Show Employer Landing
    if (landingView === 'employer') {
      return (
        <EmployerLanding 
          onLogin={() => setLandingView('login')} 
          onRegister={() => {
            setLandingView('register');
            setShowRegister(true);
          }}
          onSwitchToCandidate={() => setLandingView('candidate')}
        />
      );
    }
    
    // Show Candidate Landing (default)
    if (landingView === 'candidate') {
      return (
        <CandidateLanding 
          onLogin={() => setLandingView('login')} 
          onRegister={() => {
            setLandingView('register');
            setShowRegister(true);
          }}
          onSwitchToEmployer={() => setLandingView('employer')}
        />
      );
    }
    
    // Show Login/Register forms
    if (showForgotPassword) {
      return (
        <ForgotPassword 
          onBackToLogin={() => setShowForgotPassword(false)} 
          onBackToLanding={() => setLandingView('candidate')}
        />
      );
    }
    return showRegister ? (
      <RegisterForm 
        onRegister={register} 
        onBackToLogin={() => setShowRegister(false)} 
        onBackToLanding={() => setLandingView('candidate')}
      />
    ) : (
      <LoginForm
        onLogin={login}
        onShowRegister={() => setShowRegister(true)}
        onShowForgotPassword={() => setShowForgotPassword(true)}
        onBackToLanding={() => setLandingView('candidate')}
      />
    );
  }

  return <MainLayout />;
};

function App() {
  return (
    <AuthProvider>
      <JobsProvider>
        <ApplicationsProvider>
          <AuthWrapper />
        </ApplicationsProvider>
      </JobsProvider>
    </AuthProvider>
  );
}

export default App;
