import React from "react";
import { NavLink } from "react-router-dom";

import { Formik } from "formik";
import * as Yup from "yup";

import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../../utils/consts";
import { Form, Button } from "./AuthFormStyled";
import { Input } from "../../styles/wordLearnPageStyled";
import { ErrorMessage } from "../../styles/wordLearnPageStyled";

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

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email")
    .required("This field is required"),

  password: Yup.string().required("This field is required"),
});

const AuthForm = ({
  isLogin,
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {({
        errors,
        touched,
        values,
        handleSubmit,
        handleChange,
        handleBlur,
      }) => (
        <Form onSubmit={handleSubmit}>
          <h1>{isLogin ? "Authorization" : "Registration"}</h1>
          <div style={{ width: "100%", textAlign: "center" }}>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email && touched.email}
            />

            {errors.email && touched.email && (
              <ErrorMessage>{errors.email}</ErrorMessage>
            )}
          </div>

          <div style={{ width: "100%", textAlign: "center" }}>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email && touched.email}
              autocomplete="off"
            />

            {errors.password && touched.password && (
              <ErrorMessage>{errors.password}</ErrorMessage>
            )}
          </div>
          {isLogin ? <Registration /> : <Login />}
          <Button type="submit">{isLogin ? "Login" : "Register"}</Button>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
