import React, { useState, useEffect } from 'react';
import './style.scss';
import { Button } from 'react-bootstrap';

import Modal from "../Modal";

export default (props) => {
	const [isModalShown, setIsModalShown] = useState(false);
	const [choice, setChoice] = useState("");

	const handleChosenOption = () => {
		setIsModalShown(true)
	}

	const handleChoice = (incomingChoice) => {
		setChoice(incomingChoice);
	}

	const handleClose = () => {
		setIsModalShown(false)
	}

	useEffect(() => {
		if (choice === "bpleven") {
			props.history.push("/questions")
		}
	}, [choice, props.history])

	return (
		<div className="container">
			<div className="buttons-wrapper">
				<Button onClick={
					handleChosenOption
				} variant="primary">
					Започни Тест
				</Button>
				<Button onClick={() => props.history.push('/addQuestion')} variant="secondary">
					Добави Въпрос
				</Button>
				<Button onClick={() => props.history.push('/editQuestionById')} variant="dark">
					Редактирай Въпрос с ID
				</Button>
			</div>
			<Modal show={isModalShown} handleClose={handleClose} handleChoice={handleChoice} />
		</div>
	);
}
