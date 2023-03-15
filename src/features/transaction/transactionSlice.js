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
	editTransaction: {},
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
	await deleteTransaction(id);
	return id;
});

const transactionsSlice = createSlice({
	name: 'transactions',
	initialState,
	reducers: {
		editActive: (state, action) => {
			state.editTransaction = action.payload;
		},
		editInActive: (state, action) => {
			state.editTransaction = {};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTransactions.pending, (state, action) => {
				state.isError = false;
				state.isLoading = true;
			})
			.addCase(fetchTransactions.fulfilled, (state, action) => {
				state.isError = false;
				state.isLoading = false;
				state.transactions = action.payload;
			})
			.addCase(fetchTransactions.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;
				state.transactions = [];
				state.error = action.error.message;
			})
			.addCase(createTransaction.pending, (state, action) => {
				state.isError = false;
				state.isLoading = true;
			})
			.addCase(createTransaction.fulfilled, (state, action) => {
				state.isError = false;
				state.isLoading = false;
				state.transactions.push(action.payload);
			})
			.addCase(createTransaction.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;
				state.error = action.error.message;
			})
			.addCase(changeTransaction.pending, (state, action) => {
				state.isError = false;
				state.isLoading = true;
			})
			.addCase(changeTransaction.fulfilled, (state, action) => {
				state.isError = false;
				state.isLoading = false;
				const indexToUpdate = state.transactions.findIndex((item) => item.id === action.payload.id);
				state.transactions[indexToUpdate] = action.payload;
			})
			.addCase(changeTransaction.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;
				state.error = action.error.message;
			})
			.addCase(removeTransaction.pending, (state, action) => {
				state.isError = false;
				state.isLoading = true;
			})
			.addCase(removeTransaction.fulfilled, (state, action) => {
				state.isError = false;
				state.isLoading = false;
				state.transactions = state.transactions.filter((item) => item.id !== action.payload);
				//action.arg.id
			})
			.addCase(removeTransaction.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;
				state.error = action.error.message;
			});
	},
});

export const { editActive, editInActive } = transactionsSlice.actions;
export default transactionsSlice.reducer;
