import { getTags } from './tagsApi';
const { createAsyncThunk, createSlice } = require('@reduxjs/toolkit');

const initialState = {
	tags: [],
	isLoading: false,
	isError: false,
	error: '',
};

export const fetchTags = createAsyncThunk('tags/fetchTags', async () => {
	const tags = await getTags();
	return tags;
});

const tagsSlice = createSlice({
	name: 'tags',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchTags.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(fetchTags.fulfilled, (state, action) => {
				state.isLoading = false;
				state.tags = action.payload;
			})
			.addCase(fetchTags.rejected, (state, action) => {
				state.tags = [];
				state.isLoading = false;
				state.isError = true;
				state.error = action.error?.message;
			});
	},
});

export default tagsSlice.reducer;
