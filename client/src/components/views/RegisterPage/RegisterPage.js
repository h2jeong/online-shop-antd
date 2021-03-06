import React from "react";
import { Form, Input, Tooltip, Button, message } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import moment from "moment";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

function RegisterPage(props) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = values => {
    // console.log("Received values of form: ", values);
    values.image = `http://gravatar.com/avatar/${moment().unix()}?d=identicon`;

    dispatch(registerUser(values)).then(res => {
      if (res.payload.success) {
        message.success("Register succeed");
        props.history.push("/login");
      } else {
        message.error("Register failed. ");
        console.log(res.payload.err);
      }
    });
  };

  return (
    <div className="app">
      <h2>Sign In</h2>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        style={{ minWidth: "500px" }}
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!"
            },
            {
              required: true,
              message: "Please input your E-mail!"
            }
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
              message: "Please input your password!"
            }
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!"
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="name"
          label={
            <span>
              Name&nbsp;
              <Tooltip title="What do you want others to call you?">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[
            {
              required: true,
              message: "Please input your name!",
              whitespace: true
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default RegisterPage;
