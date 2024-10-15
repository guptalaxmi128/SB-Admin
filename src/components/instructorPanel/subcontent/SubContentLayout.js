import React,{useState,useEffect} from "react";
import { Layout, Menu, message,Button,Spin,Avatar,Dropdown } from "antd";
import {
  DownOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faFileVideo } from "@fortawesome/free-solid-svg-icons";
import { LOGOUT_INSTRUCTOR } from "../../../constants/actionTypes";
import { useDispatch } from "react-redux";
import { getInstructor } from "../../../actions/instructor/register/register";
import AddVideo from "./AddVideo";
import AddFiles from "./AddFiles";

const { Sider, Content,  Header } = Layout;
const { SubMenu } = Menu;

const localhost = "http://localhost:5000";
const SubContentLayout = () => {
  const dispatch = useDispatch();
  const location=useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

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

 
  const userMenu = (
    <Menu className="font-poppins">
      <Menu.Item key="myProfile">My Profile</Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );


  console.log(id);

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

  
  const userImage = data.imageFileName ? (
    <Avatar src={`${localhost}/files/${data.imageFileName}`} />
  ) : (
    <Avatar icon={<UserOutlined />} />
  );

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
            {location.pathname.includes(`/subcontent/${id}/add-video`) && (
              <AddVideo id={id} />
            )}
            {location.pathname.includes(`/subcontent/${id}/add-files`) && (
              <AddFiles id={id} />
            )}
          </Content>
          {/* <Footer className="text-center font-poppins">Yoga App</Footer> */}
        </Layout>
      </Layout>
    )}
    </>
  );
};

export default SubContentLayout;
