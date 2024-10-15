import React, { useState } from "react";
import { Form, Row, Col, Input, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { addINotification } from "../../../actions/instructor/notification/notification";

const Create = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
        const res = await dispatch(addINotification(values));
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
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={[16, 16]}>
          <Col lg={12} sm={24} xs={24}>
            <Form.Item
              label="Message"
              name="notification"
              rules={[
                {
                  required: true,
                  message: "Please enter message to send student",
                },
              ]}
            >
              <Input.TextArea placeholder="Enter Message" rows={3} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button
            htmlType="submit"
            className=" rounded-md block custom-btn "
            loading={loading}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Create;
