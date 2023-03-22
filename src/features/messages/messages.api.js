import { apiSlice } from '../api/apiSlice';

export const messagesApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getMessages: builder.query({
			query: (id) => ({
				url: `/messages?conversationId=${id}&_sort=timestamp&_order=asc&_page=1&_limit=${process.env.REACT_APP_MESSAGES_PER_PAGE}`,
			}),
		}),
	}),
});

export const { useGetMessagesQuery } = messagesApi;
