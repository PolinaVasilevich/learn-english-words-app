import React, { useEffect, useState } from "react";
import XLSX from "xlsx";

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
import { useToasts } from "react-toast-notifications";

import {
  Wrapper,
  InputFileWrapper,
  InputFile,
  InputText,
  UploadFileButton,
} from "../styles/userPageStyled";

const UserPage = () => {
  const words = useSelector((state) => state.word.words);
  const error = useSelector((state) => state.word.error);
  const loading = useSelector((state) => state.word.loading);

  const user = useSelector((state) => state.user.user);

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const [nameList, setNameList] = useState("");

  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const onUploadFile = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    const reader = new FileReader();

    reader.onload = function (e) {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const newWordList = {
        name: nameList,
        words: XLSX.utils.sheet_to_json(worksheet),
        user,
      };

      dispatch(addWordList(newWordList));
    };
    reader.readAsArrayBuffer(file);
    setNameList("");
    setModal(false);

    if (!error) {
      addToast("You have created new word list successfully", {
        appearance: "success",
        autoDismiss: true,
      });
    } else {
      addToast(error, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const removeList = (id) => {
    dispatch(deleteWordList(id));
  };

  useEffect(() => {
    dispatch(fetchWordLists(user.id));
  }, []);

  return (
    <div>
      <Wrapper>
        <h1>Create your sets of words for learning</h1>
        <Button onClick={toggleModal}>Create new set of words</Button>
        <Modal modal={modal} toggleModal={toggleModal}>
          <InputText
            placeholder="Enter name of word list"
            required
            value={nameList}
            onChange={(e) => setNameList(e.target.value)}
          />
          <InputFileWrapper>
            <InputFile onChange={onUploadFile} />
            <UploadFileButton>Choose file</UploadFileButton>
          </InputFileWrapper>
        </Modal>
      </Wrapper>
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
