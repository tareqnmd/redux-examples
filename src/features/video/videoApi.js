import axios from '../../utils/axios';

export const getVideo = async (id) => {
	const response = await axios.get(`/video/${id}`);
	return response.data;
};
