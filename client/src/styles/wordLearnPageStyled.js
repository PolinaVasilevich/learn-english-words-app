import styled from "styled-components";

export const Card = styled.div`
  width: 60vw;
  min-width: 400px;
  max-width: 800px;
  margin: 0 auto;

  border-radius: var(--radii);
  background-color: ${(props) => props.theme.baseColor};
  box-shadow: ${(props) => props.theme.shadow};

  text-align: center;

  position: relative;
`;

export const CardBody = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Input = styled.input`
  margin: 0.7rem;
  padding: 1rem 2rem;
  width: 100%;

  border: 1px solid
    ${(props) => (props.error ? `var(--darkred) ` : `var(--grey)`)};
  outline: none;
  background: none;

  border-radius: var(--radii);

  color: ${(props) => props.theme.textColor};

  &:focus {
    border: 1px solid var(--purple);
    box-shadow: ${(props) => props.theme.shadow};
  }
`;

export const ArrowButton = styled.button`
  padding: 0 1rem;
  background-color: ${(props) => props.theme.baseColor};
  box-shadow: ${(props) => props.theme.shadow};

  line-height: 2.5;
  border-radius: var(--radii);

  color: ${(props) => props.theme.textColor};

  outline: none;
  border: none;

  cursor: pointer;

  position: absolute;
  left: 2rem;
`;

export const ErrorMessage = styled.p`
  color: var(--darkred);
  /* font-weight: var(--fw-bold); */
  font-size: var(--fs-md);
`;
