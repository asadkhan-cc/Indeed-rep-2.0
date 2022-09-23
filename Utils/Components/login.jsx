import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, notification, Space } from "antd";
import React, { useState } from "react";
import { logInWithEmailAndPassword } from "../../FirebaseApp/firebase-config.jsx";
const Login = () => {
  logInWithEmailAndPassword;
  const [formData, setFormData] = useState(null);
  const register = async () => {
    try {
      const user = await logInWithEmailAndPassword(
        formData.Email,
        formData.Password
      );
      user.then((eve) => {
        console.log(eve);
      });
      console.log("user from login page", user);
      openNotificationWithIcon("sucess");
      navigate("Home");
    } catch (error) {
      openNotificationWithIcon("error", error.message);
      console.log(error);
    }
  };
  const onFinish = (values) => {
    setFormData(values);
    console.log("Received values of form: ", values);
  };
  const openNotificationWithIcon = (type, message = "SignUp Sucessfull") => {
    notification[type]({
      message: message,
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
    });
  };
  return (
    <div className="h-auto w-auto md:h-1/2 md:w-1/2 mx-auto shadow border p-4">
      <h1 className="w-1/2 mx-auto text-center">login form</h1>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <div className="text-left">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
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
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
