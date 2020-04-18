import { UPDATE_QUESTIONS, UPDATE_QUESTIONS_TO_SHOW } from "./types";
import axios from "axios";

export const questionsToShowUpdate = (questions) => {
  console.log("TUK ", questions);
  return {
    type: UPDATE_QUESTIONS_TO_SHOW,
    payload: questions,
  };
};

export const questionsUpdate = async () => {
  const affixWithAtSign = (arr) => {
    return arr.map((element) => {
      const { option1, option2, option3, option4 } = element;

      const index1 = option1.lastIndexOf(",");
      const index2 = option2.lastIndexOf(",");
      const index3 = option3.lastIndexOf(",");
      const index4 = option4.lastIndexOf(",");

      const frontPart1 = option1.substring(0, index1);
      const backPart1 = "@" + option1.substring(index1 + 1);

      element.option1 = frontPart1 + backPart1;

      const frontPart2 = option2.substring(0, index2);
      const backPart2 = "@" + option2.substring(index2 + 1);

      element.option2 = frontPart2 + backPart2;

      const frontPart3 = option3.substring(0, index3);
      const backPart3 = "@" + option3.substring(index3 + 1);

      element.option3 = frontPart3 + backPart3;

      const frontPart4 = option4.substring(0, index4);
      const backPart4 = "@" + option4.substring(index4 + 1);

      element.option4 = frontPart4 + backPart4;

      return element;
    });
  };

  const getLimitedQuestions = (arr) => {
    console.log("BASE ", arr);

    return affixWithAtSign(arr);
  };

  try {
    const res = await axios.get(
      "https://server-vaprosnik.herokuapp.com/questions"
    );

    return {
      type: UPDATE_QUESTIONS,
      payload: getLimitedQuestions(res.data),
    };
  } catch (error) {
    return {
      type: UPDATE_QUESTIONS,
      payload: { questions: null },
    };
  }
};
