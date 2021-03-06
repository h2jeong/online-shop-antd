import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../../_actions/user_action";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Menu, message } from "antd";
import {
  UserAddOutlined,
  LogoutOutlined,
  PoweroffOutlined,
  UploadOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons";

function RightMenu(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const onHandleLogout = () => {
    dispatch(logoutUser()).then(res => {
      if (res.payload.success) {
        message.success("Logout Succeed");
        props.history.push("/login");
      } else {
        message.error("Logout Failed. ");
        console.log(res.payload.err);
      }
    });
  };

  if (user.authedUser && !user.authedUser.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="login" icon={<PoweroffOutlined />}>
          <a href="/login">Log In</a>
        </Menu.Item>
        <Menu.Item key="register" icon={<UserAddOutlined />}>
          <a href="/register">Register</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="cart" icon={<UploadOutlined />}>
          <a href="/cart">Cart</a>
        </Menu.Item>
        <Menu.Item key="upload" icon={<ShoppingCartOutlined />}>
          <a href="/product/upload">Upload</a>
        </Menu.Item>
        <Menu.Item key="logout" icon={<LogoutOutlined />}>
          <span onClick={onHandleLogout}>Log out</span>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(RightMenu);
