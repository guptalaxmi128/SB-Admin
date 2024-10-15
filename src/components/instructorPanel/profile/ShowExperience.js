import React, { useState, useEffect } from "react";
import { Layout, Menu, message, Breadcrumb, Spin } from "antd";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  // BookOutlined,
  // ReadOutlined,
  // DashboardOutlined,
  LogoutOutlined,
  // HistoryOutlined,
  // PayCircleOutlined,
  // CheckCircleOutlined,
  // WechatOutlined,
  // InsuranceOutlined,
  // BarChartOutlined,
  // CustomerServiceOutlined,
  // SwitcherOutlined,
  // SecurityScanOutlined,
  // StarOutlined,
  // UserOutlined,
  // TeamOutlined,
  // FundProjectionScreenOutlined,
  // TransactionOutlined,
  // DollarCircleOutlined,
  // BellOutlined,
  // MailOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUser,
  faBookOpen,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../../assets/logo.webp";
import document from "../../../assets/dummy.jpg";
import { LOGOUT_INSTRUCTOR } from "../../../constants/actionTypes";
import { useDispatch } from "react-redux";
import { getInstructorExpericenceById } from "../../../actions/instructor/register/register";

const { Sider, Content, Footer, Header } = Layout;
const { SubMenu } = Menu;

const ShowExperience = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const carouselStyle = {
    // backgroundImage: `url(${backgroundImage})`,
    background: "#1b2910",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  };

  const handleLogout = () => {
    dispatch({ type: LOGOUT_INSTRUCTOR });
    console.log("Instructor");
    message.success("Instructor logout successfully!");
    navigate("/login_instructor");
  };

  const menuItems = [
    {
      key: "1",
      label: "Dashboard",
      icon: <FontAwesomeIcon icon={faTachometerAlt} />,
      link: "/instructor/dashboard",
    },
    {
      key: "2",
      label: "Profile",
      icon: <FontAwesomeIcon icon={faUser} />,
      link: "/instructor/profile",
    },

    {
      key: "3",
      label: "Course",
      icon: <FontAwesomeIcon icon={faBookOpen} />,

      subMenu: [
        {
          key: "3.1",
          label: "Course New Course",
          link: "/instructor/course",
          icon: <FontAwesomeIcon icon={faBookOpen} />,
        },
        {
          key: "3.2",
          label: "View Courses",
          link: "/instructor/view",
          icon: <FontAwesomeIcon icon={faEye} />,
        },
      ],
    },
    // {
    //   key: "4",
    //   label: "Instructor Verification",
    //   icon: <CheckCircleOutlined />,
    //   link: "/admin/instructor-verification",
    // },
    // {
    //   key: "5",
    //   label: "Payment & Transactions",
    //   icon: <PayCircleOutlined />,

    //   subMenu: [
    //     {
    //       key: "5.1",
    //       label: "Payment",
    //       link: "/admin/payment",
    //       icon: <DollarCircleOutlined />,
    //     },
    //     {
    //       key: "5.2",
    //       label: "Transaction",
    //       link: "/admin/transaction",
    //       icon: <TransactionOutlined />,
    //     },
    //   ],
    // },
    // {
    //   key: "6",
    //   label: "Communication",
    //   icon: <WechatOutlined />,

    //   subMenu: [
    //     {
    //       key: "6.1",
    //       label: "Notification",
    //       link: "/admin/notification",
    //       icon: <BellOutlined />,
    //     },
    //     {
    //       key: "6.2",
    //       label: "Enquires",
    //       link: "/admin/enquires",
    //       icon: <MailOutlined />,
    //     },
    //   ],
    // },

    // {
    //   key: "7",
    //   label: "Certificate Issuance",
    //   icon: <InsuranceOutlined />,
    //   link: "/admin/certificate",

    // },
    // {
    //   key: "8",
    //   label: "Analytics and Reporting",
    //   icon: <BarChartOutlined />,
    //   link: "/admin/analytics",
    // },
    // {
    //   key: "9",
    //   label: "Content Moderation",
    //   icon: <HistoryOutlined />,
    //   link: "/admin/content-moderation",
    // },
    // {
    //   key: "10",
    //   label: "Technical Support",
    //   icon: <CustomerServiceOutlined />,

    //   subMenu: [
    //     {
    //       key: "10.1",
    //       label: "User",
    //       link: "/admin/user-technical-issue",
    //       icon: <UserOutlined />,
    //     },
    //     {
    //       key: "10.2",
    //       label: "Instructor",
    //       link: "/admin/instructor-technical-issue",
    //       icon: <TeamOutlined />,
    //     },
    //   ],
    // },
    // {
    //   key: "11",
    //   label: "Feature Management",
    //   icon: <SwitcherOutlined />,
    //   link: "/admin/feature-management",
    // },

    // {
    //   key: "12",
    //   label: "Security & Privacy",
    //   icon: <SecurityScanOutlined />,
    //   link: "/admin/security",
    // },
    // {
    //   key: "13",
    //   label: "User Feedback & Reviews",
    //   icon: <StarOutlined />,
    //   link: "/admin/review",
    // },

    {
      key: "4",
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
            onClick={item.key === "4" ? item.onClick : null}
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getInstructorExpericenceById(id));
        setData(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

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
            // defaultSelectedKeys={["1"]}
            style={customMenuStyle}
          >
            {renderMenuItems(menuItems)}
            <div className="demo-logo-vertical" />
          </Menu>
        </Sider>

        <Layout>
          {loading ? (
            <div className="flex justify-center align-center">
              <Spin />
            </div>
          ) : (
            <Content>
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold  text-lg text-gray-800 font-poppins">
                    Experience
                  </h2>
                  <Breadcrumb className="font-poppins">
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Experience</Breadcrumb.Item>
                  </Breadcrumb>
                </div>

                <div className="bg-white rounded-lg  shadow-md mt-5">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-4 md:col-span-1">
                      <img
                        className="w-full h-full object-cover rounded-lg"
                        src={document}
                        alt="Cover"
                      />
                    </div>
                    <div className="col-span-4 md:col-span-3 p-6">
                      <div className="grid grid-cols-6 gap-4">
                        <div className="col-span-6 md:col-span-4">
                          <h1 className="text-lg font-poppins font-semibold">
                            {data.organization}{" "}
                            <span className="text-xs text-slate-500 font-poppins pt-2">{`(${data.role})`}</span>
                          </h1>
                          <p className="text-sm text-slate-500 font-poppins pt-2">
                            Work History - {data.workHistory}
                          </p>
                          <h1 className="text-sm font-poppins font-semibold pt-2">
                            Department -
                            <span className="text-xs text-slate-500 font-poppins">
                              {data.department}
                            </span>
                          </h1>
                        </div>
                        <div className="col-span-6 md:col-span-2">
                          <p className="text-sm text-slate-900 font-poppins">
                            Join Date - {formatDate(data.joinDate)}
                          </p>
                        </div>
                      </div>
                      {data.skills && data.skills.length > 0 && (
                        <>
                          <h3 className="text-xl font-semibold font-poppins pt-5">
                            Skills
                          </h3>
                          <div className="flex flex-wrap">
                          {data.skills.map((skill, index) => (
                          
                              <p
                                key={index}
                                className="text-green-800 text-sm mt-1 mr-2 font-poppins"
                              >
                                {index !== 0 && ", "}{" "}
                       
                                {skill}
                              </p>
                        
                          ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Content>
          )}

          {/* <Footer className="text-center font-poppins">Yoga App</Footer> */}
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ShowExperience;
