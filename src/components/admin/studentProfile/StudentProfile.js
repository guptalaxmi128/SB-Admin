import React from "react";
import { Layout, Menu, Breadcrumb, Row, Col, Card } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  BookOutlined,
  ReadOutlined,
  DashboardOutlined,
  LogoutOutlined,
  HistoryOutlined,
  PayCircleOutlined,
  CheckCircleOutlined,
  WechatOutlined,
  InsuranceOutlined,
  BarChartOutlined,
  CustomerServiceOutlined,
  SwitcherOutlined,
  SecurityScanOutlined,
  StarOutlined,
  UserOutlined,
  TeamOutlined,
  FundProjectionScreenOutlined,
  TransactionOutlined,
  DollarCircleOutlined,
  BellOutlined,
  MailOutlined,
  IdcardOutlined,
  FileOutlined,
} from "@ant-design/icons";
import logo from "../../../assets/logo.webp";
import avtar from "../../../assets/student.webp";
// import { LOGOUT_ADMIN } from "../../../constants/actionTypes";
// import { useDispatch } from "react-redux";

const { Sider, Content, Header } = Layout;
const { SubMenu } = Menu;

const StudentProfile = () => {
  //   const dispatch=useDispatch();
  //   const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const carouselStyle = {
    // backgroundImage: `url(${backgroundImage})`,
    background: "#1b2910",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  };

  //   const handleLogout = () => {
  //     dispatch({ type: LOGOUT_ADMIN });
  //     console.log("Admin");
  //     message.success("Admin logout successfully!");
  //     navigate("/login");
  //   };

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
          link: "/admin/instructor-course",
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
      label: "Payment & Transactions",
      icon: <PayCircleOutlined />,

      subMenu: [
        {
          key: "5.1",
          label: "Payment",
          link: "/admin/payment",
          icon: <DollarCircleOutlined />,
        },
        {
          key: "5.2",
          label: "Transaction",
          link: "/admin/transaction",
          icon: <TransactionOutlined />,
        },
      ],
    },
    {
      key: "6",
      label: "Communication",
      icon: <WechatOutlined />,

      subMenu: [
        {
          key: "6.1",
          label: "Notification",
          link: "/admin/notification",
          icon: <BellOutlined />,
        },
        {
          key: "6.2",
          label: "Enquires",
          link: "/admin/enquires",
          icon: <MailOutlined />,
        },
      ],
    },

    {
      key: "7",
      label: "Certificate Issuance",
      icon: <InsuranceOutlined />,
      link: "/admin/certificate",
    },
    {
      key: "8",
      label: "Analytics and Reporting",
      icon: <BarChartOutlined />,
      link: "/admin/analytics",
    },
    {
      key: "9",
      label: "Content Moderation",
      icon: <HistoryOutlined />,
      link: "/admin/content-moderation",
    },
    {
      key: "10",
      label: "Technical Support",
      icon: <CustomerServiceOutlined />,

      subMenu: [
        {
          key: "10.1",
          label: "User",
          link: "/admin/user-technical-issue",
          icon: <UserOutlined />,
        },
        {
          key: "10.2",
          label: "Instructor",
          link: "/admin/instructor-technical-issue",
          icon: <TeamOutlined />,
        },
      ],
    },
    {
      key: "11",
      label: "Feature Management",
      icon: <SwitcherOutlined />,
      link: "/admin/feature-management",
    },

    {
      key: "12",
      label: "Security & Privacy",
      icon: <SecurityScanOutlined />,
      link: "/admin/security",
    },
    {
      key: "13",
      label: "User Feedback & Reviews",
      icon: <StarOutlined />,
      link: "/admin/review",
    },

    {
      key: "14",
      label: "Logout",
      icon: <LogoutOutlined />,
      //   onClick:handleLogout
    },
  ];

  const customMenuStyle = {
    background: "transparent",
  };

  const customMenuItemStyle = {
    color: "white",
    fontFamily: "Poppins",
    marginTop: "10px",
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
            onClick={item.key === "14" ? item.onClick : null}
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

  const experiences = [
    {
      position: "Owner",
      company: "Her Company Inc.",
      date: "March 2020 - Now",
    },
  ];

  const educations = [
    { degree: "Masters Degree", school: "Oxford", date: "March 2020 - Now" },
    { degree: "Bachelors Degree", school: "LPU", date: "March 2020 - Now" },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">
        {/* Your header content goes here */}
        <div className="logo">
          <div className="flex mt-1">
            <img
              src={logo}
              alt="Yoga Logo"
              style={{ width: "55px", height: "55px", borderRadius: "50%" }}
            />
            <h2 className="text-2xl font-semibold mt-2 ml-2 text-gray-800 text-white font-poppins">
              Yoga App
            </h2>
          </div>
        </div>
      </Header>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          width={260}
          style={carouselStyle}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={customMenuStyle}
          >
            {renderMenuItems(menuItems)}
            <div className="demo-logo-vertical" />
          </Menu>
        </Sider>

        <Layout>
          <Content className="bg-gray-50">
            <div className="flex justify-between items-center pt-5 pl-5 pr-5">
              <h2 className="text-lg font-semibold text-gray-800 font-poppins">
                Student Profile
              </h2>
              <Breadcrumb className="font-poppins">
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href="/admin/student">Student</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Student Profile</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <Row gutter={[16, 16]} className="p-5">
              <Col span={24} md={8}>
                <Card className="w-full">
                  <div>
                    <img
                      src={avtar}
                      alt="Portrait"
                      className="rounded-md w-20 h-20 mb-4"
                    />
                    <h3 className="text-xl font-semibold font-poppins">
                      John Doe
                    </h3>
                    <div className="flex items-center">
                      <svg
                        class="w-3 h-3 text-gray-800 dark:text-white mr-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M19.728 10.686c-2.38 2.256-6.153 3.381-9.875 3.381-3.722 0-7.4-1.126-9.571-3.371L0 10.437V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-7.6l-.272.286Z" />
                        <path d="m.135 7.847 1.542 1.417c3.6 3.712 12.747 3.7 16.635.01L19.605 7.9A.98.98 0 0 1 20 7.652V6a2 2 0 0 0-2-2h-3V3a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1H2a2 2 0 0 0-2 2v1.765c.047.024.092.051.135.082ZM10 10.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5ZM7 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1H7V3Z" />
                      </svg>
                      <p className="text-gray-500 text-sm font-poppins">
                        Owner at Her Company Inc
                      </p>
                    </div>

                    <div className="ml-1 mt-2">
                      <p className="text-gray-800 text-sm font-poppins">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Reprehenderit, eligendi dolorum sequi illum qui unde
                        aspernatur non deserunt
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="w-full mt-4">
                  <h3 className="text-xl font-semibold font-poppins">
                    Hobbies
                  </h3>
                  <ul className="mt-2 list-disc pl-4">
                    <li className="text-green-800 text-base font-poppins">
                      Photography
                    </li>
                    <li className="text-green-800 text-base font-poppins">
                      Painting
                    </li>
                  </ul>
                  <ul className=" list-disc pl-4">
                    <li className="text-green-800 text-base font-poppins">
                      Shopping
                    </li>
                    <li className="text-green-800 text-base font-poppins">
                      Dance
                    </li>
                  </ul>
                  <ul className=" list-disc pl-4">
                    <li className=" text-green-800 text-base font-poppins">
                      Exercise
                    </li>
                  </ul>
                </Card>
              </Col>

              <Col span={24} md={16}>
                <Card className="w-full">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 font-poppins">
                    <UserOutlined style={{ fontSize: "16px" }} /> About
                  </h2>

                  <div className="grid grid-cols-2 gap-4 font-poppins">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 font-poppins">
                        First Name
                      </h3>
                      <p className="text-gray-600 font-poppins">John</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 font-poppins">
                        Last Name
                      </h3>
                      <p className="text-gray-600 font-poppins">Doe</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 font-poppins">
                        Gender
                      </h3>
                      <p className="text-gray-600 font-poppins">Male</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-700 font-semibold font-poppins">
                        Contact No.
                      </h3>
                      <p className="text-gray-600 font-poppins">
                        +11 998001001
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm  text-gray-700 font-semibold font-poppins">
                        Current Address
                      </h3>
                      <p className="text-gray-600 font-poppins">
                        Beech Creek, PA, Pennsylvania
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm  text-gray-700 font-semibold font-poppins">
                        Permanent Address
                      </h3>
                      <p className="text-gray-600 font-poppins">
                        Arlington Heights, IL, Illinois
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm  text-gray-700 font-semibold font-poppins">
                        Email
                      </h3>
                      <p className="text-gray-600 font-poppins">
                        jane@example.com
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm  text-gray-700 font-semibold font-poppins">
                        Birthday
                      </h3>
                      <p className="text-gray-600 font-poppins">Feb 06, 1998</p>
                    </div>
                  </div>
                </Card>
                <Card className="w-full mt-4">
                  <div className="grid grid-cols-2 gap-4 font-poppins">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-700 font-poppins">
                        <FileOutlined /> Experience
                      </h3>
                      {experiences.map((experience, index) => (
                        <div key={index} className="mb-2">
                          <p className="text-gray-600 font-poppins">
                            {experience.position} at {experience.company}
                          </p>
                          <p className="text-gray-600 font-poppins">
                            {experience.date}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 font-poppins">
                        <IdcardOutlined /> Education
                      </h3>
                      {educations.map((education, index) => (
                        <div key={index} className="mb-2">
                          <p className="text-gray-600 font-poppins">
                            {education.degree} in {education.school}
                          </p>
                          <p className="text-gray-600 font-poppins">
                            {education.date}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </Content>
      
        </Layout>
      </Layout>
    </Layout>
  );
};

export default StudentProfile;
