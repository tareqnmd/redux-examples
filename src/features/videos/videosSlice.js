import { getVideos } from './videosApi';
const { createAsyncThunk, createSlice } = require('@reduxjs/toolkit');

const initialState = {
	videos: [],
	isLoading: true,
	isError: false,
	error: '',
};

export const fetchVideos = createAsyncThunk('videos/fetchVideos', async ({ tags, search }) => {
	const videos = await getVideos(tags, search);
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
				state.isError = true;
				state.error = action.error?.message;
			});
	},
});

export default videosSlice.reducer;
