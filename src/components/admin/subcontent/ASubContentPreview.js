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
  Dropdown,
  Avatar,
} from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import {
  LogoutOutlined,
  UserOutlined,
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faFileVideo,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import { LOGOUT_ADMIN } from "../../../constants/actionTypes";
import { useDispatch } from "react-redux";
import {
  deleteFile,
  filePublish,
  fileStatus,
  getContentById,
} from "../../../actions/admin/content/content";
import YouTubeVideo from "../../instructorPanel/subcontent/YouTubeVideo";

const { Sider, Content, Header } = Layout;
const { SubMenu } = Menu;

const localhost = `http://localhost:5000`;
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const ASubContentPreview = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    dispatch({ type: LOGOUT_ADMIN });
    console.log("Admin");
    message.success("Admin logout successfully!");
    navigate("/");
  };
  // console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await dispatch(getContentById(id));
        console.log(result);
        setData(result.data);
      } catch (error) {
        console.error("Error fetching content files data:", error);
        message.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  const handleApprove = (id) => {
    console.log(`File ${id} is clicked as approve`);
    const data = { id, approvalStatusByAdmin: "Approved" };
    dispatch(fileStatus(data)).then((res) => {
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
  };

  const handleDecline = (id) => {
    console.log(`File ${id} is clicked as decline`);
    const data = { id, approvalStatusByAdmin: "Rejected" };
    dispatch(fileStatus(data)).then((res) => {
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
  };

  const menuItems = [
    {
      key: "1",
      label: "Add Files",
      icon: <FontAwesomeIcon icon={faFile} />,
      link: `/lecture/${id}/add-files`,
    },
    {
      key: "2",
      label: "Add Video",
      icon: <FontAwesomeIcon icon={faFileVideo} />,
      link: `/lecture/${id}/add-video`,
    },

    {
      key: "3",
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

  const handleFilePublish = async (fileId, isPublish) => {
    try {
      const res = await dispatch(
        filePublish({ id: fileId, isPublish: isPublish })
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

  const handleFileDelete = async (id) => {
    console.log(id);
    try {
      const res = await dispatch(deleteFile(id));
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

  const userMenu = (
    <Menu>
      <Menu.Item key="myProfile">My Profile</Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
    {data && data.creater === "Admin" && (
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
              <DownOutlined style={{ color: "#fff" }} />
            </a>
          </Dropdown>
        </div>
        <Menu mode="inline" defaultSelectedKeys={["1"]} style={customMenuStyle}>
          {renderMenuItems(menuItems)}
          <div className="demo-logo-vertical" />
        </Menu>
      </Sider>
    )}
      <Layout>
        <Header style={{ padding: 0 }}>
        {data && data.creater === "Admin" && (
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
          />)}
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
              <div className="flex justify-between align-center">
                <div className="bg-white rounded-lg  p-6 shadow-md mt-3 w-full lg:w-8/12 ">
                  <div className="flex flex-row justify-between items-center w-full ">
                    <h2 className=" text-lg font-poppins">{data?.title}</h2>

                    {data.isPublish ? (
                      <Button
                        type="default"
                        className="mr-2 font-poppins border-green-800 text-green-800"
                      >
                        Published
                      </Button>
                    ) : (
                      <Button
                        type="default"
                        className="mr-2 font-poppins border-red-800 text-red-800"
                      >
                        Unpublished
                      </Button>
                    )}
                  </div>
                  <div className="flex flex-col mt-4 w-full">
                    {data.files?.map((file) => (
                      <div key={file.id}>
                        <div className="flex flex-col mt-3 w-full">
                          <div className="flex justify-between mt-3">
                            <p className="font-poppins">
                              {file.titleOrOriginalName}
                            </p>
                            <Space>
                              <div>
                                {file.approvalStatusByAdmin &&
                                  (file.approvalStatusByAdmin === "Pending" ||
                                  file.approvalStatusByAdmin === "Rejected" ? (
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
                                  ) : null)}
                                {file.approvalStatusByAdmin &&
                                !file.isPublish ? (
                                  file.approvalStatusByAdmin === "Pending" ? (
                                    <>
                                      <Button
                                        type="default"
                                        className="mr-2 font-poppins border-green-800 text-green-800"
                                        onClick={() => handleApprove(file.id)}
                                      >
                                        Approve
                                      </Button>
                                      <Button
                                        type="default"
                                        className="mr-2 font-poppins border-red-800 text-red-800"
                                        onClick={() => handleDecline(file.id)}
                                      >
                                        Decline
                                      </Button>
                                    </>
                                  ) : file.creater === "Instructor" &&
                                    file.approvalStatusByAdmin ===
                                      "Approved" ? (
                                    <Button
                                      type="default"
                                      className="mr-2 font-poppins border-red-800 text-red-800"
                                      onClick={() => handleDecline(file.id)}
                                    >
                                      Decline
                                    </Button>
                                  ) : file.approvalStatusByAdmin ===
                                    "Rejected" ? (
                                    <Button
                                      type="default"
                                      className="mr-2 font-poppins border-green-800 text-green-800"
                                      onClick={() => handleApprove(file.id)}
                                    >
                                      Approve
                                    </Button>
                                  ) : null
                                ) : null}
                              </div>
                              {file.creater === "Admin" && (
                                <>
                                  {/* {!file.isPublish ? (
                                      <Button
                                        type="default"
                                        className="font-poppins border-red-800 text-red-800"
                                        onClick={() =>
                                          handleFilePublish(file.id, true)
                                        }
                                      >
                                        Publish
                                      </Button>
                                    ) : (
                                      <Button
                                        type="default"
                                        className="font-poppins border-green-800 text-green-800"
                                        onClick={() =>
                                          handleFilePublish(file.id, false)
                                        }
                                      >
                                        Published
                                      </Button>
                                    )} */}

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
                                </>
                              )}
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
                                workerSrc: pdfjs.GlobalWorkerOptions.workerSrc,
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

                <div className="bg-white rounded-lg p-3 shadow-md lg:mt-4 ml-1 w-full lg:w-4/12 ">
                  <>
                    <h3 className="font-poppins text-lg m-2">Outline</h3>
                    <Timeline>
                      <Timeline.Item>
                        <p className="font-poppins text-base mb-2 mt-2">
                          Lecture ({data?.title})
                        </p>
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
  );
};

export default ASubContentPreview;
