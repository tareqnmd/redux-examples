import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '../features/filter/filterSlice';
import relatedVideosReducer from '../features/relatedVideos/relatedVideosSlice';
import tagsReducer from '../features/tags/tagsSlice';
import videoReducer from '../features/video/videoSlice';
import videosReducer from '../features/videos/videosSlice';

export const store = configureStore({
	reducer: {
		videos: videosReducer,
		relatedVideos: relatedVideosReducer,
		video: videoReducer,
		tags: tagsReducer,
		filter: filterReducer,
	},
});
