import React, { useState, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Breadcrumb,
  message,
  Input,
  Space,
  Tooltip,
  Table,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addHTSpecialisation,
  deleteHTSpecialisation,
  getHTSpecialisation,
} from "../../../actions/admin/htSpecialisation/htSpecialisation";

const HTSpecialisation = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const therapy = useSelector((state) => state.htSpecialisation.specialisation);
  const [getLoading, setGetLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setGetLoading(true);
        await Promise.all([dispatch(getHTSpecialisation())]);
      } finally {
        setGetLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (therapy && therapy.data) {
      setData(therapy.data);
    }
  }, [therapy]);

  const columns = [
    {
      title: "SNo",
      dataIndex: "index",
      key: "index",
      align: "center",
      className: "font-poppins",
      render: (text, record, index) => index + 1,
    },
    {
      title: " Specialisation",
      dataIndex: "specilization",
      key: "specilization",
      align: "center",
      className: "font-poppins",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      className: "font-poppins",
      render: (text, record) => (
        <Space>
          <Tooltip title="Delete">
            <DeleteOutlined
              onClick={() => handleDelete(record.id)}
              className="text-red-500 text-lg cursor-pointer"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleDelete = (id) => {
    console.log(`Home Tutor specialisation ${id} is clicked for delete`);
    dispatch(deleteHTSpecialisation(id)).then((res) => {
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);

      const res = await dispatch(addHTSpecialisation(values));
      if (res.success) {
        message.success(res.message);
        setData([...data, { ...values }]);
        form.resetFields();
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg  text-gray-800 font-poppins">
          Home Tutor Specialisation
        </h2>
        <Breadcrumb className="font-poppins">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item> Home Tutor Specialisation</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md mt-3">
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Row gutter={[16, 16]}>
            <Col lg={12} sm={24} xs={24}>
              <Form.Item
                name="specilization"
                label="Home Tutor Specialisation"
                rules={[
                  {
                    required: true,
                    message: "Please enter home tutor specialisation",
                  },
                ]}
              >
                <Input placeholder="Enter  Specialisation" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button htmlType="submit" className="custom-btn" loading={loading}>
              Save
            </Button>
          </Form.Item>
        </Form>
        <div className="mt-5">
          {data.length > 0 ? (
            <>
              <h5 className="font-poppins text-lg mb-2 ">
                Home Tutor Specialisation
              </h5>
              <div style={{ overflowX: "auto" }}>
                <Table
                  dataSource={data}
                  columns={columns}
                  loading={getLoading}
                />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default HTSpecialisation;
