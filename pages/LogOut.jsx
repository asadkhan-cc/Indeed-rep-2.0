import React from "react";
import { logout } from "../FirebaseApp/firebase-config";

const LogOut = () => {
  return (
    <div className="w-2/5 shadow rounded p-2 my-10 mx-auto text-center ">
      <p>Are You Sure!</p>
      <button onClick={logout} className="ant-btn-primary p-2 rounded ">
        LogOut
      </button>
    </div>
  );
};

export default LogOut;
