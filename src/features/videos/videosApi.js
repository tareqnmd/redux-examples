import axios from '../../utils/axios';

export const getVideos = async (tags, search) => {
	let queryString = '?';
	queryString += tags?.length > 0 ? tags.map((tag) => `tags_like=${tag}`).join('&') : '';
	queryString += search?.length > 0 ? `&q=${search}` : '';
	const response = await axios.get(`/videos${queryString}`);
	return response.data;
};
