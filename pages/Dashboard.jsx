import { async } from "@firebase/util";
import { onAuthStateChanged } from "firebase/auth";
import React, { useContext, useState } from "react";
import { auth } from "../FirebaseApp/firebase-config";
import Loading from "../Utils/Components/Loading";
import LoginErr from "../Utils/Components/LoginErr";
import DashBoardPageAdmin from "../Utils/Pages/Admin/DashBoardPageAdmin";
import DashBoardPageCompany from "../Utils/Pages/Company/DashBoardPageCompany";
import DashBoardPageStudent from "../Utils/Pages/User/DashBoardPageStudent";
import { userAuthDetail } from "./_app";

const Dashboard = () => {
  const userAuthDetailContext = useContext(userAuthDetail);

  // const [user, setUser] = useState(null);
  // onAuthStateChanged(auth, (user) => setUser(user));

  console.log(userAuthDetailContext, "userAuthDetailContext");
  return (
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
  );
};

export default Dashboard;
