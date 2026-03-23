import React, { useState } from 'react';
import { Card, Input, Select, Button, Typography, Modal, message } from 'antd';
import { Mail, Lock, User, Phone, Building2, Briefcase, UserCheck, Shield, ArrowLeft } from 'lucide-react';

const { Title, Text } = Typography;
const { Option } = Select;

export const RegisterForm = ({ onRegister, onBackToLogin, onBackToLanding }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    phone: '',
    company: '' // Chỉ hiển thị nếu role là employer
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Xóa lỗi khi user bắt đầu nhập
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName) {
      newErrors.fullName = 'Vui lòng nhập họ tên!';
    }
    
    if (!formData.email) {
      newErrors.email = 'Vui lòng nhập email!';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ!';
    }
    
    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu!';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự!';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu!';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp!';
    }
    
    if (!formData.role) {
      newErrors.role = 'Vui lòng chọn vai trò!';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Vui lòng nhập số điện thoại!';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ!';
    }
    
    if (formData.role === 'employer' && !formData.company) {
      newErrors.company = 'Vui lòng nhập tên công ty!';
    }
    
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      // Gọi API đăng ký thực tế
      await onRegister({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phone: formData.phone,
        company: formData.company
      });
      
      // Hiển thị thông báo thành công
      Modal.success({
        title: '🎉 Đăng ký thành công!',
        content: 'Tài khoản của bạn đã được tạo. Vui lòng đăng nhập.',
        onOk: onBackToLogin
      });
    } catch (error) {
      const msg = error.response?.data?.message || 'Đăng ký thất bại!';
      message.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const getRoleIcon = (roleValue) => {
    switch (roleValue) {
      case 'admin': return <Shield size={16} />;
      case 'employer': return <Briefcase size={16} />;
      default: return <UserCheck size={16} />;
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
        left: -100,
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.1)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: -150,
        right: -150,
        width: 500,
        height: 500,
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.08)',
      }} />
      
      <Card 
        style={{ 
          width: '100%',
          maxWidth: 440, 
          boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
          borderRadius: '20px',
          border: 'none',
          background: '#ffffff',
          position: 'relative',
          zIndex: 1
        }}
        bodyStyle={{ padding: '24px 20px' }}
      >
        {/* Back Button */}
        <Button 
          type="text" 
          icon={<ArrowLeft size={16} />}
          onClick={onBackToLogin}
          style={{ marginBottom: 12, color: '#64748b', fontSize: 13 }}
        >
          Quay lại
        </Button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 10px',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
            fontSize: 22
          }}>
            📝
          </div>
          <Title level={3} style={{ 
            marginBottom: 4, 
            color: '#1e293b',
            fontWeight: 700
          }}>
            Đăng ký tài khoản
          </Title>
          <Text type="secondary" style={{ fontSize: 13 }}>
            Tạo tài khoản để bắt đầu ✨
          </Text>
        </div>
        
        {/* Full Name */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ marginBottom: 4, fontWeight: 500, color: '#475569', fontSize: 13 }}>Họ và tên *</div>
          <Input 
            prefix={<User size={14} color="#94a3b8" />}
            placeholder="Nguyễn Văn A"
            value={formData.fullName}
            onChange={(e) => updateFormData('fullName', e.target.value)}
            status={errors.fullName ? 'error' : ''}
            size="large"
            style={{ borderRadius: 8, height: 36, fontSize: 13 }}
          />
          {errors.fullName && (
            <div style={{ color: '#ef4444', fontSize: 11, marginTop: 4, fontWeight: 500 }}>
              {errors.fullName}
            </div>
          )}
        </div>

        {/* Email */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ marginBottom: 4, fontWeight: 500, color: '#475569', fontSize: 13 }}>Email *</div>
          <Input 
            prefix={<Mail size={14} color="#94a3b8" />}
            placeholder="email@example.com"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            status={errors.email ? 'error' : ''}
            size="large"
            style={{ borderRadius: 8, height: 36, fontSize: 13 }}
          />
          {errors.email && (
            <div style={{ color: '#ef4444', fontSize: 11, marginTop: 4, fontWeight: 500 }}>
              {errors.email}
            </div>
          )}
        </div>

        {/* Phone */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ marginBottom: 4, fontWeight: 500, color: '#475569', fontSize: 13 }}>Số điện thoại *</div>
          <Input 
            prefix={<Phone size={14} color="#94a3b8" />}
            placeholder="0123456789"
            value={formData.phone}
            onChange={(e) => updateFormData('phone', e.target.value)}
            status={errors.phone ? 'error' : ''}
            size="large"
            style={{ borderRadius: 8, height: 36, fontSize: 13 }}
          />
          {errors.phone && (
            <div style={{ color: '#ef4444', fontSize: 11, marginTop: 4, fontWeight: 500 }}>
              {errors.phone}
            </div>
          )}
        </div>

        {/* Role */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ marginBottom: 4, fontWeight: 500, color: '#475569', fontSize: 13 }}>Vai trò *</div>
          <Select 
            placeholder="Chọn vai trò"
            style={{ width: '100%', height: 36 }}
            value={formData.role || undefined}
            onChange={(value) => updateFormData('role', value)}
            status={errors.role ? 'error' : ''}
            size="large"
          >
            <Option value="candidate">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <UserCheck size={16} color="#4f46e5" /> Ứng viên
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
            <div style={{ color: '#ef4444', fontSize: 11, marginTop: 4, fontWeight: 500 }}>
              {errors.role}
            </div>
          )}
        </div>

        {/* Company - Only show for employer */}
        {formData.role === 'employer' && (
          <div style={{ marginBottom: 10 }}>
            <div style={{ marginBottom: 4, fontWeight: 500, color: '#475569', fontSize: 13 }}>Tên công ty *</div>
            <Input 
              prefix={<Building2 size={14} color="#94a3b8" />}
              placeholder="Công ty ABC"
              value={formData.company}
              onChange={(e) => updateFormData('company', e.target.value)}
              status={errors.company ? 'error' : ''}
              size="large"
              style={{ borderRadius: 8, height: 36, fontSize: 13 }}
            />
            {errors.company && (
              <div style={{ color: '#ef4444', fontSize: 11, marginTop: 4, fontWeight: 500 }}>
                {errors.company}
              </div>
            )}
          </div>
        )}

        {/* Password */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ marginBottom: 4, fontWeight: 500, color: '#475569', fontSize: 13 }}>Mật khẩu *</div>
          <Input.Password 
            prefix={<Lock size={14} color="#94a3b8" />}
            placeholder="Tối thiểu 6 ký tự"
            value={formData.password}
            onChange={(e) => updateFormData('password', e.target.value)}
            status={errors.password ? 'error' : ''}
            size="large"
            style={{ borderRadius: 8, height: 36, fontSize: 13 }}
          />
          {errors.password && (
            <div style={{ color: '#ef4444', fontSize: 11, marginTop: 4, fontWeight: 500 }}>
              {errors.password}
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ marginBottom: 4, fontWeight: 500, color: '#475569', fontSize: 13 }}>Xác nhận mật khẩu *</div>
          <Input.Password 
            prefix={<Lock size={14} color="#94a3b8" />}
            placeholder="Nhập lại mật khẩu"
            value={formData.confirmPassword}
            onChange={(e) => updateFormData('confirmPassword', e.target.value)}
            status={errors.confirmPassword ? 'error' : ''}
            size="large"
            style={{ borderRadius: 8, height: 36, fontSize: 13 }}
          />
          {errors.confirmPassword && (
            <div style={{ color: '#ef4444', fontSize: 11, marginTop: 4, fontWeight: 500 }}>
              {errors.confirmPassword}
            </div>
          )}
        </div>

        {/* Register Button */}
        <Button 
          type="primary" 
          onClick={handleSubmit} 
          block 
          size="large"
          loading={loading}
          style={{ 
            height: 40, 
            borderRadius: 8, 
            fontSize: 14,
            fontWeight: 600,
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
            border: 'none',
            marginBottom: 12
          }}
        >
          🚀 Đăng ký
        </Button>

        {/* Back to Login */}
        <Text type="secondary" style={{ display: 'block', textAlign: 'center', fontSize: 13 }}>
          Đã có tài khoản?{' '}
          <a 
            href="#" 
            onClick={onBackToLogin}
            style={{ 
              color: '#2563eb',
              fontWeight: 600
            }}
          >
            Đăng nhập ngay
          </a>
        </Text>
      </Card>
    </div>
  );
};
