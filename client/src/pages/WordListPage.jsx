import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

import Table from "../components/table/Table";
import { ArrowButton } from "../styles/wordLearnPageStyled";
import { LEARN_WORD_ROUTE } from "../utils/consts";
import { Button } from "../components/MainButton";
import { useSelector, useDispatch } from "react-redux";
import { addNewWord, fetchCurrentWordList } from "../store/wordSlice";
import { Spinner } from "../components/spinner/Spinner";
import { useToasts } from "react-toast-notifications";
import { IoArrowBack } from "react-icons/io5";
import styled from "styled-components";
import ModalComponent from "../components/modal/Modal";
import AddWordForm from "../components/forms/AddWordForm";

const AddButton = styled.button`
  outline: none;
  border: none;
  background: none;

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

  const openForm = () => {
    toggleModal();
  };

  const addWord = (word) => {
    toggleModal();
    dispatch(addNewWord({ id, word }));
  };

  useEffect(() => {
    dispatch(fetchCurrentWordList(id));
  }, [dispatch]);

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
      <ArrowButton onClick={() => navigate(-1)}>
        <IoArrowBack /> Back
      </ArrowButton>
      <AddButton onClick={openForm}>Add new word in list</AddButton>
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

      <ModalComponent modal={modal} toggleModal={toggleModal}>
        <AddWordForm onSubmit={addWord} />
      </ModalComponent>
    </div>
  );
};

export default WordListPage;
