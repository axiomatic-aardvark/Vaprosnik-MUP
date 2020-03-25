import React from 'react';
import './style.scss';
import { Button } from 'react-bootstrap';

export default function index(props) {
	return (
		<div className="container">
			<div className="buttons-wrapper">
				<Button onClick={() => props.history.push('/questions')} variant="primary">
					Започни Тест
				</Button>
				<Button onClick={() => props.history.push('/addQuestion')} variant="secondary">
					Добави Въпрос
				</Button>
				<Button onClick={() => props.history.push('/editQuestionById')} variant="dark">
					Редактирай Въпрос с ID
				</Button>
			</div>
		</div>
	);
}
