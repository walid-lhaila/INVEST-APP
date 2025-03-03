import { useDispatch } from "react-redux";
import { acceptRequest } from "@/app/redux/slices/RequestSlice";
import { Toast } from "@/app/CustomToast";
import useGetAllConversations from "@/app/hooks/useGetAllConversations";
import {getAllConversationByUser} from "@/app/redux/slices/ConversationSlice";

const useHandleAcceptRequest = () => {
    const dispatch = useDispatch();

    const handleAccept = async (requestId: string) => {
        try {
            await dispatch(acceptRequest({ requestId, status: 'accepted' })).unwrap();
            dispatch(getAllConversationByUser());
            Toast.show({
                type: "success",
                text1: "Request Accepted",
                text2: "Your request was accepted successfully!",
            });
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Action Failed",
                text2: "Failed to accept request!",
            });
        }
    };

    return { handleAccept };
};

export default useHandleAcceptRequest;
