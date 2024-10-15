import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  message,
  Button,
  Dropdown,
  Avatar,
  Spin,
  Breadcrumb,
  Row,
  Col,
  Card,
} from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faInstagram,
  faTwitter,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { faUser, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import {
  BookOutlined,
  ReadOutlined,
  DashboardOutlined,
  LogoutOutlined,
  DownOutlined,
  CheckCircleOutlined,
  UserOutlined,
  TeamOutlined,
  FundProjectionScreenOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { LOGOUT_ADMIN } from "../../../constants/actionTypes";
import { useDispatch } from "react-redux";
import { getAAverageRating } from "../../../actions/admin/review/review";
import { getAdminInstructorById } from "../../../actions/admin/adminInstructor/adminInstructor";
import ReviewStar from "../../instructorPanel/review/ReviewStar";

const { Sider, Content, Header } = Layout;
const { SubMenu } = Menu;

const localhost = `http://localhost:${5000}/files`;

const InstructorProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const [review, setReview] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [experience, setExperience] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await dispatch(getAAverageRating(id));
        setReview(result.data.averageRating);
      } catch (error) {
        console.error("Error fetching review:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  console.log(review);

  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getAdminInstructorById(id));
        setData(res.data);
        setExperience(res.data.experience);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  const handleLogout = () => {
    dispatch({ type: LOGOUT_ADMIN });
    console.log("Admin");
    message.success("Admin logout successfully!");
    navigate("/");
  };

  const menuItems = [
    {
      key: "1",
      label: "Dashboard",
      icon: <DashboardOutlined />,
      link: "/admin/dashboard",
    },
    {
      key: "2",
      label: "User Management",
      icon: <BookOutlined />,
      subMenu: [
        {
          key: "2.1",
          label: "Instructor",
          link: "/admin/instructor",
          icon: <UserOutlined />,
        },
        {
          key: "2.2",
          label: "Student",
          icon: <TeamOutlined />,
          link: "/admin/student",
        },
      ],
    },

    {
      key: "3",
      label: "Course Management",
      icon: <ReadOutlined />,
      subMenu: [
        {
          key: "3.1",
          label: "Courses",
          link: "/admin/courses",
          icon: <ReadOutlined />,
        },
        {
          key: "3.2",
          label: "Instructor Course",
          icon: <FundProjectionScreenOutlined />,
          link: "/admin/view-course",
        },
      ],
    },
    {
      key: "4",
      label: "Instructor Verification",
      icon: <CheckCircleOutlined />,
      link: "/admin/instructor-verification",
    },
    {
      key: "5",
      label: "Add Category",
      icon: <PlusCircleOutlined />,
      link: "/admin/category",
    },
    {
      key: "6",
      label: "Add University",
      icon: <ReadOutlined />,
      subMenu: [
        {
          key: "6.1",
          label: "Course Type",
          link: "/admin/course-type",
          icon: <ReadOutlined />,
        },
        {
          key: "6.2",
          label: "Duration",
          icon: <FundProjectionScreenOutlined />,
          link: "/admin/duration",
        },
        {
          key: "6.3",
          label: "University",
          icon: <FundProjectionScreenOutlined />,
          link: "/admin/university",
        },
        {
          key: "6.4",
          label: "Add Course",
          icon: <FundProjectionScreenOutlined />,
          link: "/admin/course-duration-type",
        },
      ],
    },
    // {
    //   key: "6",
    //   label: "Payment & Transactions",
    //   icon: <PayCircleOutlined />,

    //   subMenu: [
    //     {
    //       key: "6.1",
    //       label: "Payment",
    //       link: "/admin/payment",
    //       icon: <DollarCircleOutlined />,
    //     },
    //     {
    //       key: "6.2",
    //       label: "Transaction",
    //       link: "/admin/transaction",
    //       icon: <TransactionOutlined />,
    //     },
    //   ],
    // },
    // {
    //   key: "7",
    //   label: "Communication",
    //   icon: <WechatOutlined />,

    //   subMenu: [
    //     {
    //       key: "7.1",
    //       label: "Notification",
    //       link: "/admin/notification",
    //       icon: <BellOutlined />,
    //     },
    //     {
    //       key: "7.2",
    //       label: "Enquires",
    //       link: "/admin/enquires",
    //       icon: <MailOutlined />,
    //     },
    //   ],
    // },

    // {
    //   key: "8",
    //   label: "Certificate Issuance",
    //   icon: <InsuranceOutlined />,
    //   link: "/admin/certificate",
    //   //   subMenu: [
    //   //     {
    //   //       key: "7.1",
    //   //       label: "Schedule Booking",
    //   //       link: "/admin/schedule-booking",
    //   //       icon: <BarsOutlined />,
    //   //     },
    //   //     {
    //   //       key: "7.2",
    //   //       label: "Schedule Call",
    //   //       link: "/admin/schedule-call",
    //   //       icon: <BarsOutlined />,
    //   //     },
    //   //     {
    //   //       key: "7.3",
    //   //       label: "My Booking",
    //   //       link: "/admin/my-booking",
    //   //       icon: <BarsOutlined />,
    //   //     },
    //   //   ],
    // },
    // {
    //   key: "9",
    //   label: "Analytics and Reporting",
    //   icon: <BarChartOutlined />,
    //   link: "/admin/analytics",
    // },
    // {
    //   key: "10",
    //   label: "Content Moderation",
    //   icon: <HistoryOutlined />,
    //   link: "/admin/content-moderation",
    // },
    // {
    //   key: "11",
    //   label: "Technical Support",
    //   icon: <CustomerServiceOutlined />,

    //   subMenu: [
    //     {
    //       key: "11.1",
    //       label: "User",
    //       link: "/admin/user-technical-issue",
    //       icon: <UserOutlined />,
    //     },
    //     {
    //       key: "11.2",
    //       label: "Instructor",
    //       link: "/admin/instructor-technical-issue",
    //       icon: <TeamOutlined />,
    //     },
    //   ],
    // },
    // {
    //   key: "12",
    //   label: "Feature Management",
    //   icon: <SwitcherOutlined />,
    //   link: "/admin/feature-management",
    // },

    // {
    //   key: "13",
    //   label: "Security & Privacy",
    //   icon: <SecurityScanOutlined />,
    //   link: "/admin/security",
    // },
    // {
    //   key: "14",
    //   label: "User Feedback & Reviews",
    //   icon: <StarOutlined />,
    //   link: "/admin/review",
    // },

    {
      key: "7",
      label: "Add Coupon",
      icon: <PlusCircleOutlined />,
      link: "/admin/coupon",
    },
    {
      key: "8",
      label: "Notification",
      icon: <PlusCircleOutlined />,
      link: "/admin/notification",
    },
    {
      key: "9",
      label: "Yoga Studio",
      icon: <PlusCircleOutlined />,
      link: "/admin/yoga-studio",
    },
    {
      key: "10",
      label: "Add Specialisation",
      icon: <ReadOutlined />,
      subMenu: [
        {
          key: "10.1",
          label: "Therapist",
          link: "/admin/therapy-specialisation",
          icon: <ReadOutlined />,
        },
        {
          key: "10.2",
          label: "Home Tutor",
          icon: <FundProjectionScreenOutlined />,
          link: "/admin/home-tutor-specialisation",
        },
      ],
    },
    {
      key: "11",
      label: "Banner",
      icon: <PlusCircleOutlined />,
      link: "/admin/banner",
    },
    {
      key: "12",
      label: "Home Tutor",
      icon: <PlusCircleOutlined />,
      link: "/admin/home-tutor",
    },
    {
      key: "13",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];
  const customMenuStyle = {
    background: "transparent",
  };

  const customMenuItemStyle = {
    color: "white",
    fontFamily: "Poppins",
    marginTop: "4px",
    fontSize: "14px",
  };

  const renderMenuItems = (items) => {
    return items.map((item) => {
      if (item.subMenu) {
        return (
          <SubMenu
            key={item.key}
            icon={item.icon}
            title={item.label}
            style={customMenuItemStyle}
          >
            {renderMenuItems(item.subMenu)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            onClick={item.key === "13" ? item.onClick : null}
            style={customMenuItemStyle}
          >
            {item.link ? (
              <Link to={item.link} style={{ textDecoration: "none" }}>
                {item.label}
              </Link>
            ) : (
              item.label
            )}
          </Menu.Item>
        );
      }
    });
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="myProfile">My Profile</Menu.Item>
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const hasUniversity = data.qualifications?.filter(
    (qualification) => qualification.university_institute_name
  );

  const renderExperience = () => {
    if (!experience) return null;

    const lastExperience = experience[experience.length - 1];
    return lastExperience;
  };

  const lastExperience = renderExperience();
  const skills = lastExperience?.skills
    ? JSON.parse(lastExperience.skills)
    : [];
  const language = data?.languages ? JSON.parse(data.languages) : [];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        width={260}
        collapsible
        collapsed={collapsed}
        trigger={null}
      >
        <div className="demo-logo-vertical" />
        <div className="flex justify-between align-center p-2">
          <div className="flex">
            <Avatar icon={<UserOutlined />} />
            <div className="flex-col text-white font-poppins ml-4">
              <h6>Username</h6>
              <h6>Trainer</h6>
            </div>
          </div>
          <Dropdown overlay={userMenu}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
              style={{ marginTop: "8px" }}
            >
              <DownOutlined style={{ color: "#fff" }} />
            </a>
          </Dropdown>
        </div>
        <Menu mode="inline" defaultSelectedKeys={["1"]} style={customMenuStyle}>
          {renderMenuItems(menuItems)}
          <div className="demo-logo-vertical" />
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ padding: 0 }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              color: "#fff",
            }}
          />
        </Header>
        <Content
          style={{
            minHeight: 280,
          }}
          className="bg-gray-50"
        >
          <div className="p-4">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold  text-lg text-gray-800 font-poppins">
                Profile
              </h2>
              <Breadcrumb className="font-poppins">
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Profile</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div className="mt-3">
              {loading ? (
                <div className="flex justify-center align-center">
                  <Spin />
                </div>
              ) : (
                <Row gutter={[16, 16]}>
                  <Col span={24} md={8}>
                    <Card className="w-full">
                      <div>
                        <img
                          src={data.imagePath}
                          // src={`${data.path}`}
                          alt={data.imageOriginalName}
                          className="rounded-md w-20 h-20 mb-4"
                        />
                        <div className="flex items-center">
                          <h3 className="text-base font-semibold font-poppins">
                            {data.name}
                          </h3>
                          &nbsp;(
                          <ReviewStar reviewStar={review} />)
                        </div>

                        {/* <div className="flex items-center">
                          <FontAwesomeIcon
                            icon={faUser}
                            className="w-3 h-3 text-gray-800 dark:text-white mr-2"
                          />
                          <p className="text-gray-500 text-sm font-poppins">
                            {data.instructorType}
                          </p>
                        </div> */}
                        {data.location ? (
                          <div className="flex items-center">
                            <FontAwesomeIcon
                              icon={faMapMarkerAlt}
                              className="w-3 h-3 text-gray-800 dark:text-white mr-2"
                            />
                            <p className="text-gray-500 text-xs font-poppins">
                              {data.location}
                            </p>
                          </div>
                        ) : null}

                        <div className="ml-1 mt-2">
                          <p className="text-gray-500 text-sm font-poppins">
                            Email Address
                          </p>
                          <p className="text-gray-800 text-xs font-poppins">
                            {data.email}
                          </p>
                        </div>

                        <div className="ml-1 mt-2">
                          <p className="text-gray-500 text-sm font-poppins">
                            Mobile Number
                          </p>
                          <p className="text-gray-800 text-xs font-poppins">
                            {data.phoneNumber}
                          </p>
                        </div>
                        <div className="ml-1 mt-2">
                          {data &&
                            (data.linkedIn ||
                              data.instagram ||
                              data.twitter_x ||
                              data.facebook) && (
                              <>
                                <p className="text-gray-500 text-sm font-poppins">
                                  Social Media
                                </p>
                                <div className="flex items-center">
                                  {data.linkedIn && (
                                    <a
                                      href={data.linkedIn}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <FontAwesomeIcon
                                        icon={faLinkedin}
                                        className="text-blue-600 mx-1"
                                        size="lg"
                                      />
                                    </a>
                                  )}
                                  {data.instagram && (
                                    <a
                                      href={data.instagram}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <FontAwesomeIcon
                                        icon={faInstagram}
                                        className="text-pink-600 mx-1"
                                        size="lg"
                                      />
                                    </a>
                                  )}
                                  {data.twitter_x && (
                                    <a
                                      href={data.twitter_x}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <FontAwesomeIcon
                                        icon={faTwitter}
                                        className="text-blue-400 mx-1"
                                        size="lg"
                                      />
                                    </a>
                                  )}
                                  {data.facebook && (
                                    <a
                                      href={data.facebook}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <FontAwesomeIcon
                                        icon={faFacebook}
                                        className="text-blue-800 mx-1"
                                        size="lg"
                                      />
                                    </a>
                                  )}
                                </div>
                              </>
                            )}
                        </div>
                      </div>
                    </Card>
                    {skills?.length > 0 && (
                      <Card className="w-full mt-4">
                        <h3 className="text-xl font-semibold font-poppins">
                          Skills
                        </h3>
                        <div className="flex flex-wrap">
                          {skills.map((skill, index) => (
                            <div
                              key={index}
                              className="bg-green-100 text-green-800 rounded-md p-2 mr-2 mb-2 font-poppins text-sm text-center"
                              style={{ minWidth: "120px" }}
                            >
                              {skill}
                            </div>
                          ))}
                        </div>
                      </Card>
                    )}
                  </Col>

                  <Col span={24} md={16}>
                    <Card className="w-full">
                      <h2
                        className="text-xl font-semibold text-gray-800 mb-4 font-poppins"
                        font-poppins
                      >
                        General Information
                      </h2>

                      {/* About Me */}
                      {data.bio && (
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold text-gray-700 font-poppins">
                            About Me
                          </h3>
                          <p className="text-gray-600 font-poppins text-sm">
                            {data.bio}
                          </p>
                        </div>
                      )}

                      {/* Education */}
                      {hasUniversity && hasUniversity?.length > 0 ? (
                        <div className="mb-4">
                          <div className="flex items-center">
                            <h3 className="text-lg font-semibold text-gray-700 font-poppins">
                              Education
                            </h3>
                          </div>
                          <p className="text-gray-600 font-poppins text-sm">
                            {hasUniversity?.map((qualification, index) =>
                              qualification.university_institute_name ? (
                                <span key={index}>
                                  {qualification.university_institute_name}
                                  {index !== hasUniversity.length - 1
                                    ? ", "
                                    : ""}
                                </span>
                              ) : null
                            )}
                          </p>
                        </div>
                      ) : null}

                      {/* Work History */}
                      {lastExperience && lastExperience?.workHistory ? (
                        <div className="mb-4">
                          <div className="flex items-center">
                            <h3 className="text-lg font-semibold text-gray-700 font-poppins">
                              Work History
                            </h3>
                          </div>
                          <p className="text-gray-600 font-poppins text-sm">
                            {lastExperience && lastExperience?.workHistory}
                          </p>
                        </div>
                      ) : null}

                      {/* Join Date, Languages, Organization, Role, Department, Birthday */}
                      <div className="grid grid-cols-2 gap-4 font-poppins">
                        {data.languages && (
                          <div>
                            <h3 className="text-lg font-semibold text-gray-700">
                              Languages
                            </h3>

                            <>
                              {language?.length > 0 && (
                                <p className="text-gray-600 font-poppins flex text-sm">
                                  {language.join(", ")}
                                </p>
                              )}
                            </>
                          </div>
                        )}

                        {lastExperience && (
                          <>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-700 font-poppins">
                                Join Date
                              </h3>
                              <p className="text-gray-600 font-poppins text-sm">
                                {lastExperience &&
                                  formatDate(lastExperience.joinDate)}
                              </p>
                            </div>

                            <div>
                              <h3 className="text-lg font-semibold text-gray-700 font-poppins">
                                Organization
                              </h3>
                              <p className="text-gray-600 font-poppins text-sm">
                                {" "}
                                {lastExperience && lastExperience.organization}
                              </p>
                            </div>

                            <div>
                              <h3 className="text-lg font-semibold text-gray-700 font-poppins">
                                Role
                              </h3>
                              <p className="text-gray-600 font-poppins text-sm">
                                {" "}
                                {lastExperience && lastExperience.role}
                              </p>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-700 font-poppins">
                                Department
                              </h3>
                              <p className="text-gray-600 font-poppins text-sm">
                                {lastExperience && lastExperience.department}
                              </p>
                            </div>
                          </>
                        )}
                        {data.dateOfBirth && (
                          <div>
                            <h3 className="text-lg font-semibold text-gray-700 font-poppins">
                              Birthday
                            </h3>
                            <p className="text-gray-600 font-poppins text-sm">
                              {formatDate(data.dateOfBirth)}
                            </p>
                          </div>
                        )}
                      </div>
                    </Card>
                  </Col>
                </Row>
              )}
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default InstructorProfile;
