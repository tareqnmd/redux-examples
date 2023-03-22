// import Blank from "./Blank";
import { useParams } from 'react-router-dom';
import { useGetMessagesQuery } from '../../../features/messages/messages.api';
import Error from '../../ui/Error';
import ChatHead from './ChatHead';
import Messages from './Messages';
import Options from './Options';

export default function ChatBody() {
	const { id } = useParams();
	const { data: messages, isLoading, isError, error } = useGetMessagesQuery(id);
	let content = null;
	if (isLoading) {
		content = <div className="m-2 text-center">Loading...</div>;
	} else if (!isLoading && isError) {
		content = (
			<div className="m-2 text-center">
				<Error message={error.data} />
			</div>
		);
	} else if (!isLoading && !isError && messages?.length === 0) {
		content = <div className="m-2 text-center">No Conversations Found</div>;
	} else if (!isLoading && !isError && messages?.length > 0) {
		content = (
			<>
				<ChatHead message={messages[0]} />
				<Messages messages={messages} />
				<Options />
				{/* <Blank /> */}
			</>
		);
	}
	return (
		<div className="w-full lg:col-span-2 lg:block">
			<div className="w-full grid conversation-row-grid">{content}</div>
		</div>
	);
}
