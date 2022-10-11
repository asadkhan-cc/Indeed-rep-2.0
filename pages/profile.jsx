import React, { useContext } from "react";
import LoginErr from "../src/Components/LoginErr";
import AdminProfilePage from "../src/Pages/Admin/AdminProfilePage";
import ProfilePage from "../src/Pages/ProfilePage";
import { userAuthDetail } from "./_app";

const Profile = () => {
  const userAuthDetailContext = useContext(userAuthDetail);
  console.log(userAuthDetailContext);
  return (
    <div>
      {userAuthDetailContext?.user?.email ? (
        userAuthDetailContext?.profileData?.role == "Admin" ? (
          <AdminProfilePage />
        ) : (
          <ProfilePage />
        )
      ) : (
        <LoginErr />
      )}
    </div>
  );
};

export default Profile;
