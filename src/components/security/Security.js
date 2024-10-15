import React, { useState, useEffect } from "react";
import { Breadcrumb, Table, message } from "antd";

// This is a fictional authentication context, you should replace it with your actual authentication context
const AuthContext = React.createContext({
  user: null,
  isAuthenticated: false,
  roles: [],
});

const Security = () => {
  const [users, setUsers] = useState([]);
  const authContext = React.useContext(AuthContext);

  useEffect(() => {
    if (authContext.isAuthenticated && authContext.roles.includes("admin")) {
      const dummyUsers = [
        { id: 1, username: "user1" },
        { id: 2, username: "user2" },
      ];
      setUsers(dummyUsers);
    } else {
      message.error(
        "Unauthorized access. Please log in with proper credentials."
      );
    }
  }, [authContext.isAuthenticated, authContext.roles]);

  const columns = [
    {
      title: "SNo",
      dataIndex: "index",
      key: "index",
      className:'font-poppins',
      render:(text,record,index)=>index+1
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      className:'font-poppins'
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center pt-5 pl-5 pr-5">
        <h2 className="text-lg font-semibold text-gray-800 font-poppins">Security & Privacy</h2>
        <Breadcrumb className="font-poppins">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Security & Privacy</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="bg-white rounded-lg p-6 shadow-md m-5">
        {authContext.isAuthenticated && authContext.roles.includes("admin") ? (
          <Table dataSource={users} columns={columns} rowKey="id" />
        ) : (
          <p  className='font-poppins'>
            You do not have the necessary permissions to view the user list.
          </p>
        )}
      </div>
    </div>
  );
};

export default Security;
