import React, { useState, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Select,
  message,
  Breadcrumb,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addAdminCourse } from "../../../actions/admin/course/course";
import { getCategory } from "../../../actions/admin/category/category";

const { Option } = Select;

const Create = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [certificationType, setCertificationType] = useState(null);
  const [data, setData] = useState([]);

  const category = useSelector((state) => state.category.category);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await Promise.all([dispatch(getCategory())]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (category) {
      setData(category.data);
    }
  }, [category]);

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
      formData.append("courseName", values.courseName);
      formData.append("CourseImage", image);
      formData.append("duration", values.duration);
      formData.append("language", values.language);
      formData.append("level", values.level);
      // formData.append("TeacherImage", teacherImage);
      formData.append("coursePrice", values.coursePrice);
      formData.append("category", values.category);
      // formData.append("heading", values.heading);
      formData.append("introVideoLink", values.introVideoLink);
      formData.append("description", values.description);
      // formData.append("teacherName", values.teacherName);
      formData.append("certificationType", values.certificationType);
      if (values.certificationType === "Yes") {
        formData.append(
          "certificationFromInstitute",
          values.certificationFromInstitute
        );
      }

      const res = await dispatch(addAdminCourse(formData));
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

  const handleCertificationTypeChange = (value) => {
    setCertificationType(value);
  };

  const institutes = [
    "Morarji Desai National Institute of Yoga (Delhi)",
    "Parmarth Niketan Ashram (Uttrakhand)",
    "Phool Chatti Ashram (Uttrakhand)",
    "Yoga Niketan Ashram (Uttrakhand)",
    "The Yoga Institute (Maharashtra)",
    "Ramamani Iyengar Memorial Yoga Institute (Maharashtra)",
    "Shri Ambika Yoga Kutir (Maharashtra)",
    "Vivekananda Yoga Anusandhana Samsthana or VYASA (Karnataka)",
    "Ashtanga Yoga Research Institute (Karnataka)",
    "Krishnamacharya Yoga Mandiram (Tamil Nadu)",
    "Integral Yoga Institute (Tamil Nadu)",
    "Isha Yoga Center (Tamil Nadu)",
    "Sivananda Yoga Vedanta Dhanwantari Ashram (Kerala)",
    "Amritapuri Ashram (Kerala)",
    "Bihar School of Yoga (Bihar)",
    "Brahma Kumari Center (Rajasthan)",
    "Tourist Information Office (Assam)",
    "Department of Tourism (Pudduchery)",
    "Department of Health & Family Welfare (Odisha)",
    "Indian Institute of Yogic Science & Research (Odisha)",
    "Indian Systems of Medicine & Homeopathy (AYUSH) (Gujarat)",
    "Directorate General of Indian System of Medicine (Jammu & Kashmir)",
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold  text-gray-800 font-poppins">
          Course New Course
        </h2>
        <Breadcrumb className="font-poppins">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Course New Course</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md mt-3">
        <div>
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Row gutter={[16, 16]}>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  label="Course Name"
                  name="courseName"
                  rules={[
                    { required: true, message: "Please enter course name" },
                  ]}
                >
                  <Input placeholder="Course Name" />
                </Form.Item>
              </Col>

              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  label="Course Category"
                  name="category"
                  rules={[
                    {
                      required: true,
                      message: "Please select course category!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select Course Category"
                    className="font-poppins"
                    dropdownClassName="font-poppins"
                  >
                    {data?.map((category) => (
                      <Option key={category.id} value={category.categoryName}>
                        {category.categoryName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  name="introVideoLink"
                  label="Course Preview Link"
                  rules={[
                    {
                      required: true,
                      message: "Please enter course preview link",
                    },
                  ]}
                >
                  <Input placeholder="(eg. https://www.youtube.com/watch?v=v7AYKMP6rOE)" />
                </Form.Item>
              </Col>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  label="Language"
                  name="language"
                  rules={[
                    {
                      required: true,
                      message: "Please select language!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select Language"
                    className="font-poppins"
                    dropdownClassName="font-poppins"
                  >
                    <Option value="Hindi">Hindi</Option>
                    <Option value="English">English</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  name="coursePrice"
                  label="Course Price"
                  rules={[
                    { required: true, message: "Please enter course price!" },
                  ]}
                >
                  <Input placeholder="Course Price" type="number" />
                </Form.Item>
              </Col>

              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  name="courseImage"
                  label="Course Image"
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
                  label="Level"
                  name="level"
                  rules={[
                    {
                      required: true,
                      message: "Please select level!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select Level"
                    className="font-poppins"
                    dropdownClassName="font-poppins"
                  >
                    <Option value="Beginner">Beginner</Option>
                    <Option value="Intermediate">Intermediate</Option>
                    <Option value="Advanced">Advanced</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  name="duration"
                  label="Duration"
                  rules={[
                    { required: true, message: "Please enter duration!" },
                  ]}
                >
                  <Input placeholder="Duration" />
                </Form.Item>
              </Col>
            </Row>

            {/* <Row gutter={[16, 16]}>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  name="teacherName"
                  label="Teacher Name"
                  rules={[
                    { required: true, message: "Please enter teacher name!" },
                  ]}
                >
                  <Input placeholder="Teacher Name" />
                </Form.Item>
              </Col>

              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  name="teacherImage"
                  label="Teacher Image"
                  rules={[{ required: true, message: "Please select image" }]}
                >
                  <Input
                    type="file"
                    onChange={onTeacherImageChange}
                    className="filetype"
                  />
                </Form.Item>
              </Col>
            </Row> */}
            <Row gutter={[16, 16]}>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  name="description"
                  label="Course Description"
                  rules={[
                    {
                      required: true,
                      message: "Please enter course description",
                    },
                  ]}
                >
                  <Input.TextArea
                    placeholder="Add a course description..."
                    autoSize={{ minRows: 3 }}
                  />
                </Form.Item>
              </Col>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  label="Certification Type"
                  name="certificationType"
                  rules={[
                    {
                      required: true,
                      message: "Please select certification type",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select Certification type"
                    className="font-poppins"
                    dropdownClassName="font-poppins"
                    onChange={handleCertificationTypeChange}
                  >
                    <Option value="Yes">Yes</Option>
                    <Option value="No">No</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              {certificationType === "Yes" && (
                <Col lg={12} sm={24} xs={24}>
                  <Form.Item
                    label="Certification from Institute"
                    name="certificationFromInstitute"
                    rules={[
                      {
                        required: true,
                        message: "Please select certification from institute",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select Certification from Institute"
                      className="font-poppins"
                      dropdownClassName="font-poppins"
                    >
                      {institutes.map((institute) => (
                        <Option key={institute} value={institute}>
                          {institute}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              )}
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
      </div>
    </div>
  );
};

export default Create;
