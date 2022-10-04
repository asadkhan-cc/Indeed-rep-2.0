import { async } from "@firebase/util";
import { Button, Checkbox, DatePicker, Form, Input, Space } from "antd";
import {
  addDoc,
  collection,
  doc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../../../FirebaseApp/firebase-config";
import { userAuthDetail } from "../../../pages/_app";
const { RangePicker } = DatePicker;
const UpdateEvent = (props) => {
  const [form] = Form.useForm();
  const eventDate = [moment(props.data.start), moment(props.data.end)];
  const propsDataFromDB = props?.data;
  const userAuthDetailContext = useContext(userAuthDetail);
  const [allDayEvent, setAllDayEvent] = useState(true);
  const [rangeString, setRangeString] = useState(null);
  const [btnLoader, setBtnLoader] = useState(false);
  const [initialFormValues, setInitialFormValues] = useState({});
  useEffect(() => {
    setInitialFormValues({
      title: props.data.title,
      allDay: props.data.allDay,
      range: eventDate,
      desc: props.data.desc,
    });
  }, [props.data]);

  const onDateChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    setRangeString(dateString);
    // console.log("Formatted Selected Time: ", dateString);
  };
  const checkBoxValChecker = (eve) => {
    console.log(eve);
    setAllDayEvent((prev) => !prev);
  };
  function valueChecker(param) {
    Object.keys(param).forEach((key) => {
      if (param[key] === undefined) {
        param[key] = "null";
      }
    });
  }
  const UpdateEventInFireStore = async (data) => {
    //  kjasdkjajldhsalkdghasbvdkjasjldasjdjkabsdjasjkdbjkadsjknaslkjndh
    try {
      const jobEventRef = doc(db, "jobEvents", props?.data?.id);
      await updateDoc(jobEventRef, data);

      setBtnLoader((prev) => !prev);
    } catch (error) {
      console.error("Error adding document: ", error);
      setBtnLoader((prev) => !prev);
    }
  };
  const formSubmitHandler = (values, eve) => {
    values.allDay = allDayEvent;
    values.start = Timestamp.fromDate(values.range[0].toDate());
    values.end = Timestamp.fromDate(values.range[1].toDate());
    values.createdBy = userAuthDetailContext?.user.email;
    values.range = rangeString;
    console.log(values, form, "    Event   ");
    // UpdateEventInFireStore(values);
  };
  const yes = "is Event All Day = Yes!";
  const no = "is Event All Day = No!";
  console.log(props.data, "props.data");
  console.log(initialFormValues, "initialFormValues");
  return (
    <div>
      {/* <Space className="text-center ">
        <Button type="primary">Edit</Button>
      </Space> */}
      <div className="text-center">
        <p className="text-xl font-bold">{props.data.title}</p>
        <p>Created by :{props.data.createdBy}</p>
        Desc:
        <p>{props.data.desc || props.data.Desc || "No Description Given"}</p>
        <p>{props.data.allDay ? yes : no}</p>
        {props.data.range ? (
          <>
            <p>Starts at : {props.data.range[0]}</p>
            <p>ends at : {props.data.range[1]}</p>
          </>
        ) : (
          "Loading"
        )}
      </div>
      <Form
        form={form}
        onFinish={formSubmitHandler}
        initialValues={{
          title: props.data.title,
          allDay: props.data.allDay,
          range: eventDate,
          desc: props.data.desc,
        }}
      >
        <Form.Item name="title" label="Event Title">
          <Input type="text"></Input>
        </Form.Item>
        <Form.Item name="allDay">
          <Checkbox value={allDayEvent} onChange={checkBoxValChecker}>
            Allday
          </Checkbox>
        </Form.Item>
        <Form.Item label="Select Range Of Event" name="range">
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
          <Input type="text"></Input>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={btnLoader}>
            Edit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateEvent;
