import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  message,
  Breadcrumb,
  Spin,
  Button,
  Space,
  Timeline,
  Modal,
  Dropdown,
  Tooltip,
  Avatar
} from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  LogoutOutlined,
  DownOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faFileVideo,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import { Document, Page, pdfjs } from "react-pdf";
import { LOGOUT_INSTRUCTOR } from "../../../constants/actionTypes";
import { useDispatch } from "react-redux";
import {
  getInstructorContentById,
  instructorContentPublish,
} from "../../../actions/instructor/course/course";
import {
  contentFileSubmit,
  deleteInstructorFile,
  instructorFilePublish,
} from "../../../actions/instructor/content/content";
import { getInstructor } from "../../../actions/instructor/register/register";
import YouTubeVideo from "./YouTubeVideo";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const localhost = `http://localhost:5000`;
const { Sider, Content, Header } = Layout;
const { SubMenu } = Menu;

const SubContentPreview = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const [isContent, setIsContent] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState(null);

  const [profile, setProfile] = useState("");
  const [loadingUser, setLoadingUser] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingUser(true);
        const result = await dispatch(getInstructor());
        setProfile(result.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        message.error(error.response.data.message);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchData();
  }, [dispatch]);



 
  // console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await dispatch(getInstructorContentById(id));
        console.log(result);
        setData(result.data);
        // setExperience(result.data.experience);
      } catch (error) {
        console.error("Error fetching content files data:", error);
        message.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);


  const handleLogout = () => {
    dispatch({ type: LOGOUT_INSTRUCTOR });
    console.log("Instructor");
    message.success("Instructor logout successfully!");
    navigate("/login_instructor");
  };

  const menuItems = [
    {
      key: "1",
      label: "Add Files",
      icon: <FontAwesomeIcon icon={faFile} />,
      link: `/subcontent/${id}/add-files`,
    },
    {
      key: "2",
      label: "Add Video",
      icon: <FontAwesomeIcon icon={faFileVideo} />,
      link: `/subcontent/${id}/add-video`,
    },

    {
      key: "3",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];



  const userMenu = (
    <Menu className="font-poppins">
      <Menu.Item key="myProfile">My Profile</Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );


  


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
            onClick={item.key === "3" ? item.onClick : null}
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

  const handleFilePublish = async (fileId, isPublish) => {
    try {
      const res = await dispatch(
        instructorFilePublish({ id: fileId, isPublish: isPublish })
      );
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);
    }
  };

  const showContent = (fileId) => {
    setSelectedFileId(fileId);
    setIsContent(true);
  };

  const handleContentOk = async () => {
    if (!selectedFileId) {
      return;
    }
    if (data.approvalStatusByAdmin === null) {
      // If approvalStatusByAdmin is not null, show error message
      message.error("First submit lecture for admin review!");
      return;
    }
    console.log(id);
    try {
      const res = await dispatch(contentFileSubmit(selectedFileId));

      if (res.success) {
        message.success(res.message);
        setIsContent(false);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.error("Error occurred during lecture video review:", error);
      message.error(
        error.response.data.message ||
          "Failed to submit lecture video for review. Please try again later."
      );
    }
  };

  const handleCancelContent = () => {
    setIsContent(false);
  };

  const menu = (fileId, isPublish, handleFilePublish, handleFileDelete) => (
    <Menu>
      {isPublish ? (
        <Menu.Item key="1" onClick={() => handleFilePublish(fileId, false)}>
          <span className="text-green-800 font-poppins"> Published</span>
        </Menu.Item>
      ) : (
        <Menu.Item key="2" onClick={() => handleFilePublish(fileId, true)}>
          <span className="text-red-500 font-poppins"> Publish</span>
        </Menu.Item>
      )}
      <Menu.Item key="3" onClick={() => handleFileDelete(fileId)}>
        <span className="text-red-500 font-poppins">Delete</span>
      </Menu.Item>
    </Menu>
  );

  const handleContentPublish = async (contentId, isPublish) => {
    try {
      const res = await dispatch(
        instructorContentPublish({ id: contentId, isPublish: isPublish })
      );
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);
    }
  };

  const handleFileDelete = async (id) => {
    console.log(id);
    try {
      const res = await dispatch(deleteInstructorFile(id));
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);
    }
  };

  const userImage = profile.imageFileName ? (
    <Avatar src={`${localhost}/files/${profile.imageFileName}`} />
  ) : (
    <Avatar icon={<UserOutlined />} />
  );

  return (
    <>
      {loadingUser ? (
        <div className="flex justify-center align-center">
          <Spin />
        </div>
      ) : (
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
                {userImage}
                <div className="flex-col text-white font-poppins ml-4">
                  <h6>{profile.name}</h6>
                  <h6>{profile.instructorType}</h6>
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
                  <h2 className="font-semibold  text-lg text-gray-800 font-poppins">
                    Content Preview
                  </h2>
                  <Breadcrumb className="font-poppins">
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Content Preview</Breadcrumb.Item>
                  </Breadcrumb>
                </div>
                {loading ? (
                  <div className="flex flex-col justify-center">
                    <Spin />
                  </div>
                ) : (
                  <div className="flex align-center justify-between">
                    <div className="bg-white rounded-lg  p-6 shadow-md mt-3 w-full lg:w-8/12 ">
                      <div className="flex flex-row justify-between items-center w-full ">
                        <h2 className=" text-lg font-poppins">{data?.title}</h2>
                        <Space>
                          {data.approvalStatusByAdmin !== "Pending" &&
                            !data.isPublish && (
                              <Tooltip title="Click to publish this lecture">
                                <Button
                                  type="default"
                                  className="mr-2 font-poppins border-red-800 text-red-800"
                                  onClick={() =>
                                    handleContentPublish(data.id, true)
                                  }
                                >
                                  Publish
                                </Button>
                              </Tooltip>
                            )}
                          {data.isPublish && (
                            <Tooltip title="Click to mark this lecture as unpublished">
                              <Button
                                type="default"
                                className="mr-2 font-poppins border-green-800 text-green-800"
                                onClick={() =>
                                  handleContentPublish(data.id, false)
                                }
                              >
                                Published
                              </Button>
                            </Tooltip>
                          )}
                        </Space>
                      </div>
                      <div className="flex flex-col mt-4 w-full">
                        {data.files?.map((file) => (
                          <div key={file.id}>
                            <div className="flex flex-col mt-5 w-full">
                              <div className="flex justify-between mt-3">
                                <p className="font-poppins">
                                  {file.titleOrOriginalName}
                                </p>
                                <Space>
                                  <div>
                                    {file.approvalStatusByAdmin === null ? (
                                      <Button
                                        type="default"
                                        className="mr-2 font-poppins"
                                        onClick={() => showContent(file.id)}
                                      >
                                        Review
                                      </Button>
                                    ) : null}
                                    <Modal
                                      title="Lecture Review"
                                      visible={isContent}
                                      onOk={handleContentOk}
                                      onCancel={handleCancelContent}
                                      okButtonProps={{
                                        className: "custom-btn",
                                      }}
                                      cancelButtonProps={{
                                        className: "font-poppins",
                                      }}
                                    >
                                      {/* Content of the modal */}
                                      <p className="font-poppins text-sm">
                                        Are you sure you want to submit this
                                        lecture content for admin review?
                                      </p>
                                      {/* You can add more content here */}
                                    </Modal>
                                    {file.approvalStatusByAdmin &&
                                    !file.isPublish ? (
                                      file.approvalStatusByAdmin ===
                                        "Pending" ||
                                      file.approvalStatusByAdmin ===
                                        "Rejected" ? (
                                        <Button
                                          type="default"
                                          className="mr-2 font-poppins border-red-800 text-red-800"
                                        >
                                          {file.approvalStatusByAdmin}
                                        </Button>
                                      ) : file.approvalStatusByAdmin ===
                                        "Approved" ? (
                                        <Button
                                          type="default"
                                          className="mr-2 font-poppins border-green-800 text-green-800"
                                        >
                                          {file.approvalStatusByAdmin}
                                        </Button>
                                      ) : null
                                    ) : null}
                                  </div>
                                  <div>
                                    <Dropdown
                                      overlay={() =>
                                        menu(
                                          file.id,
                                          file.isPublish,
                                          handleFilePublish,
                                          handleFileDelete
                                        )
                                      }
                                    >
                                      <a
                                        className="ant-dropdown-link"
                                        onClick={(e) => e.preventDefault()}
                                      >
                                        <FontAwesomeIcon
                                          icon={faEllipsisV}
                                          className="text-red-800"
                                        />
                                      </a>
                                    </Dropdown>
                                  </div>
                                </Space>
                              </div>
                            </div>
                            {file.mimeType === "application/pdf" ? (
                              <div
                                className="show-pdf-subcontainer"
                                style={{ overflow: "auto" }}
                              >
                                <Document
                                  file={`${localhost}/files/${file.fileName}`}
                                  options={{
                                    workerSrc:
                                      pdfjs.GlobalWorkerOptions.workerSrc,
                                  }}
                                >
                                  <Page
                                    pageNumber={1}
                                    renderAnnotationLayer={false}
                                    renderTextLayer={false}
                                  />
                                </Document>
                              </div>
                            ) : file.mimeType === "video" ? (
                              <div className="mt-6">
                                <YouTubeVideo videoLink={file.linkOrPath} />
                              </div>
                            ) : file.mimeType.startsWith("image/") ? (
                              <div className="mt-6">
                                <img
                                  // src={file.linkOrPath}
                                  src={`${localhost}/files/${file.fileName}`}
                                  alt={file.titleOrOriginalName}
                                />
                              </div>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-3 shadow-md lg:mt-3 w-full lg:w-4/12 sm:mt-0 ml-1">
                      <>
                        <h3 className="font-poppins text-lg m-2">Outline</h3>
                        <Timeline>
                          <Timeline.Item>
                            <h5 className="font-poppins text-base mb-2 mt-2">
                              {data?.title}
                            </h5>
                          </Timeline.Item>
                          {data?.files?.map((file) => (
                            <Timeline.Item
                              key={file.id}
                              className="font-poppins text-sm"
                            >
                              {file.titleOrOriginalName}
                            </Timeline.Item>
                          ))}
                        </Timeline>
                      </>
                    </div>
                  </div>
                )}
              </div>
            </Content>
          </Layout>
        </Layout>
      )}
    </>
  );
};

export default SubContentPreview;
