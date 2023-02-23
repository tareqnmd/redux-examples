import { colorSelected } from '../actions';

const updateColor = (todoId, color) => {
	return async (dispatch) => {
		const response = await fetch(`http://localhost:9000/todos/${todoId}`, {
			method: 'PATCH',
			body: JSON.stringify({ color }),
			headers: { 'Content-Type': 'application/json;charset=UTF-8' },
		});
		const todo = await response.json();
		dispatch(colorSelected(todo.id, todo.color));
	};
};
export default updateColor;
