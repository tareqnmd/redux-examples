import gravatarUrl from 'gravatar-url';
import { useSelector } from 'react-redux';
import { useGetConversationQuery } from '../../../features/conversations/conversations.api';

export default function ChatHead({ conversationId }) {
	const { data: conversation } = useGetConversationQuery(conversationId);
	const { user } = useSelector((state) => state.auth) || {};
	const partner = conversation?.users?.find((partner) => partner.email !== user.email);
	return partner?.email ? (
		<div className="relative flex items-center p-3 border-b border-gray-300">
			<img
				className="object-cover w-10 h-10 rounded-full"
				src={gravatarUrl(partner.email)}
				alt={partner.name}
			/>
			<span className="block ml-2 font-bold text-gray-600">{partner.name}</span>
		</div>
	) : (
		<></>
	);
}
