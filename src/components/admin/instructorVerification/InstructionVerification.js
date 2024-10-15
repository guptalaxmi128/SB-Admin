import React, { useState, useEffect } from "react";
import { Breadcrumb, Button, Table, Space } from "antd";
import { Link } from "react-router-dom";
import avtar from "../../../assets/avtar.jpg"
import { getAdminInstructor } from "../../../actions/admin/adminInstructor/adminInstructor";
import { useDispatch, useSelector } from "react-redux";

const InstructorVerification = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const instructor = useSelector((state) => state.adminInstructor.instructor);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await dispatch(getAdminInstructor());
      } catch (error) {
        console.error("Error fetching instructor:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (instructor) setData(instructor.data);
  }, [instructor]);

  const columns = [
    {
      title: "Sno",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
      className: "font-poppins",
    },
    {
      title: "Profile",
      dataIndex: "imagePath",
      key: "imagePath",
      className: "font-poppins",
      render: (text, record) => (
        <div>
          <img
            src={record.imagePath}
            alt={record.imageOriginalName}
            style={{ maxWidth: "50px", maxHeight: "50px" }}
          />

          {!record.imagePath &&  <img
            src={avtar}
            alt="Profile"
            style={{ maxWidth: "50px", maxHeight: "50px" }}
          /> }
        </div>
      ),
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      className: "font-poppins",
      render: (text, record) => (
        <div className="flex">
          <Link to={`/profile/instructor/${record.id}`}>{text}</Link>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      className: "font-poppins",
    },
    {
      title: "Mobile Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      className: "font-poppins",
    },
    // {
    //   title: "Qualifications",
    //   dataIndex: "qualifications",
    //   key: "qualifications",
    //   className: "font-poppins",
    // },

    // {
    //   title: "Bio",
    //   dataIndex: "bio",
    //   key: "bio",
    //   className: "font-poppins",
    // },
    {
      title: "Social Media",
      dataIndex: "socialMediaLink",
      key: "socialMediaLink",
      className: "font-poppins",
      render: (text, record) => (
        <Space>
          {record.socialMediaLink ? (
            <a
              href={record.socialMediaLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {text}
            </a>
          ) : (
            "-"
          )}
        </Space>
      ),
    },
    {
      title: "Instructor Type",
      dataIndex: "instructorType",
      key: "instructorType",
      className: "font-poppins",
    },
    {
      title: "Action",
      key: "action",
      className: "font-poppins",
      render: (text, record) => (
        <Space>
        <Link to={`/admin/instructor-verification/${record.id}`}>
          <Button className="font-poppins text-green-950 border-green-950">
            View Qualification
          </Button>
        </Link>
        <Link to={`/admin/instructor-verification/experience/${record.id}`}>
          <Button className="font-poppins text-green-950 border-green-950">
            View Experience
          </Button>
        </Link>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800 font-poppins">
          Instructor Verification
        </h2>
        <Breadcrumb className="font-poppins">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Instructor Verification</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md mt-3">
        <div style={{ overflowX: "auto" }}>
          <Table dataSource={data} columns={columns} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default InstructorVerification;
