import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import bgImage from "../../../assets/yoga.jpg";
import logo from "../../../assets/swasti-logo.jpg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../../actions/admin/auth/auth";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form]=Form.useForm();
  const [loading, setLoading] = useState(false);

  const validatePassword = (_, value) => {
    if (value && value.length < 8) {
      return Promise.reject(
        new Error("Password must be at least 8 characters long")
      );
    }
    return Promise.resolve();
  };

  const validateEmail = (_, value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return Promise.reject(new Error("Please enter a valid email address"));
    }
    return Promise.resolve();
  };

  const onFinish = async (values) => {
    try {
      console.log("Received values:", values);
      setLoading(true);
      const res = await dispatch(loginAdmin(values));
      if (res.success) {
        message.success(res.message);
        navigate("/admin/dashboard");
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.error("An error occurred during sign-in:", error);
      message.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="flex flex-col items-center">
        <div className="flex  items-center">
          <img
            src={logo}
            alt="Yoga Logo"
            className="mx-auto mb-4"
            style={{ width: "60px", height: "60px", borderRadius: "50%" }}
          />
          <h2 className="text-2xl ml-2 font-semibold mb-6 text-gray-800 text-white">
            YogaApp
          </h2>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 font-poppins">
            Sign in to your account
          </h2>
          <Form
            form={form}
            name="loginForm"
            onFinish={onFinish}
            initialValues={{ remember: true }}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Form.Item
              label="Your email"
              name="email"
              className="block text-sm font-medium text-gray-600"
              rules={[{ required: true, message: "Please enter your email!" },
              { validator: validateEmail },]}
            >
              <Input
                placeholder="Email"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              className="block text-sm font-medium text-gray-600"
              rules={[
                { required: true, message: "Please enter your password!" },
                {
                  validator: validatePassword,
                },
              ]}
            >
              <Input.Password
                placeholder="Password"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }}>
              <Button
                htmlType="submit"
                className="custom-btn rounded-md block mx-auto py-1  px-3 w-full"
                loading={loading}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
