import React, { useState } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';

export default props => {
	const [selectedOption, setSelectedOption] = useState('');

	let option1 = props.option1.split(',')[0];
	let option2 = props.option2.split(',')[0];
	let option3 = props.option3.split(',')[0];
	let option4 = props.option4.split(',')[0];

	const baseArr = [option1, option2, option3, option4];
	
	const scrambledArr = shuffle(baseArr);

	option1 = scrambledArr[0];
	option2 = scrambledArr[1];
	option3 = scrambledArr[2];
	option4 = scrambledArr[3];

	const onToggle = (newValue) => {
		if (selectedOption !== newValue) {
			setSelectedOption(newValue);
		}
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

	return (
		<div className="card">
			<span className="title">{props.text}</span>
			<InputGroup className="mb-3">
				<InputGroup.Prepend>
					<InputGroup.Checkbox
						onChange={() => {
							onToggle(option1);
						}}
						aria-label="Checkbox for following text input"
					/>
				</InputGroup.Prepend>
				<FormControl aria-label="Text input with checkbox" value={`А)  ${option1}`} disabled={true} />
			</InputGroup>
			<InputGroup className="mb-3">
				<InputGroup.Prepend>
					<InputGroup.Checkbox
						onChange={() => {
							onToggle(option2);
						}}
						aria-label="Checkbox for following text input"
					/>
				</InputGroup.Prepend>
				<FormControl aria-label="Text input with checkbox" value={`Б)  ${option2}`} disabled={true} />
			</InputGroup>
			<InputGroup className="mb-3">
				<InputGroup.Prepend>
					<InputGroup.Checkbox
						onChange={() => {
							onToggle(option3);
						}}
						aria-label="Checkbox for following text input"
					/>
				</InputGroup.Prepend>
				<FormControl aria-label="Text input with checkbox" value={`В)  ${option3}`} disabled={true} />
			</InputGroup>
			<InputGroup className="mb-3">
				<InputGroup.Prepend>
					<InputGroup.Checkbox
						onChange={() => {
							onToggle(option4);
						}}
						aria-label="Checkbox for following text input"
					/>
				</InputGroup.Prepend>
				<FormControl aria-label="Text input with checkbox" value={`Г)  ${option4}`} disabled={true} />
			</InputGroup>
		</div>
	);
};
