import React, { useState, useEffect, useRef } from "react";
import {
  Input,
  Button,
  Form,
  Row,
  Col,
  message,
  DatePicker,
  theme,
  Tag,
  Space,
  Breadcrumb
} from "antd";
import { useDispatch } from "react-redux";
import { PlusOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { TweenOneGroup } from "rc-tween-one";
import moment from "moment";
import { Link } from "react-router-dom";
import backgroundImage from "../../../assets/experience.png";
import {
  addInstructorExperience,
  deleteInstructorExperience,
  getInstructor,
  updateInstructorExperience,
} from "../../../actions/instructor/register/register";

const Experience = () => {
  const dispatch = useDispatch();
  const { token } = theme.useToken();
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [joinDate, setJoinDate] = useState(null);
  const [editJoinDate, setEditJoinDate] = useState(null);
  const [skills, setSkills] = useState([]);
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isSkillsValid, setIsSkillsValid] = useState(true);
  const [editExperience, setEditExperience] = useState(false);
  const [showExperienceFields, setShowExperienceFields] = useState(false);
  const inputRef = useRef(null);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getInstructor());
        setData(res.data.experience);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const handleClose = (removedSkill) => {
    const newSkills = skills.filter((skill) => skill !== removedSkill);
    setSkills(newSkills);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsSkillsValid(true); // Reset validation when input changes
  };

  const handleInputConfirm = () => {
    if (inputValue.trim() !== "" && skills.indexOf(inputValue) === -1) {
      setSkills([...skills, inputValue]);
      setInputVisible(false);
      setInputValue("");
    } else {
      setIsSkillsValid(false); // Display error if input is empty or already exists
    }
  };

  const forMap = (skill) => (
    <span key={skill}>
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(skill);
        }}
      >
        {skill}
      </Tag>
    </span>
  );

  const skillChild = skills.map(forMap);

  const tagPlusStyle = {
    background: token.colorBgContainer,
    borderStyle: "dashed",
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const data = {
        skills,
        joinDate: joinDate,
        role: values.role,
        department: values.department,
        workHistory: values.workHistory,
        organization: values.organization,
      };
      const res = await dispatch(addInstructorExperience(data));
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

  const toggleExperienceFields = () => {
    setShowExperienceFields(!showExperienceFields);
  };

  const editChange = (data) => {
    // console.log(data);
    setId(data.id);
    setEditExperience(!editExperience);
    editForm.setFieldsValue({
      role: data.role,
      department: data.department,
      workHistory: data.workHistory,
      organization: data.organization,
      joinDate: moment(data.joinDate, "YYYY-MM-DD"),
      // skills:data.skills
    });
  };

  const handleUpdate = async (values) => {
    try {
      setEditLoading(true);
      const data = {
        skills,
        joinDate: editJoinDate,
        role: values.role,
        department: values.department,
        workHistory: values.workHistory,
        organization: values.organization,
        id,
      };
      const res = await dispatch(updateInstructorExperience(data));
      if (res.success) {
        message.success(res.message);
        editForm.resetFields();
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async (experience) => {
    console.log(experience);
    console.log(`Experience ${experience.id} is clicked for delete`);
    const res = await dispatch(deleteInstructorExperience(experience.id));
    if (res.success) {
      message.success(res.message);
    } else {
      message.error(res.message);
    }
  };

  return (
    <div className="p-4">
     <div className="flex justify-between items-center">
        <h2 className="font-semibold  text-lg text-gray-800 font-poppins">
           Experience
        </h2>
        <Breadcrumb className="font-poppins">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Experience</Breadcrumb.Item>
        </Breadcrumb>
      </div>
     
      <div>
        {showExperienceFields && (
          <div className="bg-white rounded-lg p-6 shadow-md mt-3">
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Row gutter={[16, 16]}>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  label="Work History"
                  name="workHistory"
                  rules={[
                    {
                      required: true,
                      message: "Please enter work history!",
                    },
                  ]}
                >
                  <Input placeholder="Enter Work History" />
                </Form.Item>
              </Col>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  label="Role"
                  name="role"
                  rules={[
                    {
                      required: true,
                      message: "Please enter role!",
                    },
                  ]}
                >
                  <Input placeholder="Enter Role" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  label="Organization"
                  name="organization"
                  rules={[
                    {
                      required: true,
                      message: "Please enter organization!",
                    },
                  ]}
                >
                  <Input placeholder="Enter Organization" />
                </Form.Item>
              </Col>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  label="Join Date"
                  name="joinDate"
                  rules={[
                    { required: true, message: "Please select join date!" },
                  ]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    onChange={(date, dateString) => {
                      setJoinDate(dateString);
                    }}
                    format="MM/DD/YYYY"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  label="Department"
                  name="department"
                  rules={[
                    {
                      required: true,
                      message: "Please enter department!",
                    },
                  ]}
                >
                  <Input placeholder="Enter Department" />
                </Form.Item>
              </Col>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  label="Skills"
                  validateStatus={isSkillsValid ? "" : "error"}
                  help={!isSkillsValid && "Please enter a valid skill"}
                  required
                >
                  <div className="flex">
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
                      {skillChild}
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
                        <PlusOutlined /> Add Skills
                      </Tag>
                    )}
                  </div>
                </Form.Item>
              </Col>
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

        {editExperience && (
          <div className="bg-white rounded-lg p-6 shadow-md m-5">
          <Form form={editForm} onFinish={handleUpdate} layout="vertical">
            <Row gutter={[16, 16]}>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  label="Work History"
                  name="workHistory"
                  rules={[
                    {
                      required: true,
                      message: "Please enter work history!",
                    },
                  ]}
                >
                  <Input placeholder="Enter Work History" />
                </Form.Item>
              </Col>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  label="Role"
                  name="role"
                  rules={[
                    {
                      required: true,
                      message: "Please enter role!",
                    },
                  ]}
                >
                  <Input placeholder="Enter Role" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  label="Organization"
                  name="organization"
                  rules={[
                    {
                      required: true,
                      message: "Please enter organization!",
                    },
                  ]}
                >
                  <Input placeholder="Enter Organization" />
                </Form.Item>
              </Col>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  label="Join Date"
                  name="joinDate"
                  rules={[
                    { required: true, message: "Please select join date!" },
                  ]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    onChange={(date, dateString) => {
                      setEditJoinDate(dateString);
                    }}
                    format="MM/DD/YYYY"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  label="Department"
                  name="department"
                  rules={[
                    {
                      required: true,
                      message: "Please enter department!",
                    },
                  ]}
                >
                  <Input placeholder="Enter Department" />
                </Form.Item>
              </Col>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  label="Skills"
                  validateStatus={isSkillsValid ? "" : "error"}
                  help={!isSkillsValid && "Please enter a valid skill"}
                  required
                  name="skills"
                >
                  <div className="flex">
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
                      {skillChild}
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
                        <PlusOutlined /> Add Skills
                      </Tag>
                    )}
                  </div>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item wrapperCol={{ span: 24 }}>
              <Button
                htmlType="submit"
                className="custom-btn"
                loading={editLoading}
              >
                Update
              </Button>
            </Form.Item>
          </Form>
          </div>
        )}

        <div className="p-8">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={8}>
              {data.map((experience) => (
                <div
                  className={`mb-4 ${
                    showExperienceFields || editExperience ? "hidden" : ""
                  }`}
                  key={experience.id}
                >
                  <div
                    className="relative grid h-[20rem] w-full max-w-[28rem] flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700"
                    style={{
                      backgroundImage: `url(${backgroundImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div
                      className={`absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-cover bg-clip-border bg-center text-gray-700 shadow-none`}
                    >
                      <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-black/80 via-black/50"></div>
                    </div>
                    <div className="absolute top-2 right-2 cursor-pointer">
                      <span style={{ fontSize: "15px" }}>
                        <CloseCircleOutlined
                          onClick={() => handleDelete(experience)}
                        />
                      </span>
                    </div>
                    <div className="relative p-6 px-6 py-14 md:px-12">
                      <h2 className="mb-1 block font-poppins text-xl font-medium leading-[1.5] tracking-normal text-white antialiased">
                        {experience.workHistory}
                      </h2>
                      <p className="mb-6 block font-poppins text-sm leading-[1.5] tracking-normal text-white antialiased">
                        {experience.university_institute_name}
                      </p>
                      <Space>
                      <Button
                        onClick={() => editChange(experience)}
                        className="custom-btn"
                      >
                        Edit
                      </Button>
                      <Link to={`/experience/${experience.id}`} key={experience.id}>
                      <Button className="custom-btn">View Details</Button>
                    </Link>
                    </Space>
                    </div>
                  </div>
                </div>
              ))}
            </Col>

            {/* Add Experience card */}
            <Col xs={24} sm={12} md={8} lg={8}>
              <div
                className={`mb-4 ${
                  showExperienceFields || editExperience ? "hidden" : ""
                }`}
              >
                <div
                  className="relative grid h-[20rem] w-full max-w-[28rem] flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700"
                  style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div
                    className={`absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-cover bg-clip-border bg-center text-gray-700 shadow-none`}
                  >
                    <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-black/80 via-black/50"></div>
                  </div>
                  <div className="relative p-6 px-6 py-14 md:px-12">
                    <h2 className="mb-1 block font-poppins text-xl font-medium leading-[1.5] tracking-normal text-white antialiased">
                      {" "}
                      <Button
                        onClick={toggleExperienceFields}
                        className="custom-btn"
                      >
                        Add Experience
                      </Button>
                    </h2>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Experience;
