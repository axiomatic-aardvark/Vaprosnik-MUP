import React, { useState } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';

export default props => {
	const [selectedOption, setSelectedOption] = useState('');

	const option1 = props.option1.split(',')[0];
	const option2 = props.option2.split(',')[0];
	const option3 = props.option3.split(',')[0];
	const option4 = props.option4.split(',')[0];

	const onToggle = newValue => {
		if (selectedOption !== newValue) {
			setSelectedOption(newValue);
		}
	};

	console.log(selectedOption);

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
