import { Button } from "antd";
import {
  collection,
  CollectionReference,
  getDocs,
  query,
} from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { db } from "../../../FirebaseApp/firebase-config";

const Jobapplications = () => {
  const router = useRouter();
  const { jobapplications } = router.query;
  const [applications, setApplications] = useState(null);
  useEffect(() => {
    console.log(jobapplications);
    getJobApplications();
    return () => {};
  }, [jobapplications]);
  // console.log(applications.length === 0);
  const getJobApplications = async () => {
    const { jobapplications } = await router.query;
    const path = await `/jobEvents/${jobapplications}/jobApplications`;
    const collectionRef = await collection(db, path);
    const applicationsSnapshot = await getDocs(collectionRef);
    const applicationData = await applicationsSnapshot.docs;
    const data = [];
    await applicationData.forEach((doc) => {
      console.log(1);
      data.push(doc.data());
    });
    setApplications(data);
    // const final = await data;
    // console.log(final);
    // const querySnapshot = await getDocs(query(collection(db, path)));
    // querySnapshot.forEach((queryDocumentSnapshot) => {
    //   alert("asas");
    //   console.log(queryDocumentSnapshot.id, queryDocumentSnapshot.data());
    // });
  };
  console.log(applications, "applications");
  return (
    <div>
      <h1>jobapplication:{jobapplications}</h1>
      {applications ? (
        <div className="flex gap-1 flex-wrap  items-start ">
          {applications.map((elem, index) => (
            <div className="w-[49%] border rounded-md bg-slate-400" key={index}>
              <div className="flex flex-grow">
                <div className=" w-1/2 mx-3 text-left ml-5 grow  ">
                  Applicant Name:
                </div>
                <div className=" w-1/2 mx-3 text-left grow  ">
                  {elem.userName}
                </div>
              </div>
              <div className="flex flex-grow">
                <div className=" w-1/2 mx-3 text-left ml-5 grow  ">DOB:</div>
                <div className=" w-1/2 mx-3 text-left grow  ">
                  asa{elem.DOB}
                </div>
              </div>
              <div className="flex flex-grow">
                <div className=" w-1/2 mx-3 text-left ml-5 grow  ">
                  email :{" "}
                </div>
                <div className=" w-1/2 mx-3 text-left grow  ">{elem.email}</div>
              </div>
              <div className="flex flex-grow">
                <div className=" w-1/2 mx-3 text-left ml-5 grow  ">
                  contact:
                </div>
                <div className=" w-1/2 mx-3 text-left grow  ">
                  {elem.mobileNumber}
                </div>
              </div>
              <div className="flex flex-grow">
                <div className=" w-1/2 mx-3 text-left ml-5 grow  ">
                  Address:{" "}
                </div>
                <div className=" w-1/2 mx-3 text-left grow  ">
                  {elem.address}
                </div>
              </div>
              <div className="flex flex-grow">
                <div className=" w-1/2 mx-3 text-left ml-5 grow  ">About:</div>
                <div className=" w-1/2 mx-3 text-left grow  ">{elem.Bio}</div>
              </div>
              <div className="flex flex-grow">
                <div className=" w-1/2 mx-3 text-left ml-5 grow  ">
                  University:
                </div>
                <div className=" w-1/2 mx-3 text-left grow  ">
                  {elem.university}
                </div>
              </div>
              <div className="flex flex-grow">
                <div className=" w-1/2 mx-3 text-left ml-5 grow  ">Degree:</div>
                <div className=" w-1/2 mx-3 text-left grow  ">
                  {elem.degree}
                </div>
              </div>
              <div className="flex flex-grow">
                <div className=" w-1/2 mx-3 text-left ml-5 grow  ">CGPA:</div>
                <div className=" w-1/2 mx-3 text-left grow  ">{elem.CGPA}</div>
              </div>
              <div className="flex flex-grow">
                <div className=" w-1/2 mx-3 text-left ml-5 grow  ">resume:</div>
                <div className=" w-1/2 mx-3 text-left grow  ">
                  <Link href={elem.resume}>Download Resume</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-8">
          <Button type="primary" loading={true}>
            Loading...
          </Button>
        </div>
      )}
    </div>
  );
};

export default Jobapplications;
