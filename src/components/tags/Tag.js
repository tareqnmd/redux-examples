const Tag = ({ tag }) => {
	return (
		<div
			className={`${
				true ? 'bg-blue-100 text-blue-600' : 'bg-blue-600 text-white'
			} px-4 py-1 rounded-full cursor-pointer`}
		>
			{tag?.title}
		</div>
	);
};

export default Tag;
