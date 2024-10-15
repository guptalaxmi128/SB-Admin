import React, { useState, useEffect } from "react";
import {
  Upload,
  Button,
  Input,
  Form,
  message,
  Breadcrumb,
  Row,
  Col,
  Space,
  Table,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  addBanner,
  deleteBanner,
  getBanner,
} from "../../../actions/admin/banner/banner";
import { useDispatch } from "react-redux";

const Banner = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Sno",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
      className: "font-poppins",
    },
    {
      title: "Image",
      dataIndex: "path",
      key: "path",
      render: (text) => (
        <img
          src={text}
          alt="Banner"
          style={{ width: 50, height: 50, objectFit: "cover" }}
        />
      ),
      className: "font-poppins",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "acton",
      className: "font-poppins",
      render: (text, record) => (
        <Space>
          <Button
            className="font-poppins"
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleDelete = (id) => {
    console.log(`Banner ${id} is clicked for delete`);
    dispatch(deleteBanner(id)).then((res) => {
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getBanner());
        if (res.success) {
          setData(res.data);
        }
        // console.log(res.data);
      } catch (error) {
        console.error("Error fetching banner data:", error);
        message.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleChange = (info) => {
    const { status, name, originFileObj } = info.file;

    if (status !== "uploading") {
      setFile(originFileObj);
      form.setFieldsValue({ imageUrl: name });
    }
  };

  const handleSubmit = async (values) => {
    if (!file) {
      message.error("Please upload an image!");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("AdminBanner", file);
    try {
      const res = await dispatch(addBanner(formData));
      if (res.success) {
        message.success(res.message);
        setData([...data, { ...values }]);
        form.resetFields();
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response?.data?.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg  text-gray-800 font-poppins">
          Banner
        </h2>
        <Breadcrumb className="font-poppins">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Banner</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md mt-3">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={[16, 16]}>
            <Col lg={12} sm={24} xs={24}>
              <Form.Item
                label="Image"
                name="imageUrl"
                rules={[{ required: true, message: "Please upload an image!" }]}
              >
                <Input
                  addonAfter={
                    <Upload onChange={handleChange} showUploadList={false}>
                      <UploadOutlined
                        style={{ fontSize: "16px", cursor: "pointer" }}
                      />
                    </Upload>
                  }
                  placeholder="Upload an image"
                  readOnly
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button
                htmlType="submit"
                className=" rounded-md
               block custom-btn "
                loading={uploading}
              >
                Save
              </Button>
            </Form.Item>
          </Form.Item>
        </Form>

        <div style={{ overflowX: "auto" }}>
          <Table dataSource={data} columns={columns} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Banner;
