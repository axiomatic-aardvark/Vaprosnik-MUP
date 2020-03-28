import React, { useState, Fragment } from "react";
import { InputGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";

import editImg from "../../../images/edit.png";
import deleteImg from "../../../images/delete.png";

export default props => {
  const [selectedOption, setSelectedOption] = useState("");
  const { getResults, isSubmitted, group } = props;

  const onToggle = newValue => {
    if (selectedOption !== newValue) {
      setSelectedOption(newValue);
    }
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
              group: group
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
              group: group
            });
          }}
        >
          <img src={deleteImg} alt="bin-icon" className="delete-icon"></img>
        </span>
        {!props.isSubmitted ? (
          <Fragment>
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
          </Fragment>
        ) : selectedOption.split("@")[1] === "t" ? (
          <Fragment>
            <span className="res-msg green">Верен отговор!</span>
            <span className="green">{`Ти отговори: "${
              selectedOption.split("@")[0]
            }"`}</span>
          </Fragment>
        ) : (
          <Fragment>
            <span className="res-msg red">Грешен отговор!</span>
            <span className="red">{`Ти отговори: ${
              selectedOption
                ? quote + selectedOption.split("@")[0] + quote
                : '"Не давам отговор"'
            }, а верният отг. е: "${getRightAnswer()}"`}</span>
          </Fragment>
        )}
      </div>
      {props.num === 14 ? (
        <Button
          className="submit-btn"
          onClick={e => {
            isSubmitted ? window.location.reload() : getResults(e);
          }}
          variant={isSubmitted ? "success" : "primary"}
        >
          {isSubmitted ? "Зареди нови въпроси" : "Край"}
        </Button>
      ) : null}
    </>
  );
};
