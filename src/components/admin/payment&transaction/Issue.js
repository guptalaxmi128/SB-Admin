// AdminPaymentIssues.js
import React from "react";
import { Table, Button } from "antd";

const Issues = () => {
  const data = [
    {
      id: 1,
      transactionId: "123456789",
      user: {
        id: 101,
        name: "John Doe",
        email: "john.doe@example.com",
      },
      issueType: "Payment Declined",
      status: "Open",
      issueDescription: "My payment was declined. Please help!",
      transactionDetails: {
        paymentMethod: "Credit Card",
        amount: 50.0,
        date: "2022-01-01T12:30:00Z",
      },
      attachments: ["screenshot1.png"],
      resolutionStatus: "In Progress",
      adminNotes: "",
      communicationHistory: [
        { sender: "admin", message: "Investigating the issue." },
        { sender: "user", message: "Thanks for looking into it." },
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
      title: "Issue Type",
      dataIndex: "issueType",
      key: "issueType",
      className: "font-poppins",
    },
    {
      title: "Issue Description",
      dataIndex: "issueDescription",
      key: "issueDescription",
      className: "font-poppins",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      className: "font-poppins",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Button
          className= "font-poppins"
          type="link"
          //  onClick={() => onViewDetails(record)}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <div style={{ overflowX: "auto" }}>
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default Issues;
