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
    console.log(arr);
    // arr.forEach(element => {
    //   console.log(element);
    // });

    return arr;
  };

  const getLimitedQuestions = arr => {
    let scrambledQuestions = shuffle(arr);
    scrambledQuestions = scrambledQuestions.slice(0, 10);

    return affixWithAtSign(scrambledQuestions);
  };

  try {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const res = await axios.get(
      proxyUrl +
        "https://us-central1-vaprosnik-mup.cloudfunctions.net/getQuestions"
    );
    return {
      type: UPDATE_QUESTIONS,
      payload: { questions: getLimitedQuestions(res.data) }
    };
  } catch (error) {
    return {
      type: UPDATE_QUESTIONS,
      payload: { questions: null }
    };
  }
};
