import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Button, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavBar = observer(() => {
  const { user } = useContext(Context);

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink style={{ color: "#fff", textDecoration: "none" }} to="/">
          Learn English
        </NavLink>
        {user.isAuth ? (
          <Nav style={{ color: "#fff", marginLeft: "auto" }}>
            <Button variant={"outline-light"}>Admin panel</Button>
            <Button
              className="mx-2"
              variant={"outline-light"}
              onClick={() => user.setIsAuth(false)}
            >
              Logout
            </Button>
          </Nav>
        ) : (
          <Nav style={{ color: "#fff", marginLeft: "auto" }}>
            <Button
              variant={"outline-light"}
              onClick={() => user.setIsAuth(true)}
            >
              Authorization
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
