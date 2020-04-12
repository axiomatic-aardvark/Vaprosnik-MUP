import React, { useState } from "react";
import { InputGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";

import editImg from "../../../images/edit.png";
import deleteImg from "../../../images/delete.png";

import "./style.scss";

export default (props) => {
  const QUESTIONS_TO_SHOW = 15;

  const gradeTable = {
    "1": "Слаб 2, ее пупас защо така :(",
    "2": "Слаб 2, ее пупас защо така :(",
    "3": "Слаб 2, ее пупас защо така :(",
    "4": "Слаб 2, ее пупас защо така :(",
    "5": "Слаб 2, ее пупас защо така :(",
    "6": "Слаб 2, ее пупас защо така :(",
    "7": "Слаб 2, ее пупас защо така :(",
    "8": "Среден 3, ее пупас защо така :(",
    "9": "Добър 3.5, другият път ще е повече пупи :)",
    "10": "Добър 4, другият път ще е повече пупи :)",
    "11": "Много добър 4.50, другият път ще е повече пупи :)",
    "12": "Много добър 5.00, още мъничко пупи :)",
    "13": "Отличен 5.50, още мъничко пупи :)",
    "14": "Отличен 5.75, още мъничко пупи :)",
    "15": "Отличен 6, право пупас!!! <3",
  };

  // const mockTable = {
  //   "1": 2,
  //   "2": 3,
  //   "3": 4,
  //   "4": 5,
  //   "5": 6,
  // };

  const [selectedOption, setSelectedOption] = useState("");
  const {
    getResults,
    isSubmitted,
    group,
    isComingFromLog,
    answers,
    id,
  } = props;

  const onToggle = (newValue) => {
    if (selectedOption !== newValue) {
      setSelectedOption(newValue);

      answers.current[id] = newValue.split("@")[1];
    }
  };

  const showRes = () => {
    const rightAnswersCount = Object.values(answers.current).filter(
      (a) => a === "t"
    ).length;

    const wrongAnswersCount = QUESTIONS_TO_SHOW - rightAnswersCount;

    return (
      <span>{`Резултат: ${rightAnswersCount} верни, ${wrongAnswersCount} грешни. Оценка: ${gradeTable[rightAnswersCount]}`}</span>
    );
  };

  const quote = '"';

  const getRightAnswer = () => {
    if (props.option1.split("@")[1] === "t") {
      return props.option1.split("@")[0];
    } else if (props.option2.split("@")[1] === "t") {
      return props.option2.split("@")[0];
    } else if (props.option3.split("@")[1] === "t") {
      return props.option3.split("@")[0];
    } else if (props.option4.split("@")[1] === "t") {
      return props.option4.split("@")[0];
    }
  };

  return (
    <>
      <div className="card">
        <span className="title">{props.text}</span>
        <span
          className="edit"
          onClick={() => {
            props.history.push("/editQuestion", {
              id: props.id,
              option1: props.option1,
              text: props.text,
              option2: props.option2,
              option3: props.option3,
              option4: props.option4,
              group: group,
              isComingFromLog: isComingFromLog,
            });
          }}
        >
          <img src={editImg} alt="edit-icon" className="edit-icon"></img>
        </span>
        <span
          className="delete"
          onClick={() => {
            props.history.push("/deleteQuestion", {
              id: props.id,
              option1: props.option1,
              text: props.text,
              option2: props.option2,
              option3: props.option3,
              option4: props.option4,
              group: group,
              isComingFromLog: isComingFromLog,
            });
          }}
        >
          <img src={deleteImg} alt="bin-icon" className="delete-icon"></img>
        </span>
        {!props.isSubmitted ? (
          <>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Checkbox
                  onChange={() => {
                    onToggle(props.option1);
                  }}
                  aria-label="Checkbox for following text input"
                />
              </InputGroup.Prepend>

              <span className="answer">{` А) ${
                props.option1.split("@")[0]
              }`}</span>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Checkbox
                  onChange={() => {
                    onToggle(props.option2);
                  }}
                  aria-label="Checkbox for following text input"
                />
              </InputGroup.Prepend>

              <span className="answer">{` Б) ${
                props.option2.split("@")[0]
              }`}</span>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Checkbox
                  onChange={() => {
                    onToggle(props.option3);
                  }}
                  aria-label="Checkbox for following text input"
                />
              </InputGroup.Prepend>

              <span className="answer">{` В) ${
                props.option3.split("@")[0]
              }`}</span>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Checkbox
                  onChange={() => {
                    onToggle(props.option4);
                  }}
                  aria-label="Checkbox for following text input"
                />
              </InputGroup.Prepend>
              <span className="answer">{` Г) ${
                props.option4.split("@")[0]
              }`}</span>
            </InputGroup>
            <span className="foot-note">- {props.num + 1} -</span>
          </>
        ) : selectedOption.split("@")[1] === "t" ? (
          <>
            <span className="res-msg green">Верен отговор!</span>
            <span className="green">{`Ти отговори: "${
              selectedOption.split("@")[0]
            }"`}</span>
          </>
        ) : (
          <>
            <span className="res-msg red">Грешен отговор!</span>
            <span className="red">{`Ти отговори: ${
              selectedOption
                ? quote + selectedOption.split("@")[0] + quote
                : '"Не давам отговор"'
            }, а верният отг. е: "${getRightAnswer()}"`}</span>
          </>
        )}
      </div>
      {props.num === QUESTIONS_TO_SHOW - 1 ? (
        <div className="bottom-container">
          {isSubmitted ? showRes() : null}
          <Button
            className="submit-btn"
            onClick={(e) => {
              isSubmitted ? window.location.reload() : getResults(e);
            }}
            variant={isSubmitted ? "success" : "primary"}
          >
            {isSubmitted ? "Зареди нови въпроси" : "Край"}
          </Button>
        </div>
      ) : null}
    </>
  );
};
