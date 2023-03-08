import { getVideos } from './videosApi';
const { createAsyncThunk, createSlice } = require('@reduxjs/toolkit');

const initialState = {
	videos: [],
	isLoading: false,
	isError: false,
	error: '',
};

export const fetchVideos = createAsyncThunk('videos/fetchVideos', async () => {
	const videos = await getVideos();
	return videos;
});

const videosSlice = createSlice({
	name: 'videos',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchVideos.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(fetchVideos.fulfilled, (state, action) => {
				state.isLoading = false;
				state.videos = action.payload;
			})
			.addCase(fetchVideos.rejected, (state, action) => {
				state.videos = [];
				state.isLoading = false;
				state.isError = false;
				state.error = action.error?.message;
			});
	},
});

export default videosSlice.reducer;
