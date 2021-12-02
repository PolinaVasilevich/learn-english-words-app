import React from "react";
import styled from "styled-components";

const TableStyled = styled.table`
  margin: 30px auto;
  table-layout: fixed;
  width: 70vw;
  max-width: 1240px;
  border-collapse: collapse;
  border: 1px solid var(--grey);

  text-align: center;
`;

const TableColumn = styled.th`
  width: 20vh;
  padding: 20px;
  border: 1px solid var(--grey);

  font-weight: var(--fw-normal);
`;

const FirstColumn = styled.th`
  width: 20vh;
  padding: 20px;
  border: 1px solid var(--grey);

  font-size: var(--fs-lg);
  font-weight: var(--fw-bold);
`;

const Table = ({ words }) => {
  return (
    <TableStyled>
      <thead>
        <tr>
          {/* <th></th> */}
          <FirstColumn>Word</FirstColumn>
          <FirstColumn>Pronunciation</FirstColumn>
          <FirstColumn>Translate</FirstColumn>
          <FirstColumn>Definition</FirstColumn>
        </tr>
      </thead>
      <tbody>
        {words.map((w, index) => (
          <tr key={index}>
            <TableColumn>{w.word}</TableColumn>
            <TableColumn>{w.pronunciation}</TableColumn>
            <TableColumn>{w.translate}</TableColumn>
            <TableColumn>{w.definition}</TableColumn>
          </tr>
        ))}
      </tbody>
    </TableStyled>
  );
};

export default Table;