import React, { useState, useEffect } from "react";
import { Table, Space, Button, message } from "antd";
import {
  getDeletedExperience,
  restoreAdminExperience,
} from "../../../actions/admin/adminInstructor/adminInstructor";
import { useDispatch } from "react-redux";

const DeletedExperience = (props) => {
  const { id } = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  // console.log(id);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getDeletedExperience(id));
        setData(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  // console.log(data);

  const handleRestore = (id) => {
    console.log(`Experience ${id} is clicked for restore`);
    dispatch(restoreAdminExperience(id)).then((res) => {
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
      title: "Work History",
      dataIndex: "workHistory",
      key: "workHistory",
      className: "font-poppins",
    },
    {
      title: "Skills",
      dataIndex: "skills",
      key: "skills",
      render: (skills) => (
        <ul>
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      ),
      className: "font-poppins",
    },

    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      className: "font-poppins",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      className: "font-poppins",
    },

    {
      title: "Organization",
      dataIndex: "organization",
      key: "organization",
      className: "font-poppins",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      className: "font-poppins",
      render: (text, record) => (
        <Space>
          {record.deletedThrough === "Admin" && (
            <Button
              className="font-poppins"
              onClick={() => handleRestore(record.id)}
            >
              Restore
            </Button>
          )}
        </Space>
      ),
    },
  ];
  return (
    <div style={{ overflowX: "auto" }}>
      <Table dataSource={data} columns={columns} loading={loading} />
    </div>
  );
};

export default DeletedExperience;
