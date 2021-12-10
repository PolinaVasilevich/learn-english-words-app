import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Card from "../card/Card";
import List from "../List";

const WordLists = ({ wordlists, deleteList }) => {
  const renderWordList = (arr) => {
    if (arr.length === 0) {
      return (
        <CSSTransition timeout={0}>
          <h5>You haven't created wordlists yet</h5>
        </CSSTransition>
      );
    }

    return arr.map(({ _id, words, name }) => {
      return (
        <CSSTransition key={_id} timeout={500}>
          <Card
            id={_id}
            name={name}
            legthList={words?.length}
            deleteList={() => deleteList(_id)}
          />
        </CSSTransition>
      );
    });
  };

  const elements = renderWordList(wordlists);

  return (
    <TransitionGroup>
      <List>{elements}</List>
    </TransitionGroup>
  );
};

export default WordLists;
