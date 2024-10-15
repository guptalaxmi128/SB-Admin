import React, { useState, useEffect } from "react";
import { message, Button, Table, Space } from "antd";
import { useDispatch } from "react-redux";
import {
  deleteAdminQualification,
  getAdminInstructorById,
  updateQualificationStatus,
} from "../../../actions/admin/adminInstructor/adminInstructor";

const Qualification = (props) => {
  const dispatch = useDispatch();
  const { id } = props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getAdminInstructorById(id));
        setData(res.data.qualifications);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  console.log(data);

  const handleDelete = (id) => {
    console.log(`Qualification ${id} is clicked for delete`);
    dispatch(deleteAdminQualification(id)).then((res) => {
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
  };

  const columns = [
    {
      title: "Sno",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
      className: "font-poppins",
    },
    {
      title: "Document",
      dataIndex: "documentPath",
      key: "documentPath",
      className: "font-poppins",
      render: (text, record) => (
        <div>
          <img
            src={record.documentPath}
            alt={record.documentOriginalName}
            style={{ maxWidth: "50px", maxHeight: "50px" }}
          />

          {!record.documentPath && (
            <img
              // src={avtar}
              alt="Document"
              style={{ maxWidth: "50px", maxHeight: "50px" }}
            />
          )}
        </div>
      ),
    },

    {
      title: "Course Type",
      dataIndex: "courseType",
      key: "courseType",
      className: "font-poppins",
    },
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
      className: "font-poppins",
    },
    {
      title: "University / Institute",
      dataIndex: "university_institute_name",
      key: "university_institute_name",
      className: "font-poppins",
    },

    {
      title: "Certification Number",
      dataIndex: "certificationNumber",
      key: "certificationNumber",
      className: "font-poppins",
    },
    {
      title: "Format",
      dataIndex: "marksType",
      key: "marksType",
      className: "font-poppins",
    },
    {
      title: "Marks",
      dataIndex: "marks",
      key: "marks",
      className: "font-poppins",
    },
    {
      title: "Status",
      dataIndex: "approvalStatusByAdmin",
      key: "approvalStatusByAdmin",
      className: "font-poppins",
      render: (text) => (
        <span
          style={{
            color:
              text === "pending"
                ? "red"
                : text === "approved"
                ? "green"
                : "red",
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "marks",
      key: "marks",
      className: "font-poppins",
      render: (text, record) => (
        <Space>
          {record.approvalStatusByAdmin === "Pending" && (
            <Button
              className="font-poppins"
              onClick={() => handleApproveClick(record)}
            >
              Approve
            </Button>
          )}
          {record.approvalStatusByAdmin === "Approved" && (
            <Button
              className="font-poppins"
              onClick={() => handleRejectClick(record)}
            >
              Reject
            </Button>
          )}
          <Button
            className="font-poppins"
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleRejectClick = async (record) => {
    try {
      //   console.log('Reject clicked for record:', record);
      const data = { id: record.id, approvalStatusByAdmin: "Rejected" };
      const res = await dispatch(updateQualificationStatus(data));
      if (res.success) {
        message.success(res.message);
      }
    } catch (error) {
      console.error("Error occurred while rejecting:", error);
      message.error(error.response.data.message);
    }
  };

  const handleApproveClick = async (record) => {
    try {
      //   console.log('Reject clicked for record:', record);
      const data = { id: record.id, approvalStatusByAdmin: "Approved" };
      const res = await dispatch(updateQualificationStatus(data));
      if (res.success) {
        message.success(res.message);
      }
    } catch (error) {
      console.error("Error occurred while rejecting:", error);
      message.error(error.response.data.message);
    }
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <Table dataSource={data} columns={columns} loading={loading} />
    </div>
  );
};

export default Qualification;
