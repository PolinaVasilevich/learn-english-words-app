import React from "react";
import { NavLink } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../../utils/consts";
import { Form, Input, Button } from "./AuthFormStyled";

const Registration = () => {
  return (
    <div>
      <span>Don't you have an account? </span>
      <NavLink to={REGISTRATION_ROUTE}>Sign up</NavLink>
    </div>
  );
};

const Login = () => {
  return (
    <div>
      <span>Don you have an account? </span>
      <NavLink to={LOGIN_ROUTE}>Sign in</NavLink>
    </div>
  );
};

const AuthForm = ({
  isLogin,
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
}) => {
  return (
    <Form onSubmit={onSubmit}>
      <h1>{isLogin ? "Authorization" : "Registration"}</h1>
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autocomplete="on"
      />
      <Input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autocomplete="current-password"
      />
      {isLogin ? <Registration /> : <Login />}
      <Button type="submit">{isLogin ? "Login" : "Register"}</Button>
    </Form>
  );
};

export default AuthForm;
