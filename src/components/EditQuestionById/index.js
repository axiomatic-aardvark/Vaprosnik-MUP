import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useAlert } from "react-alert";
import backImg from "../../images/back.png";
import reloadImg from "../../images/refresh.png";

import "./style.scss";

export default (props) => {
  const alert = useAlert();
  const [givenId, setGivenId] = useState("");
  const [questionObject, setQuestionObject] = useState();

  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [text, setText] = useState("");

  const getRightAndWrongAnswers = ({
    option1,
    option2,
    option3,
    option4,
    text,
  }) => {
    const allA = [option1, option2, option3, option4];
    const rightA = allA.filter((a) => {
      return a.endsWith("t");
    });
    const wrongAs = allA.filter((a) => {
      return a.endsWith("f");
    });

    setOption1(rightA[0].substring(0, rightA[0].length - 2) + "@t");
    setOption2(wrongAs[0].substring(0, wrongAs[0].length - 2) + "@f");
    setOption3(wrongAs[1].substring(0, wrongAs[1].length - 2) + "@f");
    setOption4(wrongAs[2].substring(0, wrongAs[2].length - 2) + "@f");

    setText(text);
  };

  const onSubmitEdit = (e) => {
    e.preventDefault();

    if (
      text !== "" &&
      option1 !== "" &&
      (option2 !== "") & (option3 !== "") &&
      option4 !== ""
    ) {
      updateInDb();
    } else {
      alert.error("EMPTY FIELD/S");
    }
  };

  const updateInDb = () => {
    axios
      .post(
        `https://server-vaprosnik.herokuapp.com/questions/update/${givenId}`,
        {
          option1: option1.endsWith("t")
            ? option1.substring(0, option1.length - 2) + ",t"
            : option1 + ",t",
          option2: option2.endsWith("f")
            ? option2.substring(0, option2.length - 2) + ",f"
            : option2 + ",f",
          option3: option3.endsWith("f")
            ? option3.substring(0, option3.length - 2) + ",f"
            : option3 + ",f",
          option4: option4.endsWith("f")
            ? option4.substring(0, option4.length - 2) + ",f"
            : option4 + ",f",
          text: text,
        }
      )
      .then(function (response) {
        console.log(response);
        alert.success("SUCCESS");

        setOption1("");
        setOption2("");
        setOption3("");
        setOption4("");
        setText("");
        props.history.push("/");
      })
      .catch(function (error) {
        alert.error("ERROR");
        console.log(error);
      });
  };

  const handleSubmitId = (e) => {
    e.preventDefault();
    fetchQuestionFromDb();
  };

  const fetchQuestionFromDb = async () => {
    axios
      .get(`https://server-vaprosnik.herokuapp.com/questions/${givenId}`)
      .then((response) => {
        setQuestionObject(response.data);
      });
  };

  useEffect(() => {
    if (questionObject) {
      getRightAndWrongAnswers(questionObject);
    }
  }, [questionObject]);

  return (
    <div className="edit-by-id-container">
      <span
        className="back"
        onClick={() => {
          props.history.push("/");
        }}
      >
        <img className="back-icon" alt="back-icon" src={backImg}></img>
      </span>

      <span
        className="reload"
        onClick={() => {
          window.location.reload();
        }}
      >
        <img className="reload-icon" alt="reload-icon" src={reloadImg}></img>
      </span>

      <Form className="id-form" onSubmit={handleSubmitId}>
        <Form.Control
          value={givenId}
          className="input"
          required
          type="text"
          placeholder="ID на въпроса"
          onChange={(e) => {
            setGivenId(e.target.value);
          }}
        ></Form.Control>
        <Button type="submit" className="btn" variant="primary">
          Зареди
        </Button>
      </Form>
      <Form onSubmit={(e) => onSubmitEdit(e)}>
        <Form.Group className="group-question" controlId="questions">
          <Form.Label>Редактирай Въпрос:</Form.Label>
          <Form.Control
            required
            type="text"
            as="textarea"
            rows="5"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="option1">
          <Form.Label>Нов Верен Отговор</Form.Label>
          <Form.Control
            required
            type="text"
            value={option1.split("@")[0]}
            onChange={(e) => setOption1(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="option2">
          <Form.Label>Нов Грешен Отговор 1</Form.Label>
          <Form.Control
            required
            type="text"
            value={option2.split("@")[0]}
            onChange={(e) => setOption2(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="option3">
          <Form.Label>Нов Грешен Отговор 2</Form.Label>
          <Form.Control
            required
            type="text"
            value={option3.split("@")[0]}
            onChange={(e) => setOption3(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="option4">
          <Form.Label>Нов Грешен Отговор 3</Form.Label>
          <Form.Control
            required
            type="text"
            value={option4.split("@")[0]}
            onChange={(e) => setOption4(e.target.value)}
          />
        </Form.Group>
        <Button className="edit-btn" type="submit" variant="primary">
          Редактирай
        </Button>
      </Form>
    </div>
  );
};
