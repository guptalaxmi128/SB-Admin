import React, { useState, useEffect } from "react";
import { Input, Button, Form, Row, Col, Select, message, Space,Breadcrumb } from "antd";
import { useDispatch } from "react-redux";
import { CloseCircleOutlined } from "@ant-design/icons";
import {
  addInstructorQualification,
  deleteInstructorQualification,
  getInstructor,
  updateInstructorQualification,
} from "../../../actions/instructor/register/register";
import { Link } from "react-router-dom";
import backgroundImage from "../../../assets/yoga.jpeg";
import people from "../../../assets/people.png";

const { Option } = Select;

const Qualification = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [editImage, setEditImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [id, setId] = useState("");
  const [data, setData] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [editFormat, setEditFormat] = useState(null);
  const [showQualificationFields, setShowQualificationFields] = useState(false);
  const [editQualification, setEditQualification] = useState(false);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [selectedCourseType, setSelectedCourseType] = useState(null);
  const [availableCourses, setAvailableCourses] = useState({
    "Certificate Course": [
      "Yoga for Wellness Instructor (CCYWI) [ Duration – 6 months]",
      "Yoga Therapy Assistant (CCYTA) [ Duration – one semester]",
      "Yoga for Protocol Instructor (CCYPI) [ Duration – 3 months]",
      "Foundation Course [ Duration – 1 month (50hrs)]",
      "Residential and Online Certificate Courses in Yoga",
      "Certificate Course in Yoga Science for Special Interest Group (CCYSIG)",
      "100 Hour Yoga Teacher Training Course Contents",
      "Yoga Nidra Teacher Training [ Duration – 30hrs]",
      "Inner Engineering (Isha Foundation) [ Duration – 4 weeks]",
      "Pranayama (Breathwork) Teacher Training [ Duration – 50hrs]",
      "Assistant Yoga Therapist",
      "Yoga Therapist",
      "Therapeutic Yoga Consultant",
    ],
    "1 Year Course": [
      "POST GRADUATE DIPLOMA IN YOGA THERAPY FOR MEDICOS AND PARAMEDICOS (PGDYTMP)",
      "Diploma in Yoga Science (D.Y.Sc.) for Graduates",
      "DIPLOMA IN YOGA THERAPY (DYT)",
      "DIPLOMA IN SPORTS COACHING – YOGASANA (D.S.C) For Graduates (One –Year Duration & One Month Internship)",
      "Diploma in Meditation",
    ],
    Graduation: ["Bachelors of Science in Yoga"],
    "Post Graduation": ["Master of Science in Yoga"],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading1(true);
        const res = await dispatch(getInstructor());
        setData(res.data.qualifications);
      } finally {
        setLoading1(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const toggleQualificationFields = () => {
    setShowQualificationFields(!showQualificationFields);
  };

  const editChange = (data) => {
    // console.log(data);
    setId(data.id);
    setEditQualification(!editQualification);
    editForm.setFieldsValue({
      courseType: data.courseType,
      course: data.course,
      universityOrInstitutes: data.university_institute_name,
      year: data.year,
      format: data.marksType,
      percentage: data.marks,
      CGPA: data.marks,
      certificationNumber: data.certificationNumber,
    });
  };

  const onEditImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      const fileName = event.target.files[0];
      setEditImage(fileName);
    }
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const fileName = event.target.files[0];
      setImage(fileName);
    }
  };

  const handleFormatChange = (value) => {
    setSelectedFormat(value);
  };

  const handleEditFormat = (value) => {
    setEditFormat(value);
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("courseType", values.courseType);
      formData.append("course", values.course);
      formData.append("qualificationFile", image);
      formData.append(
        "university_institute_name",
        values.universityOrInstitutes
      );
      formData.append("year", values.year);
      formData.append("marksType", values.format);
      formData.append("certificationNumber", values.certificationNumber);
      if (values.format === "Percentage") {
        formData.append("marks", values.percentage);
      } else if (values.format === "CGPA") {
        formData.append("marks", values.cgpa);
      }

      const res = await dispatch(addInstructorQualification(formData));
      if (res.success) {
        message.success(res.message);
        form.resetFields();
        setImage(null);
        setShowQualificationFields(false); // Hide fields after successful submission
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

  const handleUpdate = async (values) => {
    try {
      setEditLoading(true);
      const formData = new FormData();
      formData.append("courseType", values.courseType);
      formData.append("course", values.course);
      formData.append("qualificationFile", editImage);
      formData.append(
        "university_institute_name",
        values.universityOrInstitutes
      );
      formData.append("year", values.year);
      formData.append("marksType", values.format);
      formData.append("certificationNumber", values.certificationNumber);
      if (values.format === "Percentage") {
        formData.append("marks", values.percentage);
      } else if (values.format === "CGPA") {
        formData.append("marks", values.cgpa);
      }
      formData.append("id", id);

      const res = await dispatch(updateInstructorQualification(formData));
      if (res.success) {
        message.success(res.message);
        editForm.resetFields();
        setEditImage(null);
        setEditQualification(false);
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

  const handleDelete = (id) => {
    console.log(`Qualification ${id} is clicked for delete`);
    dispatch(deleteInstructorQualification(id)).then((res) => {
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
  };

  const handleCourseTypeChange = (value) => {
    setSelectedCourseType(value);
  };
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold  text-lg text-gray-800 font-poppins">
           Qualification
        </h2>
        <Breadcrumb className="font-poppins">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Qualification</Breadcrumb.Item>
        </Breadcrumb>
      </div>
     
        {showQualificationFields && (
          <div className="bg-white rounded-lg p-6 shadow-md mt-3">
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Row gutter={[16, 16]}>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  label="Course Type"
                  name="courseType"
                  rules={[
                    {
                      required: true,
                      message: "Please select course type!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select Course Type"
                    onChange={handleCourseTypeChange}
                    className="font-poppins"
                    dropdownClassName="font-poppins"
                  >
                    {Object.keys(availableCourses).map((courseType) => (
                      <Option key={courseType} value={courseType}>
                        {courseType}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  label="Course"
                  name="course"
                  rules={[
                    {
                      required: true,
                      message: "Please select course!",
                    },
                  ]}
                >
                  <Select placeholder="Select Course" 
                     className="font-poppins"
                    dropdownClassName="font-poppins">
                    {selectedCourseType &&
                      availableCourses[selectedCourseType].map((course) => (
                        <Option key={course} value={course}>
                          {course}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  label="University / Institutes"
                  name="universityOrInstitutes"
                  rules={[
                    {
                      required: true,
                      message: "Please select University / Institute!",
                    },
                  ]}
                >
                  <Select placeholder="Select University / Institutes" 
                     className="font-poppins"
                    dropdownClassName="font-poppins">
                    <Option value="SwaastikYogSchool">
                      Swaastik Yog School
                    </Option>
                    <Option value="YogaInstitute">Yoga Institute</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  name="documents"
                  label="Upload Documents"
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
                  label="Duration"
                  name="year"
                  rules={[
                    {
                      required: true,
                      message: "Please select duration!",
                    },
                  ]}
                >
                  <Select placeholder="Select Duration"   
                   className="font-poppins"
                    dropdownClassName="font-poppins">
                    <Option value="1 month">1 month</Option>
                    <Option value="3 months">3 months</Option>
                    <Option value="6 months">6 months</Option>
                    <Option value="1 year">1 Year</Option>
                    <Option value="2 year">2 Year</Option>
                    <Option value="3 year">3 Year</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  label="Format"
                  name="format"
                  rules={[
                    {
                      required: true,
                      message: "Please select format!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select Format"
                    onChange={handleFormatChange}
                    className="font-poppins"
                    dropdownClassName="font-poppins"
                  >
                    <Option value="Percentage">Percentage(%)</Option>
                    <Option value="CGPA">CGPA</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  label="Certification Number"
                  name="certificationNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please enter certification number!",
                    },
                  ]}
                >
                  <Input placeholder="Enter Certification Number" />
                </Form.Item>
              </Col>
              {selectedFormat === "Percentage" && (
                <Col lg={12} sm={24} xs={24}>
                  <Form.Item
                    label="Percentage"
                    name="percentage"
                    rules={[
                      {
                        required: true,
                        message: "Please enter percentage!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter Percentage" />
                  </Form.Item>
                </Col>
              )}
              {selectedFormat === "CGPA" && (
                <Col lg={12} sm={24} xs={24}>
                  <Form.Item
                    label="CGPA"
                    name="cgpa"
                    rules={[
                      {
                        required: true,
                        message: "Please enter CGPA!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter CGPA" />
                  </Form.Item>
                </Col>
              )}
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
     
     

      <div>
        {editQualification && (
          <div className="bg-white rounded-lg p-6 shadow-md mt-3">
          <Form form={editForm} onFinish={handleUpdate} layout="vertical">
            <Row gutter={[16, 16]}>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  label="Course Type"
                  name="courseType"
                  rules={[
                    {
                      required: true,
                      message: "Please select course type!",
                    },
                  ]}
                >
                 <Select
                    placeholder="Select Course Type"
                    onChange={handleCourseTypeChange}
                    className="font-poppins"
                    dropdownClassName="font-poppins"
                  >
                    {Object.keys(availableCourses).map((courseType) => (
                      <Option key={courseType} value={courseType}>
                        {courseType}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  label="Course"
                  name="course"
                  rules={[
                    {
                      required: true,
                      message: "Please select course!",
                    },
                  ]}
                >
                  <Select placeholder="Select Course"
                     className="font-poppins"
                    dropdownClassName="font-poppins">
                    {selectedCourseType &&
                      availableCourses[selectedCourseType].map((course) => (
                        <Option key={course} value={course}>
                          {course}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  label="University / Institutes"
                  name="universityOrInstitutes"
                  rules={[
                    {
                      required: true,
                      message: "Please select University / Institute!",
                    },
                  ]}
                >
                  <Select placeholder="Select University / Institutes"
                     className="font-poppins"
                    dropdownClassName="font-poppins">
                    <Option value="SwaastikYogSchool">
                      Swaastik Yog School
                    </Option>
                    <Option value="YogaInstitute">Yoga Institute</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  name="documents"
                  label="Upload Documents"
                  rules={[{ required: true, message: "Please select image" }]}
                >
                  <Input
                    type="file"
                    onChange={onEditImage}
                    className="filetype"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  label="Duration"
                  name="year"
                  rules={[
                    {
                      required: true,
                      message: "Please select duration!",
                    },
                  ]}
                >
                  <Select placeholder="Select Duration" 
                     className="font-poppins"
                    dropdownClassName="font-poppins">
                  <Option value="1 month">1 month</Option>
                    <Option value="3 months">3 months</Option>
                    <Option value="6 months">6 months</Option>
                    <Option value="1 year">1 Year</Option>
                    <Option value="2 year">2 Year</Option>
                    <Option value="3 year">3 Year</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  label="Format"
                  name="format"
                  rules={[
                    {
                      required: true,
                      message: "Please select format!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select Format"
                    onChange={handleEditFormat}
                    className="font-poppins"
                    dropdownClassName="font-poppins"
                  >
                    <Option value="Percentage">Percentage(%)</Option>
                    <Option value="CGPA">CGPA</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  label="Certification Number"
                  name="certificationNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please enter certification number!",
                    },
                  ]}
                >
                  <Input placeholder="Enter Certification Number" />
                </Form.Item>
              </Col>
              {editFormat === "Percentage" && (
                <Col lg={12} sm={24} xs={24}>
                  <Form.Item
                    label="Percentage"
                    name="percentage"
                    rules={[
                      {
                        required: true,
                        message: "Please enter percentage!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter Percentage" />
                  </Form.Item>
                </Col>
              )}
              {editFormat === "CGPA" && (
                <Col lg={12} sm={24} xs={24}>
                  <Form.Item
                    label="CGPA"
                    name="cgpa"
                    rules={[
                      {
                        required: true,
                        message: "Please enter CGPA!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter CGPA" />
                  </Form.Item>
                </Col>
              )}
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
      </div>

      <div className="p-8">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={8}>
            {data.map((data) => (
              <div
                className={`mb-4 ${
                  showQualificationFields || editQualification ? "hidden" : ""
                }`}
                key={data.id}
              >
                <div
                  className="relative grid h-[20rem] w-full max-w-[28rem] flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700"
                  style={{
                    backgroundImage: `url(${people})`,
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
                    <CloseCircleOutlined
                      style={{ color: "#fff" }}
                      onClick={(event) => {
                        event.stopPropagation(); // Prevent parent link from triggering
                        handleDelete(data.id);
                      }}
                    />
                  </div>
                  <div className="relative p-6 px-6 py-14 md:px-12">
                    <h2 className="mb-1 block font-poppins text-xl font-medium leading-[1.5] tracking-normal text-white antialiased">
                      {data.course}
                    </h2>
                    <p className="mb-6 block font-poppins text-sm leading-[1.5] tracking-normal text-white antialiased">
                      {data.university_institute_name}
                    </p>
                    <Space>
                      <Button
                        onClick={(event) => {
                          event.stopPropagation(); // Prevent parent link from triggering
                          editChange(data);
                        }}
                        className="custom-btn"
                      >
                        Edit
                      </Button>
                      <Link to={`/qualification/${data.id}`} key={data.id}>
                        <Button className="custom-btn">View Details</Button>
                      </Link>
                    </Space>
                  </div>
                </div>
              </div>
            ))}
          </Col>

          {/* Add Qualification card */}
          <Col xs={24} sm={12} md={8} lg={8}>
            <div
              className={`mb-4 ${
                showQualificationFields || editQualification ? "hidden" : ""
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
                      onClick={toggleQualificationFields}
                      className="custom-btn"
                    >
                      Add Qualification
                    </Button>
                  </h2>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Qualification;
