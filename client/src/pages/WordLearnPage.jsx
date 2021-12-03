import axios from "axios";
import React, { useEffect, useState } from "react";

import { useParams } from "react-router";
import { useToasts } from "react-toast-notifications";

import { Button } from "../components/MainButton";

import { Card, CardBody, Input } from "../styles/wordLearnPageStyled";

const WordLearnPage = () => {
  const { id } = useParams();
  const [words, setWords] = useState(null);

  const [inputWord, setInputWord] = useState("");
  const [randomWord, setRandomWord] = useState("");

  const { addToast } = useToasts();

  const getWords = async () => {
    try {
      const response = await axios(
        process.env.REACT_APP_API_URL + `api/word/wordlist/${id}`
      );
      const data = response.data;

      setWords(data.words);
    } catch (e) {
      console.log(e);
    }
  };

  const getRandomWord = () => {
    if (words) {
      const randomId = Math.floor(Math.random() * words?.length);

      setRandomWord(words[randomId]);
    }
  };

  const checkWord = () => {
    if (randomWord.word.toLowerCase() === inputWord.toLowerCase()) {
      addToast("You're right", {
        appearance: "success",
        autoDismiss: true,
      });
      setInputWord("");
      getRandomWord();
    } else {
      addToast("You're wrong. Try again!", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const changeWord = () => {
    addToast(`${randomWord.word.toUpperCase()} is right word`, {
      appearance: "info",
      autoDismiss: true,
    });
    setInputWord("");
    getRandomWord();
  };

  const onHandlerEnter = (e) => {
    if (e.code === "Enter") {
      checkWord();
    }
  };

  useEffect(() => {
    getWords();
  }, []);

  useEffect(() => {
    getRandomWord();
  }, [words]);

  return (
    <div>
      <Card>
        {words && (
          <CardBody>
            <h3>{randomWord.translate}</h3>
            <p>{randomWord.definition}</p>
            <Button onClick={changeWord}>Change word</Button>
            <Input
              placeholder="Enter a word"
              value={inputWord}
              onChange={(e) => setInputWord(e.target.value)}
              onKeyPress={onHandlerEnter}
            />
          </CardBody>
        )}
      </Card>
    </div>
  );
};

export default WordLearnPage;
