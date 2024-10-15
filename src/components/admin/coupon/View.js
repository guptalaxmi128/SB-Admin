import React, { useState, useEffect } from "react";
import { Tooltip, message, Table, Space } from "antd";
import {
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  couponStatus,
  deleteCoupon,
  getCoupon,
} from "../../../actions/admin/coupon/coupon";

const View = () => {
  const dispatch = useDispatch();
  const [coupons, setCoupons] = useState([]);
  const [getLoading, setGetLoading] = useState(false);
  const data = useSelector((state) => state.coupon.coupon);

  useEffect(() => {
    if (data && data.data) {
      setCoupons(data.data);
    }
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setGetLoading(true);
        await dispatch(getCoupon());
      } catch (error) {
        console.error("Error fetching coupons:", error);
        message.error("Failed to fetch coupons. Please try again later.");
      } finally {
        setGetLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      const res = await dispatch(deleteCoupon(id));
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
      className:"font-poppins",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Coupon Name",
      dataIndex: "couponTitle",
      key: "couponTitle",
      className:"font-poppins",
    },
    {
      title: "Discount",
      dataIndex: "discountInPercent",
      key: "discountInPercent",
      className:"font-poppins",
    },
    {
      title: "Created By",
      dataIndex: "creater",
      key: "creater",
      className:"font-poppins",
    },
    {
      title: "Status",
      dataIndex: "approvalStatusByAdmin",
      key: "approvalStatusByAdmin",
      className:"font-poppins",
    },
    {
      title: "Valid Till",
      dataIndex: "validTill",
      key: "validTill",
      className:"font-poppins",
      render: (text) => formatDate(text),
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
          {record.creater === "Instructor" && (
            <>
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
            </>
          )}
        </Space>
      ),
    },
  ];

  const handleApprove = (id) => {
    console.log(`Course ${id} is clicked as approve`);
    const data = { id, approvalStatusByAdmin: "Approved" };
    dispatch(couponStatus(data)).then((res) => {
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
  };
  const handleDecline = (id) => {
    console.log(`Course ${id} is clicked as decline`);
    const data = { id, approvalStatusByAdmin: "Rejected" };
    dispatch(couponStatus(data)).then((res) => {
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
  };

  return (
    <div>
      <div style={{ overflowX: "auto" }}>
        <Table dataSource={coupons} columns={columns} loading={getLoading} />
      </div>
    </div>
  );
};

export default View;
