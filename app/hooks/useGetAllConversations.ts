import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllConversationByUser} from "@/app/redux/slices/ConversationSlice";


const useGetAllConversations = () => {
    const dispatch = useDispatch();
    const { conversations, isLoading } = useSelector((state) => state.conversation);

    useEffect(() => {
        dispatch(getAllConversationByUser());
    }, [dispatch]);

    return { conversations, isLoading };
};

export default useGetAllConversations;
