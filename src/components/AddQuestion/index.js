import React, { useState } from 'react';
import axios from 'axios';
import './style.scss';
import { Form, Button } from 'react-bootstrap';

export default props => {
	const [option1, setOption1] = useState('');
	const [option2, setOption2] = useState('');
	const [option3, setOption3] = useState('');
	const [option4, setOption4] = useState('');
	const [text, setText] = useState('');

	const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

	const pushQuestionToDB = () => {
		axios
			.post(proxyUrl + 'https://us-central1-atomic-swap.cloudfunctions.net/postBalance', {
				option1: option1,
				option2: option2,
				option3: option3,
				option4: option4,
				text: text,
			})
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
					props.history.push('/');
				}}
			>
				Назад
			</span>
			<Form>
				<Form.Group controlId="formGroupEmail">
					<Form.Label>Въпрос</Form.Label>
					<Form.Control type="text" onChange={e => setText(e.target.value)}/>
				</Form.Group>
				<Form.Group controlId="formGroupPassword">
					<Form.Label>Верен Отговор</Form.Label>
					<Form.Control type="text" onChange={e => setOption1(e.target.value)}/>
				</Form.Group>
				<Form.Group controlId="formGroupPassword">
					<Form.Label>Грешен Отговор 1</Form.Label>
					<Form.Control type="text" onChange={e => setOption2(e.target.value)}/>
				</Form.Group>
				<Form.Group controlId="formGroupPassword">
					<Form.Label>Грешен Отговор 2</Form.Label>
					<Form.Control type="text" onChange={e => setOption3(e.target.value)}/>
				</Form.Group>
				<Form.Group controlId="formGroupPassword">
					<Form.Label>Грешен Отговор 3</Form.Label>
					<Form.Control type="text" onChange={e => setOption4(e.target.value)}/>
				</Form.Group>
				<Button
					onClick={() => {
						pushQuestionToDB();
					}}
					variant="primary"
				>
					Изпрати
				</Button>
			</Form>
		</div>
	);
};
