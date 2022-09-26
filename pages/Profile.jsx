import React from "react";
import LoginErr from "../Utils/Components/LoginErr";
import ProfilePage from "../Utils/Pages/ProfilePage";

const Profile = () => {
  return (
    <div>
      {true ? <ProfilePage /> : <LoginErr />}
      profile page
    </div>
  );
};

export default Profile;
