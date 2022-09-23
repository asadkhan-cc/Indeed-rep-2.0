import { beforeAuthStateChanged, onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../FirebaseApp/firebase-config";

const DashBoardPageStudent = () => {
  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (user) => setUser(user));
  console.log(user);
  return <div>DashBoardPageStudent</div>;
};

export default DashBoardPageStudent;
