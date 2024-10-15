// import React, { useState, useEffect } from "react";
// import { Card, Statistic, Row, Col, Breadcrumb,message } from "antd";
// import { useDispatch} from 'react-redux';
// import { Chart } from "chart.js/auto";
// import { getTotalCourse } from "../../../actions/admin/dashboard/dashboard";

// const Dashboard = () => {
//   const dispatch=useDispatch();
//   const [engagementData, setEngagementData] = useState({
//     totalStudents: 1000,
//     verifiedInstructors: 750,
//     verificationCourses: 500,
//   });

//   const [completionData, setCompletionData] = useState({
//     totalInstructors: 300,
//     totalCourses: 60,
//     pendingInstructors: 50,
//     pendingCourses: 80,
//   });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const res = await dispatch(getTotalCourse());
//         setCompletionData((prevData) => ({
//           ...prevData,
//           totalCourses: res.data,
//         }));
//       } catch (error) {
//         console.error("Error fetching coupons:", error);
//         message.error("Failed to fetch coupons. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [dispatch]);

//   useEffect(() => {
//     const fetchData = () => {
//       // Simulate delay for API call
//       setTimeout(() => {
//         setEngagementData({
//           totalStudents: 1200,
//           verifiedInstructors: 800,
//           verificationCourses: 550,
//         });

//         setCompletionData({
//           totalInstructors: 320,
//           totalCourses: 70,
//           pendingInstructors: 60,
//           pendingCourses: 90,
//         });

//         updateCharts();
//       }, 1000); // Simulate a delay of 1 second
//     };

//     // Fetch data when the component mounts
//     fetchData();
//   }, []);

//   const chartRefs = {
//     totalInstructors: React.createRef(),
//     totalStudents: React.createRef(),
//     totalCourses: React.createRef(),
//     verifiedInstructors: React.createRef(),
//     verificationCourses: React.createRef(),
//     pendingInstructors: React.createRef(),
//     pendingCourses: React.createRef(),
//   };

//   const updateChart = (chartName, currentValue, yesterdayValue) => {
//     const chartRef = chartRefs[chartName].current;
//     const changePercentage =
//       ((currentValue - yesterdayValue) / yesterdayValue) * 100;

//     if (chartRef) {
//       // Check if a chart instance already exists
//       if (chartRef.chart) {
//         // Destroy the existing chart instance
//         chartRef.chart.destroy();
//       }
//       const ctx = chartRef.getContext("2d");
//       const chartData = {
//         labels: ["Yesterday", "Today"],
//         datasets: [
//           {
//             label: "Percentage Change",
//             data: [yesterdayValue, currentValue],
//             backgroundColor: [
//               "rgba(255, 99, 132, 0.2)",
//               "rgba(144, 238, 144, 0.2)",
//             ],
//             borderColor: ["rgba(255, 99, 132, 1)", "rgba(144, 238, 144, 1)"],
//             borderWidth: 1,
//           },
//         ],
//       };

//       // Define the options separately
//       const chartOptions = {
//         scales: {
//           y: {
//             beginAtZero: true,
//           },
//         },
//         plugins: {
//           legend: {
//             labels: {
//               font: {
//                 family: "Poppins",
//               },
//             },
//           },
//         },
//       };

//       // Create a new Chart instance
//       chartRef.chart = new Chart(ctx, {
//         type: "bar",
//         data: chartData,
//         options: chartOptions,
//       });
//     }
//   };

//   const updateCharts = () => {
//     updateChart("totalInstructors", completionData.totalInstructors, 300);
//     updateChart("totalStudents", engagementData.totalStudents, 1000);
//     updateChart("totalCourses", completionData.totalCourses, 60);
//     updateChart("verifiedInstructors", engagementData.verifiedInstructors, 750);
//     updateChart("verificationCourses", engagementData.verificationCourses, 500);
//     updateChart("pendingInstructors", completionData.pendingInstructors, 50);
//     updateChart("pendingCourses", completionData.pendingCourses, 80);
//   };

//   const getColorForCard = (index) => {
//     const colors = [
//       "bg-green-50",
//       "bg-red-50",
//       "bg-amber-50",
//       "bg-amber-50",
//       "bg-blue-50",
//       "bg-yellow-50",
//       "bg-amber-50",
//       "bg-red-50",
//     ];
//     return colors[index];
//   };

