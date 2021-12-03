import styled from "styled-components";

export const Card = styled.div`
  width: 100%;

  border-radius: var(--radii);
  background-color: ${(props) => props.theme.baseColor};
  box-shadow: ${(props) => props.theme.shadow};

  text-align: center;

  cursor: pointer;

  position: relative;
`;

export const CardBody = styled.div`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Input = styled.input`
  margin: 1rem 0;
  padding: 1rem 2rem;
  width: 70%;

  border: 1px solid var(--grey);
  outline: none;

  border-radius: var(--radii);
  background-color: ${(props) => props.theme.baseColor};
  color: ${(props) => props.theme.textColor};
`;
