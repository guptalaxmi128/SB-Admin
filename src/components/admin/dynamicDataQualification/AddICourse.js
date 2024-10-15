import React, { useState, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Breadcrumb,
  message,
  Input,
  Space,
  Tooltip,
  Table,
  Select,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getCourseType } from "../../../actions/admin/courseType/courseType";
import {
  deleteCourseDuration,
  getCourseDuration,
} from "../../../actions/admin/courseDuration/courseDuration";
import {
  addCourseDurationType,
  deleteCourseDurationType,
  getCourseDurationType,
} from "../../../actions/admin/courseDurationType/courseDurationType";
import { getParticularInstitute, getParticularUniversity } from "../../../actions/admin/university/university";

const { Option } = Select;

const AddICourse = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [courseDuration, setCourseDuration] = useState([]);
  const [courseType, setCourseType] = useState([]);
  const [institutes,setInstitutes]=useState([]);
  const coursetype = useSelector((state) => state.courseType.courseType);
  const duration = useSelector((state) => state.courseDuration.courseDuration);
  const courseDurationType = useSelector(
    (state) => state.courseDurationType.courseDurationType
  );
  const university = useSelector(
    (state) => state.university.particularUniversity
  );
 
  console.log(university);
  const [getLoading, setGetLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setGetLoading(true);
        await Promise.all([
          dispatch(getCourseType()),
          dispatch(getCourseDuration()),
          dispatch(getCourseDurationType()),
          dispatch(getParticularUniversity()),
        ]);
      } finally {
        setGetLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (coursetype && coursetype.data) {
      setCourseType(coursetype.data);
    }
  }, [coursetype]);

  useEffect(() => {
    if (duration && duration.data) {
      setCourseDuration(duration.data);
    }
  }, [duration]);

  useEffect(() => {
    if (courseDurationType && courseDurationType.data) {
      setData(courseDurationType.data);
    }
  }, [courseDurationType]);

  const columns = [
    {
      title: "SNo",
      dataIndex: "index",
      key: "index",
      align: "center",
      className: "font-poppins",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
      align: "center",
      className: "font-poppins",
    },
    {
      title: "Course Type",
      dataIndex: "courseType",
      key: "courseType",
      align: "center",
      className: "font-poppins",
    },
    {
      title: "Course Duration",
      dataIndex: "courseDuration",
      key: "courseDuration",
      align: "center",
      className: "font-poppins",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      className: "font-poppins",
      render: (text, record) => (
        <Space>
          <Tooltip title="Delete">
            <DeleteOutlined
              onClick={() => handleDelete(record.id)}
              className="text-red-500 text-lg cursor-pointer"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleDelete = (id) => {
    console.log(`Course duration type ${id} is clicked for delete`);
    dispatch(deleteCourseDurationType(id)).then((res) => {
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const courseData={
        courseDuration:values.courseDuration,
        courseType:values.courseType,
        courseName:values.courseName,
        universityId:values.instituteId
      }
      console.log(courseData)
      const res = await dispatch(addCourseDurationType(courseData));
      if (res.success) {
        message.success(res.message);
        setData([...data, { ...values }]);
        form.resetFields();
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.error("Error:", error);
      message.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleUniversityChange = async (value) => {
    try {
      setLoading(true);
      const response = await dispatch(getParticularInstitute({university_name:value}));
      console.log(response)
      if (response.success) {
        setInstitutes(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error?.response?.data?.message||"Failed to fetch institutes");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg  text-gray-800 font-poppins">
          Course
        </h2>
        <Breadcrumb className="font-poppins">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Course </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md mt-3">
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
                  className="font-poppins"
                  dropdownClassName="font-poppins"
                >
                  {courseType?.map((courseType) => (
                    <Option key={courseType.id} value={courseType.courseType}>
                      {courseType.courseType}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col lg={12} sm={24} xs={24}>
              <Form.Item
                label="Course Duration"
                name="courseDuration"
                rules={[
                  {
                    required: true,
                    message: "Please select Course duration!",
                  },
                ]}
              >
                <Select
                  placeholder="Select Course Duration"
                  className="font-poppins"
                  dropdownClassName="font-poppins"
                >
                  {courseDuration?.map((course) => (
                    <Option key={course.id} value={course.courseDuration}>
                      {course.courseDuration}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col lg={12} sm={24} xs={24}>
              <Form.Item
                label="University"
                name="university_name"
                rules={[
                  {
                    required: true,
                    message: "Please select University!",
                  },
                ]}
              >
                <Select
                  placeholder="Select University"
                  className="font-poppins"
                  dropdownClassName="font-poppins"
                  onChange={handleUniversityChange}
                >
                  {university?.data?.map((university) => (
                    <Option
                      key={university.id}
                      value={university.university_name}
                    >
                      {university.university_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
           
            <Col lg={12} sm={24} xs={24}>
              <Form.Item
                label="Institute"
                name="instituteId"
                rules={[
                  {
                    required: true,
                    message: "Please select Institute!",
                  },
                ]}
              >
                <Select
                  placeholder="Select Institute"
                  className="font-poppins"
                  dropdownClassName="font-poppins"
                >
                  {institutes?.map((institute) => (
                    <Option
                      key={institute.id}
                      value={institute.id}
                    >
                      {institute.institute_collage}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button htmlType="submit" className="custom-btn" loading={loading}>
              Save
            </Button>
          </Form.Item>
        </Form>
        <div className="mt-5">
          {data.length > 0 ? (
            <>
              <h5 className="font-poppins text-lg mb-2 ">Course List</h5>
              <div style={{ overflowX: "auto" }}>
                <Table
                  dataSource={data}
                  columns={columns}
                  loading={getLoading}
                />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AddICourse;
