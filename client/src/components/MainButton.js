import styled from "styled-components";

export const Button = styled.button`
  width: 100%;
  max-width: 250px;
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
