import React, { useEffect, useState } from 'react';
import { Table, Breadcrumb, Form, Input, Button, message, Modal } from 'antd';

const UserBugReport = () => {
  const [bugReports, setBugReports] = useState([]);
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBugReport, setSelectedBugReport] = useState(null);

  useEffect(() => {
    const dummyData = [
      { id: 1, user: 'Laxmi Gupta', issue: 'Lorem ipsum dolor sit amet.' },
      { id: 2, user: 'Rohit Gupta', issue: 'Consectetur adipiscing elit.' },
      { id: 3, user: 'Sahil Gupta', issue: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    ];

    setBugReports(dummyData);
  }, []);

  const columns = [
    {
      title: 'SNo',
      dataIndex: 'index',
      key: 'index',
      className:'font-poppins',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      className:'font-poppins'
    },
    {
      title: 'Issue',
      dataIndex: 'issue',
      key: 'issue',
      className:'font-poppins'
    },
    {
      title: 'Action',
      key: 'action',
       className:'font-poppins',
      render: (text, record) => (
        <Button type="default" className='border-green-800 text-green-800 font-poppins' onClick={() => handleSupportButtonClick(record)}>
          Provide Support
        </Button>
      ),
    },
  ];

  const handleSupportButtonClick = (record) => {
    setSelectedBugReport(record);
    setModalVisible(true);
  };

  const handleFormSubmit = (values) => {
    // Perform the support action here
    // For now, let's just log the values
    console.log('Support action performed:', values);

    // Close the modal
    setModalVisible(false);

    // Clear the form
    form.resetFields();

    // Show a success message
    message.success('Support provided successfully!');
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setSelectedBugReport(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center pt-5 pl-5 pr-5">
        <h2 className="text-lg font-semibold text-gray-800 font-poppins">Technical Support</h2>
        <Breadcrumb  className='font-poppins'>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Technical Support</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="bg-white rounded-lg p-6 shadow-md m-5">
        <div style={{ overflowX: 'auto' }}>
          {/* Bug Report Table */}
          <Table dataSource={bugReports} columns={columns} rowKey="id" />

          {/* Support Modal */}
          <Modal
           className='font-poppins'
            title={`Provide Support to ${selectedBugReport ? selectedBugReport.user : ''}`}
            visible={modalVisible}
            onCancel={handleModalCancel}
            footer={null}
          >
            <Form form={form} onFinish={handleFormSubmit}>
              <Form.Item
                name="supportMessage"
                rules={[{ required: true, message: 'Please provide support message!' }]}
              >
                <Input.TextArea placeholder="Enter support message..." rows={4} />
              </Form.Item>
              <Form.Item>
                <Button  type="default" className='border-green-800 text-green-800 font-poppins' htmlType="submit">
                  Provide Support
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default UserBugReport;
