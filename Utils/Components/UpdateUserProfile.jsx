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
} from "antd";
import { auth, db } from "../../FirebaseApp/firebase-config";
import { doc, setDoc } from "firebase/firestore";
import moment from "moment";

const { TextArea } = Input;
const UpdateUserProfile = (props) => {
  const profileData = props.data;
  // let DOB = JSON.parse(profileData.DOB);
  console.log(profileData.DOB, "From server");
  const [toggleEdit, setToggleEdit] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const toggle = () => {
    setToggleEdit(!toggleEdit);
    console.log(toggleEdit);
  };
  const Role = "Admin";
  // function valueChecker(param) {
  //   Object.keys(param).forEach((key) => {
  //     if (param[key] === undefined) {
  //       param[key] = "null";
  //     }
  //   });
  // }

  const onSubmitHandeler = async (values) => {
    // setBtnLoading((prev) => !prev);
    // console.log(values, "Before Change");
    // valueChecker(values);

    values = {
      ...profileData,
      ...values,
    };
    // values.DOB = JSON.stringify(values.DOB._d);
    // values.DOB = values.DOB;
    console.log(values.DOB, "from Client before");
    values.DOB = values.DOB.toString();

    console.log(values.DOB, "from Client after str");
    const myMomentObject = moment(values.DOB, "YYYY-MM-DD");
    console.log(myMomentObject, "from Client again Convert");

    // setBtnLoading((prev) => !prev);
    // console.log("after change", values);
    // console.log("after change profileData", profileData);

    // try {
    //   const docRef = await setDoc(doc(db, "users", values.email), values);
    //   console.log("Document written with ID: ", values.email);
    //   setBtnLoading((prev) => !prev);
    // } catch (e) {
    //   console.error("Error adding document: ", e);
    //   setBtnLoading((prev) => !prev);
    // }
  };
  return (
    <div>
      Edit Profile :{" "}
      <Switch unchecked={toggleEdit.toString()} onClick={toggle} />
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        // onValuesChange={null}
        // disabled={false}
        onFinish={onSubmitHandeler}
        initialValues={{
          userName: props.data.userName,
          email: props.data.email,
          mobileNumber: props.data.mobileNumber,
          CNIC: props.data.CNIC,
          city: props.data.city,
          address: props.data.address,
          Bio: props.data.Bio,
          university: props.data.university,
          degree: props.data.degree,
          CGPA: props.data.CGPA,
          // DOB: JSON.parse(profileData.DOB),
        }}
        disabled={toggleEdit}
      >
        {/* ----------------------------------------------------------------------------------------------------- */}
        <div className="flex flex-grow justify-center align-middle items-center text-center">
          <h1>
            profileActivate : {profileData.profileActivate ? "Yes" : "NO"}
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
        <Form.Item label="Date Of Birth" name={"DOB"}>
          <DatePicker />
        </Form.Item>
        <Form.Item label="CNIC" name={"CNIC"}>
          <InputNumber
            max={9999999999999}
            min={1111111111111}
            maxLength={13}
            // type={"number"}
            style={{ width: "100%" }}
            // className="w-5/6"
          />
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
        <Form.Item label="Address" name={"address"}>
          <Input type="text" />
        </Form.Item>
        <Form.Item label="About" name={"Bio"}>
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="University" name={"university"}>
          <Select>
            <Select.Option value="Karachi University">
              Karachi University
            </Select.Option>
            <Select.Option value="Iqra University">
              Iqra University
            </Select.Option>
            <Select.Option value="IBA">IBA</Select.Option>
            <Select.Option value="LUMS">LUMS</Select.Option>
            <Select.Option value="Fast">Fast</Select.Option>
            <Select.Option value="Fuuast">Fuuast</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Degree" name={"degree"}>
          <Select>
            <Select.Option value="BSSE">BSSE</Select.Option>
            <Select.Option value="BSCS">BSCS</Select.Option>
            <Select.Option value="BBA">BBA</Select.Option>
            <Select.Option value="B.Com">B.Com</Select.Option>
            <Select.Option value="BA">BA</Select.Option>
            <Select.Option value="Engineering">Engineering</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="CGPA" name={"CGPA"}>
          <InputNumber max={4.0} min={0} />
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

export default UpdateUserProfile;
