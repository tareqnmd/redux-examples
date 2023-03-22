import { formatDistanceToNow } from 'date-fns';
import gravatarUrl from 'gravatar-url';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetConversationsQuery } from '../../features/conversations/conversations.api';
import getPartnerInfo from '../../utils/getPartnerInfo';
import Error from '../ui/Error';
import ChatItem from './ChatItem';
export default function ChatItems() {
	const { user } = useSelector((state) => state.auth);
	const { data: conversations, isLoading, isError, error } = useGetConversationsQuery(user?.email);
	let content = null;
	if (isLoading) {
		content = <li className="m-2 text-center">Loading...</li>;
	} else if (!isLoading && isError) {
		content = (
			<li className="m-2 text-center">
				<Error message={error.data} />
			</li>
		);
	} else if (!isLoading && !isError && conversations?.length === 0) {
		content = <li className="m-2 text-center">No Conversations Found</li>;
	} else if (!isLoading && !isError && conversations?.length > 0) {
		content = conversations?.map((conversation) => {
			const { id, message, timestamp } = conversation;
			const { name, email } = getPartnerInfo(conversation?.users, user.email);
			return (
				<li key={conversation?.id}>
					<Link to={`/inbox/${id}`}>
						<ChatItem
							avatar={gravatarUrl(email, { size: 80 })}
							name={name}
							lastMessage={message}
							lastTime={formatDistanceToNow(timestamp)}
						/>
					</Link>
				</li>
			);
		});
	}
	return <ul>{content}</ul>;
}
