import React, { useState } from "react";
import { Form, Row, Col, Input, Button, message,Select } from "antd";
import { useDispatch } from "react-redux";
import { addANotification } from "../../../actions/admin/notification/notification";

const { Option}=Select;
const Create = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
        const res = await dispatch(addANotification(values));
        if (res.success) {
          message.success(res.message);
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
    <>
     <Form onFinish={onFinish} layout="vertical" form={form}>
        <Row gutter={[16, 16]}>
            <Col lg={12} sm={24} xs={24}>
            <Form.Item
              label="Recipient Type"
              name="forWhom"
              rules={[
                { required: true, message: "Please select recipient type" },
              ]}
            >
              <Select
                defaultValue="Select option"
                className="font-poppins"
                dropdownClassName="font-poppins"
              >
                <Option value="Student">Student</Option>
                <Option value="Instructor">Instructor</Option>
                <Option value="Both">Both</Option>
              </Select>
            </Form.Item>
            </Col>
            
            <Col lg={12} sm={24} xs={24}>
            <Form.Item
              label="Message"
              name="notification"
              rules={[
                {
                  required: true,
                  message: "Please enter message",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Enter notification message"
                autoSize={{ minRows: 3 }}
              />
            </Form.Item>
            </Col>
            </Row>
         
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button htmlType="submit" className="custom-btn" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
    </>
  );
};

export default Create;
