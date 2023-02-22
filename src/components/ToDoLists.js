import { useSelector } from 'react-redux';
import ToDo from './ToDo';

const filterByStatus = (todo, status) => {
	switch (status) {
		case 'Complete':
			return todo.completed;
		case 'Incomplete':
			return !todo.completed;
		default:
			return true;
	}
};
const filterByColor = (todo, colors) => {
	if (colors.length > 0) {
		return colors.includes(todo?.color);
	}
	return true;
};

const ToDoLists = () => {
	const todos = useSelector((state) => state.todos);
	const filters = useSelector((state) => state.filters);
	const { status, colors } = filters;
	return (
		<div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
			{todos
				.filter((todo) => filterByStatus(todo, status))
				.filter((todo) => filterByColor(todo, colors))
				.map((todo) => (
					<ToDo key={todo.id} todo={todo} />
				))}
		</div>
	);
};

export default ToDoLists;
