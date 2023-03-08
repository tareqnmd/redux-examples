import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tagRemoved, tagSelected } from '../../features/filter/filterSlice';

const Tag = ({ tag }) => {
	const { title } = tag;
	const { tags } = useSelector((state) => state.filter);
	const dispatch = useDispatch();

	const isSelected = useMemo(() => tags.includes(title), [title, tags]);

	const tagToggle = () => {
		dispatch(isSelected ? tagRemoved(title) : tagSelected(title));
	};
	return (
		<div
			onClick={tagToggle}
			className={`${
				isSelected ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'
			} px-4 py-1 rounded-full cursor-pointer`}
		>
			{title}
		</div>
	);
};

export default Tag;
