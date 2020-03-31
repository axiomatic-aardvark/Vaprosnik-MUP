import React, { useContext, useEffect, useState } from "react";
import Loader from "react-loader-spinner";

import QuestionCard from "../Questions/QuestionCard";
import { formatChosenGroup } from "../../utils";
import GlobalContext from "../GlobalState/globalContext";
import backImg from "../../images/back.png";

import "./style.scss";

export default props => {
  const globalContext = useContext(GlobalContext);
  let { questions } = globalContext;
  const [lastQuestion, setLastQuestion] = useState();

  useEffect(() => {
    setLastQuestion(questions[questions.length - 1]);
  }, [questions]);

  return (
    <div className="log-wrapper">
      <span
        className="back"
        onClick={() => {
          props.history.push("/");
        }}
      >
        <img className="back-icon" alt="back=-icon" src={backImg}></img>
      </span>
      <div className="log-container">
        {lastQuestion ? (
          <>
            <span className="group-name">
              Група: {formatChosenGroup(lastQuestion.group)}
            </span>
            <QuestionCard
              text={lastQuestion.text}
              option1={lastQuestion.option1}
              option2={lastQuestion.option2}
              option3={lastQuestion.option3}
              option4={lastQuestion.option4}
              isSubmitted={false}
              id={lastQuestion._id}
              key={1}
              num={1}
              history={props.history}
              className="question-card"
              getResults={() => {}}
              group={lastQuestion.group}
              isComingFromLog={true}
            />
          </>
        ) : (
          <Loader
            type="ThreeDots"
            color="#007bff"
            height={100}
            width={100}
            timeout={1200000} //20 minutes
          />
        )}
      </div>
    </div>
  );
};
