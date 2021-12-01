import React from "react";
import styled from "styled-components";

const TableStyled = styled.table`
  margin: 30px auto;
  table-layout: fixed;
  width: 70vw;
  border-collapse: collapse;
  border: 1px solid var(--grey);
`;

const TableColumn = styled.th`
  width: 20vh;
  padding: 20px;
  border: 1px solid var(--grey); ;
`;

const Table = ({ words }) => {
  return (
    <TableStyled>
      <thead>
        <tr>
          {/* <th></th> */}
          <TableColumn>Word</TableColumn>
          <TableColumn>Pronunciation</TableColumn>
          <TableColumn>Translate</TableColumn>
          <TableColumn>Definition</TableColumn>
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