//   const renderStatisticCard = (title, value, chartRef, index) => (
//     <Col lg={8} sm={24} xs={24} key={title}>
//       <Card className={getColorForCard(index)}>
//         <Statistic className="font-poppins" title={title} value={value} />
//         <canvas ref={chartRef} />
//       </Card>
//     </Col>
//   );

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center">
//         <h2 className="text-lg font-semibold text-gray-800 font-poppins">
//           Dashboard
//         </h2>
//         <Breadcrumb className="font-poppins">
//           <Breadcrumb.Item>Home</Breadcrumb.Item>
//           <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
//         </Breadcrumb>
//       </div>
//       <div className="bg-white rounded-lg p-6 shadow-md mt-3">
//         <Row gutter={[16, 16]}>
//           {["Total Instructor", "Total Students", "Total Studios"].map(
//             (title, index) =>
//               renderStatisticCard(
//                 title,
//                 index === 0
//                   ? completionData.totalInstructors
//                   : index === 1
//                   ? engagementData.totalStudents
//                   : completionData.totalCourses,
//                 chartRefs[
//                   index === 0
//                     ? "totalInstructors"
//                     : index === 1
//                     ? "totalStudents"
//                     : "totalCourses"
//                 ],
//                 index
//               )
//           )}
//         </Row>
//         <Row gutter={[16, 16]} className="mt-5">
//           {[
//             "Verified Instructor",
//             "Verification Courses",
//             "Pending Instructors",
//           ].map((title, index) =>
//             renderStatisticCard(
//               title,
//               index === 0
//                 ? engagementData.verifiedInstructors
//                 : index === 1
//                 ? engagementData.verificationCourses
//                 : completionData.pendingInstructors,
//               chartRefs[
//                 index === 0
//                   ? "verifiedInstructors"
//                   : index === 1
//                   ? "verificationCourses"
//                   : "pendingInstructors"
//               ],
//               index
//             )
//           )}
//         </Row>
//         <Row gutter={[16, 16]} className="mt-5">
//           {["Pending Courses"].map((title, index) =>
//             renderStatisticCard(
//               title,
//               completionData.pendingCourses,
//               chartRefs["pendingCourses"],
//               index
//             )
//           )}
//         </Row>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import { Card, Statistic, Breadcrumb, message } from "antd";
import { useDispatch } from "react-redux";
import {
  getATotalStudent,
  getDraftCourse,
  getPendingCourse,
  getPublishedCourse,
  getTotalCourse,
  getTotalInstructor,
  getVerifiedCourse,
} from "../../../actions/admin/dashboard/dashboard";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [totalCourse, setTotalCourse] = useState("");
  const [draftCourse, setDraftCourse] = useState("");
  const [pendingCourse, setPendingCourse] = useState("");
  const [student, setStudent] = useState("");
  const [instructor, setInstructor] = useState("");
  const [verifiedCourse, setVerifiedCourse] = useState("");
  const [publishedCourse, setPublishedCourse] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getTotalCourse());
        setTotalCourse(res.data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
        message.error("Failed to fetch coupons. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getDraftCourse());
        setDraftCourse(res.data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
        message.error("Failed to fetch coupons. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getPendingCourse());
        setPendingCourse(res.data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
        message.error("Failed to fetch coupons. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getATotalStudent());
        setStudent(res.data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
        message.error("Failed to fetch coupons. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getVerifiedCourse());
        setVerifiedCourse(res.data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
        message.error("Failed to fetch coupons. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getPublishedCourse());
        setPublishedCourse(res.data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
        message.error("Failed to fetch coupons. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getTotalInstructor());
        setInstructor(res.data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
        message.error("Failed to fetch coupons. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800 font-poppins">
          Dashboard
        </h2>
        <Breadcrumb className="font-poppins">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="bg-white rounded-lg p-6 shadow-md mt-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <Card>
              <Statistic title="Total Draft Course" value={draftCourse} />
            </Card>
          </div>
          <div>
            <Card>
              <Statistic title="Total Pending Course" value={pendingCourse} />
            </Card>
          </div>
          <div>
            <Card>
              <Statistic title="Total Courses" value={totalCourse} />
            </Card>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <div>
            <Card>
              <Statistic title="Total Verified Course" value={verifiedCourse} />
            </Card>
          </div>
          <div>
            <Card>
              <Statistic
                title="Total Published Course"
                value={publishedCourse}
              />
            </Card>
          </div>
          <div>
            <Card>
              <Statistic title="Total Students" value={student} />
            </Card>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <div>
            <Card>
              <Statistic title="Total Instructor" value={instructor} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
