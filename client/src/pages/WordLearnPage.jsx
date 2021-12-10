import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams, useNavigate } from "react-router";
import { useToasts } from "react-toast-notifications";

import { Button } from "../components/MainButton";
import { ArrowButton } from "../styles/wordLearnPageStyled";
import { Spinner } from "../components/spinner/Spinner";

import { IoArrowBack } from "react-icons/io5";

import { fetchCurrentWordList, learnWord } from "../store/wordSlice";

import { Card, CardBody, Input } from "../styles/wordLearnPageStyled";
import { listenToPronunciation } from "../utils/listenToPron";

const WordLearnPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [inputWord, setInputWord] = useState("");
  const [randomWord, setRandomWord] = useState({});

  const { addToast } = useToasts();

  const showMessage = (type, message) =>
    addToast(message, {
      appearance: type,
      autoDismiss: true,
    });

  const navigate = useNavigate();

  const { currentWordList, loading, error } = useSelector(
    (state) => state.word
  );

  const filteredWords = useMemo(() => {
    return currentWordList.words
      ? currentWordList.words.filter((w) => !w.isLearned)
      : [];
  }, [currentWordList.words]);

  const getRandomWord = () => {
    if (currentWordList.words) {
      const randomId = Math.floor(Math.random() * filteredWords?.length);

      setRandomWord(filteredWords[randomId]);
    }
  };

  const checkWord = () => {
    if (randomWord.word.toLowerCase() === inputWord.toLowerCase()) {
      if (!randomWord.isLearned) {
        dispatch(learnWord({ wordlistid: id, wordid: randomWord._id }));
      }
      showMessage("You're right", "success");
      setInputWord("");
    } else {
      showMessage("You're wrong. Try again!", "error");
    }
  };

  const changeWord = () => {
    showMessage(`${randomWord.word.toUpperCase()} is right word`, "info");
    listenToPronunciation(randomWord.word);
    setInputWord("");
    getRandomWord();
  };

  const onHandlerEnter = (e) => {
    if (e.code === "Enter") {
      checkWord();
    }
  };

  useEffect(() => {
    dispatch(fetchCurrentWordList(id));
    // eslint-disable-next-line
  }, [dispatch, id]);

  useEffect(() => {
    getRandomWord();
    // eslint-disable-next-line
  }, [currentWordList]);

  const fetching = loading && <Spinner />;

  const content =
    !loading &&
    !error &&
    (filteredWords.length ? (
      <CardBody>
        <h3>{randomWord?.translate?.toLowerCase()}</h3>
        <p>{randomWord?.definition}</p>
        <Button onClick={changeWord}>Change word</Button>
        <Input
          placeholder="Enter a word"
          value={inputWord}
          onChange={(e) => setInputWord(e.target.value)}
          onKeyPress={onHandlerEnter}
        />
      </CardBody>
    ) : (
      <p style={{ padding: "2rem" }}>You have already learned this wordlist</p>
    ));

  return (
    <div>
      <ArrowButton onClick={() => navigate(-1)}>
        <IoArrowBack /> Back
      </ArrowButton>
      <Card>
        {fetching}
        {content}
      </Card>
    </div>
  );
};

export default WordLearnPage;
