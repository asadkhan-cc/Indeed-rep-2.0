import { Button, Checkbox, DatePicker, Form, Input, Modal, Radio } from "antd";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
const { RangePicker } = DatePicker;

const UpdateEventModal = ({ open, onCreate, onCancel, data }) => {
  const [form] = Form.useForm();
  const [allDayEvent, setAllDayEvent] = useState(null);
  const [rangeString, setRangeString] = useState(null);
  const [formValues, setFormValues] = useState(null);
  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
    setAllDayEvent(data?.allDay);
    form.setFieldsValue({
      title: data?.title,
      allDay: data?.allDay,
      range: eventDate,
      desc: data?.desc,
    });

    // console.log("useeffect rendered");
  }, [data]);

  const onDateChange = (value, dateString) => {
    // console.log("Selected Time: ", value, dateString);
    setRangeString(dateString);
    // console.log("Formatted Selected Time: ", dateString);
  };
  const eventDate = [moment(data?.start), moment(data?.end)];
  const checkBoxValChecker = (eve) => {
    setAllDayEvent((prev) => !prev);
  };
  // console.log(formValues, "formValues");
  return (
    <Modal
      open={open}
      title="Event Details"
      okText="Update"
      cancelText="Cancel"
      onCancel={() => {
        // form.resetFields();
        setFormValues({});
        onCancel();
      }}
      onOk={(v) => {
        console.log(v.target);
        form
          .validateFields()
          .then((values) => {
            values = {
              ...data,
              ...values,
              ...formValues,
            };
            // values.id = data.id;
            onCreate(values);
            setFormValues({});
            // form.resetFields();
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
        form.resetFields();
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          title: data?.title,
          allDay: data?.allDay,
          range: eventDate,
          desc: data?.desc,
        }}
        onValuesChange={(e) => {
          // console.log(e, "fromformchange");
          setFormValues((prev) => {
            return { ...prev, ...e };
          });
        }}
      >
        {data?.type == "Interview" ? (
          <div className="text-center">
            <h1>
              Event Type : <span>Interview</span>
            </h1>
          </div>
        ) : (
          <>
            <div className="mb-2 text-center">
              <Link href={`/dashboard/jobs/${data?.id}`}>
                View Job Applications
              </Link>
            </div>
            <Form.Item name="allDay" label="Select">
              <Checkbox
                value={allDayEvent}
                checked={allDayEvent}
                onChange={checkBoxValChecker}
              >
                Allday
              </Checkbox>
            </Form.Item>
          </>
        )}
        <Form.Item name="title" label="Event Title">
          <Input type="text"></Input>
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
        <Form.Item name="desc" label="Event Description">
          <TextArea type="text"></TextArea>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateEventModal;
