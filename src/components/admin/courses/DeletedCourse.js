import React, { useState, useEffect } from "react";
import { Table, Space, message, Menu, Dropdown, Image } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  getDeletedCourse,
  restoreCourse,
} from "../../../actions/admin/course/course";

const DeletedCourse = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getDeletedCourse());
        setData(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleMenuClick = (action, record) => {
    switch (action) {
      case "restore":
        handleRestore(record.id);
        break;

      default:
        break;
    }
  };

  const menu = (record) => (
    <Menu
      onClick={({ key }) => handleMenuClick(key, record)}
      className="font-poppins"
    >
      <Menu.Item key="restore">Restore</Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "Sno",
      dataIndex: "index",
      key: "index",
      className: "font-poppins",
      render: (text, record, index) => index + 1,
    },

    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
      className: "font-poppins",
    },

    {
      title: "Course Category",
      dataIndex: "category",
      key: "category",
      className: "font-poppins",
    },

    {
      title: "Language",
      dataIndex: "language",
      key: "language",
      className: "font-poppins",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      className: "font-poppins",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      className: "font-poppins",
    },
    {
      title: "Status",
      dataIndex: "approvalStatusByAdmin",
      key: "approvalStatusByAdmin",
      className: "font-poppins",
      render: (text) => (
        <p
          className={`font-poppins text-sm ${
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
      title: "Deleted By",
      dataIndex: "deletedThrough",
      key: "deletedThrough",
      className: "font-poppins",
    },
    {
      title: "Course Price",
      dataIndex: "coursePrice",
      key: "coursePrice",
      className: "font-poppins",
      render: (text) => <p className="text-sm">{`₹${text}`}</p>,
    },

    {
      title: "Course link",
      dataIndex: "introVideoLink",
      key: "introVideoLink",
      className: "font-poppins",
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          Watch Video
        </a>
      ),
    },
    {
      title: "Actions",
      key: "action",
      className: "font-poppins",
      render: (text, record) => (
        <Space>
          {record.deletedThrough === "Admin" ? (
            <Dropdown
              overlay={() => menu(record)}
              placement="bottomCenter"
              trigger={["click"]}
            >
              <MoreOutlined style={{ fontSize: "1.2rem" }} />
            </Dropdown>
          ) : (
            <span>-</span>
          )}
        </Space>
      ),
    },
  ];

  const handleRestore = (id) => {
    console.log(`Course ${id} is clicked to restore`);
    dispatch(restoreCourse(id)).then((res) => {
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <Table dataSource={data} columns={columns} loading={loading} />
    </div>
  );
};

export default DeletedCourse;
