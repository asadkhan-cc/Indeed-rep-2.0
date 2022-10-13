import { useRouter } from "next/router";
import React from "react";
import UpdateCompanyProfile from "../../../src/Components/Company/UpdateCompanyProfile";
import UpdateUserProfile from "../../../src/Components/User/UpdateUserProfile";
import NotFound from "../../404";

const Update = () => {
  const router = useRouter();
  const query = router.query;
  console.log(query);
  return (
    <>
      {query.role == "User" ? (
        <UpdateUserProfile data={query} />
      ) : (
        <UpdateCompanyProfile data={query} />
      )}
      {/* <NotFound /> */}
    </>
  );
};

export default Update;
