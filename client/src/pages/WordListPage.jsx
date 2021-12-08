import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Table from "../components/table/Table";
import { ArrowButton } from "../styles/wordLearnPageStyled";
import { LEARN_WORD_ROUTE } from "../utils/consts";
import { Button } from "../components/MainButton";

import { addNewWord, fetchCurrentWordList } from "../store/wordSlice";
import { Spinner } from "../components/spinner/Spinner";
import { useToasts } from "react-toast-notifications";

import ModalComponent from "../components/modal/Modal";
import AddWordForm from "../components/forms/AddWordForm";

import { IoArrowBack } from "react-icons/io5";
import styled from "styled-components";
import { CustomSelect } from "../components/customSelect/CustomSelect";

const AddButton = styled.button`
  outline: none;
  border: none;
  background: none;

  display: block;
  margin: 1.2rem auto;

  color: ${(props) => props.theme.textColor};
`;

const WordListPage = () => {
  const { id } = useParams();
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };
  const dispatch = useDispatch();

  const { currentWordList, error, loading } = useSelector(
    (state) => state.word
  );

  const { addToast } = useToasts();

  const navigate = useNavigate();

  const options = [
    { value: "all", label: "All" },
    { value: "learned", label: "Learned" },
    { value: "new", label: "New" },
  ];

  const [filter, setFilter] = useState(() => {
    const tableFilter = JSON.parse(localStorage.getItem("tableFilter"));
    return tableFilter ? tableFilter : options[0];
  });

  const filteredWords = useMemo(() => {
    if (currentWordList.words) {
      switch (filter.value) {
        case "learned":
          return currentWordList.words.filter((w) => w.isLearned);
        case "new":
          return currentWordList.words.filter((w) => !w.isLearned);
        default:
          return [...currentWordList.words];
      }
    }
  }, [filter, currentWordList]);

  const openForm = () => {
    toggleModal();
  };

  const addWord = (word) => {
    toggleModal();
    dispatch(addNewWord({ id, word }));
  };

  useEffect(() => {
    dispatch(fetchCurrentWordList(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      addToast(error, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  }, [error, addToast]);

  useEffect(() => {
    localStorage.setItem("tableFilter", JSON.stringify(filter));
  }, [filter]);

  return (
    <div style={{ textAlign: "center" }}>
      <ArrowButton onClick={() => navigate(-1)}>
        <IoArrowBack /> Back
      </ArrowButton>

      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1>{currentWordList.name}</h1>
          <Link to={LEARN_WORD_ROUTE + `/${id}`}>
            <Button>Learn this word list</Button>
          </Link>
          <AddButton onClick={openForm}>Add new word in list</AddButton>

          <CustomSelect
            options={options}
            classNamePrefix="react-select"
            value={filter}
            onChange={setFilter}
          />
          <Table words={filteredWords} />
          <div id="observer"></div>
        </>
      )}

      <ModalComponent modal={modal} toggleModal={toggleModal}>
        <AddWordForm onSubmit={addWord} />
      </ModalComponent>
    </div>
  );
};

export default WordListPage;
