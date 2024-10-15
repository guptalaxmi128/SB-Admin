import React, { useState } from 'react';
import { Card, Statistic, Row, Col} from 'antd';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  const dummyEngagementData = {
    totalUsers: 1000,
    activeUsers: 750,
  };

  const dummyEnrollmentData = {
    totalEnrollments: 500,
  };

  const dummyCompletionData = {
    completedCourses: 300,
    completionRate: 60,
  };

  const [engagementData, setEngagementData] = useState(dummyEngagementData);
  const [enrollmentData, setEnrollmentData] = useState(dummyEnrollmentData);
  const [completionData, setCompletionData] = useState(dummyCompletionData);

  // Dummy data for line chart
  const lineChartData = [
    { name: 'Jan', activeUsers: 300 },
    { name: 'Feb', activeUsers: 400 },
    { name: 'Mar', activeUsers: 550 },
    { name: 'Apr', activeUsers: 600 },
    // Add more data points as needed
  ];

  // Dummy data for bar chart
  const barChartData = [
    { name: 'Course A', enrollments: 120 },
    { name: 'Course B', enrollments: 200 },
    { name: 'Course C', enrollments: 80 },
    // Add more data points as needed
  ];

  return (
    <div>
     
 
      <Row gutter={[16,16]}>
      <Col lg={8} sm={24} xs={24}>
          <Card className="bg-red-50">
            <Statistic title="Total Users" value={engagementData.totalUsers} className='font-poppins' />
          </Card>
        </Col>
        <Col lg={8} sm={24} xs={24}>
          <Card className='bg-blue-50'>
            <Statistic title="Active Users" value={engagementData.activeUsers} className='font-poppins' />
          </Card>
        </Col>
        <Col lg={8} sm={24} xs={24}>
          <Card className='bg-yellow-50'>
            <Statistic title="Course Enrollments" value={enrollmentData.totalEnrollments} className='font-poppins' />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16,16]} style={{ marginTop: 16 }}>
      <Col lg={8} sm={24} xs={24}>
          <Card className='bg-sky-50'>
            <Statistic title="Completed Courses" value={completionData.completedCourses} className='font-poppins' />
          </Card>
        </Col>
        <Col lg={8} sm={24} xs={24}>
          <Card className='bg-amber-50'>
            <Statistic title="Completion Rate" value={`${completionData.completionRate}%`} className='font-poppins' />
          </Card>
        </Col>
      </Row>

      {/* Line Chart */}
      <Row gutter={16} style={{ marginTop: 16 }}>
      <Col lg={12} sm={24} xs={24}>
          <Card title="Active Users Over Months" className='font-poppins'>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="activeUsers" stroke="#8884d8" />
            </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
    

      {/* Bar Chart */}
    
      <Col lg={12} sm={24} xs={24}>
          <Card title="Course Enrollments" className='font-poppins'>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart  data={barChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="enrollments" fill="#82ca9d" />
            </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
      </div>
  
  );
};

export default Analytics;
