import React, { useState, useEffect } from "react";
import { Breadcrumb, Spin, message } from "antd";
import SwiperCore from "swiper/core";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import card1 from "../../../assets/card-image.jpeg";
import card2 from "../../../assets/card-image.webp";
import lesson from "../../../assets/lessons.svg";
import xp from "../../../assets/xp.svg";
import achievements from "../../../assets/achievements.svg";
import CourseCard from "./CourseCard";
import {
  getInstructorDraftCourses,
  getInstructorOngoingCourses,
  getInstructorStudent,
  getInstructorTotalCourses,
} from "../../../actions/instructor/dashboard/dashboard";
import { useDispatch } from "react-redux";
import { getInstructor } from "../../../actions/instructor/register/register";
import { getInstructorOtherCourse } from "../../../actions/instructor/course/course";
import { getINotification } from "../../../actions/instructor/notification/notification";

// Initialize Swiper modules
SwiperCore.use([Navigation, Pagination, Autoplay]);
const localhost = "http://localhost:5000";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [totalCourse, setTotalCourse] = useState("");
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(false);
  const [draftCourse, setDraftCourse] = useState([]);
  const [ongoingCourse, setOngoingCourse] = useState([]);
  const [course, setCourse] = useState([]);

  const [activeButton, setActiveButton] = useState("approved");
  const [data, setData] = useState([]);
  const [student,setStudent]=useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getINotification());
        setData(res.data);
      } catch (error) {
        // Handle the error
        console.error("Error fetching notification:", error);
        message.error(error.response.data.message);
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
        const res = await dispatch(getInstructorStudent());
        setStudent(res.data);
      } catch (error) {
        // Handle the error
        console.error("Error fetching notification:", error);
        message.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const filteredData = () => {
    switch (activeButton) {
      case "ongoing":
        return course.filter(
          (course) => course.approvalStatusByAdmin === "Pending"
        );
      case "draft":
        return course.filter((course) => course.approvalStatusByAdmin === null);
      case "approved":
        return course.filter(
          (course) => course.approvalStatusByAdmin === "Approved"
        );

      default:
        return course;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getInstructorOtherCourse());
        setCourse(res.data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
        message.error("Failed to fetch coupons. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);
  const imagesArray = [
    [`${card1}`, `${card1}`, `${card1}`],
    [`${card2}`, `${card2}`, `${card2}`],
    [`${card1}`, `${card1}`, `${card1}`],
    [`${card2}`, `${card2}`, `${card2}`],
  ];

  const headingsArray = [
    "Yoga for Wellness Instructor ",
    "Yoga Therapy Assistant ",
    "Yoga for Protocol Instructor ",
    "Foundation Course ",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getInstructorTotalCourses());
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
        const res = await dispatch(getInstructor());
        setProfile(res.data);
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
        const res = await dispatch(getInstructorDraftCourses());
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
        const res = await dispatch(getInstructorOngoingCourses());
        setOngoingCourse(res.data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
        message.error("Failed to fetch coupons. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const subheadingsArray = [
    " A basic understanding of human anatomy and physiology.",
    " A basic understanding of human anatomy and physiology.",
    " A basic understanding of human anatomy and physiology.",
    " A basic understanding of human anatomy and physiology.",
  ];

  function formatCreatedAt(createdAtString) {
    const createdAtDate = new Date(createdAtString);
    const options = { month: "long", day: "numeric", year: "numeric" };
    return createdAtDate.toLocaleDateString("en-US", options);
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold  text-lg text-gray-800 font-poppins">
          Dashboard
        </h2>
        <Breadcrumb className="font-poppins">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      {loading ? (
        <div className="flex justify-center align-center h-screen">
          <Spin />
        </div>
      ) : (
        <>
          <div className="flex flex-wrap justify-around mt-2">
            <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 p-2">
              <div className="bg-white rounded-lg shadow-md">
                <div className="flex items-center p-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mr-4">
                    <span className="ant-avatar-string">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        color="#9E49E6"
                        className="icon"
                        height="1.5em"
                        width="1.5em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M21 9h-1.42l-3.712-6.496-1.736.992L17.277 9H6.723l3.146-5.504-1.737-.992L4.42 9H3a1.001 1.001 0 0 0-.965 1.263l2.799 10.264A2.005 2.005 0 0 0 6.764 22h10.473c.898 0 1.692-.605 1.93-1.475l2.799-10.263A.998.998 0 0 0 21 9zm-3.764 11v1-1H6.764L4.31 11h15.38l-2.454 9z" />
                        <path d="M9 13h2v5H9zm4 0h2v5h-2z" />
                      </svg>
                    </span>
                  </div>
                  <div className="font-poppins">
                    <p className="text-sm text-gray-850 ">{draftCourse}</p>
                    <p className="text-sm text-gray-500">Draft Courses</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 p-2">
              <div className="bg-white rounded-lg shadow-md">
                <div className="flex items-center p-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <span className="ant-avatar-string">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        version="1"
                        viewBox="0 0 48 48"
                        enable-background="new 0 0 48 48"
                        color="#0A8FDC"
                        class="icon"
                        height="1.5em"
                        width="1.5em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g fill="#37474F">
                          <rect x="9" y="20" width="30" height="13"></rect>
                          <ellipse cx="24" cy="33" rx="15" ry="6"></ellipse>
                        </g>
                        <path
                          fill="#78909C"
                          d="M23.1,8.2L0.6,18.1c-0.8,0.4-0.8,1.5,0,1.9l22.5,9.9c0.6,0.2,1.2,0.2,1.8,0l22.5-9.9c0.8-0.4,0.8-1.5,0-1.9 L24.9,8.2C24.3,7.9,23.7,7.9,23.1,8.2z"
                        ></path>
                        <g fill="#37474F">
                          <path d="M43.2,20.4l-20-3.4c-0.5-0.1-1.1,0.3-1.2,0.8c-0.1,0.5,0.3,1.1,0.8,1.2L42,22.2V37c0,0.6,0.4,1,1,1 s1-0.4,1-1V21.4C44,20.9,43.6,20.5,43.2,20.4z"></path>
                          <circle cx="43" cy="37" r="2"></circle>
                          <path d="M46,40c0,1.7-3,6-3,6s-3-4.3-3-6s1.3-3,3-3S46,38.3,46,40z"></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                  <div className="font-poppins">
                    <p className="text-sm text-gray-850">{ongoingCourse}</p>
                    <p className="text-sm text-gray-500">Ongoing Courses</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 p-2">
              <div className="bg-white rounded-lg shadow-md">
                <div className="flex items-center p-4">
                  <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center mr-4">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      version="1"
                      viewBox="0 0 48 48"
                      enable-background="new 0 0 48 48"
                      color="#9E49E6"
                      class="icon"
                      height="1.5em"
                      width="1.5em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#5C6BC0"
                        d="M40,40c-6.9,0-16,4-16,4V22c0,0,9-4,18-4L40,40z"
                      ></path>
                      <path
                        fill="#7986CB"
                        d="M8,40c6.9,0,16,4,16,4V22c0,0-9-4-18-4L8,40z"
                      ></path>
                      <g fill="#FFB74D">
                        <circle cx="24" cy="12" r="8"></circle>
                        <path d="M41,32h1c0.6,0,1-0.4,1-1v-4c0-0.6-0.4-1-1-1h-1c-1.7,0-3,1.3-3,3v0C38,30.7,39.3,32,41,32z"></path>
                        <path d="M7,26H6c-0.6,0-1,0.4-1,1v4c0,0.6,0.4,1,1,1h1c1.7,0,3-1.3,3-3v0C10,27.3,8.7,26,7,26z"></path>
                      </g>
                    </svg>
                  </div>
                  <div className="font-poppins">
                    <p className="text-sm text-gray-850">{student}</p>
                    <p className="text-sm text-gray-500">Total Students</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 p-2">
              <div className="bg-white rounded-lg shadow-md">
                <div className="flex items-center p-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 512 512"
                      color="#49BD65"
                      class="icon"
                      height="1.5em"
                      width="1.5em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M169 57v430h78V57h-78zM25 105v190h46V105H25zm158 23h18v320h-18V128zm128.725 7.69l-45.276 8.124 61.825 344.497 45.276-8.124-61.825-344.497zM89 153v270h62V153H89zm281.502 28.68l-27.594 11.773 5.494 12.877 27.594-11.773-5.494-12.877zm12.56 29.433l-27.597 11.772 5.494 12.877 27.593-11.772-5.492-12.877zm12.555 29.434l-27.594 11.77 99.674 233.628 27.594-11.773-99.673-233.625zM25 313v30h46v-30H25zm190 7h18v128h-18V320zM25 361v126h46V361H25zm64 80v46h62v-46H89z"></path>
                    </svg>
                  </div>
                  <div className="font-poppins">
                    <p className="text-sm text-gray-850">{totalCourse}</p>
                    <p className="text-sm text-gray-500">Total Courses</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold  pl-4 pt-4 pb-2 font-poppins">
              Course in Progress
            </h2>
            <div className="flex flex-wrap justify-around">
              {imagesArray.map((images, index) => (
                <div
                  key={index}
                  className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 p-2"
                >
                  <CardWithCarousel
                    key={index}
                    images={images}
                    heading={headingsArray[index]}
                    subheading={subheadingsArray[index]}
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex flex-wrap mt-2">
              <div className="w-full sm:w-1/2 md:w-1/4 p-2">
                <div className=" bg-white p-2 rounded-lg shadow-md">
                  <h3 className="text-lg  font-poppins mb-2">My Profile</h3>
                  <div className="flex flex-col items-center mt-10">
                    <div className="w-20 h-16 bg-gray-200 rounded-full flex items-center justify-center m-4 ">
                      <img
                        src={`${localhost}/files/${profile.imageFileName}`}
                        alt={`${profile.imageOriginalName}`}
                        style={{
                          width: "100px",
                          height: "80px",
                          borderRadius: "50%",
                        }}
                      />
                    </div>

                    <p className="text-sm text-gray-800 font-poppins">
                      {profile.name}
                    </p>
                    {/* Trainer */}
                    <p className="text-sm text-gray-500 font-poppins">
                      {profile.instructorType}
                    </p>
                    <div className="mt-10">
                      <div className="flex justify-center mt-18 bg-blue-100 rounded m-4">
                        <div className="flex flex-col items-center m-2 p-2">
                          <div className=" flex items-center justify-center">
                            <img src={`${achievements}`} alt={`profile`} />
                          </div>
                          <p className="text-sm text-gray-800 font-poppins mt-2">
                            2300
                          </p>
                          <p className="text-sm text-gray-800 font-poppins mt-2">
                            Achievements
                          </p>
                        </div>
                        {/* Second container */}
                        <div className="flex flex-col items-center m-2 p-2">
                          <div className=" flex items-center justify-center">
                            <span
                              role="img"
                              aria-label="user"
                              className="anticon anticon-user mt-2"
                            >
                              <svg
                                viewBox="64 64 896 896"
                                focusable="false"
                                data-icon="user"
                                width="1.5em"
                                height="1.5em"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path>
                              </svg>
                            </span>
                          </div>
                          <p className="text-sm text-gray-800 font-poppins mt-2">
                            38
                          </p>
                          <p className="text-sm text-gray-800 font-poppins mt-2">
                            Friends
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/2 p-2">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-poppins mb-2">My Courses</h3>
                  <div className="flex flex-wrap justify-start gap-2">
                    <button
                      className={`bg-blue-500 text-white px-4 py-2 rounded-lg font-poppins ${
                        activeButton === "approved" && "bg-blue-700"
                      }`}
                      onClick={() => setActiveButton("approved")}
                    >
                      All courses
                    </button>
                    <button
                      className={`bg-blue-500 text-white px-4 py-2 rounded-lg font-poppins ${
                        activeButton === "ongoing" && "bg-blue-700"
                      }`}
                      onClick={() => setActiveButton("ongoing")}
                    >
                      Ongoing
                    </button>
                    <button
                      className={`bg-blue-500 text-white px-4 py-2 rounded-lg font-poppins ${
                        activeButton === "draft" && "bg-blue-700"
                      }`}
                      onClick={() => setActiveButton("draft")}
                    >
                      Draft
                    </button>
                  </div>
                  {filteredData().map((course, index) => (
                    <React.Fragment key={index}>
                      <CourseCard
                        index={index}
                        courseName={course.courseName}
                        imageUrl={`${localhost}/files/${course.files[0].fileName}`}
                        date={course.date}
                      />
                      {index !== filteredData().length - 1 && (
                        <hr className="border-b border-gray-300 mt-4" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/4 p-2 ">
                <div className=" bg-white p-4 rounded-lg shadow-md ">
                  <div className="flex justify-between items-center">
                    {" "}
                    <h3 className="text-lg  font-poppins mb-2">
                      Notifications
                    </h3>
                    <a href="my-notification" className="text-xs font-poppins text-gray-500">
                      See All
                    </a>
                  </div>

                  <div>
                    {data?.slice(0, 5).map((notification, index) => (
                      <div key={index} className="flex items-center mt-4">
                        <div
                          className={`bg-${
                            notification.creater === "Admin" ? "red" : "orange"
                          }-50 text-${
                            notification.creater === "Admin" ? "red" : "orange"
                          }-500 font-bold rounded-sm w-16 h-12 flex items-center justify-center font-poppins`}
                        >
                          {notification.creater === "Admin" ? "A" : "O"}
                        </div>
                        <div className="font-poppins ml-4">
                          <p className="text-xs ">
                            {notification.notification}
                          </p>
                          <p className="text-xs text-gray-500">{`${formatCreatedAt(
                            notification.createdAt
                          )}`}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const CardWithCarousel = ({ images, heading, subheading }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        loop={true}
        pagination={{ clickable: true }}
        className="rounded-t-lg"
        navigation={false}
      >
        {images.map((imageUrl, index) => (
          <SwiperSlide key={index}>
            <img src={imageUrl} alt={`Image ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div style={{ padding: "1.25rem" }}>
        <a href="#">
          <h5 className="mb-2 text-sm font-semibold  tracking-tight text-gray-600 dark:text-white font-poppins">
            {heading}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400 font-poppins">
          {subheading}
        </p>
        <div className="flex gap-4">
          <span className="indexstyled__StyledCourseCategoryBadge-gh30l8-5 bGlgjK inline-flex items-center px-3 py-1 rounded bg-blue-100">
            <img
              src={`${lesson}`}
              alt="lessons"
              className="inline-block align-middle mr-1"
            />
            <p className="text-xs font-poppins text-blue-500">14 Lessons</p>
          </span>
          <span className="indexstyled__StyledCourseCategoryBadge-gh30l8-5 bGlgjK inline-flex items-center px-3 py-1 rounded bg-orange-100">
            <img
              src={`${xp}`}
              alt="xp"
              className="inline-block align-middle mr-1"
            />
            <p className="text-xs font-poppins text-orange-500">45 xp</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
