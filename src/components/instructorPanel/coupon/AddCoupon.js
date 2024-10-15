import React, { useState, useEffect } from "react";
import { message, Form, Col, Row, Select, Button } from "antd";
import { useDispatch } from "react-redux";
import {
  addCouponToCourse,
  getInstructorCoupon,
} from "../../../actions/instructor/coupon/coupon";
import { getInstructorOtherCourse } from "../../../actions/instructor/course/course";
const { Option } = Select;

const AddCoupon = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [course, setCourse] = useState([]);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getInstructorCoupon());
        const approvedCoupons = response.data.filter(coupon => coupon.approvalStatusByAdmin === 'Approved');
        setCoupons(approvedCoupons);
      } catch (error) {
        console.error("Error fetching coupons:", error);
        message.error("Failed to fetch coupons. Please try again later.");
      }
    };
  
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dispatch(getInstructorOtherCourse("Approved"));
        setCourse(res.data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
        message.error("Failed to fetch coupons. Please try again later.");
      }
    };

    fetchData();
  }, [dispatch]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await dispatch(addCouponToCourse(values));
      if (res.success) {
        message.success(res.message);
        form.resetFields();
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.error("Error saving coupon:", error);
      message.error("Failed to save coupon. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Row gutter={[16, 16]}>
            <Col lg={12} sm={24} xs={24}>
              <Form.Item
                label="Coupon"
                name="couponId"
                rules={[
                  {
                    required: true,
                    message: "Please select course coupon!",
                  },
                ]}
              >
                <Select
                  placeholder="Select Coupon"
                  className="font-poppins"
                  dropdownClassName="font-poppins"
                >
                  {coupons?.map((coupon) => (
                    <Option key={coupon.id} value={coupon.id}>
                      {coupon.couponTitle}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col lg={12} sm={24} xs={24}>
              <Form.Item
                label="Course"
                name="id"
                rules={[
                  {
                    required: true,
                    message: "Please select Course!",
                  },
                ]}
              >
                <Select
                  placeholder="Select Course"
                  className="font-poppins"
                  dropdownClassName="font-poppins"
                >
                  {course?.map((course) => (
                    <Option key={course.id} value={course.id}>
                      {course.courseName}
                    </Option>
                  ))}
                </Select>
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

export default AddCoupon;
