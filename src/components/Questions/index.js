import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import QuestionCard from './QuestionCard';
import './style.scss';

export default props => {
	const [questions, setQuestions] = useState('');
	const [isSubmitted, setIsSubmitted] = useState(false);
	// const [isModalOpen, setIsModalOpen] = useState(false);

	const getResults = e => {
		e.preventDefault();
		setIsSubmitted(true);
	};

	// const onFinalSubmit = () => {
	// 	setIsSubmitted(true);
	// };

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

	const getLimitedQuestions = () => {
		const baseQuestions = questions;
		const scrambledQuestions = shuffle(baseQuestions);
		return scrambledQuestions.slice(0, 20);
	};

	function shuffle(array) {
		var currentIndex = array.length,
			temporaryValue,
			randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}

	const genScrambledArr = (option1, option2, option3, option4) => {
		const baseArr = [option1, option2, option3, option4];

		return shuffle(baseArr);
	};

	return (
		<div className="questions-wrapper">
			{/* {isModalOpen && !isSubmitted ? (
				<div className="confirmation">
					<span>Сигурни ли сте, че искате да приключите теста?</span>
					<div className="buttons-wrapper">
						<Button
							className="submit-btn"
							onClick={() => {
								onFinalSubmit();
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
			) : null} */}
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
					getLimitedQuestions().map((q, i) => {
						let scrambledArr = genScrambledArr(q.option1, q.option2, q.option3, q.option4);

						return (
							<QuestionCard
								text={q.text}
								option1={scrambledArr[0]}
								option2={scrambledArr[1]}
								option3={scrambledArr[2]}
								option4={scrambledArr[3]}
								isSubmitted={isSubmitted}
								key={i}
								className="question-card"
							/>
						);
					})
				) : (
					<span>Моля изчакайте...</span>
				)}
				{questions ? (
					<Button
						className="submit-btn"
						onClick={e => {
							isSubmitted ? props.history.push('/') : getResults(e);
						}}
						variant={isSubmitted ? 'success' : 'primary'}
					>
						{isSubmitted ? 'Готово' : 'Край'}
					</Button>
				) : null}
			</ul>
		</div>
	);
};
