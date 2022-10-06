import "../styles/globals.css";
import "antd/dist/antd.css";
import Layout from "../src/Components/Layout";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../FirebaseApp/firebase-config";
import { doc, getDoc } from "firebase/firestore";

const userAuthDetail = createContext();
function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [getUserData, setGetUserData] = useState(false);
  const gettingDocumentFromFirestore = async () => {
    if (user) {
      try {
        const docRef = await doc(db, "users", auth?.currentUser?.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // console.log("Document data:", docSnap.data());
          const data = await docSnap.data();
          if (profileData === data) {
            setGetUserData(true);
          } else {
            setProfileData((prev) => {
              return data;
            });
          }
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

  onAuthStateChanged(auth, (eve) => {
    setUser(eve);
  });
  useEffect(() => {
    gettingDocumentFromFirestore();
    if (
      profileData === null &&
      user?.metadata.creationTime != user?.metadata.lastSignInTime
    ) {
      alert("settimeout");
      setTimeout(() => {
        setGetUserData(false);
      }, 100000);
    }
  }, [user, getUserData]);

  console.log(
    { user: user, profileData: profileData },
    "{ user: user, profileData: profileData }{ user: user, profileData: profileData }{ user: user, profileData: profileData }{ user: user, profileData: profileData }{ user: user, profileData: profileData }{ user: user, profileData: profileData }{ user: user, profileData: profileData }{ user: user, profileData: profileData }"
  );
  console.log(
    { user: user, profileData: profileData },
    "{ user: user, profileData: profileData }{ user: user, profileData: profileData }{ user: user, profileData: profileData }{ user: user, profileData: profileData }{ user: user, profileData: profileData }{ user: user, profileData: profileData }{ user: user, profileData: profileData }{ user: user, profileData: profileData }"
  );
  console.log(
    { user: user, profileData: profileData },
    "{ user: user, profileData: profileData }{ user: user, profileData: profileData }{ user: user, profileData: profileData }{ user: user, profileData: profileData }{ user: user, profileData: profileData }{ user: user, profileData: profileData }{ user: user, profileData: profileData }{ user: user, profileData: profileData }"
  );
  return (
    <userAuthDetail.Provider value={{ user: user, profileData: profileData }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </userAuthDetail.Provider>
  );
}

export { userAuthDetail };
export default MyApp;
