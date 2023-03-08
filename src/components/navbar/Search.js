import { useDispatch } from 'react-redux';
import { searched } from '../../features/filter/filterSlice';

const Search = () => {
	const dispatch = useDispatch();
	return (
		<form>
			<input
				className="outline-none border-none mr-2"
				type="search"
				name="search"
				placeholder="Search"
				onChange={(e) => dispatch(searched(e.target.value))}
			/>
		</form>
	);
};

export default Search;
