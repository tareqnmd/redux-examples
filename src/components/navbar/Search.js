import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import search from '../../assets/images/search.svg';
import { searched } from '../../features/filter/filterSlice';

const Search = () => {
	const dispatch = useDispatch();
	const [input, setInput] = useState('');
	const formRef = useRef(null);
	const searchHandler = (e) => {
		e.preventDefault();
		dispatch(searched(input));
	};
	return (
		<>
			<form ref={formRef} onSubmit={searchHandler}>
				<input
					className="outline-none border-none mr-2"
					type="search"
					name="search"
					placeholder="Search"
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
			</form>
			<img
				onClick={() => {
					formRef.current.requestSubmit();
				}}
				className="inline h-4 cursor-pointer"
				src={search}
				alt=""
			/>
		</>
	);
};

export default Search;
