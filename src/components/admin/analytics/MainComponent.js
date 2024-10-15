import React from "react";
import { Tabs, Breadcrumb } from "antd";
import Analytics from "./Analytics";
import Reports from "./Reports";

const { TabPane } = Tabs;

const MainComponent = () => {
  return (
    <div>
    
    <div className="flex justify-between items-center pl-5 pr-5 pt-5">
        <h2 className="text-lg font-semibold  text-gray-800 font-poppins">Analytics & Reporting</h2>
        <Breadcrumb className="font-poppins">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Analytics & Reporting</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md m-5">
        <div>
          <Tabs defaultActiveKey="analytics">
            <TabPane tab="Analytics" key="analytics">
            <Analytics />
            </TabPane>
            <TabPane tab="Reports" key="reports">
           <Reports />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
