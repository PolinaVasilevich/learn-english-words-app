import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import Table from "../components/table/Table";
import { LEARN_WORD_ROUTE } from "../utils/consts";
import { Button } from "../components/MainButton";

const WordListPage = () => {
  const { id } = useParams();

  const [words, setWords] = useState(null);
  const [nameList, setNameList] = useState("");
  const [loading, setLoading] = useState(true);

  const getWords = async () => {
    try {
      const { data } = await axios(
        `${process.env.REACT_APP_API_URL}api/word/wordlist/${id}`
      );

      setNameList(data.name);

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

  return (
    <div style={{ textAlign: "center" }}>
      {!loading && (
        <>
          <h1>{nameList}</h1>
          <Link to={LEARN_WORD_ROUTE + `/${id}`}>
            <Button>Learn this word list</Button>
          </Link>

          <Table words={words} />
        </>
      )}
    </div>
  );
};

export default WordListPage;
