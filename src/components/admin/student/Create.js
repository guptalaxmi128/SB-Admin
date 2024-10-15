import React, { useState } from "react";
import { Input, Button, Form, Row, Col,message } from "antd";
import { addAdminStudent } from "../../../actions/admin/adminStudent/adminStudent";
import { useDispatch } from "react-redux";

const Create = () => {
  const dispatch=useDispatch();
  const [form] = Form.useForm();
  const [loading,setLoading]=useState(false);
  // const [image, setImage] = useState(null);

  // const onImageChange = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     const fileName = event.target.files[0];
  //     setImage(fileName);
  //   }
  // };

  const validatePassword = (_, value) => {
    if (value && value.length < 8) {
      return Promise.reject(
        new Error("Password must be at least 8 characters long")
      );
    }
    return Promise.resolve();
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      // const formData = new FormData();
      // formData.append("name", values.name);
      // formData.append("email", values.email);
      // formData.append("phoneNumber", values.mobileNumber);
      // formData.append("instructorType", values.instructorType);
      // formData.append("password", values.password);

      const res = await dispatch(addAdminStudent(values));
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
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
        >
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

            {/* <Col lg={12} sm={24} xs={24}>
              <Form.Item
                name="profilePicture"
                label="Profile Picture"
                rules={[{ required: true, message: "Please select image" }]}
              >
                <Input
                  type="file"
                  onChange={onImageChange}
                  className="filetype"
                />
              </Form.Item>
            </Col> */}
            <Col lg={12} sm={24} xs={24}>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please enter your password!" },
                  {
                    validator: validatePassword,
                  },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button
              htmlType="submit"
              className=" rounded-md
               block custom-btn "
               loading={loading}
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Create;
