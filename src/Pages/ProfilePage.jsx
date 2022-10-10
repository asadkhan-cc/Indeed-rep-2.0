import React, { useEffect, useState } from "react";

import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../FirebaseApp/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { Button } from "antd";
import UpdateCompanyProfile from "../Components/Company/UpdateCompanyProfile";
import UpdateUserProfile from "../Components/User/UpdateUserProfile";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [user, setUser] = useState(null);
  if (null) {
  }
  const gettingDocumentFromFirestore = async () => {
    if (user) {
      try {
        const docRef = await doc(db, "users", auth?.currentUser?.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // console.log("Document data:", docSnap.data());
          setProfileData(docSnap.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          docSnap.data("No Profile Found");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    gettingDocumentFromFirestore();
  }, [user]);
  // // console.log(profileData);
  onAuthStateChanged(auth, (status) => {
    if (user !== status) {
      setUser(status);
    }
  });
  // console.log(user, "user object");
  return (
    <div>
      <h1>role : {profileData?.role}</h1>
      <h1>Email Verified : {user?.auth?.emailVerified ? "Yes" : "No"}</h1>

      {user && profileData && true ? (
        // <div>
        //   <h1>userName : {profileData.userName}</h1>
        //   <h1>email : {profileData.email}</h1>
        //   <h1>mobileNumber : {profileData.mobileNumber}</h1>
        //   <h1>university : {profileData.university}</h1>
        //   <h1>degree : {profileData.degree}</h1>
        //   <h1>CGPA : {profileData.CGPA}</h1>
        //   <h1>Bio : {profileData.Bio}</h1>
        //   <h1>CNIC : {profileData.CNIC}</h1>
        //   <h1>address : {profileData.address}</h1>
        // <h1>role : {profileData.role}</h1>
        //   <h1>
        //     profileActivate : {profileData.profileActivate ? "Yes" : "NO"}
        //   </h1>
        // <h1>role : {profileData.role}</h1>

        profileData.role === "User" ? (
          <UpdateUserProfile data={profileData} />
        ) : (
          <UpdateCompanyProfile data={profileData} />
        )
      ) : (
        <div className=" my-5">
          <div className="flex flex-row items-center justify-center ">
            <Button loading={true}></Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
