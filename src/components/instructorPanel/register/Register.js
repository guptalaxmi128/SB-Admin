import React, { useState } from "react";
import { Form, Input, Button, message, Select, Row, Col,Carousel } from "antd";
import bgImage from "../../../assets/yoga.jpg";
import logo from "../../../assets/logo.webp";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addInstructor,verifyOtp } from "../../../actions/instructor/register/register";
import OtpInput from "../otpInput/OtpInput";

const { Option } = Select;

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [registrationStep, setRegistrationStep] = useState("register");
  const [email, setEmail] = useState("");

  const validateMobileNumber = (_, value) => {
    const mobileNumberRegex = /^\d{10}$/;
    if (!mobileNumberRegex.test(value)) {
      return Promise.reject(
        new Error("Please enter a valid 10-digit mobile number")
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
      const res = await dispatch(addInstructor(values));
      if (res.success) {
        setRegistrationStep("getOtp");
        setEmail(values.email);
        message.success(res.message);
        form.resetFields();
     
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

  const onOtpSubmit = async (otp) => {
    try {
      setLoading(true);
      const res = await dispatch(verifyOtp({ email: email, otp: otp }));
      if (res.success) {
        message.success(res.message);
        form.resetFields();
        navigate("/instructor/dashboard");
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.error("Error during user verification:", error);
      message.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row w-10/12 lg:w-9/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
        <div
          className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-no-repeat bg-cover bg-center hidden md:block"
          style={{ height: "100%" }}
        >
          <Carousel
            autoplay
            autoplaySpeed={2000}
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ height: "100%" }}>
              <img
                src={bgImage}
                alt="Carousel 1"
                style={{
                  width: "100%",
                  height: "80vh",
                  objectFit: "cover",
                }}
              />
            </div>
            <div style={{ height: "100%" }}>
              <img
                src={logo}
                alt="Carousel 2"
                style={{
                  width: "100%",
                  height: "80vh",
                  objectFit: "cover",
                }}
              />
            </div>
           
          </Carousel>
        </div>

        <div className="w-full lg:w-1/2 py-5 px-5 mt-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 font-poppins">
            {registrationStep === "register"
              ? " Create your Account"
              : "Get OTP"}
          </h2>

          {registrationStep === "getOtp" && (
            <>
              <OtpInput length={6} onOtpSubmit={onOtpSubmit} />
            </>
          )}
          {registrationStep === "register" && (
            <>
              <Form
                form={form}
                name="registerForm"
                onFinish={onFinish}
                initialValues={{ remember: true }}
                layout="vertical"
              >
                <Row gutter={[16, 16]}>
                  <Col lg={12} sm={24} xs={24}>
                    <Form.Item
                      label="Name"
                      name="name"
                      className="block text-sm font-medium text-gray-600"
                      rules={[
                        { required: true, message: "Please enter your name!" },
                      ]}
                    >
                      <Input
                        placeholder="Name"
                        className="mt-1 p-2 w-full border rounded-md"
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={12} sm={24} xs={24}>
                    <Form.Item
                      label="Mobile Number"
                      name="phoneNumber"
                      className="block text-sm font-medium text-gray-600"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your mobile number!",
                        },
                        { validator: validateMobileNumber },
                      ]}
                    >
                      <Input
                        placeholder="Mobile Number"
                        className="mt-1 p-2 w-full border rounded-md"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label="Your email"
                  name="email"
                  className="block text-sm font-medium text-gray-600"
                  rules={[
                    { required: true, message: "Please enter your email!" },
                    { validator: validateEmail },
                  ]}
                >
                  <Input
                    placeholder="Email"
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </Form.Item>

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

                <Form.Item wrapperCol={{ span: 24 }}>
                  <Button
                    htmlType="submit"
                    className="custom-btn rounded-md block mx-auto py-1  px-3 w-full"
                    loading={loading}
                  >
                    Create an Account
                  </Button>
                </Form.Item>
                <p className="font-poppins">
                  <a href="/login_instructor">Already have an account?</a>
                </p>
              </Form>
            </>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Register;
