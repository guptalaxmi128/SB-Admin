import React, { useState } from "react";
import { Form, Input, Button, message,Carousel } from "antd";
import bgImage from "../../../assets/yoga.jpg";
import logo from "../../../assets/logo.webp";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginInstructor,verifyOtp } from "../../../actions/instructor/register/register";
import OtpInput from "../otpInput/OtpInput";


const InstructorLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form]=Form.useForm();
  const [loading, setLoading] = useState(false);
  const [loginStep, setLoginStep] = useState("login");
  const [email, setEmail] = useState("");


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
      const res = await dispatch(loginInstructor(values));
      if (res.success) {
        setLoginStep("getOtp");
        setEmail(values.email);
        message.success(res.message);
     
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
      // console.log("email", email);
      // console.log("otp", otp);
      const res = await dispatch(verifyOtp({ email: email, otp:otp }));

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

        <div className="w-full lg:w-1/2 py-12 px-12 mt-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 font-poppins">
            
            {loginStep === "login" ? "Sign in to your account" : "Get OTP"}
          </h2>
          {loginStep === "getOtp" && (
                 <OtpInput length={6} onOtpSubmit={onOtpSubmit} />
              )}
              {loginStep === "login" && (
                <>
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
          </>)}
          {loginStep === "login" ? (
                <div className="text-center font-poppins">
                  Do not have account? <a href="/instructor_register">Register here</a>
                </div>
              ) : (
                <div className="text-center font-poppins mt-3">
                  <a href="/login_instructor">Resend OTP</a>
                </div>
              )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorLogin;
