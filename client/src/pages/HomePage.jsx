import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { LOGIN_ROUTE } from "../utils/consts";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  width: 100%;
  max-width: 200px;
  padding: 1.2rem;

  text-align: center;
  background-color: var(--purple);
  color: ${(props) => props.theme.textColor};

  border-radius: var(--radii);

  outline: none;
  border: none;

  cursor: pointer;

  & a {
    color: ${(props) => props.theme.textColor};
  }
`;

const HomePage = () => {
  return (
    <Wrapper>
      <h1 style={{ textAlign: "center", marginTop: "2rem" }}>
        Login and add your lists words
      </h1>

      <Link to={LOGIN_ROUTE}>
        <Button>Sign in </Button>
      </Link>
    </Wrapper>
  );
};

export default HomePage;
