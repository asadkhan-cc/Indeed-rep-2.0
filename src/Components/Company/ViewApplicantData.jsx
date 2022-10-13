import { Button } from "antd";
import Link from "next/link";
import React from "react";

const ViewApplicantData = ({ student }) => {
  return (
    <div className="">
      <div className="flex flex-grow my-2 ">
        <div className="w-20  xl:ml-11 xl:text-base  mx-3 text-left ml-5 grow  ">
          Name:
        </div>
        <div
          className=" w-3/4 md:w-2/3 xl:ml-11 xl:text-base mx-3 text-left grow cursor-pointer  "
          title={student.userName}
        >
          {student.userName}
        </div>
      </div>
      <div className="flex flex-grow my-2">
        <div className=" w-20  xl:ml-11 xl:text-base  mx-3 text-left ml-5 grow  ">
          DOB:
        </div>
        <div
          className=" w-3/4 md:w-2/3 xl:ml-11 xl:text-base mx-3 text-left grow cursor-pointer  "
          title={student.DOB}
        >
          {student.DOB}
        </div>
      </div>
      <div className="flex flex-grow my-2">
        <div className=" w-20  xl:ml-11 xl:text-base  mx-3 text-left ml-5 grow  ">
          email :{" "}
        </div>
        <div
          className=" w-3/4 md:w-2/3 xl:ml-11 xl:text-base mx-3 text-left grow cursor-pointer  "
          title={student.email}
        >
          {student.email}
        </div>
      </div>
      <div className="flex flex-grow my-2">
        <div className=" w-20  xl:ml-11 xl:text-base  mx-3 text-left ml-5 grow  ">
          contact:
        </div>
        <div
          className=" w-3/4 md:w-2/3 xl:ml-11 xl:text-base mx-3 text-left grow cursor-pointer  "
          title={student.mobileNumber}
        >
          {student.mobileNumber}
        </div>
      </div>
      <div className="flex flex-grow my-2">
        <div className=" w-20  xl:ml-11 xl:text-base  mx-3 text-left ml-5 grow  ">
          Address:{" "}
        </div>
        <div
          className=" w-3/4 md:w-2/3 xl:ml-11 xl:text-base mx-3 text-left grow cursor-pointer line-clamp-2 "
          title={student.address}
        >
          {student.address}
        </div>
      </div>
      <div className="flex flex-grow my-2">
        <div className=" w-20  xl:ml-11 xl:text-base  mx-3 text-left ml-5 grow  ">
          About:
        </div>
        <div
          className=" w-3/4 md:w-2/3 xl:ml-11 xl:text-base mx-3 text-left grow cursor-pointer line-clamp-4 "
          title={student.Bio}
        >
          {student.Bio}
        </div>
      </div>
      <div className="flex flex-grow my-2">
        <div className=" w-20  xl:ml-11 xl:text-base  mx-3 text-left ml-5 grow  ">
          University:
        </div>
        <div
          className=" w-3/4 md:w-2/3 xl:ml-11 xl:text-base mx-3 text-left grow cursor-pointer  "
          title={student.university}
        >
          {student.university}
        </div>
      </div>
      <div className="flex flex-grow my-2">
        <div className=" w-20  xl:ml-11 xl:text-base  mx-3 text-left ml-5 grow  ">
          Degree:
        </div>
        <div
          className=" w-3/4 md:w-2/3 xl:ml-11 xl:text-base mx-3 text-left grow cursor-pointer  "
          title={student.degree}
        >
          {student.degree}
        </div>
      </div>
      <div className="flex flex-grow my-2">
        <div className=" w-20  xl:ml-11 xl:text-base  mx-3 text-left ml-5 grow  ">
          CGPA:
        </div>
        <div
          className=" w-3/4 md:w-2/3 xl:ml-11 xl:text-base mx-3 text-left grow cursor-pointer  "
          title={student.CGPA}
        >
          {student.CGPA}
        </div>
      </div>
      <div className="flex flex-grow my-2">
        {/* <div className=" w-20  xl:ml-11 xl:text-base  mx-3 text-left ml-5 grow  ">
                        resume:
                      </div> */}
        <div className=" w-3/4 md:w-2/3 lg:w-1/2 lg:text-base text-center grow  ">
          <Link href={student.resume}>Download Resume</Link>
        </div>
      </div>
    </div>
  );
};

export default ViewApplicantData;
