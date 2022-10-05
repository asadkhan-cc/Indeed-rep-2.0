import React, { useState } from "react";
import CreateEvent from "../../Components/Company/CreateEvent";
import ViewCalender from "../../Components/ViewCalender";

const DashBoardPageCompany = () => {
  const [updateEvents, setUpdateEvents] = useState(1);
  const viewUpdatedEvent = (e) => {
    setUpdateEvents((prev) => prev + 1);
  };
  console.log(updateEvents, "stateupdateEventsstateupdateEvents");
  return (
    <div>
      <CreateEvent setUpdateEvents={viewUpdatedEvent}></CreateEvent>
      <ViewCalender updateEvent={updateEvents}></ViewCalender>
    </div>
  );
};

export default DashBoardPageCompany;
