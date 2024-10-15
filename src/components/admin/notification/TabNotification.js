import React from "react";
import { Tabs, Breadcrumb } from "antd";
import Create from "./Create";
import View from "./View";

const { TabPane } = Tabs;

const TabNotification = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg  text-gray-800 font-poppins">
          Notification
        </h2>
        <Breadcrumb className="font-poppins">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item> Notification</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md mt-3">
        <div>
          <Tabs defaultActiveKey="create">
            <TabPane tab="Create" key="create">
              <Create />
            </TabPane>
            <TabPane tab="View" key="view">
              <View />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TabNotification;
