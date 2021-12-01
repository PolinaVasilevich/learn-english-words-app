import React, { useEffect, useState } from "react";
import XLSX from "xlsx";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { fetchWordLists, addWordList } from "../store/wordSlice";
import Modal from "../components/modal/Modal";
import List from "../components/List";
import Card from "../components/card/Card";
import { useNavigate } from "react-router";
import { WORD_LIST_ROUTE } from "../utils/consts";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  margin-top: 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputFileWrapper = styled.div`
  width: 100%;
  position: relative;
  margin-top: 20px;
  text-align: center;
`;

const InputFile = styled.input.attrs({
  type: "file",
  id: "file",
})`
  opacity: 0;
  visibility: hidden;
  position: absolute;
`;

const InputText = styled.input.attrs({
  type: "text",
})`
  margin-top: 1.2rem;
  width: 100%;
  padding: 0.3rem 1rem;

  outline: none;
  border: 1px solid var(--grey);
  border-radius: var(--radii);
  background-color: ${(props) => props.theme.backgroudColor};
  color: ${(props) => props.theme.textColor};
`;

const UploadFileButton = styled.label.attrs({
  htmlFor: "file",
})`
  width: 100%;
  max-width: 150px;
  padding: 15px;

  background-color: var(--purple);
  color: ${(props) => props.theme.textColor};

  border-radius: var(--radii);

  cursor: pointer;
`;

const CreateListButton = styled.button`
  width: 100%;
  max-width: 250px;
  padding: 20px;

  text-align: center;
  background-color: var(--purple);
  color: ${(props) => props.theme.textColor};

  border-radius: var(--radii);

  outline: none;
  border: none;

  cursor: pointer;
`;

const UserPage = () => {
  const words = useSelector((state) => state.word.words);
  const status = useSelector((state) => state.word.status);
  const user = useSelector((state) => state.user.user);

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const [nameList, setNameList] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

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
  };

  useEffect(() => {
    dispatch(fetchWordLists(user.id));
  }, [user, dispatch]);

  return (
    <div>
      <Wrapper>
        <h1>Create your sets of words for learning</h1>
        <CreateListButton onClick={toggleModal}>
          Create new set of words
        </CreateListButton>
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
      {words.length && status !== "loading" ? (
        <List>
          {words?.map(({ _id, name, words }) => (
            <Link to={`/wordlist/${_id}`} key={name}>
              <Card name={name} legthList={words?.length} />
            </Link>
          ))}
        </List>
      ) : null}
    </div>
  );
};

export default UserPage;
