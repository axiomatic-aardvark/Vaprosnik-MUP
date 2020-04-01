import React, { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import SwapContext from "./globalContext";
import GlobalReducer from "./globalReducer";
import { questionsUpdate, questionsToShowUpdate } from "./actions";

const GlobalState = props => {
  const initialState = {
    questions: [],
    questionsToShow: []
  };

  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  const onQuestionsUpdate = async () => dispatch(await questionsUpdate());
  const onQuestionsToShowUpdate = (questions) => dispatch(questionsToShowUpdate(questions));

  useEffect(() => {
    onQuestionsUpdate();
  }, []);

  return (
    <SwapContext.Provider
      value={{
        questions: state.questions,
        questionsToShow: state.questionsToShow,

        // actions
        onQuestionsUpdate,
        onQuestionsToShowUpdate
      }}
    >
      {props.children}
    </SwapContext.Provider>
  );
};

GlobalState.propTypes = {
  children: PropTypes.any
};

export default GlobalState;
