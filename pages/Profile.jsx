import React, { useContext } from "react";
import LoginErr from "../Utils/Components/LoginErr";
import ProfilePage from "../Utils/Pages/ProfilePage";
import { userAuthDetail } from "./_app";

const Profile = () => {
  const userAuthDetailContext = useContext(userAuthDetail);
  console.log(userAuthDetailContext);
  return (
    <div>
      {userAuthDetailContext?.user?.email ? <ProfilePage /> : <LoginErr />}
    </div>
  );
};

export default Profile;
