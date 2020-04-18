import React, { useState, useEffect } from "react";
import "./style.scss";
import { Button } from "react-bootstrap";

import Modal from "../Modal";

export default (props) => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [choice, setChoice] = useState("");

  const [clicked, setClicked] = useState("");

  const handleChosenOption = (cause) => {
    setClicked(cause);
    setIsModalShown(true);
  };

  const handleChoice = (incomingChoice) => {
    setChoice(incomingChoice);
  };

  const handleClose = () => {
    setIsModalShown(false);
  };

  useEffect(() => {
    if (choice === "bpleven" && clicked === "get-q") {
      props.history.push("/questions", { group: "bpleven" });
    } else if (choice === "bpleven" && clicked === "add-q") {
      props.history.push("/addQuestion", { group: "bpleven" });
    } else if (choice === "bplovdiv" && clicked === "add-q") {
      props.history.push("/addQuestion", { group: "bplovdiv" });
    } else if (choice === "bplovdiv" && clicked === "get-q") {
      props.history.push("/questions", { group: "bplovdiv" });
    } else if (choice === "hpleven" && clicked === "get-q") {
      props.history.push("/questions", { group: "hpleven" });
    } else if (choice === "hpleven" && clicked === "add-q") {
      props.history.push("/addQuestion", { group: "hpleven" });
    } else if (choice === "hplovdiv" && clicked === "get-q") {
      props.history.push("/questions", { group: "hplovdiv" });
    } else if (choice === "hplovdiv" && clicked === "add-q") {
      props.history.push("/addQuestion", { group: "hplovdiv" });
    } else {
      setChoice("");
    }
  }, [choice, props, clicked]);

  return (
    <div className="container">
      <div className="buttons-wrapper">
        <Button onClick={() => handleChosenOption("get-q")} variant="primary">
          Започни Тест
        </Button>
        <Button onClick={() => handleChosenOption("add-q")} variant="secondary">
          Добави Въпрос
        </Button>
        <Button
          onClick={() => props.history.push("/editQuestionById")}
          variant="dark"
        >
          Редактирай Въпрос с ID
        </Button>
        <Button onClick={() => props.history.push("/log")} variant="warning">
          Последно добавен въпрос
        </Button>
      </div>
      <Modal
        show={isModalShown}
        handleClose={handleClose}
        handleChoice={handleChoice}
      />
    </div>
  );
};
