import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./style.scss";
import { Form, Button } from "react-bootstrap";
import Done from "../../images/success.png";

export default props => {
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [text, setText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isEditing, setEditing] = useState(true);

  const proxyUrl = "https://cors-anywhere.herokuapp.com/";

  const onFormSubmit = e => {
    e.preventDefault();
    pushQuestionToDB();
    setIsSubmitted(true);
    setEditing(false);
  };

  const pushQuestionToDB = () => {
    axios
      .post(
        proxyUrl +
          "https://us-central1-vaprosnik-mup.cloudfunctions.net/pushQuestionToDB",
        {
          option1: option1 + ",t",
          option2: option2 + ",f",
          option3: option3 + ",f",
          option4: option4 + ",f",
          text: text
        }
      )
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
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
    if (isSubmitted) {
      buttonRef.current.focus();
    }
  });

  const handleClick = () => {
    setEditing(true);
    setIsSubmitted(false);
  };

  const pressedKeyOnDone = e => {
    const { keyCode } = e;
    if (isSubmitted && keyCode === 13) {
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
      {!isSubmitted ? (
        <Form onSubmit={e => onFormSubmit(e)}>
          <Form.Group className="group-question" controlId="questions">
            <Form.Label>Въпрос:</Form.Label>
            <Form.Control
              required
              type="text"
              as="textarea"
              rows="3"
              ref={inputRef}
              onChange={e => setText(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="option1">
            <Form.Label>Верен Отговор</Form.Label>
            <Form.Control
              required
              type="text"
              onChange={e => setOption1(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="option2">
            <Form.Label>Грешен Отговор 1</Form.Label>
            <Form.Control
              required
              type="text"
              onChange={e => setOption2(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="option3">
            <Form.Label>Грешен Отговор 2</Form.Label>
            <Form.Control
              type="text"
              onChange={e => setOption3(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="option4">
            <Form.Label>Грешен Отговор 3</Form.Label>
            <Form.Control
              type="text"
              onChange={e => setOption4(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Изпрати
          </Button>
        </Form>
      ) : (
        <div className="done">
          <img src={Done} alt="done-img" className="rotate-in-center"></img>
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
      )}
    </div>
  );
};
