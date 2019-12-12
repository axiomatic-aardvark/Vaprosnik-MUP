import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import QuestionCard from './QuestionCard';
import './style.scss';

export default props => {
	const [questions, setQuestions] = useState('');
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const onModalOpen = () => {
		setIsModalOpen(true);
	};

	const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
	const getQuestions = () => {
		axios
			.get(proxyUrl + 'https://us-central1-vaprosnik-mup.cloudfunctions.net/getQuestions')
			.then(response => {
				setQuestions(response.data);
			})
			.catch(function(error) {
				if (error.response) {
					console.log(error.response.headers);
				} else if (error.request) {
					console.log(error.request);
				} else {
					console.log(error.message);
				}
				console.log(error.config);
			});
	};

	useEffect(() => {
		getQuestions();
	}, []);

	console.log(questions);

	return (
		<div className="questions-wrapper">
			{isModalOpen && !isSubmitted ? (
				<div className="confirmation">
					<span>Сигурни ли сте, че искате да приключите теста?</span>
					<div className="buttons-wrapper">
						<Button
							className="submit-btn"
							onClick={() => {
								setIsSubmitted(true);
							}}
							variant="success"
						>
							Да
						</Button>
						<Button
							className="submit-btn"
							onClick={() => {
								setIsModalOpen(false);
							}}
							variant="danger"
						>
							Не
						</Button>
					</div>
				</div>
			) : null}
			<span
				className="back"
				onClick={() => {
					props.history.push('/');
				}}
			>
				Назад
			</span>
			<ul className="questions">
				{questions ? (
					questions.map((q, i) => {
						return <QuestionCard text={q.text} key={i} className="question-card" />;
					})
				) : (
					<span>Моля изчакайте...</span>
				)}
				{questions ? (
					<Button
						className="submit-btn"
						onClick={() => {
							!isSubmitted ? onModalOpen() : props.history.push('/');
						}}
						variant={isSubmitted ? 'success' : 'primary'}
					>
						{!isSubmitted ? 'Край' : 'Готово'}
					</Button>
				) : null}
			</ul>
		</div>
	);
};
