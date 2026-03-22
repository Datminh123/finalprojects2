import React from 'react';
import { Table, Tag, Card, Button, Typography, Space } from 'antd';
import { useApplications } from '../hooks/useApplications';
import { useAuth } from '../hooks/useAuth';
import { useJobs } from '../hooks/useJobs';
import { FileText, Eye, Check, X, User, Briefcase, MapPin, Calendar } from 'lucide-react';

const { Text } = Typography;

export const ApplicationManager = () => {
  const { applications, loading } = useApplications();
  const { jobs } = useJobs();
  const { user } = useAuth();
  const myApps = applications.filter(app => app.candidateEmail === user.email);
  const columns = [
    {
      title: 'Công việc',
      key: 'job',
      render: (_, record) => {
        const jobId = record.jobId?._id || record.jobId;
        const job = jobs.find(j => j._id === jobId || j.id === jobId);
        return (
          <Space orientation="vertical" size={0}>
            <Text strong>{job ? job.title : `Job #${jobId}`}</Text>
            <Text type="secondary" style={{ fontSize: '12px' }}>{job?.company}</Text>
          </Space>
        );
      }
    },
    {
      title: 'Ngày ứng tuyển',
      dataIndex: 'appliedDate',
      key: 'appliedDate',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors = { pending: 'orange', accepted: 'green', rejected: 'red' };
        const labels = { pending: 'Chờ duyệt', accepted: 'Đã nhận', rejected: 'Từ chối' };
        return <Tag color={colors[status] || 'default'}>{labels[status] || status}</Tag>;
      }
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="link" href={record.resume} target="_blank" icon={<Eye size={14} />}>Xem CV</Button>
          {user.role === 'employer' && record.status === 'pending' && (
            <>
              <Button size="small" type="primary" ghost icon={<Check size={14} />}>Duyệt</Button>
              <Button size="small" danger ghost icon={<X size={14} />}>Từ chối</Button>
            </>
          )}
        </Space>
      )
    }
  ].filter(item => !item.hidden);

  return (
    <Card 
      title={
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {user.role === 'employer' ? <Briefcase size={20} color="#4f46e5" /> : <User size={20} color="#4f46e5" />}
          {user.role === 'employer' ? "Quản lý danh sách ứng viên" : "Đơn ứng tuyển của tôi"}
        </span>
      }
    >
      <Table 
        columns={columns} 
        dataSource={myApps} 
        rowKey="_id" 
        loading={loading}
        pagination={{ pageSize: 8 }}
      />
    </Card>
  );
};