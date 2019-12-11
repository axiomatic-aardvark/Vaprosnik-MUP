import React from 'react';
import './style.scss';

export default function index(props) {
	return (
		<div>
			<span
				className="back"
				onClick={() => {
					props.history.push('/');
				}}
			>
				Назад
			</span>
			<span>Моля опитайте по-късно...</span>
		</div>
	);
}
