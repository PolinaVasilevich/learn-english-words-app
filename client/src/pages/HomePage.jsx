import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { LOGIN_ROUTE } from "../utils/consts";

import { Button } from "../components/MainButton";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HomePage = () => {
  const { isAuth } = useSelector((state) => state.user);

  return (
    <Wrapper>
      {!isAuth && (
        <>
          <h1 style={{ textAlign: "center", marginTop: "2rem" }}>
            Login and add your lists words
          </h1>
          <Link to={LOGIN_ROUTE}>
            <Button>Sign in </Button>
          </Link>
        </>
      )}
    </Wrapper>
  );
};

export default HomePage;
