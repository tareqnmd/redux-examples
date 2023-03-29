import io from 'socket.io-client';
import { apiSlice } from '../api/apiSlice';

export const messagesApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getMessages: builder.query({
			query: (id) => ({
				url: `/messages?conversationId=${id}&_sort=timestamp&_order=asc&_page=1&_limit=${process.env.REACT_APP_MESSAGES_PER_PAGE}`,
			}),
			async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
				const socket = io('http://localhost:9000', {
					reconnectionDelay: 1000,
					reconnection: true,
					reconnectionAttempts: 10,
					transports: ['websocket'],
					agent: false,
					upgrade: false,
					rejectUnauthorized: false,
				});
				try {
					await cacheDataLoaded;
					socket.on('message', (data) => {
						updateCachedData((draft) => {
							draft.push(data.data);
						});
					});
				} catch (error) {}
			},
		}),
		addMessage: builder.mutation({
			query: (data) => ({
				url: '/messages',
				method: 'POST',
				body: data,
			}),
		}),
	}),
});

export const { useGetMessagesQuery, useAddMessageMutation } = messagesApi;
