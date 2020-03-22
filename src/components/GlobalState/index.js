import React, { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import SwapContext from "./globalContext";
import GlobalReducer from "./globalReducer";
import { questionsUpdate } from "./actions";

const GlobalState = props => {
  const initialState = {
    questions: []
  };

  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  const onQuestionsUpdate = async () => dispatch(await questionsUpdate());

  useEffect(() => {
    onQuestionsUpdate();
  }, []);

  return (
    <SwapContext.Provider
      value={{
        questions: state.questions,

        // actions
        onQuestionsUpdate
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
