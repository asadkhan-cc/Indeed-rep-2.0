import { CloseOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import React, { useContext, useState } from "react";
import { userAuthDetail } from "../../../pages/_app";
import CreateEvent from "../../Components/Company/CreateEvent";
import ViewCalender from "../../Components/ViewCalender";

const DashBoardPageCompany = () => {
  const userAuthDetailContext = useContext(userAuthDetail);

  const [updateEvents, setUpdateEvents] = useState(1);
  const [viewCreateEvent, setViewCreateEvent] = useState(true);
  const closeCreateEvent = () => {
    setViewCreateEvent(true);
  };
  const viewUpdatedEvent = (e) => {
    setUpdateEvents((prev) => prev + 1);
  };
  return (
    <div>
      {viewCreateEvent ? (
        <div className="my-2 mb-9 align-middle text-center">
          <Button
            onClick={() => {
              if (userAuthDetailContext?.profileData?.isActive == true) {
                setViewCreateEvent(false);
              } else {
                message.warn("Profile Not Activated By Admin");
              }
            }}
            type="primary"
          >
            Create Event
          </Button>
        </div>
      ) : (
        <>
          <CloseOutlined
            className="absolute right-14 top-24 "
            onClick={closeCreateEvent}
          />
          <CreateEvent
            setUpdateEvents={viewUpdatedEvent}
            closeCreateEvent={closeCreateEvent}
          ></CreateEvent>
        </>
      )}
      <ViewCalender updateEvent={updateEvents}></ViewCalender>
    </div>
  );
};

export default DashBoardPageCompany;
