import React from "react";
import { Tabs, Breadcrumb } from "antd";
import View from "./View";
import InstructorCourse from "../instructorCourse/InstructorCourse";
import RejectedCourse from "./RejectedCourse";
import DeletedCourse from "./DeletedCourse";

const { TabPane } = Tabs;

const Courses = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold  text-gray-800 font-poppins">
          Yoga Courses
        </h2>
        <Breadcrumb className="font-poppins">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Yoga Courses</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md mt-3">
        <Tabs defaultActiveKey="approve">
          <TabPane tab="Approved" key="approve">
            <View />
          </TabPane>
          <TabPane tab="Pending" key="pending">
            <InstructorCourse />
          </TabPane>
          <TabPane tab="Rejected" key="rejected">
            <RejectedCourse />
          </TabPane>
          <TabPane tab="Deleted Course" key="deletedCourse">
            <DeletedCourse />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Courses;
