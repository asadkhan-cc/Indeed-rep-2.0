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
  const [flagForUseeffect, setFlagForUseeffect] = useState(0);
  const gettingDocumentFromFirestore = async () => {
    if (user) {
      try {
        const docRef = await doc(db, "users", auth?.currentUser?.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // console.log("Document data:", docSnap.data());
          const data = await docSnap.data();
          if (profileData === data) {
            setFlagForUseeffect((prev) => prev + 1);
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
        if (flagForUseeffect <= 5) {
          setFlagForUseeffect((prev) => prev + 1);
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
    if (profileData === null) {
      setTimeout(() => {
        setFlagForUseeffect(4);
      }, 100000);
    }
  }, [user, flagForUseeffect]);

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
