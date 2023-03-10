import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	addTransaction,
	deleteTransaction,
	editTransaction,
	getTransactions,
} from './transactionAPI';

const initialState = {
	transactions: [],
	isLoading: false,
	isError: false,
	error: '',
};

export const fetchTransactions = createAsyncThunk('transactions/fetchTransactions', async () => {
	const transactions = await getTransactions();
	return transactions;
});

export const createTransaction = createAsyncThunk(
	'transactions/createTransaction',
	async (data) => {
		const transaction = await addTransaction(data);
		return transaction;
	}
);

export const changeTransaction = createAsyncThunk(
	'transactions/changeTransaction',
	async ({ id, data }) => {
		const transaction = await editTransaction(id, data);
		return transaction;
	}
);
export const removeTransaction = createAsyncThunk('transactions/removeTransaction', async (id) => {
	const transaction = await deleteTransaction(id);
	return transaction;
});

const transactionsSlice = createSlice({
	name: 'transactions',
	initialState,
	reducers: () => {},
	extraReducers: (builder) => {
		builder.addCase(fetchTransactions.pending, (state, action) => {
			state.isError = false;
			state.isLoading = true;
		});
	},
});

export default transactionsSlice.reducer;
