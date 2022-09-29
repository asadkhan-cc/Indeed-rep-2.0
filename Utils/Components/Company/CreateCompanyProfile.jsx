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
  message,
} from "antd";
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
import { auth, db } from "../../../FirebaseApp/firebase-config";
const { TextArea } = Input;
const CreateCompanyProfile = () => {
  const Role = "Company";
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
    setLoading((prev) => !prev);
    console.log(values, "Finish Button Pressed");
    valueChecker(values);

    values = {
      ...values,

      role: Role,
      email: auth.currentUser?.email,
      isadmin: false,
    };
    console.log("after change", values);

    try {
      const docRef = await setDoc(
        doc(db, "users", auth.currentUser?.email),
        values
      );
      console.log("Document written with ID: ", auth.currentUser?.email);
      message.success("Processing complete!");
      router.push("/Dashboard");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setLoading((prev) => !prev);
  };

  return (
    <>
      <div>
        <p className="text-center">Create Company Profile</p>
        <>
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            // onValuesChange={null}
            // disabled={false}
            onFinish={onSubmitHandeler}
            initialValues={null}
            requiredMark={true}
          >
            {/* Checking Admin Status To condition Render Activation */}

            {false ? (
              <Form.Item
                label="Switch"
                name={"profileActivate"}
                valuePropName="checked"
                initialValue={false}
              >
                <Switch />
              </Form.Item>
            ) : null}
            {/* ----------------------------------------------------------------------------------------------------- */}
            <Form.Item
              rules={[{ required: true, message: "Please input your Name!" }]}
              label="Name"
              name={"userName"}
            >
              <Input />
            </Form.Item>
            <Form.Item name={"email"} label="Email">
              <Input placeholder={auth.currentUser?.email} disabled={true} />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Please input your Mobile!" }]}
              label="Mobile"
              name={"mobileNumber"}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Please input your About!" }]}
              label="About"
              name={"Bio"}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item
              rules={[
                { required: true, message: "Please input your Address!" },
              ]}
              label="Address"
              name={"address"}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Please input your City!" }]}
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
              rules={[
                { required: true, message: "Please input your Company Size!" },
              ]}
              label="Company Size"
              name={"size"}
            >
              <Select>
                <Select.Option value="10-20">10-20</Select.Option>
                <Select.Option value="20-50">20-50</Select.Option>
                <Select.Option value="50-100">50-100</Select.Option>
                <Select.Option value="100-200">100-200</Select.Option>
                <Select.Option value="B.200-400">200-400</Select.Option>
                <Select.Option value="500+">500+</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              rules={[
                { required: true, message: "Please input your Company Type!" },
              ]}
              label="Company Type"
              name={"Type"}
            >
              <Select>
                <Select.Option value="Startup">Startup</Select.Option>
                <Select.Option value="Consultation">Consultation</Select.Option>
                <Select.Option value="Agency">Agency</Select.Option>
                <Select.Option value="SystemServices">
                  System Services
                </Select.Option>
              </Select>
            </Form.Item>
            {/* ----------------------------------------------------------------------------------------------------- */}

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
                <Button type="primary" htmlType="submit" loading={loading}>
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

export default CreateCompanyProfile;
