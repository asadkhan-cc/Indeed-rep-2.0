import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../../FirebaseApp/firebase-config";
import { Button, Form, Modal } from "antd";
import CreateEvent from "./Company/CreateEvent";
import UpdateEvent from "./Company/UpdateEvent";
import UpdateEventModal from "./Company/UpdateEventModal";
import { userAuthDetail } from "../../pages/_app";

const ViewCalender = () => {
  const [collectionData, setCollectionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalData, setModalData] = useState(null);
  const clickRef = useRef(null);
  const userAuthDetailContext = useContext(userAuthDetail);

  useEffect(() => {
    /**
     * What Is This?
     * This is to prevent a memory leak, in the off chance that you
     * teardown your interface prior to the timed method being called.
     */
  }, []);

  const onSelectEvent = useCallback((calEvent) => {
    /**
     * Here we are waiting 250 milliseconds (use what you want) prior to firing
     * our method. Why? Because both 'click' and 'doubleClick'
     * would fire, in the event of a 'doubleClick'. By doing
     * this, the 'click' handler is overridden by the 'doubleClick'
     * action.
     */
    setModalData(calEvent);
    window.clearTimeout(clickRef?.current);
    clickRef.current = window.setTimeout(() => {
      try {
      } catch {
      } finally {
        setIsModalOpen((prev) => !prev);
      }

      console.log(calEvent, "onSelectEvent");
    }, 250);
  }, []);

  // const onDoubleClickEvent = useCallback((calEvent) => {
  //   /**
  //    * Notice our use of the same ref as above.
  //    */
  //   window.clearTimeout(clickRef?.current);
  //   clickRef.current = window.setTimeout(() => {
  //     window.alert(calEvent, "onDoubleClickEvent");
  //   }, 250);
  // }, []);

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

  const fetchingData = () => {
    const data = getAllJobEvents();
    data
      .then((e) => {
        if (collectionData?.length === e.length) {
          console.log("IF Loop Working");
          // console.log(e, collectionData);
        } else {
          setCollectionData(e);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    // setInterval(() => {
    //   fetchingData();
    //   console.log("setInterval Running");
    // }, 10000);
    const data = getAllJobEvents();
    data
      .then((e) => {
        // console.log(e, "before");
        setCollectionData(e);
        // console.log(e, "after");
      })
      .catch((err) => {
        console.error(err);
      });
    return () => {
      window.clearTimeout(clickRef?.current);
    };
  }, []);
  const onCreate = (values) => {
    values.start = Timestamp.fromDate(values.range[0].toDate());
    values.end = Timestamp.fromDate(values.range[1].toDate());
    values.updatedBy = userAuthDetailContext?.user.email;
    // values.range = [
    //   values.range[0].toDate().toLocaleString(),
    //   values.range[1].toDate().toLocaleString(),
    // ];
    console.log(
      values.range[0].toDate().toLocaleString(),
      "jbahdasdkaisdiuabuidbaiuhbdouhasuobdouaoduoasbndujabdiabiudhbihikdjhanjklsdlk"
    );
    console.log(values.range[0].toDate().toLocaleString(), "value.range");
    console.log("Received values of form: ", values);
    setIsModalOpen(false);
  };
  const defaultDate = useMemo(() => new Date(), []);
  // console.log(collectionData, "collectionData");
  // console.log(modalData, "modalData");
  return (
    <>
      <div style={{ height: 500 }}>
        {collectionData ? (
          <Calendar
            events={collectionData}
            localizer={localizer}
            Views={["month", "day", "Week"]}
            defaultDate={defaultDate}
            defaultView="month"
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            // onDoubleClickEvent={onDoubleClickEvent}
            onSelectEvent={onSelectEvent}
          />
        ) : (
          <div className="text-center">
            <Button loading={true} disabled>
              Loading
            </Button>
          </div>
        )}
      </div>
      <UpdateEventModal
        open={isModalOpen}
        onCreate={onCreate}
        onCancel={(e) => {
          setIsModalOpen(false);
          console.log(e, "e from Update Event Modal cancel");
        }}
        data={modalData}
      ></UpdateEventModal>
    </>
  );
};

export default ViewCalender;
