import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useToasts } from "react-toast-notifications";
import styled from "styled-components";

const Card = styled.div`
  width: 100%;

  border-radius: var(--radii);
  background-color: ${(props) => props.theme.baseColor};
  box-shadow: ${(props) => props.theme.shadow};

  text-align: center;

  cursor: pointer;

  position: relative;
`;

const CardBody = styled.div`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Input = styled.input`
  margin-bottom: 1rem;
  padding: 1rem 2rem;
  width: 70%;

  border: 1px solid var(--grey);
  outline: none;

  border-radius: var(--radii);
  background-color: ${(props) => props.theme.baseColor};
  color: ${(props) => props.theme.textColor};
`;

const Button = styled.button`
  width: 100%;
  margin-bottom: 1rem;
  max-width: 150px;
  padding: 1.2rem;

  text-align: center;
  background-color: var(--purple);
  color: ${(props) => props.theme.textColor};

  border-radius: var(--radii);

  outline: none;
  border: none;

  cursor: pointer;
`;

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
