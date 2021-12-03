import styled from "styled-components";

export const Header = styled.header`
  background-color: ${(props) => props.theme.baseColor};
  box-shadow: ${(props) => props.theme.shadow};

  & a {
    color: ${(props) => props.theme.textColor};
    font-size: var(--fs-md);
    font-weight: var(--fw-bold);
  }
  & a:hover,
  button:hover {
    color: var(--purple);
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
`;

export const ModeSwitcher = styled.div`
  color: ${(props) => props.theme.textColor};
  font-size: var(--fs-md);
  cursor: pointer;
  text-transform: capitalize;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LinkButton = styled.button`
  margin-left: 1rem;
  outline: none;
  border: none;
  background: none;

  color: ${(props) => props.theme.textColor};
  font-size: var(--fs-md);
  font-weight: var(--fw-bold);
`;

export const Navigation = styled.nav`
  display: flex;
  align-items: center;
`;
