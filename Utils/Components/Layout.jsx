import React, { useState } from "react";
import {
  DesktopOutlined,
  ContactsOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import Image from "next/image";
import Logo from "../../public/logo.jpg";
import MenuItem from "antd/lib/menu/MenuItem";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../FirebaseApp/firebase-config";

function SiteLayout({ children }) {
  const [user, setUser] = useState(null);
  onAuthStateChanged(auth, (user) => setUser(user));
  // console.log(user, "loging Users");

  const [collapsed, setCollapsed] = useState(false);
  const { Header, Content, Footer, Sider } = Layout;
  // return (
  //   <Link href={"/"} href={path} key={key}>
  //     {icon}
  //     {label}
  //   </Link>
  // );
  function getItem(label, key, icon, children, path) {
    return {
      key,
      icon,
      children,
      label,
      path,
    };
  }
  // if user not loggedin use Item1
  const items1 = [
    getItem(
      "Home",
      "1",
      <Link href={"/"}>
        <div className="w-[200px] mx-auto h-auto ">
          <HomeOutlined />
          <span> Home</span>
        </div>
      </Link>,
      null,
      "/"
    ),
    getItem(
      "About",
      "2",
      <Link href={"/About"}>
        <div className="w-[200px] mx-auto h-auto">
          <InfoCircleOutlined />
          <span> About</span>
        </div>
      </Link>,
      null,
      "/About"
    ),
    getItem(
      "Contact Us",
      "3",
      <Link href={"/Contact"}>
        <div className="w-[200px] mx-auto h-auto">
          <ContactsOutlined />
          <span> Contact Us</span>
        </div>
      </Link>,
      null,
      "/Contact"
    ),
    getItem(
      "Login",
      "4",
      <Link href={"/Login"}>
        <div className="w-[200px] mx-auto h-auto">
          <LoginOutlined />
          <span> Login</span>
        </div>
      </Link>,
      null,
      "/Login"
    ),
    getItem(
      "Join Us",
      "5",
      <Link href={"/SignUp"}>
        <div className="w-[200px] mx-auto h-auto">
          <TeamOutlined />
          <span> Join Us</span>
        </div>
      </Link>,
      null,
      "/SignUp"
    ),

    // getItem("Home", "sub1", <UserOutlined />, [
    //   getItem("Tom", "3"),
    //   getItem("Bill", "4"),
    //   getItem("Alex", "5"),
    // ]),
    // getItem("Team", "sub2", <TeamOutlined />, [
    //   getItem("Team 1", "6"),
    //   getItem("Team 2", "8"),
    // ]),
  ];
  const items2 = [
    getItem(
      "Home",
      "1",
      <Link href={"/"}>
        <div className="w-[200px] mx-auto h-auto ">
          <HomeOutlined />
          <span> Home</span>
        </div>
      </Link>,
      null,
      "/"
    ),
    getItem(
      "About",
      "2",
      <Link href={"/About"}>
        <div className="w-[200px] mx-auto h-auto">
          <InfoCircleOutlined />
          <span> About</span>
        </div>
      </Link>,
      null,
      "/About"
    ),
    getItem(
      "Contact Us",
      "3",
      <Link href={"/Contact"}>
        <div className="w-[200px] mx-auto h-auto">
          <ContactsOutlined />
          <span> Contact Us</span>
        </div>
      </Link>,
      null,
      "/Contact"
    ),
    getItem(
      "Login",
      "4",
      <Link href={"/LogOut"}>
        <div className="w-[200px] mx-auto h-auto">
          <LogoutOutlined />
          <span> Logout</span>
        </div>
      </Link>,
      null,
      "/Login"
    ),
    getItem(
      "",
      "5",
      <Link href={"/Profile"}>
        <div className="w-[200px] mx-auto h-auto">
          <UserOutlined />
          <span> profile</span>
        </div>
      </Link>,
      null,
      "/SignUp"
    ),
    getItem(
      "",
      "6",
      <Link href={"/Dashboard"}>
        <div className="w-[200px] mx-auto h-auto">
          <DesktopOutlined />
          <span> Dashboard</span>
        </div>
      </Link>,
      null,
      "/Dashboard"
    ),
  ];

  // const [navItemList, setNavItemList] = useState(items1);

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className=" mt-2 mx-auto w-36">
            <Image src={Logo} alt="logo-Image" width={70} height={70} />
          </div>
          {user ? (
            <Menu
              theme="dark"
              defaultSelectedKeys={["2"]}
              mode="inline"
              items={items2}
            />
          ) : (
            <Menu
              theme="dark"
              defaultSelectedKeys={["2"]}
              mode="inline"
              items={items1}
            />
          )}
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
            }}
          />
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <main>{children}</main>
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}
export default SiteLayout;
