import { UPDATE_QUESTIONS } from "./types";
import axios from "axios";

export const questionsUpdate = async () => {
  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  const affixWithAtSign = arr => {
    return arr.map(element => {
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

  const getLimitedQuestions = arr => {
    let scrambledQuestions = shuffle(arr);
    // scrambledQuestions = scrambledQuestions.slice(0, 10);

    console.log("BASE ", scrambledQuestions);

    return affixWithAtSign(scrambledQuestions);
  };

  try {
    // const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const res = await axios.get(
      "https://server-vaprosnik.herokuapp.com/questions"
    );
    console.log(res.data);

    return {
      type: UPDATE_QUESTIONS,
      payload: getLimitedQuestions(res.data)
    };
  } catch (error) {
    return {
      type: UPDATE_QUESTIONS,
      payload: { questions: null }
    };
  }
};
