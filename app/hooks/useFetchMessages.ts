import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchConversationById} from '@/app/redux/slices/ConversationSlice';

const useFetchMessages = (conversationId) => {
    const dispatch = useDispatch();
    const { conversation, isLoading } = useSelector((state) => state.conversation);

    useEffect(() => {
        if (conversationId) {
            dispatch(fetchConversationById(conversationId));
        }
    }, [dispatch, conversationId]);

    return { conversation, isLoading };
};

export default useFetchMessages;
