import React from 'react';
import { Row, Col, Card, Statistic, List, Typography, Tag, Skeleton, Spin } from 'antd';
import { useApplications } from '../hooks/useApplications';
import { useAuth } from '../hooks/useAuth';
import { FileText, Clock, CheckCircle, Activity } from 'lucide-react';

const { Title } = Typography;

export const CandidateDashboard = () => {
  const { applications, loading } = useApplications();
  const { user } = useAuth();

  const myApplications = applications.filter(app => app.candidateEmail === user.email);
  const acceptedCount = myApplications.filter(app => app.status === 'accepted').length;
  const pendingCount = myApplications.filter(app => app.status === 'pending').length;

  return (
    <div>
      <Title level={3} style={{ marginBottom: 24, color: '#1e293b', fontWeight: 600 }}>
        📊 Tổng quan hoạt động
      </Title>
      
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <Card 
            bordered={false} 
            style={{ 
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
              borderRadius: 16,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}
          >
            {loading ? <Skeleton active paragraph={false} /> : (
              <Statistic 
                title={<span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>Đơn đã nộp</span>} 
                value={myApplications.length} 
                prefix={<FileText size={24} color="#fff" />}
                valueStyle={{ color: '#fff', fontWeight: 700 }}
              />
            )}
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card 
            bordered={false} 
            style={{ 
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
              borderRadius: 16,
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
            }}
          >
            {loading ? <Skeleton active paragraph={false} /> : (
              <Statistic 
                title={<span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>Đang chờ duyệt</span>} 
                value={pendingCount} 
                prefix={<Clock size={24} color="#fff" />}
                valueStyle={{ color: '#fff', fontWeight: 700 }}
              />
            )}
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card 
            bordered={false} 
            style={{ 
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
              borderRadius: 16,
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
            }}
          >
            {loading ? <Skeleton active paragraph={false} /> : (
              <Statistic 
                title={<span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>Được chấp nhận</span>} 
                value={acceptedCount} 
                prefix={<CheckCircle size={24} color="#fff" />}
                valueStyle={{ color: '#fff', fontWeight: 700 }}
              />
            )}
          </Card>
        </Col>
      </Row>

      <Card
        title={
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Activity size={20} color="#4f46e5" />
            Hoạt động gần đây
          </span>
        }
        bordered={false}
        style={{ 
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
          borderRadius: 16
        }}
      >
        <List
          loading={loading}
          dataSource={
            [...myApplications]
              .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))
              .slice(0, 5)
          }
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={`Bạn đã nộp đơn ứng tuyển cho công việc ở công ty ${item.jobId?.company}`}
                description={`Thời gian: ${new Date(item.appliedDate).toLocaleString("vi-VN")}`}
              />

              <Tag
                color={
                  item.status === "accepted"
                    ? "green"
                    : item.status === "rejected"
                    ? "red"
                    : "orange"
                }
                style={{ borderRadius: 6 }}
              >
                {item.status === "accepted"
                  ? "✅ Đã chấp nhận"
                  : item.status === "rejected"
                  ? "❌ Đã từ chối"
                  : "⏳ Chờ duyệt"}
              </Tag>
            </List.Item>
          )}
          locale={{ emptyText: "📭 Chưa có hoạt động nào" }}
        />
      </Card>
    </div>
  );
};
