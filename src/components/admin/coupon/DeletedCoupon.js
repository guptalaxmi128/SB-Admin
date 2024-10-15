import React, { useState, useEffect } from "react";
import { Button, message, Table, Space } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getDeletedCoupon, restoreCoupon } from "../../../actions/admin/coupon/coupon";

const DeletedCoupon = () => {
  const dispatch = useDispatch();
  const [coupons, setCoupons] = useState([]);
  const [getLoading, setGetLoading] = useState(false);
  const data = useSelector((state) => state.coupon.deletedCoupon);

  useEffect(() => {
    if (data && data.data) {
      setCoupons(data.data);
    }
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setGetLoading(true);
        await dispatch(getDeletedCoupon());
      } catch (error) {
        console.error("Error fetching coupons:", error);
        message.error("Failed to fetch coupons. Please try again later.");
      } finally {
        setGetLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleRestore = async (id) => {
    try {
        const res = await dispatch(restoreCoupon(id));
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
      className:"font-poppins"
    },
    {
      title: "Discount",
      dataIndex: "discountInPercent",
      key: "discountInPercent",
      className:"font-poppins"
    },
    {
      title: "DeletedBy",
      dataIndex: "deletedThrough",
      key: "deletedThrough",
      className:"font-poppins"
    },
    {
      title: "Valid Till",
      dataIndex: "validTill",
      key: "validTill",
      className:"font-poppins",
      render: (text) => (
        <Space size="middle">
          {text ? moment(text).format("DD-MM-YYYY") : "-"}
        </Space>
      ),
    },
  
    {
      title: "Action",
      key: "action",
      className: "font-poppins",
      render: (text, record) => (
        <Space>
          {record.deletedThrough === 'Admin' ? (
            <Button
              danger
              className="font-poppins"
              onClick={() => handleRestore(record.id)}
            >
              Restore
            </Button>
          ) : (
            <span>-</span>
          )}
        </Space>
      ),
    },
  ];
  return (
    <div>
      <div style={{ overflowX: "auto" }}>
        <Table dataSource={coupons} columns={columns} loading={getLoading} />
      </div>
    </div>
  );
};

export default DeletedCoupon;
