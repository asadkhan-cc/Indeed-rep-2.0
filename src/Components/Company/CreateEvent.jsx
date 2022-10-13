import { async } from "@firebase/util";
import { Button, Checkbox, DatePicker, Form, Input, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import moment from "moment";
import React, { useContext, useState } from "react";
import { db } from "../../../FirebaseApp/firebase-config";
import { userAuthDetail } from "../../../pages/_app";
const { RangePicker } = DatePicker;
const CreateEvent = (props) => {
  const userAuthDetailContext = useContext(userAuthDetail);
  const [allDayEvent, setallDayEvent] = useState(true);
  const [rangeString, setRangeString] = useState(null);
  const [btnLoader, setBtnLoader] = useState(false);
  const onDateChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    setRangeString(dateString);
    // console.log("Formatted Selected Time: ", dateString);
  };
  const checkBoxValChecker = (eve) => {
    setallDayEvent((prev) => !prev);
  };
  const createEventInFireStore = async (data) => {
    try {
      const docRef = await addDoc(collection(db, "jobEvents"), data);
      console.log("Document written with ID: ", docRef.id);
      setBtnLoader((prev) => !prev);
    } catch (error) {
      console.error("Error adding document: ", error);
      setBtnLoader((prev) => !prev);
    }
  };
  const formSubmitHandler = (e) => {
    setBtnLoader((prev) => !prev);
    e.allDay = allDayEvent;
    e.start = Timestamp.fromDate(e.range[0].toDate());
    e.end = Timestamp.fromDate(e.range[1].toDate());
    e.createdBy = userAuthDetailContext?.user.email;
    e.createdByName = userAuthDetailContext?.profileData.userName;
    e.range = rangeString;
    e.type = "Job";
    console.log(e, "    Event   ");
    createEventInFireStore(e).then((res) => {
      message.success("Event Created");
      props.setUpdateEvents();
      props.closeCreateEvent();
    });
  };
  return (
    <div className="border-black border py-3 px-5 mb-4">
      <div className="text-2xl font-extrabold text-center text-blue-600 my-2">
        Post Job
      </div>
      <Form
        onFinish={formSubmitHandler}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          rules={[{ required: true, message: "Please Input Event Title!" }]}
          name="title"
          label="Event Title"
        >
          <Input type="text"></Input>
        </Form.Item>
        <Form.Item name="allDay" label="All Day Event">
          <Checkbox
            defaultChecked={true}
            value={allDayEvent}
            onChange={checkBoxValChecker}
          ></Checkbox>
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
        <Form.Item
          rules={[
            { required: true, message: "Please Input Event Description!" },
          ]}
          name="desc"
          label="Event Description"
        >
          <TextArea type="text"></TextArea>
        </Form.Item>
        <Form.Item className="flex  justify-center">
          <Button type="primary" htmlType="submit" loading={btnLoader}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateEvent;
