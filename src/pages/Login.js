import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../assets/images/lws-logo-light.svg';
import Error from '../components/ui/Error';
import { useLoginMutation } from '../features/auth/auth.api';

export default function Login() {
	const [values, setValues] = useState({});
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const [login, { data, isLoading, isError, error: loginError }] = useLoginMutation();
	const stateChange = (e) => {
		const { name, value } = e.target;
		setValues((prev) => ({ ...prev, [name]: value ?? '' }));
	};
	const submitHandler = (e) => {
		setError('');
		e.preventDefault();
		login(values);
	};
	useEffect(() => {
		if (isError && loginError?.data) {
			setError(loginError?.data);
		} else if (data?.accessToken && data?.user) {
			navigate('/inbox');
		}
	}, [navigate, data, isError, loginError]);
	return (
		<div className="grid place-items-center h-screen bg-[#F9FAFB">
			<div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full space-y-8">
					<div>
						<Link to="/">
							<img
								className="mx-auto h-12 w-auto"
								src={logoImage}
								alt="Learn with sumit"
							/>
						</Link>
						<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
							Sign in to your account
						</h2>
					</div>
					<form
						className="mt-8 space-y-6"
						action="#"
						method="POST"
						onSubmit={submitHandler}
					>
						<div className="rounded-md shadow-sm -space-y-px">
							<div>
								<label
									htmlFor="email-address"
									className="sr-only"
								>
									Email address
								</label>
								<input
									name="email"
									type="email"
									value={values?.email ?? ''}
									onChange={stateChange}
									autoComplete="email"
									required
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
									placeholder="Email address"
								/>
							</div>
							<div>
								<label
									htmlFor="password"
									className="sr-only"
								>
									Password
								</label>
								<input
									name="password"
									type="password"
									onChange={stateChange}
									value={values.password ?? ''}
									autoComplete="current-password"
									required
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
									placeholder="Password"
								/>
							</div>
						</div>

						<div className="flex items-center justify-end">
							<div className="text-sm">
								<Link
									to="/register"
									className="font-medium text-violet-600 hover:text-violet-500"
								>
									Register
								</Link>
							</div>
						</div>

						<div>
							<button
								type="submit"
								disabled={isLoading}
								className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
							>
								Sign in
							</button>
						</div>
						{error !== '' && <Error message={error} />}
					</form>
				</div>
			</div>
		</div>
	);
}
