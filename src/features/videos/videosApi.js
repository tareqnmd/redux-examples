import axios from '../../utils/axios';

export const getVideos = async (tags, search) => {
	const queryString =
		`${tags?.length > 0 ? tags.map((tag) => `tags_like=${tag}`).join('&') : ''}` +
		`${search?.length > 0 ? `&q=${search}` : ''}`;
	const response = await axios.get(`/videos${queryString.length > 0 ? `?${queryString}` : ''}`);
	return response.data;
};
