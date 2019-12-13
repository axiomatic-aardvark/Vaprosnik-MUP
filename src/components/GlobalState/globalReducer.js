import { UPDATE_QUESTIONS } from './types';

export default (state, action) => {
	switch (action.type) {
		case UPDATE_QUESTIONS:
			return {
				...state,
				questions: action.payload,
			};

		default: {
			return '';
		}
	}
};
