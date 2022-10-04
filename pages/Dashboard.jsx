import { async } from "@firebase/util";
import { onAuthStateChanged } from "firebase/auth";
import React, { useContext, useState } from "react";
import { auth } from "../FirebaseApp/firebase-config";
import CreateEvent from "../Utils/Components/Company/CreateEvent";
import Loading from "../Utils/Components/Loading";
import LoginErr from "../Utils/Components/LoginErr";
import ViewCalender from "../Utils/Components/ViewCalender";
import DashBoardPageAdmin from "../Utils/Pages/Admin/DashBoardPageAdmin";
import DashBoardPageCompany from "../Utils/Pages/Company/DashBoardPageCompany";
import DashBoardPageStudent from "../Utils/Pages/User/DashBoardPageStudent";
import { userAuthDetail } from "./_app";

const Dashboard = () => {
  const userAuthDetailContext = useContext(userAuthDetail);

  // const [user, setUser] = useState(null);
  // onAuthStateChanged(auth, (user) => setUser(user));

  //------------big calander part
  // const allViews = Object.keys(BigCalendar.Views).map(
  //   (k) => BigCalendar.Views[k]
  // );
  console.log(userAuthDetailContext);
  return (
    <div>
      <CreateEvent></CreateEvent>
      <ViewCalender></ViewCalender>
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
  );
};

export default Dashboard;
