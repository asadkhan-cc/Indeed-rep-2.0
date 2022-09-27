import { onAuthStateChanged } from "firebase/auth";
import Router, { useRouter } from "next/router";
import { useState } from "react";
import { auth } from "../FirebaseApp/firebase-config";
import LoginPage from "../Utils/Pages/LogInPage";

const Login = () => {
  // router = useRouter();
  const [user, setUser] = useState(null);
  onAuthStateChanged(auth, (user) => setUser(user));
  const message = <div>Already LoggedIn</div>;
  if (!user) {
    return <LoginPage />;
  } else {
    return <div>Alredy LoggedIn</div>;
  }
};

export default Login;
