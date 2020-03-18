import React, { useState } from "react";
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

  const proxyUrl = "https://cors-anywhere.herokuapp.com/";

  const onFormSubmit = () => {
    pushQuestionToDB();
    setIsSubmitted(true);
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

  return (
    <div className="add-question">
      <span
        className="back"
        onClick={() => {
          props.history.push("/");
        }}
      >
        Назад
      </span>
      {!isSubmitted ? (
        <Form>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Въпрос</Form.Label>
            <Form.Control
              required
              type="text"
              onChange={e => setText(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Верен Отговор</Form.Label>
            <Form.Control
              required
              type="text"
              onChange={e => setOption1(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Грешен Отговор 1</Form.Label>
            <Form.Control
              required
              type="text"
              onChange={e => setOption2(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Грешен Отговор 2</Form.Label>
            <Form.Control
              type="text"
              onChange={e => setOption3(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Грешен Отговор 3</Form.Label>
            <Form.Control
              type="text"
              onChange={e => setOption4(e.target.value)}
            />
          </Form.Group>
          <Button
            onClick={() => {
              onFormSubmit();
            }}
            variant="primary"
          >
            Изпрати
          </Button>
        </Form>
      ) : (
        <div className="done">
          <img src={Done} alt="done-img" className="rotate-in-center"></img>
          <span>Въпросът е успешно добавен!</span>
          <Button
            className="add-more"
            onClick={() => setIsSubmitted(false)}
            variant="primary"
          >
            Добави още един
          </Button>
        </div>
      )}
    </div>
  );
};
