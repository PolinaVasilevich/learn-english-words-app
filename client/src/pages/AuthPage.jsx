import React from "react";
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

  const dispatch = useDispatch();

  const { addToast } = useToasts();

  const onSubmit = async (formData) => {
    try {
      let data;
      if (isLogin) {
        data = await login(formData);

        dispatch(setUser(data));
        navigate(USER_ROUTE);
      } else {
        data = await registration(formData);
        addToast("You have successfully registered", {
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
    }
  };

  return (
    <Wrapper>
      <AuthForm isLogin={isLogin} onSubmit={onSubmit} />
    </Wrapper>
  );
};

export default AuthPage;
