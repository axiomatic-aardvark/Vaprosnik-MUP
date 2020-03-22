import React, { useState, useContext } from "react";
import GlobalContext from "../GlobalState/globalContext";
import Loader from "react-loader-spinner";
import { Scrollbars } from "react-custom-scrollbars";

import { Button } from "react-bootstrap";
import QuestionCard from "./QuestionCard";
import "./style.scss";

export default props => {
  const globalContext = useContext(GlobalContext);
  const { questions } = globalContext;

  const [isSubmitted, setIsSubmitted] = useState(false);

  // const [isModalOpen, setIsModalOpen] = useState(false);

  const getResults = e => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  // const onFinalSubmit = () => {
  // 	setIsSubmitted(true);
  // };

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
        Назад
      </span>

      {questions ? (
        <>
          <ul className="questions">
            {questions.map((q, i) => {
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
                  id={q.id}
                  key={i}
                  history={props.history}
                  className="question-card"
                />
              );
            })}
          </ul>
          <Button
            className="submit-btn"
            onClick={e => {
              isSubmitted ? window.location.reload() : getResults(e);
            }}
            variant={isSubmitted ? "success" : "primary"}
          >
            {isSubmitted ? "Зареди нови въпроси" : "Край"}
          </Button>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};
