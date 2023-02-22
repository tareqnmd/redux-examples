import { COLOR_CHANGED, STATUS_CHANGED } from './actionTypes';

export const added = (status) => {
	return {
		type: STATUS_CHANGED,
		payload: status,
	};
};

export const toggled = (color, changeType) => {
	return {
		type: COLOR_CHANGED,
		payload: { color, changeType },
	};
};
