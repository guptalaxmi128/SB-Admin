import React, { useState, useEffect } from "react";
import { Table, Space, message, Tooltip } from "antd";
import { UndoOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getDeletedInstructor,
  restoreInstructor,
} from "../../../actions/admin/adminInstructor/adminInstructor";

const DeletedInstructor = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const instructor = useSelector(
    (state) => state.adminInstructor.deletedInstructor
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await Promise.all([dispatch(getDeletedInstructor())]);
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
    // {
    //   title: "Profile Image",
    //   dataIndex: "profileImage",
    //   key: "profileImage",
    //   className: "font-poppins",
    // },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      className: "font-poppins",
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
          <Tooltip title="Restore">
            <UndoOutlined
              onClick={() => handleRestore(record.id)}
              className="text-green-800 text-lg cursor-pointer"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleRestore = async (id) => {
    try {
      const res = await dispatch(restoreInstructor(id));
      if (res.success) {
        message.success(res.message);
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      message.error("An error occurred while restore instructor.");
    }
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <Table dataSource={data} columns={columns} loading={loading} />
    </div>
  );
};

export default DeletedInstructor;
