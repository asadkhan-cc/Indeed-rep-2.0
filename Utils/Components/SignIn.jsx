import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import {
  auth,
  registerWithEmailAndPassword,
} from "../../FirebaseApp/firebase-config";
const SignIn = (props) => {
  // console.log(props.change_Next);

  const onFinish = (values) => {
    // console.log("Received values of form: ", values);
    registerWithEmailAndPassword(
      auth,
      values.email,
      values.confirmPassword
    ).then((eve) => {
      if (eve.message) {
      } else props.change_Next();

      // console.log(eve, "logging eve here");
    });
  };
  return (
    <div className="h-1/2 w-auto lg:w-1/2 mx-auto shadow border p-4">
      <h1 className="w-1/2 mx-auto text-center">SignIn form</h1>
      <Form name="normal_login" className="login-form" onFinish={onFinish}>
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

        <p>required set to true</p>
        <Form.Item>
          <div className="text-left">
            {/* <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item> */}
            <h1 className="text-right">
              <a className="login-form-forgot " href="">
                Forgot password
              </a>
            </h1>
          </div>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button w-[100%]"
          >
            Sign Up
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;
