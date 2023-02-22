import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import doubleTick from '../assets/images/double-tick.png';
import notes from '../assets/images/notes.png';
import plus from '../assets/images/plus.png';
import { added, allCompleted, clearCompleted } from '../redux/todos/actions';

const Header = () => {
	const dispatch = useDispatch();
	const ref = useRef();
	const clearCompletedHandler = () => {
		dispatch(clearCompleted());
	};
	const allCompletedHandler = () => {
		dispatch(allCompleted());
	};
	const addTodoHandler = (e) => {
		e.preventDefault();
		dispatch(added(ref.current.value));
		e.target.reset();
	};
	return (
		<div>
			<form
				className="flex items-center bg-gray-100 px-4 py-4 rounded-md"
				onSubmit={addTodoHandler}
			>
				<img src={notes} className="w-6 h-6" alt="Add todo" />
				<input
					ref={ref}
					type="text"
					placeholder="Type your todo"
					required
					className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
				/>
				<button
					type="submit"
					className={`appearance-none w-8 h-8 bg-[url(${plus})] bg-no-repeat bg-contain`}
				></button>
			</form>

			<ul className="flex justify-between my-4 text-xs text-gray-500">
				<li className="flex space-x-1 cursor-pointer" onClick={allCompletedHandler}>
					<img className="w-4 h-4" src={doubleTick} alt="Complete" />
					<span>Complete All Tasks</span>
				</li>
				<li className="cursor-pointer" onClick={clearCompletedHandler}>
					Clear completed
				</li>
			</ul>
		</div>
	);
};

export default Header;
