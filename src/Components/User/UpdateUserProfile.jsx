import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
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
  Tag,
} from "antd";
import { doc, setDoc } from "firebase/firestore";
import moment from "moment";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../../FirebaseApp/firebase-config";
import { useRouter } from "next/router";

const { TextArea } = Input;
const UpdateUserProfile = (props) => {
  const profileData = props.data;
  const router = useRouter();
  // uploading Image And geting Download Url
  // {{(*Start*)}}
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); //
  const [imageSnapShot, setImageSnapShot] = useState(null);
  var currentDate = new Date();
  var datetime = `${currentDate.getDate()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getFullYear()}on${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
  const imagesListRef = ref(storage, "Resume/");

  const uploadFile = async () => {
    if (imageUpload == null) return { snapshot: null, url: null };
    const imageRef = ref(
      storage,
      `Resume/${props?.data?.email}/${datetime + imageUpload?.file.name}`
    );
    const snapshot = await uploadBytes(
      imageRef,
      imageUpload.file.originFileObj
    );
    setImageSnapShot(snapshot.ref);
    const urlFromStorage = await getDownloadURL(snapshot.ref);
    setImageUrl(urlFromStorage);
    console.log("img URL received");
    return { snapshot: snapshot, url: urlFromStorage };
    // uploadBytes(imageRef, imageUpload.file.originFileObj).then((snapshot) => {
    //   setImageSnapShot(snapshot.ref);
    //   console.log("img snapshot received");
    //   getDownloadURL(snapshot.ref).then((url) => {
    //     setImageUrl(url);
    //     console.log("img URL received");
    //   });
    // });
  };
  // {{(*End*)}}

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
    const newDateFromMoment = moment();
    profileData.DOB = newDateFromMoment;
  }
  const [toggleEdit, setToggleEdit] = useState(true);
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
    toggle();
    console.log(values, "Before Change");
    valueChecker(values);

    const fileUploadData = await uploadFile();

    values = {
      ...profileData,
      ...values,
    };
    values.role = "User";
    values.DOB = values.DOB._d.toLocaleDateString();
    if (fileUploadData.url !== null) {
      values.resume = await fileUploadData.url;
      values.snap = "default";
    } else {
      values.resume = profileData.resume;
      values.snap = "default";
    }

    // if (imageUpload === null) {
    //   values.resume = await profileData.resume;
    //   values.url = await profileData.url;
    // } else {
    //   values.resume = imageUrl;
    // }
    console.log(values, "in the end");

    try {
      const docRef = await setDoc(doc(db, "users", values.email), values);
      console.log("Document written with ID: ", values.email);
      message.success("Successfully Updated Profile !");
    } catch (e) {
      console.error("Error adding document: ", e);
      message.error("Error Updated Profile !");
    }

    setBtnLoading((prev) => !prev);
    toggle();
    router.push("/profile");
  };
  console.log(profileData.isActive);
  return (
    <div>
      <div className="text-center sm:text-right">
        Edit Profile : <Switch unchecked={"true"} onClick={toggle} />
      </div>
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
          DOB: profileData.DOB,
        }}
        disabled={toggleEdit}
      >
        {/* ----------------------------------------------------------------------------------------------------- */}
        <div className="flex flex-grow justify-center align-middle items-center text-center">
          <h1>
            Profile Activation Status :{" "}
            {profileData.isActive == "null" || profileData.isActive == null ? (
              <Tag color="yellow">Pending..</Tag>
            ) : profileData.isActive == "true" ||
              profileData.isActive == true ? (
              <Tag color="green">Active</Tag>
            ) : (
              <Tag color="red">InActive</Tag>
            )}
          </h1>
        </div>
        <Form.Item
          rules={[{ required: true, message: "Please input your Name!" }]}
          label="Name"
          name="userName"
        >
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input placeholder={auth.currentUser?.email} disabled={true} />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please input your Mobile!" }]}
          label="Mobile"
          name="mobileNumber"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please input your Date!" }]}
          label="Date Of Birth"
          name="DOB"
        >
          <DatePicker
          // defaultValue={}
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please input your CNIC!" }]}
          label="CNIC"
          name="CNIC"
        >
          <InputNumber
            max={9999999999999}
            min={1111111111111}
            maxLength={13}
            // type={"number"}
            style={{ width: "100%" }}
            // className="w-5/6"
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please input your City!" }]}
          label="City"
          name="city"
        >
          <Select>
            <Select.Option value="Karachi">Karachi</Select.Option>
            <Select.Option value="Lahore">Lahore</Select.Option>
            <Select.Option value="Hyderabad">Hyderabad</Select.Option>
            <Select.Option value="Islamabad">Islamabad</Select.Option>
            <Select.Option value="Quetta">Quetta</Select.Option>
            <Select.Option value="Peshawar">Peshawar</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please input your Address!" }]}
          label="Address"
          name="address"
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please input your About!" }]}
          label="About"
          name="Bio"
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please input your University!" }]}
          label="University"
          name="university"
        >
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
        <Form.Item
          rules={[{ required: true, message: "Please input your Degree!" }]}
          label="Degree"
          name="degree"
        >
          <Select>
            <Select.Option value="BSSE">BSSE</Select.Option>
            <Select.Option value="BSCS">BSCS</Select.Option>
            <Select.Option value="BBA">BBA</Select.Option>
            <Select.Option value="B.Com">B.Com</Select.Option>
            <Select.Option value="BA">BA</Select.Option>
            <Select.Option value="Engineering">Engineering</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Resume" name="resume">
          <Upload
            onChange={(eve) => {
              setImageUpload(eve);
            }}
            listType="fileList"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Upload Resume</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please input your CGPA!" }]}
          label="CGPA"
          name="CGPA"
        >
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
