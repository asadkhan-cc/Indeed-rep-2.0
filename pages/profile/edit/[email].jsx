import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import UpdateCompanyProfile from "../../../src/Components/Company/UpdateCompanyProfile";
import LoginErr from "../../../src/Components/LoginErr";
import UpdateUserProfile from "../../../src/Components/User/UpdateUserProfile";
import NotFound from "../../404";
import { userAuthDetail } from "../../_app";

const Update = () => {
  const router = useRouter();
  const query = router.query;
  const userAuthDetailContext = useContext(userAuthDetail);

  console.log("query" + query);
  return (
    <>
      <Head>
        <title>Edit Profile</title>
      </Head>
      {userAuthDetailContext?.profileData?.role === "Admin" ? (
        <>
          {query.role == "User" ? (
            <UpdateUserProfile data={query} />
          ) : (
            <UpdateCompanyProfile data={query} />
          )}
        </>
      ) : (
        <LoginErr />
      )}
    </>
  );
};

export default Update;
