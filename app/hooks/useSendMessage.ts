import { getSocket } from '@/app/services/socket';
import { useDispatch } from 'react-redux';
import { addMessage } from '@/app/redux/slices/ConversationSlice';

const useSendMessage = (user, otherUser) => {
    const dispatch = useDispatch();

    const handleSendMessage = (messageContent) => {
        if (messageContent.trim()) {
            const socket = getSocket();

            const newMessage = {
                senderUsername: user.username,
                receiverId: otherUser,
                content: messageContent,
                timestamp: new Date().toISOString(),
            };

            dispatch(addMessage(newMessage));

            socket.emit('sendMessage', JSON.stringify(newMessage));
        }
    };

    return handleSendMessage;
};

export default useSendMessage;
