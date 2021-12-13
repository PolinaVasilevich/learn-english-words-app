import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { useToasts } from "react-toast-notifications";

import {
  useGetWordListsByUserIdQuery,
  useCreateWordListMutation,
  useDeleteWordListMutation,
} from "../api/apiSlice";

import AddWordList from "../components/forms/AddWordList";
import WordLists from "../components/wordsList/WordLists";
import Modal from "../components/modal/Modal";
import { Button } from "../components/MainButton";
import { Spinner } from "../components/spinner/Spinner.js";

import { Wrapper } from "../styles/userPageStyled";

const UserPage = () => {
  const { addToast } = useToasts();

  const user = useSelector((state) => state.user.user);

  const {
    data: wordlists,
    isLoading,
    isError,
  } = useGetWordListsByUserIdQuery(user.id);

  const [createWordlist, { isLoading: isLoadingCreate, error: createError }] =
    useCreateWordListMutation();

  const [deleteWordlist, { isLoading: isLoadingDelete, error: deleteError }] =
    useDeleteWordListMutation();

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const removeList = (id) => {
    deleteWordlist(id).unwrap();
  };

  const showErrorMessage = (msg) => {
    addToast(msg, {
      appearance: "error",
      autoDismiss: true,
    });
  };

  useEffect(() => {
    if (createError) showErrorMessage(createError.data.message);
  }, [createError]);

  useEffect(() => {
    if (deleteError) showErrorMessage(deleteError.data.message);
  }, [deleteError]);

  const onSubmit = (formData) => {
    const newWordList = { ...formData, user };
    createWordlist(newWordList).unwrap();
    setModal(false);
  };

  const errorMessage = isError ? <h5>Loading error</h5> : null;
  const spinner =
    isLoading || isLoadingCreate || isLoadingDelete ? <Spinner /> : null;
  const wordLists = !isLoading && !isError && (
    <WordLists wordlists={wordlists} deleteList={removeList} />
  );

  return (
    <div>
      <Wrapper>
        <h1>Create your sets of words for learning</h1>
        <Button onClick={toggleModal}>Create new set of words</Button>
        <Modal modal={modal} toggleModal={toggleModal}>
          <AddWordList onSubmit={onSubmit} />
        </Modal>
      </Wrapper>
      {errorMessage}
      {spinner}
      {wordLists}
    </div>
  );
};

export default UserPage;
