import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';

export default function index(props) {
	return (
		<div className="card">
			<span className="title">{props.text}</span>
			<InputGroup className="mb-3">
				<InputGroup.Prepend>
					<InputGroup.Checkbox aria-label="Checkbox for following text input" />
				</InputGroup.Prepend>
				<FormControl aria-label="Text input with checkbox" value="nasko" disabled="true" />
			</InputGroup>
			<InputGroup className="mb-3">
				<InputGroup.Prepend>
					<InputGroup.Checkbox aria-label="Checkbox for following text input" />
				</InputGroup.Prepend>
				<FormControl aria-label="Text input with checkbox" value="nasko" disabled="true" />
			</InputGroup>
			<InputGroup className="mb-3">
				<InputGroup.Prepend>
					<InputGroup.Checkbox aria-label="Checkbox for following text input" />
				</InputGroup.Prepend>
				<FormControl aria-label="Text input with checkbox" value="nasko" disabled="true" />
			</InputGroup>
			<InputGroup className="mb-3">
				<InputGroup.Prepend>
					<InputGroup.Checkbox aria-label="Checkbox for following text input" />
				</InputGroup.Prepend>
				<FormControl aria-label="Text input with checkbox" value="nasko" disabled="true" />
			</InputGroup>
		</div>
	);
}
