import React, { useState, useEffect } from "react";
import { message, Table} from "antd";
import { useDispatch } from "react-redux";
import { getNotification } from "../../../actions/instructor/notification/notification";

const View = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPage, setTotalPage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const params = {
          page: currentPage,
          limit: pageSize,
        
        };
        const res = await dispatch(getNotification(params));
        setData(res.data);
        setTotalPage(res.totalPage);
      } catch (error) {
        // Handle the error
        console.error("Error fetching notification:", error);
        message.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
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
      title: "Message",
      dataIndex: "notification",
      key: "notification",
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
  ];

  return (
    <>
      <div style={{ overFlowX: "auto" }}>
        <Table dataSource={data} columns={columns} loading={loading}
          pagination={{
              pageSize: pageSize,
              current: currentPage,
              onChange: handlePageChange,
              total: totalPage * pageSize,
            }} />
      </div>
    </>
  );
};

export default View;
