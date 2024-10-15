import React from 'react';
import { Card, Statistic, Row, Col, Breadcrumb } from 'antd';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, Legend,ResponsiveContainer } from 'recharts';

const Reports = () => {
  // Dummy data for app usage
  const appUsageData = {
    totalUsers: 1000,
    dailyActiveUsers: 750,
  };

  // Dummy data for course popularity
  const coursePopularityData = [
    { name: 'Course A', enrollments: 120 },
    { name: 'Course B', enrollments: 200 },
    { name: 'Course C', enrollments: 80 },
    // Add more data points as needed
  ];

  // Dummy data for user behavior
  const userBehaviorData = [
    { name: 'Jan', activeUsers: 300 },
    { name: 'Feb', activeUsers: 400 },
    { name: 'Mar', activeUsers: 550 },
    { name: 'Apr', activeUsers: 600 },
    // Add more data points as needed
  ];

  return (
    <div>
    

      {/* App Usage Report */}
      <Row gutter={[16,16]}>
        <Col lg={8} xs={24} sm={24}>
          <Card className="bg-red-100">
            <Statistic title="Total Users" value={appUsageData.totalUsers} className='font-poppins' />
          </Card>
        </Col>
        <Col lg={8} xs={24} sm={24} >
          <Card > 
            <Statistic title="Daily Active Users" value={appUsageData.dailyActiveUsers} className='font-poppins' />
          </Card>
        </Col>
      </Row>

      {/* Course Popularity Report */}
      <Row gutter={[16,16]} style={{ marginTop: 16 }}>
        <Col lg={12} sm={24} xs={24}>
          <Card title="Course Popularity" className='font-poppins'>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={coursePopularityData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="enrollments" fill="#82ca9d" />
            </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
    

  
    
        <Col lg={12} sm={24} xs={24}>
          <Card title="User Behavior Over Months" className='font-poppins'>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userBehaviorData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="activeUsers" stroke="#8884d8" />
            </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Reports;
