import React, { useState } from "react";
import { Table, Button, Modal, message, Breadcrumb, Space } from "antd";

const Certificate = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [approvalModalVisible, setApprovalModalVisible] = useState(false);
  const [rejectConfirmationVisible, setRejectConfirmationVisible] = useState(false);
  const data = [
    {
      key: "1",
      courseName: "Introduction to Yoga",
      studentName: "John Doe",
      certificateName: "Yoga Certificate",
      certificateStatus: "Pending",
    },
    {
      key: "2",
      courseName: "Certification yoga",
      studentName: "Jane Smith",
      certificateName: "Yoga Certificate",
      certificateStatus: "Pending",
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
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
      className:'font-poppins'
    },
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
      className:'font-poppins'
    },
    {
      title: "Certificate Name",
      dataIndex: "certificateName",
      key: "certificateName",
      className:'font-poppins'
    },
    {
      title: "Certificate Status",
      dataIndex: "certificateStatus",
      key: "certificateStatus",
      className:'font-poppins'
    },
    {
      title: "Action",
      key: "action",
      className:'font-poppins',
      render: (_, record) => (
        <Space>
          <Button type="default" className="border-green-800 text-green-800 font-poppins" onClick={() => handleApprove(record)}>
            Approve
          </Button>
          <Button type="default" className="border-red-500 text-red-500 font-poppins" onClick={() => handleReject(record)}>
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  const handleReject = (record) => {
    setSelectedCertificate(record);
    setRejectConfirmationVisible(true);
  };

  const handleCancelReject = () => {
    setRejectConfirmationVisible(false);
  };

  const handleApprove = (record) => {
    setSelectedCertificate(record);
    setApprovalModalVisible(true);
  };

  const handleModalOk = () => {
    message.success(
      `Certificate for ${selectedCertificate.studentName} approved successfully.`
    );
    setApprovalModalVisible(false);
  };

  const handleModalCancel = () => {
    setApprovalModalVisible(false);
  };

  const handleRejectConfirmationOk = () => {
    message.success(
      `Certificate for ${selectedCertificate.studentName} rejected successfully.`
    );
    setRejectConfirmationVisible(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center pt-5 pl-5 pr-5">
        <h2 className="text-lg font-semibold  text-gray-800 font-poppins ">Certificate</h2>
        <Breadcrumb className="font-poppins">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Certificate</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="bg-white rounded-lg p-6 shadow-md m-5">
       
        <div style={{ overflowX: "auto" }}>
          <Table dataSource={data} columns={columns} />
        </div>
      
      <Modal
        className='font-poppins'
        title="Approve Certificate"
        visible={approvalModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okButtonProps={{className:'custom-btn'}}
      >
        <p className='font-poppins'>
          Are you sure you want to approve the certificate for{" "}
          {selectedCertificate?.studentName}?
        </p>
      </Modal>

      
      <Modal
        className='font-poppins'
        title="Reject Certificate"
        visible={rejectConfirmationVisible}
        onOk={handleRejectConfirmationOk}
        onCancel={handleCancelReject}
        okButtonProps={{ className: 'custom-btn' }}
      >
        <p className="text-red-500 font-poppins">
          Are you sure you want to reject the certificate for{" "}
          {selectedCertificate?.studentName}?
        </p>
      </Modal>
    </div>
    </div>
  );
};

export default Certificate;
