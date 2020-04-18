import React, { useState, useContext, useEffect, useRef } from "react";
import GlobalContext from "../GlobalState/globalContext";
import Loader from "react-loader-spinner";
import backImg from "../../images/back.png";
import reloadImg from "../../images/refresh.png";
import QuestionCard from "./QuestionCard";
import { formatChosenGroup } from "../../utils";

import "./style.scss";

export default (props) => {
  const answers = useRef({});

  const group = props.location.state.group;

  const globalContext = useContext(GlobalContext);
  let { questions, onQuestionsToShowUpdate, questionsToShow } = globalContext;

  if (questionsToShow) {
    const newIds = questionsToShow.map((q) => {
      return q._id;
    });

    let idsInLocalStorage = [];

    if (localStorage.getItem("PAST_QUESTIONS")) {
      idsInLocalStorage = localStorage
        .getItem("PAST_QUESTIONS")
        .split(",")
        .filter((x) => x);
    }

    localStorage.setItem("PAST_QUESTIONS", [...idsInLocalStorage, newIds]);
  }

  const shuffle = (array) => {
    let newArr = [...array];

    var currentIndex = newArr.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = newArr[currentIndex];
      newArr[currentIndex] = newArr[randomIndex];
      newArr[randomIndex] = temporaryValue;
    }

    return newArr;
  };

  let shuffledQuestions = shuffle(questions);

  if (group === "bpleven") {
    shuffledQuestions = shuffledQuestions
      .filter((q) => !q.group || q.group === "")
      .slice(0, 15);
  } else {
    shuffledQuestions = shuffledQuestions
      .filter((q) => q.group === group)
      .slice(0, 15);
  }

  useEffect(() => {
    if (questionsToShow.length === 0) {
      onQuestionsToShowUpdate(shuffledQuestions);
    }
  }, [questions]);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const getResults = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const genScrambledArr = (option1, option2, option3, option4) => {
    const baseArr = [option1, option2, option3, option4];

    return shuffle(baseArr);
  };

  return (
    <div className="questions-wrapper">
      <span
        className="back"
        onClick={() => {
          props.history.push("/");
        }}
      >
        <img className="back-icon" alt="back=-icon" src={backImg}></img>
      </span>
      <span
        className="reload"
        onClick={() => {
          window.location.reload();
        }}
      >
        <img className="reload-icon" alt="reload-icon" src={reloadImg}></img>
      </span>
      <span
        style={{
          fontSize: 18,
          marginBottom: 20,
          color: "#800000",
        }}
      >
        {formatChosenGroup(group)}
      </span>
      {questionsToShow.length !== 0 ? (
        <ul className="questions">
          {questionsToShow.map((q, i) => {
            let scrambledArr = genScrambledArr(
              q.option1,
              q.option2,
              q.option3,
              q.option4
            );

            return (
              <QuestionCard
                text={q.text}
                option1={scrambledArr[0]}
                option2={scrambledArr[1]}
                option3={scrambledArr[2]}
                option4={scrambledArr[3]}
                isSubmitted={isSubmitted}
                id={q._id}
                key={i}
                num={i}
                history={props.history}
                className="question-card"
                getResults={getResults}
                group={group}
                answers={answers}
              />
            );
          })}
        </ul>
      ) : (
        <div className="loader-container">
          <Loader
            type="ThreeDots"
            color="#007bff"
            height={100}
            width={100}
            timeout={1200000} //20 minutes
          />
          <span>
            *Ако въпросите не заредят до 2-3 мин има проблем с базата данни. :(
            Моля опитайте по-късно.
          </span>
        </div>
      )}
    </div>
  );
};
