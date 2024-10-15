import React, { useState } from "react";
import { Breadcrumb, Button, Space, Table, Tag, Modal } from "antd";

const Moderation = () => {
  const initialContentList = [
    { id: 1, text: "This is a great post!", status: "approved" },
    { id: 2, text: "I disagree with this article.", status: "pending" },
    { id: 3, text: "Nice work!", status: "approved" },
    { id: 4, text: "Spammy content here!", status: "pending" },
  ];

  const [contentList, setContentList] = useState(initialContentList);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModeration = (contentId, action) => {
    setContentList((prevContentList) =>
      prevContentList.map((content) =>
        content.id === contentId ? { ...content, status: action } : content
      )
    );
  };

  const validateContent = (content) => {
    const offensiveWords = ["offensive", "inappropriate", "spam"];
    const containsOffensiveWord = offensiveWords.some((word) =>
      content.text.toLowerCase().includes(word)
    );
    return !containsOffensiveWord;
  };

  const handleApproval = (record) => {
    if (validateContent(record)) {
      handleModeration(record.id, "approved");
    } else {
      // Display the modal when the content violates guidelines
      showModal();
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "SNo",
      dataIndex: "index",
      key: "index",
      className:'font-poppins',
      render: (text, record, index) => index + 1,
    },
    {
      title: "Comment",
      dataIndex: "text",
      key: "text",
      className:'font-poppins'
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      className:'font-poppins',
      render: (status) => (
        <Tag color={status === "approved" ? "green" : "orange"}  className='font-poppins'>{status}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      className:'font-poppins',
      render: (text, record) => (
        <span>
          {record.status === "pending" && (
            <Space>
              <Button
                className="border-green-800 text-green-800 font-poppins"
                onClick={() => handleApproval(record)}
              >
                Approve
              </Button>
              <Button
                className="border-red-500 text-red-500 font-poppins"
                onClick={() => handleModeration(record.id, "rejected")}
              >
                Reject
              </Button>
            </Space>
          )}
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center pt-5 pl-5 pr-5 pb-3">
        <h2 className="text-lg font-semibold text-gray-800 font-poppins">
          Content Moderation
        </h2>
        <Breadcrumb className="font-poppins">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Content Moderation</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="bg-white rounded-lg p-6 shadow-md m-5">
        <div style={{ overflowX: "auto" }}>
          <Table dataSource={contentList} columns={columns} rowKey="id" />
        </div>
      </div>

      <Modal
      className="font-poppins"
        title="Content Violation"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          style: { backgroundColor: "#1b2910", color: "white" },
        }}
      >
        <p className="font-poppins">
          This content violates community guidelines. Please take appropriate
          action.
        </p>
      </Modal>
    </div>
  );
};

export default Moderation;
