import { useEffect, useState } from 'react';
import { useEditVideoMutation } from '../../features/api/apiSlice';
import Error from '../ui/Error';
import Success from '../ui/Success';
import TextArea from '../ui/TextArea';
import TextInput from '../ui/TextInput';

export default function Form({ video }) {
	const [editVideo, { isLoading, isSuccess, isError }] = useEditVideoMutation();
	const [values, setValues] = useState({});
	const stateChange = (e) => {
		const { name, value } = e.target;
		setValues((prev) => ({ ...prev, [name]: value ?? '' }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		editVideo({ id: video.id, data: values });
	};

	useEffect(() => {
		const { id, ...rest } = video;
		setValues(rest);
	}, [video]);
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
								name="title"
								value={values?.title ?? ''}
								onChange={stateChange}
								title="Video Title"
							/>
						</div>

						<div className="col-span-6 sm:col-span-3">
							<TextInput
								onChange={stateChange}
								name="author"
								value={values?.author ?? ''}
								title="Author"
							/>
						</div>

						<div className="col-span-6">
							<TextArea
								onChange={stateChange}
								name="description"
								value={values?.description ?? ''}
								title="Description"
							/>
						</div>

						<div className="col-span-6">
							<TextInput
								onChange={stateChange}
								name="link"
								value={values?.link ?? ''}
								title="YouTube Video link"
							/>
						</div>

						<div className="col-span-6">
							<TextInput
								onChange={stateChange}
								name="thumbnail"
								value={values?.thumbnail ?? ''}
								title="Thumbnail link"
							/>
						</div>

						<div className="col-span-6 sm:col-span-6 lg:col-span-2">
							<TextInput
								onChange={stateChange}
								name="date"
								value={values?.date ?? ''}
								title="Upload Date"
							/>
						</div>

						<div className="col-span-6 sm:col-span-3 lg:col-span-2">
							<TextInput
								onChange={stateChange}
								name="duration"
								value={values?.duration ?? ''}
								title="Video Duration"
							/>
						</div>

						<div className="col-span-6 sm:col-span-3 lg:col-span-2">
							<TextInput
								onChange={stateChange}
								name="views"
								value={values?.views ?? ''}
								title="Video no of views"
							/>
						</div>
					</div>
				</div>
				<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
					<button
						type="submit"
						disabled={isLoading}
						className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
					>
						Update
					</button>
				</div>
				{isSuccess && <Success message="Video was updated successfully" />}
				{isError && <Error />}
			</div>
		</form>
	);
}
