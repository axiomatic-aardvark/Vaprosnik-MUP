import React, { useState, Fragment } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';

export default props => {
	const [selectedOption, setSelectedOption] = useState('');

	const onToggle = newValue => {
		if (selectedOption !== newValue) {
			setSelectedOption(newValue);
		}
	};

	const quote = '"';

	const getRightAnswer = () => {
		if (props.option1.split(',')[1] === 't') {
			return props.option1.split(',')[0];
		} else if (props.option2.split(',')[1] === 't') {
			return props.option2.split(',')[0];
		} else if (props.option3.split(',')[1] === 't') {
			return props.option3.split(',')[0];
		} else if (props.option4.split(',')[1] === 't') {
			return props.option4.split(',')[0];
		}
	};

	return (
		<div className="card">
			<span className="title">{props.text}</span>
			{!props.isSubmitted ? (
				<Fragment>
					<InputGroup className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Checkbox
								onChange={() => {
									onToggle(props.option1);
								}}
								aria-label="Checkbox for following text input"
							/>
						</InputGroup.Prepend>
						<FormControl
							aria-label="Text input with checkbox"
							value={`А)  ${props.option1.split(',')[0]}`}
							disabled={true}
						/>
					</InputGroup>
					<InputGroup className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Checkbox
								onChange={() => {
									onToggle(props.option2);
								}}
								aria-label="Checkbox for following text input"
							/>
						</InputGroup.Prepend>
						<FormControl
							aria-label="Text input with checkbox"
							value={`Б)  ${props.option2.split(',')[0]}`}
							disabled={true}
						/>
					</InputGroup>
					<InputGroup className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Checkbox
								onChange={() => {
									onToggle(props.option3);
								}}
								aria-label="Checkbox for following text input"
							/>
						</InputGroup.Prepend>
						<FormControl
							aria-label="Text input with checkbox"
							value={`В)  ${props.option3.split(',')[0]}`}
							disabled={true}
						/>
					</InputGroup>
					<InputGroup className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Checkbox
								onChange={() => {
									onToggle(props.option4);
								}}
								aria-label="Checkbox for following text input"
							/>
						</InputGroup.Prepend>
						<FormControl
							aria-label="Text input with checkbox"
							value={`Г)  ${props.option4.split(',')[0]}`}
							disabled={true}
						/>
					</InputGroup>
				</Fragment>
			) : selectedOption.split(',')[1] === 't' ? (
				<Fragment>
					<span className="res-msg green">Верен отговор!</span>
					<span className="green">{`Ти отговори: "${selectedOption.split(',')[0]}"`}</span>
				</Fragment>
			) : (
				<Fragment>
					<span className="res-msg red">Грешен отговор!</span>
					<span className="red">{`Ти отговори: ${
						selectedOption ? quote + selectedOption.split(',')[0] + quote : '"Не давам отговор"'
					}, а верният отг. е: "${getRightAnswer()}"`}</span>
				</Fragment>
			)}
		</div>
	);
};
