// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { message } from "antd";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import Router, { useRouter } from "next/router";
import { getStorage } from "firebase/storage";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCh7W53HZDA0nI6B-Wo_-yjmaRc8Tnete0",
  authDomain: "cc-finalproj.firebaseapp.com",
  projectId: "cc-finalproj",
  storageBucket: "cc-finalproj.appspot.com",
  messagingSenderId: "218923915292",
  appId: "1:218923915292:web:32ab953ff2f977a0ff67d9",
  measurementId: "G-KYEF431LZX",
  //
  //  DB Credentials for Disaster Recovery
  //
  // {apiKey: "AIzaSyDif7Nm-yq7rL9N20ImIAIA-aQT9t0hzxA",
  //   authDomain: "indeed-overload.firebaseapp.com",
  //   projectId: "indeed-overload",
  //   storageBucket: "indeed-overload.appspot.com",
  //   messagingSenderId: "625552381580",
  //   appId: "1:625552381580:web:a6e05cf72e7d2752c04da9",
  //   measurementId: "G-X0DT9HF9LW",}
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const auth = getAuth(app);
//////----------------------------------------------------------------------------------------
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();
// const actionCodeSettings = {
//   url: "https://indeed-replica.vercel.app/" + auth(),
//   handleCodeInApp: true,
//   // When multiple custom dynamic link domains are defined, specify which
//   // one to use.
//   dynamicLinkDomain: "indeed-replica.vercel.app",
// };
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (name = auth, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(name, email, password);
    const user = res.user;
    console.log(res, "res");
    // res.User.sendEmailVerification();
    // const setUser = await addDoc(collection(db, "users"), {
    //   uid: user.uid,
    //   name,
    //   authProvider: "local",
    //   email,
    // });

    // const verified = sendEmailVerification(user.email);
    const successMessage = "User Created successfully";
    return { user, successMessage };
  } catch (err) {
    console.error(err);
    if (err.message == "Firebase: Error (auth/email-already-in-use).") {
      message.error("An Account Already Exist With This email : " + email);
    } else {
      message.error(err.message);
      const errMessage =
        "Some Error occurred while SigningUp check Email or Password";
      return { errMessage, err };
    }
  }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  // window.location.reload(false);
  signOut(auth);
  Router.reload();
  Router.push("/login");
};
export {
  auth,
  db,
  storage,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
// ---------------------------------------------------------------------------------
