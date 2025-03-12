import {useDispatch, useSelector} from "react-redux";
import {useEffect, useReducer, useState} from "react";
import {getAllConversationByUser} from "@/app/redux/slices/ConversationSlice";
import {usePathname} from "expo-router";


const useGetAllConversations = () => {
    const dispatch = useDispatch();
    const { conversations, isLoading } = useSelector((state) => state.conversation);
    const path = usePathname();

    useEffect(() => {
        dispatch(getAllConversationByUser());
    }, [path]);



    return { conversations, isLoading };

};

export default useGetAllConversations;
