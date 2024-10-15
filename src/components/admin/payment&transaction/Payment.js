import React from "react";
import { Tabs, Breadcrumb } from "antd";
import Issues from "./Issue";
import Refund from "./Refund";
import Dispute from "./Dispute";

const { TabPane } = Tabs;

const Payment = () => {
  return (
    <div>
       <div className="flex justify-between items-center pl-5 pr-5 pt-5">
        <h2 className="text-2xl text-lg font-semibold  text-gray-800 font-poppins">Payment</h2>
        <Breadcrumb className="font-poppins">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Payment</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="bg-white rounded-lg p-6 shadow-md m-5">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Payment Issues" key="1">
            <Issues />
          </TabPane>
          <TabPane tab="Refunds" key="2">
            <Refund />
          </TabPane>
          <TabPane tab="Disputes" key="3">
            <Dispute />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Payment;
