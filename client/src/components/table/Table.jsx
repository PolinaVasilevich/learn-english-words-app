import React from "react";
import styled from "styled-components";
import { IoVolumeHigh } from "react-icons/io5";
import { listenToPronunciation } from "../../utils/listenToPron";

const TableStyled = styled.table`
  margin: 20px 0;
  table-layout: fixed;
  width: 100%;
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

  & .icon {
    cursor: pointer;
  }
`;

const Text = styled.p`
  font-size: var(--var-lg);
  margin-top: 2rem;
`;

const Table = ({ words }) => {
  return words?.length ? (
    <TableStyled>
      <thead>
        <tr>
          <FirstColumn>Word</FirstColumn>
          <FirstColumn>Pronunciation</FirstColumn>
          <FirstColumn>Translate</FirstColumn>
          <FirstColumn>Definition</FirstColumn>
        </tr>
      </thead>
      <tbody>
        {words?.map((w, index) => (
          <tr key={index}>
            <TableColumn>{w.word}</TableColumn>
            <TableColumn>
              {w.pronunciation}{" "}
              <IoVolumeHigh
                onClick={() => listenToPronunciation(w.word)}
                size="1.2rem"
                style={{ cursor: "pointer" }}
              />
            </TableColumn>
            <TableColumn>{w.translate.toLowerCase()}</TableColumn>
            <TableColumn>{w.definition}</TableColumn>
          </tr>
        ))}
      </tbody>
    </TableStyled>
  ) : (
    <Text>There aren't words with this filter</Text>
  );
};

export default Table;
