import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../FirebaseApp/firebase-config";

const ViewCalander = () => {
  const [collectionData, setCollectionData] = useState(null);
  //first get the collection
  const getAllJobEvents = async () => {
    const querySnapshot = await getDocs(collection(db, "jobEvents"));
    const queryData = await querySnapshot.docs;
    const arrQueryData = [];
    const arrQueryID = [];
    const arr = await queryData.forEach((e) => {
      arrQueryID.push(e.id);
      arrQueryData.push(e.data());
    });
    arrQueryData.map((elem, index) => {
      elem.id = arrQueryID[index];
      elem.start = elem.start.toDate();
      elem.end = elem.end.toDate();
    });
    // console.log(arrQueryData, "arrQueryData");
    return arrQueryData;
  };
  //now check for auth Role <string>User||Company||Admin<string>
  //if "User" show all jobEvent if "Company" check createdBy first then only show data created by the company
  useEffect(() => {
    const data = getAllJobEvents();
    data
      .then((e) => {
        console.log(e, "before");
        setCollectionData(e);
        console.log(e, "after");
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  // console.log(collectionData);
  return (
    <>
      <div style={{ height: 700 }}>
        {collectionData ? (
          <Calendar
            events={collectionData}
            localizer={localizer}
            Views={["month", "day", "Week"]}
            defaultDate={new Date()}
            defaultView="month"
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        ) : (
          <div>Loading</div>
        )}
      </div>
    </>
  );
};

export default ViewCalander;
