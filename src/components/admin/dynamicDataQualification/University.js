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
  addUniversity,
  deleteUniversity,
  getUniversity,
} from "../../../actions/admin/university/university";

const University = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const university = useSelector((state) => state.university.university);
  const [getLoading, setGetLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setGetLoading(true);
        await Promise.all([dispatch(getUniversity())]);
      } finally {
        setGetLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (university && university.data) {
      setData(university.data);
    }
  }, [university]);

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
      title: "University ",
      dataIndex: "university_name",
      key: "university_name",
      align: "center",
      className: "font-poppins",
    },
    {
      title: "Institutes",
      dataIndex: "institute_collage",
      key: "institute_collage",
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
    console.log(`University / Institute ${id} is clicked for delete`);
    dispatch(deleteUniversity(id)).then((res) => {
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
console.log(values)
      const res = await dispatch(addUniversity(values));
      if (res.success) {
        message.success(res.message);
        setData([...data, { ...values }]);
        form.resetFields();
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.error("Error:", error);
      message.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg  text-gray-800 font-poppins">
          University / Institute
        </h2>
        <Breadcrumb className="font-poppins">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>University / Institute</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md mt-3">
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Row gutter={[16, 16]}>
            <Col lg={12} sm={24} xs={24}>
              <Form.Item
                name="university_name"
                label="University Name"
                rules={[
                  { required: true, message: "Please enter University Name" },
                ]}
              >
                <Input placeholder="Enter University Name" />
              </Form.Item>
            </Col>
            <Col lg={12} sm={24} xs={24}>
              <Form.Item
                name="institute_collage"
                label="Institute Name"
                rules={[
                  { required: true, message: "Please enter Institute Name" },
                ]}
              >
                <Input placeholder="Enter Institute Name" />
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
                University / Institute List
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

export default University;
