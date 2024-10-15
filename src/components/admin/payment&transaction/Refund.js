import React, { useState } from "react";
import { Table, Button, Modal, Timeline, Tag, Space } from "antd";
import { EyeOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";

const Refund = () => {
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const dummyRefundData = [
    {
      id: 1,
      transactionId: "987654321",
      user: {
        id: 201,
        name: "Jane Smith",
        email: "jane.smith@example.com",
      },
      refundAmount: 25.0,
      originalTransactionDate: "2022-02-15T14:45:00Z",
      reason: "Product was defective",
      status: "Pending",
      adminNotes: "",
      communicationHistory: [
        { sender: "admin", message: "Received refund request." },
        {
          sender: "user",
          message: "Product was defective. Please process the refund.",
        },
      ],
    },
    {
      id: 2,
      transactionId: "123456789",
      user: {
        id: 202,
        name: "John Doe",
        email: "john.doe@example.com",
      },
      refundAmount: 50.0,
      originalTransactionDate: "2022-03-20T09:30:00Z",
      reason: "Changed my mind",
      status: "Approved",
      adminNotes: "Refund processed successfully.",
      communicationHistory: [
        { sender: "admin", message: "Approved the refund request." },
        {
          sender: "user",
          message: "Changed my mind. Thanks for processing the refund.",
        },
      ],
    },
    {
      id: 3,
      transactionId: "456789123",
      user: {
        id: 203,
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
      },
      refundAmount: 30.0,
      originalTransactionDate: "2022-04-10T18:15:00Z",
      reason: "Product didn't match the description",
      status: "Declined",
      adminNotes: "Refund declined due to policy restrictions.",
      communicationHistory: [
        { sender: "admin", message: "Declined the refund request." },
        {
          sender: "user",
          message: "Product didn't match the description. Can you reconsider?",
        },
      ],
    },
  ];

  const columns = [
    {
      title: "SNo",
      dataIndex: "index",
      key: "index",
      className: "font-poppins",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
      className: "font-poppins",
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      className: "font-poppins",
      render: (user) => <span>{user.name}</span>,
    },
    {
      title: "Refund Amount",
      dataIndex: "refundAmount",
      key: "refundAmount",
      className: "font-poppins",
      render: (amount) => <span>₹{amount.toFixed(2)}</span>,
    },
    {
      title: "Date",
      dataIndex: "originalTransactionDate",
      key: "originalTransactionDate",
      className: "font-poppins",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      className: "font-poppins",
      render: (status) => (
        <Tag
          color={
            status === "Pending"
              ? "orange"
              : status === "Approved"
              ? "green"
              : "red"
          }
          className="font-poppins"
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      className: "font-poppins",
      render: (text, record) => (
        <Space>
          <Button type="link" onClick={() => onViewDetails(record)}>
            <EyeOutlined />
          </Button>
          <Button
            type="default"
            className="font-poppins text-green-950 border-green-950"
          >
            Approved
          </Button>
          <Button type="default" className="font-poppins" danger>
            Decline
          </Button>
        </Space>
      ),
    },
  ];

  const onViewDetails = (refund) => {
    setSelectedRefund(refund);
    setDetailsModalVisible(true);
  };

  const onCancelDetailsModal = () => {
    setSelectedRefund(null);
    setDetailsModalVisible(false);
  };

  const modalColumns = [
    {
      title: "Attribute",
      dataIndex: "attribute",
      key: "attribute",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
  ];

  const modalData = selectedRefund
    ? [
        {
          key: "1",
          attribute: "Transaction ID",
          value: selectedRefund.transactionId,
        },
        { key: "2", attribute: "User", value: selectedRefund.user.name },
        {
          key: "3",
          attribute: "Refund Amount",
          value: `₹${selectedRefund.refundAmount.toFixed(2)}`,
        },
        {
          key: "4",
          attribute: "Date",
          value: selectedRefund.originalTransactionDate,
        },
        { key: "5", attribute: "Status", value: selectedRefund.status },
        { key: "6", attribute: "Reason", value: selectedRefund.reason },
      ]
    : [];

  return (
    <div>
      <div style={{ overflowX: "auto" }}>
        <Table dataSource={dummyRefundData} columns={columns} />
      </div>
      <Modal
        title="Refund Request Details"
        visible={detailsModalVisible}
        onCancel={onCancelDetailsModal}
        footer={[
          <Button key="back" onClick={onCancelDetailsModal}>
            Close
          </Button>,
        ]}
      >
        {selectedRefund && (
          <div>
            <div style={{ overflowX: "auto" }}>
              <Table
                dataSource={modalData}
                columns={modalColumns}
                pagination={false}
              />
            </div>

            <h2 className="m-4 text-lg font-semibold font-serif">
              Communication History
            </h2>
            <Timeline>
              {selectedRefund.communicationHistory.map((entry, index) => (
                <Timeline.Item
                  key={index}
                  color={entry.sender === "admin" ? "blue" : "green"}
                  className="font-serif"
                >
                  <strong>{entry.sender}:</strong> {entry.message}
                </Timeline.Item>
              ))}
            </Timeline>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Refund;
