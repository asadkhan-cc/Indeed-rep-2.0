import React, { useContext } from "react";
import LoginErr from "../src/Components/LoginErr";
import ProfilePage from "../src/Pages/ProfilePage";
import { userAuthDetail } from "./_app";

const Profile = () => {
  const userAuthDetailContext = useContext(userAuthDetail);
  return (
    <div>
      {userAuthDetailContext?.user?.email ? <ProfilePage /> : <LoginErr />}
    </div>
  );
};

export default Profile;
