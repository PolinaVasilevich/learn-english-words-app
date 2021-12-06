import React from "react";
import { Input } from "../../styles/wordLearnPageStyled";
import { Button } from "../MainButton";

const AddWordForm = () => {
  return (
    <div>
      <h1>Add new word in this list</h1>
      <div>
        <Input placeholder="Enter a word" id="word" />
        <Input placeholder="Enter a pronunciation" id="pronunciation" />
        <Input placeholder="Enter a translate" id="translate" />
        <Input placeholder="Enter a definition" id="definition" />
      </div>
      <Button>Add word</Button>
    </div>
  );
};

export default AddWordForm;
