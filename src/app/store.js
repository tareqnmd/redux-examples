import { configureStore } from '@reduxjs/toolkit';
import tagsReducer from '../features/tags/tagsSlice';
import videoReducer from '../features/videos/videoSlice';
import videosReducer from '../features/videos/videosSlice';

export const store = configureStore({
	reducer: {
		videos: videosReducer,
		video: videoReducer,
		tags: tagsReducer,
	},
});
