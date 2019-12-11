import React from 'react';
import './style.scss';
import { Button } from 'react-bootstrap';

export default function index() {
	return (
		<div className="container">
			<div className="buttons-wrapper">
				<Button variant="primary">Започни Тест</Button>
				<Button variant="secondary">Добави Въпрос</Button>
			</div>
		</div>
	);
}
