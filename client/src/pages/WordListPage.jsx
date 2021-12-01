import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Table from "../components/table/Table";

const WordListPage = () => {
  const { id } = useParams();

  const [words, setWords] = useState(null);
  const [loading, setLoading] = useState(true);

  const getWords = async () => {
    try {
      const { data } = await axios(
        `${process.env.REACT_APP_API_URL}api/word/wordlist/${id}`
      );

      setWords(data.words);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWords();
  }, []);

  return <div>{!loading && <Table words={words} />}</div>;
};

export default WordListPage;
