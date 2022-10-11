import moment from "moment";
import React from "react";

const EventWrapper = ({ event, children }) => {
  const { title, className } = children.props;
  const customClass =
    event.type == "Interview"
      ? `${className} rbc-event-global`
      : `${className} rbc-event--${event.type}`;
  const hourStart = moment(event.start).hour();
  const hourStop = moment(event.end).hour();
  const gridRowStart = hourStart + 1;

  console.log(
    ` gridRow: ${gridRowStart} / span ${hourStop - hourStart}`,
    "childrenchildrenchildrenchildrenchildrenchildrenchildren"
  );
  // console.log(children.style);
  return (
    <div
      title={title}
      className={customClass}
      style={{ gridRow: `${gridRowStart} / span ${hourStop - hourStart}` }}
      onClick={children.props.onClick}
    >
      {children.props.children}
    </div>
  );
};

export default EventWrapper;
