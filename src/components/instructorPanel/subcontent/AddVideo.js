import React, { useState } from "react";
import { Button, Row, Col, Form, Input, Breadcrumb, message } from "antd";
import { addInstructorVideo } from "../../../actions/instructor/content/content";
import { useDispatch } from "react-redux";

const AddVideo = (props) => {
  const { id } = props;
  const dispatch=useDispatch();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  console.log(id)

  const onFinish = async (values) => {
    if(!id){
      return
    }
    try {
      setLoading(true);
      const data = { id, ...values };
      const res = await dispatch(addInstructorVideo(data));
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

  const validateVideoLink = (_, value) => {
    // Regular expressions to match various video URL patterns
    const youtubePattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})$/i;
    const vimeoPattern = /^(https?:\/\/)?(www\.)?vimeo\.com\/(\d+)$/i;
    const directVideoPattern = /\.(mp4|avi|wmv|mov|flv|mkv)$/i;
  
    if (value) {
      if (value.match(youtubePattern) || value.match(vimeoPattern) || value.match(directVideoPattern)) {
        return Promise.resolve();
      } else {
        return Promise.reject("Please enter a valid video link.");
      }
    }
    return Promise.resolve();
  };
  

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold  text-lg text-gray-800 font-poppins">
            Add Video
          </h2>
          <Breadcrumb className="font-poppins">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Add Video</Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md mt-3">
          <Form
            form={form}
            name="myForm"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            onFinish={onFinish}
          >
            <Row gutter={16}>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  label="Video Name"
                  name="titleOrOriginalName"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the video name",
                    },
                  ]}
                >
                  <Input placeholder="Enter Video Name" />
                </Form.Item>
              </Col>
              <Col lg={12} sm={24} xs={24}>
                <Form.Item
                  label="Video Link / Path"
                  name="linkOrPath"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the video link / path",
                    },
                    {
                      validator: validateVideoLink,
                    },
                  ]}
                >
                  <Input placeholder="Enter Video Link / Path" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button className="custom-btn font-poppins" htmlType="submit" loading={loading}>
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AddVideo;
