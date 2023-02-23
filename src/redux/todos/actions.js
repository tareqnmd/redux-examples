import {
	ADDED,
	ALL_COMPLETED,
	CLEAR_COMPLETED,
	COLOR_SELECTED,
	DELETED,
	LOADED,
	TOGGLED,
} from './actionTypes';

export const loaded = (todos) => {
	return {
		type: LOADED,
		payload: todos,
	};
};

export const added = (todoText) => {
	return {
		type: ADDED,
		payload: todoText,
	};
};

export const toggled = (todoId) => {
	return {
		type: TOGGLED,
		payload: todoId,
	};
};

export const colorSelected = (todoId, color) => {
	return {
		type: COLOR_SELECTED,
		payload: { todoId, color },
	};
};

export const deleted = (todoId) => {
	return {
		type: DELETED,
		payload: todoId,
	};
};

export const allCompleted = () => {
	return {
		type: ALL_COMPLETED,
	};
};

export const clearCompleted = () => {
	return {
		type: CLEAR_COMPLETED,
	};
};
