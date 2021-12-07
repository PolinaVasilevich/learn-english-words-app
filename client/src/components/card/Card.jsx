import React from "react";
import styled from "styled-components";

import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;

  border-radius: var(--radii);
  background-color: ${(props) => props.theme.baseColor};
  box-shadow: ${(props) => props.theme.shadow};

  text-align: center;

  cursor: pointer;

  position: relative;
`;

const CardBody = styled.div`
  padding: 2.5rem;
`;

const CardText = styled.h3`
  margin: 0;
  font-size: var(--fs-md);
  font-weight: var(--fw-normal);
`;

const ButtonClose = styled.button`
  outline: none;
  border: none;
  background: none;

  position: absolute;
  top: 7px;
  right: 7px;

  & svg {
    color: ${(props) => props.theme.textColor};
    &:hover {
      color: var(--purple);
    }
  }
`;

const Card = ({ id, name, legthList, deleteList }) => {
  return (
    <Wrapper>
      <ButtonClose onClick={() => deleteList(id)}>
        <IoClose size="1.2rem" />
      </ButtonClose>
      <Link to={`/wordlist/${id}`}>
        <CardBody>
          <CardText>
            <b>Name list: </b>
            {name}
          </CardText>
          <CardText>
            <b>Length list: </b>
            {legthList && `${legthList} words`}
          </CardText>
        </CardBody>
      </Link>
    </Wrapper>
  );
};

export default Card;
