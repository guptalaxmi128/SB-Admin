import React, { useState } from "react";
import { Input, Button, Form, Row, Col, Select, message } from "antd";
import { addAdminInstructor } from "../../../actions/admin/adminInstructor/adminInstructor";
import { useDispatch } from "react-redux";

const { Option } = Select;
const Create = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      // const formData = new FormData();
      // formData.append("name", values.name);
      // formData.append("email", values.email);
      // formData.append("phoneNumber", values.mobileNumber);
      // formData.append("instructorType", values.instructorType);
      // formData.append("password", values.password);

      const res = await dispatch(addAdminInstructor(values));
      if (res.success) {
        message.success(res.message);
        form.resetFields();
        // setImage(null);
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
    <>
      <div>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Row gutter={[16, 16]}>
            <Col lg={12} sm={24} xs={24}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter name" }]}
              >
                <Input placeholder="Name" />
              </Form.Item>
            </Col>
            <Col lg={12} sm={24} xs={24}>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "Please enter email" }]}
              >
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col lg={12} sm={24} xs={24}>
              <Form.Item
                name="phoneNumber"
                label="Mobile Number"
                rules={[
                  { required: true, message: "Please enter mobile number" },
                ]}
              >
                <Input placeholder="Mobile Number" />
              </Form.Item>
            </Col>

            <Col lg={12} sm={24} xs={24}>
              <Form.Item
                label="Instructor Type"
                name="instructorType"
                rules={[
                  {
                    required: true,
                    message: "Please select instructor type!",
                  },
                ]}
              >
                <Select
                  placeholder="Select Instructor Type"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  <Option value="Instructor">Instructor</Option>
                  <Option value="Teacher">Teacher</Option>
                  <Option value="Coach">Coach</Option>
                  <Option value="Trainer">Trainer</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button htmlType="submit" className="custom-btn" loading={loading}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Create;
