// DisputeComponent.js
import React, { useState } from 'react';
import { Table, Button, Modal, Timeline, Tag } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

const Dispute = () => {
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);

  const dummyDisputeData = [
    {
      disputeId: 1,
      user: {
        id: 101,
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
      },
      disputeReason: 'Item not as described',
      status: 'Pending',
      adminNotes: '',
      communicationHistory: [
        { sender: 'admin', message: 'Received dispute request.' },
        { sender: 'user', message: 'Item not as described. Please resolve the issue.' },
      ],
    },
    {
      disputeId: 2,
      user: {
        id: 102,
        name: 'Bob Smith',
        email: 'bob.smith@example.com',
      },
      disputeReason: 'Unauthorized transaction',
      status: 'Resolved',
      adminNotes: 'Resolved in favor of the user.',
      communicationHistory: [
        { sender: 'admin', message: 'Resolved the dispute in favor of the user.' },
        { sender: 'user', message: 'Thank you for resolving the issue.' },
      ],
    },
   
  ];

  const columns = [
    {
      title: 'Dispute ID',
      dataIndex: 'disputeId',
      key: 'disputeId',
      className: "font-poppins",
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      className: "font-poppins",
      render: (user) => <span>{user.name}</span>,
    },
    {
      title: 'Dispute Reason',
      dataIndex: 'disputeReason',
      key: 'disputeReason',
      className: "font-poppins",
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      className: "font-poppins",
      render: (status) => (
        <Tag color={status === 'Pending' ? 'orange' : status === 'Resolved' ? 'green' : 'red'}   className="font-poppins">{status}</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      className: "font-poppins",
      render: (text, record) => (
        <Button type="link" className= "font-poppins" icon={<EyeOutlined />} onClick={() => handleViewDetails(record)}>
          View Details
        </Button>
      ),
    },
  ];

  const handleViewDetails = (dispute) => {
    setSelectedDispute(dispute);
    setDetailsModalVisible(true);
  };

  const onCancelDetailsModal = () => {
    setSelectedDispute(null);
    setDetailsModalVisible(false);
  };

  const modalColumns = [
    {
      title: 'Attribute',
      dataIndex: 'attribute',
      key: 'attribute',
      className:'font-poppins'
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      className:'font-poppins'
    },
  ];

  const modalData = selectedDispute
    ? [
        { key: '1', attribute: 'Dispute ID', value: selectedDispute.disputeId },
        { key: '2', attribute: 'User', value: selectedDispute.user.name },
        { key: '3', attribute: 'Dispute Reason', value: selectedDispute.disputeReason },
        { key: '4', attribute: 'Status', value: selectedDispute.status },
      
      ]
    : [];

  return (
    <div>
     <div style={{ overflowX: "auto" }}>
      <Table dataSource={dummyDisputeData} columns={columns} />
      </div>

    
      <Modal
       className='font-poppins'
        title="Dispute Details"
        visible={detailsModalVisible}
        onCancel={onCancelDetailsModal}
        footer={[
          <Button key="back" className='font-poppins' onClick={onCancelDetailsModal}>
            Close
          </Button>
        ]}
      >
        {selectedDispute && (
          <div>
          <div style={{ overflowX: "auto" }}>
            <Table dataSource={modalData} columns={modalColumns} pagination={false} />
            </div>

          
            <h2 className="m-4 text-lg font-semibold font-poppins">Communication History</h2>

          
            <Timeline>
              {selectedDispute.communicationHistory.map((entry, index) => (
                <Timeline.Item key={index} color={entry.sender === 'admin' ? 'blue' : 'green'}>
                  <strong className='font-poppins'>{entry.sender}:</strong><p className='font-poppins'>{entry.message}</p> 
                </Timeline.Item>
              ))}
            </Timeline>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Dispute;
