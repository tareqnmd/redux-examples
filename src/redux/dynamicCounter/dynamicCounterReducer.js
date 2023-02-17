import { D_DECREMENT, D_INCREMENT } from './actionTypes';

const initialState = { value: 20 };

const dynamicCounterReducer = (state = initialState, action) => {
	switch (action.type) {
		case D_INCREMENT:
			return {
				...state,
				value: state.value + action.payload,
			};
		case D_DECREMENT:
			return {
				...state,
				value: state.value - action.payload,
			};
		default:
			return state;
	}
};

export default dynamicCounterReducer;
