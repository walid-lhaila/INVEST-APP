import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConversationMessages } from '@/app/redux/slices/ConversationSlice';

const useFetchMessages = (conversationId) => {
    const dispatch = useDispatch();
    const { messages, isLoading } = useSelector((state) => state.conversation);

    useEffect(() => {
        if (conversationId) {
            dispatch(fetchConversationMessages(conversationId));
        }
    }, [dispatch, conversationId]);

    return { messages, isLoading };
};

export default useFetchMessages;
