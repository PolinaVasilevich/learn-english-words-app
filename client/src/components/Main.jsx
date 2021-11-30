import styled from "styled-components";

const Wrapper = styled.main`
  padding: 2rem 0;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1240px;
  /* margin: 0 auto; */
  padding: 0 2rem;
`;

export const Main = ({ children }) => {
  return (
    <Wrapper>
      <Container>{children}</Container>
    </Wrapper>
  );
};
