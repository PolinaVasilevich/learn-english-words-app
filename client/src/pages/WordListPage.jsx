import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { useGetWordsByListIdQuery } from "../api/apiSlice";

import Table from "../components/table/Table";
import { ArrowButton } from "../styles/wordLearnPageStyled";
import { LEARN_WORD_ROUTE } from "../utils/consts";
import { Button } from "../components/MainButton";

import { addNewWord } from "../store/wordSlice";
import { Spinner } from "../components/spinner/Spinner";
import { useToasts } from "react-toast-notifications";

import ModalComponent from "../components/modal/Modal";
import AddWordForm from "../components/forms/AddWordForm";

import { IoArrowBack } from "react-icons/io5";
import styled from "styled-components";
import { CustomSelect } from "../components/customSelect/CustomSelect";
import Pagination from "../components/pagination/Pagination";

const AddButton = styled.button`
  padding: 6px 15px;
  outline: none;
  border: 1px solid var(--grey);
  border-radius: 4px;
  background: none;

  display: block;

  color: ${(props) => props.theme.textColor};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Controls = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const WordListPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: wordlist, isLoading, error } = useGetWordsByListIdQuery(id);

  ////modal
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  ///

  ///filters

  const dispatch = useDispatch();

  const filters = useMemo(() => {
    return JSON.parse(localStorage.getItem("selectedFilters")) || [];
  }, []);

  const activeFilters = useMemo(() => {
    if (filters.length) {
      return filters.filter((f) => f.id === id);
    }
    return [];
  }, [filters]);

  const options = [
    { value: "all", label: "All" },
    { value: "learned", label: "Learned" },
    { value: "new", label: "New" },
  ];

  const [filter, setFilter] = useState(() => {
    return activeFilters.length ? activeFilters[0].filter : options[0];
  });

  const filteredWords = useMemo(() => {
    if (wordlist?.words) {
      const { words } = wordlist;
      switch (filter.value) {
        case "learned":
          return words.filter((w) => w.isLearned);
        case "new":
          return words.filter((w) => !w.isLearned);
        default:
          return [...words];
      }
    }
  }, [filter, wordlist]);

  useEffect(() => {
    const allFilters = filters.filter((f) => f.id !== id);

    localStorage.setItem(
      "selectedFilters",
      JSON.stringify([...allFilters, { id, filter }])
    );

    setCurrentPage(1);
  }, [filter]);

  ////filters

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
    localStorage.setItem("currentPage", +pageNumber);
  };

  ///pagination

  const openForm = () => {
    toggleModal();
  };

  const addWord = (word) => {
    toggleModal();
    dispatch(addNewWord({ id, word }));
  };

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

  const renderContent = (wordlist) => {
    return (
      <div>
        <div>
          <h1>{wordlist.name}</h1>
          <Link to={LEARN_WORD_ROUTE + `/${id}`}>
            <Button>Learn this word list</Button>
          </Link>
        </div>
        <Controls>
          <AddButton onClick={openForm}>Add new word in list</AddButton>
          <CustomSelect
            options={options}
            classNamePrefix="react-select"
            value={filter}
            onChange={setFilter}
          />
        </Controls>

        <Table words={words} />
        {words.length && (
          <Pagination
            wordsPerPage={wordsPerPage}
            totalWords={wordlist.words.length}
            paginate={paginate}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    );
  };

  const elements = !isLoading && !error && renderContent(wordlist);

  return (
    <Wrapper>
      <ArrowButton onClick={() => navigate(-1)}>
        <IoArrowBack /> Back
      </ArrowButton>
      {loading}
      {elements}

      <ModalComponent modal={modal} toggleModal={toggleModal}>
        <AddWordForm onSubmit={addWord} />
      </ModalComponent>
    </Wrapper>
  );
};

export default WordListPage;
