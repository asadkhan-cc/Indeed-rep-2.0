import { getAuth, deleteUser } from "firebase/auth";
import React, { useContext, useState } from "react";
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
} from "antd";
import {
  auth,
  db,
  logout,
  registerWithEmailAndPassword,
  storage,
} from "../../../FirebaseApp/firebase-config";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import Router, { useRouter } from "next/router";
import { userAuthDetail } from "../../../pages/_app";
const { TextArea } = Input;

export const CreateUserProfile = (props) => {
  const userAuthDetailContext = useContext(userAuthDetail);
  const Role = "User";
  const [btnLoader, setBtnLoader] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); //
  const [imageSnapShot, setImageSnapShot] = useState(null);

  const router = useRouter();
  var currentDate = new Date();
  var datetime = `${currentDate.getDate()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getFullYear()}on${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
  const imagesListRef = ref(storage, "Resume/");

  const createUserWithDummyData = (user) => {
    const values = {
      userName: user.displayName,
      email: user.email,
      emailVerified: true,
      isActive: null,
      isAdmin: false,
      role: "User",
    };
    setDoc(doc(db, "users", user.email), user).then((eve) => {
      console.log("Document written with ID: ", auth.currentUser?.email);
      message.Warn(
        "Some Error Occurred while Creating Profile Kindly Update Your Data "
      );
      Router.push("/profile");
    });
  };
  const uploadFile = async () => {
    if (imageUpload == null) return { snapshot: null, url: null };
    const imageRef = ref(
      storage,
      `Resume/${props?.credentials?.email?.toLowerCase()}/${
        datetime + imageUpload?.file.name
      }`
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
      const response = await registerWithEmailAndPassword(
        auth,
        props.credentials?.email.toLowerCase(),
        props.credentials?.confirmPassword
      );
      if (response.successMessage) {
        console.log(response.successMessage);
        try {
          const fileUploadData = await uploadFile();
          values.DOB = await values.DOB._d.toLocaleDateString();
          if (fileUploadData.url !== null) {
            values.resume = await fileUploadData.url;
            // values.snap = await JSON.stringify(fileUploadData.snapshot);
          }

          values = {
            ...values,

            role: Role,
            email: props?.email.toLowerCase(),
            isAdmin: false,
            isActive: null,
          };
          console.log(
            "after change",
            values,
            props.credentials?.email,
            props.credentials?.confirmPassword
          );
        } catch (err) {
          createUserWithDummyData(values);
          message.error("Error SigningUp!");
          console.error(err);
          message.error(
            "Error adding Resume! please upload a Smaller or different PDF file"
          );
        }
        try {
          await setDoc(
            doc(db, "users", auth.currentUser?.email.toLowerCase()),
            values
          ).then((eve) => {
            console.log("Document written with ID: ", auth.currentUser?.email);
            message.success("Sign Up Successful!");
            userAuthDetailContext?.runReRenderFunction();
            userAuthDetailContext?.runReRenderFunction();
            Router.push("/dashboard");
          });
        } catch (e) {
          console.error("Error adding document: ", e);
          message.error("Error Creating Profile!");
        }
      } else {
        message.error(response.errMessage);
      }
    } catch (e) {
      console.error(e);
      // ----------------

      const auth = await getAuth();
      const user = await auth.currentUser;
      if (user) {
        await deleteUser(user);
        await logout();
      }
      message.error("Error SigningUp!");
    } finally {
      setBtnLoader((prev) => !prev);
    }
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
            <Form.Item
              rules={[{ required: true, message: "Please input your Name" }]}
              label="Name"
              name={"userName"}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Email" name={"email"}>
              <Input placeholder={props?.email} disabled={true} />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Please input your Mobile" }]}
              label="Mobile"
              name={"mobileNumber"}
            >
              <InputNumber
                maxLength={11}
                // type={"number"}
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Please input your Date" }]}
              label="Date Of Birth"
              name={"DOB"}
            >
              <DatePicker format="DD/MM/YYYY" />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Please input your CNIC" }]}
              label="CNIC"
              name={"CNIC"}
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
              rules={[{ required: true, message: "Please input your City" }]}
              label="City"
              name={"city"}
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
              rules={[{ required: true, message: "Please input your Address" }]}
              label="Address"
              name={"address"}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Please input your About" }]}
              label="About"
              name={"Bio"}
            >
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item
              rules={[
                { required: true, message: "Please input your University" },
              ]}
              label="University"
              name={"university"}
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
              rules={[{ required: true, message: "Please input your Degree" }]}
              label="Degree"
              name={"degree"}
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
            <Form.Item
              rules={[{ required: true, message: "Please input your Resume" }]}
              label="Resume"
              name="resume"
            >
              <Upload
                onChange={(eve) => {
                  setImageUpload(eve);
                }}
                listType="picture"
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Upload Resume</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Please input your CGPA" }]}
              label="CGPA"
              name={"CGPA"}
            >
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
                <Button type="primary" htmlType="submit" loading={btnLoader}>
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
