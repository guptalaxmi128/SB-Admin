// SupportFormComponent.js
import React from "react";
import { Button, Table, Breadcrumb, Space } from "antd";

const Enquires = () => {
  const supportRequests = [
    {
      key: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      subject: "Issue with login",
      message: "I cannot log in. Please help!",
    },
    {
      key: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      subject: "Payment inquiry",
      message: "I have a question about my recent payment.",
    },
  ];

  const columns = [
    {
      title: "SNo",
      dataIndex: "index",
      key: "index",
      className:'font-poppins',
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      className:'font-poppins',
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      className:'font-poppins',
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      className:'font-poppins',
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      className:'font-poppins',
    },
    {
      title: "Action",
      key: "action",
      className:'font-poppins',
      render: (text, record) => (
        <Space size="middle">
          <Button type="default"   className='font-poppins' onClick={() => handleRespond(record)}>
            Respond
          </Button>
        </Space>
      ),
    },
  ];

  const handleRespond = (record) => {
    console.log(`Responding to support request from ${record.name}`);
    // Placeholder for handling the response to a support request
  };

  return (
    <div>
      <div className="flex justify-between items-center pl-5 pr-5 pt-5">
        <h2 className="font-semibold text-lg text-gray-800 font-poppins">Enquires</h2>
        <Breadcrumb className="font-poppins">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Enquires</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md m-5">
      
        <div style={{ overflowX: "auto" }}>
          <Table dataSource={supportRequests} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default Enquires;
