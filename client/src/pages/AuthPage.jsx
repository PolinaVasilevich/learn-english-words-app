import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { LOGIN_ROUTE, USER_ROUTE } from "../utils/consts";
import styled from "styled-components";

import { useToasts } from "react-toast-notifications";

import AuthForm from "../components/authForm/AuthForm";
import { registration, login } from "../http/userApi";
import { useDispatch } from "react-redux";
import { setIsAuth, setUser } from "../store/userSlice";

const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);
`;

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { addToast } = useToasts();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);

        dispatch(setUser(data));
        navigate(USER_ROUTE);
      } else {
        data = await registration(email, password);
        addToast("You're have successfully registered", {
          appearance: "success",
          autoDismiss: true,
        });
        dispatch(setUser(data.id));
        navigate(LOGIN_ROUTE);
      }

      dispatch(setIsAuth(true));
    } catch (e) {
      addToast(e.response.data.message, {
        appearance: "error",
        autoDismiss: true,
      });
      console.log(e.response.data.message);
    }
  };

  return (
    <Wrapper>
      <AuthForm
        isLogin={isLogin}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onSubmit={onSubmit}
      />
    </Wrapper>
  );
};

export default AuthPage;
