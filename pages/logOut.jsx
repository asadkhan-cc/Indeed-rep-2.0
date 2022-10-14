import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { auth, logout } from "../FirebaseApp/firebase-config";
import LoginErr from "../src/Components/LoginErr";

const LogOut = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  onAuthStateChanged(auth, (user) => setUser(user));
  const signOut = () => {
    logout();
  };
  if (user) {
    return (
      <div className="sm:w-2/5 w-full  shadow rounded p-2 my-10 mx-auto text-center ">
        <p>Are You Sure!</p>
        <button onClick={signOut} className="ant-btn-primary p-2 rounded ">
          LogOut
        </button>
      </div>
    );
  } else {
    return (
      <>
        <LoginErr />
      </>
    );
  }
};

export default LogOut;
