import { async } from "@firebase/util";
import { onAuthStateChanged } from "firebase/auth";
import Head from "next/head";
import React, { useContext, useState } from "react";
import { auth } from "../../FirebaseApp/firebase-config";
import CreateEvent from "../../src/Components/Company/CreateEvent";
import Loading from "../../src/Components/Loading";
import LoginErr from "../../src/Components/LoginErr";
import ViewCalender from "../../src/Components/ViewCalender";
import DashBoardPageAdmin from "../../src/Pages/Admin/DashBoardPageAdmin";
import DashBoardPageCompany from "../../src/Pages/Company/DashBoardPageCompany";
import DashBoardPageStudent from "../../src/Pages/User/DashBoardPageStudent";
import { userAuthDetail } from "../_app";

const Dashboard = () => {
  const userAuthDetailContext = useContext(userAuthDetail);

  // const [user, setUser] = useState(null);
  // onAuthStateChanged(auth, (user) => setUser(user));

  //------------big calander part
  // const allViews = Object.keys(BigCalendar.Views).map(
  //   (k) => BigCalendar.Views[k]
  // );
  // console.log(userAuthDetailContext);
  return (
    <>
      <Head>
        <title>DashBoard</title>
      </Head>
      <div>
        {userAuthDetailContext?.user ? (
          userAuthDetailContext?.profileData?.role === "Admin" ? (
            <DashBoardPageAdmin />
          ) : userAuthDetailContext?.profileData?.role === "User" ? (
            <DashBoardPageStudent />
          ) : userAuthDetailContext?.profileData?.role === "Company" ? (
            <DashBoardPageCompany />
          ) : (
            <Loading />
          )
        ) : (
          <LoginErr />
        )}
      </div>
    </>
  );
};

export default Dashboard;
