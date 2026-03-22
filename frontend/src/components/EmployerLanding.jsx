import React from 'react';
import { Card, Button, Row, Col, Typography, Space } from 'antd';
import { Building2, Search, Users, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';

const { Title, Text } = Typography;

export const EmployerLanding = ({ onLogin, onRegister, onSwitchToCandidate }) => {
  const features = [
    {
      icon: <Search size={32} color="#3b82f6" />,
      title: 'Tìm kiếm ứng viên',
      description: 'Dễ dàng tìm kiếm ứng viên phù hợp với yêu cầu công việc'
    },
    {
      icon: <Users size={32} color="#3b82f6" />,
      title: 'Quản lý ứng viên',
      description: 'Theo dõi và quản lý danh sách ứng viên một cách hiệu quả'
    },
    {
      icon: <TrendingUp size={32} color="#3b82f6" />,
      title: 'Thống kê tuyển dụng',
      description: 'Xem báo cáo chi tiết về quá trình tuyển dụng'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '16px 40px',
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 12,
          padding: '8px 16px',
          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          borderRadius: 10,
          color: '#fff'
        }}>
          <span style={{ fontSize: 24 }}>💼</span>
          <span style={{ fontWeight: 600, fontSize: 16 }}>JOB PORTAL</span>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          <a 
            onClick={onSwitchToCandidate}
            style={{ color: '#9ca3af', fontSize: 14, fontWeight: 500, cursor: 'pointer', textDecoration: 'none' }}
          >
            👤 Ứng viên
          </a>
          <a style={{ color: '#2563eb', fontSize: 14, fontWeight: 600, cursor: 'pointer', textDecoration: 'none' }}>
            🏢 Nhà tuyển dụng
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: 60, padding: '60px 20px 0' }}>
        <div style={{
          width: 100,
          height: 100,
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          boxShadow: '0 8px 30px rgba(37, 99, 235, 0.3)'
        }}>
          <Building2 size={48} color="#fff" />
        </div>
        <Title level={1} style={{ color: '#1e293b', marginBottom: 16, fontWeight: 700 }}>
          Dành cho Nhà tuyển dụng
        </Title>
        <Text style={{ fontSize: 18, color: '#64748b', display: 'block', marginBottom: 32 }}>
          Nền tảng tuyển dụng hàng đầu giúp bạn tìm được ứng viên chất lượng
        </Text>
        <Space size="middle">
          <Button 
            type="primary" 
            size="large"
            icon={<ArrowRight size={18} />}
            onClick={onRegister}
            style={{ 
              height: 52, 
              paddingLeft: 28, 
              paddingRight: 28,
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              borderRadius: 12,
              fontWeight: 600
            }}
          >
            Đăng ký ngay
          </Button>
          <Button 
            size="large"
            onClick={onLogin}
            style={{ 
              height: 52, 
              paddingLeft: 28, 
              paddingRight: 28,
              borderRadius: 12,
              fontWeight: 600
            }}
          >
            Đăng nhập
          </Button>
        </Space>
      </div>

      {/* Features */}
      <Row gutter={[32, 32]} justify="center" style={{ maxWidth: 1000, margin: '0 auto', padding: '0 20px' }}>
        {features.map((feature, index) => (
          <Col xs={24} md={8} key={index}>
            <Card 
              style={{ 
                borderRadius: 16, 
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                height: '100%'
              }}
              bodyStyle={{ padding: 32 }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  background: '#eff6ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}>
                  {feature.icon}
                </div>
                <Title level={4} style={{ marginBottom: 8 }}>{feature.title}</Title>
                <Text type="secondary">{feature.description}</Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Benefits */}
      <div style={{ 
        maxWidth: 800, 
        margin: '60px auto 0',
        background: '#fff',
        borderRadius: 20,
        padding: 40,
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
      }}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: 32 }}>
          Tại sao chọn chúng tôi?
        </Title>
        {[
          'Đăng tin tuyển dụng miễn phí',
          'Hàng ngàn ứng viên chất lượng',
          'Công cụ quản lý hiệu quả',
          'Hỗ trợ 24/7'
        ].map((item, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
            <CheckCircle size={20} color="#10b981" style={{ marginRight: 12 }} />
            <Text style={{ fontSize: 16 }}>{item}</Text>
          </div>
        ))}
      </div>
    </div>
  );
};
