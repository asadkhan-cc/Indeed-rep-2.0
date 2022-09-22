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

const { TextArea } = Input;

export const CreateUserProfile = () => {
  const onSubmitHandeler = (values) => {
    console.log(values, "Finish Button Pressed");
  };
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    // props.change_Next();
  };
  return (
    <>
      <div>
        <p className="text-center">CreateUserProfile</p>

        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onValuesChange={null}
          disabled={false}
          onFinish={onFinish}
        >
          {/* Checking Admin Status To condition Render Activation */}
          {true ? (
            <Form.Item label="Switch" valuePropName="checked">
              <Switch />
            </Form.Item>
          ) : null}
          {/* ----------------------------------------------------------------------------------------------------- */}
          <Form.Item label="Name">
            <Input />
          </Form.Item>
          <Form.Item label="Mobile">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Date Of Birth">
            <DatePicker />
          </Form.Item>
          <Form.Item label="CNIC">
            <InputNumber
              max={9999999999999}
              min={1111111111111}
              maxLength={13}
              // type={"number"}
              style={{ width: "100%" }}
              // className="w-5/6"
            />
          </Form.Item>
          <Form.Item label="City">
            <Select>
              <Select.Option value="Karachi">Karachi</Select.Option>
              <Select.Option value="Lahore">Lahore</Select.Option>
              <Select.Option value="Hyderabad">Hyderabad</Select.Option>
              <Select.Option value="Islamabad">Islamabad</Select.Option>
              <Select.Option value="Quetta">Quetta</Select.Option>
              <Select.Option value="Peshawar">Peshawar</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Address">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="About">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="University">
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
          <Form.Item label="Degree">
            <Select>
              <Select.Option value="BSSE">BSSE</Select.Option>
              <Select.Option value="BSCS">BSCS</Select.Option>
              <Select.Option value="BBA">BBA</Select.Option>
              <Select.Option value="B.Com">B.Com</Select.Option>
              <Select.Option value="BA">BA</Select.Option>
              <Select.Option value="Engineering">Engineering</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="CGPA">
            <InputNumber max={4.0} min={0} />
          </Form.Item>
          {/* ----------------------------------------------------------------------------------------------------- */}
          <Form.Item
            name="agreement"
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
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
