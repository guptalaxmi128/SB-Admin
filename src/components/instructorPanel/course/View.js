import React, { useState, useEffect } from "react";
import {
  Table,
  Space,
  Image,
  Button,
  Breadcrumb,
  Menu,
  message,
  Dropdown,
  // Select,
} from "antd";
import { useDispatch } from "react-redux";
import { MoreOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteInstructorCourse,
  getInstructorOtherCourse,
} from "../../../actions/instructor/course/course";

// const { Option } = Select;

const View = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPage, setTotalPage] = useState("");
  // const [statusFilter, setStatusFilter] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const params = {
          page: currentPage,
          limit: pageSize,
          // approvalStatusByAdmin: statusFilter,
        };
        const res = await dispatch(getInstructorOtherCourse(params));
        setData(res.data);
        setTotalPage(res.totalPage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, currentPage, pageSize]);

  // const handleStatusFilterChange = (value) => {
  //   setStatusFilter(value);
  // };

  const menu = (id) => (
    <Menu>
      <Menu.Item key="delete" onClick={() => handleDelete(id)}>
        <span className="font-poppins text-red-500">Delete</span>
      </Menu.Item>
      <Menu.Item key="viewRating" onClick={() => handleReview(id)}>
        <span className="font-poppins text-blue-500">View Rating</span>
      </Menu.Item>
    </Menu>
  );

  const handleReview = async (id) => {
    navigate(`/instructor/course-review/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const res = await dispatch(deleteInstructorCourse(id));
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
    // {
    //   title: "Teacher Image",
    //   dataIndex: "teacherImage",
    //   key: "teacherImage",
    //   className: "font-poppins",
    //   render: (text, record) => (
    //     <Space size="middle">
    //       {record.files.find((file) => file.fieldName === "TeacherImage") && (
    //         <Image
    //           src={
    //             record.files.find((file) => file.fieldName === "TeacherImage")
    //               .linkOrPath
    //           }
    //           alt="Teacher Image"
    //           width={50}
    //           height={50}
    //         />
    //       )}
    //     </Space>
    //   ),
    // },
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
      className: "font-poppins",
      render: (text, record) => (
        <Link
          to={`/instructor/maincurriculum/${record.id}`}
          className="course-name"
        >
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
      filters: [
        {
          text: "Draft",
          value: "Draft",
        },
        {
          text: "Approved",
          value: "Approved",
        },
        {
          text: "Pending",
          value: "Pending",
        },
      ],
      onFilter: (value, record) => {
        if (value === "Draft") {
          return record.approvalStatusByAdmin === null;
        } else {
          return record.approvalStatusByAdmin === value;
        }
      },
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
            overlay={() => menu(record.id)}
            placement="bottomCenter"
            trigger={["click"]}
          >
            <MoreOutlined style={{ fontSize: "1.2rem" }} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  const newCourseButton = (
    <Link to={`/instructor/course`} style={{ textDecoration: "none" }}>
      <Button className="custom-btn font-poppins">New Course</Button>
    </Link>
  );

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg  text-gray-800 font-poppins">
          View Courses
        </h2>
        <Breadcrumb className="font-poppins">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>View Courses</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="bg-white rounded-lg p-6 shadow-md mt-3">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-2xl  text-gray-800 font-poppins">
              Courses
            </h2>
            <p className="text-base  text-gray-800 font-poppins mt-2">
              Create and manage courses
            </p>
          </div>
          {/* <div>
            <Select
              defaultValue={null}
              onChange={handleStatusFilterChange}
              className="font-poppins"
            >
              <Option value={null}>All</Option>
              <Option value="Draft">Draft</Option>
              <Option value="Approved">Approved</Option>
              <Option value="Pending">Pending</Option>
            </Select>
          </div> */}
          {newCourseButton}
        </div>
        <div style={{ overflowX: "auto" }} className="mt-5">
          <Table
            columns={columns}
            dataSource={data}
            loading={loading}
            pagination={{
              pageSize: pageSize,
              current: currentPage,
              onChange: handlePageChange,
              total: totalPage * pageSize,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default View;
