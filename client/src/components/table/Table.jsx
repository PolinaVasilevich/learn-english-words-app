import React from "react";
import styled from "styled-components";
import { IoVolumeHigh } from "react-icons/io5";

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

const listenToPronunciation = (message) => {
  var msg = new SpeechSynthesisUtterance(message);
  var voices = window.speechSynthesis.getVoices();
  msg.voice = voices[2];
  window.speechSynthesis.speak(msg);
};

const Table = ({ words }) => {
  return (
    <TableStyled>
      <thead>
        <tr>
          <FirstColumn>Learned</FirstColumn>
          <FirstColumn>Word</FirstColumn>
          <FirstColumn>Pronunciation</FirstColumn>
          <FirstColumn>Translate</FirstColumn>
          <FirstColumn>Definition</FirstColumn>
        </tr>
      </thead>
      <tbody>
        {words?.map((w, index) => (
          <tr key={index}>
            <TableColumn>
              <input type="checkbox" disabled checked={w.isLearned} />
            </TableColumn>
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
  );
};

export default Table;
