import React, { useState, useEffect } from "react";
import { Table, message, Breadcrumb, Button, Space } from "antd";
import { useDispatch } from "react-redux";
import {
  deleteIReview,
  getIReview,
} from "../../../actions/instructor/review/Review";
import ReviewStar from "./ReviewStar";

const Review = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPage, setTotalPage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const params = {
          page: currentPage,
          limit: pageSize,
        };
        const res = await dispatch(getIReview(params));
        setData(res.data);
        setTotalPage(res.totalPage);
      } catch (error) {
        console.error("Error fetching review:", error);
        message.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch,pageSize,currentPage]);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const columns = [
    {
      title: "SNo",
      dataIndex: "sNo",
      key: "sNo",
      className: "font-poppins",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Reviewer Name",
      dataIndex: "reviewerName",
      key: "reviewerName",
      className: "font-poppins",
    },
    {
      title: "Message",
      dataIndex: "reviewMessage",
      key: "reviewMessage",
      className: "font-poppins",
    },
    {
      title: "Rating",
      dataIndex: "reviewStar",
      key: "reviewStar",
      className: "font-poppins",
      render: (reviewStar) => <ReviewStar reviewStar={reviewStar} />, // Render star ratings using ReviewStars component
    },

    {
      title: "Action",
      key: "action",
      className: "font-poppins",
      render: (text, record) => (
        <Space>
          <Button
            danger
            className="font-poppins"
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleDelete = async (id) => {
    try {
      const res = await dispatch(deleteIReview(id));
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.error("Error deleting stock:", error);
      message.error(error.response.data.message);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg  text-gray-800 font-poppins">
          Review
        </h2>
        <Breadcrumb className="font-poppins">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Review</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md mt-3">
        <div style={{ overflowX: "auto" }}>
          <Table
            dataSource={data}
            columns={columns}
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

export default Review;
