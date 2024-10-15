import React, { useEffect, useRef, useState } from "react";
import {
  Input,
  Button,
  Form,
  Row,
  Col,
  message,
  Spin,
  DatePicker,
  Tag,
  theme,
  Breadcrumb
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { TweenOneGroup } from "rc-tween-one";
import { useDispatch } from "react-redux";
// import axios from "axios";
import {
  getInstructor,
  updateInstructor,
} from "../../../actions/instructor/register/register";

const Update = () => {
  const dispatch = useDispatch();
  const { token } = theme.useToken();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  // const [location, setLocation] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const [form] = Form.useForm();
  // console.log(languages);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const handleClose = (removedLanguage) => {
    const newLanguages = languages.filter(
      (language) => language !== removedLanguage
    );
    setLanguages(newLanguages);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && languages.indexOf(inputValue) === -1) {
      setLanguages([...languages, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const forMap = (language) => (
    <span key={language}>
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(language);
        }}
      >
        {language}
      </Tag>
    </span>
  );

  const languageChild = languages.map(forMap);

  const tagPlusStyle = {
    background: token.colorBgContainer,
    borderStyle: "dashed",
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const fileName = event.target.files[0];
      setImage(fileName);
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("profileImage", image);
      formData.append("bio", values.bio);
      formData.append("location", values.location);
      formData.append("linkedIn", values.linkedIn);
      formData.append("facebook", values.facebook);
      formData.append("twitter_x", values.twitter_x);
      formData.append("instagram", values.instagram);
      formData.append("dateOfBirth", dateOfBirth);
     

      // Append each language to the form data
      languages.forEach((language) => {
        formData.append("languages", language);
      });
      const res = await dispatch(updateInstructor(formData));
      if (res.success) {
        message.success(res.message);
        form.resetFields();
        setImage(null);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading1(true);
        const result = await dispatch(getInstructor());

        form.setFieldsValue({
          name: result.data.name,
          email: result.data.email,
          phoneNumber: result.data.phoneNumber,
          instructorType: result.data.instructorType,
        });
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading1(false);
      }
    };

    fetchData();
  }, [dispatch, form]);

  return (
    <div  className="p-4">
       <div className="flex justify-between items-center">
        <h2 className="font-semibold  text-lg text-gray-800 font-poppins">
          Profile
        </h2>
        <Breadcrumb className="font-poppins">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Profile</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      {loading1 ? (
        <div className="flex justify-center align-center ">
          <Spin />
        </div>
      ) : (
        <div className="bg-white rounded-lg p-6 shadow-md mt-3">
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
                <Form.Item name="email" label="Email">
                  <Input placeholder="Email" disabled />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item name="phoneNumber" label="Mobile Number">
                  <Input placeholder="Mobile Number" disabled />
                </Form.Item>
              </Col>

              <Col lg={12} sm={24} xs={24}>
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
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  name="bio"
                  label="Bio"
                  rules={[{ required: true, message: "Please enter bio" }]}
                >
                  <Input.TextArea
                    label="Bio"
                    placeholder="Add a professional bio..."
                    autoSize={{ minRows: 3 }}
                  />
                </Form.Item>
              </Col>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item label="Instructor Type" name="instructorType">
                  <Input placeholder="Instructor Type" disabled />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item label="Facebook Link" name="facebook">
                  <Input placeholder="Facebook Link" />
                </Form.Item>
              </Col>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item name="twitter_x" label="Twitter Link">
                  <Input placeholder="Twitter Link" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item name="linkedIn" label="LinkedIn Link">
                  <Input placeholder="LinkedIn Link" />
                </Form.Item>
              </Col>

              <Col lg={12} sm={24} xs={24}>
                <Form.Item name="instagram" label="Instagram Link">
                  <Input placeholder="Instagram Link" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  label="Date Of Birth"
                  name="dateOfBirth"
                  rules={[
                    { required: true, message: "Please select date of birth!" },
                  ]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    onChange={(date, dateString) => {
                      setDateOfBirth(dateString);
                    }}
                    format="MM/DD/YYYY"
                  />
                </Form.Item>
              </Col>
              <Col lg={12} sm={24} xs={24}>
                <p className="text-sm font-poppins">Add Languages</p>
                <div className="flex mt-3 mb-3">
                  <TweenOneGroup
                    enter={{
                      scale: 0.8,
                      opacity: 0,
                      type: "from",
                      duration: 100,
                    }}
                    leave={{
                      opacity: 0,
                      width: 0,
                      scale: 0,
                      duration: 200,
                    }}
                  >
                    {languageChild}
                  </TweenOneGroup>
                  {inputVisible ? (
                    <Input
                      ref={inputRef}
                      type="text"
                      size="small"
                      style={{ width: 78 }}
                      value={inputValue}
                      onChange={handleInputChange}
                      onBlur={handleInputConfirm}
                      onPressEnter={handleInputConfirm}
                    />
                  ) : (
                    <Tag onClick={showInput} style={tagPlusStyle}>
                      <PlusOutlined /> New Language
                    </Tag>
                  )}
                </div>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  name="location"
                  label="Location"
                  rules={[{ required: true, message: "Please enter location" }]}
                >
                  <Input placeholder="Enter Location" />
                </Form.Item>
                {/* <Form.Item
                  label="Location"
                  rules={[{ required: true, message: "Please enter location" }]}
                >
                  <Input
                    placeholder="Enter Location"
                    value={location}
                    readOnly
                  />
                </Form.Item> */}
              </Col>
              {/* <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.3325395304414!2d-122.01116148467422!3d37.33463524513264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb59127ce078f%3A0x18e1c3ce7becf1b!2sApple%20Park!5e0!3m2!1sen!2sin!4v1637309850935!5m2!1sen!2sin"
                width="600"
                height="450"
                style={{ border: "0" }}
                allowfullscreen=""
                loading="lazy"
              ></iframe> */}
            </Row>

            <Form.Item wrapperCol={{ span: 24 }}>
              <Button
                htmlType="submit"
                className="custom-btn"
                loading={loading}
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
   
      )}
    </div>
  );
};

export default Update;
