import React, { useState } from "react";
import {
  Breadcrumb,
  Switch,
  Space,
  Button,
  Modal,
  Form,
  Input,
  message,
} from "antd";

const FeatureManagement = () => {
  const [featureList, setFeatureList] = useState([
    { id: 1, name: "Feature A", isEnabled: true },
    { id: 2, name: "Feature B", isEnabled: false },
    // Add more features as needed
  ]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [form] = Form.useForm();

  const handleSwitchChange = (featureId) => {
    setFeatureList((prevFeatures) =>
      prevFeatures.map((feature) =>
        feature.id === featureId
          ? { ...feature, isEnabled: !feature.isEnabled }
          : feature
      )
    );
  };

  const handleEditClick = (feature) => {
    setSelectedFeature(feature);
    setEditModalVisible(true);
    form.setFieldsValue({ featureName: feature.name });
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
    setSelectedFeature(null);
    form.resetFields();
  };

  const handleEditFormSubmit = (values) => {
    setFeatureList((prevFeatures) =>
      prevFeatures.map((feature) =>
        feature.id === selectedFeature.id
          ? { ...feature, name: values.featureName }
          : feature
      )
    );

    // Close the modal
    setEditModalVisible(false);
    setSelectedFeature(null);

    // Clear the form
    form.resetFields();

    // Show a success message
    message.success("Feature updated successfully!");
  };

  return (
    <div>
      <div className="flex justify-between items-center pt-5 pl-5 pr-5">
        <h2 className="text-lg font-semibold text-gray-800 font-poppins">
          Feature Management
        </h2>
        <Breadcrumb  className='font-poppins'>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Feature Management</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="bg-white rounded-lg p-6 shadow-md m-5">
        <Space direction="vertical" style={{ width: "100%" }}>
          {featureList.map((feature) => (
            <div
              key={feature.id}
              className="flex justify-between items-center mb-3 font-poppins"
            >
              <span>{feature.name}</span>
              <Switch
                checked={feature.isEnabled}
                onChange={() => handleSwitchChange(feature.id)}
                style={{
                  background: feature.isEnabled ? "#87d068" : "#f50",
                  borderColor: feature.isEnabled ? "#87d068" : "#f50",
                }}
              />
              <Button
                className="custom-btn"
                onClick={() => handleEditClick(feature)}
              >
                Edit
              </Button>
            </div>
          ))}
        </Space>
      </div>

      {/* Edit Feature Modal */}
      <Modal
       className='font-poppins'
        title="Edit Feature"
        visible={editModalVisible}
        onCancel={handleEditModalCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleEditFormSubmit}>
          <Form.Item
            name="featureName"
            rules={[
              { required: true, message: "Please enter the feature name!" },
            ]}
          >
            <Input placeholder="Feature Name" />
          </Form.Item>
          <Form.Item>
            <Button className="custom-btn" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FeatureManagement;
