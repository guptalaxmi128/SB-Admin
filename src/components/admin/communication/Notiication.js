// NotificationComponent.js
import React, { useState } from "react";
import { Select, Button, Input, Form, Breadcrumb,Row,Col } from "antd";

const { Option } = Select;

const Notification = () => {
  const onFinish = (values) => {
    console.log("Received values", values);
  };

  return (
    <div>
      <div className="flex justify-between items-center pt-5 pl-5 pr-5">
        <h2 className=" font-semibold text-lg text-gray-800 font-poppins">
          Notification
        </h2>
        <Breadcrumb className="font-poppins">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Notification</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md m-5">
        <Form onFinish={onFinish} layout="vertical">
        <Row gutter={[16, 16]}>
            <Col lg={12} sm={24} xs={24}>
            <Form.Item
              label="Recipient Type"
              name="recipientType"
              rules={[
                { required: true, message: "Please select recipient type" },
              ]}
            >
              <Select
                defaultValue="Select option"
                className="font-poppins"
                dropdownClassName="font-poppins"
              >
                <Option value="student">Student</Option>
                <Option value="instructor">Instructor</Option>
              </Select>
            </Form.Item>
            </Col>
            
            <Col lg={12} sm={24} xs={24}>
            <Form.Item
              label="Notification Message"
              name="notificationMessage"
              rules={[
                {
                  required: true,
                  message: "Please enter notification message",
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
            <Button htmlType="submit" className="custom-btn ">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Notification;
