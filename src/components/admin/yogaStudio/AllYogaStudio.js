import React, { useState, useEffect } from "react";
import { Tooltip, message, Table, Space, Breadcrumb } from "antd";
import {
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getYogaStudio,yogaStudioStatus } from "../../../actions/admin/yogaStudio/yogaStudio";

const AllYogaStudio = () => {
  const dispatch = useDispatch();
  const [studio, setStudio] = useState([]);
  const [getLoading, setGetLoading] = useState(false);
  const data = useSelector((state) => state.yogaStudio.yogaStudio);
  console.log(data);

  useEffect(() => {
    if (data && data.data) {
      setStudio(data.data);
    }
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setGetLoading(true);
        await dispatch(getYogaStudio());
      } catch (error) {
        console.error("Error fetching coupons:", error);
        message.error("Failed to fetch coupons. Please try again later.");
      } finally {
        setGetLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  //   const handleDelete = async (id) => {
  //     try {
  //       const res = await dispatch(deleteCoupon(id));
  //       if (res.success) {
  //         message.success(res.message);
  //       } else {
  //         message.error(res.message);
  //       }
  //     } catch (error) {
  //       console.error("Error deleting stock:", error);
  //       message.error(error.response.data.message);
  //     }
  //   };

  const columns = [
    {
      title: "SNo",
      dataIndex: "sNo",
      key: "sNo",
      className: "font-poppins",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Business Name",
      dataIndex: "businessName",
      key: "businessName",
      className: "font-poppins",
    },
    {
      title: "Block / Building Name",
      dataIndex: "block_building",
      key: "block_building",
      className: "font-poppins",
    },
    {
      title: "Street / Colony Name",
      dataIndex: "street_colony",
      key: "street_colony",
      className: "font-poppins",
    },
    {
      title: "Area",
      dataIndex: "area",
      key: "area",
      className: "font-poppins",
    },
    {
      title: "Pincode",
      dataIndex: "pincode",
      key: "pincode",
      className: "font-poppins",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      className: "font-poppins",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      className: "font-poppins",
    },
    {
      title: "Longitude",
      dataIndex: "longitude",
      key: "longitude",
      className: "font-poppins",
    },
    {
      title: "Latitude",
      dataIndex: "latitude",
      key: "latitude",
      className: "font-poppins",
    },
    {
      title: "Status",
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
          {/* <Tooltip title="Delete">
            <DeleteOutlined
              className="font-poppins text-red-800"
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip> */}

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
        </Space>
      ),
    },
  ];

  const handleApprove = (id) => {
    console.log(`yoga studio ${id} is clicked as approve`);
    const data = { id, approvalStatusByAdmin: "Approved" };
    dispatch(yogaStudioStatus(data)).then((res) => {
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
  };
  const handleDecline = (id) => {
    console.log(`yoga studio ${id} is clicked as decline`);
    const data = { id, approvalStatusByAdmin: "Rejected" };
    dispatch(yogaStudioStatus(data)).then((res) => {
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
          Yoga Studio
        </h2>
        <Breadcrumb className="font-poppins">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Yoga Studio</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md mt-3">
        <div style={{ overflowX: "auto" }}>
          <Table dataSource={studio} columns={columns} loading={getLoading} />
        </div>
      </div>
    </div>
  );
};

export default AllYogaStudio;
