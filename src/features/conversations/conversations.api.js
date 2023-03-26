import { apiSlice } from '../api/apiSlice';
import { messagesApi } from '../messages/messages.api';

export const conversationsApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getConversations: builder.query({
			query: (email) => ({
				url: `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_CONVERSATIONS_PER_PAGE}`,
			}),
		}),
		getConversationParticipant: builder.query({
			query: ({ userEmail, participantEmail }) => ({
				url: `/conversations?participants_like=${userEmail}-${participantEmail}&&participants_like=${participantEmail}-${userEmail}`,
			}),
		}),
		getConversation: builder.query({
			query: (id) => ({
				url: `/conversations/${id}`,
			}),
		}),
		addConversation: builder.mutation({
			query: ({ data }) => ({
				url: '/conversations',
				method: 'POST',
				body: data,
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				const conversation = await queryFulfilled;
				if (conversation?.data?.id) {
					dispatch(
						messagesApi.endpoints.addMessage.initiate({
							conversationId: conversation.data.id,
							sender: arg.sender,
							receiver: arg.receiver,
							message: arg.data.message,
							timestamp: arg.data.timestamp,
						})
					);
				}
			},
		}),
		editConversation: builder.mutation({
			query: ({ id, data }) => ({
				url: `/conversations/${id}`,
				method: 'PATCH',
				body: data,
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				const conversation = await queryFulfilled;
				if (conversation?.data?.id) {
					dispatch(
						messagesApi.endpoints.addMessage.initiate({
							conversationId: conversation.data.id,
							sender: arg.sender,
							receiver: arg.receiver,
							message: arg.data.message,
							timestamp: arg.data.timestamp,
						})
					);
				}
			},
		}),
	}),
});

export const {
	useGetConversationsQuery,
	useGetConversationQuery,
	useGetConversationParticipantQuery,
	useAddConversationMutation,
	useEditConversationMutation,
} = conversationsApi;
