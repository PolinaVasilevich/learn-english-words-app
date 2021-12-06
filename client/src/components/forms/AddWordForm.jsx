import React, { useState } from "react";
import { Input } from "../../styles/wordLearnPageStyled";
import { Button } from "../MainButton";

const AddWordForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    word: "",
    pronunciation: "",
    translate: "",
    definition: "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addWord = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form>
      <h1>Add new word in this list</h1>
      <div>
        <Input
          placeholder="Enter a word"
          id="word"
          autoFocus={true}
          value={formData.word}
          name="word"
          onChange={(e) => onChange(e)}
        />
        <Input
          placeholder="Enter a pronunciation"
          id="pronunciation"
          value={formData.pronunciation}
          name="pronunciation"
          onChange={(e) => onChange(e)}
        />
        <Input
          placeholder="Enter a translate"
          id="translate"
          name="translate"
          value={formData.translate}
          onChange={(e) => onChange(e)}
        />
        <Input
          placeholder="Enter a definition"
          id="definition"
          name="definition"
          value={formData.definition}
          onChange={(e) => onChange(e)}
        />
      </div>
      <Button onClick={addWord}>Add word</Button>
    </form>
  );
};

export default AddWordForm;
