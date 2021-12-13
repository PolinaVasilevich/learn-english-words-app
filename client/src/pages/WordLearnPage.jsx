import React, { useEffect, useMemo, useState } from "react";

import {
  useGetWordsByListIdQuery,
  useLearnWordMutation,
} from "../api/apiSlice";

import { useParams } from "react-router";
import { useToasts } from "react-toast-notifications";

import { Spinner } from "../components/spinner/Spinner";
import { ErrorMessage } from "../styles/wordLearnPageStyled";

import { listenToPronunciation } from "../utils/listenToPron";

import CardWord from "../components/cardWord/CardWord";
import ArrowBack from "../components/arrowBack/ArrowBack";

const WordLearnPage = () => {
  const { addToast } = useToasts();

  const showMessage = (type, message) =>
    addToast(message, {
      appearance: type,
      autoDismiss: true,
    });

  const { id } = useParams();

  const { data: wordlist, isLoading, error } = useGetWordsByListIdQuery(id);
  const [learnWord, { isLoading: isLoadingMutation, error: errorMutation }] =
    useLearnWordMutation(id);

  const filteredWords = useMemo(() => {
    return wordlist ? wordlist.words.filter((w) => !w.isLearned) : [];
  }, [wordlist]);

  const [randomIndex, setRandomIndex] = useState(0);

  const getRandomIndex = () => {
    const randomIndex = Math.floor(Math.random() * filteredWords?.length);
    setRandomIndex(randomIndex);
  };

  useEffect(() => {
    getRandomIndex();
  }, []);

  const randomWord = useMemo(() => {
    return filteredWords[randomIndex];
  }, [filteredWords, randomIndex]);

  const changeIsLearnedWord = (wordid) => {
    learnWord({ id, wordid });
  };

  const changeWord = () => {
    showMessage("info", `${randomWord.word.toUpperCase()} is right word`);
    listenToPronunciation(randomWord.word);
    getRandomIndex();
  };

  const loading = isLoading || isLoadingMutation ? <Spinner /> : null;
  const messageError =
    error || errorMutation ? (
      <ErrorMessage>{error && errorMutation}</ErrorMessage>
    ) : null;

  const content = filteredWords.length ? (
    <CardWord
      word={randomWord}
      changeWord={changeWord}
      learnWord={changeIsLearnedWord}
    />
  ) : (
    <p style={{ padding: "2rem" }}>You have already learned this wordlist</p>
  );

  const wordCard = !isLoading && !error && content;

  return (
    <div>
      <ArrowBack />
      {loading}
      {messageError}
      {wordCard}
    </div>
  );
};

export default WordLearnPage;
