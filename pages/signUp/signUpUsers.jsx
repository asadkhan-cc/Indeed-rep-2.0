import Head from "next/head";
import React from "react";
import SignUpUserPage from "../../src/Pages/User/SignUpUserPage";

const SignUpUsers = () => {
  return (
    <>
      <Head>
        <title>Student SignUp</title>
      </Head>
      <SignUpUserPage />
    </>
  );
};

export default SignUpUsers;
