import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import Table from "../components/table/Table";
import { LEARN_WORD_ROUTE } from "../utils/consts";
import { Button } from "../components/MainButton";
import { useSelector, useDispatch } from "react-redux";
import { fetchCurrentWordList } from "../store/wordSlice";
import { Spinner } from "../components/spinner/Spinner";
import { useToasts } from "react-toast-notifications";

const WordListPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { currentWordList, error, loading } = useSelector(
    (state) => state.word
  );

  const { addToast } = useToasts();

  useEffect(() => {
    dispatch(fetchCurrentWordList(id));
  }, []);

  useEffect(() => {
    if (error) {
      addToast(error, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  }, [error]);

  return (
    <div style={{ textAlign: "center" }}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1>{currentWordList.name}</h1>
          <Link to={LEARN_WORD_ROUTE + `/${id}`}>
            <Button>Learn this word list</Button>
          </Link>
          <Table words={currentWordList.words} />
        </>
      )}
    </div>
  );
};

export default WordListPage;
