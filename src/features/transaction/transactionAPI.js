import axios from '../../utils/axios';

export const getTransactions = async () => {
	const response = await axios.get('/transactions');
	return response.data;
};

export const addTransaction = async (payload) => {
	const response = await axios.post('/transactions', payload);
	return response.data;
};

export const editTransaction = async (id, payload) => {
	const response = await axios.patch(`/transactions/${id}`, payload);
	return response.data;
};

export const deleteTransaction = async (id) => {
	const response = await axios.delete(`/transactions/${id}`);
	return response.data;
};
