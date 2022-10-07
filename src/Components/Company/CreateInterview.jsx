import { async } from "@firebase/util";
import { Button, Checkbox, DatePicker, Form, Input, message } from "antd";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import moment from "moment";
import React, { useContext, useState } from "react";
import { db } from "../../../FirebaseApp/firebase-config";
import { userAuthDetail } from "../../../pages/_app";
const { RangePicker } = DatePicker;
const CreateInterview = (props) => {
  const userAuthDetailContext = useContext(userAuthDetail);
  const [rangeString, setRangeString] = useState(null);
  const [btnLoader, setBtnLoader] = useState(false);
  const onDateChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    setRangeString(dateString);
    // console.log("Formatted Selected Time: ", dateString);
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
    e.allDay = false;
    e.start = Timestamp.fromDate(e.range[0].toDate());
    e.end = Timestamp.fromDate(e.range[1].toDate());
    e.createdBy = userAuthDetailContext?.user.email;
    e.createdByName = userAuthDetailContext?.profileData.userName;
    e.range = rangeString;
    e.interviewee = props?.student?.userName;
    e.intervieweeEmail = props?.student?.userName;
    e.interviewer = props?.company?.createdBy;
    e.interviewerEmail = props?.company?.createdByName;
    e.type = "Interview";
    console.log(e, "    Event   ");
    setBtnLoader(false);

    // createEventInFireStore(e).then((res) => {
    props.closeModal();
    //   message.success("Event Created");
    // });
  };
  console.log(
    props,
    "PROPS PROPS PROPS PROPS PROPS PROPS PROPS PROPSPROPSPROPSPROPS PROPS PROPSPROPS PROPS"
  );
  return (
    <div className=" py-3 px-5 ">
      <div className="text-2xl font-extrabold text-center text-blue-600 my-2">
        Create Interview
      </div>
      <div className="text-center text-lg p-1 mb-2">
        Scheduling Interview For
        <span className="text-blue-500"> {props?.student?.userName}</span>
      </div>
      <Form
        onFinish={formSubmitHandler}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          rules={[{ required: true, message: "Please Input Subject!" }]}
          name="title"
          label="Subject"
        >
          <Input type="text"></Input>
        </Form.Item>

        <Form.Item
          rules={[
            { required: true, message: "Please Select Range Of Interview!" },
          ]}
          label="Date and Duration"
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
            {
              required: true,
              message: "Please Input Event Interview Details!",
            },
          ]}
          name="desc"
          label="Details"
        >
          <Input type="text"></Input>
        </Form.Item>
        <Form.Item className="flex  justify-center absolute bottom-6 right-[50%] translate-x-10">
          <Button type="primary" htmlType="submit" loading={btnLoader}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateInterview;
