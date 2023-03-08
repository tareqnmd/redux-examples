import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMatch, useNavigate } from 'react-router-dom';
import search from '../../assets/images/search.svg';
import { searched } from '../../features/filter/filterSlice';

const Search = () => {
	const dispatch = useDispatch();
	const [input, setInput] = useState('');
	const formRef = useRef(null);
	const match = useMatch('/');
	const navigate = useNavigate();
	const searchHandler = (e) => {
		e.preventDefault();
		dispatch(searched(input));
		!match && navigate('/');
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
