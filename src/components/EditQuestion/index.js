import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

import "./style.scss";

export default props => {
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [text, setText] = useState("");

  const onSubmitEdit = e => {
    e.preventDefault();
    console.log("edit init");
  };

  return (
    <Form onSubmit={e => onSubmitEdit(e)}>
      <span
        className="back"
        onClick={() => {
          console.log(props);
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
          value={option1}
          onChange={e => setOption1(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="option2">
        <Form.Label>Нов Грешен Отговор 1</Form.Label>
        <Form.Control
          required
          type="text"
          value={option2}
          onChange={e => setOption2(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="option3">
        <Form.Label>Нов Грешен Отговор 2</Form.Label>
        <Form.Control
          required
          type="text"
          value={option3}
          onChange={e => setOption3(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="option4">
        <Form.Label>Нов Грешен Отговор 3</Form.Label>
        <Form.Control
          required
          type="text"
          value={option4}
          onChange={e => setOption4(e.target.value)}
        />
      </Form.Group>
      <Button className="edit-btn" type="submit" variant="primary">
        Редактирай
      </Button>
    </Form>
  );
};
