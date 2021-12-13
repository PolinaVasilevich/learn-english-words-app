import styled from "styled-components";

export const TableStyled = styled.table`
  margin: 20px 0;
  table-layout: fixed;
  width: 100%;
  max-width: 1240px;
  border-collapse: collapse;
  border: 1px solid var(--grey);

  text-align: center;
`;

export const TableColumn = styled.th`
  width: 20vh;
  padding: 20px;
  border: 1px solid var(--grey);

  font-weight: var(--fw-normal);
`;

export const FirstColumn = styled.th`
  width: 20vh;
  padding: 20px;
  border: 1px solid var(--grey);

  font-size: var(--fs-lg);
  font-weight: var(--fw-bold);

  & .icon {
    cursor: pointer;
  }
`;

export const Text = styled.p`
  font-size: var(--var-lg);
  margin-top: 2rem;
`;
