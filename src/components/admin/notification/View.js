import React, { useState, useEffect } from "react";
import { message, Table, Space, Button } from "antd";
import { useDispatch } from "react-redux";
import {
  getANotification,
  notificationStatus,
} from "../../../actions/admin/notification/notification";

const View = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getANotification());
        setData(res.data);
      } catch (error) {
        // Handle the error
        console.error("Error fetching notification:", error);
        message.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const columns = [
    {
      title: "Sno",
      dataIndex: "index",
      key: "index",
      className: "font-poppins",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Message",
      dataIndex: "notification",
      key: "notification",
      className: "font-poppins",
    },
    {
      title: "Status",
      dataIndex: "approvalStatusByAdmin",
      key: "approvalStatusByAdmin",
      className: "font-poppins",
      render: (text) => (
        <p
          className={`font-poppins ${
            text === null
              ? "text-yellow-500"
              : text === "Approved"
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {text === null ? "Draft" : text}
        </p>
      ),
    },

    {
      title: "Actions",
      key: "action",
      className: "font-poppins",
      render: (text, record) => (
        <>
          {record.creater === "Instructor" ? (
            <Space>
              <Button
                onClick={() => handleApprove(record.id)}
                className="border border-green-800 text-green-800 font-poppins"
              >
                Approve
              </Button>
              <Button
                onClick={() => handleDecline(record.id)}
                danger
                className="font-poppins"
              >
                Decline
              </Button>
            </Space>
          ) : (
            <span>-</span>
          )}
        </>
      ),
    },
  ];

  const handleApprove = (id) => {
    console.log(`Notification ${id} is clicked as approve`);
    const data = { id, approvalStatusByAdmin: "Approved" };
    dispatch(notificationStatus(data)).then((res) => {
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
  };

  const handleDecline = (id) => {
    console.log(`Notification ${id} is clicked as decline`);
    const data = { id, approvalStatusByAdmin: "Rejected" };
    dispatch(notificationStatus(data)).then((res) => {
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
  };

  return (
    <>
      <div style={{ overFlowX: "auto" }}>
        <Table dataSource={data} columns={columns} loading={loading} />
      </div>
    </>
  );
};

export default View;
