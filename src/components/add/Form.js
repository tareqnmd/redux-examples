// import Success from "../ui/Success";
import { useState } from 'react';
import { useAddVideoMutation } from '../../features/api/apiSlice';
import Error from '../ui/Error';
import Success from '../ui/Success';
import TextArea from '../ui/TextArea';
import TextInput from '../ui/TextInput';

export default function Form() {
	const [addVideo, { isLoading, isSuccess, isError }] = useAddVideoMutation();
	const [values, setValues] = useState({});
	const stateChange = (e) => {
		const { name, value } = e.target;
		setValues((prev) => ({ ...prev, [name]: value ?? '' }));
	};
	const reset = () => {
		setValues({});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		addVideo(values);
		reset();
	};
	return (
		<form
			action="#"
			method="POST"
			onSubmit={handleSubmit}
		>
			<div className="shadow overflow-hidden sm:rounded-md">
				<div className="px-4 py-5 bg-white sm:p-6">
					<div className="grid grid-cols-6 gap-6">
						<div className="col-span-6 sm:col-span-3">
							<TextInput
								value={values?.title ?? ''}
								name="title"
								title="Video Title"
								onChange={stateChange}
							/>
						</div>

						<div className="col-span-6 sm:col-span-3">
							<TextInput
								value={values?.author ?? ''}
								name="author"
								title="Author"
								onChange={stateChange}
							/>
						</div>

						<div className="col-span-6">
							<TextArea
								value={values?.description ?? ''}
								name="description"
								title="Description"
								onChange={stateChange}
							/>
						</div>

						<div className="col-span-6">
							<TextInput
								value={values?.link ?? ''}
								name="link"
								title="YouTube Video link"
								onChange={stateChange}
							/>
						</div>

						<div className="col-span-6">
							<TextInput
								title="Thumbnail link"
								value={values?.thumbnail ?? ''}
								name="thumbnail"
								onChange={stateChange}
							/>
						</div>

						<div className="col-span-6 sm:col-span-6 lg:col-span-2">
							<TextInput
								title="Upload Date"
								value={values?.date ?? ''}
								name="date"
								onChange={stateChange}
							/>
						</div>

						<div className="col-span-6 sm:col-span-3 lg:col-span-2">
							<TextInput
								title="Video Duration"
								value={values?.duration ?? ''}
								name="duration"
								onChange={stateChange}
							/>
						</div>

						<div className="col-span-6 sm:col-span-3 lg:col-span-2">
							<TextInput
								value={values?.views ?? ''}
								name="views"
								title="Video no of views"
								onChange={stateChange}
							/>
						</div>
					</div>
				</div>
				<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
					<button
						disabled={isLoading}
						type="submit"
						className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
					>
						Save
					</button>
				</div>

				{isSuccess && <Success message="Video was added successfully" />}
				{isError && <Error />}
			</div>
		</form>
	);
}
