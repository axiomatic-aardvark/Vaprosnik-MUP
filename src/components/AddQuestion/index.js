import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./style.scss";
import { Form, Button } from "react-bootstrap";
import DoneImg from "../../images/success.png";
import ErrorImg from "../../images/error.png";
import Loader from "react-loader-spinner";
import { useAlert } from "react-alert";

export default props => {
  console.log("Obicham Elcho <3");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [text, setText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isError, setIsError] = useState(false);

  const [isQuerySent, setIsQuerySent] = useState(false);

  const [isEditing, setEditing] = useState(true);

  // const proxyUrl = "https://cors-anywhere.herokuapp.com/";

  const alert = useAlert();

  const onFormSubmit = e => {
    e.preventDefault();

    if (
      text !== "" &&
      option1 !== "" &&
      (option2 !== "") & (option3 !== "") &&
      option4 !== ""
    ) {
      pushQuestionToDB();
      setIsQuerySent(true);
      setIsError(false);
      setEditing(false);
    } else {
      alert.error("EMPTY FIELD/S");
    }
  };

  const pushQuestionToDB = () => {
    axios
      .post("http://192.168.43.15:5000/questions/add", {
        option1: option1 + ",t",
        option2: option2 + ",f",
        option3: option3 + ",f",
        option4: option4 + ",f",
        text: text
      })
      .then(function(response) {
        console.log(response);
        setIsSubmitted(true);
        alert.success("SUCCESS");

        setOption1("");
        setOption2("");
        setOption3("");
        setOption4("");
        setText("");
      })
      .catch(function(error) {
        alert.error("ERROR");
        console.log(error);
        setIsError(true);
      });
  };

  const inputRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    if (isQuerySent && isSubmitted) {
      buttonRef.current.focus();
    }
  });

  const handleClick = () => {
    setEditing(true);
    setIsQuerySent(false);
    setIsSubmitted(false);
    setIsError(false);
  };

  const pressedKeyOnDone = e => {
    const { keyCode } = e;
    if (isQuerySent && keyCode === 13) {
      handleClick();
    }
  };

  return (
    <div className="add-question" onKeyDown={e => pressedKeyOnDone(e)}>
      <span
        className="back"
        onClick={() => {
          props.history.push("/");
        }}
      >
        Назад
      </span>
      {!isQuerySent ? (
        <Form onSubmit={e => onFormSubmit(e)}>
          <Form.Group className="group-question" controlId="questions">
            <Form.Label>Въпрос:</Form.Label>
            <Form.Control
              required
              type="text"
              as="textarea"
              rows="5"
              value={text}
              ref={inputRef}
              onChange={e => setText(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="option1">
            <Form.Label>Верен Отговор</Form.Label>
            <Form.Control
              required
              type="text"
              value={option1}
              onChange={e => setOption1(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="option2">
            <Form.Label>Грешен Отговор 1</Form.Label>
            <Form.Control
              required
              type="text"
              value={option2}
              onChange={e => setOption2(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="option3">
            <Form.Label>Грешен Отговор 2</Form.Label>
            <Form.Control
              required
              type="text"
              value={option3}
              onChange={e => setOption3(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="option4">
            <Form.Label>Грешен Отговор 3</Form.Label>
            <Form.Control
              required
              type="text"
              value={option4}
              onChange={e => setOption4(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Изпрати
          </Button>
        </Form>
      ) : isSubmitted ? (
        <div className="done">
          <img src={DoneImg} alt="done-img" className="rotate-in-center"></img>
          <span>Въпросът е успешно добавен!</span>
          <Button
            ref={buttonRef}
            className="add-more"
            onClick={() => handleClick()}
            variant="primary"
          >
            Добави още един
          </Button>
        </div>
      ) : isError ? (
        <div className="error">
          <img
            src={ErrorImg}
            alt="error-img"
            className="rotate-in-center"
          ></img>
          <span>Неуспешно изпращане на въпрос! Моля, опитайте по-късно.</span>
          <Button
            ref={buttonRef}
            className="error-btn"
            onClick={() => handleClick()}
            variant="primary"
          >
            Опитай пак
          </Button>
        </div>
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
  );
};
