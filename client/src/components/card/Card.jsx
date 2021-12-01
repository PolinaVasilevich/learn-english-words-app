import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 200px;
  border-radius: var(--radii);
  background-color: ${(props) => props.theme.baseColor};
  box-shadow: ${(props) => props.theme.shadow};

  text-align: center;

  cursor: pointer;
`;

const CardBody = styled.div`
  padding: 1rem 1.5rem;
`;

const CardText = styled.h3`
  margin: 0;
  font-size: var(--fs-md);
  font-weight: var(--fw-narmal);
`;

const Card = ({ name, legthList }) => {
  return (
    <Wrapper>
      <CardBody>
        <CardText>{name}</CardText>
        <CardText>{legthList && `${legthList} words`} </CardText>
      </CardBody>
    </Wrapper>
  );
};

export default Card;
