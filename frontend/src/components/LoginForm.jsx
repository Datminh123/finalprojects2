import React, { useState } from 'react';
import { Card, Input, Select, Button, Typography, message } from 'antd';
import { Mail, Lock, Briefcase, User, Shield, ArrowRight, ArrowLeft } from 'lucide-react';

const { Title, Text } = Typography;
const { Option } = Select;

export const LoginForm = ({ onLogin, onShowRegister, onShowForgotPassword, onBackToLanding }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Vui lòng nhập email!';
    if (!password) newErrors.password = 'Vui lòng nhập mật khẩu!';
    if (!role) newErrors.role = 'Vui lòng chọn vai trò!';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await onLogin({ email, password, role });
    } catch (error) {
      const msg = error.response?.data?.message || 'Đăng nhập thất bại!';
      message.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const getRoleIcon = (roleValue) => {
    switch (roleValue) {
      case 'admin': return <Shield size={16} />;
      case 'employer': return <Briefcase size={16} />;
      default: return <User size={16} />;
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '16px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decorations */}
      <div style={{
        position: 'absolute',
        top: -100,
        right: -100,
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.1)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: -150,
        left: -150,
        width: 500,
        height: 500,
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.08)',
      }} />
      
      <Card 
        style={{ 
          width: '100%',
          maxWidth: 420, 
          boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
          borderRadius: '20px',
          border: 'none',
          background: '#ffffff',
          position: 'relative',
          zIndex: 1
        }}
        bodyStyle={{ padding: '28px 24px' }}
      >
        {/* Back Button */}
        {onBackToLanding && (
          <Button 
            type="text" 
            icon={<ArrowLeft size={18} />}
            onClick={onBackToLanding}
            style={{ marginBottom: 16, color: '#64748b' }}
          >
            Quay lại
          </Button>
        )}

        {/* Logo/Title */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
            boxShadow: '0 6px 16px rgba(37, 99, 235, 0.25)',
            fontSize: 26
          }}>
            💼
          </div>
          <Title level={2} style={{ 
            marginBottom: 8, 
            color: '#1e293b',
            fontWeight: 700
          }}>
            Job Portal
          </Title>
          <Text type="secondary" style={{ fontSize: 15 }}>
            Chào mừng bạn trở lại! 👋
          </Text>
        </div>
        
        {/* Email Input */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ marginBottom: 6, fontWeight: 500, color: '#475569', fontSize: 14 }}>Email</div>
          <Input 
            prefix={<Mail size={16} color="#94a3b8" />}
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            status={errors.email ? 'error' : ''}
            size="large"
            style={{ 
              borderRadius: 10, 
              height: 40,
              fontSize: 14
            }}
          />
          {errors.email && (
            <div style={{ color: '#ef4444', fontSize: 12, marginTop: 4, fontWeight: 500 }}>
              {errors.email}
            </div>
          )}
        </div>

        {/* Password Input */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ marginBottom: 6, fontWeight: 500, color: '#475569', fontSize: 14 }}>Mật khẩu</div>
          <Input.Password 
            prefix={<Lock size={16} color="#94a3b8" />}
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            status={errors.password ? 'error' : ''}
            size="large"
            style={{ 
              borderRadius: 10, 
              height: 40,
              fontSize: 14
            }}
          />
          {errors.password && (
            <div style={{ color: '#ef4444', fontSize: 12, marginTop: 4, fontWeight: 500 }}>
              {errors.password}
            </div>
          )}
        </div>

        {/* Role Select */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ marginBottom: 6, fontWeight: 500, color: '#475569', fontSize: 14 }}>Đăng nhập với vai trò</div>
          <Select 
            placeholder="Chọn vai trò"
            style={{ width: '100%', height: 40 }}
            value={role || undefined}
            onChange={(value) => setRole(value)}
            status={errors.role ? 'error' : ''}
            size="large"
            suffixIcon={<ArrowRight size={14} color="#94a3b8" />}
          >
            <Option value="candidate">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <User size={16} color="#4f46e5" /> Ứng viên
              </div>
            </Option>
            <Option value="employer">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Briefcase size={16} color="#10b981" /> Nhà tuyển dụng
              </div>
            </Option>
            <Option value="admin">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Shield size={16} color="#f59e0b" /> Quản trị viên
              </div>
            </Option>
          </Select>
          {errors.role && (
            <div style={{ color: '#ef4444', fontSize: 12, marginTop: 6, fontWeight: 500 }}>
              {errors.role}
            </div>
          )}
        </div>

        {/* Login Button */}
        <Button 
          type="primary" 
          onClick={handleSubmit} 
          block 
          size="large" 
          loading={loading}
          style={{ 
            height: 42, 
            borderRadius: 10, 
            fontSize: 15,
            fontWeight: 600,
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            boxShadow: '0 4px 15px rgba(37, 99, 235, 0.25)',
            border: 'none',
            marginBottom: 16
          }}
        >
          🚀 Đăng nhập
        </Button>

        {/* Forgot Password */}
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); onShowForgotPassword?.(); }}
            style={{ 
              color: '#2563eb', 
              fontSize: 13,
              fontWeight: 500
            }}
          >
             🔑 Quên mật khẩu?
          </a>
        </div>

        {/* Register Link */}
        <Text type="secondary" style={{ display: 'block', textAlign: 'center', fontSize: 14 }}>
          Chưa có tài khoản?{' '}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); onShowRegister(); }}
            style={{ 
              color: '#2563eb',
              fontWeight: 600
            }}
          >
            Đăng ký ngay
          </a>
        </Text>
      </Card>
    </div>
  );
};
