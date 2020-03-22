import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

import "./style.scss";

export default props => {
  const state = props.location.state;

  const [option1, setOption1] = useState(state.option1);
  const [option2, setOption2] = useState(state.option2);
  const [option3, setOption3] = useState(state.option3);
  const [option4, setOption4] = useState(state.option4);
  const [text, setText] = useState(state.text);

  const onSubmitEdit = e => {
    e.preventDefault();
  };

  return (
    <Form onSubmit={e => onSubmitEdit(e)}>
      <span
        className="back"
        onClick={() => {
          props.history.push("/questions");
        }}
      >
        Назад
      </span>
      <Form.Group className="group-question" controlId="questions">
        <Form.Label>Редактирай Въпрос:</Form.Label>
        <Form.Control
          required
          type="text"
          as="textarea"
          rows="5"
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="option1">
        <Form.Label>Нов Верен Отговор</Form.Label>
        <Form.Control
          required
          type="text"
          value={option1.split("@")[0]}
          onChange={e => setOption1(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="option2">
        <Form.Label>Нов Грешен Отговор 1</Form.Label>
        <Form.Control
          required
          type="text"
          value={option2.split("@")[0]}
          onChange={e => setOption2(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="option3">
        <Form.Label>Нов Грешен Отговор 2</Form.Label>
        <Form.Control
          required
          type="text"
          value={option3.split("@")[0]}
          onChange={e => setOption3(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="option4">
        <Form.Label>Нов Грешен Отговор 3</Form.Label>
        <Form.Control
          required
          type="text"
          value={option4.split("@")[0]}
          onChange={e => setOption4(e.target.value)}
        />
      </Form.Group>
      <Button className="edit-btn" type="submit" variant="primary">
        Редактирай
      </Button>
    </Form>
  );
};
