import React, { useState, useEffect } from "react";
import { Table, Space, Image } from "antd";

import { useDispatch } from "react-redux";

import { getInstructorOtherCourse } from "../../../actions/instructor/course/course";

const PendingCourse = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getInstructorOtherCourse());
        setData(res.data);
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
      title: "Teacher Image",
      dataIndex: "teacherImage",
      key: "teacherImage",
      className: "font-poppins",
      render: (text, record) => (
        <Space size="middle">
          {record.files.find((file) => file.fieldName === "TeacherImage") && (
            <Image
              src={
                record.files.find((file) => file.fieldName === "TeacherImage")
                  .linkOrPath
              }
              alt="Teacher Image"
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
    },
    {
      title: "Heading",
      dataIndex: "heading",
      key: "heading",
      className: "font-poppins",
    },
    {
      title: "Category",
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
      render: (text) => <p className="text-red-500">{`${text}`}</p>,
    },
    {
      title: "Course Price",
      dataIndex: "coursePrice",
      key: "coursePrice",
      className: "font-poppins",
      render: (text) => <p>{`₹${text}`}</p>,
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
      title: "Teacher Name",
      dataIndex: "teacherName",
      key: "teacherName",
      className: "font-poppins",
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      className: "font-poppins",
    },
  ];

  return (
    <div style={{ overflowX: "auto" }}>
      <Table dataSource={data} columns={columns} loading={loading} />
    </div>
  );
};

export default PendingCourse;
