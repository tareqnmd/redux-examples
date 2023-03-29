import io from 'socket.io-client';
import { apiSlice } from '../api/apiSlice';
import { messagesApi } from '../messages/messages.api';

export const conversationsApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getConversations: builder.query({
			query: (email) => ({
				url: `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_CONVERSATIONS_PER_PAGE}`,
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
					socket.on('conversation', (data) => {
						updateCachedData((draft) => {
							const conversation = draft?.find((c) => String(c.id) === String(data?.data?.id));
							if (conversation?.id) {
								conversation.message = data.data.message;
								conversation.timestamp = data.data.timestamp;
							} else {
								draft.push(data.data);
							}
						});
					});
				} catch (error) {}
			},
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
				//optimistic
				const patchMessageResult = dispatch(
					apiSlice.util.updateQueryData('getConversations', arg.sender.email, (draft) => {
						draft.push(arg.data);
					})
				);
				try {
					const conversation = await queryFulfilled;
					if (conversation?.data?.id) {
						const messageAdd = await dispatch(
							messagesApi.endpoints.addMessage.initiate({
								conversationId: conversation.data.id,
								sender: arg.sender,
								receiver: arg.receiver,
								message: arg.data.message,
								timestamp: arg.data.timestamp,
							})
						).unwrap();
						//pessimistic
						dispatch(
							apiSlice.util.updateQueryData(
								'getMessages',
								messageAdd.conversationId.toString(),
								(draft) => {
									draft.push(messageAdd);
								}
							)
						);
					}
				} catch (error) {
					patchMessageResult.undo();
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
				//optimistic
				const patchConversationResult = dispatch(
					apiSlice.util.updateQueryData('getConversations', arg.sender.email, (draft) => {
						const editConversation = draft.find((c) => c.id === arg.id);
						editConversation.message = arg.data.message;
						editConversation.timestamp = arg.data.timestamp;
					})
				);
				try {
					const conversation = await queryFulfilled;
					if (conversation?.data?.id) {
						const messageAdd = await dispatch(
							messagesApi.endpoints.addMessage.initiate({
								conversationId: conversation.data.id,
								sender: arg.sender,
								receiver: arg.receiver,
								message: arg.data.message,
								timestamp: arg.data.timestamp,
							})
						).unwrap();
						//pessimistic
						dispatch(
							apiSlice.util.updateQueryData(
								'getMessages',
								messageAdd.conversationId.toString(),
								(draft) => {
									draft.push(messageAdd);
								}
							)
						);
					}
				} catch (error) {
					patchConversationResult.undo();
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
