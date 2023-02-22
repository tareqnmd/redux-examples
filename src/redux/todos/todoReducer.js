import {
	ADDED,
	ALL_COMPLETED,
	CLEAR_COMPLETED,
	COLOR_SELECTED,
	DELETED,
	TOGGLED,
} from './actionTypes';
import initialState from './initialState';

const nextTodoId = (todos) => {
	const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), 0);
	return maxId + 1;
};

const todoReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case ADDED:
			const newTodo = { id: nextTodoId(state), ...payload };
			return [...state, newTodo];
		case TOGGLED:
			return state.map((todo) => {
				if (todo.id === payload) {
					return { ...todo, completed: !todo.completed };
				}
				return todo;
			});
		case COLOR_SELECTED:
			const { todoId, color } = payload;
			return state.map((todo) => {
				if (todo.id === todoId) {
					return { ...todo, color };
				}
				return todo;
			});
		case DELETED:
			return state.filter((todo) => todo.id !== payload);
		case ALL_COMPLETED:
			return state.map((todo) => ({
				...todo,
				complete: true,
			}));
		case CLEAR_COMPLETED:
			return state.filter((todo) => !todo.completed);
		default:
			return state;
	}
};
export default todoReducer;
