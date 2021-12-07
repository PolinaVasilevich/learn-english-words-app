import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchWordLists,
  addWordList,
  deleteWordList,
} from "../store/wordSlice";

import Modal from "../components/modal/Modal";
import List from "../components/List";
import Card from "../components/card/Card";
import { Button } from "../components/MainButton";
import { Spinner } from "../components/spinner/Spinner.js";
import { useToasts } from "react-toast-notifications";

import { Wrapper } from "../styles/userPageStyled";

import AddWordList from "../components/forms/AddWordList";

const UserPage = () => {
  const { words, error, loading } = useSelector((state) => state.word);

  const user = useSelector((state) => state.user.user);

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const removeList = (id) => {
    dispatch(deleteWordList(id));
  };

  useEffect(() => {
    dispatch(fetchWordLists(user.id));
  }, [dispatch, user.id]);

  useEffect(() => {
    if (error) {
      addToast(error, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  }, [error, addToast]);

  const onSubmit = (formData) => {
    const newWordList = { ...formData, user };
    dispatch(addWordList(newWordList));
    setModal(false);
  };

  // const errorMessage = error ? <p>{error}</p> : null;
  const spinner = loading ? <Spinner /> : null;

  return (
    <div>
      <Wrapper>
        <h1>Create your sets of words for learning</h1>
        <Button onClick={toggleModal}>Create new set of words</Button>
        <Modal modal={modal} toggleModal={toggleModal}>
          <AddWordList onSubmit={onSubmit} />
        </Modal>
      </Wrapper>

      {/* {errorMessage} */}
      {spinner}

      {words.length && !loading ? (
        <List>
          {words?.map(({ _id, name, words }) => (
            <Card
              key={name}
              id={_id}
              name={name}
              legthList={words?.length}
              deleteList={removeList}
            />
          ))}
        </List>
      ) : null}
    </div>
  );
};

export default UserPage;
