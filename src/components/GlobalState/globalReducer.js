import { UPDATE_QUESTIONS, UPDATE_QUESTIONS_TO_SHOW } from "./types";

export default (state, action) => {
  switch (action.type) {
    case UPDATE_QUESTIONS:
      return {
        ...state,
        questions: action.payload
      };
    case UPDATE_QUESTIONS_TO_SHOW:
      return {
        ...state,
        questionsToShow: action.payload
      };
    default: {
      return "";
    }
  }
};
