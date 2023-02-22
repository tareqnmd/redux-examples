import { useSelector } from 'react-redux';
import ToDo from './ToDo';

const ToDoLists = () => {
	const todos = useSelector((state) => state.todos);
	return (
		<div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
			{todos.map((todo) => (
				<ToDo key={todo.id} todo={todo} />
			))}
		</div>
	);
};

export default ToDoLists;
