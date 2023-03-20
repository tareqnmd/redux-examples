import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import authReducer from '../features/auth/authSlice';
import conversationsReducer from '../features/conversations/conversationsSlice';
import messagesReducer from '../features/messages/messagesSlice';

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		auth: authReducer,
		messages: messagesReducer,
		conversations: conversationsReducer,
	},
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(apiSlice.middleware),
});
