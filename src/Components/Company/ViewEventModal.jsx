import { async } from "@firebase/util";
import { DatePicker, Tooltip } from "antd";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { userAuthDetail } from "../../../pages/_app";
const ViewEventModal = (props) => {
  const eventDate = [moment(props.data.start), moment(props.data.end)];
  const userAuthDetailContext = useContext(userAuthDetail);

  const yes = (
    <>
      <span className="text-left mr-4 font-bold text-lg">Event All Day :</span>{" "}
      <span className=" w-48 whitespace-nowrap overflow-hidden text-ellipsis  text-left text-green-500 underline md:absolute right-20">
        Yes!
      </span>
    </>
  );
  const no = (
    <>
      <span className="text-left mr-4 font-bold text-lg">Event All Day :</span>{" "}
      <span className=" w-48 whitespace-nowrap overflow-hidden text-ellipsis  text-left text-red-500 underline md:absolute right-20">
        No!
      </span>
    </>
  );
  console.log(props.data, "props.data");
  return (
    <div>
      <div className="text-center">
        <p className="text-2xl font-bold text-blue-900 uppercase line-clamp-2">
          {props.data.title}
        </p>
        <div className=" ml-10">
          {props.data.createdByName ? (
            <p className="flex-col md:flex md:relative">
              <span className=" text-left mr-4 font-bold text-lg">
                Posted by :
              </span>
              <span className="text-left w-48 whitespace-nowrap overflow-hidden text-ellipsis self-end md:absolute right-20">
                {props.data.createdByName}
              </span>
            </p>
          ) : (
            <p className="flex-col md:flex md:relative">
              <span className=" text-left mr-4 font-bold text-lg">
                Created by :
              </span>
              <span className="text-left w-48 whitespace-nowrap overflow-hidden text-ellipsis self-end md:absolute right-20">
                {" "}
                {props.data.createdBy}
              </span>
            </p>
          )}
          <div className=" h-16 flex-col md:flex md:relative">
            <span className="w-48 text-left mr-4 font-bold text-lg">
              Desc:{" "}
            </span>
            <span className=" w-48 h-16 text-left line-clamp-3 md:absolute right-20">
              <Tooltip
                placement="left"
                title={
                  props.data.desc || props.data.Desc || "No Description Given"
                }
              >
                {props.data.desc || props.data.Desc || "No Description Given"}
              </Tooltip>
            </span>
          </div>

          <p className="flex-col md:flex md:relative">
            {props.data.allDay ? yes : no}
          </p>
          {props.data.range ? (
            <>
              <p className="flex-col md:flex md:relative">
                <span className=" text-left mr-4 font-bold text-lg">
                  Starts at :{" "}
                </span>
                <span className="text-left w-48 whitespace-nowrap overflow-hidden text-ellipsis self-end md:absolute right-20">
                  {props.data.range[0]}
                </span>
              </p>
              <p className="flex-col md:flex md:relative">
                <span className=" text-left mr-4 font-bold text-lg">
                  ends at :{" "}
                </span>
                <span className="text-left w-48 whitespace-nowrap overflow-hidden text-ellipsis self-end md:absolute right-20">
                  {props.data.range[1]}
                </span>{" "}
              </p>
            </>
          ) : (
            "Loading"
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewEventModal;
