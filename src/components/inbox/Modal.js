import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { conversationsApi } from '../../features/conversations/conversations.api';
import { useGetUserQuery } from '../../features/users/usersApi';
import validateEmail from '../../utils/validateEmail';
import Error from '../ui/Error';
export default function Modal({ open, control }) {
	const dispatch = useDispatch();
	const [values, setValues] = useState({});
	const [responseError, setResponseError] = useState('');
	const [conversation, setConversation] = useState(undefined);
	const [userCheck, setUserCheck] = useState(false);
	const { data: participant } = useGetUserQuery(values?.to, { skip: !userCheck });
	const { user } = useSelector((state) => state.auth) || {};
	const debounceHandler = (fn, delay) => {
		let timeoutId;
		return (...args) => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				fn(...args);
			}, delay);
		};
	};
	const doSearch = (e) => {
		const { name, value } = e.target;
		if (validateEmail(value)) {
			setUserCheck(true);
			setValues((prev) => ({ ...prev, [name]: value }));
		}
	};
	const emailHandler = debounceHandler(doSearch, 500);
	const stateChange = (e) => {
		const { name, value } = e.target;
		setValues((prev) => ({ ...prev, [name]: value }));
	};
	const submitHandler = (e) => {
		e.preventDefault();
		console.log('values', values);
	};

	useEffect(() => {
		if (participant?.length === 1 && participant[0]?.email !== user?.email) {
			dispatch(
				conversationsApi.endpoints.getConversationParticipant.initiate({
					userEmail: user.email,
					participantEmail: values.to,
				})
			)
				.unwrap()
				.then((data) => setConversation(data))
				.catch((err) => setResponseError(err?.message));
		}
	}, [participant, dispatch, user?.email, values?.to]);
	return (
		open && (
			<>
				<div
					onClick={control}
					className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
				></div>
				<div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Send message</h2>
					<form
						className="mt-8 space-y-6"
						action="#"
						method="POST"
						onSubmit={submitHandler}
					>
						<div className="rounded-md shadow-sm -space-y-px">
							<div>
								<label
									htmlFor="to"
									className="sr-only"
								>
									To
								</label>
								<input
									name="to"
									type="email"
									required
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
									onChange={emailHandler}
									placeholder="Send to"
								/>
							</div>
							<div>
								<label
									htmlFor="message"
									className="sr-only"
								>
									Message
								</label>
								<textarea
									name="message"
									type="textarea"
									required
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
									placeholder="Message"
									onChange={stateChange}
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
								disabled={
									conversation === undefined ||
									participant[0]?.email === user?.email ||
									participant?.length !== 1
								}
							>
								Send Message
							</button>
						</div>

						{participant?.length === 0 && <Error message="This user doses not exist" />}
						{participant?.length > 0 && participant[0]?.email === user?.email && (
							<Error message="Same User" />
						)}
						{responseError && <Error message={responseError} />}
					</form>
				</div>
			</>
		)
	);
}
