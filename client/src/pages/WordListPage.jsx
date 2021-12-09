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
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };
  const dispatch = useDispatch();

  const { currentWordList, error, loading } = useSelector(
    (state) => state.word
  );

  const { addToast } = useToasts();

  const options = [
    { value: "all", label: "All" },
    { value: "learned", label: "Learned" },
    { value: "new", label: "New" },
  ];

  const [activeFilters, setActiveFilters] = useState(() => {
    const activeFilters = localStorage.getItem("selectedFilters");

    return activeFilters ? JSON.parse(activeFilters) : [];
  });

  const [filter, setFilter] = useState(() => {
    const filters = activeFilters?.filter((f) => f.id === id);
    return filters.length ? filters[0]["filter"] : options[0];
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
    const filters = activeFilters.filter((f) => f.id !== id);
    localStorage.setItem(
      "selectedFilters",
      JSON.stringify([...filters, { id, filter }])
    );

    localStorage.removeItem("currentPage");
  }, [filter]);

  const [currentPage, setCurrentPage] = useState(() => {
    const currentPage = localStorage.getItem("currentPage");
    return currentPage ? +currentPage : 1;
  });

  const [wordsPerPage] = useState(10);

  const lastWordIndex = currentPage * wordsPerPage;
  const firstWordIndex = lastWordIndex - wordsPerPage;
  const currentWord = filteredWords?.slice(firstWordIndex, lastWordIndex);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    localStorage.setItem("currentPage", +pageNumber);
  };

  return (
    <Wrapper>
      <ArrowButton onClick={() => navigate(-1)}>
        <IoArrowBack /> Back
      </ArrowButton>

      {loading ? (
        <Spinner />
      ) : (
        <>
          <div>
            <h1>{currentWordList.name}</h1>
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

          <Table words={currentWord} />
          {filteredWords.length ? (
            <Pagination
              wordsPerPage={wordsPerPage}
              totalWords={filteredWords?.length}
              paginate={paginate}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          ) : null}
        </>
      )}

      <ModalComponent modal={modal} toggleModal={toggleModal}>
        <AddWordForm onSubmit={addWord} />
      </ModalComponent>
    </Wrapper>
  );
};

export default WordListPage;
