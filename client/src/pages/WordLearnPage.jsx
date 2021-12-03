import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router";
import { useToasts } from "react-toast-notifications";

import { Button } from "../components/MainButton";
import { Spinner } from "../components/spinner/Spinner";
import { fetchCurrentWordList, learnWord } from "../store/wordSlice";

import { Card, CardBody, Input } from "../styles/wordLearnPageStyled";

const WordLearnPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { currentWordList, error, loading } = useSelector(
    (state) => state.word
  );

  useEffect(() => {
    dispatch(fetchCurrentWordList(id));
    getRandomWord();
  }, []);

  useEffect(() => {
    getRandomWord();
  }, [currentWordList]);

  const [inputWord, setInputWord] = useState("");
  const [randomWord, setRandomWord] = useState({});

  const { addToast } = useToasts();

  const getRandomWord = () => {
    if (currentWordList.words) {
      const randomId = Math.floor(
        Math.random() * currentWordList.words?.length
      );

      setRandomWord(currentWordList.words[randomId]);
    }
  };

  const checkWord = () => {
    if (randomWord.word.toLowerCase() === inputWord.toLowerCase()) {
      addToast("You're right", {
        appearance: "success",
        autoDismiss: true,
      });

      if (!randomWord.isLearned) {
        dispatch(learnWord({ wordlistid: id, wordid: randomWord._id }));
      }

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

  return (
    <div>
      <Card>
        {loading ? (
          <Spinner />
        ) : (
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
