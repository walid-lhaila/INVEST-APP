import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '@/app/redux/slices/ConversationSlice';
import { getSocket } from '@/app/services/socket';

const useWebSocketMessages = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const socket = getSocket();
        socket.on('receiveMessage', (message) => {
            dispatch(addMessage(message));
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, [dispatch]);
};

export default useWebSocketMessages;
