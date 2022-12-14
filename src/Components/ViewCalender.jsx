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
import {
  doc,
  setDoc,
  collection,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../FirebaseApp/firebase-config";
import { Button, Form, message, Modal } from "antd";
import CreateEvent from "./Company/CreateEvent";
import UpdateEventModal from "./Company/UpdateEventModal";
import { userAuthDetail } from "../../pages/_app";
import ViewEventModal from "./Company/ViewEventModal";
import EventWrapper from "./EventWrapper";

const ViewCalender = ({ updateEvent }) => {
  const [collectionData, setCollectionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newEventReRender, setNewEventReRender] = useState(0);
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
  useEffect(() => {
    const data = getAllJobEvents();
    data
      .then((res) => {
        if (userAuthDetailContext.profileData.role == "User") {
          const data = res.filter((elem) => {
            if (
              elem.type === "Interview" &&
              elem.intervieweeEmail !== userAuthDetailContext.profileData.email
            ) {
              //elem.intervieweeEmail==userAuthDetailContext.profileData.email
              //  console.log(elem);
              return;
            } else {
              return elem;
            }
          });
          setCollectionData(data);
        } else {
          if (userAuthDetailContext.profileData.role == "Company") {
            const data = res.filter((elem) => {
              if (
                (elem.type === "Job" &&
                  elem.createdBy !== userAuthDetailContext.profileData.email) ||
                (elem.type === "Interview" &&
                  elem.interviewerEmail !==
                    userAuthDetailContext.profileData.email)
              ) {
                // console.log(elem);
                return;
              } else {
                return elem;
              }
            });
            setCollectionData(data);
          } else {
            setCollectionData(res);
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
    return () => {
      window.clearTimeout(clickRef?.current);
    };
  }, [newEventReRender, updateEvent]);

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
  function valueChecker(param) {
    Object.keys(param).forEach((key) => {
      if (param[key] === undefined) {
        param[key] = "null";
      }
    });
  }
  const updateEventInFireStore = async (val) => {
    try {
      const eventRef = await doc(db, "jobEvents", val.id);
      await setDoc(eventRef, val, { merge: true });
      message.success("Event Successfully Updated !");
    } catch (error) {
      message.success("Error Updating Event !");
    }
  };
  const onCreate = (values) => {
    values.start = Timestamp.fromDate(values.range[0].toDate());
    values.end = Timestamp.fromDate(values.range[1].toDate());
    values.updatedBy = userAuthDetailContext?.user.email;
    const newrange = [
      values.range[0].toDate().toLocaleString(),
      values.range[1].toDate().toLocaleString(),
    ];
    console.log(
      values.range[0].toDate().toLocaleString(),
      "values.range[0].toDate().toLocaleString()"
    );
    console.log(newrange, " newrange newrange newrange value.range");
    values.range = newrange;
    valueChecker(values);
    //getting final values ready to be updated in fire store
    updateEventInFireStore(values).then((res) => {
      setNewEventReRender((prev) => prev + 1);
    });
    console.log("Received values of form: ", values);
    setIsModalOpen(false);
  };
  const addJobApplicationInFireStore = async (eventDoc) => {
    const jobApplicationRef = doc(
      db,
      "jobEvents",
      eventDoc,
      "jobApplications",
      userAuthDetailContext.profileData.email
    );
    try {
      const docSet = await setDoc(
        jobApplicationRef,
        userAuthDetailContext.profileData
      );
      return docSet;
    } catch (error) {
      return error;
    }
  };
  const defaultDate = useMemo(() => new Date(), []);
  // console.log(collectionData);
  console.log(userAuthDetailContext, "  userAuthDetailContext");
  return (
    <>
      <div style={{ height: 600, overflow: "auto" }}>
        <div style={{ maxHeight: 500, minWidth: 630 }}>
          {collectionData ? (
            <Calendar
              events={collectionData}
              localizer={localizer}
              Views={["month", "day", "Week"]}
              defaultDate={defaultDate}
              defaultView="month"
              startAccessor="start"
              endAccessor="end"
              style={{ height: 600 }}
              // components={{
              //   eventWrapper: EventWrapper,
              // }}
              eventPropGetter={(myEventsList) => {
                const bgcolor =
                  myEventsList.type == "Interview" ? "#28a745" : "#1890ff";
                const color =
                  myEventsList.type == "Interview" ? "white" : "white";
                const Weight =
                  myEventsList.type == "Interview" ? "bold" : "normal";

                return {
                  style: {
                    backgroundColor: bgcolor,
                    color: color,
                    fontWeight: Weight,
                  },
                };
              }}
              // fontSize: "0.1rem",
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
      </div>
      {/* Conditional Rendering STUDENTS MODAL BELOW for role = User */}
      {userAuthDetailContext?.profileData?.role === "User" ? (
        <Modal
          open={isModalOpen}
          className="cursor-pointer"
          title="Event Details"
          okText="APPLY FOR JOB"
          cancelText="Cancel"
          okButtonProps={
            modalData?.type == "Interview" ? { style: { display: "none" } } : {}
          }
          onCancel={() => {
            setIsModalOpen(false);
          }}
          onOk={() => {
            console.log(modalData.id);
            message.success("Processing...!");
            addJobApplicationInFireStore(modalData.id).then((res) => {
              console.log(
                res,
                "response from Fire-Store on successful Job Application"
              );
              message.success("Job Application Send Successfully!");
            });
            // adding sub collection data for job application here
            setIsModalOpen(false);
          }}
        >
          <ViewEventModal data={modalData} />
        </Modal>
      ) : (
        <UpdateEventModal
          open={isModalOpen}
          onCreate={onCreate}
          onCancel={(e) => {
            setIsModalOpen(false);
            console.log(e, "e from Update Event Modal cancel");
          }}
          data={modalData}
        ></UpdateEventModal>
      )}
    </>
  );
};

export default ViewCalender;
