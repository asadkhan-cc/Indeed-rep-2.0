import { async } from "@firebase/util";
import { Button, Checkbox, DatePicker, Form, Input } from "antd";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { db } from "../../../FirebaseApp/firebase-config";
import { userAuthDetail } from "../../../pages/_app";
const { RangePicker } = DatePicker;
const CreateEvent = () => {
  const userAuthDetailContext = useContext(userAuthDetail);
  const [allDayEvent, setallDayEvent] = useState(true);
  const [rangeString, setRangeString] = useState(null);
  const [btnLoader, setBtnLoader] = useState(false);
  const onDateChange = (value, dateString) => {
    // console.log("Selected Time: ", value);
    setRangeString(dateString);
    console.log("Formatted Selected Time: ", dateString);
  };
  const checkBoxValChecker = (eve) => {
    console.log(eve);
    setallDayEvent((prev) => !prev);
  };
  const createEventInFireStore = async (data) => {
    try {
      const docRef = await addDoc(collection(db, "jobEvents"), data);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  const formSubmitHandler = (e) => {
    setBtnLoader((prev) => !prev);
    e.allDay = allDayEvent;
    e.start = Timestamp.fromDate(e.range[0].toDate());
    e.end = Timestamp.fromDate(e.range[1].toDate());
    e.createdBy = userAuthDetailContext?.user.email;
    e.range = rangeString;
    console.log(e, "    Event   ");
    createEventInFireStore(e);
    setBtnLoader((prev) => !prev);
  };
  return (
    <div>
      <Form onFinish={formSubmitHandler}>
        <Form.Item
          rules={[{ required: true, message: "Please Input Event Title!" }]}
          name="title"
          label="Event Title"
        >
          <Input type="text"></Input>
        </Form.Item>
        <Form.Item name="allDay">
          <Checkbox
            defaultChecked={true}
            value={allDayEvent}
            onChange={checkBoxValChecker}
          >
            Allday
          </Checkbox>
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please Select Range Of Event!" }]}
          label="Select Range Of Event"
          name="range"
        >
          <RangePicker
            showTime={{
              format: "HH:mm",
            }}
            format="DD/MM/YYYY HH:mm"
            onChange={onDateChange}
            // onOk={onOk}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={btnLoader}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateEvent;
