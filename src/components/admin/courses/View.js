import React, { useState, useEffect } from "react";
import { Table, Space, Menu, Image, Dropdown, message } from "antd";
import { useDispatch } from "react-redux";
import { MoreOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import {
  getAdminCourse,
  courseStatus,
  deleteCourse,
} from "../../../actions/admin/course/course";

const View = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getAdminCourse("Approved"));
        setData(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleMenuClick = (action, record) => {
    switch (action) {
      case "approve":
        handleApprove(record.id);
        break;
      case "decline":
        handleDecline(record.id);
        break;
      case "edit":
        handleEdit(record.id);
        break;
      case "delete":
        handleDelete(record.id);
        break;
      case "viewRating":
        handleReview(record.id);
        break;

      default:
        break;
    }
  };

  const handleReview = (id) => {
    navigate(`course-review/${id}`);
  };

  const menu = (record) => (
    <Menu
      onClick={({ key }) => handleMenuClick(key, record)}
      className="font-poppins"
    >
      <Menu.Item key="approve">Approve</Menu.Item>
      <Menu.Item key="decline">Decline</Menu.Item>
      <Menu.Item key="edit">Edit</Menu.Item>
      {record.deletedAt === null ? (
        <Menu.Item key="delete">Delete</Menu.Item>
      ) : null}
      <Menu.Item key="viewRating">View Rating</Menu.Item>
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
      title: "Course Image",
      dataIndex: "courseImage",
      key: "courseImage",
      className: "font-poppins",
      render: (text, record) => (
        <Space size="middle">
          {record.files.find((file) => file.fieldName === "CourseImage") && (
            <Image
              src={
                record.files.find((file) => file.fieldName === "CourseImage")
                  .linkOrPath
              }
              alt="Course Image"
              width={50}
              height={50}
            />
          )}
        </Space>
      ),
    },

    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
      className: "font-poppins",
      render: (text, record) => (
        <Link to={`/admin/maincurriculum/${record.id}`} className="course-name">
          {text}
        </Link>
      ),
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
      title: "Course Price",
      dataIndex: "coursePrice",
      key: "coursePrice",
      className: "font-poppins",
      render: (text) => <p className="text-sm">{`₹${text}`}</p>,
    },

    {
      title: "Course Preview link",
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
      title: "Coupon Title",
      dataIndex: "course_coupon",
      key: "couponTitle",
      className: "font-poppins",
      render: (course_coupons) => {
        if (course_coupons.length === 0) {
          return "-";
        } else {
          return (
            <ul>
              {course_coupons.map((coupon) => (
                <li key={coupon.id}>
                  {coupon.coupon.couponTitle} - {coupon.coupon.discountInPercent}% off
                </li>
              ))}
            </ul>
          );
        }
      },
    },
    {
      title: "Coupon Number",
      dataIndex: "course_coupon",
      key: "couponNumber",
      className: "font-poppins",
      render: (course_coupons) => {
        if (course_coupons.length === 0) {
          return "-";
        } else {
          return (
            <ul>
              {course_coupons.map((coupon) => (
                <li key={coupon.id}>{coupon.coupon.couponNumber}</li>
              ))}
            </ul>
          );
        }
      },
    },
    {
      title: "Valid Till",
      dataIndex: "course_coupon",
      key: "validTill",
      className: "font-poppins",
      render: (course_coupons) => {
        if (course_coupons.length === 0) {
          return "-";
        } else {
          return (
            <ul>
              {course_coupons.map((coupon) => (
                <li key={coupon.id}>{coupon.coupon.validTill}</li>
              ))}
            </ul>
          );
        }
      },
    },

    {
      title: "Actions",
      key: "action",
      className: "font-poppins",
      render: (text, record) => (
        <Space>
          <Dropdown
            overlay={() => menu(record)}
            placement="bottomCenter"
            trigger={["click"]}
          >
            <MoreOutlined style={{ fontSize: "1.2rem" }} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  const handleApprove = (id) => {
    console.log(`Course ${id} is clicked as approve`);
    const data = { id, approvalStatusByAdmin: "Approved" };
    dispatch(courseStatus(data)).then((res) => {
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
  };

  const handleDecline = (id) => {
    console.log(`Course ${id} is clicked as decline`);
    const data = { id, approvalStatusByAdmin: "Rejected" };
    dispatch(courseStatus(data)).then((res) => {
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
  };

  const handleEdit = (record) => {
    console.log("Edit clicked for record:", record);
  };

  const handleDelete = async (id) => {
    console.log("courseId", id);
    try {
      const res = await dispatch(deleteCourse(id));
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);
    }
  };

  return (
    <>
      <div style={{ overflowX: "auto" }}>
        <Table dataSource={data} columns={columns} loading={loading} />
      </div>
    </>
  );
};

export default View;
