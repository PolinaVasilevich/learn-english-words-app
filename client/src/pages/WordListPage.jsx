import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { useGetWordsByListIdQuery } from "../api/apiSlice";

import Table from "../components/table/Table";
import ArrowBack from "../components/arrowBack/ArrowBack";

import { LEARN_WORD_ROUTE } from "../utils/consts";
import { Button } from "../components/MainButton";

import { Spinner } from "../components/spinner/Spinner";
import { useToasts } from "react-toast-notifications";

import styled from "styled-components";
import Pagination from "../components/pagination/Pagination";
import Controls from "../components/controls/Controls";
import { Text } from "../components/table/TableStyled";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const WordListPage = () => {
  const { id } = useParams();
  const { data: wordlist, isLoading, error } = useGetWordsByListIdQuery(id);

  const [filteredWords, setFilteredWords] = useState(null);

  const getFilteredWords = useCallback(
    (filter) => {
      const { words } = wordlist;
      setCurrentPage(1);
      switch (filter.value) {
        case "learned":
          return setFilteredWords(words.filter((w) => w.isLearned));
        case "new":
          return setFilteredWords(words.filter((w) => !w.isLearned));
        default:
          return setFilteredWords([...words]);
      }
    },
    [wordlist]
  );

  ///pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [wordsPerPage] = useState(10);

  const lastWordIndex = currentPage * wordsPerPage;
  const firstWordIndex = lastWordIndex - wordsPerPage;

  const words = useMemo(() => {
    return filteredWords?.slice(firstWordIndex, lastWordIndex);
  }, [filteredWords, firstWordIndex, lastWordIndex]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  ///pagination

  const { addToast } = useToasts();

  useEffect(() => {
    if (error) {
      addToast(error, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  }, [error, addToast]);

  const loading = isLoading ? <Spinner /> : null;

  const pagination = filteredWords ? (
    <Pagination
      wordsPerPage={wordsPerPage}
      totalWords={filteredWords.length}
      paginate={paginate}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
  ) : null;

  const content = !isLoading && !error && (
    <div>
      <div>
        <h1>{wordlist.name}</h1>
        <Link to={LEARN_WORD_ROUTE + `/${id}`}>
          <Button>Learn this word list</Button>
        </Link>
      </div>
      <div>
        <Controls getFilteredWords={getFilteredWords} />
        {words?.length ? (
          <>
            <Table words={words} />
            {pagination}
          </>
        ) : (
          <Text>There aren't words with this filter</Text>
        )}
      </div>
    </div>
  );

  return (
    <Wrapper>
      <ArrowBack />
      {loading}
      {content}
    </Wrapper>
  );
};

export default WordListPage;
