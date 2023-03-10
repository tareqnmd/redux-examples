import axios from '../../utils/axios';

export const getTransactions = async () => {
	const response = await axios.get('/transactions');
	return response.data;
};

export const addTransactions = async (payload) => {
	const response = await axios.post('/transactions', payload);
	return response.data;
};

export const editTransactions = async (id, payload) => {
	const response = await axios.patch(`/transactions/${id}`, payload);
	return response.data;
};

export const deleteTransactions = async (id) => {
	const response = await axios.delete(`/transactions/${id}`);
	return response.data;
};
