import React, { useState } from "react";
import { Form, Row, Col, Input, Button, DatePicker, message } from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
import { addCoupon } from "../../../actions/admin/coupon/coupon";

const CreateCoupon = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(null);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const data = {
        couponTitle: values.couponTitle,
        discountInPercent: values.discountInPercent,
        validTill: String(date),
      };

      const res = await dispatch(addCoupon(data));
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

  const disabledDate = (current) => {
    return current && current < moment().startOf("day");
  };
  return (
    <div>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={[16, 16]}>
          <Col lg={12} sm={24} xs={24}>
            <Form.Item
              label="Coupon Name"
              name="couponTitle"
              rules={[{ required: true, message: "Please enter coupon name" }]}
            >
              <Input placeholder="Coupon Name" />
            </Form.Item>
          </Col>

          <Col lg={12} sm={24} xs={24}>
            <Form.Item
              label="Discount (%)"
              name="discountInPercent"
              rules={[{ required: true, message: "Please enter discount(%)" }]}
            >
              <Input placeholder="Enter Discount(%)" type="number" />
            </Form.Item>
          </Col>
        </Row>

        <Col lg={12} sm={24} xs={24}>
          <Form.Item
            label="Valid Till"
            name="validTill"
            rules={[{ required: true, message: "Please select date!" }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              onChange={(date) => {
                  const timestamp = new Date(date).getTime();
                  const adjustedTimestamp = timestamp - 330 * 60 * 1000;
                  setDate(adjustedTimestamp);
                }}
                disabledDate={disabledDate}
            />
          </Form.Item>
        </Col>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button
            htmlType="submit"
            className=" rounded-md block custom-btn "
            loading={loading}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateCoupon;
