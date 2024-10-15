import React, { useState, useEffect } from "react";
import { message, Breadcrumb, Tooltip,Space, Table } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteHomeTutor,
  getHomeTutor,
  homeTutorStatus,
} from "../../actions/admin/homeTutor/homeTutor";

const HomeTutor = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const column = [
    {
      title: "Sno",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
      className: "font-poppins",
    },
    {
      title: "Name",
      dataIndex: "homeTutorName",
      key: "homeTutorName",
      className: "font-poppins",
      render: (text, record) => (
        <div className="flex">
          <Link to={`/home-tutor/${record.id}`}>{text}</Link>
        </div>
      ),
    },
    {
      title: "Group Session",
      dataIndex: "isGroupSO",
      key: "isGroupSO",
      render: (isGroupSO) => (isGroupSO ? "Yes" : "No"),
      className: "font-poppins",
    },
    {
      title: "Private Session",
      dataIndex: "isPrivateSO",
      key: "isPrivateSO",
      render: (isPrivateSO) => (isPrivateSO ? "Yes" : "No"),
      className: "font-poppins",
    },
    {
      title: "Yoga For",
      dataIndex: "yogaFor",
      key: "yogaFor",
      render: (yogaFor) => JSON.parse(yogaFor).join(", "),
      className: "font-poppins",
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
      render: (language) => JSON.parse(language).join(", "),
      className: "font-poppins",
    },
    {
      title: "Private Session Price (Day)",
      dataIndex: "privateSessionPrice_Day",
      key: "privateSessionPrice_Day",
      render: (price) => (price !== null ? `₹${price}` : "-"),
      className: "font-poppins",
    },
    {
      title: "Private Session Price (Month)",
      dataIndex: "privateSessionPrice_Month",
      key: "privateSessionPrice_Month",
      render: (price) => (price !== null ? `₹${price}` : "-"),
      className: "font-poppins",
    },
    {
      title: "Group Session Price (Day)",
      dataIndex: "groupSessionPrice_Day",
      key: "groupSessionPrice_Day",
      render: (price) => (price !== null ? `₹${price}` : "-"),
      className: "font-poppins",
    },
    {
      title: "Group Session Price (Month)",
      dataIndex: "groupSessionPrice_Month",
      key: "groupSessionPrice_Month",
      render: (price) => (price !== null ? `₹${price}` : "-"),
      className: "font-poppins",
    },
    {
      title: "Specialization",
      dataIndex: "specilization",
      key: "specilization",
      render: (specilization) => JSON.parse(specilization).join(", "),
      className: "font-poppins",
    },
    {
      title: "Instructor Bio",
      dataIndex: "instructorBio",
      key: "instructorBio",
      className: "font-poppins",
    },
    {
      title: "Approval Status",
      dataIndex: "approvalStatusByAdmin",
      key: "approvalStatusByAdmin",
      className: "font-poppins",
    },
    {
      title: "Action",
      key: "action",
      className: "font-poppins",

      render: (text, record) => (
        <Space>
          <Tooltip title="Delete">
            <DeleteOutlined
              className="font-poppins text-red-800"
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip>

          <Tooltip title="Approve">
            <CheckOutlined
              className="font-poppins text-green-800"
              onClick={() => handleApprove(record.id)}
            />
          </Tooltip>
          <Tooltip title="Decline">
            <CloseOutlined
              className="font-poppins text-red-800"
              onClick={() => handleDecline(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getHomeTutor());
        if (res.success) {
          setData(res.data);
        }
        // console.log(res.data);
      } catch (error) {
        console.error("Error fetching banner data:", error);
        message.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleDelete = (id) => {
    console.log(`Home Tutor ${id} is clicked as delete`);

    dispatch(deleteHomeTutor(id)).then((res) => {
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
}

    const handleApprove = (id) => {
      console.log(`Home Tutor ${id} is clicked as approve`);
      const data = { id, approvalStatusByAdmin: "Approved" };
      dispatch(homeTutorStatus(data)).then((res) => {
        if (res.success) {
          message.success(res.message);
        } else {
          message.error(res.message);
        }
      });
    };
    const handleDecline = (id) => {
      console.log(`Home Tutor ${id} is clicked as decline`);
      const data = { id, approvalStatusByAdmin: "Rejected" };
      dispatch(homeTutorStatus(data)).then((res) => {
        if (res.success) {
          message.success(res.message);
        } else {
          message.error(res.message);
        }
      });
    };
    return (
        <div className="p-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg  text-gray-800 font-poppins">
            Home Tutor
          </h2>
          <Breadcrumb className="font-poppins">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>HomeTutor</Breadcrumb.Item>
          </Breadcrumb>
        </div>
  
        <div className="bg-white rounded-lg p-6 shadow-md mt-3">
      <div style={{ overflowX: "auto" }}>
        <Table dataSource={data} columns={column} loading={loading} />
      </div>
      </div>
      </div>
    );
  };

export default HomeTutor;
