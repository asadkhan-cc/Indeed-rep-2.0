import { GoogleOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React from "react";
import { signInWithGoogle } from "../../FirebaseApp/firebase-config";
const SignIn = (props) => {
  // console.log(props.change_Next);
  const GoogleSignIn = () => {
    signInWithGoogle(props.role);
  };
  const onFinish = (values) => {
    // console.log("Received values of form: ", values);
    values.email = values.email.toLowerCase();
    props.setCredentials(values);

    props.change_Next();
  };
  return (
    <div className="h-1/2 w-auto lg:w-1/2 mx-auto shadow border p-4">
      <h1 className="w-1/2 mx-auto text-center text-lg text-bold text-gray-900">
        Sign Up
      </h1>
      <Form
        name="normal_login"
        className="login-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 22 }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label="" wrapperCol={{ span: 24 }}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button w-[100%]"
          >
            Sign Up
          </Button>
          <div className="flex justify-end my-2">
            Already have An Account?
            <a href=""> Login</a>
          </div>
        </Form.Item>
        <div className="flex flex-col justify-center items-center gap-2">
          Or SignUp Using Google
          <div
            className="flex justify-center items-center cursor-pointer"
            onClick={GoogleSignIn}
          >
            <div className="  py-2">
              <GoogleOutlined className="text-2xl " />
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default SignIn;
