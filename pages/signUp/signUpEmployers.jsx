import Head from "next/head";
import React from "react";
import SignUpEmployerPage from "../../src/Pages/Company/SignUpEmployerPage";

const SignUpEmployers = () => {
  return (
    <>
      <Head>
        <title>Employer SignUp</title>
      </Head>
      <SignUpEmployerPage />
    </>
  );
};

export default SignUpEmployers;
