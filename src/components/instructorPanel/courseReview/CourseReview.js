import React, { useState, useEffect } from "react";
import { Layout, Menu, message, Dropdown, Spin, Avatar, Button,Breadcrumb,Table } from "antd";
import { Link, useParams,useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUser,
  faBookOpen,
  faEye,
  faCalendarAlt,
  faBell,
  faSignOutAlt,
  faStar
} from "@fortawesome/free-solid-svg-icons";
import {
  DownOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { LOGOUT_INSTRUCTOR } from "../../../constants/actionTypes";
import { getInstructor } from "../../../actions/instructor/register/register";
import { useDispatch } from "react-redux";
import { getICourseReview } from "../../../actions/instructor/courseReview/courseReview";
import ReviewStar from "../review/ReviewStar";

const { Sider, Content, Header } = Layout;
const { SubMenu } = Menu;

const CourseReview = () => {
  const dispatch = useDispatch();
const {id}=useParams();
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await dispatch(getInstructor());
        setData(result.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        message.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleLogout = () => {
    dispatch({ type: LOGOUT_INSTRUCTOR });
    console.log("Instructor");
    message.success("Instructor logout successfully!");
    navigate("/login_instructor");
  };

  const localhost = "http://localhost:5000";
  const userMenu = (
    <Menu className="font-poppins">
      <Menu.Item key="myProfile">My Profile</Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "SNo",
      dataIndex: "sNo",
      key: "sNo",
      className: "font-poppins",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Reviewer Name",
      dataIndex: "reviewerName",
      key: "reviewerName",
      className: "font-poppins",
    },
    {
      title: "Message",
      dataIndex: "reviewMessage",
      key: "reviewMessage",
      className: "font-poppins",
    },
    {
      title: "Rating",
      dataIndex: "reviewStar",
      key: "reviewStar",
      className: "font-poppins",
      render: (reviewStar) => <ReviewStar reviewStar={reviewStar} />, 
    },

   
  ];

  const menuItems = [
    {
      key: "1",
      label: "Dashboard",
      icon: <FontAwesomeIcon icon={faTachometerAlt} />,
      link: "/instructor/dashboard",
    },
    {
      key: "2",
      label: "My Schedule",
      icon: <FontAwesomeIcon icon={faCalendarAlt} />,
      link: "/instructor/schedule",
    },

    {
      key: "3",
      label: "My Course",
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
    {
      key: "4",
      label: "Coupon",
      icon: <FontAwesomeIcon icon={faCalendarAlt} />,
      link: "/instructor/coupon",
    },
    {
      key: "5",
      label: "Notification",
      icon: <FontAwesomeIcon icon={faBell} />,
      link: "/instructor/notification",
    },
    {
      key: "6",
      label: "Review",
      icon: <FontAwesomeIcon icon={faStar} />,
      link: "/instructor/review",
    },

    {
      key: "7",
      label: "Profile",
      icon: <FontAwesomeIcon icon={faUser} />,
      link: "/instructor/profile",
    },

    {
      key: "8",
      label: "Logout",
      icon: <FontAwesomeIcon icon={faSignOutAlt} />,
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
            onClick={item.key === "8" ? item.onClick : null}
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

  const userImage = data.imageFileName ? (
    <Avatar src={`${localhost}/files/${data.imageFileName}`} />
  ) : (
    <Avatar icon={<UserOutlined />} />
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await dispatch(getICourseReview(id));
        setReviews(result.data);
      } catch (error) {
        console.error("Error fetching review:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center align-center">
          <Spin />
        </div>
      ) : (
        <Layout style={{minHeight:"100vh"}}>
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
                {userImage}
                <div className="flex-col text-white font-poppins ml-4">
                  <h6>{data.name}</h6>
                  <h6>{data.instructorType}</h6>
                </div>
              </div>
              <Dropdown overlay={userMenu}>
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                  style={{ marginTop: "8px" }}
                >
                  <DownOutlined className="text-white" />
                </a>
              </Dropdown>
            </div>
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
            <div className="p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800 font-poppins">
                Feedback & Reviews
              </h2>
              <Breadcrumb className="font-poppins">
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Feedback & Reviews</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md mt-3">
              <Table
                dataSource={reviews}
                columns={columns}
                rowKey="id"
                loading={loading}
              />
            </div>
         
          </div>
            </Content>
          </Layout>
        </Layout>
      )}
    </>
  );
};

export default CourseReview;
