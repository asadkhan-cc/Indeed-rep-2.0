import { Button, message, Modal } from "antd";
import {
  collection,
  CollectionReference,
  doc,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../../../../FirebaseApp/firebase-config";
import CreateEvent from "../../../../src/Components/Company/CreateEvent";
import CreateInterview from "../../../../src/Components/Company/CreateInterview";
import { userAuthDetail } from "../../../_app";

const JobApplications = () => {
  const router = useRouter();
  const { jobApplications } = router.query;
  const userAuthDetailContext = useContext(userAuthDetail);

  const [applications, setApplications] = useState(null);
  const [ApplicantData, setApplicantData] = useState(null);
  const [jobDesc, setJobDesc] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    console.log(jobApplications);
    getJobApplications();
    getJobDescription();
    return () => {};
  }, [jobApplications]);
  // console.log(applications.length === 0);
  const getJobDescription = async () => {
    try {
      const { jobApplications } = await router.query;
      if (jobApplications != undefined) {
        const eventRef = await doc(db, "jobEvents", jobApplications);
        const jobSnap = await getDoc(eventRef);
        const jobDescription = await jobSnap.data();
        setJobDesc(jobDescription);
        return jobDescription;
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  const getJobApplications = async () => {
    const { jobApplications } = await router.query;
    try {
      if (jobApplications) {
        const path = await `/jobEvents/${jobApplications}/jobApplications`;
        const collectionRef = await collection(db, path);
        const applicationsSnapshot = await getDocs(collectionRef);
        const applicationData = await applicationsSnapshot.docs;
        const data = [];
        await applicationData.forEach((doc) => {
          console.log(1);
          data.push(doc.data());
        });
        setApplications(data);
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  };
  const yes = (
    <>
      <span className="  text-green-500 underline ">All DAY!</span>
    </>
  );
  const no = (
    <>
      <span className=" text-red-500 underline">Timed!</span>
    </>
  );
  const closeModal = () => {
    setIsModalOpen(false);
  };
  console.log(jobDesc, "jobDesc");
  console.log(applications, "applications");
  return (
    <div>
      <div className="flex gap-3 flex-wrap min-w-full justify-center md:justify-start  ">
        {jobDesc ? (
          <div className="sm:w-full   border rounded-md  p-4 mb-4 shadow-md shadow-slate-700">
            <div className="text-2xl font-bold text-center mb-4">
              Job Details
            </div>
            {/* <div className="flex flex-grow my-2">
              <div className=" w-1/3 lg:w-1/2 lg:text-lg lg:pl-20">Job ID:</div>
              <div
                className=" text-left grow cursor-pointer  "
                title={jobApplications}
              >
                {jobApplications}
              </div>
            </div> */}
            <div className="flex flex-grow my-2 items-center">
              <div className=" w-1/3 lg:w-1/2 lg:text-lg lg:pl-20">Title :</div>
              <div
                className=" text-left grow cursor-pointer line-clamp-2 "
                title={jobDesc.title}
              >
                {jobDesc.title}
              </div>
            </div>{" "}
            <div className="flex flex-grow my-2 items-center">
              <div className=" w-1/3 lg:w-1/2 lg:text-lg lg:pl-20">
                Recruitment Type :
              </div>
              <div
                className=" text-left grow cursor-pointer  "
                title={jobDesc.allDay ? yes : no}
              >
                {jobDesc.allDay ? yes : no}
              </div>
            </div>{" "}
            <div className="flex flex-grow my-2 items-center">
              <div className=" w-1/3 lg:w-1/2 lg:text-lg lg:pl-20">
                Created by :
              </div>
              <div
                className=" text-left grow cursor-pointer  "
                title={jobDesc.createdByName}
              >
                {jobDesc.createdByName}
              </div>
            </div>{" "}
            <div className="flex flex-grow my-2 items-center">
              <div className=" w-1/3 lg:w-1/2 lg:text-lg lg:pl-20">
                Starts At :
              </div>
              <div
                className=" text-left grow cursor-pointer  "
                title={jobDesc.range[0]}
              >
                {jobDesc.range[0]}
              </div>
            </div>{" "}
            <div className="flex flex-grow my-2 items-center">
              <div className=" w-1/3 lg:w-1/2 lg:text-lg lg:pl-20">
                Ends At :
              </div>
              <div
                className=" text-left grow cursor-pointer  "
                title={jobDesc.range[1]}
              >
                {jobDesc.range[1]}
              </div>
            </div>{" "}
            <div className="flex flex-grow my-2 items-center">
              <div className=" w-1/3 lg:w-1/2 lg:text-lg  lg:pl-20">
                Description :
              </div>
              <div
                className=" text-left grow cursor-pointer line-clamp-4 "
                title={jobDesc.desc}
              >
                {jobDesc.desc}
              </div>
            </div>
          </div>
        ) : (
          "loading..."
        )}
      </div>
      <Modal
        // footer={null}
        open={isModalOpen}
        okButtonProps={{ style: { display: "none" } }}
        onCancel={closeModal}
      >
        <CreateInterview
          student={ApplicantData}
          company={jobDesc}
          closeModal={closeModal}
        ></CreateInterview>
      </Modal>
      {applications ? (
        <div className="flex gap-3 flex-wrap min-w-full justify-center md:justify-start  ">
          {applications.map((elem, index) => (
            <div
              className="sm:w-full lg:w-[49%]  border rounded-md bg-slate-200 p-4 shadow-md shadow-slate-400 hover:bg-gray-200  hover:shadow-none "
              key={index}
            >
              <div className="text-2xl font-bold text-center mb-4">
                Applicant Details
              </div>
              <div className="flex flex-grow my-2 ">
                <div className="w-1/4 md:w-1/3 xl:ml-11 xl:text-lg  mx-3 text-left ml-5 grow  ">
                  Name:
                </div>
                <div
                  className=" w-3/4 md:w-2/3 xl:ml-11 xl:text-lg mx-3 text-left grow cursor-pointer  "
                  title={elem.userName}
                >
                  {elem.userName}
                </div>
              </div>
              <div className="flex flex-grow my-2">
                <div className=" w-1/4 md:w-1/3 xl:ml-11 xl:text-lg  mx-3 text-left ml-5 grow  ">
                  DOB:
                </div>
                <div
                  className=" w-3/4 md:w-2/3 xl:ml-11 xl:text-lg mx-3 text-left grow cursor-pointer  "
                  title={elem.DOB}
                >
                  {elem.DOB}
                </div>
              </div>
              <div className="flex flex-grow my-2">
                <div className=" w-1/4 md:w-1/3 xl:ml-11 xl:text-lg  mx-3 text-left ml-5 grow  ">
                  email :{" "}
                </div>
                <div
                  className=" w-3/4 md:w-2/3 xl:ml-11 xl:text-lg mx-3 text-left grow cursor-pointer  "
                  title={elem.email}
                >
                  {elem.email}
                </div>
              </div>
              <div className="flex flex-grow my-2">
                <div className=" w-1/4 md:w-1/3 xl:ml-11 xl:text-lg  mx-3 text-left ml-5 grow  ">
                  contact:
                </div>
                <div
                  className=" w-3/4 md:w-2/3 xl:ml-11 xl:text-lg mx-3 text-left grow cursor-pointer  "
                  title={elem.mobileNumber}
                >
                  {elem.mobileNumber}
                </div>
              </div>
              <div className="flex flex-grow my-2">
                <div className=" w-1/4 md:w-1/3 xl:ml-11 xl:text-lg  mx-3 text-left ml-5 grow  ">
                  Address:{" "}
                </div>
                <div
                  className=" w-3/4 md:w-2/3 xl:ml-11 xl:text-lg mx-3 text-left grow cursor-pointer line-clamp-2 "
                  title={elem.address}
                >
                  {elem.address}
                </div>
              </div>
              <div className="flex flex-grow my-2">
                <div className=" w-1/4 md:w-1/3 xl:ml-11 xl:text-lg  mx-3 text-left ml-5 grow  ">
                  About:
                </div>
                <div
                  className=" w-3/4 md:w-2/3 xl:ml-11 xl:text-lg mx-3 text-left grow cursor-pointer line-clamp-4 "
                  title={elem.Bio}
                >
                  {elem.Bio}
                </div>
              </div>
              <div className="flex flex-grow my-2">
                <div className=" w-1/4 md:w-1/3 xl:ml-11 xl:text-lg  mx-3 text-left ml-5 grow  ">
                  University:
                </div>
                <div
                  className=" w-3/4 md:w-2/3 xl:ml-11 xl:text-lg mx-3 text-left grow cursor-pointer  "
                  title={elem.university}
                >
                  {elem.university}
                </div>
              </div>
              <div className="flex flex-grow my-2">
                <div className=" w-1/4 md:w-1/3 xl:ml-11 xl:text-lg  mx-3 text-left ml-5 grow  ">
                  Degree:
                </div>
                <div
                  className=" w-3/4 md:w-2/3 xl:ml-11 xl:text-lg mx-3 text-left grow cursor-pointer  "
                  title={elem.degree}
                >
                  {elem.degree}
                </div>
              </div>
              <div className="flex flex-grow my-2">
                <div className=" w-1/4 md:w-1/3 xl:ml-11 xl:text-lg  mx-3 text-left ml-5 grow  ">
                  CGPA:
                </div>
                <div
                  className=" w-3/4 md:w-2/3 xl:ml-11 xl:text-lg mx-3 text-left grow cursor-pointer  "
                  title={elem.CGPA}
                >
                  {elem.CGPA}
                </div>
              </div>
              <div className="flex flex-grow my-2">
                {/* <div className=" w-1/4 md:w-1/3 xl:ml-11 xl:text-lg  mx-3 text-left ml-5 grow  ">
                  resume:
                </div> */}
                <div className=" w-3/4 md:w-2/3 lg:w-1/2 lg:text-lg text-center grow  ">
                  <Link href={elem.resume}>Download Resume</Link>
                </div>
              </div>
              <div className=" text-center">
                <Button
                  className="w-10/12 "
                  type="primary"
                  onClick={() => {
                    setApplicantData(elem);
                    setIsModalOpen(true);
                  }}
                >
                  Schedule Interview
                </Button>
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

export default JobApplications;
