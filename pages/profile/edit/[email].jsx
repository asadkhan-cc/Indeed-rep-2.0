import { useRouter } from "next/router";
import React, { useContext } from "react";
import UpdateCompanyProfile from "../../../src/Components/Company/UpdateCompanyProfile";
import UpdateUserProfile from "../../../src/Components/User/UpdateUserProfile";
import NotFound from "../../404";
import { userAuthDetail } from "../../_app";

const Update = () => {
  const router = useRouter();
  const query = router.query;
  const userAuthDetailContext = useContext(userAuthDetail);

  console.log(query);
  return (
    <>
      {userAuthDetailContext?.profileData?.role === "Admin" ? (
        <>
          {query.role == "User" ? (
            <UpdateUserProfile data={query} />
          ) : (
            <UpdateCompanyProfile data={query} />
          )}
        </>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default Update;
