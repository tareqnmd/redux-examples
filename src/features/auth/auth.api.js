import { apiSlice } from '../api/apiSlice';
import { userLoggedIn } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		register: builder.mutation({
			query: (data) => ({
				url: '/register',
				method: 'POST',
				body: data,
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const result = await queryFulfilled;
					const data = {
						accessToken: result.data.accessToken,
						user: result.data.user,
					};
					localStorage.setItem('auth', JSON.stringify(data));
					dispatch(userLoggedIn(data));
				} catch (error) {}
			},
		}),
		login: builder.mutation({
			query: (data) => ({
				url: '/login',
				method: 'POST',
				body: data,
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const result = await queryFulfilled;
					const data = {
						accessToken: result.data.accessToken,
						user: result.data.user,
					};
					localStorage.setItem('auth', JSON.stringify(data));
					dispatch(userLoggedIn(data));
				} catch (error) {}
			},
		}),
	}),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
