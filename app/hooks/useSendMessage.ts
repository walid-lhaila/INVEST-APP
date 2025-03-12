import { getSocket } from '@/app/services/socket';
import { useDispatch } from 'react-redux';
import {addMessage, getAllConversationByUser} from '@/app/redux/slices/ConversationSlice';

const useSendMessage = (user, receiverUsername: string) => {
    const dispatch = useDispatch();

    const handleSendMessage = (messageContent: string) => {
        if (messageContent.trim()) {
            const socket = getSocket();

            const newMessage = {
                senderUsername: user.username,
                receiverUsername: receiverUsername,
                content: messageContent,
                timestamp: new Date().toISOString(),
                isRead: false,
                id: Date.now().toString(),
            };
            console.log(newMessage);

            dispatch(addMessage(newMessage));
            dispatch(getAllConversationByUser());

            socket.emit('sendMessage', JSON.stringify(newMessage));
        }
    };

    return handleSendMessage;
};

export default useSendMessage;
