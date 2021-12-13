import React, { useState } from "react";
import PropTypes from "prop-types";

import { Card, CardBody, Input } from "../../styles/wordLearnPageStyled";
import { Button } from "../MainButton";
import { useToasts } from "react-toast-notifications";

const CardWord = ({ word, changeWord, learnWord }) => {
  const [inputWord, setInputWord] = useState("");

  const { addToast } = useToasts();

  const showMessage = (type, message) =>
    addToast(message, {
      appearance: type,
      autoDismiss: true,
    });

  const onHandlerEnter = (e) => {
    if (e.key === "Enter") {
      checkWord();
    }
  };

  const checkWord = () => {
    if (word.word.toLowerCase() === inputWord.toLowerCase()) {
      learnWord({ wordid: word._id });
      showMessage("success", "You're right");
      setInputWord("");
    } else {
      showMessage("error", "You're wrong. Try again!");
    }
  };

  const changeCurrentWord = () => {
    changeWord();
    setInputWord("");
  };

  const onChange = (e) => {
    setInputWord(e.target.value);
  };

  return (
    <Card>
      <CardBody>
        <h3>{word.translate.toLowerCase()}</h3>
        <p>{word.definition}</p>
        <Button onClick={changeCurrentWord}>Change word</Button>
        <Input
          placeholder="Enter a word"
          value={inputWord}
          onChange={onChange}
          onKeyPress={onHandlerEnter}
        />
      </CardBody>
    </Card>
  );
};

CardWord.propTypes = {
  word: PropTypes.object,
  changeWord: PropTypes.func,
  learnWord: PropTypes.func,
};

CardWord.defaultProps = {
  word: {
    _id: "",
    word: "",
    translate: "",
    definition: "",
  },
  changeWord: () => {},
  learnWord: () => {},
};

export default CardWord;
