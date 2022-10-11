import React, { useContext, useState } from "react";
import {
  DesktopOutlined,
  ContactsOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
  InfoCircleFilled,
  CheckCircleFilled,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import Image from "next/image";
import Logo from "../../public/logo.jpg";
import MenuItem from "antd/lib/menu/MenuItem";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../FirebaseApp/firebase-config";
import AvatarPerson from "../../public/whiteguy.png";
import AvatarCompany from "../../public/building.jpeg";
import { userAuthDetail } from "../../pages/_app";

function SiteLayout({ children }) {
  const [user, setUser] = useState(null);
  const userAuthDetailContext = useContext(userAuthDetail);

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
      <Link href={"/about"}>
        <div className="w-[200px] mx-auto h-auto">
          <InfoCircleOutlined />
          <span> About</span>
        </div>
      </Link>,
      null,
      "/about"
    ),
    getItem(
      "Contact Us",
      "3",
      <Link href={"/contact"}>
        <div className="w-[200px] mx-auto h-auto">
          <ContactsOutlined />
          <span> Contact Us</span>
        </div>
      </Link>,
      null,
      "/contact"
    ),
    getItem(
      "Login",
      "4",
      <Link href={"/login"}>
        <div className="w-[200px] mx-auto h-auto">
          <LoginOutlined />
          <span> Login</span>
        </div>
      </Link>,
      null,
      "/login"
    ),
    getItem(
      "Join Us",
      "5",
      <Link href={"/signUp"}>
        <div className="w-[200px] mx-auto h-auto">
          <TeamOutlined />
          <span> Join Us</span>
        </div>
      </Link>,
      null,
      "/signUp"
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
      <Link href={"/about"}>
        <div className="w-[200px] mx-auto h-auto">
          <InfoCircleOutlined />
          <span> About</span>
        </div>
      </Link>,
      null,
      "/about"
    ),
    getItem(
      "Contact Us",
      "3",
      <Link href={"/contact"}>
        <div className="w-[200px] mx-auto h-auto">
          <ContactsOutlined />
          <span> Contact Us</span>
        </div>
      </Link>,
      null,
      "/contact"
    ),
    getItem(
      "Login",
      "4",
      <Link href={"/logOut"}>
        <div className="w-[200px] mx-auto h-auto">
          <LogoutOutlined />
          <span> Logout</span>
        </div>
      </Link>,
      null,
      "/login"
    ),
    getItem(
      "",
      "5",
      <Link href={"/profile"}>
        <div className="w-[200px] mx-auto h-auto">
          <UserOutlined />
          <span> profile</span>
        </div>
      </Link>,
      null,
      "/signUp"
    ),
    getItem(
      "",
      "6",
      <Link href={"/dashboard"}>
        <div className="w-[200px] mx-auto h-auto">
          <DesktopOutlined />
          <span> Dashboard</span>
        </div>
      </Link>,
      null,
      "/dashboard"
    ),
  ];

  // const [navItemList, setNavItemList] = useState(items1);
  console.log(userAuthDetailContext?.profileData?.isActive === undefined);
  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          collapsible={true}
          collapsed={collapsed}
          onCollapse={(value) => {
            console.log(value);
            setCollapsed(value);
          }}
        >
          <div className=" mt-2 mx-auto w-36 logo">
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
          >
            <div className="relative">
              <div className="absolute right-3 text-white text-right mr-3">
                {userAuthDetailContext?.profileData ? (
                  userAuthDetailContext?.profileData?.role == "User" ? (
                    <>
                      {userAuthDetailContext?.profileData?.isActive === null ||
                      userAuthDetailContext?.profileData?.isActive ===
                        undefined ? (
                        <>
                          Activation Status :{" "}
                          <InfoCircleFilled
                            style={{
                              color: "orange",
                            }}
                          />
                          <span className="mr-5"> Pending..</span>
                        </>
                      ) : (
                        <>
                          Activation Status :{" "}
                          <CheckCircleFilled
                            style={{
                              color: "#66FF00",
                            }}
                          />
                          <span className="mr-5"> Active</span>
                        </>
                      )}
                      <Image
                        alt="Avatar Image"
                        src={AvatarPerson}
                        width="20px"
                        height="20px"
                        className=" rounded-full  "
                      />
                    </>
                  ) : (
                    <>
                      <Image
                        alt="Avatar Company"
                        src={AvatarCompany}
                        width="20px"
                        height="20px"
                        className=" rounded-full  "
                      />
                    </>
                  )
                ) : (
                  <></>
                )}
                <span className="ml-4 ">
                  {userAuthDetailContext?.profileData?.userName}
                </span>
              </div>
            </div>
          </Header>
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
              <main className="break-all">{children}</main>
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Indeed Replica ©2022 Created by Asad Khan
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}
export default SiteLayout;
