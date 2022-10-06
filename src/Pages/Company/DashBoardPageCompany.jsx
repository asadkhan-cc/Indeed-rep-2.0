import { Button } from "antd";
import React, { useState } from "react";
import CreateEvent from "../../Components/Company/CreateEvent";
import ViewCalender from "../../Components/ViewCalender";

const DashBoardPageCompany = () => {
  const [updateEvents, setUpdateEvents] = useState(1);
  const viewUpdatedEvent = (e) => {
    setUpdateEvents((prev) => prev + 1);
  };
  return (
    <div>
      {/* <Button type="primary">Create Event</Button>
      <Button type="primary">View Job Applications</Button> */}
      <CreateEvent setUpdateEvents={viewUpdatedEvent}></CreateEvent>
      <ViewCalender updateEvent={updateEvents}></ViewCalender>
    </div>
  );
};

export default DashBoardPageCompany;
