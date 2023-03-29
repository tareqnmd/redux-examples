import { formatDistanceToNow } from 'date-fns';
import gravatarUrl from 'gravatar-url';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	conversationsApi,
	useGetConversationsQuery,
} from '../../features/conversations/conversations.api';
import getPartnerInfo from '../../utils/getPartnerInfo';
import Error from '../ui/Error';
import ChatItem from './ChatItem';
export default function ChatItems() {
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const dispatch = useDispatch();
	const fetchMore = () => {
		setPage((prev) => prev + 1);
	};
	const { user } = useSelector((state) => state.auth);
	const { data = {}, isLoading, isError, error } = useGetConversationsQuery(user?.email) || {};
	const { conversations, totalCount } = data;

	useEffect(() => {
		if (page > 1) {
			dispatch(
				conversationsApi.endpoints.getMoreConversations.initiate({ email: user.email, page })
			);
		}
	}, [page, dispatch, user.email]);
	useEffect(() => {
		if (totalCount > 0) {
			const more =
				Math.ceil(totalCount / Number(process.env.REACT_APP_CONVERSATIONS_PER_PAGE)) > page;
			setHasMore(more);
		}
	}, [totalCount, page]);
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
		content = (
			<InfiniteScroll
				dataLength={conversations?.length}
				next={fetchMore}
				hasMore={hasMore}
				loader={<h4>Loading...</h4>}
				height={window.innerHeight - 129}
			>
				{conversations?.map((conversation) => {
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
				})}
			</InfiniteScroll>
		);
	}
	return <ul>{content}</ul>;
}
