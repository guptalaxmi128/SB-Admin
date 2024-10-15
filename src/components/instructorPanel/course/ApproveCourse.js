import React, { useState, useEffect } from "react";
import { Table, Space, Button, Breadcrumb, Image,Menu,Dropdown,message } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getInstructorCourse } from "../../../actions/instructor/course/course";

const ApproveCourse = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await dispatch(getInstructorCourse());
        setData(result.data);
      } catch (error) {
        console.error("Error fetching instructor course:", error);
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
      render: (text, record) => (
        <Link to={`/instructor/maincurriculum/${record.id}`} className="course-name">
          {text}
        </Link>
      ),
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

    {
      title: "Actions",
      key: "action",
      className: "font-poppins",
      render: (text, record) => (
        <Space>
          <Button
            className="border-green-800 text-green-800 font-poppins"
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            className="font-poppins"
            onClick={() => handleDelete(record.key)}
            danger
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (id) => {
    console.log(`Course ${id} is clicked as approve`);
  
  };

  const handleDelete = (id) => {
    console.log(`Course ${id} is clicked as delete`);
  
  };

  return (
    <div>
   
        <div style={{ overflowX: "auto" }}>
          <Table dataSource={data} columns={columns} loading={loading} />
        </div>
      </div>
 
  );
};

export default ApproveCourse;
