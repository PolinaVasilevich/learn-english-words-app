import React from "react";

import { IoVolumeHigh } from "react-icons/io5";
import { listenToPronunciation } from "../../utils/listenToPron";
import { TableStyled, TableColumn, FirstColumn } from "./TableStyled";

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
