import React from "react";
import { Tabs, Breadcrumb} from "antd";
import CreateCoupon from "./CreateCoupon";
import View from "./View";
import DeletedCoupon from "./DeletedCoupon";
import AddCoupon from "./AddCoupon";


const { TabPane } = Tabs;

const TabCoupon = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg  text-gray-800 font-poppins">
          Coupon
        </h2>
        <Breadcrumb className="font-poppins">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Coupon</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md mt-3">
        <div>
          <Tabs defaultActiveKey="create">
            <TabPane tab="Create" key="create">
              <CreateCoupon />
            </TabPane>
            <TabPane tab="View" key="view">
            <View />
            </TabPane>
            <TabPane tab="Deleted Coupon" key="deletedCoupon">
            <DeletedCoupon />
            </TabPane>
            <TabPane tab="Add coupon to course" key="addCouponToCourse">
         <AddCoupon />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TabCoupon;
