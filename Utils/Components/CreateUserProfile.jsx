import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
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
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { useRouter } from "next/router";
const { TextArea } = Input;

export const CreateUserProfile = () => {
  const Role = "User";
  const [btnLoader, setBtnLoader] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const router = useRouter();
  // const imagesListRef = ref(db, "images/");
  // const uploadFile = () => {
  //   if (imageUpload == null) return;
  //   const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
  //   uploadBytes(imageRef, imageUpload).then((snapshot) => {
  //     getDownloadURL(snapshot.ref).then((url) => {
  //       setImageUrls((prev) => [...prev, url]);
  //     });
  //   });
  // };
  // console.log(auth, "Real Auth");
  // console.log(auth.currentUser?.email);
  function valueChecker(param) {
    Object.keys(param).forEach((key) => {
      if (param[key] === undefined) {
        param[key] = "null";
      }
    });
  }

  const onSubmitHandeler = async (values) => {
    setBtnLoader((prev) => !prev);
    console.log(values, "Finish Button Pressed");
    valueChecker(values);
    try {
      values.DOB = values.DOB._d.toLocaleDateString();

      values = {
        ...values,

        role: Role,
        email: auth.currentUser?.email,
        isadmin: false,
      };
      console.log("after change", values);
    } catch (err) {
      console.error(err);
      return;
    }

    try {
      const docRef = await setDoc(
        doc(db, "users", auth.currentUser?.email),
        values
      );
      console.log("Document written with ID: ", auth.currentUser?.email);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setBtnLoader((prev) => !prev);
    router.push("/Dashboard");
  };

  return (
    <>
      <div>
        <p className="text-center">CreateUserProfile</p>
        <>
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            // onValuesChange={null}
            // disabled={false}
            onFinish={onSubmitHandeler}
            initialValues={null}
          >
            {/* Checking Admin Status To condition Render Activation */}

            {false ? (
              <Form.Item
                name={"profileActivate"}
                label="Switch"
                valuePropName="checked"
                initialValue={false}
              >
                <Switch />
              </Form.Item>
            ) : null}
            {/* ----------------------------------------------------------------------------------------------------- */}
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
              <Form.Item
                name="agreement"
                initialValue={false}
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(new Error("Should accept agreement")),
                  },
                ]}
              >
                <Checkbox>
                  I have read the <a href="">agreement</a>
                </Checkbox>
              </Form.Item>
              <br />
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </div>
            {/* ----------------------------------------------------------------------------------------------------- */}
          </Form>
        </>
      </div>
    </>
  );
};
