import React from "react";
import { Table, Tag, Breadcrumb } from "antd";

const Transaction = () => {
  const data = [
    {
      key: 1,
      transactionId: "TRX123",
      date: "2022-02-15",
      user: "John Doe",
      course: "Meditation",
      amount: 29.99,
      status: "Success",
    },
    {
      key: 2,
      transactionId: "TRX124",
      date: "2022-02-16",
      user: "Jane Smith",
      course: "Yoga Instructor",
      amount: 19.99,
      status: "Pending",
    },
  ];

  const columns = [
    {
      title: "Sno",
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
    { title: "Date", dataIndex: "date", key: "date", className:'font-poppins' },
    { title: "User", dataIndex: "user", key: "user", className:'font-poppins', },
    { title: "Course", dataIndex: "course", key: "course", className:'font-poppins' },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      className: "font-poppins",
      render: (amount) => `₹${amount.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      className: "font-poppins",
      render: (status) => (
        <Tag
          color={status === "Success" ? "green" : "orange"}
          className="font-poppins"
        >
          {status}
        </Tag>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center pl-5 pr-5 pt-5">
        <h2 className="text-lg font-semibold text-gray-800 font-poppins">
          Instructor Transaction
        </h2>
        <Breadcrumb className="font-poppins">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Instructor Transaction</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="bg-white rounded-lg p-6 shadow-md m-5">
        <div style={{ overflowX: "auto" }}>
          <Table dataSource={data} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default Transaction;
