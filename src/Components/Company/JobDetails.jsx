import React from "react";

const JobDetails = (props) => {
  const jobDesc = props.data;

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
  return (
    <div className="sm:w-full   border rounded-md  p-4 mb-4 shadow-md shadow-slate-700">
      <div className="text-2xl font-bold text-center mb-4">Job Details</div>
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
        <div className=" w-1/3 lg:w-1/2 lg:text-lg lg:pl-20">Created by :</div>
        <div
          className=" text-left grow cursor-pointer  "
          title={jobDesc.createdByName}
        >
          {jobDesc.createdByName}
        </div>
      </div>{" "}
      <div className="flex flex-grow my-2 items-center">
        <div className=" w-1/3 lg:w-1/2 lg:text-lg lg:pl-20">Starts At :</div>
        <div
          className=" text-left grow cursor-pointer  "
          title={jobDesc.range[0]}
        >
          {jobDesc.range[0]}
        </div>
      </div>{" "}
      <div className="flex flex-grow my-2 items-center">
        <div className=" w-1/3 lg:w-1/2 lg:text-lg lg:pl-20">Ends At :</div>
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
  );
};

export default JobDetails;
