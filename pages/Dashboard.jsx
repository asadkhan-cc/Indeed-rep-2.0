import { onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../FirebaseApp/firebase-config";
import LoginErr from "../Utils/Components/LoginErr";
import DashBoardPageStudent from "../Utils/Pages/DashBoardPageStudent";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  onAuthStateChanged(auth, (user) => setUser(user));
  console.log(user);
  return <div>{user ? <DashBoardPageStudent /> : <LoginErr />}</div>;
};

export default Dashboard;
