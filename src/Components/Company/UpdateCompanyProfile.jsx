import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Modal,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
  message,
} from "antd";
import { auth, db } from "../../../FirebaseApp/firebase-config";
import { doc, setDoc } from "firebase/firestore";
import moment from "moment";
import { useRouter } from "next/router";

const { TextArea } = Input;
const UpdateCompanyProfile = (props) => {
  const profileData = props.data;
  const router = useRouter();

  try {
    if (moment(profileData.DOB, "MM/DD/YYYY").isValid()) {
      profileData.DOB = moment(profileData.DOB, "MM/DD/YYYY");
    }
    // const dateStringToMomentValid = moment(dateString, "MM/DD/YYYY").isValid();
    // console.log(dateStringToMomentValid);
    // const dateStringToMoment = moment(dateString, "MM/DD/YYYY");
    // console.log(dateStringToMoment);
  } catch (err) {
    console.log(err);
    profileData.DOB = moment();
  }
  const [toggleEdit, setToggleEdit] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const toggle = () => {
    setToggleEdit(!toggleEdit);
    // console.log(toggleEdit);
  };
  function valueChecker(param) {
    Object.keys(param).forEach((key) => {
      if (param[key] === undefined) {
        param[key] = "null";
      }
    });
  }

  const onSubmitHandeler = async (values) => {
    setBtnLoading((prev) => !prev);
    // console.log(values, "Before Change");
    valueChecker(values);

    values = {
      ...profileData,
      ...values,
    };

    try {
      const docRef = await setDoc(doc(db, "users", values.email), values);
      console.log("Document written with ID: ", values.email);
      setBtnLoading((prev) => !prev);
      toggle();

      message.success("Successfully Updated Profile !");
    } catch (e) {
      console.error("Error adding document: ", e);
      message.error("Error Updated Profile !");

      setBtnLoading((prev) => !prev);
    }
    router.push("/profile");
  };
  return (
    <div>
      <p className="text-center">Update Company Profile</p>

      <div className="text-right">
        Edit Profile :{" "}
        <Switch
          defaultChecked={false}
          unchecked={toggleEdit.toString()}
          onChange={toggle}
        />
      </div>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={onSubmitHandeler}
        initialValues={{
          userName: props.data.userName,
          email: props.data.email,
          mobileNumber: props.data.mobileNumber,
          city: props.data.city,
          address: props.data.address,
          Bio: props.data.Bio,
          city: props.data.city,
          size: props.data.size,
          Type: props.data.Type,
        }}
        disabled={!toggleEdit}
      >
        {/* ----------------------------------------------------------------------------------------------------- */}
        <div className="flex flex-grow justify-center align-middle items-center text-center">
          <h1>
            Profile Activation Status :{" "}
            {profileData.profileActivate ? "Yes" : "NO"}
          </h1>
        </div>
        <Form.Item name={"userName"} label="Name">
          <Input />
        </Form.Item>
        <Form.Item name={"email"} label="Email">
          <Input placeholder={auth.currentUser?.email} disabled={true} />
        </Form.Item>
        <Form.Item label="Mobile" name={"mobileNumber"}>
          <Input type="number" />
        </Form.Item>
        <Form.Item label="About" name={"Bio"}>
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Address" name={"address"}>
          <Input type="text" />
        </Form.Item>
        <Form.Item label="City" name={"city"}>
          <Select>
            <Select.Option value="Karachi">Karachi</Select.Option>
            <Select.Option value="Lahore">Lahore</Select.Option>
            <Select.Option value="Hyderabad">Hyderabad</Select.Option>
            <Select.Option value="Islamabad">Islamabad</Select.Option>
            <Select.Option value="Quetta">Quetta</Select.Option>
            <Select.Option value="Peshawar">Peshawar</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Company Size" name={"size"}>
          <Select>
            <Select.Option value="10-20">10-20</Select.Option>
            <Select.Option value="20-50">20-50</Select.Option>
            <Select.Option value="50-100">50-100</Select.Option>
            <Select.Option value="100-200">100-200</Select.Option>
            <Select.Option value="B.200-400">200-400</Select.Option>
            <Select.Option value="500+">500+</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Company Type" name={"Type"}>
          <Select>
            <Select.Option value="Startup">Startup</Select.Option>
            <Select.Option value="Consultation">Consultation</Select.Option>
            <Select.Option value="Agency">Agency</Select.Option>
            <Select.Option value="SystemServices">
              System Services
            </Select.Option>
          </Select>
        </Form.Item>

        <div className="flex justify-center align-middle">
          <hr />
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={btnLoading}>
              Update
            </Button>
          </Form.Item>
        </div>
        {/* ----------------------------------------------------------------------------------------------------- */}
      </Form>
    </div>
  );
};

export default UpdateCompanyProfile;
