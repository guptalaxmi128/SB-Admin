import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  message,
  Button,
  Dropdown,
  Avatar,
  Spin,
  Space,
  Breadcrumb,
  Row,
  Col,
  Card,
  Input,
  Table,
  Tooltip
} from "antd";
import moment from "moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  CheckOutlined,
  CloseOutlined,
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
  DeleteOutlined,
} from "@ant-design/icons";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { LOGOUT_ADMIN } from "../../constants/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteHomeTutorImage,
  deleteHomeTutorLocation,
  deleteHomeTutorSlot,
  getHomeTutorById,
  getHomeTutorDateSlot,
  getUpdationRequest,
  homeTutorUpdationStatus,
} from "../../actions/admin/homeTutor/homeTutor";

const { Sider, Content, Header } = Layout;
const { SubMenu } = Menu;

const { Search } = Input;

const ParticularHomeTutor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [tutorData, setTutorData] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading1, setLoading1] = useState(false);
  const timeSlot = useSelector((state) => state.homeTutor.slot);
  // console.log(timeSlot);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await dispatch(getHomeTutorById(id));
        // console.log(result);
        setTutorData(result.data);
      } catch (error) {
        console.error("Error fetching review:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading1(true);
        const res = await dispatch(getUpdationRequest(id));
        if (res.success) {
          setData(res.data);
        }
        // console.log(res.data);
      } catch (error) {
        console.error("Error fetching banner data:", error);
        message.error(error.response.data.message);
      } finally {
        setLoading1(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  const column = [
    {
      title: "Sno",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
      className: "font-poppins",
    },
    {
      title: "Name",
      dataIndex: "homeTutorName",
      key: "homeTutorName",
      className: "font-poppins",
      render: (text, record) => text
       
       
    
    },
    {
      title: "Group Session",
      dataIndex: "isGroupSO",
      key: "isGroupSO",
      render: (isGroupSO) => (isGroupSO ? "Yes" : "No"),
      className: "font-poppins",
    },
    {
      title: "Private Session",
      dataIndex: "isPrivateSO",
      key: "isPrivateSO",
      render: (isPrivateSO) => (isPrivateSO ? "Yes" : "No"),
      className: "font-poppins",
    },
    {
      title: "Yoga For",
      dataIndex: "yogaFor",
      key: "yogaFor",
      // render: (yogaFor) => JSON.parse(yogaFor).join(", "),
      className: "font-poppins",
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
      // render: (language) => JSON.parse(language).join(", "),
      className: "font-poppins",
    },
    {
      title: "Private Session Price (Day)",
      dataIndex: "privateSessionPrice_Day",
      key: "privateSessionPrice_Day",
      render: (price) => (price !== null ? `₹${price}` : "-"),
      className: "font-poppins",
    },
    {
      title: "Private Session Price (Month)",
      dataIndex: "privateSessionPrice_Month",
      key: "privateSessionPrice_Month",
      render: (price) => (price !== null ? `₹${price}` : "-"),
      className: "font-poppins",
    },
    {
      title: "Group Session Price (Day)",
      dataIndex: "groupSessionPrice_Day",
      key: "groupSessionPrice_Day",
      render: (price) => (price !== null ? `₹${price}` : "-"),
      className: "font-poppins",
    },
    {
      title: "Group Session Price (Month)",
      dataIndex: "groupSessionPrice_Month",
      key: "groupSessionPrice_Month",
      render: (price) => (price !== null ? `₹${price}` : "-"),
      className: "font-poppins",
    },
    {
      title: "Specialization",
      dataIndex: "specilization",
      key: "specilization",
      // render: (specilization) => JSON.parse(specilization).join(", "),
      className: "font-poppins",
    },
    {
      title: "Instructor Bio",
      dataIndex: "instructorBio",
      key: "instructorBio",
      className: "font-poppins",
    },
    {
      title: "Action",
      key: "action",
      className: "font-poppins",

      render: (text, record) => (
        <Space>
        

          <Tooltip title="Approve">
            <CheckOutlined
              className="font-poppins text-green-800"
              onClick={() => handleApprove(record.id)}
            />
          </Tooltip>
          <Tooltip title="Decline">
            <CloseOutlined
              className="font-poppins text-red-800"
              onClick={() => handleDecline(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  
  const handleApprove = (id) => {
    console.log(`Home Tutor ${id} is clicked as approve`);
    const data = { id, approvalStatusByAdmin: "Approved" };
    dispatch(homeTutorUpdationStatus(data)).then((res) => {
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
  };
  const handleDecline = (id) => {
    console.log(`Home Tutor ${id} is clicked as decline`);
    const data = { id, approvalStatusByAdmin: "Rejected" };
    dispatch(homeTutorUpdationStatus(data)).then((res) => {
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
  };
  useEffect(() => {
    if (timeSlot && timeSlot.data) {
      setTimeSlots(timeSlot.data);
    }
  }, [timeSlot]);

  // console.log(id);

  if (!tutorData) {
    return <div className="text-center text-xl mt-10">Loading...</div>;
  }

  const {
  
    homeTutorName,
    instructorBio,
    groupSessionPrice_Day,
    groupSessionPrice_Month,
    privateSessionPrice_Day,
    privateSessionPrice_Month,
    language,
    specilization,
    yogaFor,
    serviceAreas,
    images,
  } = tutorData;

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

  const handleSearch = (value) => {
    dispatch(getHomeTutorDateSlot(id, value));
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

  const columns = [
    {
      title: "Appointment Status",
      dataIndex: "appointmentStatus",
      key: "appointmentStatus",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => moment(text).format("YYYY-MM-DD"),
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Service Type",
      dataIndex: "serviceType",
      key: "serviceType",
    },
    {
      title: "Number of People",
      dataIndex: "noOfPeople",
      key: "noOfPeople",
    },

    {
      title: "Is Booked",
      dataIndex: "isBooked",
      key: "isBooked",
      render: (text) => (text ? "Yes" : "No"),
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "acton",
      className: "font-poppins",
      render: (text, record) => (
        <Space>
          <DeleteOutlined
            className="font-poppins text-red-800"
            onClick={() => handleSlotDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  const handleDelete = (id) => {
    console.log(`Service Area ${id} is clicked for delete`);
    dispatch(deleteHomeTutorLocation(id)).then((res) => {
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
  };

  const handleSlotDelete = (id) => {
    console.log(`Time slot ${id} is clicked for delete`);
    dispatch(deleteHomeTutorSlot(id)).then((res) => {
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
  };

  const handleImageDelete = (id) => {
    console.log(`Image ${id} is clicked for delete`);
    dispatch(deleteHomeTutorImage(id)).then((res) => {
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
  };

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
              <h2 className="font-semibold text-lg  text-gray-800 font-poppins">
                Home Tutor
              </h2>
              <Breadcrumb className="font-poppins">
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Home Tutor</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <Row gutter={[16, 16]}>
              <Col span={24} md={8}>
                <Card className="w-full mt-4">
                  <h1 className="text-3xl font-bold mb-4">{homeTutorName}</h1>
                  <p className="mb-6">{instructorBio}</p>
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-6">
                    <div className="p-4 border rounded">
                      <h2 className="text-xl font-semibold mb-2">
                        Group Session Prices
                      </h2>
                      <p>Day: ₹{groupSessionPrice_Day}</p>
                      <p>Month: ₹{groupSessionPrice_Month}</p>
                    </div>
                    <div className="p-4 border rounded">
                      <h2 className="text-xl font-semibold mb-2">
                        Private Session Prices
                      </h2>
                      <p>Day: ₹{privateSessionPrice_Day}</p>
                      <p>Month: ₹{privateSessionPrice_Month}</p>
                    </div>
                  </div>
                </Card>

                <Card className="w-full mt-4">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">
                      Specializations
                    </h2>
                    <ul className="list-disc list-inside">
                      {specilization.map((spec, index) => (
                        <li key={index}>{spec}</li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </Col>
              <Col span={24} md={16}>
                <Card className="w-full mt-4">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Languages</h2>
                    <ul className="list-disc list-inside">
                      {language.map((lang, index) => (
                        <li key={index}>{lang}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Yoga For</h2>
                    <ul className="list-disc list-inside">
                      {yogaFor.map((yoga, index) => (
                        <li key={index}>{yoga}</li>
                      ))}
                    </ul>
                  </div>
                  {serviceAreas?.length > 0 ? (
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold mb-2">
                        Service Areas
                      </h2>
                      {serviceAreas.map((area, index) => (
                        <ul className="list-disc list-inside">
                          <li
                            key={index}
                            className="flex justify-between items-center"
                          >
                            <p className="text-sm">{area.locationName}</p>
                            {/* <p className="text-sm">
                            Latitude: {area.latitude}, Longitude:{" "}
                            {area.longitude}
                          </p> */}
                            <DeleteOutlined
                              className="text-red-500 cursor-pointer"
                              onClick={() => handleDelete(area.id)}
                            />
                          </li>
                        </ul>
                      ))}
                    </div>
                  ) : null}
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 font-Poppins">
                      Enter a Date
                    </h2>
                    <Row gutter={[16, 16]}>
                      <Col lg={12} sm={24} xs={24}>
                        <Search
                          placeholder="Search by Date (2024-06-01)"
                          onSearch={handleSearch}
                          style={{ marginBottom: 16 }}
                        />
                      </Col>
                    </Row>
                  </div>
                  {timeSlots?.length > 0 ? (
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold mb-2">
                        Available Time Slots
                      </h2>

                      <div style={{ overflowX: "auto" }}>
                        <Table
                          dataSource={timeSlots}
                          columns={columns}
                          rowKey="id"
                          pagination={false}
                        />
                      </div>
                    </div>
                  ) : null}

                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Images</h2>
                    <ResponsiveMasonry
                      columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                    >
                      <Masonry gutter="16px">
                        {images.map((image, index) => (
                          <div key={index} className="relative">
                            <div className="h-64 overflow-hidden rounded relative">
                              <img
                                src={image.path}
                                alt={image.originalName}
                                className="w-full h-full object-cover"
                              />
                              <DeleteOutlined
                                className="absolute top-2 right-2 text-red-500 cursor-pointer"
                                onClick={() => handleImageDelete(image.id)}
                              />
                            </div>
                          </div>
                        ))}
                      </Masonry>
                    </ResponsiveMasonry>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
          {data?.length >0 ? (
            <div className="p-4">
              <div className="bg-white rounded-lg p-6 shadow-md mt-2">
                {" "}
                <div style={{ overflowX: "auto" }}>
                  <Table
                    dataSource={data}
                    columns={column}
                    loading={loading1}
                  />
                </div>
              </div>
            </div>
          ) : null}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ParticularHomeTutor;
