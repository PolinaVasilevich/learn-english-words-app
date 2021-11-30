import styled from "styled-components";

export const Form = styled.form`
  width: 600px;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: var(--radii);
  box-shadow: ${(props) => props.theme.shadow};
  background-color: ${(props) => props.theme.baseColor};
`;

export const Input = styled.input`
  margin-bottom: 1rem;
  padding: 1rem 2rem;
  width: 100%;

  border: 1px solid var(--grey);
  outline: none;

  border-radius: var(--radii);
  background-color: ${(props) => props.theme.baseColor};
  color: ${(props) => props.theme.textColor};
`;

export const Button = styled.button`
  margin: 0.5rem 0;
  padding: 0.5rem 1rem;

  outline: none;
  border: none;

  border-radius: var(--radii);
  border: 1px solid var(--grey);

  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.baseColor};
`;
