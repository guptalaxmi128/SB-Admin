import React,{useState} from "react";
import { Layout, Menu, message,Avatar,Button,Dropdown } from "antd";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { LogoutOutlined,MenuFoldOutlined,MenuUnfoldOutlined,UserOutlined,DownOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faFileVideo } from "@fortawesome/free-solid-svg-icons";
import { LOGOUT_ADMIN } from "../../../constants/actionTypes";
import { useDispatch } from "react-redux";
import AddVideo from "./AddVideo";
import AddFiles from "./AddFiles";


const { Sider, Content,  Header } = Layout;
const { SubMenu } = Menu;

const ASubContentLayout = () => {
  const dispatch = useDispatch();
  const location=useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [collapsed,setCollapsed]=useState(false);



  const handleLogout = () => {
    dispatch({ type: LOGOUT_ADMIN });
    console.log("Admin");
    message.success("Admin logout successfully!");
    navigate("/");
  };
  console.log(id);

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
            {location.pathname.includes(`/lecture/${id}/add-video`) && (
              <AddVideo id={id} />
            )}
            {location.pathname.includes(`/lecture/${id}/add-files`) && (
              <AddFiles id={id} />
            )}
          </Content>
        </Layout>
      </Layout>
  
  );
};

export default ASubContentLayout;
