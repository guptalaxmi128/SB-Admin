import React, { useState, useEffect } from "react";
import { Button, message, Table, Space } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteInstructorCoupon,
    getInstructorCoupon,
  } from "../../../actions/instructor/coupon/coupon";


const View = () => {
  const dispatch = useDispatch();
  const [coupons, setCoupons] = useState([]);
  const [getLoading, setGetLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPage, setTotalPage] = useState("");
  const data = useSelector((state) => state.addInstructorCoupon.coupon);

  useEffect(() => {
    if (data && data.data) {
      setCoupons(data.data);
    }
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setGetLoading(true);
        const params = {
          page: currentPage,
          limit: pageSize,
        
        };
       const res= await dispatch(getInstructorCoupon(params));
       setTotalPage(res.totalPage);
      } catch (error) {
        console.error("Error fetching coupons:", error);
        message.error("Failed to fetch coupons. Please try again later.");
      } finally {
        setGetLoading(false);
      }
    };

    fetchData();
  }, [dispatch,currentPage,pageSize]);

  const handleDelete = async (id) => {
    try {
      const res = await dispatch(deleteInstructorCoupon(id));
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

  function formatDate(timestamp) {
    const date = new Date(parseInt(timestamp));
    if (!isNaN(date.getTime())) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const formattedDay = day < 10 ? `0${day}` : day;
      const formattedMonth = month < 10 ? `0${month}` : month;

      const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;
      return formattedDate;
    }
    return "";
  }

  const columns = [
    {
      title: "SNo",
      dataIndex: "sNo",
      key: "sNo",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Coupon Name",
      dataIndex: "couponTitle",
      key: "couponTitle",
    },
    {
      title: "Discount",
      dataIndex: "discountInPercent",
      key: "discountInPercent",
    },
    {
      title: "Valid Till",
      dataIndex: "validTill",
      key: "validTill",
      render: (text) => formatDate(text),
    
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

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };
  return (
    <div>
      <div style={{ overflowX: "auto" }}>
        <Table dataSource={coupons} columns={columns} loading={getLoading} 
           pagination={{
              pageSize: pageSize,
              current: currentPage,
              onChange: handlePageChange,
              total: totalPage * pageSize,
            }}
        />
      </div>
    </div>
  );
};

export default View;
