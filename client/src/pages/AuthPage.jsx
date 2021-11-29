import React from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Form, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { REGISTRATION_ROUTE } from "../utils/consts";

const AuthPage = () => {
  const params = useParams();
  console.log(params);

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">Authorization!</h2>
        <Form className="d-flex flex-column">
          <Form.Control placeholder="Enter your email" className="mt-3" />
          <Form.Control placeholder="Enter your password" className="mt-3" />

          <div className="mt-3">
            Don't you have an account?
            <NavLink
              to={REGISTRATION_ROUTE}
              style={{ textDecoration: "none", marginLeft: "4px" }}
            >
              Registration
            </NavLink>
          </div>

          <Button className="mt-3" variant={"outline-success"}>
            Login
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AuthPage;
