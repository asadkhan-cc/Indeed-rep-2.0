import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useState } from "react";
import CreateEvent from "../../Components/Company/CreateEvent";
import ViewCalender from "../../Components/ViewCalender";

const DashBoardPageCompany = () => {
  const [updateEvents, setUpdateEvents] = useState(1);
  const [ViewCreateEvent, setViewCreateEvent] = useState(true);
  const viewUpdatedEvent = (e) => {
    setUpdateEvents((prev) => prev + 1);
  };
  return (
    <div>
      {ViewCreateEvent ? (
        <div className="my-2 mb-9 align-middle text-center">
          <Button
            onClick={() => {
              setViewCreateEvent(false);
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
            onClick={() => {
              setViewCreateEvent(true);
            }}
          />
          <CreateEvent setUpdateEvents={viewUpdatedEvent}></CreateEvent>
        </>
      )}
      <ViewCalender updateEvent={updateEvents}></ViewCalender>
    </div>
  );
};

export default DashBoardPageCompany;
