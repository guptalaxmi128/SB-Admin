import React, { useState } from "react";
import { Layout, Menu, message, Button,Avatar,Dropdown } from "antd";
import { Link,  useNavigate, useParams } from "react-router-dom";
import {
  BookOutlined,
  ReadOutlined,
  DashboardOutlined,
  LogoutOutlined,
  CheckCircleOutlined,
  UserOutlined,
  TeamOutlined,
  FundProjectionScreenOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusCircleOutlined,
  DownOutlined
} from "@ant-design/icons";
import { LOGOUT_ADMIN } from "../../../constants/actionTypes";
import { useDispatch } from "react-redux";
import MainCurriculum from "./MainCurriculum";

const { Sider, Content,  Header } = Layout;
const { SubMenu } = Menu;

const MainLayout = () => {
    const {id}=useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

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
      <Menu.Item key="logout" onClick={handleLogout}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{minHeight:'100vh'}}>
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
          <h6 className="mt-1">Admin</h6>
          </div>
        </div>
        <Dropdown overlay={userMenu}>
          <a
            className="ant-dropdown-link"
            onClick={(e) => e.preventDefault()}
            style={{ marginTop: "8px" }}
          >
            <DownOutlined style={{color:"#fff"}} />
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
      >
          <MainCurriculum id={id} />
          </Content>
       
        </Layout>
      </Layout>
 
  );
};

export default MainLayout;
