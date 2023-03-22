import { useSelector } from 'react-redux';
import Message from './Message';

export default function Messages({ messages }) {
	const { user } = useSelector((state) => state.auth) || {};
	return (
		<div className="relative w-full h-[calc(100vh_-_197px)] p-6 overflow-y-auto flex flex-col-reverse">
			<ul className="space-y-2">
				{messages?.map((message) => {
					const justify = message?.sender?.email !== user?.email ? 'start' : 'end';
					return (
						<Message
							key={message.id}
							justify={justify}
							message={message.message}
						/>
					);
				})}
			</ul>
		</div>
	);
}
