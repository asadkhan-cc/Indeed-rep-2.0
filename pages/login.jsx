import { onAuthStateChanged } from "firebase/auth";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useState } from "react";
import { auth } from "../FirebaseApp/firebase-config";
import LoginPage from "../src/Pages/LogInPage";

const Login = () => {
  // router = useRouter();
  const [user, setUser] = useState(null);
  onAuthStateChanged(auth, (user) => setUser(user));
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      {user ? <div>Already LoggedIn</div> : <LoginPage />}
    </>
  );
};

export default Login;
