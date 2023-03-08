import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searched } from '../../features/filter/filterSlice';

const Search = () => {
	const dispatch = useDispatch();
	const [input, setInput] = useState('');

	const searchHandler = (e) => {
		e.preventDefault();
		dispatch(searched(input));
	};
	return (
		<form onSubmit={searchHandler}>
			<input
				className="outline-none border-none mr-2"
				type="search"
				name="search"
				placeholder="Search"
				value={input}
				onChange={(e) => setInput(e.target.value)}
			/>
		</form>
	);
};

export default Search;
